import { calculateEnvironment, propagate } from './simulation.js';
import { FUNGI } from './species.js';

// Environmental emissions and cultivation Effects have separate footprints.
// Include empty hexes as potential sowing targets for Germination modifiers.
const CULTIVATION_KINDS = Object.freeze({
  growthRate: 'Growth', ripeningRate: 'Ripening', leafYield: 'Leaf', seedYield: 'Seed',
  germination: 'Germination', harvestWindow: 'Harvest Timing',
  leafPeakTiming: 'Harvest Timing', seedTiming: 'Harvest Timing',
  hourlyLeaf: 'Leaf', hourlySeed: 'Seed',
  leafAllocation: 'Allocation', seedAllocation: 'Allocation',
});

export function calculateCultivation(garden, environment = calculateEnvironment(garden)) {
  const atHexes = Object.fromEntries(Object.keys(garden.hexes).map(key => [key, []]));
  const moisture = Object.fromEntries(Object.entries(environment.conditions)
    .map(([key, conditions]) => [key, conditions.Moisture]));

  for (const [source, object] of Object.entries(garden.objects)) {
    if (object.type !== 'fungus') continue;
    const emitted = FUNGI[object.species]?.cultivation;
    if (!emitted) continue;
    const influence = {
      kind: CULTIVATION_KINDS[emitted.kind], mode: emitted.mode,
      range: emitted.range, propagation: 'range',
    };
    for (const hit of propagate(garden, source, influence, moisture)) {
      if (!atHexes[hit.key]) continue;
      atHexes[hit.key].push({ source, species: object.species, ...emitted,
        distance: hit.distance, kindTag: influence.kind, implemented: true });
    }
  }
  return atHexes;
}
