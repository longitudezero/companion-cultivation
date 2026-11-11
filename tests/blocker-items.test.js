import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLOCKER_ITEMS, INVENTORY_CAPACITY, advanceGardenTime, calculateCultivation, calculateEnvironment,
  calculateMycelialSupport, createGarden, deserializeGameSave, edgeKey, grantBlockerItem, grantSourceItem,
  inventoryItems, isBlocked, isMycelial, makeBlocker, makeFungus, makeInfluence, makePlant, makeSource,
  pickupBlockerItem, placeBlockerItem, placeEdgeBlocker, placeObject, placeSourceItem, resizeGarden, serializeGameSave, setBaseline,
} from '../src/core/index.js';

const hex = key => ({ type: 'hex', key });
const edge = (a, b) => ({ type: 'edge', a, b });
const itemId = (design, form) => `blocker:${design}:${form}`;
const deploy = (garden, design, target) => {
  const id = itemId(design, target.type);
  return placeBlockerItem(grantBlockerItem(garden, id), id, target);
};

test('all nine player filters classify effects independently in both forms', () => {
  const effects = [
    makeInfluence('Wetting'), makeInfluence('Warming'), makeInfluence('Cooling', 1, 2, 'waterborne'),
    makeInfluence('Brightening', 1, 2, 'waterborne'),
    { kind: 'Leaf', mode: 'airborne' }, { kind: 'Leaf', mode: 'waterborne' },
    { kind: 'Mycelial', mode: 'mycelial' },
  ];
  const expected = {
    'root-barrier': [6], windbreak: [1, 2, 4], 'water-gate': [5], 'garden-screen': [0, 3],
    'stone-wall': [0, 1, 2, 3, 4, 5, 6], 'insulating-panel': [1, 2], 'shade-panel': [3],
    'pond-liner': [0, 5], 'climate-divider': [0, 1, 2, 3],
  };
  assert.equal(Object.keys(BLOCKER_ITEMS).length, 18);
  for (const [design, stopped] of Object.entries(expected)) {
    const garden = deploy(deploy(createGarden(), design, hex('2,0')), design, edge('0,0', '1,0'));
    for (const blocker of [garden.objects['2,0'], garden.edges[edgeKey('0,0', '1,0')]]) {
      assert.deepEqual(effects.flatMap((effect, index) => isBlocked(blocker, effect) ? [index] : []), stopped, design);
    }
  }
});

test('environmental properties apply to propagation and adjacency independently of mode', () => {
  let garden = createGarden(3, 1);
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  garden = placeObject(garden, '0,0', makeSource([
    makeInfluence('Cooling', 1, 2, 'waterborne'), makeInfluence('Brightening'),
  ]));
  const crossing = edge('0,0', '1,0');
  assert.equal(calculateEnvironment(deploy(garden, 'water-gate', crossing)).conditions['1,0'].Temperature, 'Cold');
  const windbreak = calculateEnvironment(deploy(garden, 'windbreak', crossing));
  assert.equal(windbreak.conditions['1,0'].Temperature, 'Temperate');
  assert.equal(windbreak.conditions['1,0'].Illumination, 'Dim');

  garden = setBaseline(createGarden(3, 1), '0,0', 'Moisture', 'Flooded');
  assert.equal(calculateEnvironment(deploy(garden, 'water-gate', crossing)).conditions['1,0'].Moisture, 'Damp');
  assert.equal(calculateEnvironment(deploy(garden, 'pond-liner', crossing)).conditions['1,0'].Moisture, 'Dry');
});

test('open alternate paths can still carry the blocked property around an edge', () => {
  const garden = placeObject(createGarden(3, 3), '0,0', makeSource([makeInfluence('Warming', 1, 2)]));
  const screened = deploy(garden, 'insulating-panel', edge('0,0', '1,0'));
  const reached = calculateEnvironment(screened).coverage['0,0:0'];
  assert.equal(reached.find(hex => hex.key === '1,0').distance, 2);
});

test('cultivation mode filters stop package reach while environmental filters pass it', () => {
  let garden = createGarden(4, 1);
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  garden = placeObject(garden, '0,0', makeFungus('Prismorel', 0));
  garden = placeObject(garden, '3,0', makeFungus('Dewmender', 3));
  for (const [design, airborne, waterborne] of [['climate-divider', true, true],
    ['windbreak', false, true], ['water-gate', true, false], ['stone-wall', false, false]]) {
    const contacts = calculateCultivation(deploy(garden, design, edge('1,0', '2,0')));
    assert.equal(contacts['2,0'].some(contact => contact.species === 'Prismorel'), airborne, design);
    assert.equal(contacts['1,0'].some(contact => contact.species === 'Dewmender'), waterborne, design);
  }
});

test('Root Barriers in either form cut support and let Mycelial ground retreat and regrow', () => {
  const growing = advanceGardenTime(placeObject(createGarden(3, 1), '0,0', makeFungus('Mycelord')), 36).garden;
  const colony = growing.objects['0,0'].colonyId;
  assert.ok(isMycelial(growing, '2,0'));
  for (const target of [edge('0,0', '1,0'), hex('1,0')]) {
    const cut = deploy(growing, 'root-barrier', target);
    assert.deepEqual(calculateMycelialSupport(cut, calculateEnvironment(cut))[colony], ['0,0']);
    assert.ok(isMycelial(cut, '2,0'), 'the severed ground takes time to retreat');
    const cleared = advanceGardenTime(cut, 36).garden;
    assert.equal(isMycelial(cleared, '2,0'), false);
    const reopened = pickupBlockerItem(cleared, target);
    assert.ok(isMycelial(advanceGardenTime(reopened, 36).garden, '2,0'));
  }
});

test('Blockers stack by design and form, validate targets and survive saves', () => {
  const edgeId = itemId('root-barrier', 'edge'), hexId = itemId('root-barrier', 'hex');
  let garden = grantBlockerItem(grantBlockerItem(createGarden(4, 4), edgeId, 3), hexId);
  garden = placeObject(garden, '0,0', makePlant('Beanstalk'));
  garden = placeEdgeBlocker(garden, '1,0', '2,0', makeBlocker('mode', 'airborne'));
  const before = structuredClone(garden);
  assert.throws(() => placeBlockerItem(garden, edgeId, hex('0,0')), /border/);
  assert.throws(() => placeBlockerItem(garden, edgeId, edge('1,0', '2,0')), /already has/);
  assert.throws(() => placeBlockerItem(garden, edgeId, edge('0,0', '3,0')), /adjacent/);
  assert.throws(() => placeBlockerItem(garden, hexId, hex('0,0')), /contains an object/);
  assert.deepEqual(garden, before);
  garden = placeBlockerItem(garden, edgeId, edge('2,0', '3,0'));
  garden = placeBlockerItem(garden, hexId, hex('1,0'));
  assert.throws(() => resizeGarden(garden, 3, 4), /Retrieve Blockers/);
  const restored = deserializeGameSave(serializeGameSave(garden));
  assert.deepEqual(restored.inventory.blockers, { [edgeId]: 2 });
  assert.deepEqual(restored.objects['1,0'], { type: 'blocker', blockerId: hexId });
  assert.deepEqual(restored.edges, garden.edges);
  assert.equal(restored.inventorySlots[edgeId], garden.inventorySlots[edgeId]);
  assert.equal(Object.hasOwn(restored.inventorySlots, hexId), false);
  const picked = pickupBlockerItem(pickupBlockerItem(restored, hex('1,0')), edge('3,0', '2,0'));
  assert.deepEqual(picked.inventory.blockers, { [edgeId]: 3, [hexId]: 1 });
  assert.ok(inventoryItems(picked.inventory).some(item => item.id === edgeId && item.quantity === 3));
});

test('pickup preserves a deployed piece when a new Inventory stack cannot fit', () => {
  const id = itemId('root-barrier', 'edge'), target = edge('0,0', '1,0');
  let garden = deploy(createGarden(), 'root-barrier', target);
  while (inventoryItems(garden.inventory).length < INVENTORY_CAPACITY) garden = grantSourceItem(garden, 'ember-pebble');
  const before = structuredClone(garden);
  assert.throws(() => pickupBlockerItem(garden, target), /Inventory is full/);
  assert.deepEqual(garden, before);
  const item = Object.keys(garden.inventory.sourceItems)[0];
  const restored = pickupBlockerItem(placeSourceItem(garden, item, '0,0'), target);
  assert.equal(restored.inventory.blockers[id], 1);
  assert.equal(restored.edges[edgeKey('0,0', '1,0')], undefined);
});
