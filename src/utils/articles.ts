import { getCollection, type CollectionEntry } from 'astro:content';
import { queuedDraftSlugs } from './draftQueue';

export type Article = CollectionEntry<'berita'>;

/**
 * The one way to read the `berita` collection.
 *
 * Six separate places used to call `getCollection('berita')` directly - the
 * homepage, the footer, the search endpoint, the listing, the paginated
 * listing and the article route - each re-implementing its own sort and none
 * of them filtering drafts (nothing filtered drafts, because nothing read the
 * field). At ~1000 articles that is five chances for one listing to disagree
 * with another about what is published.
 *
 * Sorted newest first, which is what every caller wanted anyway.
 */
export async function getPublishedArticles(): Promise<Article[]> {
	const posts = await getCollection('berita', ({ data }) => data.draft !== true);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Related articles for the bottom of an article page.
 *
 * Internal links are the mechanism that keeps a large archive crawlable: with
 * 1000 articles and a 6-per-page listing, article 200 sits 30+ clicks from
 * /berita/ and is an orphan for practical purposes. Every article linking to
 * 3 siblings turns that flat list into a connected graph.
 *
 * Ranking is deliberately simple and deterministic - shared tags first, then
 * recency - so the same page always produces the same links and the HTML is
 * stable between builds.
 */
export function getRelatedArticles(
	current: { slug: string; data: Pick<Article['data'], 'tags'> },
	all: Article[],
	limit = 3,
): Article[] {
	const currentTags = new Set(current.data.tags ?? []);

	const scored = all
		.filter((p) => p.slug !== current.slug)
		.map((p) => {
			const shared = (p.data.tags ?? []).filter((t) => currentTags.has(t)).length;
			return { post: p, shared };
		});

	scored.sort((a, b) => {
		if (b.shared !== a.shared) return b.shared - a.shared;
		return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
	});

	return scored.slice(0, limit).map((s) => s.post);
}

/**
 * Does this article body contain math that needs the KaTeX stylesheet?
 *
 * remark-math reads `$...$` and `$$...$$`. Checked against the raw body so no
 * author has to remember a frontmatter flag. 3 of 18 articles match today; the
 * other 15 no longer request a render-blocking cross-origin stylesheet.
 */
export function hasMath(body: string): boolean {
	return /\$\$[\s\S]+?\$\$/.test(body) || /(?<!\$)\$(?!\s)[^\n$]+?(?<!\s)\$(?!\$)/.test(body);
}

/**
 * Words a reader actually reads in a markdown body. `body.split(/\s+/)` also
 * counted table pipes and `|---|` rules, heading hashes, list markers, link
 * targets and math delimiters as words, which inflated both the reading time
 * and the BlogPosting wordCount. Anything with no letter or digit is not a word.
 */
export function countWords(markdown: string): number {
	const text = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/\$\$[\s\S]*?\$\$/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ');
	return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

export type DraftPreview = CollectionEntry<'pratinjau'>;

/** The drafts waiting to be published, next in line first. Rendered only under /pratinjau/. */
export async function getQueuedDrafts(): Promise<DraftPreview[]> {
	const order = queuedDraftSlugs();
	// Filtered as well as loaded by the queue: with nothing queued the glob loader matches no file
	// and returns without clearing the data store, so last build's entries would still be there.
	const drafts = await getCollection('pratinjau', ({ id }) => order.includes(id));
	return drafts.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}
