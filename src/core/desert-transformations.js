// Desert §74: thirteen approved Plant-owned routes. Timed recipes use actual
// named living Fungus footprints; recoveries inspect OLD Temperature, newly
// resolved Conditions/contact, and the just-completed Plant exposure clock.
const route = (into, conditions, contacts, hours) => ({ into, conditions, contacts, hours });
const recovery = (into, sequence, hours, conditions, contacts, early = false) => ({
  into, sequence, hours, early,
  preparation: { conditions: { Temperature: sequence === 'heat-to-warm' ? 'Hot' : 'Freezing' } },
  completion: { conditions, contacts },
});

export const DESERT_TRANSFORMATIONS = Object.freeze({
  Jadeheart: [
    route('Ember Aloe', { Moisture: 'Damp', Temperature: 'Hot', Illumination: 'Lit' },
      [['Emberbolete']], 18),
    route('Moonjade', { Moisture: 'Damp', Temperature: 'Freezing', Illumination: 'Dim' },
      [['Rilllace', 'Frostfolio']], 20),
    route('Cactopus', { Moisture: 'Dry', Temperature: 'Warm', Illumination: 'Lit' },
      [['Droughtcap']], 16),
  ],
  'Ember Aloe': [
    recovery('Ashen Rose', 'heat-to-warm', 36, { Temperature: 'Warm' },
      [['Rilllace']], true),
    recovery('Aloemancer', 'heat-to-warm', 36, { Temperature: 'Warm' },
      [['Rilllace']]),
  ],
  'Ashen Rose': [route('Sandrose',
    { Moisture: 'Dry', Temperature: 'Temperate', Illumination: 'Dim' },
    [["Sim'mushro'dim"]], 12)],
  Sandrose: [route('Cactopus', { Moisture: 'Dry', Temperature: 'Hot', Illumination: 'Lit' },
    [['Emberbolete', 'Siltgill']], 18)],
  Moonjade: [
    recovery('Jadewisp', 'freeze-to-cold', 48,
      { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' },
      [['Dewmender']]),
    recovery('Pearadox', 'freeze-to-cold', 48,
      { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Lit' },
      [['Emberbolete'], ['Mistruffle']]),
  ],
  Cactopus: [
    route('Cactaclysm', { Moisture: 'Dry', Temperature: 'Hot', Illumination: 'Bright' },
      [['Siltgill'], ['Prismorel']], 24),
    route('Pearadox', { Moisture: 'Damp', Temperature: 'Hot', Illumination: 'Dim' },
      [['Mistruffle'], ['Rainmorel']], 20),
  ],
  Aloemancer: [route('Mirage Rose',
    { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
    [['Emberbolete'], ['Rilllace']], 24)],
  Jadewisp: [route('Mirage Rose',
    { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' },
    [['Prismorel'], ['Hushroom']], 24)],
});

export const isDesertRecovery = recipe =>
  ['heat-to-warm', 'freeze-to-cold'].includes(recipe.sequence);

// These recipes have NO preparation object to save. The canonical continuous
// Hot/Freezing exposure is already on the living Plant and survives migration.
export function desertRecoveryStatus(plant, recipe, environment, key) {
  const heat = recipe.sequence === 'heat-to-warm';
  const elapsed = plant.exposure?.[heat ? 'Hot' : 'Freezing'] || 0;
  const eligible = environment.conditions[key]?.Temperature === (heat ? 'Hot' : 'Freezing')
    && (heat ? recipe.early ? elapsed < recipe.hours : elapsed >= recipe.hours
      : elapsed >= recipe.hours);
  return { ...recipe, elapsed, eligible,
    phase: eligible ? heat && recipe.early ? 'early-recovery' : 'ready' : 'preparing' };
}

// Runs only when a real edit or the end of a simulated hour changes the
// resolved environment. Contacts are inspected AFTER the event, never by
// preserved adjacency or from a fungus that has just died.
export function completedDesertRecovery(garden, previousGarden, key, recipes,
  environment, cultivation, previousEnvironment, matchesConditions, namedContacts, matchesGroups) {
  const current = garden.objects[key];
  if (!previousGarden || previousGarden.objects[key]?.species !== current.species) return null;
  const before = previousEnvironment?.conditions[key];
  const after = environment.conditions[key];
  if (!before || !after) return null;
  const reached = namedContacts(garden, key, environment, cultivation);
  const matching = recipes.filter(recipe => {
    if (!isDesertRecovery(recipe)) return false;
    const heat = recipe.sequence === 'heat-to-warm';
    if (before.Temperature !== (heat ? 'Hot' : 'Freezing')
      || after.Temperature !== (heat ? 'Warm' : 'Cold')) return false;
    const elapsed = current.exposure?.[heat ? 'Hot' : 'Freezing'] || 0;
    if (heat ? (recipe.early ? elapsed >= recipe.hours : elapsed < recipe.hours)
      : elapsed < recipe.hours) return false;
    return matchesConditions(after, recipe.completion.conditions)
      && matchesGroups(recipe.completion.contacts, reached);
  });
  if (matching.length > 1) throw new Error(`Overlapping Desert recovery events on hex ${key}.`);
  return matching[0]?.into || null;
}
