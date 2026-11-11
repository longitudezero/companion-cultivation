import { BLOCKER_ITEMS, playerBlockerDefinition } from './blocker-catalog.js';
import { edgeKey, placeEdgeBlocker, placeObject, removeEdgeBlocker, removeObject } from './grid.js';
import { ensureInventorySlots } from './inventory.js';

export function grantBlockerItem(garden, id, quantity = 1) {
  if (!Object.hasOwn(BLOCKER_ITEMS, id)) throw new Error('Unknown Blocker item.');
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error('Invalid Blocker quantity.');
  const stock = garden.inventory.blockers || {};
  const total = (stock[id] || 0) + quantity;
  if (!Number.isSafeInteger(total)) throw new Error('Blocker stack is too large.');
  return ensureInventorySlots({ ...garden, inventory: { ...garden.inventory, blockers: { ...stock, [id]: total } } });
}

export function placeBlockerItem(garden, id, target) {
  const definition = Object.hasOwn(BLOCKER_ITEMS, id) ? BLOCKER_ITEMS[id] : null;
  const quantity = garden.inventory.blockers?.[id];
  if (!definition || !Number.isSafeInteger(quantity) || quantity < 1) {
    throw new Error('Blocker item is not available in inventory.');
  }
  if (target?.type !== definition.form) {
    throw new Error(definition.form === 'edge' ? 'Choose an empty shared border.' : 'Choose an empty hex.');
  }
  if (target.type === 'edge' && garden.edges[edgeKey(target.a, target.b)]) {
    throw new Error('This border already has a Blocker.');
  }

  const object = { type: 'blocker', blockerId: id };
  const placed = target.type === 'hex' ? placeObject(garden, target.key, object)
    : placeEdgeBlocker(garden, target.a, target.b, object);
  const blockers = { ...placed.inventory.blockers };
  if (quantity === 1) delete blockers[id];
  else blockers[id] = quantity - 1;
  return ensureInventorySlots({ ...placed, inventory: { ...placed.inventory, blockers } });
}

export function pickupBlockerItem(garden, target) {
  const object = target?.type === 'hex' ? garden.objects[target.key]
    : target?.type === 'edge' ? garden.edges[edgeKey(target.a, target.b)] : null;
  const definition = playerBlockerDefinition(object);
  if (!definition || definition.form !== target.type) throw new Error('No placed player Blocker to retrieve.');
  const removed = target.type === 'hex' ? removeObject(garden, target.key)
    : removeEdgeBlocker(garden, target.a, target.b);
  return grantBlockerItem(removed, definition.id);
}
