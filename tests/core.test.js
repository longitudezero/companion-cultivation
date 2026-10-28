import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, createDemoGarden, keyAt, edgeKey, distanceBetween, neighborsOf,
  setBaseline, migrateGarden, PROPERTIES, KINDS, placeObject, placeEdgeBlocker, resizeGarden,
  makeInfluence, makeSpreadInfluence, makeSource, makeAnchoredSource, makeBlocker, calculateEnvironment,
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
  garden = placeObject(garden, origin, makeSource([makeInfluence('Brightening', 1, 4, 'waterborne')]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[a].Illumination, 'Dim');
  assert.equal(result.conditions[b].Illumination, 'Dim');
  assert.equal(result.conditions[dry].Illumination, 'Dark');
  assert.equal(result.conditions[origin].Illumination, 'Dim');
});

test('Waterborne reaches the entire Flooded network and ignores legacy saved Range', () => {
  let garden = createGarden(12, 3);
  const origin = keyAt(0, 1), far = keyAt(11, 1);
  for (let column = 1; column < 12; column += 1) {
    garden = setBaseline(garden, keyAt(column, 1), 'Moisture', 'Flooded');
  }
  const influence = makeInfluence('Brightening', 1, 1, 'waterborne');
  assert.equal(influence.range, null, 'new Waterborne emissions have no numeric Range');
  influence.range = 1; // An old saved garden may still have a finite Range value.
  garden = placeObject(garden, origin, makeSource([influence]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[far].Illumination, 'Dim');
  assert.equal(result.coverage[`${origin}:0`].find(({ key }) => key === far)?.distance, 11);
});

test('a non-Flooded Source injects into each adjacent Flooded component', () => {
  let garden = createGarden(5, 5);
  const origin = keyAt(2, 2);
  const [east, west] = [neighborsOf(origin)[0], neighborsOf(origin)[3]];
  garden = setBaseline(garden, east, 'Moisture', 'Flooded');
  garden = setBaseline(garden, west, 'Moisture', 'Flooded');
  garden = placeObject(garden, origin, makeSource([makeInfluence('Brightening', 1, 0, 'waterborne')]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[east].Illumination, 'Dim');
  assert.equal(result.conditions[west].Illumination, 'Dim');
  assert.equal(result.coverage[`${origin}:0`].length, 3);
});

test('Dry gaps and matching Blockers interrupt otherwise unlimited Waterborne reach', () => {
  let garden = createGarden(12, 3);
  const origin = keyAt(0, 1), far = keyAt(11, 1);
  for (let column = 1; column < 12; column += 1) {
    if (column !== 6) garden = setBaseline(garden, keyAt(column, 1), 'Moisture', 'Flooded');
  }
  garden = placeObject(garden, origin, makeSource([makeInfluence('Brightening', 1, 1, 'waterborne')]));
  assert.equal(calculateEnvironment(garden).conditions[far].Illumination, 'Dark', 'a Dry gap cuts the path');

  garden = setBaseline(garden, keyAt(6, 1), 'Moisture', 'Flooded');
  const before = keyAt(5, 1), after = keyAt(6, 1);
  garden = placeEdgeBlocker(garden, before, after, makeBlocker('mode', 'waterborne'));
  assert.equal(calculateEnvironment(garden).conditions[far].Illumination, 'Dark', 'a matching edge cuts the path');

  const detour = neighborsOf(before).find((key) => garden.hexes[key]
    && key !== after && neighborsOf(after).includes(key));
  assert.ok(detour, 'the grid has an alternate two-edge route');
  garden = setBaseline(garden, detour, 'Moisture', 'Flooded');
  assert.equal(calculateEnvironment(garden).conditions[far].Illumination, 'Dim', 'Flooded detours bypass a single blocked edge');
});

test('Airborne Range remains finite when Waterborne reach becomes unlimited', () => {
  let garden = createGarden(12, 3);
  const origin = keyAt(0, 1), far = keyAt(11, 1);
  garden = placeObject(garden, origin, makeSource([makeInfluence('Warming', 1, 1, 'airborne')]));
  assert.equal(calculateEnvironment(garden).conditions[far].Temperature, 'Temperate');
  assert.equal(calculateEnvironment(garden).conditions[keyAt(1, 1)].Temperature, 'Warm');
});

test('Airborne Wetting establishes Flooded routes before Waterborne evaluation', () => {
  let garden = createGarden(4, 3);
  const channel = keyAt(1, 1);
  garden = placeObject(garden, keyAt(0, 1), makeSource([makeInfluence('Brightening', 1, 2, 'waterborne')]));
  garden = placeObject(garden, keyAt(2, 0), makeSource([makeInfluence('Wetting', 2, 1)]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[channel].Moisture, 'Flooded');
  assert.equal(result.conditions[channel].Illumination, 'Dim');
});

test('Waterborne Moisture Influences are deferred', () => {
  assert.throws(() => makeInfluence('Wetting', 1, 2, 'waterborne'), /deferred/);
});

test('one object per hex without ground Material', () => {
  let garden = createGarden(4, 4);
  const key = keyAt(1, 1);
  garden = placeObject(garden, key, makeSource());
  assert.throws(() => placeObject(garden, key, makeBlocker()), /already contains/);
  assert.equal(garden.hexes[key].material, undefined);
});

test('grid resizing preserves objects and edges', () => {
  let garden = createGarden(4, 4);
  const a = keyAt(1, 1), b = keyAt(2, 1);
  garden = placeObject(garden, a, makeSource());
  garden = placeEdgeBlocker(garden, a, b, makeBlocker());
  const larger = resizeGarden(garden, 6, 6);
  assert.deepEqual(larger.hexes[a].baselines, garden.hexes[a].baselines);
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
  garden = placeObject(garden, waterborne, makeSource([makeInfluence('Brightening', 1, 4, 'waterborne')]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[target].Moisture, 'Flooded');
  assert.equal(result.conditions[target].Illumination, 'Dim');
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

test('Flooded neighbors make Dry hexes Damp once, never Flooded or chained farther', () => {
  let garden = createGarden(7, 7);
  const middle = keyAt(3, 3);
  const [first, second] = [neighborsOf(middle)[0], neighborsOf(middle)[1]];
  garden = setBaseline(garden, first, 'Moisture', 'Flooded');
  garden = setBaseline(garden, second, 'Moisture', 'Flooded');
  garden = setBaseline(garden, neighborsOf(first)[0], 'Moisture', 'Damp');
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Moisture, 'Damp');
  assert.equal(result.adjacency[middle].length, 1);
  assert.equal(result.adjacency[middle][0].from.length, 2);
  const twoCrossings = neighborsOf(middle)[3];
  assert.equal(result.conditions[twoCrossings].Moisture, 'Dry');
  assert.ok(Object.values(result.conditions).every((entry) => entry.Moisture !== 'Flooded' || entry === result.conditions[first] || entry === result.conditions[second]));
});

test('Temperature extreme neighbors shift targets without creating new extremes', () => {
  let garden = createGarden(7, 7);
  const hot = keyAt(2, 2);
  const freezing = keyAt(5, 4);
  garden = setBaseline(garden, hot, 'Temperature', 'Hot');
  garden = setBaseline(garden, freezing, 'Temperature', 'Freezing');
  const nextToHot = neighborsOf(hot)[0];
  const nextToFreezing = neighborsOf(freezing)[3];
  garden = setBaseline(garden, nextToHot, 'Temperature', 'Freezing');
  garden = setBaseline(garden, nextToFreezing, 'Temperature', 'Hot');
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[nextToHot].Temperature, 'Cold');
  assert.equal(result.conditions[nextToFreezing].Temperature, 'Warm');
  assert.equal(result.conditions[hot].Temperature, 'Warm', 'an ordinary Hot hex can be cooled by an adjacent Freezing hex');
  assert.equal(result.conditions[freezing].Temperature, 'Cold', 'an ordinary Freezing hex can be warmed by an adjacent Hot hex');
});

test('Hot and Freezing hexes change each other through adjacency', () => {
  let garden = createGarden(5, 5);
  const hot = keyAt(1, 2);
  const cold = neighborsOf(hot)[0];
  garden = setBaseline(garden, hot, 'Temperature', 'Hot');
  garden = setBaseline(garden, cold, 'Temperature', 'Freezing');
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[hot].Temperature, 'Warm');
  assert.equal(result.conditions[cold].Temperature, 'Cold');
});

test('same-direction neighbors do not stack and opposing Temperature extremes cancel', () => {
  let garden = createGarden(7, 7);
  const middle = keyAt(3, 3);
  for (const direction of [0, 1, 2]) garden = setBaseline(garden, neighborsOf(middle)[direction], 'Temperature', 'Hot');
  let result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Temperature, 'Warm');
  garden = setBaseline(garden, neighborsOf(middle)[3], 'Temperature', 'Freezing');
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Temperature, 'Temperate');
  assert.equal(result.adjacency[middle].filter((entry) => entry.property === 'Temperature').length, 0);
});

test('Temperature adjacency does not chain from neighbors warmed in the same pass', () => {
  let garden = createGarden(7, 7);
  const hot = keyAt(1, 3);
  const warmNeighbor = neighborsOf(hot)[0];
  const beyond = neighborsOf(warmNeighbor)[0];
  garden = setBaseline(garden, hot, 'Temperature', 'Hot');
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[warmNeighbor].Temperature, 'Warm');
  assert.equal(result.conditions[beyond].Temperature, 'Temperate');
  assert.deepEqual(calculateEnvironment(garden), result, 'ordinary recalculation is stable');
});

test('environment exposes only the three retained properties and kinds', () => {
  const garden = createGarden(5, 5);
  const result = calculateEnvironment(garden);
  assert.deepEqual(PROPERTIES, ['Moisture', 'Temperature', 'Illumination']);
  assert.deepEqual(KINDS.slice(0, 3), ['Aqueous', 'Thermal', 'Luminous']);
  assert.ok(KINDS.includes('Growth'));
  assert.ok(KINDS.includes('Ripening'));
  assert.ok(KINDS.includes('Mycelial'));
  assert.deepEqual(Object.keys(garden.hexes[keyAt(2, 2)].baselines), PROPERTIES);
  assert.deepEqual(Object.keys(result.conditions[keyAt(2, 2)]), PROPERTIES);
  assert.throws(() => setBaseline(garden, keyAt(2, 2), 'Fertility', 'Rich'), /Invalid Property/);
  assert.throws(() => makeInfluence('Enrichment', 1, 2), /Unknown environmental Influence/);
  assert.throws(() => makeAnchoredSource('Fertility', 'Rich'), /Invalid anchored Property/);
});

test('old garden versions are rejected, and V6 migration preserves Sources, Blockers and baselines', () => {
  const origin = keyAt(1, 1), blocked = keyAt(2, 1), retired = keyAt(0, 0);
  let legacy = createGarden(4, 4);
  legacy = setBaseline(legacy, blocked, 'Moisture', 'Flooded');
  legacy = placeObject(legacy, origin, makeSource([
    makeInfluence('Warming', 2, 1),
    { name: 'Enrichment', kind: 'Nutrient', property: 'Fertility', modifier: 1, mode: 'waterborne', range: 2 },
  ]));
  legacy.objects[origin].anchor = { property: 'Fertility', condition: 'Rich' };
  legacy = placeObject(legacy, retired, makeBlocker('kind', 'Nutrient'));
  legacy = placeEdgeBlocker(legacy, origin, blocked, makeBlocker('mode', 'waterborne'));
  assert.throws(() => migrateGarden({ ...legacy, schemaVersion: 5 }), /Unsupported garden file/);
  // Current-schema data can still be sanitized safely during JSON loading.
  const upgraded = migrateGarden(legacy);
  assert.equal(upgraded.schemaVersion, 6);
  assert.equal(upgraded.hexes[blocked].baselines.Moisture, 'Flooded');
  assert.equal(upgraded.objects[origin].emissions.length, 1);
  assert.equal(upgraded.objects[origin].emissions[0].name, 'Warming');
  assert.equal(upgraded.objects[origin].anchor, undefined);
  assert.equal(upgraded.objects[retired], undefined, 'removed-kind Blockers no longer obstruct useful effects');
  assert.deepEqual(upgraded.edges[edgeKey(origin, blocked)], makeBlocker('mode', 'waterborne'));
  assert.equal(calculateEnvironment(upgraded).conditions[origin].Temperature, 'Hot');
  assert.ok(legacy.objects[retired], 'migration never mutates the original garden');
  assert.deepEqual(migrateGarden(upgraded), upgraded, 'migrating a current garden is stable');
});

test('Bright and Dark adjacency is capped, simultaneous, and cancels when opposed', () => {
  let garden = createGarden(7, 7);
  const middle = keyAt(3, 3);
  const bright = neighborsOf(middle)[0];
  const dark = neighborsOf(middle)[3];
  garden = setBaseline(garden, middle, 'Illumination', 'Dim');
  garden = setBaseline(garden, bright, 'Illumination', 'Bright');
  for (const adjacent of neighborsOf(middle)) {
    if (adjacent !== bright) garden = setBaseline(garden, adjacent, 'Illumination', 'Lit');
  }
  let result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Illumination, 'Lit');
  assert.equal(result.conditions[bright].Illumination, 'Lit', 'a Bright hex can be dimmed by adjacent Dark hexes');
  garden = setBaseline(garden, dark, 'Illumination', 'Dark');
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Illumination, 'Dim');
  assert.equal(result.adjacency[middle].filter((entry) => entry.property === 'Illumination').length, 0);
});

test('Anchored Sources lock exactly one Condition, but remain reachable by other Influences', () => {
  let garden = createGarden(7, 7);
  const origin = keyAt(2, 3);
  const next = neighborsOf(origin)[0];
  garden = placeObject(garden, origin, makeAnchoredSource('Temperature', 'Hot', []));
  garden = placeObject(garden, next, makeSource([
    makeInfluence('Cooling', 3, 1), makeInfluence('Wetting', 1, 1),
  ]));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[origin].Temperature, 'Hot');
  assert.equal(result.conditions[origin].Moisture, 'Damp');
  assert.equal(result.modifiers[origin].Temperature[0].modifier, -3);
  assert.equal(result.conditions[next].Temperature, 'Freezing', 'the regular Source is not anchored');
  assert.equal(result.adjacency[next].length, 0, 'opposing adjacent extremes cancel on the regular Source');
});

test('Anchored Flooded Source establishes Waterborne connectivity before adjacency', () => {
  let garden = createGarden(5, 3);
  const origin = keyAt(0, 1), channel = keyAt(1, 1), target = keyAt(2, 1);
  garden = placeObject(garden, origin, makeSource([makeInfluence('Brightening', 1, 4, 'waterborne')]));
  garden = placeObject(garden, channel, makeAnchoredSource('Moisture', 'Flooded', [makeInfluence('Drying', 3, 0)]));
  garden = setBaseline(garden, target, 'Moisture', 'Flooded');
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[channel].Moisture, 'Flooded');
  assert.equal(result.conditions[target].Illumination, 'Dim');
  assert.equal(result.conditions[origin].Moisture, 'Damp', 'flooded adjacency does not create another Flooded hex');
  assert.equal(result.adjacency[channel].length, 0);
});

function gardenWithAdjacentExtremes() {
  let garden = createGarden(7, 7);
  const origin = keyAt(3, 3);
  const target = neighborsOf(origin)[0];
  // Remove unrelated Dark neighbors so a lone Bright trigger isn't canceled.
  for (const neighbor of neighborsOf(target)) {
    if (garden.hexes[neighbor]) garden = setBaseline(garden, neighbor, 'Illumination', 'Lit');
  }
  garden = setBaseline(garden, target, 'Illumination', 'Dim');
  garden = setBaseline(garden, origin, 'Moisture', 'Flooded');
  garden = setBaseline(garden, origin, 'Temperature', 'Hot');
  garden = setBaseline(garden, origin, 'Illumination', 'Bright');
  return { garden, origin, target };
}

test('Full Edge Blocker stops all Adjacency on its single edge, bidirectionally', () => {
  let { garden, origin, target } = gardenWithAdjacentExtremes();
  let result = calculateEnvironment(garden);
  assert.equal(result.conditions[target].Moisture, 'Damp');
  assert.equal(result.conditions[target].Temperature, 'Warm');
  assert.equal(result.conditions[target].Illumination, 'Lit');
  garden = placeEdgeBlocker(garden, origin, target, makeBlocker());
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[target].Moisture, 'Dry');
  assert.equal(result.conditions[target].Temperature, 'Temperate');
  assert.equal(result.conditions[target].Illumination, 'Dim');
  assert.equal(result.adjacency[target].length, 0);
  const stillAdjacent = neighborsOf(origin).find((neighbor) => garden.hexes[neighbor] && neighbor !== target);
  assert.equal(result.conditions[stillAdjacent].Temperature, 'Warm', 'other edges remain open');
  garden = removeEdgeBlocker(garden, origin, target);
  result = calculateEnvironment(garden);
  assert.equal(result.conditions[target].Moisture, 'Damp', 'removing an Edge Blocker immediately restores adjacency');
});

test('Full Hex Blocker isolates its Condition from neighboring adjacency in both directions', () => {
  let garden = createGarden(5, 5);
  const hot = keyAt(2, 2), freezing = neighborsOf(hot)[0];
  garden = setBaseline(garden, hot, 'Temperature', 'Hot');
  garden = setBaseline(garden, freezing, 'Temperature', 'Freezing');
  assert.equal(calculateEnvironment(garden).conditions[hot].Temperature, 'Warm');
  assert.equal(calculateEnvironment(garden).conditions[freezing].Temperature, 'Cold');
  for (const isolated of [hot, freezing]) {
    const blocked = placeObject(garden, isolated, makeBlocker());
    const result = calculateEnvironment(blocked);
    assert.equal(result.conditions[hot].Temperature, 'Hot');
    assert.equal(result.conditions[freezing].Temperature, 'Freezing');
  }
});

test('Kind-selective Edge Blockers stop only the matching Adjacency Property', () => {
  for (const [kind, expected] of [
    ['Aqueous', ['Dry', 'Warm', 'Lit']],
    ['Thermal', ['Damp', 'Temperate', 'Lit']],
    ['Luminous', ['Damp', 'Warm', 'Dim']],
  ]) {
    let { garden, origin, target } = gardenWithAdjacentExtremes();
    garden = placeEdgeBlocker(garden, origin, target, makeBlocker('kind', kind));
    const result = calculateEnvironment(garden);
    assert.deepEqual([
      result.conditions[target].Moisture,
      result.conditions[target].Temperature,
      result.conditions[target].Illumination,
    ], expected, kind);
  }
});

test('Mode-selective Edge Blockers distinguish Airborne heat/light from Waterborne dampening', () => {
  for (const [mode, expected] of [
    ['airborne', ['Damp', 'Temperate', 'Dim']],
    ['waterborne', ['Dry', 'Warm', 'Lit']],
  ]) {
    let { garden, origin, target } = gardenWithAdjacentExtremes();
    garden = placeEdgeBlocker(garden, origin, target, makeBlocker('mode', mode));
    const result = calculateEnvironment(garden);
    assert.deepEqual([
      result.conditions[target].Moisture,
      result.conditions[target].Temperature,
      result.conditions[target].Illumination,
    ], expected, mode);
    for (const entry of result.adjacency[target]) {
      assert.notEqual(entry.mode, mode, 'the inspector only reports successfully transmitted effects');
    }
  }
});

test('Selective Hex Blockers use the same Kind and Mode filters for incoming and outgoing adjacency', () => {
  for (const isolated of ['origin', 'target']) {
    let { garden, origin, target } = gardenWithAdjacentExtremes();
    garden = placeObject(garden, isolated === 'origin' ? origin : target, makeBlocker('kind', 'Thermal'));
    let result = calculateEnvironment(garden);
    assert.equal(result.conditions[target].Temperature, 'Temperate');
    assert.equal(result.conditions[target].Moisture, 'Damp');
    assert.equal(result.conditions[target].Illumination, 'Lit');

    ({ garden, origin, target } = gardenWithAdjacentExtremes());
    garden = placeObject(garden, isolated === 'origin' ? origin : target, makeBlocker('mode', 'waterborne'));
    result = calculateEnvironment(garden);
    assert.equal(result.conditions[target].Moisture, 'Dry');
    assert.equal(result.conditions[target].Temperature, 'Warm');
    assert.equal(result.conditions[target].Illumination, 'Lit');
  }
});

test('Only unblocked opposing extremes participate in Adjacency cancellation', () => {
  let garden = createGarden(7, 7);
  const middle = keyAt(3, 3);
  const hot = neighborsOf(middle)[0];
  const freezing = neighborsOf(middle)[3];
  garden = setBaseline(garden, hot, 'Temperature', 'Hot');
  garden = setBaseline(garden, freezing, 'Temperature', 'Freezing');
  assert.equal(calculateEnvironment(garden).conditions[middle].Temperature, 'Temperate');
  garden = placeEdgeBlocker(garden, middle, freezing, makeBlocker('kind', 'Thermal'));
  const result = calculateEnvironment(garden);
  assert.equal(result.conditions[middle].Temperature, 'Warm');
  assert.deepEqual(result.adjacency[middle].find((entry) => entry.property === 'Temperature').from, [hot]);
});

test('Adjacency Mode tags only filter blockers and never require Flooded-path connectivity', () => {
  const { garden, target } = gardenWithAdjacentExtremes();
  const result = calculateEnvironment(garden);
  const dampening = result.adjacency[target].find((entry) => entry.property === 'Moisture');
  assert.equal(dampening.kind, 'Aqueous');
  assert.equal(dampening.mode, 'waterborne');
  assert.equal(dampening.before, 'Dry');
  assert.equal(dampening.after, 'Damp');
  assert.equal(result.adjacency[target].find((entry) => entry.property === 'Temperature').mode, 'airborne');
  assert.equal(result.adjacency[target].find((entry) => entry.property === 'Illumination').kind, 'Luminous');
});

test('Anchored Sources obey one-object occupancy, validate Property and survive resizing', () => {
  let garden = createGarden(4, 4);
  const position = keyAt(1, 1);
  garden = placeObject(garden, position, makeAnchoredSource('Illumination', 'Dark', []));
  assert.throws(() => placeObject(garden, position, makeBlocker()), /already contains/);
  assert.throws(() => makeAnchoredSource('Temperature', 'Flooded'), /Invalid anchored/);
  const larger = resizeGarden(garden, 6, 6);
  assert.equal(larger.objects[position].anchor.property, 'Illumination');
  assert.equal(larger.objects[position].anchor.condition, 'Dark');
  assert.deepEqual(calculateEnvironment(larger), calculateEnvironment(JSON.parse(JSON.stringify(larger))));
});
