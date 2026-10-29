// Save-file migration only. These are the species identifiers from schema V6,
// not aliases for current gameplay. Always apply this map exactly once, before
// looking up a new species: some old names were deliberately reused.
export const LEGACY_PLANT_NAMES = Object.freeze({
  Potato: 'Beanstalk',
  Apple: 'Potato',
  'Aquatic Base': 'Algea',
  'Woodlands Base': 'Moss',
  Thymely: 'Thymekeeper',
  Moonrice: 'Clovely',
  Sunrice: 'Oreganoir',
  'Shadow Onion': 'Dilly-Dally Dill',
  'Ghost Rice': 'Saffrune',
  Thymekeeper: 'Mighty Mint',
  Starberry: 'Cinnamancer',
  Dillusion: 'Wyrmsalt',
  'Glass Apple': 'Phantarragon',
  "Pum'king": 'Papriking',
  Charmomile: 'Marigloom',
  Lavendream: 'Charmomile',
  Poppycock: 'Lavendream',
  Daisyspell: 'Orchiwitch',
  Lavendread: 'Chamomeleon',
  Marigloom: 'Nightmarigold',
  'Dream Poppy': 'Lavendread',
  'Ember Aloe': 'Aloechemist',
  'Ashen Rose': 'Cactastrophe',
  'Mirage Rose': 'Everjade',
  Sandrose: 'Prickly Pearl',
  Cactaclysm: 'Cactacomb',
});

export const renameLegacyPlant = name => LEGACY_PLANT_NAMES[name] || name;
export const legacyPlantName = name =>
  Object.keys(LEGACY_PLANT_NAMES).find(old => LEGACY_PLANT_NAMES[old] === name) || name;
