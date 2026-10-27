import { PLANTS, FUNGI, effectCompatibility } from './species.js';
import { calculateEnvironment } from './simulation.js';

// Knowledge is part of a single garden, never an account-wide unlock. Keep
// witnessed facts rather than a second copy of the authoritative biology.
export const BASE_PLANTS = Object.freeze(['Potato', 'Daisydaze', 'Aquatic Base',
  'Woodlands Base', 'Jadeheart', 'Thymely']);
const MOISTURE = ['Dry', 'Damp', 'Flooded'];
const LIGHT = ['Dark', 'Dim', 'Lit', 'Bright'];
const FUNGAL_FIELDS = new Set(['growthRate', 'ripeningRate', 'leafYield', 'seedYield',
  'germination', 'harvestWindow', 'leafPeakTiming', 'seedTiming', 'hourlyLeaf',
  'hourlySeed', 'leafAllocation', 'seedAllocation']);
const PROPERTIES = new Set(['Moisture', 'Temperature', 'Illumination']);

export function createGrimoire() {
  return { plants: Object.fromEntries(BASE_PLANTS.map(name => [name, true])),
    environments: {}, fungalEffects: {}, hazards: {}, transformations: [] };
}

function put(ledger, field, plant, key, value) {
  if (ledger[field]?.[plant]?.[key]) return ledger;
  return { ...ledger, [field]: { ...ledger[field], [plant]: { ...ledger[field]?.[plant], [key]: value } } };
}

export function revealPlant(ledger, species) {
  if (!PLANTS[species] || ledger.plants?.[species]) return ledger;
  return { ...ledger, plants: { ...ledger.plants, [species]: true } };
}

export function plantKnown(ledger, species) {
  return Boolean(PLANTS[species] && (BASE_PLANTS.includes(species) || ledger?.plants?.[species]));
}

function valueSignal(value, possible) {
  const maximum = Math.max(...possible);
  return value >= maximum - 1e-9 ? 'favourable' : value <= 0 ? 'dormant' : 'reduced';
}

function temperatureSignal(profile, actual) {
  if (profile.temperature?.[actual]) {
    const entries = Object.values(profile.temperature).map(row => row.growth).filter(Number.isFinite);
    return valueSignal(profile.temperature[actual].growth, entries);
  }
  return profile.preferredTemperature?.includes(actual) ? 'favourable'
    : ['Hot', 'Freezing'].includes(actual) ? 'reduced' : 'reduced';
}

// Called only for a living Plant after a real simulated hour. Conditions are
// unlocked one observed condition at a time, never as a full unseen profile.
export function observePlantHour(ledger, garden, key, plant, conditions, effects, environment,
  nextProgress, nextProduction) {
  const profile = PLANTS[plant.species];
  if (!profile) return ledger;
  let known = revealPlant(ledger, plant.species);
  for (const [property, options, value] of [
    ['Moisture', MOISTURE, profile.moisture],
    ['Illumination', LIGHT, profile.light],
  ]) {
    const condition = conditions[property];
    const signal = valueSignal(value[options.indexOf(condition)], value);
    known = put(known, 'environments', plant.species, `${property}:${condition}`,
      { property, condition, signal });
  }
  known = put(known, 'environments', plant.species, `Temperature:${conditions.Temperature}`,
    { property: 'Temperature', condition: conditions.Temperature,
      signal: temperatureSignal(profile, conditions.Temperature) });

  const receiving = { ...conditions, attunement: plant.attunement };
  const grew = nextProgress > plant.progress;
  const gained = field => (nextProduction?.[field] || 0) > (plant.production?.[field] || 0) + 1e-9;
  for (const effect of effects || []) {
    if (!FUNGI[effect.species] || !FUNGAL_FIELDS.has(effect.kind)) continue;
    const amount = effect.amount * effectCompatibility(profile, effect.kind, receiving,
      effect.amount, plant.progress);
    if (Math.abs(amount) < 1e-9) continue;
    const active = effect.kind === 'growthRate' ? grew && plant.progress < 100
      : effect.kind === 'ripeningRate' ? grew && plant.progress >= 100 && plant.progress < 200
      : ['leafYield', 'hourlyLeaf'].includes(effect.kind) ? gained('ordinaryLeaves') || gained('hourlyLeaves')
      : ['seedYield', 'hourlySeed'].includes(effect.kind) ? gained('ordinarySeeds') || gained('hourlySeeds')
      : ['harvestWindow', 'leafPeakTiming', 'seedTiming'].includes(effect.kind) ? grew && plant.progress >= 90
      : false; // Germination and harvest allocation have different event boundaries.
    if (!active) continue;
    known = put(known, 'fungalEffects', plant.species,
      `${effect.species}:${effect.kind}:${Math.sign(amount)}`,
      { fungus: effect.species, kind: effect.kind, direction: Math.sign(amount) });
  }

  // Environmental emissions qualify only when removing that Fungus changes
  // the Plant's actual resolved Conditions. Reaching a blocked/cancelled or
  // capped modifier alone must not unlock an invented effect.
  const sources = new Map();
  for (const [property, entries] of Object.entries(environment.modifiers?.[key] || {})) {
    for (const entry of entries) {
      const fungus = garden.objects[entry.source];
      if (fungus?.type !== 'fungus') continue;
      if (known.fungalEffects?.[plant.species]?.[`${fungus.species}:environment:${property}:0`]) continue;
      sources.set(`${entry.source}:${property}`, { source: entry.source, species: fungus.species, property });
    }
  }
  for (const entry of sources.values()) {
    const objects = { ...garden.objects };
    delete objects[entry.source];
    const without = calculateEnvironment({ ...garden, objects });
    if (without.conditions[key]?.[entry.property] === conditions[entry.property]) continue;
    known = put(known, 'fungalEffects', plant.species,
      `${entry.species}:environment:${entry.property}:0`,
      { fungus: entry.species, kind: `environment:${entry.property}`, direction: 0,
        result: conditions[entry.property] });
  }
  return known;
}

export function observeHazard(ledger, species, hazard, outcome) {
  if (!PLANTS[species] || typeof hazard !== 'string') return ledger;
  return put(revealPlant(ledger, species), 'hazards', species, `${hazard}:${outcome}`,
    { hazard, outcome });
}

export function observeFungalAction(ledger, plant, fungus, kind, direction = 0) {
  if (!PLANTS[plant] || !FUNGI[fungus] || !FUNGAL_FIELDS.has(kind)) return ledger;
  return put(revealPlant(ledger, plant), 'fungalEffects', plant,
    `${fungus}:${kind}:${Math.sign(direction)}`,
    { fungus, kind, direction: Math.sign(direction) });
}

function reachingFungi(garden, key, environment, cultivation) {
  const found = new Set();
  for (const entry of Object.values(environment.modifiers?.[key] || {}).flat()) {
    const living = garden.objects[entry.source];
    if (living?.type === 'fungus') found.add(living.species);
  }
  for (const effect of cultivation?.[key] || []) {
    if (garden.objects[effect.source]?.type === 'fungus') found.add(effect.species);
  }
  return found;
}

// Only observed, qualifying members of named groups are witnesses. For a
// stateful route that already lost its preparatory contact, do not fabricate a
// particular alternative from the definition.
export function observeTransformation(ledger, garden, key, from, recipe,
  environment, cultivation, previousGarden = null) {
  if (!PLANTS[from] || !PLANTS[recipe?.into]) return ledger;
  let known = revealPlant(revealPlant(ledger, from), recipe.into);
  const reached = reachingFungi(garden, key, environment, cultivation);
  const historical = previousGarden ? reachingFungi(previousGarden, key,
    calculateEnvironment(previousGarden), null) : new Set();
  const contacts = new Set();
  if (recipe.opposingLight) {
    // A cultivation footprint by itself cannot qualify for opposing light.
    // Record only the actual signed environmental emitters from both groups.
    for (const [groupIndex, group] of recipe.contacts.entries()) {
      const sign = groupIndex === 0 ? 1 : -1;
      for (const emission of environment.modifiers?.[key]?.Illumination || []) {
        const fungus = garden.objects[emission.source];
        if (fungus?.type === 'fungus' && group.includes(fungus.species)
          && emission.kind === 'Luminous' && emission.modifier * sign > 0) contacts.add(fungus.species);
      }
    }
  } else {
    for (const group of recipe.contacts || []) {
      for (const fungus of group) if (reached.has(fungus) || historical.has(fungus)) contacts.add(fungus);
    }
  }
  for (const group of recipe.completion?.contacts || []) {
    for (const fungus of group) if (reached.has(fungus)) contacts.add(fungus);
  }
  // The last pre-event garden can witness a preparation contact. For normal
  // hourly completion there is no historical snapshot of the entire clock;
  // omit earlier contacts rather than naming an unwitnessed alternative.
  for (const group of recipe.preparation?.contacts || []) {
    for (const fungus of group) if (historical.has(fungus)) contacts.add(fungus);
  }
  if (recipe.emission) {
    for (const entry of Object.values(environment.modifiers?.[key] || {}).flat()) {
      if (entry.influence === recipe.emission && Math.abs(entry.modifier) === 1
        && garden.objects[entry.source]?.type === 'fungus') contacts.add(garden.objects[entry.source].species);
    }
  }
  const conditions = { ...environment.conditions[key] };
  const witness = { from, into: recipe.into, conditions,
    fungi: [...contacts].sort(), sequence: recipe.sequence || null,
    hours: recipe.hours, observedAt: garden.clockHours || 0 };
  const signature = JSON.stringify([from, recipe.into, conditions, witness.fungi, witness.sequence]);
  if (known.transformations.some(entry => entry.signature === signature)) return known;
  return { ...known, transformations: [...known.transformations,
    { ...witness, signature }] };
}

export function fungusKnowledge(ledger, fungus) {
  if (!FUNGI[fungus]) return { effects: [], transformations: [] };
  return {
    effects: Object.entries(ledger?.fungalEffects || {}).flatMap(([plant, items]) =>
      Object.values(items).filter(effect => effect.fungus === fungus && plantKnown(ledger, plant))
        .map(effect => ({ ...effect, plant }))),
    transformations: (ledger?.transformations || []).filter(entry => entry.fungi.includes(fungus)
      && plantKnown(ledger, entry.from) && plantKnown(ledger, entry.into)),
  };
}

// Strictly rehydrate recognized facts. Old schema gardens may show an already
// living Plant, but cannot reconstruct a lost Transformation recipe from it.
export function migrateGrimoire(saved, existingObjects = {}) {
  let clean = createGrimoire();
  for (const object of Object.values(existingObjects)) {
    if (object.type === 'plant') clean = revealPlant(clean, object.species);
  }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return clean;
  for (const species of Object.keys(saved.plants || {})) if (saved.plants[species] === true) {
    clean = revealPlant(clean, species);
  }
  for (const [plant, entries] of Object.entries(saved.environments || {})) {
    if (!PLANTS[plant]) continue;
    for (const value of Object.values(entries || {})) {
      if (!PROPERTIES.has(value?.property)
        || !(value.property === 'Moisture' ? MOISTURE
          : value.property === 'Illumination' ? LIGHT
            : ['Freezing', 'Cold', 'Temperate', 'Warm', 'Hot']).includes(value.condition)
        || !['favourable', 'reduced', 'dormant'].includes(value.signal)) continue;
      clean = put(clean, 'environments', plant, `${value.property}:${value.condition}`, value);
    }
  }
  for (const [plant, entries] of Object.entries(saved.fungalEffects || {})) {
    if (!PLANTS[plant]) continue;
    for (const value of Object.values(entries || {})) {
      if (!FUNGI[value?.fungus] || typeof value.kind !== 'string'
        || (!FUNGAL_FIELDS.has(value.kind) && !/^environment:(Moisture|Temperature|Illumination)$/.test(value.kind))) continue;
      const direction = Math.sign(Number(value.direction) || 0);
      clean = put(clean, 'fungalEffects', plant, `${value.fungus}:${value.kind}:${direction}`,
        { fungus: value.fungus, kind: value.kind, direction,
          ...(typeof value.result === 'string' ? { result: value.result } : {}) });
    }
  }
  for (const [plant, entries] of Object.entries(saved.hazards || {})) {
    if (!PLANTS[plant]) continue;
    for (const value of Object.values(entries || {})) {
      if (typeof value?.hazard === 'string' && ['death', 'penalty'].includes(value.outcome)) {
        clean = observeHazard(clean, plant, value.hazard, value.outcome);
      }
    }
  }
  for (const value of Array.isArray(saved.transformations) ? saved.transformations.slice(0, 500) : []) {
    if (!PLANTS[value?.from] || !PLANTS[value?.into] || !value.conditions
      || !Number.isFinite(value.hours) || !Number.isFinite(value.observedAt)) continue;
    const fungi = Array.isArray(value.fungi) ? [...new Set(value.fungi.filter(name => FUNGI[name]))] : [];
    const conditions = Object.fromEntries(Object.entries(value.conditions)
      .filter(([property, condition]) => PROPERTIES.has(property) && typeof condition === 'string'));
    const signature = JSON.stringify([value.from, value.into, conditions, fungi.sort(), value.sequence || null]);
    if (clean.transformations.some(record => record.signature === signature)) continue;
    clean = revealPlant(revealPlant(clean, value.from), value.into);
    clean = { ...clean, transformations: [...clean.transformations, { from: value.from, into: value.into, conditions, fungi,
      sequence: typeof value.sequence === 'string' ? value.sequence : null,
      hours: value.hours, observedAt: value.observedAt, signature }] };
  }
  return clean;
}
