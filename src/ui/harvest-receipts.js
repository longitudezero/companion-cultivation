import { inventoryItems } from '../core/inventory.js';

export function harvestItems(before, after) {
  const stock = new Map(inventoryItems(before.inventory).map(item => [item.id, item.quantity]));
  return inventoryItems(after.inventory).filter(item => item.type !== 'source-item')
    .map(item => ({ ...item, quantity: item.quantity - (stock.get(item.id) || 0) })).filter(item => item.quantity > 0);
}

export function mergeHarvestReceipt(previous, items, now, id) {
  const merged = new Map((previous?.until > now ? previous.items : []).map(item => [item.id, { ...item }]));
  for (const item of items) merged.set(item.id, { ...item, quantity: item.quantity + (merged.get(item.id)?.quantity || 0) });
  return { id, until: now + 4000, items: [...merged.values()] };
}
