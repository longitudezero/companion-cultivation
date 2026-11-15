const ORGANISM_SPECIES = [
  'Beanstalk', 'Rice', 'Carrot', 'Onion', 'Potato', 'Pumpkin', 'Strawberry',
  'Daisydaze', 'Marigloom', 'Orchiwitch', 'Nightmarigold', 'Charmomile', 'Chamomeleon',
  'Lavendream', 'Lavendread', 'Rosewraith', 'Orchidemon',
  'Algea', 'Kelpfull', 'Kelpergeist', 'Kelpless', 'Sunken Lotus', 'Moonlit Lotus', 'Starlotus',
  'Pearlily', 'Wild Watercress', 'Silvercress', 'Cresscent',
  'Moss', 'Bamboom', 'Bamboozeling', 'Bamboozled', 'Tanglethorn', 'Mistlefoe', 'Mistlewoe',
  'Branshee', 'Mandrabra', 'Mandrakadabra', 'Mandrakazam',
  'Jadeheart', 'Aloechemist', 'Aloemancer', 'Cactastrophe', 'Moonjade', 'Jadewisp',
  'Pearadox', 'Prickly Pearl', 'Cactopus', 'Cactacomb', 'Everjade',
  'Thymekeeper', 'Oreganoir', 'Clovely', 'Dilly-Dally Dill', 'Cinnamancer', 'Mighty Mint',
  'Saffrune', 'Wyrmsalt', 'Papriking', 'Phantarragon',
  'Mycelord', 'Dewmender', 'Mistruffle', 'Emberbolete', 'Rilllace', 'Prismorel',
  'Droughtcap', 'Hushroom', 'Rainmorel', 'Siltgill', 'Rushroom', 'Frostfolio', "Sim'mushro'dim",
];
const filename = species => `${species.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.webp`;

export const ORGANISM_ICON_FILES = new Map(ORGANISM_SPECIES.map(species => [species, filename(species)]));

export function organismIcon(species) {
  const file = ORGANISM_ICON_FILES.get(species);
  return file ? `${import.meta.env?.BASE_URL || '/'}ui/hexes/organisms/${file}` : undefined;
}
