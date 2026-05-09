import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews');
  const published = reviews
    .filter((r: CollectionEntry<'reviews'>) => r.data.published)
    .sort((a: CollectionEntry<'reviews'>, b: CollectionEntry<'reviews'>) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  const site = context.site?.toString().replace(/\/$/, '') ?? '';

  const items = published.map((review: CollectionEntry<'reviews'>) => {
    const pubDate = new Date(review.data.date).toUTCString();
    const link = `${site}/reviews/${review.id}`;
    const description = review.data.excerpt ? `<![CDATA[${review.data.excerpt}]]>` : '';
    return `
    <item>
      <title><![CDATA[${review.data.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>brownhayden10@gmail.com (Hayden Brown)</author>
      ${description ? `<description>${description}</description>` : ''}
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Made the Shelf</title>
    <description>Media criticism with a physical constraint</description>
    <link>${site}</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
