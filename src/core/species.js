import { makeInfluence, makeSpreadInfluence } from './influences.js';

// Approved Ingredient §44 values. These records are simulation data, not UI rules.
// Other Plant families will join this catalogue when their numeric profiles are wired.
const ingredient = (growthDays, totalDays, germination, leafPeak, leafPeakAt, seeds, options) => ({
  family: 'Ingredients', growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, ...options,
});

// §44 recipient compatibility, in a fixed field order. All numbers are approved.
const FIELDS = ['leafYield', 'seedYield', 'germination', 'harvestWindow', 'leafPeakTiming',
  'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];
const EFFECT_COMPATIBILITY = {
  Potato: [1, 1, 1, 1, 1, 1, 1, 1, 1],
  Rice: [.9, 1.8, 1, .8, .8, 1.6, .6, 2.1, 1.6],
  Carrot: [1.5, .65, 1.3, 1.4, 1.3, .8, 1.1, .6, .8],
  Onion: [1.5, 1, .9, 1.6, 1.1, 1, 1.3, 1, 1],
  Apple: [1.6, 1.1, 1, 1.4, 1.2, 1.1, 1.3, 1, 1.1],
  Pumpkin: [2, .9, .8, 1.4, 1.7, 1, 1.5, .8, 1.1],
  Strawberry: [1.8, .8, 1.3, 2.3, 1.6, .8, 1.4, .7, .9],
};
const compat = name => Object.fromEntries(FIELDS.map((field, i) => [field, EFFECT_COMPATIBILITY[name][i]]));

export const PLANTS = Object.freeze({
  Potato: ingredient(4, 8, .28, 10, 100, 10, {
    moisture: [.65, 1, .55], light: [.75, .90, 1, .90], preferredTemperature: ['Temperate'],
    lightOutput: [.65, .85, 1, .85], productiveWindow: [90, 130],
    dryDeath: 72, hotDeath: 72, freezingDeath: 72, compatibility: { growthRate: 1, ripeningRate: 1, ...compat('Potato') },
  }),
  Rice: ingredient(4.75, 9.5, .30, 8, 110, 22, {
    moisture: [.40, .85, 1], light: [.75, .90, 1, .90], preferredTemperature: ['Temperate', 'Warm'],
    lightOutput: [.65, .85, 1, .85], productiveWindow: [100, 140],
    dryDeath: 48, hotDeath: 72, freezingDeath: 48, compatibility: { growthRate: .9, ripeningRate: 1.1, ...compat('Rice') },
  }),
  Carrot: ingredient(2.5, 6, .38, 16, 95, 6, {
    moisture: [.70, 1, .60], light: [.60, .80, 1, 1], preferredTemperature: ['Temperate'],
    lightOutput: [.50, .70, 1, 1], productiveWindow: [85, 115],
    dryDeath: 72, hotDeath: 48, freezingDeath: 48, compatibility: { growthRate: 1.9, ripeningRate: 1.2, ...compat('Carrot') },
  }),
  Onion: ingredient(4.75, 9.5, .26, 19, 130, 10, {
    moisture: [.80, 1, .50], light: [.80, 1, 1, .90], preferredTemperature: ['Cold', 'Temperate'],
    lightOutput: [.70, 1, 1, .80], productiveWindow: [110, 160],
    dryDeath: 96, hotDeath: 72, freezingDeath: 72, compatibility: { growthRate: .9, ripeningRate: 1.1, ...compat('Onion') },
  }),
  Apple: ingredient(5.5, 11.5, .25, 26, 150, 12, {
    moisture: [.60, 1, .60], light: [.80, 1, 1, .90], preferredTemperature: ['Cold', 'Temperate'],
    lightOutput: [.70, 1, 1, .80], productiveWindow: [135, 175],
    dryDeath: 72, hotDeath: 72, freezingDeath: 72, compatibility: { growthRate: .9, ripeningRate: 1.5, ...compat('Apple') },
  }),
  Pumpkin: ingredient(6.5, 14, .20, 42, 170, 9, {
    moisture: [.70, 1, .45], light: [.60, .85, 1, 1], preferredTemperature: ['Warm'],
    lightOutput: [.50, .75, 1, 1], productiveWindow: [155, 185],
    dryDeath: 96, hotDeath: 48, freezingDeath: 48, compatibility: { growthRate: .75, ripeningRate: 1.7, ...compat('Pumpkin') },
  }),
  Strawberry: ingredient(2.25, 5.5, .35, 22, 115, 7, {
    moisture: [.45, 1, .55], light: [.45, .70, .95, 1], preferredTemperature: ['Temperate', 'Warm'],
    lightOutput: [.35, .60, .90, 1], productiveWindow: [105, 125],
    dryDeath: 48, hotDeath: 48, freezingDeath: 36, compatibility: { growthRate: 2.1, ripeningRate: 1.3, ...compat('Strawberry') },
  }),
});

// Each fungus has *separate* environmental and cultivation outputs. The first
// playable slice uses environmental emissions; cultivation output data is kept
// separate until the recipient-effects and accrual system is implemented.
const fungus = (environment, cultivation, habitat = 'independent') => ({ environment, cultivation, habitat });
const env = (name, range = 2) => ({ name, range });
const routed = (name, budget) => ({ name, budget, propagation: 'spread-budget' });
const effect = (kind, amount, range = 1, mode = 'airborne', window = null) => ({
  kind, amount, range: mode === 'waterborne' ? null : range, mode, ...(window ? { window } : {}),
});

export const FUNGI = Object.freeze({
  Mycelord: fungus(null, null),
  Glimmergill: fungus(env('Brightening'), effect('leafPeakTiming', 8)),
  Veilcap: fungus(env('Dimming'), effect('ripeningRate', -.20)),
  Emberbolete: fungus(env('Warming'), effect('seedYield', .20)),
  Chillanterelle: fungus(env('Cooling'), effect('leafYield', .20)),
  Rainmorel: fungus(routed('Wetting', 4), effect('growthRate', -.15)),
  Droughtcap: fungus(env('Drying'), effect('harvestWindow', .25)),
  Prismorel: fungus(routed('Brightening', 3), effect('leafPeakTiming', -8)),
  Rushroom: fungus(env('Cooling'), effect('growthRate', .30, 2), 'dependent'),
  Echomorel: fungus(env('Cooling'), effect('hourlyLeaf', .15, 1, 'airborne', [160, 190]), 'preferring'),
  Wakemorel: fungus(env('Drying'), effect('ripeningRate', .25)),
  Hushroom: fungus(env('Dimming'), effect('germination', 8)),
  "Sim'mushro'dim": fungus(env('Warming'), effect('hourlySeed', .15, 1, 'airborne', [160, 195]), 'preferring'),
  Mistruffle: fungus(env('Wetting'), effect('leafYield', .12)),
  Crumblecap: fungus(env('Drying'), effect('seedYield', .12)),
  Quickshade: fungus(env('Dimming'), effect('growthRate', .15)),
  Tidegill: fungus(env('Brightening', 1), effect('seedTiming', -12, null, 'waterborne')),
  Frostfolio: fungus(env('Cooling'), effect('leafAllocation', .80), 'preferring'),
  Sunspore: fungus(env('Warming'), effect('seedAllocation', .80, null, 'waterborne')),
  Dewmender: fungus(env('Wetting'), effect('germination', 4)),
  Lanterncap: fungus(env('Brightening'), effect('ripeningRate', -.12)),
  Tickbolete: fungus(env('Warming'), effect('ripeningRate', .12)),
  Rilllace: fungus(env('Cooling'), effect('harvestWindow', .12, null, 'waterborne')),
  Duskleaf: fungus(env('Dimming'), effect('hourlyLeaf', .08, 1, 'airborne', [70, 125])),
  Brookrill: fungus(env('Cooling'), effect('hourlySeed', .10, null, 'waterborne', [120, 170])),
  Gloamclock: fungus(env('Dimming'), effect('seedTiming', -8)),
  Bristlecap: fungus(env('Drying'), effect('leafAllocation', .60)),
  Goldgill: fungus(env('Brightening'), effect('seedAllocation', .60)),
  Fogdial: fungus(env('Dimming'), effect('leafPeakTiming', -6, 2)),
  Emberbell: fungus(env('Warming'), effect('leafPeakTiming', 12)),
  Siltgill: fungus(env('Drying'), effect('leafYield', .35, null, 'waterborne'), 'dependent'),
});

export function makePlant(species) {
  if (!PLANTS[species]) throw new Error(`Unknown Plant species: ${species}`);
  return { type: 'plant', species, progress: 0, ageHours: 0, exposure: { Dry: 0, Hot: 0, Freezing: 0 },
    production: { ordinaryLeaves: 0, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0 } };
}

export function makeFungus(species, heading = 0) {
  const definition = FUNGI[species];
  if (!definition) throw new Error(`Unknown Fungus species: ${species}`);
  const entry = definition.environment;
  const emissions = entry ? [entry.propagation === 'spread-budget'
    ? makeSpreadInfluence(entry.name, 1, entry.budget, heading)
    : makeInfluence(entry.name, 1, entry.range)] : [];
  return { type: 'fungus', species, progress: 0, ageHours: 0, heading, emissions, sporeStock: 0 };
}
