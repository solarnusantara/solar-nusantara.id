/** SEO-writing rules as pure functions, shared by the generation loop and the gate so the two cannot drift. */

const INTRO_WORDS = 150;
const DENSITY_MIN = 0.003; // 0.3%
const DENSITY_MAX = 0.025; // 2.5%
const MAX_SENTENCES_PER_PARAGRAPH = 4;
const MIN_INTERNAL_LINKS = 2;
const MIN_EXTERNAL_LINKS = 1;
const MIN_CONVERSION_LINKS = 1;

/** Length and structure per article kind: a pillar runs 1,800-2,500 words, its clusters do not. */
const KIND_RULES = {
	pillar: { minWords: 1600, maxWords: 3000, minH2: 6 },
	longtail: { minWords: 700, maxWords: 1800, minH2: 4 },
};

/** Internal-link prefixes that count as a commercial destination; /berita/ is deliberately absent. */
export const CONVERSION_PREFIXES = ['/layanan/', '/produk/', '/tentang/sonushub/', '/kontak/'];

/** Domains worth citing from a technical B2B energy article; an open allowlist would admit content farms. */
export const TRUSTED_EXTERNAL = [
	'esdm.go.id',
	'ebtke.esdm.go.id',
	'jdih.esdm.go.id',
	'pln.co.id',
	'web.pln.co.id',
	'bps.go.id',
	'peraturan.go.id',
	'setneg.go.id',
	'kemenperin.go.id',
	'bsn.go.id',
	'iea.org',
	'irena.org',
	'nrel.gov',
	'energy.gov',
	'iec.ch',
	'ghgprotocol.org',
	'worldbank.org',
	'globalsolaratlas.info',
];

/** Strip markdown noise so word counts and matches see prose, not syntax. */
function toPlainText(body) {
	return body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/^[#>\-*|]+/gm, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function normalize(s) {
	return s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function words(text) {
	const n = normalize(text);
	return n ? n.split(' ') : [];
}

/** Every token of `phrase` present somewhere in `text`, order-free. */
export function containsLoose(text, phrase) {
	const haystack = new Set(words(text));
	return words(phrase).every((t) => haystack.has(t));
}

/** `phrase` present verbatim (after normalisation). */
export function containsExact(text, phrase) {
	return normalize(text).includes(normalize(phrase));
}

/** Split the body into blocks, dropping fenced code and HTML-only blocks. */
function paragraphs(body) {
	return body
		.replace(/```[\s\S]*?```/g, '')
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean)
		.filter((p) => !p.startsWith('#'))
		.filter((p) => !/^[-*|>]/.test(p))
		// Numbered lists too, or a five-step calculation trips the readability rule that the list rule requires.
		.filter((p) => !/^\d+[.)]\s/.test(p))
		.filter((p) => !/^</.test(p));
}

function sentenceCount(paragraph) {
	const plain = toPlainText(paragraph);
	if (!plain) return 0;
	// Guard Indonesian abbreviations so a trailing period does not inflate the sentence count.
	const guarded = plain.replace(/\b(dll|dsb|dst|yg|tsb|No|Nomor|Rp|kWp|MWp)\./gi, '$1');
	return guarded.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;
}

/** Run every SEO rule against one article; kind defaults to longtail. */
export function checkSeo({ title, focusKeyphrase, body, kind = 'longtail' }) {
	const rules = KIND_RULES[kind] ?? KIND_RULES.longtail;
	const errors = [];
	const warnings = [];

	if (!focusKeyphrase) {
		return {
			errors: ['no focusKeyphrase - every SEO rule is measured against it'],
			warnings: [],
			stats: {},
		};
	}

	const plain = toPlainText(body);
	const allWords = words(plain);
	const wordCount = allWords.length;

	// --- keyword placement -------------------------------------------------
	if (!containsLoose(title, focusKeyphrase)) {
		errors.push(`focusKeyphrase "${focusKeyphrase}" is not in the title`);
	}

	const intro = allWords.slice(0, INTRO_WORDS).join(' ');
	if (!containsLoose(intro, focusKeyphrase)) {
		errors.push(`focusKeyphrase is not in the first ${INTRO_WORDS} words`);
	}

	const headings = [...body.matchAll(/^#{2,4}\s+(.+)$/gm)].map((m) => m[1]);
	if (!headings.some((h) => containsLoose(h, focusKeyphrase))) {
		errors.push('focusKeyphrase is not in any heading');
	}

	// The conclusion is the text after the last heading.
	const lastHeadingAt = body.lastIndexOf('\n## ');
	const conclusion = lastHeadingAt === -1 ? plain.slice(-600) : toPlainText(body.slice(lastHeadingAt));
	if (!containsLoose(conclusion, focusKeyphrase)) {
		errors.push('focusKeyphrase is not in the closing section');
	}

	// --- density -----------------------------------------------------------
	const phraseWords = words(focusKeyphrase).length;
	const normBody = normalize(plain);
	const normPhrase = normalize(focusKeyphrase);
	let occurrences = 0;
	let at = normBody.indexOf(normPhrase);
	while (at !== -1) {
		occurrences += 1;
		at = normBody.indexOf(normPhrase, at + normPhrase.length);
	}
	const density = wordCount ? (occurrences * phraseWords) / wordCount : 0;

	if (occurrences === 0) {
		errors.push('focusKeyphrase never appears verbatim in the body');
	} else if (density < DENSITY_MIN) {
		warnings.push(`keyphrase density ${(density * 100).toFixed(2)}% is below ${(DENSITY_MIN * 100).toFixed(1)}%`);
	} else if (density > DENSITY_MAX) {
		errors.push(
			`keyphrase density ${(density * 100).toFixed(2)}% exceeds ${(DENSITY_MAX * 100).toFixed(1)}% - ` +
				`${occurrences} occurrences in ${wordCount} words reads as keyword stuffing`,
		);
	}

	// --- length ------------------------------------------------------------
	if (wordCount < rules.minWords) {
		errors.push(`${wordCount} words; a ${kind} article needs at least ${rules.minWords}`);
	}
	if (wordCount > rules.maxWords) {
		warnings.push(`${wordCount} words; over ${rules.maxWords} for a ${kind} is usually padding`);
	}

	// --- structure ---------------------------------------------------------
	const h2s = [...body.matchAll(/^##\s+(?!#)/gm)].length;
	if (h2s < rules.minH2) {
		errors.push(`${h2s} "## " headings; a ${kind} needs at least ${rules.minH2} for a scannable article`);
	}

	const hasList = /^\s*[-*]\s+\S/m.test(body) || /^\s*\d+\.\s+\S/m.test(body);
	if (!hasList) errors.push('no bullet or numbered list - at least one is required for scannability');

	// Name the offending paragraph - the generator feeds these errors straight back into a retry.
	const longParas = paragraphs(body)
		.map((p) => ({ text: p, n: sentenceCount(p) }))
		.filter((p) => p.n > MAX_SENTENCES_PER_PARAGRAPH)
		.sort((a, b) => b.n - a.n);
	for (const p of longParas.slice(0, 3)) {
		errors.push(
			`paragraf ${p.n} kalimat (maks ${MAX_SENTENCES_PER_PARAGRAPH}), diawali: "${toPlainText(p.text).slice(0, 70)}..." ` +
				`- pecah jadi beberapa paragraf, atau ubah jadi daftar berpoin kalau isinya enumerasi`,
		);
	}
	if (longParas.length > 3) {
		errors.push(`dan ${longParas.length - 3} paragraf panjang lainnya`);
	}

	// Internal links need a trailing slash or GitHub Pages 301s them, and a link to a redirect is an audit finding.
	const links = [...body.matchAll(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g)].map((m) => m[2]);
	const internal = links.filter((h) => h.startsWith('/'));
	const external = links.filter((h) => /^https?:\/\//i.test(h));

	const badInternal = internal.filter((h) => !h.endsWith('/') && !h.includes('#'));
	for (const h of badInternal) {
		errors.push(`internal link "${h}" has no trailing slash - GitHub Pages will 301 it`);
	}
	if (internal.length < MIN_INTERNAL_LINKS) {
		errors.push(`${internal.length} internal link(s); at least ${MIN_INTERNAL_LINKS} are required`);
	}

	// At least one internal link must reach a conversion page; article-to-article links earn traffic that never converts.
	const conversion = internal.filter((h) => CONVERSION_PREFIXES.some((p) => h.startsWith(p)));
	if (conversion.length < MIN_CONVERSION_LINKS) {
		errors.push(
			`${conversion.length} link(s) to a conversion page; at least ${MIN_CONVERSION_LINKS} is required. ` +
				`Link to one of ${CONVERSION_PREFIXES.join(', ')} - a link to /berita/ does not count.`,
		);
	}

	const trustedHits = external.filter((h) => {
		try {
			const host = new URL(h).hostname.replace(/^www\./, '');
			return TRUSTED_EXTERNAL.some((d) => host === d || host.endsWith(`.${d}`));
		} catch {
			return false;
		}
	});
	if (trustedHits.length < MIN_EXTERNAL_LINKS) {
		errors.push(
			`${trustedHits.length} authoritative external link(s); at least ${MIN_EXTERNAL_LINKS} is required ` +
				`(allowed: ${TRUSTED_EXTERNAL.slice(0, 6).join(', ')}, ...)`,
		);
	}

	return {
		errors,
		warnings,
		stats: {
			wordCount,
			h2s,
			occurrences,
			density: Number((density * 100).toFixed(2)),
			internalLinks: internal.length,
			conversionLinks: conversion.length,
			externalTrusted: trustedHits.length,
		},
	};
}

/** Split a markdown file into frontmatter text and body. */
export function splitFrontmatter(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	return { frontmatter: m[1], body: raw.slice(m[0].length) };
}

/** Frontmatter parse good enough for `key: value`, matching check-content.mjs. */
export function parseFrontmatter(fmText) {
	const data = {};
	for (const line of fmText.split(/\r?\n/)) {
		const kv = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
		if (!kv) continue;
		let v = kv[2].trim();
		if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
			v = v.slice(1, -1);
		}
		data[kv[1]] = v;
	}
	return data;
}

/** Article kind, derived from the tags already in frontmatter so config.ts stays untouched. */
export function kindFromTags(rawTags) {
	return /\bpanduan\b/.test(String(rawTags ?? '')) ? 'pillar' : 'longtail';
}
