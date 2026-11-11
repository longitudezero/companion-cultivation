import { FUNGI, PLANTS } from './species.js';
import { TASKS, PUMPKIN_TASK, INVENTORY_TASK } from './tasks.js';
import { SPECIALIZATION_FINALES } from './main-task-definitions.js';
import { resizeGarden } from './grid.js';
import { SOURCE_ITEM_GROUPS } from './source-item-catalog.js';
import { BLOCKER_ITEMS } from './blocker-catalog.js';
import { grantSourceItem } from './source-items.js';
import { grantBlockerItem } from './blocker-items.js';
import { inventoryItems, ensureInventorySlots, inventoryCapacity, INVENTORY_CAPACITY } from './inventory.js';
import { goldBalance, withGold } from './wallet.js';
import { NOTE_PAPERS, PAGE_MARKERS } from './stationery.js';
import { createJournal } from './journal.js';

export const SHOP_PRICES = Object.freeze({ seed: 0, cropSeed: 1, spore: 2, leaf: 1,
  landPerHex: 3, slotPack: 20, blocker: 8, sourceBase: 12 });
export const GARDEN_LIMITS = Object.freeze({ rows: 9, columns: 18 });

function progressionProducts(garden) {
  const claimed = garden.tasks?.claimed || [];
  const rewards = claimed.map(id => TASKS[id]?.rewards).filter(Boolean);
  const seedStock = [...new Set(rewards.flatMap(reward => reward.seedStock || []))].sort();
  const unlockedBlockers = new Set(rewards.flatMap(reward => Object.keys(reward.blockers || {}))
    .map(id => id.split(':')[1]));
  const baseGroup = Math.max(0, ...rewards.map(reward => reward.sourceGroup || 0));
  const group = baseGroup === 2 ? baseGroup + SPECIALIZATION_FINALES.filter(id => claimed.includes(id)).length : baseGroup;
  const upgrades = [];
  if (claimed.includes(PUMPKIN_TASK)) {
    for (const [axis, name, addedHexes] of [['rows', 'Row', garden.columns], ['columns', 'Column', garden.rows]]) {
      if (garden[axis] >= GARDEN_LIMITS[axis]) continue;
      const columns = garden.columns + Number(axis === 'columns'), rows = garden.rows + Number(axis === 'rows');
      upgrades.push({ id: `upgrade:${axis}`, type: 'upgrade', name: `+1 ${name}`, single: true, axis,
        columns, rows, addedHexes, price: SHOP_PRICES.landPerHex * addedHexes,
        details: `Adds ${addedHexes} hexes for a ${columns} × ${rows} garden.` });
    }
  }
  const capacity = inventoryCapacity(garden);
  if (claimed.includes(INVENTORY_TASK) && capacity < INVENTORY_CAPACITY) {
    const slots = Math.min(10, INVENTORY_CAPACITY - capacity);
    upgrades.push({ id: 'upgrade:inventory', type: 'upgrade', name: `+${slots} Inventory slots`, single: true,
      capacity: capacity + slots, price: SHOP_PRICES.slotPack, details: `Increases capacity to ${capacity + slots} slots.` });
  }
  return [
    ...seedStock.map(species => ({ id: `seed:${species}`, type: 'seed', species, name: `${species} Seeds`,
      price: SHOP_PRICES.cropSeed, owned: garden.inventory.seeds[species] || 0 })),
    ...Object.values(BLOCKER_ITEMS).filter(item => unlockedBlockers.has(item.id.split(':')[1]))
      .map(item => ({ ...item, type: 'blocker-item', price: SHOP_PRICES.blocker, owned: garden.inventory.blockers?.[item.id] || 0 })),
    ...SOURCE_ITEM_GROUPS.slice(0, group).flatMap(({ number, items }) => items.map(item => ({
      id: `source:${item.id}`, catalogId: item.id, type: 'source-item', name: item.name, single: true,
      price: SHOP_PRICES.sourceBase + (number - 1) * 4,
      owned: Object.values(garden.inventory.sourceItems || {}).filter(instance => instance.catalogId === item.id).length,
    }))),
    ...upgrades,
  ];
}

export function shopUnlockedSpores(garden) {
  const species = new Set(['Prismorel', ...(garden.shop?.unlockedSpores || [])]);
  for (const id of garden.tasks?.claimed || []) {
    for (const name of Object.keys(TASKS[id]?.rewards.spores || {})) species.add(name);
  }
  // Sandboxes predate guild progression. Preserve access to their existing
  // stock and planted cohorts without unlocking the whole reference Grimoire.
  if (!garden.tasks) {
    for (const name of Object.keys(garden.inventory.spores || {})) species.add(name);
    for (const object of [...Object.values(garden.objects), ...Object.values(garden.staged || {}), ...Object.values(garden.pending || {})]) {
      if (object.type === 'fungus' || object.kind === 'fungus') species.add(object.species);
    }
  }
  return [...species].filter(name => Object.hasOwn(FUNGI, name)).sort();
}

export function normalizeShop(saved, garden) {
  if (saved != null && (saved.version !== 1 || !Array.isArray(saved.unlockedSpores)
    || !Number.isSafeInteger(saved.gold) || saved.gold < 0)) throw new Error('Invalid or unsupported shop save.');
  const gold = saved?.gold ?? garden.tasks?.gold ?? 0;
  if (!Number.isSafeInteger(gold) || gold < 0) throw new Error('Invalid Gold balance.');
  return { version: 1, gold, unlockedSpores: [...new Set((saved?.unlockedSpores || []).filter(name => Object.hasOwn(FUNGI, name)))].sort() };
}

export function shopProducts(garden, mode) {
  if (mode === 'buy') return [
    { id: 'seed:Beanstalk', type: 'seed', species: 'Beanstalk', name: 'Beanstalk Seeds', price: SHOP_PRICES.seed,
      owned: garden.inventory.seeds.Beanstalk || 0 },
    ...shopUnlockedSpores(garden).map(species => ({ id: `spore:${species}`, type: 'spore', species,
      name: `${species} Spores`, price: SHOP_PRICES.spore, owned: garden.inventory.spores[species] || 0 })),
    ...progressionProducts(garden),
    ...[...Object.values(NOTE_PAPERS), ...Object.values(PAGE_MARKERS)].map(style => ({ ...style,
      id: `${style.type}:${style.id}`, styleId: style.id, permanent: true,
      owned: Number((garden.journal?.[style.type === 'paper' ? 'papers' : 'markers'] || []).includes(style.id)) })),
  ];
  if (mode === 'sell') return inventoryItems(garden.inventory).filter(item => item.type === 'leaf' && Object.hasOwn(PLANTS, item.species))
    .map(item => ({ ...item, price: SHOP_PRICES.leaf, owned: item.quantity })).sort((a, b) => a.name.localeCompare(b.name));
  throw new Error('Choose Buy or Sell.');
}

export function shopQuote(garden, mode, id, quantity) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error('Choose a whole quantity of at least 1.');
  const product = shopProducts(garden, mode).find(item => item.id === id);
  if (!product) throw new Error(mode === 'buy' ? 'This product is not unlocked.' : 'Only your currently held Leaves can be sold.');
  if (product.permanent && quantity !== 1) throw new Error('Stationery styles are permanent unlocks. Buy one of each.');
  if (product.single && quantity !== 1) throw new Error('Purchase one at a time.');
  if (product.permanent && product.owned) throw new Error('Already in your stationery collection.');
  const total = product.price * quantity, gold = goldBalance(garden);
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(gold) || gold < 0) throw new Error('This transaction is too large.');
  const balanceAfter = mode === 'buy' ? gold - total : gold + total;
  if (balanceAfter < 0) throw new Error('Not enough Gold for this quantity.');
  if (!Number.isSafeInteger(balanceAfter)) throw new Error('Gold balance is too large for this sale.');
  if (mode === 'sell' && quantity > product.owned) throw new Error('Not enough Leaves for this quantity.');
  if (mode === 'buy' && !Number.isSafeInteger((product.owned || 0) + quantity)) throw new Error('This stack is too large.');
  const needsSlot = product.type === 'source-item'
    || (['seed', 'spore', 'blocker-item'].includes(product.type) && product.owned === 0);
  if (mode === 'buy' && needsSlot && inventoryItems(garden.inventory).length >= inventoryCapacity(garden)) {
    throw new Error('Inventory is full: free a square for this item.');
  }
  return { ...product, mode, quantity, total, balanceAfter };
}

export function tradeShop(garden, mode, id, quantity) {
  const quote = shopQuote(garden, mode, id, quantity);
  if (quote.permanent) {
    const journal = garden.journal || createJournal(), collection = quote.type === 'paper' ? 'papers' : 'markers';
    return { garden: withGold({ ...garden, journal: { ...journal,
      [collection]: [...journal[collection], quote.styleId] } }, quote.balanceAfter), receipt: quote };
  }
  if (quote.type === 'upgrade') {
    const upgraded = quote.axis ? resizeGarden(garden, quote.columns, quote.rows)
      : { ...garden, inventoryCapacity: quote.capacity };
    return { garden: withGold(upgraded, quote.balanceAfter), receipt: quote };
  }
  if (quote.type === 'source-item' || quote.type === 'blocker-item') {
    const purchased = quote.type === 'source-item' ? grantSourceItem(garden, quote.catalogId)
      : grantBlockerItem(garden, quote.id, quantity);
    return { garden: withGold(purchased, quote.balanceAfter), receipt: quote };
  }
  const key = { seed: 'seeds', spore: 'spores', leaf: 'leaves' }[quote.type];
  const stock = { ...garden.inventory[key], [quote.species]: quote.owned + (mode === 'buy' ? quantity : -quantity) };
  const next = ensureInventorySlots(withGold({ ...garden,
    inventory: { ...garden.inventory, [key]: stock } }, quote.balanceAfter));
  next.shop = { ...next.shop, unlockedSpores: shopUnlockedSpores(garden) };
  return { garden: next, receipt: quote };
}
