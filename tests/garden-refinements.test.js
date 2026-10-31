import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { sampleClock, zoomAt, fitCamera, inventoryWidthFor, beginsPan, germinationProgress } from '../src/ui/view-model.js';
import { inventoryDetails } from '../src/ui/item-details.js';
import { transformationClue } from '../src/ui/garden-model.js';
import { createGarden, createGrimoire, stagePlanting, applyStaging, makePlant, makeFungus,
  placeObject, setBaseline, advanceGardenTime, grantSourceItem, placeSourceItem,
  calculateEnvironment, calculateCultivation } from '../src/core/index.js';
import { BOOK_ENTRIES } from '../src/grimoire/book.js';

test('all speed choices advance the same whole-hour clock at their declared ratios', () => {
  for (const [speed, expected] of [[0, 0], [.5, 6], [1, 12], [2, 24]]) {
    let state = { lastMs: 0, remainderMs: 0 }, hours = 0;
    for (let time = 1000; time <= 60000; time += 1000) { state = sampleClock(state, time, speed); hours += state.hours; }
    assert.equal(hours, expected);
    assert.equal(state.remainderMs, 0);
  }
});

test('pausing and switching speed preserve an incomplete simulation hour', () => {
  let state = sampleClock({ lastMs: 0, remainderMs: 0 }, 2500, 1);
  assert.equal(state.hours, 0);
  assert.equal(state.remainderMs, 2500);
  state = sampleClock(state, 102500, 0);
  assert.equal(state.hours, 0);
  assert.equal(state.remainderMs, 2500);
  state = sampleClock(state, 103750, 2);
  assert.equal(state.hours, 1);
  assert.equal(state.remainderMs, 0);
});

test('a shared clock drives germination, living organisms, sources and garden age identically', () => {
  let start = stagePlanting(createGarden(), '0,0', 'plant', 'Beanstalk', 3);
  start = applyStaging(start, () => 0).garden;
  start = placeObject(start, '1,0', makePlant('Moss'));
  start = placeObject(start, '2,0', makeFungus('Dewmender'));
  start = grantSourceItem(start, 'ember-pebble');
  start = placeSourceItem(start, Object.keys(start.inventory.sourceItems)[0], '0,1');
  for (const speed of [.5, 1, 2]) {
    let state = { lastMs: 0, remainderMs: 0 }, result = start;
    for (let time = 1000; time <= 30000; time += 1000) {
      state = sampleClock(state, time, speed);
      if (state.hours) result = advanceGardenTime(result, state.hours).garden;
    }
    assert.deepEqual(result, advanceGardenTime(start, 6 * speed).garden);
  }
});

test('zoom keeps the cursor world point fixed, while Fit works for a large plot in a small viewport', () => {
  const before = { x: -100, y: 50, zoom: 1.2 }, point = { x: 250, y: 180 };
  const after = zoomAt(before, point, 2.4);
  assert.ok(Math.abs((point.x - before.x) / before.zoom - (point.x - after.x) / after.zoom) < 1e-9);
  assert.ok(Math.abs((point.y - before.y) / before.zoom - (point.y - after.y) / after.zoom) < 1e-9);
  assert.equal(zoomAt(before, point, 100).zoom, 3);
  const fit = fitCamera({ width: 1200, height: 1100 }, { width: 330, height: 240 });
  assert.ok(1200 * fit.zoom <= 330 && 1100 * fit.zoom <= 240);
});

test('middle mouse pans occupied hexes, while primary drags preserve object interactions', () => {
  assert.equal(beginsPan(1, true), true);
  assert.equal(beginsPan(1, false), true);
  assert.equal(beginsPan(0, true), false);
  assert.equal(beginsPan(0, false), true);
  assert.equal(beginsPan(2, false), false);
  assert.equal(beginsPan(1, true, true), false);
  assert.equal(inventoryWidthFor(900, 1363), 720);
  assert.equal(inventoryWidthFor(100, 1363), 208);
  assert.ok(inventoryWidthFor(720, 900) <= 520);
});

test('germination progress is bounded and independent of hidden outcomes', () => {
  const pending = { readyAt: 6, success: true };
  assert.equal(germinationProgress(pending, 0), 0);
  assert.equal(germinationProgress(pending, 3), 50);
  assert.equal(germinationProgress(pending, 8), 100);
  assert.equal(germinationProgress(pending, 2, .5), germinationProgress({ ...pending, success: false }, 2, .5));
});

test('hover information uses public Fungal profiles and only observed Plant preferences', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const fungus = inventoryDetails({ type: 'spore', species: 'Dewmender', name: 'Dewmender Spores', quantity: 8 }, ledger);
  const lines = fungus.rows.join(' ');
  assert.match(lines, /\+1 Moisture.*radius 2/);
  assert.match(lines, /4 shared steps/);
  assert.match(lines, /Germination chance: \+8 pp/);
  assert.match(lines, /Ripening speed: \+20%/);
  assert.doesNotMatch(JSON.stringify(fungus), /Owned|quantity|href|image|Transformation/);
  const seed = inventoryDetails({ type: 'seed', species: 'Carrot', name: 'Carrot Seeds' }, ledger);
  assert.deepEqual(seed.rows, ['Growing notes await your first specimen.']);
  assert.equal(JSON.stringify(ledger), before);
});

test('the Transformation clue removes unknown target names and timers from presentation data', () => {
  let garden = setBaseline(createGarden(), '0,0', 'Moisture', 'Dry');
  garden = setBaseline(garden, '0,0', 'Illumination', 'Dark');
  garden = placeObject(garden, '0,0', makePlant('Beanstalk'));
  garden = placeObject(garden, '1,0', makeFungus('Prismorel'));
  assert.deepEqual(transformationClue(garden, '0,0', calculateEnvironment(garden), calculateCultivation(garden)), { active: false, learned: [] });
  garden = advanceGardenTime(garden, 5).garden;
  const environment = calculateEnvironment(garden), cultivation = calculateCultivation(garden);
  const unknown = transformationClue(garden, '0,0', environment, cultivation);
  assert.deepEqual(unknown, { active: true, learned: [] });
  garden = { ...garden, grimoire: { ...garden.grimoire, transformations: [{ from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel'] }] } };
  const learned = transformationClue(garden, '0,0', environment, cultivation);
  assert.equal(learned.learned[0].into, 'Carrot');
  assert.equal(learned.learned[0].progress, 50);
  assert.deepEqual(learned.learned[0].requirements, ['Dry · Temperate · Dim', 'Contact: Prismorel']);
  assert.doesNotMatch(JSON.stringify(learned), /Rice|Dewmender/);
});

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(root, 'node_modules', '.garden-refinements-'));
let App, Grimoire, Tooltip;
try {
  await build({ entryPoints: { app: join(root, 'src/App.jsx'), book: join(root, 'src/CultivationGrimoire.jsx'), tooltip: join(root, 'src/ui/InventoryTooltip.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
  App = (await import(pathToFileURL(join(cache, 'app.js')))).default;
  Grimoire = (await import(pathToFileURL(join(cache, 'book.js')))).default;
  Tooltip = (await import(pathToFileURL(join(cache, 'tooltip.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));

test('the refined shell exposes real speed, zoom and resize controls without permanent notices or pickup buttons', () => {
  const markup = render(App);
  for (const label of ['Pause simulation', 'Simulation speed 0.5×', 'Simulation speed 1×', 'Simulation speed 2×', 'Zoom in', 'Zoom out', 'Resize inventory']) assert.ok(markup.includes(label), label);
  assert.doesNotMatch(markup, /notice-bar|Pick up .*for inventory|Place .*here to harvest|inspector-book-link/);
  assert.match(markup, /garden-plan-rail/);
});

test('portrait entry requests mount the exact species spread immediately, preserving hidden Plant identities', () => {
  const garden = createGarden();
  for (const key of ['fungus:Dewmender', 'plant:Carrot']) {
    const entry = BOOK_ENTRIES.find(e => e.key === key);
    const markup = render(Grimoire, { garden, initialEntryKey: key, onClose() {} });
    assert.ok(markup.includes(`Page ${entry.page} content`));
    assert.doesNotMatch(markup, /cg-turn-leaf/);
    if (key.startsWith('plant:')) assert.doesNotMatch(markup, /Carrot illustration|>Carrot</);
  }
});

test('the hover card contains no image, repeated ownership, links or buttons', () => {
  const markup = render(Tooltip, { item: { type: 'spore', name: 'Dewmender Spores', species: 'Dewmender', quantity: 8 },
    anchor: { left: 1000, right: 1080, top: 200 }, ledger: createGrimoire(), id: 'test-tooltip' });
  assert.match(markup, /role="tooltip"/);
  assert.doesNotMatch(markup, /<button|<img|<a |Owned|Hover item for details/);
});
