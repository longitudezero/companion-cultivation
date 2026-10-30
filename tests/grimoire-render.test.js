import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { createGrimoire, revealPlant, observeFungalAction } from '../src/core/grimoire.js';
import { BOOK_ENTRIES, entryName } from '../src/grimoire/book.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = await mkdtemp(join(root, 'node_modules', '.grimoire-render-'));
let BookSpread, Grimoire;
try {
  await build({ entryPoints: { spread: join(root, 'src/grimoire/BookSpread.jsx'), modal: join(root, 'src/CultivationGrimoire.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external',
    loader: { '.css': 'empty' }, logLevel: 'silent' });
  BookSpread = (await import(pathToFileURL(join(cache, 'spread.js')))).default;
  Grimoire = (await import(pathToFileURL(join(cache, 'modal.js')))).default;
} finally {
  await rm(cache, { recursive: true, force: true });
}
const text = markup => markup.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
const spread = (entry, side, ledger, preview = false) => renderToStaticMarkup(React.createElement(BookSpread,
  { entry, side, ledger, preview, navigate() {}, glossary() {} }));

test('every hidden Plant page masks its name and facts in rendered titles, copy, and image descriptions', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  for (const entry of BOOK_ENTRIES.filter(entry => entry.kind === 'plant' && !ledger.plants[entry.species])) {
    const left = spread(entry, 'left', ledger), right = spread(entry, 'right', ledger);
    assert.ok(text(left).includes(entryName(entry, ledger)), entry.species);
    assert.ok(!text(left).includes(entry.species), entry.species);
    assert.ok(!text(right).includes(entry.species), entry.species);
    assert.match(left, /unknown-seeds\.webp/);
    assert.doesNotMatch(left, new RegExp(`alt="[^"]*${entry.species}`));
    assert.match(text(right), /Room for a Discovery/);
    assert.doesNotMatch(text(right), /Moisture:|Temperature:|Living Fungus contact:/);
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

test('observed effect terms have accessible help and shared Plant/Fungus copy', () => {
  let ledger = revealPlant(createGrimoire(), 'Carrot');
  ledger = observeFungalAction(ledger, 'Carrot', 'Dewmender', 'ripeningRate', 1);
  for (const species of ['Carrot', 'Dewmender']) {
    const entry = BOOK_ENTRIES.find(item => item.species === species);
    const rendered = spread(entry, 'right', ledger);
    assert.match(text(rendered), /Ripening speed.*increased/);
    assert.match(rendered, /class="cg-effect-term"/);
    assert.match(rendered, /aria-describedby=/);
    assert.doesNotMatch(text(rendered), /shifted to Damp/);
  }
});

test('the integrated modal opens at a family overview with engraved controls, sixteen sheets, and no numbered-name leaks', () => {
  const ledger = createGrimoire(), before = JSON.stringify(ledger);
  const rendered = renderToStaticMarkup(React.createElement(Grimoire, { garden: { grimoire: ledger }, onClose() {} }));
  assert.match(rendered, /role="dialog" aria-modal="true"/);
  assert.match(rendered, /cg-tab left[^>]*aria-current="page"/);
  assert.match(rendered, /Transformation Atlas/);
  assert.match(rendered, /cg-close-icon/);
  assert.match(rendered, /cg-close-icon-glow/);
  assert.equal((rendered.match(/class="cg-under-sheet /g) || []).length, 16);
  assert.match(rendered, /aria-label="Next spread"/);
  assert.ok(!text(rendered).includes('Carrot'));
  assert.equal(JSON.stringify(ledger), before);
});
