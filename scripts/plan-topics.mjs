#!/usr/bin/env node
/**
 * Build the topic matrix for the B2B material-buyer articles.
 *
 *   npm run plan-topics              # write data/topics.json
 *   npm run plan-topics -- --dry-run # validate and report, write nothing
 *   npm run plan-topics -- --retry-failed
 *
 * What the articles are for. They live on solar-nusantara.id and exist to send buyers to
 * https://sonushub.id/. The 8 products below are exactly what SonusHUB sells (mounting rail,
 * walkway and tray, DC cable, AC cable, PV, inverter, maintenance and cleaning, project), and
 * each topic carries the SonusHUB page its article must link to (lib/sonushub.mjs).
 *
 * Who the articles are for. SonusHUB sells MATERIAL (mounting rails, PV modules,
 * walkway and cable tray, inverters, cables) to businesses that buy it for a
 * project or a plant: EPC contractors, renewable developers, MEP contractors,
 * manufacturers, industrial estates, government projects. The reader is a
 * procurement lead, project manager or C-level, not a building owner asking
 * "should my hotel go solar". The previous matrix (14 building types x 9 intents)
 * wrote for the second reader; this one writes for the first.
 *
 * Shape: 8 products x 7 buyers = 56 pillars, each with 4 long-tail children = 280.
 * That is deliberate. Publishing is 4 a week, so 280 topics is ~70 weeks of
 * content; a 1000-topic plan would be four years of queue and a promise nobody
 * can keep. Add products or buyers here when the first batches show what works.
 *
 * Uniqueness is structural: keyphrase = `<stem> <buyer.kw>`, and a stem is unique
 * per (product, angle). The check near the bottom is the safety net.
 *
 * What stays OUT of this file on purpose: prospect names, target values per
 * segment and payment terms. They sit in an internal spreadsheet and describe
 * how the company sells, not what the reader is searching for. Only the shape of
 * the market (who buys, what they buy, in what proportion) shaped the weights.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { containsLoose } from './lib/seo-rules.mjs';
import { SONUSHUB_PRODUCT } from './lib/sonushub.mjs';

const CONTENT_DIR = 'src/content/berita';
const OUT = 'data/topics.json';
const SLUG_MAX = 75;
const TITLE_MAX = 110;
const SEO_TITLE_MAX = 60;
const GROUP = 4; // one weekly review batch

const dryRun = process.argv.includes('--dry-run');
const retryFailed = process.argv.includes('--retry-failed');

/** Same as scripts/new-article.mjs (kept apart so that file stays standalone) except the cap: it cuts at a word, because `...-untuk-kontraktor-ep` is a URL someone has to read. */
function slugify(input) {
	return input
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[‐-―−]/g, '-')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(new RegExp(`^(.{1,${SLUG_MAX}})(?:-.*)?$`), '$1');
}

// ---------------------------------------------------------------------------
// Axis A: who is buying. `priority` follows how much of the sales plan the group
// carries and how close it is to a purchase order: EPC contractors and developers
// are the largest and the closest, manufacturers next, then estates, government,
// MEP, and commercial property.
// ---------------------------------------------------------------------------
const BUYERS = [
	{ key: 'epc',              label: 'Kontraktor EPC PLTS',          short: 'Kontraktor EPC',    kw: 'kontraktor epc',               tag: 'epc',              priority: 10 },
	{ key: 'developer',        label: 'Developer Energi Terbarukan',  short: 'Developer EBT',     kw: 'developer energi terbarukan',  tag: 'developer',        priority: 10 },
	{ key: 'manufaktur',       label: 'Industri Manufaktur',          short: 'Manufaktur',        kw: 'industri manufaktur',          tag: 'manufaktur',       priority: 9 },
	{ key: 'kawasan-industri', label: 'Pengelola Kawasan Industri',   short: 'Kawasan Industri',  kw: 'kawasan industri',             tag: 'kawasan-industri', priority: 8 },
	{ key: 'pemerintah',       label: 'Proyek Pemerintah',            short: 'Proyek Pemerintah', kw: 'proyek pemerintah',            tag: 'b2g',              priority: 7 },
	{ key: 'mep',              label: 'Kontraktor MEP',               short: 'Kontraktor MEP',   kw: 'kontraktor mep',               tag: 'kontraktor-mep',   priority: 7 },
	{ key: 'properti',         label: 'Properti Komersial',           short: 'Properti Komersial', kw: 'properti komersial',          tag: 'properti-komersial', priority: 6 },
];

// ---------------------------------------------------------------------------
// Axis B: what is bought. `priority` follows each category's share of sales.
// `link` is the page the article must link to in its body; every one returned 200
// on the live site before being written here.
//
// Each product has one pillar and four long-tail angles. The angle drives the
// article's shape in generate-article.mjs and, with the product, the thumbnail
// illustration - so a 'perbandingan' article about mounting reads and looks
// different from a 'pengadaan' one.
//
// rows: [angle, title stem, short stem for seoTitle, keyphrase stem]
// ---------------------------------------------------------------------------
const PRODUCTS = [
	{
		key: 'mounting-rel', tag: 'mounting', priority: 10,
		rows: [
			['panduan',      'Panduan Memilih Mounting Rel PLTS untuk',               'Memilih Mounting Rel PLTS',      'mounting rel plts'],
			['spesifikasi',  'Spesifikasi Teknis Mounting Rel Atap PLTS untuk',       'Spesifikasi Mounting Rel',       'spesifikasi mounting rel'],
			['perbandingan', 'Perbandingan Mounting Rel Aluminium dan Baja Galvanis untuk', 'Mounting Aluminium vs Galvanis', 'mounting rel aluminium galvanis'],
			['pengadaan',    'Checklist Pengadaan Mounting Rel PLTS untuk',           'Pengadaan Mounting Rel',         'pengadaan mounting rel'],
			['mutu',         'Standar Beban Angin dan Uji Tarik Mounting Rel untuk',  'Beban Angin Mounting Rel',       'beban angin mounting rel'],
		],
	},
	{
		key: 'pv-modul', tag: 'modul-surya', priority: 9,
		rows: [
			['panduan',      'Panduan Memilih Modul Surya untuk',                     'Memilih Modul Surya',            'modul surya'],
			['spesifikasi',  'Membaca Datasheet dan Spesifikasi Modul Surya untuk',   'Datasheet Modul Surya',          'datasheet modul surya'],
			['perbandingan', 'Perbandingan Modul Surya TOPCon dan PERC untuk',        'Modul Surya TOPCon vs PERC',     'modul surya topcon perc'],
			['pengadaan',    'Checklist Pengadaan Modul Surya Skala Besar untuk',     'Pengadaan Modul Surya',          'pengadaan modul surya'],
			['mutu',         'Syarat TKDN dan Sertifikasi Modul Surya untuk',         'TKDN Modul Surya',               'tkdn modul surya'],
		],
	},
	{
		key: 'walkway-tray', tag: 'walkway-cable-tray', priority: 6,
		rows: [
			['panduan',      'Panduan Memilih Walkway dan Cable Tray PLTS untuk',     'Walkway dan Cable Tray PLTS',    'walkway cable tray plts'],
			['spesifikasi',  'Spesifikasi Cable Tray dan Walkway Atap PLTS untuk',    'Spesifikasi Cable Tray',         'spesifikasi cable tray'],
			['perbandingan', 'Perbandingan Cable Tray Perforated dan Ladder untuk',   'Cable Tray Perforated vs Ladder', 'cable tray perforated ladder'],
			['pengadaan',    'Checklist Pengadaan Walkway dan Cable Tray untuk',      'Pengadaan Walkway dan Tray',     'pengadaan walkway cable tray'],
			['mutu',         'Standar Galvanis dan Ketahanan Korosi Cable Tray untuk', 'Galvanis Cable Tray',           'galvanis cable tray'],
		],
	},
	{
		key: 'inverter', tag: 'inverter', priority: 5,
		rows: [
			['panduan',      'Panduan Memilih Inverter PLTS untuk',                   'Memilih Inverter PLTS',          'inverter plts'],
			['spesifikasi',  'Spesifikasi Inverter On-Grid yang Wajib Dicek untuk',   'Spesifikasi Inverter On-Grid',   'spesifikasi inverter on grid'],
			['perbandingan', 'Perbandingan Inverter String dan Central untuk',        'Inverter String vs Central',     'inverter string central'],
			['pengadaan',    'Checklist Pengadaan dan Garansi Inverter PLTS untuk',   'Garansi Inverter PLTS',          'garansi inverter plts'],
			['mutu',         'Standar Proteksi dan Sertifikasi Inverter untuk',       'Sertifikasi Inverter',           'sertifikasi inverter'],
		],
	},
	{
		key: 'kabel-dc', tag: 'kabel-dc', priority: 3,
		rows: [
			['panduan',      'Panduan Memilih Kabel Solar DC PLTS untuk',                    'Memilih Kabel Solar DC',       'kabel solar dc plts'],
			['spesifikasi',  'Spesifikasi Kabel Solar DC PV1-F untuk',                       'Spesifikasi Kabel Solar DC', 'spesifikasi kabel solar dc'],
			['perbandingan', 'Perbandingan Kabel Solar DC dan Kabel NYY untuk',             'Kabel Solar DC vs NYY',        'kabel solar dc nyy'],
			['pengadaan',    'Checklist Pengadaan Kabel Solar DC dan Konektor MC4 untuk',   'Pengadaan Kabel Solar DC',     'pengadaan kabel solar dc'],
			['mutu',         'Standar dan Ketahanan UV Kabel Solar DC untuk',               'Standar Kabel Solar DC',       'standar kabel solar dc'],
		],
	},
	{
		key: 'kabel-ac', tag: 'kabel-ac', priority: 3,
		rows: [
			['panduan',      'Panduan Memilih Kabel AC PLTS untuk',                         'Memilih Kabel AC PLTS',        'kabel ac plts'],
			['spesifikasi',  'Spesifikasi Kabel AC NYY dan NYA PLTS untuk',                 'Spesifikasi Kabel AC',         'spesifikasi kabel ac nyy nya'],
			['perbandingan', 'Perbandingan Kabel AC Tembaga dan Aluminium untuk',           'Kabel AC Tembaga vs Aluminium', 'kabel ac tembaga aluminium'],
			['pengadaan',    'Checklist Pengadaan Kabel AC PLTS untuk',                     'Pengadaan Kabel AC',           'pengadaan kabel ac'],
			['mutu',         'Standar SNI dan Kapasitas Hantar Arus Kabel AC untuk',        'Standar Kabel AC',             'standar kabel ac'],
		],
	},
	{
		key: 'perawatan', tag: 'perawatan', priority: 4,
		rows: [
			['panduan',      'Panduan Pembersihan dan Perawatan PLTS untuk',          'Pembersihan dan Perawatan PLTS', 'pembersihan perawatan plts'],
			['spesifikasi',  'Spesifikasi Layanan Pembersihan Panel Surya untuk',     'Layanan Pembersihan Panel',      'layanan pembersihan panel surya'],
			['perbandingan', 'Perbandingan Pembersihan Manual dan Robotik untuk', 'Pembersihan Manual vs Robotik', 'pembersihan manual robotik'],
			['pengadaan',    'Checklist Kontrak Perawatan dan SLA PLTS untuk',        'Kontrak Perawatan PLTS',         'kontrak perawatan plts'],
			['mutu',         'Indikator Kinerja Perawatan PLTS untuk',                'Indikator Perawatan PLTS',       'indikator kinerja perawatan'],
		],
	},
	{
		key: 'proyek', tag: 'proyek-epc', priority: 5,
		rows: [
			['panduan',      'Panduan Pengadaan Material Proyek EPC PLTS untuk',      'Material Proyek EPC PLTS',       'material proyek epc plts'],
			['spesifikasi',  'Menyusun Bill of Materials Proyek PLTS untuk',          'Bill of Materials PLTS',         'bill of materials plts'],
			['perbandingan', 'Perbandingan Pengadaan Paket Material dan Turnkey untuk', 'Paket Material vs Turnkey', 'pengadaan paket material turnkey'],
			['pengadaan',    'Manajemen Jadwal Pengiriman Material Proyek PLTS untuk', 'Jadwal Pengiriman Material',    'jadwal pengiriman material plts'],
			['mutu',         'Dokumen Serah Terima dan Datasheet Proyek PLTS untuk',  'Dokumen Serah Terima PLTS',      'dokumen serah terima plts'],
		],
	},
];

for (const p of PRODUCTS) if (!SONUSHUB_PRODUCT[p.key]) throw new Error(`product "${p.key}" has no SonusHUB page in lib/sonushub.mjs`);

// ---------------------------------------------------------------------------
// What is already on the site, so the matrix never collides with it.
// ---------------------------------------------------------------------------
function readExisting() {
	const keyphrases = new Set();
	const slugs = new Set();
	const titles = new Set();
	let dirs = [];
	try {
		dirs = readdirSync(CONTENT_DIR);
	} catch {
		return { keyphrases, slugs, titles };
	}
	for (const d of dirs) {
		slugs.add(d);
		try {
			const raw = readFileSync(join(CONTENT_DIR, d, 'index.md'), 'utf8');
			const kp = raw.match(/^focusKeyphrase\s*:\s*["']?([^"'\n]+)/m);
			if (kp) keyphrases.add(kp[1].trim().toLowerCase());
			const ti = raw.match(/^title\s*:\s*["']?([^"'\n]+)/m);
			if (ti) titles.add(ti[1].trim().toLowerCase());
		} catch {
			/* not an article directory */
		}
	}
	return { keyphrases, slugs, titles };
}

// ---------------------------------------------------------------------------
// Build.
// ---------------------------------------------------------------------------
const existing = readExisting();
const topics = [];
const problems = [];

for (const buyer of BUYERS) {
	for (const product of PRODUCTS) {
		for (const [angle, t, s, k] of product.rows) {
			const pillar = angle === 'panduan';
			const title = `${t} ${buyer.label}`;
			const seoTitle = `${s} untuk ${buyer.short}`;

			topics.push({
				id: `${buyer.key}--${product.key}--${angle}`,
				kind: pillar ? 'pillar' : 'longtail',
				status: 'pending',
				rank: 0, // assigned below
				buyer: buyer.key,
				buyerLabel: buyer.label,
				product: product.key,
				angle,
				title,
				// Only when the real title would be truncated in the SERP; setting it everywhere would throw away descriptive title characters on the titles that already fit.
				seoTitle: title.length > SEO_TITLE_MAX ? seoTitle : undefined,
				slug: slugify(title),
				focusKeyphrase: `${k} ${buyer.kw}`,
				// Tags drive RelatedArticles: buyer first so a contractor reading about mounting is offered the same buyer's modules next, not another buyer's mounting.
				tags: [buyer.tag, product.tag, 'pengadaan-material', pillar ? 'panduan' : 'teknis'],
				sonushubLink: SONUSHUB_PRODUCT[product.key],
				priority: buyer.priority * product.priority,
			});
		}
	}
}

// --- carry over state ---------------------------------------------------------
// Rows from the previous plan survive only if they already produced an article. A
// pending row of the old matrix is simply dropped; a generated one becomes
// `legacy`: still on disk, still visible to the tools, but never in the review queue
// and never published by the schedule.
if (existsSync(OUT)) {
	try {
		const prev = JSON.parse(readFileSync(OUT, 'utf8'));
		const newIds = new Set(topics.map((t) => t.id));
		const byId = new Map((prev.topics ?? []).map((t) => [t.id, t]));
		let carried = 0;
		let retired = 0;

		for (const t of topics) {
			const old = byId.get(t.id);
			if (!old || old.status === 'pending') continue;
			if (retryFailed && old.status === 'failed') continue;
			t.status = old.status;
			for (const f of ['generatedAt', 'lastError', 'reviewNote', 'approvedAt', 'publishedAt']) if (old[f]) t[f] = old[f];
			carried += 1;
		}

		for (const old of prev.topics ?? []) {
			if (newIds.has(old.id)) continue;
			if (old.status === 'generated' || old.status === 'legacy') {
				topics.push({ ...old, status: 'legacy', legacy: true, rank: 0 });
				retired += 1;
			}
		}
		if (carried) console.log(`  carried over ${carried} non-pending row(s) from the previous plan`);
		if (retired) console.log(`  ${retired} article(s) of the old matrix kept as status "legacy" (on disk, out of the queue)`);
	} catch {
		console.log('  previous topics.json was unreadable; starting from a clean state');
	}
}

// --- rank: the order articles are written in ----------------------------------
// Priority decides what comes first. Inside every group of four - one weekly review
// batch and, a week later, one week of publishing - the product and the buyer must
// differ, because four articles on one product for one buyer in a week is the
// pattern that reads as bulk to a human reviewer as much as to a crawler.
const live = topics.filter((t) => !t.legacy);
const queue = live
	.filter((t) => t.status === 'pending')
	.sort((a, b) => b.priority - a.priority || (a.kind === b.kind ? 0 : a.kind === 'pillar' ? -1 : 1) || a.id.localeCompare(b.id));

let rank = 0;
while (queue.length) {
	const group = [queue.shift()];
	for (const strict of [true, false]) {
		for (let i = 0; i < queue.length && group.length < GROUP; ) {
			const c = queue[i];
			const clash = group.some((g) => g.product === c.product || (strict && g.buyer === c.buyer));
			if (clash) i += 1;
			else group.push(queue.splice(i, 1)[0]);
		}
	}
	for (const t of group) t.rank = (rank += 1);
	// A group that could not reach GROUP distinct rows (the tail of the queue) keeps whatever it has.
}

// --- validation ---------------------------------------------------------------
const seen = { slug: new Map(), keyphrase: new Map(), title: new Map() };

for (const t of live) {
	for (const [field, value] of [
		['slug', t.slug],
		['keyphrase', t.focusKeyphrase.toLowerCase()],
		['title', t.title.toLowerCase()],
	]) {
		if (seen[field].has(value)) problems.push(`duplicate ${field} "${value}": ${t.id} vs ${seen[field].get(value)}`);
		else seen[field].set(value, t.id);
	}

	// A topic that already produced its article would otherwise collide with itself.
	if (t.status === 'pending') {
		if (existing.slugs.has(t.slug)) problems.push(`${t.id}: slug "${t.slug}" already exists on the site`);
		if (existing.keyphrases.has(t.focusKeyphrase.toLowerCase())) problems.push(`${t.id}: focusKeyphrase "${t.focusKeyphrase}" already used by a published article`);
		if (existing.titles.has(t.title.toLowerCase())) problems.push(`${t.id}: title already used by a published article`);
	}

	// Title and keyphrase are both decided here, so a mismatch is an unwritable topic, not a bad article: it burned three DeepSeek calls each on 112 rows of the previous plan.
	if (!containsLoose(t.title, t.focusKeyphrase)) {
		const have = new Set(t.title.toLowerCase().split(/[^a-z0-9]+/));
		const missing = t.focusKeyphrase.split(/\s+/).filter((w) => !have.has(w.toLowerCase()));
		problems.push(`${t.id}: title is missing keyphrase token(s) ${missing.map((w) => `"${w}"`).join(', ')} - unwritable by construction`);
	}

	if (t.title.length > TITLE_MAX) problems.push(`${t.id}: title is ${t.title.length} chars (max ${TITLE_MAX})`);
	if (t.seoTitle && t.seoTitle.length > SEO_TITLE_MAX) problems.push(`${t.id}: seoTitle is ${t.seoTitle.length} chars (max ${SEO_TITLE_MAX})`);
	if (t.slug.length > SLUG_MAX) problems.push(`${t.id}: slug is ${t.slug.length} chars (max ${SLUG_MAX})`);
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)) problems.push(`${t.id}: slug "${t.slug}" is not URL-safe`);
	if (t.tags.length > 8) problems.push(`${t.id}: ${t.tags.length} tags (max 8)`);
}

// --- report -------------------------------------------------------------------
const count = (rows, f) => rows.reduce((m, t) => m.set(t[f], (m.get(t[f]) || 0) + 1), new Map());
const pending = live.filter((t) => t.status === 'pending');

console.log(`\nplan-topics: ${live.length} topics (${BUYERS.length} buyers x ${PRODUCTS.length} products = ${BUYERS.length * PRODUCTS.length} pillars, ${live.filter((t) => t.kind === 'pillar').length} pillars + ${live.filter((t) => t.kind === 'longtail').length} long-tail)`);
console.log(`  ${pending.length} pending = ~${Math.ceil(pending.length / GROUP)} weekly batches of ${GROUP}`);
console.log(`  seoTitle needed on ${live.filter((t) => t.seoTitle).length} of ${live.length}`);
console.log(`  existing on site: ${existing.slugs.size} slugs, ${existing.keyphrases.size} keyphrases - checked against`);
console.log('\n  first 3 batches (rank order):');
for (const t of pending.sort((a, b) => a.rank - b.rank).slice(0, GROUP * 3)) {
	console.log(`${(t.rank - 1) % GROUP === 0 ? '  --' : '    '} #${String(t.rank).padStart(2)} ${t.buyer.padEnd(16)} ${t.product.padEnd(13)} ${t.angle.padEnd(12)} ${t.title}`);
}

if (problems.length) {
	console.error(`\n${problems.length} problem(s):`);
	for (const p of problems.slice(0, 40)) console.error(`  x ${p}`);
	if (problems.length > 40) console.error(`  ... and ${problems.length - 40} more`);
	console.error('\nNothing written. Fix the stems above.\n');
	process.exit(1);
}

if (dryRun) {
	console.log('\n--dry-run: nothing written.\n');
	process.exit(0);
}

if (!existsSync('data')) mkdirSync('data', { recursive: true });
writeFileSync(
	OUT,
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			counts: { total: live.length, buyers: BUYERS.length, products: PRODUCTS.length, batchSize: GROUP },
			topics,
		},
		null,
		2,
	),
	'utf8',
);
console.log(`\nwrote ${OUT}`);
console.log('  Read the titles BEFORE the first batch is generated; fixing 280 titles in one JSON costs minutes.\n');
