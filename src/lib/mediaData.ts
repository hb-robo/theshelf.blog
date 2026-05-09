import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import type { MediaItem } from './types.ts';

let _cache: MediaItem[] | null = null;

export function getAllMediaItems(): MediaItem[] {
  if (_cache) return _cache;
  const filePath = path.join(process.cwd(), 'src/data/media.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const raw = yaml.load(fileContents) as MediaItem[];
  _cache = raw.map(item => ({
    ...item,
    releaseDate: (item.releaseDate as unknown) instanceof Date
      ? (item.releaseDate as unknown as Date).toISOString().split('T')[0]
      : item.releaseDate,
  }));
  return _cache;
}

export function getMediaItemById(id: string): MediaItem | null {
  return getAllMediaItems().find(m => m.id === id) ?? null;
}

export function getMediaTitle(id: string): string | null {
  return getMediaItemById(id)?.title ?? null;
}

export function getMediaCoverImage(id: string): string | null {
  return getMediaItemById(id)?.coverImage ?? null;
}
