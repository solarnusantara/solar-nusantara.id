/**
 * Article + breadcrumb schema for the `berita` collection.
 *
 * Built as one helper because the site is being prepared for ~1000 articles.
 * At that scale the failure mode is not "this page lacks schema", it is "997
 * pages drifted from the 3 that were done by hand". Every article route calls
 * this; nothing writes Article JSON-LD inline.
 *
 * Contract with src/layouts/Layout.astro: the nodes returned here are passed to
 * its `jsonLd` prop and merged into the page's single @graph. They therefore
 * reference the publisher and site by @id (`#organization`, `#website`) rather
 * than restating them, so one page never ships two competing descriptions of
 * the same organisation.
 */

export interface ArticleSchemaInput {
	/** Canonical absolute URL of the article. */
	url: string;
	/** Site origin, e.g. https://solar-nusantara.id (no trailing slash). */
	baseUrl: string;
	title: string;
	description: string;
	/** Absolute URL of the hero image, if the article has one. */
	imageUrl?: string;
	datePublished: Date;
	dateModified?: Date;
	authorName?: string;
	authorUrl?: string;
	/** Body word count, used for wordCount. */
	wordCount?: number;
	/** Section label shown in the breadcrumb, e.g. "Berita". */
	sectionName?: string;
	/** Section URL path, e.g. "/berita". */
	sectionPath?: string;
}

/**
 * Google truncates the headline it displays and documents a 110-character
 * ceiling for the field. Longer values are not rejected outright, but trimming
 * here keeps the structured headline and the rendered <h1> from disagreeing in
 * a way that looks like two different titles.
 */
const HEADLINE_MAX = 110;

function trimHeadline(value: string): string {
	const clean = value.replace(/\s+/g, ' ').trim();
	if (clean.length <= HEADLINE_MAX) return clean;
	const cut = clean.slice(0, HEADLINE_MAX);
	const lastSpace = cut.lastIndexOf(' ');
	return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:\-|&+/]+$/, '');
}

export function buildArticleSchema(input: ArticleSchemaInput): Record<string, unknown>[] {
	const {
		url,
		baseUrl,
		title,
		description,
		imageUrl,
		datePublished,
		dateModified,
		authorName,
		authorUrl,
		wordCount,
		sectionName = 'Berita',
		sectionPath = '/berita',
	} = input;

	const origin = baseUrl.replace(/\/$/, '');

	// `author` is required by Google for Article. When the frontmatter names a
	// person, credit the person; otherwise credit the site as an Organization
	// named exactly as the visible byline ("Oleh Solar Nusantara"). It carries
	// its own name because an @id reference would resolve to the legal name
	// "PT Tripower Solar Nusantara", which would disagree with the byline.
	const author = authorName
		? {
				'@type': 'Person',
				name: authorName,
				...(authorUrl ? { url: authorUrl } : {}),
			}
		: { '@type': 'Organization', name: 'Solar Nusantara', url: `${origin}/` };

	const article: Record<string, unknown> = {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		isPartOf: { '@id': `${origin}/#website` },
		mainEntityOfPage: url,
		url,
		headline: trimHeadline(title),
		name: title,
		description,
		inLanguage: 'id-ID',
		datePublished: datePublished.toISOString(),
		// Google reads dateModified to judge freshness. With no explicit update
		// date, publication date is the honest answer - never "now", which would
		// falsely claim every article was revised on every build.
		dateModified: (dateModified ?? datePublished).toISOString(),
		author,
		publisher: { '@id': `${origin}/#organization` },
		...(imageUrl ? { image: imageUrl } : {}),
		...(wordCount ? { wordCount } : {}),
	};

	// Trailing slash matters: the section page is served at /berita/ and links to
	// it everywhere else carry the slash. A breadcrumb pointing at /berita names
	// a URL that only 301s to the real one.
	const sectionUrl = `${origin}${sectionPath.replace(/\/$/, '')}/`;

	const breadcrumb = {
		'@type': 'BreadcrumbList',
		'@id': `${url}#breadcrumb`,
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Beranda', item: `${origin}/` },
			{ '@type': 'ListItem', position: 2, name: sectionName, item: sectionUrl },
			// The last crumb carries no `item`: it is the current page, and a
			// self-link here is what makes Search Console report
			// "Either 'name' or 'item' should be specified".
			{ '@type': 'ListItem', position: 3, name: title },
		],
	};

	return [article, breadcrumb];
}
