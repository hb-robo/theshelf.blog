import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    published: z.boolean(),
    heroImage: z.string().optional(),
    excerpt: z.string().optional(),
    media: z.array(
      z.object({
        id: z.string(),
        status: z.enum(['shelved', 'wishlist', 'pending', 'chopping-block', 'pass']).optional(),
        score: z.number().optional(),
      })
    ),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    mediaId: z.string(),
    date: z.date(),
    source: z.enum(['site', 'rym', 'letterboxd', 'goodreads', 'glitchwave', 'backloggd']).default('site'),
    sourceUrl: z.string().url().optional(),
    score: z.number().min(1).max(10).optional(),
    status: z.enum(['shelved', 'wishlist', 'pending', 'chopping-block', 'pass']).optional(),
    published: z.boolean().default(false),
  }),
});

export const collections = { reviews, events };
