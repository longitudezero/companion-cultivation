import { BLOCKER_ITEMS } from '../core/blocker-catalog.js';

export function blockerArt(value) {
  const id = typeof value === 'string' ? value : value?.id || value?.blockerId;
  const item = Object.hasOwn(BLOCKER_ITEMS, id) ? BLOCKER_ITEMS[id] : null;
  if (!item) return undefined;
  const form = item.form === 'hex' ? 'full' : 'edge';
  return `${import.meta.env?.BASE_URL || '/'}ui/blockers/${item.design}-${form}.webp`;
}
