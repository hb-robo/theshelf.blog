import { getMediaItemById } from './mediaData.ts';
import type { ExpandedMediaItem, PriorityCreatives } from './types.ts';
import { getMostRecentReviewForMedia } from './expandMediaItems.ts';

export const mediaColors: Record<string, string> = {
  music: 'bg-blue-50 dark:bg-blue-900',
  game: 'bg-red-50 dark:bg-red-900',
  film: 'bg-slate-200 dark:bg-slate-900',
  book: 'bg-emerald-50 dark:bg-emerald-900',
};

export function getMediaTypeBorder(type: string): string {
  switch (type) {
    case "music": return 'border-blue-400 dark:border-blue-400';
    case "game": return 'border-red-400 dark:border-red-400';
    case "film": return 'border-slate-400 dark:border-slate-400';
    case "book": return 'border-emerald-400 dark:border-emerald-400';
  }
  return "";
}

export function getMediaTypeBadge(type: string): string {
  const badges: Record<string, string> = {
    music: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    game: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    film: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100',
    book: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  };
  return badges[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
}

export function getScoreColor(score: number): string {
  if (score == 10) return 'bg-blue-500 text-white';
  if (score >= 9) return 'bg-sky-500 text-white';
  if (score >= 8) return 'bg-teal-500 text-white';
  if (score >= 7) return 'bg-emerald-500 text-white';
  if (score >= 6) return 'bg-lime-500 text-white';
  if (score >= 5) return 'bg-yellow-500 text-white';
  if (score >= 4) return 'bg-orange-400 text-white';
  if (score >= 3) return 'bg-red-500 text-white';
  if (score >= 2) return 'bg-red-600 text-white';
  if (score >= 1) return 'bg-red-800 text-white';
  return 'bg-black text-white';
}

export function getScoreLabel(score: number): string {
  if (score == 10) return 'Masterwork';
  if (score >= 9) return 'Exceptional';
  if (score >= 8) return 'Excellent';
  if (score >= 7) return 'Good';
  if (score >= 6) return 'Decent';
  if (score >= 5) return 'Mediocre';
  if (score >= 4) return 'Below Average';
  if (score >= 3) return 'Deeply Flawed';
  if (score >= 2) return 'Horrible';
  if (score >= 1) return 'Irredeemable';
  return 'No Score';
}

export function formatMediaType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function generateExcerpt(madeCount: number, missedCount: number) {
  var defaultExcerpt = "Read the full review to see why ";
  if (madeCount == 1 && missedCount == 0) {
    defaultExcerpt = defaultExcerpt.concat("this work earned its place on the shelf.");
  } else if (madeCount > 1 && missedCount == 0) {
    defaultExcerpt = defaultExcerpt.concat("these works earned their place on the shelf.");
  } else if (madeCount == 0 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("this work didn\'t make the cut.");
  } else if (madeCount == 0 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("these works didn\'t make the cut.");
  } else if (madeCount == 1 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("one made the shelf and not the other.");
  } else if (madeCount > 1 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("they all made the shelf except one.");
  } else if (madeCount == 1 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("only one made the shelf.");
  } else if (madeCount > 1 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("some made the shelf and others didn't.");
  }
  return defaultExcerpt;
}

interface OrganizedCreatives {
  [role: string]: string[];
}

export function organizeCreatives(item: ExpandedMediaItem): OrganizedCreatives {
  const organized: OrganizedCreatives = {};
  if (!item.creatives || item.creatives.length === 0) return organized;
  for (const creative of item.creatives) {
    const role = creative.role;
    if (!organized[role]) organized[role] = [];
    organized[role].push(creative.name);
  }
  return organized;
}

export function getPriorityCreatives(item: ExpandedMediaItem): PriorityCreatives | null {
  if (!item.creatives || item.creatives.length === 0) return null;
  let priorityRole = item.creatives[0].role;
  let priorityCreatives: string[] = [];
  for (const creative of item.creatives) {
    if (creative.role === priorityRole) priorityCreatives.push(creative.name);
  }
  return { role: priorityRole, names: priorityCreatives };
}

export function formatCreativeLine(role: string | undefined, names: string[] | undefined): string {
  if (role === "" || role === undefined || names === undefined) return "";
  let prefix = 'by';
  if (role == 'director' || role == 'developer') {
    prefix = role.substring(0, 3) + '.';
  }
  const namesList = names.length < 3 ? names.join(', ') : `${names[0]} et al.`;
  return `${prefix} ${namesList}`;
}

export async function getMediaById(mediaId: string) {
  return getMediaItemById(mediaId);
}

export async function getExpandedMediaById(mediaId: string): Promise<ExpandedMediaItem | null> {
  const mediaItem = getMediaItemById(mediaId);
  if (!mediaItem) return null;
  const reviewDetails = await getMostRecentReviewForMedia(mediaItem.id);
  return { ...mediaItem, ...reviewDetails } as ExpandedMediaItem;
}

export async function getMediaCoverImage(mediaId: string): Promise<string | null> {
  return getMediaItemById(mediaId)?.coverImage ?? null;
}

export async function getMediaTitle(mediaId: string): Promise<string | null> {
  return getMediaItemById(mediaId)?.title ?? null;
}
