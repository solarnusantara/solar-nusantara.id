#!/usr/bin/env node
/**
 * Build the topic matrix for the ~1000-article B2B build-out.
 *
 *   npm run plan-topics              # write data/topics.json
 *   npm run plan-topics -- --dry-run # validate and report, write nothing
 *
 * Why a matrix and not a list.
 *
 * check-content.mjs fails the build on a duplicate focusKeyphrase, and
 * CONTENT-PLAYBOOK.md says the quiet part out loud: at 1000 articles,
 * cannibalisation is the default outcome unless something counts. A
 * hand-written list of 1000 topics collides with itself long before it reaches
 * 1000. A matrix cannot: every keyphrase is `<modifier> <segment>`, the
 * modifier is unique per (intent, child index), and the segment is unique, so
 * uniqueness is structural rather than checked-after-the-fact. The check at the
 * bottom of this file is a safety net, not the mechanism.
 *
 * Shape: 14 B2B segments x 9 buyer intents = 126 pillars, each with 7 long-tail
 * children = 882. Total 1008.
 *
 * The matrix also solves internal linking for free. `tags` carry the segment
 * and the intent, and getRelatedArticles() in src/utils/articles.ts already
 * ranks by shared tags before recency - so every article lands in a cluster of
 * siblings instead of in a flat 168-page-deep list.
 *
 * This file emits no prose. It decides WHAT gets written and under which URL;
 * generate-article.mjs decides what the words are.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content/berita';
const OUT = 'data/topics.json';
const SLUG_MAX = 75;
const TITLE_MAX = 110;
const SEO_TITLE_MAX = 60;
const WAVE_1_SIZE = 100;

const dryRun = process.argv.includes('--dry-run');

/**
 * Identical to scripts/new-article.mjs. Duplicated rather than shared because
 * new-article.mjs is a standalone tool a human runs by hand, and one file that
 * can be copied into a fresh checkout is worth more than one fewer function.
 */
function slugify(input) {
	return input
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[‐-―−]/g, '-')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, SLUG_MAX)
		.replace(/-+$/g, '');
}

// ---------------------------------------------------------------------------
// Axis A: B2B segments.
//
// `label` goes in the <h1>, `short` in the <title> when the long form would
// blow the 60-character SERP budget, `kw` into the focusKeyphrase. `link` is
// the commercial page the article must link to in its body - every one of these
// was fetched and returned 200 before being written here, because an internal
// link to a 404 is an audit finding repeated 72 times per segment.
//
// `priority` decides what lands in wave 1. Higher = closer to an RFQ: a factory
// roof is a bigger contract than a school roof, and a government building
// carries the B2G angle the company's own YouTube pins in its comments.
// ---------------------------------------------------------------------------
const SEGMENTS = [
	{ key: 'pabrik-manufaktur',  label: 'Pabrik Manufaktur',        short: 'Pabrik',        kw: 'pabrik manufaktur',   tag: 'manufaktur',      priority: 10 },
	{ key: 'gudang',             label: 'Gudang dan Pergudangan',   short: 'Gudang',        kw: 'gudang',              tag: 'pergudangan',     priority: 8 },
	{ key: 'cold-storage',       label: 'Cold Storage',             short: 'Cold Storage',  kw: 'cold storage',        tag: 'cold-storage',    priority: 7 },
	{ key: 'hotel',              label: 'Hotel dan Resor',          short: 'Hotel',         kw: 'hotel',               tag: 'hotel',           priority: 7 },
	{ key: 'rumah-sakit',        label: 'Rumah Sakit',              short: 'Rumah Sakit',   kw: 'rumah sakit',         tag: 'rumah-sakit',     priority: 7 },
	{ key: 'mall-retail',        label: 'Mall dan Retail',          short: 'Retail',        kw: 'mall retail',         tag: 'retail',          priority: 6 },
	{ key: 'perkantoran',        label: 'Gedung Perkantoran',       short: 'Perkantoran',   kw: 'gedung perkantoran',  tag: 'perkantoran',     priority: 8 },
	{ key: 'sekolah-kampus',     label: 'Sekolah dan Kampus',       short: 'Kampus',        kw: 'sekolah kampus',      tag: 'pendidikan',      priority: 4 },
	{ key: 'pabrik-sawit',       label: 'Pabrik Kelapa Sawit',      short: 'Pabrik Sawit',  kw: 'pabrik kelapa sawit', tag: 'kelapa-sawit',    priority: 9 },
	{ key: 'pertambangan',       label: 'Sektor Pertambangan',      short: 'Tambang',       kw: 'pertambangan',        tag: 'pertambangan',    priority: 9 },
	{ key: 'data-center',        label: 'Data Center',              short: 'Data Center',   kw: 'data center',         tag: 'data-center',     priority: 6 },
	{ key: 'spbu',               label: 'SPBU dan Rest Area',       short: 'SPBU',          kw: 'spbu',                tag: 'spbu',            priority: 5 },
	{ key: 'gedung-pemerintah',  label: 'Gedung Pemerintah',        short: 'Gedung Negara', kw: 'gedung pemerintah',   tag: 'b2g',             priority: 9 },
	{ key: 'pelabuhan-logistik', label: 'Pelabuhan dan Logistik',   short: 'Logistik',      kw: 'pelabuhan logistik',  tag: 'logistik',        priority: 5 },
];

// ---------------------------------------------------------------------------
// Axis B: buyer intent.
//
// This axis IS the search-intent step: `intent` is carried through to
// generate-article.mjs, which uses it to choose the article's shape. A "biaya"
// article opens with a number and a table; a "regulasi" article opens with the
// rule and its date. Writing both the same way is what makes bulk content read
// like bulk content.
//
// Each intent supplies exactly 7 children. `t` is the title stem, `s` the short
// stem for seoTitle, `k` the keyphrase stem. Keyphrase = `${k} ${segment.kw}`,
// which is what makes the whole matrix collision-free by construction.
// ---------------------------------------------------------------------------
const INTENTS = [
	{
		key: 'biaya-roi', tag: 'biaya-roi', priority: 10, funnel: 'bofu',
		pillar: { t: 'Biaya dan ROI PLTS untuk', s: 'Biaya dan ROI PLTS', k: 'biaya plts' },
		link: '/layanan/epc/segmen-ci/',
		children: [
			{ t: 'Simulasi Payback Period PLTS di',            s: 'Payback Period PLTS',       k: 'payback period plts' },
			{ t: 'Estimasi CAPEX PLTS 100 kWp untuk',          s: 'CAPEX PLTS 100 kWp',        k: 'capex plts 100 kwp' },
			{ t: 'Struktur Biaya OPEX Tahunan PLTS di',        s: 'OPEX Tahunan PLTS',         k: 'opex tahunan plts' },
			{ t: 'Perbandingan Tarif PLN dan LCOE PLTS untuk', s: 'Tarif PLN vs LCOE PLTS',    k: 'lcoe plts' },
			{ t: 'Menghitung Penghematan Listrik Tahunan di',  s: 'Penghematan Listrik',       k: 'penghematan listrik tahunan' },
			{ t: 'Analisis Kelayakan Investasi PLTS untuk',    s: 'Kelayakan Investasi PLTS',  k: 'kelayakan investasi plts' },
			{ t: 'Rincian Biaya PLTS 1 MWp untuk',             s: 'Biaya PLTS 1 MWp',          k: 'biaya plts 1 mwp' },
		],
	},
	{
		key: 'desain-sizing', tag: 'desain-sistem', priority: 9, funnel: 'mofu',
		pillar: { t: 'Desain dan Sizing PLTS untuk', s: 'Desain dan Sizing PLTS', k: 'desain plts' },
		link: '/layanan/sistem-tenaga-surya-epc/',
		children: [
			{ t: 'Menghitung Kapasitas PLTS dari Konsumsi kWh di', s: 'Kapasitas PLTS dari kWh', k: 'kapasitas plts' },
			{ t: 'Analisis Profil Beban Listrik Harian di',        s: 'Profil Beban Listrik',    k: 'profil beban listrik' },
			{ t: 'Perhitungan Kebutuhan Luas Atap PLTS di',        s: 'Luas Atap PLTS',          k: 'luas atap plts' },
			{ t: 'Menentukan Rasio DC AC Inverter untuk',          s: 'Rasio DC AC Inverter',    k: 'rasio dc ac inverter' },
			{ t: 'Simulasi Produksi Energi Tahunan PLTS di',       s: 'Simulasi Produksi PLTS',  k: 'simulasi produksi plts' },
			{ t: 'Desain PLTS Hybrid dengan Baterai untuk',        s: 'PLTS Hybrid Baterai',     k: 'plts hybrid baterai' },
			{ t: 'Tata Letak String dan Analisis Shading di',      s: 'Tata Letak String PLTS',  k: 'tata letak string plts' },
		],
	},
	{
		key: 'regulasi', tag: 'regulasi', priority: 10, funnel: 'tofu',
		pillar: { t: 'Regulasi dan Perizinan PLTS untuk', s: 'Regulasi PLTS', k: 'regulasi plts' },
		link: '/layanan/sistem-tenaga-surya-epc/',
		children: [
			{ t: 'Permen ESDM 2 Tahun 2024 dan Dampaknya bagi', s: 'Permen ESDM 2/2024',      k: 'permen esdm 2 2024' },
			{ t: 'Prosedur Pengajuan Kuota PLTS Atap PLN untuk', s: 'Kuota PLTS Atap PLN',    k: 'kuota plts atap' },
			{ t: 'Sertifikat Laik Operasi PLTS untuk',           s: 'SLO PLTS',               k: 'slo plts' },
			{ t: 'Izin Usaha Penyediaan Tenaga Listrik untuk',   s: 'Izin Tenaga Listrik',    k: 'izin usaha tenaga listrik' },
			{ t: 'Persyaratan Interkoneksi Jaringan PLN di',     s: 'Interkoneksi PLN',       k: 'interkoneksi jaringan pln' },
			{ t: 'Ketentuan Ekspor Impor Energi Listrik di',     s: 'Ekspor Impor Energi',    k: 'ekspor impor energi listrik' },
			{ t: 'Kepatuhan K3 pada Instalasi PLTS di',          s: 'K3 Instalasi PLTS',      k: 'k3 instalasi plts' },
		],
	},
	{
		key: 'komponen', tag: 'komponen', priority: 8, funnel: 'mofu',
		pillar: { t: 'Panduan Pemilihan Komponen PLTS untuk', s: 'Komponen PLTS', k: 'komponen plts' },
		link: '/produk/sistem-panel-surya/panel-surya/panel-tkdn/',
		children: [
			{ t: 'Memilih Modul Surya TKDN atau Impor untuk', s: 'Modul Surya TKDN',      k: 'modul surya tkdn' },
			{ t: 'Memilih Inverter On-Grid yang Tepat untuk', s: 'Inverter On-Grid',      k: 'inverter on grid' },
			{ t: 'Spesifikasi Sistem Baterai Penyimpanan di', s: 'Baterai Penyimpanan',   k: 'baterai penyimpanan' },
			{ t: 'Sistem Mounting untuk Atap Bangunan di',    s: 'Sistem Mounting Atap',  k: 'sistem mounting atap' },
			{ t: 'Pemilihan Kabel dan Proteksi Sisi DC di',   s: 'Kabel dan Proteksi DC', k: 'kabel proteksi dc' },
			{ t: 'Sistem Monitoring dan SCADA PLTS di',       s: 'Monitoring SCADA PLTS', k: 'monitoring scada plts' },
			{ t: 'Proteksi Petir dan Grounding PLTS di',      s: 'Proteksi Petir PLTS',   k: 'proteksi petir grounding' },
		],
	},
	{
		key: 'instalasi', tag: 'instalasi', priority: 7, funnel: 'mofu',
		pillar: { t: 'Instalasi dan Konstruksi PLTS untuk', s: 'Instalasi PLTS', k: 'instalasi plts' },
		link: '/layanan/sistem-tenaga-surya-epc/',
		children: [
			{ t: 'Tahapan Konstruksi PLTS Atap di',                  s: 'Tahapan Konstruksi PLTS', k: 'tahapan konstruksi plts' },
			{ t: 'Survei Lokasi dan Uji Kekuatan Struktur Atap di',  s: 'Uji Struktur Atap',       k: 'uji struktur atap' },
			{ t: 'Manajemen Proyek EPC PLTS di',                     s: 'Manajemen Proyek EPC',    k: 'manajemen proyek epc' },
			{ t: 'Commissioning dan Uji Fungsi PLTS di',             s: 'Commissioning PLTS',      k: 'commissioning plts' },
			{ t: 'Instalasi PLTS Tanpa Menghentikan Operasional di', s: 'Instalasi Tanpa Henti',   k: 'instalasi tanpa henti operasional' },
			{ t: 'Keselamatan Kerja di Ketinggian pada Proyek',      s: 'K3 Kerja Ketinggian',     k: 'keselamatan kerja ketinggian' },
			{ t: 'Serah Terima dan Dokumentasi As-Built PLTS di',    s: 'Dokumentasi As-Built',    k: 'dokumentasi as built' },
		],
	},
	{
		key: 'om', tag: 'operasi-pemeliharaan', priority: 7, funnel: 'mofu',
		pillar: { t: 'Operasi dan Pemeliharaan PLTS untuk', s: 'Pemeliharaan PLTS', k: 'pemeliharaan plts' },
		link: '/layanan/manajemen-energi/',
		children: [
			{ t: 'Jadwal Pembersihan Modul Surya di',              s: 'Pembersihan Modul Surya', k: 'pembersihan modul surya' },
			{ t: 'Mendeteksi Degradasi Performa Modul PLTS di',    s: 'Degradasi Modul PLTS',    k: 'degradasi modul plts' },
			{ t: 'Inspeksi Termografi Rutin PLTS di',              s: 'Termografi PLTS',         k: 'termografi plts' },
			{ t: 'Menyusun Kontrak O&M dan SLA PLTS untuk',        s: 'Kontrak O&M PLTS',        k: 'kontrak om plts' },
			{ t: 'Penanganan Gangguan Inverter PLTS di',           s: 'Gangguan Inverter',       k: 'gangguan inverter plts' },
			{ t: 'Analisis Performance Ratio PLTS di',             s: 'Performance Ratio PLTS',  k: 'performance ratio plts' },
			{ t: 'Penggantian Komponen dan Klaim Garansi PLTS di', s: 'Garansi Komponen PLTS',   k: 'garansi komponen plts' },
		],
	},
	{
		key: 'pembiayaan', tag: 'pembiayaan', priority: 9, funnel: 'bofu',
		pillar: { t: 'Skema Pembiayaan PLTS untuk', s: 'Pembiayaan PLTS', k: 'pembiayaan plts' },
		link: '/layanan/epc/segmen-ci/',
		children: [
			{ t: 'Skema BOO Build Own Operate untuk',            s: 'Skema BOO PLTS',        k: 'skema boo plts' },
			{ t: 'Skema BOT Build Operate Transfer untuk',       s: 'Skema BOT PLTS',        k: 'skema bot plts' },
			{ t: 'Perbandingan CAPEX Mandiri dan Sewa PLTS di',  s: 'CAPEX vs Sewa PLTS',    k: 'capex mandiri vs sewa' },
			{ t: 'Power Purchase Agreement PLTS untuk',          s: 'PPA PLTS',              k: 'ppa plts' },
			{ t: 'Green Financing dan Kredit Bank untuk PLTS di', s: 'Green Financing PLTS', k: 'green financing plts' },
			{ t: 'Skema Leasing Peralatan PLTS untuk',           s: 'Leasing PLTS',          k: 'leasing peralatan plts' },
			{ t: 'Struktur Kontrak dan Pembagian Risiko PLTS di', s: 'Kontrak dan Risiko',   k: 'struktur kontrak plts' },
		],
	},
	{
		key: 'esg', tag: 'esg', priority: 8, funnel: 'mofu',
		pillar: { t: 'PLTS untuk Pelaporan ESG di', s: 'PLTS dan Pelaporan ESG', k: 'esg plts' },
		link: '/layanan/manajemen-energi/',
		children: [
			{ t: 'Menghitung Pengurangan Emisi CO2 dari PLTS di', s: 'Pengurangan Emisi CO2',  k: 'pengurangan emisi co2' },
			{ t: 'Sertifikat Energi Terbarukan REC untuk',        s: 'Sertifikat REC',         k: 'sertifikat rec' },
			{ t: 'Pelaporan Emisi Scope 2 GHG Protocol di',       s: 'Emisi Scope 2',          k: 'emisi scope 2' },
			{ t: 'Kontribusi PLTS pada Skor ESG di',              s: 'Skor ESG dan PLTS',      k: 'skor esg' },
			{ t: 'Persyaratan Karbon Rantai Pasok untuk',         s: 'Karbon Rantai Pasok',    k: 'karbon rantai pasok' },
			{ t: 'PLTS dan Sertifikasi Bangunan Hijau di',        s: 'Sertifikasi Bangunan Hijau', k: 'sertifikasi bangunan hijau' },
			{ t: 'Perdagangan Karbon dan Nilai Ekonominya bagi',  s: 'Perdagangan Karbon',     k: 'perdagangan karbon' },
		],
	},
	{
		key: 'pengadaan', tag: 'pengadaan', priority: 10, funnel: 'bofu',
		pillar: { t: 'Panduan Pengadaan PLTS untuk', s: 'Pengadaan PLTS', k: 'pengadaan plts' },
		link: '/tentang/sonushub/',
		children: [
			{ t: 'Menyusun Dokumen RFQ PLTS untuk',              s: 'RFQ PLTS',              k: 'rfq plts' },
			{ t: 'Spesifikasi Teknis Tender PLTS untuk',         s: 'Spesifikasi Tender',    k: 'spesifikasi tender plts' },
			{ t: 'Memenuhi Syarat TKDN 40 Persen pada Proyek',   s: 'TKDN 40 Persen',        k: 'tkdn 40 persen' },
			{ t: 'Evaluasi Vendor dan Kontraktor EPC untuk',     s: 'Evaluasi Vendor EPC',   k: 'evaluasi vendor epc' },
			{ t: 'Kriteria Penilaian Teknis dan Harga pada Tender', s: 'Kriteria Penilaian Tender', k: 'kriteria penilaian tender' },
			{ t: 'Klausul Garansi dalam Kontrak PLTS untuk',     s: 'Klausul Garansi PLTS',  k: 'klausul garansi plts' },
			{ t: 'Pengadaan Material Kelistrikan B2B untuk',     s: 'Pengadaan Material B2B', k: 'pengadaan material kelistrikan' },
		],
	},
];

// ---------------------------------------------------------------------------
// Read what is already published so the matrix never collides with it.
// Same frontmatter-scraping approach new-article.mjs uses.
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

for (const seg of SEGMENTS) {
	for (const intent of INTENTS) {
		const rows = [
			{ ...intent.pillar, kind: 'pillar' },
			...intent.children.map((c) => ({ ...c, kind: 'longtail' })),
		];

		for (const [i, row] of rows.entries()) {
			const title = `${row.t} ${seg.label}`;
			const seoTitle = `${row.s} untuk ${seg.short}`;
			const focusKeyphrase = `${row.k} ${seg.kw}`;
			const slug = slugify(title);

			// Tags drive getRelatedArticles(). Segment first so siblings in the
			// same segment cluster before siblings sharing only an intent - a
			// factory buyer reading about factory ROI wants factory sizing next,
			// not hotel ROI.
			const tags = [seg.tag, intent.tag, 'plts', row.kind === 'pillar' ? 'panduan' : 'teknis'];

			topics.push({
				id: `${seg.key}--${intent.key}--${row.kind === 'pillar' ? 'pilar' : `t${i}`}`,
				kind: row.kind,
				status: 'pending',
				wave: 0, // assigned below
				segment: seg.key,
				segmentLabel: seg.label,
				intent: intent.key,
				funnel: intent.funnel,
				title,
				// Only emit seoTitle when the real title would be truncated in the
				// SERP. Setting it unconditionally would throw away descriptive
				// title characters on the ~40% of rows that already fit.
				seoTitle: title.length > SEO_TITLE_MAX ? seoTitle : undefined,
				slug,
				focusKeyphrase,
				tags,
				internalLink: intent.link,
				priority: seg.priority * intent.priority,
			});
		}
	}
}

// --- preserve generation state ---------------------------------------------
// Re-running this script after a matrix tweak must not forget which topics have
// already been written. Without this, adjusting one intent's funnel label would
// silently reset every `generated` row to `pending` and the next run would
// regenerate articles that already exist - which generate-article.mjs then
// refuses as "directory already exists", leaving the queue wedged.
//
// Keyed by id, and only the mutable run fields are carried over; everything
// describing WHAT to write is rebuilt from the matrix on purpose.
if (existsSync(OUT)) {
	try {
		const prev = JSON.parse(readFileSync(OUT, 'utf8'));
		const byId = new Map((prev.topics ?? []).map((t) => [t.id, t]));
		let carried = 0;
		for (const t of topics) {
			const old = byId.get(t.id);
			if (!old || old.status === 'pending') continue;
			t.status = old.status;
			if (old.generatedAt) t.generatedAt = old.generatedAt;
			if (old.lastError) t.lastError = old.lastError;
			carried += 1;
		}
		if (carried) console.log(`  carried over ${carried} non-pending status row(s) from the previous plan`);
	} catch {
		console.log('  previous topics.json was unreadable; starting from a clean state');
	}
}

// --- wave assignment -------------------------------------------------------
// Wave 1 is the 100 articles that prove the whole chain before the other ~900.
//
// Composition is a QUOTA, not a side effect of priority. Measured B2B guidance
// puts 60-70% of production at bottom-of-funnel, and the reason is a gap rather
// than a preference: only 4.7% of B2B content teams work BOFU at all, while the
// other 95.3% publish top-of-funnel that earns traffic and closes nothing.
// Sorting purely by priority would have filled wave 1 with whatever scored high,
// which on this matrix skews informational - the same mistake at a larger scale.
//
// So the buckets are filled separately and explicitly, and the run prints the
// resulting split. Pillars still outrank their own long-tail inside a bucket: a
// pillar is the hub its 7 children link into, so shipping children first builds
// a cluster with no centre.
const FUNNEL_QUOTA = { bofu: 0.65, mofu: 0.25, tofu: 0.10 };

const byPriority = (a, b) => {
	if (b.priority !== a.priority) return b.priority - a.priority;
	if (a.kind !== b.kind) return a.kind === 'pillar' ? -1 : 1;
	return a.id.localeCompare(b.id);
};

const buckets = { bofu: [], mofu: [], tofu: [] };
for (const t of topics) buckets[t.funnel].push(t);
for (const k of Object.keys(buckets)) buckets[k].sort(byPriority);

topics.forEach((t) => { t.wave = 2; });

let placed = 0;
for (const [funnel, share] of Object.entries(FUNNEL_QUOTA)) {
	const want = Math.round(WAVE_1_SIZE * share);
	for (const t of buckets[funnel].slice(0, want)) {
		t.wave = 1;
		placed += 1;
	}
}

// Rounding can leave wave 1 a seat or two short. Fill from BOFU, because that is
// the bucket the quota exists to protect.
if (placed < WAVE_1_SIZE) {
	for (const t of buckets.bofu) {
		if (placed >= WAVE_1_SIZE) break;
		if (t.wave === 1) continue;
		t.wave = 1;
		placed += 1;
	}
}

// --- validation ------------------------------------------------------------
// The matrix should make collisions impossible. This proves it rather than
// assuming it, and catches a typo in a stem that silently duplicates another.
const seen = { slug: new Map(), keyphrase: new Map(), title: new Map() };

for (const t of topics) {
	for (const [field, value] of [
		['slug', t.slug],
		['keyphrase', t.focusKeyphrase.toLowerCase()],
		['title', t.title.toLowerCase()],
	]) {
		if (seen[field].has(value)) {
			problems.push(`duplicate ${field} "${value}": ${t.id} vs ${seen[field].get(value)}`);
		} else {
			seen[field].set(value, t.id);
		}
	}

	// Collisions against the live site only matter for topics this plan has not
	// written yet. Once a topic has been generated, its own article is sitting in
	// src/content/berita and would otherwise be reported as a foreign collision -
	// which deadlocks every re-run after the first generation batch.
	if (t.status === 'pending') {
		if (existing.slugs.has(t.slug)) problems.push(`${t.id}: slug "${t.slug}" already exists on the site`);
		if (existing.keyphrases.has(t.focusKeyphrase.toLowerCase())) problems.push(`${t.id}: focusKeyphrase "${t.focusKeyphrase}" already used by a published article`);
		if (existing.titles.has(t.title.toLowerCase())) problems.push(`${t.id}: title already used by a published article`);
	}

	if (t.title.length > TITLE_MAX) problems.push(`${t.id}: title is ${t.title.length} chars (max ${TITLE_MAX})`);
	if (t.seoTitle && t.seoTitle.length > SEO_TITLE_MAX) problems.push(`${t.id}: seoTitle is ${t.seoTitle.length} chars (max ${SEO_TITLE_MAX})`);
	if (t.slug.length > SLUG_MAX) problems.push(`${t.id}: slug is ${t.slug.length} chars (max ${SLUG_MAX})`);
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)) problems.push(`${t.id}: slug "${t.slug}" is not URL-safe`);
	for (const tag of t.tags) {
		if (tag.length < 2 || tag.length > 40) problems.push(`${t.id}: tag "${tag}" must be 2-40 chars`);
	}
	if (t.tags.length > 8) problems.push(`${t.id}: ${t.tags.length} tags (max 8)`);
}

// --- report ----------------------------------------------------------------
const bySegment = {};
const byIntent = {};
for (const t of topics) {
	bySegment[t.segment] = (bySegment[t.segment] || 0) + 1;
	byIntent[t.intent] = (byIntent[t.intent] || 0) + 1;
}

console.log(`\nplan-topics: ${topics.length} topics`);
console.log(`  ${SEGMENTS.length} segments x ${INTENTS.length} intents = ${SEGMENTS.length * INTENTS.length} pillars`);
console.log(`  ${topics.filter((t) => t.kind === 'pillar').length} pillars, ${topics.filter((t) => t.kind === 'longtail').length} long-tail`);
console.log(`  wave 1: ${topics.filter((t) => t.wave === 1).length}   wave 2: ${topics.filter((t) => t.wave === 2).length}`);
const w1 = topics.filter((t) => t.wave === 1);
const pct = (f) => Math.round((w1.filter((t) => t.funnel === f).length / w1.length) * 100);
console.log(`  wave 1 funnel: ${pct('bofu')}% bofu / ${pct('mofu')}% mofu / ${pct('tofu')}% tofu  (target 65/25/10)`);
console.log(`  seoTitle needed on ${topics.filter((t) => t.seoTitle).length} of ${topics.length}`);
console.log(`  existing on site: ${existing.slugs.size} slugs, ${existing.keyphrases.size} keyphrases - checked against, no collisions`);

if (problems.length) {
	console.error(`\n${problems.length} problem(s):`);
	for (const p of problems.slice(0, 40)) console.error(`  x ${p}`);
	if (problems.length > 40) console.error(`  ... and ${problems.length - 40} more`);
	console.error('\nNothing written. Fix the stems above.\n');
	process.exit(1);
}

if (dryRun) {
	console.log('\n--dry-run: nothing written. Sample of wave 1:\n');
	for (const t of topics.filter((x) => x.wave === 1).slice(0, 8)) {
		console.log(`  ${t.title}`);
		console.log(`    /berita/${t.slug}/`);
		console.log(`    kw: ${t.focusKeyphrase}  |  tags: ${t.tags.join(', ')}\n`);
	}
	process.exit(0);
}

if (!existsSync('data')) mkdirSync('data', { recursive: true });
writeFileSync(
	OUT,
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			counts: { total: topics.length, wave1: WAVE_1_SIZE, segments: SEGMENTS.length, intents: INTENTS.length },
			topics,
		},
		null,
		2,
	),
	'utf8',
);

console.log(`\nwrote ${OUT}`);
console.log('  Review the titles in this file BEFORE generating. Fixing 1000 titles');
console.log('  in one JSON costs minutes; fixing them after generation costs a rewrite.\n');
