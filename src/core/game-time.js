// Approved Companion Cultivation pace: one simulated garden hour advances
// every five real seconds while the page is running. Biology and saves keep
// their existing game-hour units; this formatter is for player-facing text.
export const REAL_MILLISECONDS_PER_GAME_HOUR = 5000;

export function formatRealDuration(gameHours) {
  if (!Number.isFinite(gameHours) || gameHours < 0) return '—';
  const seconds = Math.round(gameHours * REAL_MILLISECONDS_PER_GAME_HOUR / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes && remainder) return `${minutes}m ${remainder}s`;
  return minutes ? `${minutes}m` : `${remainder}s`;
}
