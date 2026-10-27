// Spices §§37–40. Approved numeric species identity and habitat response.
// Leaf-window endpoints and interpolation between the documented landmarks
// remain prototype curve choices, not additional balance approvals.
const FIELDS = ['growthRate', 'ripeningRate', 'leafYield', 'seedYield', 'germination',
  'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf', 'hourlySeed', 'allocation'];
const COMPATIBILITY = {
  Thymely: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Sunrice: [1.3, 1.1, 1.3, 1, 1, 1.2, 1.1, 1, 1.2, 1, 1],
  Moonrice: [1, 1.1, .8, 1.4, 1.2, .9, 1, 1.5, .7, 1.8, 1.4],
  'Shadow Onion': [1, 1, 1.1, 1.2, 1, .8, 1, 1, 1, 1, 1],
  Starberry: [.9, 1, 1.3, 1, 1, 1.7, 1.3, 1, 1.5, .7, .9],
  Thymekeeper: [1, 1.3, .5, 1.6, 0, .7, .8, 1.8, .4, 2.5, 1.7],
  'Ghost Rice': [.9, 1, 1.3, .9, 0, 1.5, 1.4, 1, 1.6, .8, .9],
  Dillusion: [1.2, 1.1, 1.2, 1.1, 1.2, 1.3, 1.1, 1, 1, 1, 1.1],
  "Pum'king": [1.1, 1.1, 1, 0, 0, 1, 1.2, 0, 1.8, 0, 0],
  'Glass Apple': [.9, 1.1, 1.2, 1.8, 0, 1.5, 1.3, 1.6, 1.6, 1.8, 1.2],
};

const spice = (name, growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, light, lightOutput, moisture, moistureOutput,
  preferredTemperature, hazards, productiveWindow, extra = {}) => ({
  name, family: 'Spices', growthDays, totalDays, germination, leafPeak, leafPeakAt,
  seeds, seedSpecies, light, lightOutput, moisture, moistureOutput,
  preferredTemperature, productiveWindow,
  compatibility: Object.fromEntries(FIELDS.map((field, index) => [field, COMPATIBILITY[name][index]])),
  ...hazards, ...extra,
});

export const SPICES_PLANTS = Object.freeze({
  Thymely: spice('Thymely', 4, 8, .28, 10, 100, 10, 'Thymely',
    [.7, .9, 1, .9], [.65, .9, 1, .9], [.55, 1, .8], [.55, 1, .8], ['Temperate'],
    { dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48 }, [80, 135]),
  Sunrice: spice('Sunrice', 3.25, 7, .25, 18, 125, 10, 'Sunrice',
    [.35, .55, .75, 1], [.2, .4, .65, 1], [.45, 1, .7], [.5, 1, .7], ['Temperate', 'Warm'],
    { dryDeath: 48, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48 }, [105, 155]),
  Moonrice: spice('Moonrice', 4, 9, .32, 6, 110, 20, 'Moonrice',
    [.85, 1, .85, .55], [.8, 1, .75, .4], [.55, 1, .75], [.55, 1, .75], ['Temperate', 'Cold'],
    { dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48 }, [90, 135]),
  'Shadow Onion': spice('Shadow Onion', 3.5, 7.5, .30, 11, 115, 11, 'Shadow Onion',
    [1, .8, .6, .4], [1, .75, .45, .3], [.6, 1, .75], [.6, 1, .75], ['Temperate', 'Cold'],
    { dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48 }, [90, 155]),
  Starberry: spice('Starberry', 4.5, 9, .18, 31, 135, 8, 'Sunrice',
    [.3, .4, .7, 1], [.15, .25, .5, 1], [.4, 1, .7], [.4, 1, .65], ['Temperate', 'Warm'],
    { dryDeath: 48, hotDeath: 48, freezingDeath: 48, mycelialDeath: 36 }, [125, 150]),
  Thymekeeper: spice('Thymekeeper', 4, 10, null, 5, 115, 28, 'Sunrice',
    [.8, 1, .7, .4], [.75, 1, .55, .3], [.5, 1, .75], [.5, 1, .75], ['Temperate', 'Cold'],
    { dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 48 }, [90, 140]),
  'Ghost Rice': spice('Ghost Rice', 4.5, 8.5, null, 24, 145, 11, 'Moonrice',
    [1, .75, .55, .3], [1, .6, .4, .2], [.5, 1, .65], [.5, 1, .65], ['Temperate', 'Cold'],
    { dryDeath: 72, hotDeath: 72, freezingDeath: 72, mycelialDeath: 36 }, [130, 160]),
  Dillusion: spice('Dillusion', 3.5, 7.5, .28, 14, 135, 12, 'Dillusion',
    [.75, 1, 1, .75], [.75, 1, 1, .75], [.65, 1, .8], [.65, 1, .8], ['Temperate', 'Warm'],
    { dryDeath: 96, hotDeath: 96, freezingDeath: 72, mycelialDeath: 72 }, [120, 165],
    { leafPlateau: [120, 127, 150, 165] }),
  "Pum'king": spice("Pum'king", 4.5, 9.5, null, 46, 145, 0, null,
    [.4, .75, 1, .7], [.25, .6, 1, .5], [.45, 1, .7], [.45, 1, .7], ['Temperate', 'Warm'],
    { dryDeath: 48, hotDeath: 48, freezingDeath: 48, mycelialDeath: 36 }, [130, 170]),
  'Glass Apple': spice('Glass Apple', 5, 10, null, 58, 155, 24, 'Starberry',
    [.25, .4, .7, 1], [.2, .3, .6, 1], [.4, 1, .65], [.4, 1, .65], ['Temperate', 'Warm'],
    { dryDeath: 48, hotDeath: 48, freezingDeath: 48, mycelialDeath: 36 }, [145, 170]),
});
