import { calculateEnvironment } from './simulation.js';
import { makePlant } from './species.js';

// Ingredients §67. Conditions are the resolved Conditions on the Plant hex;
// emission is an actually reaching environmental contribution from a living
// Fungus (never a freely placed Source or an unrelated cultivation Effect).
// This is the first data-driven recipe family; later families will need named
// fungal contact and event-sequence predicates in addition to this shape.
export const TRANSFORMATIONS = Object.freeze({
  Potato: Object.freeze([
    { into: 'Rice', conditions: { Moisture: 'Flooded' }, emission: 'Wetting', hours: 12 },
    { into: 'Carrot', conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Lit' }, emission: 'Brightening', hours: 10 },
    { into: 'Onion', conditions: { Moisture: 'Dry', Temperature: 'Cold' }, emission: 'Drying', hours: 14 },
    { into: 'Apple', conditions: { Moisture: 'Damp', Temperature: 'Cold' }, emission: 'Cooling', hours: 20 },
    { into: 'Pumpkin', conditions: { Moisture: 'Damp', Temperature: 'Warm' }, emission: 'Warming', hours: 24 },
    { into: 'Strawberry', conditions: { Moisture: 'Damp', Temperature: 'Temperate', Illumination: 'Bright' }, emission: 'Brightening', hours: 16 },
  ]),
});

export function matchesTransformation(garden, key, recipe, environment) {
  const conditions = environment.conditions[key];
  if (!conditions || Object.entries(recipe.conditions).some(([property, value]) => conditions[property] !== value)) {
    return false;
  }
  // Use the resolved environment's real, blocker-aware routed/airborne
  // footprints. A Source emission never substitutes for fungal contact.
  return Object.values(environment.modifiers[key]).some(contributions => contributions.some(entry =>
    entry.influence === recipe.emission && Math.abs(entry.modifier) === 1
      && garden.objects[entry.source]?.type === 'fungus'));
}

export function transformationStatus(garden, key, environment = calculateEnvironment(garden)) {
  const plant = garden.objects[key];
  if (plant?.type !== 'plant') return [];
  return (TRANSFORMATIONS[plant.species] || []).map(recipe => ({
    ...recipe,
    elapsed: plant.transformationClocks?.[recipe.into] || 0,
    eligible: matchesTransformation(garden, key, recipe, environment),
  }));
}

// Called at the boundary of a player edit. Interruptions reset immediately,
// even if the player repairs the same setup before advancing another hour.
export function reconcileTransformationClocks(garden) {
  if (!Object.values(garden.objects).some(object => object.type === 'plant' && TRANSFORMATIONS[object.species])) {
    return garden;
  }
  const environment = calculateEnvironment(garden);
  const objects = { ...garden.objects };
  for (const [key, plant] of Object.entries(garden.objects)) {
    if (plant.type !== 'plant' || !TRANSFORMATIONS[plant.species]) continue;
    const clocks = Object.fromEntries(transformationStatus(garden, key, environment)
      .map(recipe => [recipe.into, recipe.eligible ? recipe.elapsed : 0]));
    objects[key] = { ...plant, transformationClocks: clocks };
  }
  return { ...garden, objects };
}

// One elapsed hour under the PRE-event Conditions. Returns a fresh Plant at
// 0% on completion; never retains the source's production, hazard, or clocks.
// No arbitrary priority is permitted between competing sibling recipes.
export function advancePlantTransformations(garden, key, environment) {
  const plant = garden.objects[key];
  const recipes = transformationStatus(garden, key, environment);
  if (!recipes.length) return { plant, into: null };
  const eligible = recipes.filter(recipe => recipe.eligible);
  if (eligible.length > 1) {
    throw new Error(`Overlapping Transformation recipes for ${plant.species} on hex ${key}: ${eligible.map(r => r.into).join(', ')}. Design review required.`);
  }
  const clocks = Object.fromEntries(recipes.map(recipe => [recipe.into, recipe.eligible ? recipe.elapsed + 1 : 0]));
  const completed = eligible.find(recipe => clocks[recipe.into] >= recipe.hours);
  return completed
    ? { plant: makePlant(completed.into), into: completed.into }
    : { plant: { ...plant, transformationClocks: clocks }, into: null };
}
