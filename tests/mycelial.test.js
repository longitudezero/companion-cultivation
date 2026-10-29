import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, resizeGarden, placeObject, placeEdgeBlocker, removeEdgeBlocker,
  removeObject, setBaseline, makeFungus, makePlant, makeBlocker, advanceGardenTime,
  isMycelial, mycelialContributors, calculateMycelialSupport, calculateEnvironment,
  MYCELIAL_TUNING, migrateGarden, sowFungus,
  calculateCultivation, availableHarvest, accruePlantProduction, plantGrowthRates,
} from '../src/core/index.js';

const origin = '2,2';
const step = (garden, hours) => advanceGardenTime(garden, hours).garden;
const mycelord = () => placeObject(createGarden(7, 7), origin, makeFungus('Mycelord'));
function corridor() {
  let garden = createGarden(7, 7);
  for (const key of Object.keys(garden.hexes)) garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  for (const key of [origin, '3,2', '4,2']) garden = setBaseline(garden, key, 'Moisture', 'Dry');
  return placeObject(garden, origin, makeFungus('Mycelord'));
}

test('Mycelord anchors only timed colonization; recalculation and edits do not tick it', () => {
  let garden = mycelord();
  const id = garden.objects[origin].colonyId;
  assert.ok(id.startsWith('colony:'));
  assert.equal(isMycelial(garden, origin), false);
  assert.equal(isMycelial(garden, '3,2'), false);
  garden = step(garden, MYCELIAL_TUNING.colonizeHoursPerHex - 1);
  assert.equal(isMycelial(garden, origin), false);
  garden = setBaseline(garden, origin, 'Illumination', 'Lit');
  assert.equal(isMycelial(garden, origin), false);
  garden = step(garden, 1);
  assert.equal(isMycelial(garden, origin), true);
  assert.equal(isMycelial(garden, '3,2'), false);
  garden = step(garden, MYCELIAL_TUNING.colonizeHoursPerHex);
  assert.equal(isMycelial(garden, '3,2'), true);
  assert.equal(garden.mycelium.contributions[id].cells[origin].unsupportedHours, 0);
});

test('Flooded cells never relay colonization; drainage starts a new timed frontier', () => {
  let garden = corridor();
  garden = setBaseline(garden, '3,2', 'Moisture', 'Flooded');
  garden = step(garden, 48);
  // Source is not Flooded, and both corridor cells are inaccessible.
  assert.equal(isMycelial(garden, origin), true);
  assert.equal(isMycelial(garden, '3,2'), false);
  assert.equal(isMycelial(garden, '4,2'), false);
  garden = setBaseline(garden, '3,2', 'Moisture', 'Dry');
  assert.equal(isMycelial(garden, '3,2'), false);
  garden = step(garden, 11);
  assert.equal(isMycelial(garden, '3,2'), false);
  garden = step(garden, 1);
  assert.equal(isMycelial(garden, '3,2'), true);
});

test('Kind-selective edge blocker severs support and causes gradual near-boundary retreat', () => {
  let garden = step(corridor(), 36);
  const id = garden.objects[origin].colonyId;
  assert.ok(isMycelial(garden, '3,2'));
  assert.ok(isMycelial(garden, '4,2'));
  garden = placeEdgeBlocker(garden, origin, '3,2', makeBlocker('kind', 'Mycelial'));
  assert.ok(isMycelial(garden, '3,2'));
  assert.equal(calculateMycelialSupport(garden, calculateEnvironment(garden))[id].includes('3,2'), false);
  garden = step(garden, 11);
  assert.equal(isMycelial(garden, '3,2'), true);
  garden = step(garden, 1);
  assert.equal(isMycelial(garden, '3,2'), false);
  assert.equal(isMycelial(garden, '4,2'), true);
  garden = step(garden, 12);
  assert.equal(isMycelial(garden, '4,2'), false);
});

test('repairing support before retreat finishes preserves the surviving contribution', () => {
  let garden = step(corridor(), 36);
  garden = placeEdgeBlocker(garden, origin, '3,2', makeBlocker('kind', 'Mycelial'));
  garden = step(garden, 11);
  garden = removeEdgeBlocker(garden, origin, '3,2');
  assert.ok(calculateMycelialSupport(garden, calculateEnvironment(garden))
    [garden.objects[origin].colonyId].includes('3,2'));
  garden = step(garden, 1);
  assert.equal(isMycelial(garden, '3,2'), true);
  assert.equal(isMycelial(garden, '4,2'), true);
  assert.equal(garden.mycelium.contributions[garden.objects[origin].colonyId]
    .cells['3,2'].unsupportedHours, 0);
});

test('nonmatching selective Blockers do not interrupt separate Mycelial propagation', () => {
  let garden = step(corridor(), 12);
  garden = placeEdgeBlocker(garden, origin, '3,2', makeBlocker('kind', 'Thermal'));
  garden = step(garden, 12);
  assert.equal(isMycelial(garden, '3,2'), true);
});

test('overlapping Mycelords have independent contributions and retirement clocks', () => {
  let garden = placeObject(createGarden(7, 7), origin, makeFungus('Mycelord'));
  garden = placeObject(garden, '4,2', makeFungus('Mycelord'));
  const firstId = garden.objects[origin].colonyId;
  const secondId = garden.objects['4,2'].colonyId;
  garden = step(garden, 24);
  assert.deepEqual(new Set(mycelialContributors(garden, '3,2')), new Set([firstId, secondId]));
  garden = removeObject(garden, origin);
  assert.equal(mycelialContributors(garden, '3,2').length, 2);
  garden = step(garden, 24);
  assert.deepEqual(mycelialContributors(garden, '3,2'), [secondId]);
  assert.equal(isMycelial(garden, '3,2'), true);
  garden = placeObject(garden, origin, makeFungus('Mycelord'));
  assert.notEqual(garden.objects[origin].colonyId, firstId);
});

test('Mycelord dies only after uninterrupted Flooded exposure; own flood severs support', () => {
  let garden = step(mycelord(), 24);
  assert.equal(isMycelial(garden, '3,2'), true);
  garden = setBaseline(garden, origin, 'Moisture', 'Flooded');
  garden = step(garden, 11);
  assert.equal(isMycelial(garden, origin), true);
  assert.equal(garden.objects[origin].exposure.Flooded, 11);
  garden = setBaseline(garden, origin, 'Moisture', 'Dry');
  garden = step(garden, 1);
  assert.equal(garden.objects[origin].exposure.Flooded, 0);
  assert.equal(isMycelial(garden, origin), true);
  garden = setBaseline(garden, origin, 'Moisture', 'Flooded');
  garden = step(garden, MYCELIAL_TUNING.mycelordFloodDeathHours - 1);
  assert.ok(garden.objects[origin]);
  const result = advanceGardenTime(garden, 1);
  assert.equal(result.garden.objects[origin], undefined);
  assert.match(result.events.at(-1), /Mycelord died/);
  assert.equal(isMycelial(result.garden, '3,2'), false);
});

test('sown Mycelord is allowed on Flooded, with an immediate exposure countdown', () => {
  let garden = createGarden();
  garden.inventory.spores.Mycelord = 4;
  garden = setBaseline(garden, origin, 'Moisture', 'Flooded');
  const attempt = sowFungus(garden, origin, 'Mycelord', 4, () => 0);
  assert.equal(attempt.success, true);
  garden = step(attempt.garden, 1);
  assert.equal(garden.objects[origin].exposure.Flooded, 1);
  assert.equal(isMycelial(garden, origin), false);
});

test('dependent Fungi require overlay to germinate and retain emissions through habitat grace', () => {
  let garden = createGarden(7, 7);
  garden.inventory.spores.Rushroom = 4;
  assert.throws(() => sowFungus(garden, '3,2', 'Rushroom', 4, () => 0), /requires Mycelial/);
  assert.equal(garden.inventory.spores.Rushroom, 4);
  garden = placeObject(garden, origin, makeFungus('Mycelord'));
  garden = step(garden, 24);
  const attempt = sowFungus(garden, '3,2', 'Rushroom', 4, () => 0);
  assert.equal(attempt.success, true);
  garden = attempt.garden;
  garden = removeObject(garden, origin);
  garden = step(garden, 25);
  assert.equal(isMycelial(garden, '3,2'), false);
  assert.ok(garden.objects['3,2']);
  assert.ok(garden.objects['3,2'].exposure.MissingMycelial > 0);
  assert.ok(calculateCultivation(garden)['4,2'].some(effect => effect.species === 'Rushroom'));
  garden = step(garden, MYCELIAL_TUNING.dependentHabitatGraceHours);
  assert.equal(garden.objects['3,2'], undefined);
  assert.ok(!calculateCultivation(garden)['4,2'].some(effect => effect.species === 'Rushroom'));
});

test('dependent Frostfolio retains its three-effect package during habitat-loss grace', () => {
  let garden = placeObject(createGarden(7, 7), origin, makeFungus('Mycelord'));
  garden = step(garden, 24);
  garden = removeObject(garden, origin);
  garden = placeObject(garden, origin, makeFungus('Frostfolio'));
  garden = placeObject(garden, '3,2', makePlant('Beanstalk'));
  const contacts = calculateCultivation(garden)['3,2'];
  assert.deepEqual(contacts.filter(effect => effect.species === 'Frostfolio').map(effect => [effect.kind, effect.amount]),
    [['germination', 6], ['leafPeakTiming', -8], ['seedYield', .35]]);
  const plant = garden.objects['3,2'];
  plant.production = { ordinaryLeaves: 12, ordinarySeeds: 12, hourlyLeaves: 0, hourlySeeds: 0 };
  assert.equal(availableHarvest(plant, contacts).leaves, 12);
  garden = step(garden, 12);
  assert.equal(isMycelial(garden, origin), false);
  assert.deepEqual(calculateCultivation(garden)['3,2'].filter(effect => effect.species === 'Frostfolio')
    .map(effect => effect.amount), [6, -8, .35]);
});

test('Ingredients suffer independent Mycelial rate, output and lethal-exposure penalties', () => {
  let garden = createGarden(7, 7);
  for (const key of Object.keys(garden.hexes)) {
    garden = setBaseline(garden, key, 'Moisture', 'Damp');
    garden = setBaseline(garden, key, 'Illumination', 'Lit');
  }
  garden = placeObject(garden, origin, makeFungus('Mycelord'));
  garden = placeObject(garden, '3,2', makePlant('Beanstalk'));
  garden = step(garden, 24);
  assert.equal(isMycelial(garden, '3,2'), true);
  assert.equal(garden.objects['3,2'].exposure.Mycelial, 0);
  const plant = garden.objects['3,2'];
  const optimal = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' };
  assert.equal(plantGrowthRates(plant, optimal, [], true).growth, .5);
  const peakPlant = { ...plant, progress: 99, production: {
    ordinaryLeaves: 9, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0 } };
  assert.ok(Math.abs(accruePlantProduction(peakPlant, 100, optimal, [], true).ordinaryLeaves - 9.5) < 1e-9);
  garden = step(garden, 47);
  assert.equal(garden.objects['3,2'].exposure.Mycelial, 47);
  garden = step(garden, 1);
  assert.equal(garden.objects['3,2'], undefined);
});

test('migration, resize and JSON roundtrip keep independent colony data', () => {
  let garden = step(mycelord(), 25);
  const snapshot = structuredClone(garden);
  const loaded = migrateGarden(JSON.parse(JSON.stringify(garden)));
  assert.deepEqual(loaded.mycelium, garden.mycelium);
  assert.equal(loaded.objects[origin].colonyId, garden.objects[origin].colonyId);
  assert.deepEqual(garden, snapshot);
  const resized = resizeGarden(loaded, 8, 8);
  assert.deepEqual(resized.mycelium, garden.mycelium);
  const second = placeObject(resized, '4,5', makeFungus('Mycelord'));
  assert.notEqual(second.objects['4,5'].colonyId, second.objects[origin].colonyId);
});
