import type { ExpandedMediaItem, PriorityCreatives } from './types.ts';

export const mediaColors: Record<string, string> = {
  music: 'bg-blue-50',
  game: 'bg-red-50',
  film: 'bg-slate-100',
  book: 'bg-emerald-50',
};

export function getMediaTypeBorder(type: string): string {
  switch (type) {
    case "music": return 'border-blue-400';
    case "game": return 'border-red-400';
    case "film": return 'border-slate-400';
    case "book": return 'border-emerald-400';
  }
  return "";
}


export function getScoreColor(score: number): string {
  if (score === 10) return 'bg-blue-500 text-white';
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


export function generateExcerpt(shelvedCount: number, missedCount: number) {
  let excerpt = "Read the full review to see why ";
  if (shelvedCount === 1 && missedCount === 0) {
    excerpt += "this work earned its place on the shelf.";
  } else if (shelvedCount > 1 && missedCount === 0) {
    excerpt += "these works earned their place on the shelf.";
  } else if (shelvedCount === 0 && missedCount === 1) {
    excerpt += "this work didn't make the cut.";
  } else if (shelvedCount === 0 && missedCount > 1) {
    excerpt += "these works didn't make the cut.";
  } else if (shelvedCount === 1 && missedCount === 1) {
    excerpt += "one made the shelf and not the other.";
  } else if (shelvedCount > 1 && missedCount === 1) {
    excerpt += "they all made the shelf except one.";
  } else if (shelvedCount === 1 && missedCount > 1) {
    excerpt += "only one made the shelf.";
  } else if (shelvedCount > 1 && missedCount > 1) {
    excerpt += "some made the shelf and others didn't.";
  }
  return excerpt;
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
  let prefix = '';
  if (role === 'director') prefix = role.substring(0, 3) + '.';
  const namesList = names.length < 3 ? names.join(', ') : `${names[0]} et al.`;
  return `${prefix} ${namesList}`;
}

