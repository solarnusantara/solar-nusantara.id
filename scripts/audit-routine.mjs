#!/usr/bin/env node
/**
 * Weekly audit of solar-nusantara.id, run on the server (crontab, Sunday). Reports only: nothing here
 * holds back a publish or edits an article. The report goes to ERPSonus (SEO Marketing > Audit), which
 * shows what is new, fixed and still open since last week. A copy is kept in data/audit/ (not committed).
 *
 *   node scripts/audit-routine.mjs                 full run, send to ERPSonus
 *   node scripts/audit-routine.mjs --dry-run       run the checks, print the findings, send and write nothing
 *   --skip-build   reuse the existing dist/ instead of building (development)
 *   --skip-live    no requests to the live site
 *   --skip-links   no requests to external sites
 *
 * Checks, each isolated so one failing does not hide the rest:
 *   content   check-content, and check-seo rules over every published article
 *   site      astro build, then audit-site over dist/ (404 links, duplicates, canonical, JSON-LD, ...)
 *   live      the deployed site: URLs answer, /pratinjau/ is noindex, robots/llms.txt/schema for AI search
 *   links     external links in published articles (dead = 404/410 only)
 *   pipeline  ERPSonus token still accepted, draft stock, failed topics, last publish, disk
 *
 * Needs the same env as publish-drip (SEO_REVIEW_TOKEN; SEO_REVIEW_URL to override the host).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statfsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';
import { verifyExternalLinks } from './lib/fact-guard.mjs';
import { LIVE_DIR } from './lib/articles.mjs';
import { loadStore, readyDrafts } from './lib/topic-store.mjs';
import { callErp, REVIEW_URL } from './lib/review-gate.mjs';
import {
	Findings, blockedBots, sitemapLocs, isNoindex, hasOrganizationSchema, classifyLinkError,
	daysBetween, checkScore, buildReport,
} from './lib/audit-report.mjs';

const SITE = 'https://solar-nusantara.id';
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'CCBot'];
const LIVE_SAMPLE = 80;
const STOCK_WARN_BELOW = 4;
const NO_PUBLISH_WARN_DAYS = 7;
const DISK_WARN_PCT = 92;
const DISK_CRITICAL_PCT = 97;

const argv = process.argv.slice(2);
const has = (f) => argv.includes(`--${f}`);
const dryRun = has('dry-run');

const findings = new Findings();
const metrics = {};
const log = (m) => console.log(m);

const tail = (s, n = 800) => (s.length > n ? `...${s.slice(-n)}` : s).trim();

/** Run one check; if it throws, that becomes a finding instead of ending the audit. */
async function guard(name, fn) {
	const t = Date.now();
	try {
		await fn();
		log(`  ok   ${name} (${((Date.now() - t) / 1000).toFixed(1)}s)`);
	} catch (e) {
		log(`  FAIL ${name}: ${e.message}`);
		findings.add('warn', 'pipeline', ['check-failed', name], `Pemeriksaan "${name}" tidak bisa dijalankan`, { detail: e.message });
	}
}

function publishedArticles() {
	if (!existsSync(LIVE_DIR)) return [];
	const out = [];
	for (const e of readdirSync(LIVE_DIR, { withFileTypes: true })) {
		if (!e.isDirectory()) continue;
		let raw;
		try {
			raw = readFileSync(join(LIVE_DIR, e.name, 'index.md'), 'utf8');
		} catch {
			continue;
		}
		const split = splitFrontmatter(raw);
		if (!split) continue;
		const data = parseFrontmatter(split.frontmatter);
		if (String(data.draft).toLowerCase() === 'true') continue;
		out.push({ slug: e.name, data, body: split.body });
	}
	return out;
}

// ------------------------------------------------------------------ content ---
async function contentChecks() {
	const gate = spawnSync(process.execPath, ['scripts/check-content.mjs'], { encoding: 'utf8' });
	if (gate.status !== 0) {
		findings.add('critical', 'content', ['check-content'], 'check-content gagal: build berikutnya akan berhenti', { detail: tail(`${gate.stderr}${gate.stdout}`) });
	}

	const articles = publishedArticles();
	let failing = 0;
	for (const a of articles) {
		const { errors, warnings } = checkSeo({
			title: a.data.title || '',
			focusKeyphrase: a.data.focusKeyphrase || '',
			body: a.body,
			kind: kindFromTags(a.data.tags),
		});
		if (!errors.length && !warnings.length) continue;
		if (errors.length) failing += 1;
		// One finding per article, id without the messages, so fixing one of three issues does not look like a new finding.
		findings.add(errors.length ? 'warn' : 'info', 'content', ['seo', a.slug], `${a.slug}: ${errors.length} kesalahan, ${warnings.length} peringatan SEO`, {
			detail: [...errors.map((e) => `x ${e}`), ...warnings.map((w) => `! ${w}`)].join('; '),
			url: `${SITE}/berita/${a.slug}/`,
		});
	}
	metrics.articles_published = articles.length;
	metrics.seo_articles_failing = failing;
}

// --------------------------------------------------------------------- site ---
async function siteChecks() {
	if (!has('skip-build')) {
		const build = spawnSync(process.execPath, ['node_modules/astro/astro.js', 'build'], { encoding: 'utf8', timeout: 10 * 60_000, maxBuffer: 32 * 1024 * 1024 });
		if (build.status !== 0) {
			findings.add('critical', 'site', ['build-failed'], 'astro build gagal', { detail: tail(`${build.stderr}${build.stdout}`) });
			return;
		}
	}
	const out = join(tmpdir(), `sn-audit-site-${process.pid}.json`);
	const audit = spawnSync(process.execPath, ['scripts/audit-site.mjs', `--json=${out}`], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
	if (!existsSync(out)) throw new Error(`audit-site tidak menulis hasil (exit ${audit.status}): ${tail(audit.stderr, 300)}`);
	const r = JSON.parse(readFileSync(out, 'utf8'));
	for (const f of r.findings) findings.add('warn', 'site', [f.kind, f.detail], `${f.kind}: ${f.detail}`.slice(0, 200));
	for (const l of r.leaks) findings.add('critical', 'site', ['preview-leak', l], `Pratinjau draf bisa terindeks: ${l}`);
	metrics.site_pages = r.pages;
	metrics.site_findings = r.findings.length;
}

// --------------------------------------------------------------------- live ---
const get = (url, init = {}) => fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000), ...init });

async function liveChecks() {
	const geo = []; // pass/fail of each AI-search readiness check

	const robots = await get(`${SITE}/robots.txt`);
	const robotsTxt = robots.ok ? await robots.text() : '';
	const blocked = robots.ok ? blockedBots(robotsTxt, AI_BOTS) : [];
	for (const bot of blocked) findings.add('warn', 'geo', ['robots-blocks', bot], `robots.txt menutup ${bot} dari seluruh situs`);
	geo.push(robots.ok && blocked.length === 0);
	if (!robots.ok) findings.add('warn', 'live', ['robots-missing'], `robots.txt tidak bisa dibuka (HTTP ${robots.status})`);
	const hasSitemapLine = /^sitemap:/im.test(robotsTxt);
	if (robots.ok && !hasSitemapLine) findings.add('warn', 'geo', ['robots-no-sitemap'], 'robots.txt tidak menyebut Sitemap');
	geo.push(hasSitemapLine);

	const llms = await get(`${SITE}/llms.txt`);
	const llmsOk = llms.ok && (await llms.text()).length > 100;
	if (!llmsOk) findings.add('warn', 'geo', ['llms-txt'], 'llms.txt tidak ada atau kosong');
	geo.push(llmsOk);

	const home = await get(`${SITE}/`);
	const homeHtml = home.ok ? await home.text() : '';
	if (!home.ok) findings.add('critical', 'live', ['home-down'], `Beranda mengembalikan HTTP ${home.status}`, { url: `${SITE}/` });
	const orgOk = hasOrganizationSchema(homeHtml);
	if (home.ok && !orgOk) findings.add('warn', 'geo', ['org-schema'], 'Beranda tidak punya JSON-LD Organization dengan sameAs', { url: `${SITE}/` });
	geo.push(orgOk);

	const index = await get(`${SITE}/sitemap-index.xml`);
	const urls = [];
	if (index.ok) {
		for (const loc of sitemapLocs(await index.text())) {
			const part = await get(loc);
			if (part.ok) urls.push(...sitemapLocs(await part.text()));
		}
	}
	const sitemapOk = urls.length > 0;
	if (!sitemapOk) findings.add('critical', 'live', ['sitemap'], 'Sitemap kosong atau tidak bisa dibuka');
	geo.push(sitemapOk);
	for (const u of urls.filter((u) => u.includes('/pratinjau/'))) findings.add('critical', 'live', ['preview-in-sitemap', u], `Sitemap memuat pratinjau draf: ${u}`, { url: u });

	// The preview page must stay out of search on the deployed site, not only in dist/.
	const preview = await get(`${SITE}/pratinjau/`);
	if (preview.ok && !isNoindex(await preview.text(), preview.headers.get('x-robots-tag') ?? '')) {
		findings.add('critical', 'live', ['preview-indexable'], '/pratinjau/ di situs live tidak noindex: draf bisa terindeks', { url: `${SITE}/pratinjau/` });
	}

	// Sample of the sitemap: every URL would be ~130 requests a week for little gain.
	const sample = urls.filter((u) => !u.includes('/pratinjau/')).slice(0, LIVE_SAMPLE);
	let bad = 0;
	const lanes = Array.from({ length: 4 }, (_, i) => sample.filter((_, j) => j % 4 === i));
	await Promise.all(lanes.map(async (lane) => {
		for (const u of lane) {
			try {
				const res = await get(u, { method: 'HEAD' });
				if (res.status >= 400) {
					bad += 1;
					findings.add(res.status >= 500 ? 'critical' : 'warn', 'live', ['status', u], `HTTP ${res.status} di situs live`, { url: u });
				}
			} catch (e) {
				bad += 1;
				findings.add('warn', 'live', ['unreachable', u], `Tidak terjangkau: ${e.name === 'TimeoutError' ? 'timeout' : e.message}`, { url: u });
			}
		}
	}));
	metrics.live_urls_checked = sample.length;
	metrics.live_urls_bad = bad;
	metrics.geo_subset_score = checkScore(geo);
}

// -------------------------------------------------------------------- links ---
async function linkChecks() {
	const articles = publishedArticles();
	const usedBy = new Map(); // url -> slugs
	for (const a of articles) {
		for (const m of a.body.matchAll(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g)) {
			const url = m[1].replace(/[.,;]+$/, '');
			if (!usedBy.has(url)) usedBy.set(url, new Set());
			usedBy.get(url).add(a.slug);
		}
	}
	// One request per distinct URL across all articles, through the same verifier the gates use.
	const synthetic = [...usedBy.keys()].map((u) => `[x](${u})`).join('\n');
	const { errors, warnings, checked } = await verifyExternalLinks(synthetic, { concurrency: 4 });
	let dead = 0;
	for (const msg of errors) {
		const c = classifyLinkError(msg);
		if (!c) continue;
		if (c.dead) dead += 1;
		const slugs = [...(usedBy.get(c.url) ?? [])];
		findings.add(c.dead ? 'warn' : 'info', 'links', [c.dead ? 'dead' : 'refused', c.url], `${c.dead ? 'Tautan mati' : 'Tautan menolak pemeriksaan'} (HTTP ${c.status}): ${c.url}`, {
			detail: `Dipakai di: ${slugs.join(', ')}`,
			url: c.url,
		});
	}
	metrics.links_checked = checked;
	metrics.links_dead = dead;
	metrics.links_unreachable = warnings.length;
}

// ----------------------------------------------------------------- pipeline ---
async function pipelineChecks() {
	if (!process.env.SEO_REVIEW_TOKEN) {
		findings.add('critical', 'pipeline', ['erp-token-missing'], 'SEO_REVIEW_TOKEN tidak ada di env: publish berhenti');
	} else {
		try {
			await callErp(REVIEW_URL);
			metrics.erp_review_ok = 1;
		} catch (e) {
			metrics.erp_review_ok = 0;
			findings.add('critical', 'pipeline', ['erp-review-unavailable'], 'ERPSonus menolak atau tidak terjangkau: publish berhenti sampai ini beres', { detail: e.message });
		}
	}

	const store = loadStore();
	const stock = readyDrafts(store).length;
	metrics.pipeline_stock = stock;
	metrics.pipeline_pending = store.topics.filter((t) => t.status === 'pending').length;
	metrics.pipeline_failed = store.topics.filter((t) => t.status === 'failed').length;
	if (stock === 0) findings.add('critical', 'pipeline', ['stock-empty'], 'Tidak ada draf menunggu terbit');
	else if (stock < STOCK_WARN_BELOW) findings.add('warn', 'pipeline', ['stock-low'], `Stok draf tinggal ${stock} (di bawah ${STOCK_WARN_BELOW})`);
	if (metrics.pipeline_failed >= 3) findings.add('warn', 'pipeline', ['failed-topics'], `${metrics.pipeline_failed} topik berstatus failed`, { detail: 'Lihat lastError di data/topics.json dan data/failed/' });
	if (metrics.pipeline_pending === 0) findings.add('warn', 'pipeline', ['queue-empty'], 'Antrean topik pending habis: jalankan plan-topics');

	const held = process.env.PUBLISH_NOT_BEFORE && new Date(`${process.env.PUBLISH_NOT_BEFORE}T00:00:00Z`) > new Date();
	if (held) findings.add('info', 'pipeline', ['publish-held'], `Publish ditahan sampai ${process.env.PUBLISH_NOT_BEFORE} (PUBLISH_NOT_BEFORE)`);
	const dates = publishedArticles().map((a) => new Date(`${a.data.pubDate}T00:00:00Z`)).filter((d) => !Number.isNaN(d.getTime()));
	if (dates.length) {
		const newest = new Date(Math.max(...dates));
		const age = daysBetween(newest, new Date());
		metrics.days_since_last_publish = age;
		if (age > NO_PUBLISH_WARN_DAYS && !held) findings.add('warn', 'pipeline', ['no-recent-publish'], `Artikel terakhir terbit ${age} hari lalu`);
	}

	const fs = statfsSync('.');
	const usedPct = Math.round((1 - fs.bavail / fs.blocks) * 1000) / 10;
	metrics.disk_used_pct = usedPct;
	if (usedPct >= DISK_CRITICAL_PCT) findings.add('critical', 'pipeline', ['disk'], `Disk server ${usedPct}% terpakai`);
	else if (usedPct >= DISK_WARN_PCT) findings.add('warn', 'pipeline', ['disk'], `Disk server ${usedPct}% terpakai`);
}

// --------------------------------------------------------------------- main ---
const startedAt = new Date();
log(`audit-routine ${startedAt.toISOString()}${dryRun ? ' (dry run)' : ''}`);

await guard('content', contentChecks);
await guard('site', siteChecks);
if (!has('skip-live')) await guard('live', liveChecks);
if (!has('skip-links')) await guard('links', linkChecks);
await guard('pipeline', pipelineChecks);

const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).stdout.trim();
const report = buildReport({ runAt: startedAt, commit, findings: findings.list(), metrics });
const crit = findings.count('critical');
log(`\n${report.findings.length} temuan: ${crit} kritis, ${findings.count('warn')} peringatan, ${findings.count('info')} info`);

if (dryRun) {
	const rank = { critical: 0, warn: 1, info: 2 };
	for (const f of [...report.findings].sort((a, b) => rank[a.severity] - rank[b.severity]).slice(0, 60)) log(`  [${f.severity}] ${f.id} - ${f.title}`);
	if (report.findings.length > 60) log(`  ... dan ${report.findings.length - 60} lagi`);
	log(`\nmetrics: ${JSON.stringify(metrics)}`);
	process.exit(0);
}

mkdirSync('data/audit', { recursive: true });
const file = `data/audit/${startedAt.toISOString().slice(0, 10)}.json`;
writeFileSync(file, JSON.stringify(report, null, 2), 'utf8');
log(`salinan: ${file}`);

let sent = true;
try {
	const res = await callErp(`${new URL(REVIEW_URL).origin}/api/seo/audit-reports`, { method: 'POST', body: JSON.stringify(report) });
	log(`terkirim ke ERPSonus (run #${res.id})`);
} catch (e) {
	sent = false;
	console.error(`GAGAL mengirim ke ERPSonus: ${e.message}. Salinan lokal tetap ada di ${file}.`);
}
process.exit(crit > 0 || !sent ? 1 : 0);
