// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    published: z.boolean(),
    heroImage: z.string().optional(),
    excerpt: z.string().optional(),
    media: z.array(
      z.object({
        id: z.string(),
        result: z.enum(['made-the-shelf', 'maybe-later', 'no']).optional(),
        score: z.number().optional(),
      })
    ),
  }),
});

export const collections = { reviews: reviews };
