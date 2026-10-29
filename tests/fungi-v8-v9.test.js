import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FUNGI, TRANSFORMATIONS, createGarden, makeFungus, makePlant, placeObject, removeObject,
  setBaseline, placeEdgeBlocker, makeBlocker, neighborsOf, keyAt, calculateEnvironment,
  calculateCultivation, namedFungalContacts, transformationStatus,
  advanceGardenTime, isMycelial, stagePlanting, applyStaging, migrateGarden,
  serializeGameSave, deserializeGameSave, isGarden,
} from '../src/core/index.js';
import { cultivationFootprint } from '../src/core/cultivation.js';

const V8 = [
  ['Dewmender', 'Wetting', 1, 'range', 2, 'waterborne', 'spread-budget', 4, 'independent', [['germination', 8], ['ripeningRate', .20]]],
  ['Mistruffle', 'Dimming', 1, 'range', 2, 'waterborne', 'spread-budget', 4, 'preferring', [['leafYield', .10, .30], ['leafPeakTiming', 10]]],
  ['Emberbolete', 'Warming', 2, 'spread-budget', 3, 'waterborne', 'range', 1, 'preferring', [['seedYield', .10, .30], ['seedTiming', 10]]],
  ['Rilllace', 'Cooling', 1, 'spread-budget', 4, 'airborne', 'range', 1, 'independent', [['seedTiming', 12], ['harvestWindow', .25]]],
  ['Prismorel', 'Brightening', 1, 'range', 2, 'airborne', 'spread-budget', 4, 'independent', [['leafPeakTiming', -8], ['harvestWindow', .25]]],
  ['Droughtcap', 'Drying', 1, 'spread-budget', 3, 'airborne', 'range', 1, 'independent', [['growthRate', -.25], ['ripeningRate', -.30]]],
  ['Hushroom', 'Dimming', 2, 'range', 1, 'airborne', 'spread-budget', 3, 'preferring', [['germination', 6], ['harvestWindow', .10, .30], ['ripeningRate', -.20]]],
  ['Rainmorel', 'Wetting', 1, 'spread-budget', 4, 'waterborne', 'range', 1, 'independent', [['seedTiming', -12], ['growthRate', -.15]]],
  ['Siltgill', 'Warming', 2, 'range', 2, 'airborne', 'spread-budget', 3, 'dependent', [['leafYield', .40], ['harvestWindow', -.25]]],
  ['Rushroom', 'Brightening', 1, 'spread-budget', 3, 'waterborne', 'range', 1, 'dependent', [['growthRate', .25], ['hourlyLeaf', .15], ['harvestWindow', -.20]]],
  ['Frostfolio', 'Cooling', 1, 'range', 1, 'airborne', 'spread-budget', 3, 'dependent', [['germination', 6], ['leafPeakTiming', -8], ['seedYield', .35]]],
  ["Sim'mushro'dim", 'Drying', 2, 'range', 2, 'airborne', 'spread-budget', 3, 'preferring', [['hourlySeed', .10, .30], ['growthRate', .15], ['ripeningRate', .20]]],
];

test('V8 roster checksum: 12 named species, exact magnitudes, 28 cultivation slots and five Waterborne packages', () => {
  assert.deepEqual(Object.keys(FUNGI), ['Mycelord', ...V8.map(row => row[0])]);
  assert.equal(FUNGI.Mycelord.environment, null);
  assert.equal(FUNGI.Mycelord.cultivation, null);
  let slots = 0, waterborne = 0;
  for (const [name, emission, strength, envRoute, envReach, mode, cultRoute, cultReach, habitat, effects] of V8) {
    const definition = FUNGI[name];
    assert.equal(definition.environment.name, emission, name);
    assert.equal(definition.environment.strength, strength, name);
    assert.equal(definition.environment.propagation, envRoute, name);
    assert.equal(definition.environment[envRoute === 'range' ? 'range' : 'budget'], envReach, name);
    assert.equal(definition.cultivation.mode, mode, name);
    assert.equal(definition.cultivation.propagation, cultRoute, name);
    assert.equal(definition.cultivation[cultRoute === 'range' ? 'range' : 'budget'], cultReach, name);
    assert.notEqual(envRoute, cultRoute, `${name} must have exactly one Range and one Budget`);
    assert.equal(definition.habitat, habitat, name);
    assert.deepEqual(definition.cultivation.effects.map(({ kind, amount, boosted }) =>
      boosted == null ? [kind, amount] : [kind, amount, boosted]), effects, name);
    assert.deepEqual(makeFungus(name, 4).emissions.map(entry => entry.modifier),
      [emission.endsWith('ing') && ['Dimming', 'Cooling', 'Drying'].includes(emission) ? -strength : strength]);
    if (mode === 'waterborne') waterborne += 1;
    slots += effects.length;
  }
  assert.equal(slots, 28);
  assert.equal(waterborne, 5);
  assert.deepEqual(FUNGI.Rushroom.cultivation.effects[1].window, [140, 190]);
  assert.deepEqual(FUNGI["Sim'mushro'dim"].cultivation.effects[0].window, [140, 200]);
  assert.throws(() => makeFungus('Quickshade'), /Unknown Fungus species/);
});

test('Spore heading controls the whole directional cultivation package, not just the environmental emission', () => {
  const origin = keyAt(6, 3), left = neighborsOf(origin)[3], right = neighborsOf(origin)[0];
  const garden = placeObject(createGarden(14, 7), origin, makeFungus('Dewmender', 3));
  const effects = calculateCultivation(garden);
  assert.deepEqual(effects[left].map(effect => effect.kind), ['germination', 'ripeningRate']);
  assert.deepEqual(effects[right], []);
  const geometry = cultivationFootprint(garden, origin, FUNGI.Dewmender.cultivation, 3,
    Object.fromEntries(Object.entries(calculateEnvironment(garden).conditions).map(([key, state]) => [key, state.Moisture])));
  assert.equal(geometry.reached.length, 5, 'a Budget 4 route has four crossings plus its origin');
  const reversed = { ...garden, objects: { ...garden.objects, [origin]: makeFungus('Dewmender', 0) } };
  assert.deepEqual(calculateCultivation(reversed)[left], []);
  assert.equal(calculateCultivation(reversed)[right].length, 2);
});

function waterway(species, heading = 3) {
  const origin = keyAt(0, 2), far = keyAt(18, 2);
  let garden = createGarden(20, 5);
  for (let column = 1; column <= 18; column += 1) {
    garden = setBaseline(garden, keyAt(column, 2), 'Moisture', 'Flooded');
  }
  garden = placeObject(garden, origin, makeFungus(species, heading));
  garden = placeObject(garden, far, makePlant('Beanstalk'));
  return { garden, origin, far };
}

test('a Waterborne Range 1 package travels the entire connected Flooded network with no Range cap', () => {
  const { garden, far } = waterway('Rainmorel');
  const cult = calculateCultivation(garden);
  assert.deepEqual(cult[far].map(effect => effect.kind), ['seedTiming', 'growthRate']);
  const env = calculateEnvironment(garden);
  assert.equal(env.modifiers[far].Moisture.length, 0, 'environmental Budget remains bounded');
  assert.equal(namedFungalContacts(garden, far, env).has('Rainmorel'), true,
    'a cultivation-only footprint counts as named contact');
  const separated = setBaseline(garden, keyAt(9, 2), 'Moisture', 'Dry');
  assert.deepEqual(calculateCultivation(separated)[far], []);
});

test('Waterborne directional Budget 4 feeds Flooded handoff without consuming extra crossings', () => {
  const { garden, far } = waterway('Dewmender', 0);
  assert.deepEqual(calculateCultivation(garden)[far].map(effect => effect.kind),
    ['germination', 'ripeningRate']);
  const dryBranch = keyAt(18, 1);
  assert.deepEqual(calculateCultivation(garden)[dryBranch], [],
    'Flooded propagation does not branch back onto dry land');
});

test('Waterborne mode and Kind-specific blockers stop only their own categories across a Flooded corridor', () => {
  const { garden, far } = waterway('Rainmorel');
  const a = keyAt(8, 2), b = keyAt(9, 2);
  const selective = placeEdgeBlocker(garden, a, b, makeBlocker('kind', 'Growth'));
  assert.deepEqual(calculateCultivation(selective)[far].map(effect => effect.kind), ['seedTiming']);
  const blocked = placeEdgeBlocker(garden, a, b, makeBlocker('mode', 'waterborne'));
  assert.deepEqual(calculateCultivation(blocked)[far], []);
  const airborne = waterway('Rilllace').garden;
  assert.deepEqual(calculateCultivation(airborne)[far], [], 'Airborne packages do not inherit the waterway');
});

test('preferring bonuses are per-effect and source-side, not a multiplier on the entire package', () => {
  const source = keyAt(2, 2), target = keyAt(3, 2);
  let garden = placeObject(createGarden(), source, makeFungus('Mycelord'));
  garden = advanceGardenTime(garden, 24).garden;
  assert.equal(isMycelial(garden, source), true);
  garden = placeObject(removeObject(garden, source), source, makeFungus('Mistruffle', 0));
  const effects = calculateCultivation(garden)[target];
  assert.equal(effects.find(effect => effect.kind === 'leafYield').amount, .30);
  assert.equal(effects.find(effect => effect.kind === 'leafPeakTiming').amount, 10);
  const ordinary = placeObject(createGarden(), source, makeFungus('Mistruffle', 0));
  assert.equal(calculateCultivation(ordinary)[target].find(effect => effect.kind === 'leafYield').amount, .10);
});

test('player-selected heading persists in staged Spores, concealed pending, the growing Fungus and a V6 save', () => {
  const origin = keyAt(4, 3);
  let garden = createGarden();
  garden.inventory.spores.Dewmender = 4;
  garden = stagePlanting(garden, origin, 'fungus', 'Dewmender', 4, 3);
  assert.equal(garden.staged[origin].heading, 3);
  assert.throws(() => stagePlanting(garden, origin, 'fungus', 'Dewmender', 4, 6), /Spore direction/);
  garden = applyStaging(garden, () => 0).garden;
  assert.equal(garden.pending[origin].heading, 3);
  assert.equal(garden.objects[origin], undefined, 'the outcome remains hidden until reveal');
  garden = deserializeGameSave(serializeGameSave(garden));
  assert.equal(migrateGarden(garden).pending[origin].heading, 3);
  garden = advanceGardenTime(garden, 6).garden;
  assert.equal(garden.objects[origin].heading, 3);
  assert.equal(garden.objects[origin].emissions[0].range, 2);
  assert.equal(calculateCultivation(garden)[neighborsOf(origin)[3]].length, 2);
  assert.equal(calculateCultivation(garden)[neighborsOf(origin)[0]].length, 0);
});

test('V9 uses named fungal contacts plus resolved hex Conditions, never exact emission values', () => {
  const target = keyAt(4, 3), neighbor = neighborsOf(target)[0];
  let garden = createGarden();
  garden = placeObject(garden, target, makePlant('Beanstalk'));
  garden = placeObject(garden, neighbor, makeFungus('Emberbolete', 3));
  for (const adjacent of neighborsOf(target)) {
    garden = placeEdgeBlocker(garden, target, adjacent, makeBlocker('kind', 'Thermal'));
  }
  garden = setBaseline(garden, target, 'Moisture', 'Damp');
  garden = setBaseline(garden, target, 'Temperature', 'Warm');
  assert.equal(calculateEnvironment(garden).modifiers[target].Temperature.length, 0,
    'Emberbolete does not need to cause the Warm state');
  assert.equal(transformationStatus(garden, target).find(recipe => recipe.into === 'Pumpkin').eligible, true);
  assert.equal(advanceGardenTime(garden, 24).garden.objects[target].species, 'Pumpkin');
  const without = removeObject(garden, neighbor);
  assert.equal(transformationStatus(without, target).find(recipe => recipe.into === 'Pumpkin').eligible, false);
});

test('all 69 V9 recipes refer only to the 12 live ordinary Fungi, including event phases', () => {
  const recipes = Object.values(TRANSFORMATIONS).flat();
  assert.equal(recipes.length, 69);
  let names = new Set();
  for (const recipe of recipes) {
    assert.ok(Number.isInteger(recipe.hours) && recipe.hours > 0, recipe.into);
    for (const phase of [recipe, recipe.preparation, recipe.completion]) {
      for (const group of phase?.contacts || []) {
        assert.ok(group.length > 0, `${recipe.into}: no empty contact choice`);
        for (const species of group) {
          assert.ok(FUNGI[species] && species !== 'Mycelord', `${recipe.into}: unknown contact ${species}`);
          names.add(species);
        }
      }
    }
  }
  assert.deepEqual([...names].sort(), V8.map(row => row[0]).sort());
});

test('old V5 save schema is deliberately rejected instead of mapping retired Fungi into new meanings', () => {
  const current = createGarden();
  assert.equal(isGarden(current), true);
  const source = keyAt(4, 3);
  const malformed = placeObject(current, source, makeFungus('Dewmender', 2));
  malformed.objects[source].heading = 99;
  assert.equal(migrateGarden(malformed).objects[source].heading, 0,
    'invalid directional inputs from current-schema JSON cannot crash propagation');
  const old = { ...current, schemaVersion: 5 };
  assert.equal(isGarden(old), false);
  assert.throws(() => migrateGarden(old), /Unsupported garden file/);
  assert.throws(() => deserializeGameSave(JSON.stringify(old)), /Incompatible garden save/);
});
