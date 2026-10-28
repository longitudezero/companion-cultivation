import { placeObject } from './grid.js';
import { PLANTS, FUNGI, makePlant, makeFungus, effectCompatibility } from './species.js';
import { sowPlant, sowFungus } from './economy.js';
import { ensureInventorySlots } from './inventory.js';
import { revealPlant, observeFungalAction } from './grimoire.js';
import { calculateCultivation } from './cultivation.js';
import { calculateEnvironment } from './simulation.js';
import { REAL_MILLISECONDS_PER_GAME_HOUR } from './game-time.js';

// Six-hour germination reveal remains provisional; the live clock is approved.
export const STAGING_TUNING = Object.freeze({
  germinationRevealHours: 6, realMillisecondsPerHour: REAL_MILLISECONDS_PER_GAME_HOUR,
});

function stockFor(garden, kind, species) {
  return garden.inventory?.[kind === 'plant' ? 'seeds' : 'spores']?.[species] || 0;
}

function checkSpecies(kind, species) {
  if (kind === 'plant' && PLANTS[species]?.germination != null) return;
  if (kind === 'fungus' && FUNGI[species]) return;
  throw new Error(`No plantable ${kind === 'plant' ? 'Seeds' : 'Spores'} for ${species}.`);
}

export function reservedStock(garden, kind, species, exceptHex = null) {
  return Object.entries(garden.staged || {}).reduce((sum, [hex, entry]) =>
    sum + (hex !== exceptHex && entry.kind === kind && entry.species === species ? entry.quantity : 0), 0);
}

export function availableToStage(garden, kind, species, exceptHex = null) {
  return Math.max(0, stockFor(garden, kind, species) - reservedStock(garden, kind, species, exceptHex));
}

export function stagePlanting(garden, key, kind, species, quantity, heading = 0) {
  checkSpecies(kind, species);
  if (!garden.hexes[key]) throw new Error('Choose an existing garden hex.');
  if (garden.objects[key] || garden.pending?.[key]) throw new Error('This hex already has a living or germinating occupant.');
  const available = availableToStage(garden, kind, species, key);
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > available) {
    throw new Error(`Choose 1–${available} available ${kind === 'plant' ? 'Seeds' : 'Spores'}.`);
  }
  if (kind === 'fungus' && (!Number.isInteger(heading) || heading < 0 || heading > 5)) {
    throw new Error('Spore direction must be one of the six hex headings.');
  }
  return { ...garden, staged: { ...garden.staged, [key]: { kind, species, quantity,
    ...(kind === 'fungus' ? { heading } : {}) } } };
}

export function unstagePlanting(garden, key) {
  if (!garden.staged?.[key]) return garden;
  const staged = { ...garden.staged };
  delete staged[key];
  return { ...garden, staged };
}

export function moveStagedPlanting(garden, from, to) {
  const entry = garden.staged?.[from];
  if (!entry) throw new Error('No uncommitted Seeds or Spores on that hex.');
  if (!garden.hexes[to] || garden.objects[to] || garden.pending?.[to] || garden.staged?.[to]) {
    throw new Error('Choose an empty destination hex for the staged planting.');
  }
  const staged = { ...garden.staged };
  delete staged[from];
  staged[to] = entry;
  return { ...garden, staged };
}

export function applyStaging(garden, random = Math.random) {
  const placements = Object.entries(garden.staged || {}).sort(([a], [b]) => a.localeCompare(b));
  if (!placements.length) throw new Error('Stage Seeds or Spores before pressing Apply.');
  if (typeof random !== 'function') throw new Error('Expected a random number source.');
  const totals = {};
  for (const [key, entry] of placements) {
    checkSpecies(entry.kind, entry.species);
    if (!garden.hexes[key] || garden.objects[key] || garden.pending?.[key]) {
      throw new Error(`Hex ${key} is no longer empty. Move or remove the staged planting.`);
    }
    if (!Number.isSafeInteger(entry.quantity) || entry.quantity < 1) throw new Error(`Invalid amount on ${key}.`);
    const id = `${entry.kind}:${entry.species}`;
    totals[id] = (totals[id] || 0) + entry.quantity;
    if (totals[id] > stockFor(garden, entry.kind, entry.species)) {
      throw new Error(`Not enough ${entry.species} ${entry.kind === 'plant' ? 'Seeds' : 'Spores'} for this plan.`);
    }
  }
  // Validate every site's ecological requirements before making *any* roll.
  // A pending result never influences another attempt in the same Apply.
  const evaluationGarden = { ...garden, staged: {}, pending: garden.pending || {} };
  for (const [key, entry] of placements) {
    if (entry.kind === 'fungus' && FUNGI[entry.species].habitat === 'dependent') {
      // Calls the canonical sowing requirement, including Mycelial habitat.
      sowFungus(evaluationGarden, key, entry.species, entry.quantity, () => 1, entry.heading ?? 0);
    }
  }
  const seeds = { ...garden.inventory.seeds };
  const spores = { ...garden.inventory.spores };
  const pending = { ...garden.pending };
  const details = [];
  const environment = calculateEnvironment(evaluationGarden);
  const cultivation = calculateCultivation(evaluationGarden, environment);
  let grimoire = garden.grimoire;
  for (const [key, entry] of placements) {
    const attempt = entry.kind === 'plant'
      ? sowPlant(evaluationGarden, key, entry.species, entry.quantity, random)
      : sowFungus(evaluationGarden, key, entry.species, entry.quantity, random, entry.heading ?? 0);
    const stock = entry.kind === 'plant' ? seeds : spores;
    stock[entry.species] -= entry.quantity;
    pending[key] = { ...entry, success: attempt.success,
      readyAt: (garden.clockHours || 0) + STAGING_TUNING.germinationRevealHours };
    if (entry.kind === 'plant') {
      for (const effect of cultivation[key] || []) {
        if (effect.kind !== 'germination' || !FUNGI[effect.species]) continue;
        const effective = effect.amount * effectCompatibility(PLANTS[entry.species], 'germination',
          environment.conditions[key], effect.amount, 0);
        if (Math.abs(effective) > 1e-9) {
          grimoire = observeFungalAction(grimoire, entry.species, effect.species, 'germination', effective);
        }
      }
    }
    details.push({ key, kind: entry.kind, species: entry.species, quantity: entry.quantity });
  }
  return { garden: ensureInventorySlots({ ...garden, inventory: { ...garden.inventory, seeds, spores },
    grimoire, staged: {}, pending }), details };
}

export function revealGerminations(garden) {
  const ready = Object.entries(garden.pending || {}).filter(([, entry]) => entry.readyAt <= (garden.clockHours || 0));
  if (!ready.length) return { garden, events: [] };
  let current = garden;
  const events = [];
  for (const [key, entry] of ready.sort(([a], [b]) => a.localeCompare(b))) {
    const pending = { ...current.pending };
    delete pending[key];
    current = { ...current, pending };
    if (entry.success) {
      current = placeObject(current, key, entry.kind === 'plant' ? makePlant(entry.species)
        : makeFungus(entry.species, entry.heading ?? 0));
      if (entry.kind === 'plant') current = { ...current, grimoire: revealPlant(current.grimoire, entry.species) };
      events.push(`${entry.species} germinated on hex ${key}.`);
    } else {
      events.push(`${entry.species} failed to germinate on hex ${key}.`);
    }
  }
  return { garden: current, events };
}
