import { calculateEnvironment } from './simulation.js';
import { calculateCultivation } from './cultivation.js';
import { accruePlantProduction, accrueFungusSpores, ECONOMY_TUNING } from './economy.js';
import { FUNGI, PLANTS, effectCompatibility } from './species.js';
import { advanceMycelium, isMycelial, MYCELIAL_TUNING } from './mycelial.js';
import { advancePlantTransformations, reconcileTransformationClocks } from './transformations.js';

// Fungal stage durations have *not* been approved. These explicit sandbox
// defaults are only for observing the two-stage lifecycle; never use them as
// the authoritative fungus balance or spore economy.
export const PROTOTYPE_TUNING = Object.freeze({ fungusGrowthHours: 96, fungusSporulationHours: 96,
  ...ECONOMY_TUNING, ...MYCELIAL_TUNING });

const MOISTURE = ['Dry', 'Damp', 'Flooded'];
const LIGHT = ['Dark', 'Dim', 'Lit', 'Bright'];
export { calculateCultivation } from './cultivation.js';

export function stageOf(organism) {
  if (!organism || !['plant', 'fungus'].includes(organism.type)) return null;
  if (organism.progress >= 200) return 'Mature';
  if (organism.progress >= 100) return organism.type === 'plant' ? 'Ripening' : 'Sporulation';
  return 'Growth';
}

export function plantEnvironmentRate(species, conditions) {
  const profile = PLANTS[species];
  if (!profile) throw new Error(`Unknown Plant species: ${species}`);
  const moisture = profile.moisture[MOISTURE.indexOf(conditions.Moisture)];
  const illumination = profile.light[LIGHT.indexOf(conditions.Illumination)];
  let temperature = 1;
  if (['Hot', 'Freezing'].includes(conditions.Temperature)) temperature = .5;
  else if (!profile.preferredTemperature.includes(conditions.Temperature)) {
    temperature = species === 'Pumpkin' && conditions.Temperature === 'Cold' ? .55 : .85;
  }
  return moisture * illumination * temperature;
}

export function plantGrowthRates(plant, conditions, contacts = [], mycelial = false) {
  const profile = PLANTS[plant.species];
  const environmentRate = plantEnvironmentRate(plant.species, conditions) * (mycelial ? .5 : 1);
  const getRate = kind => {
    const sum = contacts.filter(effect => effect.kind === kind)
      .reduce((total, effect) => total + effect.amount
        * effectCompatibility(profile, kind, conditions, effect.amount, plant.progress), 0);
    // The approved rule requires a positive rate floor, but its exact value is
    // deferred; this defensive lower bound is prototype-only.
    return Math.max(.01, 1 + sum) * environmentRate;
  };
  return { growth: getRate('growthRate'), ripening: getRate('ripeningRate') };
}

function advancePlantProgress(progress, profile, rates) {
  if (progress >= 200) return 200;
  let remainingHours = 1;
  let next = progress;
  for (const [limit, duration, multiplier] of [
    [100, profile.growthDays * 24, rates.growth],
    [200, (profile.totalDays - profile.growthDays) * 24, rates.ripening],
  ]) {
    if (next >= limit || remainingHours <= 0) continue;
    const perHour = 100 / duration * multiplier;
    if (perHour <= 0) continue;
    const hoursToBoundary = (limit - next) / perHour;
    if (hoursToBoundary >= remainingHours) {
      next += perHour * remainingHours;
      remainingHours = 0;
    } else {
      next = limit;
      remainingHours -= hoursToBoundary;
    }
  }
  // Without a boundary snap, repeated fractional hours can leave 199.999999%
  // indefinitely labeled Ripening at the mathematically exact completion hour.
  if (Math.abs(next - 100) < 1e-9) return 100;
  if (next >= 200 - 1e-9) return 200;
  return Math.min(200, next);
}

function nextExposure(plant, conditions, mycelial) {
  const previous = plant.exposure || {};
  return {
    Dry: conditions.Moisture === 'Dry' ? (previous.Dry || 0) + 1 : 0,
    Hot: conditions.Temperature === 'Hot' ? (previous.Hot || 0) + 1 : 0,
    Freezing: conditions.Temperature === 'Freezing' ? (previous.Freezing || 0) + 1 : 0,
    Mycelial: mycelial ? (previous.Mycelial || 0) + 1 : 0,
  };
}

export function advanceGardenTime(garden, hours = 1) {
  if (!Number.isInteger(hours) || hours < 1 || hours > 24 * 30) {
    throw new Error('Advance a whole number of hours between 1 and 720.');
  }
  let current = garden;
  const events = [];
  for (let hour = 0; hour < hours; hour += 1) {
    const environment = calculateEnvironment(current);
    const cultivation = calculateCultivation(current, environment);
    // Colonization/retreat consumes the preceding real hour. Its newly
    // established or retired ground changes organism conditions NEXT hour.
    const mycelium = advanceMycelium(current, environment);
    const objects = { ...current.objects };
    for (const [key, object] of Object.entries(current.objects)) {
      if (object.type === 'plant') {
        const profile = PLANTS[object.species];
        const onMycelial = isMycelial(current, key);
        const exposure = nextExposure(object, environment.conditions[key], onMycelial);
        const transformation = advancePlantTransformations(current, key, environment, cultivation);
        // A completion on the same timestamp as a fatal hazard wins (§60D).
        if (transformation.into) {
          objects[key] = transformation.plant;
          events.push(`${object.species} transformed into ${transformation.into} on hex ${key}.`);
          continue;
        }
        const dyingFrom = Object.entries({ Dry: profile.dryDeath, Hot: profile.hotDeath,
          Freezing: profile.freezingDeath, Mycelial: profile.mycelialDeath })
          .find(([hazard, threshold]) => exposure[hazard] >= threshold);
        if (dyingFrom) {
          delete objects[key];
          events.push(`${object.species} died on hex ${key} after ${dyingFrom[1]}h of ${dyingFrom[0]}.`);
          continue;
        }
        const rates = plantGrowthRates(object, environment.conditions[key], cultivation[key], onMycelial);
        const progress = advancePlantProgress(object.progress, profile, rates);
        objects[key] = { ...transformation.plant, ageHours: (object.ageHours || 0) + 1, exposure, progress,
          production: accruePlantProduction(object, progress, environment.conditions[key], cultivation[key], onMycelial) };
      } else if (object.type === 'fungus') {
        const exposure = {
          Flooded: object.species === 'Mycelord' && environment.conditions[key].Moisture === 'Flooded'
            ? (object.exposure?.Flooded || 0) + 1 : 0,
          MissingMycelial: FUNGI[object.species].habitat === 'dependent' && !isMycelial(current, key)
            ? (object.exposure?.MissingMycelial || 0) + 1 : 0,
        };
        if ((object.species === 'Mycelord' && exposure.Flooded >= MYCELIAL_TUNING.mycelordFloodDeathHours)
          || (FUNGI[object.species].habitat === 'dependent'
            && exposure.MissingMycelial >= MYCELIAL_TUNING.dependentHabitatGraceHours)) {
          delete objects[key];
          events.push(`${object.species} died on hex ${key} after ${object.species === 'Mycelord'
            ? exposure.Flooded + 'h Flooded' : exposure.MissingMycelial + 'h without Mycelial'} exposure.`);
          continue;
        }
        const progress = advancePlantProgress(object.progress, {
          growthDays: PROTOTYPE_TUNING.fungusGrowthHours / 24,
          totalDays: (PROTOTYPE_TUNING.fungusGrowthHours + PROTOTYPE_TUNING.fungusSporulationHours) / 24,
        }, { growth: 1, ripening: 1 });
        objects[key] = { ...object, progress, ageHours: (object.ageHours || 0) + 1, exposure,
          sporeStock: accrueFungusSpores(object, progress, PROTOTYPE_TUNING.fungusSporeYieldAt200) };
      }
    }
    const ticked = { ...current, objects, mycelium, clockHours: (current.clockHours || 0) + 1 };
    // A dying Fungus can change illumination at this exact timestamp. Catch a
    // previously prepared Daisyspell leaving Dim without granting extra time.
    if (Object.values(objects).some(item => item.type === 'plant' && item.species === 'Daisyspell')) {
      const resolved = reconcileTransformationClocks(ticked, current);
      for (const [key, item] of Object.entries(resolved.objects)) {
        if (objects[key]?.species === 'Daisyspell' && item.species === 'Orchidemon') {
          events.push(`Daisyspell transformed into Orchidemon on hex ${key}.`);
        }
      }
      current = resolved;
    } else current = ticked;
  }
  return { garden: current, events };
}
