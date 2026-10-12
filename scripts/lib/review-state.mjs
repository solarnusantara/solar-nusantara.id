/**
 * Where a human's review decisions meet the topic queue.
 *
 *   pending -> generated -> approved -> published
 *                       \-> rejected            (kept on disk, never published)
 *                       \-> redo -> pending     (draft deleted, rewritten with the reviewer's note)
 *
 * Decisions live in data/review.txt, one per line, and ONLY a human edits that file.
 * The server only ever writes topics.json and the articles. Two writers, two files:
 * a decision pushed from a laptop can never conflict with a batch the server pushed
 * at the same moment.
 *
 *   approve <slug>
 *   redo    <slug> # note for the rewrite
 *   reject  <slug> # why
 *
 * A later line for the same slug wins, so changing your mind is appending a line.
 */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

export const TOPICS = 'data/topics.json';
export const DECISIONS = 'data/review.txt';
const CONTENT_DIR = 'src/content/berita';

/** The batch under review: written, not yet decided. `legacy` rows belong to the old plan and never count. */
export const awaitingReview = (store) => store.topics.filter((t) => t.status === 'generated' && !t.legacy);

export const loadStore = () => JSON.parse(readFileSync(TOPICS, 'utf8'));
export const saveStore = (store) => writeFileSync(TOPICS, JSON.stringify(store, null, 2), 'utf8');

/**
 * Every decision line per slug, oldest first. The file is append-only history, so a
 * slug can have several: a "redo", then the "approve" of the rewrite.
 * @returns {Map<string, Array<{decision: 'approve'|'redo'|'reject', note: string}>>}
 */
export function readDecisions() {
	const out = new Map();
	if (!existsSync(DECISIONS)) return out;
	for (const line of readFileSync(DECISIONS, 'utf8').split(/\r?\n/)) {
		const m = line.match(/^\s*(approve|redo|reject)\s+([a-z0-9-]+)\s*(?:#\s*(.*))?$/);
		if (!m) continue;
		if (!out.has(m[2])) out.set(m[2], []);
		out.get(m[2]).push({ decision: m[1], note: (m[3] || '').trim() });
	}
	return out;
}

/**
 * The decision that applies to this topic's CURRENT draft, or null.
 *
 * A decision belongs to the version it was made about. After a "redo" the topic comes
 * back as a fresh draft, and the old "redo" line is still in the file; without this it
 * would be applied again and delete the rewrite before anyone read it. So a topic
 * remembers how many of its lines it has consumed, and only a line added after that counts.
 */
export function pendingDecision(topic, decisions) {
	const lines = decisions.get(topic.slug) ?? [];
	return lines.length > (topic.decisionsApplied || 0) ? lines.at(-1) : null;
}

/**
 * Apply decisions to the rows that are waiting for one. Mutates `store`; the caller saves it.
 * Only `generated` rows move, so a stale line in review.txt cannot un-publish or re-approve anything.
 * @returns {{approved: string[], rejected: string[], redo: string[]}}
 */
export function applyDecisions(store) {
	const decisions = readDecisions();
	const done = { approved: [], rejected: [], redo: [] };

	for (const t of awaitingReview(store)) {
		const d = pendingDecision(t, decisions);
		if (!d) continue;
		t.decisionsApplied = (decisions.get(t.slug) ?? []).length;
		if (d.note) t.reviewNote = d.note;

		if (d.decision === 'approve') {
			t.status = 'approved';
			t.approvedAt = new Date().toISOString();
			done.approved.push(t.slug);
		} else if (d.decision === 'reject') {
			t.status = 'rejected';
			done.rejected.push(t.slug);
		} else {
			// Delete only a draft. A `generated` row whose file says otherwise is live and must not be touched.
			const dir = join(CONTENT_DIR, t.slug);
			const file = join(dir, 'index.md');
			if (existsSync(file) && /^draft:\s*true\s*$/m.test(readFileSync(file, 'utf8'))) rmSync(dir, { recursive: true, force: true });
			t.status = 'pending';
			delete t.generatedAt;
			done.redo.push(t.slug);
		}
	}
	return done;
}
