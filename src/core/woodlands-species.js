// Woodlands §§22–24,70: approved natural figures and recipient compatibility.
// Ordinary habitat curves / non-special hazard durations remain prototype tuning.
const FIELDS = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'germination',
  'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];
const VALUES = {
  'Woodlands Base': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Bamboom: [1.3, 1.3, .8, 2, 0, .8, 1, 1.2, .6, 1.5, 1.4],
  Bamboozeling: [1, 1, .8, .7, 0, 1, 1, 1, .7, .7, .8],
  Bamboozled: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Tanglethorn: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Mistlefoe: [1, 1, 1, .9, 1, 1, 1, 1, 1.2, 1.2, 1],
  Mistlewoe: [.8, 1, .5, .5, 0, .7, 1, .8, .5, .5, .7],
  Bramblewraith: [.8, 1, 1, 1, 1, .3, .7, 1, .8, .8, 1],
  Mandrabra: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Mandrakadabra: [.9, 1.1, 2, 0, 1.8, 1.2, 1.2, 0, 1.8, 0, 0],
  Mandrakazam: [1.5, 1.4, .8, 1.8, 0, .8, 1, 1.3, .6, 1.5, 1.5],
};

const woodlands = (name, growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, extra = {}) => ({
  name, family: 'Woodlands', growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, moisture: [.6, 1, .7], moistureOutput: [.6, 1, .7],
  light: [1, 1, 1, 1], lightOutput: [.6, .85, 1, .8],
  preferredTemperature: ['Temperate'], dryDeath: 72, mycelialDeath: 48,
  hotDeath: 72, freezingDeath: 72,
  productiveWindow: [Math.max(0, leafPeakAt - 25), Math.min(200, leafPeakAt + 30)],
  compatibility: Object.fromEntries(FIELDS.map((field, i) => [field, VALUES[name][i]])),
  ...extra,
});

export const WOODLANDS_PLANTS = Object.freeze({
  'Woodlands Base': woodlands('Woodlands Base', 4, 8, .28, 10, 100, 10, 'Woodlands Base',
    { productiveWindow: [80, 135] }),
  Bamboom: woodlands('Bamboom', 3, 6.5, null, 6, 105, 18, 'Woodlands Base',
    { preferredTemperature: ['Temperate', 'Warm'] }),
  Bamboozeling: woodlands('Bamboozeling', 3.5, 7.5, null, 4, 110, 7, 'Woodlands Base'),
  Bamboozled: woodlands('Bamboozled', 4, 8, null, 0, 110, 0, null),
  Tanglethorn: woodlands('Tanglethorn', 4, 8, .23, 11, 125, 9, 'Tanglethorn'),
  Mistlefoe: woodlands('Mistlefoe', 4, 8.5, .20, 14, 135, 7, 'Mistlefoe',
    { lightOutput: [.55, 1, .8, .6] }),
  Mistlewoe: woodlands('Mistlewoe', 5, 9, null, 3, 125, 2, 'Tanglethorn'),
  Bramblewraith: woodlands('Bramblewraith', 5, 9, .20, 12, 145, 8, 'Bramblewraith',
    { productiveWindow: [100, 190], leafPlateau: [100, 110, 180, 190],
      dryDeath: Infinity, hotDeath: Infinity, freezingDeath: Infinity, mycelialDeath: Infinity,
      moisture: [.45, 1, .6], moistureOutput: [.45, 1, .6] }),
  Mandrabra: woodlands('Mandrabra', 4, 8, .22, 12, 125, 7, 'Mandrabra'),
  Mandrakadabra: woodlands('Mandrakadabra', 5, 8.5, .12, 30, 135, 0, null,
    { productiveWindow: [123, 147], brightDeath: 4, lightOutput: [.4, .7, 1, .7] }),
  Mandrakazam: woodlands('Mandrakazam', 5, 10, null, 5, 110, 20, 'Mandrakadabra',
    { lightOutput: [.6, 1, 1, .7] }),
});
