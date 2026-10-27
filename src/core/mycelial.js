import { distanceBetween, edgeKey, neighborsOf } from './grid.js';
import { isBlocked } from './blocking.js';

// These durations are TEST settings. The spread, severance, overlapping-source
// and gradual-retreat rules are approved; their exact timings are not.
export const MYCELIAL_TUNING = Object.freeze({
  colonizeHoursPerHex: 12,
  retreatHoursPerLayer: 12,
  mycelordFloodDeathHours: 48,
  dependentHabitatGraceHours: 48,
});

// Mycelial is a distinct ground overlay, not another environmental Condition.
// It has its own Kind: Mode-selective Airborne/Waterborne Blockers do not
// accidentally block soil connection, but Full and Mycelial-Kind ones do.
const MYCELIAL_EFFECT = Object.freeze({ kind: 'Mycelial', mode: 'mycelial' });
const finiteNonnegative = value => Number.isFinite(value) && value >= 0 ? value : 0;

export function mycelialContributors(garden, key) {
  return Object.entries(garden.mycelium?.contributions || {})
    .filter(([, contribution]) => Boolean(contribution.cells?.[key]))
    .map(([id]) => id);
}

export function isMycelial(garden, key) {
  return mycelialContributors(garden, key).length > 0;
}

function passableHex(garden, environment, key) {
  return Boolean(garden.hexes[key])
    && environment.conditions[key]?.Moisture !== 'Flooded'
    && !isBlocked(garden.objects[key]?.type === 'blocker' ? garden.objects[key] : null, MYCELIAL_EFFECT);
}

function canConnect(garden, environment, from, to) {
  return passableHex(garden, environment, from)
    && passableHex(garden, environment, to)
    && !isBlocked(garden.edges[edgeKey(from, to)], MYCELIAL_EFFECT);
}

function supportedCells(garden, environment, origin, cells, hasLivingSource) {
  if (!hasLivingSource || !cells[origin] || !passableHex(garden, environment, origin)) return new Set();
  const reached = new Set([origin]);
  const queue = [origin];
  for (let i = 0; i < queue.length; i += 1) {
    for (const neighbor of neighborsOf(queue[i])) {
      if (reached.has(neighbor) || !cells[neighbor] || !canConnect(garden, environment, queue[i], neighbor)) continue;
      reached.add(neighbor);
      queue.push(neighbor);
    }
  }
  return reached;
}

// Read-only support resolution for previews and instant Blocker/flood feedback.
// It never colonizes, retires, or advances time.
export function calculateMycelialSupport(garden, environment) {
  const live = new Map(Object.entries(garden.objects)
    .filter(([, object]) => object.type === 'fungus' && object.species === 'Mycelord' && object.colonyId)
    .map(([key, object]) => [object.colonyId, key]));
  return Object.fromEntries(Object.entries(garden.mycelium?.contributions || {}).map(([id, contribution]) => {
    const origin = live.get(id) || contribution.origin;
    return [id, [...supportedCells(garden, environment, origin, contribution.cells || {},
      live.has(id) && passableHex(garden, environment, origin))]];
  }));
}

function retreatLayer(origin, key, supported) {
  // Prototype tie handling: severed branches peel outward from the closest
  // supported boundary; a fully retired source peels outward from its origin.
  return supported.size ? Math.max(1, Math.min(...[...supported].map(other => distanceBetween(key, other))))
    : Math.max(1, distanceBetween(key, origin) + 1);
}

// Advance exactly ONE hour under the supplied environment. Calling environment
// recalculation or editing a Blocker alone never ticks expansion/retreat.
export function advanceMycelium(garden, environment) {
  const live = new Map(Object.entries(garden.objects)
    .filter(([, organism]) => organism.type === 'fungus' && organism.species === 'Mycelord'
      && organism.colonyId)
    .map(([key, organism]) => [organism.colonyId, key]));
  const previous = garden.mycelium?.contributions || {};
  const contributions = {};

  for (const id of new Set([...Object.keys(previous), ...live.keys()])) {
    const before = previous[id] || { origin: live.get(id), cells: {}, frontiers: {} };
    const origin = live.get(id) || before.origin;
    if (!origin) continue;
    const living = live.has(id) && passableHex(garden, environment, origin);
    const cells = Object.fromEntries(Object.entries(before.cells || {})
      .filter(([key]) => garden.hexes[key]).map(([key, data]) =>
        [key, { unsupportedHours: finiteNonnegative(data.unsupportedHours) }]));
    const supported = supportedCells(garden, environment, origin, cells, living);

    for (const [key, data] of Object.entries(cells)) {
      if (supported.has(key)) {
        data.unsupportedHours = 0;
      } else {
        data.unsupportedHours += 1;
        if (data.unsupportedHours >= MYCELIAL_TUNING.retreatHoursPerLayer
          * retreatLayer(origin, key, supported)) delete cells[key];
      }
    }

    // Grow only out of currently supported, retained ground (or into the
    // source's own hex as the first timed establishment). No instant BFS fill.
    const remainingSupported = supportedCells(garden, environment, origin, cells, living);
    const eligible = new Set();
    if (living && !cells[origin]) eligible.add(origin);
    for (const sourceHex of remainingSupported) {
      for (const target of neighborsOf(sourceHex)) {
        if (!cells[target] && canConnect(garden, environment, sourceHex, target)) eligible.add(target);
      }
    }
    const frontiers = {};
    for (const key of eligible) {
      const elapsed = finiteNonnegative(before.frontiers?.[key]) + 1;
      if (elapsed >= MYCELIAL_TUNING.colonizeHoursPerHex) {
        cells[key] = { unsupportedHours: 0 };
      } else {
        frontiers[key] = elapsed;
      }
    }
    if (live.has(id) || Object.keys(cells).length || Object.keys(frontiers).length) {
      contributions[id] = { origin, cells, frontiers };
    }
  }
  return { contributions };
}
