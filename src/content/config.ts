import { defineCollection, z } from 'astro:content';

/**
 * Content schema for solar-nusantara.id.
 *
 * Tightened on 2026-09-15 ahead of a planned ~1000-article build-out. The
 * guiding rule: anything the article template or the structured-data helper
 * *assumes* is present must be `required` here, so a bad article fails at
 * build time on the author's machine rather than shipping a broken page.
 *
 * Before this, `description` and `pubDate` were both `.optional()` while
 * src/pages/berita/[...slug].astro called `post.data.pubDate.toLocaleDateString()`
 * unconditionally. One dateless article would have taken down the whole build
 * with a null dereference, and an empty description shipped an empty
 * <meta name="description"> - six of the eighteen articles had exactly that.
 *
 * Lengths are not arbitrary:
 *   description 70..160  - under 70 Google usually rewrites the snippet from
 *                          page text; over 160 it truncates. Measured across
 *                          the existing 18 articles before setting the bounds
 *                          (they now run 118..155), so nothing is grandfathered.
 *   seoTitle    ..60     - the <title> is truncated around 60 characters in the
 *                          SERP. The on-page <h1> can and should stay longer and
 *                          more descriptive, so the two are separate fields
 *                          rather than one compromise string.
 *
 * NOTE: `slug` must never be added to this schema. Astro reserves it for entry
 * slug generation and throws `content-schema-contains-slug` if a collection
 * schema declares it. To override a URL, set `slug:` in the article frontmatter
 * - the schema simply must not describe it.
 */
const beritaCollection = defineCollection({
  schema: ({ image }) =>
    z
      .object({
        /** Full headline. Renders as the <h1> and as the schema.org headline. */
        title: z.string().min(1).max(110),

        /**
         * Optional short title for the <title> tag and og:title only.
         * Falls back to `title` when absent. Set this whenever `title` runs
         * past ~60 characters.
         */
        seoTitle: z.string().max(60).optional(),

        /**
         * Meta description. An empty one is worse than none.
         *
         * The 70-160 bound is enforced in the superRefine below rather than
         * here, because it applies only to articles that are actually going to
         * be published. A `draft: true` article is allowed to be incomplete -
         * that is what makes it a draft - but the moment the flag comes off it
         * has to satisfy the same rules as everything else.
         */
        description: z.string().default(''),

        /** Comma-free primary target query, used for the cannibalisation map. */
        focusKeyphrase: z.string().max(80).optional(),

        author: z.string().optional(),
        authorUrl: z.string().url().optional(),

        /** Required - the article template and BlogPosting both dereference it. */
        pubDate: z.coerce.date(),

        /**
         * Set this when an article is materially revised. buildArticleSchema
         * falls back to pubDate rather than "now", so leaving it unset keeps
         * dateModified honest instead of claiming a fresh edit on every build.
         */
        updatedDate: z.coerce.date().optional(),

        heroImage: image().optional(),
        heroImageAlt: z.string().max(180).optional(),

        /** Topic tags. Drive the related-articles block and tag hub pages. */
        tags: z.array(z.string().min(2).max(40)).max(8).optional(),

        /** Excluded from getPublished(), the sitemap and all listings. */
        draft: z.boolean().default(false),
      })
      // Publish-readiness rules. Skipped entirely for drafts, enforced without
      // exception for anything that will actually be built into a page.
      // Minimum lengths live here, not on the field declarations above: base
      // validation runs BEFORE superRefine, so a `.min()` on the field would
      // reject a half-filled draft before the draft exemption was ever reached.
      .superRefine((d, ctx) => {
        if (d.draft) return;

        const tooShort = (field, value, min) => {
          if (value !== undefined && value.length > 0 && value.length < min) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field],
              message: `${field} is ${value.length} characters; it must be at least ${min}.`,
            });
          }
        };
        tooShort('title', d.title, 10);
        tooShort('seoTitle', d.seoTitle, 10);
        tooShort('focusKeyphrase', d.focusKeyphrase, 3);
        tooShort('heroImageAlt', d.heroImageAlt, 10);

        if (d.description.length < 70 || d.description.length > 160) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['description'],
            message:
              `description is ${d.description.length} characters; it must be 70-160. ` +
              'Under 70 Google usually rewrites the snippet from page text, over 160 it truncates.',
          });
        }

        // No hero, no live article: it is the thumbnail in listings, the og:image
        // and the first thing a reader sees. Drafts are exempt (returned above),
        // so a draft can be written first and given its hero before it goes out.
        if (!d.heroImage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['heroImage'],
            message: 'heroImage is required for a published article. Add the image, or keep the article `draft: true`.',
          });
        }

        // An image with no alt is an accessibility defect and an Ahrefs/Semrush
        // audit failure.
        if (d.heroImage && !d.heroImageAlt) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['heroImageAlt'],
            message:
              'heroImageAlt is required when heroImage is set. Describe what the image shows, not the article title.',
          });
        }
      }),
});

const simplePageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const layananCollection = defineCollection({ schema: simplePageSchema });
const produkCollection = defineCollection({ schema: simplePageSchema });
const tentangCollection = defineCollection({ schema: simplePageSchema });

export const collections = {
  berita: beritaCollection,
  layanan: layananCollection,
  produk: produkCollection,
  tentang: tentangCollection,
};
