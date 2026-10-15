#!/usr/bin/env node
/**
 * Article thumbnails from the illustration library. No API call. See lib/thumbnail.mjs.
 *
 *   npm run thumbnails -- --slug <slug>        # preview to data/review/, touches no article
 *   npm run thumbnails -- --write              # hero.webp + frontmatter, every article without a hero
 *   npm run thumbnails -- --write --slug <slug>
 *   npm run thumbnails -- --check-all          # every title in topics.json: overflow, picture coverage, render time
 *
 * generate-article.mjs already gives each new draft its hero, so --write is for backfilling and repair.
 * Rows without a product (the previous matrix, status "legacy") are skipped: they have no picture mapping.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { TITLE_SIZES, manifest, articleFile, readArticle, compose, fitTitle, pickIllustration, writeHero } from './lib/thumbnail.mjs';

const OUT_DIR = 'data/review';

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const flag = (n) => {
	const i = argv.indexOf(`--${n}`);
	return i === -1 ? null : argv[i + 1];
};

const topics = JSON.parse(readFileSync('data/topics.json', 'utf8')).topics.filter((t) => t.product);

async function runWrite() {
	const only = flag('slug');
	const targets = topics.filter((t) => (only ? t.slug === only : true)).filter((t) => existsSync(articleFile(t.slug)));
	if (only && targets.length === 0) {
		console.error(`"${only}" is not an article of the current plan with a directory under drafts/berita or src/content/berita`);
		process.exit(1);
	}

	let written = 0;
	let skipped = 0;
	const failed = [];
	const started = Date.now();

	for (const topic of targets) {
		try {
			const r = await writeHero(topic);
			if (r.written) {
				written += 1;
				if (!r.fit.fits) console.log(`  WARN  ${topic.slug}: title overflows even at ${r.fit.size}px`);
			} else skipped += 1;
		} catch (e) {
			failed.push(`${topic.slug}: ${e.message}`);
		}
	}

	console.log(`thumbnails: ${written} written, ${skipped} already had a hero, ${failed.length} failed  (${((Date.now() - started) / 1000).toFixed(1)}s)`);
	for (const f of failed.slice(0, 10)) console.error(`  x ${f}`);
	process.exit(failed.length ? 1 : 0);
}

async function runPreview() {
	const slug = flag('slug');
	const topic = topics.find((t) => t.slug === slug);
	if (!topic) {
		console.error(`"${slug}" is not in the current plan (data/topics.json), so there is no product/angle to pick a picture from.`);
		process.exit(1);
	}
	const { data } = readArticle(slug);
	const out = await compose(topic, data.title, data.description);
	mkdirSync(OUT_DIR, { recursive: true });
	const file = join(OUT_DIR, `thumb-${slug}.webp`);
	writeFileSync(file, out.webp);
	console.log(`${file}  (${(out.webp.length / 1024).toFixed(0)} KB)  illustration: ${out.key}  title: ${out.fit.size}px${out.clipped ? '  subtitle clipped' : ''}`);
}

/** Titles come from the plan, so this runs before a single article exists. Descriptions do not exist yet, so the subtitle is covered by construction (it is always cut to fit) rather than tested. */
async function runCheckAll() {
	const sizes = new Map();
	const overflow = [];
	const noPicture = [];
	const pictures = new Map();

	const t0 = Date.now();
	for (const t of topics) {
		const key = pickIllustration(t);
		if (!key) noPicture.push(t.id);
		else pictures.set(key, (pictures.get(key) || 0) + 1);

		const fit = await fitTitle(t.title);
		sizes.set(fit.size, (sizes.get(fit.size) || 0) + 1);
		if (!fit.fits) overflow.push(`${t.id}  (${t.title.length} chars)  ${t.title}`);
	}

	console.log(`\ncheck-all: ${topics.length} titles measured in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
	console.log('  title size used:');
	for (const [size, n] of [...sizes].sort((a, b) => b[0] - a[0])) console.log(`    ${size}px  ${String(n).padStart(4)}`);
	console.log(`  titles that overflow even at ${TITLE_SIZES.at(-1)}px: ${overflow.length}`);
	for (const o of overflow.slice(0, 15)) console.log(`    x ${o}`);
	console.log(`  topics with no illustration: ${noPicture.length}`);
	for (const id of noPicture.slice(0, 10)) console.log(`    x ${id}`);

	const used = [...pictures].sort((a, b) => b[1] - a[1]);
	console.log(`  illustrations in use: ${used.length}; busiest ${used[0][0]} x${used[0][1]}, quietest ${used.at(-1)[0]} x${used.at(-1)[1]}`);

	const N = Number(flag('render') ?? 24);
	const filler = 'Penjelasan lengkap tentang rincian biaya, perhitungan teknis, dan langkah praktis yang perlu dipahami pengambil keputusan bisnis sebelum memulai proyek.'.slice(0, 160);
	const step = Math.max(1, Math.floor(topics.length / N));
	const sample = topics.filter((_, i) => i % step === 0).slice(0, N);
	let bytes = 0;
	const r0 = Date.now();
	for (const t of sample) bytes += (await compose(t, t.title, filler)).webp.length;
	const perMs = (Date.now() - r0) / sample.length;
	console.log(`\n  full render, ${sample.length} sampled: ${perMs.toFixed(0)} ms each, avg ${(bytes / sample.length / 1024).toFixed(0)} KB`);
	console.log(`  projected for ${topics.length}: ~${((perMs * topics.length) / 60000).toFixed(1)} min, ~${((bytes / sample.length) * topics.length / 1048576).toFixed(0)} MB`);

	process.exit(overflow.length || noPicture.length ? 1 : 0);
}

if (has('check-all')) await runCheckAll();
else if (has('write')) await runWrite();
else if (flag('slug')) await runPreview();
else {
	console.error('usage: make-thumbnails.mjs --check-all | --write [--slug S] | --slug S');
	process.exit(1);
}
