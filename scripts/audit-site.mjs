#!/usr/bin/env node
/**
 * Post-build site audit for solar-nusantara.id.
 *
 * Crawls dist/ the way Ahrefs or Semrush crawls a live site, but at build time
 * and for free. It reads the generated HTML rather than the source, so it sees
 * what Googlebot sees - including problems no source-level check can find, like
 * an internal link pointing at a URL the router never generated.
 *
 * Checks, in the order a site audit reports them:
 *   4xx internal links     a link whose target is not in dist/
 *   redirect links         an internal link that lands on a redirect page
 *   duplicate title        two URLs sharing one <title>
 *   duplicate description  two URLs sharing one meta description
 *   missing title/desc     empty or absent
 *   title length           over 60 characters truncates in the SERP
 *   H1 count               zero, or more than one
 *   image alt              <img> with no alt, or alt=""
 *   orphan pages           in the sitemap but with no inbound internal link
 *   sitemap coverage       a built page missing from the sitemap, or vice versa
 *   canonical              absent, or disagreeing with the page's own URL
 *   structured data        unparseable JSON-LD, or an Article missing a field
 *                          Google documents as required
 *
 * Reports only. It never fails the build - a warning here is a judgement call,
 * unlike check-content.mjs which blocks on things that are unambiguously wrong.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = 'https://solar-nusantara.id';

if (!existsSync(DIST)) {
	console.error('audit-site: no dist/ directory. Run the build first.');
	process.exit(0);
}

// ---------------------------------------------------------------- collect ---
function walk(dir, out = []) {
	for (const e of readdirSync(dir)) {
		const p = join(dir, e);
		if (statSync(p).isDirectory()) walk(p, out);
		else out.push(p);
	}
	return out;
}

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

/** dist/berita/foo/index.html -> /berita/foo/ */
function toUrlPath(file) {
	let p = '/' + relative(DIST, file).split(sep).join('/');
	if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
	return p;
}

/** The 404 page is never crawled as a URL, so it is not audited as one. */
const isErrorPage = (p) => p === '/404.html' || p === '/404/';

/** A noindex page (the /pratinjau/ draft previews) is kept out of search on purpose: a valid link target, but not audited as a page. */
const isNoindex = (html) => /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

const pages = new Map();
const noindexPages = [];
for (const f of htmlFiles) {
	const p = toUrlPath(f);
	if (isErrorPage(p)) continue;
	const html = readFileSync(f, 'utf8');
	// Astro's redirect stubs are noindex too; they stay in, for the redirect checks.
	if (isNoindex(html) && !/http-equiv=["']refresh["']/i.test(html)) noindexPages.push(p);
	else pages.set(p, html);
}

/** Every path that resolves to a real file, in both slash forms. */
const known = new Set();
for (const p of [...pages.keys(), ...noindexPages]) {
	known.add(p);
	if (p.endsWith('/') && p !== '/') known.add(p.slice(0, -1));
}
for (const f of files) {
	if (f.endsWith('.html')) continue;
	known.add('/' + relative(DIST, f).split(sep).join('/'));
}

/** Pages that are redirect stubs, so a link into one is a link to a redirect. */
const redirectPages = new Set();
for (const [p, html] of pages) {
	if (/http-equiv=["']refresh["']/i.test(html)) redirectPages.add(p);
}

const findings = [];
const add = (kind, detail) => findings.push({ kind, detail });

const attr = (tag, name) => {
	const m = tag.match(new RegExp(name + '\\s*=\\s*["\']([^"\']*)["\']', 'i'));
	return m ? m[1] : null;
};
const meta = (html, name) => {
	const m = html.match(
		new RegExp('<meta[^>]+name=["\']' + name + '["\'][^>]*>', 'i'),
	);
	return m ? attr(m[0], 'content') : null;
};

// -------------------------------------------------------------- per page ---
const titles = new Map();
const descriptions = new Map();
const inbound = new Map();
for (const p of pages.keys()) inbound.set(p, 0);

for (const [url, html] of pages) {
	const isRedirectStub = redirectPages.has(url);

	// --- title / description ---
	const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
	const title = titleMatch ? titleMatch[1].trim() : '';
	const desc = (meta(html, 'description') || '').trim();

	if (!isRedirectStub) {
		if (!title) add('missing-title', url);
		else {
			if (title.length > 60)
				add('title-too-long', `${url} (${title.length} chars) "${title}"`);
			const prev = titles.get(title);
			if (prev) add('duplicate-title', `"${title}" on ${prev} and ${url}`);
			else titles.set(title, url);
		}

		if (!desc) add('missing-description', url);
		else {
			const prev = descriptions.get(desc);
			if (prev)
				add('duplicate-description', `${prev} and ${url} share a description`);
			else descriptions.set(desc, url);
		}

		// --- H1 ---
		const h1s = html.match(/<h1\b[^>]*>/gi) || [];
		if (h1s.length === 0) add('missing-h1', url);
		else if (h1s.length > 1) add('multiple-h1', `${url} has ${h1s.length}`);

		// --- canonical ---
		const canonTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
		if (!canonTag) add('missing-canonical', url);
		else {
			const href = attr(canonTag[0], 'href') || '';
			const expected = SITE + url;
			if (href !== expected)
				add('canonical-mismatch', `${url} -> ${href} (expected ${expected})`);
		}

		// --- images ---
		for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
			const alt = attr(tag, 'alt');
			if (alt === null) add('img-no-alt-attr', `${url} :: ${tag.slice(0, 80)}`);
			else if (!alt.trim()) add('img-empty-alt', `${url} :: ${tag.slice(0, 80)}`);
		}

		// --- structured data ---
		for (const m of html.matchAll(
			/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
		)) {
			let parsed;
			try {
				parsed = JSON.parse(m[1]);
			} catch (e) {
				add('jsonld-invalid', `${url}: ${e.message}`);
				continue;
			}
			const nodes = parsed['@graph'] || [parsed];
			for (const node of nodes) {
				if (!node || typeof node !== 'object') continue;
				const type = node['@type'];
				if (type === 'BlogPosting' || type === 'Article' || type === 'NewsArticle') {
					for (const field of ['headline', 'datePublished', 'author', 'publisher']) {
						if (!node[field]) add('article-schema-missing', `${url}: ${type}.${field}`);
					}
					if (node.headline && node.headline.length > 110)
						add(
							'headline-too-long',
							`${url}: ${node.headline.length} chars (Google documents 110)`,
						);
				}
			}
		}
	}

	// --- links ---
	// Script bodies are stripped first. SearchBar.astro builds result rows with
	// a JS template literal containing `<a href="${item.url}">`, and scanning
	// raw HTML reported that placeholder as a broken link on every page.
	const linkHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
	for (const tag of linkHtml.match(/<a\b[^>]*>/gi) || []) {
		const href = attr(tag, 'href');
		if (!href) continue;
		if (/^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(href)) continue;

		const clean = href.split('#')[0].split('?')[0];
		if (!clean) continue;

		const target = clean.startsWith('/')
			? clean
			: new URL(clean, 'http://x' + url).pathname;

		if (!known.has(target) && !known.has(target.replace(/\/$/, ''))) {
			add('broken-internal-link', `${url} -> ${href}`);
			continue;
		}

		const norm = target.endsWith('/') ? target : target + '/';
		if (redirectPages.has(norm) || redirectPages.has(target)) {
			add('link-to-redirect', `${url} -> ${href}`);
		}
		if (!isRedirectStub && inbound.has(norm) && norm !== url) {
			inbound.set(norm, inbound.get(norm) + 1);
		}
	}
}

// ----------------------------------------------------------- sitemap ------
const sitemapUrls = new Set();
for (const f of files.filter((f) => /sitemap.*\.xml$/.test(f))) {
	const xml = readFileSync(f, 'utf8');
	for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
		const u = m[1].trim();
		if (u.endsWith('.xml')) continue;
		sitemapUrls.add(new URL(u).pathname);
	}
}

for (const url of pages.keys()) {
	if (redirectPages.has(url)) {
		if (sitemapUrls.has(url))
			add('redirect-in-sitemap', `${url} is a redirect but is listed in the sitemap`);
		continue;
	}
	if (!sitemapUrls.has(url)) add('not-in-sitemap', url);
}
for (const url of sitemapUrls) {
	if (!pages.has(url)) add('sitemap-404', `${url} is in the sitemap but was not built`);
}

// ------------------------------------------------------------- orphans ----
for (const [url, count] of inbound) {
	if (count > 0) continue;
	if (url === '/' || redirectPages.has(url)) continue;
	add('orphan-page', `${url} has no inbound internal link`);
}

// -------------------------------------------------------------- report ----
const order = [
	'broken-internal-link',
	'sitemap-404',
	'jsonld-invalid',
	'article-schema-missing',
	'duplicate-title',
	'duplicate-description',
	'missing-title',
	'missing-description',
	'missing-h1',
	'multiple-h1',
	'missing-canonical',
	'canonical-mismatch',
	'link-to-redirect',
	'redirect-in-sitemap',
	'orphan-page',
	'not-in-sitemap',
	'img-no-alt-attr',
	'img-empty-alt',
	'headline-too-long',
	'title-too-long',
];

const grouped = new Map();
for (const f of findings) {
	if (!grouped.has(f.kind)) grouped.set(f.kind, []);
	grouped.get(f.kind).push(f.detail);
}

console.log(`\naudit-site: ${pages.size} pages, ${redirectPages.size} redirects, ${noindexPages.length} noindex (not audited)\n`);

if (findings.length === 0) {
	console.log('  no findings\n');
} else {
	for (const kind of order) {
		const items = grouped.get(kind);
		if (!items) continue;
		console.log(`  ${kind} (${items.length})`);
		for (const d of items.slice(0, 12)) console.log(`      ${d}`);
		if (items.length > 12) console.log(`      ... and ${items.length - 12} more`);
		console.log('');
	}
	for (const [kind, items] of grouped) {
		if (order.includes(kind)) continue;
		console.log(`  ${kind} (${items.length})`);
		for (const d of items.slice(0, 12)) console.log(`      ${d}`);
		console.log('');
	}
	console.log(`  ${findings.length} findings total\n`);
}
