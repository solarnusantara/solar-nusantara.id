/**
 * Pure helpers for scripts/audit-routine.mjs: no network, no filesystem, so each rule can be tested.
 *
 * The report is the contract with ERPSonus (src/seo/audit.rs, schema 1):
 *   { schema, run_at, commit, findings: [{id, category, severity, title, detail?, url?}], metrics: {name: number} }
 * Finding ids must be STABLE between runs - ERPSonus matches them to say what is new, fixed or still open -
 * and unique within a report (a duplicate makes ERPSonus reject the whole report).
 */
import { createHash } from 'node:crypto';

export const SCHEMA = 1;
const ID_MAX = 190; // ERPSonus keeps 200

/** Ids are `a:b:c`. A long one is cut but keeps a hash of the whole, so two long ids stay distinct and stable. */
export function findingId(...parts) {
	const id = parts.join(':');
	if (id.length <= ID_MAX) return id;
	return `${id.slice(0, ID_MAX - 9)}:${createHash('sha1').update(id).digest('hex').slice(0, 8)}`;
}

/** Findings keyed by id; adding an id twice keeps the first, so one check can never get the report rejected. */
export class Findings {
	#map = new Map();

	add(severity, category, idParts, title, { detail, url } = {}) {
		const id = findingId(category, ...idParts);
		if (this.#map.has(id)) return;
		const f = { id, category, severity, title };
		if (detail) f.detail = String(detail).slice(0, 1000);
		if (url) f.url = url;
		this.#map.set(id, f);
	}

	list() {
		return [...this.#map.values()];
	}

	count(severity) {
		return this.list().filter((f) => f.severity === severity).length;
	}
}

/**
 * Which of `bots` a robots.txt shuts out of the whole site. A bot uses its own group if there is one,
 * otherwise the `*` group; it is blocked when that group disallows `/` and does not allow `/` again.
 */
export function blockedBots(robotsTxt, bots) {
	const groups = []; // {agents: [lowercase], disallowAll, allowAll}
	let cur = null;
	let inRules = false;
	for (const raw of robotsTxt.split(/\r?\n/)) {
		const line = raw.replace(/#.*/, '').trim();
		const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
		if (!m) continue;
		const key = m[1].toLowerCase();
		const val = m[2].trim();
		if (key === 'user-agent') {
			if (!cur || inRules) {
				cur = { agents: [], disallowAll: false, allowAll: false };
				groups.push(cur);
				inRules = false;
			}
			cur.agents.push(val.toLowerCase());
		} else if (cur && (key === 'disallow' || key === 'allow')) {
			inRules = true;
			if (key === 'disallow' && val === '/') cur.disallowAll = true;
			if (key === 'allow' && val === '/') cur.allowAll = true;
		}
	}
	const find = (agent) => groups.find((g) => g.agents.includes(agent));
	return bots.filter((bot) => {
		const g = find(bot.toLowerCase()) ?? find('*');
		return Boolean(g && g.disallowAll && !g.allowAll);
	});
}

export const sitemapLocs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

/** A page is kept out of search by a robots meta tag or an X-Robots-Tag header. */
export function isNoindex(html, xRobotsTag = '') {
	return /noindex/i.test(xRobotsTag) || /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

/** Organization JSON-LD with a sameAs list, anywhere in the page. */
export function hasOrganizationSchema(html) {
	for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
		try {
			const walk = (n) => {
				if (Array.isArray(n)) return n.some(walk);
				if (!n || typeof n !== 'object') return false;
				const t = [].concat(n['@type'] ?? []);
				if (t.includes('Organization') && [].concat(n.sameAs ?? []).length > 0) return true;
				return Object.values(n).some(walk);
			};
			if (walk(JSON.parse(m[1]))) return true;
		} catch {
			/* invalid JSON-LD is audit-site's finding, not this check's */
		}
	}
	return false;
}

/**
 * `verifyExternalLinks` reports "tautan eksternal mengembalikan HTTP 404: https://..." .
 * Only 404/410 are a dead link; 403, 429 and 5xx are mostly sites refusing a bot or having a bad day.
 */
export function classifyLinkError(message) {
	const m = message.match(/HTTP (\d{3}): (https?:\/\/\S+)$/);
	if (!m) return null;
	const status = Number(m[1]);
	return { status, url: m[2], dead: status === 404 || status === 410 };
}

export const daysBetween = (a, b) => Math.floor((b.getTime() - a.getTime()) / 86_400_000);

/** Share of passed checks, 0-100 with one decimal. Only comparable with itself, never with a full /geo audit. */
export function checkScore(results) {
	if (results.length === 0) return 0;
	return Math.round((results.filter(Boolean).length / results.length) * 1000) / 10;
}

export function buildReport({ runAt, commit, findings, metrics }) {
	return { schema: SCHEMA, run_at: runAt.toISOString(), commit: commit || null, findings, metrics };
}
