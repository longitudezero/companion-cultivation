// Aquatic §69: fourteen approved Plant-owned routes. Contact alternatives use
// real living-fungus reach, including Waterborne Flooded connectivity.
const route = (into, conditions, contacts, hours) => ({ into, conditions, contacts, hours });
export const AQUATIC_TRANSFORMATIONS = Object.freeze({
  'Aquatic Base': [
    route('Kelpfull', { Moisture: 'Flooded', Temperature: 'Temperate' }, [['Dewmender', 'Mistruffle']], 12),
    route('Sunken Lotus', { Moisture: 'Flooded', Temperature: 'Cold' }, [['Tidegill', 'Rilllace']], 16),
    route('Wild Watercress', { Moisture: 'Damp', Temperature: 'Temperate' }, [['Dewmender', 'Mistruffle']], 10),
  ],
  Kelpfull: [
    route('Kelpergeist', { Moisture: 'Flooded', Illumination: 'Dark' }, [['Veilcap', 'Fogdial']], 20),
    route('Kelpless', { Moisture: ['Dry', 'Damp'] }, [['Droughtcap', 'Crumblecap']], 16),
  ],
  Kelpergeist: [
    route('Starlotus', { Moisture: 'Flooded', Temperature: 'Cold', Illumination: 'Dim' }, [['Tidegill', 'Siltgill']], 28),
    route('Kelpless', { Moisture: ['Dry', 'Damp'] }, [], 18),
  ],
  Kelpless: [route('Wild Watercress', { Moisture: 'Damp', Temperature: 'Temperate' }, [['Dewmender', 'Mistruffle']], 12)],
  'Sunken Lotus': [route('Moonlit Lotus', { Moisture: 'Flooded', Illumination: 'Dim' }, [['Tidegill', 'Rilllace']], 16)],
  'Moonlit Lotus': [
    {
      into: 'Starlotus', sequence: 'flood-to-damp', hours: 24,
      preparation: { conditions: { Moisture: 'Flooded', Temperature: 'Cold', Illumination: 'Dim' },
        contacts: [['Tidegill', 'Rilllace']] },
      completion: { conditions: { Moisture: 'Damp' } },
    },
    route('Pearlily', { Moisture: 'Flooded', Temperature: 'Temperate', Illumination: 'Lit' }, [['Dewmender', 'Mistruffle']], 24),
  ],
  'Wild Watercress': [
    route('Silvercress', { Moisture: 'Flooded', Temperature: 'Temperate' }, [['Dewmender', 'Mistruffle']], 10),
    route('Cresscent', { Moisture: 'Damp', Illumination: 'Dim' }, [['Tidegill', 'Glimmergill']], 12),
  ],
  Cresscent: [route('Pearlily', { Moisture: 'Damp', Illumination: 'Lit' }, [['Dewmender', 'Mistruffle']], 12)],
});

export const emptyAquaticSequence = () => ({ phase: 'preparing', preparedHours: 0 });

export function advanceAquaticSequenceHour(garden, key, recipe, environment, cultivation, matchesPhase) {
  const previous = garden.objects[key].transformationSequence?.[recipe.into] || emptyAquaticSequence();
  if (!matchesPhase(garden, key, recipe.preparation, environment, cultivation)) return emptyAquaticSequence();
  const preparedHours = Math.min(recipe.hours, previous.preparedHours + 1);
  return { phase: preparedHours >= recipe.hours ? 'ready' : 'preparing', preparedHours };
}

// Evaluate the BEFORE snapshot, not current Waterborne contact: draining can
// simultaneously sever its flooded path. An arbitrary earlier Damp state or a
// climate shift without Flooded→Damp is never sufficient.
export function reconcileAquaticSequence(garden, previousGarden, key, recipe, state,
  environment, cultivation, previousEnvironment, previousCultivation, matchesPhase) {
  const before = previousEnvironment?.conditions[key];
  const after = environment.conditions[key];
  const draining = before?.Moisture === 'Flooded' && after?.Moisture === 'Damp';
  const prepared = previousGarden?.objects[key]?.species === 'Moonlit Lotus'
    && matchesPhase(previousGarden, key, recipe.preparation, previousEnvironment, previousCultivation);
  if (draining && state.phase === 'ready' && state.preparedHours >= recipe.hours && prepared) {
    return { state, complete: true };
  }
  if (!matchesPhase(garden, key, recipe.preparation, environment,
    cultivation)) return { state: emptyAquaticSequence(), complete: false };
  return { state, complete: false };
}
