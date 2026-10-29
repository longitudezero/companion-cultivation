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

function fungus(garden, species, at = neighbors[0], heading = neighborsOf(at).indexOf(key)) {
  return reconcileTransformationClocks(placeObject(garden, at, makeFungus(species, heading)), garden);
}

function remove(garden, at) {
  return reconcileTransformationClocks(removeObject(garden, at), garden);
}

// Real propagation, Fungal footprints and adjacency, never artificial contacts.
function arrange(from, recipe, alternatives = null) {
  const groups = alternatives || recipe.contacts;
  for (const heading of [null]) {
    let base = start(from);
    groups.forEach((group, index) => {
      base = placeObject(base, neighbors[index], makeFungus(group[0],
        heading ?? neighborsOf(neighbors[index]).indexOf(key)));
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
    'Thymekeeper → Oreganoir': 12, 'Thymekeeper → Clovely': 14, 'Thymekeeper → Dilly-Dally Dill': 16,
    'Oreganoir → Cinnamancer': 18, "Oreganoir → Papriking": 24,
    'Clovely → Mighty Mint': 18, 'Clovely → Saffrune': 20,
    'Dilly-Dally Dill → Wyrmsalt': 18, 'Cinnamancer → Phantarragon': 28,
    'Saffrune → Phantarragon': 12, "Wyrmsalt → Papriking": 22,
  });
  assert.equal(PLANTS.Thymekeeper.germination, .28);
  assert.equal(PLANTS.Cinnamancer.germination, .18);
  assert.equal(PLANTS['Mighty Mint'].germination, null);
  assert.equal(PLANTS['Mighty Mint'].seedSpecies, 'Oreganoir');
  assert.equal(PLANTS['Saffrune'].seedSpecies, 'Clovely');
  assert.equal(PLANTS.Cinnamancer.seedSpecies, 'Oreganoir');
  assert.equal(PLANTS['Phantarragon'].seedSpecies, 'Cinnamancer');
  assert.equal(PLANTS["Papriking"].seedSpecies, null);
  assert.equal(PLANTS["Papriking"].seeds, 0);
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

test('Pum\'king requires both named fungal contacts and continuous state, irrespective of emission signs', () => {
  for (const from of ['Oreganoir', 'Wyrmsalt']) {
    const recipe = TRANSFORMATIONS[from].find(item => item.into === "Papriking");
    let garden = arrange(from, recipe);
    assert.ok(namedFungalContacts(garden, key, calculateEnvironment(garden)).has(recipe.contacts[0][0]));
    assert.ok(namedFungalContacts(garden, key, calculateEnvironment(garden)).has(recipe.contacts[1][0]));
    assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Lit');
    const partial = advanceGardenTime(garden, recipe.hours - 2).garden;
    garden = remove(partial, neighbors[1]);
    assert.equal(garden.objects[key].transformationClocks[recipe.into], 0,
      'interruption clears progress instantly even if the state remains Lit');
    garden = fungus(garden, recipe.contacts[1][0], neighbors[1]);
    assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, true);
    garden = advanceGardenTime(garden, 2).garden;
    assert.equal(garden.objects[key].species, from, 'interrupted timer may not retain old qualifying hours');
    garden = advanceGardenTime(garden, recipe.hours - 2).garden;
    assert.equal(garden.objects[key].species, "Papriking");
  }
});

test('Pum\'king ignores emission signs, accepts cultivation-only contact, and rejects anonymous substitutes', () => {
  const recipe = TRANSFORMATIONS.Oreganoir.find(item => item.into === "Papriking");
  let complete = start('Oreganoir', condition('Damp', 'Temperate', 'Lit'));
  for (const neighbor of neighbors) complete = placeEdgeBlocker(complete, key, neighbor,
    makeBlocker('kind', 'Luminous'));
  complete = fungus(complete, 'Prismorel', neighbors[0]);
  complete = fungus(complete, 'Mistruffle', neighbors[1]);
  assert.equal(transformationStatus(complete, key).find(item => item.into === recipe.into).eligible, true);
  assert.equal(calculateEnvironment(complete).modifiers[key].Illumination.length, 0);
  const withoutDark = remove(complete, neighbors[1]);
  const replacement = reconcileTransformationClocks(placeObject(withoutDark, neighbors[1],
    makeSource([makeInfluence('Dimming', 1, 2)])), withoutDark);
  assert.equal(transformationStatus(replacement, key).find(item => item.into === recipe.into).eligible, false,
    'a nonfungal Source cannot serve as the missing named Fungus');
  const onlyContact = { ...complete, objects: { ...complete.objects,
    [neighbors[1]]: { ...complete.objects[neighbors[1]], emissions: [] } } };
  const alternate = calculateEnvironment(onlyContact);
  assert.equal(namedFungalContacts(onlyContact, key, alternate).has('Mistruffle'), true);
  assert.equal(transformationStatus(onlyContact, key).find(item => item.into === recipe.into).eligible, true,
    'named cultivation contact is sufficient despite no environmental emission');
  const sameSign = { ...onlyContact, objects: { ...onlyContact.objects,
    [neighbors[1]]: { ...complete.objects[neighbors[1]],
      emissions: [makeInfluence('Brightening', 1, 2)] } } };
  assert.equal(transformationStatus(sameSign, key).find(item => item.into === recipe.into).eligible, true,
    'emission sign never replaces the named contact/state requirements');
});

test('Pum\'king remains qualified through cultivation contacts when Luminous emissions are blocked', () => {
  const recipe = TRANSFORMATIONS.Wyrmsalt[0];
  const original = arrange('Wyrmsalt', recipe);
  let garden = original;
  for (const neighbor of neighbors) garden = placeEdgeBlocker(garden, key, neighbor, makeBlocker('kind', 'Luminous'));
  garden = setBaseline(garden, key, 'Illumination', 'Lit');
  assert.equal(transformationStatus(garden, key).find(item => item.into === recipe.into).eligible, true);
});

test('Saffrune Dark preparation is exactly 12h; leave Dark, pass through Dim, then reach Lit', () => {
  let garden = start('Saffrune', condition('Damp', 'Temperate', 'Dim'));
  garden = fungus(garden, 'Hushroom');
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dark');
  garden = advanceGardenTime(garden, 11).garden;
  assert.equal(transformationStatus(garden, key)[0].phase, 'preparing');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(transformationStatus(garden, key)[0].phase, 'ready');
  garden = remove(garden, neighbors[0]);
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dim');
  assert.equal(transformationStatus(garden, key)[0].phase, 'crossing');
  garden = advanceGardenTime(garden, 7).garden;
  assert.equal(garden.objects[key].species, 'Saffrune');
  assert.equal(transformationStatus(garden, key)[0].elapsed, 7);
  garden = fungus(garden, 'Prismorel');
  assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Lit');
  assert.equal(garden.objects[key].species, 'Phantarragon', 'completion occurs on the edit, not an extra tick');
  assert.equal(garden.objects[key].progress, 0);
  assert.equal(garden.objects[key].attunement, undefined);
});

test('Saffrune succeeds on the eighth transition hour, not the ninth', () => {
  for (const hours of [8, 9]) {
    let garden = fungus(start('Saffrune', condition('Damp', 'Cold', 'Dim')), 'Hushroom');
    assert.equal(calculateEnvironment(garden).conditions[key].Illumination, 'Dark');
    garden = advanceGardenTime(garden, 12).garden;
    garden = remove(garden, neighbors[0]);
    garden = advanceGardenTime(garden, hours).garden;
    assert.equal(garden.objects[key].species, 'Saffrune');
    garden = fungus(garden, 'Prismorel');
    assert.equal(garden.objects[key].species, hours === 8 ? 'Phantarragon' : 'Saffrune');
    if (hours === 9) {
      assert.equal(garden.objects[key].transformationSequence['Phantarragon'].phase, 'preparing');
    }
  }
});

test('Saffrune rejects incomplete preparation, lost Damp/valid Temperature, and returning to Dark', () => {
  for (const broken of ['early', 'dry', 'hot', 'return']) {
    let garden = fungus(start('Saffrune', condition('Damp', 'Temperate', 'Dim')), 'Hushroom');
    garden = advanceGardenTime(garden, broken === 'early' ? 11 : 12).garden;
    garden = remove(garden, neighbors[0]);
    if (broken === 'dry') garden = edit(garden, 'Moisture', 'Dry');
    if (broken === 'hot') garden = edit(garden, 'Temperature', 'Hot');
    if (broken === 'return') garden = fungus(garden, 'Hushroom', neighbors[1]);
    garden = remove(garden, neighbors[1]) || garden;
    if (broken === 'dry') garden = edit(garden, 'Moisture', 'Damp');
    if (broken === 'hot') garden = edit(garden, 'Temperature', 'Temperate');
    garden = fungus(garden, 'Prismorel');
    assert.equal(garden.objects[key].species, 'Saffrune', broken);
  }
});

test('approved Spices light and moisture tables govern both lifecycle and incremental production', () => {
  const best = condition('Damp', 'Temperate', 'Bright');
  assert.equal(plantGrowthRates(makePlant('Oreganoir'), best).growth, 1);
  assert.equal(plantOutputRate('Oreganoir', best), 1);
  assert.equal(plantGrowthRates(makePlant('Oreganoir'), { ...best, Illumination: 'Lit' }).growth, .75);
  assert.equal(plantOutputRate('Oreganoir', { ...best, Illumination: 'Lit' }), .65);
  assert.equal(plantOutputRate('Cinnamancer', { ...best, Illumination: 'Lit' }), .5);
  assert.equal(plantOutputRate('Saffrune', { ...best, Illumination: 'Dark' }), 1);
  assert.equal(plantOutputRate('Saffrune', { ...best, Illumination: 'Lit' }), .4);
  assert.equal(plantOutputRate('Clovely', { ...best, Illumination: 'Bright' }, 'seed'), .4);
  assert.equal(plantOutputRate('Wyrmsalt', { ...best, Illumination: 'Dim' }), 1);
  assert.equal(plantOutputRate('Wyrmsalt', { ...best, Illumination: 'Lit' }), 1);
  assert.equal(plantOutputRate("Papriking", { ...best, Illumination: 'Lit' }), 1);
  assert.equal(plantOutputRate("Papriking", best), .5);
  assert.equal(plantOutputRate('Phantarragon', { ...best, Illumination: 'Lit' }, 'seed'), .6);
  assert.equal(plantGrowthRates(makePlant('Clovely'),
    condition('Dry', 'Cold', 'Dim')).growth, .55);
  assert.equal(plantOutputRate('Oreganoir', condition('Dry', 'Cold', 'Bright')), .5 * .85);
  assert.equal(plantOutputRate('Cinnamancer', condition('Flooded', 'Warm', 'Bright')), .65);
});

test('conditional recipient Effect compatibility never rewrites emitter direction', () => {
  for (const [species, kind, light, special, other] of [
    ['Oreganoir', 'leafYield', 'Bright', 2, 1.3],
    ['Clovely', 'seedYield', 'Dim', 2.2, 1.4],
    ['Dilly-Dally Dill', 'growthRate', 'Dark', 1.5, 1],
    ['Cinnamancer', 'leafYield', 'Bright', 2.6, 1.3],
    ['Mighty Mint', 'seedYield', 'Dim', 2.8, 1.6],
    ['Saffrune', 'leafYield', 'Dark', 2.5, 1.3],
    ["Papriking", 'leafYield', 'Lit', 2.8, 1],
    ['Phantarragon', 'leafYield', 'Bright', 3, 1.2],
  ]) {
    const profile = PLANTS[species];
    assert.equal(effectCompatibility(profile, kind, condition('Damp', 'Temperate', light), -.2), special);
    const differentLight = light === 'Bright' ? 'Lit' : 'Bright';
    assert.equal(effectCompatibility(profile, kind, condition('Damp', 'Temperate', differentLight), -.2), other);
  }
  assert.equal(effectCompatibility(PLANTS["Papriking"], 'hourlySeed'), 0);
  assert.equal(effectCompatibility(PLANTS['Phantarragon'], 'seedTiming'), 1.6);
});

test('Seed identities remain invariant through one harvest, including sterile Pum\'king', () => {
  for (const [species, seedSpecies, expected] of [
    ['Mighty Mint', 'Oreganoir', 28], ['Saffrune', 'Clovely', 11],
    ['Cinnamancer', 'Oreganoir', 8], ['Phantarragon', 'Cinnamancer', 24], ["Papriking", null, 0],
  ]) {
    let garden = start(species, condition('Damp', 'Temperate',
      ['Mighty Mint'].includes(species) ? 'Dim' : ['Saffrune'].includes(species) ? 'Dark'
        : species === "Papriking" ? 'Lit' : 'Bright'));
    garden = advanceGardenTime(garden, PLANTS[species].totalDays * 24).garden;
    const harvest = availableHarvest(garden.objects[key]);
    assert.equal(harvest.seeds, expected, `${species} full-habitat harvest`);
    const collected = harvestPlant(garden, key);
    assert.equal(collected.inventory.seeds[seedSpecies] || 0, expected, `${species} credit identity`);
    assert.equal(collected.inventory.seeds[species] || 0, 0);
  }
});

test('Thymekeeper starter Seeds are added once on old save migration and explicit zero stays zero', () => {
  const initial = createGarden();
  assert.equal(initial.inventory.seeds.Thymekeeper, 16);
  const old = structuredClone(initial);
  delete old.inventory.seeds.Thymekeeper;
  assert.equal(migrateGarden(old).inventory.seeds.Thymekeeper, 16);
  old.inventory.seeds.Thymekeeper = 0;
  assert.equal(migrateGarden(old).inventory.seeds.Thymekeeper, 0);
  const sowed = sowPlant(initial, key, 'Thymekeeper', 4, () => 0);
  assert.equal(sowed.chance, 1);
  assert.equal(sowed.garden.objects[key].species, 'Thymekeeper');
  assert.equal(sowed.garden.inventory.seeds.Thymekeeper, 12);
});

test('species without approved Seed availability reject forged stock even under germination Effects', () => {
  let garden = start('Thymekeeper');
  garden = { ...garden, objects: {}, inventory: { ...garden.inventory,
    seeds: { ...garden.inventory.seeds, "Papriking": 99, 'Phantarragon': 99 } } };
  for (const species of ["Papriking", 'Phantarragon']) {
    assert.throws(() => sowPlant(garden, key, species, 4, () => 0), /no plantable Seeds/);
  }
});

test('Saffrune sequence survives save migration while copied clocks are bounded', () => {
  let garden = fungus(start('Saffrune', condition('Damp', 'Temperate', 'Dim')), 'Hushroom');
  garden = advanceGardenTime(garden, 12).garden;
  garden = remove(garden, neighbors[0]);
  garden = advanceGardenTime(garden, 3).garden;
  const restored = migrateGarden(JSON.parse(JSON.stringify(garden)));
  assert.deepEqual(restored.objects[key].transformationSequence['Phantarragon'],
    { phase: 'crossing', preparedHours: 12, windowHours: 3 });
  garden = fungus(restored, 'Prismorel');
  assert.equal(garden.objects[key].species, 'Phantarragon');
});
