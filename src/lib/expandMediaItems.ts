import { getCollection, type CollectionEntry } from 'astro:content';
import { getAllMediaItems, getMediaItemById } from './mediaData.ts';
import type { ExpandedMediaItem } from './types.ts';
import { validateMediaItems, validateEvents } from './validate.ts';

type Status = 'shelved' | 'wishlist' | 'pending' | 'chopping-block' | 'pass';

interface TimelineEntry {
  date: Date;
  score?: number;
  status?: Status;
  published: boolean;
  articleSlug?: string;
}

function deriveState(timeline: TimelineEntry[]) {
  let score: number | undefined;
  let status: Status | undefined;
  let published = false;
  let articleSlug: string | undefined;
  let reviewDate: Date | undefined;

  for (const entry of timeline) {
    if (entry.score !== undefined) score = entry.score;
    if (entry.status !== undefined) status = entry.status;
    if (entry.published) {
      published = true;
      if (entry.articleSlug) {
        articleSlug = entry.articleSlug;
        reviewDate = entry.date;
      }
    }
  }

  return { score: score ?? null, status: status ?? null, published, articleSlug: articleSlug ?? null, reviewDate: reviewDate ?? null };
}

function buildTimeline(
  mediaId: string,
  allEvents: CollectionEntry<'events'>[],
  allReviews: CollectionEntry<'reviews'>[],
): TimelineEntry[] {
  const fromEvents: TimelineEntry[] = allEvents
    .filter(e => e.data.mediaId === mediaId)
    .map(e => ({
      date: e.data.date,
      score: e.data.score,
      status: e.data.status,
      published: e.data.published,
    }));

  const fromReviews: TimelineEntry[] = allReviews.flatMap(r =>
    r.data.media
      .filter(m => m.id === mediaId)
      .map(m => ({
        date: r.data.date,
        score: m.score,
        status: m.status,
        published: r.data.published,
        articleSlug: r.id,
      }))
  );

  return [...fromEvents, ...fromReviews].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getExpandedMediaList(): Promise<ExpandedMediaItem[]> {
  const mediaItems = getAllMediaItems();
  const [allEvents, allReviews] = await Promise.all([
    getCollection('events'),
    getCollection('reviews'),
  ]);

  const expanded = mediaItems.map(mediaItem => {
    const timeline = buildTimeline(mediaItem.id, allEvents, allReviews);
    const derived = deriveState(timeline);
    return { ...mediaItem, ...derived } as ExpandedMediaItem;
  });

  validateEvents(allEvents);
  validateMediaItems(expanded, allEvents);
  return expanded;
}

export async function getExpandedMediaById(mediaId: string): Promise<ExpandedMediaItem | null> {
  const mediaItem = getMediaItemById(mediaId);
  if (!mediaItem) return null;

  const [allEvents, allReviews] = await Promise.all([
    getCollection('events'),
    getCollection('reviews'),
  ]);

  const timeline = buildTimeline(mediaId, allEvents, allReviews);
  const derived = deriveState(timeline);
  return { ...mediaItem, ...derived } as ExpandedMediaItem;
}

export async function getMostRecentReviewForMedia(mediaId: string) {
  const allReviews = await getCollection('reviews');
  const appearances = allReviews
    .flatMap(r =>
      r.data.media
        .filter(m => m.id === mediaId)
        .map(m => ({
          score: m.score,
          status: m.status,
          articleSlug: r.id,
          reviewDate: r.data.date,
          published: r.data.published,
        }))
    )
    .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());

  return appearances[0] ?? null;
}
