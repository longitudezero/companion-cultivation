import { emptySequence, matchesConditions, matchesSequencePhase } from './flower-transformations.js';

// Spices §76: eleven approved Plant-owned routes. Contacts require living
// footprints; opposing light MUST additionally be emitted by the selected
// positive/negative fungal groups on the target's environmental footprint.
const route = (into, conditions, contacts, hours, opposingLight = false) => ({
  into, conditions, contacts, hours, ...(opposingLight ? { opposingLight: true } : {}),
});
export const SPICES_TRANSFORMATIONS = Object.freeze({
  Thymely: [
    route('Sunrice', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' },
      [['Glimmergill', 'Lanterncap']], 12),
    route('Moonrice', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
      [['Veilcap', 'Fogdial']], 14),
    route('Shadow Onion', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dark' },
      [['Hushroom', 'Gloamclock']], 16),
  ],
  Sunrice: [
    route('Starberry', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' },
      [['Prismorel', 'Goldgill']], 18),
    route("Pum'king", { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' },
      [['Glimmergill', 'Goldgill'], ['Veilcap', 'Fogdial']], 24, true),
  ],
  Moonrice: [
    route('Thymekeeper', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
      [['Gloamclock', 'Tidegill']], 18),
    route('Ghost Rice', { Moisture: 'Damp', Temperature: 'Cold', Illumination: 'Dark' },
      [['Quickshade', 'Duskleaf']], 20),
  ],
  'Shadow Onion': [route('Dillusion',
    { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' },
    [['Lanterncap', 'Goldgill']], 18)],
  Starberry: [route('Glass Apple',
    { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Bright' },
    [['Prismorel'], ['Mistruffle']], 28)],
  'Ghost Rice': [{
    into: 'Glass Apple', sequence: 'dark-to-lit', hours: 12,
    preparation: { conditions: { Moisture: 'Damp', Temperature: ['Temperate', 'Cold'],
      Illumination: 'Dark' }, contacts: [['Gloamclock', 'Duskleaf']] },
    completion: { conditions: { Moisture: 'Damp', Temperature: ['Temperate', 'Cold'],
      Illumination: 'Lit' }, contacts: [['Prismorel', 'Lanterncap']], withinHours: 8 },
  }],
  Dillusion: [route("Pum'king",
    { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Lit' },
    [['Lanterncap', 'Prismorel'], ['Hushroom', 'Gloamclock']], 22, true)],
});

// Named contact may be supplied through either cultivation or environmental
// coverage, but the special light predicate accepts only real Luminous
// environmental emission entries FROM the recipe's two named fungal groups.
// Ambient Sources and adjacency cannot impersonate either fungus.
export function matchesOpposingLight(garden, key, recipe, environment) {
  const contributions = environment.modifiers[key]?.Illumination || [];
  const fromGroup = (group, sign) => contributions.some(entry =>
    entry.kind === 'Luminous' && entry.modifier * sign > 0
      && garden.objects[entry.source]?.type === 'fungus'
      && group.includes(garden.objects[entry.source].species));
  return fromGroup(recipe.contacts[0], 1) && fromGroup(recipe.contacts[1], -1);
}

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
