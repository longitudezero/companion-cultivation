const papers = [
  ['starlight', 'Starlight Paper', 419, 334, [31, 15, 23, 23]],
  ['botanist', 'Botanist’s Paper', 480, 345, [27, 12, 15, 15]],
  ['herbarium', 'Herbarium Paper', 310, 354, [29, 15, 32, 15]],
  ['sunburst', 'Sunburst Paper', 336, 346, [31, 18, 27, 18]],
  ['moonlit', 'Moonlit Paper', 365, 336, [32, 17, 27, 17]],
  ['lavender', 'Lavender Paper', 708, 320, [30, 11, 22, 32]],
  ['gingham', 'Gingham Paper', 363, 356, [27, 13, 15, 23]],
  ['toadstool', 'Toadstool Paper', 439, 355, [28, 15, 39, 14]],
  ['laurel', 'Laurel Paper', 345, 365, [34, 25, 30, 25]],
  ['leaf-lines', 'Leaf-lined Paper', 461, 309, [32, 14, 15, 14]],
];
const markers = [
  ['forest-tassel', 'Forest Tassel'], ['ivory-bloom', 'Ivory Bloom'],
  ['garnet-moon', 'Garnet Moon'], ['teal-star', 'Teal Star'],
  ['plum-vine', 'Plum Vine'], ['golden-tassel', 'Golden Tassel'],
  ['midnight-moon', 'Midnight Moon'], ['sage-pennant', 'Sage Pennant'],
  ['lavender-bloom', 'Lavender Bloom'], ['ivory-ribbon', 'Ivory Ribbon'],
  ['ember-star', 'Ember Star'], ['teal-blossom', 'Teal Blossom'],
];
export const NOTE_PAPERS = Object.freeze(Object.fromEntries(papers.map(([id, name, width, height, inset]) =>
  [id, Object.freeze({ id, name, type: 'paper', price: 5, file: `${id}.webp`, width, height, inset })])));
export const PAGE_MARKERS = Object.freeze(Object.fromEntries(markers.map(([id, name]) =>
  [id, Object.freeze({ id, name: `${name} Marker`, type: 'bookmark', price: 10, file: `${id}.webp` })])));
