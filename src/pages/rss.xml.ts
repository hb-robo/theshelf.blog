// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews');
  return rss({
    title: 'Made the Shelf',
    description: 'Media criticism with a physical constraint',
    site: context.site!,
    trailingSlash: false,
    items: reviews.map((review: CollectionEntry<'reviews'>) => ({
      title: review.data.title,
      pubDate: review.data.date,
      link: `/reviews/${review.id}/`,
      description: review.data.excerpt,
      author: "Hayden Brown"
    })),
    customData: '<language>en-us</language>',
  });
}