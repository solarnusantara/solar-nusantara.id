import { defineCollection, z } from 'astro:content';

const beritaCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
  }),
});

export const collections = {
  'berita': beritaCollection,
};
