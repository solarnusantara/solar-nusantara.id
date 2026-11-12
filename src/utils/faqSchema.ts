/**
 * FAQPage schema for pages whose frontmatter carries a `faq` list.
 *
 * The node is passed to Layout.astro's `jsonLd` prop and merged into the page's
 * single @graph. The question and answer strings are the same ones the page
 * renders (components/FaqSection.astro), so the markup never drifts from the
 * visible text. Both must stay plain text.
 */

export interface FaqItem {
	q: string;
	a: string;
}

export function buildFaqSchema(url: string, faq: FaqItem[] | undefined): Record<string, unknown>[] {
	if (!faq || faq.length === 0) return [];
	return [
		{
			'@type': 'FAQPage',
			'@id': `${url}#faq`,
			url,
			mainEntity: faq.map(({ q, a }) => ({
				'@type': 'Question',
				name: q,
				acceptedAnswer: { '@type': 'Answer', text: a },
			})),
		},
	];
}
