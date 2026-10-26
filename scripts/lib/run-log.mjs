/**
 * One line per scheduled run in data/pipeline-runs.jsonl, committed with the run.
 *
 * Without it, a run that fails writes only to a log file on the server, and the first
 * sign anyone sees is an empty stock two weeks later. With it, GitHub holds a record of
 * every run, failed ones included, and ERPSonus reads it from there: a Monday with no
 * generate line is a run that never happened.
 *
 * The repo is public, so a line carries only what is already public: slugs, counts,
 * outcome, and error text from our own gates or the API's status line. Never a key.
 *
 *   {"t":"2026-10-27T18:07:02Z","job":"generate","outcome":"ok","written":[...],"tokens":41230}
 *
 * --dry-run never logs: it did not run anything.
 */
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

export const RUN_LOG = 'data/pipeline-runs.jsonl';

export function logRun(job, outcome, fields = {}) {
	mkdirSync('data', { recursive: true });
	appendFileSync(RUN_LOG, `${JSON.stringify({ t: new Date().toISOString(), job, outcome, ...fields })}\n`, 'utf8');
}

/** Take back the line logRun just wrote: a run logged before its commit, whose commit then failed, did not happen as logged. */
export function retractLastRun() {
	const lines = readFileSync(RUN_LOG, 'utf8').split('\n');
	lines.splice(-2, 1); // the file ends in '\n', so the last record is second from the end
	writeFileSync(RUN_LOG, lines.join('\n'), 'utf8');
}

/**
 * Commit and push a run that produced no articles, so its record still reaches GitHub.
 * Only data/ is committed (`-- data`), whatever else happens to be staged: a run that reverted its articles must not commit them.
 * A failure here is reported, not thrown - the run's own exit code is what the scheduler should see.
 */
export function pushRunRecord(job, outcome, { push = true } = {}) {
	const git = (args) => execFileSync('git', args, { encoding: 'utf8', stdio: 'pipe' });
	try {
		git(['add', 'data']);
		git(['commit', '-m', `pipeline: ${job} ${outcome}`, '--', 'data']);
		if (push) git(['push']);
	} catch (e) {
		console.error(`\ncould not commit/push the run record:\n${e.stdout || ''}${e.stderr || ''}`);
	}
}
