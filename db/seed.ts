// db/seed.ts
import { db, Media } from 'astro:db';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

// Defining types for the enum fields
type ShelfStatus = 'owned' | 'not-owned' | 'digital-only';
type MediaType = 'book' | 'album' | 'game' | 'film';

interface MediaItemFromYaml {
    id: string; 
    title: string; 
    releaseDate: string;
    shelfStatus: ShelfStatus;
    mediaType: MediaType;
	subtype?: string;
	developer?: string | string[];
	director?: string | string[];
	author?: string | string[];
    artist?: string | string[];
    genre?: string | string[];
	coverImage?: string,
    spineImage?: string,
}

export default async function seed() {
  const filePath = path.join(process.cwd(), 'src/data/media.yaml'); 
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  const yamlData = yaml.load(fileContents) as MediaItemFromYaml[];

  const mediaItemsForDb = yamlData.map(item => ({
    ...item,
	releaseDate: new Date(item.releaseDate).toLocaleDateString('en-CA'),
    subtype: item.subtype ?? null,
	developer: (item.developer && JSON.stringify(item.developer)) ?? null,
	director: (item.director && JSON.stringify(item.director)) ?? null,
	author: (item.author && JSON.stringify(item.author)) ?? null,
    artist: (item.artist && JSON.stringify(item.artist)) ?? null,
    genre: (item.genre && JSON.stringify(item.genre)) ?? null,
    coverImage: item.coverImage ?? null,
    spineImage: item.spineImage ?? null,
  }));
  
  await db.insert(Media).values(mediaItemsForDb);
  console.log(`Database seeded with ${mediaItemsForDb.length} media items.`);
}
