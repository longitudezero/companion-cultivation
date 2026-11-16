import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { createGarden, ensureInventorySlots, stagePlanting, moveStagedPlanting, applyStaging,
  advanceGardenTime, PLANTS, FUNGI, makePlant, makeFungus, placeObject, calculateEnvironment, calculateCultivation,
  grantSourceItem, placeSourceItem, grantBlockerItem, placeBlockerItem, BLOCKER_DESIGNS,
  setBaseline, CONDITIONS } from '../src/core/index.js';
import { createTutorialGarden, claimTask, FIRST_TASK } from '../src/core/tasks.js';
import { restoreStagingPlan, harvestLandmarks, itemCategory } from '../src/ui/garden-model.js';
import { HEX_SIZE, HEX_GAP, HEX_CENTER_STEP, HEX_ROTATION_RADIUS, HEX_ART, SIMPLE_HEX_FILLS, hexCenter, hexPolygon, gridDimensions, plantingPopoverPosition, PALETTES } from '../src/ui/hex-model.js';
import { ORGANISM_ICON_FILES } from '../src/ui/organism-art.js';
import { neighborsOf, edgeKey } from '../src/core/grid.js';

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
  assert.doesNotMatch(markup, /View by property|garden-property-toolbar|MOISTURE SCALE/);
  assert.doesNotMatch(markup, /class="sidebar sidebar-left|class="harvest-button"|>Sow Seeds<|>Sow Spores</);
  assert.match(markup, /aria-label="Filter inventory"/);
  assert.doesNotMatch(markup, /inventory-type-badge/);
  assert.match(markup, /Beanstalk Seeds, 36 owned, square 1/);
  assert.doesNotMatch(markup, /class="inventory-square\s+is-held"/, 'empty slots never inherit an undefined held item');
  assert.match(markup, /ui\/hexes\/organisms\/beanstalk.webp/);
  assert.match(markup, /aria-label="Bag 1"/);
  assert.doesNotMatch(markup, /aria-label="Bag [2-4]"/);
  assert.match(markup, /role="tablist" aria-label="Inventory bags"/);
  assert.match(markup, /role="tab"[^>]*aria-label="Bag 1"[^>]*aria-selected="true"/);
  assert.ok(markup.indexOf('inventory-bags') > markup.indexOf('inventory-square-grid'));
  assert.doesNotMatch(markup, /aria-label="Inventory pages"/);
  assert.match(markup, /aria-label="Choose a game save file"/);
});

test('the inspector keeps the full organism illustration for a close look', () => {
  const garden = placeObject(createGarden(3, 3), '0,0', makePlant('Carrot'));
  const markup = inspector(garden);
  assert.match(markup, /illustrations\/plants\/carrot.webp/);
  assert.doesNotMatch(markup, /ui\/hexes\/organisms\/carrot.webp/);
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
  assert.match(menu, /Simplified hex fills<\/span><input type="checkbox" aria-describedby="hex-fill-setting-help"\/>/);
  const simple = render(MainMenu, { ...props, simplifiedHexFills: true, stagedCount: 2 });
  assert.match(simple, /Simplified hex fills<\/span><input type="checkbox" aria-describedby="hex-fill-setting-help" checked=""\/>/,
    'terrain style remains available while plantings are staged');
  assert.match(simple, /Simple terrain textures/);
});

test('directional planting previews show a rotation handle without changing the garden', () => {
  const garden = createGarden();
  const before = JSON.stringify(garden);
  const props = { garden, simulation: calculateEnvironment(garden), tool: 'inspect', selection: { type: 'hex', key: '0,0' } };
  const preview = { key: '0,0', kind: 'fungus', species: 'Emberbolete', heading: 4, quantity: 3 };
  const markup = render(HexGrid, { ...props, plantingPreview: preview });
  assert.match(markup, /Rotate planting direction/);
  assert.match(markup, /planting-preview-glyph/);
  assert.doesNotMatch(render(HexGrid, { ...props, plantingPreview: { ...preview, species: 'Mycelord' } }), /Rotate planting direction/);
  assert.equal(JSON.stringify(garden), before);
  assert.deepEqual(garden.staged, {});
});


test('both terrain styles present resolved moisture, temperature and illumination simultaneously', () => {
  for (const simplifiedHexFills of [false, true]) for (const moisture of CONDITIONS.Moisture) for (const temperature of CONDITIONS.Temperature) for (const illumination of CONDITIONS.Illumination) {
    let garden = createGarden(3, 3);
    for (const [property, value] of [['Moisture', moisture], ['Temperature', temperature], ['Illumination', illumination]]) {
      garden = setBaseline(garden, '0,0', property, value);
    }
    const simulation = calculateEnvironment(garden), conditions = simulation.conditions['0,0'];
    const markup = render(HexGrid, { garden, simulation, simplifiedHexFills, tool: 'inspect', selection: { type: 'hex', key: '0,0' } });
    const cell = markup.split('data-garden-hex="0,0"')[1].split('data-garden-hex=')[0];
    assert.ok(cell.includes(`Moisture ${conditions.Moisture}; Temperature ${conditions.Temperature}; Illumination ${conditions.Illumination}`));
    const fills = simplifiedHexFills ? SIMPLE_HEX_FILLS : HEX_ART.Moisture;
    assert.ok(cell.includes(`ui/hexes/${fills[conditions.Moisture]}`), 'resolved moisture selects the chosen terrain style');
    const otherFills = simplifiedHexFills ? HEX_ART.Moisture : SIMPLE_HEX_FILLS;
    assert.ok(!cell.includes(`ui/hexes/${otherFills[conditions.Moisture]}`), 'the other terrain style is not rendered underneath');
    assert.ok(cell.includes(`ui/hexes/${HEX_ART.Temperature[conditions.Temperature]}`), 'resolved temperature selects the rim artwork');
    assert.ok(cell.indexOf('hex-moisture-art') < cell.indexOf('hex-temperature-art'));
    assert.ok(cell.indexOf('hex-temperature-art') < cell.indexOf('hex-selection'), 'selection stays above the illustrated rim');
    const lightFile = { Dark: 'illumination-dark.webp', Dim: 'illumination-dim.webp', Lit: 'illumination-lit.webp', Bright: 'illumination-bright.webp' }[conditions.Illumination];
    assert.ok(cell.includes(`ui/illumination/${lightFile}`));
    assert.ok(cell.includes(`data-illumination="${conditions.Illumination}"`), 'illumination is represented by its distinct state icon');
    assert.ok(!cell.includes('hex-meter-light'), 'illumination no longer competes with growth as a second bar');
    assert.ok(!cell.includes('class="hex-label"'), 'moisture is communicated by the terrain fill rather than repeated text');
    assert.ok(cell.includes('class="hex-selection"'), 'selection keeps a separate inset ring');
  }
  assert.equal(PALETTES.Temperature.Freezing, '#fff5e4');
  assert.notEqual(PALETTES.Temperature.Freezing, PALETTES.Temperature.Cold);
});

test('living organisms use the lower edge growth meter and the freed central space', () => {
  const garden = placeObject(createGarden(3, 3), '0,0', { ...makePlant('Beanstalk'), progress: 136 });
  const markup = render(HexGrid, { garden, simulation: calculateEnvironment(garden), tool: 'inspect', selection: { type: 'hex', key: '0,0' } });
  const occupied = markup.split('data-garden-hex="0,0"')[1].split('data-garden-hex=')[0];
  const empty = markup.split('data-garden-hex="1,0"')[1].split('data-garden-hex=')[0];
  assert.ok(occupied.includes('data-growth-meter="68"'));
  assert.ok(occupied.includes('ui/hexes/meters/growth-medallion.webp'));
  const track = /class="hex-meter-track hex-meter-growth">\s*<path d="M([\d.-]+) ([\d.-]+) L([\d.-]+) ([\d.-]+)"[^>]*stroke-width="([\d.]+)"/.exec(occupied);
  assert.ok(track);
  const [, x1, y1, x2, y2, width] = track.map(Number);
  assert.ok(Math.abs((y2 - y1) / (x2 - x1) - Math.tan(Math.PI / 6)) < .002, 'growth bar is parallel to the illustrated lower-left edge');
  assert.equal(width, 14.4, 'growth bar remains readable when the garden is zoomed out');
  const illustratedEdgeY = x1 / Math.sqrt(3) + 48;
  const perpendicularInset = (illustratedEdgeY - y1 - .8) * Math.cos(Math.PI / 6);
  assert.ok(perpendicularInset >= width / 2, 'growth bar sits inside rather than across the illustrated rim');
  assert.match(occupied, /class="hex-meter-fill"[^>]*stroke-width="4.3"/);
  assert.match(occupied, /class="hex-organism-art"[^>]*width="50" height="50"/);
  assert.ok(!empty.includes('data-growth-meter='));
  assert.ok(!empty.includes('growth-medallion.webp'));
});

test('every Plant and Fungus uses its packaged hex icon', async () => {
  const species = [...Object.keys(PLANTS), ...Object.keys(FUNGI)];
  assert.equal(species.length, 73);
  assert.equal(ORGANISM_ICON_FILES.size, species.length);
  for (const name of species) {
    const file = ORGANISM_ICON_FILES.get(name);
    assert.ok(file, `${name}: registered icon`);
    const bytes = await readFile(new URL(`../public/ui/hexes/organisms/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', name);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', name);
    const object = PLANTS[name] ? makePlant(name) : makeFungus(name);
    const garden = placeObject(createGarden(3, 3), '0,0', object);
    const markup = render(HexGrid, { garden, simulation: calculateEnvironment(garden), tool: 'inspect', selection: { type: 'hex', key: '0,0' } });
    const occupied = markup.split('data-garden-hex="0,0"')[1].split('data-garden-hex=')[0];
    assert.ok(occupied.includes(`ui/hexes/organisms/${file}`), name);
    assert.ok(!occupied.includes('organism-glyph'), `${name}: no fallback glyph`);
  }
});

test('every Blocker uses its matching art in the garden and Inspector', () => {
  for (const design of BLOCKER_DESIGNS) for (const form of ['edge', 'hex']) {
    const id = `blocker:${design.id}:${form}`;
    let garden = grantBlockerItem(createGarden(3, 3), id);
    const target = form === 'edge' ? { type: 'edge', a: '0,0', b: '1,0' } : { type: 'hex', key: '0,0' };
    garden = placeBlockerItem(garden, id, target);
    const selection = form === 'edge' ? { ...target, id: edgeKey(target.a, target.b) } : target;
    const file = `${design.id}-${form === 'edge' ? 'edge' : 'full'}.webp`;
    const grid = render(HexGrid, { garden, simulation: calculateEnvironment(garden), tool: 'inspect', selection });
    assert.ok(grid.includes(`ui/blockers/${file}`), `${design.name} ${form}: garden art`);
    assert.ok(grid.includes(form === 'edge' ? 'edge-blocker-art' : 'hex-blocker-art'), `${design.name} ${form}: art class`);
    const detail = render(GardenInspector, { garden, selection, simulation: calculateEnvironment(garden),
      cultivation: calculateCultivation(garden) });
    assert.ok(detail.includes(`ui/blockers/${file}`), `${design.name} ${form}: Inspector art`);
    assert.ok(detail.includes('portrait-blocker'), `${design.name} ${form}: Inspector portrait`);
  }
});

test('edge Blockers face the top of the lower hex without flipping side borders', () => {
  let garden = grantBlockerItem(createGarden(3, 3), 'blocker:root-barrier:edge', 2);
  garden = placeBlockerItem(garden, 'blocker:root-barrier:edge', { type: 'edge', a: '0,0', b: '0,1' });
  garden = placeBlockerItem(garden, 'blocker:root-barrier:edge', { type: 'edge', a: '0,0', b: '1,0' });
  const markup = render(HexGrid, { garden, simulation: calculateEnvironment(garden), tool: 'inspect', selection: { type: 'hex', key: '0,0' } });
  const transforms = [...markup.matchAll(/<image[^>]*class="edge-blocker-art"[^>]*>/g)]
    .map(match => /transform="([^"]+)"/.exec(match[0])?.[1]);
  assert.equal(transforms.length, 2);
  assert.equal(transforms.filter(transform => transform.includes('scale(1 -1)')).length, 1);
  assert.equal(transforms.filter(transform => !transform.includes('scale(')).length, 1);
  const illustratedEdges = [...markup.matchAll(/<g class="edge-group is-blocked has-player-blocker">([\s\S]*?)<\/g>/g)];
  assert.equal(illustratedEdges.length, 2);
  for (const edge of illustratedEdges) assert.equal((edge[1].match(/<line/g) || []).length, 1, 'only the transparent interaction line remains');
});

test('the inspector uses the same distinct illumination icons as the garden', () => {
  const files = { Dark: 'illumination-dark.webp', Dim: 'illumination-dim.webp', Lit: 'illumination-lit.webp', Bright: 'illumination-bright.webp' };
  for (const [illumination, file] of Object.entries(files)) {
    let garden = createGarden(3, 3);
    for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Illumination', illumination);
    const markup = inspector(garden);
    assert.ok(markup.includes(`ui/illumination/${file}`), illumination);
    assert.match(markup, new RegExp(`Illumination</span><strong>${illumination}</strong>`));
  }
});

test('every condition and terrain style has an available WebP hex asset', async () => {
  for (const [property, assets] of [['Moisture', HEX_ART.Moisture], ['Moisture', SIMPLE_HEX_FILLS], ['Temperature', HEX_ART.Temperature]]) for (const condition of CONDITIONS[property]) {
    const file = assets[condition];
    assert.ok(file, `${property}: ${condition}`);
    const bytes = await readFile(new URL(`../public/ui/hexes/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
  for (const file of ['growth-medallion.webp']) {
    const bytes = await readFile(new URL(`../public/ui/hexes/meters/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
  for (const file of ['illumination-dark.webp', 'illumination-dim.webp', 'illumination-lit.webp', 'illumination-bright.webp']) {
    const bytes = await readFile(new URL(`../public/ui/illumination/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
});

test('enlarged grid bounds contain every hex and directional handle on supported plot sizes', () => {
  for (const columns of [3, 4, 9, 20]) for (const rows of [3, 4, 7, 20]) {
    const garden = createGarden(columns, rows), world = gridDimensions(garden);
    for (const key of Object.keys(garden.hexes)) {
      const center = hexCenter(key), halo = HEX_ROTATION_RADIUS + 17;
      assert.ok(center.x - halo >= 0 && center.y - halo >= 0);
      assert.ok(center.x + halo <= world.width && center.y + halo <= world.height);
      for (const point of hexPolygon(center).split(' ')) {
        const [x, y] = point.split(',').map(Number);
        assert.ok(x >= 0 && x <= world.width && y >= 0 && y <= world.height);
      }
      for (const neighbor of neighborsOf(key)) {
        const other = hexCenter(neighbor);
        assert.ok(Math.abs(Math.hypot(other.x-center.x, other.y-center.y) - HEX_CENTER_STEP) < 1e-8);
        assert.equal(HEX_CENTER_STEP, Math.sqrt(3)*HEX_SIZE + HEX_GAP);
      }
    }
  }
});

test('Blocker artwork uses the added garden gap and fills an occupied hex', async () => {
  let garden = grantBlockerItem(createGarden(), 'blocker:root-barrier:hex');
  garden = placeBlockerItem(garden, 'blocker:root-barrier:hex', { type: 'hex', key: '1,1' });
  const simulation = calculateEnvironment(garden);
  const markup = renderToStaticMarkup(React.createElement(HexGrid, { garden, simulation, tool: 'inspect',
    selection: { type: 'hex', key: '1,1' }, onHexClick() {}, onEdgeClick() {} }));
  assert.match(markup, /class="hex-blocker-art"/);
  assert.match(markup, /hex-cell has-player-blocker/);
  assert.match(markup, /width="88" height="88"/);
  assert.ok(HEX_GAP > 0);
});

test('the quantity selector clears the full rotation handle as zoom and viewport change', () => {
  for (const zoom of [.5, 1, 1.5, 3]) for (const centerX of [280, 680, 1100]) {
    const width = Math.sqrt(3)*HEX_SIZE*zoom, height = 2*HEX_SIZE*zoom;
    const popup = plantingPopoverPosition({ left: centerX-width/2, top: 180, width, height }, { width: 1363, height: 936 });
    const halo = (HEX_ROTATION_RADIUS+17)*zoom;
    assert.ok(popup.x >= 12 && popup.x+270 <= 1351);
    assert.ok(popup.x >= centerX+halo || popup.x+270 <= centerX-halo);
  }
  const mobile = plantingPopoverPosition({ left: 100, top: 300, width: 83, height: 96 }, { width: 320, height: 640 });
  assert.ok(mobile.x >= 12 && mobile.x+270 <= 308);
});
