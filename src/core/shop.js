import { FUNGI, PLANTS } from './species.js';
import { TASKS } from './tasks.js';
import { inventoryItems, ensureInventorySlots, INVENTORY_CAPACITY } from './inventory.js';
import { goldBalance, withGold } from './wallet.js';

export const SHOP_PRICES = Object.freeze({ seed: 0, spore: 2, leaf: 1 });

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
  ];
  if (mode === 'sell') return inventoryItems(garden.inventory).filter(item => item.type === 'leaf' && Object.hasOwn(PLANTS, item.species))
    .map(item => ({ ...item, price: SHOP_PRICES.leaf, owned: item.quantity })).sort((a, b) => a.name.localeCompare(b.name));
  throw new Error('Choose Buy or Sell.');
}

export function shopQuote(garden, mode, id, quantity) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error('Choose a whole quantity of at least 1.');
  const product = shopProducts(garden, mode).find(item => item.id === id);
  if (!product) throw new Error(mode === 'buy' ? 'This product is not unlocked.' : 'Only your currently held Leaves can be sold.');
  const total = product.price * quantity, gold = goldBalance(garden);
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(gold) || gold < 0) throw new Error('This transaction is too large.');
  const balanceAfter = mode === 'buy' ? gold - total : gold + total;
  if (balanceAfter < 0) throw new Error('Not enough Gold for this quantity.');
  if (!Number.isSafeInteger(balanceAfter)) throw new Error('Gold balance is too large for this sale.');
  if (mode === 'sell' && quantity > product.owned) throw new Error('Not enough Leaves for this quantity.');
  if (mode === 'buy' && !Number.isSafeInteger(product.owned + quantity)) throw new Error('This stack is too large.');
  if (mode === 'buy' && product.owned === 0 && inventoryItems(garden.inventory).length >= INVENTORY_CAPACITY) {
    throw new Error('Inventory is full: free a square for this item.');
  }
  return { ...product, mode, quantity, total, balanceAfter };
}

export function tradeShop(garden, mode, id, quantity) {
  const quote = shopQuote(garden, mode, id, quantity);
  const key = { seed: 'seeds', spore: 'spores', leaf: 'leaves' }[quote.type];
  const stock = { ...garden.inventory[key], [quote.species]: quote.owned + (mode === 'buy' ? quantity : -quantity) };
  const next = ensureInventorySlots(withGold({ ...garden,
    inventory: { ...garden.inventory, [key]: stock } }, quote.balanceAfter));
  next.shop = { ...next.shop, unlockedSpores: shopUnlockedSpores(garden) };
  return { garden: next, receipt: quote };
}
