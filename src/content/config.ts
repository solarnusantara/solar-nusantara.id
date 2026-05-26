import { defineCollection, z } from 'astro:content';

const beritaCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    authorUrl: z.string().url().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

const simplePageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const layananCollection = defineCollection({
  schema: simplePageSchema,
});

const produkCollection = defineCollection({
  schema: simplePageSchema,
});

const tentangCollection = defineCollection({
  schema: simplePageSchema,
});

export const collections = {
  'berita': beritaCollection,
  'layanan': layananCollection,
  'produk': produkCollection,
  'tentang': tentangCollection,
};
