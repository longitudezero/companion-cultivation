export const INFLUENCE_TYPES = Object.freeze([
  { name: 'Wetting', kind: 'Aqueous', property: 'Moisture', direction: 1 },
  { name: 'Drying', kind: 'Aqueous', property: 'Moisture', direction: -1 },
  { name: 'Enrichment', kind: 'Nutrient', property: 'Fertility', direction: 1 },
  { name: 'Depletion', kind: 'Nutrient', property: 'Fertility', direction: -1 },
  { name: 'Warming', kind: 'Thermal', property: 'Temperature', direction: 1 },
  { name: 'Cooling', kind: 'Thermal', property: 'Temperature', direction: -1 },
  { name: 'Brightening', kind: 'Luminous', property: 'Illumination', direction: 1 },
  { name: 'Dimming', kind: 'Luminous', property: 'Illumination', direction: -1 },
]);

export const KINDS = Object.freeze([...new Set(INFLUENCE_TYPES.map((item) => item.kind))]);
export const MODES = Object.freeze(['airborne', 'waterborne']);

export function makeInfluence(name = 'Warming', strength = 1, range = 2, mode = 'airborne') {
  const type = INFLUENCE_TYPES.find((entry) => entry.name === name);
  if (!type) throw new Error(`Unknown environmental Influence: ${name}`);
  if (mode === 'waterborne' && type.property === 'Moisture') {
    throw new Error('Waterborne Moisture Influences are deferred by the current resolution rules.');
  }
  return {
    name, kind: type.kind, property: type.property,
    modifier: type.direction * Math.max(1, Math.abs(Math.round(strength))),
    mode, range: Math.max(0, Math.round(range)),
  };
}

export function makeSource(emissions = [makeInfluence()]) {
  return { type: 'source', emissions };
}

export function makeBlocker(rule = 'full', value = '') {
  return { type: 'blocker', rule, value };
}
