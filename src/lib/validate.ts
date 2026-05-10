import type { ExpandedMediaItem } from './types.ts';
import type { CollectionEntry } from 'astro:content';

const SCORE_REQUIRED_STATUSES = new Set(['shelved', 'chopping-block']);
const HAVE_IT_STATUSES = new Set(['shelved', 'pending', 'chopping-block']);
const NOT_HAVE_IT_STATUSES = new Set(['wishlist', 'pass']);

export function validateEvents(allEvents: CollectionEntry<'events'>[]): void {
  const violations: string[] = [];

  for (const e of allEvents) {
    const { mediaId, eventType, status, score } = e.data;
    const ref = `  ${mediaId} (${e.id})`;

    if (eventType === 'verdict' && !status && !score) {
      violations.push(`${ref}: verdict with no status or score`);
    }

    if (eventType === 'acquisition' && status && !HAVE_IT_STATUSES.has(status)) {
      violations.push(`${ref}: acquisition ends in non-ownership status "${status}"`);
    }

    if (eventType === 'disposition' && status && !NOT_HAVE_IT_STATUSES.has(status)) {
      violations.push(`${ref}: disposition ends in ownership status "${status}"`);
    }
  }

  if (violations.length > 0) {
    console.warn(`\n⚠  event validation — ${violations.length} violation${violations.length === 1 ? '' : 's'}:\n${violations.join('\n')}\n`);
  }
}

export function validateMediaItems(
  items: ExpandedMediaItem[],
  _allEvents: CollectionEntry<'events'>[],
): void {
  const violations: string[] = [];

  for (const item of items) {
    const { id, status, score, articleSlug } = item;

    const VERDICT_STATUSES = new Set(['shelved', 'wishlist', 'chopping-block', 'pass']);
    if (articleSlug && (!status || !VERDICT_STATUSES.has(status))) {
      violations.push(`  ${id}: has a review but no verdict status (currently: ${status ?? 'none'})`);
    }

    if (status && SCORE_REQUIRED_STATUSES.has(status) && !score) {
      violations.push(`  ${id}: "${status}" but no score`);
    }
  }

  if (violations.length > 0) {
    console.warn(`\n⚠  media validation — ${violations.length} violation${violations.length === 1 ? '' : 's'}:\n${violations.join('\n')}\n`);
  }
}
