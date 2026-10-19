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

import { BRANDS, brandByKey } from './brands.mjs';

/**
 * Regulations the generator is allowed to cite, from the FACTS block it is given.
 *
 * An allowlist rather than a format check: "Permen ESDM No. 5 Tahun 2023" is
 * perfectly well-formed and completely fabricated. Adding a regulation here is a
 * deliberate act that should accompany adding it to FACTS in
 * generate-article.mjs, so the two never drift apart.
 */
export const KNOWN_REGULATIONS = [
	// One regulation, three spellings: matching only "Permen ESDM" rejected its own long official form as a fabrication.
	{
		pattern: /(?:permen\s*(?:en)?\s*esdm|peraturan\s+menteri\s+esdm|peraturan\s+menteri\s+energi\s+dan\s+sumber\s+daya\s+mineral)/i,
		nomor: '2',
		tahun: '2024',
		label: 'Permen ESDM No. 2 Tahun 2024',
	},
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
];

/**
 * Cost figures. The FACTS block used to carry a CAPEX band and a CAPEX/OPEX example, and this
 * file checked articles against them. Since 2026-10-19 the generator is given no cost figure at
 * all - nothing the company could stand behind - so every one in an article is unsourced: a
 * rupiah amount, or a percentage tied to a cost word, is an error.
 */
const RUPIAH = /\brp\.?\s*\d[\d.,]*(?:\s*(?:ribu|rb|juta|jt|miliar|triliun))?/gi;
const COST_WORDS = 'capex|opex|roi|payback|lcoe|biaya|anggaran|harga|investasi|penghematan';
const COST_PERCENT = new RegExp(`(?:\\b(?:${COST_WORDS})\\b[^.\\n]{0,50}?\\d{1,3}(?:[.,]\\d+)?\\s*(?:%|persen))|(?:\\d{1,3}(?:[.,]\\d+)?\\s*(?:%|persen)[^.\\n]{0,50}?\\b(?:${COST_WORDS})\\b)`, 'gi');

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

/**
 * Product brands in the trade. A category article compares categories and specifications, not
 * brands: naming one reads as an endorsement, invites a claim nobody verified, and says which
 * suppliers sit behind the marketplace. There it is a WARNING, printed in the generate log where a
 * person can decide it is fine, rather than an error the model cannot reason its way around.
 *
 * A brand article (topic.brand, lib/brands.mjs) is about one brand, and naming any other one is
 * the comparison the plan rules out, so there it is an ERROR.
 */
const PRODUCT_BRANDS = [
	...new Set([
		...BRANDS.flatMap((b) => b.aliases),
		'tongwei', 'tcl solar', 'haitai', 'astronergy', 'canadian solar', 'risen',
		'solax', 'kstar', 'hopewind', 'sungrow', 'growatt', 'solis', 'luxpower',
		'jjlapp', 'sunkean', 'helukabel', 'kabelmetal', 'kmi', 'supreme', 'jembo', 'chint', 'schneider',
	]),
];

function stripCode(body) {
	return body.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
}

/** "9,5" and "9.5" both mean nine and a half in Indonesian prose. */
const toNumber = (s) => Number(String(s).replace(',', '.'));

/**
 * @param {object} a
 * @param {string} a.body   markdown body, frontmatter already stripped
 * @param {string} [a.brand] the topic's brand key, for a brand article
 * @returns {{errors: string[], warnings: string[]}}
 */
export function checkFacts({ body, brand }) {
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

	// --- cost figures -------------------------------------------------------
	// Any rupiah amount, and any percentage in the same clause as a cost word. The second catches
	// "modul menyumbang sekitar 40% CAPEX" as well as "biaya turun 15%".
	for (const m of text.matchAll(RUPIAH)) {
		errors.push(`angka rupiah disebut: "${m[0].trim()}" - artikel tidak memuat angka biaya`);
	}
	for (const m of text.matchAll(COST_PERCENT)) {
		errors.push(`persentase biaya disebut: "${m[0].trim().slice(0, 80)}" - artikel tidak memuat angka biaya`);
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

	// --- product brands -----------------------------------------------------
	const lower = text.toLowerCase();
	const own = brand ? brandByKey(brand) : null;
	if (brand && !own) errors.push(`merek "${brand}" tidak ada di lib/brands.mjs`);
	const named = PRODUCT_BRANDS.filter((b) => !own?.aliases.includes(b) && new RegExp(`(^|[^a-z0-9])${b}([^a-z0-9]|$)`).test(lower));
	if (named.length && own) errors.push(`merek lain disebut: ${named.join(', ')} - artikel ini hanya membahas ${own.name}, tanpa membandingkan merek`);
	else if (named.length) warnings.push(`merek produk disebut: ${named.join(', ')} - artikel membandingkan kategori, bukan merek`);

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
