import { PLANTS, productionSchedule, stagePlanting, transformationStatus } from '../core/index.js';

const clamp = value => Math.max(0, Math.min(200, value));

// This restores proposals only. Live biology, spent stock, pending rolls and
// inventory arrangements always come from the current garden, never a snapshot.
export function restoreStagingPlan(garden, snapshot) {
  let next = { ...garden, staged: {} };
  for (const [key, entry] of Object.entries(snapshot)) {
    next = stagePlanting(next, key, entry.kind, entry.species, entry.quantity, entry.heading ?? 0);
  }
  return next;
}

export function harvestLandmarks(species, contacts = [], conditions = null) {
  const profile = PLANTS[species];
  if (!profile) return [];
  const schedule = productionSchedule(species, contacts, conditions);
  const marker = (kind, from, to = from) => ({ kind, from: clamp(from), to: clamp(to) });
  const leaves = profile.leafPeak > 0 ? profile.leafPeaks
    ? profile.leafPeaks.map(([, peak]) => marker('leaf', peak + schedule.leafShift))
    : profile.leafPlateau
      ? [marker('leaf', profile.leafPlateau[1] + schedule.leafShift, profile.leafPlateau[2] + schedule.leafShift)]
      : [marker('leaf', schedule.peak)] : [];
  const seeds = profile.seeds > 0
    ? [marker('seed', profile.seedCurve
      ? profile.seedCurve.find(([, value]) => value === Math.max(...profile.seedCurve.map(([, amount]) => amount)))[0] + schedule.seedShift
      : schedule.seedTo, 200)] : [];
  return [...leaves, ...seeds, ...(species === 'Bamboozled' ? [marker('trophy', 100, 200)] : [])];
}

export const itemCategory = item => ['seed', 'spore', 'leaf'].includes(item.type) ? item.type : 'item';

// Return only public presentation data. Unknown targets/timers never enter DOM props.
export function transformationClue(garden, key, environment, cultivation) {
  const plant = garden.objects[key];
  if (plant?.type !== 'plant') return { active: false, learned: [] };
  const active = transformationStatus(garden, key, environment, cultivation).filter(route =>
    route.elapsed > 0 || ['ready', 'armed', 'crossing'].includes(route.phase));
  return { active: active.length > 0, learned: active.filter(route => garden.grimoire?.transformations
    ?.some(record => record.from === plant.species && record.into === route.into))
    .map(route => ({ into: route.into, progress: Math.min(100, route.elapsed / route.hours * 100) })) };
}
