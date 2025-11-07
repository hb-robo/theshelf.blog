// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    score: z.number().min(1).max(10),
    mediaType: z.enum(['music', 'game', 'film', 'book']),
    onShelf: z.boolean(),
    
    // Optional fields
    artist: z.union([z.string(), z.array(z.string())]).optional(),      // For music
    developer: z.union([z.string(), z.array(z.string())]).optional(),   // For games
    director: z.union([z.string(), z.array(z.string())]).optional(),    // For films
    author: z.union([z.string(), z.array(z.string())]).optional(),      // For books
    
    platform: z.string().optional(),    // e.g., "PS5", "Switch", "PC"
    genre: z.string().optional(),       // e.g., "RPG", "Alternative", "Drama"
    
    excerpt: z.string().optional(),     // Short description for cards/lists
    coverImage: z.string().optional(),  // Path to cover art
    spineImage: z.string().optional(),  // Path to spine image for shelf view
  }),
});

export const collections = {
  reviews: reviewsCollection,
};