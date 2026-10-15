#!/usr/bin/env node
/**
 * Generate the shared illustration library with the OpenAI image API.
 *
 *   npm run illustrations                              # estimate only, calls nothing
 *   npm run illustrations -- --only pabrik-manufaktur,komponen--t1,biaya-roi --yes   # the 3-image style test
 *   npm run illustrations -- --yes                     # every missing illustration
 *   npm run illustrations -- --only gudang --force --yes   # re-roll one
 *   npm run illustrations -- --sheet                   # contact sheet at data/review/illustrations.html
 *
 * Requires OPENAI_API_KEY in the environment. Run it on a laptop, once: the
 * server never needs the key, because thumbnails are composed from this library
 * by script and no per-article image call exists.
 *
 * The cost is fixed by the manifest (~50 images), not by the article count, which
 * is why nothing here runs per article. It also does not spend without being
 * told to: no --yes prints the estimate and stops.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { record, spentToday } from './lib/spend-guard.mjs';

/**
 * Ceilings that --yes cannot raise. The default run is ~$0.11, so these are far above any
 * intended use and far below a mistake (--quality high --force on every image, run twice).
 * Raise them in this file, on purpose, when the manifest really grows.
 */
const MAX_RUN_USD = 1;
const DAILY_USD_CAP = 2;
/** An image that has not come back by now is abandoned (and charged as if it had been made). */
const FETCH_TIMEOUT_MS = 120_000;

const MANIFEST = 'data/illustrations.json';
const OUT_DIR = 'data/illustrations';
const COST_LOG = 'data/image-cost.log';
const SHEET = 'data/review/illustrations.html';

const MODEL = 'gpt-image-1-mini';
const SIZE = '1024x1024';
const MAX_HTTP_RETRIES = 2;

/**
 * Per-image USD at 1024x1024. UNCONFIRMED: OpenAI publishes no per-image table for
 * mini, so these are output tokens (272 / 1056 / 4160) x $8 per million. Check the
 * pricing page; the estimate below is only as good as these numbers.
 */
const PRICE = { low: 0.0022, medium: 0.0084, high: 0.0333 };
const OUTPUT_USD_PER_TOKEN = 8 / 1e6;

/**
 * One preamble for every prompt is what makes 50 separate generations read as one
 * set. "No text" is load-bearing: the title, subtitle and logo are composed by
 * script, and a model-drawn word inside the illustration would be wrong Indonesian.
 */
const STYLE =
	'Flat vector illustration in a clean isometric three-quarter view. Solid flat colors, no gradients, ' +
	'no shadows, no outlines. Palette: solar panels medium blue (#4A7DB5) with lighter blue cells, frames and ' +
	'metal light gray (#C9CDD2), buildings in soft white and pale gray, small accents in brand blue (#1A7FC4) and ' +
	'warm yellow (#F2B01E). Pure white background (#FFFFFF), the subject centered with generous empty margin. ' +
	'Absolutely no text, letters, numbers, logos or watermarks, and no people or faces.';

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const flag = (n, d = null) => {
	const i = argv.indexOf(`--${n}`);
	return i === -1 ? d : argv[i + 1];
};

const quality = flag('quality', 'low');
const only = flag('only') ? flag('only').split(',').map((s) => s.trim()).filter(Boolean) : null;
const maxImages = Number(flag('max', '50'));
const force = has('force');

if (!(quality in PRICE)) {
	console.error(`--quality must be one of ${Object.keys(PRICE).join(', ')}, got "${quality}"`);
	process.exit(1);
}

const { items } = JSON.parse(readFileSync(MANIFEST, 'utf8'));

// A malformed manifest is cheaper to find now than after 30 paid calls.
const seen = new Set();
for (const it of items) {
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/.test(it.key)) {
		console.error(`bad key "${it.key}"`);
		process.exit(1);
	}
	if (seen.has(it.key)) {
		console.error(`duplicate key "${it.key}"`);
		process.exit(1);
	}
	seen.add(it.key);
	if (!it.subject || !it.alt || it.alt.length < 10) {
		console.error(`"${it.key}" needs a subject and an alt of at least 10 characters`);
		process.exit(1);
	}
}

const fileFor = (key) => join(OUT_DIR, `${key}.webp`);

// --- contact sheet ----------------------------------------------------------
if (has('sheet')) {
	const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
	const cards = items
		.map((it) =>
			existsSync(fileFor(it.key))
				? `<figure><img src="../illustrations/${esc(it.key)}.webp" alt="${esc(it.alt)}"><figcaption><b>${esc(it.key)}</b><br>${esc(it.alt)}</figcaption></figure>`
				: `<figure class="missing"><figcaption><b>${esc(it.key)}</b><br>belum digenerate</figcaption></figure>`,
		)
		.join('\n');
	mkdirSync('data/review', { recursive: true });
	writeFileSync(
		SHEET,
		`<!doctype html><meta charset="utf-8"><title>Illustrations</title>
<style>body{font:14px system-ui;margin:16px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
figure{margin:0;border:1px solid #ddd;padding:8px}img{width:100%;display:block}figcaption{font-size:12px;margin-top:6px}.missing{background:#f6f6f6;color:#888}</style>
<main>${cards}</main>`,
		'utf8',
	);
	console.log(`wrote ${SHEET} (${items.filter((i) => existsSync(fileFor(i.key))).length}/${items.length} present)`);
	process.exit(0);
}

// --- selection --------------------------------------------------------------
if (only) {
	const unknown = only.filter((k) => !seen.has(k));
	if (unknown.length) {
		console.error(`not in the manifest: ${unknown.join(', ')}`);
		process.exit(1);
	}
}

const todo = items
	.filter((it) => (only ? only.includes(it.key) : true))
	.filter((it) => force || !existsSync(fileFor(it.key)))
	.slice(0, maxImages);

const estimate = todo.length * PRICE[quality];
console.log(`\nillustrations: ${todo.length} to generate (${items.length - todo.length} skipped: present or filtered)`);
console.log(`  model ${MODEL}, ${SIZE}, quality ${quality}`);
console.log(`  estimated cost: $${estimate.toFixed(3)}  (per-image price is unconfirmed; see PRICE in this file)`);

if (todo.length === 0) process.exit(0);

const spent = spentToday('openai');
if (estimate > MAX_RUN_USD) {
	console.error(`\n  REFUSED: $${estimate.toFixed(3)} is over the per-run ceiling of $${MAX_RUN_USD} (MAX_RUN_USD). Narrow it with --only or --max.\n`);
	process.exit(1);
}
if (spent + estimate > DAILY_USD_CAP) {
	console.error(`\n  REFUSED: $${spent.toFixed(3)} already spent today (UTC) + $${estimate.toFixed(3)} would pass the daily cap of $${DAILY_USD_CAP} (DAILY_USD_CAP).\n`);
	process.exit(1);
}

if (!has('yes')) {
	console.log('\n  nothing called. Re-run with --yes to spend it.\n');
	process.exit(0);
}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
	console.error('OPENAI_API_KEY is not set. Locally: export OPENAI_API_KEY=... (never commit it)');
	process.exit(1);
}

// --- api --------------------------------------------------------------------
async function generate(prompt) {
	for (let attempt = 0; ; attempt++) {
		let res;
		try {
			res = await fetch('https://api.openai.com/v1/images/generations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
				signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
				body: JSON.stringify({ model: MODEL, prompt, size: SIZE, quality, n: 1, output_format: 'png' }),
			});
		} catch (e) {
			// The request went out and nothing came back: it may still have been made, and billed.
			if (e.name === 'TimeoutError') record('openai', PRICE[quality], 'timeout');
			throw e;
		}
		if (res.ok) return res.json();
		// Only transport-level failures retry. A bad picture is a human's call, and a
		// retry loop that re-rolls on its own is how a $0.20 job becomes a $2 one.
		const retryable = res.status === 429 || res.status >= 500;
		if (!retryable || attempt >= MAX_HTTP_RETRIES) {
			throw new Error(`HTTP ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`);
		}
		await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
	}
}

mkdirSync(OUT_DIR, { recursive: true });
let ok = 0;
let outTokens = 0;

for (const it of todo) {
	process.stdout.write(`  ${it.key} ... `);
	try {
		const json = await generate(`${STYLE}\n\nSubject: ${it.subject}.`);
		const b64 = json?.data?.[0]?.b64_json;
		if (!b64) throw new Error('response had no image data');

		await sharp(Buffer.from(b64, 'base64')).webp({ quality: 90, effort: 6 }).toFile(fileFor(it.key));

		const u = json.usage ?? {};
		outTokens += u.output_tokens ?? 0;
		record('openai', u.output_tokens ? u.output_tokens * OUTPUT_USD_PER_TOKEN : PRICE[quality], it.key);
		appendFileSync(
			COST_LOG,
			`${new Date().toISOString()}\t${it.key}\t${MODEL}\t${quality}\tin=${u.input_tokens ?? '?'}\tout=${u.output_tokens ?? '?'}\n`,
			'utf8',
		);
		ok += 1;
		console.log(`ok  (out ${u.output_tokens ?? '?'} tok)`);
	} catch (e) {
		// Stop on the first failure: an auth or quota error repeats 49 more times otherwise.
		console.log('FAILED');
		console.error(`\n${e.message}\n`);
		break;
	}
}

console.log(`\nillustrations: ${ok}/${todo.length} written to ${OUT_DIR}`);
if (outTokens) console.log(`  actual output: ${outTokens} tokens = $${(outTokens * OUTPUT_USD_PER_TOKEN).toFixed(4)} (plus prompt tokens; see ${COST_LOG})`);
console.log('  Review: npm run illustrations -- --sheet\n');
process.exit(ok === todo.length ? 0 : 1);
