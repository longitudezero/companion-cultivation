// Optional integrated DOM QA, not native browser hit-testing or visual review.
// GRIMOIRE_QA_JSDOM can point to an existing jsdom module; no app dependency.
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import React, { act } from 'react';
import { build } from 'esbuild';
import { createTutorialGarden, withGold, tradeShop, placeObject, makePlant } from '../src/core/index.js';
import { BOOK_VIEW_KEY } from '../src/grimoire/book-view.js';

const { JSDOM } = await import(process.env.GRIMOIRE_QA_JSDOM || 'jsdom');
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'https://garden-book-qa.test/', pretendToBeVisual: true });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.setInterval = () => 0; window.clearInterval = () => {}; // freeze simulation time for reproducible UI checks
globalThis.ResizeObserver = window.ResizeObserver = class { observe() {} disconnect() {} };
window.HTMLElement.prototype.getClientRects = function () { return [this.getBoundingClientRect()]; };
window.HTMLDialogElement.prototype.showModal = function () { this.open = true; this.focus(); };
window.HTMLDialogElement.prototype.close = function () { this.open = false; };
document.elementFromPoint = () => null;
const captured = new WeakMap(), errors = [];
window.Element.prototype.setPointerCapture = function (id) { captured.set(this, id); };
window.Element.prototype.hasPointerCapture = function (id) { return captured.get(this) === id; };
window.Element.prototype.releasePointerCapture = function () { captured.delete(this); };
window.addEventListener('error', event => errors.push(event.error));
const { createRoot } = await import('react-dom/client');
const cache = await mkdtemp(new URL('../node_modules/.garden-book-qa-', import.meta.url).pathname);
await build({ entryPoints: [new URL('../src/App.jsx', import.meta.url).pathname], outfile: `${cache}/app.js`, bundle: true,
  platform: 'node', format: 'esm', packages: 'external', loader: { '.css': 'empty' }, logLevel: 'silent' });
const App = (await import(pathToFileURL(`${cache}/app.js`))).default;
const q = selector => document.querySelector(selector);
const label = value => q(`[aria-label="${value}"]`);
const book = () => label('Cultivation Grimoire');
const pose = () => localStorage.getItem(BOOK_VIEW_KEY);
const garden = () => JSON.parse(localStorage.getItem('companion-cultivation:sandbox:v6'));
const click = async element => {
  assert.ok(element, 'click target exists');
  await pointer(element, 'pointerdown', 10, 10); await pointer(element, 'pointerup', 10, 10);
  await act(() => element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 })));
};
const pointer = async (element, type, x, y) => {
  assert.ok(element, 'pointer target exists');
  const event = new window.MouseEvent(type, { bubbles: true, cancelable: true, button: 0, clientX: x, clientY: y });
  Object.defineProperty(event, 'pointerId', { value: 9 });
  await act(() => element.dispatchEvent(event));
};
const escape = async () => act(() => document.activeElement.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })));
const hex = key => q(`[data-garden-hex="${key}"]`);
const seed = () => q('[data-inventory-slot][aria-label^="Beanstalk Seeds"]');
let root;
try {
  let initial = withGold(createTutorialGarden(), 500);
  initial = tradeShop(initial, 'buy', 'paper:starlight', 1).garden;
  initial = placeObject(initial, '0,0', { ...makePlant('Beanstalk'), progress: 100, quantity: 1 });
  localStorage.setItem('companion-cultivation:sandbox:v6', JSON.stringify(initial));
  localStorage.setItem('companion-cultivation:simulation-speed', '0');
  root = createRoot(q('#root'));
  await act(() => root.render(React.createElement(App)));
  await click(label('Open Cultivation Grimoire')); const originalBook = book(), originalPose = pose();
  assert.equal(book().getAttribute('aria-modal'), 'false'); assert.equal(q('.workspace').hasAttribute('inert'), false);

  // Actual app inventory handlers, including their formerly suppressed hover.
  await pointer(seed(), 'pointerover', 10, 10);
  await act(() => new Promise(resolve => setTimeout(resolve, 70)));
  assert.ok(q('[role="tooltip"]'), 'inventory hover works with the book open');
  await pointer(seed(), 'pointerdown', 10, 10); await pointer(seed(), 'pointerup', 10, 10);
  await click(hex('1,0')); assert.ok(label('Choose planting quantity'));
  await act(() => label('Planting quantity').focus()); await escape();
  assert.equal(label('Choose planting quantity'), null); assert.equal(book(), originalBook);
  assert.equal(q('.inventory-held-hint'), null, 'garden Escape clears held item without closing the book');
  console.log('PASS inventory hover/selection and garden Escape with the book parked');

  // elementFromPoint destinations are deliberately supplied; native geometry is
  // verified separately. Exercise the real App drag/drop and planting callbacks.
  document.elementFromPoint = () => hex('1,0');
  await pointer(seed(), 'pointerdown', 10, 10); await pointer(window, 'pointermove', 100, 150); await pointer(window, 'pointerup', 100, 150);
  assert.ok(label('Choose planting quantity'));
  await click(q('.quantity-popover .confirm')); assert.ok(garden().staged['1,0']);
  assert.equal(book(), originalBook); assert.equal(pose(), originalPose);
  await click(q('.apply-staging-button')); assert.ok(garden().pending['1,0']);
  console.log('PASS real inventory drag, stage and Apply preserve the open book and its pose');

  const world = q('.garden-camera-world'), oldCamera = world.style.transform;
  await act(() => label('Garden view').dispatchEvent(new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100, clientX: 300, clientY: 400 })));
  assert.notEqual(world.style.transform, oldCamera); assert.equal(pose(), originalPose);
  const zoomedCamera = world.style.transform;
  await act(() => q('.cg-table-surface').dispatchEvent(new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -100, clientX: 500, clientY: 500 })));
  assert.equal(world.style.transform, zoomedCamera); assert.notEqual(pose(), originalPose);
  const shiftedPose = pose();
  await pointer(hex('2,0'), 'pointerdown', 100, 100); await pointer(hex('2,0'), 'pointermove', 135, 120); await pointer(hex('2,0'), 'pointerup', 135, 120);
  assert.notEqual(world.style.transform, zoomedCamera); assert.equal(pose(), shiftedPose);
  console.log('PASS garden pan/zoom and table zoom affect only their own scene');

  await click(label('Write a Grimoire note'));
  assert.equal(q('.workspace').hasAttribute('inert'), true); assert.ok(q('.cg-tabletop.has-modal'));
  await escape(); assert.equal(q('.workspace').hasAttribute('inert'), false); assert.equal(book(), originalBook);
  assert.equal(q('.cg-stationery-desk'), null);
  console.log('PASS stationery temporarily makes the garden inert and Escape restores the parked book');

  await click(label('Write a Grimoire note'));
  await click([...q('.cg-stationery-desk').querySelectorAll('button')].find(button => /Shop/.test(button.textContent)));
  assert.equal(q('.cg-stationery-desk'), null); assert.equal(q('.workspace').hasAttribute('inert'), false);
  assert.equal(book(), originalBook); assert.equal(book().hasAttribute('inert'), true);
  await click(q('.shop-grimoire-link'));
  assert.equal(book(), originalBook); assert.equal(book().hasAttribute('inert'), false); assert.equal(pose(), shiftedPose);
  console.log('PASS stationery Shop round-trip releases its modal lock and returns to the same book');

  // Each foreground garden screen yields back to the same book instance.
  for (const name of ['Open Taskboard', 'Open Shop', 'Open main menu']) {
    const spread = q('.cg-page.left').textContent, view = pose();
    await click(label(name)); assert.equal(book(), originalBook); assert.equal(book().hasAttribute('inert'), true);
    if (name === 'Open main menu') await act(() => q('.main-menu').dispatchEvent(new window.Event('cancel', { bubbles: false, cancelable: true })));
    else await escape();
    assert.equal(book(), originalBook); assert.equal(book().hasAttribute('inert'), false); assert.equal(q('.cg-page.left').textContent, spread); assert.equal(pose(), view);
  }
  console.log('PASS Taskboard, Shop and main menu suspend and restore the same book without resetting it');

  await click(hex('0,0')); const portrait = q('.portrait-entry'); assert.ok(portrait);
  for (let i = 0; i < 2; i++) {
    await click(portrait); assert.ok(q('.cg-page.left [aria-label="Page 3 content"]'), 'requested Beanstalk spread is open');
    const entry = q('.cg-page.left').textContent;
    await click(label('Next spread')); assert.notEqual(q('.cg-page.left').textContent, entry);
  }
  assert.equal(book(), originalBook);
  console.log('PASS repeated inspector links navigate the already-open book');
  document.elementFromPoint = () => q('[data-inventory-dropzone]');
  await pointer(hex('0,0'), 'pointerdown', 100, 100); await pointer(window, 'pointermove', 600, 200); await pointer(window, 'pointerup', 600, 200);
  assert.equal(garden().objects['0,0'], undefined); assert.equal(book(), originalBook);
  assert.ok(q('.harvest-receipt')); assert.equal(pose(), shiftedPose);
  console.log('PASS garden organism drag to inventory harvests while the book stays open');
  assert.deepEqual(errors, []);
  console.log('8 integrated DOM scenario groups passed. Native hit-testing/visual review remains separate.');
} finally {
  if (root) await act(() => root.unmount());
  dom.window.close(); await rm(cache, { recursive: true, force: true });
}
