#!/usr/bin/env node
/**
 * Flag published articles that have gone stale.
 *
 *   npm run refresh                 # report, change nothing
 *   npm run refresh -- --months 9
 *
 * Reports only. It never edits an article and never sets `updatedDate`.
 *
 * Why it refuses to touch updatedDate.
 *
 * astro.config.mjs derives the sitemap's <lastmod> from `updatedDate ?? pubDate`,
 * and buildArticleSchema() derives `dateModified` the same way. Its comment
 * spells out the consequence: a sitemap claiming a page changed today while the
 * page's own schema says 2024 is a contradiction Google resolves by trusting
 * neither. A script that stamped `updatedDate` on every stale article would
 * claim a thousand revisions that never happened, which is worse than leaving
 * the dates honest.
 *
 * So `updatedDate` is set by a human, in the same commit that actually changes
 * the words. This script only answers "which articles are worth that effort".
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, splitFrontmatter, parseFrontmatter } from './lib/seo-rules.mjs';

const CONTENT_DIR = 'src/content/berita';

const argv = process.argv.slice(2);
const idx = argv.indexOf('--months');
const months = idx === -1 ? 6 : Number(argv[idx + 1]);

const cutoff = new Date();
cutoff.setMonth(cutoff.getMonth() - months);

const stale = [];
const thin = [];

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
	if (String(data.draft).toLowerCase() === 'true') continue;

	const dateStr = data.updatedDate || data.pubDate;
	const date = dateStr ? new Date(dateStr) : null;
	if (!date || Number.isNaN(date.valueOf())) continue;

	const seo = checkSeo({ title: data.title || '', focusKeyphrase: data.focusKeyphrase || '', body: split.body });
	const ageMonths = Math.round((Date.now() - date.valueOf()) / (1000 * 60 * 60 * 24 * 30));
	const row = { dir, date: dateStr.slice(0, 10), ageMonths, errors: seo.errors.length, words: seo.stats.wordCount ?? 0 };

	// Two separate reasons to revisit an article, reported separately because
	// they need different work: age needs fresher numbers, thinness needs a
	// rewrite. An article can be both.
	if (date < cutoff) stale.push(row);
	if (seo.errors.length > 0) thin.push(row);
}

stale.sort((a, b) => b.ageMonths - a.ageMonths);
thin.sort((a, b) => b.errors - a.errors);

const line = (r) => `  ${String(r.ageMonths).padStart(3)} bln  ${String(r.words).padStart(5)} kata  ${r.errors ? `${r.errors} isu  ` : '        '}${r.dir}`;

console.log(`\nrefresh-stale: ambang ${months} bulan (${cutoff.toISOString().slice(0, 10)})`);

if (stale.length) {
	console.log(`\n${stale.length} artikel lebih tua dari ${months} bulan:`);
	for (const r of stale.slice(0, 30)) console.log(line(r));
	if (stale.length > 30) console.log(`  ... dan ${stale.length - 30} lagi`);
} else {
	console.log('\nTidak ada artikel yang melewati ambang usia.');
}

if (thin.length) {
	console.log(`\n${thin.length} artikel gagal gate SEO saat ini:`);
	for (const r of thin.slice(0, 30)) console.log(line(r));
	if (thin.length > 30) console.log(`  ... dan ${thin.length - 30} lagi`);
	console.log('\n  Rinciannya: npm run check-seo -- <slug>');
}

console.log('\nSaat merevisi: ubah isinya, lalu SET updatedDate di commit yang sama.');
console.log('Jangan set updatedDate tanpa mengubah isi - sitemap lastmod dan');
console.log('dateModified ikut berubah, dan klaim revisi yang tidak terjadi');
console.log('membuat kedua sinyal itu tidak dapat dipercaya.\n');
