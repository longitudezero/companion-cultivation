// Shared filter for emitted Influences and tagged Environmental Adjacency.
export function isBlocked(blocker, effect) {
  if (!blocker) return false;
  if (blocker.rule === 'full') return true;
  if (blocker.rule === 'kind') return blocker.value === effect.kind;
  if (blocker.rule === 'mode') return blocker.value === effect.mode;
  return false;
}
