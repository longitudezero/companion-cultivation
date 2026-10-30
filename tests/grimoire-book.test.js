import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANTS, FUNGI } from '../src/core/species.js';
import { createGrimoire, revealPlant, migrateGrimoire, observeFungalAction } from '../src/core/grimoire.js';
import { TRANSFORMATIONS } from '../src/core/transformations.js';
import { BOOK_ENTRIES, CHAPTERS, entryKnown, entryName, runeName, atlasGraph, atlasLayout,
  tabIsLeft, observedEffects, observedTransformations, fungusTransformationTargets, initialNavigation, bookNavigation,
  stationaryPages, turningPages, turnDuration, DISCOVERY_PHRASES, discoveryPhrase } from '../src/grimoire/book.js';
import { previewFungusProfile, previewFungusEffects, recipeReferencesFungus } from '../src/core/grimoire-preview.js';

test('all Plant pages and references exist before discovery and keep their places as knowledge grows', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const plants = BOOK_ENTRIES.filter(entry => entry.kind === 'plant');
  assert.equal(plants.length, Object.keys(PLANTS).length);
  assert.equal(BOOK_ENTRIES.filter(entry => entry.kind === 'fungus').length, Object.keys(FUNGI).length);
  assert.equal(new Set(BOOK_ENTRIES.map(entry => entry.key)).size, BOOK_ENTRIES.length);
  assert.equal(new Set(plants.map(entry => runeName(entry.species))).size, plants.length);
  const carrot = plants.find(entry => entry.species === 'Carrot');
  const pageBefore = carrot.page, unknown = entryName(carrot, ledger);
  assert.match(unknown, /^[\u16a0-\u16ff]{6,8}$/u);
  assert.equal(entryKnown(carrot, ledger), false);
  assert.equal(entryName(carrot, migrateGrimoire(ledger)), unknown);
  assert.equal(entryName(carrot, revealPlant(ledger, 'Carrot')), 'Carrot');
  assert.equal(entryName(carrot, ledger, true), 'Carrot');
  assert.equal(carrot.page, pageBefore);
  assert.equal(JSON.stringify(ledger), before);
  assert.equal(runeName('Mandrabra'), 'ᚱᛊᛏᚹᚲᛊ');
  for (const entry of plants) {
    assert.equal(entry.page, entry.index * 2 + 1);
    assert.equal(entryName(entry, ledger), entryName({ ...entry }, ledger));
  }
});

test('a chapter bookmark is on the left from its opening overview', () => {
  for (const [chapter, definition] of CHAPTERS.entries()) {
    const start = BOOK_ENTRIES.find(entry => entry.chapter === chapter);
    assert.equal(start.kind, chapter === 7 ? 'index' : 'overview');
    assert.equal(tabIsLeft(chapter, start), true);
    for (let i = chapter + 1; i < CHAPTERS.length; i++) assert.equal(tabIsLeft(i, start), false);
    for (let i = 0; i < chapter; i++) assert.equal(tabIsLeft(i, start), true);
    assert.equal(definition.label, definition.key);
  }
});

test('every atlas keeps all canonical connections in compact, separate branches, including joins and cycles', () => {
  for (let chapter = 0; chapter < 6; chapter++) {
    const graph = atlasGraph(chapter), names = new Set(graph.entries.map(entry => entry.species));
    const expected = new Set([...names].flatMap(from => (TRANSFORMATIONS[from] || [])
      .filter(recipe => names.has(recipe.into)).map(recipe => `plant:${from}->plant:${recipe.into}`)));
    assert.deepEqual(new Set(graph.edges.map(edge => `${edge.from}->${edge.into}`)), expected);
    for (const width of [100, 160, 300, 384, 520]) {
      const layout = atlasLayout(chapter, width);
      assert.equal(layout.nodes.filter(node => !node.reference).length, names.size);
      assert.equal(new Set(layout.nodes.map(node => node.id)).size, layout.nodes.length);
      assert.deepEqual(new Set(layout.edges.map(edge => `${edge.from}->${edge.into}`)), expected);
      assert.equal(layout.edges.length, expected.size);
      assert.ok(layout.width <= Math.max(width, 136), 'branches fit the page without a wide map');
      const byId = new Map(layout.nodes.map(node => [node.id, node]));
      for (const node of layout.nodes) {
        assert.ok(node.width >= 112);
        assert.ok(node.x >= 0 && node.x + node.width <= layout.width);
        assert.ok(node.y >= 0 && node.y + node.height <= layout.height);
        if (node.reference) {
          const original = byId.get(node.key);
          assert.equal(node.page, original.page);
          assert.equal(entryName(node, createGrimoire()), entryName(original, createGrimoire()));
        }
      }
      for (const edge of layout.edges) {
        assert.ok(!edge.path.includes('NaN'));
        const source = byId.get(edge.sourceId), target = byId.get(edge.targetId);
        assert.equal(source.group, target.group);
        assert.equal(source.group, edge.group, 'each arrow connects a source and destination in the same branch');
        if (layout.vertical) {
          assert.equal(source.x, target.x);
          assert.ok(source.y + source.height < target.y);
        } else assert.ok(source.x + source.width < target.x, 'arrows stay in the clear corridor between plaques');
      }
      for (const [index, group] of layout.groups.entries()) {
        if (index) assert.ok(layout.groups[index - 1].y + layout.groups[index - 1].height < group.y,
          'independent branches never overlap');
      }
      for (const [index, node] of layout.nodes.entries()) for (const other of layout.nodes.slice(index + 1)) {
        assert.ok(node.x + node.width <= other.x || other.x + other.width <= node.x
          || node.y + node.height <= other.y || other.y + other.height <= node.y,
        'plaques and their page references never overlap');
      }
    }
  }
});

test('twenty stable anticipation phrases include wary notes without naming undiscovered Plants', () => {
  assert.equal(DISCOVERY_PHRASES.length, 20);
  assert.equal(new Set(DISCOVERY_PHRASES).size, 20);
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const species of Object.keys(PLANTS)) {
    const phrase = discoveryPhrase(species, ledger);
    assert.equal(phrase, discoveryPhrase(species, JSON.parse(before)));
    for (const name of Object.keys(PLANTS)) assert.ok(!phrase.includes(name), name);
  }
  const wary = Object.keys(PLANTS).find(species => discoveryPhrase(species, ledger) === DISCOVERY_PHRASES[16]);
  assert.ok(wary);
  assert.match(discoveryPhrase(wary, revealPlant(ledger, 'Kelpergeist')), /doesn’t stink like the Kelpergeist/);
  assert.equal(JSON.stringify(ledger), before);
});

test('both entries show the same observed cultivation response while environmental event logs stay out of the lists', () => {
  let ledger = revealPlant(createGrimoire(), 'Carrot');
  ledger = observeFungalAction(ledger, 'Carrot', 'Dewmender', 'ripeningRate', 1);
  ledger = { ...ledger, fungalEffects: { ...ledger.fungalEffects, Carrot: { ...ledger.fungalEffects.Carrot,
    environment: { fungus: 'Dewmender', kind: 'environment:Moisture', direction: 0, result: 'Damp' } } } };
  const before = JSON.stringify(ledger);
  const plant = observedEffects(ledger, 'Carrot'), fungus = observedEffects(ledger, 'Dewmender', true);
  assert.deepEqual(plant, fungus);
  assert.equal(plant.length, 1);
  assert.equal(plant[0].kind, 'ripeningRate');
  assert.equal(JSON.stringify(ledger), before, 'old environmental observations remain saved');
});

test('a helpful but unnamed Fungus does not receive a Transformation entry', () => {
  const base = revealPlant(revealPlant(createGrimoire(), 'Carrot'), 'Pumpkin');
  const ledger = { ...base, transformations: [
    { from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel', 'Dewmender'], conditions: {}, hours: 10 },
    { from: 'Beanstalk', into: 'Pumpkin', fungi: ['Emberbolete', 'Dewmender'], conditions: {}, hours: 24 },
  ] };
  assert.equal(observedTransformations(ledger, 'Dewmender', true).length, 0);
  assert.equal(observedTransformations(ledger, 'Prismorel', true).length, 1);
  assert.equal(observedTransformations(ledger, 'Emberbolete', true).length, 1);
  assert.equal(observedTransformations(ledger, 'Carrot').length, 1);
});

test('Fungus destinations contain only deduplicated qualifying results and keep unobserved routes hidden', () => {
  let ledger = revealPlant(createGrimoire(), 'Carrot');
  ledger = { ...ledger, transformations: [
    { from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel', 'Dewmender'], conditions: {}, hours: 10 },
    { from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel'], conditions: {}, hours: 10 },
    { from: 'Beanstalk', into: 'Pumpkin', fungi: ['Emberbolete'], conditions: {}, hours: 24 },
  ] };
  const before = JSON.stringify(ledger);
  assert.deepEqual(fungusTransformationTargets(ledger, 'Prismorel').map(entry => entry.species), ['Carrot']);
  assert.deepEqual(fungusTransformationTargets(ledger, 'Dewmender'), []);
  assert.deepEqual(fungusTransformationTargets(ledger, 'Emberbolete'), [], 'unknown results stay hidden');
  for (const fungus of Object.keys(FUNGI)) {
    const expected = new Set(Object.values(TRANSFORMATIONS).flatMap(recipes => recipes
      .filter(recipe => recipeReferencesFungus(recipe, fungus)).map(recipe => recipe.into)));
    const targets = fungusTransformationTargets(ledger, fungus, true);
    assert.deepEqual(new Set(targets.map(entry => entry.species)), expected, fungus);
    assert.equal(targets.length, expected.size);
    assert.ok(targets.every(entry => entry.kind === 'plant'));
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('forward and backward turns keep the outgoing stationary page until the sheet has turned', () => {
  assert.deepEqual(stationaryPages(4, { from: 4, to: 5 }), { left: 4, right: 5 });
  assert.deepEqual(stationaryPages(5, { from: 5, to: 4 }), { left: 4, right: 5 });
  assert.deepEqual(stationaryPages(4, null), { left: 4, right: 4 });
  assert.deepEqual(turningPages({ from: 4, to: 5 }), {
    front: { index: 4, side: 'right' }, back: { index: 5, side: 'left' },
  });
  assert.deepEqual(turningPages({ from: 5, to: 4 }), {
    front: { index: 5, side: 'left' }, back: { index: 4, side: 'right' },
  });
});

test('long jumps traverse every spread faster, ignore overlapping input, and reject stale animation completions', () => {
  for (const [start, destination] of [[0, BOOK_ENTRIES.length - 1], [BOOK_ENTRIES.length - 1, 0]]) {
    let state = { ...initialNavigation, current: start, target: start };
    state = bookNavigation(state, { type: 'navigate', to: destination });
    assert.ok(state.duration < turnDuration(1));
    let turns = 0;
    while (state.current !== destination) {
      const before = state.current;
      state = bookNavigation(state, { type: 'begin', ledger: createGrimoire(), preview: false });
      assert.equal(state.turn.to, before + Math.sign(destination - before));
      assert.equal(bookNavigation(state, { type: 'navigate', to: 4 }), state);
      assert.equal(bookNavigation(state, { type: 'finish', id: state.turn.id - 1 }), state);
      state = bookNavigation(state, { type: 'finish', id: state.turn.id });
      turns++;
    }
    assert.equal(turns, Math.abs(destination - start));
    assert.equal(state.turn, null);
  }
  assert.equal(bookNavigation(initialNavigation, { type: 'navigate', to: -1 }), initialNavigation);
  const reduced = bookNavigation(initialNavigation, { type: 'navigate', to: 12, reduced: true });
  assert.equal(reduced.current, 12);
  assert.equal(reduced.turn, null);
});

test('book labels describe shared Spread, initial radius, affinity, Waterborne continuation, and correct effect units', () => {
  const dewmender = previewFungusProfile('Dewmender').join(' ');
  assert.match(dewmender, /Mycelial affinity: Independent/);
  assert.match(dewmender, /Area of Effect: radius 2/);
  assert.match(dewmender, /Spread: 4 shared steps/);
  assert.match(dewmender, /connected Flooded/);
  assert.doesNotMatch(dewmender, /Budget|Habitat:/);
  assert.ok(previewFungusEffects('Dewmender').some(line => line.includes('+20%')));
  assert.ok(previewFungusEffects('Dewmender').some(line => line.includes('+8 pp')));
});
