#!/usr/bin/env node
/**
 * Generate articles from data/topics.json using DeepSeek.
 *
 *   npm run generate -- --limit 1              # one article, wave 1
 *   npm run generate -- --limit 10 --wave 1
 *   npm run generate -- --dry-run --limit 1    # print, write nothing
 *   npm run generate -- --id pabrik-manufaktur--biaya-roi--pilar
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
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkSeo, TRUSTED_EXTERNAL } from './lib/seo-rules.mjs';
import { checkFacts, verifyExternalLinks } from './lib/fact-guard.mjs';

const TOPICS = 'data/topics.json';
const CONTENT_DIR = 'src/content/berita';
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

const limit = Number(flag('limit', '1'));
const wave = Number(flag('wave', '1'));
const onlyId = flag('id');
const dryRun = has('dry-run');
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
 * Sonus ID YouTube channel) or from the regulation itself. This block is what
 * separates the output from generic AI filler: an article that cites the real
 * CAPEX band for a 1 MWp system in Indonesia is useful to a buyer, and one that
 * says "solar is a great investment" is not.
 *
 * Deliberately NOT sourced from DB_PR.csv. That file carries `Pagu` and
 * `Final Price` - internal procurement prices and margin. Publishing supplier
 * pricing is a commercial loss that cannot be undone, so the generator never
 * sees it.
 */
const FACTS = `
FAKTA TERVERIFIKASI (gunakan yang relevan, jangan mengarang angka lain):
- CAPEX PLTS 1 MWp di Indonesia: Rp 9-13 miliar (rentang 2024-2025).
- Modul surya menyumbang sekitar 40% dari total CAPEX sistem 1 MW.
- Contoh nyata: perusahaan industri memasang PLTS 1 MWp dengan CAPEX Rp 11 miliar
  dan estimasi OPEX Rp 220 juta per tahun.
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
- SonusHUB (sonushub.id): marketplace B2B/B2G material kelistrikan dan energi
  terbarukan milik perusahaan, terintegrasi ke fitur ListriQu di aplikasi PLN Mobile.
- Sonus EPC (sonus-epc.id): lini layanan EPC untuk pemasangan sistem panel surya.
- Pembaca sasaran: pengambil keputusan B2B - manajer fasilitas, manajer energi,
  kepala teknik, bagian pengadaan, dan direksi yang mengejar target ESG.
`.trim();

/** Verified 200 on the live site. An internal link to a 404 is an audit finding. */
const INTERNAL_TARGETS = [
	'/layanan/epc/segmen-ci/',
	'/layanan/sistem-tenaga-surya-epc/',
	'/layanan/manajemen-energi/',
	'/produk/sistem-panel-surya/panel-surya/panel-tkdn/',
	'/produk/sistem-panel-surya/sistem-baterai/',
	'/produk/sistem-panel-surya/inverter/on-grid/',
	'/tentang/sonushub/',
	'/berita/',
	'/kontak/',
];

/** Article shape per intent. Writing all nine the same way is what makes bulk content read as bulk. */
const INTENT_SHAPE = {
	'biaya-roi': 'Buka dengan angka biaya konkret. Wajib memuat satu tabel rincian biaya atau perhitungan payback. Tutup dengan rentang investasi dan faktor yang mengubahnya.',
	'desain-sizing': 'Buka dengan variabel yang menentukan ukuran sistem. Wajib memuat satu contoh perhitungan bertahap dengan angka. Tutup dengan checklist data yang perlu disiapkan sebelum desain.',
	regulasi: 'Buka dengan nama dan tahun regulasinya. Jelaskan apa yang berubah dan konsekuensi praktisnya. Wajib memuat daftar dokumen atau tahapan. Tutup dengan risiko jika tidak dipatuhi.',
	komponen: 'Buka dengan kriteria pemilihan, bukan definisi. Wajib memuat tabel perbandingan spesifikasi. Tutup dengan rekomendasi sesuai karakter beban segmen ini.',
	instalasi: 'Buka dengan tantangan lapangan khas segmen ini. Wajib memuat urutan tahapan bernomor. Tutup dengan hal yang paling sering menyebabkan keterlambatan.',
	om: 'Buka dengan konsekuensi jika pemeliharaan diabaikan. Wajib memuat jadwal atau interval konkret. Tutup dengan indikator yang harus dipantau rutin.',
	pembiayaan: 'Buka dengan pertanyaan kepemilikan aset. Wajib memuat perbandingan skema berdampingan. Tutup dengan skema yang cocok untuk profil arus kas segmen ini.',
	esg: 'Buka dengan kewajiban pelaporan yang dihadapi segmen ini. Wajib memuat satu contoh perhitungan emisi dengan angka. Tutup dengan cara mendokumentasikan klaim agar dapat diaudit.',
	pengadaan: 'Buka dengan kesalahan pengadaan yang mahal. Wajib memuat daftar poin yang harus ada di dokumen. Tutup dengan cara memverifikasi klaim vendor.',
};

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
	const others = INTERNAL_TARGETS.filter((t) => t !== topic.internalLink).slice(0, 4);
	const spec = KIND_SPEC[topic.kind] ?? KIND_SPEC.longtail;

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
SEGMEN PEMBACA: ${topic.segmentLabel}

BENTUK ARTIKEL: ${INTENT_SHAPE[topic.intent]}

JENIS ARTIKEL: ${spec.shape}

${FACTS}

${COMPANY}

ATURAN WAJIB - artikel ditolak otomatis jika dilanggar:
1. Frasa "${topic.focusKeyphrase}" harus muncul minimal satu kali di dalam isi,
   dan semua katanya harus muncul di 150 kata pertama, di minimal satu heading,
   dan di bagian penutup. Jangan diulang berlebihan - maksimal 3 kali seluruhnya.
   PENTING: pencocokan TIDAK peka huruf besar-kecil, jadi tulis akronim dengan
   kapitalisasi yang wajar - "PLTS", "CAPEX", "OPEX", "ESDM", "TKDN", "kWp",
   bukan huruf kecil semua. Menulis "payback period plts pabrik" di tengah
   kalimat terbaca sebagai keyword stuffing, sedangkan "payback period PLTS
   pabrik" terbaca wajar dan tetap dihitung cocok. Susun kalimatnya agar frasa
   itu mengalir alami, bukan ditempelkan.
2. Panjang ${spec.words} kata.
3. Minimal ${spec.headings} heading tingkat "## ". DILARANG memakai heading "# ".
4. Setiap paragraf maksimal 4 kalimat. Paragraf pendek lebih mudah dibaca.
5. Minimal satu daftar berpoin atau bernomor.
6. Minimal 2 tautan internal, dan MINIMAL SATU di antaranya harus menuju halaman
   layanan atau produk - bukan ke artikel lain. Wajib memakai: ${topic.internalLink}
   Boleh ditambah dari: ${others.join(', ')}
   Format: [teks deskriptif](${topic.internalLink}) - harus diakhiri garis miring.
   Tautan ke /berita/ tidak dihitung sebagai tautan konversi. Artikel yang hanya
   menautkan ke artikel lain membangun trafik tanpa pernah mengantar pembaca ke
   halaman yang menghasilkan permintaan penawaran.
7. Minimal 1 tautan ke sumber otoritatif eksternal. Hanya boleh dari domain:
   ${TRUSTED_EXTERNAL.slice(0, 8).join(', ')}
   Gunakan URL beranda domain tersebut jika Anda tidak yakin URL halaman spesifiknya.
   JANGAN mengarang URL halaman yang belum tentu ada.
8. Jangan menulis heading bernama "Pendahuluan" atau "Kesimpulan" - langsung ke isi.
9. Jangan mengarang angka, nama klien, atau studi kasus. Pakai hanya fakta di atas.
   Jika butuh angka lain, sebutkan sebagai asumsi dan jelaskan cara menghitungnya.
10. Nilai rupiah ditulis "Rp 11 miliar". Jika menulis dolar, tulis "\\$100" dengan
    garis miring terbalik di depannya.
${retry}
FORMAT KELUARAN - ikuti persis, tanpa teks pembuka atau penutup:

DESCRIPTION: <satu kalimat meta description, WAJIB antara ${DESC_MIN} dan ${DESC_MAX} karakter, memuat kata kunci fokus, tanpa tanda kutip>
---BODY---
<isi artikel dalam markdown, dimulai langsung dengan paragraf pembuka>`;
}

// --- api --------------------------------------------------------------------
async function callModel(topic, previousErrors) {
	const res = await fetch(`${API_BASE}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			model: modelFor(topic),
			messages: [{ role: 'user', content: buildPrompt(topic, previousErrors) }],
			temperature: 0.6,
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
			max_tokens: topic.kind === 'pillar' ? 32000 : 16000,
		}),
	});

	if (!res.ok) {
		const detail = await res.text().catch(() => '');
		throw new Error(`DeepSeek HTTP ${res.status}: ${detail.slice(0, 300)}`);
	}
	const json = await res.json();
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
	if (CTA) lines.push('', '---', '', CTA);
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

	const seo = checkSeo({ title: topic.title, focusKeyphrase: topic.focusKeyphrase, body, kind: topic.kind });
	errors.push(...seo.errors);

	// Fabricated facts are caught here, in the loop, rather than only at publish
	// time. A wrong regulation number is a writing mistake the model can fix when
	// told about it, and fixing it costs one retry; catching it at publish costs
	// an article that has to be regenerated anyway, later, with less context.
	const facts = checkFacts({ body });
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

		const { errors, stats } = validate(topic, parsed.description, parsed.body);

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
			return { ok: true, description: parsed.description, body: parsed.body, stats, attempts: attempt };
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
const store = JSON.parse(readFileSync(TOPICS, 'utf8'));

const queue = store.topics
	.filter((t) => (onlyId ? t.id === onlyId : t.status === 'pending' && t.wave === wave))
	.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))
	.slice(0, onlyId ? 1 : limit);

if (queue.length === 0) {
	console.log(onlyId ? `no topic with id "${onlyId}"` : `no pending topics in wave ${wave}`);
	process.exit(0);
}

console.log(`\ngenerate: ${queue.length} article(s), wave ${wave}, concurrency ${concurrency}`);
console.log(`  model: ${modelOverride || 'deepseek-flash'}`);
if (dryRun) console.log('  --dry-run: nothing will be written\n');

let done = 0;
let failed = 0;

/** Persist after every article so an interrupted run resumes cleanly. */
function persist() {
	if (!dryRun) writeFileSync(TOPICS, JSON.stringify(store, null, 2), 'utf8');
}

async function worker(items) {
	for (const topic of items) {
		const started = Date.now();
		const result = await generateOne(topic);
		const secs = ((Date.now() - started) / 1000).toFixed(0);

		if (!result.ok) {
			failed += 1;
			topic.status = 'failed';
			topic.lastError = result.reason;
			console.log(`\n  FAIL  ${topic.slug}  (${secs}s)  ${result.reason}`);
			for (const e of (result.errors || []).slice(0, 6)) console.log(`          x ${e}`);
			persist();
			continue;
		}

		const dir = join(CONTENT_DIR, topic.slug);
		if (existsSync(dir) && !dryRun) {
			failed += 1;
			topic.status = 'skipped';
			topic.lastError = 'directory already exists';
			console.log(`\n  SKIP  ${topic.slug}  already exists`);
			persist();
			continue;
		}

		if (!dryRun) {
			mkdirSync(dir, { recursive: true });
			writeFileSync(join(dir, 'index.md'), buildFile(topic, result.description, result.body), 'utf8');
			topic.status = 'generated';
			topic.generatedAt = new Date().toISOString();
			delete topic.lastError;
		}

		done += 1;
		const s = result.stats;
		console.log(
			`\n  OK    ${topic.slug}  (${secs}s, ${result.attempts} attempt${result.attempts > 1 ? 's' : ''})`,
		);
		console.log(
			`          ${s.wordCount} words | ${s.h2s} h2 | kw x${s.occurrences} (${s.density}%) | ` +
				`${s.internalLinks} internal | ${s.externalTrusted} external`,
		);
		if (dryRun) {
			console.log(`          desc (${result.description.length}): ${result.description}`);
		}
		persist();
	}
}

// Round-robin the queue across workers so pillars (slower model) spread out.
const lanes = Array.from({ length: Math.min(concurrency, queue.length) }, () => []);
queue.forEach((t, i) => lanes[i % lanes.length].push(t));
await Promise.all(lanes.map(worker));

console.log(`\ngenerate: ${done} written, ${failed} failed`);
if (done && !dryRun) {
	console.log('  All born as draft: true - they are not on the site yet.');
	console.log('  Next: npm run check && npm run check-seo, then review before publishing.\n');
}
process.exit(failed && !done ? 1 : 0);
