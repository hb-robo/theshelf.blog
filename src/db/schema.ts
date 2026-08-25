import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// 1. MASTER MEDIA ITEMS REGISTRY
export const mediaItems = sqliteTable('media_items', {
  id: text('id').primaryKey(), // e.g., 'fantasma', 'demons-souls'
  title: text('title').notNull(),
  releaseDate: text('release_date'),
  mediaType: text('media_type').notNull(), // 'music', 'game', etc.
  subtype: text('subtype'),                // 'cd', 'ps3', 'ps5'
  coverImage: text('cover_image'),
  spineImage: text('spine_image'),
  // We will store arrays smoothly as JSON text strings
  creatives: text('creatives'),            // [{name: 'Cornelius', role: 'artist'}]
  genre: text('genre'),                    // ['Shibuya-kei']
});

// 2. REVIEWS (Points back to a media item)
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  mediaId: text('media_id').references(() => mediaItems.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  date: text('date').notNull(),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  heroImage: text('hero_image'),
  excerpt: text('excerpt'),
});

// 3. EVENTS (Points back to a media item)
export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  mediaId: text('media_id').references(() => mediaItems.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  source: text('source').notNull().default('site'),
  sourceUrl: text('source_url'),
  score: real('score'),
  status: text('status'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
});

