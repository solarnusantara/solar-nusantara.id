import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles } from '../utils/articles';
import { resolveAuthor } from '../data/authors';

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(context: APIContext) {
	// Same helper as /berita/: drafts are excluded, newest first.
	const posts = (await getPublishedArticles()).slice(0, 50);

	return rss({
		title: 'Berita Solar Nusantara',
		description:
			'Artikel dan panduan teknis energi surya dari Solar Nusantara: perhitungan sistem PLTS, komponen, dan perkembangan industri fotovoltaik di Indonesia.',
		site: context.site ?? 'https://solar-nusantara.id',
		xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
		customData: '<language>id-ID</language>',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/berita/${post.slug}/`,
			pubDate: post.data.pubDate,
			customData: `<dc:creator>${escapeXml(resolveAuthor(post.data).name)}</dc:creator>`,
		})),
	});
}
