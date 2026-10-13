/**
 * Where a human's review decisions meet the topic queue.
 *
 *   pending -> generated -> approved -> published
 *                       \-> rejected            (kept on disk, never published)
 *                       \-> redo -> pending     (rewritten at once, in place, from the reviewer's note;
 *                                                back to generated for the next round, up to MAX_ROUNDS)
 *
 * Decisions live in data/review.txt, one per line, and ONLY a human edits that file.
 * The server only ever writes topics.json and the articles. Two writers, two files:
 * a decision pushed from a laptop can never conflict with a batch the server pushed
 * at the same moment.
 *
 *   approve <slug> [@hash]   hash = contentHash of the draft the reviewer read; a different draft is not approved
 *   redo    <slug> # note for the rewrite
 *   reject  <slug> # why
 *
 * A later line for the same slug wins, so changing your mind is appending a line.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

export const TOPICS = 'data/topics.json';
export const DECISIONS = 'data/review.txt';
const CONTENT_DIR = 'src/content/berita';
/** A reviewer may send an article back this many times in all (round 1 is the first draft). */
export const MAX_ROUNDS = 3;

/** Short fingerprint of the draft file. An approval carries it, so editing or rewriting after approval cannot slip through. */
export const contentHash = (slug) => {
	const file = join(CONTENT_DIR, slug, 'index.md');
	return existsSync(file) ? createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8) : '';
};

/** Rewrites asked for by the reviewer and not yet done: they run at once, ahead of any new batch. */
export const awaitingRewrite = (store) => store.topics.filter((t) => t.status === 'pending' && t.rewrite && !t.legacy);

/** The batch under review: written, not yet decided. `legacy` rows belong to the old plan and never count. */
export const awaitingReview = (store) => store.topics.filter((t) => t.status === 'generated' && !t.legacy);

export const loadStore = () => JSON.parse(readFileSync(TOPICS, 'utf8'));
export const saveStore = (store) => writeFileSync(TOPICS, JSON.stringify(store, null, 2), 'utf8');

/**
 * Every decision line per slug, oldest first. The file is append-only history, so a
 * slug can have several: a "redo", then the "approve" of the rewrite.
 * @returns {Map<string, Array<{decision: 'approve'|'redo'|'reject', hash: string, note: string}>>}
 */
export function readDecisions() {
	const out = new Map();
	if (!existsSync(DECISIONS)) return out;
	for (const line of readFileSync(DECISIONS, 'utf8').split(/\r?\n/)) {
		const m = line.match(/^\s*(approve|redo|reject)\s+([a-z0-9-]+)(?:\s+@([0-9a-f]{8}))?\s*(?:#\s*(.*))?$/);
		if (!m) continue;
		if (!out.has(m[2])) out.set(m[2], []);
		out.get(m[2]).push({ decision: m[1], hash: m[3] || '', note: (m[4] || '').trim() });
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
 * @returns {{approved: string[], rejected: string[], redo: string[], stale: string[], manual: string[]}}
 */
export function applyDecisions(store) {
	const decisions = readDecisions();
	const done = { approved: [], rejected: [], redo: [], stale: [], manual: [] };

	for (const t of awaitingReview(store)) {
		const d = pendingDecision(t, decisions);
		if (!d) continue;
		// An approval names the draft it was made about. If the draft has changed since, it approves nothing; the line stays unconsumed and the reviewer sees the new version undecided.
		if (d.decision === 'approve' && d.hash && d.hash !== contentHash(t.slug)) {
			done.stale.push(t.slug);
			continue;
		}
		t.decisionsApplied = (decisions.get(t.slug) ?? []).length;
		if (d.note) t.reviewNote = d.note;

		if (d.decision === 'approve') {
			t.status = 'approved';
			t.approvedAt = new Date().toISOString();
			done.approved.push(t.slug);
		} else if (d.decision === 'reject') {
			t.status = 'rejected';
			done.rejected.push(t.slug);
		} else if (!t.product || (t.round || 1) >= MAX_ROUNDS) {
			// Only topics of the current plan can be rewritten (the old matrix has no prompt for it), and a loop needs an end. The draft stays; the reviewer approves or rejects it.
			t.needsManual = true;
			done.manual.push(t.slug);
		} else {
			// The old draft stays on disk: the rewrite starts from it and changes only what the note asks for.
			t.status = 'pending';
			t.rewrite = true;
			t.round = (t.round || 1) + 1;
			done.redo.push(t.slug);
		}
	}
	return done;
}
