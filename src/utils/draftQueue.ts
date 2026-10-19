import { readFileSync } from 'node:fs';

/**
 * The slugs publish-drip will publish, in the order it will publish them.
 *
 * The same selection as readyDrafts() in scripts/lib/topic-store.mjs: topics
 * with `status: generated` that are not legacy, by rank. The legacy and failed
 * drafts in drafts/berita are never going out, so they have nothing to preview.
 * Read at build time, which is why a push touching data/ or drafts/ redeploys.
 */
export function queuedDraftSlugs(): string[] {
	const store = JSON.parse(readFileSync('data/topics.json', 'utf8'));
	return store.topics
		.filter((t: { status: string; legacy?: boolean }) => t.status === 'generated' && !t.legacy)
		.sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank)
		.map((t: { slug: string }) => t.slug);
}
