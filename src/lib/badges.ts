// src/lib/badges.ts

/**
 * Returns Tailwind classes for media type badges
 */
export function getMediaTypeBadge(type: string): string {
  const badges: Record<string, string> = {
    music: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    game: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    film: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    book: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  };
  
  return badges[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
}

/**
 * Returns Tailwind classes for score badges based on numeric value
 */
export function getScoreBadge(score: number): string {
  if (score == 10) return 'bg-blue-500 text-white';
  if (score >= 9) return 'bg-sky-500 text-white';
  if (score >= 8) return 'bg-teal-500 text-white';
  if (score >= 7) return 'bg-green-500 text-white';
  if (score >= 6) return 'bg-lime-500 text-white';
  if (score >= 5) return 'bg-yellow-500 text-white';
  if (score >= 4) return 'bg-orange-400 text-white';
  if (score >= 3) return 'bg-red-500 text-white';
  if (score >= 2) return 'bg-red-600 text-white';
  if (score >= 1) return 'bg-red-800 text-white';
  return 'bg-black text-white';
}

/**
 * Returns a descriptive label for score ranges
 */
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

/**
 * Formats media type for display (capitalizes)
 */
export function formatMediaType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Generates a default excerpt in the event an article doesn't have one
 */
export function generateExcerpt(madeCount: number, missedCount: number) {
  // Generate default excerpt if none provided
  var defaultExcerpt = "Read the full review to see why ";
  if (madeCount == 1 && missedCount == 0) {
    defaultExcerpt = defaultExcerpt.concat("this work earned its place on the shelf.");
  }
  else if (madeCount > 1 && missedCount == 0) {
    defaultExcerpt = defaultExcerpt.concat("these works earned their place on the shelf.");
  }
  else if (madeCount == 0 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("this work didn\'t make the cut.");
  }
  else if (madeCount == 0 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("these works didn\'t make the cut.");
  }
  else if (madeCount == 1 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("one made the shelf and not the other.");
  }
  else if (madeCount > 1 && missedCount == 1) {
    defaultExcerpt = defaultExcerpt.concat("they all made the shelf except one.");
  }
  else if (madeCount == 1 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("only one made the shelf.");
  }
  else if (madeCount > 1 && missedCount > 1) {
    defaultExcerpt = defaultExcerpt.concat("some made the shelf and others didn't.");
  }
  return defaultExcerpt;
}