// Aquatic §69: fourteen approved Plant-owned routes. Contact alternatives use
// real living-fungus reach, including Waterborne Flooded connectivity.
const route = (into, conditions, contacts, hours) => ({ into, conditions, contacts, hours });
// A flooded specialist becomes Kelpless after continuous time in Dry or Damp.
// Unlike ordinary routes, this has no Fungus-contact requirement.
const floodLoss = hours => ({ into: 'Kelpless', conditions: { Moisture: ['Dry', 'Damp'] },
  contacts: [], environmentalOnly: true, hours });
export const AQUATIC_TRANSFORMATIONS = Object.freeze({
  'Algea': [
    route('Kelpfull', { Moisture: 'Flooded', Temperature: 'Temperate' }, [['Dewmender']], 12),
    route('Sunken Lotus', { Moisture: 'Flooded', Temperature: 'Cold' }, [['Rilllace']], 16),
    route('Wild Watercress', { Moisture: 'Damp', Temperature: 'Temperate' }, [['Rainmorel']], 10),
  ],
  Kelpfull: [
    route('Kelpergeist', { Moisture: 'Flooded', Illumination: 'Dark' }, [['Hushroom']], 20),
    floodLoss(96), // 8 minutes at one garden hour per five real seconds.
  ],
  Kelpergeist: [
    route('Starlotus', { Moisture: 'Flooded', Temperature: 'Cold', Illumination: 'Dim' }, [['Frostfolio'], ['Mistruffle']], 28),
    floodLoss(48), // 4 real minutes.
  ],
  Kelpless: [route('Wild Watercress', { Moisture: 'Damp', Temperature: 'Temperate' }, [['Dewmender']], 12)],
  'Sunken Lotus': [route('Moonlit Lotus', { Moisture: 'Flooded', Illumination: 'Dim' }, [['Mistruffle']], 16)],
  'Moonlit Lotus': [
    {
      into: 'Starlotus', sequence: 'flood-to-damp', hours: 24,
      preparation: { conditions: { Moisture: 'Flooded', Temperature: 'Cold', Illumination: 'Dim' },
        contacts: [['Rainmorel']] },
      completion: { conditions: { Moisture: 'Damp' } },
    },
    route('Pearlily', { Moisture: 'Flooded', Temperature: 'Temperate', Illumination: 'Lit' }, [['Prismorel'], ['Dewmender']], 24),
  ],
  'Wild Watercress': [
    route('Silvercress', { Moisture: 'Flooded', Temperature: 'Temperate' }, [['Rainmorel']], 10),
    route('Cresscent', { Moisture: 'Damp', Illumination: 'Dim' }, [['Mistruffle']], 12),
  ],
  Cresscent: [route('Pearlily', { Moisture: 'Damp', Illumination: 'Lit' }, [["Sim'mushro'dim"]], 12)],
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
