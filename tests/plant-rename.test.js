import test from 'node:test';
import assert from 'node:assert/strict';
import { createGarden, makePlant, migrateGarden, keyAt, PLANTS, TRANSFORMATIONS } from '../src/core/index.js';
import { LEGACY_PLANT_NAMES, renameLegacyPlant } from '../src/core/plant-names.js';

test('every V6 plant identity maps to one current species without losing the seven-ingredient roster', () => {
  const targets = Object.values(LEGACY_PLANT_NAMES);
  assert.equal(new Set(targets).size, targets.length, 'renamed species must have unique destinations');
  for (const [previous, current] of Object.entries(LEGACY_PLANT_NAMES)) {
    assert.ok(PLANTS[current], `${previous} -> ${current} must have a profile`);
    assert.equal(renameLegacyPlant(previous), current);
  }
  assert.equal(PLANTS.Beanstalk.family, 'Ingredients');
  assert.equal(PLANTS.Potato.family, 'Ingredients');
  assert.equal(PLANTS.Cocoa, undefined);
  assert.equal(TRANSFORMATIONS.Beanstalk.length, 6);
  assert.equal(TRANSFORMATIONS.Potato, undefined);
});

test('V6 save migration preserves renamed living plants, both Potato identities, stock, staging and Grimoire facts', () => {
  const garden = createGarden();
  const [base, fruit, spice, flower, dark, pending, staged] = Array.from({ length: 7 }, (_, x) => keyAt(x, 0));
  const oldBase = { ...makePlant('Beanstalk'), species: 'Potato', progress: 83, ageHours: 40,
    transformationClocks: { Apple: 7, Carrot: 4 } };
  const oldFruit = { ...makePlant('Potato'), species: 'Apple', progress: 115 };
  const oldSpice = { ...makePlant('Mighty Mint'), species: 'Thymekeeper', progress: 125 };
  const oldFlower = { ...makePlant('Nightmarigold'), species: 'Marigloom', progress: 191 };
  const oldDark = { ...makePlant('Saffrune'), species: 'Ghost Rice',
    transformationSequence: { 'Glass Apple': { phase: 'preparing', preparedHours: 5, windowHours: 0 } } };
  const old = {
    ...garden, schemaVersion: 6,
    objects: { [base]: oldBase, [fruit]: oldFruit, [spice]: oldSpice, [flower]: oldFlower, [dark]: oldDark },
    inventory: { ...garden.inventory,
      seeds: { Potato: 4, Apple: 2, Thymely: 3, Thymekeeper: 9, Charmomile: 5, Marigloom: 2 },
      leaves: { Potato: 11, Apple: 12, Thymekeeper: 13, Marigloom: 14 } },
    inventorySlots: { 'seed:Potato': 25, 'seed:Apple': 26, 'leaf:Potato': 27,
      'leaf:Apple': 28, 'seed:Thymekeeper': 29 },
    pending: { [pending]: { kind: 'plant', species: 'Potato', quantity: 2, success: true, readyAt: 9 } },
    staged: { [staged]: { kind: 'plant', species: 'Apple', quantity: 1 } },
    grimoire: {
      plants: { Potato: true, Apple: true, Thymely: true, Thymekeeper: true, Charmomile: true, Marigloom: true },
      environments: { Potato: { 'Moisture:Damp': { property: 'Moisture', condition: 'Damp', signal: 'favourable' } } },
      fungalEffects: {},
      hazards: { Thymekeeper: { 'Dry:penalty': { hazard: 'Dry', outcome: 'penalty' } } },
      transformations: [{ from: 'Potato', into: 'Apple', conditions: { Moisture: 'Damp' }, fungi: [],
        sequence: null, hours: 20, observedAt: 30, signature: 'legacy' }],
    },
  };
  const original = structuredClone(old);
  const migrated = migrateGarden(old);
  assert.deepEqual(old, original, 'the input save must not be mutated');
  assert.equal(migrated.schemaVersion, 7);
  assert.equal(migrated.objects[base].species, 'Beanstalk');
  assert.equal(migrated.objects[base].progress, 83);
  assert.equal(migrated.objects[base].transformationClocks.Potato, 7);
  assert.equal(migrated.objects[base].transformationClocks.Carrot, 4);
  assert.equal(migrated.objects[fruit].species, 'Potato');
  assert.equal(migrated.objects[spice].species, 'Mighty Mint');
  assert.equal(migrated.objects[flower].species, 'Nightmarigold');
  assert.equal(migrated.objects[dark].species, 'Saffrune');
  assert.equal(migrated.objects[dark].transformationSequence.Phantarragon.preparedHours, 5);
  assert.equal(migrated.inventory.seeds.Beanstalk, 4);
  assert.equal(migrated.inventory.seeds.Potato, 2);
  assert.equal(migrated.inventory.seeds.Thymekeeper, 3);
  assert.equal(migrated.inventory.seeds['Mighty Mint'], 9);
  assert.equal(migrated.inventory.seeds.Marigloom, 5);
  assert.equal(migrated.inventory.seeds.Nightmarigold, 2);
  assert.equal(migrated.inventory.leaves.Beanstalk, 11);
  assert.equal(migrated.inventory.leaves.Potato, 12);
  assert.equal(migrated.inventory.leaves['Mighty Mint'], 13);
  assert.equal(migrated.inventorySlots['seed:Beanstalk'], 25);
  assert.equal(migrated.inventorySlots['seed:Potato'], 26);
  assert.equal(migrated.inventorySlots['leaf:Beanstalk'], 27);
  assert.equal(migrated.inventorySlots['leaf:Potato'], 28);
  assert.equal(migrated.inventorySlots['seed:Mighty Mint'], 29);
  assert.equal(migrated.pending[pending].species, 'Beanstalk');
  assert.equal(migrated.staged[staged].species, 'Potato');
  assert.equal(migrated.grimoire.plants['Mighty Mint'], true);
  assert.equal(migrated.grimoire.environments.Beanstalk['Moisture:Damp'].signal, 'favourable');
  assert.equal(migrated.grimoire.hazards['Mighty Mint']['Dry:penalty'].outcome, 'penalty');
  assert.equal(migrated.grimoire.transformations[0].from, 'Beanstalk');
  assert.equal(migrated.grimoire.transformations[0].into, 'Potato');
  assert.deepEqual(migrateGarden(migrated), migrated, 'V7 identifiers must not be translated twice');
});
