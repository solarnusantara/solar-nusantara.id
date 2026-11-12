# GEO Audit Report: Solar Nusantara (PT Tripower Solar Nusantara)

**Audit Date:** 2026-11-12
**URL:** https://solar-nusantara.id
**Business Type:** Agency/Services (solar EPC contractor) with Publisher traits (about 40 technical articles) and some Product pages
**Pages Analyzed:** 15 fetched and parsed from the raw HTML, out of 90 URLs in the sitemap

> **Method note.** Scores for Technical GEO, Schema, Content and Citability come from raw HTML, headers and robots/sitemap/llms.txt. They were measured directly. **Brand Authority and Platform Optimization are estimates.** No live search of YouTube, Reddit, Wikipedia or AI engines was run. Treat those two scores as provisional until the brand scan is done.
> The first homepage fetch (an LLM summarizer) wrongly reported "no schema, no author". The raw HTML shows complete JSON-LD. Several GEO fixes on branch `feat/geo-remediation-case-study` are therefore already live.

---

## Executive Summary

**Overall GEO Score: 61/100 (Fair)**

The technical base is strong: all AI crawlers are allowed, `llms.txt` exists, the site is static HTML, and it has rich JSON-LD (Organization, LocalBusiness, Person, BlogPosting, Product, Service, BreadcrumbList). The weak points are off-site entity signals and content proof. There is no Wikipedia/Wikidata presence. Articles cite almost no external sources. Authors have thin bios. There is no FAQ content, and `dateModified` always equals `datePublished`. Brand fragmentation (Solar Nusantara / SONUS / SonusHUB / sonus-epc.id) also makes it harder for AI systems to resolve the company as one entity.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 68/100 | 25% | 17.0 |
| Brand Authority (estimated) | 35/100 | 20% | 7.0 |
| Content E-E-A-T | 62/100 | 20% | 12.4 |
| Technical GEO | 80/100 | 15% | 12.0 |
| Schema & Structured Data | 80/100 | 10% | 8.0 |
| Platform Optimization (estimated) | 45/100 | 10% | 4.5 |
| **Overall GEO Score** | | | **60.9 → 61/100** |

---

## Critical Issues (Fix Immediately)

None. Crawlers are open, content is server-rendered, and structured data is present.

## High Priority Issues

1. **No external citations in articles.** The CAPEX article, which was checked in detail, links out only to esdm.go.id, once. The hub contains NREL, SNI and TKDN claims, but sources are not linked. AI engines prefer content that cites verifiable sources. Add inline links to ESDM, PLN, NREL, IEC and SNI documents, and a "Sumber" section on every article.
2. **Entity fragmentation.** The site uses Solar Nusantara, SONUS, Sonus EPC, SonusHUB, sonus-epc.id and sonushub.id interchangeably. Declare one canonical entity in Organization schema, with `alternateName` and `sameAs` to the sister domains, and use consistent naming in body copy.
3. **No Wikipedia/Wikidata entity.** `sameAs` lists only Instagram, YouTube and LinkedIn. Create a Wikidata item (the company is notable enough only if it has press coverage) and add Crunchbase, Google Business Profile, and the Indonesian business registries or associations the company belongs to (e.g. AESI, ASPERINDO).

## Medium Priority Issues

4. **`dateModified` equals `datePublished`** on every sampled article (e.g. 2026-10-09T00:00:00Z, midnight UTC). Set real modification dates and include a time zone offset (+07:00). Freshness is a ranking factor for Perplexity and Google AI Overviews.
5. **Thin author credentials.** The author's `jobTitle` is "Writer". There are no `knowsAbout`, `sameAs` (LinkedIn) or credentials, and no technical reviewer. For engineering topics (mounting load standards, galvanizing, CAPEX), add a named reviewer engineer with credentials via `reviewedBy`.
6. **No FAQ content or FAQPage schema.** No FAQ was found on service or product pages. Procurement-intent questions ("Berapa biaya PLTS 100 kWp?", "Apa syarat TKDN?") are ideal for AI answers. Add 4-6 Q&A per service or product page.
7. **Organization schema gaps.** Missing `foundingDate` (the llms.txt says 2019), `knowsAbout`, `numberOfEmployees`, `legalName` check, and `founder.url`. The ContactPoint type is "technical support", but the email is `busdev` (sales). Use `sales`/`customer service`.
8. **Structure of non-article pages.** `/tentang/`, `/pintar/`, product pages (`panel-tkdn`, `pelet-kayu`) have 0 H2 headings and 370-630 words. AI extractors rely on question-style H2s and self-contained passages.
9. **Weak brand presence off-site (estimated).** Only three social profiles are linked. No evidence of Reddit/Kaskus discussions, news coverage, or YouTube content with transcripts. YouTube is the strongest correlated signal for AI citation.

## Low Priority Issues

10. **Security headers.** HSTS `max-age=2592000` (30 days) with no `includeSubDomains`/`preload`; no CSP, X-Frame-Options or Referrer-Policy. The site is on GitHub Pages behind Cloudflare/Fastly, so set these as Cloudflare response header rules.
11. **Sitemap has no `<lastmod>`** in the index or child sitemap. Add it (astro-sitemap `lastmod` option).
12. **No `llms-full.txt`, RSS/Atom feed (`/rss.xml` and `/feed.xml` 404), or `security.txt`.** A feed helps Perplexity and Bing discover new articles.
13. **No `speakable` property** on BlogPosting.
14. **Developer credit** to farros.co is the only external link in the footer; consider `rel="nofollow"` or removal.
15. **Homepage "Tentang" text is generic:** the meta description is fine, but there are no proof points (number of projects, MWp installed, client names) in extractable form.

---

## Category Deep Dives

### AI Citability (68/100)
**Strengths:** Articles run 900-1,700 words with 9-11 H2s, about 34 list blocks, and a table in the CAPEX piece. Titles are query-shaped ("Cara menghitung...", "Checklist pengadaan..."). Numbers and procurement checklists are highly quotable.
**Weaknesses:**
- The top of each article should open with a 40-60 word direct answer. Check that the first paragraph under each H1 states the answer ("PLTS 100 kWp untuk pabrik umumnya membutuhkan Rp X-Y miliar...") before background.
- Claims lack attribution, so models cannot safely quote them.
- Service and product pages are short and sales-oriented; few self-contained definitional passages.
- No original data presented as such. The Otsuka case study (on the working branch) is the right model: real project, real numbers. Publish more of these.

### Brand Authority (35/100, estimated)
- Present: Instagram `solar_nusantara`, YouTube `@Sonus.ID_`, LinkedIn company page.
- Not verified/likely absent: Wikipedia, Wikidata, Reddit, news mentions, Crunchbase, industry association listings.
- Sister brands (SonusHUB, Sonus EPC) split mention volume across names.
- Next step: run `/geo-brand-mentions solar-nusantara.id` for a measured score.

### Content E-E-A-T (62/100)
- **Experience:** Good potential (real projects, Otsuka case study), but most articles are generic guides without first-hand project data.
- **Expertise:** A named author exists with Person schema linking to the team page (up from "no author" before the remediation). Credentials and a technical reviewer are missing.
- **Authoritativeness:** ISO badge in footer, TKDN content, but no certification numbers, no client logos in structured form, no press.
- **Trust:** Physical address, phone, WhatsApp, business hours, geo coordinates, privacy and K3L policies. Strong. Email is hidden behind Cloudflare obfuscation on the page but is present in schema and llms.txt.

### Technical GEO (80/100)
- robots.txt: `User-agent: * Allow: /` with a sitemap line. No AI-specific rules, so all of GPTBot, ClaudeBot, PerplexityBot and Google-Extended are allowed. Consider explicit `Allow` blocks to document intent.
- Bot test: GPTBot, ClaudeBot and PerplexityBot user agents get HTTP 200.
- llms.txt: present and well structured (company, services, products, insights, contact). Missing `llms-full.txt`.
- Static HTML via GitHub Pages and Cloudflare/Fastly CDN, with `Cache-Control: max-age=600`. No JavaScript rendering dependency.
- On every sampled page: single H1, canonical, meta description, OG and Twitter tags; 0 images missing alt text.
- Deductions: security headers (see Low #10), sitemap lastmod, no feed.

### Schema & Structured Data (80/100)
**Found:** Organization, LocalBusiness (with GeoCoordinates, OpeningHoursSpecification, PostalAddress), WebSite, Person, ContactPoint, ImageObject, BreadcrumbList on all pages; BlogPosting on articles; Service on service pages; Product, Brand and Offer on product pages.
**Missing:** FAQPage, HowTo (the calculation and checklist articles fit), `speakable`, `knowsAbout`, `foundingDate`, `reviewedBy`, `citation`, ItemList on hub pages, real `dateModified`, Review/AggregateRating (only if genuine reviews exist).
**Note:** The full Organization and LocalBusiness graph repeats on every page. That is acceptable, but keep `@id` references stable.

### Platform Optimization (45/100, estimated)
| Platform | Readiness |
|---|---|
| Google AI Overviews | Moderate. Strong schema and indexable pages, weak on cited sources and freshness dates. |
| ChatGPT search | Moderate. Allowed by robots, llms.txt present; needs more third-party mentions. |
| Perplexity | Moderate-low. Needs an RSS feed, real dates and outbound citations. |
| Gemini | Moderate. Add YouTube content and Google Business Profile. |
| Bing Copilot | Moderate. Verify Bing Webmaster Tools and IndexNow. |

---

## Quick Wins (Implement This Week)

1. Add a **"Sumber"** section with 3-5 outbound links (ESDM, PLN, NREL, SNI/IEC) to the 10 highest-intent articles (CAPEX, TKDN, mounting, inverter guides).
2. Set a real `dateModified` and a +07:00 offset in BlogPosting; stop copying `datePublished`.
3. Add `foundingDate`, `knowsAbout`, `alternateName` (SONUS, SonusHUB) and a sales-type ContactPoint to Organization schema.
4. Add FAQ blocks and FAQPage schema to `/layanan/sistem-tenaga-surya-epc/`, `/layanan/epc/segmen-ci/` and `/produk/.../panel-tkdn/`.
5. Add `<lastmod>` to the sitemap and an `/rss.xml` feed for `/berita`.

## 30-Day Action Plan

### Week 1: Credibility signals
- [ ] Add source links to the top 10 articles
- [ ] Fix `dateModified`, add timezone
- [ ] Extend author Person with `knowsAbout`, LinkedIn `sameAs`, and a fuller bio
- [ ] Add a named technical reviewer (`reviewedBy`) to engineering articles

### Week 2: Structured data and structure
- [ ] FAQPage on 5 service and product pages
- [ ] HowTo schema on calculation articles (efisiensi, produksi energi, kWh)
- [ ] Add H2s with question phrasing to `/tentang/`, `/pintar/`, product pages
- [ ] Lead each article with a 40-60 word direct answer

### Week 3: Entity consolidation
- [ ] Unify brand naming; document the relationship between Solar Nusantara, SONUS and SonusHUB in Organization `sameAs`/`alternateName`
- [ ] Create a Google Business Profile and a Crunchbase entry; link them in `sameAs`
- [ ] Draft a Wikidata item and collect 2-3 independent press mentions to support it
- [ ] Publish 2 more case studies (modeled on Otsuka) with real kWp, savings and payback numbers

### Week 4: Distribution and technical polish
- [ ] Cloudflare header rules: HSTS 1 year with `includeSubDomains`, CSP, X-Frame-Options, Referrer-Policy
- [ ] Publish `llms-full.txt`; add `speakable` to articles
- [ ] Publish 2-3 YouTube videos with transcripts from existing articles; embed them
- [ ] Re-run `/geo-audit` and `/geo-compare` against this baseline

---

## Appendix: Pages Analyzed

| URL | Words | Schema types (page-specific) | Issues |
|---|---|---|---|
| / | 969 | Organization, LocalBusiness, WebSite, Person | 2 (no FAQ, generic copy) |
| /tentang/ | 374 | + BreadcrumbList | 3 (no H2, thin, no proof) |
| /tentang/tim-kita/ | 587 | + BreadcrumbList | 2 (credentials thin) |
| /tentang/karir/ | 508 | + BreadcrumbList | 1 |
| /layanan/sistem-tenaga-surya-epc/ | 610 | + Service | 2 (no FAQ, few H2) |
| /layanan/epc/segmen-ci/ | 631 | + Service | 2 (1 H2, no FAQ) |
| /produk/.../panel-tkdn/ | 488 | + Product, Offer, Brand | 3 (no H2, no FAQ, thin) |
| /produk/energi-biomassa/pelet-kayu/ | 633 | + Product, Offer, Brand | 3 (no H2, no FAQ, no specs table) |
| /pintar/ | 507 | + BreadcrumbList | 2 (no H2, no proof) |
| /kontak/ | 397 | + BreadcrumbList | 0 |
| /berita/estimasi-capex-plts-100-kwp-... | 1667 | + BlogPosting | 3 (sources, dateModified, no FAQ) |
| /berita/checklist-pengadaan-mounting-rel-... | 1439 | + BlogPosting | 3 |
| /berita/mengenal-inverter-huawei-... | 1534 | + BlogPosting | 3 |
| /berita/apa-itu-sonushub-... | 907 | + BlogPosting | 3 |
| /berita/cara-menghitung-efisiensi-panel-surya-... | 1229 | + BlogPosting | 3 (HowTo candidate) |

Not individually fetched: the other 75 sitemap URLs (about 30 more articles, pagination pages `/berita/2`-`/berita/7`, remaining service and product pages). Findings on article structure are extrapolated from the 5 articles sampled. No fetch failures occurred.
