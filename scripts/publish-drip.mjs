#!/usr/bin/env node
/**
 * Publish what a human approved, one article per run, and push.
 *
 *   npm run publish                       # the daily run (timer: Tuesday-Friday): next approved article
 *   npm run publish -- --dry-run          # what would go out; writes and pushes nothing
 *   npm run publish -- --limit 2          # more than one, for a manual catch-up
 *   npm run publish -- --no-push          # commit locally
 *   npm run publish -- --not-before 2026-11-02
 *
 * Nothing is published that has not been through data/review.txt. There is no
 * unattended mode: the review gate would be a suggestion if a flag could skip it.
 * What this script still checks is the machine side - the SEO gate, the fact gate,
 * and the hero image - because an approved article can have been edited after approval.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';
import { checkFacts } from './lib/fact-guard.mjs';
import { writeHero } from './lib/thumbnail.mjs';
import { loadStore, saveStore, applyDecisions } from './lib/review-state.mjs';

const CONTENT_DIR = 'src/content/berita';
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

// --- publication hold -------------------------------------------------------
/** Hold publishing until a date without holding generation - the window you publish into is a real variable, and a spam-update rollout is a bad one. */
const notBeforeRaw = flag('not-before', process.env.PUBLISH_NOT_BEFORE || null);
if (notBeforeRaw) {
	// Fail closed on an unparseable date, or a fat-fingered hold publishes on the day it was meant to stop.
	if (!/^\d{4}-\d{2}-\d{2}$/.test(notBeforeRaw.trim())) {
		console.error(`--not-before / PUBLISH_NOT_BEFORE must be YYYY-MM-DD, got "${notBeforeRaw}".`);
		console.error('Refusing to publish rather than ignoring a hold that may have been intended.');
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
		// Exit 0, not 1: a hold is the intended outcome, and a daily non-zero oneshot reads as a broken timer.
		process.exit(0);
	}
}

// --- what is approved -------------------------------------------------------
const store = loadStore();

// Decisions pushed since the last run. Skipped on --dry-run because a "redo" deletes its draft.
if (!dryRun) {
	const d = applyDecisions(store);
	if (d.approved.length + d.rejected.length + d.redo.length) {
		saveStore(store);
		console.log(`review applied: ${d.approved.length} approved, ${d.redo.length} sent back for a rewrite, ${d.rejected.length} rejected`);
	}
}

const approved = store.topics.filter((t) => t.status === 'approved' && !t.legacy).sort((a, b) => a.rank - b.rank);
if (approved.length === 0) {
	console.log('\npublish-drip: nothing approved is waiting. Review the current batch: npm run review\n');
	process.exit(0);
}

/** Read one approved draft and run every machine-checkable gate against it. */
function inspect(topic) {
	const slug = topic.slug;
	const file = join(CONTENT_DIR, slug, 'index.md');
	if (!existsSync(file)) return { topic, slug, errors: ['approved, but the article file is gone'] };
	const raw = readFileSync(file, 'utf8');
	if (!/^draft:\s*true\s*$/m.test(raw)) return { topic, slug, errors: ['not a draft any more (already live?)'] };

	const split = splitFrontmatter(raw);
	if (!split) return { topic, slug, errors: ['frontmatter malformed'] };
	const data = parseFrontmatter(split.frontmatter);

	const seo = checkSeo({ title: data.title || '', focusKeyphrase: data.focusKeyphrase || '', body: split.body, kind: kindFromTags(data.tags) });
	const facts = checkFacts({ body: split.body });

	const heroErrors = [];
	if (!data.heroImage) heroErrors.push('no heroImage in frontmatter');
	else if (!existsSync(join(CONTENT_DIR, slug, data.heroImage))) heroErrors.push(`heroImage file missing: ${data.heroImage}`);

	return { topic, slug, file, raw, errors: [...seo.errors, ...facts.errors, ...heroErrors] };
}

// Heal a missing hero before judging it: generate gives every draft one, but an article rewritten by hand may have lost it. Idempotent.
const picked = [];
const held = [];
for (const topic of approved) {
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

console.log(`\npublish-drip: ${picked.length} of ${approved.length} approved article(s) go out now`);
for (const a of picked) console.log(`  -> /berita/${a.slug}/`);
for (const a of held) {
	console.log(`  HELD  ${a.slug}`);
	for (const e of a.errors.slice(0, 5)) console.log(`          x ${e}`);
}

if (picked.length === 0) {
	console.log('\nEvery approved article failed a gate; they stay approved and are retried next run.\n');
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
}

const restore = () => {
	for (const a of picked) writeFileSync(a.file, a.raw, 'utf8');
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
	console.error('Nothing was committed and nothing was pushed.\n');
	console.error(failed.output.split('\n').slice(-30).join('\n'));
	process.exit(1);
}

for (const a of picked) {
	a.topic.status = 'published';
	a.topic.publishedAt = new Date().toISOString();
}
saveStore(store);

// --- commit and push --------------------------------------------------------
try {
	run('git', ['add', CONTENT_DIR, 'data']);
	const subject = `content: publish ${picked.length} article${picked.length > 1 ? 's' : ''} (${today})`;
	run('git', ['commit', '-m', subject, '-m', slugs.map((s) => `- /berita/${s}/`).join('\n')]);
	console.log(`\n  committed: ${subject}`);
} catch (e) {
	const out = `${e.stdout || ''}${e.stderr || ''}`;
	restore();
	for (const a of picked) a.topic.status = 'approved';
	saveStore(store);
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
