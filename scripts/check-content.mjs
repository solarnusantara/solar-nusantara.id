#!/usr/bin/env node
/**
 * Pre-build content gate for solar-nusantara.id.
 *
 * Runs as `prebuild`, so `npm run build` cannot succeed with content that would
 * ship a defect. Everything checked here is something that actually went wrong
 * on this site, not a hypothetical:
 *
 *   - slug hygiene       three live URLs carried an en dash or a " copy"
 *                        suffix, because the slug is the directory name and
 *                        nothing validated it
 *   - currency vs math   remark-math paired "$100 per watt ... mendekati $1"
 *                        into one inline formula and shipped "100perwatt" to
 *                        readers on two articles
 *   - duplicate keyphrase  two articles targeting one query is cannibalisation
 *                        by definition; at 1000 articles it is the default
 *                        outcome unless something counts
 *   - duplicate title/description  the classic Ahrefs/Semrush site-audit errors
 *   - body image alt     an <img>/![]() with no alt text
 *   - hero image         a published article with no heroImage, a missing file, or no alt
 *
 * Exit code 1 on any error. Warnings do not block.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';

const CONTENT_DIR = 'src/content/berita';
const errors = [];
const warnings = [];

const err = (slug, msg) => errors.push(`${slug}: ${msg}`);
const warn = (slug, msg) => warnings.push(`${slug}: ${msg}`);

/** Frontmatter parse good enough for `key: value` and `key: [a, b]`. */
function parseFrontmatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	const data = {};
	for (const line of m[1].split(/\r?\n/)) {
		const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
		if (!kv) continue;
		let v = kv[2].trim();
		if (
			(v.startsWith('"') && v.endsWith('"')) ||
			(v.startsWith("'") && v.endsWith("'"))
		) {
			v = v.slice(1, -1);
		}
		data[kv[1]] = v;
	}
	return { data, body: raw.slice(m[0].length) };
}

/**
 * A slug that is safe in a URL forever: lowercase ASCII, digits and single
 * hyphens. Anything else either percent-encodes in the address bar or silently
 * collapses (an en dash vanished and left `pv--bagian-1`).
 */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const dirs = readdirSync(CONTENT_DIR).filter((d) =>
	statSync(join(CONTENT_DIR, d)).isDirectory(),
);

const drafts = [];
const seenKeyphrase = new Map();
const seenTitle = new Map();
const seenDescription = new Map();

for (const dir of dirs) {
	const file = join(CONTENT_DIR, dir, 'index.md');
	let raw;
	try {
		raw = readFileSync(file, 'utf8');
	} catch {
		err(dir, 'no index.md in the article directory');
		continue;
	}

	const parsed = parseFrontmatter(raw);
	if (!parsed) {
		err(dir, 'frontmatter block is missing or malformed');
		continue;
	}
	const { data, body } = parsed;
	const slug = data.slug || dir;

	// Structural rules below apply to every article. Publish-readiness rules -
	// description length, keyphrase uniqueness, image alt - are skipped for
	// drafts, matching the superRefine in src/content/config.ts. A draft that is
	// allowed to be incomplete is the whole point of the flag; it just has to
	// pass everything the moment `draft: true` comes off.
	const isDraft = String(data.draft).toLowerCase() === 'true';

	// --- slug -------------------------------------------------------------
	if (!SLUG_RE.test(slug)) {
		err(
			dir,
			`slug "${slug}" is not URL-safe. Use lowercase a-z, 0-9 and single hyphens. ` +
				`The directory name becomes the URL, so an en dash, a space or a "copy" ` +
				`suffix ships straight to production.`,
		);
	}
	if (/\bcopy\b/i.test(slug)) {
		err(dir, `slug contains "copy" - rename the directory before publishing`);
	}
	if (slug.length > 75) {
		warn(dir, `slug is ${slug.length} chars; keep it under ~75 for readable URLs`);
	}

	if (isDraft) {
		drafts.push(dir);
		continue;
	}

	// --- currency vs math -------------------------------------------------
	const currency = body.match(/(?<!\\)\$(?=\d)/g);
	if (currency) {
		err(
			dir,
			`${currency.length} unescaped "$" before a digit. remark-math reads these ` +
				`as inline math delimiters and swallows the text between two of them. ` +
				`Write \\$100, not $100.`,
		);
	}

	// --- titles and descriptions -----------------------------------------
	const title = data.title || '';
	const serpTitle = data.seoTitle || title;
	if (serpTitle.length > 60) {
		warn(
			dir,
			`SERP title is ${serpTitle.length} chars and will be truncated. ` +
				`Add a seoTitle of 60 or fewer characters; the <h1> can stay long.`,
		);
	}
	const desc = data.description || '';
	if (desc.length < 70 || desc.length > 160) {
		err(dir, `description is ${desc.length} chars; must be 70-160`);
	}

	// A live article must have its hero, and the file must exist: the schema only
	// sees this at astro build, after the commit was already made.
	if (!data.heroImage) {
		err(dir, 'no heroImage; a published article needs one (keep it draft: true until it has one)');
	} else if (!existsSync(join(CONTENT_DIR, dir, data.heroImage))) {
		err(dir, `heroImage file missing: ${data.heroImage}`);
	} else if (!data.heroImageAlt) {
		err(dir, 'heroImage is set but heroImageAlt is empty');
	}

	for (const [map, value, label] of [
		[seenTitle, title.toLowerCase(), 'title'],
		[seenDescription, desc.toLowerCase(), 'description'],
		[seenKeyphrase, (data.focusKeyphrase || '').toLowerCase(), 'focusKeyphrase'],
	]) {
		if (!value) continue;
		if (map.has(value)) {
			err(
				dir,
				`duplicate ${label} - already used by "${map.get(value)}". ` +
					(label === 'focusKeyphrase'
						? 'Two articles targeting one query compete with each other in the SERP.'
						: 'Duplicate metadata is a site-audit error.'),
			);
		} else {
			map.set(value, dir);
		}
	}

	if (!data.focusKeyphrase) {
		warn(dir, 'no focusKeyphrase - it is what the cannibalisation check compares');
	}

	// --- body images ------------------------------------------------------
	for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
		if (!m[1].trim()) err(dir, `markdown image with empty alt: ${m[2]}`);
	}
	for (const m of body.matchAll(/<img\b[^>]*>/g)) {
		if (!/\balt\s*=\s*["'][^"']+["']/.test(m[0])) {
			err(dir, `<img> with no alt attribute: ${m[0].slice(0, 70)}`);
		}
	}

	// --- heading structure ------------------------------------------------
	// The layout renders the title as the page's only <h1>. A second one in the
	// body gives the page two competing top-level headings.
	const h1s = body.match(/^# (?!#)/gm);
	if (h1s) {
		err(
			dir,
			`${h1s.length} "# " heading(s) in the body. The layout already renders ` +
				`the title as the <h1>; use "## " and below inside the article.`,
		);
	}
}

const label = (n, s) => `${n} ${s}${n === 1 ? '' : 's'}`;
console.log(
	`\ncheck-content: ${dirs.length} articles scanned` +
		(drafts.length ? `, ${drafts.length} skipped as draft` : ''),
);
if (drafts.length) {
	console.log(`  drafts (not published, not checked): ${drafts.join(', ')}`);
}

if (warnings.length) {
	console.log(`\n${label(warnings.length, 'warning')}:`);
	for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length) {
	console.error(`\n${label(errors.length, 'error')}:`);
	for (const e of errors) console.error(`  x ${e}`);
	console.error('\nBuild stopped. Fix the errors above.\n');
	process.exit(1);
}
console.log('no errors\n');
