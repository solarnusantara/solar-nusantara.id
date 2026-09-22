#!/usr/bin/env node
/**
 * SEO gate for solar-nusantara.id. Companion to scripts/check-content.mjs.
 *
 *   npm run check-seo                      # every published article
 *   npm run check-seo -- <slug> [slug...]  # only these, by directory name
 *
 * Scoping matters. These rules were written after the site's first 18 articles
 * existed, and those 18 do not meet them - they run 206-600 words with no
 * internal links. That is a backlog to improve, not a reason to block every
 * future publish, so publish-drip.mjs passes only the slugs in its own batch.
 * A bare run still reports the whole site, which is how the backlog stays
 * visible instead of quietly becoming the standard.
 *
 * Division of labour, so the two gates never argue:
 *   check-content.mjs  structure   slug shape, description length, duplicate
 *                                  metadata, unescaped `$`, `#` in body, alt text
 *   check-seo.mjs      writing     keyword placement and density, readability,
 *                                  internal and external linking, article length
 *
 * Drafts are skipped, exactly as check-content.mjs skips them. A draft is
 * allowed to be incomplete; the rules apply the moment `draft: true` comes off.
 *
 * This is deliberately NOT wired into `prebuild`. check-content.mjs blocks the
 * build because everything it catches ships a visible defect. An SEO rule is a
 * quality bar, and a quality bar that can block a deploy will eventually be
 * disabled by someone who needs to ship. It runs in the generation loop, where
 * failing is free, and on demand.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, splitFrontmatter, parseFrontmatter } from './lib/seo-rules.mjs';

const CONTENT_DIR = 'src/content/berita';
const only = new Set(process.argv.slice(2).filter((a) => !a.startsWith('--')));

const dirs = readdirSync(CONTENT_DIR)
	.filter((d) => statSync(join(CONTENT_DIR, d)).isDirectory())
	.filter((d) => only.size === 0 || only.has(d));

if (only.size > 0) {
	const missing = [...only].filter((s) => !dirs.includes(s));
	if (missing.length) {
		console.error(`no article directory named: ${missing.join(', ')}`);
		process.exit(1);
	}
}

let errorCount = 0;
let warnCount = 0;
let checked = 0;
let skipped = 0;
const failing = [];

for (const dir of dirs) {
	let raw;
	try {
		raw = readFileSync(join(CONTENT_DIR, dir, 'index.md'), 'utf8');
	} catch {
		continue; // check-content.mjs owns the "no index.md" error
	}

	const split = splitFrontmatter(raw);
	if (!split) continue; // likewise for malformed frontmatter

	const data = parseFrontmatter(split.frontmatter);
	if (String(data.draft).toLowerCase() === 'true') {
		skipped += 1;
		continue;
	}

	checked += 1;
	const { errors, warnings, stats } = checkSeo({
		title: data.title || '',
		focusKeyphrase: data.focusKeyphrase || '',
		body: split.body,
	});

	if (errors.length || warnings.length) {
		console.log(`\n${dir}`);
		if (stats.wordCount !== undefined) {
			console.log(
				`  ${stats.wordCount} words | ${stats.h2s} h2 | kw x${stats.occurrences} (${stats.density}%) | ` +
					`${stats.internalLinks} internal | ${stats.externalTrusted} trusted external`,
			);
		}
		for (const e of errors) console.log(`  x ${e}`);
		for (const w of warnings) console.log(`  ! ${w}`);
	}

	if (errors.length) failing.push(dir);
	errorCount += errors.length;
	warnCount += warnings.length;
}

const plural = (n, s) => `${n} ${s}${n === 1 ? '' : 's'}`;
console.log(
	`\ncheck-seo: ${plural(checked, 'article')} checked` +
		(skipped ? `, ${skipped} skipped as draft` : ''),
);

if (errorCount) {
	console.error(
		`\n${plural(errorCount, 'error')} across ${plural(failing.length, 'article')}: ${failing.join(', ')}\n`,
	);
	process.exit(1);
}
console.log(warnCount ? `no errors, ${plural(warnCount, 'warning')}\n` : 'no errors\n');
