import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONDITIONS, PLANTS, TRANSFORMATIONS, createGarden, placeObject, removeObject,
  placeEdgeBlocker, makeBlocker,
  setBaseline, makePlant, makeFungus, neighborsOf, calculateEnvironment,
  calculateCultivation, namedFungalContacts, transformationStatus,
  reconcileTransformationClocks, advanceGardenTime, effectCompatibility,
  availableHarvest, harvestPlant, migrateGarden, sowPlant, isMycelial,
} from '../src/core/index.js';

const target = '4,4';
const neighbors = neighborsOf(target);
const woodlandRoutes = Object.entries(TRANSFORMATIONS).flatMap(([from, routes]) =>
  routes.filter(route => PLANTS[from]?.family === 'Woodlands').map(route => ({ from, ...route })));

function start(species = 'Woodlands Base') {
  let garden = createGarden(9, 9);
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Illumination', 'Dim');
  return placeObject(garden, target, makePlant(species));
}

function arrange(species, recipe, alternatives = 0) {
  let garden = start(species);
  for (const [i, group] of recipe.contacts.entries()) {
    const fungus = group[alternatives % group.length];
    garden = placeObject(garden, neighbors[i], makeFungus(fungus));
    // Avoid unrelated Dark/Bright adjacency from the fungus's own emitted
    // Illumination adjustment. The actual zone still reaches the Plant.
    const emission = calculateEnvironment(garden).modifiers[neighbors[i]].Illumination
      .filter(effect => effect.source === neighbors[i]).reduce((n, effect) => n + effect.modifier, 0);
    if (emission) {
      garden = setBaseline(garden, neighbors[i], 'Illumination', emission > 0 ? 'Dim' : 'Lit');
    }
  }
  const env = calculateEnvironment(garden);
  for (const [property, expected] of Object.entries(recipe.conditions)) {
    const shift = env.modifiers[target][property].reduce((sum, effect) => sum + effect.modifier, 0);
    const index = CONDITIONS[property].indexOf(expected) - shift;
    const baseline = CONDITIONS[property][index];
    assert.ok(baseline, `${species}→${recipe.into}: legal ${property} baseline`);
    garden = setBaseline(garden, target, property, baseline);
  }
  const resolved = calculateEnvironment(garden).conditions[target];
  for (const [property, expected] of Object.entries(recipe.conditions)) {
    assert.equal(resolved[property], expected, `${species}→${recipe.into}: resolved ${property}`);
  }
  return garden;
}

test('Woodlands has eleven profiles and all thirteen approved transformations', () => {
  assert.equal(Object.values(PLANTS).filter(p => p.family === 'Woodlands').length, 11);
  assert.equal(woodlandRoutes.length, 13);
  assert.equal(createGarden().inventory.seeds['Woodlands Base'], 16);
  assert.equal(PLANTS.Bamboom.seedSpecies, 'Woodlands Base');
  assert.equal(PLANTS.Bamboozeling.seedSpecies, 'Woodlands Base');
  assert.equal(PLANTS.Mistlewoe.seedSpecies, 'Tanglethorn');
  assert.equal(PLANTS.Mandrakazam.seedSpecies, 'Mandrakadabra');
  assert.equal(PLANTS.Mandrakadabra.germination, .12);
  assert.equal(PLANTS.Mandrakadabra.seeds, 0);
  assert.equal(PLANTS.Bamboozled.seeds, 0);
});

test('new and migrated gardens get Woodlands Base Seeds once without replenishing spent Seeds', () => {
  const original = createGarden();
  delete original.inventory.seeds['Woodlands Base'];
  delete original.inventory.trophies;
  const snapshot = structuredClone(original);
  let garden = migrateGarden(original);
  assert.deepEqual(original, snapshot);
  assert.equal(garden.inventory.seeds['Woodlands Base'], 16);
  assert.equal(garden.inventory.trophies.bambooSteel, 0);
  garden.inventory.seeds['Woodlands Base'] = 0;
  assert.equal(migrateGarden(garden).inventory.seeds['Woodlands Base'], 0);
});

test('all twelve ordinary Woodlands recipes fire at their exact exposure thresholds', () => {
  for (const { from, ...recipe } of woodlandRoutes.filter(r => !r.sequence)) {
    let garden = arrange(from, recipe);
    assert.equal(transformationStatus(garden, target).find(r => r.into === recipe.into).eligible, true,
      `${from}→${recipe.into} eligible`);
    const before = advanceGardenTime(garden, recipe.hours - 1).garden;
    assert.equal(before.objects[target].species, from, `${from}→${recipe.into} not early`);
    garden = advanceGardenTime(before, 1).garden;
    assert.equal(garden.objects[target].species, recipe.into, `${from}→${recipe.into} completed`);
    assert.equal(garden.objects[target].progress, 0);
    assert.equal(garden.objects[target].ageHours, 0);
    assert.deepEqual(garden.objects[target].production, makePlant(recipe.into).production);
    assert.deepEqual(garden.objects[target].exposure, makePlant(recipe.into).exposure);
  }
});

function mistlefoePrepared(hours = 12) {
  let garden = start('Mistlefoe');
  garden = placeObject(garden, neighbors[0], makeFungus('Mistruffle', neighborsOf(neighbors[0]).indexOf(target)));
  garden = placeObject(garden, neighbors[1], makeFungus('Dewmender', neighborsOf(neighbors[1]).indexOf(target)));
  // Mistruffle's package still contacts the Plant, but its Dimming emission
  // cannot alter the target illumination when that contact is removed.
  for (const exit of neighborsOf(neighbors[0])) {
    if (garden.hexes[exit]) garden = placeEdgeBlocker(garden, neighbors[0], exit, makeBlocker('kind', 'Luminous'));
  }
  garden = setBaseline(garden, neighbors[1], 'Illumination', 'Lit');
  // Dewmender's Wetting establishes Damp independently of Mistruffle,
  // whose Dimming is already filtered at its own source boundary.
  garden = setBaseline(garden, target, 'Moisture', 'Dry');
  garden = setBaseline(garden, target, 'Illumination', 'Dim');
  assert.equal(calculateEnvironment(garden).conditions[target].Moisture, 'Damp');
  assert.equal(calculateEnvironment(garden).conditions[target].Illumination, 'Dim');
  garden = advanceGardenTime(garden, hours).garden;
  assert.equal(garden.objects[target].species, 'Mistlefoe');
  return garden;
}

test('keeping both contacts for 20 hours turns Mistlefoe into Mistlewoe', () => {
  let garden = mistlefoePrepared(19);
  assert.equal(garden.objects[target].transformationClocks.Mistlewoe, 19);
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[target].species, 'Mistlewoe');
});

test('Mistlefoe removal needs 12–19h and retained Damp/Dim plus Dewmender', () => {
  let garden = mistlefoePrepared(12);
  assert.equal(garden.objects[target].transformationSequence.Mandrabra.phase, 'armed');
  const before = garden;
  garden = removeObject(garden, neighbors[0]);
  garden = reconcileTransformationClocks(garden, before);
  assert.equal(garden.objects[target].species, 'Mandrabra');
  assert.equal(garden.objects[target].progress, 0);
  assert.equal(garden.objects[target].ageHours, 0);
});

test('removing Mistruffle before 12h cannot pivot and resets preparation', () => {
  let garden = mistlefoePrepared(11);
  const before = garden;
  garden = removeObject(garden, neighbors[0]);
  garden = reconcileTransformationClocks(garden, before);
  assert.equal(garden.objects[target].species, 'Mistlefoe');
  assert.equal(garden.objects[target].transformationSequence.Mandrabra.preparedHours, 0);
});

test('Mistlefoe pivot at 19h works, but retention through hour 20 locks in Mistlewoe', () => {
  let garden = mistlefoePrepared(19);
  assert.equal(garden.objects[target].transformationSequence.Mandrabra.preparedHours, 19);
  const persisted = migrateGarden(structuredClone(garden));
  assert.equal(persisted.objects[target].transformationSequence.Mandrabra.preparedHours, 19);
  const before = persisted;
  garden = reconcileTransformationClocks(removeObject(persisted, neighbors[0]), before);
  assert.equal(garden.objects[target].species, 'Mandrabra');

  const late = advanceGardenTime(mistlefoePrepared(19), 1).garden;
  assert.equal(late.objects[target].species, 'Mistlewoe');
  const removed = reconcileTransformationClocks(removeObject(late, neighbors[0]), late);
  assert.equal(removed.objects[target].species, 'Mistlewoe');
});

test('Mandrabra receives Rushroom contact from a supported Mycelial source across blocked soil', () => {
  let garden = start('Mandrabra');
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Illumination', 'Bright');
  for (const adjacent of neighbors) {
    garden = placeEdgeBlocker(garden, target, adjacent, makeBlocker('kind', 'Mycelial'));
  }
  garden = placeObject(garden, '2,4', makeFungus('Mycelord'));
  garden = advanceGardenTime(garden, 24).garden;
  assert.equal(isMycelial(garden, '3,4'), true, 'Rushroom source is supported');
  assert.equal(isMycelial(garden, target), false, 'Plant target remains free of Mycelial soil');
  garden = reconcileTransformationClocks(placeObject(garden, '3,4', makeFungus('Rushroom')), garden);
  assert.ok(namedFungalContacts(garden, target, calculateEnvironment(garden)).has('Rushroom'));
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Mandrakadabra').eligible, true);
  garden = advanceGardenTime(garden, 12).garden;
  assert.equal(garden.objects[target].species, 'Mandrakadabra');
  assert.equal(garden.objects[target].exposure.Bright, 0);
  assert.equal(garden.objects['3,4'].species, 'Rushroom');
});

test('Mandrakazam recipe permits Mycelial soil if contact and state persist', () => {
  const recipe = TRANSFORMATIONS.Mandrabra.find(r => r.into === 'Mandrakazam');
  let garden = arrange('Mandrabra', recipe);
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Mandrakazam').eligible, true);
  garden = removeObject(garden, neighbors[0]);
  garden = placeObject(garden, '2,4', makeFungus('Mycelord'));
  garden = advanceGardenTime(garden, 36).garden;
  assert.equal(isMycelial(garden, target), true);
  garden = placeObject(garden, neighbors[0], makeFungus(recipe.contacts[0][0]));
  assert.equal(transformationStatus(garden, target).find(r => r.into === 'Mandrakazam').eligible, true);
});

test('Bramblewraith keeps living after more than 48h of actual Mycelial overlay', () => {
  let garden = start('Bramblewraith');
  garden = placeObject(garden, neighbors[0], makeFungus('Mycelord'));
  garden = advanceGardenTime(garden, 96).garden;
  assert.equal(isMycelial(garden, target), true);
  assert.equal(garden.objects[target].species, 'Bramblewraith');
  assert.ok(garden.objects[target].exposure.Mycelial >= 48);
});

test('Mandrakadabra dies at exactly four uninterrupted hours of Bright, but Lit resets it', () => {
  let garden = setBaseline(start('Mandrakadabra'), target, 'Illumination', 'Bright');
  garden = advanceGardenTime(garden, 3).garden;
  assert.equal(garden.objects[target].exposure.Bright, 3);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Illumination', 'Lit'), garden);
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[target].exposure.Bright, 0);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Illumination', 'Bright'), garden);
  garden = advanceGardenTime(garden, 3).garden;
  assert.equal(garden.objects[target].species, 'Mandrakadabra');
  const last = advanceGardenTime(garden, 1);
  assert.equal(last.garden.objects[target], undefined);
  assert.ok(last.events.some(event => event.includes('20s of Bright')));
});

test('Bramblewraith survives extreme Temperature and Mycelial indefinitely without protection buffs', () => {
  let garden = setBaseline(start('Bramblewraith'), target, 'Temperature', 'Hot');
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = advanceGardenTime(garden, 100).garden;
  assert.equal(garden.objects[target].exposure.Hot, 100);
  assert.equal(garden.objects[target].species, 'Bramblewraith');
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Temperature', 'Freezing'), garden);
  garden = advanceGardenTime(garden, 100).garden;
  assert.equal(garden.objects[target].exposure.Freezing, 100);
  assert.equal(garden.objects[target].species, 'Bramblewraith');
  assert.equal(PLANTS.Bramblewraith.mycelialDeath, Infinity);
});

test('Bamboozled is ordinary-output sterile but yields one Bamboo Steel trophy after 100%', () => {
  let garden = placeObject(createGarden(), '2,2', makePlant('Bamboozled'));
  assert.equal(availableHarvest(garden.objects['2,2']).bambooSteel, 0);
  assert.throws(() => harvestPlant(garden, '2,2'), /100% Growth/);
  garden = { ...garden, objects: { ...garden.objects,
    '2,2': { ...garden.objects['2,2'], progress: 100, production: {
      ordinaryLeaves: 5, ordinarySeeds: 5, hourlyLeaves: 5, hourlySeeds: 5,
    } } } };
  assert.deepEqual(availableHarvest(garden.objects['2,2']),
    { leaves: 0, seeds: 0, allocation: 0, bambooSteel: 1 });
  const harvested = harvestPlant(garden, '2,2');
  assert.equal(harvested.inventory.trophies.bambooSteel, 1);
  assert.deepEqual(harvested.inventory.leaves, {});
  assert.equal(harvested.inventory.seeds.Bamboozled, undefined);
  assert.equal(harvested.objects['2,2'], undefined);
  assert.equal(migrateGarden(structuredClone(harvested)).inventory.trophies.bambooSteel, 1);
});

test('naturally grown Bamboozled earns its trophy at the 96h Growth boundary, not earlier', () => {
  let garden = start('Bamboozled');
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Illumination', 'Lit');
  garden = advanceGardenTime(garden, 95).garden;
  assert.ok(garden.objects[target].progress < 100);
  assert.equal(availableHarvest(garden.objects[target]).bambooSteel, 0);
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[target].progress, 100);
  assert.equal(availableHarvest(garden.objects[target]).bambooSteel, 1);
  assert.equal(harvestPlant(garden, target).inventory.trophies.bambooSteel, 1);
});

test('Woodlands compatibility multipliers remain tied to specified receiving conditions', () => {
  const damp = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' };
  assert.equal(effectCompatibility(PLANTS.Bamboom, 'seedYield', damp), 2.5);
  assert.equal(effectCompatibility(PLANTS.Bamboom, 'seedYield', { ...damp, Moisture: 'Dry' }), 2);
  assert.equal(effectCompatibility(PLANTS.Mistlefoe, 'leafYield', { ...damp, Illumination: 'Dim' }), 1.8);
  assert.equal(effectCompatibility(PLANTS.Mandrakadabra, 'leafYield', damp), 2.5);
  assert.equal(effectCompatibility(PLANTS.Mandrakadabra, 'leafYield', { ...damp, Illumination: 'Dim' }), 2);
  assert.equal(effectCompatibility(PLANTS.Mandrakazam, 'seedYield', { ...damp, Illumination: 'Dim' }), 2.5);
  assert.equal(effectCompatibility(PLANTS.Mandrabra, 'harvestWindow', damp), 1.6);
  assert.equal(PLANTS.Bramblewraith.compatibility.harvestWindow, .3);
});

test('Mandrakazam Seeds allow direct Mandrakadabra planting at approved 12% per Seed', () => {
  let garden = createGarden();
  garden = placeObject(garden, '2,2', { ...makePlant('Mandrakazam'), progress: 200,
    production: { ordinaryLeaves: 0, ordinarySeeds: 20, hourlyLeaves: 0, hourlySeeds: 0 } });
  garden = harvestPlant(garden, '2,2');
  assert.equal(garden.inventory.seeds.Mandrakadabra, 20);
  const result = sowPlant(garden, '2,2', 'Mandrakadabra', 9, () => .99);
  assert.equal(result.success, true);
  assert.equal(result.garden.objects['2,2'].species, 'Mandrakadabra');
  assert.equal(result.garden.objects['2,2'].exposure.Bright, 0);
});
