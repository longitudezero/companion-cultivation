import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLANTS, createGarden, isGarden, placeObject, makePlant, makeFungus,
  availableHarvest, harvestPlant, migrateGarden, resizeGarden, sowPlant,
} from '../src/core/index.js';

function readyPlant(species, leaves, seeds = 0) {
  const plant = makePlant(species);
  return { ...plant, progress: 150, production: {
    ordinaryLeaves: leaves, ordinarySeeds: seeds, hourlyLeaves: 0, hourlySeeds: 0,
  } };
}

test('new schema 7 gardens track separate Leaf stacks rather than generic fungible currency', () => {
  const garden = createGarden();
  assert.equal(garden.schemaVersion, 7);
  assert.equal(isGarden(garden), true);
  assert.deepEqual(garden.inventory.leaves, {});
  assert.equal(garden.inventory.legacyLeaves, 0);
  assert.equal(Object.keys(PLANTS).length, 60);
});

test('harvesting Plants from three families credits three named Leaf items and no generic pot', () => {
  let garden = createGarden();
  for (const [at, species, leaves] of [
    ['2,2', 'Beanstalk', 10], ['3,2', 'Daisydaze', 16], ['4,2', 'Thymekeeper', 7],
  ]) garden = placeObject(garden, at, readyPlant(species, leaves));
  for (const at of ['2,2', '3,2', '4,2']) garden = harvestPlant(garden, at);
  assert.deepEqual(garden.inventory.leaves,
    { Beanstalk: 10, Daisydaze: 16, Thymekeeper: 7 });
  assert.equal(garden.inventory.legacyLeaves, 0);
  assert.equal(garden.objects['2,2'], undefined);
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Beanstalk', 4)), '2,2');
  assert.deepEqual(garden.inventory.leaves,
    { Beanstalk: 14, Daisydaze: 16, Thymekeeper: 7 }, 'only matching species stacks combine');
});

test('all sixty Plant profiles harvest into their own Leaf stack, including Leaf-sterile exceptions', () => {
  let garden = createGarden();
  const withoutLeaves = [];
  for (const species of Object.keys(PLANTS)) {
    const plant = readyPlant(species, 5);
    garden = harvestPlant(placeObject(garden, '2,2', plant), '2,2');
    if (species === 'Bamboozled') withoutLeaves.push(species);
    else assert.equal(garden.inventory.leaves[species], 5, species);
  }
  assert.deepEqual(withoutLeaves, ['Bamboozled']);
  assert.equal(Object.keys(garden.inventory.leaves).length, 59);
  assert.equal(Object.values(garden.inventory.leaves).reduce((total, n) => total + n, 0), 59 * 5);
});

test('Leaf identity follows producer, independently of cross-species or mixed Seed identities', () => {
  let garden = createGarden();
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Saffrune', 24, 11)), '2,2');
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Phantarragon', 58, 24)), '2,2');
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Everjade', 7, 28)), '2,2');
  assert.deepEqual(garden.inventory.leaves,
    { 'Saffrune': 24, 'Phantarragon': 58, 'Everjade': 7 });
  assert.equal(garden.inventory.seeds.Clovely, 11, 'Saffrune produces Clovely Seeds');
  assert.equal(garden.inventory.seeds.Cinnamancer, 24, 'Phantarragon produces Cinnamancer Seeds');
  assert.equal(garden.inventory.seeds['Aloechemist'], 14, 'Everjade splits its Seeds');
  assert.equal(garden.inventory.seeds.Moonjade, 14);
  assert.equal(garden.inventory.seeds['Saffrune'], undefined);
  assert.equal(garden.inventory.seeds['Phantarragon'], undefined);
});

test('the retired Allocation effect no longer changes harvest totals or Plant Leaf identity', () => {
  let garden = placeObject(createGarden(), '2,2', readyPlant('Beanstalk', 12.99, 12.99));
  garden = placeObject(garden, '3,2', makeFungus('Frostfolio'));
  const computed = availableHarvest(garden.objects['2,2']);
  assert.equal(computed.leaves, 12);
  const harvested = harvestPlant(garden, '2,2');
  assert.deepEqual(harvested.inventory.leaves, { Beanstalk: 12 });
  assert.equal(harvested.inventory.seeds.Beanstalk, 28);
});

test('Leaf-sterile Bamboozled yields a trophy but no empty or fictitious Leaf stack', () => {
  let garden = createGarden();
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Bamboozled', 50)), '2,2');
  assert.deepEqual(garden.inventory.leaves, {});
  assert.equal(garden.inventory.trophies.bambooSteel, 1);
});

test('V6 generic Leaves remain unattributed and never turn into Beanstalk Leaves', () => {
  const old = createGarden();
  old.inventory.legacyLeaves = 73;
  const saved = structuredClone(old);
  const migrated = migrateGarden(old);
  assert.deepEqual(old, saved, 'migration does not modify the supplied save');
  assert.equal(migrated.schemaVersion, 7);
  assert.deepEqual(migrated.inventory.leaves, {});
  assert.equal(migrated.inventory.legacyLeaves, 73);
  const harvested = harvestPlant(placeObject(migrated, '2,2', readyPlant('Beanstalk', 8)), '2,2');
  assert.deepEqual(harvested.inventory.leaves, { Beanstalk: 8 });
  assert.equal(harvested.inventory.legacyLeaves, 73);
  assert.deepEqual(migrateGarden(JSON.parse(JSON.stringify(harvested))), harvested);
  assert.deepEqual(resizeGarden(harvested, 10, 10).inventory, harvested.inventory);
});

test('schema 1, 2, and 5 saves are deliberately incompatible with V6', () => {
  for (const version of [1, 2, 5]) {
    const old = createGarden();
    old.schemaVersion = version;
    assert.throws(() => migrateGarden(old), /Unsupported garden file/);
  }
});

test('typed Leaf items persist on save/load, invalid amounts do not mint items', () => {
  const garden = createGarden();
  garden.inventory.leaves = { Beanstalk: 9, 'Phantarragon': 12,
    Daisydaze: -7, Thymekeeper: 1.25, 'Unknown Plant': 400 };
  garden.inventory.legacyLeaves = 4;
  const migrated = migrateGarden(garden);
  assert.deepEqual(migrated.inventory.leaves,
    { Beanstalk: 9, 'Phantarragon': 12, Daisydaze: 0, Thymekeeper: 0 });
  assert.equal(migrated.inventory.legacyLeaves, 4);
  assert.deepEqual(migrateGarden(migrated), migrated);
});

test('existing seed sowing still works in inventory with per-species Leaves', () => {
  const attempt = sowPlant(createGarden(), '2,2', 'Thymekeeper', 4, () => 0);
  assert.equal(attempt.success, true);
  assert.equal(attempt.garden.inventory.seeds.Thymekeeper, 12);
  assert.deepEqual(attempt.garden.inventory.leaves, {});
});
