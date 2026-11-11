import test from 'node:test';
import assert from 'node:assert/strict';
import { createTutorialGarden, withGold, tradeShop, markPage, editPageMarker, movePageMarker, removePageMarker,
  normalizeJournal, serializeGameSave, deserializeGameSave } from '../src/core/index.js';
import { BOOK_ENTRIES } from '../src/grimoire/book.js';
import { layoutPageMarkers, markerIsLeft, markerDrop, markerWidth, markerInset } from '../src/grimoire/stationery-model.js';
import { BOOK_SIZE, bookToScreen, screenToBook } from '../src/grimoire/book-view.js';
const garden = () => tradeShop(withGold(createTutorialGarden(), 100), 'buy', 'bookmark:forest-tassel', 1).garden;

test('all twelve global positions can mark the same spread and reload independently', () => {
  let value = garden();
  for (let i = 0; i < 12; i++) value = markPage(value, 'plant:Beanstalk', 'right', 'forest-tassel', null,
    { edge: i < 6 ? 'top' : 'bottom', position: i % 6, name: `Trial ${i}`, description: `Observation ${i}` });
  assert.equal(new Set(value.journal.bookmarks.map(m => `${m.edge}/${m.position}`)).size, 12);
  assert.ok(value.journal.bookmarks.every(m => m.side === 'right'));
  assert.deepEqual(deserializeGameSave(serializeGameSave(value)), value);
  const next = editPageMarker(value, 3, { name: 'Edited' });
  assert.deepEqual(next.journal.bookmarks.filter(m => m.slot !== 3), value.journal.bookmarks.filter(m => m.slot !== 3));
  assert.deepEqual(removePageMarker(next, 3).journal.bookmarks, next.journal.bookmarks.filter(m => m.slot !== 3));
});

test('a reservation stays occupied when its spread moves onto the left stack', () => {
  let value = markPage(garden(), 'family:Ingredients', 'right', 'forest-tassel', 0, { position: 2 });
  assert.equal(markerIsLeft(value.journal.bookmarks[0], BOOK_ENTRIES[10]), true);
  const before = JSON.stringify(value);
  assert.throws(() => markPage(value, 'index', 'right', 'forest-tassel', null, { edge: 'top', position: 2 }), /position 3 is reserved/);
  value = markPage(value, 'index', 'right', 'forest-tassel', null, { edge: 'top', position: 5 });
  const saved = JSON.stringify(value);
  assert.throws(() => movePageMarker(value, 1, 'plant:Beanstalk', 'right', 40, 'top'), /reserved/);
  assert.equal(JSON.stringify(value), saved);
  assert.equal(value.journal.bookmarks[0].entryKey, JSON.parse(before).journal.bookmarks[0].entryKey);
});

test('sparse positions preserve gaps across all spreads, additions and removals', () => {
  let value = garden();
  for (const position of [0, 2, 5]) value = markPage(value, 'plant:Orchiwitch', 'right', 'forest-tassel', null, { edge: 'top', position });
  for (const current of BOOK_ENTRIES) {
    const before = layoutPageMarkers(value.journal.bookmarks, current);
    const reduced = layoutPageMarkers(removePageMarker(value, 1).journal.bookmarks, current);
    for (const id of [0, 2]) assert.equal(before.get(id), reduced.get(id));
    assert.deepEqual([...before.values()], markerIsLeft(value.journal.bookmarks[0], current) ? [100, 60, 0] : [0, 40, 100]);
  }
});

test('V3 migration resolves slot collisions without losing names, writing, styles or spread identity', () => {
  const saved = { ...garden().journal, version: 3, bookmarks: Array.from({ length: 12 }, (_, slot) => ({ slot,
    entryKey: BOOK_ENTRIES[slot].key, side: slot % 2 ? 'left' : 'right', edge: slot < 6 ? 'top' : 'bottom', x: 50,
    name: `Saved ${slot}`, description: `Saved writing ${slot}`, styleId: 'forest-tassel' })) };
  const original = JSON.stringify(saved), next = normalizeJournal(saved);
  assert.equal(next.version, 4); assert.equal(next.bookmarks.length, 12);
  assert.equal(new Set(next.bookmarks.map(m => `${m.edge}/${m.position}`)).size, 12);
  for (const marker of next.bookmarks) {
    const old = saved.bookmarks[marker.slot];
    for (const key of ['name', 'description', 'entryKey', 'styleId', 'slot', 'edge']) assert.equal(marker[key], old[key]);
    assert.equal(marker.side, 'right'); assert.equal(marker.x, marker.position * 20);
  }
  assert.equal(JSON.stringify(saved), original); assert.deepEqual(normalizeJournal(next), next);
});

test('changing a reservation rejects occupied targets and moves only the selected marker', () => {
  let value = markPage(garden(), 'index', 'right', 'forest-tassel', 0, { position: 1 });
  value = markPage(value, 'index', 'right', 'forest-tassel', 1, { position: 4, edge: 'bottom' });
  assert.throws(() => editPageMarker(value, 0, { edge: 'bottom', position: 4 }), /reserved/);
  const original = value.journal.bookmarks[1];
  value = editPageMarker(value, 0, { edge: 'bottom', position: 3 });
  assert.deepEqual(value.journal.bookmarks[1], original);
  assert.equal(value.journal.bookmarks[0].position, 3);
});

test('all six transformed right-leaf drop positions snap to the same book-local reservations', () => {
  const w = markerWidth(560), inset = markerInset(560), size = BOOK_SIZE;
  for (const rotation of [-90, -35, 0, 70, 165]) for (const zoom of [.4, 1.6]) for (const edge of ['top', 'bottom']) for (let position = 0; position < 6; position++) {
    const local = { x: 560 + inset + w / 2 + (560 - w - inset * 2) * position / 5, y: edge === 'top' ? 0 : size.height };
    const view = { x: 500, y: 370, rotation, zoom }, recovered = screenToBook(bookToScreen(local, view), view);
    const drop = markerDrop(size, recovered.x, w, recovered.y);
    assert.equal(drop.position, position); assert.equal(drop.edge, edge); assert.equal(drop.side, 'right');
  }
});
