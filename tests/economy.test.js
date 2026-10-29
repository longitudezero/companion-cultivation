import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGarden, resizeGarden, placeObject, makePlant, makeFungus, setBaseline, advanceGardenTime,
  accruePlantProduction, accrueFungusSpores, productionSchedule, plantOutputRate,
  availableHarvest, harvestPlant, harvestFungus, sowPlant, sowFungus, migrateGarden,
  calculateCultivation,
} from '../src/core/index.js';

const ideal = { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' };
const contact = (kind, amount, window) => ({ kind, amount, ...(window ? { window } : {}) });

test('environmental output response is separate from life progress response', () => {
  assert.equal(plantOutputRate('Beanstalk', ideal), 1);
  assert.equal(plantOutputRate('Beanstalk', { ...ideal, Illumination: 'Bright' }), .85);
  assert.equal(plantOutputRate('Pumpkin', { ...ideal, Temperature: 'Cold' }), .55);
});

test('Leaf bonuses and environmental improvements affect only newly earned production', () => {
  let plant = makePlant('Beanstalk');
  plant.progress = 99;
  plant.production.ordinaryLeaves = 9;
  const lastStep = accruePlantProduction(plant, 100, ideal, [contact('leafYield', .20)]);
  assert.ok(Math.abs(lastStep.ordinaryLeaves - 10.2) < 1e-8);
  assert.ok(Math.abs(lastStep.ordinaryLeaves - 9 * 1.2 - 1.2) > .1);
  const lateCondition = accruePlantProduction(plant, 100,
    { ...ideal, Illumination: 'Dark' }, [contact('leafYield', .20)]);
  assert.ok(Math.abs(lateCondition.ordinaryLeaves - 9.78) < 1e-8);
  assert.equal(accruePlantProduction({ ...plant, progress: 100 }, 100, ideal,
    [contact('leafYield', 10)]).ordinaryLeaves, 9);
});

test('native Ripening decline proportionately reduces old ordinary bonuses, never hourly banks', () => {
  const plant = makePlant('Beanstalk');
  plant.progress = 100;
  plant.production = { ordinaryLeaves: 12, ordinarySeeds: 2, hourlyLeaves: 4, hourlySeeds: 3 };
  const next = accruePlantProduction(plant, 115, ideal);
  assert.ok(Math.abs(next.ordinaryLeaves - 6) < 1e-8);
  assert.equal(next.hourlyLeaves, 4);
  assert.equal(next.hourlySeeds, 3);
  assert.ok(next.ordinarySeeds > 2);
});

test('fixed-window hourly production accrues by crossing-time fraction and requires progress', () => {
  const plant = makePlant('Beanstalk');
  plant.progress = 159;
  let next = accruePlantProduction(plant, 161, ideal, [contact('hourlyLeaf', .15, [160, 190])]);
  assert.ok(Math.abs(next.hourlyLeaves - .075) < 1e-9);
  next = accruePlantProduction({ ...plant, progress: 160 }, 160, ideal,
    [contact('hourlySeed', .15, [160, 195])]);
  assert.equal(next.hourlySeeds, 0);
  const rice = makePlant('Rice');
  rice.progress = 160;
  const bonus = accruePlantProduction(rice, 161, ideal, [contact('hourlySeed', .15, [160, 195])]);
  assert.ok(Math.abs(bonus.hourlySeeds - .315) < 1e-9);
});

test('peak/window and Seed Timing effects use compatibility and remain prospective', () => {
  const schedule = productionSchedule('Rice', [contact('leafPeakTiming', 8),
    contact('leafPeakTiming', -8), contact('harvestWindow', .25), contact('seedTiming', -12)]);
  assert.equal(schedule.peak, 110);
  assert.equal(schedule.from, 96);
  assert.equal(schedule.to, 144);
  assert.equal(schedule.seedFrom, 80.8);
  assert.equal(schedule.seedTo, 180.8);
  const previouslyEarned = makePlant('Rice');
  previouslyEarned.progress = 120;
  previouslyEarned.production.ordinarySeeds = 3;
  const stationary = accruePlantProduction(previouslyEarned, 120, ideal, [contact('seedTiming', -12)]);
  assert.equal(stationary.ordinarySeeds, 3);
});

test('allocation executes one net 3:1 conversion only at a valid destructive harvest', () => {
  const plant = makePlant('Beanstalk');
  plant.production = { ordinaryLeaves: 12.99, ordinarySeeds: 12.99, hourlyLeaves: 0, hourlySeeds: 0 };
  assert.deepEqual(availableHarvest(plant, [contact('leafAllocation', .80)]),
    { leaves: 15, seeds: 3, allocation: .80 });
  assert.deepEqual(availableHarvest(plant, [contact('seedAllocation', .80)]),
    { leaves: 3, seeds: 39, allocation: -.80 });
  assert.deepEqual(availableHarvest(plant, [contact('leafAllocation', .8), contact('seedAllocation', .8)]),
    { leaves: 12, seeds: 12, allocation: 0 });
  assert.deepEqual(availableHarvest(plant, [contact('leafAllocation', .8), contact('leafAllocation', .8)]),
    { leaves: 16, seeds: 0, allocation: 1 });
  assert.equal(availableHarvest({ ...plant, production: { ordinaryLeaves: 0, ordinarySeeds: 8 } },
    [contact('leafAllocation', 1)]).seeds, 8);
  assert.equal(availableHarvest({ ...plant, production: { ordinaryLeaves: 10, ordinarySeeds: 2 } },
    [contact('leafAllocation', 1)]).leaves, 10);
  let garden = placeObject(createGarden(), '2,2', plant);
  garden = placeObject(garden, '3,2', makeFungus('Frostfolio'));
  const snapshot = availableHarvest(garden.objects['2,2'], calculateCultivation(garden)['2,2']);
  const harvested = harvestPlant(garden, '2,2');
  assert.deepEqual(harvested.inventory.leaves, { Beanstalk: snapshot.leaves });
  assert.equal(harvested.inventory.seeds.Beanstalk, 16 + snapshot.seeds);
  assert.equal(harvested.objects['2,2'], undefined);
  assert.throws(() => harvestPlant(harvested, '2,2'), /no living Plant/);
});

test('Germination effects reach empty hexes and all attempted Seeds are consumed', () => {
  let garden = createGarden();
  garden = placeObject(garden, '3,2', makeFungus('Dewmender', 3));
  assert.ok(calculateCultivation(garden)['2,2'].some(effect => effect.kind === 'germination'));
  const success = sowPlant(garden, '2,2', 'Beanstalk', 2, () => 0);
  assert.equal(success.success, true);
  assert.ok(Math.abs(success.chance - .72) < 1e-8);
  assert.equal(success.garden.inventory.seeds.Beanstalk, 14);
  assert.equal(success.garden.objects['2,2'].species, 'Beanstalk');
  const failure = sowPlant(garden, '2,2', 'Beanstalk', 2, () => .999);
  assert.equal(failure.success, false);
  assert.equal(failure.garden.objects['2,2'], undefined);
  assert.equal(failure.garden.inventory.seeds.Beanstalk, 14);
  assert.throws(() => sowPlant(success.garden, '2,2', 'Beanstalk', 1, () => 0), /empty hex/);
  assert.equal(success.garden.inventory.seeds.Beanstalk, 14);
});

test('fungal Spores grow through Sporulation, harvest once and germinate with provisional odds', () => {
  let garden = placeObject(createGarden(), '2,2', makeFungus('Dewmender'));
  garden = advanceGardenTime(garden, 24 * 6).garden;
  assert.ok(Math.abs(garden.objects['2,2'].sporeStock - 4) < 1e-7);
  assert.ok(Math.abs(accrueFungusSpores(garden.objects['2,2'], garden.objects['2,2'].progress) - 4) < 1e-8);
  garden = harvestFungus(garden, '2,2');
  assert.equal(garden.inventory.spores.Dewmender, 4);
  assert.equal(garden.objects['2,2'], undefined);
  assert.throws(() => harvestFungus(garden, '2,2'), /no living Fungus/);
  const attempt = sowFungus(garden, '2,2', 'Dewmender', 2, () => 0);
  assert.equal(attempt.chance, .5);
  assert.equal(attempt.garden.inventory.spores.Dewmender, 2);
  assert.equal(attempt.garden.objects['2,2'].species, 'Dewmender');
});

test('clock advancement banks fractional production; migration and resize preserve inventory', () => {
  let garden = createGarden();
  for (const key of Object.keys(garden.hexes)) {
    garden = setBaseline(garden, key, 'Moisture', 'Damp');
    garden = setBaseline(garden, key, 'Illumination', 'Lit');
  }
  garden = placeObject(garden, '2,2', makePlant('Beanstalk'));
  garden = advanceGardenTime(garden, 100).garden;
  assert.ok(garden.objects['2,2'].production.ordinaryLeaves > 0);
  const hydrated = migrateGarden(structuredClone(garden));
  assert.deepEqual(hydrated.inventory, garden.inventory);
  assert.deepEqual(hydrated.objects['2,2'].production, garden.objects['2,2'].production);
  assert.deepEqual(resizeGarden(hydrated, 10, 10).inventory, garden.inventory);
});
