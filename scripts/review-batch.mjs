#!/usr/bin/env node
/**
 * Review the batch waiting for a decision, in a browser, and record the decisions.
 *
 *   npm run review              # serve http://127.0.0.1:4173 and open it
 *   npm run review -- --port 5000
 *
 * Run it on Monday, after `git pull`. The batch is the four articles the server
 * generated and pushed; every decision is one line in data/review.txt, which the
 * server reads on its next run (see lib/review-state.mjs).
 *
 * What the page is built around. Reading four 1,900-word articles for "is this
 * good" is not a task a person does well, so the page reads FOR the reviewer and
 * leaves them the judgments only they can make:
 *
 *   - the hero and the Google result as a reader will see them, first;
 *   - what the machine already checked, so none of it is re-checked by eye;
 *   - every sentence that makes a checkable claim (a number, a standard, a
 *     regulation) pulled out of the text into one list, because a wrong figure
 *     inside a good paragraph is exactly what gets skimmed past;
 *   - every outbound link, one click to open;
 *   - then the article, in readable type.
 *
 * Local only: binds to 127.0.0.1, accepts decisions only for slugs in the current
 * batch, and its single write is appending a line to data/review.txt.
 */
import { createServer } from 'node:http';
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, exec } from 'node:child_process';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';
import { checkFacts } from './lib/fact-guard.mjs';
import { isSonushub } from './lib/sonushub.mjs';
import { awaitingReview, loadStore, readDecisions, pendingDecision, DECISIONS } from './lib/review-state.mjs';

const CONTENT_DIR = 'src/content/berita';
const argv = process.argv.slice(2);
const port = Number(argv[argv.indexOf('--port') + 1]) || 4173;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// --- markdown ---------------------------------------------------------------
/** Just enough markdown for a review page. Not a parser: this page is read once and thrown away, and a dependency for it would live in the site's tree forever. */
function renderMarkdown(md) {
	const out = [];
	let open = null; // 'ul' | 'ol' | 'table'

	const close = () => {
		if (open === 'table') out.push('</table></div>');
		else if (open) out.push(`</${open}>`);
		open = null;
	};
	const inline = (s) =>
		esc(s)
			.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
			.replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_, t, href) => `<a href="${href}" class="${href.startsWith('/') ? 'internal' : 'external'}" target="_blank" rel="noopener">${t}</a>`);

	for (const raw of md.split(/\r?\n/)) {
		const line = raw.trimEnd();
		if (!line.trim()) { close(); continue; }
		if (/^<(div|a|svg|p|img)\b/.test(line.trim())) continue; // the CTA block's markup
		if (/^-{3,}$/.test(line.trim())) { close(); out.push('<hr>'); continue; }

		const h = line.match(/^(#{2,4})\s+(.*)$/);
		if (h) { close(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

		const li = line.match(/^\s*(?:([-*])|\d+[.)])\s+(.*)$/);
		if (li) {
			const kind = li[1] ? 'ul' : 'ol';
			if (open !== kind) { close(); out.push(`<${kind}>`); open = kind; }
			out.push(`<li>${inline(li[2])}</li>`);
			continue;
		}

		if (/^\s*\|/.test(line)) {
			if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue; // separator row
			if (open !== 'table') { close(); out.push('<div class="tw"><table>'); open = 'table'; }
			const tag = out.at(-1) === '<div class="tw"><table>' ? 'th' : 'td'; // the first row is the header
			out.push(`<tr>${line.split('|').slice(1, -1).map((c) => `<${tag}>${inline(c.trim())}</${tag}>`).join('')}</tr>`);
			continue;
		}

		close();
		out.push(`<p>${inline(line)}</p>`);
	}
	close();
	return out.join('\n');
}

/** The generator appends the shared CTA block after a final `---`. It is markup, not prose: it must not be read, rendered or searched for claims. */
const articleOnly = (body) => {
	const i = body.lastIndexOf('\n---\n');
	return i > 0 ? body.slice(0, i) : body;
};

// --- what a person should verify -------------------------------------------
const plain = (s) => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`>#|]/g, ' ').replace(/\s+/g, ' ').trim();

/** Sentences that assert something checkable: a figure, a unit, a standard, a regulation. Order kept, capped, because forty items is a list nobody reads. */
function claimsOf(body) {
	const cues = [
		['regulasi', /\b(permen|peraturan|undang-undang|uu\s*no|pp\s*no|sk\s)/i],
		['standar', /\b(iec|sni|en\s?\d|iso|ul\s?\d|tuv)\b/i],
		['angka', /(\d[\d.,]*\s?(%|persen|kwp|mwp|kw|mw|kwh|volt|v\b|a\b|mm|cm|m2|m²|tahun|bulan|hari|rp|miliar|juta|ribu))|rp\s?\d/i],
	];
	const found = [];
	const seen = new Set();
	for (const block of body.split(/\r?\n/)) {
		if (/^\s*#{1,6}\s|^\s*\|[\s:|-]+\|\s*$|^<|^-{3,}$/.test(block)) continue;
		for (const sentence of plain(block).split(/(?<=[.!?])\s+(?=[A-Z])/)) {
			if (sentence.length < 25 || seen.has(sentence)) continue;
			const hit = cues.find(([, re]) => re.test(sentence));
			if (!hit) continue;
			seen.add(sentence);
			found.push({ kind: hit[0], text: sentence });
		}
	}
	// Standards and regulations first: the likeliest to be invented and the costliest to be wrong.
	const rank = { regulasi: 0, standar: 1, angka: 2 };
	return found.sort((a, b) => rank[a.kind] - rank[b.kind]).slice(0, 14);
}

const highlight = (s) => esc(s).replace(/((?:rp\s?)?(?<![a-z])\d[\d.,]*\s?(?:%|persen|kwp|mwp|mwh|kwh|mw|kw|volt|mm|cm|tahun|bulan|hari|miliar|juta|ribu|ton)?|\b(?:iec|sni|iso|permen\s?esdm)\b[^.,;]{0,18})/gi, '<mark>$1</mark>');

function linksOf(body) {
	return [...body.matchAll(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g)].map((m) => ({ text: m[1], href: m[2], external: !m[2].startsWith('/') }));
}

// --- collect ----------------------------------------------------------------
function collect() {
	const store = loadStore();
	const decisions = readDecisions();
	return awaitingReview(store)
		.sort((a, b) => a.rank - b.rank)
		.map((t) => {
			const file = join(CONTENT_DIR, t.slug, 'index.md');
			if (!existsSync(file)) return null;
			const split = splitFrontmatter(readFileSync(file, 'utf8'));
			if (!split) return null;
			const data = parseFrontmatter(split.frontmatter);
			const heroFile = data.heroImage ? join(CONTENT_DIR, t.slug, data.heroImage) : null;
			return {
				topic: t,
				data,
				body: articleOnly(split.body.replace(/\r/g, '')),
				hero: heroFile && existsSync(heroFile) ? `data:image/webp;base64,${readFileSync(heroFile).toString('base64')}` : null,
				seo: checkSeo({ title: data.title || '', focusKeyphrase: data.focusKeyphrase || '', body: split.body, kind: kindFromTags(data.tags) }),
				facts: checkFacts({ body: split.body }),
				// Only a decision about THIS draft: a "redo" line from before the rewrite must not show the rewrite as already decided.
				decision: pendingDecision(t, decisions),
			};
		})
		.filter(Boolean);
}

// --- page -------------------------------------------------------------------
function card(a, i, n) {
	const s = a.seo.stats;
	const d = a.data;
	const title = d.seoTitle || d.title;
	const dlen = (d.description || '').length;
	const issues = [
		...a.seo.errors.map((e) => `<li class="err">${esc(e)}</li>`),
		...a.facts.errors.map((e) => `<li class="err">${esc(e)}</li>`),
		...a.seo.warnings.map((w) => `<li class="warn">${esc(w)}</li>`),
		...a.facts.warnings.map((w) => `<li class="warn">${esc(w)}</li>`),
	];
	const claims = claimsOf(a.body);
	const links = linksOf(a.body);
	const outline = [...a.body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1]);
	const heroOk = Boolean(a.hero);

	return `
<article id="a${i}" data-slug="${esc(a.topic.slug)}">
  <div class="kicker">${i + 1} dari ${n} · ${esc(a.topic.buyerLabel)} · ${esc(a.topic.product)} · ${esc(a.topic.angle)}${a.topic.kind === 'pillar' ? ' · PILAR' : ''}</div>
  <h2 class="title">${esc(d.title)}</h2>

  <section class="peek">
    ${heroOk ? `<img class="hero" src="${a.hero}" alt="${esc(d.heroImageAlt || '')}">` : '<div class="hero missing">hero belum ada</div>'}
    <div class="serp">
      <div class="serp-url">solar-nusantara.id › berita › ${esc(a.topic.slug)}</div>
      <div class="serp-title">${esc(title)}${title.length > 60 ? ' <span class="pill warn">&gt;60 karakter</span>' : ''}</div>
      <div class="serp-desc">${esc(d.description || '')}</div>
      <div class="serp-meta"><span class="pill ${dlen >= 70 && dlen <= 160 ? 'ok' : 'err'}">${dlen} karakter</span> kata kunci: <b>${esc(d.focusKeyphrase || '-')}</b></div>
    </div>
  </section>

  <section class="machine">
    <h3>Sudah dicek mesin</h3>
    <div class="chips"><span>${s.wordCount ?? '?'} kata</span><span>${s.h2s ?? '?'} heading</span><span>densitas ${s.density ?? '?'}%</span><span class="hub">${s.sonushubLinks ?? 0} ke SonusHUB</span><span>${s.internalLinks ?? 0} tautan internal</span><span>${s.externalTrusted ?? 0} eksternal</span></div>
    ${issues.length ? `<ul class="issues">${issues.join('')}</ul>` : '<p class="clean">Lolos gate SEO dan gate fakta. Tidak ada merek atau regulasi yang meragukan.</p>'}
  </section>

  <section class="verify">
    <h3>Perlu kamu cek <small>klaim yang bisa salah, diambil dari teks</small></h3>
    ${claims.length ? `<ol class="claims">${claims.map((c) => `<li><label><input type="checkbox"><span class="tag ${c.kind}">${c.kind}</span><span>${highlight(c.text)}</span></label></li>`).join('')}</ol>` : '<p class="muted">Tidak ada kalimat berangka. Baca isinya langsung.</p>'}
    <h4>Tautan keluar</h4>
    <ul class="links">${links.map((l) => `<li>${isSonushub(l.href) ? '<span class="pill ok">SonusHUB</span> ' : ''}<a href="${l.external ? esc(l.href) : 'https://solar-nusantara.id' + esc(l.href)}" target="_blank" rel="noopener" class="${l.external ? 'external' : 'internal'}">${esc(l.text)}</a> <code>${esc(l.href)}</code></li>`).join('')}</ul>
  </section>

  <details class="outline"><summary>Kerangka (${outline.length} bagian)</summary><ol>${outline.map((o) => `<li>${esc(o)}</li>`).join('')}</ol></details>

  <section class="read">
    <h3>Artikel</h3>
    <div class="body">${renderMarkdown(a.body)}</div>
  </section>

  <section class="decide" data-slug="${esc(a.topic.slug)}">
    <textarea placeholder="Catatan. Wajib untuk Tulis ulang dan Tolak; untuk Tulis ulang, catatan ini dikirim ke penulisnya." rows="2">${esc(a.decision?.note ?? '')}</textarea>
    <div class="buttons">
      <button class="b-approve" data-d="approve">✔ Setujui</button>
      <button class="b-redo" data-d="redo">✎ Tulis ulang</button>
      <button class="b-reject" data-d="reject">✖ Tolak</button>
      <span class="state" data-state>${a.decision ? `Tersimpan: <b>${esc(a.decision.decision)}</b>` : 'Belum diputuskan'}</span>
    </div>
  </section>
</article>`;
}

function page(items) {
	const n = items.length;
	const nav = items.map((a, i) => `<a href="#a${i}" data-nav="${esc(a.topic.slug)}"><i></i>${i + 1}</a>`).join('');
	return `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Review batch - Solar Nusantara</title>
<style>
  :root { color-scheme: light dark; --bg:#f6f7f9; --card:#fff; --fg:#1b1f24; --mut:#5f6b7a; --line:#e3e6ea; --blue:#1a7fc4; --err:#b42318; --warn:#a15c07; --ok:#157f3d; --mark:#fff2b3; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101215; --card:#181b20; --fg:#e8eaed; --mut:#9aa4b2; --line:#2a2f37; --blue:#6cb8ee; --err:#f97066; --warn:#f5b64a; --ok:#4ade80; --mark:#5a4b0e; } }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif; }
  .top { position:sticky; top:0; z-index:5; background:var(--card); border-bottom:1px solid var(--line); padding:10px 16px; display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
  .top b { font-size:15px; } .top .progress { color:var(--mut); font-size:14px; }
  .top nav { display:flex; gap:6px; margin-left:auto; }
  .top nav a { text-decoration:none; color:var(--fg); border:1px solid var(--line); border-radius:8px; padding:3px 10px; font-size:14px; display:flex; gap:6px; align-items:center; }
  .top nav i { width:9px; height:9px; border-radius:50%; background:var(--line); } .top nav a.done i { background:var(--ok); }
  main { max-width:760px; margin:0 auto; padding:18px 16px 120px; }
  article { background:var(--card); border:1px solid var(--line); border-radius:14px; padding:22px 22px 8px; margin:0 0 28px; }
  .kicker { font-size:12px; letter-spacing:.06em; text-transform:uppercase; color:var(--mut); }
  .title { font-size:25px; line-height:1.3; margin:6px 0 16px; }
  h3 { font-size:13px; letter-spacing:.06em; text-transform:uppercase; color:var(--mut); margin:26px 0 8px; } h3 small { text-transform:none; letter-spacing:0; font-weight:400; }
  h4 { font-size:13px; color:var(--mut); margin:16px 0 6px; }
  .peek { display:grid; grid-template-columns:1fr; gap:14px; }
  @media (min-width:700px) { .peek { grid-template-columns:300px 1fr; } }
  .hero { width:100%; border:1px solid var(--line); border-radius:8px; display:block; } .hero.missing { padding:40px 10px; text-align:center; color:var(--err); border:1px dashed var(--err); border-radius:8px; }
  .serp { font-family:Arial,sans-serif; } .serp-url { color:var(--mut); font-size:12px; } .serp-title { color:#1a0dab; font-size:19px; line-height:1.3; margin:2px 0 4px; } @media (prefers-color-scheme: dark) { .serp-title { color:#8ab4f8; } }
  .serp-desc { font-size:14px; color:var(--fg); } .serp-meta { margin-top:8px; font-size:12px; color:var(--mut); }
  .pill { font-size:11px; border-radius:20px; padding:1px 8px; border:1px solid currentColor; font-family:system-ui; } .pill.ok { color:var(--ok); } .pill.err { color:var(--err); } .pill.warn { color:var(--warn); }
  .chips { display:flex; flex-wrap:wrap; gap:6px; } .chips span.hub { border-color:var(--ok); color:var(--ok); font-weight:600; } .chips span { background:var(--bg); border:1px solid var(--line); border-radius:6px; padding:2px 9px; font-size:13px; }
  .issues { padding-left:20px; font-size:14px; } .err { color:var(--err); } .warn { color:var(--warn); } .clean { color:var(--ok); font-size:14px; margin:10px 0 0; } .muted { color:var(--mut); font-size:14px; }
  .claims { padding:0; margin:0; list-style:none; counter-reset:c; } .claims li { border-top:1px solid var(--line); } .claims li:first-child { border-top:0; }
  .claims label { display:flex; gap:10px; padding:9px 0; cursor:pointer; align-items:flex-start; font-size:15px; } .claims input { margin-top:6px; flex:none; width:18px; height:18px; }
  .claims input:checked ~ span:last-child { opacity:.45; text-decoration:line-through; }
  .tag { flex:none; font-size:10px; text-transform:uppercase; letter-spacing:.05em; padding:2px 7px; border-radius:5px; margin-top:4px; color:#fff; background:var(--mut); } .tag.regulasi { background:var(--err); } .tag.standar { background:var(--warn); } .tag.angka { background:var(--blue); }
  mark { background:var(--mark); color:inherit; border-radius:3px; padding:0 2px; }
  .links { padding-left:18px; font-size:14px; } .links code { color:var(--mut); font-size:12px; word-break:break-all; } a { color:var(--blue); } a.external::after { content:" ↗"; font-size:.8em; }
  details.outline { margin-top:18px; } details summary { cursor:pointer; color:var(--mut); font-size:14px; } details ol { font-size:14px; }
  .body { font-size:17px; line-height:1.78; } .body h2 { font-size:21px; margin:34px 0 8px; line-height:1.3; } .body h3 { font-size:18px; text-transform:none; letter-spacing:0; color:var(--fg); margin:24px 0 6px; } .body p { margin:14px 0; } .body ul,.body ol { margin:14px 0; padding-left:24px; } .body li { margin:5px 0; }
  .tw { overflow-x:auto; margin:16px 0; } .body table { border-collapse:collapse; font-size:15px; min-width:100%; } .body th,.body td { border:1px solid var(--line); padding:8px 11px; text-align:left; vertical-align:top; } .body th { background:var(--bg); } .body hr { border:0; border-top:1px solid var(--line); margin:30px 0; }
  .decide { position:sticky; bottom:0; background:var(--card); margin:26px -22px 0; padding:12px 22px 14px; border-top:1px solid var(--line); border-radius:0 0 14px 14px; }
  textarea { width:100%; font:inherit; font-size:14px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--bg); color:var(--fg); resize:vertical; }
  .buttons { display:flex; gap:8px; align-items:center; margin-top:8px; flex-wrap:wrap; }
  button { font:inherit; font-size:15px; border-radius:9px; border:1px solid var(--line); padding:8px 16px; cursor:pointer; background:var(--card); color:var(--fg); } button:hover { filter:brightness(.96); }
  .b-approve { background:var(--ok); color:#fff; border-color:var(--ok); } .b-redo { color:var(--warn); border-color:var(--warn); } .b-reject { color:var(--err); border-color:var(--err); }
  .state { margin-left:auto; font-size:13px; color:var(--mut); }
  .send { position:fixed; left:0; right:0; bottom:0; background:var(--card); border-top:1px solid var(--line); padding:12px 16px; display:none; z-index:6; text-align:center; }
  .send.show { display:block; } .send button { background:var(--blue); color:#fff; border-color:var(--blue); } .send pre { white-space:pre-wrap; font-size:12px; color:var(--mut); margin:8px 0 0; text-align:left; max-width:760px; margin-inline:auto; }
  .empty { text-align:center; padding:80px 16px; color:var(--mut); }
</style></head><body>
<div class="top"><b>Review batch</b><span class="progress" id="progress"></span><nav>${nav}</nav></div>
<main>
${n ? items.map((a, i) => card(a, i, n)).join('\n') : '<div class="empty"><h2>Tidak ada artikel yang menunggu review</h2><p>Jalankan <code>git pull</code> dulu. Batch baru dibuat server setelah batch sebelumnya diputuskan.</p></div>'}
</main>
<div class="send" id="send"><button id="sendBtn">Kirim keputusan ke server (commit &amp; push)</button><pre id="sendOut"></pre></div>
<script>
const total = ${n};
const done = new Set(${JSON.stringify(items.filter((a) => a.decision).map((a) => a.topic.slug))});
function refresh() {
  document.getElementById('progress').textContent = done.size + ' dari ' + total + ' diputuskan';
  document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('done', done.has(a.dataset.nav)));
  document.getElementById('send').classList.toggle('show', total > 0 && done.size === total);
}
document.querySelectorAll('.decide').forEach(box => {
  const slug = box.dataset.slug, note = box.querySelector('textarea'), state = box.querySelector('[data-state]');
  box.querySelectorAll('button').forEach(btn => btn.addEventListener('click', async () => {
    const d = btn.dataset.d;
    if (d !== 'approve' && !note.value.trim()) { note.focus(); state.textContent = 'Tulis catatan dulu.'; return; }
    const r = await fetch('/decide', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug, decision: d, note: note.value }) });
    if (!r.ok) { state.textContent = 'Gagal menyimpan: ' + await r.text(); return; }
    state.innerHTML = 'Tersimpan: <b>' + d + '</b>'; done.add(slug); refresh();
  }));
});
document.getElementById('sendBtn').addEventListener('click', async () => {
  const out = document.getElementById('sendOut'); out.textContent = 'Mengirim...';
  const r = await fetch('/push', { method: 'POST' }); out.textContent = await r.text();
});
refresh();
</script></body></html>`;
}

// --- server -----------------------------------------------------------------
const oneLine = (s) => String(s ?? '').replace(/[\r\n#]+/g, ' ').trim().slice(0, 400);

const server = createServer((req, res) => {
	const send = (code, body, type = 'text/plain; charset=utf-8') => { res.writeHead(code, { 'Content-Type': type }); res.end(body); };

	if (req.method === 'GET' && (req.url === '/' || req.url.startsWith('/?'))) return send(200, page(collect()), 'text/html; charset=utf-8');

	if (req.method === 'POST' && req.url === '/decide') {
		let raw = '';
		req.on('data', (c) => { raw += c; if (raw.length > 10_000) req.destroy(); });
		req.on('end', () => {
			try {
				const { slug, decision, note } = JSON.parse(raw);
				if (!['approve', 'redo', 'reject'].includes(decision)) return send(400, 'decision must be approve, redo or reject');
				if (!awaitingReview(loadStore()).some((t) => t.slug === slug)) return send(404, 'that article is not in the batch under review');
				if (decision !== 'approve' && !oneLine(note)) return send(400, 'a note is required for redo and reject');
				const text = oneLine(note);
				appendFileSync(DECISIONS, `${decision} ${slug}${text ? ` # ${text}` : ''}\n`, 'utf8');
				send(200, 'ok');
			} catch (e) {
				send(400, String(e.message));
			}
		});
		return;
	}

	if (req.method === 'POST' && req.url === '/push') {
		try {
			const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' });
			git(['add', DECISIONS]);
			git(['commit', '-m', 'review: decisions for the current batch', '--', DECISIONS]);
			git(['push']);
			return send(200, 'Terkirim. Server memakainya pada run berikutnya.');
		} catch (e) {
			const out = `${e.stdout || ''}${e.stderr || ''}`;
			return send(500, /nothing to commit|no changes added/i.test(out) ? 'Tidak ada perubahan baru untuk dikirim.' : `Gagal:\n${out}`);
		}
	}
	send(404, 'not found');
});

server.listen(port, '127.0.0.1', () => {
	const url = `http://127.0.0.1:${port}`;
	const batch = collect();
	console.log(`\nreview: ${batch.length} article(s) waiting for a decision\n  ${url}\n  Ctrl+C when you are done.\n`);
	const opener = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
	exec(opener, () => {});
});
