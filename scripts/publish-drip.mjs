#!/usr/bin/env node
/** Publish approved drafts, a few per day, and push. Flags: --auto (unattended), --dry-run, --limit N, --no-push, --not-before YYYY-MM-DD. */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { checkSeo, splitFrontmatter, parseFrontmatter, kindFromTags } from './lib/seo-rules.mjs';
import { checkFacts } from './lib/fact-guard.mjs';

const CONTENT_DIR = 'src/content/berita';
const APPROVED = 'data/approved.txt';
const SPOTCHECK = 'data/spotcheck.log';
const DEFAULT_BATCH = 12;

/** Circuit breaker for --auto: below this clean rate a systemic failure would otherwise publish every day until someone noticed weeks later. */
const AUTO_MIN_PASS_RATE = 0.6;
const AUTO_MIN_EXAMINED = 5;

/** One in N published articles is logged for optional later reading. Never blocks. */
const SPOTCHECK_EVERY = 10;

const argv = process.argv.slice(2);
const has = (n) => argv.includes(`--${n}`);
const flag = (n, d = null) => {
	const i = argv.indexOf(`--${n}`);
	return i === -1 ? d : argv[i + 1];
};

const dryRun = has('dry-run');
const noPush = has('no-push');
const auto = has('auto');
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

const dirs = readdirSync(CONTENT_DIR).filter((d) => statSync(join(CONTENT_DIR, d)).isDirectory());

/** Read one draft and run every machine-checkable gate against it. */
function inspect(slug) {
	const file = join(CONTENT_DIR, slug, 'index.md');
	let raw;
	try {
		raw = readFileSync(file, 'utf8');
	} catch {
		return null;
	}
	if (!/^draft:\s*true\s*$/m.test(raw)) return null; // already live

	const split = splitFrontmatter(raw);
	if (!split) return { slug, file, raw, errors: ['frontmatter malformed'], warnings: [] };

	const data = parseFrontmatter(split.frontmatter);
	const seo = checkSeo({
		title: data.title || '',
		focusKeyphrase: data.focusKeyphrase || '',
		body: split.body,
		kind: kindFromTags(data.tags),
	});
	const facts = checkFacts({ body: split.body });

	return {
		slug,
		file,
		raw,
		errors: [...seo.errors, ...facts.errors],
		warnings: [...seo.warnings, ...facts.warnings],
		stats: seo.stats,
	};
}

let candidates = [];

if (auto) {
	// Unattended selection is stricter on purpose - without a human, a warning is the only signal left that something is off.
	const examined = dirs.map(inspect).filter(Boolean);

	if (examined.length === 0) {
		console.log('No drafts waiting. Nothing to publish.');
		process.exit(0);
	}

	const clean = examined.filter((a) => a.errors.length === 0 && a.warnings.length === 0);
	const rate = clean.length / examined.length;

	console.log(`\npublish-drip --auto: ${examined.length} draft(s) examined, ${clean.length} clean (${Math.round(rate * 100)}%)`);

	// Only judge the rate once there is a sample worth judging; two bad drafts out of two is noise.
	if (examined.length >= AUTO_MIN_EXAMINED && rate < AUTO_MIN_PASS_RATE) {
		console.error(`\nHALTED: only ${Math.round(rate * 100)}% of drafts are clean (floor ${Math.round(AUTO_MIN_PASS_RATE * 100)}%).`);
		console.error('That is a systemic failure, not a few bad articles. Nothing published.\n');
		const tally = new Map();
		for (const a of examined) {
			for (const e of a.errors) {
				//  so "B2B" does not become "BNB" - a digit inside a word is not a variable
				const key = e.replace(/\d+(?:[.,]\d+)?/g, 'N').slice(0, 90);
				tally.set(key, (tally.get(key) || 0) + 1);
			}
		}
		console.error('Kegagalan paling sering:');
		for (const [msg, n] of [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)) {
			console.error(`  ${String(n).padStart(3)}x  ${msg}`);
		}
		console.error('');
		process.exit(1);
	}

	const rejected = examined.length - clean.length;
	if (rejected) console.log(`  ${rejected} ditahan karena masih punya error atau warning`);

	candidates = clean;
} else {
	// --- attended selection -------------------------------------------------
	if (!existsSync(APPROVED)) {
		console.error(`${APPROVED} does not exist.`);
		console.error('Create it with one approved slug per line, then run this again.');
		console.error('Generate the review sheet first: npm run review');
		console.error('Or run unattended: npm run publish -- --auto');
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

	for (const slug of approved) {
		if (!dirs.includes(slug)) {
			console.log(`  ? ${slug} - approved but no article directory; skipped`);
			continue;
		}
		const a = inspect(slug);
		if (a) candidates.push(a);
	}
}

if (candidates.length === 0) {
	console.log('Nothing publishable right now.');
	process.exit(0);
}

const batch = candidates.slice(0, limit);
const today = new Date().toISOString().slice(0, 10);

/** How many articles are already live, used only to spread the spot-check sample as the archive grows. */
const publishedCount = dirs.filter((d) => {
	try {
		return !/^draft:\s*true\s*$/m.test(readFileSync(join(CONTENT_DIR, d, 'index.md'), 'utf8'));
	} catch {
		return false;
	}
}).length;

console.log(`\npublish-drip: ${batch.length} of ${candidates.length} ${auto ? 'clean' : 'approved'} draft(s)`);
for (const a of batch) console.log(`  -> /berita/${a.slug}/`);

if (dryRun) {
	console.log('\n--dry-run: nothing written, nothing pushed.\n');
	process.exit(0);
}

// pubDate is the publish date, not the generation date; updatedDate is deliberately untouched since it means a real revision.
for (const a of batch) {
	const next = a.raw
		.replace(/^draft:\s*true\s*$/m, 'draft: false')
		.replace(/^pubDate:\s*["']?[^"'\n]+["']?\s*$/m, `pubDate: "${today}"`);
	writeFileSync(a.file, next, 'utf8');
}

const restore = () => {
	for (const a of batch) writeFileSync(a.file, a.raw, 'utf8');
};

// check-content runs site-wide because duplicate metadata is cross-article; check-seo is scoped to this batch so the legacy backlog cannot block new work.
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

	// Sampling, not gating - no machine can judge whether an article is worth sending to a prospect.
	try {
		if (!existsSync('data')) mkdirSync('data', { recursive: true });
		const sample = batch.filter((_, i) => (publishedCount + i) % SPOTCHECK_EVERY === 0);
		if (sample.length) {
			appendFileSync(
				SPOTCHECK,
				sample.map((a) => `${today}\t/berita/${a.slug}/\t${a.stats?.wordCount ?? '?'} kata`).join('\n') + '\n',
				'utf8',
			);
			console.log(`  ${sample.length} artikel dicatat di ${SPOTCHECK} untuk dibaca sewaktu-waktu`);
		}
	} catch {
		/* sampling is a convenience; never fail a publish over it */
	}
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
