import { calculateEnvironment } from './simulation.js';
import { FUNGI } from './species.js';
import { isMycelial } from './mycelial.js';
import { neighborsOf, edgeKey } from './grid.js';
import { isBlocked } from './blocking.js';
import { propagateSpread } from './spread.js';

// Environmental emissions and cultivation Effects have separate footprints.
// Include empty hexes as potential sowing targets for Germination modifiers.
const CULTIVATION_KINDS = Object.freeze({
  growthRate: 'Growth', ripeningRate: 'Ripening', leafYield: 'Leaf', seedYield: 'Seed',
  germination: 'Germination', harvestWindow: 'Harvest Timing',
  leafPeakTiming: 'Harvest Timing', seedTiming: 'Harvest Timing',
  hourlyLeaf: 'Leaf', hourlySeed: 'Seed',
  leafAllocation: 'Allocation', seedAllocation: 'Allocation',
});

// Build the initial Range/Budget footprint ONCE for a package, using its Mode
// and full blockers. Kind-specific blockers subsequently filter each effect
// over these exact same edges; they never grant another budget or direction.
// A Waterborne package extends from every initially reached Flooded tile over
// its whole connected Flooded component, without spending initial budget.
export function cultivationFootprint(garden, source, packet, heading, moisture) {
  if (!garden.hexes[source]) return { reached: [], links: new Map() };
  const neutral = { kind: 'CultivationPackage', mode: packet.mode };
  const links = new Map();
  const connected = (a, b) => {
    if (!links.has(a)) links.set(a, new Set());
    if (!links.has(b)) links.set(b, new Set());
    links.get(a).add(b);
    links.get(b).add(a);
  };
  const canCross = (a, b) => garden.hexes[b]
    && !isBlocked(garden.objects[b]?.type === 'blocker' ? garden.objects[b] : null, neutral)
    && !isBlocked(garden.edges[edgeKey(a, b)], neutral);
  const visited = new Map([[source, 0]]);
  if (packet.propagation === 'spread-budget') {
    const routed = propagateSpread(garden, source, {
      ...neutral, propagation: 'spread-budget', budget: packet.budget,
      heading, rule: 'straight-until-blocked',
    }, 1);
    for (const hit of routed.reached) visited.set(hit.key, hit.distance);
    for (const { from, to } of routed.segments) connected(from, to);
  } else {
    const queue = [source];
    for (let i = 0; i < queue.length; i += 1) {
      const at = queue[i], distance = visited.get(at);
      if (distance >= packet.range) continue;
      for (const next of neighborsOf(at)) {
        if (!canCross(at, next)) continue;
        connected(at, next);
        if (visited.has(next)) continue;
        visited.set(next, distance + 1);
        queue.push(next);
      }
    }
  }
  if (packet.mode === 'waterborne') {
    const queue = [...visited.keys()].filter(key => moisture[key] === 'Flooded');
    const expanded = new Set(queue);
    for (let i = 0; i < queue.length; i += 1) {
      const at = queue[i];
      for (const next of neighborsOf(at)) {
        if (moisture[next] !== 'Flooded' || !canCross(at, next)) continue;
        connected(at, next);
        if (expanded.has(next)) continue;
        expanded.add(next);
        queue.push(next);
      }
    }
  }
  return { reached: [...links.keys(), source].filter((key, i, arr) => arr.indexOf(key) === i), links };
}

function recipients(garden, source, geometry, packet, kind) {
  const influence = { kind: CULTIVATION_KINDS[kind], mode: packet.mode };
  const distances = new Map([[source, 0]]), queue = [source];
  for (let i = 0; i < queue.length; i += 1) {
    const at = queue[i];
    for (const next of geometry.links.get(at) || []) {
      if (distances.has(next)) continue;
      if (isBlocked(garden.objects[next]?.type === 'blocker' ? garden.objects[next] : null, influence)
        || isBlocked(garden.edges[edgeKey(at, next)], influence)) continue;
      distances.set(next, distances.get(at) + 1);
      queue.push(next);
    }
  }
  return [...distances].map(([key, distance]) => ({ key, distance }));
}

export function calculateCultivation(garden, environment = calculateEnvironment(garden)) {
  const atHexes = Object.fromEntries(Object.keys(garden.hexes).map(key => [key, []]));
  const moisture = Object.fromEntries(Object.entries(environment.conditions)
    .map(([key, conditions]) => [key, conditions.Moisture]));

  for (const [source, object] of Object.entries(garden.objects)) {
    if (object.type !== 'fungus') continue;
    const packet = FUNGI[object.species]?.cultivation;
    if (!packet) continue;
    const geometry = cultivationFootprint(garden, source, packet, object.heading ?? 0, moisture);
    const supported = isMycelial(garden, source);
    for (const emitted of packet.effects) {
      for (const hit of recipients(garden, source, geometry, packet, emitted.kind)) {
        if (!atHexes[hit.key]) continue;
        const amount = supported && emitted.boosted != null ? emitted.boosted : emitted.amount;
        atHexes[hit.key].push({ source, species: object.species, ...emitted, amount,
          mode: packet.mode, propagation: packet.propagation, distance: hit.distance,
          kindTag: CULTIVATION_KINDS[emitted.kind], implemented: true });
      }
    }
  }
  return atHexes;
}
