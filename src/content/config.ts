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
        title: z.string(),
        releaseDate: z.date().optional(),
        madeTheShelf: z.boolean(),
        shelfStatus: z.enum(['owned', 'not-owned', 'digital-only']),
        score: z.number().optional(),
        mediaType: z.enum(['music', 'game', 'film', 'book']),
        subtype: z.string().optional(),
        developer: z.union([z.string(), z.array(z.string())]).optional(),
        director: z.union([z.string(), z.array(z.string())]).optional(),
        artist: z.union([z.string(), z.array(z.string())]).optional(),
        author: z.union([z.string(), z.array(z.string())]).optional(),
        genre: z.union([z.string(), z.array(z.string())]).optional(),
        coverImage: z.string().optional(),
        spineImage: z.string().optional(),
      })
    ),
  }),
});

export const collections = { reviews: reviews };
