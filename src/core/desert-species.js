// Desert §§33–36: approved first-pass numeric profiles and conditional recipient
// compatibilities. Ordinary curve interpolation is the shared prototype model.
const FIELDS = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'germination',
  'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];

const VALUES = {
  Jadeheart: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'Ember Aloe': [1.1, 1.1, 1.1, 1, 1, 1, 1.1, 1, 1.3, 1, 1],
  Aloemancer: [1, 1.1, 1.3, 1.8, 0, 1.4, 1.2, 1.3, 1.2, 1.5, 1.3],
  'Ashen Rose': [.7, .8, .45, .5, 0, .7, .8, .7, .5, .5, .5],
  Moonjade: [.8, .8, .9, .9, .9, 1.3, 1, 1, .8, .7, .8],
  Jadewisp: [1, 1.3, .9, 1.3, 0, .9, .8, 1.8, .8, 2.3, 1.5],
  Pearadox: [1, 1, 1.1, 1, 1.1, 1.1, 1.2, 1, 1, 1, 1.5],
  Sandrose: [1.2, 1, 1, 1, 1.2, 1.5, 1, 1, 1, 1, 1],
  Cactopus: [1.4, 1.3, 1.2, 1, 1.1, .5, .8, 1, 1, 1, 1],
  Cactaclysm: [1.2, 1.2, 1.4, 0, 0, .5, 1, 0, 1.3, 0, 0],
  'Mirage Rose': [1, 1.3, 1.1, 2.2, 0, 1, 1.1, 1.6, .8, 2, 1.4],
};

const illumination = preferred => ['Dark', 'Dim', 'Lit', 'Bright'].map((name, position, all) => {
  const distance = Math.min(...preferred.map(favorite => Math.abs(position - all.indexOf(favorite))));
  return distance === 0 ? 1 : distance === 1 ? .85 : .65;
});

const extremes = (hotRate, hotOutput, hotDeath, freezeRate, freezeOutput, freezingDeath, mycelialDeath) => ({
  hotDeath, freezingDeath, mycelialDeath,
  temperature: {
    Hot: { growth: hotRate, ripening: hotRate, leaf: hotOutput, seed: hotOutput },
    Freezing: { growth: freezeRate, ripening: freezeRate, leaf: freezeOutput, seed: freezeOutput },
  },
});

const desert = (name, growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, preferredTemperature, preferredLight, moistureDry, moistureFlooded,
  environment, extra = {}) => ({
  name, family: 'Desert', growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, preferredTemperature,
  moisture: [moistureDry, 1, moistureFlooded],
  moistureOutput: [moistureDry, 1, moistureFlooded],
  // §36 gives an output-only Illumination rule, not growth-rate multipliers.
  light: [1, 1, 1, 1], lightOutput: illumination(preferredLight),
  // §36 specifies the distance-to-preferred light penalty for native Leaves;
  // no separate light-to-Seed penalty was approved for Desert.
  lightSeedOutput: [1, 1, 1, 1],
  dryDeath: Infinity, ...environment,
  compatibility: Object.fromEntries(FIELDS.map((field, i) => [field, VALUES[name][i]])),
  productiveWindow: [Math.max(0, leafPeakAt - 25), Math.min(200, leafPeakAt + 30)],
  ...extra,
});

export const DESERT_PLANTS = Object.freeze({
  Jadeheart: desert('Jadeheart', 4, 8, .28, 10, 100, 10, 'Jadeheart',
    ['Temperate', 'Warm'], ['Lit'], .75, .55, extremes(.5, .5, 72, .4, .4, 48, 48),
    { productiveWindow: [80, 135] }),
  'Ember Aloe': desert('Ember Aloe', 3.5, 7.5, .25, 14, 135, 12, 'Ember Aloe',
    ['Hot', 'Warm'], ['Lit', 'Bright'], 1, .4, extremes(1.3, 1.5, Infinity, .4, .4, 48, 48),
    { productiveWindow: [115, 155], temperature: {
      Hot: { growth: 1.3, ripening: 1, leaf: 1.5, seed: 1 },
      Freezing: { growth: .4, ripening: .4, leaf: .4, seed: .4 },
    } }),
  Aloemancer: desert('Aloemancer', 4.5, 9.5, null, 26, 145, 16, 'Ember Aloe',
    ['Temperate', 'Warm'], ['Dim', 'Lit'], .8, .6, extremes(.5, .5, 48, .4, .4, 48, 48),
    { productiveWindow: [125, 170] }),
  'Ashen Rose': desert('Ashen Rose', 5.5, 11, null, 3, 120, 3, 'Jadeheart',
    ['Temperate', 'Warm'], ['Dim', 'Lit'], 1, .6, extremes(.5, .5, 72, .4, .5, 72, 48),
    { productiveWindow: [100, 145] }),
  Moonjade: desert('Moonjade', 4.5, 9.5, .2, 9, 125, 5, 'Moonjade',
    ['Cold', 'Temperate'], ['Dim', 'Lit'], .85, .65, extremes(.4, .5, 48, 0, 0, Infinity, 48),
    { productiveWindow: [100, 155], dormantTemperature: 'Freezing' }),
  Jadewisp: desert('Jadewisp', 4, 9, null, 8, 130, 26, 'Moonjade',
    ['Cold', 'Temperate'], ['Dim', 'Lit'], 1, .65, extremes(.5, .5, 48, .4, .5, 48, 48),
    { productiveWindow: [110, 155] }),
  Pearadox: desert('Pearadox', 4, 8.5, .18, 18, 140, 15, 'Pearadox',
    ['Cold', 'Temperate', 'Warm'], ['Dim', 'Lit'], 1, .45,
    extremes(1, 1.7, Infinity, .75, 1.8, Infinity, 48),
    { productiveWindow: [115, 165], temperature: {
      Hot: { growth: 1, ripening: 1, leaf: 1.7, seed: 1 },
      Freezing: { growth: .75, ripening: .75, leaf: .75, seed: 1.8 },
    } }),
  Sandrose: desert('Sandrose', 3.5, 7.5, .3, 12, 125, 11, 'Sandrose',
    ['Temperate', 'Warm'], ['Dim', 'Lit'], 1, .55, extremes(.7, .7, Infinity, .5, .5, 72, 72),
    { productiveWindow: [105, 165] }),
  Cactopus: desert('Cactopus', 3.25, 7, .32, 14, 135, 12, 'Cactopus',
    ['Hot', 'Warm'], ['Lit', 'Bright'], 1, .4, extremes(1, 1, Infinity, .4, .5, 48, 72),
    { productiveWindow: [105, 175], leafPlateau: [105, 115, 160, 175] }),
  Cactaclysm: desert('Cactaclysm', 4.5, 9, null, 48, 140, 0, null,
    ['Hot', 'Warm'], ['Lit', 'Bright'], 1, .45, extremes(1, 1, Infinity, .4, .4, 48, 48),
    { productiveWindow: [110, 175], leafPlateau: [110, 120, 165, 175], temperature: {
      Hot: { growth: 1, ripening: 1, leaf: 1, seed: 1 },
      Warm: { growth: 1, ripening: 1, leaf: .65, seed: 1 },
      Freezing: { growth: .4, ripening: .4, leaf: .4, seed: .4 },
    } }),
  'Mirage Rose': desert('Mirage Rose', 4, 9.5, null, 18, 145, 28, null,
    ['Temperate'], ['Dim', 'Lit'], 1, .6, extremes(.5, .5, 72, .5, .5, 72, 48),
    { productiveWindow: [125, 165], seedDistribution: ['Ember Aloe', 'Moonjade'] }),
});
