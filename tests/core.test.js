import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, createDemoGarden, keyAt, edgeKey, distanceBetween, neighborsOf,
  setBaseline, setMaterial, placeObject, placeEdgeBlocker, resizeGarden,
  makeInfluence, makeSpreadInfluence, makeSource, makeBlocker, calculateEnvironment,
  propagateSpread, removeEdgeBlocker, STARTING_DIRECTIONS,
} from '../src/core/index.js';

test('grid has stable hex IDs and one shared edge ID', () => {
  const garden = createGarden(7, 5);
  assert.equal(Object.keys(garden.hexes).length, 35);
  const a = keyAt(2, 2);
  const b = neighborsOf(a).find((key) => garden.hexes[key]);
  assert.equal(distanceBetween(a, b), 1);
  assert.equal(edgeKey(a, b), edgeKey(b, a));
});

test('Baselines, additive stacking, cancellation and clamping', () => {
  let garden = createGarden(4, 4);
  const middle = keyAt(1, 1);
  garden = placeObject(garden, keyAt(0, 1), makeSource([makeInfluence('Warming', 2, 2)]));
  garden = placeObject(garden, keyAt(2, 1), makeSource([makeInfluence('Cooling', 1, 2)]));
  let result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Temperature, 'Warm');
  assert.equal(result.modifiers[middle].Temperature.length, 2);
  garden = setBaseline(garden, middle, 'Temperature', 'Hot');
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Temperature, 'Hot');
});

test('one Source contributes once even through multiple valid routes', () => {
  let garden = createGarden(5, 5);
  garden = placeObject(garden, keyAt(2, 2), makeSource([makeInfluence('Warming', 1, 4)]));
  const result = calculateEnvironment(garden);
  assert.equal(result.modifiers[keyAt(3, 3)].Temperature.length, 1);
});

test('blocked hex cannot receive an Influence; routes can go around', () => {
  let garden = createGarden(5, 5);
  garden = placeObject(garden, keyAt(0, 2), makeSource([makeInfluence('Warming', 1, 5)]));
  garden = placeObject(garden, keyAt(1, 2), makeBlocker());
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[keyAt(1, 2)].Temperature, 'Temperate');
  assert.equal(result.conditions[keyAt(2, 2)].Temperature, 'Warm');
});

test('one shared Edge Blocker stops passage in both directions', () => {
  let garden = createGarden(3, 3);
  const a = keyAt(0, 0), b = keyAt(1, 0);
  garden = placeEdgeBlocker(garden, a, b, makeBlocker('mode', 'airborne'));
  garden = placeObject(garden, a, makeSource([makeInfluence('Warming', 1, 1)]));
  let result = calculateEnvironment(garden);
  assert.equal(result.conditions[b].Temperature, 'Temperate');
  garden = placeObject(garden, b, makeSource([makeInfluence('Cooling', 1, 1)]));
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[a].Temperature, 'Warm');
  assert.equal(result.conditions[b].Temperature, 'Cold');
  assert.equal(Object.keys(garden.edges).length, 1);
});

test('Waterborne paths require connected Flooded hexes', () => {
  let garden = createGarden(5, 3);
  const origin = keyAt(0, 1), a = keyAt(1, 1), b = keyAt(2, 1), dry = keyAt(3, 1);
  garden = setBaseline(garden, a, 'Moisture', 'Flooded');
  garden = setBaseline(garden, b, 'Moisture', 'Flooded');
  garden = placeObject(garden, origin, makeSource([makeInfluence('Enrichment', 1, 4, 'waterborne')]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[a].Fertility, 'Rich');
  assert.equal(result.conditions[b].Fertility, 'Rich');
  assert.equal(result.conditions[dry].Fertility, 'Normal');
  assert.equal(result.conditions[origin].Fertility, 'Rich');
});

test('Airborne Wetting establishes Flooded routes before Waterborne evaluation', () => {
  let garden = createGarden(4, 3);
  const channel = keyAt(1, 1);
  garden = placeObject(garden, keyAt(0, 1), makeSource([makeInfluence('Enrichment', 1, 2, 'waterborne')]));
  garden = placeObject(garden, keyAt(2, 0), makeSource([makeInfluence('Wetting', 2, 1)]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[channel].Moisture, 'Flooded');
  assert.equal(result.conditions[channel].Fertility, 'Rich');
});

test('Waterborne Moisture Influences are deferred', () => {
  assert.throws(() => makeInfluence('Wetting', 1, 2, 'waterborne'), /deferred/);
});

test('one object per hex and permanent Material', () => {
  let garden = createGarden(4, 4);
  const key = keyAt(1, 1);
  garden = setMaterial(garden, key, 'Stone');
  garden = placeObject(garden, key, makeSource());
  assert.throws(() => placeObject(garden, key, makeBlocker()), /already contains/);
  assert.equal(garden.hexes[key].material, 'Stone');
});

test('grid resizing preserves objects and edges', () => {
  let garden = createGarden(4, 4);
  const a = keyAt(1, 1), b = keyAt(2, 1);
  garden = setMaterial(garden, a, 'Clay');
  garden = placeObject(garden, a, makeSource());
  garden = placeEdgeBlocker(garden, a, b, makeBlocker());
  const larger = resizeGarden(garden, 6, 6);
  assert.equal(larger.hexes[a].material, 'Clay');
  assert.ok(larger.objects[a]);
  assert.ok(larger.edges[edgeKey(a, b)]);
});

test('demo contains all three test object forms', () => {
  const garden = createDemoGarden();
  const result = calculateEnvironment(garden);
  assert.equal(Object.keys(result.conditions).length, 63);
  assert.ok(Object.values(garden.objects).some((item) => item.type === 'source'));
  assert.ok(Object.values(garden.objects).some((item) => item.type === 'blocker'));
  assert.ok(Object.keys(garden.edges).length);
});

test('six starting directions match the axial hex neighbors', () => {
  const origin = keyAt(2, 2);
  assert.deepEqual(STARTING_DIRECTIONS, ['E', 'NE', 'NW', 'W', 'SW', 'SE']);
  for (let heading = 0; heading < 6; heading += 1) {
    const influence = makeSpreadInfluence('Wetting', 2, 1, heading);
    const result = propagateSpread(createGarden(6, 6), origin, influence);
    assert.deepEqual(result.reached.map(({ key }) => key), [origin, neighborsOf(origin)[heading]]);
    assert.equal(result.remaining, 0);
  }
});

test('Straight Until Blocked crosses opposite edges and forks into both adjacent exits', () => {
  let garden = createGarden(7, 7);
  const origin = keyAt(2, 3);
  const next = neighborsOf(origin)[0];
  const blocked = neighborsOf(next)[0];
  garden = placeEdgeBlocker(garden, next, blocked, makeBlocker());
  const result = propagateSpread(garden, origin, makeSpreadInfluence('Wetting', 2, 3, 0));
  const [left, right] = [neighborsOf(next)[1], neighborsOf(next)[5]];
  assert.equal(result.spent, 3);
  assert.equal(result.remaining, 0);
  assert.ok(result.reached.some(({ key }) => key === next));
  assert.ok(result.reached.some(({ key }) => key === left));
  assert.ok(result.reached.some(({ key }) => key === right));
  assert.ok(!result.reached.some(({ key }) => key === blocked));
});

test('one remaining budget chooses exactly one of two branches reproducibly', () => {
  let garden = createGarden(7, 7);
  const origin = keyAt(2, 3);
  const first = neighborsOf(origin)[0];
  garden = placeEdgeBlocker(garden, first, neighborsOf(first)[0], makeBlocker());
  const influence = makeSpreadInfluence('Wetting', 2, 2, 0);
  const options = [neighborsOf(first)[1], neighborsOf(first)[5]];
  const firstPass = propagateSpread(garden, origin, influence);
  const secondPass = propagateSpread(garden, origin, influence);
  assert.deepEqual(firstPass, secondPass);
  assert.equal(firstPass.reached.length, 3);
  assert.ok(options.includes(firstPass.reached[2].key));
  const observed = new Set();
  for (let revision = 0; revision < 32; revision += 1) {
    observed.add(propagateSpread({ ...garden, routeNonce: revision }, origin, influence).reached[2].key);
  }
  assert.equal(observed.size, 2, 'new attempts eventually yield either branch');
});

test('editing a blocker changes the saved propagation attempt even when restored', () => {
  let garden = createGarden(5, 5);
  const a = keyAt(1, 1), b = keyAt(2, 1);
  garden = placeEdgeBlocker(garden, a, b, makeBlocker());
  const revision = garden.routeNonce;
  garden = removeEdgeBlocker(garden, a, b);
  garden = placeEdgeBlocker(garden, a, b, makeBlocker());
  assert.equal(garden.routeNonce, revision + 2);
});

test('grid boundaries behave as obstructions and allow a fork', () => {
  const garden = createGarden(5, 5);
  const origin = keyAt(4, 2);
  const influence = makeSpreadInfluence('Warming', 1, 2, 0);
  const result = propagateSpread(garden, origin, influence);
  assert.equal(result.spent, 2);
  assert.deepEqual(new Set(result.segments.map(({ heading }) => heading)), new Set([1, 5]));
});

test('routed paths spend at most one shared budget and never revisit reached hexes', () => {
  let garden = createGarden(5, 5);
  const source = keyAt(2, 2);
  for (const heading of [0, 1, 5]) {
    garden = placeEdgeBlocker(garden, source, neighborsOf(source)[heading], makeBlocker());
  }
  const result = propagateSpread(garden, source, makeSpreadInfluence('Wetting', 1, 30, 0));
  const keys = result.reached.map(({ key }) => key);
  assert.equal(new Set(keys).size, keys.length);
  assert.equal(result.spent, result.segments.length);
  assert.equal(result.spent, keys.length - 1);
  assert.ok(result.spent <= 30);
});

test('routed Wetting floods Dry hexes, then opens existing Waterborne propagation', () => {
  let garden = createGarden(5, 4);
  const source = keyAt(0, 1);
  const waterborne = keyAt(0, 0);
  const target = keyAt(2, 1);
  garden = placeObject(garden, source, makeSource([makeSpreadInfluence('Wetting', 2, 3, 0)]));
  garden = placeObject(garden, waterborne, makeSource([makeInfluence('Enrichment', 1, 4, 'waterborne')]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[target].Moisture, 'Flooded');
  assert.equal(result.conditions[target].Fertility, 'Rich');
  assert.equal(result.routes[`${source}:0`].spent, 3);
  assert.equal(result.modifiers[target].Moisture[0].modifier, 2);
  assert.equal(result.modifiers[target].Moisture[0].propagation, 'spread-budget');
});

test('existing Range propagation is unchanged and old saved emissions remain valid', () => {
  let garden = createGarden(5, 5);
  const origin = keyAt(2, 2);
  const oldEmission = makeInfluence('Brightening', 1, 1);
  delete oldEmission.propagation;
  garden = placeObject(garden, origin, makeSource([oldEmission]));
  const result = calculateEnvironment(garden);
  assert.equal(result.coverage[`${origin}:0`].length, 7);
  assert.equal(result.routes[`${origin}:0`], undefined);
});
