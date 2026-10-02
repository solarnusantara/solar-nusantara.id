/**
 * SEO rules for solar-nusantara.id articles, as pure functions.
 *
 * Shared by two callers on purpose:
 *   - scripts/generate-article.mjs runs them IN the generation loop, so a
 *     failing article is regenerated with the failures fed back into the prompt
 *     instead of being written to disk and found later.
 *   - scripts/check-seo.mjs runs them across the whole content directory as a
 *     gate, the way check-content.mjs does for structural rules.
 *
 * One definition, two callers. If these rules lived in both files they would
 * drift, and the gate would start disagreeing with the generator about what a
 * valid article is.
 *
 * Scope: these are the SEO-writing rules. Structural rules - slug shape,
 * description length, duplicate metadata, unescaped `$`, `#` in body, image alt
 * - belong to scripts/check-content.mjs and are NOT duplicated here.
 *
 * On matching. A focusKeyphrase like "biaya plts pabrik manufaktur" rarely
 * appears verbatim in natural Indonesian prose, and forcing it to would produce
 * exactly the robotic text this whole pipeline is trying to avoid. So:
 *   - placement checks (title, intro, heading, conclusion) match LOOSELY: every
 *     token of the keyphrase present in that region, order-free.
 *   - density matches the EXACT phrase, because density is only meaningful
 *     against a fixed string, and one verbatim occurrence somewhere in the body
 *     is a reasonable ask.
 */

const INTRO_WORDS = 150;
const DENSITY_MIN = 0.003; // 0.3%
const DENSITY_MAX = 0.025; // 2.5%
const MAX_SENTENCES_PER_PARAGRAPH = 4;
const MIN_INTERNAL_LINKS = 2;
const MIN_EXTERNAL_LINKS = 1;
const MIN_CONVERSION_LINKS = 1;

/**
 * Length and structure by article kind.
 *
 * A pillar and its seven children are not the same artifact. The B2B
 * pillar-cluster model that this matrix implements puts the pillar at
 * 1,800-2,500 words, structured for a featured snippet, with the clusters
 * covering long-tail variants underneath it. Holding both to one 700-word floor
 * produced 126 "pillars" that were the same size as the articles meant to hang
 * off them, which is a cluster with no centre.
 *
 * Floors sit slightly under the target because the model does not hit a word
 * count exactly and a 1,780-word pillar is not a defect.
 */
const KIND_RULES = {
	pillar: { minWords: 1600, maxWords: 3000, minH2: 6 },
	longtail: { minWords: 700, maxWords: 1800, minH2: 4 },
};

/**
 * Prefixes that represent a commercial destination rather than more reading.
 *
 * Linking articles to articles builds a crawlable graph and nothing else. The
 * playbook is explicit that a cluster links back to its pillar AND out to a
 * conversion page; without the second half the archive earns traffic that never
 * reaches a service page. /berita/ is deliberately absent from this list.
 */
export const CONVERSION_PREFIXES = ['/layanan/', '/produk/', '/tentang/sonushub/', '/kontak/'];

/**
 * Domains that are worth citing from a technical B2B energy article.
 *
 * The reference article's advice was "link to trustworthy sources"; on a domain
 * with no authority of its own, an outbound citation to the regulator whose
 * rule you are explaining is what makes the explanation checkable. An open
 * allowlist would let the model cite a content farm and still pass.
 */
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
		// Numbered lists too. Without this a five-step calculation reads as one
		// five-sentence paragraph and trips the readability rule - while the rule
		// two checks down REQUIRES a list. The two rules fought each other and the
		// list-bearing article lost, which is how a correct pillar draft was
		// rejected three times for a paragraph that was never a paragraph.
		.filter((p) => !/^\d+[.)]\s/.test(p))
		.filter((p) => !/^</.test(p));
}

function sentenceCount(paragraph) {
	const plain = toPlainText(paragraph);
	if (!plain) return 0;
	// Indonesian abbreviations that end in a period would otherwise inflate the
	// count and fail a perfectly readable paragraph.
	const guarded = plain.replace(/\b(dll|dsb|dst|yg|tsb|No|Nomor|Rp|kWp|MWp)\./gi, '$1');
	return guarded.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;
}

/**
 * Run every SEO rule against one article.
 *
 * @param {object} a
 * @param {string} a.title            frontmatter title
 * @param {string} a.focusKeyphrase   frontmatter focusKeyphrase
 * @param {string} a.body             markdown body, frontmatter already stripped
 * @param {'pillar'|'longtail'} [a.kind] article kind; defaults to longtail
 * @returns {{errors: string[], warnings: string[], stats: object}}
 */
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

	// The conclusion is the text after the last heading. Requiring the keyphrase
	// here is the reference article's "place it in the conclusion" rule, and it
	// doubles as a check that the article actually closes rather than trailing
	// off after the last subheading.
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

	// --- readability -------------------------------------------------------
	// The message names the offending paragraph. The generator feeds these errors
	// straight back into a retry prompt, and "1 paragraph longer than 4
	// sentences" gives the model nothing to act on - it rewrote the wrong parts
	// three times in a row. Quoting the opening makes the fix obvious, and the
	// usual cause has an obvious fix: an enumeration written as prose
	// ("Pertama... Kedua... Ketiga...") should be a list.
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

	// --- links -------------------------------------------------------------
	// Internal links must be root-relative WITH a trailing slash: GitHub Pages
	// 301s the slash-less form, and an internal link to a redirect is an audit
	// finding. docs/CONTENT-PLAYBOOK.md section 5.
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

	// At least one internal link has to leave the archive. Article-to-article
	// links make the corpus crawlable; only a link to a service or product page
	// turns a reader researching PLTS costs into an RFQ. An article that links
	// exclusively to /berita/ has done half the job the playbook describes.
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

/**
 * Article kind, read from the tags already in the frontmatter.
 *
 * plan-topics.mjs tags every pillar `panduan` and every long-tail `teknis`, so
 * the distinction is already on disk and schema-legal. Deriving it here rather
 * than adding a `kind:` frontmatter field keeps src/content/config.ts untouched
 * and means an article carries its own kind wherever it is read - the generator,
 * both gates, the review sheet and the staleness report all agree without
 * passing state between them.
 *
 * @param {string} rawTags the raw `tags:` line value from the frontmatter
 * @returns {'pillar'|'longtail'}
 */
export function kindFromTags(rawTags) {
	return /\bpanduan\b/.test(String(rawTags ?? '')) ? 'pillar' : 'longtail';
}
