#!/usr/bin/env node
/**
 * Publish the next draft from drafts/berita, one article per run, and push.
 *
 *   npm run publish                       # the daily run (timer: Tuesday-Friday): next draft in line
 *   npm run publish -- --dry-run          # what would go out; writes and pushes nothing
 *   npm run publish -- --limit 2          # more than one, for a manual catch-up
 *   npm run publish -- --no-push          # commit locally
 *   npm run publish -- --not-before 2026-11-02
 *
 * Only a draft a reviewer approved in ERPSonus may go out (lib/review-gate.mjs), and it must still pass the machine gates:
 * the SEO gate, the fact gate and the hero image here, then check-content and
 * check-seo on the real site after the article has been moved into src/content/berita.
 * A draft that fails stays in drafts/berita and is tried again next run; if it still
 * fails, the next draft in line goes out instead of the week being lost.
 * Publishing moves the article's folder out of drafts/berita into src/content/berita.
 */
import { readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';
import { checkFacts } from './lib/fact-guard.mjs';
import { writeHero } from './lib/thumbnail.mjs';
import { loadStore, saveStore, readyDrafts } from './lib/topic-store.mjs';
import { syncReviews, ackDecisions } from './lib/review-gate.mjs';
import { applyTakedowns } from './lib/takedown.mjs';
import { DRAFTS_DIR, draftDir, liveDir } from './lib/articles.mjs';
import { logRun, pushRunRecord, retractLastRun } from './lib/run-log.mjs';

/** Four a week: the timer fires Tuesday to Friday and each run publishes one. */
const DEFAULT_BATCH = 1;

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const flag = (n, d = null) => {
	const i = argv.indexOf(`--${n}`);
	return i === -1 ? d : argv[i + 1];
};

const dryRun = has('dry-run');
const noPush = has('no-push');
const limit = Number(flag('limit', String(DEFAULT_BATCH)));

const run = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8', stdio: 'pipe' });

/** Record a run that publishes nothing, and push the record on its own. A successful run's record rides in its publish commit instead. */
function finish(outcome, fields = {}) {
	if (dryRun) return;
	logRun('publish', outcome, fields);
	pushRunRecord('publish', outcome, { push: !noPush });
}

// --- publication hold -------------------------------------------------------
/** Hold publishing until a date without holding generation - the window you publish into is a real variable, and a spam-update rollout is a bad one. */
const notBeforeRaw = flag('not-before', process.env.PUBLISH_NOT_BEFORE || null);
if (notBeforeRaw) {
	// Fail closed on an unparseable date, or a fat-fingered hold publishes on the day it was meant to stop.
	if (!/^\d{4}-\d{2}-\d{2}$/.test(notBeforeRaw.trim())) {
		console.error(`--not-before / PUBLISH_NOT_BEFORE must be YYYY-MM-DD, got "${notBeforeRaw}".`);
		console.error('Refusing to publish rather than ignoring a hold that may have been intended.');
		finish('error', { error: `invalid PUBLISH_NOT_BEFORE "${notBeforeRaw}"` });
		process.exit(1);
	}
	const today = new Date().toISOString().slice(0, 10);
	if (today < notBeforeRaw.trim()) {
		console.log(`\npublish-drip: ditahan sampai ${notBeforeRaw.trim()} (hari ini ${today}).`);
		console.log('  Generate tetap jalan; draft terus bertambah dan tidak ada yang terbit.');
		// Name both env paths - a user-mode install keeps its secret under $HOME, not /etc.
		console.log('  Lepas tahanan: hapus baris PUBLISH_NOT_BEFORE dari file env Anda');
		console.log('    sistem: /etc/solar-nusantara/env');
		console.log('    user:   ~/.config/solar-nusantara/env');
		console.log('');
		finish('held', { until: notBeforeRaw.trim() });
		// Exit 0, not 1: a hold is the intended outcome, and a daily non-zero oneshot reads as a broken timer.
		process.exit(0);
	}
}

// --- what is waiting -------------------------------------------------------
const store = loadStore();

// Removals requested in ERPSonus go first, so a draft is never published into a site that is mid-removal. A failure here must not block publishing.
try {
	for (const r of await applyTakedowns(store, { dryRun, noPush })) console.log(`publish-drip: takedown ${r.outcome}: ${r.slug}${r.detail ? ` (${r.detail})` : ''}`);
} catch (e) {
	console.error(`publish-drip: takedowns unavailable (${e.message}); continuing.`);
}

// A reviewer decides in ERPSonus. Only an approved draft may go out; if the decisions cannot be read, nothing goes out.
let reviews;
try {
	reviews = await syncReviews(store, { dryRun, noPush });
} catch (e) {
	console.error(`
publish-drip: review decisions unavailable (${e.message}). Publishing nothing.
`);
	finish('review-unavailable', { error: e.message });
	process.exit(1);
}
if (reviews.sent.length) console.log(`
publish-drip: ${reviews.sent.length} rejected draft(s) sent back to pending`);

const allDrafts = readyDrafts(store);
const ready = allDrafts.filter((t) => reviews.approved.has(t.slug));
const awaiting = allDrafts.filter((t) => !reviews.approved.has(t.slug)).map((t) => t.slug);
if (ready.length === 0) {
	if (awaiting.length) {
		console.log(`
publish-drip: ${awaiting.length} draft(s) wait for review in ERPSonus; none is approved, nothing goes out.
`);
		finish('awaiting-review', { awaiting, rejected: reviews.sent });
	} else {
		console.log(`
publish-drip: no draft is waiting in ${DRAFTS_DIR}. generate-article.mjs refills it.
`);
		finish('empty', { rejected: reviews.sent });
	}
	process.exit(0);
}

/** Read one draft and run every machine-checkable gate against it. */
function inspect(topic) {
	const slug = topic.slug;
	const file = join(draftDir(slug), 'index.md');
	if (!existsSync(file)) return { topic, slug, errors: [`the draft is gone from ${DRAFTS_DIR}`] };
	if (existsSync(liveDir(slug))) return { topic, slug, errors: ['an article with this slug is already live'] };
	const raw = readFileSync(file, 'utf8');
	if (!/^draft:\s*true\s*$/m.test(raw)) return { topic, slug, errors: ['not marked draft: true'] };

	const split = splitFrontmatter(raw);
	if (!split) return { topic, slug, errors: ['frontmatter malformed'] };
	const data = parseFrontmatter(split.frontmatter);

	const seo = checkSeo({ title: data.title || '', focusKeyphrase: data.focusKeyphrase || '', body: split.body, kind: kindFromTags(data.tags) });
	const facts = checkFacts({ body: split.body, brand: topic.brand });

	const heroErrors = [];
	if (!data.heroImage) heroErrors.push('no heroImage in frontmatter');
	else if (!existsSync(join(draftDir(slug), data.heroImage))) heroErrors.push(`heroImage file missing: ${data.heroImage}`);

	return { topic, slug, file, raw, errors: [...seo.errors, ...facts.errors, ...heroErrors], contentFailed: seo.errors.length + facts.errors.length > 0 };
}

// Heal a missing hero before judging it: generate gives every draft one, but a draft edited by hand may have lost it. Idempotent.
const picked = [];
const held = [];
for (const topic of ready) {
	if (picked.length >= limit) break;
	if (!dryRun) {
		try {
			await writeHero(topic);
		} catch {
			/* inspect() reports the missing hero */
		}
	}
	const a = inspect(topic);
	if (a.errors.length) held.push(a);
	else picked.push(a);
}

console.log(`\npublish-drip: ${picked.length} of ${ready.length} approved draft(s) go out now (${awaiting.length} more await review)`);
for (const a of picked) console.log(`  -> /berita/${a.slug}/`);
for (const a of held) {
	console.log(`  HELD  ${a.slug}`);
	for (const e of a.errors.slice(0, 5)) console.log(`          x ${e}`);
}

// Nobody edits a draft, so a draft that fails the SEO or fact gate fails identically next run. Take it out of the stock (it stays in drafts/berita for inspection) so it cannot hold up the queue or keep generate from refilling it. A missing hero is different: that can be a missing dependency, so it is retried.
if (!dryRun) {
	let failedNow = 0;
	for (const a of held.filter((h) => h.contentFailed)) {
		a.topic.status = 'failed';
		a.topic.lastError = `publish gate: ${a.errors[0]}`;
		failedNow += 1;
	}
	if (failedNow) saveStore(store);
}
const heldRecord = held.map((a) => ({ slug: a.slug, reason: a.errors[0] }));

if (picked.length === 0) {
	console.log(`\nNo waiting draft passed the gates. Drafts that failed on content are marked failed and stay in ${DRAFTS_DIR}; the rest are retried next run.\n`);
	finish('gate-failed', { held: heldRecord });
	process.exit(held.length ? 1 : 0);
}

if (dryRun) {
	console.log('\n--dry-run: nothing written, nothing pushed.\n');
	process.exit(0);
}

// --- publish ---------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);

// pubDate is the publish date, not the generation date; updatedDate is deliberately untouched since it means a real revision.
for (const a of picked) {
	const next = a.raw
		.replace(/^draft:\s*true\s*$/m, 'draft: false')
		.replace(/^pubDate:\s*["']?[^"'\n]+["']?\s*$/m, `pubDate: "${today}"`);
	writeFileSync(a.file, next, 'utf8');
	renameSync(draftDir(a.slug), liveDir(a.slug));
}

/** Undo the publish on disk: back into the drafts folder, as the draft it was. */
const restore = () => {
	for (const a of picked) {
		if (existsSync(liveDir(a.slug))) renameSync(liveDir(a.slug), draftDir(a.slug));
		writeFileSync(a.file, a.raw, 'utf8');
	}
};

// check-content runs site-wide because duplicate metadata is cross-article; check-seo is scoped to this batch so the legacy backlog cannot block new work.
let failed = null;
const slugs = picked.map((a) => a.slug);
for (const [label, args] of [
	['check-content', ['scripts/check-content.mjs']],
	['check-seo', ['scripts/check-seo.mjs', ...slugs]],
]) {
	try {
		run('node', args);
		console.log(`  ${label}: pass`);
	} catch (e) {
		failed = { label, output: `${e.stdout || ''}${e.stderr || ''}` };
		break;
	}
}

if (failed) {
	restore();
	console.error(`\n${failed.label} FAILED. ${picked.length} article(s) reverted to draft.`);
	console.error('No article was committed; only the run record in data/ is pushed.\n');
	console.error(failed.output.split('\n').slice(-30).join('\n'));
	finish('check-failed', { slugs, held: heldRecord, error: `${failed.label} failed` });
	process.exit(1);
}

for (const a of picked) {
	a.topic.status = 'published';
	a.topic.publishedAt = new Date().toISOString();
}
saveStore(store);
logRun('publish', 'ok', { published: slugs, held: heldRecord, awaiting, rejected: reviews.sent });

// --- commit and push --------------------------------------------------------
try {
	// 'drafts' stages the removal of the moved folder; src/content/berita stages its arrival.
	run('git', ['add', '-A', 'src/content/berita', 'drafts', 'data']);
	const subject = `content: publish ${picked.length} article${picked.length > 1 ? 's' : ''} (${today})`;
	run('git', ['commit', '-m', subject, '-m', slugs.map((s) => `- /berita/${s}/`).join('\n')]);
	console.log(`\n  committed: ${subject}`);
} catch (e) {
	const out = `${e.stdout || ''}${e.stderr || ''}`;
	// Unstage too: `git add` already staged the move into src/content/berita, and the next commit would otherwise publish it.
	try {
		run('git', ['reset', '-q', '--', 'src/content/berita', 'drafts', 'data']);
	} catch {
		/* reported below with the commit error */
	}
	restore();
	for (const a of picked) {
		a.topic.status = 'generated';
		delete a.topic.publishedAt;
	}
	saveStore(store);
	// The 'ok' record is now false. git is what failed, so the corrected record is not pushed; the next run's commit carries it.
	retractLastRun();
	logRun('publish', 'error', { slugs, held: heldRecord, error: 'git commit failed; articles reverted to draft' });
	console.error(`\ngit commit failed, articles reverted to draft:\n${out}`);
	process.exit(1);
}

if (noPush) {
	console.log('  --no-push: commit stays local. Push when ready.\n');
	process.exit(0);
}

try {
	run('git', ['push']);
	console.log('  pushed. GitHub Actions will build and deploy.\n');
} catch (e) {
	console.error(`\ngit push failed:\n${e.stdout || ''}${e.stderr || ''}`);
	console.error('The commit exists locally. Fix the remote, then `git push`.\n');
	process.exit(1);
}
