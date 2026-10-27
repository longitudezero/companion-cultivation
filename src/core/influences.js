import { CONDITIONS } from './grid.js';

export const INFLUENCE_TYPES = Object.freeze([
  { name: 'Wetting', kind: 'Aqueous', property: 'Moisture', direction: 1 },
  { name: 'Drying', kind: 'Aqueous', property: 'Moisture', direction: -1 },
  { name: 'Warming', kind: 'Thermal', property: 'Temperature', direction: 1 },
  { name: 'Cooling', kind: 'Thermal', property: 'Temperature', direction: -1 },
  { name: 'Brightening', kind: 'Luminous', property: 'Illumination', direction: 1 },
  { name: 'Dimming', kind: 'Luminous', property: 'Illumination', direction: -1 },
]);

export const KINDS = Object.freeze([
  ...new Set(INFLUENCE_TYPES.map((item) => item.kind)),
  'Growth', 'Ripening', 'Leaf', 'Seed', 'Germination', 'Harvest Timing', 'Allocation', 'Mycelial',
]);
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
    // null is JSON-safe and means unlimited connectivity for Waterborne.
    mode, range: mode === 'waterborne' ? null : Math.max(0, Math.round(range)), propagation: 'range',
  };
}

export function makeSpreadInfluence(name = 'Wetting', strength = 2, budget = 6, heading = 5, rule = 'straight-until-blocked') {
  // Routed influences do not require pre-existing Flooded paths. 'airborne'
  // preserves the current open-terrain blocking semantics; a future medium
  // is deliberately not added to Environmental System v1.1 here.
  return {
    ...makeInfluence(name, strength, 0, 'airborne'),
    propagation: 'spread-budget',
    budget: Math.max(0, Math.round(budget)),
    heading,
    rule,
  };
}

export function makeSource(emissions = [makeInfluence()]) {
  return { type: 'source', emissions };
}

export function makeAnchoredSource(property = 'Temperature', condition = 'Hot', emissions = [makeInfluence()]) {
  if (!CONDITIONS[property]?.includes(condition)) throw new Error('Invalid anchored Property or Condition.');
  return { ...makeSource(emissions), anchor: { property, condition } };
}

export function anchoredCondition(object, property) {
  if (object?.type !== 'source' || !object.anchor) return null;
  const { property: anchoredProperty, condition } = object.anchor;
  if (!CONDITIONS[anchoredProperty]?.includes(condition)) throw new Error('Invalid anchored Property or Condition.');
  return anchoredProperty === property ? condition : null;
}

export function makeBlocker(rule = 'full', value = '') {
  return { type: 'blocker', rule, value };
}
