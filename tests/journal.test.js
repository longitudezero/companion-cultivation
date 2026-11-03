import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { createTutorialGarden, createJournal, normalizeJournal, writeNote, positionNote, removeNote, markPage,
  removePageMarker, NOTE_PAPERS, PAGE_MARKERS, shopProducts, shopQuote, tradeShop, withGold, goldBalance,
  serializeGameSave, deserializeGameSave, resizeGarden, advanceGardenTime, grantSourceItem, inventoryItems,
  FIRST_TASK, claimTask } from '../src/core/index.js';
import { BOOK_ENTRIES } from '../src/grimoire/book.js';

function collected() {
  let garden = withGold(createTutorialGarden(), 100);
  for (const id of ['paper:starlight', 'paper:moonlit', 'bookmark:forest-tassel', 'bookmark:garnet-moon']) {
    garden = tradeShop(garden, 'buy', id, 1).garden;
  }
  return garden;
}

test('new and old saves receive an empty collection; existing task rewards grant no starter stationery', () => {
  const garden = createTutorialGarden();
  assert.deepEqual(garden.journal, createJournal());
  delete garden.journal;
  assert.deepEqual(deserializeGameSave(serializeGameSave(garden)).journal, createJournal());
  garden.tasks.ready = [FIRST_TASK];
  assert.deepEqual(claimTask(garden, FIRST_TASK).journal, undefined);
});

test('all stationery is available as permanent styles and purchases change only the collection and wallet', () => {
  const garden = withGold(createTutorialGarden(), 20), before = JSON.stringify(garden);
  const styles = shopProducts(garden, 'buy').filter(item => item.permanent);
  assert.equal(styles.length, Object.keys(NOTE_PAPERS).length + Object.keys(PAGE_MARKERS).length);
  assert.ok(styles.every(item => item.price === (item.type === 'paper' ? 5 : 10) && item.owned === 0));
  const next = tradeShop(garden, 'buy', 'paper:starlight', 1).garden;
  assert.deepEqual(next.journal.papers, ['starlight']); assert.equal(goldBalance(next), 15);
  assert.deepEqual(next.inventory, garden.inventory); assert.deepEqual(next.inventorySlots, garden.inventorySlots);
  assert.deepEqual(next.tasks, garden.tasks); assert.deepEqual(next.grimoire, garden.grimoire);
  assert.equal(JSON.stringify(garden), before);
  assert.equal(shopProducts(next, 'buy').find(item => item.id === 'paper:starlight').owned, 1);
  assert.throws(() => tradeShop(next, 'buy', 'paper:starlight', 1), /Already in your stationery collection/);
  for (const quantity of [0, 2, -1, 1.2, NaN]) assert.throws(() => shopQuote(garden, 'buy', 'paper:starlight', quantity));
  assert.throws(() => tradeShop(withGold(garden, 4), 'buy', 'paper:starlight', 1), /Not enough Gold/);
  assert.throws(() => tradeShop(next, 'sell', 'paper:starlight', 1), /Only your currently held Leaves/);
});

test('a full bag can still unlock paper and page markers without consuming a square', () => {
  let garden = withGold(createTutorialGarden(), 20);
  for (let i = 0; i < 198; i++) garden = grantSourceItem(garden, 'ember-pebble');
  assert.equal(inventoryItems(garden.inventory).length, 200);
  garden = tradeShop(garden, 'buy', 'paper:starlight', 1).garden;
  garden = tradeShop(garden, 'buy', 'bookmark:forest-tassel', 1).garden;
  assert.equal(inventoryItems(garden.inventory).length, 200); assert.equal(goldBalance(garden), 5);
});

test('one note belongs to each printed page; editing and changing paper preserve placement and tucked state', () => {
  const start = collected(), before = JSON.stringify(start);
  let garden = writeNote(start, 'plant:Beanstalk', 'right', 'Try Damp soil.', 'starlight');
  garden = positionNote(garden, 'plant:Beanstalk', 'right', { x: 72.25, y: 22.5, tucked: true });
  garden = writeNote(garden, 'plant:Beanstalk', 'right', 'Compare Dark and Dim.', 'moonlit');
  garden = writeNote(garden, 'plant:Beanstalk', 'left', 'Sketch side.', 'starlight');
  assert.deepEqual(garden.journal.notes['plant:Beanstalk/right'], {
    text: 'Compare Dark and Dim.', paperId: 'moonlit', x: 72.25, y: 22.5, tucked: true });
  assert.equal(Object.keys(garden.journal.notes).length, 2);
  for (const entry of BOOK_ENTRIES) assert.doesNotThrow(() => writeNote(garden, entry.key, 'right', 'Observation', 'starlight'));
  assert.equal(JSON.stringify(start), before);
  const removed = removeNote(garden, 'plant:Beanstalk', 'right');
  assert.ok(removed.journal.notes['plant:Beanstalk/left']); assert.equal(removed.journal.notes['plant:Beanstalk/right'], undefined);
  assert.deepEqual(removed.journal.papers, start.journal.papers);
});

test('note bounds, text limits, unknown pages and unowned stationery cannot corrupt a garden', () => {
  const garden = collected(), before = JSON.stringify(garden);
  for (const [key, side, text, paper] of [
    ['plant:Beanstalk', 'right', '', 'starlight'], ['plant:Beanstalk', 'right', ' '.repeat(250), 'starlight'],
    ['plant:Beanstalk', 'right', 'a'.repeat(251), 'starlight'], ['plant:Beanstalk', 'right', 'a', 'lavender'],
    ['plant:toString', 'right', 'a', 'starlight'], ['index', 'middle', 'a', 'starlight'],
  ]) assert.throws(() => writeNote(garden, key, side, text, paper));
  let next = writeNote(garden, 'index', 'right', 'a'.repeat(250), 'starlight');
  next = positionNote(next, 'index', 'right', { x: -100, y: 1000, tucked: false });
  assert.equal(next.journal.notes['index/right'].x, 0); assert.equal(next.journal.notes['index/right'].y, 100);
  assert.throws(() => positionNote(next, 'index', 'right', { x: NaN, y: 2, tucked: true }), /Invalid note position/);
  assert.throws(() => positionNote(next, 'index', 'left', { x: 2, y: 2, tucked: true }), /no note/);
  assert.equal(JSON.stringify(garden), before);
});

test('four bookmarks can reuse a style and move without extra purchases or duplicate page markers', () => {
  let garden = collected();
  for (const [slot, entry] of BOOK_ENTRIES.slice(0, 4).entries()) garden = markPage(garden, entry.key, 'right', 'forest-tassel', slot);
  const before = JSON.stringify(garden), gold = goldBalance(garden);
  assert.throws(() => markPage(garden, 'index', 'right', 'forest-tassel'), /four markers/);
  assert.equal(JSON.stringify(garden), before);
  garden = markPage(garden, 'index', 'right', 'garnet-moon', 2);
  assert.equal(garden.journal.bookmarks.length, 4); assert.equal(garden.journal.bookmarks[2].entryKey, 'index');
  garden = markPage(garden, 'index', 'right', 'forest-tassel');
  assert.equal(garden.journal.bookmarks[2].styleId, 'forest-tassel'); assert.equal(goldBalance(garden), gold);
  assert.throws(() => markPage(garden, 'index', 'right', 'forest-tassel', 1), /already has a marker/);
  assert.throws(() => markPage(garden, 'index', 'left', 'teal-star', 2), /your collection/);
  garden = removePageMarker(garden, 2); assert.equal(garden.journal.bookmarks.length, 3);
  assert.deepEqual(garden.journal.markers, ['forest-tassel', 'garnet-moon']);
});

test('journals survive export, import, elapsed simulation and plot resizing without granting discoveries', () => {
  let garden = collected();
  const ledger = JSON.stringify(garden.grimoire);
  garden = writeNote(garden, 'plant:Carrot', 'right', '<script>Personal theory, not a discovery.</script>', 'starlight');
  garden = positionNote(garden, 'plant:Carrot', 'right', { x: 93, y: 8, tucked: true });
  garden = markPage(garden, 'plant:Carrot', 'right', 'forest-tassel');
  const loaded = deserializeGameSave(serializeGameSave(garden));
  assert.deepEqual(loaded, garden); assert.deepEqual(resizeGarden(loaded, 5, 4).journal, garden.journal);
  assert.deepEqual(advanceGardenTime(loaded, 10).garden.journal, garden.journal);
  assert.equal(JSON.stringify(garden.grimoire), ledger); assert.equal(garden.grimoire.plants.Carrot, undefined);
});

test('journal import rejects unsupported formats and cleans invalid styles, page keys, duplicates and positions', () => {
  assert.throws(() => normalizeJournal({ version: 99 }), /unsupported/);
  assert.throws(() => normalizeJournal({ ...createJournal(), papers: {} }), /unsupported/);
  const clean = normalizeJournal({ ...createJournal(), papers: ['starlight', 'starlight', 'toString'], markers: ['forest-tassel', 'unknown'],
    notes: { 'index/right': { text: 'a'.repeat(300), paperId: 'starlight', x: Infinity, y: 999, tucked: true },
      'plant:toString/left': { text: 'bad', paperId: 'starlight' }, 'index/left': { text: 'bad', paperId: 'moonlit' } },
    bookmarks: [{ slot: 0, entryKey: 'index', side: 'right', styleId: 'forest-tassel' },
      { slot: 1, entryKey: 'index', side: 'right', styleId: 'forest-tassel' },
      { slot: 0, entryKey: 'index', side: 'left', styleId: 'forest-tassel' },
      { slot: 4, entryKey: 'index', side: 'left', styleId: 'forest-tassel' }] });
  assert.deepEqual(clean.papers, ['starlight']); assert.deepEqual(clean.markers, ['forest-tassel']);
  assert.equal(clean.notes['index/right'].text.length, 250); assert.equal(clean.notes['index/right'].x, 50);
  assert.equal(clean.notes['index/right'].y, 100); assert.equal(Object.keys(clean.notes).length, 1);
  assert.equal(clean.bookmarks.length, 1); assert.deepEqual(normalizeJournal(clean), clean);
});

test('every stationery style and the inkwell has its supplied WebP asset', async () => {
  for (const file of [...Object.values(NOTE_PAPERS), ...Object.values(PAGE_MARKERS)].map(style => style.file).concat('inkwell.webp')) {
    const bytes = await readFile(new URL(`../public/grimoire/stationery/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF'); assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
});

const root = fileURLToPath(new URL('../', import.meta.url)), cache = await mkdtemp(join(root, 'node_modules', '.journal-'));
let Stationery, Shop;
try {
  await build({ entryPoints: { stationery: join(root, 'src/grimoire/Stationery.jsx'), shop: join(root, 'src/ui/Shop.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', logLevel: 'silent' });
  Stationery = await import(pathToFileURL(join(cache, 'stationery.js')));
  Shop = (await import(pathToFileURL(join(cache, 'shop.js')))).default;
} finally { await rm(cache, { recursive: true, force: true }); }
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));

test('the editor exposes only owned paper, a 250-character field and the selected printed page', () => {
  const garden = collected(), entry = BOOK_ENTRIES[1];
  const markup = render(Stationery.StationeryDesk, { garden, entry, ledger: garden.grimoire });
  assert.match(markup, /maxLength="250"/); assert.match(markup, /aria-label="Owned note papers"/);
  assert.match(markup, /Starlight Paper|Moonlit Paper/); assert.doesNotMatch(markup, /Lavender Paper/);
  assert.match(markup, /Right page · 4/); assert.match(markup, /aria-label="Stationery page"/);
  const empty = render(Stationery.StationeryDesk, { garden: createTutorialGarden(), entry, ledger: garden.grimoire });
  assert.match(empty, /Browse note papers/); assert.doesNotMatch(empty, /<textarea/);
});

test('bookmarks do not reveal undiscovered Plant names and note text is escaped', () => {
  let garden = writeNote(collected(), 'plant:Carrot', 'right', '<img src=x onerror=alert(1)>', 'starlight');
  garden = markPage(garden, 'plant:Carrot', 'right', 'forest-tassel');
  const entry = BOOK_ENTRIES.find(item => item.key === 'plant:Carrot');
  const markup = render(Stationery.PersonalBookmarks, { journal: garden.journal, ledger: garden.grimoire, current: entry });
  assert.match(markup, /Open marked page:/); assert.doesNotMatch(markup, /Carrot/);
  const note = render(Stationery.GrimoireNote, { note: garden.journal.notes['plant:Carrot/right'], side: 'right', entry });
  assert.match(note, /&lt;img/); assert.doesNotMatch(note, /<img src=x/);
});

test('shop stationery categories show single permanent unlocks and hide quantity controls', () => {
  const garden = collected();
  const papers = render(Shop, { garden, initialCategory: 'papers' });
  assert.match(papers, /Starlight Paper, 5 Gold, Unlocked/); assert.match(papers, /In your stationery collection/);
  assert.doesNotMatch(papers, /Shop quantity/); assert.match(papers, /Style unlocked/);
  const markers = render(Shop, { garden, initialCategory: 'bookmarks' });
  assert.match(markers, /Forest Tassel Marker/); assert.doesNotMatch(markers, /Shop quantity/);
});
