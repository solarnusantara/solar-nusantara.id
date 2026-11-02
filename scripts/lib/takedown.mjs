/**
 * Removing a live article on request from ERPSonus (SEO Marketing > Artikel > Hapus).
 *
 * ERPSonus records the request; the pipeline carries it out at the start of the next
 * generate or publish run (Monday to Friday), because the site is served from this repo
 * and a removal is a commit like any other.
 *
 *   removed   the folder is gone from src/content/berita, the topic is marked `removed`
 *             (never regenerated), committed and pushed. GitHub Pages then answers 404.
 *   blocked   not removed: another file still mentions the slug, or check-content fails
 *             without the article. The reason goes back to ERPSonus and the folder is
 *             restored; fix the cause and request the removal again.
 *
 * The slug comes from the network, so it is checked against the shape of a slug before
 * it is ever turned into a path.
 */
import { existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { callErp, REVIEW_URL } from './review-gate.mjs';
import { saveStore } from './topic-store.mjs';
import { liveDir } from './articles.mjs';

const TAKEDOWN_URL = new URL('takedowns', REVIEW_URL).href;
const SLUG = /^[a-z0-9-]{1,200}$/;
const ALREADY_GONE = 'folder sudah tidak ada di repo';

const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' });

/** Files outside the article itself that mention its slug (a link, a hard-coded list). Text files in src/ and drafts/ only. */
function referencedBy(slug) {
	try {
		return git(['grep', '-I', '-l', '-F', slug, '--', 'src', 'drafts', `:!src/content/berita/${slug}`]).split('\n').filter(Boolean);
	} catch (e) {
		if (e.status === 1) return []; // git grep: no match
		throw e;
	}
}

function checkContent() {
	try {
		execFileSync('node', ['scripts/check-content.mjs'], { encoding: 'utf8', stdio: 'pipe' });
		return null;
	} catch (e) {
		return `${e.stdout || ''}${e.stderr || ''}`.trim().split('\n').slice(-5).join(' | ');
	}
}

/** @returns {Promise<{slug: string, outcome: 'removed'|'blocked', detail: string}[]>} what was done; already reported to ERPSonus */
export async function applyTakedowns(store, { dryRun = false, noPush = false } = {}) {
	const { takedowns } = await callErp(TAKEDOWN_URL);
	const results = [];

	for (const { slug } of takedowns) {
		if (!SLUG.test(slug)) {
			results.push({ slug: String(slug).slice(0, 80), outcome: 'blocked', detail: 'slug tidak valid' });
			continue;
		}
		const dir = liveDir(slug);
		if (!existsSync(dir)) {
			results.push({ slug, outcome: 'removed', detail: ALREADY_GONE });
			continue;
		}
		const refs = referencedBy(slug);
		if (refs.length) {
			results.push({ slug, outcome: 'blocked', detail: `masih dirujuk oleh: ${refs.slice(0, 5).join(', ')}` });
			continue;
		}
		if (dryRun) {
			results.push({ slug, outcome: 'removed', detail: 'dry-run' });
			continue;
		}
		rmSync(dir, { recursive: true, force: true });
		const failure = checkContent();
		if (failure) {
			git(['checkout', '--', dir]);
			results.push({ slug, outcome: 'blocked', detail: `check-content gagal tanpa artikel ini: ${failure}`.slice(0, 500) });
			continue;
		}
		const topic = store.topics.find((t) => t.slug === slug);
		if (topic) {
			topic.status = 'removed';
			topic.removedAt = new Date().toISOString();
		}
		results.push({ slug, outcome: 'removed', detail: '' });
	}

	const removed = results.filter((r) => r.outcome === 'removed' && !dryRun && r.detail !== ALREADY_GONE);
	if (removed.length) {
		saveStore(store);
		try {
			git(['add', '-A', 'src/content/berita', 'data']);
			git(['commit', '-m', `takedown: remove ${removed.length} article(s)`, '-m', removed.map((r) => `- /berita/${r.slug}/`).join('\n'), '--', 'src/content/berita', 'data']);
			if (!noPush) git(['push']);
		} catch (e) {
			// Removed on disk already; the next run's commit carries it.
			console.error(`  could not commit/push the removals:\n${e.stdout || ''}${e.stderr || ''}`);
		}
	}
	if (results.length && !dryRun) {
		try {
			await callErp(`${TAKEDOWN_URL}/ack`, { method: 'POST', body: JSON.stringify({ results }) });
		} catch (e) {
			console.error(`  could not report ${results.length} takedown result(s): ${e.message}`);
		}
	}
	return results;
}
