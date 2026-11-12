/**
 * BreadcrumbList for pages that live in the site navigation.
 *
 * The trail is read from navLinks, so the breadcrumb always matches the menu a
 * visitor sees (e.g. Beranda > Tentang > Berkolaborasi dengan > Mitra Suplier,
 * even though that page's URL has no "berkolaborasi-dengan" segment).
 *
 * Layout.astro calls this for any page that did not supply its own
 * BreadcrumbList; articles keep theirs (Beranda > Berita > title), which is not
 * a navigation path.
 */

import type { NavLink } from '../data/navLinks';

const norm = (path: string) => path.replace(/\/+$/, '') || '/';

/** The nav entries from the top level down to `pathname`, or [] if it is not in the nav. */
export function navTrail(links: NavLink[], pathname: string): NavLink[] {
	const target = norm(pathname);
	const walk = (list: NavLink[], acc: NavLink[]): NavLink[] | undefined => {
		for (const link of list) {
			const here = [...acc, link];
			if (link.href && norm(link.href) === target) return here;
			const found = link.children && walk(link.children, here);
			if (found) return found;
		}
	};
	return walk(links, []) ?? [];
}

export function buildBreadcrumb(
	url: string,
	origin: string,
	trail: NavLink[],
): Record<string, unknown> | undefined {
	// An entry without an href cannot be a middle crumb: Search Console flags a
	// ListItem that has neither a link nor, for non-last items, an `item`.
	const crumbs = trail.filter((l) => l.href && norm(l.href) !== '/');
	if (crumbs.length === 0) return undefined;
	const base = origin.replace(/\/$/, '');
	return {
		'@type': 'BreadcrumbList',
		'@id': `${url}#breadcrumb`,
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Beranda', item: `${base}/` },
			...crumbs.map((l, i) => ({
				'@type': 'ListItem',
				position: i + 2,
				name: l.text,
				// The last crumb is the current page and carries no `item`
				// (see articleSchema.ts).
				...(i < crumbs.length - 1 ? { item: `${base}${norm(l.href!)}/` } : {}),
			})),
		],
	};
}
