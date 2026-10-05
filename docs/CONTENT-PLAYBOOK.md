# Content playbook: solar-nusantara.id

How to add 1000 articles to this site without any of them shipping broken.

Written 2026-09-15, after auditing the 18 articles that already existed. Every
rule below exists because something concrete went wrong, and the fix is
enforced by a script rather than by remembering.

---

## 1. The three commands

```bash
npm run new-article -- "Judul Artikel"   # scaffold a correct article directory
npm run check                            # the gate: blocks a bad article
npm run build                            # runs check first, audit after
```

`check` runs automatically as `prebuild`. `audit` runs automatically as
`postbuild`. You cannot build a site that fails the gate.

---

## 2. What the gate enforces, and why

`scripts/check-content.mjs`. Errors block the build; warnings do not.

| Rule | Why it exists |
|---|---|
| Slug is lowercase ASCII with single hyphens | Three live URLs carried an en dash or a " copy" suffix. The slug **is the directory name**, so a folder named in Word ships that name to production. |
| No `copy` in the slug | `.../energi-surya-anda-copy/` was live and indexable. |
| No unescaped `$` before a digit | remark-math paired `$100 per watt ... mendekati $1` into one inline formula. Readers saw `100perwatt`. Two articles shipped that way. Write `\$100`. |
| `description` 70-160 chars | Under 70 Google rewrites the snippet from page text; over 160 it truncates. Six articles had an empty description. |
| `focusKeyphrase` unique across all articles | Two articles chasing one query compete with each other. At 1000 articles this is the default outcome unless something counts. |
| No duplicate title or description | The two most common Ahrefs/Semrush site-audit errors. |
| Every image has descriptive alt | 14 of 18 articles had a hero image with no alt. |
| No `#` heading in the body | The layout already renders the title as the page's only `<h1>`. |

Drafts (`draft: true`) are skipped by all of the above. That is the point of a
draft. The moment the flag comes off, every rule applies.

---

## 3. Frontmatter contract

Defined in `src/content/config.ts`. Required fields have no fallback: a missing
one fails the build with a message naming the file.

```yaml
---
title: "Cara Menghitung Ukuran Sistem PLTS untuk Pabrik"   # required, <=110, the <h1>
seoTitle: "Menghitung Ukuran PLTS untuk Pabrik"            # optional, <=60, the <title>
description: "..."                                          # required, 70-160
focusKeyphrase: "menghitung ukuran plts pabrik"            # unique across the site
pubDate: "2026-09-15"                                       # required
updatedDate: "2026-11-02"                                   # only when actually revised
author: "Nama Penulis"                                      # optional
authorUrl: "https://..."                                    # optional
heroImage: "./hero.jpg"                                     # optional, co-located
heroImageAlt: "Deretan panel surya di atap pabrik"          # required IF heroImage set
tags: ["plts", "perhitungan"]                               # drives related articles
draft: false
---
```

### title vs seoTitle

These are two fields on purpose. Google truncates the SERP title around 60
characters; a page heading should stay descriptive. Set `seoTitle` whenever
`title` runs past 60. Seven of the existing 18 articles needed one.

The brand suffix is appended automatically by `Layout.astro`, but **only when it
fits inside 60 characters**. A truncated `| Solar Nusantara` costs real title
characters and buys nothing.

### updatedDate

Leave it unset unless the article was genuinely revised. `buildArticleSchema()`
falls back to `pubDate`, so an unset `updatedDate` means `dateModified ==
datePublished` - honest. Setting it to "now" on every build would claim every
article was revised today, and the sitemap `<lastmod>` would say the same thing.
Google resolves that contradiction by trusting neither.

### heroImageAlt

Describe **what the image shows**, not what the article is about. The title is
already on the page; repeating it in the alt gives a screen reader nothing and
gives an image-search crawler nothing.

Bad: `alt="Cara Menghitung Efisiensi Panel Surya"`
Good: `alt="Ilustrasi satu panel surya biru di atas rangka penyangga logam"`

---

## 4. Structured data

Every article gets `BlogPosting` + `BreadcrumbList` from **one** helper,
`src/utils/articleSchema.ts`. Nothing writes Article JSON-LD inline.

At 1000 articles the failure mode is not "this page lacks schema", it is "997
pages drifted from the 3 that were done by hand".

The nodes are merged into the page's single `@graph` via `Layout.astro`'s
`jsonLd` prop, and reference the publisher and site by `@id`
(`#organization`, `#website`) instead of restating them. One page, one graph,
one description of the organisation.

Never add a second `<script type="application/ld+json">` to a page.

---

## 5. Internal linking

This is the part that decides whether 1000 articles get crawled at all.

With a 6-per-page listing, article 200 sits 30+ clicks from `/berita/` and is an
orphan for practical purposes. `RelatedArticles.astro` puts 3 contextual links
at the bottom of every article, ranked by shared `tags` then recency. That turns
a flat list into a connected graph.

**So `tags` are not decoration.** An article with no tags gets related links by
recency alone, which is close to random.

Also link **in the body** to the product or service page the article supports.
An article about inverter sizing should link `/produk/sistem-panel-surya/inverter/`.
That is what turns informational traffic into commercial traffic.

Use root-relative paths with a trailing slash: `/produk/...../`. Not
`produk/...` (resolves relative to the current article) and not without the
trailing slash (GitHub Pages 301s it, and an internal link to a redirect is an
audit finding). `npm run audit` catches both.

---

## 6. Reading the audit

`npm run audit` crawls `dist/` the way Ahrefs crawls a live site. It reports and
never blocks, because these are judgement calls.

It found 586 issues on the first run and 1 after the fixes. Keep it near zero;
a growing count means something systemic, not one bad article.

The checks: 4xx internal links, links to redirects, duplicate title, duplicate
description, missing title/description, title length, H1 count, image alt,
orphan pages, sitemap coverage, canonical correctness, and JSON-LD validity
including required Article fields.

---

## 7. Things that are already handled - do not re-solve

- **Canonical URLs** are built from `site` + pathname only, dropping the
  querystring. A `?utm_source=` link used to self-declare a different canonical
  and split the signal.
- **KaTeX** loads only on pages containing math, detected automatically from the
  body. Its SRI hash was wrong and fail-closed, so it was blocked on every page.
- **`lang="id"`** on `<html>`. It said `en` while every string is Indonesian.
- **Sitemap `lastmod`** comes from `updatedDate ?? pubDate` per article.
- **Drafts** are excluded from the sitemap, listings, footer and search index by
  `getPublishedArticles()`, which is the only way anything reads the collection.

---

## 8. Known open items

- `rekrutmen.solar-nusantara.id` is **NXDOMAIN**. It is the primary CTA on
  `/tentang/karir/`. Needs one DNS record; the link is dead until then.
- Search Console property `sc-domain:solar-nusantara.id`: the DNS side is done.
  The verification TXT is live on the apex (`npm run dns -- get TXT @`, checked
  2026-10-05), so there is nothing left to add. Whether the property reads
  *Verified* is only visible inside the console itself.
- `produk/ekosistem-ev/spkl.md` and `produk/sistem-panel-surya/sistem-baterai.md`
  share the same body text on two URLs. Duplicate content; needs a rewrite of
  one of them.
- Astro 5 legacy collections are used (`src/content/config.ts`). Astro 6 removes
  them entirely - migrating to the Content Layer API is a separate job.
