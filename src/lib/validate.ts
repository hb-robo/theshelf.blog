import type { ExpandedMediaItem } from './types.ts';
import type { CollectionEntry } from 'astro:content';
import { SCORE_REQUIRED_STATUSES } from './eventLabel.ts';

const VERDICT_STATUSES = new Set(['shelved', 'wishlist', 'chopping-block', 'pass']);

export function validateEvents(allEvents: CollectionEntry<'events'>[]): void {
  const violations: string[] = [];

  for (const e of allEvents) {
    const { mediaId, status, score } = e.data;
    const ref = `  ${mediaId} (${e.id})`;
    const hasBody = !!e.body?.trim();

    if (!score && !status && !hasBody) {
      violations.push(`${ref}: empty event — no score, status, or body`);
    }

    if (status && SCORE_REQUIRED_STATUSES.has(status) && !score) {
      const priorScore = allEvents.some(
        other => other.data.mediaId === mediaId && other.data.date < e.data.date && other.data.score !== undefined
      );
      if (!priorScore) {
        violations.push(`${ref}: enters "${status}" with no prior score — use "pending" until scored`);
      }
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
