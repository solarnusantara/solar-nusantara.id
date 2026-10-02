#!/usr/bin/env node
/**
 * Render every unpublished draft into one local HTML page for review.
 *
 *   npm run review              # all drafts
 *   npm run review -- --limit 15
 *
 * Why this exists: the approval gate only works if approving is fast. Opening
 * fifteen markdown files, scrolling past frontmatter in each, and remembering
 * which ones were fine is slow enough that in practice it turns into approving
 * everything unread - which is the same as having no gate.
 *
 * Output is data/review/index.html plus data/review/approved-candidates.txt,
 * a ready-made list to copy into data/approved.txt after deleting the lines you
 * are not happy with. Deleting what you reject is faster than typing what you
 * accept, and it fails safe: a line you never read stays in the file only if
 * you never looked, which is visible.
 *
 * Writes nothing into src/. Reads the content directory and nothing else.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';

const CONTENT_DIR = 'src/content/berita';
const OUT_DIR = 'data/review';

const argv = process.argv.slice(2);
const flagIdx = argv.indexOf('--limit');
const limit = flagIdx === -1 ? Infinity : Number(argv[flagIdx + 1]);

const esc = (s) =>
	String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/**
 * Just enough markdown for a review page: headings, lists, tables, links, bold.
 * Deliberately not a real parser - this page is read once and thrown away, and
 * a dependency for it would be a dependency in the site's tree forever.
 */
function renderMarkdown(md) {
	const out = [];
	let inList = false;
	let inTable = false;

	const closeBlocks = () => {
		if (inList) { out.push('</ul>'); inList = false; }
		if (inTable) { out.push('</table>'); inTable = false; }
	};

	const inline = (s) =>
		esc(s)
			.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
			.replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_, t, href) => {
				const kind = href.startsWith('/') ? 'internal' : 'external';
				return `<a href="${esc(href)}" class="${kind}">${t}</a>`;
			});

	for (const raw of md.split(/\r?\n/)) {
		const line = raw.trimEnd();

		if (!line.trim()) { closeBlocks(); continue; }

		const h = line.match(/^(#{2,4})\s+(.*)$/);
		if (h) { closeBlocks(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }

		if (/^\s*[-*]\s+/.test(line)) {
			if (inTable) { out.push('</table>'); inTable = false; }
			if (!inList) { out.push('<ul>'); inList = true; }
			out.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ''))}</li>`);
			continue;
		}

		if (/^\s*\|/.test(line)) {
			if (inList) { out.push('</ul>'); inList = false; }
			if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue; // separator row
			if (!inTable) { out.push('<table>'); inTable = true; }
			const cells = line.split('|').slice(1, -1).map((c) => `<td>${inline(c.trim())}</td>`);
			out.push(`<tr>${cells.join('')}</tr>`);
			continue;
		}

		if (/^<(div|a|svg|p)\b/.test(line.trim())) continue; // CTA block markup

		closeBlocks();
		out.push(`<p>${inline(line)}</p>`);
	}
	closeBlocks();
	return out.join('\n');
}

// --- collect ----------------------------------------------------------------
const drafts = [];
for (const dir of readdirSync(CONTENT_DIR).filter((d) => statSync(join(CONTENT_DIR, d)).isDirectory())) {
	let raw;
	try {
		raw = readFileSync(join(CONTENT_DIR, dir, 'index.md'), 'utf8');
	} catch {
		continue;
	}
	const split = splitFrontmatter(raw);
	if (!split) continue;
	const data = parseFrontmatter(split.frontmatter);
	if (String(data.draft).toLowerCase() !== 'true') continue;

	drafts.push({
		slug: dir,
		data,
		body: split.body,
		seo: checkSeo({ title: data.title || '', focusKeyphrase: data.focusKeyphrase || '', body: split.body, kind: kindFromTags(data.tags) }),
	});
	if (drafts.length >= limit) break;
}

if (drafts.length === 0) {
	console.log('No drafts waiting. Generate some first: npm run generate -- --limit 10');
	process.exit(0);
}

// --- render -----------------------------------------------------------------
const cards = drafts
	.map((d, i) => {
		const s = d.seo.stats;
		const issues = [
			...d.seo.errors.map((e) => `<li class="err">${esc(e)}</li>`),
			...d.seo.warnings.map((w) => `<li class="warn">${esc(w)}</li>`),
		].join('');

		return `
<article id="a${i}">
  <header>
    <div class="num">${i + 1} / ${drafts.length}</div>
    <h1>${esc(d.data.title || '(tanpa judul)')}</h1>
    <code class="slug">/berita/${esc(d.slug)}/</code>
    <p class="desc">${esc(d.data.description || '(tanpa description)')}
      <span class="len">${(d.data.description || '').length} char</span></p>
    <div class="meta">
      <span>kw: <b>${esc(d.data.focusKeyphrase || '-')}</b></span>
      <span>${s.wordCount ?? '?'} kata</span>
      <span>${s.h2s ?? '?'} heading</span>
      <span>densitas ${s.density ?? '?'}%</span>
      <span>${s.internalLinks ?? 0} internal</span>
      <span>${s.externalTrusted ?? 0} eksternal</span>
    </div>
    ${issues ? `<ul class="issues">${issues}</ul>` : '<p class="clean">lolos kedua gate</p>'}
  </header>
  <div class="body">${renderMarkdown(d.body)}</div>
</article>`;
	})
	.join('\n');

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Review ${drafts.length} draft - Solar Nusantara</title>
<style>
  :root { color-scheme: light dark; --bg:#fff; --fg:#1a1a1a; --mut:#666; --line:#e5e5e5; --card:#fafafa; --err:#b91c1c; --warn:#a16207; --ok:#15803d; --link:#1d4ed8; }
  @media (prefers-color-scheme: dark) { :root { --bg:#121212; --fg:#e8e8e8; --mut:#9a9a9a; --line:#2c2c2c; --card:#1c1c1c; --err:#f87171; --warn:#fbbf24; --ok:#4ade80; --link:#93c5fd; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:24px 16px 80px; background:var(--bg); color:var(--fg);
         font:15px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  .wrap { max-width: 800px; margin: 0 auto; }
  .lede { color:var(--mut); border-bottom:1px solid var(--line); padding-bottom:16px; margin-bottom:8px; }
  .lede h2 { margin:0 0 6px; font-size:17px; color:var(--fg); }
  article { border:1px solid var(--line); border-radius:10px; margin:28px 0; overflow:hidden; }
  header { background:var(--card); padding:16px 18px; border-bottom:1px solid var(--line); }
  .num { font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--mut); }
  h1 { font-size:19px; margin:6px 0 8px; line-height:1.35; }
  .slug { font-size:12px; color:var(--mut); word-break:break-all; }
  .desc { margin:12px 0 10px; font-size:14px; }
  .len { color:var(--mut); font-size:12px; }
  .meta { display:flex; flex-wrap:wrap; gap:6px 14px; font-size:12px; color:var(--mut); }
  .issues { margin:12px 0 0; padding-left:18px; font-size:13px; }
  .err { color:var(--err); } .warn { color:var(--warn); }
  .clean { margin:10px 0 0; font-size:13px; color:var(--ok); }
  .body { padding:6px 18px 20px; }
  .body h2 { font-size:17px; margin:22px 0 8px; }
  .body h3 { font-size:15px; margin:18px 0 6px; }
  .body p { margin:10px 0; }
  .body ul { margin:10px 0; padding-left:20px; }
  .body a { color:var(--link); }
  .body a.external::after { content:" \\2197"; font-size:.85em; }
  .body table { border-collapse:collapse; width:100%; margin:14px 0; font-size:13px; display:block; overflow-x:auto; }
  .body td { border:1px solid var(--line); padding:6px 9px; }
  img { max-width:100%; }
</style></head><body><div class="wrap">
<div class="lede">
  <h2>${drafts.length} draft menunggu persetujuan</h2>
  <p>Baca, lalu buka <code>data/review/approved-candidates.txt</code> dan <b>hapus baris</b> yang tidak kamu setujui.
     Salin sisanya ke <code>data/approved.txt</code>. Jalankan <code>npm run publish -- --dry-run</code> untuk melihat
     apa yang akan terbit sebelum benar-benar terbit.</p>
</div>
${cards}
</div></body></html>`;

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'index.html'), html, 'utf8');

const candidates = [
	'# Hapus baris yang TIDAK disetujui, lalu salin sisanya ke data/approved.txt',
	`# dibuat ${new Date().toISOString().slice(0, 16).replace('T', ' ')} - ${drafts.length} draft`,
	'',
	...drafts.map((d) => (d.seo.errors.length ? `# ${d.slug}   <-- gagal gate SEO, perbaiki dulu` : d.slug)),
	'',
].join('\n');
writeFileSync(join(OUT_DIR, 'approved-candidates.txt'), candidates, 'utf8');

const failing = drafts.filter((d) => d.seo.errors.length).length;
console.log(`\nreview: ${drafts.length} draft(s) rendered`);
if (failing) console.log(`  ${failing} still fail the SEO gate and are commented out in the candidate list`);
console.log(`  open  ${join(OUT_DIR, 'index.html')}`);
console.log(`  edit  ${join(OUT_DIR, 'approved-candidates.txt')}  ->  data/approved.txt\n`);
