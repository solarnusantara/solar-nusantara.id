import { defineCollection, z } from 'astro:content';

const beritaCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    authorUrl: z.string().url().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = {
  'berita': beritaCollection,
};
