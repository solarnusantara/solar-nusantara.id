#!/usr/bin/env node
/**
 * Publish approved drafts, a few per day, and push.
 *
 *   npm run publish -- --dry-run     # show what would go live, change nothing
 *   npm run publish                  # publish the daily batch and push
 *   npm run publish -- --limit 5
 *   npm run publish -- --no-push     # commit locally, do not push
 *
 * Why a drip and not a bulk flip.
 *
 * A thousand articles appearing on a domain that had eighteen is the shape
 * Google's scaled-content-abuse policy looks for, and the penalty lands on the
 * whole domain - including the product and service pages that actually produce
 * RFQs. Publishing 10-15 a day is the same thousand articles arriving as a
 * publishing schedule instead of as a dump.
 *
 * Approval is a separate human step, in data/approved.txt. An article that was
 * generated is not thereby fit to publish, and nothing here decides otherwise.
 *
 * Safety: the batch is written, then BOTH gates run. If either fails, every
 * file in the batch is restored from memory and nothing is committed or pushed.
 * A failing gate must never reach the remote, because the remote is wired to
 * deploy on push.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const CONTENT_DIR = 'src/content/berita';
const APPROVED = 'data/approved.txt';
const DEFAULT_BATCH = 12;

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

// --- approved list ----------------------------------------------------------
if (!existsSync(APPROVED)) {
	console.error(`${APPROVED} does not exist.`);
	console.error('Create it with one approved slug per line, then run this again.');
	console.error('Generate the review sheet first: npm run review');
	process.exit(1);
}

const approved = readFileSync(APPROVED, 'utf8')
	.split(/\r?\n/)
	.map((l) => l.replace(/#.*$/, '').trim())
	.filter(Boolean);

if (approved.length === 0) {
	console.log('No approved slugs yet. Nothing to publish.');
	process.exit(0);
}

// --- find publishable drafts ------------------------------------------------
const dirs = readdirSync(CONTENT_DIR).filter((d) => statSync(join(CONTENT_DIR, d)).isDirectory());
const candidates = [];

for (const slug of approved) {
	if (!dirs.includes(slug)) {
		console.log(`  ? ${slug} - approved but no article directory; skipped`);
		continue;
	}
	const file = join(CONTENT_DIR, slug, 'index.md');
	const raw = readFileSync(file, 'utf8');
	if (!/^draft:\s*true\s*$/m.test(raw)) continue; // already live
	candidates.push({ slug, file, raw });
}

if (candidates.length === 0) {
	console.log('Every approved article is already published. Nothing to do.');
	process.exit(0);
}

const batch = candidates.slice(0, limit);
const today = new Date().toISOString().slice(0, 10);

console.log(`\npublish-drip: ${batch.length} of ${candidates.length} approved draft(s)`);
for (const a of batch) console.log(`  -> /berita/${a.slug}/`);

if (dryRun) {
	console.log('\n--dry-run: nothing written, nothing pushed.\n');
	process.exit(0);
}

// --- flip the flag ----------------------------------------------------------
// pubDate is set to the publish date, not the generation date. The sitemap's
// lastmod and the BlogPosting datePublished both read it, and claiming an
// article was published weeks before it was reachable is a contradiction.
// updatedDate is deliberately NOT touched - it means "materially revised", and
// setting it here would claim a revision that did not happen.
for (const a of batch) {
	const next = a.raw
		.replace(/^draft:\s*true\s*$/m, 'draft: false')
		.replace(/^pubDate:\s*["']?[^"'\n]+["']?\s*$/m, `pubDate: "${today}"`);
	writeFileSync(a.file, next, 'utf8');
}

const restore = () => {
	for (const a of batch) writeFileSync(a.file, a.raw, 'utf8');
};

// --- gates ------------------------------------------------------------------
// check-content runs site-wide: duplicate title, description and keyphrase can
// only be detected across every article, so scoping it would defeat it.
//
// check-seo runs on THIS BATCH only. Its rules postdate the site's original 18
// articles, which fail them; gating on the whole site would mean no article can
// ever be published until that backlog is rewritten. New articles are held to
// the new standard, old ones stay visible in a bare `npm run check-seo`.
let failed = null;
const batchSlugs = batch.map((a) => a.slug);
for (const [label, args] of [
	['check-content', ['scripts/check-content.mjs']],
	['check-seo', ['scripts/check-seo.mjs', ...batchSlugs]],
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
	console.error(`\n${failed.label} FAILED. All ${batch.length} article(s) reverted to draft.`);
	console.error('Nothing was committed and nothing was pushed.\n');
	console.error(failed.output.split('\n').slice(-30).join('\n'));
	process.exit(1);
}

// --- commit and push --------------------------------------------------------
try {
	run('git', ['add', CONTENT_DIR, 'data']);
	const subject = `content: publish ${batch.length} article${batch.length > 1 ? 's' : ''} (${today})`;
	const bodyLines = batch.map((a) => `- /berita/${a.slug}/`).join('\n');
	run('git', ['commit', '-m', subject, '-m', bodyLines]);
	console.log(`\n  committed: ${subject}`);
} catch (e) {
	const out = `${e.stdout || ''}${e.stderr || ''}`;
	if (/nothing to commit/i.test(out)) {
		console.log('\n  nothing to commit - working tree already clean');
		process.exit(0);
	}
	restore();
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
