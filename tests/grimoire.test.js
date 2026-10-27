import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLANTS, FUNGI, createGarden, placeObject, setBaseline, makePlant, makeFungus,
  neighborsOf, makeBlocker, placeEdgeBlocker, advanceGardenTime, harvestPlant,
  stagePlanting, applyStaging, migrateGarden, serializeGameSave, deserializeGameSave,
  plantKnown, fungusKnowledge, createGrimoire, reconcileTransformationClocks,
} from '../src/core/index.js';

const key = '3,3';
const neighbor = neighborsOf(key)[0];

test('a new garden starts with only the six base Plants and all 31 identified Fungi', () => {
  const ledger = createGarden().grimoire;
  assert.equal(Object.keys(PLANTS).length, 60);
  assert.equal(Object.keys(FUNGI).length, 31);
  assert.equal(Object.keys(ledger.plants).length, 6);
  assert.ok(['Potato', 'Daisydaze', 'Aquatic Base', 'Woodlands Base', 'Jadeheart', 'Thymely']
    .every(name => plantKnown(ledger, name)));
  assert.equal(plantKnown(ledger, 'Rice'), false);
  assert.equal(fungusKnowledge(ledger, 'Dewmender').effects.length, 0);
  assert.deepEqual(ledger.transformations, []);
});

test('only a resolved fungal environmental change reveals an influence, never a blocked one', () => {
  let garden = placeObject(createGarden(), key, makePlant('Potato'));
  garden = placeObject(garden, neighbor, makeFungus('Dewmender'));
  const exposed = advanceGardenTime(garden, 1).garden;
  assert.ok(Object.values(exposed.grimoire.fungalEffects.Potato || {})
    .some(fact => fact.fungus === 'Dewmender' && fact.kind === 'environment:Moisture'));
  const blocked = neighborsOf(key).reduce((state, adjacent) =>
    placeEdgeBlocker(state, key, adjacent, makeBlocker('kind', 'Aqueous')), garden);
  const blockedAfter = advanceGardenTime(blocked, 1).garden;
  assert.equal(Object.values(blockedAfter.grimoire.fungalEffects.Potato || {})
    .filter(fact => fact.kind === 'environment:Moisture').length, 0);
});

test('only a committed transformation reveals its result and witnessed recipe, on both participant views', () => {
  let garden = placeObject(createGarden(), key, makePlant('Potato'));
  garden = placeObject(garden, neighbor, makeFungus('Dewmender'));
  garden = setBaseline(garden, key, 'Moisture', 'Damp');
  const before = advanceGardenTime(garden, 11).garden;
  assert.equal(plantKnown(before.grimoire, 'Rice'), false);
  assert.equal(before.grimoire.transformations.length, 0);
  const after = advanceGardenTime(before, 1).garden;
  assert.equal(after.objects[key].species, 'Rice');
  assert.equal(plantKnown(after.grimoire, 'Rice'), true);
  assert.equal(plantKnown(after.grimoire, 'Carrot'), false);
  assert.equal(after.grimoire.transformations.length, 1);
  const route = after.grimoire.transformations[0];
  assert.equal(route.from, 'Potato');
  assert.equal(route.into, 'Rice');
  assert.equal(route.conditions.Moisture, 'Flooded');
  assert.deepEqual(route.fungi, ['Dewmender']);
  assert.deepEqual(fungusKnowledge(after.grimoire, 'Dewmender').transformations, [route]);
  assert.equal(fungusKnowledge(after.grimoire, 'Rainmorel').transformations.length, 0,
    'other compatible Fungi must not be revealed by one witnessed recipe');
  const harvested = harvestPlant(after, key);
  assert.equal(plantKnown(harvested.grimoire, 'Rice'), true, 'harvest cannot erase species knowledge');
  assert.deepEqual(deserializeGameSave(serializeGameSave(harvested)).grimoire, harvested.grimoire);
});

test('successful but concealed germination cannot unlock a hidden species until the delay ends', () => {
  let garden = createGarden();
  garden = { ...garden, inventory: { ...garden.inventory,
    seeds: { ...garden.inventory.seeds, Rice: 1 } } };
  garden = applyStaging(stagePlanting(garden, key, 'plant', 'Rice', 1), () => 0).garden;
  assert.equal(garden.pending[key].success, true);
  assert.equal(plantKnown(garden.grimoire, 'Rice'), false);
  const before = advanceGardenTime(garden, 5).garden;
  assert.equal(plantKnown(before.grimoire, 'Rice'), false);
  const emerged = advanceGardenTime(before, 1).garden;
  assert.equal(plantKnown(emerged.grimoire, 'Rice'), true);
});

test('pre-Grimoire gardens preserve living species but do not invent old recipes', () => {
  let garden = placeObject(createGarden(), key, makePlant('Rice'));
  garden = { ...garden, schemaVersion: 4, grimoire: undefined };
  const old = migrateGarden(garden);
  assert.equal(old.schemaVersion, 5);
  assert.equal(plantKnown(old.grimoire, 'Rice'), true);
  assert.deepEqual(old.grimoire.transformations, []);
  assert.equal(plantKnown(old.grimoire, 'Carrot'), false);
  assert.deepEqual(old.grimoire, deserializeGameSave(serializeGameSave(old)).grimoire);
});

test('fungal germination effects are observed on Apply, independent of concealed success', () => {
  let garden = placeObject(createGarden(), neighbor, makeFungus('Dewmender'));
  garden = applyStaging(stagePlanting(garden, key, 'plant', 'Potato', 1), () => 1).garden;
  assert.equal(garden.pending[key].success, false);
  assert.ok(fungusKnowledge(garden.grimoire, 'Dewmender').effects
    .some(effect => effect.plant === 'Potato' && effect.kind === 'germination'));
  const blocked = placeEdgeBlocker(createGarden(), key, neighbor, makeBlocker('full'));
  const withFungus = placeObject(blocked, neighbor, makeFungus('Dewmender'));
  const attempted = applyStaging(stagePlanting(withFungus, key, 'plant', 'Potato', 1), () => 1).garden;
  assert.equal(fungusKnowledge(attempted.grimoire, 'Dewmender').effects.length, 0);
});

test('event-based Desert transformation records only its witnessed recovery fungus', () => {
  let garden = placeObject(createGarden(), key, makePlant('Ember Aloe'));
  for (const [property, condition] of [['Moisture', 'Damp'], ['Temperature', 'Hot'], ['Illumination', 'Lit']]) {
    garden = setBaseline(garden, key, property, condition);
  }
  garden = advanceGardenTime(garden, 1).garden;
  const next = placeObject(garden, neighbor, makeFungus('Chillanterelle'));
  const after = reconcileTransformationClocks(next, garden);
  assert.equal(after.objects[key].species, 'Ashen Rose');
  const route = after.grimoire.transformations.at(-1);
  assert.equal(route.from, 'Ember Aloe');
  assert.equal(route.into, 'Ashen Rose');
  assert.deepEqual(route.fungi, ['Chillanterelle']);
  assert.equal(plantKnown(after.grimoire, 'Ashen Rose'), true);
  assert.equal(plantKnown(after.grimoire, 'Aloemancer'), false);
  assert.equal(fungusKnowledge(after.grimoire, 'Rilllace').transformations.length, 0);
});
