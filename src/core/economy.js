import { removeObject, placeObject } from './grid.js';
import { PLANTS, FUNGI, makePlant, makeFungus, effectCompatibility } from './species.js';
import { calculateCultivation } from './cultivation.js';
import { calculateEnvironment } from './simulation.js';
import { isMycelial } from './mycelial.js';
import { ensureInventorySlots } from './inventory.js';

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
const sum = (contacts, kind, profile, conditions = null, progress = 0) => matching(contacts, kind)
  .reduce((total, effect) => total + effect.amount
    * effectCompatibility(profile, kind, conditions, effect.amount, progress), 0);

export function plantOutputRate(species, conditions, kind = 'leaf') {
  const profile = PLANTS[species];
  if (!profile) throw new Error(`Unknown Plant species: ${species}`);
  const moisture = (kind === 'seed' ? profile.moistureSeedOutput || profile.moistureOutput || profile.moisture
    : profile.moistureOutput || profile.moisture)[MOISTURE.indexOf(conditions.Moisture)];
  const light = (kind === 'seed' ? profile.lightSeedOutput || profile.lightOutput : profile.lightOutput)
    [LIGHT.indexOf(conditions.Illumination)];
  let temperature = 1;
  if (profile.temperature?.[conditions.Temperature]) {
    temperature = profile.temperature[conditions.Temperature][kind === 'seed' ? 'seed' : 'leaf'];
  } else if (['Hot', 'Freezing'].includes(conditions.Temperature)) temperature = .5;
  else if (!profile.preferredTemperature.includes(conditions.Temperature)) {
    temperature = species === 'Pumpkin' && conditions.Temperature === 'Cold' ? .55 : .85;
  }
  return moisture * light * temperature;
}

// Signed peak shifts stack; window widening changes breadth, not center.
// Exact curve interpolation/boundary behavior remains sandbox tuning.
export function productionSchedule(species, contacts = [], conditions = null) {
  const profile = PLANTS[species];
  const [start, end] = profile.productiveWindow;
  const halfExpansion = (end - start) * Math.max(-.9, sum(contacts, 'harvestWindow', profile, conditions)) / 2;
  const from = clamp(start - halfExpansion, 0, 200);
  const to = clamp(end + halfExpansion, 0, 200);
  const peak = clamp(profile.leafPeakAt + sum(contacts, 'leafPeakTiming', profile, conditions), from + .001, to - .001);
  const seedShift = sum(contacts, 'seedTiming', profile, conditions);
  return { from, peak, to,
    leafShift: sum(contacts, 'leafPeakTiming', profile, conditions),
    leafScale: Math.max(.1, 1 + sum(contacts, 'harvestWindow', profile, conditions)),
    seedShift,
    seedFrom: clamp(100 + seedShift, 0, 199.999), seedTo: clamp(200 + seedShift, 100.001, 200) };
}

function triangle(progress, from, peak, to, height) {
  if (progress <= from || progress >= to) return 0;
  return progress <= peak ? height * (progress - from) / (peak - from)
    : height * (to - progress) / (to - peak);
}

function leafPotential(profile, progress, schedule) {
  if (profile.leafPeaks) {
    // Rosewraith's two intrinsic peaks remain distinct despite window/shift
    // modifiers: one consuming harvest still sees only this instant's yield.
    return Math.max(...profile.leafPeaks.map(([from, peak, to, height]) => {
      const mid = peak + schedule.leafShift;
      return triangle(progress, mid - (peak - from) * schedule.leafScale, mid,
        mid + (to - peak) * schedule.leafScale, height);
    }));
  }
  if (profile.leafPlateau) {
    const [from, left, right, to] = profile.leafPlateau;
    const shift = schedule.leafShift;
    const a = left + shift - (left - from) * schedule.leafScale;
    const b = left + shift;
    const c = right + shift;
    const d = right + shift + (to - right) * schedule.leafScale;
    if (progress <= a || progress >= d) return 0;
    if (progress < b) return profile.leafPeak * (progress - a) / (b - a);
    if (progress <= c) return profile.leafPeak;
    return profile.leafPeak * (d - progress) / (d - c);
  }
  const { from, peak, to } = schedule;
  return triangle(progress, from, peak, to, profile.leafPeak);
}

function seedPotential(profile, progress, schedule) {
  if (profile.seedCurve) {
    const anchors = profile.seedCurve.map(([at, amount]) => [at + schedule.seedShift, amount]);
    if (progress <= anchors[0][0]) return anchors[0][1];
    for (let i = 1; i < anchors.length; i += 1) {
      const [to, value] = anchors[i];
      const [from, previous] = anchors[i - 1];
      if (progress <= to) return previous + (value - previous) * (progress - from) / (to - from);
    }
    return anchors.at(-1)[1];
  }
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
  const receiving = { ...conditions, attunement: plant.attunement };
  const schedule = productionSchedule(plant.species, contacts, receiving);
  const environment = plantOutputRate(plant.species, conditions) * (mycelial ? .5 : 1);
  const seedEnvironment = plantOutputRate(plant.species, conditions, 'seed') * (mycelial ? .5 : 1);
  const leavesBefore = leafPotential(profile, plant.progress, schedule);
  const leavesAfter = leafPotential(profile, nextProgress, schedule);
  if (leavesAfter > leavesBefore) {
    production.ordinaryLeaves += (leavesAfter - leavesBefore) * environment
      * Math.max(0, 1 + sum(contacts, 'leafYield', profile, receiving, (plant.progress + nextProgress) / 2));
  } else if (leavesAfter < leavesBefore) {
    // Previously earned ordinary Yield bonuses decline in exactly the same
    // proportion as native Leaves. Fixed-window hourly bonuses never decline.
    production.ordinaryLeaves *= leavesBefore ? leavesAfter / leavesBefore : 0;
  }
  production.ordinarySeeds += Math.max(0, seedPotential(profile, nextProgress, schedule)
    - seedPotential(profile, plant.progress, schedule)) * seedEnvironment
    * Math.max(0, 1 + sum(contacts, 'seedYield', profile, receiving, (plant.progress + nextProgress) / 2));
  for (const effect of contacts) {
    if (effect.kind !== 'hourlyLeaf' && effect.kind !== 'hourlySeed') continue;
    if (effect.kind === 'hourlySeed' && profile.seeds === 0) continue;
    const earned = effect.amount * effectCompatibility(profile, effect.kind, receiving, effect.amount,
      (Math.max(plant.progress, effect.window[0]) + Math.min(nextProgress, effect.window[1])) / 2)
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

export function availableHarvest(plant, contacts = [], conditions = null) {
  if (plant?.type !== 'plant') throw new Error('Harvest requires a living Plant.');
  const bank = plant.production || {};
  // Intrinsic Aquatic bonuses act on ordinary native Leaves, at harvest-time
  // current Moisture, and never manufacture bonus hourly fungal Leaves.
  const moisture = conditions?.Moisture;
  const innate = (plant.species === 'Starlotus' && plant.attunement && plant.attunement === moisture)
    ? 1.6 : plant.species === 'Silvercress' && plant.progress >= 100 && moisture === 'Damp'
      ? 1.5 : 1;
  let leaves = plant.species === 'Bamboozled' ? 0
    : Math.floor(count(bank.ordinaryLeaves) * innate + count(bank.hourlyLeaves) + 1e-9);
  let seeds = PLANTS[plant.species].seeds === 0 ? 0
    : Math.floor(count(bank.ordinarySeeds) + count(bank.hourlySeeds) + 1e-9);
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
  // Mirage Rose produces two separate Seed identities in an equal natural
  // ratio. Round each independent half down so an odd partial total cannot
  // mint an extra Seed or favor either species. The exact odd-remainder rule
  // is prototype rounding, not a change to the approved 1:1 design.
  const seedStacks = profileSeedStacks(PLANTS[plant.species], seeds);
  if (seedStacks) seeds = Object.values(seedStacks).reduce((total, amount) => total + amount, 0);
  return { leaves, seeds, allocation,
    ...(seedStacks ? { seedStacks } : {}),
    ...(plant.species === 'Bamboozled' ? { bambooSteel: plant.progress >= 100 ? 1 : 0 } : {}) };
}

function profileSeedStacks(profile, available) {
  if (!profile.seedDistribution) return null;
  const each = Math.floor(available / profile.seedDistribution.length);
  return Object.fromEntries(profile.seedDistribution.map(name => [name, each]));
}

export function harvestPlant(garden, key) {
  const plant = garden.objects[key];
  if (plant?.type !== 'plant') throw new Error('There is no living Plant to harvest here.');
  if (plant.species === 'Bamboozled' && plant.progress < 100) {
    throw new Error('Bamboo Steel trophy harvest requires Bamboozled to reach 100% Growth.');
  }
  const yieldResult = availableHarvest(plant, calculateCultivation(garden)[key],
    calculateEnvironment(garden).conditions[key]);
  const next = removeObject(garden, key);
  const inventory = garden.inventory || { leaves: {}, legacyLeaves: 0, seeds: {}, spores: {} };
  const seedSpecies = PLANTS[plant.species].seedSpecies === undefined
    ? plant.species : PLANTS[plant.species].seedSpecies;
  const seeds = yieldResult.seedStacks
    ? Object.entries(yieldResult.seedStacks).reduce((stock, [name, amount]) =>
      ({ ...stock, [name]: count(stock[name]) + amount }), { ...inventory.seeds })
    : seedSpecies === null ? { ...inventory.seeds } : { ...inventory.seeds,
      [seedSpecies]: count(inventory.seeds?.[seedSpecies]) + yieldResult.seeds };
  // Leaf items always belong to the harvested Plant's species, even when
  // Seeds belong to a different species (or the Plant is sterile). Allocation
  // changes the quantity here, never the Leaf identity.
  const leaves = { ...inventory.leaves };
  if (yieldResult.leaves > 0) {
    leaves[plant.species] = count(leaves[plant.species]) + yieldResult.leaves;
  }
  return ensureInventorySlots({ ...next, inventory: { ...inventory, leaves,
    trophies: { ...inventory.trophies,
      bambooSteel: count(inventory.trophies?.bambooSteel) + (yieldResult.bambooSteel || 0) },
    seeds } });
}

export function harvestFungus(garden, key) {
  const fungus = garden.objects[key];
  if (fungus?.type !== 'fungus') throw new Error('There is no living Fungus to harvest here.');
  const spores = Math.floor(count(fungus.sporeStock) + 1e-9);
  const next = removeObject(garden, key);
  const inventory = garden.inventory || { leaves: {}, legacyLeaves: 0, seeds: {}, spores: {} };
  return ensureInventorySlots({ ...next, inventory: { ...inventory, spores: { ...inventory.spores,
    [fungus.species]: count(inventory.spores?.[fungus.species]) + spores } } });
}

function checkSowing(garden, key, species, available, quantity, random) {
  if (!garden.hexes[key]) throw new Error('Sowing requires a garden hex.');
  if (garden.objects[key]) throw new Error('Sowing requires an empty hex.');
  if (garden.pending?.[key] || garden.staged?.[key]) throw new Error('This hex has a committed or staged planting.');
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > available) {
    throw new Error(`Choose between 1 and ${available} available Seeds or Spores.`);
  }
  if (typeof random !== 'function') throw new Error('Expected a random number source.');
}

export function sowPlant(garden, key, species, quantity = 1, random = Math.random) {
  if (!PLANTS[species]) throw new Error(`Unknown Plant species: ${species}`);
  if (PLANTS[species].germination == null) throw new Error(`${species} has no plantable Seeds; transform a precursor instead.`);
  const inventory = garden.inventory || { leaves: {}, legacyLeaves: 0, seeds: {}, spores: {} };
  const owned = inventory.seeds?.[species] || 0;
  checkSowing(garden, key, species, owned, quantity, random);
  const contacts = calculateCultivation(garden)[key];
  const bonus = sum(contacts, 'germination', PLANTS[species], calculateEnvironment(garden).conditions[key]) / 100;
  const chance = clamp(quantity * (PLANTS[species].germination + bonus), 0, 1);
  const success = random() < chance;
  const spent = { ...garden, inventory: { ...inventory,
    seeds: { ...inventory.seeds, [species]: owned - quantity } } };
  return { garden: ensureInventorySlots(success ? placeObject(spent, key, makePlant(species)) : spent), success, chance };
}

export function sowFungus(garden, key, species, quantity = 1, random = Math.random) {
  if (!FUNGI[species]) throw new Error(`Unknown Fungus species: ${species}`);
  if (FUNGI[species].habitat === 'dependent' && !isMycelial(garden, key)) {
    throw new Error(`${species} requires Mycelial ground for germination.`);
  }
  const inventory = garden.inventory || { leaves: {}, legacyLeaves: 0, seeds: {}, spores: {} };
  const owned = inventory.spores?.[species] || 0;
  checkSowing(garden, key, species, owned, quantity, random);
  const chance = clamp(quantity * ECONOMY_TUNING.fungusGerminationChance, 0, 1);
  const success = random() < chance;
  const spent = { ...garden, inventory: { ...inventory,
    spores: { ...inventory.spores, [species]: owned - quantity } } };
  return { garden: ensureInventorySlots(success ? placeObject(spent, key, makeFungus(species)) : spent), success, chance };
}
