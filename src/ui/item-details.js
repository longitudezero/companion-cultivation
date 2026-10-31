import { PLANTS, FUNGI, INFLUENCE_TYPES, SOURCE_ITEMS, plantKnown, formatRealDuration } from '../core/index.js';
import { previewFungusProfile, previewFungusEffects } from '../core/grimoire-preview.js';
import { harvestLandmarks } from './garden-model.js';

const typeNames = { seed: 'Plant · Seeds', spore: 'Fungus · Spores', leaf: 'Plant · Leaves',
  'source-item': 'Temporary Source item', trophy: 'Trophy', legacy: 'Legacy material' };
function environmentLine(effect) {
  const type = INFLUENCE_TYPES.find(t => t.name === effect.name);
  const amount = effect.strength * (type?.direction ?? 1);
  return `${amount > 0 ? '+' : ''}${amount} ${type?.property || effect.name}`;
}

export function inventoryDetails(item, ledger) {
  const result = { name: item.name, type: typeNames[item.type] || 'Item', description: '', rows: [] };
  if (item.type === 'spore' && FUNGI[item.species]) {
    const fungus = FUNGI[item.species];
    result.description = 'Its influences begin when the Fungus germinates.';
    if (fungus.environment) result.rows.push(`${environmentLine(fungus.environment)} · ${fungus.environment.propagation === 'spread-budget'
      ? `Spread: ${fungus.environment.budget} shared steps` : `Area of Effect: radius ${fungus.environment.range}`}`);
    result.rows.push(...previewFungusProfile(item.species).filter(row => !row.startsWith('Environmental emission')),
      ...previewFungusEffects(item.species));
    if (item.species === 'Mycelord') {
      result.description = 'Establishes Mycelial ground that can support other Fungi.';
      result.rows.push('Flooded ground blocks new colonization.');
    }
  } else if (['seed', 'leaf'].includes(item.type)) {
    result.description = item.type === 'seed' ? 'Plant in an empty garden hex; choose how many Seeds to sow.'
      : 'Leaves harvested from this Plant. They cannot be planted.';
    if (plantKnown(ledger, item.species)) {
      result.type = `${PLANTS[item.species].family} · ${item.type === 'seed' ? 'Seeds' : 'Leaves'}`;
      if (item.type === 'seed') result.rows.push(...harvestLandmarks(item.species).map(marker => `${marker.kind === 'leaf' ? 'Leaf peak' : marker.kind === 'seed' ? 'Seed peak' : 'Trophy ready'}: ${Math.round(marker.from)}${marker.to > marker.from ? `–${Math.round(marker.to)}` : ''}%`));
      result.rows.push(...Object.values(ledger?.environments?.[item.species] || {}).map(fact => `${fact.property}: ${fact.condition} · ${fact.signal}`));
      if (!Object.keys(ledger?.environments?.[item.species] || {}).length) result.rows.push('Growing preferences not yet observed.');
    } else result.rows.push('Growing notes await your first specimen.');
  } else if (item.type === 'source-item' && SOURCE_ITEMS[item.catalogId]) {
    const definition = SOURCE_ITEMS[item.catalogId];
    result.description = 'Place on empty ground to activate. Return to inventory to pause its lifetime.';
    result.rows = [...definition.propertyEffects.map(environmentLine),
      definition.propagation === 'spread-budget' ? `Directional Spread: ${definition.budget} shared steps` : `Area of Effect: radius ${definition.range}`,
      `Remaining active time at 1×: ${formatRealDuration(item.remainingHours)} · paused`];
  } else result.description = item.type === 'trophy' ? 'A special harvest product.' : 'Material retained from an earlier garden.';
  return result;
}
