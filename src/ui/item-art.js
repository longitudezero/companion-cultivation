import { SOURCE_ITEMS } from '../core/source-item-catalog.js';
import { blockerArt } from './blocker-art.js';
import { organismIcon } from './organism-art.js';

export function itemArt(item) {
  if (item?.type === 'source-item' && Object.hasOwn(SOURCE_ITEMS, item.catalogId)) {
    return `${import.meta.env?.BASE_URL || '/'}ui/source-items/${item.catalogId}.webp`;
  }
  if (item?.type === 'blocker-item') return blockerArt(item);
  return item?.species ? organismIcon(item.species) : undefined;
}
