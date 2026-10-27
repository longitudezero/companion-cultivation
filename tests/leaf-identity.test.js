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

test('new schema 4 gardens track separate Leaf stacks rather than generic fungible currency', () => {
  const garden = createGarden();
  assert.equal(garden.schemaVersion, 4);
  assert.equal(isGarden(garden), true);
  assert.deepEqual(garden.inventory.leaves, {});
  assert.equal(garden.inventory.legacyLeaves, 0);
  assert.equal(Object.keys(PLANTS).length, 60);
});

test('harvesting Plants from three families credits three named Leaf items and no generic pot', () => {
  let garden = createGarden();
  for (const [at, species, leaves] of [
    ['2,2', 'Potato', 10], ['3,2', 'Daisydaze', 16], ['4,2', 'Thymely', 7],
  ]) garden = placeObject(garden, at, readyPlant(species, leaves));
  for (const at of ['2,2', '3,2', '4,2']) garden = harvestPlant(garden, at);
  assert.deepEqual(garden.inventory.leaves,
    { Potato: 10, Daisydaze: 16, Thymely: 7 });
  assert.equal(garden.inventory.legacyLeaves, 0);
  assert.equal(garden.objects['2,2'], undefined);
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Potato', 4)), '2,2');
  assert.deepEqual(garden.inventory.leaves,
    { Potato: 14, Daisydaze: 16, Thymely: 7 }, 'only matching species stacks combine');
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
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Ghost Rice', 24, 11)), '2,2');
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Glass Apple', 58, 24)), '2,2');
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Mirage Rose', 7, 28)), '2,2');
  assert.deepEqual(garden.inventory.leaves,
    { 'Ghost Rice': 24, 'Glass Apple': 58, 'Mirage Rose': 7 });
  assert.equal(garden.inventory.seeds.Moonrice, 11, 'Ghost Rice produces Moonrice Seeds');
  assert.equal(garden.inventory.seeds.Starberry, 24, 'Glass Apple produces Starberry Seeds');
  assert.equal(garden.inventory.seeds['Ember Aloe'], 14, 'Mirage Rose splits its Seeds');
  assert.equal(garden.inventory.seeds.Moonjade, 14);
  assert.equal(garden.inventory.seeds['Ghost Rice'], undefined);
  assert.equal(garden.inventory.seeds['Glass Apple'], undefined);
});

test('harvest-time Allocation changes the quantity, never the Plant Leaf item identity', () => {
  let garden = placeObject(createGarden(), '2,2', readyPlant('Potato', 12.99, 12.99));
  garden = placeObject(garden, '3,2', makeFungus('Frostfolio'));
  const computed = availableHarvest(garden.objects['2,2'], [{ kind: 'leafAllocation', amount: .8 }]);
  assert.equal(computed.leaves, 15);
  const harvested = harvestPlant(garden, '2,2');
  assert.deepEqual(harvested.inventory.leaves, { Potato: 15 });
  assert.equal(harvested.inventory.seeds.Potato, 19);
});

test('Leaf-sterile Bamboozled yields a trophy but no empty or fictitious Leaf stack', () => {
  let garden = createGarden();
  garden = harvestPlant(placeObject(garden, '2,2', readyPlant('Bamboozled', 50)), '2,2');
  assert.deepEqual(garden.inventory.leaves, {});
  assert.equal(garden.inventory.trophies.bambooSteel, 1);
});

test('legacy generic Leaves survive migration visibly unattributed and never turn into Potato Leaves', () => {
  const old = createGarden();
  old.schemaVersion = 2;
  old.inventory.leaves = 73;
  delete old.inventory.legacyLeaves;
  const saved = structuredClone(old);
  const migrated = migrateGarden(old);
  assert.deepEqual(old, saved, 'migration does not modify the supplied save');
  assert.equal(migrated.schemaVersion, 4);
  assert.deepEqual(migrated.inventory.leaves, {});
  assert.equal(migrated.inventory.legacyLeaves, 73);
  const harvested = harvestPlant(placeObject(migrated, '2,2', readyPlant('Potato', 8)), '2,2');
  assert.deepEqual(harvested.inventory.leaves, { Potato: 8 });
  assert.equal(harvested.inventory.legacyLeaves, 73);
  assert.deepEqual(migrateGarden(JSON.parse(JSON.stringify(harvested))), harvested);
  assert.deepEqual(resizeGarden(harvested, 10, 10).inventory, harvested.inventory);
});

test('schema 1 numeric Leaves and schema 2 zero stock both migrate without inventing Plant identities', () => {
  for (const [version, amount] of [[1, 6], [2, 0]]) {
    const old = createGarden();
    old.schemaVersion = version;
    old.inventory.leaves = amount;
    const fresh = migrateGarden(old);
    assert.deepEqual(fresh.inventory.leaves, {});
    assert.equal(fresh.inventory.legacyLeaves, amount);
    assert.equal(fresh.schemaVersion, 4);
  }
});

test('typed Leaf items persist on save/load, invalid amounts do not mint items', () => {
  const garden = createGarden();
  garden.inventory.leaves = { Potato: 9, 'Glass Apple': 12,
    Daisydaze: -7, Thymely: 1.25, 'Unknown Plant': 400 };
  garden.inventory.legacyLeaves = 4;
  const migrated = migrateGarden(garden);
  assert.deepEqual(migrated.inventory.leaves,
    { Potato: 9, 'Glass Apple': 12, Daisydaze: 0, Thymely: 0 });
  assert.equal(migrated.inventory.legacyLeaves, 4);
  assert.deepEqual(migrateGarden(migrated), migrated);
});

test('existing seed sowing still works in inventory with per-species Leaves', () => {
  const attempt = sowPlant(createGarden(), '2,2', 'Thymely', 4, () => 0);
  assert.equal(attempt.success, true);
  assert.equal(attempt.garden.inventory.seeds.Thymely, 12);
  assert.deepEqual(attempt.garden.inventory.leaves, {});
});
