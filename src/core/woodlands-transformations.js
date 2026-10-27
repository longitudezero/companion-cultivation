// Woodlands §71: thirteen approved routes. Named fungus groups mean AND of ORs.
const route = (into, conditions, contacts, hours, extra = {}) =>
  ({ into, conditions, contacts, hours, ...extra });

export const WOODLANDS_TRANSFORMATIONS = Object.freeze({
  'Woodlands Base': [
    route('Bamboom', { Moisture: 'Damp', Temperature: 'Warm', Illumination: 'Lit' }, [['Tickbolete', 'Emberbell']], 14),
    route('Mandrabra', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, [['Goldgill', 'Lanterncap']], 20),
    route('Tanglethorn', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Fogdial', 'Veilcap']], 12),
  ],
  Bamboom: [route('Bamboozeling', { Moisture: 'Damp', Temperature: 'Warm' }, [['Tickbolete', 'Emberbell']], 24)],
  Bamboozeling: [route('Bamboozled', { Moisture: 'Damp', Temperature: 'Warm' }, [['Tickbolete', 'Emberbell']], 16)],
  Tanglethorn: [
    route('Mistlefoe', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Hushroom', 'Fogdial']], 16),
    route('Bramblewraith', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, [['Lanterncap', 'Goldgill']], 28),
  ],
  Mistlefoe: [
    {
      into: 'Mandrabra', sequence: 'mistruffle-departure', hours: 12, beforeHours: 20,
      preparation: { conditions: { Moisture: 'Damp', Illumination: 'Dim' },
        contacts: [['Mistruffle'], ['Fogdial', 'Veilcap']] },
      completion: { conditions: { Moisture: 'Damp', Illumination: 'Dim' },
        retain: [['Fogdial', 'Veilcap']], remove: 'Mistruffle' },
    },
    route('Mistlewoe', { Moisture: 'Damp', Illumination: 'Dim' }, [['Mistruffle'], ['Fogdial', 'Veilcap']], 20),
  ],
  Mistlewoe: [route('Tanglethorn', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, [['Dewmender', 'Mistruffle']], 12)],
  Mandrabra: [
    route('Mandrakadabra', { Moisture: 'Damp', Illumination: 'Bright' }, [['Rushroom', 'Siltgill']], 12),
    route('Mandrakazam', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' }, [['Hushroom', 'Gloamclock']], 24,
      { noMycelial: true }),
  ],
  Mandrakadabra: [route('Mandrakazam', { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Dim' },
    [['Hushroom', 'Gloamclock']], 24, { noMycelial: true })],
});

export const emptyWoodlandsSequence = () => ({ phase: 'preparing', preparedHours: 0 });

export function advanceWoodlandsSequenceHour(garden, key, recipe, environment, cultivation, matchesPhase) {
  const previous = garden.objects[key].transformationSequence?.[recipe.into] || emptyWoodlandsSequence();
  if (!matchesPhase(garden, key, recipe.preparation, environment, cultivation)) return emptyWoodlandsSequence();
  const preparedHours = Math.min(recipe.beforeHours, previous.preparedHours + 1);
  return { phase: preparedHours >= recipe.hours && preparedHours < recipe.beforeHours ? 'armed' : 'preparing',
    preparedHours };
}

// The contact must truly disappear BETWEEN hours 12 and 20; replacing the
// fungus, severing its zone, or a selective Blocker are equally valid. The
// retained contact and Damp/Dim must still qualify AFTER the same edit.
export function reconcileWoodlandsSequence(garden, previousGarden, key, recipe, state,
  environment, cultivation, previousEnvironment, previousCultivation,
  matchesPhase, matchesConditions, namedContacts, matchesGroups) {
  const previous = previousGarden?.objects[key]?.species === 'Mistlefoe';
  const beforeEligible = previous && matchesPhase(previousGarden, key, recipe.preparation,
    previousEnvironment, previousCultivation);
  const afterContacts = namedContacts(garden, key, environment, cultivation);
  const afterEligible = matchesConditions(environment.conditions[key], recipe.completion.conditions)
    && matchesGroups(recipe.completion.retain, afterContacts) && !afterContacts.has(recipe.completion.remove);
  if (beforeEligible && afterEligible && state.preparedHours >= recipe.hours
    && state.preparedHours < recipe.beforeHours) return { complete: true, state };
  if (!matchesPhase(garden, key, recipe.preparation, environment, cultivation)) {
    return { complete: false, state: emptyWoodlandsSequence() };
  }
  return { complete: false, state };
}
