import { removeObject, placeObject } from './grid.js';
import { PLANTS, FUNGI, makePlant, makeFungus } from './species.js';
import { calculateCultivation } from './cultivation.js';
import { isMycelial } from './mycelial.js';

// Not approved balance: only the species peak, productive window and maximum
// Seed yield are approved. Triangular Leaves, linear Seeds, Spore numbers and
// starting stocks are deliberately replaceable playtest interpolation/tuning.
export const ECONOMY_TUNING = Object.freeze({ starterPotatoSeeds: 16,
  fungusSporeYieldAt200: 8, fungusGerminationChance: .25 });

const MOISTURE = ['Dry', 'Damp', 'Flooded'];
const LIGHT = ['Dark', 'Dim', 'Lit', 'Bright'];
const clamp = (value, lo, hi) => Math.max(lo, Math.min(hi, value));
const count = value => Number.isFinite(value) && value > 0 ? value : 0;
const matching = (contacts, kind) => contacts.filter(effect => effect.kind === kind);
const sum = (contacts, kind, compatibility) => matching(contacts, kind)
  .reduce((total, effect) => total + effect.amount * (compatibility[kind] ?? 1), 0);

export function plantOutputRate(species, conditions) {
  const profile = PLANTS[species];
  if (!profile) throw new Error(`Unknown Plant species: ${species}`);
  const moisture = profile.moisture[MOISTURE.indexOf(conditions.Moisture)];
  const light = profile.lightOutput[LIGHT.indexOf(conditions.Illumination)];
  let temperature = 1;
  if (['Hot', 'Freezing'].includes(conditions.Temperature)) temperature = .5;
  else if (!profile.preferredTemperature.includes(conditions.Temperature)) {
    temperature = species === 'Pumpkin' && conditions.Temperature === 'Cold' ? .55 : .85;
  }
  return moisture * light * temperature;
}

// Signed peak shifts stack; window widening changes breadth, not center.
// Exact curve interpolation/boundary behavior remains sandbox tuning.
export function productionSchedule(species, contacts = []) {
  const profile = PLANTS[species];
  const compatibility = profile.compatibility;
  const [start, end] = profile.productiveWindow;
  const halfExpansion = (end - start) * Math.max(-.9, sum(contacts, 'harvestWindow', compatibility)) / 2;
  const from = clamp(start - halfExpansion, 0, 200);
  const to = clamp(end + halfExpansion, 0, 200);
  const peak = clamp(profile.leafPeakAt + sum(contacts, 'leafPeakTiming', compatibility), from + .001, to - .001);
  const seedShift = sum(contacts, 'seedTiming', compatibility);
  return { from, peak, to,
    seedFrom: clamp(100 + seedShift, 0, 199.999), seedTo: clamp(200 + seedShift, 100.001, 200) };
}

function leafPotential(profile, progress, schedule) {
  const { from, peak, to } = schedule;
  if (progress <= from || progress >= to) return 0;
  if (progress <= peak) return profile.leafPeak * (progress - from) / (peak - from);
  return profile.leafPeak * (to - progress) / (to - peak);
}

function seedPotential(profile, progress, schedule) {
  return profile.seeds * clamp((progress - schedule.seedFrom) / (schedule.seedTo - schedule.seedFrom), 0, 1);
}

function activeHours(previousProgress, nextProgress, window) {
  const travelled = nextProgress - previousProgress;
  if (travelled <= 0) return 0;
  const [start, end] = window;
  return clamp((Math.min(nextProgress, end) - Math.max(previousProgress, start)) / travelled, 0, 1);
}

export function accruePlantProduction(plant, nextProgress, conditions, contacts = [], mycelial = false) {
  const production = { ordinaryLeaves: 0, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0,
    ...plant.production };
  if (nextProgress <= plant.progress) return production;
  const profile = PLANTS[plant.species];
  const schedule = productionSchedule(plant.species, contacts);
  const environment = plantOutputRate(plant.species, conditions) * (mycelial ? .5 : 1);
  const leavesBefore = leafPotential(profile, plant.progress, schedule);
  const leavesAfter = leafPotential(profile, nextProgress, schedule);
  if (leavesAfter > leavesBefore) {
    production.ordinaryLeaves += (leavesAfter - leavesBefore) * environment
      * Math.max(0, 1 + sum(contacts, 'leafYield', profile.compatibility));
  } else if (leavesAfter < leavesBefore) {
    // Previously earned ordinary Yield bonuses decline in exactly the same
    // proportion as native Leaves. Fixed-window hourly bonuses never decline.
    production.ordinaryLeaves *= leavesBefore ? leavesAfter / leavesBefore : 0;
  }
  production.ordinarySeeds += Math.max(0, seedPotential(profile, nextProgress, schedule)
    - seedPotential(profile, plant.progress, schedule)) * environment
    * Math.max(0, 1 + sum(contacts, 'seedYield', profile.compatibility));
  for (const effect of contacts) {
    if (effect.kind !== 'hourlyLeaf' && effect.kind !== 'hourlySeed') continue;
    const earned = effect.amount * profile.compatibility[effect.kind]
      * activeHours(plant.progress, nextProgress, effect.window);
    if (effect.kind === 'hourlyLeaf') production.hourlyLeaves += earned;
    else production.hourlySeeds += earned;
  }
  return production;
}

export function accrueFungusSpores(fungus, nextProgress, total = ECONOMY_TUNING.fungusSporeYieldAt200) {
  return count(fungus.sporeStock) + Math.max(0,
    clamp(nextProgress, 100, 200) - clamp(fungus.progress, 100, 200)) * total / 100;
}

export function availableHarvest(plant, contacts = []) {
  if (plant?.type !== 'plant') throw new Error('Harvest requires a living Plant.');
  const bank = plant.production || {};
  let leaves = Math.floor(count(bank.ordinaryLeaves) + count(bank.hourlyLeaves) + 1e-9);
  let seeds = Math.floor(count(bank.ordinarySeeds) + count(bank.hourlySeeds) + 1e-9);
  const compatibility = PLANTS[plant.species].compatibility.allocation;
  const signed = contacts.reduce((result, effect) => result + (
    effect.kind === 'leafAllocation' ? effect.amount :
      effect.kind === 'seedAllocation' ? -effect.amount : 0
  ) * compatibility, 0);
  const allocation = leaves >= 1 && seeds >= 1 ? clamp(signed, -1, 1) : 0;
  if (allocation > 0) {
    const groups = Math.floor(seeds * allocation / 3);
    leaves += groups;
    seeds -= groups * 3;
  } else if (allocation < 0) {
    const exchanged = Math.floor(leaves * -allocation);
    leaves -= exchanged;
    seeds += exchanged * 3;
  }
  return { leaves, seeds, allocation };
}

export function harvestPlant(garden, key) {
  const plant = garden.objects[key];
  if (plant?.type !== 'plant') throw new Error('There is no living Plant to harvest here.');
  const yieldResult = availableHarvest(plant, calculateCultivation(garden)[key]);
  const next = removeObject(garden, key);
  const inventory = garden.inventory || { leaves: 0, seeds: {}, spores: {} };
  return { ...next, inventory: { ...inventory, leaves: count(inventory.leaves) + yieldResult.leaves,
    seeds: { ...inventory.seeds,
      [plant.species]: count(inventory.seeds?.[plant.species]) + yieldResult.seeds } } };
}

export function harvestFungus(garden, key) {
  const fungus = garden.objects[key];
  if (fungus?.type !== 'fungus') throw new Error('There is no living Fungus to harvest here.');
  const spores = Math.floor(count(fungus.sporeStock) + 1e-9);
  const next = removeObject(garden, key);
  const inventory = garden.inventory || { leaves: 0, seeds: {}, spores: {} };
  return { ...next, inventory: { ...inventory, spores: { ...inventory.spores,
    [fungus.species]: count(inventory.spores?.[fungus.species]) + spores } } };
}

function checkSowing(garden, key, species, available, quantity, random) {
  if (!garden.hexes[key]) throw new Error('Sowing requires a garden hex.');
  if (garden.objects[key]) throw new Error('Sowing requires an empty hex.');
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > available) {
    throw new Error(`Choose between 1 and ${available} available Seeds or Spores.`);
  }
  if (typeof random !== 'function') throw new Error('Expected a random number source.');
}

export function sowPlant(garden, key, species, quantity = 1, random = Math.random) {
  if (!PLANTS[species]) throw new Error(`Unknown Plant species: ${species}`);
  const inventory = garden.inventory || { leaves: 0, seeds: {}, spores: {} };
  const owned = inventory.seeds?.[species] || 0;
  checkSowing(garden, key, species, owned, quantity, random);
  const contacts = calculateCultivation(garden)[key];
  const bonus = sum(contacts, 'germination', PLANTS[species].compatibility) / 100;
  const chance = clamp(quantity * (PLANTS[species].germination + bonus), 0, 1);
  const success = random() < chance;
  const spent = { ...garden, inventory: { ...inventory,
    seeds: { ...inventory.seeds, [species]: owned - quantity } } };
  return { garden: success ? placeObject(spent, key, makePlant(species)) : spent, success, chance };
}

export function sowFungus(garden, key, species, quantity = 1, random = Math.random) {
  if (!FUNGI[species]) throw new Error(`Unknown Fungus species: ${species}`);
  if (FUNGI[species].habitat === 'dependent' && !isMycelial(garden, key)) {
    throw new Error(`${species} requires Mycelial ground for germination.`);
  }
  const inventory = garden.inventory || { leaves: 0, seeds: {}, spores: {} };
  const owned = inventory.spores?.[species] || 0;
  checkSowing(garden, key, species, owned, quantity, random);
  const chance = clamp(quantity * ECONOMY_TUNING.fungusGerminationChance, 0, 1);
  const success = random() < chance;
  const spent = { ...garden, inventory: { ...inventory,
    spores: { ...inventory.spores, [species]: owned - quantity } } };
  return { garden: success ? placeObject(spent, key, makeFungus(species)) : spent, success, chance };
}
