import { CONDITIONS, PROPERTIES, createGarden, distanceBetween, isGarden } from './grid.js';
import { INFLUENCE_TYPES, KINDS, MODES, makeInfluence, makeSpreadInfluence } from './influences.js';
import { FUNGI, PLANTS, makeFungus, makePlant } from './species.js';
import { MYCELIAL_TUNING } from './mycelial.js';
import { TRANSFORMATIONS } from './transformations.js';
import { isDesertRecovery } from './desert-transformations.js';
import { ensureInventorySlots } from './inventory.js';
import { stagePlanting } from './staging.js';
import { migrateGrimoire } from './grimoire.js';
import { makePlayerSource, validItemId } from './source-items.js';
import { SOURCE_ITEMS } from './source-item-catalog.js';

// V6 is a deliberate clean break from the first-pass fungal roster. Rehydrate
// and sanitize only current-schema gardens; never translate old species IDs
// into new meanings or mutate the caller's original JSON.
export function migrateGarden(saved) {
  if (!isGarden(saved)) throw new Error('Unsupported garden file.');
  const garden = createGarden(saved.columns, saved.rows);
  garden.routeNonce = Number.isInteger(saved.routeNonce) ? saved.routeNonce : 0;
  garden.itemNonce = Number.isSafeInteger(saved.itemNonce) && saved.itemNonce >= 0 ? saved.itemNonce : 0;
  garden.clockHours = Number.isFinite(saved.clockHours) && saved.clockHours >= 0 ? saved.clockHours : 0;
  garden.colonyNonce = Number.isSafeInteger(saved.colonyNonce) && saved.colonyNonce >= 0
    ? saved.colonyNonce : 0;
  const usedColonies = new Set();
  const usedItemIds = new Set();
  function registerItem(id, catalogId, remainingHours, heading) {
    if (!validItemId(id) || usedItemIds.has(id) || !SOURCE_ITEMS[catalogId]) return null;
    try {
      const source = makePlayerSource(id, catalogId, remainingHours, heading);
      usedItemIds.add(id);
      garden.itemNonce = Math.max(garden.itemNonce, Number(id.slice(5)));
      return source;
    } catch { return null; }
  }
  if (saved.inventory) {
    const cleanCount = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
    // Keep any unattributed legacy stock already present in an accepted V6
    // garden; do not infer a Plant species from generic Leaf currency.
    const previousLeaves = saved.inventory.leaves;
    const typedLeaves = previousLeaves && typeof previousLeaves === 'object' && !Array.isArray(previousLeaves)
      ? Object.fromEntries(Object.entries(previousLeaves)
        .filter(([species]) => PLANTS[species])
        .map(([species, amount]) => [species, cleanCount(amount)])) : {};
    const oldTotal = cleanCount(previousLeaves);
    const priorLegacy = cleanCount(saved.inventory.legacyLeaves);
    garden.inventory = {
      leaves: typedLeaves,
      legacyLeaves: Math.min(Number.MAX_SAFE_INTEGER, priorLegacy + oldTotal),
      // Missing starter slots get the provisional default, without replenishing
      // players who have explicitly spent a stack down to zero.
      seeds: { Daisydaze: 16, 'Aquatic Base': 16, 'Woodlands Base': 16, Jadeheart: 16, Thymely: 16,
        ...Object.fromEntries(Object.entries(saved.inventory.seeds || {})
        .filter(([name]) => PLANTS[name]).map(([name, amount]) => [name, cleanCount(amount)])) },
      spores: Object.fromEntries(Object.entries(saved.inventory.spores || {})
        .filter(([name]) => FUNGI[name]).map(([name, amount]) => [name, cleanCount(amount)])),
      sourceItems: {},
      trophies: { bambooSteel: cleanCount(saved.inventory.trophies?.bambooSteel) },
    };
    for (const [id, item] of Object.entries(saved.inventory.sourceItems || {})) {
      const reconstructed = registerItem(id, item?.catalogId, item?.remainingHours, item?.heading ?? 0);
      if (reconstructed) garden.inventory.sourceItems[id] = {
        catalogId: reconstructed.catalogId, remainingHours: reconstructed.remainingHours,
        heading: reconstructed.heading,
      };
    }
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
      for (const hazard of Object.keys(clean.exposure)) {
        clean.exposure[hazard] = Math.max(0, Number(object.exposure?.[hazard]) || 0);
      }
      for (const field of Object.keys(clean.production)) {
        const value = object.production?.[field];
        clean.production[field] = Number.isFinite(value) && value >= 0 ? value : 0;
      }
      for (const recipe of TRANSFORMATIONS[object.species] || []) {
        if (isDesertRecovery(recipe)) continue; // Endurance lives in exposure.Hot/Freezing.
        if (recipe.sequence) {
          const state = object.transformationSequence?.[recipe.into];
          const aquatic = recipe.sequence === 'flood-to-damp';
          const woodlands = recipe.sequence === 'mistruffle-departure';
          const validPhases = aquatic ? ['preparing', 'ready'] : woodlands
            ? ['preparing', 'armed'] : ['preparing', 'ready', 'crossing'];
          const phase = validPhases.includes(state?.phase) ? state.phase : 'preparing';
          const integer = (number, limit) => Number.isSafeInteger(number) && number >= 0
            ? Math.min(number, limit) : 0;
          const preparedHours = integer(state?.preparedHours, woodlands ? recipe.beforeHours : recipe.hours);
          const windowHours = aquatic || woodlands ? 0 : integer(state?.windowHours, recipe.completion.withinHours);
          clean.transformationSequence[recipe.into] = {
            phase: phase === 'ready' && preparedHours < recipe.hours ? 'preparing'
              : phase === 'crossing' && preparedHours < recipe.hours ? 'preparing'
              : phase === 'armed' && (preparedHours < recipe.hours || preparedHours >= recipe.beforeHours)
                ? 'preparing' : phase,
            preparedHours, ...(aquatic || woodlands ? {} : { windowHours }),
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
      const heading = Number.isInteger(object.heading) && object.heading >= 0 && object.heading <= 5
        ? object.heading : 0;
      const clean = makeFungus(object.species, heading);
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
    if (object.itemId != null) {
      const reconstructed = registerItem(object.itemId, object.catalogId, object.remainingHours, object.heading ?? 0);
      if (reconstructed) garden.objects[key] = reconstructed;
      continue;
    }
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
  // Preserve the V6 inventory layout and uncommitted/committed sowing plan.
  {
    for (const [key, entry] of Object.entries(saved.pending || {})) {
      if (!garden.hexes[key] || garden.objects[key] || !entry ||
        !Number.isSafeInteger(entry.quantity) || entry.quantity < 1 ||
        !Number.isSafeInteger(entry.readyAt) || entry.readyAt < 0 ||
        typeof entry.success !== 'boolean') continue;
      if ((entry.kind === 'plant' && PLANTS[entry.species]?.germination != null) ||
        (entry.kind === 'fungus' && FUNGI[entry.species])) {
        garden.pending[key] = { kind: entry.kind, species: entry.species, quantity: entry.quantity,
          success: entry.success, readyAt: entry.readyAt,
          ...(entry.kind === 'fungus' ? { heading: Number.isInteger(entry.heading)
            && entry.heading >= 0 && entry.heading <= 5 ? entry.heading : 0 } : {}) };
      }
    }
    for (const [key, entry] of Object.entries(saved.staged || {})) {
      try { garden.staged = stagePlanting(garden, key, entry?.kind, entry?.species,
        entry?.quantity, entry?.heading ?? 0).staged; }
      catch { /* discard invalid or over-reserved proposals; never spend Seeds on import */ }
    }
    garden.inventorySlots = saved.inventorySlots || {};
  }
  garden.grimoire = migrateGrimoire(saved.grimoire, garden.objects);
  return ensureInventorySlots(garden);
}
