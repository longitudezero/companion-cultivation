import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLANTS, TRANSFORMATIONS, makePlant, makeFungus, createGarden, placeObject, removeObject,
  setBaseline, neighborsOf, calculateEnvironment, advanceGardenTime, plantGrowthRates,
  plantOutputRate, effectCompatibility, transformationStatus, reconcileTransformationClocks,
  availableHarvest, harvestPlant, sowPlant, accruePlantProduction, migrateGarden,
  makeSource, makeInfluence,
  placeEdgeBlocker, makeBlocker,
} from '../src/core/index.js';

const key = '4,4';
const neighbors = neighborsOf(key);
const deserts = Object.entries(PLANTS).filter(([, profile]) => profile.family === 'Desert');
const recipes = Object.entries(TRANSFORMATIONS).flatMap(([from, routes]) =>
  routes.filter(recipe => PLANTS[from]?.family === 'Desert').map(recipe => [from, recipe]));
const atmosphere = (moisture, temperature, light) =>
  ({ Moisture: moisture, Temperature: temperature, Illumination: light });

function start(species, conditions = atmosphere('Damp', 'Temperate', 'Lit')) {
  let garden = placeObject(createGarden(9, 9), key, makePlant(species));
  for (const [property, value] of Object.entries(conditions)) {
    for (const hex of Object.keys(garden.hexes)) garden = setBaseline(garden, hex, property, value);
  }
  return garden;
}

function edit(garden, property, value) {
  return reconcileTransformationClocks(setBaseline(garden, key, property, value), garden);
}

function addFungus(garden, species, position = neighbors[0]) {
  return reconcileTransformationClocks(placeObject(garden, position,
    makeFungus(species, neighborsOf(position).indexOf(key))), garden);
}

// Put the recipe's real Fungi around an occupied Plant; solve for a shared
// three-Property baseline producing its exact *resolved* target conditions.
// This validates reachable emission footprints rather than mocking contacts.
function arrangeStatic(from, recipe) {
  let garden = placeObject(createGarden(9, 9), key, makePlant(from));
  recipe.contacts.forEach((group, index) => {
    garden = placeObject(garden, neighbors[index], makeFungus(group[0],
      neighborsOf(neighbors[index]).indexOf(key)));
  });
  for (const moisture of ['Dry', 'Damp', 'Flooded']) {
    for (const temperature of ['Freezing', 'Cold', 'Temperate', 'Warm', 'Hot']) {
      for (const illumination of ['Dark', 'Dim', 'Lit', 'Bright']) {
        const baselines = atmosphere(moisture, temperature, illumination);
        const candidate = { ...garden, hexes: Object.fromEntries(Object.keys(garden.hexes)
          .map(at => [at, { baselines }])) };
        const resolved = calculateEnvironment(candidate).conditions[key];
        if (Object.entries(recipe.conditions).every(([property, value]) => resolved[property] === value)) {
          return candidate;
        }
      }
    }
  }
  if (recipe.into === 'Everjade') {
    // The environmental magnitudes need not produce the final Temperature
    // or Illumination; the full named cultivation packages still contact.
    let candidate = garden;
    for (const at of Object.keys(candidate.hexes)) {
      for (const [property, value] of Object.entries(atmosphere('Damp', recipe.conditions.Temperature, 'Dim'))) {
        candidate = setBaseline(candidate, at, property, value);
      }
    }
    for (const adjacent of neighbors) candidate = placeEdgeBlocker(candidate, key, adjacent,
      makeBlocker('kind', from === 'Aloemancer' ? 'Thermal' : 'Luminous'));
    assert.equal(calculateEnvironment(candidate).conditions[key].Temperature, recipe.conditions.Temperature);
    return candidate;
  }
  throw new Error(`No simple baseline layout for ${from} → ${recipe.into}`);
}

test('Desert includes eleven exact species profiles and all thirteen approved routes', () => {
  assert.equal(deserts.length, 11);
  assert.equal(recipes.length, 13);
  assert.equal(Object.keys(PLANTS).length, 60);
  assert.equal(PLANTS.Jadeheart.germination, .28);
  assert.equal(PLANTS['Aloechemist'].growthDays, 3.5);
  assert.equal(PLANTS.Aloemancer.seedSpecies, 'Aloechemist');
  assert.equal(PLANTS['Cactastrophe'].seedSpecies, 'Jadeheart');
  assert.equal(PLANTS.Jadewisp.seeds, 26);
  assert.equal(PLANTS.Jadewisp.seedSpecies, 'Moonjade');
  assert.equal(PLANTS.Pearadox.germination, .18);
  assert.equal(PLANTS['Prickly Pearl'].dryDeath, Infinity);
  assert.equal(PLANTS.Cactopus.germination, .32);
  assert.equal(PLANTS.Cactacomb.seeds, 0);
  assert.equal(PLANTS.Cactacomb.seedSpecies, null);
  assert.deepEqual(PLANTS['Everjade'].seedDistribution, ['Aloechemist', 'Moonjade']);
  assert.deepEqual(Object.fromEntries(recipes.map(([from, recipe]) => [`${from} → ${recipe.into}`, recipe.hours])), {
    'Jadeheart → Aloechemist': 18, 'Jadeheart → Moonjade': 20, 'Jadeheart → Cactopus': 16,
    'Aloechemist → Cactastrophe': 36, 'Aloechemist → Aloemancer': 36,
    'Cactastrophe → Prickly Pearl': 12, 'Prickly Pearl → Cactopus': 18,
    'Moonjade → Jadewisp': 48, 'Moonjade → Pearadox': 48,
    'Cactopus → Cactacomb': 24, 'Cactopus → Pearadox': 20,
    'Aloemancer → Everjade': 24, 'Jadewisp → Everjade': 24,
  });
});

test('new and migrated gardens receive Jadeheart Seeds once; zero stock stays zero', () => {
  const initial = createGarden();
  assert.equal(initial.inventory.seeds.Jadeheart, 16);
  const older = structuredClone(initial);
  delete older.inventory.seeds.Jadeheart;
  assert.equal(migrateGarden(older).inventory.seeds.Jadeheart, 16);
  older.inventory.seeds.Jadeheart = 0;
  assert.equal(migrateGarden(older).inventory.seeds.Jadeheart, 0);
  const grown = sowPlant(initial, '2,2', 'Jadeheart', 4, () => 0);
  assert.equal(grown.chance, 1);
  assert.equal(grown.garden.inventory.seeds.Jadeheart, 12);
});

test('all nine ordinary Desert transformations complete through live fungal footprints at the approved hour', () => {
  const ordinary = recipes.filter(([, recipe]) => !recipe.sequence);
  assert.equal(ordinary.length, 9);
  for (const [from, recipe] of ordinary) {
    let garden = arrangeStatic(from, recipe);
    assert.equal(transformationStatus(garden, key).find(r => r.into === recipe.into).eligible, true,
      `${from} → ${recipe.into} layout should qualify`);
    garden = advanceGardenTime(garden, recipe.hours - 1).garden;
    assert.equal(garden.objects[key].species, from, `${from} → ${recipe.into} completed early`);
    garden = advanceGardenTime(garden, 1).garden;
    assert.equal(garden.objects[key].species, recipe.into, `${from} → ${recipe.into} did not complete`);
    assert.equal(garden.objects[key].progress, 0);
    assert.equal(garden.objects[key].exposure.Hot, 0);
  }
});

test('ordinary contact is specific, and a generic Source cannot replace a required Fungus', () => {
  const recipe = TRANSFORMATIONS.Jadeheart.find(r => r.into === 'Aloechemist');
  let garden = arrangeStatic('Jadeheart', recipe);
  const before = garden;
  garden = reconcileTransformationClocks(removeObject(garden, neighbors[0]), before);
  assert.equal(transformationStatus(garden, key).find(r => r.into === 'Aloechemist').eligible, false);
  garden = reconcileTransformationClocks(placeObject(garden, neighbors[0],
    makeSource([makeInfluence('Warming', 1, 2)])), garden);
  assert.equal(transformationStatus(garden, key).find(r => r.into === 'Aloechemist').eligible, false);
  garden = advanceGardenTime(garden, 25).garden;
  assert.equal(garden.objects[key].species, 'Jadeheart');
});

test('ordinary Desert recipe OR alternatives are real interchangeable contacts', () => {
  const recipe = TRANSFORMATIONS.Jadeheart.find(r => r.into === 'Cactopus');
  for (const name of recipe.contacts[0]) {
    const swapped = { ...recipe, contacts: [[name]] };
    const garden = arrangeStatic('Jadeheart', swapped);
    assert.equal(transformationStatus(garden, key).find(r => r.into === 'Cactopus').eligible, true);
    assert.equal(advanceGardenTime(garden, 16).garden.objects[key].species, 'Cactopus');
  }
});

test('Aloechemist Hot Growth +30%, natural Leaves +50%, and signed recipient effects are separate', () => {
  const hot = atmosphere('Damp', 'Hot', 'Lit');
  const warm = atmosphere('Damp', 'Warm', 'Lit');
  const ember = makePlant('Aloechemist');
  assert.equal(plantGrowthRates(ember, hot).growth, 1.3);
  assert.equal(plantGrowthRates(ember, hot).ripening, 1);
  assert.equal(plantOutputRate('Aloechemist', hot), 1.5);
  assert.equal(plantOutputRate('Aloechemist', hot, 'seed'), 1);
  assert.equal(plantOutputRate('Aloechemist', warm), 1);
  assert.equal(effectCompatibility(PLANTS['Aloechemist'], 'growthRate', hot, -.2), 1.8);
  assert.equal(effectCompatibility(PLANTS['Aloechemist'], 'leafYield', hot, .2), 2.3);
  assert.equal(plantOutputRate('Aloechemist', { ...hot, Illumination: 'Dark' }), 1.5 * .65);
  assert.equal(plantOutputRate('Aloechemist', { ...hot, Illumination: 'Dark' }, 'seed'), 1);
  assert.ok(Math.abs(plantGrowthRates(ember, hot, [{ kind: 'growthRate', amount: -.2 }]).growth - 1.3 * .64) < 1e-9);
  assert.equal(plantGrowthRates(ember, warm, [{ kind: 'growthRate', amount: -.2 }]).growth, .78);
  assert.equal(PLANTS['Aloechemist'].hotDeath, Infinity);
});

test('Aloechemist qualifies early as Cactastrophe, at exactly 36h as Aloemancer, never from cooling alone', () => {
  for (const [hours, expected] of [[1, 'Cactastrophe'], [35, 'Cactastrophe'], [36, 'Aloemancer'], [40, 'Aloemancer']]) {
    let garden = start('Aloechemist', atmosphere('Damp', 'Hot', 'Lit'));
    garden = advanceGardenTime(garden, hours).garden;
    assert.equal(garden.objects[key].exposure.Hot, hours);
    garden = addFungus(garden, 'Rilllace'); // Cooling creates Hot → Warm with contact.
    assert.equal(calculateEnvironment(garden).conditions[key].Temperature, 'Warm');
    assert.equal(garden.objects[key].species, expected, `Hot recovery at ${hours}h`);
    assert.equal(garden.objects[key].progress, 0);
    assert.equal(garden.objects[key].exposure.Hot, 0);
  }
  let garden = advanceGardenTime(start('Aloechemist', atmosphere('Damp', 'Hot', 'Lit')), 36).garden;
  garden = edit(garden, 'Temperature', 'Warm');
  assert.equal(garden.objects[key].species, 'Aloechemist', 'no fungus means no recovery');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[key].exposure.Hot, 0);
  garden = edit(garden, 'Temperature', 'Hot');
  garden = advanceGardenTime(garden, 1).garden;
  garden = addFungus(garden, 'Rilllace');
  assert.equal(garden.objects[key].species, 'Cactastrophe', 'the interrupted exposure did not bank 36h');

  let alternate = advanceGardenTime(start('Aloechemist', atmosphere('Damp', 'Hot', 'Lit')), 36).garden;
  alternate = addFungus(alternate, 'Rilllace');
  assert.equal(alternate.objects[key].species, 'Aloemancer', 'the named recovery Fungus works');

  let wrong = advanceGardenTime(start('Aloechemist', atmosphere('Damp', 'Hot', 'Lit')), 36).garden;
  wrong = edit(wrong, 'Temperature', 'Cold');
  assert.equal(wrong.objects[key].exposure.Hot, 0, 'endurance resets on the edit, without advancing time');
  wrong = addFungus(wrong, 'Rilllace');
  assert.equal(wrong.objects[key].species, 'Aloechemist', 'Hot → Cold does not count as Hot → Warm');

  let instant = advanceGardenTime(start('Aloechemist', atmosphere('Damp', 'Hot', 'Lit')), 36).garden;
  instant = edit(instant, 'Temperature', 'Cold');
  instant = edit(instant, 'Temperature', 'Hot');
  instant = addFungus(instant, 'Rilllace');
  assert.equal(instant.objects[key].species, 'Cactastrophe', 'zero-time toggles cannot bank old Hot exposure');
});

test('Moonjade Freezing is indefinitely nonlethal Dormancy, while exposure still accumulates', () => {
  let garden = start('Moonjade', atmosphere('Damp', 'Freezing', 'Dim'));
  const original = garden.objects[key];
  garden = advanceGardenTime(garden, 96).garden;
  assert.equal(garden.objects[key].progress, 0);
  assert.equal(garden.objects[key].production.ordinaryLeaves, 0);
  assert.equal(garden.objects[key].ageHours, 96);
  assert.equal(garden.objects[key].exposure.Freezing, 96);
  assert.equal(PLANTS.Moonjade.freezingDeath, Infinity);
  assert.equal(plantGrowthRates(original, atmosphere('Damp', 'Freezing', 'Dim'),
    [{ kind: 'growthRate', amount: 2 }]).growth, 0);
  garden = edit(garden, 'Temperature', 'Cold');
  assert.equal(garden.objects[key].species, 'Moonjade');
  garden = advanceGardenTime(garden, 1).garden;
  assert.ok(garden.objects[key].progress > 0);
  assert.equal(garden.objects[key].exposure.Freezing, 0);
});

test('Moonjade Dormancy preserves pre-existing harvest banks and blocks hourly fungal production', () => {
  let garden = start('Moonjade', atmosphere('Damp', 'Cold', 'Dim'));
  garden = advanceGardenTime(garden, 24 * 6).garden;
  const retained = garden.objects[key].production;
  assert.ok(retained.ordinaryLeaves > 0);
  const frozen = edit(garden, 'Temperature', 'Freezing');
  garden = advanceGardenTime(frozen, 48).garden;
  assert.equal(garden.objects[key].progress, frozen.objects[key].progress);
  assert.deepEqual(garden.objects[key].production, retained);
  const direct = accruePlantProduction({ ...garden.objects[key], progress: 160 }, 160,
    atmosphere('Damp', 'Freezing', 'Dim'), [{ kind: 'hourlyLeaf', amount: 100, window: [150, 190] }]);
  assert.equal(direct.hourlyLeaves, retained.hourlyLeaves);
});

test('Moonjade after 48h thaw to Cold / Damp / Dim under Dewmender becomes Jadewisp', () => {
  let garden = start('Moonjade', atmosphere('Dry', 'Freezing', 'Dim'));
  garden = addFungus(garden, 'Dewmender');
  garden = advanceGardenTime(garden, 48).garden;
  assert.equal(garden.objects[key].progress, 0);
  assert.equal(transformationStatus(garden, key).find(r => r.into === 'Jadewisp').phase, 'ready');
  const persisted = migrateGarden(structuredClone(garden));
  assert.equal(persisted.objects[key].exposure.Freezing, 48);
  garden = edit(persisted, 'Temperature', 'Cold');
  assert.equal(garden.objects[key].species, 'Jadewisp');
  assert.equal(garden.objects[key].progress, 0);
  assert.equal(garden.objects[key].exposure.Freezing, 0);
});

test('Moonjade early thaw, wrong thaw or missing contact cannot transform or bank exposure', () => {
  let garden = start('Moonjade', atmosphere('Damp', 'Freezing', 'Dim'));
  garden = addFungus(garden, 'Dewmender');
  garden = advanceGardenTime(garden, 47).garden;
  garden = edit(garden, 'Temperature', 'Cold');
  assert.equal(garden.objects[key].species, 'Moonjade');
  assert.equal(garden.objects[key].exposure.Freezing, 0, 'thaw resets endurance immediately');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects[key].exposure.Freezing, 0);

  garden = edit(garden, 'Temperature', 'Freezing');
  garden = advanceGardenTime(garden, 48).garden;
  garden = edit(garden, 'Temperature', 'Temperate');
  assert.equal(garden.objects[key].species, 'Moonjade');
  assert.equal(garden.objects[key].exposure.Freezing, 0);
  garden = edit(garden, 'Temperature', 'Freezing');
  garden = advanceGardenTime(garden, 48).garden;
  garden = reconcileTransformationClocks(removeObject(garden, neighbors[0]), garden);
  garden = edit(garden, 'Temperature', 'Cold');
  assert.equal(garden.objects[key].species, 'Moonjade');
});

test('Moonjade alternate thaw to Pearadox needs two distinct named contact groups and Lit', () => {
  let garden = start('Moonjade', atmosphere('Damp', 'Freezing', 'Bright'));
  for (const adjacent of neighbors) garden = placeEdgeBlocker(garden, key, adjacent, makeBlocker('kind', 'Thermal'));
  garden = addFungus(garden, 'Mistruffle', neighbors[1]);
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Lit');
  garden = advanceGardenTime(garden, 48).garden;
  garden = addFungus(garden, 'Emberbolete', neighbors[0]);
  garden = edit(garden, 'Temperature', 'Cold');
  assert.equal(calculateEnvironment(garden).conditions[key].Temperature, 'Cold');
  assert.equal(garden.objects[key].species, 'Pearadox');

  let missing = start('Moonjade', atmosphere('Damp', 'Freezing', 'Bright'));
  for (const adjacent of neighbors) missing = placeEdgeBlocker(missing, key, adjacent, makeBlocker('kind', 'Thermal'));
  missing = advanceGardenTime(missing, 48).garden;
  missing = addFungus(missing, 'Emberbolete');
  missing = edit(missing, 'Temperature', 'Cold');
  assert.equal(missing.objects[key].species, 'Moonjade', 'missing second named group cannot thaw');

  let dim = start('Moonjade', atmosphere('Damp', 'Freezing', 'Lit'));
  for (const adjacent of neighbors) dim = placeEdgeBlocker(dim, key, adjacent, makeBlocker('kind', 'Thermal'));
  dim = addFungus(dim, 'Mistruffle', neighbors[1]); // Lit becomes Dim.
  dim = advanceGardenTime(dim, 48).garden;
  dim = addFungus(dim, 'Emberbolete');
  dim = edit(dim, 'Temperature', 'Cold');
  assert.equal(dim.objects[key].species, 'Moonjade', 'both groups are insufficient at Dim');
});

test('Pearadox Hot Leaves and Freezing Seeds apply prospectively; Freezing remains productive', () => {
  const hot = atmosphere('Damp', 'Hot', 'Lit');
  const frozen = atmosphere('Damp', 'Freezing', 'Lit');
  assert.equal(plantGrowthRates(makePlant('Pearadox'), frozen).growth, .75);
  assert.equal(plantOutputRate('Pearadox', hot), 1.7);
  assert.equal(plantOutputRate('Pearadox', frozen, 'seed'), 1.8);
  assert.equal(effectCompatibility(PLANTS.Pearadox, 'seedYield', frozen, .2), 2.5);
  assert.equal(effectCompatibility(PLANTS.Pearadox, 'leafYield', hot, .2), 2.2);
  assert.equal(PLANTS.Pearadox.hotDeath, Infinity);
  assert.equal(PLANTS.Pearadox.freezingDeath, Infinity);
  let garden = start('Pearadox', frozen);
  garden = advanceGardenTime(garden, 272).garden;
  assert.equal(garden.objects[key].progress, 200);
  assert.equal(availableHarvest(garden.objects[key]).seeds, 27);
});

test('Cactacomb is sterile and earns 48 native Leaves in Hot, only 65% in Warm', () => {
  assert.equal(plantOutputRate('Cactacomb', atmosphere('Damp', 'Hot', 'Lit')), 1);
  assert.equal(plantOutputRate('Cactacomb', atmosphere('Damp', 'Warm', 'Lit')), .65);
  const cactaclysm = makePlant('Cactacomb');
  cactaclysm.progress = 130;
  const planted = accruePlantProduction({ ...cactaclysm, progress: 0 }, 130,
    atmosphere('Damp', 'Hot', 'Lit'), [{ kind: 'seedYield', amount: 5 },
      { kind: 'hourlySeed', amount: 5, window: [119, 130] }]);
  assert.equal(planted.ordinarySeeds, 0);
  assert.equal(planted.hourlySeeds, 0);
  assert.equal(planted.ordinaryLeaves, 48);
  assert.equal(availableHarvest({ ...cactaclysm, production: planted }).seeds, 0);
});

test('Everjade creates two equal Seed identities at one consuming harvest with stable rounding', () => {
  let garden = start('Everjade');
  let rose = garden.objects[key];
  rose = { ...rose, progress: 200, production: { ordinaryLeaves: 18,
    ordinarySeeds: 28, hourlyLeaves: 0, hourlySeeds: 0 } };
  garden = { ...garden, objects: { ...garden.objects, [key]: rose } };
  assert.deepEqual(availableHarvest(rose), {
    leaves: 18, seeds: 28, allocation: 0,
    seedStacks: { 'Aloechemist': 14, Moonjade: 14 },
  });
  let harvested = harvestPlant(garden, key);
  assert.equal(harvested.inventory.seeds['Aloechemist'], 14);
  assert.equal(harvested.inventory.seeds.Moonjade, 14);
  assert.equal(harvested.inventory.seeds['Everjade'], undefined);
  assert.equal(harvested.objects[key], undefined);
  rose = { ...rose, production: { ...rose.production, ordinarySeeds: 27 } };
  const rounded = availableHarvest(rose);
  assert.equal(rounded.seeds, 26);
  assert.deepEqual(rounded.seedStacks, { 'Aloechemist': 13, Moonjade: 13 });
  const boosted = availableHarvest({ ...rose, production: { ...rose.production, ordinarySeeds: 40.32 } });
  assert.deepEqual(boosted.seedStacks, { 'Aloechemist': 20, Moonjade: 20 });
  harvested = migrateGarden(structuredClone(harvested));
  assert.equal(harvested.inventory.seeds.Moonjade, 14);
});

test('natural Everjade Ripening accrues 14+14 Seeds, independent of origin', () => {
  let garden = start('Everjade');
  garden = advanceGardenTime(garden, 228).garden;
  assert.equal(garden.objects[key].progress, 200);
  assert.deepEqual(availableHarvest(garden.objects[key]).seedStacks, {
    'Aloechemist': 14, Moonjade: 14,
  });
  const profile = PLANTS['Everjade'];
  assert.equal(effectCompatibility(profile, 'seedYield', atmosphere('Damp', 'Temperate', 'Lit'), .2), 2.2);
  const native = { ...makePlant('Everjade'), progress: 100 };
  const boosted = accruePlantProduction(native, 200, atmosphere('Damp', 'Temperate', 'Lit'),
    [{ kind: 'seedYield', amount: .2 }]);
  assert.ok(Math.abs(boosted.ordinarySeeds - 40.32) < 1e-8);
  assert.deepEqual(availableHarvest({ ...native, production: boosted }).seedStacks, {
    'Aloechemist': 20, Moonjade: 20,
  });
});

test('Desert plant survival and output distinguish Hot, Freezing, Dry, and Mycelial hazards', () => {
  assert.equal(PLANTS.Jadeheart.hotDeath, 72);
  assert.equal(PLANTS.Jadeheart.freezingDeath, 48);
  assert.equal(PLANTS.Jadeheart.dryDeath, Infinity);
  assert.equal(PLANTS['Prickly Pearl'].hotDeath, Infinity);
  assert.equal(PLANTS['Prickly Pearl'].freezingDeath, 72);
  assert.equal(PLANTS['Everjade'].mycelialDeath, 48);
  let garden = start('Jadeheart', atmosphere('Dry', 'Hot', 'Lit'));
  garden = advanceGardenTime(garden, 71).garden;
  assert.equal(garden.objects[key].species, 'Jadeheart');
  const fatal = advanceGardenTime(garden, 1);
  assert.equal(fatal.garden.objects[key], undefined);
  assert.ok(fatal.events.some(event => event.includes('6m of Hot')));
  garden = start('Prickly Pearl', atmosphere('Dry', 'Hot', 'Lit'));
  garden = advanceGardenTime(garden, 100).garden;
  assert.equal(garden.objects[key].species, 'Prickly Pearl');
});
