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
        result: z.enum(['shelved', 'deferred', 'passed']).optional(),
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
    eventType: z.enum(['note', 'acquisition', 'disposition', 'verdict']),
    source: z.enum(['site', 'rym', 'letterboxd', 'goodreads', 'glitchwave', 'backloggd']).default('site'),
    sourceUrl: z.string().url().optional(),
    score: z.number().min(1).max(10).optional(),
    result: z.enum(['shelved', 'deferred', 'passed']).optional(),
    shelfStatus: z.enum(['owned', 'digital-only', 'not-owned']).optional(),
    published: z.boolean().default(false),
  }),
});

export const collections = { reviews, events };
