#!/usr/bin/env node
/**
 * Manage this domain's Cloudflare DNS from the command line.
 *
 *   npm run dns -- list
 *   npm run dns -- list --type TXT
 *   npm run dns -- add TXT @ "google-site-verification=..."
 *   npm run dns -- add CNAME docs example.github.io --proxied
 *   npm run dns -- delete TXT _acme-challenge
 *   npm run dns -- verify-google "google-site-verification=..."
 *
 * Needs a Cloudflare API token in CLOUDFLARE_API_TOKEN, scoped to this zone.
 * Create one at dash.cloudflare.com/profile/api-tokens -> Create Token ->
 * Edit zone DNS, and restrict it to solar-nusantara.id rather than all zones.
 *
 * CLOUDFLARE_ZONE_ID is optional; set it and the zone lookup is skipped, which
 * also lets a DNS-only token work without Zone:Read.
 *
 * The token is read from the environment and never printed, never written to a
 * file, and never passed on a command line where it would land in shell
 * history or a process listing.
 *
 * WHY THE GUARDS EXIST
 *
 * This zone carries more than the website. The apex record points at GitHub
 * Pages through Cloudflare, and the TXT records include an SPF line delegating
 * mail to Hostinger plus two site-verification strings. Deleting the wrong row
 * here does not produce a build error - it takes the site or the company's
 * email off the internet, and the only symptom is that things stop arriving.
 *
 * So destructive operations are refused on load-bearing records unless the
 * caller passes --force-protected, and every mutation prints what it is about
 * to do and requires --yes. Reads need neither.
 */

const API = 'https://api.cloudflare.com/client/v4';
const ZONE_NAME = 'solar-nusantara.id';

const argv = process.argv.slice(2);
const cmd = argv.find((a) => !a.startsWith('--'));
const positional = argv.filter((a) => !a.startsWith('--')).slice(1);
const has = (n) => argv.includes(`--${n}`);
const flag = (n, d = null) => {
	const i = argv.indexOf(`--${n}`);
	return i === -1 ? d : argv[i + 1];
};

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;

function usage(code = 0) {
	console.log(`
dns - Cloudflare DNS for ${ZONE_NAME}

  list [--type TXT]                     show records
  get <type> <name>                     show one record
  add <type> <name> <content>           create a record
  update <type> <name> <content>        replace a record's content
  delete <type> <name>                  remove a record
  verify-google <txt-value>             add a Search Console TXT on the apex

Flags
  --yes                 required for add / update / delete
  --ttl <seconds>       default 1 (automatic)
  --proxied             route through Cloudflare (A/AAAA/CNAME only)
  --force-protected     allow touching a load-bearing record
  --json                machine-readable output

Environment
  CLOUDFLARE_API_TOKEN  required, zone-scoped token with DNS:Edit
  CLOUDFLARE_ZONE_ID    optional, skips the zone lookup
`);
	process.exit(code);
}

// Asking for help is not an error; omitting the command is.
if (has('help')) usage(0);
if (!cmd) usage(1);
if (!TOKEN) {
	console.error('CLOUDFLARE_API_TOKEN is not set.');
	console.error('Create a zone-scoped token (Edit zone DNS) and export it:');
	console.error('  export CLOUDFLARE_API_TOKEN=...   # do not paste it into a command that gets logged');
	process.exit(1);
}

async function cf(path, init = {}) {
	const res = await fetch(`${API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			'Content-Type': 'application/json',
			...(init.headers || {}),
		},
	});
	const body = await res.json().catch(() => ({}));
	if (!res.ok || body.success === false) {
		// Cloudflare returns its reasons in an errors array; surfacing them beats
		// "HTTP 400". The token itself is never part of the response.
		const why = (body.errors || []).map((e) => `${e.code} ${e.message}`).join('; ') || `HTTP ${res.status}`;
		throw new Error(why);
	}
	return body.result;
}

/** Prefer the configured zone id; fall back to resolving it by name so nothing has to be pasted. */
async function zoneId() {
	const configured = (process.env.CLOUDFLARE_ZONE_ID || '').trim();
	// A wrong id fails as a confusing 404 on every later call, so reject a malformed one here.
	if (configured) {
		if (!/^[0-9a-f]{32}$/i.test(configured)) {
			throw new Error('CLOUDFLARE_ZONE_ID is set but is not a 32-character hex id');
		}
		return configured;
	}
	const zones = await cf(`/zones?name=${encodeURIComponent(ZONE_NAME)}`);
	if (!zones.length) {
		throw new Error(`zone ${ZONE_NAME} not visible to this token - set CLOUDFLARE_ZONE_ID or widen the token's zone scope`);
	}
	return zones[0].id;
}

/** `@` and the bare domain both mean the apex. */
const fqdn = (name) => (name === '@' || name === ZONE_NAME ? ZONE_NAME : `${name}.${ZONE_NAME}`);
const shortName = (name) => (name === ZONE_NAME ? '@' : name.replace(`.${ZONE_NAME}`, ''));

/**
 * Is this record load-bearing?
 *
 * Each case here is something that is currently live on this zone and whose
 * removal has a consequence that is not a build failure:
 *   apex A/AAAA/CNAME  the website itself
 *   MX                 company email
 *   SPF / DKIM / DMARC email deliverability - mail starts landing in spam
 *   site-verification  re-verifying a Search Console property is not instant
 */
function protectedReason(rec) {
	const isApex = rec.name === ZONE_NAME;
	if (isApex && ['A', 'AAAA', 'CNAME'].includes(rec.type)) return 'apex record serving the website';
	if (rec.type === 'MX') return 'mail exchange - removing it stops company email';
	if (rec.type === 'TXT') {
		const c = String(rec.content || '').toLowerCase();
		if (c.includes('v=spf1')) return 'SPF - removing it sends outgoing mail to spam';
		if (c.includes('v=dkim1')) return 'DKIM signing key';
		if (c.includes('v=dmarc1')) return 'DMARC policy';
		if (c.includes('site-verification')) return 'site verification - re-verifying is not instant';
	}
	return null;
}

const row = (r) => ({
	id: r.id,
	type: r.type,
	name: shortName(r.name),
	content: r.content,
	ttl: r.ttl === 1 ? 'auto' : r.ttl,
	proxied: r.proxied ? 'yes' : '-',
	protected: protectedReason(r) ? '!' : '',
});

function printTable(records) {
	if (has('json')) {
		console.log(JSON.stringify(records.map(row), null, 2));
		return;
	}
	if (!records.length) {
		console.log('no records matched');
		return;
	}
	const rows = records.map(row);
	const w = (k, min) => Math.max(min, ...rows.map((r) => String(r[k]).length));
	const wt = w('type', 5);
	const wn = w('name', 4);
	console.log('');
	for (const r of rows) {
		const content = r.content.length > 72 ? `${r.content.slice(0, 69)}...` : r.content;
		console.log(
			`  ${r.protected.padEnd(1)} ${r.type.padEnd(wt)}  ${r.name.padEnd(wn)}  ${content}` +
				`${r.proxied === 'yes' ? '  [proxied]' : ''}`,
		);
	}
	const prot = rows.filter((r) => r.protected).length;
	console.log(`\n  ${records.length} record(s)${prot ? `, ${prot} marked ! as load-bearing` : ''}\n`);
}

async function findRecords(zid, type, name) {
	const q = new URLSearchParams();
	if (type) q.set('type', type.toUpperCase());
	if (name) q.set('name', fqdn(name));
	return cf(`/zones/${zid}/dns_records?${q}&per_page=200`);
}

/** Mutations state their intent and stop; --yes is the whole confirmation step. */
function requireYes(action) {
	if (has('yes')) return;
	console.error(`\nRefusing to ${action} without --yes.`);
	console.error('Re-run the same command with --yes once the line above looks right.\n');
	process.exit(1);
}

function guardProtected(rec, action) {
	const why = protectedReason(rec);
	if (!why) return;
	if (has('force-protected')) {
		console.log(`  WARNING: ${action} a protected record (${why}) because --force-protected was passed`);
		return;
	}
	console.error(`\nRefusing to ${action} this record: ${why}.`);
	console.error(`  ${rec.type}  ${shortName(rec.name)}  ${rec.content}`);
	console.error('\nIf that is genuinely intended, add --force-protected.\n');
	process.exit(1);
}

async function main() {
	const zid = await zoneId();

	switch (cmd) {
		case 'list': {
			printTable(await findRecords(zid, flag('type'), null));
			break;
		}

		case 'get': {
			const [type, name] = positional;
			if (!type || !name) usage(1);
			printTable(await findRecords(zid, type, name));
			break;
		}

		case 'add':
		case 'verify-google': {
			const [type, name, content] =
				cmd === 'verify-google' ? ['TXT', '@', positional[0]] : positional;
			if (!type || !name || !content) usage(1);

			const payload = {
				type: type.toUpperCase(),
				name: fqdn(name),
				content,
				ttl: Number(flag('ttl', '1')),
			};
			if (has('proxied')) payload.proxied = true;

			console.log(`\nadd  ${payload.type}  ${shortName(payload.name)}  ${content}`);
			// Google allows several verification TXT rows side by side, so adding one
			// must not look like it needs the old one removed first.
			if (cmd === 'verify-google') {
				const existing = (await findRecords(zid, 'TXT', '@')).filter((r) =>
					String(r.content).includes('site-verification'),
				);
				if (existing.length) {
					console.log(`  note: ${existing.length} verification TXT already present - Google allows several, none is removed`);
				}
			}
			requireYes('add a record');
			const made = await cf(`/zones/${zid}/dns_records`, { method: 'POST', body: JSON.stringify(payload) });
			console.log(`  created ${made.id}\n`);
			break;
		}

		case 'update': {
			const [type, name, content] = positional;
			if (!type || !name || !content) usage(1);
			const found = await findRecords(zid, type, name);
			if (found.length !== 1) {
				console.error(`expected exactly 1 matching record, found ${found.length}`);
				process.exit(1);
			}
			const rec = found[0];
			console.log(`\nupdate  ${rec.type}  ${shortName(rec.name)}`);
			console.log(`  from: ${rec.content}`);
			console.log(`  to:   ${content}`);
			guardProtected(rec, 'change');
			requireYes('change a record');
			await cf(`/zones/${zid}/dns_records/${rec.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ content }),
			});
			console.log('  updated\n');
			break;
		}

		case 'delete': {
			const [type, name] = positional;
			if (!type || !name) usage(1);
			const found = await findRecords(zid, type, name);
			if (!found.length) {
				console.error('no such record');
				process.exit(1);
			}
			if (found.length > 1) {
				console.error(`${found.length} records match ${type} ${name}; delete is single-record only.`);
				printTable(found);
				process.exit(1);
			}
			const rec = found[0];
			console.log(`\ndelete  ${rec.type}  ${shortName(rec.name)}  ${rec.content}`);
			guardProtected(rec, 'delete');
			requireYes('delete a record');
			await cf(`/zones/${zid}/dns_records/${rec.id}`, { method: 'DELETE' });
			console.log('  deleted\n');
			break;
		}

		default:
			console.error(`unknown command "${cmd}"`);
			usage(1);
	}
}

// An operator mistake - wrong token, wrong zone id, a record that is not there -
// is not a bug, so report the reason and exit rather than printing a stack trace.
try {
	await main();
} catch (e) {
	console.error(`
${e.message}
`);
	process.exit(1);
}
