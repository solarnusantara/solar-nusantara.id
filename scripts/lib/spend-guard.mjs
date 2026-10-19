/**
 * A daily spend ledger shared by every script that calls a paid API.
 *
 * One JSON line per call in data/api-spend.log (gitignored: it is per machine, and the
 * server's is the one that matters). A script asks `spentToday(api)` before a call and
 * refuses once its own daily cap is reached, so a loop, a retry storm or a repeated manual
 * run has a ceiling that does not depend on anybody noticing.
 *
 * The unit is the caller's: DeepSeek is counted in tokens (its price per token is not
 * pinned down here), OpenAI images in USD. A day is a UTC day.
 *
 * This is a guard on OUR side. It does not replace the provider's own limit (see
 * docs/AUTOMATION.md, "Batas biaya API"): a second machine or a deleted log has its own ledger.
 */
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';

const LEDGER = 'data/api-spend.log';

export function record(api, amount, note = '') {
	mkdirSync('data', { recursive: true });
	appendFileSync(LEDGER, `${JSON.stringify({ t: new Date().toISOString(), api, amount, note })}\n`, 'utf8');
}

export function spentToday(api) {
	if (!existsSync(LEDGER)) return 0;
	const today = new Date().toISOString().slice(0, 10);
	let sum = 0;
	for (const line of readFileSync(LEDGER, 'utf8').split('\n')) {
		try {
			const e = JSON.parse(line);
			if (e.api === api && typeof e.t === 'string' && e.t.startsWith(today)) sum += Number(e.amount) || 0;
		} catch {
			/* blank or damaged line: skip it, never let the guard itself crash a run */
		}
	}
	return sum;
}
