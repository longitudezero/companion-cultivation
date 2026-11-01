import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createGarden, createDemoGarden, createTutorialGarden, FIRST_TASK, CARE_TASK, CARROT_DELIVERY_TASK, TASK_IDS,
  taskStatus, taskObjectives, updateTaskProgress, claimTask, toggleTaskPin, normalizeTaskProgress,
  stagePlanting, applyStaging, advanceGardenTime, makePlant, placeObject, makeSource, makeInfluence,
  setBaseline, calculateEnvironment, calculateCultivation, grantSourceItem, inventoryItems, ensureInventorySlots,
  serializeGameSave, deserializeGameSave, resizeGarden } from '../src/core/index.js';
import { harvestItems, mergeHarvestReceipt } from '../src/ui/harvest-receipts.js';
import { groupedTasks, initialTaskSelection, taskProgress } from '../src/ui/taskboard-model.js';

function planted() {
  let garden = createTutorialGarden();
  garden = stagePlanting(garden, '1,1', 'plant', 'Beanstalk', 4);
  garden = stagePlanting(garden, '0,1', 'fungus', 'Prismorel', 4);
  return applyStaging(garden, () => 0).garden;
}
const firstReady = () => advanceGardenTime(planted(), 16).garden;
const careActive = () => claimTask(firstReady(), FIRST_TASK);
function careReady() {
  let garden = stagePlanting(careActive(), '1,2', 'fungus', 'Dewmender', 4);
  garden = applyStaging(garden, () => 0).garden;
  return advanceGardenTime(garden, 6).garden;
}

test('the tutorial has two main tasks and one side request, one initial pin, and its isolated starter bundle', () => {
  const garden = createTutorialGarden();
  assert.equal(garden.columns * garden.rows, 16);
  assert.deepEqual(garden.inventory.seeds, { Beanstalk: 36 });
  assert.deepEqual(garden.inventory.spores, { Prismorel: 8 });
  assert.deepEqual(garden.tasks.pinned, [FIRST_TASK]);
  assert.equal(TASK_IDS.length, 3);
  assert.equal(taskStatus(garden, CARE_TASK), 'locked');
  assert.equal(taskStatus(garden, CARROT_DELIVERY_TASK), 'locked');
  const restored = deserializeGameSave(serializeGameSave(garden));
  assert.deepEqual(restored.inventory, garden.inventory);
  const spent = { ...garden, inventory: { ...garden.inventory, seeds: { Beanstalk: 0 }, spores: { Prismorel: 0 } } };
  assert.deepEqual(deserializeGameSave(serializeGameSave(spent)).inventory, spent.inventory);
  const sandbox = createDemoGarden();
  assert.equal(updateTaskProgress(sandbox), sandbox);
  assert.equal(deserializeGameSave(serializeGameSave(sandbox)).tasks, undefined);
});

test('first-task readiness follows an actual sowing/transformation event, and rewards wait for claiming', () => {
  let garden = advanceGardenTime(planted(), 15).garden;
  assert.equal(taskStatus(garden, FIRST_TASK), 'active');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects['1,1'].species, 'Carrot');
  assert.equal(taskStatus(garden, FIRST_TASK), 'ready');
  assert.equal(garden.shop.gold, 0);
  assert.equal(garden.inventory.spores.Dewmender, undefined);
  assert.equal(taskStatus(garden, CARE_TASK), 'locked');
  garden = claimTask(garden, FIRST_TASK);
  assert.equal(garden.shop.gold, 10);
  assert.equal(garden.inventory.spores.Dewmender, 8);
  assert.equal(taskStatus(garden, CARE_TASK), 'active');
  assert.deepEqual(garden.tasks.pinned, [CARE_TASK]);
});

test('owning or debug-placing Carrot does not count as witnessing the first transformation', () => {
  let garden = placeObject(createTutorialGarden(), '1,1', makePlant('Carrot'));
  garden.inventory.seeds.Carrot = 10;
  garden = advanceGardenTime(garden, 2).garden;
  assert.equal(taskStatus(garden, FIRST_TASK), 'active');
});

test('pinning does not gate progress and unpinning the tutorial is respected', () => {
  const start = toggleTaskPin(planted(), FIRST_TASK);
  const ready = advanceGardenTime(start, 16).garden;
  assert.equal(taskStatus(ready, FIRST_TASK), 'ready');
  assert.deepEqual(claimTask(ready, FIRST_TASK).tasks.pinned, []);
  assert.deepEqual(toggleTaskPin(ready, 'not-a-task').tasks.pinned, []);
});

test('the care task recognizes real Dewmender Wetting without requiring Waterborne cultivation contact', () => {
  const garden = careReady();
  assert.equal(calculateEnvironment(garden).conditions['1,1'].Moisture, 'Damp');
  assert.equal((calculateCultivation(garden)['1,1'] || []).some(effect => effect.species === 'Dewmender'), false);
  assert.equal(taskStatus(garden, CARE_TASK), 'ready');
  assert.equal(garden.shop.gold, 10);
  assert.equal(garden.inventory.spores.Rilllace, undefined);
  const completed = claimTask(garden, CARE_TASK);
  assert.equal(completed.shop.gold, 25);
  assert.equal(completed.inventory.spores.Rilllace, 8);
  assert.equal(completed.inventory.spores.Droughtcap, 8);
  assert.deepEqual(completed.tasks.pinned, []);
});

test('Damp baseline or ordinary Wetting sources cannot substitute for a living Dewmender footprint', () => {
  const before = careActive();
  let garden = setBaseline(before, '1,1', 'Moisture', 'Damp');
  assert.equal(taskStatus(updateTaskProgress(garden, before), CARE_TASK), 'active');
  garden = placeObject(before, '1,2', makeSource([makeInfluence('Wetting', 1, 2)]));
  assert.equal(calculateEnvironment(garden).conditions['1,1'].Moisture, 'Damp');
  assert.equal(taskStatus(updateTaskProgress(garden, before), CARE_TASK), 'active');
});

test('claims reject unfinished, locked and already claimed tasks without duplicating rewards', () => {
  assert.throws(() => claimTask(createTutorialGarden(), FIRST_TASK), /not ready/);
  assert.throws(() => claimTask(firstReady(), CARE_TASK), /not ready/);
  const completed = claimTask(careReady(), CARE_TASK), before = JSON.stringify(completed);
  assert.throws(() => claimTask(completed, FIRST_TASK), /not ready/);
  assert.throws(() => claimTask(completed, CARE_TASK), /not ready/);
  assert.equal(JSON.stringify(completed), before);
});

test('a full inventory leaves the first reward, Gold and unlock pending atomically', () => {
  let garden = firstReady();
  for (let n = 0; n < 198; n++) garden = grantSourceItem(garden, 'ember-pebble');
  assert.equal(inventoryItems(garden.inventory).length, 200);
  const before = JSON.stringify(garden);
  assert.throws(() => claimTask(garden, FIRST_TASK), /Inventory is full/);
  assert.equal(JSON.stringify(garden), before);
  assert.equal(taskStatus(garden, FIRST_TASK), 'ready');
  assert.equal(taskStatus(garden, CARE_TASK), 'locked');
});

test('one free square cannot partially accept the two-species second reward', () => {
  let garden = careReady();
  for (let n = 0; n < 196; n++) garden = grantSourceItem(garden, 'ember-pebble');
  assert.equal(inventoryItems(garden.inventory).length, 199);
  const before = JSON.stringify(garden);
  assert.throws(() => claimTask(garden, CARE_TASK), /Inventory is full/);
  assert.equal(JSON.stringify(garden), before);
  assert.equal(garden.shop.gold, 10);
});

test('the side delivery unlocks with the care task and uses current species-specific stock', () => {
  const garden = careActive();
  assert.equal(taskStatus(garden, CARROT_DELIVERY_TASK), 'active');
  garden.inventory.leaves = { Carrot: 4, Beanstalk: 50 };
  garden.inventory.legacyLeaves = 100;
  assert.equal(taskStatus(garden, CARROT_DELIVERY_TASK), 'active');
  garden.inventory.leaves.Carrot = 5;
  assert.equal(taskStatus(garden, CARROT_DELIVERY_TASK), 'ready');
  assert.match(taskObjectives(garden, CARROT_DELIVERY_TASK)[0].text, /5 \/ 5/);
  const observed = updateTaskProgress(garden);
  assert.equal(observed.inventory.leaves.Carrot, 5, 'readiness never delivers automatically');
  observed.inventory.leaves.Carrot = 4;
  observed.tasks.ready.push(CARROT_DELIVERY_TASK);
  assert.equal(taskStatus(observed, CARROT_DELIVERY_TASK), 'active', 'spending stock revokes readiness');
  const loaded = deserializeGameSave(serializeGameSave(observed));
  assert.equal(taskStatus(loaded, CARROT_DELIVERY_TASK), 'active');
  assert.equal(loaded.tasks.ready.includes(CARROT_DELIVERY_TASK), false);
  assert.throws(() => claimTask(loaded, CARROT_DELIVERY_TASK), /not ready/);
});

test('explicit side delivery consumes exactly five Carrot Leaves once and retains other pins and stock', () => {
  let garden = careActive();
  garden.inventory.leaves = { Carrot: 7, Beanstalk: 3 };
  garden = toggleTaskPin(garden, CARROT_DELIVERY_TASK);
  const before = JSON.stringify(garden);
  const delivered = claimTask(garden, CARROT_DELIVERY_TASK);
  assert.deepEqual(delivered.inventory.leaves, { Carrot: 2, Beanstalk: 3 });
  assert.equal(delivered.shop.gold, 20);
  assert.deepEqual(delivered.tasks.pinned, [CARE_TASK]);
  assert.equal(taskStatus(delivered, CARE_TASK), 'active');
  assert.equal(taskStatus(delivered, CARROT_DELIVERY_TASK), 'completed');
  assert.equal(JSON.stringify(garden), before);
  const loaded = deserializeGameSave(serializeGameSave(delivered));
  assert.equal(taskStatus(loaded, CARROT_DELIVERY_TASK), 'completed');
  assert.equal(loaded.inventory.leaves.Carrot, 2);
  assert.throws(() => claimTask(loaded, CARROT_DELIVERY_TASK), /not ready/);
  garden.inventory.leaves.Carrot = 5;
  garden = ensureInventorySlots(garden);
  assert.equal('leaf:Carrot' in claimTask(garden, CARROT_DELIVERY_TASK).inventorySlots, false);
});

test('a failed side reward leaves the delivery and claim untouched', () => {
  const garden = careActive();
  garden.inventory.leaves.Carrot = 5;
  garden.shop.gold = Number.MAX_SAFE_INTEGER;
  const before = JSON.stringify(garden);
  assert.throws(() => claimTask(garden, CARROT_DELIVERY_TASK), /Gold balance/);
  assert.equal(JSON.stringify(garden), before);
});

test('task progress, pins, Gold and claims survive file round-trips and plot resizing', () => {
  let garden = toggleTaskPin(careActive(), CARE_TASK);
  garden.tasks.trackerCollapsed = true;
  const loaded = deserializeGameSave(serializeGameSave(garden));
  assert.deepEqual(loaded.tasks, garden.tasks);
  assert.deepEqual(resizeGarden(loaded, 5, 4).tasks, garden.tasks);
  assert.throws(() => claimTask(loaded, FIRST_TASK), /not ready/);
  assert.throws(() => normalizeTaskProgress({ ...garden.tasks, version: 99 }), /unsupported/);
  assert.throws(() => normalizeTaskProgress({ ...garden.tasks, gold: -1 }), /Invalid/);
});

test('a larger time skip retains the actual completion even if the Carrot later dies', () => {
  const garden = advanceGardenTime(planted(), 300).garden;
  assert.equal(garden.objects['1,1'], undefined);
  assert.equal(taskStatus(garden, FIRST_TASK), 'ready');
});

test('harvest receipts use actual item identities and combine only quick consecutive harvests', () => {
  const before = { inventory: { leaves: { Kelpfull: 1 }, seeds: { Algea: 2 } } };
  const after = { inventory: { leaves: { Kelpfull: 4 }, seeds: { Algea: 5 }, spores: { Dewmender: 8 } } };
  const items = harvestItems(before, after);
  assert.deepEqual(items.map(item => [item.name, item.quantity]), [['Algea Seeds', 3], ['Dewmender Spores', 8], ['Kelpfull Leaves', 3]]);
  const first = mergeHarvestReceipt(null, items, 100, 1);
  const merged = mergeHarvestReceipt(first, [items[0]], 200, 2);
  assert.equal(merged.items[0].quantity, 6);
  assert.equal(first.items[0].quantity, 3);
  assert.equal(mergeHarvestReceipt(merged, [items[0]], 5000, 3).items[0].quantity, 3);
});

const root = fileURLToPath(new URL('../', import.meta.url)), cache = await mkdtemp(join(root, 'node_modules', '.taskboard-'));
let Board, Tracker, Receipt;
try {
  await build({ entryPoints: { board: join(root, 'src/ui/Taskboard.jsx'), tracker: join(root, 'src/ui/TaskTracker.jsx'), receipt: join(root, 'src/ui/HarvestReceipt.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent' });
  Board = (await import(pathToFileURL(join(cache, 'board.js')))).default;
  Tracker = (await import(pathToFileURL(join(cache, 'tracker.js')))).default;
  Receipt = (await import(pathToFileURL(join(cache, 'receipt.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }

test('the board and tracker expose only available tasks; receipts retain species-specific yield names', () => {
  const garden = createTutorialGarden();
  const board = renderToStaticMarkup(React.createElement(Board, { garden, speed: 1 }));
  assert.match(board, /Guild Taskboard|My First Transformation|Pause simulation|Complete task/);
  assert.doesNotMatch(board, /A Thirsty Carrot|Well, I|Leaves, Please/);
  assert.doesNotMatch(board, /New tutorial garden/);
  assert.doesNotMatch(board, /simulation-speeds|Pause simulation/);
  assert.match(board, /aria-label="Unpin task"[^>]*aria-pressed="true"/);
  assert.ok(board.indexOf('ui/pin.webp') < board.indexOf('ui/botanical-badges.png', board.indexOf('task-badge-row')));
  const nextBoard = renderToStaticMarkup(React.createElement(Board, { garden: careActive(), initialTaskId: FIRST_TASK, speed: 1 }));
  assert.match(nextBoard, /<h3>A Thirsty Carrot<\/h3>/);
  assert.doesNotMatch(nextBoard, /no outstanding assignments/);
  assert.match(renderToStaticMarkup(React.createElement(Tracker, { garden })), /Grow a Beanstalk/);
  const multiple = toggleTaskPin(careActive(), CARROT_DELIVERY_TASK);
  const tracker = renderToStaticMarkup(React.createElement(Tracker, { garden: multiple }));
  assert.match(tracker, /<ul[^>]*>[\s\S]*A Thirsty Carrot[\s\S]*A Few Carrot Leaves[\s\S]*<\/ul>/);
  assert.match(tracker, /Give 5 Carrot Leaves · 0 \/ 5/);
  const sideBoard = renderToStaticMarkup(React.createElement(Board, { garden: multiple, initialTaskId: CARROT_DELIVERY_TASK, speed: 1 }));
  assert.match(sideBoard, />Side Tasks<span/);
  assert.match(sideBoard, /<h3>A Few Carrot Leaves<\/h3>/);
  assert.match(sideBoard, /uses 5 Carrot Leaves from your inventory/);
  assert.match(sideBoard, /aria-label="A Few Carrot Leaves progress"[^>]*aria-valuenow="0"[^>]*aria-valuetext="0 of 5 Leaves"/);
  const receipt = renderToStaticMarkup(React.createElement(Receipt, { receipt: { id: 1, items: [{ id: 'seed:Algea', type: 'seed', species: 'Algea', name: 'Algea Seeds', quantity: 3 }] } }));
  assert.match(receipt, /Harvested!|Algea Seeds/);
});

test('task sections keep Main then Side then Completed membership, excluding locked assignments', () => {
  assert.deepEqual(groupedTasks(createTutorialGarden()), { main: [FIRST_TASK], side: [], completed: [] });
  const garden = careActive();
  assert.deepEqual(groupedTasks(garden), { main: [CARE_TASK], side: [CARROT_DELIVERY_TASK], completed: [FIRST_TASK] });
  garden.inventory.leaves.Carrot = 5;
  const delivered = claimTask(garden, CARROT_DELIVERY_TASK);
  assert.deepEqual(groupedTasks(delivered), { main: [CARE_TASK], side: [], completed: [FIRST_TASK, CARROT_DELIVERY_TASK] });
});

test('pinned tasks select their entry while a completed default selects the next active assignment', () => {
  const garden = careActive();
  assert.equal(initialTaskSelection(garden, CARROT_DELIVERY_TASK), CARROT_DELIVERY_TASK);
  assert.equal(initialTaskSelection(garden, FIRST_TASK), CARE_TASK);
  assert.equal(initialTaskSelection(createTutorialGarden(), CARE_TASK), FIRST_TASK);
});

test('task progress shows actual objective completion and current delivery holdings, retaining completed history', () => {
  assert.deepEqual(taskProgress(advanceGardenTime(planted(), 6).garden, FIRST_TASK), { current: 2, total: 3, unit: 'objectives' });
  const garden = careActive(); garden.inventory.leaves.Carrot = 3;
  assert.deepEqual(taskProgress(garden, CARROT_DELIVERY_TASK), { current: 3, total: 5, unit: 'Leaves' });
  garden.inventory.leaves.Carrot = 5;
  const delivered = claimTask(garden, CARROT_DELIVERY_TASK);
  assert.equal(delivered.inventory.leaves.Carrot, 0);
  assert.deepEqual(taskProgress(delivered, CARROT_DELIVERY_TASK), { current: 5, total: 5, unit: 'Leaves' });
});

test('a fully completed board opens its history with status checks, supplied reward art and a Back control', () => {
  let garden = careReady(); garden.inventory.leaves.Carrot = 5;
  garden = claimTask(claimTask(garden, CARE_TASK), CARROT_DELIVERY_TASK);
  const markup = renderToStaticMarkup(React.createElement(Board, { garden, initialTaskId: FIRST_TASK, speed: 1 }));
  assert.match(markup, /aria-expanded="true" aria-controls="[^"]*-completed"/);
  assert.match(markup, /aria-label="Back to garden"/);
  assert.match(markup, /ui\/gold.webp/);
  assert.match(markup, /grimoire\/illustrations\/fungi\/dewmender.webp/);
  assert.match(markup, /Complete: /);
  assert.doesNotMatch(markup, /role="checkbox"|type="checkbox"/);
});
