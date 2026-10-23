import { CONDITIONS, PROPERTIES, neighborsOf, edgeKey } from './grid.js';

export function isBlocked(blocker, influence) {
  if (!blocker) return false;
  if (blocker.rule === 'full') return true;
  if (blocker.rule === 'kind') return blocker.value === influence.kind;
  if (blocker.rule === 'mode') return blocker.value === influence.mode;
  return false;
}

export function propagate(garden, origin, influence, moisture = null) {
  if (!garden.hexes[origin]) return [];
  const distances = new Map([[origin, 0]]);
  const queue = [origin];
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    const distance = distances.get(current);
    if (distance >= influence.range) continue;
    for (const next of neighborsOf(current)) {
      if (!garden.hexes[next] || distances.has(next)) continue;
      if (isBlocked(garden.objects[next]?.type === 'blocker' ? garden.objects[next] : null, influence)) continue;
      if (isBlocked(garden.edges[edgeKey(current, next)], influence)) continue;
      if (influence.mode === 'waterborne' && moisture?.[next] !== 'Flooded') continue;
      distances.set(next, distance + 1);
      queue.push(next);
    }
  }
  return [...distances].map(([key, distance]) => ({ key, distance }));
}

export function conditionFrom(baseline, property, modifiers) {
  const options = CONDITIONS[property];
  const original = options.indexOf(baseline);
  const total = modifiers.reduce((sum, entry) => sum + entry.modifier, 0);
  const index = Math.min(options.length - 1, Math.max(0, original + total));
  return options[index];
}

export function calculateEnvironment(garden) {
  const modifiers = {};
  const coverage = {};
  const moisture = {};
  for (const key of Object.keys(garden.hexes)) {
    modifiers[key] = Object.fromEntries(PROPERTIES.map((property) => [property, []]));
  }

  function collect(mode, resolvedMoisture) {
    for (const [origin, object] of Object.entries(garden.objects)) {
      if (object.type !== 'source') continue;
      for (let i = 0; i < object.emissions.length; i += 1) {
        const influence = object.emissions[i];
        if (influence.mode !== mode) continue;
        if (mode === 'waterborne' && influence.property === 'Moisture') {
          throw new Error('Waterborne Moisture Influences are not part of Environmental System v1.');
        }
        const reached = propagate(garden, origin, influence, resolvedMoisture);
        coverage[`${origin}:${i}`] = reached;
        for (const { key, distance } of reached) {
          modifiers[key][influence.property].push({
            source: origin,
            influence: influence.name,
            kind: influence.kind,
            mode: influence.mode,
            modifier: influence.modifier,
            distance,
          });
        }
      }
    }
  }

  collect('airborne', null);
  for (const [key, hex] of Object.entries(garden.hexes)) {
    moisture[key] = conditionFrom(hex.baselines.Moisture, 'Moisture', modifiers[key].Moisture);
  }
  collect('waterborne', moisture);

  const conditions = {};
  for (const [key, hex] of Object.entries(garden.hexes)) {
    conditions[key] = Object.fromEntries(PROPERTIES.map((property) => [
      property,
      conditionFrom(hex.baselines[property], property, modifiers[key][property]),
    ]));
  }
  return { conditions, modifiers, coverage };
}
