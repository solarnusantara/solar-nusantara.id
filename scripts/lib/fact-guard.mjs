/** Catch fabricated facts before they ship; the structure and writing gates check form, not truth. */

/** Regulations the generator may cite - an allowlist, because a fabricated citation is perfectly well-formed. */
export const KNOWN_REGULATIONS = [
	{ pattern: /permen\s*(?:en)?\s*esdm/i, nomor: '2', tahun: '2024', label: 'Permen ESDM No. 2 Tahun 2024' },
];

/** Constants with exactly one correct value; `near` allows a writer's rounding, `exact` does not. */
const CONSTANTS = [
	{
		name: 'TKDN minimum',
		re: /tkdn\s+(?:minimal|minimum|sebesar|paling\s+sedikit)\s*(\d{1,3})\s*(?:%|persen)/gi,
		expect: 40,
		mode: 'exact',
		hint: 'SonusHUB menargetkan TKDN minimal 40 persen',
	},
	{
		name: 'faktor emisi grid',
		re: /(\d+[.,]\d+)\s*kg\s*CO2?\s*(?:e)?\s*(?:per|\/)\s*kWh/gi,
		expect: 0.87,
		mode: 'near',
		tolerance: 0.05,
		hint: 'faktor emisi grid Indonesia sekitar 0,87 kg CO2 per kWh',
	},
	{
		name: 'porsi modul terhadap CAPEX',
		re: /modul\s+surya[^.]{0,60}?(\d{1,3})\s*(?:%|persen)[^.]{0,40}?capex/gi,
		expect: 40,
		mode: 'near',
		tolerance: 5,
		hint: 'modul surya sekitar 40% dari total CAPEX',
	},
];

/** CAPEX band for a 1 MWp system, from the same FACTS block the generator is given. */
const CAPEX_1MWP = { min: 9, max: 13, unit: 'miliar' };

/** Entities the article may name. Anything else that looks like a client is invented. */
const KNOWN_ENTITIES = [
	'pt tripower solar nusantara',
	'solar nusantara',
	'sonushub',
	'sonus hub',
	'sonus epc',
	'sonus id',
	'pln',
	'pln icon plus',
	'pln mobile',
	'esdm',
	'kementerian esdm',
	'indonesia terang',
	// Real Indonesian SOEs - naming them in an industry piece is legitimate, inventing a client is not.
	'len industri',
	'pertamina',
	'pupuk indonesia',
	'semen indonesia',
	'wijaya karya',
	'bright pln batam',
];

function stripCode(body) {
	return body.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
}

/** "9,5" and "9.5" both mean nine and a half in Indonesian prose. */
const toNumber = (s) => Number(String(s).replace(',', '.'));

/** Check one article body against the allowlists. */
export function checkFacts({ body }) {
	const errors = [];
	const warnings = [];
	const text = stripCode(body);

	// Regulation citations must match the allowlist on both number and year.
	const regCite = /((?:permen(?:en)?\s*esdm|peraturan\s+menteri[^.\n]{0,40}?))\s*(?:no\.?|nomor)\s*(\d+)\s*(?:\/|\s+tahun\s+)\s*(\d{4})/gi;
	for (const m of text.matchAll(regCite)) {
		const [full, name, nomor, tahun] = m;
		const known = KNOWN_REGULATIONS.find((k) => k.pattern.test(name));
		if (!known) {
			errors.push(`regulasi tidak dikenal dikutip: "${full.trim()}". Hanya regulasi di KNOWN_REGULATIONS yang boleh dikutip.`);
			continue;
		}
		if (nomor !== known.nomor || tahun !== known.tahun) {
			errors.push(`kutipan regulasi salah: "${full.trim()}" - seharusnya ${known.label}`);
		}
	}

	// A bare "Permen ESDM" is fine; a wrong year attached to it is a wrong citation.
	for (const m of text.matchAll(/permen\s*(?:en)?\s*esdm[^.\n]{0,30}?tahun\s+(\d{4})/gi)) {
		if (m[1] !== '2024') {
			errors.push(`Permen ESDM dirujuk dengan tahun ${m[1]}; yang ada di fakta terverifikasi adalah 2024`);
		}
	}

	// --- constants ----------------------------------------------------------
	for (const c of CONSTANTS) {
		for (const m of text.matchAll(c.re)) {
			const got = toNumber(m[1]);
			if (!Number.isFinite(got)) continue;
			const ok =
				c.mode === 'exact' ? got === c.expect : Math.abs(got - c.expect) <= (c.tolerance ?? 0);
			if (!ok) {
				errors.push(`${c.name}: artikel menyebut ${m[1]}, fakta terverifikasi menyebut ${c.expect} (${c.hint})`);
			}
		}
	}

	// CAPEX must be anchored to both 1 MWp and a capital-cost word, with no savings term in between.
	const NOT_CAPEX = 'opex|pemeliharaan|penghematan|arus\\s+kas|tarif|pendapatan|hemat|saving';
	const capexRe = new RegExp(
		`(?:capex|belanja\\s+modal|biaya\\s+investasi|investasi\\s+awal)((?:(?!${NOT_CAPEX})[^.\\n]){0,70}?)` +
			`rp\\s*([\\d.,]+)(?:\\s*(?:-|–|—|sampai|hingga)\\s*([\\d.,]+))?\\s*(miliar|juta|triliun)`,
		'gi',
	);
	for (const m of text.matchAll(capexRe)) {
		const between = m[1];
		// Only judge it when the same clause is actually about a 1 MWp system.
		if (!/\b1\s*mwp?\b/i.test(between) && !/\b1\s*mwp?\b/i.test(text.slice(Math.max(0, m.index - 60), m.index))) {
			continue;
		}
		const unit = m[4].toLowerCase();
		const lo = toNumber(m[2]);
		const hi = m[3] ? toNumber(m[3]) : lo;
		if (unit !== CAPEX_1MWP.unit) {
			errors.push(`CAPEX 1 MWp disebut dalam satuan "${unit}"; fakta terverifikasi memakai miliar (Rp 9-13 miliar)`);
			continue;
		}
		if (lo < CAPEX_1MWP.min - 0.5 || hi > CAPEX_1MWP.max + 0.5) {
			errors.push(`CAPEX 1 MWp disebut Rp ${m[2]}${m[3] ? `-${m[3]}` : ''} miliar; di luar rentang terverifikasi Rp 9-13 miliar`);
		}
	}

	// An unknown company next to a success verb is a fabricated case study; a bare mention is only a warning.
	const CASE_VERB = /\b(berhasil|menghemat|memasang|mengurangi|meningkatkan|mencapai|melaporkan|membukukan)\b/i;
	for (const m of text.matchAll(/\bPT\.?\s+([A-Z][A-Za-z]*(?:\s+[A-Z][A-Za-z]*){0,4})/g)) {
		const bare = m[1].toLowerCase().trim();
		const known = KNOWN_ENTITIES.some((e) => {
			const short = e.replace(/^pt\s+/, '');
			return bare === short || bare.startsWith(`${short} `) || short.startsWith(bare);
		});
		if (known) continue;

		const after = text.slice(m.index, m.index + m[0].length + 120);
		if (CASE_VERB.test(after)) {
			errors.push(`studi kasus tanpa dasar: "PT ${m[1]}" disebut melakukan sesuatu. Jangan mengarang klien atau angka keberhasilan.`);
		} else {
			warnings.push(`perusahaan di luar daftar dikenal disebut: "PT ${m[1]}" - pastikan benar-benar ada`);
		}
	}

	// Every link target is checked, including a typo'd scheme that an https-only matcher would skip.
	for (const m of text.matchAll(/\[([^\]]*)\]\(\s*([^)\s]+)/g)) {
		const href = m[2];
		if (href.startsWith('#')) continue;                       // in-page anchor
		if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
		if (href.startsWith('/')) continue;                       // root-relative, checked by seo-rules
		if (href.startsWith('./') || href.startsWith('../')) {
			errors.push(`tautan relatif "${href}" - gunakan path root-relative diakhiri garis miring`);
			continue;
		}
		if (!/^https?:\/\/[^/\s]+/i.test(href)) {
			errors.push(`target tautan tidak valid: "${href}" - harus https://, path root-relative, atau mailto:`);
			continue;
		}
		try {
			new URL(href);
		} catch {
			errors.push(`URL tidak valid: ${href}`);
		}
	}

	// A study or survey citation the generator was never given cannot be real.
	for (const m of text.matchAll(/\b(?:studi|riset|penelitian|survei|laporan)\s+(?:dari\s+)?([A-Z][A-Za-z]{2,})/g)) {
		const src = m[1].toLowerCase();
		const allowed = ['esdm', 'pln', 'iea', 'irena', 'nrel', 'bps', 'kementerian', 'bsn', 'iec'];
		if (!allowed.includes(src)) {
			warnings.push(`sumber studi disebut tanpa dasar: "${m[0]}" - pastikan ini bukan karangan`);
		}
	}

	return { errors, warnings };
}

/** Fetch every external link - a fabricated citation is absent, not deep, and only the server can tell. */
export async function verifyExternalLinks(body, opts = {}) {
	const timeoutMs = opts.timeoutMs ?? 12000;
	const concurrency = opts.concurrency ?? 4;

	const urls = [
		...new Set(
			[...stripCode(body).matchAll(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g)]
				.map((m) => m[1].replace(/[.,;]+$/, '')),
		),
	];

	const errors = [];
	const warnings = [];
	let checked = 0;

	async function probe(url) {
		const ctl = new AbortController();
		const timer = setTimeout(() => ctl.abort(), timeoutMs);
		try {
			// HEAD first, falling back to GET on a 405 from servers that refuse it.
			let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctl.signal });
			if (res.status === 405 || res.status === 501) {
				res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctl.signal });
			}
			checked += 1;
			if (res.status >= 400) {
				errors.push(`tautan eksternal mengembalikan HTTP ${res.status}: ${url}`);
			}
		} catch (e) {
			warnings.push(`tautan eksternal tidak bisa diperiksa (${e.name === 'AbortError' ? 'timeout' : 'jaringan'}): ${url}`);
		} finally {
			clearTimeout(timer);
		}
	}

	const lanes = Array.from({ length: Math.min(concurrency, urls.length) }, () => []);
	urls.forEach((u, i) => lanes[i % lanes.length].push(u));
	await Promise.all(lanes.map(async (lane) => { for (const u of lane) await probe(u); }));

	return { errors, warnings, checked };
}
