export const FIELD_MANUAL_CHAPTERS = Object.freeze([
  { key: 'Garden', label: 'Garden', symbol: '⬡', art: 'aquatic' },
  { key: 'Effects', label: 'Effects', symbol: '↝', art: 'fungi' },
  { key: 'Cultivation', label: 'Cultivation', symbol: '❧', art: 'desert' },
  { key: 'Guild', label: 'Guild', symbol: '✦', art: 'blockers' },
  { key: 'Controls', label: 'Controls', symbol: '✥', art: 'index' },
].map(chapter => Object.freeze(chapter)));

const spreads = [
  ['front-matter', 'Field Manual & Contents', 0],
  ['garden-hexes', 'The Garden & Its Hexes', 0],
  ['conditions', 'Conditions & Neighbours', 0],
  ['influences', 'Influences & Effects', 1],
  ['propagation', 'Propagation & Routes', 1],
  ['blockers', 'Blockers', 1],
  ['planting-time', 'Planting & Garden Time', 2],
  ['plants-harvest', 'Plants & Harvest', 2],
  ['fungi-affinity', 'Fungi & Affinity', 2],
  ['mycelial', 'Mycelial Ground', 2],
  ['transformations', 'Transformations & Knowledge', 2],
  ['inventory-tools', 'Inventory & Garden Tools', 3],
  ['guild-progress', 'Shop, Tasks & Expansion', 3],
  ['garden-controls', 'Garden Controls & Preferences', 4],
  ['books-saving', 'Books, Saving & Recovery', 4],
];

export const FIELD_MANUAL_ENTRIES = Object.freeze(spreads.map(([slug, label, chapter], index) => Object.freeze({
  key: `manual:${slug}`, label, chapter, kind: 'manual', index, page: index * 2 + 1,
})));

export const FIELD_MANUAL_PAGE_KEY = 'companion-cultivation:field-manual-page:v1';
export const FIELD_MANUAL_VIEW_KEY = 'companion-cultivation:field-manual-view:v1';
export const restoreFieldManualEntry = key => FIELD_MANUAL_ENTRIES.some(entry => entry.key === key)
  ? key : FIELD_MANUAL_ENTRIES[0].key;
export const fieldManualEntryName = entry => entry?.label || 'Field Manual';

