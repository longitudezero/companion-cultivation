import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TASKS, TASK_IDS, FIRST_TASK, CARE_TASK, TRANSFORMATIONS, taskStatus, taskDelivery, taskObjectives,
  createTutorialGarden, updateTaskProgress, claimTask, stagePlanting, applyStaging, advanceGardenTime,
  harvestPlant, reconcileTransformationClocks, makePlant, makeFungus, placeObject, defaultHex, setBaseline, keyAt, neighborsOf, placeEdgeBlocker, makeBlocker,
  shopProducts, shopQuote, tradeShop, withGold, inventoryCapacity, ensureInventorySlots, goldBalance,
  serializeGameSave, deserializeGameSave, resizeGarden, placeBlockerItem, moveInventoryStack,
} from '../src/core/index.js';

const id = order => TASK_IDS.find(key => TASKS[key].order === order);
const claim = (garden, key) => {
  assert.equal(taskStatus(garden, key), 'ready', TASKS[key].title);
  return claimTask(garden, key);
};
const restore = garden => deserializeGameSave(serializeGameSave(garden));
const sampleKey = '0,0';

function observeTransformation(garden, from, into, key = sampleKey) {
  assert.ok(TRANSFORMATIONS[from]?.some(recipe => recipe.into === into), `${from} → ${into}`);
  const before = { ...garden, objects: { ...garden.objects, [key]: makePlant(from) } };
  return updateTaskProgress({ ...garden, objects: { ...before.objects, [key]: makePlant(into) } }, before);
}

function plants(garden, specimens, isolated) {
  let next = { ...garden, objects: {}, edges: {}, mycelium: { contributions: {} },
    hexes: Object.fromEntries(Object.keys(garden.hexes).map(key => [key, defaultHex()])) };
  for (const [index, [species, moisture = 'Damp', temperature = 'Temperate', illumination = 'Dark']] of specimens.entries()) {
    const key = keyAt(index % garden.columns, Math.floor(index / garden.columns));
    next = placeObject(next, key, makePlant(species));
    next = setBaseline(next, key, 'Moisture', moisture);
    next = setBaseline(next, key, 'Temperature', temperature);
    next = setBaseline(next, key, 'Illumination', illumination);
    if (isolated) {
      for (const neighbor of neighborsOf(key)) {
        if (next.hexes[neighbor]) next = placeEdgeBlocker(next, key, neighbor, makeBlocker());
      }
    }
  }
  return next;
}

function withoutEmissions(garden, key, species, heading = 0) {
  return placeObject(garden, key, { ...makeFungus(species, heading), emissions: [] });
}

function deliver(garden, order) {
  const task = id(order);
  const amounts = taskDelivery(task);
  garden = ensureInventorySlots({ ...garden, inventory: { ...garden.inventory,
    leaves: { ...garden.inventory.leaves, ...Object.fromEntries(amounts.map(([species, quantity]) => [species, quantity + 1])) },
  } });
  const next = claim(garden, task);
  for (const [species] of amounts) assert.equal(next.inventory.leaves[species], 1);
  return next;
}

test('ordinary Beanstalk Leaf sales recover Prismorel from zero Gold and zero Spores', () => {
  let garden = createTutorialGarden();
  garden.inventory.spores.Prismorel = 0;
  garden = tradeShop(garden, 'buy', 'seed:Beanstalk', 8).garden;
  for (const key of ['0,0', '1,0']) garden = stagePlanting(garden, key, 'plant', 'Beanstalk', 4);
  garden = advanceGardenTime(applyStaging(garden, () => 0).garden, 203).garden;
  for (const key of ['0,0', '1,0']) garden = harvestPlant(garden, key);
  garden = tradeShop(garden, 'sell', 'leaf:Beanstalk', 8).garden;
  garden = tradeShop(garden, 'buy', 'spore:Prismorel', 4).garden;
  assert.equal(goldBalance(garden), 0);
  assert.equal(garden.inventory.spores.Prismorel, 4);
  assert.equal(taskStatus(garden, FIRST_TASK), 'active');
});

test('the whole main line and all eight advanced challenges can be claimed through one save', () => {
  let garden = createTutorialGarden();
  const claimOrder = order => { garden = claim(garden, id(order)); };
  const transform = (from, into, key) => { garden = observeTransformation(garden, from, into, key); };
  const setPlants = (specimens, isolated) => { garden = updateTaskProgress(plants(garden, specimens, isolated)); };
  const tick = hours => { garden = advanceGardenTime(garden, hours).garden; };
  const stock = () => shopProducts(garden, 'buy');
  garden = stagePlanting(garden, '1,1', 'plant', 'Beanstalk', 4);
  garden = stagePlanting(garden, '0,1', 'fungus', 'Prismorel', 4);
  garden = applyStaging(garden, () => 0).garden;
  tick(16);
  garden = claim(garden, FIRST_TASK);
  garden = stagePlanting(garden, '1,2', 'fungus', 'Dewmender', 4);
  garden = applyStaging(garden, () => 0).garden;
  tick(6);
  garden = claim(garden, CARE_TASK);
  assert.equal(goldBalance(garden), 8);

  setPlants([['Potato'], ['Onion']]);
  assert.equal(taskStatus(garden, id(3)), 'active', 'pre-existing specimens give no transformation credit');
  transform('Beanstalk', 'Potato');
  transform('Beanstalk', 'Onion');
  claimOrder(3);
  garden = deliver(garden, 4);

  setPlants([['Pumpkin'], ['Pumpkin'], ['Pumpkin']]);
  transform('Beanstalk', 'Pumpkin');
  assert.equal(stock().some(item => item.type === 'upgrade'), false);
  claimOrder(5);
  assert.equal(garden.rows, 5);
  assert.equal(garden.columns, 4);
  assert.equal(stock().find(item => item.id === 'upgrade:columns').addedHexes, 5);
  assert.equal(shopQuote(withGold(garden, 15), 'buy', 'upgrade:columns', 1).total, 15);
  garden = deliver(garden, 6);

  setPlants([['Rice', 'Flooded']]);
  transform('Beanstalk', 'Rice');
  assert.equal(taskStatus(garden, id(7.1)), 'active');
  transform('Beanstalk', 'Strawberry', '1,0');
  claimOrder(7);
  assert.equal(inventoryCapacity(garden), 30);
  assert.throws(() => moveInventoryStack(garden, 'seed:Beanstalk', 30), /Inventory square/);
  assert.equal(taskStatus(garden, id(8)), 'locked');
  garden = setBaseline(garden, '1,0', 'Moisture', 'Flooded');
  garden = withoutEmissions(garden, '2,0', 'Dewmender', 3);
  garden = updateTaskProgress(garden);
  claimOrder(7.1);
  garden = deliver(garden, 8);
  garden.inventory.leaves.Pumpkin = 24;
  garden = tradeShop(garden, 'sell', 'leaf:Pumpkin', 24).garden;
  const oldObjects = garden.objects;
  garden = tradeShop(garden, 'buy', 'upgrade:columns', 1).garden;
  assert.deepEqual(garden.objects, oldObjects);
  assert.equal(garden.columns, 5);
  garden = tradeShop(withGold(garden, 20), 'buy', 'upgrade:inventory', 1).garden;
  assert.equal(inventoryCapacity(restore(garden)), 40);

  setPlants([['Pumpkin'], ['Rice'], ['Carrot'], ['Potato']]);
  claimOrder(9);
  assert.equal(garden.inventory.seeds.Daisydaze, 25);
  assert.ok(stock().some(item => item.catalogId === 'weeping-statue'));
  assert.ok(!stock().some(item => item.catalogId === 'frostbell'));
  garden = tradeShop(withGold(garden, 50), 'buy', 'source:ember-pebble', 1).garden;
  assert.ok(Object.values(garden.inventory.sourceItems).some(item => item.catalogId === 'ember-pebble'));

  transform('Daisydaze', 'Marigloom');
  transform('Daisydaze', 'Charmomile');
  claimOrder(10);
  transform('Charmomile', 'Chamomeleon');
  claimOrder(11);
  assert.ok(stock().some(item => item.id === 'blocker:shade-panel:hex'));
  garden = deliver(garden, 12);
  setPlants([['Potato', 'Damp', 'Cold'], ['Pumpkin', 'Damp', 'Hot']]);
  claimOrder(12.1);
  setPlants([['Daisydaze'], ['Marigloom'], ['Charmomile']]);
  transform('Daisydaze', 'Lavendream');
  claimOrder(13);
  garden = deliver(garden, 14);
  setPlants([]);
  garden = withoutEmissions(garden, '0,0', 'Mycelord');
  tick(24);
  claimOrder(14.1);
  assert.equal(taskStatus(garden, id(24)), 'preview');
  assert.ok(taskObjectives(garden, id(24)).some(goal => goal.text.includes('Orchiwitch')));
  assert.ok(!taskObjectives(garden, id(24)).some(goal => goal.text.includes('Starlotus')));

  const colony = garden.objects['0,0'].colonyId;
  garden = withoutEmissions(garden, '1,0', 'Emberbolete');
  garden = placeObject(garden, '2,0', makePlant('Carrot'));
  garden = updateTaskProgress(garden);
  claimOrder(14.2);
  assert.equal(garden.inventory.blockers['blocker:root-barrier:edge'], 4);

  // A Root Barrier with a path around it cannot satisfy the containment task.
  const containment = TASK_IDS.find(key => TASKS[key].title === 'Contain the Spread');
  garden = placeBlockerItem(garden, 'blocker:root-barrier:edge', { type: 'edge', a: '1,0', b: '2,0' });
  garden = updateTaskProgress(garden);
  assert.equal(taskStatus(garden, containment), 'active');
  for (const key of neighborsOf('2,0')) {
    if (garden.hexes[key] && key !== '1,0') garden = setBaseline(garden, key, 'Moisture', 'Flooded');
  }
  garden = updateTaskProgress(garden);
  garden = claim(garden, containment);

  // Choose Woodlands first, then complete its specialization before the other projects.
  const woodlandScene = plants(garden, [['Charmomile']]);
  const mycelialKeys = ['0,1', '1,1', '0,2', '1,2'];
  garden = withoutEmissions(woodlandScene, '1,1', 'Mycelord');
  garden = withoutEmissions(garden, '0,1', 'Mistruffle', 2);
  garden.mycelium = { contributions: { [garden.objects['1,1'].colonyId || colony]: {
    origin: '1,1', cells: Object.fromEntries(mycelialKeys.map(key => [key, { unsupportedHours: 0 }])), frontiers: {},
  } } };
  garden = updateTaskProgress(garden);
  claimOrder(16);
  setPlants([['Moss'], ['Moss']]);
  transform('Moss', 'Bamboom');
  transform('Moss', 'Tanglethorn', '1,0');
  claimOrder(21);
  transform('Tanglethorn', 'Mistlefoe');
  transform('Mistlefoe', 'Mandrabra');
  claimOrder(21.1);
  setPlants([['Mandrabra', 'Damp', 'Temperate', 'Bright']], true);
  transform('Mandrabra', 'Mandrakadabra');
  assert.match(taskObjectives(garden, id(21.2))[0].text, /4 garden hours left/);
  tick(1);
  assert.match(taskObjectives(garden, id(21.2))[0].text, /3 garden hours left/);
  garden = updateTaskProgress(setBaseline(garden, sampleKey, 'Illumination', 'Lit'), garden);
  claimOrder(21.2);
  assert.ok(!stock().some(item => item.catalogId === 'cinder-compass'));

  setPlants([['Rice', 'Flooded'], ['Rice', 'Flooded']]);
  garden = setBaseline(setBaseline(garden, '2,0', 'Moisture', 'Flooded'), '3,0', 'Moisture', 'Flooded');
  garden = withoutEmissions(garden, '2,0', 'Dewmender', 3);
  garden = updateTaskProgress(garden);
  tick(12);
  garden = restore(garden);
  assert.match(taskObjectives(garden, id(15))[0].text, /12\/24/);
  garden = updateTaskProgress(setBaseline(garden, '1,0', 'Moisture', 'Dry'), garden);
  assert.match(taskObjectives(garden, id(15))[0].text, /0\/24/);
  garden = updateTaskProgress(setBaseline(garden, '1,0', 'Moisture', 'Flooded'), garden);
  tick(24);
  claimOrder(15);
  assert.equal(taskStatus(garden, id(17)), 'active');
  assert.ok(taskObjectives(garden, id(24)).some(goal => goal.text.includes('Starlotus')));
  transform('Sunken Lotus', 'Moonlit Lotus');
  claimOrder(20);
  setPlants([['Moonlit Lotus', 'Flooded', 'Cold', 'Dim']]);
  garden = withoutEmissions(garden, '1,0', 'Rainmorel');
  tick(23);
  assert.doesNotMatch(taskObjectives(garden, id(20.1))[0].text, /ready/);
  tick(1);
  assert.match(taskObjectives(garden, id(20.1))[0].text, /ready.*Drain/);
  garden = updateTaskProgress(reconcileTransformationClocks(setBaseline(garden, sampleKey, 'Moisture', 'Damp'), garden), garden);
  assert.equal(garden.objects[sampleKey].species, 'Starlotus');
  claimOrder(20.1);
  garden = { ...garden, objects: { ...garden.objects, [sampleKey]: {
    ...garden.objects[sampleKey], progress: 150, production: { ordinaryLeaves: 8 },
  } } };
  garden = updateTaskProgress(harvestPlant(garden, sampleKey), garden);
  claimOrder(20.2);

  setPlants([['Beanstalk', 'Dry', 'Scorching']]);
  tick(24);
  assert.match(taskObjectives(garden, id(17))[0].text, /Return this Beanstalk/);
  garden = setBaseline(setBaseline(garden, sampleKey, 'Moisture', 'Damp'), sampleKey, 'Temperature', 'Temperate');
  garden = updateTaskProgress(garden);
  claimOrder(17);
  transform('Jadeheart', 'Aloechemist');
  transform('Aloechemist', 'Aloemancer');
  claimOrder(22);
  transform('Jadeheart', 'Moonjade');
  transform('Moonjade', 'Jadewisp');
  claimOrder(22.1);
  transform('Aloemancer', 'Everjade');
  assert.equal(taskStatus(garden, id(22.2)), 'active');
  transform('Jadewisp', 'Everjade');
  claimOrder(22.2);

  setPlants([['Potato', 'Damp', 'Cold'], ['Pumpkin', 'Damp', 'Hot'], ['Strawberry', 'Damp', 'Temperate', 'Bright']], true);
  tick(12);
  claimOrder(18);
  transform('Thymekeeper', 'Oreganoir');
  transform('Thymekeeper', 'Clovely');
  claimOrder(23);
  transform('Oreganoir', 'Cinnamancer');
  transform('Clovely', 'Mighty Mint', '1,0');
  claimOrder(23.1);
  transform('Dilly-Dally Dill', 'Wyrmsalt');
  transform('Oreganoir', 'Papriking');
  garden = deliver(garden, 23.2);

  garden = tradeShop(garden, 'buy', 'upgrade:inventory', 1).garden;
  garden = deliver(garden, 19);
  assert.ok(stock().some(item => item.catalogId === 'winterglass-orb'));
  assert.ok(!stock().some(item => item.catalogId === 'sandglass-fountain'));
  transform('Marigloom', 'Orchiwitch');
  claimOrder(19.1);
  transform('Marigloom', 'Nightmarigold', '1,0');
  claimOrder(19.2);
  transform('Orchiwitch', 'Orchidemon');
  claimOrder(19.3);
  assert.ok(stock().some(item => item.catalogId === 'sandglass-fountain'));
  garden = tradeShop(garden, 'sell', 'leaf:Algea', 1).garden;
  garden = tradeShop(garden, 'sell', 'leaf:Moss', 1).garden;
  garden = tradeShop(garden, 'buy', 'upgrade:inventory', 1).garden;
  garden = deliver(garden, 24);
  garden = restore(garden);
  assert.ok([25, 26, 27, 28, 29, 30, 31, 32].every(order => taskStatus(garden, id(order)) === 'active'));

  setPlants([['Strawberry', 'Damp', 'Temperate', 'Bright'], ['Orchiwitch', 'Damp', 'Hot', 'Bright'],
    ['Pearlily', 'Flooded', 'Temperate', 'Lit'], ['Mandrabra', 'Damp', 'Temperate', 'Lit'],
    ['Jadewisp', 'Damp', 'Cold', 'Dim'], ['Dilly-Dally Dill', 'Damp', 'Cold', 'Dark']], true);
  tick(48);
  claimOrder(25);
  setPlants([['Jadeheart', 'Damp', 'Freezing'], ['Potato', 'Damp', 'Cold'], ['Beanstalk'],
    ['Pumpkin', 'Damp', 'Hot'], ['Aloechemist', 'Damp', 'Scorching']], true);
  tick(36);
  claimOrder(26);

  setPlants(Array.from({ length: 9 }, (_, i) => [['Algea', 'Sunken Lotus', 'Moonlit Lotus', 'Pearlily'][i % 4], 'Flooded']));
  garden = setBaseline(garden, '4,1', 'Moisture', 'Flooded');
  garden = withoutEmissions(garden, '4,1', 'Dewmender', 3);
  garden = updateTaskProgress(garden);
  claimOrder(27);
  setPlants([['Rice', 'Damp', 'Cold'], ['Potato', 'Damp', 'Cold'], ['Beanstalk'], ['Carrot'],
    ['Pumpkin', 'Damp', 'Hot'], ['Jadeheart', 'Damp', 'Hot']]);
  tick(36);
  claimOrder(28);
  transform('Moonlit Lotus', 'Starlotus');
  transform('Kelpergeist', 'Starlotus');
  transform('Orchiwitch', 'Orchidemon');
  transform('Charmomile', 'Orchidemon');
  claimOrder(29);
  transform('Mistlewoe', 'Tanglethorn');
  transform('Kelpless', 'Wild Watercress');
  transform('Cactastrophe', 'Prickly Pearl');
  claimOrder(30);
  setPlants([['Orchidemon'], ['Starlotus'], ['Papriking']]);
  tick(24);
  claimOrder(31);
  setPlants([['Rosewraith'], ['Kelpergeist', 'Flooded'], ['Branshee'], ['Cactacomb'], ['Phantarragon']]);
  tick(60);
  claimOrder(32);
  assert.ok(TASK_IDS.filter(key => TASKS[key].category === 'main').every(key => taskStatus(restore(garden), key) === 'completed'));
});

test('Shop respects independent land limits without resetting the layout', () => {
  let garden = resizeGarden(createTutorialGarden(), 18, 8);
  garden = withGold({ ...garden, tasks: { ...garden.tasks, claimed: [id(5)] } }, 200);
  assert.ok(!shopProducts(garden, 'buy').some(item => item.id === 'upgrade:columns'));
  const quote = shopQuote(garden, 'buy', 'upgrade:rows', 1);
  assert.equal(quote.addedHexes, 18);
  garden = tradeShop(garden, 'buy', 'upgrade:rows', 1).garden;
  assert.equal(Object.keys(garden.hexes).length, 162);
  assert.ok(!shopProducts(garden, 'buy').some(item => item.type === 'upgrade'));
});
