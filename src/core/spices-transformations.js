import { emptySequence, matchesConditions, matchesSequencePhase } from './flower-transformations.js';

// V9: eleven Plant-owned routes with named contacts and resolved-state checks.
// Opposite-sign fungal emissions are no longer a special prerequisite.
const route = (into, conditions, contacts, hours) => ({ into, conditions, contacts, hours });
export const SPICES_TRANSFORMATIONS = Object.freeze({
  Thymely: [
    route('Sunrice', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' },
      [['Prismorel']], 12),
    route('Moonrice', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
      [['Mistruffle']], 14),
    route('Shadow Onion', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dark' },
      [['Hushroom']], 16),
  ],
  Sunrice: [
    route('Starberry', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' },
      [['Prismorel'], ['Emberbolete']], 18),
    route("Pum'king", { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' },
      [['Prismorel'], ['Mistruffle']], 24),
  ],
  Moonrice: [
    route('Thymekeeper', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dim' },
      [['Rilllace', 'Frostfolio']], 18),
    route('Ghost Rice', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dark' },
      [['Hushroom'], ['Rilllace']], 20),
  ],
  'Shadow Onion': [route('Dillusion',
    { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' },
    [['Rainmorel']], 18)],
  Starberry: [route('Glass Apple',
    { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' },
    [['Rushroom'], ['Mistruffle']], 28)],
  'Ghost Rice': [{
    into: 'Glass Apple', sequence: 'dark-to-lit', hours: 12,
    preparation: { conditions: { Moisture: 'Damp', Temperature: ['Temperate', 'Cold'],
      Illumination: 'Dark' }, contacts: [['Hushroom']] },
    completion: { conditions: { Moisture: 'Damp', Temperature: ['Temperate', 'Cold'],
      Illumination: 'Lit' }, contacts: [['Prismorel']], withinHours: 8 },
  }],
  Dillusion: [route("Pum'king",
    { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Lit' },
    [['Rushroom'], ['Hushroom']], 22)],
});

const allowedCrossing = conditions => matchesConditions(conditions,
  { Moisture: 'Damp', Temperature: ['Temperate', 'Cold'] });

export function advanceSpicesSequenceHour(garden, key, recipe, environment, cultivation) {
  const previous = garden.objects[key].transformationSequence?.[recipe.into] || emptySequence();
  if (previous.phase === 'crossing') {
    const windowHours = previous.windowHours + 1;
    if (!allowedCrossing(environment.conditions[key]) || windowHours > recipe.completion.withinHours
      || environment.conditions[key].Illumination === 'Dark') {
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

export function reconcileSpicesSequence(garden, key, recipe, savedState, environment, cultivation,
  previousEnvironment = null) {
  let state = savedState;
  const actual = environment.conditions[key];
  const leftDark = previousEnvironment?.conditions[key]?.Illumination === 'Dark'
    && actual.Illumination !== 'Dark';
  if (state.phase === 'ready' && leftDark && allowedCrossing(actual)) {
    state = { phase: 'crossing', preparedHours: state.preparedHours, windowHours: 0 };
  } else if (state.phase !== 'crossing'
    && !matchesSequencePhase(garden, key, recipe.preparation, environment, cultivation)) {
    state = emptySequence();
  }
  if (state.phase === 'crossing') {
    if (!allowedCrossing(actual) || actual.Illumination === 'Dark'
      || state.windowHours > recipe.completion.withinHours) {
      return { state: emptySequence(), complete: false };
    }
    if (matchesSequencePhase(garden, key, recipe.completion, environment, cultivation)) {
      return { state, complete: true };
    }
  }
  return { state, complete: false };
}

export function spicesSequenceStatus(garden, key, recipe, state, environment, cultivation) {
  const crossing = state.phase === 'crossing';
  return { ...recipe, phase: state.phase,
    elapsed: crossing ? state.windowHours : state.preparedHours,
    hours: crossing ? recipe.completion.withinHours : recipe.hours,
    eligible: crossing ? allowedCrossing(environment.conditions[key])
      : matchesSequencePhase(garden, key, recipe.preparation, environment, cultivation) };
}
