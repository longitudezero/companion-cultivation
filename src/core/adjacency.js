import { CONDITIONS, neighborsOf } from './grid.js';
import { anchoredCondition } from './influences.js';

// A single simultaneous pass: only the Conditions supplied by the preceding
// Source calculation can trigger adjacency. Adjustments never feed each other.
export function applyEnvironmentalAdjacency(garden, beforeAdjacency) {
  const conditions = Object.fromEntries(Object.entries(beforeAdjacency).map(([key, values]) => [key, { ...values }]));
  const adjacency = {};

  for (const [key, before] of Object.entries(beforeAdjacency)) {
    const neighbors = neighborsOf(key).filter((neighbor) => beforeAdjacency[neighbor]);
    const entries = [];

    function shift(property, modifier, trigger, origins) {
      if (anchoredCondition(garden.objects[key], property) !== null) return;
      const choices = CONDITIONS[property];
      const oldIndex = choices.indexOf(before[property]);
      const nextIndex = oldIndex + modifier;
      const allowed = property === 'Temperature'
        ? (modifier > 0 ? oldIndex < choices.indexOf('Warm') : oldIndex > choices.indexOf('Cold'))
        : (modifier > 0 ? oldIndex < choices.indexOf('Lit') : oldIndex > choices.indexOf('Dim'));
      if (!allowed) return;
      conditions[key][property] = choices[nextIndex];
      entries.push({ property, modifier, trigger, from: origins, before: before[property], after: choices[nextIndex] });
    }

    const flooded = neighbors.filter((neighbor) => beforeAdjacency[neighbor].Moisture === 'Flooded');
    if (flooded.length && before.Moisture === 'Dry' && anchoredCondition(garden.objects[key], 'Moisture') === null) {
      conditions[key].Moisture = 'Damp';
      entries.push({ property: 'Moisture', modifier: 1, trigger: 'Flooded', from: flooded, before: 'Dry', after: 'Damp' });
    }

    for (const [property, high, low] of [['Temperature', 'Hot', 'Freezing'], ['Illumination', 'Bright', 'Dark']]) {
      const warmer = neighbors.filter((neighbor) => beforeAdjacency[neighbor][property] === high);
      const cooler = neighbors.filter((neighbor) => beforeAdjacency[neighbor][property] === low);
      if (warmer.length && !cooler.length) shift(property, 1, high, warmer);
      if (cooler.length && !warmer.length) shift(property, -1, low, cooler);
      // Both extremes present: equal opposing adjustments cancel, no matter
      // how many neighbors supply either direction.
    }

    adjacency[key] = entries;
  }

  return { conditions, adjacency };
}
