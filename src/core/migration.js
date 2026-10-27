import { CONDITIONS, PROPERTIES, createGarden, distanceBetween, isGarden } from './grid.js';
import { INFLUENCE_TYPES, KINDS, MODES, makeInfluence, makeSpreadInfluence } from './influences.js';
import { FUNGI, PLANTS, makeFungus, makePlant } from './species.js';

// Keep older garden exports usable after removing Materials and Fertility.
// The caller's original JSON is never mutated, and unknown/retired effects
// cannot leak into the three-property simulation.
export function migrateGarden(saved) {
  if (!isGarden(saved)) throw new Error('Unsupported garden file.');
  const garden = createGarden(saved.columns, saved.rows);
  garden.routeNonce = Number.isInteger(saved.routeNonce) ? saved.routeNonce : 0;
  garden.clockHours = Number.isFinite(saved.clockHours) && saved.clockHours >= 0 ? saved.clockHours : 0;

  for (const [key, hex] of Object.entries(garden.hexes)) {
    const previous = saved.hexes[key];
    if (!previous) continue;
    garden.hexes[key] = {
      baselines: Object.fromEntries(PROPERTIES.map((property) => {
        const condition = previous.baselines?.[property];
        return [property, CONDITIONS[property].includes(condition) ? condition : hex.baselines[property]];
      })),
    };
  }

  function migrateBlocker(blocker) {
    if (blocker?.type !== 'blocker') return null;
    if (blocker.rule === 'full') return { type: 'blocker', rule: 'full', value: '' };
    if (blocker.rule === 'kind' && KINDS.includes(blocker.value)) return { type: 'blocker', rule: 'kind', value: blocker.value };
    if (blocker.rule === 'mode' && MODES.includes(blocker.value)) return { type: 'blocker', rule: 'mode', value: blocker.value };
    // Obsolete Nutrient-only blockers have no remaining effects to filter.
    return null;
  }

  for (const [key, object] of Object.entries(saved.objects)) {
    if (!garden.hexes[key]) continue;
    if (object?.type === 'plant' && PLANTS[object.species]) {
      const clean = makePlant(object.species);
      clean.progress = Math.max(0, Math.min(200, Number(object.progress) || 0));
      clean.ageHours = Math.max(0, Number(object.ageHours) || 0);
      for (const hazard of ['Dry', 'Hot', 'Freezing']) {
        clean.exposure[hazard] = Math.max(0, Number(object.exposure?.[hazard]) || 0);
      }
      garden.objects[key] = clean;
      continue;
    }
    if (object?.type === 'fungus' && FUNGI[object.species]) {
      const clean = makeFungus(object.species, Number.isInteger(object.heading) ? object.heading : 0);
      clean.progress = Math.max(0, Math.min(200, Number(object.progress) || 0));
      clean.ageHours = Math.max(0, Number(object.ageHours) || 0);
      garden.objects[key] = clean;
      continue;
    }
    if (object?.type === 'blocker') {
      const blocker = migrateBlocker(object);
      if (blocker) garden.objects[key] = blocker;
      continue;
    }
    if (object?.type !== 'source') continue;
    const emissions = (Array.isArray(object.emissions) ? object.emissions : []).flatMap((emission) => {
      if (!INFLUENCE_TYPES.some((type) => type.name === emission?.name)) return [];
      try {
        const strength = Math.abs(emission.modifier ?? 1);
        return [emission.propagation === 'spread-budget'
          ? makeSpreadInfluence(emission.name, strength, emission.budget ?? 6, emission.heading ?? 0, emission.rule ?? 'straight-until-blocked')
          : makeInfluence(emission.name, strength, emission.range ?? 2, emission.mode ?? 'airborne')];
      } catch { return []; }
    });
    const anchor = object.anchor;
    garden.objects[key] = {
      type: 'source', emissions,
      ...(CONDITIONS[anchor?.property]?.includes(anchor?.condition) ? { anchor: { property: anchor.property, condition: anchor.condition } } : {}),
    };
  }

  for (const [id, object] of Object.entries(saved.edges)) {
    const [a, b] = id.split('|');
    if (!garden.hexes[a] || !garden.hexes[b] || distanceBetween(a, b) !== 1) continue;
    const blocker = migrateBlocker(object);
    if (blocker) garden.edges[id] = blocker;
  }
  return garden;
}
