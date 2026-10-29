/**
 * The human review step between generate and publish.
 *
 * A reviewer approves or rejects each draft in ERPSonus (SEO Marketing > Review). The
 * decisions live in ERPSonus; the pipeline pulls them at the start of each run:
 *
 *   approved   publish-drip may take the draft. Nothing else is ever published.
 *   rejected   the topic goes back to `pending`, its draft folder is removed and the
 *              reviewer's reason rides in `reviewNote`, which generate puts in the prompt.
 *   (no row)   still waiting. Not published; the run record says how many wait.
 *
 * Fails closed: if the decisions cannot be fetched, publish-drip publishes nothing.
 * Configuration (env, never the repo): SEO_REVIEW_TOKEN, and SEO_REVIEW_URL to override the host.
 */
import { rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { saveStore } from './topic-store.mjs';
import { draftDir } from './articles.mjs';

const REVIEW_URL = process.env.SEO_REVIEW_URL || 'https://app.sonus.id/api/seo/review-decisions';
const TIMEOUT_MS = 20_000;

async function call(path, init = {}) {
	const token = process.env.SEO_REVIEW_TOKEN;
	if (!token) throw new Error('SEO_REVIEW_TOKEN is not set');
	const res = await fetch(`${REVIEW_URL}${path}`, {
		...init,
		headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
		signal: AbortSignal.timeout(TIMEOUT_MS),
	});
	if (!res.ok) throw new Error(`ERPSonus ${path || '/'}: HTTP ${res.status}`);
	return res.json();
}

/** @returns {Promise<{approved: Set<string>, rejected: Map<string,string>}>} */
export async function fetchDecisions() {
	const { decisions } = await call('');
	const approved = new Set();
	const rejected = new Map();
	for (const d of decisions) (d.decision === 'approved' ? approved.add(d.slug) : rejected.set(d.slug, d.reason || ''));
	return { approved, rejected };
}

/** Tell ERPSonus these decisions have been acted on, so a regenerated draft with the same slug starts unreviewed. Best effort. */
export async function ackDecisions(slugs) {
	if (!slugs.length) return;
	try {
		await call('/ack', { method: 'POST', body: JSON.stringify({ slugs }) });
	} catch (e) {
		console.error(`  could not acknowledge ${slugs.length} review decision(s): ${e.message}`);
	}
}

/**
 * Pull the decisions and carry out the rejections: topic back to pending, draft removed, committed and pushed.
 * @returns {Promise<{approved: Set<string>, sent: string[]}>} `sent` = slugs sent back to pending
 */
export async function syncReviews(store, { dryRun = false, noPush = false } = {}) {
	const { approved, rejected } = await fetchDecisions();
	const sent = [];
	for (const topic of store.topics) {
		if (topic.status !== 'generated' || !rejected.has(topic.slug)) continue;
		sent.push(topic.slug);
		if (dryRun) continue;
		topic.status = 'pending';
		topic.reviewNote = rejected.get(topic.slug);
		delete topic.generatedAt;
		delete topic.lastError;
		if (existsSync(draftDir(topic.slug))) rmSync(draftDir(topic.slug), { recursive: true, force: true });
	}
	if (sent.length && !dryRun) {
		saveStore(store);
		try {
			const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' });
			git(['add', '-A', 'drafts', 'data']);
			git(['commit', '-m', `review: ${sent.length} rejected draft(s) back to pending`, '-m', sent.map((s) => `- ${s}`).join('\n'), '--', 'drafts', 'data']);
			if (!noPush) git(['push']);
		} catch (e) {
			// The decision is applied on disk already; the next run's commit carries it.
			console.error(`  could not commit/push the rejections:\n${e.stdout || ''}${e.stderr || ''}`);
		}
		await ackDecisions(sent);
	}
	return { approved, sent };
}
