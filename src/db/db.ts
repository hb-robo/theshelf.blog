import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDB(env: any) {
  if (!env?.theshelf_db) {
    throw new Error("Database binding 'theshelf_db' not found in runtime environment.");
  }
  return drizzle(env.theshelf_db, { schema });
}
