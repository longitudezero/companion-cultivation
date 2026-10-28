import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FUNGI, PLANTS, makePlant, makeFungus, createGarden, placeObject, setBaseline,
  calculateEnvironment, calculateCultivation, advanceGardenTime, stageOf,
  plantEnvironmentRate, plantGrowthRates, migrateGarden, placeEdgeBlocker, makeBlocker,
  neighborsOf,
} from '../src/core/index.js';

const plantAt = (species = 'Potato', at = '2,2') => placeObject(createGarden(7, 7), at, makePlant(species));

test('playable biology catalogue has six Plant families (60 species) and the V8 12-Fungus roster', () => {
  assert.equal(Object.keys(PLANTS).length, 60);
  assert.equal(Object.keys(FUNGI).length, 13); // twelve ordinary Fungi plus Mycelord
  assert.equal(PLANTS.Potato.compatibility.growthRate, 1);
  assert.equal(PLANTS.Potato.compatibility.allocation, 1);
  assert.equal(PLANTS.Rice.compatibility.hourlySeed, 2.1);
  assert.equal(PLANTS.Strawberry.freezingDeath, 36);
  assert.equal(FUNGI.Rushroom.habitat, 'dependent');
  assert.equal(FUNGI.Siltgill.cultivation.mode, 'airborne');
  assert.equal(makeFungus('Mycelord').emissions.length, 0);
  assert.equal(makeFungus('Prismorel', 2).emissions[0].range, 2);
  assert.equal(makeFungus('Rilllace', 2).emissions[0].heading, 2);
});

test('one object occupies a hex and a new Fungus emits immediately', () => {
  let garden = plantAt('Potato');
  assert.throws(() => placeObject(garden, '2,2', makeFungus('Dewmender')), /already contains/);
  garden = placeObject(garden, '3,2', makeFungus('Dewmender'));
  const state = calculateEnvironment(garden);
  assert.equal(state.conditions['2,2'].Moisture, 'Damp');
  assert.ok(state.coverage['3,2:0'].some(x => x.key === '2,2'));
});

test('approved Plant duration and combined habitat rates drive real hourly progress', () => {
  let garden = plantAt('Potato');
  // Surrounding Dark hexes would otherwise dim a Lit target by adjacency.
  for (const key of Object.keys(garden.hexes)) {
    garden = setBaseline(garden, key, 'Moisture', 'Damp');
    garden = setBaseline(garden, key, 'Illumination', 'Lit');
  }
  assert.equal(plantEnvironmentRate('Potato', calculateEnvironment(garden).conditions['2,2']), 1);
  const first = advanceGardenTime(garden, 24);
  assert.ok(Math.abs(first.garden.objects['2,2'].progress - 25) < 1e-9);
  const finish = advanceGardenTime(first.garden, 24 * 7);
  assert.ok(finish.garden.objects['2,2'].progress > 199.99);
  assert.equal(stageOf(finish.garden.objects['2,2']), 'Mature');
  assert.equal(finish.garden.clockHours, 192);
});

test('unfavorable light and moisture reduce growth, without an invented stall', () => {
  const garden = plantAt('Potato');
  const next = advanceGardenTime(garden, 1).garden.objects['2,2'];
  const expected = 100 / (4 * 24) * .65 * .75;
  assert.ok(Math.abs(next.progress - expected) < 1e-9);
});

test('independent Dry and Temperature clocks reset and cause death at exact thresholds', () => {
  let garden = plantAt('Strawberry');
  garden = setBaseline(garden, '2,2', 'Moisture', 'Damp');
  garden = setBaseline(garden, '2,2', 'Temperature', 'Freezing');
  garden = advanceGardenTime(garden, 35).garden;
  assert.equal(garden.objects['2,2'].exposure.Freezing, 35);
  assert.equal(garden.objects['2,2'].exposure.Dry, 0);
  garden = setBaseline(garden, '2,2', 'Temperature', 'Cold');
  garden = advanceGardenTime(garden, 1).garden;
  assert.equal(garden.objects['2,2'].exposure.Freezing, 0);
  garden = setBaseline(garden, '2,2', 'Temperature', 'Freezing');
  const before = advanceGardenTime(garden, 35);
  assert.ok(before.garden.objects['2,2']);
  const dead = advanceGardenTime(before.garden, 1);
  assert.equal(dead.garden.objects['2,2'], undefined);
  assert.match(dead.events[0], /36h of Freezing/);
});

test('fungal Growth and Ripening cultivation effects share a package footprint', () => {
  let garden = plantAt('Carrot');
  garden = setBaseline(garden, '2,2', 'Moisture', 'Damp');
  garden = setBaseline(garden, '2,2', 'Illumination', 'Lit');
  garden = placeObject(garden, '3,2', makeFungus('Droughtcap'));
  const state = calculateEnvironment(garden);
  const effects = calculateCultivation(garden, state)['2,2'];
  assert.equal(effects.length, 2);
  assert.equal(effects[0].kind, 'growthRate');
  assert.equal(effects[0].amount, -.25);
  assert.equal(effects[1].kind, 'ripeningRate');
  assert.equal(effects[1].amount, -.30);
  const rates = plantGrowthRates(garden.objects['2,2'], state.conditions['2,2'], effects);
  assert.ok(rates.growth < plantGrowthRates(garden.objects['2,2'], state.conditions['2,2'], []).growth);
  assert.ok(advanceGardenTime(garden, 1).garden.objects['2,2'].progress > 0);
});

test('selective cultivation Blockers stop Growth but let Drying emission and Ripening through', () => {
  let garden = plantAt('Carrot');
  garden = setBaseline(garden, '2,2', 'Illumination', 'Lit');
  garden = placeObject(garden, '3,2', makeFungus('Droughtcap'));
  for (const neighbor of neighborsOf('3,2')) {
    if (garden.hexes[neighbor]) garden = placeEdgeBlocker(garden, '3,2', neighbor, makeBlocker('kind', 'Growth'));
  }
  const state = calculateEnvironment(garden);
  assert.equal(state.conditions['2,2'].Moisture, 'Dry');
  assert.deepEqual(calculateCultivation(garden, state)['2,2'].map(effect => effect.kind), ['ripeningRate']);
});

test('V8 cultivation handoff reaches distant Flooded hexes and is interrupted by a dry gap', () => {
  let garden = plantAt('Rice', '2,4');
  garden = placeObject(garden, '2,0', makeFungus('Rainmorel'));
  for (const key of ['2,1', '2,2', '2,3', '2,4']) garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  assert.ok(calculateCultivation(garden)['2,4'].some(x => x.species === 'Rainmorel'));
  garden = setBaseline(garden, '2,2', 'Moisture', 'Damp');
  assert.equal(calculateCultivation(garden)['2,4'].length, 0);
});

test('fungal lifetime and Spore production use explicit provisional stage tuning', () => {
  let garden = placeObject(createGarden(7, 7), '2,2', makeFungus('Dewmender'));
  garden = advanceGardenTime(garden, 24 * 9).garden;
  assert.equal(stageOf(garden.objects['2,2']), 'Mature');
  assert.equal(garden.objects['2,2'].progress, 200);
  assert.ok(Math.abs(garden.objects['2,2'].sporeStock - 8) < 1e-8);
  assert.ok(calculateEnvironment(garden).coverage['2,2:0']);
});

test('saved living organisms and their exposure clocks survive non-mutating migration', () => {
  let garden = plantAt('Strawberry');
  garden = placeObject(garden, '3,2', makeFungus('Prismorel', 3));
  garden = advanceGardenTime(garden, 9).garden;
  const snapshot = structuredClone(garden);
  const loaded = migrateGarden(snapshot);
  assert.deepEqual(loaded.objects['2,2'], garden.objects['2,2']);
  assert.deepEqual(loaded.objects['3,2'], garden.objects['3,2']);
  assert.equal(loaded.clockHours, 9);
  assert.deepEqual(garden, snapshot);
});
