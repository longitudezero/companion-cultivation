import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createGarden, makePlant, makeFungus, placeObject, advanceGardenTime,
  calculateEnvironment, calculateCultivation, FUNGI, observeFungalAction } from '../src/core/index.js';
import { TRANSFORMATIONS } from '../src/core/transformations.js';
import { inspectorInfluences, influencePage, learnedRecipe } from '../src/ui/inspector-model.js';
import { transformationClue } from '../src/ui/garden-model.js';

test('every Fungus has public effect cards without requiring a Plant response discovery', () => {
  for (const species of Object.keys(FUNGI)) {
    const garden = placeObject(createGarden(), '0,0', makeFungus(species));
    const cards = inspectorInfluences(garden, '0,0', calculateEnvironment(garden), calculateCultivation(garden));
    assert.ok(cards.length, species);
    assert.ok(cards.every(card => card.title && card.summary && card.lines.length), species);
  }
});

test('Plant cultivation cards require both a witnessed response and current reaching contact', () => {
  let garden = placeObject(createGarden(), '0,0', makePlant('Beanstalk'));
  garden = placeObject(garden, '1,0', makeFungus('Prismorel', 3));
  const effects = () => inspectorInfluences(garden, '0,0', calculateEnvironment(garden), calculateCultivation(garden));
  assert.ok(!effects().some(card => card.source === 'Prismorel'));
  garden = { ...garden, grimoire: observeFungalAction(garden.grimoire, 'Beanstalk', 'Prismorel', 'leafPeakTiming', -1) };
  assert.ok(effects().some(card => card.source === 'Prismorel' && card.summary === 'Earlier'));
  garden = { ...garden, objects: { '0,0': garden.objects['0,0'] } };
  assert.ok(!effects().some(card => card.source === 'Prismorel'));
});

test('card pages preserve all effects across column counts and clamp after effects disappear', () => {
  const cards = Array.from({ length: 17 }, (_, id) => ({ id }));
  for (const columns of [1, 2, 3]) {
    const pages = influencePage(cards, 0, columns).count;
    assert.deepEqual(Array.from({ length: pages }, (_, page) => influencePage(cards, page, columns).cards).flat(), cards);
    assert.equal(influencePage(cards.slice(0, 1), pages, columns).current, 0);
  }
});

test('learned requirements preserve AND/OR groups without exposing unwitnessed alternatives', () => {
  const route = TRANSFORMATIONS.Chamomeleon[0];
  const known = learnedRecipe(route, [{ from: 'Chamomeleon', into: route.into, fungi: ['Rilllace'] }]);
  assert.match(known.details, /Rilllace/);
  assert.doesNotMatch(JSON.stringify(known), /Frostfolio/);
  const two = learnedRecipe(TRANSFORMATIONS.Charmomile[0], [{ from: 'Charmomile', fungi: ['Rilllace', 'Hushroom'] }]);
  assert.ok(two.requirements.includes('Contact: Rilllace + Hushroom'));
});

test('known sequence details retain preparation timing while current progress uses the crossing window', () => {
  const recipe = TRANSFORMATIONS.Orchiwitch[0];
  const known = learnedRecipe({ ...recipe, phase: 'crossing', hours: 8 }, [{ from: 'Orchiwitch', fungi: ['Prismorel'] }]);
  assert.ok(known.requirements.some(line => line.includes('Bright')));
  assert.ok(known.requirements.includes('Finish within 40s at 1×'));
  assert.match(known.details, /for 50s/);
  assert.doesNotMatch(known.details, /Mistruffle/);
  const recovery = learnedRecipe(TRANSFORMATIONS.Aloechemist[0], [{ from: 'Aloechemist', fungi: ['Rilllace'] }]);
  assert.ok(recovery.requirements.includes('Hot exposure: under 3m at 1×'));
});

test('witnessing one route does not disclose another active route from the same Plant', () => {
  let garden = placeObject(createGarden(), '0,0', makePlant('Beanstalk'));
  garden = placeObject(garden, '1,0', makeFungus('Prismorel', 3));
  garden = advanceGardenTime(garden, 3).garden;
  garden.grimoire = { ...garden.grimoire, transformations: [{ from: 'Beanstalk', into: 'Rice', fungi: ['Dewmender'] }] };
  assert.deepEqual(transformationClue(garden, '0,0', calculateEnvironment(garden), calculateCultivation(garden)), { active: true, learned: [] });
});

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(root, 'node_modules', '.inspector-segments-'));
let Inspector, App;
try {
  await build({ entryPoints: { inspector: join(root, 'src/ui/GardenInspector.jsx'), app: join(root, 'src/App.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
  Inspector = (await import(pathToFileURL(join(cache, 'inspector.js')))).default;
  App = (await import(pathToFileURL(join(cache, 'app.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }
const inspect = garden => renderToStaticMarkup(React.createElement(Inspector, { garden, selection: { type: 'hex', key: '0,0' },
  simulation: calculateEnvironment(garden), cultivation: calculateCultivation(garden) }));

test('inspector order is logical and the unknown Transformation segment contains only its atmospheric cue', () => {
  let garden = placeObject(createGarden(), '0,0', makePlant('Beanstalk'));
  let markup = inspect(garden);
  const order = ['inspector-portrait', 'inspector-environment', 'inspector-growth', 'inspector-influences'].map(name => markup.indexOf(name));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.doesNotMatch(markup, /inspector-transformation|Growing preferences and Transformation recipes|influence-breakdown/);
  garden = placeObject(garden, '1,0', makeFungus('Prismorel', 3));
  garden = advanceGardenTime(garden, 3).garden;
  markup = inspect(garden);
  assert.ok(markup.indexOf('inspector-transformation') > markup.indexOf('inspector-influences'));
  const segment = markup.slice(markup.indexOf('inspector-transformation'));
  assert.match(segment, /Unusual botanical activity…/);
  assert.match(segment, /transformation-sprout.webp/);
  assert.doesNotMatch(segment, /Carrot|Rice|Prismorel|progressbar|Contact:|Hold /);
});

test('simulation controls belong to the garden HUD and the empty inventory caption is removed', () => {
  const markup = renderToStaticMarkup(React.createElement(App));
  assert.doesNotMatch(markup, /class="topbar"/);
  assert.match(markup, /aria-label="Garden navigation"/);
  assert.ok(markup.indexOf('Simulation speed') > markup.indexOf('garden-view-controls'));
  assert.doesNotMatch(markup, /Seeds, Spores &amp; field supplies/);
});
