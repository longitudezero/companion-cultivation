import { FUNGI, PROPERTIES, INFLUENCE_TYPES, formatRealDuration } from '../core/index.js';
import { observedEffects } from '../grimoire/book.js';
import { EFFECT_DEFINITIONS, EFFECT_LABELS, observedEffectText, effectAmount } from '../grimoire/effects.js';
import { TRANSFORMATIONS } from '../core/transformations.js';
import { describeFullRecipe, previewFungusEffects } from '../core/grimoire-preview.js';

export const FIELD_ICONS = { Moisture: '◈', Temperature: '♨', Illumination: '☼', growthRate: '❧', ripeningRate: '◷',
  germination: '◌', leafYield: '❧', seedYield: '✥', harvestWindow: '↔', leafPeakTiming: '❧', seedTiming: '✥', hourlyLeaf: '❧', hourlySeed: '✥' };

const conditionLine = conditions => Object.values(conditions || {}).map(value => Array.isArray(value) ? value.join(' or ') : value).join(' · ');

// A witnessed route may be named; other compatible Fungus alternatives remain undisclosed.
export function learnedRecipe(route, records) {
  const knownFungi = new Set(records.flatMap(record => record.fungi || []));
  const groups = value => (value || []).map(group => {
    const known = group.filter(name => knownFungi.has(name));
    return known.length ? known : ['Fungus contact not recorded'];
  });
  const phase = value => value && { ...value, contacts: groups(value.contacts),
    retain: groups(value.retain), remove: value.remove && (knownFungi.has(value.remove) ? value.remove : 'the preparation Fungus') };
  const canonical = (TRANSFORMATIONS[records[0].from] || []).find(recipe => recipe.into === route.into) || route;
  const recipe = { ...canonical, contacts: groups(canonical.contacts), preparation: phase(canonical.preparation), completion: phase(canonical.completion) };
  const recovery = ['heat-to-warm', 'freeze-to-cold'].includes(route.sequence);
  const completing = recovery || ['crossing', 'armed', 'ready'].includes(route.phase);
  const current = route.sequence ? completing ? recipe.completion : recipe.preparation : recipe;
  const contacts = (current?.contacts || []).map(group => group.join(' or ')).join(' + ');
  const requirements = [conditionLine(current?.conditions), contacts && `Contact: ${contacts}`].filter(Boolean);
  if (recovery) requirements.push(`${route.sequence === 'heat-to-warm' ? 'Hot' : 'Freezing'} exposure: ${route.early ? 'under' : 'at least'} ${formatRealDuration(route.hours)} at 1×`);
  else if (route.sequence && route.phase === 'crossing') requirements.push(`Finish within ${formatRealDuration(route.hours)} at 1×`);
  else if (route.sequence && (route.phase === 'ready' || route.phase === 'armed')) requirements.push('Prepared · awaiting the next change');
  else if (route.sequence) requirements.push(`Prepare for ${formatRealDuration(route.hours)} at 1×`);
  return { requirements, details: describeFullRecipe(records[0].from, recipe) };
}

const sourceName = (garden, key) => garden.objects[key]?.species || `hex ${key}`;

export function inspectorInfluences(garden, key, simulation, cultivation) {
  const object = garden.objects[key], cards = [];
  for (const property of PROPERTIES) {
    const modifiers = simulation.modifiers[key]?.[property] || [];
    const adjacency = (simulation.adjacency[key] || []).filter(effect => effect.property === property);
    const baseline = garden.hexes[key]?.baselines[property], resolved = simulation.conditions[key]?.[property];
    if (!baseline || (!modifiers.length && !adjacency.length && baseline === resolved)) continue;
    cards.push({ id: `environment:${property}`, icon: FIELD_ICONS[property], title: property,
      summary: `${baseline} → ${resolved}`, source: 'Environmental influence',
      lines: [`Baseline ${baseline} → ${resolved}`,
        ...modifiers.map(effect => `${effect.influence} (${effect.modifier > 0 ? '+' : ''}${effect.modifier}) · ${sourceName(garden, effect.source)}`),
        ...adjacency.map(effect => `Adjacency (${effect.modifier > 0 ? '+' : ''}${effect.modifier}) · ${effect.before} → ${effect.after}`)] });
  }
  if (object?.type === 'plant') {
    const contacts = cultivation[key] || [];
    for (const fact of observedEffects(garden.grimoire, object.species).filter(fact => contacts.some(contact =>
      contact.species === fact.fungus && contact.kind === fact.kind && Math.sign(contact.amount) === fact.direction))) {
      const definition = EFFECT_DEFINITIONS[fact.kind];
      cards.push({ id: `${fact.fungus}:${fact.kind}:${fact.direction}`, icon: FIELD_ICONS[fact.kind] || '✧',
        title: EFFECT_LABELS[fact.kind] || fact.kind, summary: ['leafPeakTiming', 'seedTiming'].includes(fact.kind) ? fact.direction < 0 ? 'Earlier' : 'Later' : fact.direction > 0 ? 'Increased' : fact.direction < 0 ? 'Decreased' : 'Altered',
        source: fact.fungus, lines: [observedEffectText(fact), definition?.summary, definition?.detail].filter(Boolean) });
    }
  }
  if (object?.type === 'fungus') {
    const fungus = FUNGI[object.species], environment = fungus.environment;
    if (environment) {
      const type = INFLUENCE_TYPES.find(type => type.name === environment.name);
      const reach = environment.propagation === 'spread-budget' ? `${environment.budget} shared steps` : `radius ${environment.range}`;
      cards.push({ id: 'fungus-emission', icon: FIELD_ICONS[type.property], title: `Emits ${type.property}`,
        summary: `${type.direction > 0 ? '+' : '−'}${environment.strength} · ${reach}`, source: object.species,
        lines: [`${environment.name} ${environment.strength}`, `${environment.mode === 'waterborne' ? 'Waterborne' : 'Airborne'} · ${reach}`] });
    }
    const descriptions = previewFungusEffects(object.species);
    (fungus.cultivation?.effects || []).forEach((effect, index) => cards.push({ id: `fungus-effect:${index}`,
      icon: FIELD_ICONS[effect.kind] || '✧', title: EFFECT_LABELS[effect.kind] || effect.kind,
      summary: effectAmount(effect), source: object.species,
      lines: [descriptions[index], EFFECT_DEFINITIONS[effect.kind]?.summary].filter(Boolean) }));
    if (object.species === 'Mycelord') cards.push({ id: 'mycelial', icon: '✥', title: 'Mycelial ground',
      summary: 'Establishes Mycelial', source: 'Mycelord', lines: ['Establishes and supports Mycelial ground. Flooded hexes block new colonization.'] });
  }
  return cards;
}

export function influencePage(cards, page, columns) {
  const capacity = Math.max(1, Math.min(3, columns)) * 2;
  const count = Math.max(1, Math.ceil(cards.length / capacity));
  const current = Math.max(0, Math.min(page, count - 1));
  return { cards: cards.slice(current * capacity, (current + 1) * capacity), current, count };
}
