export type Creative = {
  name: string;
  role: string;
}

export type PriorityCreatives = {
  role: string;
  names: string[];
}

export type MediaItem = {
  id: string;
  title: string;
  releaseDate: string;
  shelfStatus: 'owned' | 'not-owned' | 'digital-only';
  mediaType: 'book' | 'music' | 'game' | 'film';
  subtype?: string;
  creatives: Creative[];
  genre?: string[];
  coverImage?: string;
  spineImage?: string;
};

export type ExpandedMediaItem = MediaItem & {
  score?: number | null;
  result?: 'shelved' | 'deferred' | 'passed' | null;
  articleSlug?: string | null;
  reviewDate?: Date | null;
  published?: boolean | null;
};
