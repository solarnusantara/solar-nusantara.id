/**
 * Service schema for the `layanan` collection.
 *
 * Same contract as articleSchema.ts: the nodes returned here are passed to
 * Layout.astro's `jsonLd` prop and merged into the page's single @graph, so
 * they reference the provider by @id (`#organization`) instead of restating it.
 * The layanan route calls this; nothing writes Service JSON-LD inline. The page's
 * BreadcrumbList is added by Layout.astro from the navigation (utils/breadcrumb.ts).
 */

export interface ServiceSchemaInput {
	/** Canonical absolute URL of the service page. */
	url: string;
	/** Site origin, e.g. https://solar-nusantara.id (no trailing slash). */
	baseUrl: string;
	title: string;
	description: string;
}

export function buildServiceSchema(input: ServiceSchemaInput): Record<string, unknown>[] {
	const { url, baseUrl, title, description } = input;
	const origin = baseUrl.replace(/\/$/, '');

	const service = {
		'@type': 'Service',
		'@id': `${url}#service`,
		name: title,
		serviceType: title,
		description,
		url,
		provider: { '@id': `${origin}/#organization` },
		areaServed: { '@type': 'Country', name: 'Indonesia' },
	};

	return [service];
}
