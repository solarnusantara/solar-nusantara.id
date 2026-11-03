// node --test scripts/lib/audit-report.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
	findingId, Findings, blockedBots, sitemapLocs, isNoindex, hasOrganizationSchema,
	classifyLinkError, daysBetween, checkScore, buildReport,
} from './audit-report.mjs';

test('long finding ids are cut but stay stable and distinct', () => {
	const a = findingId('site', 'x'.repeat(400), 'a');
	const b = findingId('site', 'x'.repeat(400), 'b');
	assert.ok(a.length <= 190);
	assert.notEqual(a, b);
	assert.equal(a, findingId('site', 'x'.repeat(400), 'a'));
	assert.equal(findingId('site', 'dup', '/x/'), 'site:dup:/x/');
});

test('a duplicate id keeps the first finding instead of poisoning the report', () => {
	const f = new Findings();
	f.add('warn', 'site', ['dup', '/x/'], 'first');
	f.add('critical', 'site', ['dup', '/x/'], 'second');
	assert.equal(f.list().length, 1);
	assert.equal(f.list()[0].title, 'first');
	assert.equal(f.count('critical'), 0);
});

test('robots.txt: own group wins, * is the fallback, Allow / cancels a block', () => {
	const robots = [
		'User-agent: *', 'Allow: /', '',
		'User-agent: GPTBot', 'Disallow: /', '',
		'User-agent: ClaudeBot', 'User-agent: CCBot', 'Disallow: /', 'Allow: /',
	].join('\n');
	assert.deepEqual(blockedBots(robots, ['GPTBot', 'ClaudeBot', 'CCBot', 'PerplexityBot']), ['GPTBot']);
	assert.deepEqual(blockedBots('User-agent: *\nDisallow: /\n', ['GPTBot']), ['GPTBot'], 'falls back to *');
	assert.deepEqual(blockedBots('User-agent: *\nDisallow: /private/\n', ['GPTBot']), [], 'partial disallow is not a block');
	assert.deepEqual(blockedBots('', ['GPTBot']), [], 'no robots.txt blocks nothing');
});

test('sitemap locs are read in order', () => {
	assert.deepEqual(sitemapLocs('<urlset><url><loc>https://a/</loc></url><url><loc> https://a/b/ </loc></url></urlset>'), ['https://a/', 'https://a/b/']);
});

test('noindex from meta tag or header', () => {
	assert.ok(isNoindex('<meta name="robots" content="noindex, nofollow">'));
	assert.ok(isNoindex('<html></html>', 'noindex'));
	assert.ok(!isNoindex('<meta name="robots" content="index,follow">'));
});

test('Organization schema needs a sameAs list', () => {
	const page = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
	assert.ok(hasOrganizationSchema(page({ '@graph': [{ '@type': 'Organization', sameAs: ['https://x'] }] })));
	assert.ok(!hasOrganizationSchema(page({ '@type': 'Organization' })));
	assert.ok(!hasOrganizationSchema('<script type="application/ld+json">{broken</script>'));
});

test('only 404 and 410 count as dead links', () => {
	assert.deepEqual(classifyLinkError('tautan eksternal mengembalikan HTTP 404: https://x.go.id/a'), { status: 404, url: 'https://x.go.id/a', dead: true });
	assert.equal(classifyLinkError('tautan eksternal mengembalikan HTTP 403: https://x/a').dead, false);
	assert.equal(classifyLinkError('tautan eksternal mengembalikan HTTP 503: https://x/a').dead, false);
	assert.equal(classifyLinkError('pesan lain'), null);
});

test('score, days and report shape', () => {
	assert.equal(checkScore([true, true, false]), 66.7);
	assert.equal(checkScore([]), 0);
	assert.equal(daysBetween(new Date('2026-11-01T00:00:00Z'), new Date('2026-11-08T12:00:00Z')), 7);
	const r = buildReport({ runAt: new Date('2026-11-08T03:41:00Z'), commit: '', findings: [], metrics: { pages: 3 } });
	assert.deepEqual(r, { schema: 1, run_at: '2026-11-08T03:41:00.000Z', commit: null, findings: [], metrics: { pages: 3 } });
});
