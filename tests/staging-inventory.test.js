import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, keyAt, moveInventoryStack, ensureInventorySlots, inventoryItems,
  INVENTORY_CAPACITY, INVENTORY_PAGES, INVENTORY_PAGE_SLOTS, migrateGarden,
  stagePlanting, unstagePlanting, moveStagedPlanting, availableToStage,
  applyStaging, advanceGardenTime, STAGING_TUNING, makePlant, placeObject,
  sowPlant, resizeGarden, harvestPlant, calculateEnvironment, calculateCultivation,
} from '../src/core/index.js';

const A = keyAt(0, 0);
const B = keyAt(1, 0);
const C = keyAt(2, 0);

test('four 50-square pages hold 200 unlimited stacks and preserve manually swapped positions', () => {
  assert.equal(INVENTORY_PAGE_SLOTS, 50);
  assert.equal(INVENTORY_PAGES, 4);
  assert.equal(INVENTORY_CAPACITY, 200);
  let garden = ensureInventorySlots(createGarden());
  assert.equal(inventoryItems(garden.inventory).length, 6);
  const original = garden.inventorySlots['seed:Beanstalk'];
  garden = moveInventoryStack(garden, 'seed:Beanstalk', 199);
  assert.equal(garden.inventorySlots['seed:Beanstalk'], 199);
  const other = Object.entries(garden.inventorySlots).find(([id]) => id !== 'seed:Beanstalk')[0];
  const otherSlot = garden.inventorySlots[other];
  garden = moveInventoryStack(garden, 'seed:Beanstalk', otherSlot);
  assert.equal(garden.inventorySlots[other], 199);
  assert.equal(garden.inventorySlots['seed:Beanstalk'], otherSlot);
  assert.equal(garden.inventory.seeds.Beanstalk, 16);
  assert.deepEqual(migrateGarden(JSON.parse(JSON.stringify(garden))), garden);
  assert.throws(() => moveInventoryStack(garden, 'seed:Beanstalk', 200), /between 1 and 200/);
  assert.notEqual(original, 199);
});

test('staging reserves but does not spend resources; move, revise and unstage release amounts', () => {
  let garden = createGarden();
  garden = stagePlanting(garden, A, 'plant', 'Beanstalk', 5);
  garden = stagePlanting(garden, B, 'plant', 'Beanstalk', 9);
  assert.equal(availableToStage(garden, 'plant', 'Beanstalk'), 2);
  assert.equal(garden.inventory.seeds.Beanstalk, 16);
  assert.throws(() => stagePlanting(garden, C, 'plant', 'Beanstalk', 3), /available/);
  garden = moveStagedPlanting(garden, B, C);
  assert.equal(garden.staged[B], undefined);
  assert.equal(garden.staged[C].quantity, 9);
  garden = stagePlanting(garden, C, 'plant', 'Beanstalk', 3);
  assert.equal(availableToStage(garden, 'plant', 'Beanstalk'), 8);
  garden = unstagePlanting(garden, A);
  assert.equal(availableToStage(garden, 'plant', 'Beanstalk'), 13);
  assert.equal(garden.inventory.seeds.Beanstalk, 16);
});

test('Apply consumes once and hides successes, which emerge only at the six-hour provisional clock', () => {
  let garden = stagePlanting(createGarden(), A, 'plant', 'Beanstalk', 5);
  const committed = applyStaging(garden, () => 0);
  garden = committed.garden;
  assert.equal(garden.inventory.seeds.Beanstalk, 11);
  assert.equal(garden.objects[A], undefined);
  assert.equal(garden.staged[A], undefined);
  assert.equal(garden.pending[A].species, 'Beanstalk');
  assert.equal(committed.details[0].species, 'Beanstalk');
  assert.equal(committed.details[0].success, undefined); // no result in player-facing response
  assert.throws(() => sowPlant(garden, A, 'Beanstalk', 1, () => 0), /committed or staged/);
  assert.throws(() => stagePlanting(garden, A, 'plant', 'Beanstalk', 1), /already/);
  garden = advanceGardenTime(garden, STAGING_TUNING.germinationRevealHours - 1).garden;
  assert.equal(garden.objects[A], undefined);
  assert.equal(garden.pending[A].success, true);
  const reveal = advanceGardenTime(garden, 1);
  garden = reveal.garden;
  assert.equal(garden.pending[A], undefined);
  assert.equal(garden.objects[A].species, 'Beanstalk');
  assert.equal(garden.objects[A].ageHours, 0);
  assert.ok(reveal.events.some(event => event.includes('germinated')));
});

test('failure stays visually pending for the same duration and still consumes Seeds', () => {
  let garden = stagePlanting(createGarden(), A, 'plant', 'Beanstalk', 1);
  garden = applyStaging(garden, () => 1).garden;
  assert.equal(garden.pending[A].success, false);
  assert.equal(garden.inventory.seeds.Beanstalk, 15);
  garden = advanceGardenTime(garden, STAGING_TUNING.germinationRevealHours).garden;
  assert.equal(garden.pending[A], undefined);
  assert.equal(garden.objects[A], undefined);
  assert.equal(garden.inventory.seeds.Beanstalk, 15);
});

test('new staging begins immediately while older committed plots incubate', () => {
  let garden = applyStaging(stagePlanting(createGarden(), A, 'plant', 'Beanstalk', 3), () => 0).garden;
  garden = stagePlanting(garden, B, 'plant', 'Daisydaze', 3);
  assert.equal(garden.pending[A].quantity, 3);
  assert.equal(garden.staged[B].quantity, 3);
  garden = advanceGardenTime(garden, 2).garden;
  assert.equal(garden.pending[A].readyAt, STAGING_TUNING.germinationRevealHours);
  assert.equal(garden.staged[B].quantity, 3);
  garden = applyStaging(garden, () => 0).garden;
  assert.equal(garden.pending[B].readyAt, 2 + STAGING_TUNING.germinationRevealHours);
  garden = advanceGardenTime(garden, 4).garden;
  assert.equal(garden.objects[A].species, 'Beanstalk');
  assert.equal(garden.pending[B].species, 'Daisydaze');
});

test('invalid Mycelial-dependent Spore placement rejects the entire Apply without spending anything', () => {
  let garden = createGarden();
  garden.inventory.spores.Rushroom = 5;
  garden = stagePlanting(garden, A, 'plant', 'Beanstalk', 2);
  garden = stagePlanting(garden, B, 'fungus', 'Rushroom', 2);
  assert.throws(() => applyStaging(garden, () => 0), /Mycelial/);
  assert.equal(garden.inventory.seeds.Beanstalk, 16);
  assert.equal(garden.inventory.spores.Rushroom, 5);
  assert.equal(garden.staged[A].quantity, 2);
  assert.equal(garden.staged[B].quantity, 2);
  assert.deepEqual(garden.pending, {});
});

test('existing Plants develop during staging and staged markers stay uncommitted', () => {
  let garden = placeObject(createGarden(), A, makePlant('Beanstalk'));
  garden = stagePlanting(garden, B, 'plant', 'Thymekeeper', 4);
  const later = advanceGardenTime(garden, 2).garden;
  assert.equal(later.staged[B].quantity, 4);
  assert.equal(later.objects[B], undefined);
  assert.ok(later.objects[A].ageHours > 0);
  assert.equal(later.clockHours, 2);
});

test('new inventory stacks stay species-specific after harvesting and migrating', () => {
  let garden = createGarden();
  garden = placeObject(garden, A, makePlant('Beanstalk'));
  garden.objects[A].production.ordinaryLeaves = 9;
  garden = harvestPlant(garden, A);
  assert.equal(garden.inventory.leaves.Beanstalk, 9);
  assert.ok(Number.isInteger(garden.inventorySlots['leaf:Beanstalk']));
  assert.deepEqual(migrateGarden(JSON.parse(JSON.stringify(garden))), garden);
  const resized = resizeGarden(garden, 8, 7);
  assert.equal(resized.inventorySlots['leaf:Beanstalk'], garden.inventorySlots['leaf:Beanstalk']);
});

test('committed germination remains concealed through save migration and resumes its original timer', () => {
  let garden = applyStaging(stagePlanting(createGarden(), A, 'plant', 'Beanstalk', 4), () => 0).garden;
  garden = advanceGardenTime(garden, 3).garden;
  const reloaded = migrateGarden(JSON.parse(JSON.stringify(garden)));
  assert.equal(reloaded.staged[A], undefined);
  assert.deepEqual(reloaded.pending[A], garden.pending[A]);
  assert.equal(reloaded.objects[A], undefined);
  const before = advanceGardenTime(reloaded, 2).garden;
  assert.equal(before.objects[A], undefined);
  const after = advanceGardenTime(before, 1).garden;
  assert.equal(after.pending[A], undefined);
  assert.equal(after.objects[A].species, 'Beanstalk');
});

test('a secretly successful pending Fungus supplies no environmental or cultivation Effects before reveal', () => {
  const blank = createGarden();
  const stocked = { ...blank, inventory: { ...blank.inventory, spores: { Dewmender: 4 } } };
  let garden = applyStaging(stagePlanting(stocked, A, 'fungus', 'Dewmender', 4), () => 0).garden;
  assert.equal(garden.objects[A], undefined);
  assert.deepEqual(calculateEnvironment(garden).conditions, calculateEnvironment(blank).conditions);
  assert.deepEqual(calculateCultivation(garden), calculateCultivation(blank));
  garden = advanceGardenTime(garden, STAGING_TUNING.germinationRevealHours).garden;
  assert.equal(garden.objects[A].species, 'Dewmender');
});
