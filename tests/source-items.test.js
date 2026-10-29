import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, keyAt, placeObject, makeInfluence, makeSource, calculateEnvironment,
  SOURCE_ITEM_GROUPS, SOURCE_ITEMS, grantSourceItem, inventoryItems, placeSourceItem,
  pickupSourceItem, moveSourceItem, rotateSourceItem, advanceGardenTime,
  migrateGarden, resizeGarden, stagePlanting, rotateStagedFungus,
  applyStaging, makeFungus,
  serializeGameSave, deserializeGameSave,
} from '../src/core/index.js';

const A = keyAt(2, 2);
const B = keyAt(3, 2);

test('catalog has seven ordered groups, all 26 distinct items and the agreed exceptions', () => {
  assert.deepEqual(SOURCE_ITEM_GROUPS.map(group => group.items.length), [3, 4, 4, 4, 4, 4, 3]);
  assert.equal(Object.keys(SOURCE_ITEMS).length, 26);
  assert.deepEqual(SOURCE_ITEMS.torch.propertyEffects.map(effect => [effect.name, effect.strength]),
    [['Warming', 1], ['Brightening', 2]]);
  assert.equal(SOURCE_ITEMS['sandglass-fountain'].budget, 3);
  assert.equal(SOURCE_ITEMS['sandglass-fountain'].durationHours, 60);
  assert.equal(SOURCE_ITEMS.cloudpost.durationHours, 96);
  assert.equal(SOURCE_ITEMS['cinder-compass'].durationHours, 96);
  const singleProperty = SOURCE_ITEM_GROUPS.flatMap(group => group.items)
    .filter(item => item.propertyEffects.length === 1 && item.id !== 'sandglass-fountain');
  assert.equal(singleProperty.length, 24);
  const properties = { Wetting: 'Moisture', Drying: 'Moisture', Warming: 'Temperature', Cooling: 'Temperature',
    Brightening: 'Illumination', Dimming: 'Illumination' };
  const signatures = new Set(singleProperty.map(item => {
    const effect = item.propertyEffects[0];
    return [properties[effect.name], effect.name, effect.strength, item.propagation].join(':');
  }));
  assert.equal(signatures.size, 24, 'all signs, strengths and propagation options are present for each Property');
});

test('identical items occupy distinct slots, can be deployed and retrieved with paused time', () => {
  let garden = grantSourceItem(grantSourceItem(createGarden(), 'torch'), 'torch');
  assert.equal(inventoryItems(garden.inventory).filter(item => item.name === 'Torch').length, 2);
  assert.notEqual(garden.inventorySlots['item:1'], garden.inventorySlots['item:2']);
  garden = placeSourceItem(garden, 'item:1', A);
  assert.equal(garden.inventory.sourceItems['item:1'], undefined);
  assert.equal(garden.inventorySlots['item:1'], undefined);
  assert.equal(garden.objects[A].remainingHours, 60);
  assert.equal(calculateEnvironment(garden).modifiers[B].Illumination
    .reduce((sum, effect) => sum + effect.modifier, 0), 2);
  garden = advanceGardenTime(garden, 12).garden;
  garden = pickupSourceItem(garden, A);
  assert.equal(garden.inventory.sourceItems['item:1'].remainingHours, 48);
  const paused = advanceGardenTime(garden, 20).garden;
  assert.equal(paused.inventory.sourceItems['item:1'].remainingHours, 48);
  garden = placeSourceItem(paused, 'item:1', A);
  assert.equal(garden.objects[A].remainingHours, 48);
});

test('active items expire exactly at their final game hour and developer Sources do not', () => {
  let garden = grantSourceItem(createGarden(), 'torch');
  garden = placeObject(garden, keyAt(0, 0), makeSource([makeInfluence('Warming', 1, 1)]));
  garden = placeSourceItem(garden, 'item:1', A);
  garden = advanceGardenTime(garden, 59).garden;
  assert.equal(garden.objects[A].remainingHours, 1);
  const expired = advanceGardenTime(garden, 1);
  assert.equal(expired.garden.objects[A], undefined);
  assert.equal(expired.garden.objects[keyAt(0, 0)].type, 'source');
  assert.equal(expired.garden.inventory.sourceItems['item:1'], undefined);
  assert.match(expired.events.join(' '), /Torch expired/);
});

test('moving and rotating a Budget item keeps its life and changes its emitted route', () => {
  let garden = grantSourceItem(createGarden(), 'warming-stone');
  garden = placeSourceItem(garden, 'item:1', A);
  assert.equal(garden.objects[A].emissions[0].heading, 0);
  const original = calculateEnvironment(garden);
  garden = rotateSourceItem(garden, A, 3);
  assert.equal(garden.objects[A].emissions[0].heading, 3);
  assert.notDeepEqual(calculateEnvironment(garden).coverage[`${A}:0`], original.coverage[`${A}:0`]);
  garden = moveSourceItem(garden, A, B);
  assert.equal(garden.objects[A], undefined);
  assert.equal(garden.objects[B].remainingHours, 60);
  assert.equal(garden.objects[B].heading, 3);
  assert.throws(() => placeSourceItem(garden, 'item:1', A), /not available/);
  assert.throws(() => rotateSourceItem(garden, B, 6), /six directions/);
  assert.equal(moveSourceItem(garden, B, B), garden, 'a move onto itself is a no-op');
});

test('invalid destinations cannot spend or lose items', () => {
  let garden = grantSourceItem(createGarden(), 'torch');
  garden = placeObject(garden, A, makeFungus('Dewmender'));
  assert.throws(() => placeSourceItem(garden, 'item:1', A), /already contains/);
  assert.ok(garden.inventory.sourceItems['item:1']);
  assert.throws(() => placeSourceItem(garden, 'item:1', '99,99'), /existing hex/);
});

test('full inventory prevents pickup safely, and resizing cannot discard deployed items', () => {
  let garden = createGarden();
  while (inventoryItems(garden.inventory).length < 200) garden = grantSourceItem(garden, 'ember-pebble');
  garden = placeSourceItem(garden, 'item:1', A);
  garden = grantSourceItem(garden, 'torch'); // Fill the freed square.
  assert.equal(inventoryItems(garden.inventory).length, 200);
  assert.throws(() => pickupSourceItem(garden, A), /Inventory is full/);
  assert.equal(garden.objects[A].itemId, 'item:1');
  garden = moveSourceItem(garden, A, keyAt(8, 6));
  assert.throws(() => resizeGarden(garden, 3, 3), /Move deployed Source items/);
});

test('V6 saves retain distinct stored/placed items, headings and remaining time', () => {
  let garden = grantSourceItem(grantSourceItem(createGarden(), 'cloudpost'), 'weeping-statue');
  garden = placeSourceItem(garden, 'item:1', A);
  garden = rotateSourceItem(garden, A, 5);
  garden = advanceGardenTime(garden, 12).garden;
  const restored = migrateGarden(JSON.parse(JSON.stringify(garden)));
  assert.equal(restored.objects[A].heading, 5);
  assert.equal(restored.objects[A].emissions[0].heading, 5);
  assert.equal(restored.objects[A].remainingHours, 84);
  assert.equal(restored.inventory.sourceItems['item:2'].catalogId, 'weeping-statue');
  assert.equal(restored.inventorySlots['item:2'], garden.inventorySlots['item:2']);
  assert.equal(restored.itemNonce, 2);
  assert.equal(grantSourceItem(restored, 'torch').inventory.sourceItems['item:3'].catalogId, 'torch');
  const portable = deserializeGameSave(serializeGameSave(garden));
  assert.equal(portable.objects[A].remainingHours, 84);
  assert.equal(portable.inventory.sourceItems['item:2'].catalogId, 'weeping-statue');
  assert.equal(migrateGarden(createGarden()).inventory.sourceItems['item:1'], undefined);
});

test('staged Budget fungi can rotate, while Apply commits their heading', () => {
  let garden = createGarden();
  garden.inventory.spores.Emberbolete = 4;
  garden = stagePlanting(garden, A, 'fungus', 'Emberbolete', 4);
  garden = rotateStagedFungus(garden, A, 4);
  assert.equal(garden.staged[A].heading, 4);
  assert.throws(() => rotateStagedFungus(garden, A, 6), /six directions/);
  const committed = applyStaging(garden, () => 0).garden;
  assert.equal(committed.pending[A].heading, 4);
  assert.equal(advanceGardenTime(committed, 6).garden.objects[A].heading, 4);
  assert.throws(() => rotateStagedFungus(committed, A, 2), /no directional Budget/);
});
