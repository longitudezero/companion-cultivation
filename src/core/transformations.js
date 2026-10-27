import { calculateEnvironment } from './simulation.js';
import { calculateCultivation } from './cultivation.js';
import { makePlant } from './species.js';
import { isMycelial } from './mycelial.js';
import { FLOWER_TRANSFORMATIONS, namedFungalContacts, matchesConditions, matchesNamedGroups,
  matchesSequencePhase, emptySequence, advanceSequenceHour, reconcileSequence } from './flower-transformations.js';
import { AQUATIC_TRANSFORMATIONS, emptyAquaticSequence, advanceAquaticSequenceHour,
  reconcileAquaticSequence } from './aquatic-transformations.js';
import { WOODLANDS_TRANSFORMATIONS, emptyWoodlandsSequence, advanceWoodlandsSequenceHour,
  reconcileWoodlandsSequence } from './woodlands-transformations.js';

export { FLOWER_TRANSFORMATIONS, namedFungalContacts } from './flower-transformations.js';
export { AQUATIC_TRANSFORMATIONS } from './aquatic-transformations.js';
export { WOODLANDS_TRANSFORMATIONS } from './woodlands-transformations.js';

// Ingredients §67. Conditions are the resolved Conditions on the Plant hex;
// emission is an actually reaching environmental contribution from a living
// Fungus (never a freely placed Source or an unrelated cultivation Effect).
// Flowers §73 adds named contacts (any existing cultivation OR environmental
// footprint) and a single phase-driven transition recipe.
export const TRANSFORMATIONS = Object.freeze({
  Potato: Object.freeze([
    { into: 'Rice', conditions: { Moisture: 'Flooded' }, emission: 'Wetting', hours: 12 },
    { into: 'Carrot', conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, emission: 'Brightening', hours: 10 },
    { into: 'Onion', conditions: { Moisture: 'Dry', Temperature: 'Cold' }, emission: 'Drying', hours: 14 },
    { into: 'Apple', conditions: { Moisture: 'Damp', Temperature: 'Cold' }, emission: 'Cooling', hours: 20 },
    { into: 'Pumpkin', conditions: { Moisture: 'Damp', Temperature: 'Warm' }, emission: 'Warming', hours: 24 },
    { into: 'Strawberry', conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' }, emission: 'Brightening', hours: 16 },
  ]),
  ...Object.fromEntries(Object.entries(FLOWER_TRANSFORMATIONS)
    .map(([species, recipes]) => [species, Object.freeze(recipes)])),
  ...Object.fromEntries(Object.entries(AQUATIC_TRANSFORMATIONS)
    .map(([species, recipes]) => [species, Object.freeze(recipes)])),
  ...Object.fromEntries(Object.entries(WOODLANDS_TRANSFORMATIONS)
    .map(([species, recipes]) => [species, Object.freeze(recipes)])),
});

function transformedPlant(from, recipe) {
  return makePlant(recipe.into, recipe.into === 'Starlotus'
    ? from.species === 'Moonlit Lotus' ? 'Damp' : 'Flooded' : null);
}

export function matchesTransformation(garden, key, recipe, environment, cultivation = null) {
  if (recipe.sequence) return false; // stateful event sequence, not a static match
  const conditions = environment.conditions[key];
  if (!matchesConditions(conditions, recipe.conditions)) return false;
  if (recipe.noMycelial && isMycelial(garden, key)) return false;
  if (recipe.contacts) {
    return matchesNamedGroups(recipe.contacts, namedFungalContacts(garden, key, environment,
      cultivation || calculateCultivation(garden, environment)));
  }
  // Use the resolved environment's real, blocker-aware routed/airborne
  // footprints. A Source emission never substitutes for fungal contact.
  return Object.values(environment.modifiers[key]).some(contributions => contributions.some(entry =>
    entry.influence === recipe.emission && Math.abs(entry.modifier) === 1
      && garden.objects[entry.source]?.type === 'fungus'));
}

export function transformationStatus(garden, key, environment = calculateEnvironment(garden), cultivation = null) {
  const plant = garden.objects[key];
  if (plant?.type !== 'plant') return [];
  const effects = cultivation || calculateCultivation(garden, environment);
  return (TRANSFORMATIONS[plant.species] || []).map(recipe => {
    if (recipe.sequence) {
      const aquatic = recipe.sequence === 'flood-to-damp';
      const woodlands = recipe.sequence === 'mistruffle-departure';
      const state = plant.transformationSequence?.[recipe.into]
        || (aquatic ? emptyAquaticSequence() : woodlands ? emptyWoodlandsSequence() : emptySequence());
      return { ...recipe, phase: state.phase,
        elapsed: !aquatic && !woodlands && state.phase === 'crossing' ? state.windowHours : state.preparedHours,
        hours: !aquatic && !woodlands && state.phase === 'crossing' ? recipe.completion.withinHours : recipe.hours,
        eligible: aquatic || woodlands ? matchesSequencePhase(garden, key, recipe.preparation, environment, effects)
          : state.phase === 'crossing'
          ? matchesConditions(environment.conditions[key], { Moisture: 'Damp', Temperature: 'Temperate' })
          : matchesSequencePhase(garden, key, recipe.preparation, environment, effects),
      };
    }
    return { ...recipe, elapsed: plant.transformationClocks?.[recipe.into] || 0,
      eligible: matchesTransformation(garden, key, recipe, environment, effects) };
  });
}

// Called at the boundary of a player edit. Interruptions reset immediately,
// even if the player repairs the same setup before advancing another hour.
export function reconcileTransformationClocks(garden, previousGarden = null) {
  if (!Object.values(garden.objects).some(object => object.type === 'plant' && TRANSFORMATIONS[object.species])) {
    return garden;
  }
  const environment = calculateEnvironment(garden);
  const cultivation = calculateCultivation(garden, environment);
  const previousEnvironment = previousGarden ? calculateEnvironment(previousGarden) : null;
  const previousCultivation = previousGarden
    ? calculateCultivation(previousGarden, previousEnvironment) : null;
  const objects = { ...garden.objects };
  for (const [key, plant] of Object.entries(garden.objects)) {
    if (plant.type !== 'plant' || !TRANSFORMATIONS[plant.species]) continue;
    const recipes = TRANSFORMATIONS[plant.species];
    const clocks = Object.fromEntries(recipes.filter(recipe => !recipe.sequence)
      .map(recipe => [recipe.into, matchesTransformation(garden, key, recipe, environment, cultivation)
        ? plant.transformationClocks?.[recipe.into] || 0 : 0]));
    let updated = { ...plant, transformationClocks: clocks };
    for (const recipe of recipes.filter(recipe => recipe.sequence)) {
      const aquatic = recipe.sequence === 'flood-to-damp';
      const woodlands = recipe.sequence === 'mistruffle-departure';
      const state = plant.transformationSequence?.[recipe.into]
        || (aquatic ? emptyAquaticSequence() : woodlands ? emptyWoodlandsSequence() : emptySequence());
      const former = previousGarden?.objects[key]?.species === plant.species ? previousEnvironment : null;
      const result = aquatic
        ? reconcileAquaticSequence(garden, previousGarden, key, recipe, state,
          environment, cultivation, former, previousCultivation, matchesSequencePhase)
        : woodlands ? reconcileWoodlandsSequence(garden, previousGarden, key, recipe, state,
          environment, cultivation, former, previousCultivation, matchesSequencePhase,
          matchesConditions, namedFungalContacts, matchesNamedGroups)
        : reconcileSequence(garden, key, recipe, state, environment, cultivation, former);
      if (result.complete) {
        updated = transformedPlant(plant, recipe);
        break;
      }
      updated.transformationSequence = { [recipe.into]: result.state };
    }
    objects[key] = updated;
  }
  return { ...garden, objects };
}

// One elapsed hour under the PRE-event Conditions. Returns a fresh Plant at
// 0% on completion; never retains the source's production, hazard, or clocks.
// No arbitrary priority is permitted between competing sibling recipes.
export function advancePlantTransformations(garden, key, environment, cultivation = null) {
  const plant = garden.objects[key];
  const recipes = TRANSFORMATIONS[plant.species] || [];
  if (!recipes.length) return { plant, into: null };
  const effects = cultivation || calculateCultivation(garden, environment);
  const ordinary = recipes.filter(recipe => !recipe.sequence);
  const eligible = ordinary.filter(recipe => matchesTransformation(garden, key, recipe, environment, effects));
  if (eligible.length > 1) {
    throw new Error(`Overlapping Transformation recipes for ${plant.species} on hex ${key}: ${eligible.map(r => r.into).join(', ')}. Design review required.`);
  }
  const clocks = Object.fromEntries(ordinary.map(recipe => [recipe.into,
    eligible.includes(recipe) ? (plant.transformationClocks?.[recipe.into] || 0) + 1 : 0]));
  const completed = eligible.find(recipe => clocks[recipe.into] >= recipe.hours);
  if (completed) return { plant: transformedPlant(plant, completed), into: completed.into };
  const sequence = { ...plant.transformationSequence };
  for (const recipe of recipes.filter(recipe => recipe.sequence)) {
    if (recipe.sequence === 'flood-to-damp') {
      sequence[recipe.into] = advanceAquaticSequenceHour(garden, key, recipe, environment,
        effects, matchesSequencePhase);
    } else if (recipe.sequence === 'mistruffle-departure') {
      sequence[recipe.into] = advanceWoodlandsSequenceHour(garden, key, recipe, environment,
        effects, matchesSequencePhase);
    } else {
      const result = advanceSequenceHour(garden, key, recipe, environment, effects);
      if (result.complete) return { plant: transformedPlant(plant, recipe), into: recipe.into };
      sequence[recipe.into] = result.state;
    }
  }
  return { plant: { ...plant, transformationClocks: clocks, transformationSequence: sequence }, into: null };
}
