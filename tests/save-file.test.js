import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, keyAt, createDemoGarden, placeObject, makePlant,
  stagePlanting, applyStaging, advanceGardenTime, moveInventoryStack, ensureInventorySlots,
  serializeGameSave, deserializeGameSave, SAVE_FILE_FORMAT, SAVE_FILE_VERSION,
} from '../src/core/index.js';

test('a downloadable save preserves the full live garden, inventory layout, staging and hidden pending timers', () => {
  const A = keyAt(0, 0);
  const B = keyAt(1, 0);
  const C = keyAt(2, 0);
  let garden = ensureInventorySlots(createGarden());
  garden = moveInventoryStack(garden, 'seed:Potato', 167);
  garden = placeObject(garden, C, makePlant('Potato'));
  garden = applyStaging(stagePlanting(garden, A, 'plant', 'Potato', 5), () => 0).garden;
  garden = stagePlanting(garden, B, 'plant', 'Daisydaze', 4);
  garden = advanceGardenTime(garden, 3).garden;

  const encoded = serializeGameSave(garden, '2026-10-27T12:00:00.000Z');
  const parsed = JSON.parse(encoded);
  assert.equal(parsed.format, SAVE_FILE_FORMAT);
  assert.equal(parsed.fileVersion, SAVE_FILE_VERSION);
  assert.equal(parsed.savedAt, '2026-10-27T12:00:00.000Z');
  assert.equal(parsed.garden.pending[A].success, true);
  assert.deepEqual(deserializeGameSave(encoded), garden);

  const revealed = advanceGardenTime(deserializeGameSave(encoded), 3).garden;
  assert.equal(revealed.objects[A].species, 'Potato');
  assert.equal(revealed.staged[B].quantity, 4);
  assert.equal(revealed.inventorySlots['seed:Potato'], 167);
});

test('developer raw JSON exports and earlier garden schemas remain loadable', () => {
  const garden = createDemoGarden();
  assert.deepEqual(deserializeGameSave(JSON.stringify(garden)).objects,
    deserializeGameSave(serializeGameSave(garden)).objects);
  const old = { ...createGarden(), schemaVersion: 2, inventory: {
    seeds: { Potato: 12 }, spores: {}, leaves: 19,
  } };
  const loaded = deserializeGameSave(JSON.stringify(old));
  assert.equal(loaded.schemaVersion, 4);
  assert.equal(loaded.inventory.legacyLeaves, 19);
  assert.equal(loaded.inventory.seeds.Potato, 12);
});

test('invalid, incompatible or oversized save files cannot become a new garden', () => {
  assert.throws(() => deserializeGameSave('not JSON'), /not valid JSON/);
  assert.throws(() => deserializeGameSave('{}'), /Unsupported garden/);
  assert.throws(() => deserializeGameSave(JSON.stringify({ format: SAVE_FILE_FORMAT,
    fileVersion: 99, garden: createGarden() })), /Unsupported save file version/);
  assert.throws(() => deserializeGameSave(JSON.stringify({ ...createGarden(), columns: 40 })), /Unsupported garden/);
  assert.throws(() => serializeGameSave({ invalid: true }), /invalid garden/);
});
