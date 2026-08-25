import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { execSync } from 'node:child_process';

const MEDIA_YAML_PATH = path.join(process.cwd(), 'src/data/media.yaml'); 

async function seedMedia() {
  console.log('🚀 Reading master media YAML file...');

  if (!fs.existsSync(MEDIA_YAML_PATH)) {
    console.error(`❌ File not found: ${MEDIA_YAML_PATH}`);
    return;
  }

  const fileContent = fs.readFileSync(MEDIA_YAML_PATH, 'utf-8');
  const mediaList = yaml.load(fileContent) as any[];

  if (!Array.isArray(mediaList)) {
    console.error('❌ YAML data is not formatted as an array.');
    return;
  }

  console.log(`📝 Formatting ${mediaList.length} media master records...`);
  
  let sqlStatements: string[] = [];

  for (const item of mediaList) {
    if (!item.id) continue;

    // Standard values with cleanly escaped single quotes for SQLite
    const id = item.id;
    const title = item.title ? item.title.replace(/'/g, "''") : 'Untitled';
    const releaseDate = item.releaseDate ? item.releaseDate.toString().replace(/'/g, "''") : 'NULL';
    const mediaType = item.mediaType || 'unknown';
    const subtype = item.subtype ? `'${item.subtype.replace(/'/g, "''")}'` : 'NULL';
    const coverImage = item.coverImage ? `'${item.coverImage.replace(/'/g, "''")}'` : 'NULL';
    const spineImage = item.spineImage ? `'${item.spineImage.replace(/'/g, "''")}'` : 'NULL';
    
    // Safely double-escape quotes inside JSON text blocks
    const creativesStr = item.creatives ? JSON.stringify(item.creatives).replace(/'/g, "''") : '[]';
    const genreStr = item.genre ? JSON.stringify(item.genre).replace(/'/g, "''") : '[]';

    // Wrap fields properly into individual standalone statements
    sqlStatements.push(
      `INSERT OR REPLACE INTO media_items (id, title, release_date, media_type, subtype, cover_image, spine_image, creatives, genre) VALUES ('${id}', '${title}', '${releaseDate}', '${mediaType}', ${subtype}, ${coverImage}, ${spineImage}, '${creativesStr}', '${genreStr}');`
    );
  }

  console.log('⚡ Pushing records directly into Cloudflare D1 batch transaction...');

  // Write all our clean sql queries directly to a temporary text file
  const tempSqlFile = path.join(process.cwd(), 'temp_seed.sql');
  fs.writeFileSync(tempSqlFile, sqlStatements.join('\n'), 'utf-8');

  try {
    // Tell Wrangler to execute the file itself instead of an inline string command!
    execSync(`npx wrangler d1 execute theshelf-db --remote --file=${tempSqlFile}`);

    console.log('✅ Master Media Items successfully seeded to your production database!');
  } catch (error) {
    console.error('❌ Failed to execute seed file:', error);
  } finally {
    // Delete the temporary file when finished
    if (fs.existsSync(tempSqlFile)) {
      fs.unlinkSync(tempSqlFile);
    }
  }
}

seedMedia().catch(console.error);

