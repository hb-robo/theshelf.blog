// db/seed.ts
import { db, Media } from 'astro:db';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import type { Creative } from '../src/lib/types.ts';

// Defining types for the enum fields
type ShelfStatus = 'owned' | 'not-owned' | 'digital-only';
type MediaType = 'book' | 'music' | 'game' | 'film';

interface MediaItemFromYaml {
    id: string; 
    title: string; 
    releaseDate: string;
    shelfStatus: ShelfStatus;
    mediaType: MediaType;
	subtype?: string;
	creatives: Creative[];
    genre?: string[];
	coverImage?: string,
    spineImage?: string,
}

export default async function seed() {
  const filePath = path.join(process.cwd(), 'src/data/media.yaml'); 
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const yamlData = yaml.load(fileContents) as MediaItemFromYaml[];

  const mediaItemsForDb = yamlData.map(item => ({
    ...item,
    releaseDate: new Date(item.releaseDate).toLocaleDateString('fr-CA'),
    creatives: item.creatives ?? [], 
    genre: item.genre ?? [],
  }));
  
  await db.insert(Media).values(mediaItemsForDb);
  console.log(`Database seeded with ${mediaItemsForDb.length} media items.`);
}