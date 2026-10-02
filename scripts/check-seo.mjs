#!/usr/bin/env node
/** SEO gate, companion to check-content.mjs: that one owns structure, this one owns writing. Drafts are skipped. Deliberately NOT wired into prebuild - a quality bar that can block a deploy gets disabled by someone who needs to ship. Scoped runs exist because the site's first 18 articles predate these rules. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';

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
		kind: kindFromTags(data.tags),
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
