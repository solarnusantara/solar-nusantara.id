import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import UnoCSS from 'unocss/astro';
import sitemap from "@astrojs/sitemap";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * Article slug -> last-modified date, read straight from the frontmatter.
 *
 * @astrojs/sitemap emits <loc> only. Of the three optional tags, <lastmod> is
 * the one Google actually uses - it has said publicly that it ignores
 * <priority> and <changefreq> - and it is how a crawler decides which of a
 * thousand URLs are worth re-fetching. Without it every article looks equally
 * stale forever.
 *
 * `updatedDate` wins over `pubDate` when present, matching the dateModified
 * that buildArticleSchema() puts in the BlogPosting. The two must agree: a
 * sitemap claiming a page changed today while the page's own schema says 2024
 * is a contradiction Google resolves by trusting neither.
 */
function readArticleDates() {
  const dir = 'src/content/berita';
  const dates = new Map();

  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return dates;
  }

  for (const slug of entries) {
    let raw;
    try {
      if (!statSync(join(dir, slug)).isDirectory()) continue;
      raw = readFileSync(join(dir, slug, 'index.md'), 'utf8');
    } catch {
      continue;
    }

    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!fm) continue;

    const pick = (key) => {
      const m = new RegExp('^' + key + '\\s*:\\s*["\']?([^"\'\\n]+)', 'm').exec(fm[1]);
      return m ? m[1].trim() : null;
    };

    const value = pick('updatedDate') || pick('pubDate');
    if (!value) continue;

    const d = new Date(value);
    if (!Number.isNaN(d.valueOf())) dates.set(slug, d);
  }

  return dates;
}

const ARTICLE_DATES = readArticleDates();

// https://astro.build/config
export default defineConfig({
  site: 'https://solar-nusantara.id', // Ganti dengan domain produksi Anda

  // Article slugs come from the directory name under src/content/berita/, so a
  // folder named with an en dash or a " copy" suffix shipped that straight into
  // the public URL. Three did. The folders were renamed on 2026-09-15; these
  // entries keep the old URLs - all three were live and returning 200 - from
  // turning into 404s. build.redirects defaults to true in static output, so
  // each one is emitted as a redirect page in dist/.
  //
  // scripts/check-content.mjs now rejects a malformed slug at build time, so
  // this list should not need to grow.
  redirects: {
    '/berita/apa-itu-sonushub-platform-terpadu-untuk-kebutuhan-energi-surya-anda-copy':
      '/berita/apa-itu-sonushub-platform-terpadu-untuk-kebutuhan-energi-surya-anda',
    '/berita/sejarah-pertumbuhan-pv--bagian-1-penemuan-efek-fotovoltaik':
      '/berita/sejarah-pertumbuhan-pv-bagian-1-penemuan-efek-fotovoltaik',
    '/berita/sejarah-pertumbuhan-pv--bagian-2-evolusi-dan-perkembangan-industri-fotovoltaik':
      '/berita/sejarah-pertumbuhan-pv-bagian-2-evolusi-dan-perkembangan-industri-fotovoltaik',
  },
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    sitemap({
      // Draft previews are public but unlisted, see src/pages/pratinjau/.
      filter: (page) => !new URL(page).pathname.startsWith('/pratinjau/'),
      serialize(item) {
        const m = /\/berita\/([^/]+)\/$/.exec(item.url);
        const date = m && ARTICLE_DATES.get(m[1]);
        if (date) item.lastmod = date.toISOString();
        return item;
      },
    })
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {
        output: 'html'
      }]
    ],
  },
});
