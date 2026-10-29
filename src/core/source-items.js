import { makeInfluence, makeSource, makeSpreadInfluence } from './influences.js';
import { placeObject, removeObject, updateObject } from './grid.js';
import { ensureInventorySlots } from './inventory.js';
import { SOURCE_ITEMS } from './source-item-catalog.js';

export const isPlayerSource = object => object?.type === 'source' && typeof object.itemId === 'string';
export const validItemId = id => typeof id === 'string' && /^item:[1-9]\d*$/.test(id)
  && Number.isSafeInteger(Number(id.slice(5)));
const validHeading = heading => Number.isInteger(heading) && heading >= 0 && heading < 6;

export function makePlayerSource(itemId, catalogId, remainingHours, heading = 0) {
  const definition = SOURCE_ITEMS[catalogId];
  if (!validItemId(itemId) || !definition || !Number.isSafeInteger(remainingHours)
    || remainingHours < 1 || remainingHours > definition.durationHours || !validHeading(heading)) {
    throw new Error('Invalid Source item instance.');
  }
  const emissions = definition.propertyEffects.map(effect => definition.propagation === 'spread-budget'
    ? makeSpreadInfluence(effect.name, effect.strength, definition.budget, heading)
    : makeInfluence(effect.name, effect.strength, definition.range));
  return { ...makeSource(emissions), itemId, catalogId, remainingHours, heading };
}

export function grantSourceItem(garden, catalogId) {
  const definition = SOURCE_ITEMS[catalogId];
  if (!definition) throw new Error('Unknown Source item.');
  const itemNonce = (garden.itemNonce || 0) + 1;
  if (!Number.isSafeInteger(itemNonce)) throw new Error('Too many Source items.');
  const id = `item:${itemNonce}`;
  const instance = { catalogId, remainingHours: definition.durationHours, heading: 0 };
  return ensureInventorySlots({ ...garden, itemNonce,
    inventory: { ...garden.inventory, sourceItems: { ...garden.inventory.sourceItems, [id]: instance } } });
}

export function placeSourceItem(garden, id, key) {
  const stored = garden.inventory.sourceItems?.[id];
  if (!stored) throw new Error('Source item is not available in inventory.');
  const placed = placeObject(garden, key, makePlayerSource(id, stored.catalogId, stored.remainingHours, stored.heading));
  const sourceItems = { ...placed.inventory.sourceItems };
  delete sourceItems[id];
  const slots = { ...placed.inventorySlots };
  delete slots[id];
  return { ...placed, inventory: { ...placed.inventory, sourceItems }, inventorySlots: slots };
}

export function moveSourceItem(garden, from, to) {
  const object = garden.objects[from];
  if (!isPlayerSource(object)) throw new Error('No placed Source item on that hex.');
  if (from === to) return garden;
  // Place first to validate the destination, then remove the old placement.
  const moved = placeObject(garden, to, object);
  return removeObject(moved, from);
}

export function pickupSourceItem(garden, key) {
  const object = garden.objects[key];
  if (!isPlayerSource(object)) throw new Error('No placed Source item to retrieve.');
  const removed = removeObject(garden, key);
  const sourceItems = { ...removed.inventory.sourceItems, [object.itemId]: {
    catalogId: object.catalogId, remainingHours: object.remainingHours, heading: object.heading,
  } };
  // Throws before any state change reaches the UI if the 200-square inventory is full.
  return ensureInventorySlots({ ...removed, inventory: { ...removed.inventory, sourceItems } });
}

export function rotateSourceItem(garden, key, heading) {
  const object = garden.objects[key];
  if (!isPlayerSource(object)) throw new Error('No placed Source item to rotate.');
  if (SOURCE_ITEMS[object.catalogId]?.propagation !== 'spread-budget') throw new Error('This item has no direction.');
  if (!validHeading(heading)) throw new Error('Choose one of six directions.');
  if (heading === object.heading) return garden;
  return updateObject(garden, key, makePlayerSource(object.itemId, object.catalogId, object.remainingHours, heading));
}

// Consume exactly one game hour per active placed item; inventory time is frozen.
// The environmental contribution is earned during this hour, then expires.
export function tickSourceItems(garden) {
  let changed = false;
  const objects = { ...garden.objects };
  const events = [];
  for (const [key, object] of Object.entries(objects)) {
    if (!isPlayerSource(object)) continue;
    changed = true;
    if (object.remainingHours <= 1) {
      delete objects[key];
      events.push(`${SOURCE_ITEMS[object.catalogId].name} expired on hex ${key}.`);
    } else objects[key] = { ...object, remainingHours: object.remainingHours - 1 };
  }
  if (!changed) return { garden, events };
  return { garden: { ...garden, objects, routeNonce: garden.routeNonce + (events.length ? 1 : 0) }, events };
}
