import { getCollection, type CollectionEntry } from 'astro:content';
import { getAllMediaItems, getMediaItemById } from './mediaData.ts';
import type { ExpandedMediaItem } from './types.ts';

type Result = 'shelved' | 'deferred' | 'passed';
type ShelfStatus = 'owned' | 'not-owned' | 'digital-only';

interface TimelineEntry {
  date: Date;
  score?: number;
  result?: Result;
  shelfStatus?: ShelfStatus;
  published: boolean;
  articleSlug?: string;
}

function deriveState(timeline: TimelineEntry[]) {
  let score: number | undefined;
  let result: Result | undefined;
  let shelfStatus: ShelfStatus | undefined;
  let published = false;
  let articleSlug: string | undefined;
  let reviewDate: Date | undefined;

  for (const entry of timeline) {
    if (entry.score !== undefined) score = entry.score;
    if (entry.result !== undefined) result = entry.result;
    if (entry.shelfStatus !== undefined) shelfStatus = entry.shelfStatus;
    if (entry.published) {
      published = true;
      if (entry.articleSlug) {
        articleSlug = entry.articleSlug;
        reviewDate = entry.date;
      }
    }
  }

  return { score: score ?? null, result: result ?? null, shelfStatus: shelfStatus ?? null, published, articleSlug: articleSlug ?? null, reviewDate: reviewDate ?? null };
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
      result: e.data.result,
      shelfStatus: e.data.shelfStatus,
      published: e.data.published,
    }));

  const fromReviews: TimelineEntry[] = allReviews.flatMap(r =>
    r.data.media
      .filter(m => m.id === mediaId)
      .map(m => ({
        date: r.data.date,
        score: m.score,
        result: m.result,
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

  return mediaItems.map(mediaItem => {
    const timeline = buildTimeline(mediaItem.id, allEvents, allReviews);
    const derived = deriveState(timeline);
    return { ...mediaItem, ...derived } as ExpandedMediaItem;
  });
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
          result: m.result,
          articleSlug: r.id,
          reviewDate: r.data.date,
          published: r.data.published,
        }))
    )
    .sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());

  return appearances[0] ?? null;
}
