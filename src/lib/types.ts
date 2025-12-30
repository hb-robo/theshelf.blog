// src/utils/types.ts

import type { Media } from 'astro:db';

export type Creative = {
	name: string;
	role: string;
}

export type PriorityCreatives = {
  role: string;
  names: string[];
}

type MediaJsonFields = {
    creatives: Creative[] | null;
    genre: string[] | null;
};

export type MediaItemRawDB = typeof Media.$inferSelect;
type MediaItemFromDB = Omit<MediaItemRawDB, 'creatives' | 'genre'> & MediaJsonFields;


export type ExpandedMediaItem = MediaItemFromDB & {
  score?: number | null | undefined;
  madeTheShelf?: boolean | null | undefined;
  result?: 'made-the-shelf' | 'maybe-later' | 'no' | null | undefined;
  articleSlug?: string | null | undefined;
  reviewDate?: Date | null | undefined;
  published?: boolean | null | undefined;
};
