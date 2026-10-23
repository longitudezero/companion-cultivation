import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, createDemoGarden, keyAt, edgeKey, distanceBetween, neighborsOf,
  setBaseline, setMaterial, placeObject, placeEdgeBlocker, resizeGarden,
  makeInfluence, makeSource, makeBlocker, calculateEnvironment,
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
