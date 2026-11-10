// Optional DOM interaction QA. Run with jsdom installed or point
// GRIMOIRE_QA_JSDOM at a jsdom module. This is not browser visual verification.
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import React, { act, useState } from 'react';
import { build } from 'esbuild';
import { BOOK_SIZE, BOOK_VIEW_KEY, STATIONERY_PLACEMENT, bookToScreen, tableToScreen, savedBookView, restoreBookView } from '../src/grimoire/book-view.js';
import { noteGeometry } from '../src/grimoire/stationery-model.js';
import { createTutorialGarden, withGold, tradeShop, writeNote, positionNote, markPage, PAGE_MARKERS, NOTE_PAPERS, deserializeGameSave, serializeGameSave as serializeGardenSave } from '../src/core/index.js';
const serializeGameSave = garden => serializeGardenSave(garden, '2026-11-03T00:00:00.000Z');
const { JSDOM } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const dom = new JSDOM('<!doctype html><button id="opener">Book</button><div id="root"></div>', { url: 'https://book-qa.test/' });
globalThis.window = dom.window; globalThis.document = dom.window.document; globalThis.localStorage = window.localStorage;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let reduced = true;
window.matchMedia = () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} });
window.AnimationEvent = window.Event;
window.HTMLElement.prototype.getClientRects = function () { return [this.getBoundingClientRect()]; };
const { createRoot } = await import('react-dom/client');
const cache = await mkdtemp(new URL('../node_modules/.book-qa-', import.meta.url).pathname);
await build({ entryPoints: [new URL('../src/CultivationGrimoire.jsx', import.meta.url).pathname], outfile: `${cache}/book.js`,
  bundle: true, platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
const Book = (await import(pathToFileURL(`${cache}/book.js`))).default;
const q = selector => document.querySelector(selector);
const label = text => q(`[aria-label="${text}"]`);
let root, current, writes = 0, closed = 0, bookModal = false;
function fixture() {
  let garden = withGold(createTutorialGarden(), 1000);
  for (const id of ['paper:starlight', 'paper:moonlit', ...Object.keys(PAGE_MARKERS).map(id => `bookmark:${id}`)]) garden = tradeShop(garden, 'buy', id, 1).garden;
  garden = writeNote(garden, 'plant:Beanstalk', 'right', 'Keep my home at the edge.', 'starlight');
  garden = positionNote(garden, 'note:1', { x: 100, y: 42, tucked: false, rotation: 12, scale: .85, overhang: true });
  garden = writeNote(garden, 'plant:Beanstalk', 'right', 'A second note.', 'moonlit');
  return markPage(garden, 'fungus:Prismorel', 'right', 'forest-tassel', 0);
}
function Harness({ garden, suspended = false, entryRequest = 0, entryKey = 'plant:Beanstalk' }) {
  const [value, setValue] = useState(garden); current = value;
  return React.createElement(Book, { garden: value, initialEntryKey: entryKey, suspended, entryRequest, onModalChange(value) { bookModal = value; }, onClose() { closed++; }, onOpenShop() {},
    onJournalChange(update) { const next = update(current); writes++; setValue(next); return true; } });
}
async function mount(garden = fixture(), motion = true) {
  reduced = motion;
  root = createRoot(q('#root'));
  await act(() => root.render(React.createElement(Harness, { garden })));
}
const pose = () => restoreBookView(JSON.parse(localStorage.getItem(BOOK_VIEW_KEY)), { width: window.innerWidth, height: window.innerHeight });
const click = element => act(() => { assert.ok(element, 'click target exists'); element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, detail: 1 })); });
const pointer = (element, type, point, options = {}) => act(() => {
  const event = new window.MouseEvent(type, { bubbles: true, cancelable: true, clientX: point.x, clientY: point.y, button: 0 });
  Object.defineProperty(event, 'pointerId', { value: 7 });
  Object.defineProperty(event, 'pointerType', { value: options.touch ? 'touch' : 'mouse' });
  element.dispatchEvent(event);
});
async function dragLocal(element, from, to) {
  const view = pose();
  await pointer(element, 'pointerdown', bookToScreen(from, view));
  await pointer(element, 'pointermove', bookToScreen(to, view));
  await pointer(element, 'pointerup', bookToScreen(to, view));
}
const tape = () => q('[data-note-id="note:1"] .cg-note-tape');
const note = () => current.journal.notes['note:1'];
function paperPoint(value, x = .53, y = .145) {
  const paper = NOTE_PAPERS[value.paperId], geometry = noteGeometry(value, { width: 560, height: BOOK_SIZE.height }, paper.width / paper.height);
  const angle = value.rotation * Math.PI / 180, dx = (x - .5) * geometry.width, dy = (y - .5) * geometry.height;
  return { x: (value.side === 'right' ? 560 : 0) + geometry.left + geometry.boxWidth / 2 + dx * Math.cos(angle) - dy * Math.sin(angle),
    y: geometry.top + geometry.boxHeight / 2 + dx * Math.sin(angle) + dy * Math.cos(angle) };
}
async function setView(view) {
  await act(() => root.unmount()); root = null;
  localStorage.setItem(BOOK_VIEW_KEY, JSON.stringify(savedBookView(view, { width: window.innerWidth, height: window.innerHeight })));
  await mount(current);
}
const near = (a, b, tolerance = .025) => assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);
async function key(element, value, options = {}) {
  const event = new window.KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true, ...options });
  await act(() => element.dispatchEvent(event));
  return event;
}
const cases = [
  ['view pan/zoom/rotation, Fit and Reset preserve the entire garden', async () => {
    await mount(); const before = serializeGameSave(current), initial = pose();
    await click(label('Zoom book in')); assert.ok(pose().zoom > initial.zoom);
    await click(label('Rotate book clockwise')); near(pose().rotation, 5);
    const scene = q('.cg-table-surface'), start = { x: 8, y: window.innerHeight - 8 };
    await pointer(scene, 'pointerdown', start); await pointer(scene, 'pointermove', { x: 68, y: start.y - 30 }); await pointer(scene, 'pointerup', { x: 68, y: start.y - 30 });
    const moved = pose(); assert.ok(moved.x > initial.x);
    await click([...q('.cg-view-controls').querySelectorAll('button')].find(x => x.textContent === 'Fit book')); near(pose().rotation, 5);
    await click([...q('.cg-view-controls').querySelectorAll('button')].find(x => x.textContent === 'Reset view')); near(pose().rotation, 0);
    assert.equal(serializeGameSave(current), before); assert.equal(writes, 0);
  }],
  ['cover-corner drag rotates about the table center and cancellation restores the view', async () => {
    await mount(); const initial = pose(), corner = label('Rotate book from top-right cover corner');
    const from = bookToScreen({ x: 1145, y: -20 }, initial), dx = from.x - initial.x, dy = from.y - initial.y, a = Math.PI / 6;
    const to = { x: initial.x + dx * Math.cos(a) - dy * Math.sin(a), y: initial.y + dx * Math.sin(a) + dy * Math.cos(a) };
    await pointer(corner, 'pointerdown', from); await pointer(corner, 'pointermove', to);
    near(pose().rotation, 30); near(pose().x, initial.x); near(pose().y, initial.y);
    await pointer(corner, 'pointercancel', to); near(pose().rotation, 0);
  }],
  ['Move control pans with mouse or keyboard even when enlarged paper fills the window', async () => {
    await mount(); await setView({ x: 600, y: 400, zoom: 2, rotation: 15 });
    const initial = pose(), control = label('Move book');
    await pointer(control, 'pointerdown', { x: 230, y: 30 }); await pointer(control, 'pointermove', { x: 270, y: 55 }); await pointer(control, 'pointerup', { x: 270, y: 55 });
    near(pose().x, initial.x + 40); near(pose().y, initial.y + 25);
    await act(() => control.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })));
    near(pose().x, initial.x + 16); assert.ok(tape(), 'pan arrow did not also turn the page');
  }],
  ['unavailable preference storage falls back and leaves the view controls working', async () => {
    const get = window.Storage.prototype.getItem, set = window.Storage.prototype.setItem;
    window.Storage.prototype.getItem = () => { throw new Error('Blocked storage'); };
    window.Storage.prototype.setItem = () => { throw new Error('Blocked storage'); };
    try { await mount(); assert.ok(!q('.cg-shell').style.transform.includes('NaN')); await click(label('Rotate book clockwise')); assert.match(q('.cg-shell').style.transform, /rotate\(5deg\)/); }
    finally { window.Storage.prototype.getItem = get; window.Storage.prototype.setItem = set; }
  }],
  ['saved view reopens exactly and a resize retains angle/zoom', async () => {
    await mount(); await setView({ x: 700, y: 410, zoom: 1.4, rotation: -31 }); const expected = pose();
    await act(() => root.unmount()); root = null; await mount(current);
    near(pose().x, expected.x); near(pose().y, expected.y); near(pose().zoom, 1.4); near(pose().rotation, -31);
    const old = window.innerWidth; Object.defineProperty(window, 'innerWidth', { value: 720, configurable: true });
    await act(() => window.dispatchEvent(new window.Event('resize')));
    near(pose().zoom, 1.4); near(pose().rotation, -31);
    Object.defineProperty(window, 'innerWidth', { value: old, configurable: true });
  }],
  ['wheel zoom never steals scrolling from print, atlas, writing or dialogs', async () => {
    await mount();
    const wheel = async element => { const event = new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -120, clientX: 50, clientY: 80 });
      await act(() => element.dispatchEvent(event)); return event; };
    const initial = pose().zoom; assert.equal((await wheel(q('.cg-table-surface'))).defaultPrevented, true); assert.ok(pose().zoom > initial);
    const zoom = pose().zoom;
    for (const target of [q('.cg-page-scroll'), q('.cg-paper-writing')]) { assert.equal((await wheel(target)).defaultPrevented, false); near(pose().zoom, zoom); }
    await click(label('Open Ingredients section')); assert.ok(q('.cg-atlas-viewport'));
    assert.equal((await wheel(q('.cg-atlas-viewport'))).defaultPrevented, false); near(pose().zoom, zoom);
    await click(label('Write a Grimoire note')); await wheel(q('.cg-stationery-desk')); near(pose().zoom, zoom);
  }],
  ['tape click is temporary, does not save, and never scrolls the book', async () => {
    await mount(); let scrolls = 0; window.HTMLElement.prototype.scrollIntoView = () => scrolls++;
    const before = serializeGameSave(current), view = JSON.stringify(pose());
    await click(tape()); assert.ok(q('[data-note-id="note:1"]').classList.contains('is-tucked'));
    assert.equal(serializeGameSave(current), before); assert.equal(writes, 0); assert.equal(scrolls, 0); assert.equal(JSON.stringify(pose()), view);
    await click(label('Next spread')); await click(label('Previous spread'));
    assert.ok(!q('[data-note-id="note:1"]').classList.contains('is-tucked')); assert.equal(serializeGameSave(current), before);
  }],
  ['closing and legacy saved tucks return notes to their authored half-edge home', async () => {
    let garden = fixture(); garden.journal.notes['note:1'].tucked = true;
    await mount(garden); assert.ok(!q('[data-note-id="note:1"]').classList.contains('is-tucked'));
    const home = JSON.stringify(note()); await click(tape()); await act(() => root.unmount()); root = null; await mount(current);
    assert.ok(!q('[data-note-id="note:1"]').classList.contains('is-tucked')); assert.equal(JSON.stringify(note()), home);
  }],
  ['the editor tuck action is temporary and preserves every authored note', async () => {
    await mount(); const before = serializeGameSave(current);
    await click(label('Edit note 1 on right page'));
    await click([...q('.cg-stationery-desk').querySelectorAll('button')].find(x => x.textContent === 'Tuck note away'));
    assert.ok(q('[data-note-id="note:1"]').classList.contains('is-tucked')); assert.equal(serializeGameSave(current), before);
  }],
  ['note drag crosses the spine correctly at combined zoom/rotation, with no post-drag tuck', async () => {
    await mount(); await setView({ x: 690, y: 410, zoom: 1.7, rotation: 37 });
    const second = JSON.stringify(current.journal.notes['note:2']), from = paperPoint(note());
    await dragLocal(tape(), from, { x: from.x - 650, y: from.y + 20 }); await click(tape());
    assert.equal(note().side, 'left'); assert.equal(note().tucked, false); assert.ok(!q('[data-note-id="note:1"]').classList.contains('is-tucked'));
    near(note().x, (560 - 90) / 560 * 100); near(note().y, 42 + 20 / BOOK_SIZE.height * 100);
    assert.equal(JSON.stringify(current.journal.notes['note:2']), second);
  }],
  ['note resizing and rotation use book-local distances and retain the center', async () => {
    await mount(); await setView({ x: 630, y: 390, zoom: 1.8, rotation: -44 });
    const original = { ...note() }, center = paperPoint(original, .5, .5), from = paperPoint(original, 1, 1);
    await dragLocal(label('Resize note 1'), from, { x: center.x + (from.x - center.x) * 1.2, y: center.y + (from.y - center.y) * 1.2 });
    near(note().scale, original.scale * 1.2); near(note().x, original.x); near(note().y, original.y);
    const start = paperPoint(note(), 0, 0), a = Math.PI / 6, dx = start.x - center.x, dy = start.y - center.y;
    await dragLocal(label('Rotate note 1'), start, { x: center.x + dx * Math.cos(a) - dy * Math.sin(a), y: center.y + dx * Math.sin(a) + dy * Math.cos(a) });
    near(note().rotation, original.rotation + 30); near(note().x, original.x); near(note().y, original.y);
  }],
  ['marker tool drops from the transformed wood onto either local paper edge', async () => {
    await mount(); await setView({ x: 650, y: 400, zoom: 1.3, rotation: 92 });
    const { x, y, width, height } = STATIONERY_PLACEMENT.marker;
    const view = pose(), from = tableToScreen({ x: x + width / 2, y: y + height / 2 }, view);
    for (const edge of ['bottom', 'top']) {
      const tool = label('Mark a Grimoire page'), to = bookToScreen({ x: 840, y: edge === 'top' ? -20 : BOOK_SIZE.height + 20 }, view);
      await pointer(tool, 'pointerdown', from); await pointer(tool, 'pointermove', to); await pointer(tool, 'pointerup', to);
      const placed = current.journal.bookmarks.find(m => m.entryKey === 'plant:Beanstalk' && m.edge === edge);
      assert.ok(placed); assert.equal(placed.side, 'right'); assert.equal(label('Marker edge').value, edge);
      assert.deepEqual(pose(), view, 'tool drag does not pan or rotate the shared table');
      await click(label('Close stationery'));
    }
  }],
  ['existing marker drag rejects outside paper bounds and preserves its assignment', async () => {
    await mount(); await setView({ x: 640, y: 400, zoom: 1.6, rotation: -31 });
    const before = JSON.stringify(current.journal.bookmarks), handle = q('.cg-marker-handle');
    await dragLocal(handle, { x: 800, y: -50 }, { x: -50, y: 400 });
    assert.equal(JSON.stringify(current.journal.bookmarks), before);
    await dragLocal(handle, { x: 800, y: -50 }, { x: 800, y: BOOK_SIZE.height - 15 });
    assert.equal(current.journal.bookmarks[0].entryKey, 'plant:Beanstalk'); assert.equal(current.journal.bookmarks[0].edge, 'bottom');
  }],
  ['marker attachment dwells for 1500ms and has stable hover/focus state', async () => {
    const nativeSet = window.setTimeout, nativeClear = window.clearTimeout, pending = new Map(); let serial = 0, now = 0;
    window.setTimeout = (fn, ms, ...args) => { if (![1500, 350].includes(ms)) return nativeSet(fn, ms, ...args); const id = ++serial; pending.set(id, { fn, at: now + ms }); return id; };
    window.clearTimeout = id => { if (!pending.delete(id)) nativeClear(id); };
    const advance = ms => act(() => { now += ms; for (const [id, task] of [...pending]) if (task.at <= now) { pending.delete(id); task.fn(); } });
    try {
      await mount(markPage(fixture(), 'plant:Beanstalk', 'left', 'teal-star', 1), false);
      const marker = () => q('[data-marker-slot="1"]'); assert.equal(marker().dataset.markerPhase, 'resting');
      await advance(1499); assert.equal(marker().dataset.markerPhase, 'resting'); await advance(1); assert.equal(marker().dataset.markerPhase, 'raised');
      await pointer(marker().querySelector('.cg-marker-hover-target > span'), 'pointerover', { x: 100, y: 30 }); assert.equal(marker().dataset.markerPhase, 'resting');
      await pointer(marker().querySelector('.cg-marker-hover-target > span'), 'pointerout', { x: 0, y: 0 });
      await advance(349); assert.equal(marker().dataset.markerPhase, 'resting'); await advance(1); assert.equal(marker().dataset.markerPhase, 'raised');
      await act(() => marker().querySelector('button').focus()); assert.equal(marker().dataset.markerPhase, 'resting');
    } finally { window.setTimeout = nativeSet; window.clearTimeout = nativeClear; }
  }],
  ['all twelve markers and both notes survive view movement', async () => {
    let garden = fixture(); const { BOOK_ENTRIES } = await import('../src/grimoire/book.js');
    garden.journal.bookmarks = [];
    for (let slot = 0; slot < 12; slot++) garden = markPage(garden, BOOK_ENTRIES[slot + 1].key, 'right', Object.keys(PAGE_MARKERS)[slot], slot);
    await mount(garden); const before = serializeGameSave(current); await click(label('Zoom book in')); await click(label('Rotate book clockwise'));
    assert.equal(document.querySelectorAll('[data-marker-slot]').length, 12); assert.equal(serializeGameSave(current), before);
  }],
  ['page 23 marker crosses stacks with long navigation and returns to its marked spread', async () => {
    await mount(markPage(fixture(), 'plant:Orchiwitch', 'left', 'teal-star', 1, { name: 'My trials' }));
    const choose = async value => { const select = [...document.querySelectorAll('.cg-entry-jump select')].find(x => [...x.options].some(option => option.value === value));
      if (!select) { const { BOOK_ENTRIES } = await import('../src/grimoire/book.js'); const entry = BOOK_ENTRIES.find(item => item.key === value);
        await click([...document.querySelectorAll('.cg-index-list button')].find(button => button.getAttribute('aria-label').endsWith(`, page ${entry.page}`))); return; }
      await act(() => { select.value = value; select.dispatchEvent(new window.Event('change', { bubbles: true })); }); };
    await choose('plant:Onion'); assert.equal(q('[data-marker-slot="1"]').dataset.markerSide, 'right');
    const view = JSON.stringify(pose()); await click(label('Open Aquatic section')); await choose('plant:Pearlily');
    assert.equal(q('[data-marker-slot="1"]').dataset.markerSide, 'left'); assert.equal(JSON.stringify(pose()), view);
    await click(q('[data-marker-slot="1"] button')); assert.ok(label('Find entry in Flowers')); assert.equal(q('[data-marker-slot="1"]').dataset.markedPage, '24');
    await click(label('Open Ingredients section')); await choose('plant:Onion'); assert.equal(q('[data-marker-slot="1"]').dataset.markerSide, 'right');
  }],
  ['drag guides reserve left-stack slots and allow multiple markers on the open spread', async () => {
    await mount(markPage(fixture(), 'family:Ingredients', 'right', 'forest-tassel', 0, { position: 0 }));
    const tool = label('Mark a Grimoire page'), view = pose(), from = bookToScreen({ x: 1200, y: -80 }, view);
    await pointer(tool, 'pointerdown', from);
    await pointer(tool, 'pointermove', bookToScreen({ x: 638.4, y: 0 }, view));
    assert.equal(document.querySelectorAll('.cg-slot-guide').length, 12);
    assert.ok(q('[data-slot-edge="top"][data-slot-position="0"]').classList.contains('is-reserved'));
    const before = JSON.stringify(current.journal.bookmarks);
    await pointer(tool, 'pointerup', bookToScreen({ x: 638.4, y: 0 }, view));
    assert.equal(JSON.stringify(current.journal.bookmarks), before);
    assert.match(q('.cg-stationery-issue').textContent, /reserved/);
    for (const position of [2, 5]) {
      await dragLocal(tool, { x: 1200, y: -80 }, { x: 638.4 + 403.2 * position / 5, y: 0 });
      assert.equal(label('Marker position').value, String(position));
      await click(label('Close stationery'));
    }
    assert.equal(current.journal.bookmarks.filter(m => m.entryKey === 'plant:Beanstalk').length, 2);
    assert.equal(current.journal.bookmarks[0].entryKey, 'family:Ingredients');
  }],
  ['editor and keyboard move only the selected reservation', async () => {
    await mount(markPage(fixture(), 'plant:Beanstalk', 'right', 'teal-star', 1, { position: 2, name: 'Keep this name' }));
    const original = JSON.stringify(current.journal.bookmarks[0]);
    await click(q('[data-marker-slot="1"] button'));
    assert.equal(label('Marker position').value, '2');
    await act(() => { label('Marker position').value = '4'; label('Marker position').dispatchEvent(new window.Event('change', { bubbles: true })); });
    await click([...q('.cg-stationery-desk').querySelectorAll('button')].find(button => button.textContent === 'Save marker'));
    assert.equal(current.journal.bookmarks[1].position, 4);
    const key = name => act(() => q('[data-marker-slot="1"] button').dispatchEvent(new window.KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true })));
    await key('ArrowLeft'); assert.equal(current.journal.bookmarks[1].position, 3);
    await key('ArrowDown'); assert.equal(current.journal.bookmarks[1].edge, 'bottom'); assert.equal(current.journal.bookmarks[1].position, 3);
    assert.equal(current.journal.bookmarks[1].name, 'Keep this name'); assert.equal(JSON.stringify(current.journal.bookmarks[0]), original);
  }],
  ['turning-note copies stay on their printed face inside the transformed scene', async () => {
    await mount(fixture(), false); await click(label('Rotate book clockwise'));
    const view = JSON.stringify(pose()); await click(label('Next spread'));
    assert.ok(q('.cg-turn-leaf')); assert.equal(q('.cg-turn-face.front').dataset.printedPage, '4');
    assert.equal(q('.cg-turn-face.front').querySelectorAll('[data-turning-note]').length, 2);
    assert.equal(q('.cg-note-layer').getAttribute('aria-hidden'), 'true'); assert.equal(JSON.stringify(pose()), view);
    await act(() => q('.cg-turn-leaf').dispatchEvent(new window.Event('animationend', { bubbles: true })));
    assert.equal(q('.cg-turn-leaf'), null); assert.equal(JSON.stringify(pose()), view);
  }],
  ['table, book and stationery share one scene while controls and dialogs stay outside it', async () => {
    await mount(); const shell = q('.cg-shell'), tools = q('.cg-stationery-tools');
    for (const node of [q('.cg-table-art'), q('.cg-book'), tools]) assert.equal(node.closest('.cg-shell'), shell);
    assert.equal(q('.cg-view-controls').closest('.cg-shell'), null);
    assert.equal(q('[aria-label="Stationery table"]'), null, 'separate sliding/pinnable tray is removed');
    assert.equal(document.querySelectorAll('img[src$="cultivation-tabletop.webp"]').length, 1);
    const before = pose();
    await pointer(tools, 'pointerover', { x: 700, y: 150 }); await pointer(tools, 'pointerout', { x: 700, y: 500 });
    await click(label('Write a Grimoire note'));
    assert.equal(q('.cg-stationery-backdrop').closest('.cg-shell'), null);
    assert.equal(shell.inert || shell.hasAttribute('inert'), true);
    await dragLocal(q('.cg-table-surface'), { x: -100, y: 0 }, { x: 0, y: 100 });
    assert.deepEqual(pose(), before, 'dialog blocks table gestures');
  }],
  ['covered table events are contained and an empty scene container never pans', async () => {
    await mount(); const before = pose(), leaked = [];
    const observer = event => leaked.push(event.type);
    for (const type of ['pointerdown', 'click', 'wheel']) document.addEventListener(type, observer);
    try {
      await pointer(q('.cg-scene'), 'pointerdown', { x: 5, y: 500 });
      await pointer(q('.cg-scene'), 'pointermove', { x: 25, y: 520 });
      await pointer(q('.cg-scene'), 'pointerup', { x: 25, y: 520 });
      await click(q('.cg-table-surface'));
      assert.deepEqual(pose(), before, 'only exposed table or Move control pans');
      await act(() => q('.cg-table-surface').dispatchEvent(new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100, clientX: 5, clientY: 500 })));
      assert.deepEqual(leaked, []); assert.equal(closed, 0);
    } finally { for (const type of ['pointerdown', 'click', 'wheel']) document.removeEventListener(type, observer); }
  }],
  ['nonmodal book releases Tab and shortcuts on garden focus or pointer activity', async () => {
    document.body.style.overflow = 'auto';
    await mount(); assert.equal(document.body.style.overflow, 'auto');
    assert.equal(label('Cultivation Grimoire').getAttribute('aria-modal'), 'false');
    const last = [...q('.cg-view-controls').querySelectorAll('button')].at(-1);
    await act(() => last.focus()); assert.equal((await key(last, 'Tab')).defaultPrevented, false);
    await act(() => q('#opener').focus());
    assert.equal((await key(q('#opener'), 'ArrowRight')).defaultPrevented, false); assert.ok(tape());
    assert.equal((await key(q('#opener'), 'Escape')).defaultPrevented, false); assert.equal(closed, 0);
    await pointer(q('.cg-page.right'), 'pointerdown', bookToScreen({ x: 900, y: 350 }, pose()));
    assert.equal(document.activeElement, label('Cultivation Grimoire'));
    assert.equal((await key(document.activeElement, 'ArrowRight')).defaultPrevented, true); assert.equal(tape(), null);
    await pointer(q('#opener'), 'pointerdown', { x: 2, y: 2 }); // releases shortcuts even if the old book element retains focus
    assert.equal((await key(document.activeElement, 'ArrowLeft')).defaultPrevented, false); assert.equal(tape(), null);
  }],
  ['only editor and confirmation dialogs trap Tab and Escape stays within the book', async () => {
    await mount(); assert.equal(bookModal, false);
    await click(label('Write a Grimoire note')); assert.equal(bookModal, true);
    const scope = q('.cg-stationery-desk'), controls = [...scope.querySelectorAll('button:not(:disabled), input, select, textarea')];
    await act(() => controls.at(-1).focus());
    assert.equal((await key(document.activeElement, 'Tab')).defaultPrevented, true); assert.equal(document.activeElement, controls[0]);
    assert.equal((await key(document.activeElement, 'Tab', { shiftKey: true })).defaultPrevented, true); assert.equal(document.activeElement, controls.at(-1));
    const gardenEscapes = []; const escaped = event => { if (event.key === 'Escape') gardenEscapes.push(event); };
    window.addEventListener('keydown', escaped);
    try { assert.equal((await key(document.activeElement, 'Escape')).defaultPrevented, true); }
    finally { window.removeEventListener('keydown', escaped); }
    assert.equal(q('.cg-stationery-desk'), null); assert.equal(bookModal, false); assert.equal(closed, 0); assert.deepEqual(gardenEscapes, []);
    await click(label('Remove note 1')); assert.equal(bookModal, true);
    await key(document.activeElement, 'Escape'); assert.equal(bookModal, false); assert.ok(note()); assert.equal(closed, 0);
  }],
  ['a foreground garden dialog suspends book input without losing spread or pose', async () => {
    await mount(); const view = pose();
    await act(() => root.render(React.createElement(Harness, { garden: current, suspended: true })));
    assert.equal(label('Cultivation Grimoire').hasAttribute('inert'), true);
    assert.equal((await key(document.activeElement, 'ArrowRight')).defaultPrevented, false);
    assert.equal((await key(document.activeElement, 'Escape')).defaultPrevented, false); assert.equal(closed, 0);
    await act(() => q('.cg-table-surface').dispatchEvent(new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100 })));
    assert.deepEqual(pose(), view); assert.ok(tape());
    await act(() => root.render(React.createElement(Harness, { garden: current })));
    assert.equal(label('Cultivation Grimoire').hasAttribute('inert'), false); assert.deepEqual(pose(), view); assert.ok(tape());
  }],
  ['repeated inspector requests reach an already-open spread without resetting the table', async () => {
    await mount(); const view = pose();
    for (const entryRequest of [1, 2]) {
      await click(label('Next spread')); assert.equal(tape(), null);
      await act(() => root.render(React.createElement(Harness, { garden: current, entryRequest })));
      assert.ok(tape()); assert.deepEqual(pose(), view);
    }
  }],
  ['an existing book-only pose upgrades once without shifting the paper center', async () => {
    localStorage.setItem(BOOK_VIEW_KEY, JSON.stringify({ version: 1, x: .5, y: .5, zoom: .8, rotation: 30 }));
    await mount(); const center = bookToScreen({ x: BOOK_SIZE.width / 2, y: BOOK_SIZE.height / 2 }, pose());
    near(center.x, window.innerWidth / 2); near(center.y, window.innerHeight / 2);
    assert.equal(JSON.parse(localStorage.getItem(BOOK_VIEW_KEY)).version, 2);
    const expected = pose(); await act(() => root.unmount()); root = null; await mount(); assert.deepEqual(pose(), expected);
  }],
  ['only the selection drag suppresses a turn, and an old selection does not block the next click', async () => {
    await mount(); const page = q('.cg-page.right'), next = label('Next spread');
    const from = bookToScreen({ x: 1100, y: 400 }, pose()), to = { x: from.x - 30, y: from.y };
    await pointer(next, 'pointerdown', from); await pointer(page, 'pointermove', to); await pointer(next, 'pointerup', to); await click(next);
    assert.ok(tape(), 'selection drag did not turn');
    window.getSelection().selectAllChildren(q('.cg-page.right p'));
    await pointer(next, 'pointerdown', from); await pointer(next, 'pointerup', from); await click(next);
    assert.equal(tape(), null, 'deliberate next turn works despite existing selection');
  }],
  ['the exposed close ribbon retains its close action without writing garden data', async () => {
    await mount(); const before = serializeGameSave(current);
    await click(label('Close Grimoire'));
    assert.equal(closed, 1); assert.equal(writes, 0); assert.equal(serializeGameSave(current), before);
  }],
  ['cancelled note gestures and delete confirmation preserve unrelated notes', async () => {
    await mount(); const before = serializeGameSave(current), from = paperPoint(note());
    await pointer(tape(), 'pointerdown', bookToScreen(from, pose())); await pointer(tape(), 'pointermove', bookToScreen({ x: from.x - 200, y: from.y }, pose()));
    await pointer(tape(), 'pointercancel', bookToScreen(from, pose())); assert.equal(serializeGameSave(current), before);
    await click(label('Remove note 1')); await click([...q('.cg-note-confirm').querySelectorAll('button')].find(x => x.textContent === 'Keep note')); assert.equal(serializeGameSave(current), before);
    await click(label('Remove note 1')); await click([...q('.cg-note-confirm').querySelectorAll('button')].find(x => x.textContent === 'Remove note'));
    assert.equal(current.journal.notes['note:1'], undefined); assert.ok(current.journal.notes['note:2']);
  }],
];
if (process.env.GRIMOIRE_QA_SAVE) cases.push(['a backed-up garden is unchanged by scene-only controls', async () => {
  const garden = deserializeGameSave(await readFile(process.env.GRIMOIRE_QA_SAVE, 'utf8'));
  await mount(garden); const before = serializeGameSave(current);
  await click(label('Zoom book in')); await click(label('Rotate book clockwise'));
  await click([...q('.cg-view-controls').querySelectorAll('button')].find(x => x.textContent === 'Reset view'));
  assert.equal(serializeGameSave(current), before); assert.equal(writes, 0);
}]);
let passed = 0;
try {
  for (const [name, run] of cases) {
    writes = 0; closed = 0; localStorage.clear();
    try { await run(); passed++; console.log(`PASS ${name}`); }
    finally { if (root) { await act(() => root.unmount()); root = null; } }
  }
  console.log(`${passed}/${cases.length} DOM interaction scenarios passed. Browser visual review remains separate.`);
} finally { await rm(cache, { recursive: true, force: true }); dom.window.close(); }
