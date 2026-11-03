import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { build } from 'esbuild';
import { createTutorialGarden, createJournal, normalizeJournal, writeNote, positionNote, removeNote, markPage,
  removePageMarker, movePageMarker, pageNotes, NOTE_PAPERS, PAGE_MARKERS, shopProducts, shopQuote, tradeShop, withGold, goldBalance,
  serializeGameSave, deserializeGameSave, resizeGarden, advanceGardenTime, grantSourceItem, inventoryItems,
  FIRST_TASK, claimTask } from '../src/core/index.js';
import { BOOK_ENTRIES } from '../src/grimoire/book.js';
import { markerPage, markerIsLeft, markerDisplayX, travellingMarkers, noteDrop, markerDrop } from '../src/grimoire/stationery-model.js';

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

test('many notes can share a printed page; editing one preserves every other note and its own placement', () => {
  const start = collected(), before = JSON.stringify(start);
  let garden = writeNote(start, 'plant:Beanstalk', 'right', 'Try Damp soil.', 'starlight');
  garden = positionNote(garden, 'note:1', { x: 72.25, y: 22.5, tucked: true });
  garden = writeNote(garden, 'plant:Beanstalk', 'right', 'Compare Dark and Dim.', 'moonlit', 'note:1');
  garden = writeNote(garden, 'plant:Beanstalk', 'right', 'Another experiment.', 'starlight');
  garden = writeNote(garden, 'plant:Beanstalk', 'left', 'Sketch side.', 'starlight');
  assert.deepEqual(garden.journal.notes['note:1'], { id: 'note:1', entryKey: 'plant:Beanstalk', side: 'right',
    text: 'Compare Dark and Dim.', paperId: 'moonlit', x: 72.25, y: 22.5, tucked: true });
  assert.equal(Object.keys(garden.journal.notes).length, 3);
  for (const entry of BOOK_ENTRIES) assert.doesNotThrow(() => writeNote(garden, entry.key, 'right', 'Observation', 'starlight'));
  assert.equal(JSON.stringify(start), before);
  const removed = removeNote(garden, 'note:1');
  assert.equal(pageNotes(removed.journal, 'plant:Beanstalk', 'left').length, 1);
  assert.equal(pageNotes(removed.journal, 'plant:Beanstalk', 'right').length, 1);
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
  next = positionNote(next, 'note:1', { x: -100, y: 1000, tucked: false });
  assert.equal(next.journal.notes['note:1'].x, 0); assert.equal(next.journal.notes['note:1'].y, 100);
  assert.throws(() => positionNote(next, 'note:1', { x: NaN, y: 2, tucked: true }), /Invalid note position/);
  assert.throws(() => positionNote(next, 'note:2', { x: 2, y: 2, tucked: true }), /no note/);
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
  garden = positionNote(garden, 'note:1', { x: 93, y: 8, tucked: true });
  garden = markPage(garden, 'plant:Carrot', 'right', 'forest-tassel');
  const loaded = deserializeGameSave(serializeGameSave(garden));
  assert.deepEqual(loaded, garden); assert.deepEqual(resizeGarden(loaded, 5, 4).journal, garden.journal);
  assert.deepEqual(advanceGardenTime(loaded, 10).garden.journal, garden.journal);
  assert.equal(JSON.stringify(garden.grimoire), ledger); assert.equal(garden.grimoire.plants.Carrot, undefined);
});

test('journal import rejects unsupported formats and cleans invalid styles, page keys, duplicates and positions', () => {
  assert.throws(() => normalizeJournal({ version: 99 }), /unsupported/);
  assert.throws(() => normalizeJournal({ ...createJournal(), papers: {} }), /unsupported/);
  const clean = normalizeJournal({ ...createJournal(), version: 1, papers: ['starlight', 'starlight', 'toString'], markers: ['forest-tassel', 'unknown'],
    notes: { 'index/right': { text: 'a'.repeat(300), paperId: 'starlight', x: Infinity, y: 999, tucked: true },
      'plant:toString/left': { text: 'bad', paperId: 'starlight' }, 'index/left': { text: 'bad', paperId: 'moonlit' } },
    bookmarks: [{ slot: 0, entryKey: 'index', side: 'right', styleId: 'forest-tassel' },
      { slot: 1, entryKey: 'index', side: 'right', styleId: 'forest-tassel' },
      { slot: 0, entryKey: 'index', side: 'left', styleId: 'forest-tassel' },
      { slot: 4, entryKey: 'index', side: 'left', styleId: 'forest-tassel' }] });
  assert.deepEqual(clean.papers, ['starlight']); assert.deepEqual(clean.markers, ['forest-tassel']);
  assert.equal(clean.notes['note:1'].text.length, 250); assert.equal(clean.notes['note:1'].x, 50);
  assert.equal(clean.notes['note:1'].y, 100); assert.equal(Object.keys(clean.notes).length, 1);
  assert.equal(clean.bookmarks.length, 1); assert.deepEqual(normalizeJournal(clean), clean);
});

test('every stationery style and the inkwell has its supplied WebP asset', async () => {
  for (const file of [...Object.values(NOTE_PAPERS), ...Object.values(PAGE_MARKERS)].map(style => style.file).concat('inkwell.webp')) {
    const bytes = await readFile(new URL(`../public/grimoire/stationery/${file}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF'); assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
});

test('a crowded page keeps independent notes, stacking order and identifiers after moving, deletion and reload', () => {
  let garden = collected();
  for (let i = 0; i < 120; i++) garden = writeNote(garden, 'index', 'right', `Observation ${i}`, 'starlight');
  assert.equal(pageNotes(garden.journal, 'index', 'right').length, 120);
  const before = structuredClone(garden.journal.notes);
  garden = positionNote(garden, 'note:17', { entryKey: 'index', side: 'left', x: 22, y: 51, tucked: false });
  assert.equal(Object.values(garden.journal.notes).at(-1).id, 'note:17', 'a moved note comes to the front');
  for (const [id, note] of Object.entries(before)) if (id !== 'note:17') assert.deepEqual(garden.journal.notes[id], note);
  assert.equal(pageNotes(garden.journal, 'index', 'left').length, 1);
  assert.equal(pageNotes(garden.journal, 'index', 'right').length, 119);
  garden = removeNote(garden, 'note:55');
  garden = writeNote(garden, 'index', 'left', 'Another left-page note.', 'moonlit');
  assert.equal(garden.journal.noteNonce, 121); assert.ok(garden.journal.notes['note:121']);
  assert.deepEqual(deserializeGameSave(serializeGameSave(garden)), garden);
});

test('existing V1 notes upgrade without losing text, paper, position, tucked state or collection', () => {
  const old = { version: 1, papers: ['starlight', 'moonlit'], markers: ['forest-tassel'], notes: {
    'plant:Beanstalk/right': { text: 'Original note', paperId: 'starlight', x: 72, y: 31, tucked: true },
    'index/left': { text: 'Index note', paperId: 'moonlit', x: 10, y: 88, tucked: false },
  }, bookmarks: [{ slot: 0, entryKey: 'plant:Beanstalk', side: 'right', styleId: 'forest-tassel' }] };
  const snapshot = JSON.stringify(old), migrated = normalizeJournal(old);
  assert.equal(migrated.version, 2); assert.equal(migrated.noteNonce, 2);
  assert.deepEqual(migrated.notes['note:1'], { id: 'note:1', entryKey: 'plant:Beanstalk', side: 'right', ...old.notes['plant:Beanstalk/right'] });
  assert.equal(migrated.notes['note:2'].text, 'Index note');
  assert.deepEqual(normalizeJournal(migrated), migrated); assert.equal(JSON.stringify(old), snapshot);
  assert.equal(migrated.bookmarks[0].entryKey, old.bookmarks[0].entryKey);
});

test('note and marker drop geometry crosses the spine and bounds the destination on desktop and small pages', () => {
  for (const pageWidth of [165, 460, 645]) {
    const book = { width: pageWidth * 2, height: 600 }, width = pageWidth * .8, height = 180;
    const left = noteDrop(book, width, height, 5, 20), right = noteDrop(book, width, height, pageWidth + 10, 20);
    assert.equal(left.side, 'left'); assert.equal(right.side, 'right');
    assert.equal(noteDrop(book, width, height, -1000, -1000).x, 0);
    const outside = noteDrop(book, width, height, 10000, 10000);
    assert.equal(outside.side, 'right'); assert.equal(outside.x, 100); assert.equal(outside.y, 100);
    assert.equal(markerDrop(book, 5, 40).side, 'left'); assert.equal(markerDrop(book, pageWidth + 10, 40).side, 'right');
  }
});

test('page 23 travels from the right stack to the left when jumping from page 10 to page 55, and back', () => {
  const markedEntry = BOOK_ENTRIES.find(entry => entry.page === 23), marker = { entryKey: markedEntry.key, side: 'left', x: 30 };
  const before = BOOK_ENTRIES.find(entry => entry.page === 9), after = BOOK_ENTRIES.find(entry => entry.page === 55);
  assert.equal(markerPage(marker), 23); assert.equal(markerIsLeft(marker, before), false);
  assert.equal(markerIsLeft(marker, after), true); assert.equal(markerIsLeft(marker, markedEntry), true);
  assert.deepEqual(travellingMarkers([marker], { from: before.index, to: after.index }), [marker]);
  assert.deepEqual(travellingMarkers([marker], { from: after.index, to: before.index }), [marker]);
  assert.equal(markerDisplayX(marker, false), 70); assert.equal(markerDisplayX(marker, true), 30);
  assert.deepEqual(travellingMarkers([marker], { from: 0, to: 1 }), []);
});

test('dragging a marker keeps its style and swaps occupied destinations without losing either marker', () => {
  let garden = collected();
  garden = markPage(garden, 'plant:Beanstalk', 'right', 'forest-tassel', 0);
  garden = markPage(garden, 'index', 'left', 'garnet-moon', 1);
  const original = garden.journal.bookmarks;
  garden = movePageMarker(garden, 0, 'index', 'left', 84);
  assert.equal(garden.journal.bookmarks[0].entryKey, 'index'); assert.equal(garden.journal.bookmarks[0].x, 84);
  assert.equal(garden.journal.bookmarks[1].entryKey, 'plant:Beanstalk'); assert.equal(garden.journal.bookmarks[1].side, 'right');
  assert.equal(garden.journal.bookmarks[0].styleId, original[0].styleId);
  assert.equal(garden.journal.bookmarks[1].styleId, original[1].styleId);
  assert.throws(() => movePageMarker(garden, 0, 'missing', 'left', 20));
  assert.throws(() => movePageMarker(garden, 3, 'index', 'right', 20));
});

const root = fileURLToPath(new URL('../', import.meta.url)), cache = await mkdtemp(join(root, 'node_modules', '.journal-'));
let Stationery, Shop, Grimoire;
try {
  await build({ entryPoints: { stationery: join(root, 'src/grimoire/Stationery.jsx'), shop: join(root, 'src/ui/Shop.jsx'), book: join(root, 'src/CultivationGrimoire.jsx') },
    outdir: cache, bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
  Stationery = await import(pathToFileURL(join(cache, 'stationery.js')));
  Shop = (await import(pathToFileURL(join(cache, 'shop.js')))).default;
  Grimoire = (await import(pathToFileURL(join(cache, 'book.js')))).default;
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
  const note = render(Stationery.GrimoireNote, { note: garden.journal.notes['note:1'], entry });
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

test('a crowded spread renders its independent note controls and leaves other pages unmounted', () => {
  let garden = collected();
  for (let i = 0; i < 60; i++) garden = writeNote(garden, 'plant:Beanstalk', i % 3 ? 'right' : 'left', `Visible note ${i}`, 'starlight');
  for (let i = 0; i < 20; i++) garden = writeNote(garden, 'index', 'right', `Other page note ${i}`, 'moonlit');
  const markup = render(Grimoire, { garden, initialEntryKey: 'plant:Beanstalk' });
  assert.equal((markup.match(/data-note-id=/g) || []).length, 60);
  assert.equal((markup.match(/aria-label="Edit note /g) || []).length, 60);
  assert.doesNotMatch(markup, /Other page note/);
  assert.match(markup, /data-note-page="plant:Beanstalk\/left"/);
  assert.match(markup, /data-note-page="plant:Beanstalk\/right"/);
});
