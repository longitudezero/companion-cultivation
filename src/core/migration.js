import { CONDITIONS, PROPERTIES, createGarden, distanceBetween, isGarden } from './grid.js';
import { INFLUENCE_TYPES, KINDS, MODES, makeInfluence, makeSpreadInfluence } from './influences.js';
import { FUNGI, PLANTS, makeFungus, makePlant } from './species.js';
import { MYCELIAL_TUNING } from './mycelial.js';
import { TRANSFORMATIONS } from './transformations.js';

// Keep older garden exports usable after removing Materials and Fertility.
// The caller's original JSON is never mutated, and unknown/retired effects
// cannot leak into the three-property simulation.
export function migrateGarden(saved) {
  if (!isGarden(saved)) throw new Error('Unsupported garden file.');
  const garden = createGarden(saved.columns, saved.rows);
  garden.routeNonce = Number.isInteger(saved.routeNonce) ? saved.routeNonce : 0;
  garden.clockHours = Number.isFinite(saved.clockHours) && saved.clockHours >= 0 ? saved.clockHours : 0;
  garden.colonyNonce = Number.isSafeInteger(saved.colonyNonce) && saved.colonyNonce >= 0
    ? saved.colonyNonce : 0;
  const usedColonies = new Set();
  if (saved.inventory) {
    const cleanCount = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
    garden.inventory = {
      leaves: cleanCount(saved.inventory.leaves),
      // Older saved gardens predate Flowers. Give them the same one-time
      // provisional Base Seed access as new gardens, without replenishing
      // players who have explicitly spent their Daisydaze Seeds down to zero.
      seeds: { Daisydaze: 16, 'Aquatic Base': 16, ...Object.fromEntries(Object.entries(saved.inventory.seeds || {})
        .filter(([name]) => PLANTS[name]).map(([name, amount]) => [name, cleanCount(amount)])) },
      spores: Object.fromEntries(Object.entries(saved.inventory.spores || {})
        .filter(([name]) => FUNGI[name]).map(([name, amount]) => [name, cleanCount(amount)])),
    };
  }

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
      if (object.species === 'Starlotus' && ['Damp', 'Flooded'].includes(object.attunement)) {
        clean.attunement = object.attunement;
      }
      clean.progress = Math.max(0, Math.min(200, Number(object.progress) || 0));
      clean.ageHours = Math.max(0, Number(object.ageHours) || 0);
      for (const hazard of ['Dry', 'Hot', 'Freezing', 'Mycelial']) {
        clean.exposure[hazard] = Math.max(0, Number(object.exposure?.[hazard]) || 0);
      }
      for (const field of Object.keys(clean.production)) {
        const value = object.production?.[field];
        clean.production[field] = Number.isFinite(value) && value >= 0 ? value : 0;
      }
      for (const recipe of TRANSFORMATIONS[object.species] || []) {
        if (recipe.sequence) {
          const state = object.transformationSequence?.[recipe.into];
          const aquatic = recipe.sequence === 'flood-to-damp';
          const validPhases = aquatic ? ['preparing', 'ready'] : ['preparing', 'ready', 'crossing'];
          const phase = validPhases.includes(state?.phase) ? state.phase : 'preparing';
          const integer = (number, limit) => Number.isSafeInteger(number) && number >= 0
            ? Math.min(number, limit) : 0;
          const preparedHours = integer(state?.preparedHours, recipe.hours);
          const windowHours = aquatic ? 0 : integer(state?.windowHours, recipe.completion.withinHours);
          clean.transformationSequence[recipe.into] = {
            phase: phase === 'ready' && preparedHours < recipe.hours ? 'preparing'
              : phase === 'crossing' && preparedHours < recipe.hours ? 'preparing' : phase,
            preparedHours, ...(aquatic ? {} : { windowHours }),
          };
          continue;
        }
        const hours = object.transformationClocks?.[recipe.into];
        clean.transformationClocks[recipe.into] = Number.isSafeInteger(hours) && hours >= 0
          ? Math.min(hours, recipe.hours - 1) : 0;
      }
      garden.objects[key] = clean;
      continue;
    }
    if (object?.type === 'fungus' && FUNGI[object.species]) {
      const clean = makeFungus(object.species, Number.isInteger(object.heading) ? object.heading : 0);
      clean.progress = Math.max(0, Math.min(200, Number(object.progress) || 0));
      clean.ageHours = Math.max(0, Number(object.ageHours) || 0);
      clean.sporeStock = Number.isFinite(object.sporeStock) && object.sporeStock >= 0 ? object.sporeStock : 0;
      clean.exposure.Flooded = Math.max(0, Number(object.exposure?.Flooded) || 0);
      clean.exposure.MissingMycelial = Math.max(0, Number(object.exposure?.MissingMycelial) || 0);
      if (object.species === 'Mycelord') {
        const oldId = object.colonyId;
        if (typeof oldId === 'string' && /^colony:\d+$/.test(oldId) && !usedColonies.has(oldId)) {
          clean.colonyId = oldId;
          garden.colonyNonce = Math.max(garden.colonyNonce, Number(oldId.slice(7)));
        } else {
          garden.colonyNonce += 1;
          clean.colonyId = `colony:${garden.colonyNonce}`;
        }
        usedColonies.add(clean.colonyId);
      }
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
  // Preserve separately attributed living or retiring contributions, including
  // orphaned colonies whose Mycelord died. Never regrow lost ground on import.
  const contributions = {};
  const safeHours = value => Number.isFinite(value) && value >= 0 ? value : 0;
  for (const [id, entry] of Object.entries(saved.mycelium?.contributions || {})) {
    if (!/^colony:\d+$/.test(id) || typeof entry?.origin !== 'string'
      || !/^-?\d+,-?\d+$/.test(entry.origin)) continue;
    const cells = Object.fromEntries(Object.entries(entry.cells || {})
      .filter(([key]) => garden.hexes[key]).map(([key, cell]) =>
        [key, { unsupportedHours: safeHours(cell?.unsupportedHours) }]));
    const frontiers = Object.fromEntries(Object.entries(entry.frontiers || {})
      .filter(([key]) => garden.hexes[key]).map(([key, hours]) =>
        [key, Math.min(MYCELIAL_TUNING.colonizeHoursPerHex, safeHours(hours))]));
    if (usedColonies.has(id) || Object.keys(cells).length || Object.keys(frontiers).length) {
      contributions[id] = { origin: entry.origin, cells, frontiers };
    }
    garden.colonyNonce = Math.max(garden.colonyNonce, Number(id.slice(7)));
  }
  garden.mycelium = { contributions };
  return garden;
}
