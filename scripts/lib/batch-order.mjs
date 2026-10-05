/**
 * Choose which of the publishable drafts go out today.
 *
 * Every article in one run gets the same pubDate and lands in the sitemap
 * together, so the order inside a batch is invisible - what is visible is which
 * articles share a day. Taking the first N alphabetically is therefore the worst
 * available choice: `readdirSync` groups siblings, so one day ships
 * analisis-kelayakan-investasi-plts-untuk-{gedung-pemerintah, pabrik-kelapa-sawit,
 * pabrik-manufaktur, sektor-pertambangan} - four URLs off one template, same
 * date. Nothing about the articles is wrong; the publishing pattern is what
 * reads as bulk.
 *
 * So the batch is filled by cycling templates, taking a second article from a
 * template only once every other template has contributed one. Deterministic on
 * purpose: the same queue yields the same batch, which keeps a dry-run honest.
 */

/**
 * The template an article came from: its slug minus the trailing segment.
 * `biaya-dan-roi-plts-untuk-pabrik-manufaktur` -> `biaya-dan-roi-plts`, which is
 * what the sibling in every other segment also reduces to.
 */
function template(slug) {
	return String(slug).replace(/-(?:di|untuk)-[a-z0-9-]+$/, '');
}

/** Segment is the first tag the planner writes; legacy articles have none. */
function segment(row) {
	const tags = String(row.tags ?? '').match(/[a-z0-9-]+/g) || [];
	return tags[0] || 'lain';
}

/**
 * @param {Array<{slug: string, tags?: string}>} rows  publishable drafts, any order
 * @param {number} limit                               how many to take
 * @returns {Array} the chosen rows
 */
export function spreadBatch(rows, limit) {
	const groups = new Map();
	for (const row of rows) {
		const key = template(row.slug);
		if (!groups.has(key)) groups.set(key, []);
		groups.get(key).push(row);
	}

	const queues = [...groups.values()];
	const picked = [];
	/** Segments already in this batch, so the next sibling can come from a thinner one. */
	const used = new Map();

	// One pass takes at most one article per template, so a template only repeats
	// inside a batch when there are fewer templates than slots.
	while (picked.length < limit && queues.some((q) => q.length)) {
		const pass = queues.filter((q) => q.length);
		for (const queue of pass) {
			if (picked.length >= limit) break;
			// Which sibling: the least-published segment so far, so a day is not all gedung pemerintah.
			let best = 0;
			for (let j = 1; j < queue.length; j++) {
				if ((used.get(segment(queue[j])) || 0) < (used.get(segment(queue[best])) || 0)) best = j;
			}
			const [row] = queue.splice(best, 1);
			picked.push(row);
			used.set(segment(row), (used.get(segment(row)) || 0) + 1);
		}
	}
	return picked;
}
