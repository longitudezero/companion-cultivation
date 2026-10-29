// Aquatic §§25–28 approved first-pass numeric profiles. Unspecified light
// response slopes/window boundaries are explicitly prototype interpolation.
const FIELDS = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'germination',
  'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];
const VALUES = {
  'Algea': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Kelpfull: [1.3, 1.2, .7, 1.7, 0, .8, 1, 1.3, .6, 1.6, 1.4],
  Kelpergeist: [.9, 1.1, 1.2, .7, .8, 1.1, 1.3, .8, 1.5, .6, .8],
  Kelpless: [.7, .8, .5, .5, 0, .8, 1, .8, .5, .5, .6],
  'Sunken Lotus': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'Moonlit Lotus': [1, 1, 1.1, 1, 1, 1.2, 1.1, 1.1, 1, 1.3, 1],
  Starlotus: [.9, 1, 1.2, 0, 0, 1, 1.4, 0, 1.8, 0, 0],
  Pearlily: [1.1, 1, 1, 1, 1, 1.5, .8, 1, .9, 1, 1],
  'Wild Watercress': [1.1, 1, 1, 1, 1.1, 1, 1, 1, 1, 1, 1],
  Silvercress: [1, 1, 1, .9, 1, 1.2, 1.1, 1, 1.2, .8, 1],
  Cresscent: [1.1, 1, .7, 1.7, 1.5, .8, 1, 1.4, .6, 1.8, 1.5],
};

const aquatic = (name, growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, moisture, preferredTemperature, dryDeath, mycelialDeath, extra = {}) => ({
  name, family: 'Aquatic', growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, moisture, moistureOutput: moisture,
  // Light-rate numbers were not approved; stable first-pass interpolation.
  light: [1, 1, 1, 1], lightOutput: [.85, 1, 1, .85],
  preferredTemperature, dryDeath, mycelialDeath, hotDeath: 72, freezingDeath: 72,
  compatibility: Object.fromEntries(FIELDS.map((field, i) => [field, VALUES[name][i]])),
  productiveWindow: [Math.max(0, leafPeakAt - 20), Math.min(200, leafPeakAt + 25)],
  ...extra,
});

export const AQUATIC_PLANTS = Object.freeze({
  'Algea': aquatic('Algea', 4, 8, .28, 10, 100, 10, 'Algea', [.5, 1, .9], ['Temperate'], 72, 48),
  Kelpfull: aquatic('Kelpfull', 3, 7, null, 6, 105, 20, 'Algea', [0, .65, 1], ['Cold', 'Temperate'], 48, 36,
    { moistureOutput: [.25, .65, 1] }),
  Kelpergeist: aquatic('Kelpergeist', 5, 9, .15, 22, 150, 5, 'Kelpergeist', [0, .6, 1], ['Cold', 'Temperate'], 72, 36,
    { productiveWindow: [137, 162], moistureOutput: [.2, .6, 1], lightOutput: [1, .9, .6, .4] }),
  Kelpless: aquatic('Kelpless', 5.5, 10, null, 3, 115, 3, 'Algea', [.4, 1, .85], ['Temperate'], 72, 48),
  'Sunken Lotus': aquatic('Sunken Lotus', 4.5, 8.5, .22, 11, 125, 10, 'Sunken Lotus', [0, .7, 1], ['Temperate'], 48, 48,
    { moistureOutput: [.25, .7, 1] }),
  'Moonlit Lotus': aquatic('Moonlit Lotus', 4, 9, .18, 15, 140, 8, 'Moonlit Lotus', [0, .7, 1], ['Cold', 'Temperate'], 48, 36,
    { moistureOutput: [.25, .7, 1] }),
  Starlotus: aquatic('Starlotus', 5.5, 9.5, null, 25, 150, 0, null, [.2, 1, 1], ['Temperate'], 48, 24,
    { productiveWindow: [138, 162] }),
  Pearlily: aquatic('Pearlily', 3.5, 7.5, .26, 14, 140, 10, 'Pearlily', [.5, 1, 1], ['Temperate'], 96, 72,
    { productiveWindow: [100, 185], leafPlateau: [100, 115, 170, 185] }),
  'Wild Watercress': aquatic('Wild Watercress', 3.5, 7.5, .30, 11, 120, 11, 'Wild Watercress', [.35, 1, .85], ['Temperate'], 72, 48),
  Silvercress: aquatic('Silvercress', 4, 8, .24, 16, 140, 8, 'Silvercress', [.4, 1, 1], ['Temperate'], 72, 48),
  Cresscent: aquatic('Cresscent', 3.5, 7.5, .40, 6, 110, 18, 'Cresscent', [.35, 1, 1], ['Temperate'], 72, 48,
    { moistureSeedOutput: [.35, 1, .85] }),
});
