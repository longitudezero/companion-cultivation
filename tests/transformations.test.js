import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, placeObject, setBaseline, makePlant, makeFungus, makeSource,
  makeInfluence, makeBlocker, placeEdgeBlocker, neighborsOf, calculateEnvironment,
  advanceGardenTime, TRANSFORMATIONS, transformationStatus, reconcileTransformationClocks,
  migrateGarden, CONDITIONS,
} from '../src/core/index.js';

const target = '3,3';
const neighborKeys = neighborsOf(target);

function setup(plant = 'Potato') {
  return placeObject(createGarden(9, 9), target, makePlant(plant));
}

function arrange(recipe) {
  let garden = setup();
  if (recipe.into === 'Strawberry') for (const key of Object.keys(garden.hexes)) {
    garden = setBaseline(garden, key, 'Illumination', 'Lit');
  }
  recipe.contacts.forEach(([species], index) => {
    garden = placeObject(garden, neighborKeys[index], makeFungus(species,
      neighborsOf(neighborKeys[index]).indexOf(target)));
  });
  for (const moisture of CONDITIONS.Moisture) for (const temperature of CONDITIONS.Temperature) {
    for (const light of CONDITIONS.Illumination) {
      let candidate = garden;
      for (const [property, value] of Object.entries({ Moisture: moisture, Temperature: temperature,
        Illumination: light })) candidate = setBaseline(candidate, target, property, value);
      const resolved = calculateEnvironment(candidate).conditions[target];
      if (Object.entries(recipe.conditions).every(([property, value]) => resolved[property] === value)) return candidate;
    }
  }
  throw new Error(`No legal baseline found for Potato → ${recipe.into}`);
}

test('all six approved Potato routes are triggered by physically reachable living Fungi', () => {
  const recipes = TRANSFORMATIONS.Potato;
  assert.equal(recipes.length, 6);
  for (const recipe of recipes) {
    const garden = arrange(recipe);
    const env = calculateEnvironment(garden);
    const qualifying = transformationStatus(garden, target, env).filter(item => item.eligible);
    assert.deepEqual(qualifying.map(item => item.into), [recipe.into], recipe.into);
    assert.equal(env.conditions[target].Moisture, recipe.conditions.Moisture, recipe.into);

    const before = advanceGardenTime(garden, recipe.hours - 1);
    assert.equal(before.garden.objects[target].species, 'Potato');
    assert.equal(before.garden.objects[target].transformationClocks[recipe.into], recipe.hours - 1);
    assert.ok(before.garden.objects[target].progress > 0);

    const after = advanceGardenTime(before.garden, 1);
    assert.equal(after.garden.objects[target].species, recipe.into);
    assert.equal(after.garden.objects[target].progress, 0);
    assert.equal(after.garden.objects[target].ageHours, 0);
    assert.deepEqual(after.garden.objects[target].transformationClocks, {});
    assert.deepEqual(after.garden.objects[target].exposure,
      { Dry: 0, Hot: 0, Freezing: 0, Mycelial: 0 });
    assert.deepEqual(after.garden.objects[target].production,
      { ordinaryLeaves: 0, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0 });
    assert.equal(after.events.length, 1);
    assert.match(after.events[0], new RegExp(`Potato transformed into ${recipe.into}`));
    assert.deepEqual(after.garden.inventory, garden.inventory, 'Transformation cannot mint or spend inventory');
    assert.equal(advanceGardenTime(after.garden, 1).garden.objects[target].species, recipe.into,
      'newly transformed Plants cannot chain at the same timestamp');
  }
});

test('a regular environmental Source cannot satisfy fungal-emission contact', () => {
  let garden = setup();
  garden = setBaseline(garden, target, 'Moisture', 'Flooded');
  garden = placeObject(garden, neighborKeys[0], makeSource([makeInfluence('Wetting')]));
  assert.equal(calculateEnvironment(garden).conditions[target].Moisture, 'Flooded');
  assert.ok(!transformationStatus(garden, target).some(recipe => recipe.eligible));
  assert.equal(advanceGardenTime(garden, 24).garden.objects[target].species, 'Potato');
});

test('a similarly signed Fungus cannot substitute for the named recipe contact', () => {
  let garden = setup();
  garden = setBaseline(garden, target, 'Moisture', 'Flooded');
  garden = placeObject(garden, neighborKeys[0], makeFungus('Rainmorel'));
  assert.equal(transformationStatus(garden, target).find(recipe => recipe.into === 'Rice').eligible, false);
  assert.equal(advanceGardenTime(garden, 24).garden.objects[target].species, 'Potato');
});

test('blocking the actual fungal footprint prevents transformation contact', () => {
  let garden = arrange(TRANSFORMATIONS.Potato[0]);
  for (const next of neighborKeys) garden = placeEdgeBlocker(garden, target, next, makeBlocker());
  // Set the environment independently to isolate actual contact reach.
  garden = setBaseline(garden, target, 'Moisture', 'Flooded');
  assert.equal(calculateEnvironment(garden).conditions[target].Moisture, 'Flooded');
  assert.equal(transformationStatus(garden, target).find(recipe => recipe.into === 'Rice').eligible, false);
  assert.equal(advanceGardenTime(garden, 12).garden.objects[target].species, 'Potato');
});

test('each uninterrupted timer resets on environmental changes and resumes from zero', () => {
  const recipe = TRANSFORMATIONS.Potato.find(item => item.into === 'Apple');
  let garden = advanceGardenTime(arrange(recipe), 8).garden;
  assert.equal(garden.objects[target].transformationClocks.Apple, 8);
  garden = setBaseline(garden, target, 'Temperature', 'Hot');
  garden = reconcileTransformationClocks(garden);
  assert.equal(garden.objects[target].transformationClocks.Apple, 0,
    'player events must interrupt exposure without waiting for the next hour');
  garden = setBaseline(garden, target, 'Temperature', 'Temperate');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[target].transformationClocks.Apple, 1);
  assert.equal(garden.objects[target].species, 'Potato');
  garden = advanceGardenTime(garden, recipe.hours - 1).garden;
  assert.equal(garden.objects[target].species, 'Apple');
});

test('contact changes reset a clock even if fungal coverage is later restored', () => {
  let garden = advanceGardenTime(arrange(TRANSFORMATIONS.Potato[0]), 5).garden;
  const sourceKey = neighborKeys[0];
  const objects = { ...garden.objects };
  delete objects[sourceKey];
  garden = reconcileTransformationClocks({ ...garden, objects });
  assert.equal(garden.objects[target].transformationClocks.Rice, 0);
  garden = placeObject(garden, sourceKey, makeFungus('Dewmender'));
  assert.equal(advanceGardenTime(garden, 7).garden.objects[target].species, 'Potato');
});

test('all six routes ignore Plant stage, and a transform/death exact-time tie favors Transformation', () => {
  let garden = arrange(TRANSFORMATIONS.Potato.find(item => item.into === 'Onion'));
  const potato = { ...garden.objects[target], progress: 200, ageHours: 900,
    exposure: { Dry: 71, Hot: 0, Freezing: 0, Mycelial: 0 },
    transformationClocks: { Onion: 13 },
    production: { ordinaryLeaves: 9, ordinarySeeds: 8, hourlyLeaves: 7, hourlySeeds: 6 } };
  garden = { ...garden, objects: { ...garden.objects, [target]: potato } };
  const result = advanceGardenTime(garden, 1);
  assert.equal(result.garden.objects[target].species, 'Onion');
  assert.equal(result.garden.objects[target].progress, 0);
  assert.equal(result.garden.objects[target].production.ordinaryLeaves, 0);
  assert.doesNotMatch(result.events.join(' '), /died/);
});

test('completed terminal Ingredients never have outgoing Transformation recipes', () => {
  for (const recipe of TRANSFORMATIONS.Potato) {
    const garden = setup(recipe.into);
    assert.deepEqual(transformationStatus(garden, target), []);
    assert.equal(advanceGardenTime(garden, 1).garden.objects[target].species, recipe.into);
  }
});

test('save migration preserves safe clocks and removes forged, invalid or completed timers', () => {
  const recipe = TRANSFORMATIONS.Potato[0];
  const old = advanceGardenTime(arrange(recipe), 4).garden;
  const loaded = migrateGarden(structuredClone(old));
  assert.equal(loaded.objects[target].transformationClocks.Rice, 4);
  assert.deepEqual(old, structuredClone(old));

  const tampered = structuredClone(old);
  tampered.objects[target].transformationClocks = { Rice: 10_000, Apple: -3,
    Carrot: '15', Arbitrary: 1000 };
  const clean = migrateGarden(tampered).objects[target].transformationClocks;
  assert.equal(clean.Rice, recipe.hours - 1);
  assert.equal(clean.Apple, 0);
  assert.equal(clean.Carrot, 0);
  assert.equal(clean.Arbitrary, undefined);
});
