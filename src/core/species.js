import { makeInfluence, makeSpreadInfluence } from './influences.js';
import { AQUATIC_PLANTS } from './aquatic-species.js';
import { WOODLANDS_PLANTS } from './woodlands-species.js';
import { DESERT_PLANTS } from './desert-species.js';
import { SPICES_PLANTS } from './spices-species.js';

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

// Flowers §§29–32: approved output/hazard/compatibility figures. Illumination
// RATE numbers were not approved for this family, so Flowers use neutral light
// rates while their separately approved ordinary-output light factors apply.
const FLOWER_FIELDS = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'germination',
  'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];
const FLOWER_COMPATIBILITY = {
  Daisydaze: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Charmomile: [1.3, 1, 1.1, 1, 1, 1.7, 1.8, 1.1, 1, 1, 1],
  Daisyspell: [1.9, 1.2, 1.2, .8, 0, 2.2, 1.6, .8, .7, .5, .8],
  Marigloom: [.8, 1, 1.8, .7, .8, .8, 1.6, 1, 1.5, .6, 1],
  Lavendream: [.9, 1, 1, 1, 1, .3, 1.4, 1, 1.4, 1, 1],
  Lavendread: [1, 1.3, .45, 2.5, 0, .6, .8, 1.8, .4, 2.4, 1.6],
  Poppycock: [1.3, 1.1, .7, 1.8, 1.5, .8, 1, 1.6, .6, 1.8, 1.6],
  'Dream Poppy': [1, 1, 1.2, 1, 0, 1.8, 1.8, 1.1, 1, .8, 1],
  Rosewraith: [1, 1, 1.7, 1, 1, 1.8, 1.7, 1, 1.4, .8, 1],
  Orchidemon: [1.1, 1.1, .8, 0, 0, 2.3, 1.3, 0, 1.3, 0, 0],
};
const flower = (name, growthDays, totalDays, germination, leafPeak, leafPeakAt, seeds, options) => ({
  family: 'Flowers', growthDays, totalDays, germination, leafPeak, leafPeakAt, seeds,
  light: [1, 1, 1, 1],
  compatibility: Object.fromEntries(FLOWER_FIELDS.map((field, i) => [field, FLOWER_COMPATIBILITY[name][i]])),
  ...options,
});

// Effect compatibility can depend on a resolved condition, emission sign, or
// eligible progress. It scales the emitted MAGNITUDE, never reverses direction.
export function effectCompatibility(profile, kind, conditions = null, amount = 0, progress = 0) {
  const ordinary = profile.compatibility[kind] ?? 1;
  if (!conditions) return ordinary;
  if (profile.family === 'Aquatic') {
    const wet = conditions.Moisture;
    if (profile.name === 'Kelpfull' && kind === 'seedYield' && wet === 'Flooded') return 2.5;
    if (profile.name === 'Kelpergeist' && kind === 'leafYield' && wet === 'Flooded'
      && conditions.Illumination === 'Dark') return 2.2;
    if (profile.name === 'Moonlit Lotus' && wet === 'Flooded'
      && ((kind === 'ripeningRate' && amount < 0) || kind === 'seedYield')) return 1.7;
    if (profile.name === 'Sunken Lotus' && kind === 'seedTiming' && wet === 'Flooded') return 1.3;
    if (profile.name === 'Starlotus' && conditions.attunement
      && conditions.attunement === wet) {
      if (kind === 'leafYield') return 2.2;
      if (kind === 'leafPeakTiming') return 2;
    }
    if (profile.name === 'Silvercress') {
      if (kind === 'growthRate' && wet === 'Flooded' && progress < 100) return 2;
      if (kind === 'leafYield' && wet === 'Damp' && progress >= 100) return 2;
    }
    if (profile.name === 'Cresscent' && wet === 'Damp') {
      if (kind === 'seedYield') return 2.4;
      if (kind === 'germination') return 2;
    }
    return ordinary;
  }
  if (profile.family === 'Woodlands') {
    if (profile.name === 'Bamboom' && kind === 'seedYield' && conditions.Moisture === 'Damp') return 2.5;
    if (profile.name === 'Mistlefoe' && kind === 'leafYield' && conditions.Illumination === 'Dim') return 1.8;
    if (profile.name === 'Mandrabra' && kind === 'harvestWindow' && conditions.Illumination === 'Lit') return 1.6;
    if (profile.name === 'Mandrakadabra' && kind === 'leafYield' && conditions.Illumination === 'Lit') return 2.5;
    if (profile.name === 'Mandrakazam' && kind === 'seedYield' && conditions.Illumination === 'Dim') return 2.5;
    return ordinary;
  }
  if (profile.family === 'Desert') {
    const temperature = conditions.Temperature;
    const name = profile.name;
    if (name === 'Ember Aloe' && temperature === 'Hot') {
      if (kind === 'growthRate') return 1.8;
      if (kind === 'leafYield') return 2.3;
    }
    if (name === 'Aloemancer' && kind === 'leafYield'
      && ['Temperate', 'Warm'].includes(temperature)) return 2;
    if (name === 'Jadewisp' && kind === 'seedYield'
      && ['Cold', 'Temperate'].includes(temperature)) return 2.4;
    if (name === 'Pearadox') {
      if (kind === 'leafYield' && temperature === 'Hot') return 2.2;
      if (kind === 'seedYield' && temperature === 'Freezing') return 2.5;
      if (kind === 'seedTiming' && temperature === 'Freezing') return 1.8;
      if (kind === 'hourlyLeaf' && temperature === 'Hot') return 1.5;
      if (kind === 'hourlySeed' && temperature === 'Freezing') return 1.8;
    }
    if (name === 'Cactaclysm' && kind === 'leafYield' && temperature === 'Hot') return 2.6;
    return ordinary;
  }
  if (profile.family === 'Spices') {
    const light = conditions.Illumination;
    const name = profile.name;
    if (name === 'Sunrice' && kind === 'leafYield' && light === 'Bright') return 2;
    if (name === 'Moonrice' && kind === 'seedYield' && light === 'Dim') return 2.2;
    if (name === 'Shadow Onion' && kind === 'growthRate' && light === 'Dark') return 1.5;
    if (name === 'Starberry' && kind === 'leafYield' && light === 'Bright') return 2.6;
    if (name === 'Thymekeeper' && kind === 'seedYield' && light === 'Dim') return 2.8;
    if (name === 'Ghost Rice' && kind === 'leafYield' && light === 'Dark') return 2.5;
    if (name === "Pum'king" && kind === 'leafYield' && light === 'Lit') return 2.8;
    if (name === 'Glass Apple' && kind === 'leafYield' && light === 'Bright') return 3;
    return ordinary;
  }
  if (profile.family !== 'Flowers') return ordinary;
  const light = conditions.Illumination;
  const name = profile.name;
  if (name === 'Daisyspell' && kind === 'leafYield' && light === 'Bright') return 2.4;
  if (name === 'Marigloom' && kind === 'ripeningRate' && amount < 0 && light === 'Dim') return 2;
  if (name === 'Marigloom' && kind === 'hourlyLeaf' && light === 'Dim' && progress >= 160 && progress <= 177) return 3;
  if (name === 'Poppycock' && light === 'Bright' && kind === 'seedYield') return 2.6;
  if (name === 'Poppycock' && light === 'Bright' && kind === 'seedTiming') return 2;
  if (name === 'Dream Poppy' && kind === 'leafYield' && light === 'Dim') return 1.7;
  if (name === 'Rosewraith' && kind === 'ripeningRate' && amount < 0) return 1.5;
  if (name === 'Rosewraith' && kind === 'hourlyLeaf' && light === 'Dim' && progress >= 170 && progress <= 190) return 2.2;
  if (name === 'Orchidemon' && kind === 'leafYield') return light === 'Bright' ? 3 : light === 'Lit' ? 1.7 : .8;
  return ordinary;
}

export const PLANTS = Object.freeze({
  Potato: ingredient(4, 8, .28, 10, 100, 10, {
    moisture: [.65, 1, .55], light: [.75, .90, 1, .90], preferredTemperature: ['Temperate'],
    lightOutput: [.65, .85, 1, .85], productiveWindow: [90, 130],
    dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48, compatibility: { growthRate: 1, ripeningRate: 1, ...compat('Potato') },
  }),
  Rice: ingredient(4.75, 9.5, .30, 8, 110, 22, {
    moisture: [.40, .85, 1], light: [.75, .90, 1, .90], preferredTemperature: ['Temperate', 'Warm'],
    lightOutput: [.65, .85, 1, .85], productiveWindow: [100, 140],
    dryDeath: 48, hotDeath: 72, freezingDeath: 48, mycelialDeath: 48, compatibility: { growthRate: .9, ripeningRate: 1.1, ...compat('Rice') },
  }),
  Carrot: ingredient(2.5, 6, .38, 16, 95, 6, {
    moisture: [.70, 1, .60], light: [.60, .80, 1, 1], preferredTemperature: ['Temperate'],
    lightOutput: [.50, .70, 1, 1], productiveWindow: [85, 115],
    dryDeath: 72, hotDeath: 48, freezingDeath: 48, mycelialDeath: 48, compatibility: { growthRate: 1.9, ripeningRate: 1.2, ...compat('Carrot') },
  }),
  Onion: ingredient(4.75, 9.5, .26, 19, 130, 10, {
    moisture: [.80, 1, .50], light: [.80, 1, 1, .90], preferredTemperature: ['Cold', 'Temperate'],
    lightOutput: [.70, 1, 1, .80], productiveWindow: [110, 160],
    dryDeath: 96, hotDeath: 72, freezingDeath: 72, mycelialDeath: 72, compatibility: { growthRate: .9, ripeningRate: 1.1, ...compat('Onion') },
  }),
  Apple: ingredient(5.5, 11.5, .25, 26, 150, 12, {
    moisture: [.60, 1, .60], light: [.80, 1, 1, .90], preferredTemperature: ['Cold', 'Temperate'],
    lightOutput: [.70, 1, 1, .80], productiveWindow: [135, 175],
    dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48, compatibility: { growthRate: .9, ripeningRate: 1.5, ...compat('Apple') },
  }),
  Pumpkin: ingredient(6.5, 14, .20, 42, 170, 9, {
    moisture: [.70, 1, .45], light: [.60, .85, 1, 1], preferredTemperature: ['Warm'],
    lightOutput: [.50, .75, 1, 1], productiveWindow: [155, 185],
    dryDeath: 96, hotDeath: 48, freezingDeath: 48, mycelialDeath: 72, compatibility: { growthRate: .75, ripeningRate: 1.7, ...compat('Pumpkin') },
  }),
  Strawberry: ingredient(2.25, 5.5, .35, 22, 115, 7, {
    moisture: [.45, 1, .55], light: [.45, .70, .95, 1], preferredTemperature: ['Temperate', 'Warm'],
    lightOutput: [.35, .60, .90, 1], productiveWindow: [105, 125],
    dryDeath: 48, hotDeath: 48, freezingDeath: 36, mycelialDeath: 36, compatibility: { growthRate: 2.1, ripeningRate: 1.3, ...compat('Strawberry') },
  }),
  Daisydaze: flower('Daisydaze', 4, 8, .28, 10, 100, 10, {
    name: 'Daisydaze', seedSpecies: 'Daisydaze', productiveWindow: [90, 130],
    moisture: [.55, 1, .80], moistureOutput: [.55, 1, .80], lightOutput: [.70, .90, 1, .90],
    preferredTemperature: ['Temperate'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  Charmomile: flower('Charmomile', 3.25, 7, .26, 14, 90, 8, {
    name: 'Charmomile', seedSpecies: 'Charmomile', productiveWindow: [70, 125],
    moisture: [.50, 1, .80], moistureOutput: [.55, 1, .75], lightOutput: [.55, .75, 1, .90],
    preferredTemperature: ['Temperate', 'Warm'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  Daisyspell: flower('Daisyspell', 2.5, 5, null, 24, 75, 4, {
    name: 'Daisyspell', seedSpecies: 'Charmomile', productiveWindow: [66, 84],
    moisture: [.45, 1, .70], moistureOutput: [.45, 1, .70], lightOutput: [.35, .55, .85, 1],
    preferredTemperature: ['Temperate', 'Warm'], dryDeath: 48, mycelialDeath: 24, hotDeath: 48, freezingDeath: 48,
  }),
  Marigloom: flower('Marigloom', 6, 16, .15, 38, 170, 5, {
    name: 'Marigloom', seedSpecies: 'Marigloom', productiveWindow: [160, 177],
    moisture: [.60, 1, .75], moistureOutput: [.60, 1, .75], lightOutput: [.75, 1, .80, .60],
    preferredTemperature: ['Cold', 'Temperate'], dryDeath: 96, mycelialDeath: 72, hotDeath: 72, freezingDeath: 72,
  }),
  Lavendream: flower('Lavendream', 5.5, 11, .22, 13, 140, 9, {
    name: 'Lavendream', seedSpecies: 'Lavendream', productiveWindow: [90, 195],
    leafPlateau: [90, 110, 175, 195],
    moisture: [.65, 1, .80], moistureOutput: [.65, 1, .85], lightOutput: [.70, 1, 1, .85],
    preferredTemperature: ['Temperate'], dryDeath: 96, mycelialDeath: 72, hotDeath: 96, freezingDeath: 96,
  }),
  Lavendread: flower('Lavendread', 4, 10.5, null, 4, 115, 24, {
    name: 'Lavendread', seedSpecies: 'Lavendream', productiveWindow: [100, 145],
    moisture: [.50, 1, .70], moistureOutput: [.50, 1, .70], lightOutput: [1, 1, .85, .65],
    preferredTemperature: ['Cold', 'Temperate'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  Poppycock: flower('Poppycock', 3.25, 7, .35, 5, 110, 22, {
    name: 'Poppycock', seedSpecies: 'Poppycock', productiveWindow: [95, 135],
    seedCurve: [[100, 0], [175, 13], [200, 22]],
    moisture: [.55, 1, .75], moistureOutput: [.50, 1, .75], lightOutput: [.55, .80, 1, 1],
    preferredTemperature: ['Temperate', 'Warm'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  'Dream Poppy': flower('Dream Poppy', 4, 9, null, 24, 180, 9, {
    name: 'Dream Poppy', seedSpecies: 'Poppycock', productiveWindow: [165, 190],
    moisture: [.50, 1, .70], moistureOutput: [.55, 1, .75], lightOutput: [.75, 1, .85, .65],
    preferredTemperature: ['Cold', 'Temperate'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  Rosewraith: flower('Rosewraith', 4.75, 11, .18, 34, 180, 7, {
    name: 'Rosewraith', seedSpecies: 'Rosewraith', productiveWindow: [105, 195],
    leafPeaks: [[105, 115, 125, 17], [170, 180, 190, 34]],
    moisture: [.55, 1, .75], moistureOutput: [.55, 1, .70], lightOutput: [.75, 1, .85, .70],
    preferredTemperature: ['Cold', 'Temperate'], dryDeath: 72, mycelialDeath: 48, hotDeath: 72, freezingDeath: 72,
  }),
  Orchidemon: flower('Orchidemon', 4.5, 9.5, null, 55, 145, 0, {
    name: 'Orchidemon', seedSpecies: null, productiveWindow: [137, 153],
    moisture: [.45, 1, .65], moistureOutput: [.45, 1, .65], lightOutput: [.20, .35, .70, 1],
    preferredTemperature: ['Temperate', 'Warm'], dryDeath: 48, mycelialDeath: 36, hotDeath: 48, freezingDeath: 48,
  }),
  ...AQUATIC_PLANTS,
  ...WOODLANDS_PLANTS,
  ...DESERT_PLANTS,
  ...SPICES_PLANTS,
});

// V8: one environmental emission and one shared delivery footprint for the
// full two/three-effect cultivation package. Each effect retains its own Kind
// for selective blocking, but never receives an independent crossing budget.
const fungus = (environment, cultivation, habitat = 'independent') => ({ environment, cultivation, habitat });
const env = (name, strength, delivery, reach) => ({ name, strength,
  propagation: delivery === 'budget' ? 'spread-budget' : 'range',
  ...(delivery === 'budget' ? { budget: reach } : { range: reach }) });
const effect = (kind, amount, window = null, boosted = null) => ({ kind, amount,
  ...(window ? { window } : {}), ...(boosted == null ? {} : { boosted }) });
const packageOf = (mode, delivery, reach, ...effects) => ({
  mode, propagation: delivery === 'budget' ? 'spread-budget' : 'range',
  ...(delivery === 'budget' ? { budget: reach } : { range: reach }), effects,
});

export const FUNGI = Object.freeze({
  Mycelord: fungus(null, null),
  Dewmender: fungus(env('Wetting', 1, 'range', 2), packageOf('waterborne', 'budget', 4,
    effect('germination', 8), effect('ripeningRate', .20))),
  Mistruffle: fungus(env('Dimming', 1, 'range', 2), packageOf('waterborne', 'budget', 4,
    effect('leafYield', .10, null, .30), effect('leafPeakTiming', 10)), 'preferring'),
  Emberbolete: fungus(env('Warming', 2, 'budget', 3), packageOf('waterborne', 'range', 1,
    effect('seedYield', .10, null, .30), effect('seedTiming', 10)), 'preferring'),
  Rilllace: fungus(env('Cooling', 1, 'budget', 4), packageOf('airborne', 'range', 1,
    effect('seedTiming', 12), effect('harvestWindow', .25))),
  Prismorel: fungus(env('Brightening', 1, 'range', 2), packageOf('airborne', 'budget', 4,
    effect('leafPeakTiming', -8), effect('harvestWindow', .25))),
  Droughtcap: fungus(env('Drying', 1, 'budget', 3), packageOf('airborne', 'range', 1,
    effect('growthRate', -.25), effect('ripeningRate', -.30))),
  Hushroom: fungus(env('Dimming', 2, 'range', 1), packageOf('airborne', 'budget', 3,
    effect('germination', 6), effect('harvestWindow', .10, null, .30),
    effect('ripeningRate', -.20)), 'preferring'),
  Rainmorel: fungus(env('Wetting', 1, 'budget', 4), packageOf('waterborne', 'range', 1,
    effect('seedTiming', -12), effect('growthRate', -.15))),
  Siltgill: fungus(env('Warming', 2, 'range', 2), packageOf('airborne', 'budget', 3,
    effect('leafYield', .40), effect('harvestWindow', -.25)), 'dependent'),
  Rushroom: fungus(env('Brightening', 1, 'budget', 3), packageOf('waterborne', 'range', 1,
    effect('growthRate', .25), effect('hourlyLeaf', .15, [140, 190]),
    effect('harvestWindow', -.20)), 'dependent'),
  Frostfolio: fungus(env('Cooling', 1, 'range', 1), packageOf('airborne', 'budget', 3,
    effect('germination', 6), effect('leafPeakTiming', -8), effect('seedYield', .35)), 'dependent'),
  "Sim'mushro'dim": fungus(env('Drying', 2, 'range', 2), packageOf('airborne', 'budget', 3,
    effect('hourlySeed', .10, [140, 200], .30), effect('growthRate', .15),
    effect('ripeningRate', .20)), 'preferring'),
});

export function makePlant(species, attunement = null) {
  if (!PLANTS[species]) throw new Error(`Unknown Plant species: ${species}`);
  return { type: 'plant', species, progress: 0, ageHours: 0,
    exposure: { Dry: 0, Hot: 0, Freezing: 0, Mycelial: 0, ...(species === 'Mandrakadabra' ? { Bright: 0 } : {}) },
    production: { ordinaryLeaves: 0, ordinarySeeds: 0, hourlyLeaves: 0, hourlySeeds: 0 },
    transformationClocks: {}, transformationSequence: {},
    ...(species === 'Starlotus' && ['Damp', 'Flooded'].includes(attunement) ? { attunement } : {}) };
}

export function makeFungus(species, heading = 0) {
  const definition = FUNGI[species];
  if (!definition) throw new Error(`Unknown Fungus species: ${species}`);
  const entry = definition.environment;
  const emissions = entry ? [entry.propagation === 'spread-budget'
    ? makeSpreadInfluence(entry.name, entry.strength, entry.budget, heading)
    : makeInfluence(entry.name, entry.strength, entry.range)] : [];
  return { type: 'fungus', species, progress: 0, ageHours: 0, heading, emissions, sporeStock: 0,
    exposure: { Flooded: 0, MissingMycelial: 0 } };
}
