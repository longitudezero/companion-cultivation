import { SOURCE_ITEMS } from '../core/source-item-catalog.js';
import { blockerArt } from './blocker-art.js';
import { organismIcon } from './organism-art.js';

export function sourceItemArt(catalogId) {
  if (!Object.hasOwn(SOURCE_ITEMS, catalogId)) return undefined;
  return `${import.meta.env?.BASE_URL || '/'}ui/source-items/${catalogId}.webp`;
}

export function itemArt(item) {
  if (item?.type === 'source-item') return sourceItemArt(item.catalogId);
  if (item?.type === 'blocker-item') return blockerArt(item);
  return item?.species ? organismIcon(item.species) : undefined;
}
