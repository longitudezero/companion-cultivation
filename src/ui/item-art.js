import { SOURCE_ITEMS } from '../core/source-item-catalog.js';
import { illustrationFor } from '../grimoire/illustrations.js';

export function itemArt(item) {
  if (item?.type === 'source-item' && Object.hasOwn(SOURCE_ITEMS, item.catalogId)) {
    return `${import.meta.env?.BASE_URL || '/'}ui/source-items/${item.catalogId}.webp`;
  }
  return item?.species ? illustrationFor(item.species)?.src : undefined;
}
