import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { createGrimoire, revealPlant, observeFungalAction } from '../src/core/grimoire.js';
import { FUNGI } from '../src/core/species.js';
import { SOURCE_ITEM_GROUPS } from '../src/core/source-item-catalog.js';
import { BLOCKER_DESIGNS } from '../src/core/blocker-catalog.js';
import { effectAmount, EFFECT_DEFINITIONS } from '../src/grimoire/effects.js';
import { BOOK_ENTRIES, TOOL_SPREADS, BLOCKER_SPREADS, entryName } from '../src/grimoire/book.js';
import { illustrationFor } from '../src/grimoire/illustrations.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(root, 'node_modules', '.grimoire-render-'));
let BookSpread, Grimoire, TurningLeaf;
try {
  await build({ entryPoints: { spread: join(root, 'src/grimoire/BookSpread.jsx'), modal: join(root, 'src/CultivationGrimoire.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external',
    loader: { '.css': 'empty' }, logLevel: 'silent' });
  BookSpread = (await import(pathToFileURL(join(cache, 'spread.js')))).default;
  const modal = await import(pathToFileURL(join(cache, 'modal.js')));
  Grimoire = modal.default;
  TurningLeaf = modal.TurningLeaf;
} finally {
  await rm(cache, { recursive: true, force: true });
}
const text = markup => markup.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const spread = (entry, side, ledger, preview = false, unlockedSourceGroup = 0, unlockedBlockers = new Set()) => renderToStaticMarkup(React.createElement(BookSpread,
  { entry, side, ledger, preview, unlockedSourceGroup, unlockedBlockers, navigate() {}, glossary() {} }));

test('Garden Tools art assets are packaged as valid WebP files', async () => {
  for (const asset of ['unknown-tools.webp', 'tools-left-border.webp', 'tools-right-border.webp',
    'tabs/tools.webp', 'icons/tools.webp']) {
    const bytes = await readFile(join(root, 'public', 'grimoire', asset));
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', asset);
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', asset);
    assert.ok(bytes.length > 1_000, asset);
  }
});

test('locked Garden Tools groups use runes and unidentified art without leaking catalogue facts', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const definition of TOOL_SPREADS) {
    const entry = BOOK_ENTRIES.find(item => item.key === definition.key);
    for (const side of ['left', 'right']) {
      const page = definition[side];
      if (page.kind !== 'source-group') continue;
      const rendered = spread(entry, side, ledger), copy = text(rendered);
      assert.match(rendered, /unknown-tools\.webp/);
      assert.match(rendered, /cg-runes/);
      assert.match(copy, /Guild seal has not yet been broken/);
      assert.doesNotMatch(copy, /Influence|Reach|Duration|Item description goes here/);
      const group = SOURCE_ITEM_GROUPS[page.group];
      assert.ok(!copy.includes(group.name), group.name);
      for (const item of group.items) {
        assert.ok(!copy.includes(item.name), item.name);
        assert.ok(!rendered.includes(`/ui/source-items/${item.id}.webp`), item.id);
      }
    }
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('unlocked and developer-preview Garden Tools reveal canonical facts without changing progression', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const emergency = BOOK_ENTRIES.find(entry => entry.key === 'tools:emergency-directional');
  const revealed = spread(emergency, 'left', ledger, false, 2);
  assert.match(text(revealed), /Emergency Measures/);
  assert.match(revealed, /frostbell\.webp/);
  assert.match(text(revealed), /Frostbell Item description goes here Influence Cooling/);
  assert.match(text(revealed), /Cooling.*\+1 Reach Area · Radius 2 Duration 6m at 1×/);
  assert.match(revealed, /class="cg-effect-term"/);

  const allPages = TOOL_SPREADS.flatMap(definition => {
    const entry = BOOK_ENTRIES.find(item => item.key === definition.key);
    return ['left', 'right'].filter(side => definition[side].kind === 'source-group')
      .map(side => spread(entry, side, ledger, true));
  }).join('');
  const allItems = SOURCE_ITEM_GROUPS.flatMap(group => group.items);
  for (const item of allItems) {
    assert.equal((allPages.match(new RegExp(`<img src="/ui/source-items/${item.id}\\.webp"`, 'g')) || []).length, 1, item.id);
    assert.equal((text(allPages).match(new RegExp(`\\b${item.name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`, 'g')) || []).length, 1, item.name);
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('Blocker art and Grimoire furniture are packaged as valid WebP files', async () => {
  const assets = BLOCKER_DESIGNS.flatMap(design => [`ui/blockers/${design.id}-edge.webp`, `ui/blockers/${design.id}-full.webp`]);
  assets.push('grimoire/blockers-left-border.webp', 'grimoire/blockers-right-border.webp',
    'grimoire/tabs/blockers.webp', 'grimoire/icons/blockers.webp');
  for (const asset of assets) {
    const bytes = await readFile(join(root, 'public', asset));
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', asset);
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', asset);
    assert.ok(bytes.length > 1_000, asset);
  }
});

test('locked Blocker families use runes and unidentified art without leaking their names or effects', () => {
  const ledger = createGrimoire();
  for (const definition of BLOCKER_SPREADS) {
    const entry = BOOK_ENTRIES.find(item => item.key === definition.key);
    for (const side of ['left', 'right']) {
      const page = definition[side];
      if (page.kind !== 'blocker-group') continue;
      const rendered = spread(entry, side, ledger), copy = text(rendered);
      assert.match(rendered, /unknown-tools\.webp/);
      assert.match(rendered, /cg-runes/);
      assert.doesNotMatch(copy, /Item description goes here|Shared edge|Reusable after retrieval|Blocks/);
      for (const design of BLOCKER_DESIGNS) {
        assert.ok(!copy.includes(design.name), design.name);
        assert.ok(!rendered.includes(`/ui/blockers/${design.id}-edge.webp`), design.id);
        assert.ok(!rendered.includes(`/ui/blockers/${design.id}-full.webp`), design.id);
      }
    }
  }
});

test('task-unlocked and preview Blocker pages reveal both matching forms exactly once', () => {
  const ledger = createGrimoire(), first = BOOK_ENTRIES.find(entry => entry.key === 'blockers:opening');
  const partial = spread(first, 'right', ledger, false, 0, new Set(['root-barrier']));
  assert.match(text(partial), /Root Barrier Item description goes here Blocks Mycelial/);
  assert.match(partial, /root-barrier-edge\.webp/);
  assert.match(partial, /root-barrier-full\.webp/);
  assert.doesNotMatch(text(partial), /Windbreak/);

  const allPages = BLOCKER_SPREADS.flatMap(definition => {
    const entry = BOOK_ENTRIES.find(item => item.key === definition.key);
    return ['left', 'right'].filter(side => definition[side].kind === 'blocker-group')
      .map(side => spread(entry, side, ledger, true));
  }).join('');
  for (const design of BLOCKER_DESIGNS) {
    assert.equal((allPages.match(new RegExp(`<img src="/ui/blockers/${design.id}-edge\\.webp`, 'g')) || []).length, 1, design.id);
    assert.equal((allPages.match(new RegExp(`<img src="/ui/blockers/${design.id}-full\\.webp`, 'g')) || []).length, 1, design.id);
    assert.equal((text(allPages).match(new RegExp(`\\b${design.name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\b`, 'g')) || []).length, 1, design.name);
  }
});

test('both directions mount the correct incoming printed back page before a leaf begins turning', () => {
  const ledger = createGrimoire();
  for (const [from, to, frontSide, backSide] of [[1, 2, 'right', 'left'], [2, 1, 'left', 'right'],
    [4, BOOK_ENTRIES.length - 1, 'right', 'left'], [BOOK_ENTRIES.length - 5, 0, 'left', 'right']]) {
    const rendered = renderToStaticMarkup(React.createElement(TurningLeaf, {
      turn: { id: 1, from, to }, duration: 600, movingTabs: [], onFinish() {},
      page(index, side) { return React.createElement(BookSpread, {
        entry: BOOK_ENTRIES[index], side, ledger, preview: false, navigate() {}, glossary() {},
      }); },
    }));
    const frontPage = BOOK_ENTRIES[from].page + (frontSide === 'right' ? 1 : 0);
    const backPage = BOOK_ENTRIES[to].page + (backSide === 'right' ? 1 : 0);
    assert.ok(rendered.includes(`class="cg-turn-face front" data-printed-page="${frontPage}"`));
    assert.ok(rendered.includes(`class="cg-turn-face back" data-printed-page="${backPage}"`));
    const backStart = rendered.indexOf('class="cg-turn-face back"');
    assert.ok(text(rendered.slice(0, backStart)).includes(text(spread(BOOK_ENTRIES[from], frontSide, ledger))));
    assert.ok(text(rendered.slice(backStart)).includes(text(spread(BOOK_ENTRIES[to], backSide, ledger))));
  }
});

test('every hidden Plant page masks its name and facts in rendered titles, copy, and image descriptions', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const entry of BOOK_ENTRIES.filter(entry => entry.kind === 'plant' && !ledger.plants[entry.species])) {
    const left = spread(entry, 'left', ledger), right = spread(entry, 'right', ledger);
    assert.ok(text(left).includes(entryName(entry, ledger)), entry.species);
    assert.ok(!text(left).includes(entry.species), entry.species);
    assert.ok(!text(right).includes(entry.species), entry.species);
    assert.match(left, /unknown-seeds\.webp/);
    assert.doesNotMatch(left, /grimoire\/illustrations\//);
    assert.doesNotMatch(left, new RegExp(`alt="[^"]*${entry.species}`));
    assert.match(text(right), /Room for a Discovery/);
    assert.doesNotMatch(text(right), /Moisture:|Temperature:|Living Fungus contact:/);
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('every identified Plant and Fungus uses its supplied illustration while preview leaves discoveries intact', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const entry of BOOK_ENTRIES.filter(item => ['plant', 'fungus'].includes(item.kind))) {
    const illustration = illustrationFor(entry.species);
    assert.ok(illustration, entry.species);
    const identified = entry.kind === 'plant' ? revealPlant(ledger, entry.species) : ledger;
    for (const rendered of [spread(entry, 'left', identified), spread(entry, 'left', ledger, true)]) {
      assert.ok(rendered.includes(`src="${illustration.src}"`), entry.species);
      assert.match(rendered, /class="cg-species-illustration"/);
      assert.doesNotMatch(rendered, /Botanical plate awaiting illustration|unknown-seeds\.webp/);
    }
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('revealing a Plant updates its entry, family list, atlas, and dropdown consistently without unlocking other facts', () => {
  const carrot = BOOK_ENTRIES.find(entry => entry.species === 'Carrot');
  const family = BOOK_ENTRIES.find(entry => entry.key === 'family:Ingredients');
  const ledger = revealPlant(createGrimoire(), 'Carrot');
  for (const [entry, side] of [[carrot, 'left'], [family, 'left'], [family, 'right']]) {
    assert.ok(text(spread(entry, side, ledger)).includes('Carrot'));
  }
  const notes = text(spread(carrot, 'right', ledger));
  assert.match(notes, /Not yet observed/);
  assert.doesNotMatch(notes, /Hold for|Dry exposure|Moisture: Damp/);
});

test('developer reference shows canonical information while normal render stays discovery-driven', () => {
  const carrot = BOOK_ENTRIES.find(entry => entry.species === 'Carrot');
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const reference = text(spread(carrot, 'left', ledger, true) + spread(carrot, 'right', ledger, true));
  assert.match(reference, /Carrot/);
  assert.match(reference, /Moisture growth multipliers/);
  assert.match(reference, /Base Fungus Compatibility/);
  assert.match(reference, /Transformations/);
  assert.equal(JSON.stringify(ledger), before);
  assert.ok(!text(spread(carrot, 'left', ledger)).includes('Carrot'));
});

test('Plant observations and public Fungus effects retain accessible glossary links', () => {
  let ledger = revealPlant(createGrimoire(), 'Carrot');
  ledger = observeFungalAction(ledger, 'Carrot', 'Dewmender', 'ripeningRate', 1);
  for (const species of ['Carrot', 'Dewmender']) {
    const entry = BOOK_ENTRIES.find(item => item.species === species);
    const rendered = spread(entry, 'right', ledger);
    assert.match(text(rendered), species === 'Carrot' ? /Ripening speed.*increased/ : /Ripening speed.*\+20%/);
    assert.match(rendered, /class="cg-effect-term"/);
    assert.match(rendered, /aria-describedby=/);
    assert.doesNotMatch(text(rendered), /shifted to Damp/);
  }
});

test('every Fungus exposes its base cultivation effects from the beginning without a Plant-response list', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const entry of BOOK_ENTRIES.filter(item => item.kind === 'fungus')) {
    const rendered = spread(entry, 'right', ledger), copy = text(rendered);
    assert.match(rendered, /<h2>Cultivation Influence<\/h2>/);
    assert.doesNotMatch(copy, /Observed Plant responses|Not yet observed/);
    const effects = FUNGI[entry.species].cultivation?.effects || [];
    if (!effects.length) assert.match(copy, /No cultivation influence/);
    for (const effect of effects) {
      assert.ok(copy.includes(EFFECT_DEFINITIONS[effect.kind].label), entry.species);
      assert.ok(copy.includes(effectAmount(effect)), entry.species);
    }
    assert.match(copy, /No Transformation destinations discovered yet/);
  }
  assert.equal(JSON.stringify(ledger), before);
});

test('Fungus Transformations render only learned destination links, with no recipe instructions in either mode', () => {
  const base = revealPlant(revealPlant(createGrimoire(), 'Carrot'), 'Pumpkin');
  const ledger = { ...base, transformations: [
    { from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel', 'Dewmender'], conditions: { Moisture: 'Dry' }, hours: 10 },
    { from: 'Beanstalk', into: 'Carrot', fungi: ['Prismorel'], conditions: { Moisture: 'Dry' }, hours: 10 },
  ] };
  const prismorel = BOOK_ENTRIES.find(entry => entry.species === 'Prismorel');
  const rendered = spread(prismorel, 'right', ledger);
  assert.match(text(rendered), /This Fungus is necessary to transform into these Plants:/);
  assert.equal((rendered.match(/aria-label="Open Carrot, page 7"/g) || []).length, 1);
  assert.doesNotMatch(text(rendered), /Pumpkin|Beanstalk|Moisture:|Exposure:|Hold for|Living Fungus contact:/);
  for (const entry of BOOK_ENTRIES.filter(item => item.kind === 'fungus')) {
    assert.doesNotMatch(text(spread(entry, 'right', ledger, true)), /Hold for|Moisture:|Temperature:|Living Fungus contact:|Prepare:|Finish:/);
  }
  const helpfulOnly = BOOK_ENTRIES.find(entry => entry.species === 'Dewmender');
  assert.doesNotMatch(spread(helpfulOnly, 'right', ledger), /aria-label="Open Carrot/);
});

test('the nonmodal book opens at a family overview with engraved controls, sixteen sheets, and no numbered-name leaks', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const rendered = renderToStaticMarkup(React.createElement(Grimoire, { garden: { grimoire: ledger }, onClose() {} }));
  assert.match(rendered, /role="dialog" aria-modal="false"/);
  assert.match(rendered, /cg-tab left[^>]*aria-current="page"/);
  assert.match(rendered, /Transformation Atlas/);
  assert.match(rendered, /cg-close-icon/);
  assert.match(rendered, /cg-close-icon-glow/);
  assert.equal((rendered.match(/class="cg-under-sheet /g) || []).length, 16);
  assert.match(rendered, /aria-label="Next spread"/);
  assert.ok(!text(rendered).includes('Carrot'));
  assert.equal(JSON.stringify(ledger), before);
});
