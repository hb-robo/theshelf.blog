// src/lib/badges.ts

/**
 * Returns Tailwind classes for media type badges
 */
export function getMediaTypeBadge(type: string): string {
  const badges: Record<string, string> = {
    music: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    game: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    film: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    book: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  };
  
  return badges[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
}

/**
 * Returns Tailwind classes for score badges based on numeric value
 */
export function getScoreBadge(score: number): string {
  if (score >= 9) return 'bg-green-600 text-white';
  if (score >= 7) return 'bg-green-500 text-white';
  if (score >= 5) return 'bg-yellow-500 text-white';
  return 'bg-red-500 text-white';
}

/**
 * Returns a descriptive label for score ranges
 */
export function getScoreLabel(score: number): string {
  if (score >= 9) return 'Exceptional';
  if (score >= 8) return 'Excellent';
  if (score >= 7) return 'Good';
  if (score >= 6) return 'Decent';
  if (score >= 5) return 'Mediocre';
  if (score >= 4) return 'Below Average';
  return 'Poor';
}

/**
 * Formats media type for display (capitalizes)
 */
export function formatMediaType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}