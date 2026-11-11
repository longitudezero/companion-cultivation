// Arrangement is deliberately separate from authoritative item quantities.
// One item identity occupies at most one of the four 50-square pages.
import { SOURCE_ITEMS } from './source-item-catalog.js';
import { BLOCKER_ITEMS } from './blocker-catalog.js';
export const INVENTORY_PAGE_SLOTS = 50;
export const INVENTORY_PAGES = 4;
export const INVENTORY_CAPACITY = INVENTORY_PAGE_SLOTS * INVENTORY_PAGES;
export const inventoryCapacity = garden => garden.inventoryCapacity ?? INVENTORY_CAPACITY;

export function inventoryItems(inventory = {}) {
  const items = [];
  for (const [type, stock, suffix] of [
    ['seed', inventory.seeds, 'Seeds'], ['spore', inventory.spores, 'Spores'],
    ['leaf', inventory.leaves, 'Leaves'],
  ]) {
    for (const [species, quantity] of Object.entries(stock || {})) {
      if (Number.isSafeInteger(quantity) && quantity > 0) {
        items.push({ id: `${type}:${species}`, type, species, name: `${species} ${suffix}`, quantity });
      }
    }
  }
  if ((inventory.trophies?.bambooSteel || 0) > 0) {
    items.push({ id: 'trophy:bambooSteel', type: 'trophy', name: 'Bamboo Steel', quantity: inventory.trophies.bambooSteel });
  }
  if ((inventory.legacyLeaves || 0) > 0) {
    items.push({ id: 'legacy:leaves', type: 'legacy', name: 'Unattributed legacy Leaves', quantity: inventory.legacyLeaves });
  }
  for (const [id, instance] of Object.entries(inventory.sourceItems || {})) {
    const definition = SOURCE_ITEMS[instance.catalogId];
    if (definition && Number.isSafeInteger(instance.remainingHours) && instance.remainingHours > 0) {
      items.push({ id, type: 'source-item', name: definition.name, quantity: 1,
        catalogId: instance.catalogId, remainingHours: instance.remainingHours });
    }
  }
  for (const [id, quantity] of Object.entries(inventory.blockers || {})) {
    if (Object.hasOwn(BLOCKER_ITEMS, id) && Number.isSafeInteger(quantity) && quantity > 0) {
      const { name, form, filters } = BLOCKER_ITEMS[id];
      items.push({ id, type: 'blocker-item', name, form, filters, quantity });
    }
  }
  return items;
}

export function ensureInventorySlots(garden) {
  const capacity = inventoryCapacity(garden);
  const ids = new Set(inventoryItems(garden.inventory).map(({ id }) => id));
  const occupied = new Set();
  const slots = {};
  for (const [id, index] of Object.entries(garden.inventorySlots || {})) {
    if (!ids.has(id) || !Number.isInteger(index) || index < 0 || index >= capacity || occupied.has(index)) continue;
    slots[id] = index;
    occupied.add(index);
  }
  for (const id of ids) {
    if (slots[id] !== undefined) continue;
    let empty = 0;
    while (occupied.has(empty) && empty < capacity) empty++;
    if (empty === capacity) throw new Error('Inventory is full: no free square for a new item type.');
    slots[id] = empty;
    occupied.add(empty);
  }
  return { ...garden, inventorySlots: slots };
}

export function moveInventoryStack(garden, id, destination) {
  const capacity = inventoryCapacity(garden);
  if (!Number.isInteger(destination) || destination < 0 || destination >= capacity) {
    throw new Error(`Inventory square must be between 1 and ${capacity}.`);
  }
  const ready = ensureInventorySlots(garden);
  if (!(id in ready.inventorySlots)) throw new Error('This item is not in the inventory.');
  const slots = { ...ready.inventorySlots };
  const previous = slots[id];
  const occupant = Object.keys(slots).find((candidate) => slots[candidate] === destination);
  slots[id] = destination;
  if (occupant && occupant !== id) slots[occupant] = previous;
  return { ...ready, inventorySlots: slots };
}

export function discardInventoryStack(garden, id) {
  const item = inventoryItems(garden.inventory).find(candidate => candidate.id === id);
  if (!item) throw new Error('This item is not in the inventory.');
  const inventory = { ...garden.inventory };
  if (item.type === 'legacy') inventory.legacyLeaves = 0;
  else {
    const field = { seed: 'seeds', spore: 'spores', leaf: 'leaves', 'source-item': 'sourceItems',
      'blocker-item': 'blockers', trophy: 'trophies' }[item.type];
    const key = item.species || (item.type === 'trophy' ? 'bambooSteel' : id);
    if (Object.values(garden.staged || {}).some(staged => staged.species === key
      && staged.kind === (item.type === 'seed' ? 'plant' : item.type === 'spore' ? 'fungus' : null))) {
      throw new Error('Remove the staged planting before discarding this stack.');
    }
    inventory[field] = { ...inventory[field] };
    delete inventory[field][key];
  }
  return ensureInventorySlots({ ...garden, inventory });
}
