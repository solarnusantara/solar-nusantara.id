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
const MIN_H2 = 4;
const MIN_INTERNAL_LINKS = 2;
const MIN_EXTERNAL_LINKS = 1;
const MIN_WORDS = 700;
const MAX_WORDS = 2500;

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
 * @returns {{errors: string[], warnings: string[], stats: object}}
 */
export function checkSeo({ title, focusKeyphrase, body }) {
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
	if (wordCount < MIN_WORDS) errors.push(`${wordCount} words; a B2B article needs at least ${MIN_WORDS}`);
	if (wordCount > MAX_WORDS) warnings.push(`${wordCount} words; over ${MAX_WORDS} is usually padding`);

	// --- structure ---------------------------------------------------------
	const h2s = [...body.matchAll(/^##\s+(?!#)/gm)].length;
	if (h2s < MIN_H2) errors.push(`${h2s} "## " headings; at least ${MIN_H2} are needed for a scannable article`);

	const hasList = /^\s*[-*]\s+\S/m.test(body) || /^\s*\d+\.\s+\S/m.test(body);
	if (!hasList) errors.push('no bullet or numbered list - at least one is required for scannability');

	// --- readability -------------------------------------------------------
	const longParas = paragraphs(body)
		.map((p, i) => ({ i, n: sentenceCount(p) }))
		.filter((p) => p.n > MAX_SENTENCES_PER_PARAGRAPH);
	if (longParas.length) {
		errors.push(
			`${longParas.length} paragraph(s) longer than ${MAX_SENTENCES_PER_PARAGRAPH} sentences ` +
				`(longest: ${Math.max(...longParas.map((p) => p.n))})`,
		);
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
