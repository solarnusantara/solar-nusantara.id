/**
 * Where an article lives, by state.
 *
 *   drafts/berita/<slug>/        written, not published. Astro never reads this folder.
 *   src/content/berita/<slug>/   live. publish-drip moves an article here, and only then.
 *
 * The folder is the state: a draft is never mixed in with the live articles, so
 * `ls drafts/berita` is the stock of what will go out next.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const LIVE_DIR = 'src/content/berita';
export const DRAFTS_DIR = 'drafts/berita';

export const draftDir = (slug) => join(DRAFTS_DIR, slug);
export const liveDir = (slug) => join(LIVE_DIR, slug);

/** Where the article is now: the drafts folder if it is still a draft, otherwise the live one. */
export const articleDir = (slug) => (existsSync(draftDir(slug)) ? draftDir(slug) : liveDir(slug));

/** A slug is the URL, so it must be free in both places. */
export const slugTaken = (slug) => existsSync(draftDir(slug)) || existsSync(liveDir(slug));

/** [{slug, dir}] for every article folder, drafts and live. For checks that must see all of them. */
export function allArticleDirs() {
	const out = [];
	for (const root of [DRAFTS_DIR, LIVE_DIR]) {
		if (!existsSync(root)) continue;
		for (const e of readdirSync(root, { withFileTypes: true })) if (e.isDirectory()) out.push({ slug: e.name, dir: join(root, e.name) });
	}
	return out;
}
