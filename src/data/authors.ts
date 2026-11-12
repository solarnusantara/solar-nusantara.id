/**
 * Named article authors. One registry feeds the visible byline, the bio box
 * under each article, the BlogPosting `author` node and the editorial-team card
 * on /tentang/tim-kita - so the person a reader sees, the person a crawler
 * reads and the profile they land on can never disagree.
 *
 * `sameAs` is left empty until real profile URLs are supplied: the schema omits
 * it rather than guessing at links to someone's accounts.
 */
export interface Author {
	id: string;
	name: string;
	jobTitle: string;
	bio: string;
	sameAs: string[];
}

export const AUTHORS: Record<string, Author> = {
	'rahma-putri-anjani': {
		id: 'rahma-putri-anjani',
		name: 'Rahma Putri Anjani',
		jobTitle: 'Writer',
		bio: 'Rahma Putri Anjani menulis artikel teknis dan panduan pengadaan energi surya di Solar Nusantara.',
		sameAs: [],
	},
};

/** Byline for any article whose frontmatter does not name someone else. */
export const DEFAULT_AUTHOR_ID = 'rahma-putri-anjani';

export const TEAM_PAGE = '/tentang/tim-kita/';

/** Profile URL (path) of a registry author, anchored to their card on the team page. */
export const authorProfilePath = (a: Pick<Author, 'id'>) => `${TEAM_PAGE}#${a.id}`;

export interface ResolvedAuthor {
	name: string;
	/** Registry author, when the byline matches one; absent for an outside contributor. */
	registry?: Author;
	/** Where the byline links: the team-page profile, or the frontmatter `authorUrl`. */
	url?: string;
}

/**
 * Who an article is credited to. No frontmatter `author` means the default
 * author; a name that matches the registry gets the full profile; any other
 * name (a guest or an earlier contributor) is credited as written, with
 * whatever `authorUrl` the frontmatter gave.
 */
export function resolveAuthor(data: { author?: string; authorUrl?: string }): ResolvedAuthor {
	const name = data.author?.trim();
	const registry = name
		? Object.values(AUTHORS).find((a) => a.name.toLowerCase() === name.toLowerCase())
		: AUTHORS[DEFAULT_AUTHOR_ID];

	if (registry) return { name: registry.name, registry, url: authorProfilePath(registry) };
	return { name: name!, url: data.authorUrl };
}
