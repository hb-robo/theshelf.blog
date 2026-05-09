import { getCollection, type CollectionEntry } from 'astro:content';
import { getAllMediaItems } from './mediaData.ts';
import type { ExpandedMediaItem } from './types.ts';

interface ReviewMediaItemFlat {
  id: string;
  score?: number | null;
  madeTheShelf?: boolean | null;
  result?: 'made-the-shelf' | 'maybe-later' | 'no';
  published?: boolean;
  reviewDate: Date;
  articleSlug: string;
}

export async function getMostRecentReviewForMedia(mediaId: string) {
  const allReviews = await getCollection('reviews');

  const allReviewMediaItems: ReviewMediaItemFlat[] = allReviews
    .flatMap((reviewEntry: CollectionEntry<'reviews'>) => {
      return reviewEntry.data.media.map((item: ReviewMediaItemFlat) => ({
        ...item,
        published: reviewEntry.data.published,
        reviewDate: reviewEntry.data.date,
        articleSlug: reviewEntry.id,
      }));
    })
    .filter(item => item.id === mediaId);

  allReviewMediaItems.sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());

  if (allReviewMediaItems.length > 0) {
    const mostRecent = allReviewMediaItems[0];
    return {
      score: mostRecent.score,
      madeTheShelf: mostRecent.madeTheShelf,
      result: mostRecent.result,
      articleSlug: mostRecent.articleSlug,
      reviewDate: mostRecent.reviewDate,
      published: mostRecent.published,
    };
  }

  return null;
}

export async function getExpandedMediaList(): Promise<ExpandedMediaItem[]> {
  const mediaItems = getAllMediaItems();

  const expandedListPromises = mediaItems.map(async (mediaItem) => {
    const reviewDetails = await getMostRecentReviewForMedia(mediaItem.id);
    return { ...mediaItem, ...reviewDetails } as ExpandedMediaItem;
  });

  return Promise.all(expandedListPromises);
}
