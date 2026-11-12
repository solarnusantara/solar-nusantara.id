/**
 * The topic queue, data/topics.json. Only the server writes it.
 *
 *   pending -> generated -> published
 *          \-> failed | skipped      (gates failed three times / slug already taken)
 *   published -> removed             (taken down from ERPSonus, lib/takedown.mjs; never regenerated)
 *   legacy                          (articles of the old matrix, outside the queue)
 *
 * `generated` means a finished draft is waiting in drafts/berita for its publish slot.
 * A reviewer approves or rejects it in ERPSonus before it may publish (lib/review-gate.mjs); the gates in
 * generate-article.mjs and publish-drip.mjs still apply.
 */
import { readFileSync, writeFileSync } from 'node:fs';

export const TOPICS = 'data/topics.json';

export const loadStore = () => JSON.parse(readFileSync(TOPICS, 'utf8'));
export const saveStore = (store) => writeFileSync(TOPICS, JSON.stringify(store, null, 2), 'utf8');

/** Drafts written and not yet published, in the order they will go out. `legacy` rows belong to the old plan and never count. */
export const readyDrafts = (store) => store.topics.filter((t) => t.status === 'generated' && !t.legacy).sort((a, b) => a.rank - b.rank);
