/**
 * Compose an article thumbnail (1200x630) from the illustration library. No API call.
 *
 * Shared by make-thumbnails.mjs (CLI) and generate-article.mjs, so a draft is born
 * with its hero instead of getting one later.
 *
 * Logo, title and subtitle are drawn by script on purpose: a model-drawn Indonesian
 * title is wrong often enough to matter, and a script gives the same answer every time.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { splitFrontmatter, parseFrontmatter } from './seo-rules.mjs';
import { articleDir } from './articles.mjs';

const ILLUSTRATIONS = 'data/illustrations';
const LOGO = 'src/assets/logo.png';
const W = 1200;
const H = 630;
const BLUE = '#1a7fc4';

const COL_W = 445;
export const TITLE_SIZES = [56, 52, 48, 44, 40, 36, 32];
const TITLE_LH = 1.18;
/** 630 minus logo, subtitle and padding leaves ~394px; 340 keeps a visible gap above and below the title. */
const TITLE_MAX_H = 340;
const SUB_SIZE = 20;
const SUB_LH = 1.5;
const SUB_MAX_H = 90; // three lines

const font = (file) => readFileSync(join('scripts/assets/fonts', file));
const fonts = [
	{ name: 'Poppins', data: font('Poppins-Regular.ttf'), weight: 400, style: 'normal' },
	{ name: 'Poppins', data: font('Poppins-Bold.ttf'), weight: 700, style: 'normal' },
];

export const manifest = JSON.parse(readFileSync('data/illustrations.json', 'utf8')).items;
const altFor = new Map(manifest.map((i) => [i.key, i.alt]));

/** One picture per (product, angle): 35 pictures, each shared by the 7 buyers of that combination rather than by ~20 articles. */
export const illustrationKey = (topic) => (topic.product ? `${topic.product}--${topic.angle}` : null);

function pickIllustration(topic) {
	const key = illustrationKey(topic);
	return key && existsSync(join(ILLUSTRATIONS, `${key}.webp`)) ? key : null;
}
export { pickIllustration };

// --- text fitting -----------------------------------------------------------
/** Height satori lays this text out at, found by leaving height unset and reading it back. */
async function textHeight(text, { size, weight, lineHeight }) {
	const svg = await satori(
		{ type: 'div', props: { style: { width: COL_W, fontFamily: 'Poppins', fontWeight: weight, fontSize: size, lineHeight }, children: text } },
		{ width: COL_W, fonts },
	);
	return Number(svg.match(/<svg[^>]*\sheight="([\d.]+)"/)[1]);
}

/** Largest size at which the title fits the column. `fits` false means even the smallest overflows. */
export async function fitTitle(title) {
	for (const size of TITLE_SIZES) {
		const height = await textHeight(title, { size, weight: 700, lineHeight: TITLE_LH });
		if (height <= TITLE_MAX_H) return { size, fits: true };
	}
	return { size: TITLE_SIZES.at(-1), fits: false };
}

/** satori's lineClamp lets the box grow past the canvas, so the cut is made here, at a word. */
async function fitSubtitle(text) {
	const measure = (t) => textHeight(t, { size: SUB_SIZE, weight: 400, lineHeight: SUB_LH });
	if ((await measure(text)) <= SUB_MAX_H) return text;
	const words = text.split(/\s+/);
	while (words.length > 1) {
		words.pop();
		const cut = `${words.join(' ').replace(/[,.:;\s]+$/, '')}…`;
		if ((await measure(cut)) <= SUB_MAX_H) return cut;
	}
	return text.slice(0, 40);
}

// --- compose ----------------------------------------------------------------
const uriCache = new Map();
async function dataUri(file, width) {
	const k = `${file}@${width}`;
	if (!uriCache.has(k)) {
		const png = await sharp(file).resize({ width }).png().toBuffer();
		uriCache.set(k, `data:image/png;base64,${png.toString('base64')}`);
	}
	return uriCache.get(k);
}

const h = (type, style, children) => ({ type, props: { style, children } });
const img = (src, width, height, style = {}) => ({ type: 'img', props: { src, width, height, style } });

export async function compose(topic, title, description) {
	const key = pickIllustration(topic);
	if (!key) throw new Error(`no illustration for ${topic.id} (wanted ${illustrationKey(topic)})`);

	const fit = await fitTitle(title);
	const subtitle = await fitSubtitle(description);

	const tree = h(
		'div',
		{ display: 'flex', width: W, height: H, background: '#ffffff', fontFamily: 'Poppins', position: 'relative' },
		[
			img(await dataUri(join(ILLUSTRATIONS, `${key}.webp`), 640), 580, 580, { position: 'absolute', left: 575, top: 25 }),
			h('div', { display: 'flex', flexDirection: 'column', boxSizing: 'border-box', width: 500, height: H, padding: '52px 0 48px 55px' }, [
				img(await dataUri(LOGO, 420), 210, 44),
				h('div', { display: 'flex', flex: 1, minHeight: 0, alignItems: 'center' }, [
					h('div', { fontSize: fit.size, fontWeight: 700, color: BLUE, lineHeight: TITLE_LH }, title),
				]),
				h('div', { display: 'flex', height: SUB_MAX_H + 2, overflow: 'hidden', fontSize: SUB_SIZE, color: '#1f2933', lineHeight: SUB_LH }, subtitle),
			]),
		],
	);

	const svg = await satori(tree, { width: W, height: H, fonts });
	const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();
	const webp = await sharp(png).webp({ quality: 85 }).toBuffer();
	return { webp, key, fit, clipped: subtitle !== description };
}

// --- articles ---------------------------------------------------------------
export const articleFile = (slug) => join(articleDir(slug), 'index.md');

export function readArticle(slug) {
	const raw = readFileSync(articleFile(slug), 'utf8');
	const split = splitFrontmatter(raw);
	return { raw, data: split ? parseFrontmatter(split.frontmatter) : null };
}

/** heroImageAlt is a quoted YAML scalar; the manifest's alt never contains a double quote, but the guard costs one line. */
function withHero(raw, alt) {
	if (!/^description:.*$/m.test(raw)) throw new Error('no description line to anchor the hero fields after');
	const nl = raw.includes('\r\n') ? '\r\n' : '\n';
	return raw.replace(/^(description:.*)$/m, `$1${nl}heroImage: "./hero.webp"${nl}heroImageAlt: "${alt.replace(/"/g, "'")}"`);
}

/**
 * Give one written article its hero: hero.webp beside index.md plus the two frontmatter fields.
 * Idempotent: an article that already has a heroImage is left alone, so a hand-made hero is
 * never replaced and a rerun costs a file read.
 * @returns {Promise<{written: boolean, key?: string, fit?: object}>}
 */
export async function writeHero(topic) {
	const { raw, data } = readArticle(topic.slug);
	if (!data) throw new Error('frontmatter malformed');
	if (data.heroImage) return { written: false };
	const out = await compose(topic, data.title, data.description);
	writeFileSync(join(articleDir(topic.slug), 'hero.webp'), out.webp);
	writeFileSync(articleFile(topic.slug), withHero(raw, altFor.get(out.key)), 'utf8');
	return { written: true, key: out.key, fit: out.fit };
}
