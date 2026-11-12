# GEO Audit Report: Solar Nusantara

**Audit Date:** 2026-11-12
**URL:** https://solar-nusantara.id
**Business Type:** Hybrid: Agency/Services (EPC PLTS, manajemen energi) + Product catalogue + Publisher (`/berita`)
**Pages Analyzed:** 18 fetched (homepage + 17 sampled) of 88 URLs in the sitemap

---

## Executive Summary

**Overall GEO Score: 55/100 (Poor, upper edge)**

The technical foundation is strong. The site is static Astro HTML, every AI crawler gets a 200, and it has a thorough `llms.txt`, a sitemap and clean Organization/LocalBusiness schema. The weak points are off-site: almost no third-party brand footprint, and a generic organisation-only byline on articles. A mislabelled "developer" Person entity also appears in the schema of every page. Product pages carry no Product schema and thin copy.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 62/100 | 25% | 15.5 |
| Brand Authority | 28/100 | 20% | 5.6 |
| Content E-E-A-T | 52/100 | 20% | 10.4 |
| Technical GEO | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 66/100 | 10% | 6.6 |
| Platform Optimization | 45/100 | 10% | 4.5 |
| **Overall GEO Score** | | | **54.9 → 55/100** |

### Remediation Update (2026-11-12, same day)

Code changes are built and verified locally (`npm run build`, 82 pages, built HTML inspected) but **not yet committed or deployed**. The scores above are the live-site baseline; re-run the audit after deploy to re-score.

| # | Item | Status |
|---|---|---|
| High 3 | Named article author | **Done in code.** Default byline is Rahma Putri Anjani (jobTitle "Writer"), linked to her card on `/tentang/tim-kita/`, with a visible bio box and a `Person` author node. Still open: `sameAs` links and a real bio (placeholder text now). 13 articles keep the existing guest byline "Farros". |
| High 4 | Product schema | **Done in code.** `Product` + `Offer` on all `/produk/*` content pages. Panel TKDN carries TKDN, warranty and degradation as `additionalProperty`. No price or image, so no rich-result snippet yet. |
| Medium 5 | `dateModified` = `datePublished` | **Not a defect, no change.** It already derives from `updatedDate`, which is set by hand on a real revision (see `scripts/refresh-stale.mjs`). Added a visible "Diperbarui" date that shows once `updatedDate` is set. |
| Medium 6 | `wordCount` mismatch | **Finding retracted, but fixed anyway.** My 1,452 figure included nav and footer text. The old count did include markdown symbols (1,170 vs 980 words for the sawit article); `wordCount` and reading time now count only real words. |
| Medium 9 | `/sitemap.xml` 404 | **Done in code.** Build now writes `dist/sitemap.xml` as an identical copy of `sitemap-index.xml` (hosting cannot send a 301; a Cloudflare redirect rule is the alternative). |
| High 2 (part) | `sonus-epc.pages.dev` | **Resolved.** NXDOMAIN on Google and Cloudflare DNS, so it cannot be indexed; nothing in the repo references it. `sonus-epc.id` is a separate, indexable site. |
| Appendix | `/tentang/tim-kita` bios | **Done in code.** Ten people (nine staff plus the writer) have anchored cards and `Person` schema. Bios state only role and company until real ones are supplied. |
| High 1 | Developer `Person` in sitewide schema | **Still open** (one block in `Layout.astro`). |

Scope limits: no Lighthouse or Core Web Vitals run (measured TTFB only, 0.7–1.7 s). Brand Authority comes from one web search plus the site's own links, so treat it as indicative. Only 18 of 88 pages were fetched.

---

## Critical Issues (Fix Immediately)

None. No crawler blocking, no noindex, no 5xx, and content is server-rendered.

## High Priority Issues

1. **Sitewide `Person` entity is the website developer, not the company.** Every page's JSON-LD `@graph` includes `#developer` (Mochammad Farros Fatchur Roji, "Cyber Security & Data Engineer", with GitHub, Medium and dev.to `sameAs`). Entity-resolution systems can attach an unrelated person's profile to the brand. The footer also links `farros.co`. Remove it from the graph, or at most keep it as a plain footer credit link.
2. **No third-party brand presence.** A web search for "Tripower Solar Nusantara" / "Sonus EPC" returned no independent mention. The only match was `sonus-epc.pages.dev`, an old site of yours that no longer resolves (confirmed later the same day). No Wikipedia, Wikidata, news or Reddit footprint was found, and `sameAs` lists only Instagram, YouTube and LinkedIn. The name "Solar Nusantara" is also ambiguous against Sembcorp's Nusantara solar project and PLN Nusantara Power.
3. **Articles are bylined to the Organization only.** *(Fixed in code, see Remediation Update.)* `BlogPosting.author` is `Organization: Solar Nusantara`, and the page shows "Oleh Solar Nusantara". There is no named engineer or reviewer and no credentials. This is the biggest E-E-A-T gap for technical and procurement content.
4. **Product pages have no `Product`/`Offer` schema.** *(Fixed in code, see Remediation Update.)* `/produk/...` pages (checked: panel-tkdn, rdf) emit only Organization, LocalBusiness, WebSite, Person and BreadcrumbList. Panel TKDN has 488 words and no H2. Facts such as "TKDN 43,50%" and "garansi 20 tahun" are not machine-structured.

## Medium Priority Issues

5. ~~`dateModified` equals `datePublished`~~ Not a defect: no article has been revised yet, and `updatedDate` is deliberately set by hand. No change needed.
6. ~~`wordCount` does not match the rendered page~~ Retracted: the 1,450 figure counted the whole page. The real issue was markdown symbols inflating the count; fixed.
7. No `FAQPage`/`HowTo` schema anywhere, though the articles are Q&A and checklist shaped. No `speakable`.
8. Service and product pages (437–610 words) cite no external sources. In the sampled article, the only outbound authority link was `esdm.go.id`. The standards named in the copy (SNI, IEC, ASTM) are not linked.
9. *(Fixed in code.)* `/sitemap.xml` returns a 404. Only `/sitemap-index.xml` exists. It is declared in `robots.txt`, so this is fine for Google, but some AI fetchers probe the default path. Add a redirect or a copy.
10. Weak security headers: HSTS `max-age` is only 30 days (no `includeSubDomains`/`preload`), and there is no CSP, `X-Frame-Options` or `Referrer-Policy`. This is limited by GitHub Pages hosting, so set them at the Cloudflare layer.
11. No YouTube content with transcripts, and no Reddit/forum presence, although a channel is linked.

## Low Priority Issues

12. `LocalBusiness` has no `sameAs`, `priceRange` or `hasMap`, and the founder `Person` has no `url`/`sameAs`.
13. `robots.txt` is wildcard-allow only. Fine today, but add explicit `GPTBot`/`ClaudeBot`/`PerplexityBot`/`Google-Extended` stanzas to document intent.
14. No `llms-full.txt` (optional).
15. The homepage H1 hides its descriptive half in `sr-only` text. Prefer visible text, or a visible subtitle.
16. A JSON-LD `description` showed "Rp 9�13" in my terminal. This is probably my console encoding, but verify the en dash is valid UTF-8 in the built output.

---

## Category Deep Dives

### AI Citability (62/100)
- Strengths: question-style H2s in the sampled articles, one or more tables in articles and the EPC service page, specific figures ("CAPEX Rp 9–13 miliar per MWp", "TKDN 43,50%"), and descriptive meta text that answers the query directly.
- Weaknesses: service, product and about pages are brand-copy heavy and lack self-contained 134–167 word answer blocks. Product pages lack spec tables and comparison tables. Panel TKDN has no headings at all.
- Fix: open every article and service page with a 2–3 sentence definition or answer, add a spec table per product, and cite the standard behind each number.

### Brand Authority (28/100)
- Present: LinkedIn company page, YouTube channel and Instagram, all linked in `sameAs`.
- Absent: Wikipedia/Wikidata, independent press, Reddit/Quora, Facebook, and Google Business Profile (not verifiable from here).
- Entity noise: the developer Person (issue 1), and the separate `sonus-epc.id` / `sonushub.id` / `sonus-epc.pages.dev` properties. Make sure they cross-link with consistent legal name and NAP, and that no pages.dev copy is indexable.

### Content E-E-A-T (52/100)
- Experience and Expertise: articles are technically specific, but there is no named author, no project photos or case studies, and no reviewer. Trust is good: full address, phone, email, legal entity name, K3L policy pages and a contact page with a map.
- Authoritativeness: no certifications, client logos, awards or project references surfaced in the sampled pages. `/tentang/tim-kita` (437 words) has no linked bios.
- Fix: named author and reviewer `Person` entities with role and credentials on every article, and a real-project case study section.

### Technical GEO (82/100)
- AI crawlers: GPTBot, ClaudeBot, PerplexityBot and Google-Extended all receive 200. `robots.txt` is `Allow: /` with a sitemap reference.
- `llms.txt`: present, 11.6 KB, well structured (Layanan, Produk, Tentang, Berita, Optional, Key Facts). It is a clear strength, but refresh the article list as the content grows.
- Rendering: static Astro, with all content in the initial HTML. `lang="id"` is correct, and canonical and OG/Twitter tags are present on pages checked. Image alt text was complete on every page sampled.
- Speed: TTFB 0.7–1.7 s on the cached edge, which is acceptable but not fast. Homepage HTML is 225 KB. The sitemap and `robots.txt` work.
- Gaps: see issues 9 and 10.

### Schema & Structured Data (66/100)
- Found: Organization (with `contactPoint` and `sameAs`), LocalBusiness (address, geo, hours), WebSite, BreadcrumbList on all pages, Service on service pages and BlogPosting on articles, all valid JSON.
- Missing or wrong: Product/Offer, FAQPage, article `author` as Person, `dateModified` accuracy, `about`/`mentions`, and removal of the developer Person.
- Hygiene: `Organization` and `LocalBusiness` are separate nodes for the same company. Link them with the same `@id` or `parentOrganization` rather than duplicating.

### Platform Optimization (45/100)
- Google AI Overviews: decent (structured, indexable, Indonesian-language topical depth). Perplexity and ChatGPT search: crawlable and `llms.txt`-ready, but they will find few corroborating third-party sources. Gemini and Bing Copilot: rely on Business Profile/Bing Places and Wikidata, which are unverified or absent.
- YouTube and Reddit signals are essentially unused.

---

## Quick Wins (Implement This Week)

1. Remove the `#developer` Person from the sitewide JSON-LD graph (one template change; removes entity confusion). **Open.**
2. ~~Named author~~ Done in code; add `sameAs` links and a real bio.
3. ~~Product + Offer JSON-LD~~ Done in code.
4. ~~Redirect `/sitemap.xml`~~ Done in code (copy, not a 301).
5. ~~`dateModified` / `wordCount`~~ `wordCount` fixed; `dateModified` was already correct.
6. **Deploy** the above, then re-run this audit.

## 30-Day Action Plan

### Week 1: Entity cleanup
- [ ] Drop developer Person, merge Organization/LocalBusiness `@id`s
- [ ] Add `sameAs` to LocalBusiness and the founder Person
- [x] `sonus-epc.pages.dev` no longer resolves (nothing to noindex)

### Week 2: Authorship and trust
- [x] Named default author (Rahma Putri Anjani); add reviewers and credentials
- [x] `/tentang/tim-kita` expanded into anchored, schema-marked cards; replace placeholder bios
- [ ] Add one real project case study with numbers

### Week 3: Product and answer structure
- [x] Product schema (spec table and H2s for Panel TKDN still to do); add H2s to Panel TKDN
- [ ] 2–3 sentence answer lead-ins on service and article pages
- [ ] FAQPage schema where the page already has Q&A

### Week 4: Off-site presence
- [ ] Claim Google Business Profile and Bing Places with identical NAP
- [ ] Publish a Wikidata entry (and Wikipedia only if notability is met)
- [ ] Press release or industry-media mention, plus YouTube explainers with transcripts
- [ ] Add security headers and a longer HSTS at Cloudflare

---

## Appendix: Pages Analyzed

| URL | Words | Schema types | GEO issues |
|---|---|---|---|
| `/` | 967 | Organization, LocalBusiness, WebSite, Person | developer Person, sr-only H1 text |
| `/berita/` (+ pages 2–6) | 548 | + BreadcrumbList | no CollectionPage schema |
| `/berita/analisis-kelayakan-investasi-plts-untuk-pabrik-kelapa-sawit/` | 1452 | + BlogPosting | Org author, dates equal, wordCount off |
| `/berita/analisis-profil-beban-listrik-harian-di-gedung-pemerintah/` | 1604 | + BlogPosting | Org author, no sources |
| `/berita/apa-itu-sonushub-platform-terpadu-untuk-kebutuhan-energi-surya-anda/` | 887 | + BlogPosting | Org author |
| `/layanan/sistem-tenaga-surya-epc/` | 610 | + Service | no FAQ, no sources |
| `/layanan/manajemen-energi/sistem-pemantauan-energi-ci/` | 596 | + Service | no table, no sources |
| `/produk/sistem-panel-surya/panel-surya/panel-tkdn/` | 488 | BreadcrumbList only | no Product schema, no H2 |
| `/produk/energi-biomassa/rdf/` | 570 | BreadcrumbList only | no Product schema, 1 H2 |
| `/tentang/tentang-solar-nusantara/` | 529 | BreadcrumbList only | no credentials or certifications |
| `/tentang/tim-kita/` | 437 | BreadcrumbList only | no bios (fixed in code: anchored cards + Person schema) |
| `/kontak/`, `/pintar/` | n/a | BreadcrumbList only | fetched OK, not analysed in detail |

All 18 fetches returned 200. `/sitemap.xml`, `/sitemap_index.xml` and `/llms-full.txt` return 404.
