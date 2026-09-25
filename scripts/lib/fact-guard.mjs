/**
 * Catch fabricated facts before they reach the site.
 *
 * Why this exists.
 *
 * check-content.mjs validates structure. check-seo.mjs validates writing. Neither
 * can tell the difference between "Permen ESDM No. 2 Tahun 2024" and "Permen ESDM
 * No. 5 Tahun 2023" - both are well-formed, both sit in a correct sentence, and
 * both pass every rule those gates have. One is the regulation that actually
 * changed rooftop PLTS quotas; the other does not exist.
 *
 * With a human reading every batch, that gets caught on article 3. Without one,
 * it gets caught on article 300 - by a customer, in an RFQ conversation, about a
 * claim the company published under its own name.
 *
 * So the approach is an ALLOWLIST, not a plausibility check. The generator is
 * given a fixed block of verified facts and told not to invent others. This file
 * enforces exactly that: every citable number or regulation in the body must
 * either match a known value or not look like a citation at all.
 *
 * Deliberately narrow. It checks the claim shapes that (a) a reader would act on
 * and (b) have exactly one correct value. It does not attempt to fact-check prose
 * in general, because a guard that flags everything gets switched off.
 */

/**
 * Regulations the generator is allowed to cite, from the FACTS block it is given.
 *
 * An allowlist rather than a format check: "Permen ESDM No. 5 Tahun 2023" is
 * perfectly well-formed and completely fabricated. Adding a regulation here is a
 * deliberate act that should accompany adding it to FACTS in
 * generate-article.mjs, so the two never drift apart.
 */
export const KNOWN_REGULATIONS = [
	{ pattern: /permen\s*(?:en)?\s*esdm/i, nomor: '2', tahun: '2024', label: 'Permen ESDM No. 2 Tahun 2024' },
];

/**
 * Constants with exactly one correct value, from the same FACTS block.
 *
 * `near` allows the rounding a writer legitimately does (0,87 -> 0,9); `exact`
 * does not, because "TKDN minimal 35 persen" is not a rounding of 40, it is a
 * different claim with contractual consequences.
 */
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

/**
 * CAPEX for a 1 MWp system. The FACTS block gives Rp 9-13 miliar, with a worked
 * example at Rp 11 miliar. A number outside that band presented as the cost of a
 * 1 MWp system is either a fabrication or a unit slip, and both mislead a buyer
 * building a budget.
 */
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
	// BUMN dan lembaga nyata di lanskap PV Indonesia. Menyebut mereka dalam
	// artikel industri itu sah; yang dilarang adalah mengarang klien.
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

/**
 * @param {object} a
 * @param {string} a.body   markdown body, frontmatter already stripped
 * @returns {{errors: string[], warnings: string[]}}
 */
export function checkFacts({ body }) {
	const errors = [];
	const warnings = [];
	const text = stripCode(body);

	// --- regulations --------------------------------------------------------
	// Any "<reg> No. X Tahun Y" must match the allowlisted number AND year.
	// Both are checked: the right regulation cited with the wrong year is still a
	// wrong citation, and a reader looking it up finds nothing.
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

	// A bare "Permen ESDM" with no number is fine; one with a year that is not
	// 2024 is a citation with a wrong date attached to it.
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

	// --- CAPEX band ---------------------------------------------------------
	// The number must be anchored to BOTH a 1 MWp system and a capital-cost word,
	// with no "opex" between them.
	//
	// The first version of this only required "1 MWp" within 80 characters, and
	// it failed on three real articles that say "PLTS 1 MWp dengan CAPEX Rp 11
	// miliar dan OPEX Rp 220 juta per tahun" - flagging the OPEX figure, which is
	// correct, as a CAPEX unit error. A guard that fires on correct articles gets
	// switched off, so the anchor has to be precise.
	// The exclusion list is the whole rule. Every term here appeared in a real
	// article, attached to a rupiah figure, in the same clause as the word CAPEX:
	//   "Dengan CAPEX Rp 11 miliar dibagi penghematan neto Rp 1,46 miliar"
	//   "Pada rentang CAPEX itu dan penghematan neto Rp 1,46 miliar per tahun"
	// Both are correct sentences. Without these exclusions the guard reads the
	// savings figure as the system cost and rejects a good article.
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

	// --- invented case studies ----------------------------------------------
	// Naming a real company in an industry piece is legitimate - the existing
	// articles name PT PLN and PT LEN Industri correctly, and an earlier version
	// of this rule rejected both. What is NOT legitimate is an unnamed-source
	// success story: "PT Sinar Abadi berhasil menghemat 40%" reads as a reference
	// customer the sales team can be asked about and cannot produce.
	//
	// So the error fires only on the case-study SHAPE. A bare mention is a
	// warning, which is enough to hold it back in unattended mode without
	// rejecting an article for saying "PLN".
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

	// --- malformed URLs -----------------------------------------------------
	// Whether a URL resolves is answered by verifyExternalLinks(), which fetches
	// it. Guessing from path depth flagged nrel.gov/docs/fy18osti/68696.pdf - a
	// real document - so that guess is gone.
	// Every link target is checked, not just the ones that already look like
	// http(s). An earlier version matched /https?:\/\// and so "htp:/salah-url"
	// - a typo'd scheme, exactly the kind of thing worth catching - was not even
	// examined. A link the model mistyped is a dead link on a published page.
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

	// --- unverifiable precision --------------------------------------------
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

/**
 * Fetch every external link and report the ones that do not resolve.
 *
 * This replaces guessing from URL shape. A fabricated citation is not "deep",
 * it is *absent* - and the only way to know the difference between
 * `nrel.gov/docs/fy18osti/68696.pdf` (real) and a plausible-looking sibling the
 * model invented is to ask the server.
 *
 * Runs in the generation loop, where a 404 becomes a retry with the failure fed
 * back, and again before unattended publishing. Network failures are reported as
 * warnings rather than errors: a timeout means the check did not run, not that
 * the link is bad, and refusing to publish because a government site was slow
 * would be a gate that punishes the wrong thing.
 *
 * @param {string} body markdown body
 * @param {{timeoutMs?: number, concurrency?: number}} [opts]
 * @returns {Promise<{errors: string[], warnings: string[], checked: number}>}
 */
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
			// HEAD first - cheap, and enough for most servers. Some reject it with
			// 405 while serving the page fine, so that falls through to GET.
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
