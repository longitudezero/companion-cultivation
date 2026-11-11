import { playerBlockerDefinition } from './blocker-catalog.js';

// Player filters distinguish environmental properties from cultivation modes.
// Developer blockers continue to match the original Kind and Mode tags.
export function isBlocked(blocker, effect) {
  if (!blocker) return false;
  const item = playerBlockerDefinition(blocker);
  if (item) {
    const filter = effect.property ?? (effect.kind === 'Mycelial' ? 'Mycelial' : effect.mode);
    return item.filters.includes('all') || item.filters.includes(filter);
  }
  if (blocker.rule === 'full') return true;
  if (blocker.rule === 'kind') return blocker.value === effect.kind;
  if (blocker.rule === 'mode') return blocker.value === effect.mode;
  return false;
}
