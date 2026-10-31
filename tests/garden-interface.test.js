import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { createGarden, ensureInventorySlots, stagePlanting, moveStagedPlanting, applyStaging,
  advanceGardenTime, PLANTS, makePlant, makeFungus, placeObject, calculateEnvironment, calculateCultivation,
  grantSourceItem, placeSourceItem } from '../src/core/index.js';
import { restoreStagingPlan, harvestLandmarks, itemCategory } from '../src/ui/garden-model.js';

test('Undo restores proposals after live growth and spending without restoring an old garden', () => {
  let garden = ensureInventorySlots(createGarden());
  garden = stagePlanting(garden, '0,0', 'plant', 'Beanstalk', 3);
  garden = applyStaging(garden, () => 0).garden;
  garden = stagePlanting(garden, '1,0', 'plant', 'Beanstalk', 4);
  const snapshot = garden.staged;
  garden = moveStagedPlanting(garden, '1,0', '2,0');
  garden = advanceGardenTime(garden, 8).garden;
  const before = JSON.stringify(garden);
  const restored = restoreStagingPlan(garden, snapshot);
  assert.deepEqual(restored.staged, snapshot);
  for (const key of Object.keys(garden).filter(key => key !== 'staged')) assert.deepEqual(restored[key], garden[key], key);
  assert.equal(restored.inventory.seeds.Beanstalk, 13);
  assert.ok(restored.objects['0,0'], 'previously applied cohort germinated while planning');
  assert.equal(restored.clockHours, 8);
  assert.equal(JSON.stringify(garden), before);
});

test('an invalid Undo cannot overwrite a new occupant or spend unavailable inventory', () => {
  const snapshot = { '0,0': { kind: 'plant', species: 'Beanstalk', quantity: 3 } };
  const occupied = placeObject(createGarden(), '0,0', makePlant('Moss'));
  const before = JSON.stringify(occupied);
  assert.throws(() => restoreStagingPlan(occupied, snapshot), /already/);
  assert.equal(JSON.stringify(occupied), before);
  const empty = createGarden();
  empty.inventory.seeds.Beanstalk = 2;
  assert.throws(() => restoreStagingPlan(empty, snapshot), /available/);
});

test('the timing guide preserves native plateaus, multiple peaks, sterility and special harvests', () => {
  assert.deepEqual(harvestLandmarks('Charmomile').filter(m => m.kind === 'leaf'), [{ kind: 'leaf', from: 110, to: 175 }]);
  assert.deepEqual(harvestLandmarks('Rosewraith').filter(m => m.kind === 'leaf').map(m => m.from), [115, 180]);
  assert.equal(harvestLandmarks('Orchidemon').some(m => m.kind === 'seed'), false);
  assert.deepEqual(harvestLandmarks('Bamboozled'), [{ kind: 'trophy', from: 100, to: 200 }]);
  for (const species of Object.keys(PLANTS)) for (const marker of harvestLandmarks(species)) {
    assert.ok(marker.from >= 0 && marker.from <= marker.to && marker.to <= 200, species);
  }
});

test('peak landmarks follow current canonical timing shifts without granting discoveries', () => {
  const conditions = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' };
  const base = harvestLandmarks('Beanstalk');
  const changed = harvestLandmarks('Beanstalk', [{ kind: 'leafPeakTiming', amount: -8 }, { kind: 'seedTiming', amount: -10 }], conditions);
  assert.equal(changed.find(m => m.kind === 'leaf').from, base.find(m => m.kind === 'leaf').from - 8);
  assert.deepEqual(changed.find(m => m.kind === 'seed'), { kind: 'seed', from: 190, to: 200 });
  assert.equal(itemCategory({ type: 'source-item' }), 'item');
  assert.equal(itemCategory({ type: 'leaf' }), 'leaf');
});

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(root, 'node_modules', '.garden-interface-'));
let App, GardenInspector, LifecycleBar;
try {
  await build({ entryPoints: { app: join(root, 'src/App.jsx'), inspector: join(root, 'src/ui/GardenInspector.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
  App = (await import(pathToFileURL(join(cache, 'app.js')))).default;
  const inspector = await import(pathToFileURL(join(cache, 'inspector.js')));
  GardenInspector = inspector.default;
  LifecycleBar = inspector.LifecycleBar;
} finally { await rm(cache, { recursive: true, force: true }); }
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const inspector = garden => render(GardenInspector, { garden, selection: { type: 'hex', key: '0,0' },
  simulation: calculateEnvironment(garden), cultivation: calculateCultivation(garden) });

test('ordinary play has inventory, a bottom inspector and separate staging actions without permanent mode or Harvest buttons', () => {
  const markup = render(App);
  assert.match(markup, /aria-label="Garden inspector"/);
  assert.match(markup, /aria-label="Garden inventory"/);
  assert.match(markup, />Apply<\/button>/);
  assert.match(markup, />Undo<\/button>/);
  assert.match(markup, />Cancel<\/button>/);
  assert.doesNotMatch(markup, /class="sidebar sidebar-left|class="harvest-button"|>Sow Seeds<|>Sow Spores</);
  assert.match(markup, /aria-label="Filter inventory"/);
  assert.match(markup, /inventory-type-badge/);
  assert.doesNotMatch(markup, /class="inventory-square\s+is-held"/, 'empty slots never inherit an undefined held item');
  assert.match(markup, /Beanstalk illustration|illustrations\/plants\/beanstalk.webp/);
});

test('125% fills 62.5% of the whole lifecycle and displays harvest landmarks immediately', () => {
  const object = { ...makePlant('Charmomile'), progress: 125 };
  const markup = render(LifecycleBar, { object, contacts: [], conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' } });
  assert.match(markup, /aria-valuemax="200"/);
  assert.match(markup, /aria-valuenow="125"/);
  assert.match(markup, /width:62.5%/);
  assert.match(markup, /Leaf peak · 110–175%/);
  assert.match(markup, /Seed peak · 200%/);
});

test('pending inspection never distinguishes success from failure or reveals a species plate', () => {
  const garden = createGarden();
  const pending = { kind: 'plant', species: 'Carrot', quantity: 3, readyAt: 6 };
  const success = inspector({ ...garden, pending: { '0,0': { ...pending, success: true } } });
  const failure = inspector({ ...garden, pending: { '0,0': { ...pending, success: false } } });
  assert.equal(success, failure);
  assert.match(success, /outcome is still concealed/);
  assert.doesNotMatch(success, /illustrations\/plants|Leaf peak|Carrot illustration/);
});

test('Fungi and temporary items have their own production and timer views', () => {
  const fungus = inspector(placeObject(createGarden(), '0,0', makeFungus('Dewmender')));
  assert.match(fungus, /Spores now/);
  assert.doesNotMatch(fungus, /Leaves now|Seed peak/);
  let garden = grantSourceItem(createGarden(), 'ember-pebble');
  const id = Object.keys(garden.inventory.sourceItems)[0];
  garden = placeSourceItem(garden, id, '0,0');
  const item = inspector(garden);
  assert.match(item, /Active time remaining/);
  assert.match(item, /Return item to inventory/);
});
