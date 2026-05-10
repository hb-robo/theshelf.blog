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
  mediaType: 'book' | 'music' | 'game' | 'film';
  subtype?: string;
  creatives: Creative[];
  genre?: string[];
  coverImage?: string;
  spineImage?: string;
  // External identity — populated as integrations are added
  mbid?: string;
  tmdbId?: number;
  igdbId?: number;
  rymId?: string;
  letterboxdSlug?: string;
  isbn?: string;
};

export type ExpandedMediaItem = MediaItem & {
  score?: number | null;
  result?: 'shelved' | 'passed' | null;
  shelfStatus?: 'owned' | 'not-owned' | 'digital-only' | null;
  articleSlug?: string | null;
  reviewDate?: Date | null;
  published?: boolean | null;
};
