import { neighborsOf } from './grid.js';
import { calculateEnvironment } from './simulation.js';
import { calculateCultivation } from './cultivation.js';
import { calculateMycelialSupport, isMycelial, mycelialCanConnect } from './mycelial.js';
import { PLANTS } from './species.js';

const dryHeat = { Moisture: 'Dry', Temperature: 'Scorching' };
const safeBeanstalk = { Moisture: 'Damp', Temperature: 'Temperate' };

export const witnessed = (from, into) => ({ kind: 'transform', from, into, text: `Transform ${from} into ${into}` });
export const living = (species, quantity = 1) => ({
  kind: 'current', text: `Keep ${quantity} living ${species}${quantity === 1 ? '' : ' plants'}`,
  check: scene => scene.plants.filter(plant => plant.species === species).length >= quantity,
});
export const check = (text, evaluate) => ({ kind: 'current', text, check: evaluate });
export const hold = (text, hours, select, trackTemperature = false) => ({ kind: 'hold', text, hours, select, trackTemperature });
export const rescue = (species, exposureHours = 0) => ({
  kind: 'rescue', species, hours: exposureHours,
  text: species === 'Beanstalk' ? 'Expose and rescue the same Beanstalk' : 'Save the newly transformed Mandrakadabra',
});
export const crop = (species, Moisture, Temperature, Illumination) => ({
  species, conditions: { Moisture, Temperature, Illumination },
});

const matches = (actual, target) => Object.entries(target).every(([property, value]) =>
  value === undefined || actual?.[property] === value);
const identifies = (plant, id) => plant.key === id.key && plant.species === id.species && plant.born === id.born;
const specimen = ({ key, species, born }) => ({ key, species, born });

export function taskScene(garden) {
  const clock = garden.clockHours || 0;
  const plants = Object.entries(garden.objects).filter(([, object]) => object.type === 'plant')
    .map(([key, object]) => ({ key, born: clock - (object.ageHours || 0), ...object }));
  let environment, cultivation, supported;
  return {
    garden, plants,
    get environment() { return environment ||= calculateEnvironment(garden); },
    get cultivation() { return cultivation ||= calculateCultivation(garden, this.environment); },
    get supported() { return supported ||= Object.values(calculateMycelialSupport(garden, this.environment)); },
    plant(id) { return id && plants.find(plant => identifies(plant, id)); },
    in(plant, target) { return matches(this.environment.conditions[plant.key], target); },
  };
}

export function simultaneous(...requirements) {
  return (scene, tracked) => {
    const chosen = requirements.map(({ species, conditions }, index) => {
      const options = tracked ? [scene.plant(tracked[index])] : scene.plants;
      return options.find(plant => plant?.species === species && scene.in(plant, conditions));
    });
    return chosen.every(Boolean) ? chosen : null;
  };
}

export function distinctCrops(family, count, ...requiredGroups) {
  return scene => {
    const species = new Set(scene.plants.filter(plant => PLANTS[plant.species].family === family)
      .map(plant => plant.species));
    return species.size >= count && requiredGroups.every(group => group.some(name => species.has(name)));
  };
}

function connected(origin, crosses) {
  const keys = new Set([origin]);
  for (const key of keys) {
    for (const next of neighborsOf(key)) if (!keys.has(next) && crosses(key, next)) keys.add(next);
  }
  return keys;
}

export function reaches(scene, key, species, source) {
  return scene.cultivation[key]?.some(effect => effect.species === species && (!source || effect.source === source));
}

export function floodedPlants(species, quantity, size, varieties = 1) {
  return (scene, tracked) => {
    const eligible = (tracked ? tracked.map(id => scene.plant(id)) : scene.plants)
      .filter(plant => plant && (species ? plant.species === species : PLANTS[plant.species].family === 'Aquatic')
        && scene.in(plant, { Moisture: 'Flooded' }) && reaches(scene, plant.key, 'Dewmender'));
    if (eligible.length < quantity) return null;
    const visited = new Set();
    for (const plant of eligible) {
      if (visited.has(plant.key)) continue;
      const region = connected(plant.key, (_, key) => scene.environment.conditions[key]?.Moisture === 'Flooded');
      for (const key of region) visited.add(key);
      if (region.size < size) continue;
      const plants = eligible.filter(candidate => region.has(candidate.key));
      if (varieties > 1) {
        const sources = Object.keys(scene.garden.objects).filter(key => scene.garden.objects[key].species === 'Dewmender');
        if (sources.some(source => {
          const reached = plants.filter(candidate => reaches(scene, candidate.key, 'Dewmender', source));
          return reached.length >= quantity && new Set(reached.map(candidate => candidate.species)).size >= varieties;
        })) return plants;
      } else if (plants.length >= quantity) return plants.slice(0, quantity);
    }
    return null;
  };
}

export function supportedContact(scene, minSize, fungus, species, uncolonized = false) {
  return scene.supported.some(keys => keys.length >= minSize && keys.some(source =>
    scene.garden.objects[source]?.species === fungus && scene.plants.some(plant =>
      (!species || plant.species === species) && (!uncolonized || !isMycelial(scene.garden, plant.key))
      && reaches(scene, plant.key, fungus, source))));
}

export function containedCrop(scene) {
  const { garden, environment } = scene;
  const root = object => object?.blockerId?.startsWith('blocker:root-barrier:');
  const edges = Object.fromEntries(Object.entries(garden.edges).filter(([, object]) => !root(object)));
  const objects = Object.fromEntries(Object.entries(garden.objects).filter(([, object]) => !root(object)));
  if (Object.keys(edges).length === Object.keys(garden.edges).length
    && Object.keys(objects).length === Object.keys(garden.objects).length) return false;
  const withoutRoots = { ...garden, edges, objects };
  return scene.supported.some(([origin]) => {
    if (!origin) return false;
    const reach = connected(origin, (a, b) => mycelialCanConnect(garden, environment, a, b));
    const unblocked = connected(origin, (a, b) => mycelialCanConnect(withoutRoots, environment, a, b));
    return scene.plants.some(plant => !isMycelial(garden, plant.key)
      && !reach.has(plant.key) && unblocked.has(plant.key));
  });
}

export function temperatureCollection(temperatures, count = 1, uniqueSpecies = false, noSources = false) {
  return (scene, tracked) => {
    if (noSources && Object.values(scene.garden.objects).some(object => object.type === 'source' && object.itemId)) return null;
    const groups = Map.groupBy(tracked ? tracked.map(id => scene.plant(id)).filter(Boolean) : scene.plants,
      plant => scene.environment.conditions[plant.key].Temperature);
    if (tracked && tracked.some(id => !scene.plant(id)
      || scene.environment.conditions[id.key].Temperature !== id.temperature)) return null;
    if (uniqueSpecies) {
      function assign(index, chosen) {
        if (index === temperatures.length) return chosen;
        for (const plant of groups.get(temperatures[index]) || []) {
          if (chosen.some(entry => entry.species === plant.species)) continue;
          const next = assign(index + 1, [...chosen, plant]);
          if (next) return next;
        }
        return null;
      }
      return assign(0, []);
    }
    const chosen = temperatures.filter(temperature => (groups.get(temperature)?.length || 0) >= count).slice(0, 3);
    if (chosen.length !== 3) return null;
    return chosen.flatMap(temperature => groups.get(temperature).slice(0, count));
  };
}

function rescueProgress(goal, scene, previous, state, hours, before) {
  const { species } = goal;
  const tracked = scene.plant(state?.specimens?.[0]);
  if (species === 'Mandrakadabra') {
    const plant = tracked || scene.plants.find(candidate => candidate.species === species
      && previous.objects[candidate.key]?.species === 'Mandrabra');
    return plant ? {
      specimens: [specimen(plant)], done: !scene.in(plant, { Illumination: 'Bright' }),
    } : null;
  }
  if (tracked && state.hours >= goal.hours) return {
    ...state, done: scene.in(tracked, safeBeanstalk),
  };
  const plant = tracked && scene.in(tracked, dryHeat) ? tracked
    : scene.plants.find(candidate => candidate.species === species && scene.in(candidate, dryHeat));
  if (!plant) return null;
  const eligibleBefore = hours && (tracked === plant || (before().plant(plant) && before().in(plant, dryHeat)));
  return { specimens: [specimen(plant)], hours: Math.min(goal.hours,
    (tracked === plant ? state.hours : 0) + (eligibleBefore ? hours : 0)) };
}

export function updateGoal(goal, scene, previous, state, hours, before) {
  if (state?.done) return state;
  switch (goal.kind) {
    case 'transform':
      return scene.plants.some(plant => plant.species === goal.into && previous.objects[plant.key]?.species === goal.from)
        ? { done: true } : null;
    case 'hold': {
      const selected = state?.specimens && goal.select(scene, state.specimens);
      const plants = selected || goal.select(scene);
      if (!plants) return null;
      const specimens = plants.map(plant => ({ ...specimen(plant), ...(goal.trackTemperature
        ? { temperature: scene.environment.conditions[plant.key].Temperature } : {}) }));
      const continuous = selected || (hours > 0 && !state && goal.select(before(), specimens));
      const elapsed = Math.min(goal.hours, (selected ? state.hours : 0) + (continuous ? hours : 0));
      return { specimens, hours: elapsed, done: elapsed >= goal.hours };
    }
    case 'rescue':
      return rescueProgress(goal, scene, previous, state, hours, before);
    default:
      return null;
  }
}

export function goalDone(goal, scene, state) {
  return goal.kind === 'current' ? Boolean(goal.check(scene)) : Boolean(state?.done);
}

export function goalStatus(goal, scene, state, complete) {
  const done = complete || goalDone(goal, scene, state);
  if (goal.kind === 'hold') return { done, text: `${goal.text} · ${done ? goal.hours : state?.hours || 0}/${goal.hours} garden hours` };
  if (goal.kind !== 'rescue' || done) return { done, text: goal.text };
  const plant = scene.plant(state?.specimens?.[0]);
  if (goal.species === 'Mandrakadabra') {
    return { done, key: plant?.key, text: plant
      ? `Lower illumination below Bright · ${Math.max(0, PLANTS.Mandrakadabra.brightDeath - (plant.exposure?.Bright || 0))} garden hours left`
      : 'Prepare to dim the hex, then transform Mandrabra into Mandrakadabra' };
  }
  return { done, key: plant?.key, text: state?.hours >= goal.hours
    ? 'Return this Beanstalk to Damp, Temperate conditions'
    : `Keep a Beanstalk Dry and Scorching · ${state?.hours || 0}/${goal.hours} garden hours` };
}
