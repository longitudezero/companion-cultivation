import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createGarden, createTutorialGarden, goldBalance, withGold, shopProducts, shopQuote, tradeShop,
  FIRST_TASK, CARE_TASK, CARROT_DELIVERY_TASK, claimTask, taskStatus, inventoryItems,
  grantSourceItem, ensureInventorySlots, serializeGameSave, deserializeGameSave, resizeGarden,
  makeFungus, placeObject, removeObject } from '../src/core/index.js';

function firstClaimed() {
  const garden = createTutorialGarden(); garden.tasks.ready = [FIRST_TASK];
  return claimTask(garden, FIRST_TASK);
}

test('Beanstalk Seeds stay free at zero Gold; shop quotes do not mutate the garden', () => {
  const garden = createTutorialGarden(), before = JSON.stringify(garden);
  const quote = shopQuote(garden, 'buy', 'seed:Beanstalk', 25);
  assert.equal(quote.total, 0);
  assert.equal(quote.balanceAfter, 0);
  assert.equal(JSON.stringify(garden), before);
  const next = tradeShop(garden, 'buy', 'seed:Beanstalk', 25).garden;
  assert.equal(next.inventory.seeds.Beanstalk, 61);
  assert.equal(goldBalance(next), 0);
  assert.equal(JSON.stringify(garden), before);
});

test('only starter and task-awarded Spores unlock in tutorials, with recovery after depletion', () => {
  let garden = createTutorialGarden();
  assert.deepEqual(shopProducts(garden, 'buy').map(item => item.id), ['seed:Beanstalk', 'spore:Prismorel']);
  garden.inventory.spores.Hushroom = 8;
  assert.throws(() => tradeShop(garden, 'buy', 'spore:Hushroom', 1), /not unlocked/);
  garden = firstClaimed();
  garden.inventory.spores.Dewmender = 0;
  assert.equal(shopProducts(garden, 'buy').some(item => item.id === 'spore:Dewmender'), true);
  garden.tasks.ready.push(CARE_TASK); garden = claimTask(garden, CARE_TASK);
  for (const species of Object.keys(garden.inventory.spores)) garden.inventory.spores[species] = 0;
  assert.deepEqual(shopProducts(deserializeGameSave(serializeGameSave(garden)), 'buy').map(item => item.id),
    ['seed:Beanstalk', 'spore:Dewmender', 'spore:Droughtcap', 'spore:Prismorel', 'spore:Rilllace']);
});

test('purchases, sales and later task rewards use one shared Gold balance', () => {
  let garden = firstClaimed();
  garden = tradeShop(garden, 'buy', 'spore:Prismorel', 4).garden;
  assert.equal(goldBalance(garden), 2);
  assert.equal(garden.inventory.spores.Prismorel, 12);
  garden.tasks.ready.push(CARE_TASK); garden = claimTask(garden, CARE_TASK);
  assert.equal(goldBalance(garden), 17);
  garden.inventory.leaves.Carrot = 3;
  const sale = tradeShop(garden, 'sell', 'leaf:Carrot', 2);
  assert.equal(sale.receipt.total, 2);
  assert.equal(sale.garden.inventory.leaves.Carrot, 1);
  assert.equal(goldBalance(sale.garden), 19);
  assert.equal(sale.garden.tasks.gold, undefined);
});

test('selling Leaves revokes delivery readiness immediately without delivering or altering other stock', () => {
  let garden = firstClaimed();
  garden.inventory.leaves = { Carrot: 5, Beanstalk: 9 };
  garden = ensureInventorySlots(garden);
  assert.equal(taskStatus(garden, CARROT_DELIVERY_TASK), 'ready');
  const before = JSON.stringify(garden);
  const sold = tradeShop(garden, 'sell', 'leaf:Carrot', 1).garden;
  assert.equal(taskStatus(sold, CARROT_DELIVERY_TASK), 'active');
  assert.equal(sold.inventory.leaves.Carrot, 4);
  assert.equal(sold.inventory.leaves.Beanstalk, 9);
  assert.deepEqual(sold.tasks.claimed, [FIRST_TASK]);
  assert.equal(JSON.stringify(garden), before);
  const all = tradeShop(sold, 'sell', 'leaf:Carrot', 4).garden;
  assert.equal('leaf:Carrot' in all.inventorySlots, false);
  assert.equal(shopProducts(all, 'sell').some(item => item.species === 'Carrot'), false);
});

test('only named Leaves can be sold and sale quantities cannot exceed current holdings', () => {
  const garden = createTutorialGarden();
  garden.inventory.leaves = { Carrot: 3 }; garden.inventory.legacyLeaves = 99;
  assert.deepEqual(shopProducts(garden, 'sell').map(item => item.id), ['leaf:Carrot']);
  for (const id of ['seed:Beanstalk', 'spore:Prismorel', 'legacy:leaves', 'trophy:bambooSteel', 'item-1']) {
    assert.throws(() => tradeShop(garden, 'sell', id, 1), /only your currently held Leaves/i);
  }
  assert.throws(() => tradeShop(garden, 'sell', 'leaf:Carrot', 4), /Not enough Leaves/);
});

test('invalid quantities, locked stock and unaffordable purchases leave everything unchanged', () => {
  const garden = createTutorialGarden(), before = JSON.stringify(garden);
  for (const quantity of [0, -1, 1.5, NaN, Infinity, '4', Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => tradeShop(garden, 'buy', 'seed:Beanstalk', quantity), /whole quantity/);
  }
  assert.throws(() => tradeShop(garden, 'buy', 'spore:Prismorel', 1), /Not enough Gold/);
  assert.throws(() => tradeShop(garden, 'buy', 'spore:Dewmender', 1), /not unlocked/);
  assert.throws(() => tradeShop(garden, 'other', 'seed:Beanstalk', 1), /Choose Buy or Sell/);
  assert.equal(JSON.stringify(garden), before);
});

test('a full inventory rejects new product stacks atomically but allows topping up an existing stack', () => {
  let garden = firstClaimed(); garden.inventory.spores.Dewmender = 0;
  for (let n = 0; n < 198; n++) garden = grantSourceItem(garden, 'ember-pebble');
  assert.equal(inventoryItems(garden.inventory).length, 200);
  const before = JSON.stringify(garden);
  assert.throws(() => tradeShop(garden, 'buy', 'spore:Dewmender', 4), /Inventory is full/);
  assert.equal(JSON.stringify(garden), before);
  const topup = tradeShop(garden, 'buy', 'spore:Prismorel', 4).garden;
  assert.equal(topup.inventory.spores.Prismorel, 12);
  assert.equal(goldBalance(topup), 2);
  assert.equal(inventoryItems(topup.inventory).length, 200);
  assert.equal(tradeShop(garden, 'buy', 'seed:Beanstalk', 10).garden.inventory.seeds.Beanstalk, 46);
});

test('Gold, stack and total overflows cannot consume stock or currency', () => {
  let garden = withGold(createTutorialGarden(), Number.MAX_SAFE_INTEGER);
  garden.inventory.leaves.Carrot = 1;
  const before = JSON.stringify(garden);
  assert.throws(() => tradeShop(garden, 'sell', 'leaf:Carrot', 1), /Gold balance is too large/);
  assert.throws(() => tradeShop(garden, 'buy', 'seed:Beanstalk', Number.MAX_SAFE_INTEGER), /stack is too large/);
  assert.throws(() => tradeShop(garden, 'buy', 'spore:Prismorel', Number.MAX_SAFE_INTEGER), /transaction is too large/);
  assert.equal(JSON.stringify(garden), before);
});

test('old task Gold migrates once; the shared wallet remains authoritative on later loads', () => {
  const legacy = createTutorialGarden(); delete legacy.shop; legacy.tasks.gold = 35;
  const loaded = deserializeGameSave(serializeGameSave(legacy));
  assert.equal(goldBalance(loaded), 35);
  assert.equal(loaded.tasks.gold, undefined);
  const bought = tradeShop(loaded, 'buy', 'spore:Prismorel', 4).garden;
  bought.tasks.gold = 35; // A leftover old field must never re-credit spent Gold.
  const restored = deserializeGameSave(serializeGameSave(bought));
  assert.equal(goldBalance(restored), 27);
  assert.equal(restored.tasks.gold, undefined);
  assert.deepEqual(resizeGarden(restored, 5, 4).shop, restored.shop);
  assert.equal(legacy.tasks.gold, 35);
});

test('legacy sandboxes can trade and retain acquired Fungi without activating tutorial tasks', () => {
  let garden = placeObject(createGarden(), '0,0', makeFungus('Hushroom'));
  garden.inventory.leaves.Carrot = 3;
  garden = tradeShop(garden, 'sell', 'leaf:Carrot', 2).garden;
  garden = removeObject(garden, '0,0');
  const restored = deserializeGameSave(serializeGameSave(garden));
  assert.equal(restored.tasks, undefined);
  assert.equal(taskStatus(restored, FIRST_TASK), 'not-started');
  assert.equal(goldBalance(restored), 2);
  assert.equal(shopProducts(restored, 'buy').some(item => item.id === 'spore:Hushroom'), true);
  assert.deepEqual(restored.inventory.leaves, { Carrot: 1 });
});

test('invalid shop saves are rejected and unknown unlocks are discarded', () => {
  const garden = createTutorialGarden();
  for (const shop of [{ version: 9, gold: 0, unlockedSpores: [] }, { version: 1, gold: -1, unlockedSpores: [] },
    { version: 1, gold: 3.5, unlockedSpores: [] }, { version: 1, gold: 0, unlockedSpores: null }]) {
    assert.throws(() => deserializeGameSave(serializeGameSave({ ...garden, shop })), /Invalid or unsupported shop/);
  }
  const clean = deserializeGameSave(serializeGameSave({ ...garden, shop: { ...garden.shop, unlockedSpores: ['Prismorel', 'unknown', 'toString', 'Prismorel'] } }));
  assert.deepEqual(clean.shop.unlockedSpores, ['Prismorel']);
});

const root = fileURLToPath(new URL('../', import.meta.url)), cache = await mkdtemp(join(root, 'node_modules', '.shop-'));
let Shop;
try {
  await build({ entryPoints: [join(root, 'src/ui/Shop.jsx')], outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent' });
  Shop = (await import(pathToFileURL(join(cache, 'Shop.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }

test('the shop exposes Buy/Sell, free recovery Seeds, current funds and only unlocked Spores', () => {
  const markup = renderToStaticMarkup(React.createElement(Shop, { garden: createTutorialGarden(), speed: 1 }));
  assert.match(markup, /aria-label="Guild Shop"/);
  assert.match(markup, /aria-label="Back to garden"/);
  assert.doesNotMatch(markup, /simulation-speeds|Pause simulation|Close Shop/);
  assert.match(markup, /role="tab" aria-selected="true">Buy/);
  assert.match(markup, />Sell<\/button>/);
  assert.match(markup, /Beanstalk Seeds, Free, 36 owned/);
  assert.match(markup, /Prismorel Spores, 2 Gold each/);
  assert.match(markup, /0 Gold/);
  assert.match(markup, /Shop quantity/);
  assert.doesNotMatch(markup, /Dewmender Spores|Hushroom Spores/);
});
