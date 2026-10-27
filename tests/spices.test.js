import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLANTS, TRANSFORMATIONS, makePlant, makeFungus, createGarden, placeObject, removeObject,
  setBaseline, neighborsOf, calculateEnvironment, advanceGardenTime, plantGrowthRates,
  plantOutputRate, effectCompatibility, transformationStatus, reconcileTransformationClocks,
  availableHarvest, harvestPlant, sowPlant, migrateGarden, makeSource, makeInfluence,
  placeEdgeBlocker, makeBlocker, namedFungalContacts,
} from '../src/core/index.js';

const key = '4,4';
const neighbors = neighborsOf(key);
const spices = Object.entries(PLANTS).filter(([, profile]) => profile.family === 'Spices');
const routes = Object.entries(TRANSFORMATIONS).flatMap(([from, recipes]) =>
  recipes.filter(() => PLANTS[from]?.family === 'Spices').map(recipe => [from, recipe]));
const condition = (moisture, temperature, illumination) =>
  ({ Moisture: moisture, Temperature: temperature, Illumination: illumination });

function start(species, baselines = condition('Damp', 'Temperate', 'Lit')) {
  const initial = placeObject(createGarden(9, 9), key, makePlant(species));
  return { ...initial, hexes: Object.fromEntries(Object.keys(initial.hexes)
    .map(at => [at, { baselines }])) };
}

function edit(garden, property, value, at = key) {
  return reconcileTransformationClocks(setBaseline(garden, at, property, value), garden);
}

function fungus(garden, species, at = neighbors[0], heading = 0) {
  return reconcileTransformationClocks(placeObject(garden, at, makeFungus(species, heading)), garden);
}

function remove(garden, at) {
  return reconcileTransformationClocks(removeObject(garden, at), garden);
}

// Real propagation, Fungal footprints and adjacency, never artificial contacts.
function arrange(from, recipe, alternatives = null) {
  const groups = alternatives || recipe.contacts;
  for (const heading of groups.some(group => group[0] === 'Prismorel') ? [0, 1, 2, 3, 4, 5] : [0]) {
    let base = start(from);
    groups.forEach((group, index) => {
      base = placeObject(base, neighbors[index], makeFungus(group[0], heading));
    });
    for (const moisture of ['Dry', 'Damp', 'Flooded']) {
      for (const temperature of ['Freezing', 'Cold', 'Temperate', 'Warm', 'Hot']) {
        for (const illumination of ['Dark', 'Dim', 'Lit', 'Bright']) {
          const baselines = condition(moisture, temperature, illumination);
          const candidate = { ...base, hexes: Object.fromEntries(Object.keys(base.hexes)
            .map(at => [at, { baselines }])) };
          const eligible = transformationStatus(candidate, key).find(status => status.into === recipe.into)?.eligible;
          if (eligible) return candidate;
        }
      }
    }
  }
  throw new Error(`No physically valid baseline layout: ${from} → ${recipe.into}`);
}

test('Spices is the complete sixth family: all ten approved profiles, eleven exact recipes', () => {
  assert.equal(spices.length, 10);
  assert.equal(Object.keys(PLANTS).length, 60);
  assert.equal(routes.length, 11);
  assert.equal(Object.values(TRANSFORMATIONS).reduce((sum, recipes) => sum + recipes.length, 0), 69);
  assert.deepEqual(Object.fromEntries(routes.map(([from, recipe]) => [`${from} → ${recipe.into}`, recipe.hours])), {
    'Thymely → Sunrice': 12, 'Thymely → Moonrice': 14, 'Thymely → Shadow Onion': 16,
    'Sunrice → Starberry': 18, "Sunrice → Pum'king": 24,
    'Moonrice → Thymekeeper': 18, 'Moonrice → Ghost Rice': 20,
    'Shadow Onion → Dillusion': 18, 'Starberry → Glass Apple': 28,
    'Ghost Rice → Glass Apple': 12, "Dillusion → Pum'king": 22,
  });
  assert.equal(PLANTS.Thymely.germination, .28);
  assert.equal(PLANTS.Starberry.germination, .18);
  assert.equal(PLANTS.Thymekeeper.germination, null);
  assert.equal(PLANTS.Thymekeeper.seedSpecies, 'Sunrice');
  assert.equal(PLANTS['Ghost Rice'].seedSpecies, 'Moonrice');
  assert.equal(PLANTS.Starberry.seedSpecies, 'Sunrice');
  assert.equal(PLANTS['Glass Apple'].seedSpecies, 'Starberry');
  assert.equal(PLANTS["Pum'king"].seedSpecies, null);
  assert.equal(PLANTS["Pum'king"].seeds, 0);
});

test('all ten sustained routes qualify only via actual living fungal contact and finish at exact hour', () => {
  const sustained = routes.filter(([, recipe]) => !recipe.sequence);
  assert.equal(sustained.length, 10, 'there are ten sustained Spices routes and one two-phase route');
  for (const [from, recipe] of sustained) {
    let garden = arrange(from, recipe);
    const environment = calculateEnvironment(garden);
    assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, true);
    assert.deepEqual(Object.entries(recipe.conditions).map(([prop, value]) => environment.conditions[key][prop] === value),
      Object.keys(recipe.conditions).map(() => true));
    garden = advanceGardenTime(garden, recipe.hours - 1).garden;
    assert.equal(garden.objects[key].species, from, `${from} → ${recipe.into} too early`);
    garden = advanceGardenTime(garden, 1).garden;
    assert.equal(garden.objects[key].species, recipe.into, `${from} → ${recipe.into} missed completion`);
    assert.equal(garden.objects[key].progress, 0);
    assert.deepEqual(garden.objects[key].transformationClocks, {});
  }
});

test('every approved OR alternative can substitute with physically reaching effects', () => {
  for (const [from, recipe] of routes.filter(([, recipe]) => !recipe.sequence)) {
    recipe.contacts.forEach((group, index) => {
      for (const name of group) {
        const contacts = recipe.contacts.map((choices, idx) => [idx === index ? name : choices[0]]);
        const garden = arrange(from, recipe, contacts);
        assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, true,
          `${from} → ${recipe.into} must accept ${name}`);
      }
    });
  }
});

test('Pum\'king requires positive AND negative real fungal environmental light on the target', () => {
  for (const from of ['Sunrice', 'Dillusion']) {
    const recipe = TRANSFORMATIONS[from].find(item => item.into === "Pum'king");
    let garden = arrange(from, recipe);
    const emissions = calculateEnvironment(garden).modifiers[key].Illumination;
    assert.ok(emissions.some(entry => entry.kind === 'Luminous' && entry.modifier > 0));
    assert.ok(emissions.some(entry => entry.kind === 'Luminous' && entry.modifier < 0));
    assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Lit');
    const partial = advanceGardenTime(garden, recipe.hours - 2).garden;
    garden = remove(partial, neighbors[1]);
    assert.equal(garden.objects[key].transformationClocks[recipe.into], 0,
      'interruption clears progress instantly even when a net-Lit source is used');
    const negative = recipe.contacts[1][0];
    garden = fungus(garden, negative, neighbors[1]);
    assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, true);
    garden = advanceGardenTime(garden, 2).garden;
    assert.equal(garden.objects[key].species, from, 'interrupted timer may not retain old qualifying hours');
    garden = advanceGardenTime(garden, recipe.hours - 2).garden;
    assert.equal(garden.objects[key].species, "Pum'king");
  }
});

test('Pum\'king rejects Source-only light, same-sign light, and cultivation-only named contact', () => {
  const recipe = TRANSFORMATIONS.Sunrice.find(item => item.into === "Pum'king");
  const complete = arrange('Sunrice', recipe);
  const withoutDark = remove(complete, neighbors[1]);
  const replacement = reconcileTransformationClocks(placeObject(withoutDark, neighbors[1],
    makeSource([makeInfluence('Dimming', 1, 2)])), withoutDark);
  assert.equal(transformationStatus(replacement, key).find(item => item.into === recipe.into).eligible, false,
    'a nonfungal Darkening Source cannot serve as the negative named Fungus');
  const onlyContact = { ...complete, objects: { ...complete.objects,
    [neighbors[1]]: { ...complete.objects[neighbors[1]], emissions: [] } } };
  const substituteSource = placeObject(onlyContact, neighbors[2],
    makeSource([makeInfluence('Dimming', 1, 2)]));
  const alternate = calculateEnvironment(substituteSource);
  assert.equal(alternate.conditions[key].Illumination, 'Lit', 'Source cancellation keeps net Lit');
  assert.equal(namedFungalContacts(substituteSource, key, alternate).has(recipe.contacts[1][0]), true,
    'the named darkening fungus still reaches via its cultivation footprint');
  assert.equal(transformationStatus(substituteSource, key).find(item => item.into === recipe.into).eligible, false,
    'a named Fungus with cultivation contact but no environmental Darkening fails');
  assert.ok(alternate.modifiers[key].Illumination.some(entry => entry.modifier < 0));
  const sameSign = { ...complete, objects: { ...complete.objects,
    [neighbors[1]]: { ...complete.objects[neighbors[1]],
      emissions: [makeInfluence('Brightening', 1, 2)] } } };
  assert.equal(transformationStatus(sameSign, key).find(item => item.into === recipe.into).eligible, false,
    'the named negative group cannot use the wrong emission sign');
});

test('Pum\'king loses qualification when a Luminous blocker stops the selected emission footprint', () => {
  const recipe = TRANSFORMATIONS.Dillusion[0];
  const original = arrange('Dillusion', recipe);
  let garden = original;
  for (const neighbor of neighbors) garden = placeEdgeBlocker(garden, key, neighbor, makeBlocker('kind', 'Luminous'));
  assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, false);
});

test('Ghost Rice Dark preparation is exactly 12h; leave Dark, pass through Dim, then reach Lit', () => {
  let garden = start('Ghost Rice', condition('Damp', 'Temperate', 'Dim'));
  garden = fungus(garden, 'Gloamclock');
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dark');
  garden = advanceGardenTime(garden, 11).garden;
  assert.equal(transformationStatus(garden, key)[0].phase, 'preparing');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(transformationStatus(garden, key)[0].phase, 'ready');
  garden = remove(garden, neighbors[0]);
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dim');
  assert.equal(transformationStatus(garden, key)[0].phase, 'crossing');
  garden = advanceGardenTime(garden, 7).garden;
  assert.equal(garden.objects[key].species, 'Ghost Rice');
  assert.equal(transformationStatus(garden, key)[0].elapsed, 7);
  garden = fungus(garden, 'Lanterncap');
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Lit');
  assert.equal(garden.objects[key].species, 'Glass Apple', 'completion occurs on the edit, not an extra tick');
  assert.equal(garden.objects[key].progress, 0);
  assert.equal(garden.objects[key].attunement, undefined);
});

test('Ghost Rice succeeds on the eighth transition hour, not the ninth', () => {
  for (const hours of [8, 9]) {
    let garden = fungus(start('Ghost Rice', condition('Damp', 'Cold', 'Dim')), 'Duskleaf');
    assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dark');
    garden = advanceGardenTime(garden, 12).garden;
    garden = remove(garden, neighbors[0]);
    garden = advanceGardenTime(garden, hours).garden;
    assert.equal(garden.objects[key].species, 'Ghost Rice');
    garden = fungus(garden, 'Lanterncap');
    assert.equal(garden.objects[key].species, hours === 8 ? 'Glass Apple' : 'Ghost Rice');
    if (hours === 9) {
      assert.equal(garden.objects[key].transformationSequence['Glass Apple'].phase, 'preparing');
    }
  }
});

test('Ghost Rice rejects incomplete preparation, lost Damp/valid Temperature, and returning to Dark', () => {
  for (const broken of ['early', 'dry', 'hot', 'return']) {
    let garden = fungus(start('Ghost Rice', condition('Damp', 'Temperate', 'Dim')), 'Gloamclock');
    garden = advanceGardenTime(garden, broken === 'early' ? 11 : 12).garden;
    garden = remove(garden, neighbors[0]);
    if (broken === 'dry') garden = edit(garden, 'Moisture', 'Dry');
    if (broken === 'hot') garden = edit(garden, 'Temperature', 'Hot');
    if (broken === 'return') garden = fungus(garden, 'Gloamclock', neighbors[1]);
    garden = remove(garden, neighbors[1]) || garden;
    if (broken === 'dry') garden = edit(garden, 'Moisture', 'Damp');
    if (broken === 'hot') garden = edit(garden, 'Temperature', 'Temperate');
    garden = fungus(garden, 'Lanterncap');
    assert.equal(garden.objects[key].species, 'Ghost Rice', broken);
  }
});

test('approved Spices light and moisture tables govern both lifecycle and incremental production', () => {
  const best = condition('Damp', 'Temperate', 'Bright');
  assert.equal(plantGrowthRates(makePlant('Sunrice'), best).growth, 1);
  assert.equal(plantOutputRate('Sunrice', best), 1);
  assert.equal(plantGrowthRates(makePlant('Sunrice'), { ...best, Illumination: 'Lit' }).growth, .75);
  assert.equal(plantOutputRate('Sunrice', { ...best, Illumination: 'Lit' }), .65);
  assert.equal(plantOutputRate('Starberry', { ...best, Illumination: 'Lit' }), .5);
  assert.equal(plantOutputRate('Ghost Rice', { ...best, Illumination: 'Dark' }), 1);
  assert.equal(plantOutputRate('Ghost Rice', { ...best, Illumination: 'Lit' }), .4);
  assert.equal(plantOutputRate('Moonrice', { ...best, Illumination: 'Bright' }, 'seed'), .4);
  assert.equal(plantOutputRate('Dillusion', { ...best, Illumination: 'Dim' }), 1);
  assert.equal(plantOutputRate('Dillusion', { ...best, Illumination: 'Lit' }), 1);
  assert.equal(plantOutputRate("Pum'king", { ...best, Illumination: 'Lit' }), 1);
  assert.equal(plantOutputRate("Pum'king", best), .5);
  assert.equal(plantOutputRate('Glass Apple', { ...best, Illumination: 'Lit' }, 'seed'), .6);
  assert.equal(plantGrowthRates(makePlant('Moonrice'),
    condition('Dry', 'Cold', 'Dim')).growth, .55);
  assert.equal(plantOutputRate('Sunrice', condition('Dry', 'Cold', 'Bright')), .5 * .85);
  assert.equal(plantOutputRate('Starberry', condition('Flooded', 'Warm', 'Bright')), .65);
});

test('conditional recipient Effect compatibility never rewrites emitter direction', () => {
  for (const [species, kind, light, special, other] of [
    ['Sunrice', 'leafYield', 'Bright', 2, 1.3],
    ['Moonrice', 'seedYield', 'Dim', 2.2, 1.4],
    ['Shadow Onion', 'growthRate', 'Dark', 1.5, 1],
    ['Starberry', 'leafYield', 'Bright', 2.6, 1.3],
    ['Thymekeeper', 'seedYield', 'Dim', 2.8, 1.6],
    ['Ghost Rice', 'leafYield', 'Dark', 2.5, 1.3],
    ["Pum'king", 'leafYield', 'Lit', 2.8, 1],
    ['Glass Apple', 'leafYield', 'Bright', 3, 1.2],
  ]) {
    const profile = PLANTS[species];
    assert.equal(effectCompatibility(profile, kind, condition('Damp', 'Temperate', light), -.2), special);
    const differentLight = light === 'Bright' ? 'Lit' : 'Bright';
    assert.equal(effectCompatibility(profile, kind, condition('Damp', 'Temperate', differentLight), -.2), other);
  }
  assert.equal(effectCompatibility(PLANTS["Pum'king"], 'hourlySeed'), 0);
  assert.equal(effectCompatibility(PLANTS['Glass Apple'], 'seedTiming'), 1.6);
});

test('Seed identities remain invariant through one harvest, including sterile Pum\'king', () => {
  for (const [species, seedSpecies, expected] of [
    ['Thymekeeper', 'Sunrice', 28], ['Ghost Rice', 'Moonrice', 11],
    ['Starberry', 'Sunrice', 8], ['Glass Apple', 'Starberry', 24], ["Pum'king", null, 0],
  ]) {
    let garden = start(species, condition('Damp', 'Temperate',
      ['Thymekeeper'].includes(species) ? 'Dim' : ['Ghost Rice'].includes(species) ? 'Dark'
        : species === "Pum'king" ? 'Lit' : 'Bright'));
    garden = advanceGardenTime(garden, PLANTS[species].totalDays * 24).garden;
    const harvest = availableHarvest(garden.objects[key]);
    assert.equal(harvest.seeds, expected, `${species} full-habitat harvest`);
    const collected = harvestPlant(garden, key);
    assert.equal(collected.inventory.seeds[seedSpecies] || 0, expected, `${species} credit identity`);
    assert.equal(collected.inventory.seeds[species] || 0, 0);
  }
});

test('Thymely starter Seeds are added once on old save migration and explicit zero stays zero', () => {
  const initial = createGarden();
  assert.equal(initial.inventory.seeds.Thymely, 16);
  const old = structuredClone(initial);
  delete old.inventory.seeds.Thymely;
  assert.equal(migrateGarden(old).inventory.seeds.Thymely, 16);
  old.inventory.seeds.Thymely = 0;
  assert.equal(migrateGarden(old).inventory.seeds.Thymely, 0);
  const sowed = sowPlant(initial, key, 'Thymely', 4, () => 0);
  assert.equal(sowed.chance, 1);
  assert.equal(sowed.garden.objects[key].species, 'Thymely');
  assert.equal(sowed.garden.inventory.seeds.Thymely, 12);
});

test('species without approved Seed availability reject forged stock even under germination Effects', () => {
  let garden = start('Thymely');
  garden = { ...garden, objects: {}, inventory: { ...garden.inventory,
    seeds: { ...garden.inventory.seeds, "Pum'king": 99, 'Glass Apple': 99 } } };
  for (const species of ["Pum'king", 'Glass Apple']) {
    assert.throws(() => sowPlant(garden, key, species, 4, () => 0), /no plantable Seeds/);
  }
});

test('Ghost Rice sequence survives save migration while copied clocks are bounded', () => {
  let garden = fungus(start('Ghost Rice', condition('Damp', 'Temperate', 'Dim')), 'Gloamclock');
  garden = advanceGardenTime(garden, 12).garden;
  garden = remove(garden, neighbors[0]);
  garden = advanceGardenTime(garden, 3).garden;
  const restored = migrateGarden(JSON.parse(JSON.stringify(garden)));
  assert.deepEqual(restored.objects[key].transformationSequence['Glass Apple'],
    { phase: 'crossing', preparedHours: 12, windowHours: 3 });
  garden = fungus(restored, 'Lanterncap');
  assert.equal(garden.objects[key].species, 'Glass Apple');
});
