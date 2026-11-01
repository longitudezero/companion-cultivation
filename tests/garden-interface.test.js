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
import { createTutorialGarden, claimTask, FIRST_TASK } from '../src/core/tasks.js';
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
let App, GardenInspector, LifecycleBar, MainMenu, HexGrid;
try {
  await build({ entryPoints: { app: join(root, 'src/App.jsx'), inspector: join(root, 'src/ui/GardenInspector.jsx'), menu: join(root, 'src/ui/MainMenu.jsx'), hex: join(root, 'src/HexGrid.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
  App = (await import(pathToFileURL(join(cache, 'app.js')))).default;
  const inspector = await import(pathToFileURL(join(cache, 'inspector.js')));
  GardenInspector = inspector.default;
  LifecycleBar = inspector.LifecycleBar;
  MainMenu = (await import(pathToFileURL(join(cache, 'menu.js')))).default;
  HexGrid = (await import(pathToFileURL(join(cache, 'hex.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const inspector = garden => render(GardenInspector, { garden, selection: { type: 'hex', key: '0,0' },
  simulation: calculateEnvironment(garden), cultivation: calculateCultivation(garden) });

test('ordinary play has bottom navigation and hides empty staging and menu controls', () => {
  const markup = render(App);
  assert.match(markup, /aria-label="Garden inspector"/);
  assert.match(markup, /aria-label="Garden inventory"/);
  assert.doesNotMatch(markup, /aria-label="Planting plan"|>Apply<|>Undo<|>Cancel</);
  assert.doesNotMatch(markup, /class="topbar"|>Save Game<|>Load Game<|>Display developer tools</);
  for (const label of ['Open main menu', 'Open Cultivation Grimoire', 'Open Taskboard', 'Open Shop']) assert.match(markup, new RegExp(`aria-label="${label}"`));
  assert.match(markup, /aria-label="Garden navigation"/);
  assert.doesNotMatch(markup, /class="sidebar sidebar-left|class="harvest-button"|>Sow Seeds<|>Sow Spores</);
  assert.match(markup, /aria-label="Filter inventory"/);
  assert.doesNotMatch(markup, /inventory-type-badge/);
  assert.match(markup, /Beanstalk Seeds, 36 owned, square 1/);
  assert.doesNotMatch(markup, /class="inventory-square\s+is-held"/, 'empty slots never inherit an undefined held item');
  assert.match(markup, /Beanstalk illustration|illustrations\/plants\/beanstalk.webp/);
  for (const bag of [1, 2, 3, 4]) assert.match(markup, new RegExp(`aria-label="Bag ${bag}"`));
  assert.match(markup, /role="tablist" aria-label="Inventory bags"/);
  assert.match(markup, /role="tab"[^>]*aria-label="Bag 1"[^>]*aria-selected="true"/);
  assert.ok(markup.indexOf('inventory-bags') > markup.indexOf('inventory-square-grid'));
  assert.doesNotMatch(markup, /aria-label="Inventory pages"/);
  assert.match(markup, /aria-label="Choose a game save file"/);
});

test('125% fills 62.5% of the whole lifecycle and displays harvest landmarks immediately', () => {
  const object = { ...makePlant('Charmomile'), progress: 125 };
  const markup = render(LifecycleBar, { object, contacts: [], conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' } });
  assert.match(markup, /aria-valuemax="200"/);
  assert.match(markup, /aria-valuenow="125"/);
  assert.match(markup, /width:62.5%/);
  assert.match(markup, /Leaf peak · 110–175%/);
  assert.match(markup, /Seed peak · 200%/);
  assert.doesNotMatch(markup, /harvest-guide-key|Current timing · harvest amounts reflect cultivation/);
});

test('pending inspection never distinguishes success from failure or reveals a species plate', () => {
  const garden = createGarden();
  const pending = { kind: 'plant', species: 'Carrot', quantity: 3, readyAt: 6 };
  const success = inspector({ ...garden, pending: { '0,0': { ...pending, success: true } } });
  const failure = inspector({ ...garden, pending: { '0,0': { ...pending, success: false } } });
  assert.equal(success, failure);
  assert.match(success, /Germinating…/);
  assert.doesNotMatch(success, /outcome is still concealed|Result in approximately/);
  assert.doesNotMatch(success, /illustrations\/plants|Leaf peak|Carrot illustration/);
});

test('Fungi and temporary items have their own production and timer views', () => {
  const fungus = inspector(placeObject(createGarden(), '0,0', makeFungus('Dewmender')));
  assert.match(fungus, /Spores now/);
  assert.match(fungus, /moisture-damp.webp/);
  assert.doesNotMatch(fungus, /Leaves now|Seed peak/);
  let garden = grantSourceItem(createGarden(), 'ember-pebble');
  const id = Object.keys(garden.inventory.sourceItems)[0];
  garden = placeSourceItem(garden, id, '0,0');
  const item = inspector(garden);
  assert.match(item, /Active time remaining/);
  assert.match(item, /Return item to inventory/);
});

test('the warned exposure bar retains the actual accumulated timer and limit', () => {
  let garden = createTutorialGarden();
  garden = stagePlanting(garden, '1,1', 'plant', 'Beanstalk', 4);
  garden = stagePlanting(garden, '0,1', 'fungus', 'Prismorel', 4);
  garden = advanceGardenTime(applyStaging(garden, () => 0).garden, 16).garden;
  garden = advanceGardenTime(claimTask(garden, FIRST_TASK), 24).garden;
  const markup = render(GardenInspector, { garden, selection: { type: 'hex', key: '1,1' },
    simulation: calculateEnvironment(garden), cultivation: calculateCultivation(garden), simulationSpeed: 1 });
  assert.match(markup, /ui\/warning.webp/);
  assert.match(markup, new RegExp(`class="rune-progress rune-progress-danger"[^>]*aria-label="Carrot Dry exposure"[^>]*aria-valuemax="${PLANTS.Carrot.dryDeath}"[^>]*aria-valuenow="${garden.objects['1,1'].exposure.Dry}"`));
});


test('main menu keeps system actions ordered and protects an existing planting plan', () => {
  const props = { developerTools: false, stagingEnabled: true, stagedCount: 0, elapsed: '0s', autosaveStatus: 'Autosaved' };
  const menu = render(MainMenu, props);
  assert.match(menu, /aria-label="Main menu"/);
  assert.match(menu, /alt="Companion Cultivation"/);
  const actions = ['New garden', 'Load Game', 'Save Game', 'Display developer tools', 'How it works'];
  for (let i = 1; i < actions.length; i++) assert.ok(menu.indexOf(actions[i-1]) < menu.indexOf(actions[i]));
  const planning = render(MainMenu, { ...props, stagedCount: 2 });
  assert.match(planning, /type="checkbox"[^>]*disabled/);
  assert.match(planning, /Apply or cancel your current plan/);
  const direct = render(MainMenu, { ...props, stagingEnabled: false });
  assert.match(direct, /Confirm an amount to plant immediately/);
});

test('directional planting previews show a rotation handle without changing the garden', () => {
  const garden = createGarden();
  const before = JSON.stringify(garden);
  const props = { garden, simulation: calculateEnvironment(garden), overlay: 'Moisture', tool: 'inspect', selection: { type: 'hex', key: '0,0' } };
  const preview = { key: '0,0', kind: 'fungus', species: 'Emberbolete', heading: 4, quantity: 3 };
  const markup = render(HexGrid, { ...props, plantingPreview: preview });
  assert.match(markup, /Rotate planting direction/);
  assert.match(markup, /planting-preview-glyph/);
  assert.doesNotMatch(render(HexGrid, { ...props, plantingPreview: { ...preview, species: 'Mycelord' } }), /Rotate planting direction/);
  assert.equal(JSON.stringify(garden), before);
  assert.deepEqual(garden.staged, {});
});
