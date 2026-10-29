import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONDITIONS, PLANTS, TRANSFORMATIONS, createGarden, placeObject, setBaseline,
  makePlant, makeFungus, neighborsOf, calculateEnvironment, namedFungalContacts,
  transformationStatus, reconcileTransformationClocks, advanceGardenTime,
  plantGrowthRates, effectCompatibility, availableHarvest, harvestPlant,
  plantOutputRate, migrateGarden, sowPlant,
  placeEdgeBlocker, makeBlocker,
} from '../src/core/index.js';

const target = '4,4';
const near = neighborsOf(target);
const aquaticRecipes = Object.entries(TRANSFORMATIONS).flatMap(([from, recipes]) =>
  recipes.filter(recipe => PLANTS[from]?.family === 'Aquatic').map(recipe => ({ from, ...recipe })));

function gardenWith(species, light = 'Dim') {
  let garden = createGarden(9, 9);
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Illumination', light);
  return placeObject(garden, target, makePlant(species));
}

function arrange(from, recipe, alternative = 0) {
  let garden = gardenWith(from);
  for (const [i, group] of (recipe.contacts || []).entries()) {
    garden = placeObject(garden, near[i], makeFungus(group[alternative % group.length],
      neighborsOf(near[i]).indexOf(target)));
  }
  if (from === 'Cresscent' && recipe.into === 'Pearlily') {
    // Sim'mushro'dim's -2 Drying is blocked while its named cultivation
    // package still reaches the Plant. Damp is a state, not an emitter gate.
    for (const adjacent of near) {
      garden = placeEdgeBlocker(garden, target, adjacent, makeBlocker('kind', 'Aqueous'));
    }
    garden = setBaseline(garden, target, 'Moisture', 'Damp');
  }
  const env = calculateEnvironment(garden);
  for (const [property, expected] of Object.entries(recipe.conditions)) {
    const targetValue = Array.isArray(expected) ? expected[0] : expected;
    if (from === 'Cresscent' && recipe.into === 'Pearlily' && property === 'Moisture') continue;
    const index = CONDITIONS[property].indexOf(targetValue);
    const emitted = env.modifiers[target][property].reduce((sum, item) => sum + item.modifier, 0);
    const baseline = CONDITIONS[property][index - emitted];
    assert.ok(baseline, `${from} → ${recipe.into}: baseline possible for ${property}`);
    garden = setBaseline(garden, target, property, baseline);
  }
  for (const [property, expected] of Object.entries(recipe.conditions)) {
    const actual = calculateEnvironment(garden).conditions[target][property];
    assert.ok(Array.isArray(expected) ? expected.includes(actual) : expected === actual,
      `${from} → ${recipe.into}: got ${property} ${actual}, wanted ${expected}`);
  }
  return garden;
}

test('eleven approved Aquatic profiles, fourteen recipes, and their Seed identities exist', () => {
  assert.equal(Object.values(PLANTS).filter(p => p.family === 'Aquatic').length, 11);
  assert.equal(aquaticRecipes.length, 14);
  assert.equal(PLANTS['Algea'].germination, .28);
  assert.equal(PLANTS.Cresscent.germination, .4);
  assert.equal(PLANTS.Kelpfull.seedSpecies, 'Algea');
  assert.equal(PLANTS.Kelpless.seedSpecies, 'Algea');
  assert.equal(PLANTS.Starlotus.seedSpecies, null);
  assert.equal(PLANTS.Starlotus.seeds, 0);
  assert.deepEqual(PLANTS.Pearlily.leafPlateau, [100, 115, 170, 185]);
  assert.equal(createGarden().inventory.seeds['Algea'], 16);
});

test('older gardens gain Algea Seeds once, preserving spent stock', () => {
  const garden = createGarden();
  delete garden.inventory.seeds['Algea'];
  const old = structuredClone(garden);
  const migrated = migrateGarden(garden);
  assert.deepEqual(garden, old);
  assert.equal(migrated.inventory.seeds['Algea'], 16);
  migrated.inventory.seeds['Algea'] = 0;
  assert.equal(migrateGarden(migrated).inventory.seeds['Algea'], 0);
  assert.throws(() => sowPlant(migrated, '0,0', 'Algea', 1, () => 0),
    /between 1 and 0/, 'spent stock cannot be reused');
});

test('all 13 ordinary Aquatic routes complete at exact approved hours', () => {
  for (const { from, ...recipe } of aquaticRecipes.filter(recipe => !recipe.sequence)) {
    let garden = arrange(from, recipe);
    assert.equal(transformationStatus(garden, target).find(r => r.into === recipe.into).eligible, true,
      `${from} → ${recipe.into} qualifies`);
    const almost = advanceGardenTime(garden, recipe.hours - 1).garden;
    assert.equal(almost.objects[target].species, from, `${from} → ${recipe.into} not early`);
    garden = advanceGardenTime(almost, 1).garden;
    assert.equal(garden.objects[target].species, recipe.into, `${from} → ${recipe.into} completes`);
    assert.equal(garden.objects[target].progress, 0);
    assert.equal(garden.objects[target].ageHours, 0);
    assert.deepEqual(garden.objects[target].production, makePlant(recipe.into).production);
  }
});

test('named fungal contacts qualify, but arbitrary species and interruption do not', () => {
  const recipe = TRANSFORMATIONS['Algea'][0];
  const alternative = arrange('Algea', recipe, 1);
  assert.equal(namedFungalContacts(alternative, target, calculateEnvironment(alternative)).has('Dewmender'), true);
  assert.equal(advanceGardenTime(alternative, 12).garden.objects[target].species, 'Kelpfull');
  let garden = advanceGardenTime(arrange('Algea', recipe), 8).garden;
  const objects = { ...garden.objects }; delete objects[near[0]];
  garden = reconcileTransformationClocks({ ...garden, objects }, garden);
  assert.equal(garden.objects[target].transformationClocks.Kelpfull, 0);
  garden = reconcileTransformationClocks(placeObject(garden, near[0], makeFungus('Dewmender')), garden);
  assert.equal(advanceGardenTime(garden, 4).garden.objects[target].species, 'Algea');
});

test('Kelpergeist needs Sim\'mushro\'dim contact on non-Flooded soil, and resets if rewetted', () => {
  let garden = gardenWith('Kelpergeist');
  garden = placeObject(garden, near[0], makeFungus("Sim'mushro'dim",
    neighborsOf(near[0]).indexOf(target)));
  for (const adjacent of near) garden = placeEdgeBlocker(garden, target, adjacent, makeBlocker('kind', 'Aqueous'));
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = advanceGardenTime(garden, 10).garden;
  assert.equal(garden.objects[target].transformationClocks.Kelpless, 10);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Flooded'), garden);
  assert.equal(garden.objects[target].transformationClocks.Kelpless, 0);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Dry'), garden);
  garden = advanceGardenTime(garden, 18).garden;
  assert.equal(garden.objects[target].species, 'Kelpless');
  assert.equal(garden.objects[target].exposure.Dry, 0);
});

function preparedMoonlit() {
  let garden = gardenWith('Moonlit Lotus');
  garden = placeObject(garden, near[0], makeFungus('Rainmorel', neighborsOf(near[0]).indexOf(target)));
  for (const adjacent of near) garden = placeEdgeBlocker(garden, target, adjacent, makeBlocker('kind', 'Aqueous'));
  garden = setBaseline(garden, target, 'Moisture', 'Flooded');
  garden = setBaseline(garden, target, 'Temperature', 'Cold');
  garden = setBaseline(garden, target, 'Illumination', 'Dim');
  assert.equal(calculateEnvironment(garden).conditions[target].Illumination, 'Dim');
  garden = advanceGardenTime(garden, 24).garden;
  assert.equal(garden.objects[target].transformationSequence.Starlotus.phase, 'ready');
  return garden;
}

test('Moonlit Lotus needs the full 24h then a real Flooded → Damp drain event', () => {
  let garden = preparedMoonlit();
  assert.equal(garden.objects[target].species, 'Moonlit Lotus');
  const former = garden;
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Damp'), former);
  assert.equal(garden.objects[target].species, 'Starlotus');
  assert.equal(garden.objects[target].attunement, 'Damp');
  assert.equal(garden.objects[target].progress, 0);
  assert.equal(garden.objects[target].ageHours, 0);
});

test('Moonlit Lotus early drain resets; Flooded history without contact does not qualify', () => {
  let garden = preparedMoonlit();
  const before = garden;
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Dry'), before);
  assert.equal(garden.objects[target].species, 'Moonlit Lotus');
  assert.equal(garden.objects[target].transformationSequence.Starlotus.preparedHours, 0);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Damp'), garden);
  assert.equal(garden.objects[target].species, 'Moonlit Lotus');

  let almost = advanceGardenTime(gardenWith('Moonlit Lotus'), 23).garden;
  almost = reconcileTransformationClocks(setBaseline(almost, target, 'Moisture', 'Damp'), almost);
  assert.equal(almost.objects[target].species, 'Moonlit Lotus');
});

test('draining keeps qualified Waterborne pre-contact even when its path vanishes at that instant', () => {
  let garden = gardenWith('Moonlit Lotus');
  // The fungal environmental emission cannot reach this distance. Only the
  // connected Flooded corridor carries Tidegill's cultivation contact.
  const source = '1,4';
  garden = placeObject(garden, source, makeFungus('Rainmorel', 3));
  for (const key of ['2,4', '3,4', target]) {
    garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  }
  garden = setBaseline(garden, target, 'Temperature', 'Cold');
  assert.equal(calculateEnvironment(garden).modifiers[target].Illumination.length, 0);
  assert.equal(namedFungalContacts(garden, target, calculateEnvironment(garden)).has('Rainmorel'), true);
  garden = advanceGardenTime(garden, 24).garden;
  assert.equal(garden.objects[target].transformationSequence.Starlotus.phase, 'ready');
  const before = garden;
  const afterDrain = setBaseline(garden, target, 'Moisture', 'Damp');
  assert.equal(namedFungalContacts(afterDrain, target, calculateEnvironment(afterDrain)).has('Rainmorel'), false);
  garden = reconcileTransformationClocks(afterDrain, before);
  assert.equal(garden.objects[target].species, 'Starlotus');
  assert.equal(garden.objects[target].attunement, 'Damp');
});

test('prepared Moonlit Lotus clock survives JSON and resets if pre-drain contact is removed first', () => {
  let garden = preparedMoonlit();
  assert.deepEqual(migrateGarden(structuredClone(garden)).objects[target].transformationSequence,
    garden.objects[target].transformationSequence);
  const withoutContact = { ...garden.objects }; delete withoutContact[near[0]];
  garden = reconcileTransformationClocks({ ...garden, objects: withoutContact }, garden);
  assert.equal(garden.objects[target].transformationSequence.Starlotus.preparedHours, 0);
  garden = reconcileTransformationClocks(setBaseline(garden, target, 'Moisture', 'Damp'), garden);
  assert.equal(garden.objects[target].species, 'Moonlit Lotus');
  const forged = preparedMoonlit();
  forged.objects[target].transformationSequence.Starlotus.preparedHours = 10_000;
  assert.equal(migrateGarden(forged).objects[target].transformationSequence.Starlotus.preparedHours, 24);
});

test('Starlotus knows its origin, attunement survives migration, and native Leaves toggle instantly', () => {
  const kelpRecipe = TRANSFORMATIONS.Kelpergeist.find(recipe => recipe.into === 'Starlotus');
  const kelp = advanceGardenTime(arrange('Kelpergeist', kelpRecipe), 28).garden;
  const star = kelp.objects[target];
  assert.equal(star.attunement, 'Flooded');
  assert.equal(migrateGarden(structuredClone(kelp)).objects[target].attunement, 'Flooded');
  const mature = { ...star, progress: 150, production: { ...star.production, ordinaryLeaves: 25 } };
  assert.equal(availableHarvest(mature, [], { Moisture: 'Flooded' }).leaves, 40);
  assert.equal(availableHarvest(mature, [], { Moisture: 'Damp' }).leaves, 25);
  assert.equal(availableHarvest(mature, [], { Moisture: 'Flooded' }).leaves, 40);
  assert.equal(availableHarvest({ ...mature, attunement: 'Damp' }, [], { Moisture: 'Damp' }).leaves, 40);
});

test('Silvercress has independent growth and ripening traits; Aqua compatibility is conditional', () => {
  const silver = makePlant('Silvercress');
  const flooded = { Moisture: 'Flooded', Temperature: 'Temperate', Illumination: 'Lit' };
  const damp = { ...flooded, Moisture: 'Damp' };
  assert.equal(plantGrowthRates(silver, flooded).growth, 1.6);
  assert.equal(plantGrowthRates(silver, damp).growth, 1);
  assert.equal(plantGrowthRates({ ...silver, progress: 120 }, flooded).ripening, 1);
  assert.equal(effectCompatibility(PLANTS.Silvercress, 'growthRate', flooded, .2, 50), 2);
  assert.equal(effectCompatibility(PLANTS.Silvercress, 'growthRate', flooded, .2, 120), 1);
  assert.equal(effectCompatibility(PLANTS.Silvercress, 'leafYield', damp, .2, 120), 2);
  const ripening = { ...silver, progress: 140, production: { ...silver.production, ordinaryLeaves: 16 } };
  assert.equal(availableHarvest(ripening, [], flooded).leaves, 16);
  assert.equal(availableHarvest(ripening, [], damp).leaves, 24);
  assert.equal(effectCompatibility(PLANTS['Moonlit Lotus'], 'ripeningRate', flooded, -.2), 1.7);
  assert.equal(effectCompatibility(PLANTS['Moonlit Lotus'], 'ripeningRate', flooded, .2), 1);
  assert.equal(effectCompatibility(PLANTS.Cresscent, 'germination', damp), 2);
  assert.equal(plantOutputRate('Cresscent', flooded, 'seed'), .85);
  assert.equal(plantOutputRate('Cresscent', flooded), 1);
});

test('Algea sowing and different-species harvest obey Seed identity; Starlotus is sterile', () => {
  let garden = createGarden();
  const result = sowPlant(garden, '0,0', 'Algea', 4, () => .99);
  assert.equal(result.success, true);
  assert.equal(result.garden.inventory.seeds['Algea'], 12);
  garden = placeObject(garden, '4,4', { ...makePlant('Kelpfull'), progress: 200,
    production: { ordinaryLeaves: 0, ordinarySeeds: 20, hourlyLeaves: 0, hourlySeeds: 0 } });
  const harvested = harvestPlant(garden, '4,4');
  assert.equal(harvested.inventory.seeds['Algea'], 36);
  const sterile = { ...makePlant('Starlotus', 'Damp'), progress: 150,
    production: { ordinaryLeaves: 25, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0 } };
  const other = placeObject(harvested, '4,4', sterile);
  assert.equal(harvestPlant(other, '4,4').inventory.seeds.Starlotus, undefined);
});
