export const HAVE_IT_STATUSES = new Set(['shelved', 'pending', 'chopping-block']);
export const NOT_HAVE_IT_STATUSES = new Set(['wishlist', 'pass']);
export const SCORE_REQUIRED_STATUSES = new Set(['shelved', 'chopping-block']);

export function deriveEventLabel({
  score,
  status,
  priorOwned,
}: {
  score?: number;
  status?: string;
  priorOwned: boolean;
}): string {
  if (score !== undefined) return 'verdict';
  if (status && HAVE_IT_STATUSES.has(status)) return 'acquired';
  if (status && NOT_HAVE_IT_STATUSES.has(status)) {
    if (priorOwned) return 'let go';
    return status === 'wishlist' ? 'wanted' : 'passed';
  }
  return 'note';
}
