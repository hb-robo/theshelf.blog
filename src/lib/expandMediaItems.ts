import { getCollection } from 'astro:content';
import { db, Media } from 'astro:db';
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
    .flatMap(reviewEntry => {
      return reviewEntry.data.media.map((item: any) => ({
        ...item,
        published: reviewEntry.data.published,
        reviewDate: reviewEntry.data.date,
        articleSlug: reviewEntry.slug
      }));
    })
    .filter(item => item.id === mediaId);
  
  

  allReviewMediaItems.sort((a, b) => b.reviewDate.getTime() - a.reviewDate.getTime());

  if (allReviewMediaItems.length > 0) {
    // Return the properties defined in the interface
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
  const mediaItemsFromDb = await db.select().from(Media);

  // Map over the DB items and await the review details for each
  const expandedListPromises = mediaItemsFromDb.map(async (mediaItem) => {
    const reviewDetails = await getMostRecentReviewForMedia(mediaItem.id);

    // Combine the database item with the review details
    return {
      ...mediaItem,
      ...reviewDetails
    };
  });

  const expandedList = await Promise.all(expandedListPromises);
  
  return expandedList;
}
