# drafts/

Work in progress that is not part of the site. Nothing here is read by Astro.

## `drafts/berita/<slug>/`

Articles written and waiting to go out: `index.md` (`draft: true`) and `hero.webp`.
This is the stock that `scripts/publish-drip.mjs` draws from, one article per publishing
day (Tuesday to Friday). `scripts/generate-article.mjs` refills it when fewer than four wait.

Publishing moves the whole folder to `src/content/berita/<slug>/` with `draft: false`, so
a folder is either here (not live) or there (live), never both. `ls drafts/berita` is what
is next. The details are in `docs/AUTOMATION.md`.

A draft the machine gates rejected stays here too, with its topic marked `failed` in
`data/topics.json` and the reason in `lastError`; it is no longer part of the stock.
Drafts of the old topic matrix (`legacy`) live here as well and are never published by the
schedule. To publish one by hand: remove `draft: true`, move the folder to
`src/content/berita/`, then `npm run check` and `npm run check-seo -- <slug>`.

`npm run new-article -- "Judul"` also creates its draft here.

## Other files

`cta-block.md` is the closing block `generate-article.mjs` appends to every article.

## Why not `src/content/`

Files used to live under `src/content/draft/`, where Astro auto-generated an undeclared
`draft` collection from them and printed a deprecation warning on every build. Drafts in
`src/content/berita/` with `draft: true` are filtered out of the listings, the sitemap, the
footer and the search index by `getPublishedArticles()`, but they sit among the live
articles, which is how 96 drafts ended up hiding 22 live ones. Hence this folder.
