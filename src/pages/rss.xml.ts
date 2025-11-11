// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const reviews = await getCollection('reviews');
  return rss({
    title: 'Made the Shelf',
    description: 'Media criticism with a physical constraint',
    site: context.site,
    items: reviews.map(review => ({
      title: review.data.title,
      pubDate: review.data.date,
      link: `/reviews/${review.slug}/`,
    })),
    stylesheet: '/pretty-feed-v3.xsl',
  });
}