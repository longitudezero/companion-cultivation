import { calculateCultivation } from './cultivation.js';

// Flowers §73. Each contact group is an OR; all groups are required together
// (AND). A named living fungus qualifies via environmental OR cultivation
// footprint, irrespective of whether a development bonus is stage-eligible.
const route = (into, conditions, contacts, hours) => ({ into, conditions, contacts, hours });
export const FLOWER_TRANSFORMATIONS = Object.freeze({
  Daisydaze: [
    route('Charmomile', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, [['Lanterncap', 'Goldgill']], 12),
    route('Lavendream', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Veilcap', 'Gloamclock']], 20),
    route('Poppycock', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' }, [['Emberbell', 'Tickbolete']], 16),
  ],
  Charmomile: [
    route('Daisyspell', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' }, [['Prismorel', 'Glimmergill']], 12),
    route('Marigloom', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' }, [['Echomorel', 'Fogdial']], 24),
  ],
  Lavendream: [
    route('Lavendread', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dark' }, [['Chillanterelle', 'Brookrill']], 22),
    route('Orchidemon', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' }, [['Glimmergill'], ['Mistruffle']], 32),
  ],
  Daisyspell: [{
    into: 'Orchidemon', sequence: 'dusk-to-bright', hours: 10,
    preparation: { conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
      contacts: [['Veilcap', 'Fogdial']] },
    completion: { conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' },
      contacts: [['Prismorel', 'Glimmergill']], withinHours: 8 },
  }],
  Lavendread: [route('Dream Poppy', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' }, [['Echomorel', 'Brookrill']], 20)],
  Poppycock: [route('Dream Poppy', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Veilcap', 'Gloamclock']], 18)],
  Marigloom: [route('Rosewraith', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' }, [['Echomorel'], ['Fogdial']], 18)],
  'Dream Poppy': [route('Rosewraith', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Duskleaf'], ['Mistruffle']], 24)],
});

export const emptySequence = () => ({ phase: 'preparing', preparedHours: 0, windowHours: 0 });

export function matchesConditions(actual, expected) {
  return Boolean(actual) && Object.entries(expected).every(([property, value]) => actual[property] === value);
}

export function namedFungalContacts(garden, key, environment, cultivation = calculateCultivation(garden, environment)) {
  const found = new Set();
  for (const contributors of Object.values(environment.modifiers[key] || {})) {
    for (const effect of contributors) {
      const fungus = garden.objects[effect.source];
      if (fungus?.type === 'fungus') found.add(fungus.species);
    }
  }
  for (const effect of cultivation[key] || []) {
    const fungus = garden.objects[effect.source];
    if (fungus?.type === 'fungus') found.add(fungus.species);
  }
  return found;
}

export function matchesNamedGroups(groups, reached) {
  return groups.every(alternatives => alternatives.some(name => reached.has(name)));
}

export function matchesSequencePhase(garden, key, phase, environment, cultivation) {
  return matchesConditions(environment.conditions[key], phase.conditions)
    && matchesNamedGroups(phase.contacts, namedFungalContacts(garden, key, environment, cultivation));
}

export function advanceSequenceHour(garden, key, recipe, environment, cultivation) {
  const previous = garden.objects[key].transformationSequence?.[recipe.into] || emptySequence();
  if (previous.phase === 'crossing') {
    const windowHours = previous.windowHours + 1;
    if (!matchesConditions(environment.conditions[key], { Moisture: 'Damp', Temperature: 'Temperate' })
      || environment.conditions[key].Illumination === 'Dim' || windowHours > recipe.completion.withinHours) {
      return { state: emptySequence(), complete: false };
    }
    if (matchesSequencePhase(garden, key, recipe.completion, environment, cultivation)) {
      return { state: emptySequence(), complete: true };
    }
    return { state: { ...previous, windowHours }, complete: false };
  }
  if (!matchesSequencePhase(garden, key, recipe.preparation, environment, cultivation)) {
    return { state: emptySequence(), complete: false };
  }
  if (previous.phase === 'ready') return { state: previous, complete: false };
  const preparedHours = previous.preparedHours + 1;
  return { state: { phase: preparedHours >= recipe.hours ? 'ready' : 'preparing',
    preparedHours, windowHours: 0 }, complete: false };
}

// A player edit or biological event may leave Dim and finish the route at the
// same timestamp. No zero-time clock accrual is permitted.
export function reconcileSequence(garden, key, recipe, state, environment, cultivation, previousEnvironment = null) {
  const actual = environment.conditions[key];
  const leftDim = previousEnvironment?.conditions[key]?.Illumination === 'Dim'
    && actual.Illumination !== 'Dim';
  if (state.phase === 'ready' && leftDim
    && matchesConditions(actual, { Moisture: 'Damp', Temperature: 'Temperate' })) {
    state = { phase: 'crossing', preparedHours: state.preparedHours, windowHours: 0 };
  } else if (state.phase !== 'crossing'
    && !matchesSequencePhase(garden, key, recipe.preparation, environment, cultivation)) {
    state = emptySequence();
  }
  if (state.phase === 'crossing') {
    if (!matchesConditions(actual, { Moisture: 'Damp', Temperature: 'Temperate' })
      || actual.Illumination === 'Dim' || state.windowHours > recipe.completion.withinHours) {
      return { state: emptySequence(), complete: false };
    }
    if (matchesSequencePhase(garden, key, recipe.completion, environment, cultivation)) {
      return { state, complete: true };
    }
  }
  return { state, complete: false };
}
