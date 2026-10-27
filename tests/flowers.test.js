import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONDITIONS, PLANTS, createGarden, makePlant, makeFungus, makeSource, makeInfluence,
  placeObject, setBaseline, placeEdgeBlocker, makeBlocker, neighborsOf,
  calculateEnvironment, calculateCultivation, namedFungalContacts, transformationStatus,
  TRANSFORMATIONS, reconcileTransformationClocks, advanceGardenTime,
  accruePlantProduction, availableHarvest, harvestPlant, migrateGarden,
} from '../src/core/index.js';

const target = '4,4';
const neighbors = neighborsOf(target);
const flowerRecipes = Object.values(TRANSFORMATIONS).flat().filter(recipe =>
  PLANTS[recipe.into]?.family === 'Flowers');

function start(species = 'Daisydaze') {
  let garden = placeObject(createGarden(9, 9), target, makePlant(species));
  // Avoid unrelated extreme-illumination adjacency from a Dark neighborhood.
  for (const key of Object.keys(garden.hexes)) {
    garden = setBaseline(garden, key, 'Illumination', 'Dim');
  }
  return garden;
}

function arrange(species, recipe, alternatives = null) {
  let garden = start(species);
  const fungi = (alternatives || recipe.contacts.map(group => group[0]));
  fungi.forEach((fungus, i) => { garden = placeObject(garden, neighbors[i], makeFungus(fungus)); });
  // Compensate for each live fungal emission using ordinary baseline editing,
  // never fake a fungal contact or override the resolved Conditions.
  const modifiers = calculateEnvironment(garden).modifiers[target];
  for (const [property, wanted] of Object.entries(recipe.conditions)) {
    const possibilities = CONDITIONS[property];
    const sum = modifiers[property].reduce((n, item) => n + item.modifier, 0);
    const baselineIndex = possibilities.indexOf(wanted) - sum;
    assert.ok(baselineIndex >= 0 && baselineIndex < possibilities.length,
      `${species} -> ${recipe.into}: no legal baseline for ${property}`);
    garden = setBaseline(garden, target, property, possibilities[baselineIndex]);
  }
  return garden;
}

test('ten approved Flowers profiles and twelve distinct named-contact recipes are present', () => {
  assert.equal(Object.values(PLANTS).filter(plant => plant.family === 'Flowers').length, 10);
  assert.equal(flowerRecipes.length, 12);
  assert.equal(PLANTS.Orchidemon.seeds, 0);
  assert.equal(PLANTS['Dream Poppy'].seedSpecies, 'Poppycock');
  assert.equal(PLANTS.Rosewraith.leafPeaks.length, 2);
  assert.equal(createGarden().inventory.seeds.Daisydaze, 16);
});

test('older saved gardens gain Flower Base Seeds once, while spent Seeds stay spent', () => {
  const saved = createGarden();
  delete saved.inventory.seeds.Daisydaze;
  const original = structuredClone(saved);
  const migrated = migrateGarden(saved);
  assert.equal(migrated.inventory.seeds.Daisydaze, 16);
  assert.deepEqual(saved, original, 'migration must not mutate the old save');
  migrated.inventory.seeds.Daisydaze = 0;
  assert.equal(migrateGarden(migrated).inventory.seeds.Daisydaze, 0);
});

test('all eleven static Flowers recipes work with actual named fungal reach and exact durations', () => {
  for (const [species, recipes] of Object.entries(TRANSFORMATIONS)) {
    if (PLANTS[species]?.family !== 'Flowers') continue;
    for (const recipe of recipes.filter(r => r.contacts)) {
      const garden = arrange(species, recipe);
      const state = transformationStatus(garden, target);
      assert.deepEqual(state.filter(item => item.eligible).map(item => item.into), [recipe.into],
        `${species} -> ${recipe.into}`);
      const prior = advanceGardenTime(garden, recipe.hours - 1).garden;
      assert.equal(prior.objects[target].species, species, `${species} premature`);
      assert.equal(prior.objects[target].transformationClocks[recipe.into], recipe.hours - 1);
      const result = advanceGardenTime(prior, 1);
      assert.equal(result.garden.objects[target].species, recipe.into, `${species} -> ${recipe.into}`);
      assert.equal(result.garden.objects[target].progress, 0);
      assert.equal(result.garden.objects[target].ageHours, 0);
      assert.equal(result.garden.objects[target].production.ordinaryLeaves, 0);
      assert.equal(result.events.length, 1);
    }
  }
});

test('either accepted named Fungus works, while a similarly signed anonymous Source does not', () => {
  const recipe = TRANSFORMATIONS.Daisydaze[0];
  for (const name of recipe.contacts[0]) {
    const garden = arrange('Daisydaze', recipe, [name]);
    assert.equal(transformationStatus(garden, target).find(r => r.into === 'Charmomile').eligible, true);
    assert.equal(advanceGardenTime(garden, 12).garden.objects[target].species, 'Charmomile');
  }
  let garden = start();
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Temperature', 'Temperate');
  garden = setBaseline(garden, target, 'Illumination', 'Lit');
  garden = placeObject(garden, neighbors[0], makeSource([makeInfluence('Brightening')]));
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Charmomile').eligible, false);
});

test('conjunctive named contact requires BOTH different species', () => {
  const recipe = TRANSFORMATIONS.Lavendream.find(r => r.into === 'Orchidemon');
  let garden = arrange('Lavendream', recipe);
  const sourceKey = neighbors[1];
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Orchidemon').eligible, true);
  const objects = { ...garden.objects }; delete objects[sourceKey];
  garden = { ...garden, objects };
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Orchidemon').eligible, false);
  assert.equal(advanceGardenTime(garden, 32).garden.objects[target].species, 'Lavendream');
});

test('cultivation-only zone contact still qualifies when environmental emission is blocked', () => {
  const recipe = TRANSFORMATIONS.Lavendream.find(r => r.into === 'Orchidemon');
  let garden = arrange('Lavendream', recipe);
  for (const neighbor of neighbors) garden = placeEdgeBlocker(garden, target, neighbor, makeBlocker('kind', 'Aqueous'));
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  assert.ok(!calculateEnvironment(garden).modifiers[target].Moisture.some(effect =>
    effect.influence === 'Wetting'), 'Mistruffle environmental emission is blocked');
  assert.ok(calculateCultivation(garden)[target].some(effect => effect.species === 'Mistruffle'),
    'Mistruffle still reaches with Leaf cultivation Influence');
  assert.ok(namedFungalContacts(garden, target, calculateEnvironment(garden)).has('Mistruffle'));
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Orchidemon').eligible, true);
});

test('named contact ignores cultivation stage windows, without creating a percentage gate', () => {
  let garden = start('Charmomile');
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Temperature', 'Cold');
  garden = placeObject(garden, neighbors[0], makeFungus('Echomorel'));
  for (const neighbor of neighbors) {
    garden = placeEdgeBlocker(garden, target, neighbor, makeBlocker('kind', 'Thermal'));
  }
  const environment = calculateEnvironment(garden);
  assert.equal(environment.conditions[target].Temperature, 'Cold');
  assert.equal(environment.modifiers[target].Temperature.length, 0);
  assert.equal(garden.objects[target].progress, 0);
  const effect = calculateCultivation(garden)[target].find(item => item.species === 'Echomorel');
  assert.deepEqual(effect.window, [160, 190], 'fungal hourly Leaf effect is not yet stage-eligible');
  assert.equal(transformationStatus(garden, target).find(item => item.into === 'Marigloom').eligible, true);
});

test('continuous exposure resets on an instantaneous contact interruption', () => {
  const recipe = TRANSFORMATIONS.Daisydaze[1];
  let garden = advanceGardenTime(arrange('Daisydaze', recipe), 12).garden;
  const fungalKey = neighbors[0];
  const objects = { ...garden.objects }; delete objects[fungalKey];
  garden = reconcileTransformationClocks({ ...garden, objects }, garden);
  assert.equal(garden.objects[target].transformationClocks.Lavendream, 0);
  garden = placeObject(garden, fungalKey, makeFungus('Veilcap'));
  assert.equal(advanceGardenTime(garden, 8).garden.objects[target].species, 'Daisydaze');
});

function preparedDaisyspell() {
  let garden = start('Daisyspell');
  // A Dimming fungus on its own source hex must not create a nearby Dark
  // extreme that silently pulls Lit back to Dim via environmental adjacency.
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Illumination', 'Lit');
  garden = placeObject(garden, neighbors[0], makeFungus('Veilcap'));
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Temperature', 'Temperate');
  garden = setBaseline(garden, target, 'Illumination', 'Lit');
  assert.equal(calculateEnvironment(garden).conditions[target].Illumination, 'Dim');
  garden = advanceGardenTime(garden, 10).garden;
  assert.equal(garden.objects[target].transformationSequence.Orchidemon.phase, 'ready');
  return garden;
}

test('Daisyspell completes its 10-hour Dim preparation then Bright arrival at a zero-time event', () => {
  let garden = preparedDaisyspell();
  const before = garden;
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Illumination', 'Bright'), before);
  assert.equal(calculateEnvironment(garden).conditions[target].Illumination, 'Lit');
  assert.equal(garden.objects[target].transformationSequence.Orchidemon.phase, 'crossing');
  assert.equal(garden.objects[target].transformationSequence.Orchidemon.windowHours, 0);
  garden = reconcileTransformationClocks(placeObject(garden, neighbors[1], makeFungus('Glimmergill')), garden);
  assert.equal(calculateEnvironment(garden).conditions[target].Illumination, 'Bright');
  assert.equal(garden.objects[target].species, 'Orchidemon');
  assert.equal(garden.objects[target].progress, 0);
});

test('Daisyspell permits Bright completion at eight hours but not nine', () => {
  let atEight = preparedDaisyspell();
  atEight = reconcileTransformationClocks(setBaseline(atEight, target, 'Illumination', 'Bright'), atEight);
  atEight = advanceGardenTime(atEight, 8).garden;
  assert.equal(atEight.objects[target].transformationSequence.Orchidemon.windowHours, 8);
  atEight = reconcileTransformationClocks(placeObject(atEight, neighbors[1], makeFungus('Glimmergill')), atEight);
  assert.equal(atEight.objects[target].species, 'Orchidemon');

  let atNine = preparedDaisyspell();
  atNine = reconcileTransformationClocks(setBaseline(atNine, target, 'Illumination', 'Bright'), atNine);
  atNine = advanceGardenTime(atNine, 9).garden;
  atNine = reconcileTransformationClocks(placeObject(atNine, neighbors[1], makeFungus('Glimmergill')), atNine);
  assert.equal(atNine.objects[target].species, 'Daisyspell');
  assert.equal(atNine.objects[target].transformationSequence.Orchidemon.preparedHours, 0);
});

test('Daisyspell loses preparation on early departure or completion-phase climate break', () => {
  let garden = start('Daisyspell');
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Illumination', 'Lit');
  garden = placeObject(garden, neighbors[0], makeFungus('Veilcap'));
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Illumination', 'Lit');
  garden = advanceGardenTime(garden, 9).garden;
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Illumination', 'Bright'), garden);
  assert.equal(garden.objects[target].transformationSequence.Orchidemon.preparedHours, 0);

  let armed = preparedDaisyspell();
  armed = reconcileTransformationClocks(setBaseline(armed, target, 'Illumination', 'Bright'), armed);
  armed = reconcileTransformationClocks(setBaseline(armed, target, 'Moisture', 'Dry'), armed);
  assert.equal(armed.objects[target].transformationSequence.Orchidemon.phase, 'preparing');
});

test('migration and JSON roundtrip preserve prepared and crossing sequences safely', () => {
  const armed = preparedDaisyspell();
  assert.deepEqual(migrateGarden(structuredClone(armed)).objects[target].transformationSequence,
    armed.objects[target].transformationSequence);
  const crossing = reconcileTransformationClocks(setBaseline(armed, target, 'Illumination', 'Bright'), armed);
  assert.equal(migrateGarden(structuredClone(crossing)).objects[target].transformationSequence.Orchidemon.phase,
    'crossing');
  const forged = structuredClone(crossing);
  forged.objects[target].transformationSequence.Orchidemon.windowHours = 10_000;
  assert.equal(migrateGarden(forged).objects[target].transformationSequence.Orchidemon.windowHours, 8);
});

test('Flowers produce the specified other-species Seeds rather than same-species substitutes', () => {
  const garden = start('Lavendread');
  const mature = { ...garden, objects: { ...garden.objects,
    [target]: { ...garden.objects[target], progress: 200,
      production: { ordinaryLeaves: 0, ordinarySeeds: 24, hourlyLeaves: 0, hourlySeeds: 0 } } } };
  const harvested = harvestPlant(mature, target);
  assert.equal(harvested.inventory.seeds.Lavendream, 24);
  assert.equal(harvested.inventory.seeds.Lavendread, undefined);
  assert.equal(harvested.objects[target], undefined);
});

test('Daisyspell early bloom, Lavendream plateau and Rosewraith dual peaks are distinct', () => {
  const optimum = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' };
  const daisy = makePlant('Daisyspell');
  const before = { ...daisy, progress: 75, production: accruePlantProduction(daisy, 75, optimum) };
  assert.ok(availableHarvest(before).leaves >= 23);
  const late = { ...before, progress: 100,
    production: accruePlantProduction(before, 100, optimum) };
  assert.equal(availableHarvest(late).leaves, 0);

  const dim = { ...optimum, Illumination: 'Dim' };
  const lave = makePlant('Lavendream');
  const full = { ...lave, progress: 110, production: accruePlantProduction(lave, 110, dim) };
  assert.equal(availableHarvest(full).leaves, 13);
  const plateau = { ...full, progress: 175,
    production: accruePlantProduction(full, 175, dim) };
  assert.equal(availableHarvest(plateau).leaves, 13);

  const rose = makePlant('Rosewraith');
  const first = { ...rose, progress: 115, production: accruePlantProduction(rose, 115, dim) };
  assert.equal(availableHarvest(first).leaves, 17);
  const valley = { ...first, progress: 150,
    production: accruePlantProduction(first, 150, dim) };
  assert.ok(availableHarvest(valley).leaves < 5);
  const second = { ...valley, progress: 180,
    production: accruePlantProduction(valley, 180, dim) };
  assert.equal(availableHarvest(second).leaves, 34);
});

test('Poppycock has its approved approximate 13 Seeds at 175%; Orchidemon stays sterile', () => {
  const ideal = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' };
  const poppy = makePlant('Poppycock');
  const bank = accruePlantProduction(poppy, 175, ideal);
  assert.ok(Math.abs(bank.ordinarySeeds - 13) < 1e-8);
  const orchid = makePlant('Orchidemon');
  const fungalSeedEffect = [{ kind: 'hourlySeed', amount: 100, window: [100, 180] }];
  const sterile = accruePlantProduction(orchid, 180, ideal, fungalSeedEffect);
  assert.equal(sterile.ordinarySeeds, 0);
  assert.equal(sterile.hourlySeeds, 0);
});
