import { PLANTS, FUNGI } from './species.js';
import { plantKnown } from './grimoire.js';
import { TRANSFORMATIONS } from './transformations.js';
import { formatRealDuration } from './game-time.js';

// A read-only catalogue view. This never manufactures witnessed discoveries or
// writes to the garden's Grimoire ledger.
const MOISTURE = ['Dry', 'Damp', 'Flooded'];
const LIGHT = ['Dark', 'Dim', 'Lit', 'Bright'];
const EFFECTS = {
  growthRate: 'Growth speed', ripeningRate: 'Ripening speed', leafYield: 'Leaf production',
  seedYield: 'Seed production', germination: 'Germination chance', harvestWindow: 'Harvest window',
  leafPeakTiming: 'Peak Leaf timing', seedTiming: 'Seed timing', hourlyLeaf: 'Leaves per 5s tick',
  hourlySeed: 'Seeds per 5s tick', leafAllocation: 'Leaf allocation', seedAllocation: 'Seed allocation',
};

export const totalRecipes = () => Object.values(TRANSFORMATIONS)
  .reduce((count, recipes) => count + recipes.length, 0);

export function visibleGrimoirePlants(ledger, developerPreview = false) {
  return Object.keys(PLANTS).filter(species => developerPreview || plantKnown(ledger, species));
}

export function previewPlantConditions(species) {
  const plant = PLANTS[species];
  if (!plant) return [];
  const lines = [
    `Moisture growth multipliers: ${MOISTURE.map((name, i) => `${name} ${plant.moisture[i]}×`).join(' · ')}`,
    `Light growth multipliers: ${LIGHT.map((name, i) => `${name} ${plant.light[i]}×`).join(' · ')}`,
    `Preferred temperatures: ${(plant.preferredTemperature || []).join(' or ') || 'Profile-specific'}`,
  ];
  if (plant.productiveWindow) lines.push(`Productive window: ${plant.productiveWindow[0]}–${plant.productiveWindow[1]}% maturity`);
  return lines;
}

export function previewPlantHazards(species) {
  const plant = PLANTS[species];
  if (!plant) return [];
  return [
    ['Dry', plant.dryDeath], ['Hot', plant.hotDeath],
    ['Freezing', plant.freezingDeath], ['Mycelial', plant.mycelialDeath],
    ['Bright', plant.brightDeath],
  ].filter(([, hours]) => Number.isFinite(hours))
    .map(([condition, hours]) => `${condition} exposure: ${formatRealDuration(hours)} to death`);
}

export function previewPlantCompatibility(species) {
  const compatibility = PLANTS[species]?.compatibility || {};
  return Object.entries(compatibility).map(([effect, multiplier]) =>
    `${EFFECTS[effect] || effect}: ${multiplier}× base response`);
}

const conditionText = conditions => Object.entries(conditions || {})
  .map(([name, value]) => `${name}: ${Array.isArray(value) ? value.join(' or ') : value}`)
  .join(' · ') || 'No additional hex-state requirement';

const contactsText = groups => (groups || []).map(group => group.join(' or ')).join(' + ') || 'none';

export function describeFullRecipe(from, recipe) {
  const prefix = `${from} → ${recipe.into}`;
  if (!recipe.sequence) {
    return `${prefix} — ${conditionText(recipe.conditions)}. Living Fungus contact: ${contactsText(recipe.contacts)}. Hold for ${formatRealDuration(recipe.hours)}.`;
  }
  const preparation = recipe.preparation || {};
  const completion = recipe.completion || {};
  const stage = `Prepare: ${conditionText(preparation.conditions)}; contact ${contactsText(preparation.contacts)}`;
  const finish = `Finish: ${conditionText(completion.conditions)}${completion.contacts?.length
    ? `; contact ${contactsText(completion.contacts)}` : ''}`;
  if (recipe.sequence === 'mistruffle-departure') {
    return `${prefix} — ${stage} for ${formatRealDuration(recipe.hours)} to under ${formatRealDuration(recipe.beforeHours)}. Then lose ${completion.remove} contact while retaining ${contactsText(completion.retain)}; ${conditionText(completion.conditions)}.`;
  }
  if (recipe.sequence === 'heat-to-warm' || recipe.sequence === 'freeze-to-cold') {
    const exposure = recipe.sequence === 'heat-to-warm' ? 'Hot' : 'Freezing';
    return `${prefix} — Accumulate ${recipe.early ? `under ${formatRealDuration(recipe.hours)}` : `at least ${formatRealDuration(recipe.hours)}`} of ${exposure} exposure, then change the hex from ${exposure} to ${recipe.sequence === 'heat-to-warm' ? 'Warm' : 'Cold'}. ${finish}.`;
  }
  if (recipe.sequence === 'flood-to-damp') {
    return `${prefix} — ${stage} for ${formatRealDuration(recipe.hours)}, then change the hex directly from Flooded to Damp while the preparation contact was still active before the change.`;
  }
  return `${prefix} — ${stage} for ${formatRealDuration(recipe.hours)}, then change Illumination out of ${recipe.sequence === 'dark-to-lit' ? 'Dark' : 'Dim'}. ${finish}${Number.isFinite(completion.withinHours) ? ` within ${formatRealDuration(completion.withinHours)}` : ''}.`;
}

export function previewPlantRecipes(species) {
  if (!PLANTS[species]) return [];
  return Object.entries(TRANSFORMATIONS).flatMap(([from, recipes]) => recipes
    .filter(recipe => from === species || recipe.into === species)
    .map(recipe => describeFullRecipe(from, recipe)));
}

function deliveryText(packageDefinition) {
  const reach = packageDefinition.propagation === 'spread-budget'
    ? `directional Budget ${packageDefinition.budget}` : `Range ${packageDefinition.range}`;
  return `${packageDefinition.mode === 'waterborne' ? 'Waterborne' : 'Airborne'} ${reach}${packageDefinition.mode === 'waterborne'
    ? ' (continues through connected Flooded hexes)' : ''}`;
}

export function previewFungusProfile(species) {
  const fungus = FUNGI[species];
  if (!fungus) return [];
  const lines = [`Habitat: ${fungus.habitat}`];
  if (fungus.environment) {
    const env = fungus.environment;
    lines.push(`Environmental emission: ${env.name} ${env.strength} · ${env.propagation === 'spread-budget'
      ? `directional Budget ${env.budget}` : `Range ${env.range}`}`);
  } else lines.push('No environmental emission');
  if (fungus.cultivation) lines.push(`Cultivation delivery: ${deliveryText(fungus.cultivation)}`);
  else lines.push('No cultivation effects');
  return lines;
}

export function previewFungusEffects(species) {
  const effects = FUNGI[species]?.cultivation?.effects || [];
  return effects.map(effect => {
    const amount = `${effect.amount > 0 ? '+' : ''}${effect.amount}`;
    const when = effect.window ? ` (maturity ${effect.window[0]}–${effect.window[1]}%)` : '';
    const boosted = effect.boosted == null ? '' : `; boosted value ${effect.boosted > 0 ? '+' : ''}${effect.boosted}`;
    return `${EFFECTS[effect.kind] || effect.kind}: ${amount}${when}${boosted}`;
  });
}

function recipeReferencesFungus(recipe, fungus) {
  const groups = [recipe.contacts, recipe.preparation?.contacts, recipe.completion?.contacts,
    recipe.completion?.retain];
  return groups.some(group => group?.some(alternatives => alternatives.includes(fungus)))
    || recipe.completion?.remove === fungus;
}

export function previewFungusRecipes(species) {
  if (!FUNGI[species]) return [];
  return Object.entries(TRANSFORMATIONS).flatMap(([from, recipes]) => recipes
    .filter(recipe => recipeReferencesFungus(recipe, species))
    .map(recipe => describeFullRecipe(from, recipe)));
}
