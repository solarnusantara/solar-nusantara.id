#!/usr/bin/env node
/**
 * Keep the stock of drafts filled, from data/topics.json, using DeepSeek.
 *
 *   npm run generate                           # the daily run: a batch of 4 if fewer than 4 drafts are waiting
 *   npm run generate -- --dry-run              # print, write nothing, push nothing
 *   npm run generate -- --id epc--mounting-rel--panduan    # one topic, ignores the stock check
 *   npm run generate -- --no-push              # write and commit locally
 *
 * Drafts are written to drafts/berita/<slug>/ and wait there for publish-drip.mjs,
 * which takes one per publishing day. Publishing is four a week, so a batch of 4 lasts
 * a week; the stock check is what keeps generation from running ahead of publishing.
 * Each new draft is born with its hero image.
 *
 * Requires DEEPSEEK_API_KEY in the environment. Never read from the repo.
 *
 * Design decision that removes a whole class of failure: the model does NOT
 * write frontmatter. title, slug, focusKeyphrase, tags and seoTitle were all
 * decided by plan-topics.mjs and are written here deterministically. The model
 * supplies exactly two things - a description and a body - so it cannot
 * invent a duplicate keyphrase, a malformed slug, or a ninth tag.
 *
 * Two more failure classes are fixed mechanically rather than by retrying,
 * because a retry costs a call and these have exactly one correct answer:
 *   - `$` before a digit becomes `\$` (remark-math would otherwise pair two of
 *     them into one formula and eat the text between - it shipped twice)
 *   - a `# ` heading in the body is demoted to `## ` (the layout already
 *     renders the title as the page's only h1)
 *
 * Everything else - keyword placement, density, paragraph length, links - is
 * a judgement the model has to get right, so those failures are fed back into
 * a retry prompt naming exactly what was wrong.
 *
 * Articles are always born `draft: true`. Publishing is publish-drip.mjs's job.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, TRUSTED_EXTERNAL } from './lib/seo-rules.mjs';
import { SONUSHUB_GENERAL, tagSonushubLinks } from './lib/sonushub.mjs';
import { checkFacts, verifyExternalLinks } from './lib/fact-guard.mjs';
import { brandByKey, BRANDS_CHECKED } from './lib/brands.mjs';
import { execFileSync } from 'node:child_process';
import { writeHero } from './lib/thumbnail.mjs';
import { readyDrafts, loadStore, saveStore } from './lib/topic-store.mjs';
import { DRAFTS_DIR, draftDir, slugTaken } from './lib/articles.mjs';
import { record, spentToday } from './lib/spend-guard.mjs';

const BATCH_SIZE = 4;
/** A call that has not finished by now is abandoned. A pillar is the slow case (up to 32k tokens), so this is generous. */
const API_TIMEOUT_MS = 5 * 60_000;
/**
 * Hard ceiling on DeepSeek tokens per UTC day, counted in data/api-spend.log. A normal batch is
 * ~60k tokens and the worst case the loop allows (8 topics x 3 attempts) is ~360k; this sits
 * above both and far below a runaway. Raise it here, on purpose, if the plan outgrows it.
 */
const DAILY_TOKEN_CAP = 500_000;
/** Transient API errors in a row before the run gives up instead of working through the queue. */
const MAX_API_FAILURES = 2;
/** A transient API error is retried once, not three times: a busy service answers the same way. */
const MAX_API_ATTEMPTS = 2;
/** A topic can fail its gates three times and be marked failed; extra topics keep one bad one from shrinking the week's batch. */
const MAX_EXTRA_ATTEMPTS = 4;
const CTA_SOURCE = 'drafts/cta-block.md';
const API_BASE = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MAX_ATTEMPTS = 3;
const DESC_MIN = 70;
const DESC_MAX = 160;

// --- args -------------------------------------------------------------------
const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
	const i = argv.indexOf(`--${name}`);
	return i === -1 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const batchSize = Number(flag('limit', String(BATCH_SIZE)));
const onlyId = flag('id');
const dryRun = has('dry-run');
const noPush = has('no-push');
const modelOverride = flag('model');
const concurrency = Math.max(1, Number(flag('concurrency', '2')));
// Pemeriksaan tautan butuh egress. Dimatikan hanya untuk uji offline; pada
// jalur normal sebuah URL karangan harus ketahuan di sini, bukan di situs.
const skipLinkCheck = has('skip-link-check');

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) {
	console.error('DEEPSEEK_API_KEY is not set.');
	console.error('On the server it comes from /etc/solar-nusantara/env via systemd EnvironmentFile.');
	console.error('Locally: export DEEPSEEK_API_KEY=... (never commit it)');
	process.exit(1);
}

/**
 * deepseek-flash for everything, measured rather than assumed.
 *
 * The plan was pro for pillars and flash for long-tail. Benchmarked on this
 * exact prompt, pro was the worse tool: 159-214s per call against flash's
 * 34-37s, and on the full prompt it spent the entire 16k budget on
 * `reasoning_content` and returned an empty `content`. Flash returned a
 * correctly formatted 900-1200 word article on the first attempt.
 *
 * pro is still reachable with `--model deepseek-v4-pro` for a specific article
 * worth 5x the wall clock, but it is not the default for a 1000-article run:
 * 200s x 1000 is 55 hours of generation against flash's ~10.
 */
const modelFor = (topic) => modelOverride || 'deepseek-flash';

// --- verified facts ---------------------------------------------------------
/**
 * Every number here came from Solar Nusantara's own published material (the
 * Sonus ID YouTube channel) or from the regulation itself.
 *
 * No cost figure, on purpose (2026-10-19). The CAPEX band, the module share of
 * CAPEX and the CAPEX/OPEX example used to be here, and every article repeated
 * them: a cost figure the company publishes is one it has to answer for, and
 * these had no audited source. fact-guard now rejects any rupiah figure.
 *
 * Deliberately NOT sourced from DB_PR.csv. That file carries `Pagu` and
 * `Final Price` - internal procurement prices and margin. Publishing supplier
 * pricing is a commercial loss that cannot be undone, so the generator never
 * sees it.
 */
const FACTS = `
FAKTA TERVERIFIKASI (gunakan yang relevan, jangan mengarang angka lain):
- Permen ESDM No. 2 Tahun 2024: pemasangan PLTS atap tidak lagi dibatasi 100% dari
  daya terpasang pelanggan PLN, melainkan tunduk pada kuota PLN yang tersedia.
- Skema BOO (Build Own Operate): aset PLTS tetap milik solar developer seterusnya.
  Harga cenderung paling murah karena developer memegang aset jangka panjang.
- Skema BOT (Build Operate Transfer): aset milik developer selama masa kontrak,
  lalu menjadi milik pemilik gedung.
- Efisiensi sistem PLTS = (energi listrik yang dihasilkan / energi surya yang
  diterima panel) x 100%. Contoh: 150 Wh keluar dari 1000 Wh masuk = 15%.
- Faktor yang mempengaruhi efisiensi: kualitas modul, panjang dan ukuran kabel
  inverter, sudut pemasangan, serta bayangan (shading).
- SonusHUB menargetkan material kelistrikan dengan TKDN minimal 40%.
- Faktor emisi rata-rata grid listrik Indonesia: sekitar 0,87 kg CO2 per kWh.
  (Gunakan angka ini untuk perhitungan emisi, dan sebut sebagai perkiraan.)
`.trim();

const COMPANY = `
KONTEKS PERUSAHAAN:
- Penerbit artikel: PT Tripower Solar Nusantara (merek "Solar Nusantara"),
  Gandaria Office 8 Tower lantai 8, Jl. Sultan Iskandar Muda No.8, Jakarta Selatan.
- Lini bisnis: EPC PLTS, manajemen energi, PJUTS, ekosistem EV (SPKL), biomassa.
- SonusHUB (sonushub.id): platform B2B dan B2G untuk material listrik dan energi terbarukan
  milik perusahaan. Katalognya punya kategori rel dan mounting PV, cable tray dan walkway,
  kabel DC dan AC, modul surya, serta inverter string dan hybrid. Pembeli mengirim inquiry
  lewat keranjang inquiry atau Chat Sales, dan ada kalkulator panel surya tanpa daftar.
  Terintegrasi ke fitur ListriQu di aplikasi PLN Mobile.
- Sonus EPC (sonus-epc.id): lini layanan EPC untuk pemasangan sistem panel surya.
- Pembaca sasaran: pembeli material B2B - bagian pengadaan, project manager, dan
  direksi di kontraktor EPC, developer energi terbarukan, kontraktor MEP, industri
  manufaktur, pengelola kawasan industri, dan proyek pemerintah. Mereka membandingkan
  spesifikasi dan pemasok untuk sebuah proyek, bukan memutuskan apakah akan memasang PLTS.
`.trim();

/** Verified 200 on the live site. An internal link to a 404 is an audit finding. */
const INTERNAL_TARGETS = [
	'/layanan/sistem-tenaga-surya-epc/',
	'/layanan/manajemen-energi/',
	'/produk/sistem-panel-surya/panel-surya/panel-tkdn/',
	'/produk/sistem-panel-surya/sistem-pemasangan/',
	'/produk/sistem-panel-surya/sistem-pengkabelan/',
	'/produk/sistem-panel-surya/inverter/on-grid/',
	'/tentang/sonushub/',
	'/berita/',
];

/** Article shape per angle. Writing every angle the same way is what makes bulk content read as bulk. */
const ANGLE_SHAPE = {
	panduan: 'Buka dengan keputusan pengadaan yang harus diambil pembaca. Wajib memuat satu tabel kriteria pemilihan. Tutup dengan langkah memulai permintaan penawaran.',
	spesifikasi: 'Buka dengan parameter teknis yang paling sering salah dibaca. Wajib memuat satu tabel parameter beserta cara membacanya di datasheet. Tutup dengan daftar pertanyaan untuk pemasok.',
	perbandingan: 'Buka dengan keputusan yang harus dipilih pembaca. Wajib memuat satu tabel perbandingan berdampingan dan kondisi kapan masing-masing lebih tepat. Tutup dengan rekomendasi sesuai kebutuhan pembeli ini.',
	pengadaan: 'Buka dengan kesalahan pengadaan yang mahal. Wajib memuat checklist bernomor yang bisa dipakai langsung. Tutup dengan dokumen yang harus diminta dari pemasok sebelum PO diterbitkan.',
	mutu: 'Buka dengan standar atau persyaratan yang berlaku. Wajib memuat daftar uji atau sertifikat yang harus diminta. Tutup dengan cara memverifikasi klaim pemasok.',
	pengetahuan: 'Artikel pengetahuan umum tentang jenis material. Buka dengan fungsi material ini di dalam sistem PLTS. Wajib memuat satu tabel jenis-jenisnya: ciri, kelebihan, keterbatasan, dan di mana biasa dipakai. Tutup dengan hal yang perlu dicek saat memilih jenisnya.',
	merek: 'Artikel pengenalan satu merek. Buka dengan kategori material yang dibuat merek ini. Wajib memuat satu tabel lini produk yang tersedia di SonusHUB, hanya dari daftar FAKTA MEREK. Tutup dengan apa yang harus dicek di datasheet resmi sebelum memesan.',
};

/**
 * The facts block and the brand rule for a brand article. A brand article states only what the
 * SonusHUB catalogue lists for that brand (lib/brands.mjs) and names no other brand: comparing
 * brands is out of the plan, and fact-guard rejects it.
 */
function brandBlock(topic) {
	const brand = topic.brand ? brandByKey(topic.brand) : null;
	if (!brand) {
		return {
			facts: '',
			rule: `Jangan menyebut merek produk tertentu, harga satuan, nama calon klien, atau syarat
    pembayaran perusahaan. Bandingkan kategori dan spesifikasi, bukan merek.`,
		};
	}
	return {
		facts: `
FAKTA MEREK ${brand.name.toUpperCase()} (dari katalog SonusHUB per ${BRANDS_CHECKED}; hanya ini yang boleh disebut tentang merek ini):
${brand.facts.map((f) => `- ${f}`).join('\n')}
`,
		rule: `Artikel ini HANYA tentang merek ${brand.name}. DILARANG menyebut merek lain dan DILARANG
    membandingkan merek (tidak ada "lebih baik dari", "unggul dibanding", peringkat, atau pangsa pasar).
    Tentang merek ini, sebut hanya lini produk di FAKTA MEREK. Jangan menulis sejarah perusahaan,
    negara asal, tahun berdiri, efisiensi, garansi, atau angka spesifikasi yang tidak tercantum;
    untuk itu arahkan pembaca ke datasheet resmi. Jangan menyebut harga satuan, nama calon klien,
    atau syarat pembayaran perusahaan.`,
	};
}

// --- prompt -----------------------------------------------------------------
/**
 * Length and shape per article kind.
 *
 * A pillar is the hub its seven children link into, and the B2B pillar-cluster
 * model puts it at 1,800-2,500 words structured for a featured snippet. Writing
 * both kinds to one 900-1,400 spec produced pillars the same size as the
 * articles meant to hang off them.
 */
const KIND_SPEC = {
	pillar: {
		words: '1800-2500',
		headings: 6,
		shape:
			'Ini artikel PILAR - rujukan utama untuk seluruh topik ini di segmen tersebut. ' +
			'Bahas menyeluruh, bukan satu sudut sempit. Setelah paragraf pembuka, sisipkan satu ' +
			'ringkasan 40-60 kata yang menjawab pertanyaan utama secara langsung dan mandiri ' +
			'(ini yang diambil Google sebagai featured snippet). Tiap heading ## adalah subtopik ' +
			'yang berdiri sendiri, karena artikel turunan akan menautkan balik ke sini. ' +
			// A global word count is too abstract to steer against: asked for
			// 1800-2500 the model produced 1199 across 8 headings, which is 150
			// words a section. A per-section floor is concrete and it hits.
			'PENTING soal kedalaman: tiap bagian ## harus 250-350 kata. Jangan menulis ' +
			'bagian sepanjang tiga kalimat lalu pindah heading - itu menghasilkan artikel ' +
			'yang terlihat lengkap tapi tidak menjawab apa pun. Tiap bagian wajib memuat ' +
			'minimal satu hal konkret: angka, tahapan, kriteria, atau contoh perhitungan.',
	},
	longtail: {
		words: '900-1200',
		headings: 4,
		shape:
			'Ini artikel TURUNAN - menjawab satu pertanyaan spesifik secara tuntas. ' +
			'Jangan mengulang penjelasan dasar yang sudah menjadi porsi artikel pilar; ' +
			'langsung ke kekhususan pertanyaannya.',
	},
};

function buildPrompt(topic, previousErrors) {
	// The second SonusHUB link must be a different page from the product's own.
	const sonushubOthers = SONUSHUB_GENERAL.filter((u) => u !== topic.sonushubLink);
	const spec = KIND_SPEC[topic.kind] ?? KIND_SPEC.longtail;
	const brand = brandBlock(topic);

	const retry = previousErrors?.length
		? `
PERCOBAAN SEBELUMNYA DITOLAK. Perbaiki tepat pada poin berikut, jangan ubah yang lain:
${previousErrors.map((e) => `- ${e}`).join('\n')}
`
		: '';

	return `Anda menulis artikel teknis B2B untuk situs perusahaan energi surya Indonesia.
Tulis dalam Bahasa Indonesia yang lugas dan profesional untuk pembaca bisnis.

JUDUL ARTIKEL (sudah final, jangan diubah): ${topic.title}
KATA KUNCI FOKUS: "${topic.focusKeyphrase}"
PEMBELI YANG MEMBACA: ${topic.buyerLabel}

BENTUK ARTIKEL: ${ANGLE_SHAPE[topic.angle]}

JENIS ARTIKEL: ${spec.shape}

${FACTS}
${brand.facts}
${COMPANY}

ATURAN WAJIB - artikel ditolak otomatis jika dilanggar:
1. Frasa "${topic.focusKeyphrase}" harus muncul minimal satu kali di dalam isi,
   dan semua katanya harus muncul di 150 kata pertama, di minimal satu heading,
   dan di bagian penutup. Jangan diulang berlebihan - maksimal 3 kali seluruhnya.
   PENTING: pencocokan TIDAK peka huruf besar-kecil, jadi tulis akronim dengan
   kapitalisasi yang wajar - "PLTS", "ESDM", "TKDN", "kWp", "MPPT",
   bukan huruf kecil semua. Menulis "mounting rel plts kontraktor epc" di tengah
   kalimat terbaca sebagai keyword stuffing, sedangkan "mounting rel PLTS untuk
   kontraktor EPC" terbaca wajar dan tetap dihitung cocok. Susun kalimatnya agar frasa
   itu mengalir alami, bukan ditempelkan.
2. Panjang ${spec.words} kata.
3. Minimal ${spec.headings} heading tingkat "## ". DILARANG memakai heading "# ".
4. Setiap paragraf maksimal 4 kalimat. Paragraf pendek lebih mudah dibaca.
5. Minimal satu daftar berpoin atau bernomor.
6. Tujuan artikel ini adalah mengantar pembaca ke katalog SonusHUB (https://sonushub.id).
   Wajib ada MINIMAL 2 tautan ke sonushub.id, dua alamat yang berbeda:
   a. Persis alamat ini: [teks deskriptif](${topic.sonushubLink}). Sisipkan di bagian yang
      membahas pemilihan atau pengadaan, dengan kalimat yang wajar, bukan sebagai slogan.
   b. Satu lagi ke salah satu: ${sonushubOthers.join(", ")}
      Letakkan di bagian penutup sebagai ajakan: lihat katalog, bandingkan, lalu kirim
      inquiry atau hubungi Chat Sales SonusHUB.
   Untuk sonushub.id HANYA alamat di atas yang boleh dipakai. JANGAN mengarang alamat
   kategori atau produk, dan jangan menyebut produk atau merek tertentu di sana.
7. Minimal 2 tautan internal ke halaman situs ini (bukan SonusHUB), format
   [teks](/path/) dan harus diakhiri garis miring. Pilih dari: ${INTERNAL_TARGETS.join(", ")}
   Tautan eksternal otoritatif (regulator, lembaga standar) BOLEH ditambahkan hanya bila
   menjelaskan sebuah aturan, dan hanya dari domain: ${TRUSTED_EXTERNAL.slice(0, 8).join(", ")}
   Gunakan URL beranda domain itu bila tidak yakin URL halamannya. JANGAN mengarang URL.
8. Jangan menulis heading bernama "Pendahuluan" atau "Kesimpulan" - langsung ke isi.
9. Jangan mengarang angka, nama klien, atau studi kasus. Pakai hanya fakta di atas.
   Angka teknis yang tidak ada di fakta (misalnya daya atau penampang) boleh ditulis
   hanya sebagai contoh yang jelas disebut contoh, dan arahkan pembaca ke datasheet.
10. DILARANG menulis angka biaya atau keuangan: nilai rupiah, harga, CAPEX, OPEX, ROI,
    payback, LCOE, penghematan, atau persentase biaya. Bahas kriteria teknis dan
    pengadaan, bukan perhitungan biaya.
11. ${brand.rule}
12. Sebut nomor standar (IEC, SNI, EN) hanya jika Anda yakin nomornya benar. Jika ragu,
    sebut jenis standarnya tanpa nomor dan arahkan pembaca memeriksa dokumen aslinya.
${retry}
FORMAT KELUARAN - ikuti persis, tanpa teks pembuka atau penutup:

DESCRIPTION: <satu kalimat meta description, WAJIB antara ${DESC_MIN} dan ${DESC_MAX} karakter, memuat kata kunci fokus, tanpa tanda kutip>
---BODY---
<isi artikel dalam markdown, dimulai langsung dengan paragraf pembuka>`;
}

// --- api --------------------------------------------------------------------
/**
 * A failure of the API itself, not of the article. The topic did nothing wrong, so it must
 * stay `pending` and be tried again later instead of being marked `failed`.
 *   transient  429, 5xx, timeout, no connection: it may well work next time
 *   fatal      other 4xx (bad key, no balance, bad request): retrying cannot help
 *   budget     our own daily cap is used up
 */
class ApiError extends Error {
	constructor(message, kind) {
		super(message);
		this.kind = kind;
	}
}

async function callModel(topic, previousErrors) {
	// Both DeepSeek models reason before answering, and reasoning tokens
	// come out of this same budget. Measured on this prompt shape:
	// deepseek-flash burns ~5.5k reasoning of ~7.3k total, deepseek-v4-pro
	// ~6.2k of ~9.3k. At the old 4000 the article was truncated mid-sentence
	// every time, which surfaced as three confusing validation errors
	// (missing closing section, missing list, one internal link) instead of
	// the one real cause.
	//
	// Kind-aware since pillars moved to 1800-2500 words: Indonesian runs
	// roughly two tokens a word, so a 2,000-word pillar is ~4-5k output
	// tokens on top of the same 6-8k of reasoning, and 16000 truncated it
	// on every attempt. Long-tail articles are unchanged.
	const maxTokens = topic.kind === 'pillar' ? 32000 : 16000;

	const spent = spentToday('deepseek');
	if (spent >= DAILY_TOKEN_CAP) {
		throw new ApiError(`daily DeepSeek budget used up (${spent} of ${DAILY_TOKEN_CAP} tokens today, UTC)`, 'budget');
	}

	let json;
	try {
		const res = await fetch(`${API_BASE}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_KEY}`,
			},
			signal: AbortSignal.timeout(API_TIMEOUT_MS),
			body: JSON.stringify({
				model: modelFor(topic),
				messages: [{ role: 'user', content: buildPrompt(topic, previousErrors) }],
				temperature: 0.6,
				max_tokens: maxTokens,
			}),
		});

		if (!res.ok) {
			const detail = await res.text().catch(() => '');
			// A refused request is not billed, so it is not charged to the budget either.
			const kind = res.status === 429 || res.status >= 500 ? 'transient' : 'fatal';
			throw new ApiError(`DeepSeek HTTP ${res.status}: ${detail.slice(0, 300)}`, kind);
		}
		json = await res.json();
	} catch (e) {
		if (e instanceof ApiError) throw e;
		if (e.name === 'TimeoutError') {
			// The request went out and nothing came back: the provider may still have generated, and billed, the answer. Charge the most this call could have cost.
			record('deepseek', maxTokens, 'timeout');
			throw new ApiError(`DeepSeek gave no answer within ${API_TIMEOUT_MS / 1000}s`, 'transient');
		}
		throw new ApiError(`DeepSeek unreachable: ${e.cause?.code ?? e.message}`, 'transient');
	}

	// The answer is paid for whatever the gates think of it.
	record('deepseek', json?.usage?.total_tokens ?? maxTokens, topic.slug);

	const choice = json?.choices?.[0];
	const text = choice?.message?.content ?? '';

	// Truncation is checked BEFORE emptiness, because on these models the empty
	// case IS a truncation case. Both DeepSeek models stream their chain of
	// thought into `reasoning_content` and the answer into `content`, and both
	// draw on the same max_tokens budget. deepseek-v4-pro given this prompt
	// reasoned until the budget was gone and returned content: "" with
	// finish_reason "length" - which the old order reported as the useless
	// "DeepSeek returned no content" after 643 seconds of retries.
	if (choice?.finish_reason === 'length') {
		return { text, truncated: true };
	}
	if (!text) throw new Error('DeepSeek returned an empty message with finish_reason=' + choice?.finish_reason);
	return { text, truncated: false };
}

// --- mechanical fixes -------------------------------------------------------
/**
 * Fixes with exactly one correct answer, applied rather than retried.
 * Retrying these would spend a call to re-learn something deterministic.
 */
function applyMechanicalFixes(body) {
	return (
		body
			// remark-math reads `$100 ... $1` as one inline formula and swallows the
			// text between. Two articles shipped as "100perwatt" before the gate.
			.replace(/(?<!\\)\$(?=\d)/g, '\\$')
			// The layout renders the title as the page's only h1.
			.replace(/^# (?!#)/gm, '## ')
			.replace(/\n{3,}/g, '\n\n')
			.trim()
	);
}

function parseResponse(text) {
	const m = text.match(/DESCRIPTION:\s*(.+?)\s*\n-{2,}BODY-{2,}\s*\n([\s\S]+)$/);
	if (!m) return null;
	return {
		description: m[1].trim().replace(/^["']|["']$/g, ''),
		body: applyMechanicalFixes(m[2]),
	};
}

// --- assembly ---------------------------------------------------------------
function readCta() {
	try {
		const raw = readFileSync(CTA_SOURCE, 'utf8');
		const m = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]+)$/);
		return m ? m[1].trim() : '';
	} catch {
		return '';
	}
}
const CTA = readCta();

function buildFile(topic, description, body) {
	const esc = (s) => s.replace(/"/g, "'");
	// UTM goes on at assembly, after the gates have judged the model's own links: the model never writes it, and what was validated is what was written minus the query string.
	const utm = { campaign: topic.product, content: topic.slug };
	body = tagSonushubLinks(body, { ...utm, term: 'isi' });
	const lines = [
		'---',
		`title: "${esc(topic.title)}"`,
		...(topic.seoTitle ? [`seoTitle: "${esc(topic.seoTitle)}"`] : []),
		`description: "${esc(description)}"`,
		`focusKeyphrase: "${esc(topic.focusKeyphrase)}"`,
		`pubDate: "${new Date().toISOString().slice(0, 10)}"`,
		`tags: [${topic.tags.map((t) => `"${t}"`).join(', ')}]`,
		'draft: true',
		'---',
		'',
		body,
	];
	if (CTA) lines.push('', '---', '', tagSonushubLinks(CTA, { ...utm, term: 'cta' }));
	return `${lines.join('\n')}\n`;
}

/** Everything both gates would say, without writing the file first. */
function validate(topic, description, body) {
	const errors = [];

	if (description.length < DESC_MIN || description.length > DESC_MAX) {
		errors.push(`description is ${description.length} characters; it must be ${DESC_MIN}-${DESC_MAX}`);
	}
	if (/^# (?!#)/m.test(body)) errors.push('body still contains a "# " heading');
	if (/(?<!\\)\$(?=\d)/.test(body)) errors.push('body contains an unescaped "$" before a digit');

	for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
		if (!m[1].trim()) errors.push(`markdown image with empty alt: ${m[2]}`);
	}

	const seo = checkSeo({ title: topic.title, focusKeyphrase: topic.focusKeyphrase, body, kind: topic.kind, requiredLink: topic.sonushubLink });
	errors.push(...seo.errors);

	// Fabricated facts are caught here, in the loop, rather than only at publish
	// time. A wrong regulation number is a writing mistake the model can fix when
	// told about it, and fixing it costs one retry; catching it at publish costs
	// an article that has to be regenerated anyway, later, with less context.
	const facts = checkFacts({ body, brand: topic.brand });
	errors.push(...facts.errors);

	return { errors, stats: seo.stats, factWarnings: facts.warnings };
}

// --- one article ------------------------------------------------------------
async function generateOne(topic) {
	let previousErrors = null;

	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		let call;
		try {
			call = await callModel(topic, previousErrors);
		} catch (e) {
			if (e instanceof ApiError) {
				// Not the article's fault. Retrying a refusal or our own cap cannot help; a transient error gets one more try.
				if (e.kind !== 'transient' || attempt >= MAX_API_ATTEMPTS) return { ok: false, api: e.kind, reason: e.message };
				await new Promise((r) => setTimeout(r, 15_000 * attempt));
				continue;
			}
			if (attempt === MAX_ATTEMPTS) return { ok: false, reason: e.message };
			await new Promise((r) => setTimeout(r, 2000 * attempt));
			continue;
		}

		if (call.truncated) {
			previousErrors = ['jawaban terpotong sebelum selesai - tulis lebih ringkas, target 900-1200 kata'];
			if (attempt === MAX_ATTEMPTS) {
				return { ok: false, reason: 'model output truncated at max_tokens on every attempt' };
			}
			continue;
		}

		const parsed = parseResponse(call.text);
		if (!parsed) {
			previousErrors = ['keluaran tidak mengikuti format DESCRIPTION: ... ---BODY--- ...'];
			continue;
		}

		const { errors, stats, factWarnings } = validate(topic, parsed.description, parsed.body);

		// Only pay for the network check once the cheap checks pass. An article
		// that already fails on keyword placement is getting regenerated anyway,
		// and its links will change with it.
		if (errors.length === 0 && !skipLinkCheck) {
			const links = await verifyExternalLinks(parsed.body);
			errors.push(...links.errors);
			if (links.warnings.length) {
				console.log(`          ${links.warnings.length} tautan tidak bisa diperiksa (jaringan), dilanjutkan`);
			}
		}

		if (errors.length === 0) {
			return { ok: true, description: parsed.description, body: parsed.body, stats, factWarnings, attempts: attempt };
		}

		previousErrors = errors;
		if (attempt === MAX_ATTEMPTS) {
			// Keep the last rejected draft. Without it a three-attempt failure is a
			// list of error strings with no way to see what the model actually
			// wrote, and diagnosing a prompt problem means reproducing the call by
			// hand. Written outside src/ so Astro never sees it.
			try {
				mkdirSync('data/failed', { recursive: true });
				const header = [
					`<!-- ${topic.id} | ${topic.kind} | rejected ${new Date().toISOString()}`,
					...errors.map((e) => `  - ${e}`),
					'-->',
					'',
					`DESCRIPTION (${parsed.description.length}): ${parsed.description}`,
					'',
				].join('\n');
				writeFileSync(join('data/failed', `${topic.slug}.md`), `${header}\n${parsed.body}\n`, 'utf8');
			} catch {
				/* diagnostics only */
			}
			return { ok: false, reason: `failed ${MAX_ATTEMPTS} attempts`, errors, stats };
		}
	}
	return { ok: false, reason: 'unreachable' };
}

// --- driver -----------------------------------------------------------------
const store = loadStore();

/** Persist after every article so an interrupted run resumes cleanly. */
function persist() {
	if (!dryRun) saveStore(store);
}

// The timer is daily and publishing is four a week: write a batch only when the stock of drafts has run below one batch, so generation never runs ahead of publishing.
if (!onlyId) {
	const stock = readyDrafts(store).length;
	if (stock >= batchSize) {
		console.log(`\ngenerate: ${stock} draft(s) waiting in ${DRAFTS_DIR} - next batch when fewer than ${batchSize} remain.\n`);
		process.exit(0);
	}
}

const pool = onlyId
	? store.topics.filter((t) => t.id === onlyId)
	: store.topics.filter((t) => !t.legacy && t.status === 'pending').sort((a, b) => a.rank - b.rank);

if (pool.length === 0) {
	console.log(onlyId ? `no topic with id "${onlyId}"` : 'no pending topics left in the plan');
	process.exit(0);
}

const target = onlyId ? 1 : batchSize;
console.log(`\ngenerate: batch of ${target}, concurrency ${concurrency}`);
console.log(`  model: ${modelOverride || 'deepseek-flash'}`);
if (dryRun) console.log('  --dry-run: nothing will be written\n');

let done = 0;
let failed = 0;
const written = [];
/** Set when the API itself is the problem; every lane stops taking new topics. */
let stopReason = null;
let apiFailures = 0;

async function processTopic(topic) {
	if (stopReason) return;
	const started = Date.now();
	const result = await generateOne(topic);
	const secs = ((Date.now() - started) / 1000).toFixed(0);

	if (!result.ok && result.api) {
		// The API failed, not the article: the topic keeps its status and the next run tries it again. A fatal error or our own cap stops the run at once; transient ones need MAX_API_FAILURES in a row.
		apiFailures += result.api === 'transient' ? 1 : MAX_API_FAILURES;
		if (apiFailures >= MAX_API_FAILURES) stopReason = result.reason;
		console.log(`\n  API   ${topic.slug}  (${secs}s)  ${result.reason}  - stays ${topic.status}`);
		return;
	}
	if (result.ok) apiFailures = 0;

	if (!result.ok) {
		failed += 1;
		topic.lastError = result.reason;
		topic.status = 'failed';
		console.log(`\n  FAIL  ${topic.slug}  (${secs}s)  ${result.reason}`);
		for (const e of (result.errors || []).slice(0, 6)) console.log(`          x ${e}`);
		persist();
		return;
	}

	// The slug is the URL: taken in the drafts folder or on the live site, either way it is not ours to overwrite.
	if (slugTaken(topic.slug) && !dryRun) {
		failed += 1;
		topic.status = 'skipped';
		topic.lastError = 'directory already exists';
		console.log(`\n  SKIP  ${topic.slug}  already exists`);
		persist();
		return;
	}

	if (!dryRun) {
		const dir = draftDir(topic.slug);
		mkdirSync(dir, { recursive: true });
		writeFileSync(join(dir, 'index.md'), buildFile(topic, result.description, result.body), 'utf8');
		topic.status = 'generated';
		topic.generatedAt = new Date().toISOString();
		delete topic.lastError;
	}

	// A draft is born with its hero. A failure here does not lose the article; publish-drip heals a missing hero and refuses to publish one it cannot.
	let hero = '';
	if (!dryRun) {
		try {
			await writeHero(topic);
			hero = ' + hero';
		} catch (e) {
			hero = `  (HERO FAILED: ${e.message})`;
		}
	}

	done += 1;
	written.push(topic.slug);
	const s = result.stats;
	console.log(`\n  OK    ${topic.slug}  (${secs}s, ${result.attempts} attempt${result.attempts > 1 ? 's' : ''})${hero}`);
	console.log(
		`          ${s.wordCount} words | ${s.h2s} h2 | kw x${s.occurrences} (${s.density}%) | ` +
			`${s.internalLinks} internal | ${s.sonushubLinks} sonushub | ${s.externalTrusted} external`,
	);
	// Warnings do not block, and no one reads the draft before it goes out: the log is where they are seen.
	for (const w of result.factWarnings) console.log(`          ! ${w}`);
	if (dryRun) console.log(`          desc (${result.description.length}): ${result.description}`);
	persist();
}

// Fill the batch, not just attempt it: a topic that fails its gates must not shrink the week's four, so keep drawing from the queue until four are written or the extra-attempt allowance is spent.
let drawn = 0;
const allowance = target + (onlyId ? 0 : MAX_EXTRA_ATTEMPTS);
while (done < target && drawn < allowance && drawn < pool.length && !stopReason) {
	const take = Math.min(target - done, allowance - drawn, pool.length - drawn);
	const round = pool.slice(drawn, drawn + take);
	drawn += take;

	// Round-robin across workers so pillars (the slower ones) spread out.
	const lanes = Array.from({ length: Math.min(concurrency, round.length) }, () => []);
	round.forEach((t, i) => lanes[i % lanes.length].push(t));
	await Promise.all(lanes.map(async (items) => { for (const t of items) await processTopic(t); }));
}

console.log(`\ngenerate: ${done} written, ${failed} failed${done < target && !onlyId ? `  (wanted ${target})` : ''}`);
if (stopReason) {
	console.log(`generate: stopped early because of the API, not the articles: ${stopReason}`);
	console.log('  Topics not written keep their status and are tried again on the next run.');
}

// Push the batch so the stock survives on GitHub, not only on the server's disk. Drafts live outside src/, so this publishes nothing (deploy.yml ignores pushes that touch only drafts/ and data/).
if (done && !dryRun && !onlyId) {
	try {
		const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' });
		git(['add', 'drafts', 'data']);
		git(['commit', '-m', `content: ${done} new draft${done > 1 ? 's' : ''} in ${DRAFTS_DIR}`, '-m', written.map((s) => `- ${s}`).join('\n')]);
		if (!noPush) git(['push']);
		console.log(noPush ? '  committed locally (--no-push).' : '  pushed.');
	} catch (e) {
		console.error(`\ncould not commit/push the batch:\n${e.stdout || ''}${e.stderr || ''}`);
		process.exit(1);
	}
}
process.exit((failed || stopReason) && !done ? 1 : 0);
