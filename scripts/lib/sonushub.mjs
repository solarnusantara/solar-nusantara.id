/**
 * Where the articles send readers: https://sonushub.id/
 *
 * The articles live on solar-nusantara.id, but their job is to move buyers to the
 * SonusHUB catalogue. Every URL an article may link to there is listed HERE, once, and
 * nothing else is accepted - the plan, the prompt and the SEO gate all read this file.
 *
 * An allowlist instead of "any sonushub.id link", because sonushub.id renders its
 * product grids in the browser: an invented /category/... path can answer 200 and still
 * be an empty page, so fetching a link is not proof that it is real. Every path below
 * was opened and checked by hand on 2026-10-12.
 */
export const SONUSHUB_ORIGIN = 'https://sonushub.id';
export const SONUSHUB_HOSTS = ['sonushub.id', 'www.sonushub.id'];

/** Pages that are not tied to one product. Any article may use one as its second SonusHUB link. */
export const SONUSHUB_GENERAL = [
	`${SONUSHUB_ORIGIN}/`,
	`${SONUSHUB_ORIGIN}/products`,
	`${SONUSHUB_ORIGIN}/categories`,
	`${SONUSHUB_ORIGIN}/kalkulator-panel-surya`,
];

/**
 * The category page that sells what each product article is about.
 *
 * `perawatan` (maintenance and cleaning) and `proyek` have NO category on SonusHUB: it
 * sells material, not services. Their articles link to the nearest honest page - the
 * catalogue for a project's material list, the sizing calculator for a project's start -
 * rather than to a category that does not match. If SonusHUB gets a page for either,
 * change the line here and re-run `npm run plan-topics`.
 */
export const SONUSHUB_PRODUCT = {
	'mounting-rel': `${SONUSHUB_ORIGIN}/category/mnt-pv-rail-mounting-hardware-sh`,
	'walkway-tray': `${SONUSHUB_ORIGIN}/category/cable-trays-trunking-fittings-cr`,
	'kabel-dc': `${SONUSHUB_ORIGIN}/category/crx-dc-pv-cable-sh`,
	'kabel-ac': `${SONUSHUB_ORIGIN}/category/crx-ac-power-cable-sh`,
	'pv-modul': `${SONUSHUB_ORIGIN}/category/pvx-solar-modules-sh`,
	inverter: `${SONUSHUB_ORIGIN}/category/inx-string-hybrid-inverters-sh`,
	perawatan: `${SONUSHUB_ORIGIN}/products`,
	proyek: `${SONUSHUB_ORIGIN}/kalkulator-panel-surya`,
};

const normalize = (u) => u.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/';
export const SONUSHUB_ALLOWED = new Set([...SONUSHUB_GENERAL, ...Object.values(SONUSHUB_PRODUCT)].map(normalize));

export function isSonushub(href) {
	try {
		return SONUSHUB_HOSTS.includes(new URL(href).hostname);
	} catch {
		return false;
	}
}

/** True for a SonusHUB URL that is on the allowlist (query string and trailing slash ignored). */
export function isAllowedSonushub(href) {
	try {
		const u = new URL(href);
		return SONUSHUB_ALLOWED.has(normalize(`${SONUSHUB_ORIGIN}${u.pathname}`));
	} catch {
		return false;
	}
}

// --- tracking ---------------------------------------------------------------
/**
 * Every link to SonusHUB carries UTM parameters, so sonushub.id's analytics can say which
 * article sent a visit instead of lumping all of it under "referral from solar-nusantara.id".
 *
 *   utm_source   solar-nusantara.id
 *   utm_medium   artikel
 *   utm_campaign the product (mounting-rel, kabel-dc, ...)  - which category of demand
 *   utm_content  the article's slug                         - which article
 *   utm_term     isi | cta                                  - a link in the prose, or the closing CTA block
 *
 * Added by the script when the article file is assembled, never written by the model: a model
 * asked to produce UTM strings invents inconsistent ones, and the gates then have to allow them.
 */
export const UTM_SOURCE = 'solar-nusantara.id';
export const UTM_MEDIUM = 'artikel';

/** @returns {string} the URL with UTM parameters; unchanged if it already carries utm_source */
export function withUtm(href, { campaign, content, term }) {
	const u = new URL(href);
	if (u.searchParams.has('utm_source')) return href;
	u.searchParams.set('utm_source', UTM_SOURCE);
	u.searchParams.set('utm_medium', UTM_MEDIUM);
	if (campaign) u.searchParams.set('utm_campaign', campaign);
	if (content) u.searchParams.set('utm_content', content);
	if (term) u.searchParams.set('utm_term', term);
	return u.toString();
}

/** Tag every markdown link to SonusHUB in `markdown`. Links elsewhere are left alone. */
export function tagSonushubLinks(markdown, params) {
	return markdown.replace(/\]\((https?:\/\/[^)\s]+)\)/g, (whole, href) => (isSonushub(href) ? `](${withUtm(href, params)})` : whole));
}
