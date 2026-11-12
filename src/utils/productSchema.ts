/**
 * Product node for the /produk/* content pages, merged into the page's single
 * @graph through Layout's `jsonLd` prop (see articleSchema.ts for the contract).
 *
 * What it deliberately does not say. SONUS sells these on request, so there is
 * no public price and no stock level: the Offer carries seller, URL and market
 * only, and nothing is invented to satisfy a rich-result checklist. Without a
 * price and image Google will not show a product snippet, but the facts below
 * (TKDN, warranty) are still machine-readable for AI answers, which is the point.
 * Add `price` + `priceCurrency` to the Offer if a list price is ever published.
 */
export interface ProductProperty {
	name: string;
	value: string | number;
	/** Unit shown to people and machines, e.g. "%" or "tahun". */
	unit?: string;
}

export interface ProductSchemaInput {
	url: string;
	baseUrl: string;
	name: string;
	description?: string;
	/** Verifiable facts stated on the page, from the page's `properties` frontmatter. */
	properties?: ProductProperty[];
}

export function buildProductSchema({ url, baseUrl, name, description, properties = [] }: ProductSchemaInput) {
	const origin = baseUrl.replace(/\/$/, '');

	return [
		{
			'@type': 'Product',
			'@id': `${url}#product`,
			name,
			url,
			...(description ? { description } : {}),
			brand: { '@type': 'Brand', name: 'SONUS' },
			...(properties.length
				? {
						additionalProperty: properties.map((p) => ({
							'@type': 'PropertyValue',
							name: p.name,
							value: p.value,
							...(p.unit ? { unitText: p.unit } : {}),
						})),
					}
				: {}),
			offers: {
				'@type': 'Offer',
				url,
				seller: { '@id': `${origin}/#organization` },
				areaServed: { '@type': 'Country', name: 'Indonesia' },
			},
		},
	];
}
