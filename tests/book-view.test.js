import test from 'node:test';
import assert from 'node:assert/strict';
import { BOOK_SIZE, BOOK_OFFSET, TABLE_SIZE, STATIONERY_PLACEMENT, MIN_BOOK_ZOOM, MAX_BOOK_ZOOM, bookRectangle, bookToScreen, screenToBook,
  tableToScreen, coverBounds, fitBook, fitTabletop, zoomBookAt, savedBookView, restoreBookView, recoverBook, pageMarginHit } from '../src/grimoire/book-view.js';
import { markerDrop, withinMarkerDropArea, noteDrop, noteGeometry, MARKER_ART, markerWritingStyle } from '../src/grimoire/stationery-model.js';
import { PAGE_MARKERS } from '../src/core/stationery.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
const viewports = [{ width: 1440, height: 1000 }, { width: 1280, height: 800 }, { width: 1024, height: 700 }, { width: 390, height: 844 }];

test('book coordinates round trip after combined pan, zoom and full flat rotation', () => {
  for (const rotation of [-179, -90, -35, 0, 20, 89.9, 165]) for (const zoom of [.23, .8, 1, 2.25]) {
    const view = { x: 785, y: 381, zoom, rotation };
    for (const point of [{ x: 0, y: 0 }, { x: 1120, y: BOOK_SIZE.height }, { x: 560, y: 32 }, { x: -80, y: 900 }]) {
      const recovered = screenToBook(bookToScreen(point, view), view);
      close(recovered.x, point.x); close(recovered.y, point.y);
    }
  }
});

test('pointer-anchored book zoom preserves the chosen paper location and clamps bounds', () => {
  const point = { x: 450, y: 210 }, view = { x: 810, y: 405, zoom: .7, rotation: -32 };
  const local = screenToBook(point, view);
  for (const zoom of [.001, .5, 1.3, 99]) {
    const next = zoomBookAt(view, point, zoom), after = bookToScreen(local, next);
    close(after.x, point.x); close(after.y, point.y);
    assert.ok(next.zoom >= MIN_BOOK_ZOOM && next.zoom <= MAX_BOOK_ZOOM);
    assert.equal(next.rotation, view.rotation);
  }
});

test('Fit Book centers the rotated physical cover without reserving accessory docks', () => {
  for (const viewport of viewports) for (const rotation of [-90, -28, 0, 35]) {
    const view = fitBook(viewport, rotation), bounds = coverBounds(view);
    close((bounds.left + bounds.right) / 2, viewport.width / 2);
    close((bounds.top + bounds.bottom) / 2, (viewport.height + 44) / 2);
    assert.ok(bounds.left >= 55.99 && bounds.right <= viewport.width - 55.99);
    assert.ok(bounds.top >= 43.99 && bounds.bottom <= viewport.height - 43.99);
    assert.equal(view.rotation, rotation);
  }
});

test('saved browser pose survives reopen, refresh and a smaller window without erasing zoom or angle', () => {
  const viewport = viewports[0], view = { x: 735, y: 490, zoom: 1.25, rotation: -25 };
  const saved = JSON.parse(JSON.stringify(savedBookView(view, viewport)));
  const restored = restoreBookView(saved, viewport);
  close(restored.x, view.x); close(restored.y, view.y); close(restored.zoom, view.zoom); close(restored.rotation, view.rotation);
  const resized = restoreBookView(saved, viewports[2]);
  close(resized.zoom, view.zoom); close(resized.rotation, view.rotation);
  close(resized.x / viewports[2].width, saved.x); close(resized.y / viewports[2].height, saved.y);
});

test('missing, non-finite, unsupported and out-of-range stored views fall back safely', () => {
  const viewport = viewports[1];
  for (const saved of [null, {}, { version: 2 }, { version: 1, x: 1, y: .5, zoom: NaN, rotation: 2 },
    { version: 1, x: Infinity, y: 0, zoom: 1, rotation: 0 }, { version: 1, x: 1, y: .5, zoom: 0, rotation: 2 },
    { version: 1, x: Number.MAX_VALUE, y: .5, zoom: 1, rotation: 0 },
    { version: 1, x: '1', y: .5, zoom: 1, rotation: 2 }]) assert.deepEqual(restoreBookView(saved, viewport), fitTabletop(viewport));
});

test('table-center rotation keeps the book and tools at rigid local distances', () => {
  for (const rotation of [-170, -90, 0, 27, 160]) for (const zoom of [.3, 1, 2]) {
    const view = { x: 650, y: 420, zoom, rotation };
    const pivot = tableToScreen({ x: TABLE_SIZE.width / 2, y: TABLE_SIZE.height / 2 }, view);
    close(pivot.x, view.x); close(pivot.y, view.y);
    const paper = bookToScreen({ x: 0, y: 0 }, view);
    const attached = tableToScreen(BOOK_OFFSET, view);
    close(paper.x, attached.x); close(paper.y, attached.y);
    for (const tool of Object.values(STATIONERY_PLACEMENT)) {
      const point = tableToScreen(tool, view);
      close(Math.hypot(point.x - paper.x, point.y - paper.y), Math.hypot(tool.x - BOOK_OFFSET.x, tool.y - BOOK_OFFSET.y) * zoom);
    }
  }
});

test('legacy paper-centered preferences migrate to a table pivot without moving any paper point', () => {
  const viewport = viewports[0];
  for (const rotation of [-150, -40, 0, 90, 170]) {
    const old = { version: 1, x: .5, y: .5, zoom: .8, rotation };
    const view = restoreBookView(old, viewport), radians = rotation * Math.PI / 180;
    for (const p of [{ x: 0, y: 0 }, { x: 560, y: 400 }, { x: 1120, y: BOOK_SIZE.height }]) {
      const x = (p.x - BOOK_SIZE.width / 2) * old.zoom, y = (p.y - BOOK_SIZE.height / 2) * old.zoom;
      const actual = bookToScreen(p, view);
      close(actual.x, viewport.width * old.x + x * Math.cos(radians) - y * Math.sin(radians));
      close(actual.y, viewport.height * old.y + x * Math.sin(radians) + y * Math.cos(radians));
    }
    const saved = savedBookView(view, viewport);
    assert.equal(saved.version, 2);
    const reopened = restoreBookView(saved, viewport);
    close(reopened.x, view.x); close(reopened.y, view.y); // migration happens once
  }
});

test('default framing keeps the paper and both tools visible while allowing the outer table to crop', () => {
  for (const viewport of viewports) {
    const view = fitTabletop(viewport), bounds = coverBounds(view);
    assert.ok(bounds.left > 0 && bounds.right < viewport.width);
    assert.ok(bounds.top > 56 && bounds.bottom < viewport.height);
    for (const tool of Object.values(STATIONERY_PLACEMENT)) {
      const angle = tool.rotation * Math.PI / 180;
      for (const dx of [-tool.width / 2, tool.width / 2]) for (const dy of [-tool.height / 2, tool.height / 2]) {
        const p = tableToScreen({ x: tool.x + tool.width / 2 + dx * Math.cos(angle) - dy * Math.sin(angle),
          y: tool.y + tool.height / 2 + dx * Math.sin(angle) + dy * Math.cos(angle) }, view);
        assert.ok(p.x > 0 && p.x < viewport.width && p.y > 56 && p.y < viewport.height);
      }
    }
  }
});

test('recovery makes a real rotated cover point reachable even when its screen bounding box is misleading', () => {
  const viewport = viewports[2];
  for (const rotation of [-160, -90, -45, 0, 23, 90, 179]) for (const [x, y] of [[4000, 3000], [-3000, -2000], [4000, -2000]]) {
    const recovered = recoverBook({ x, y, zoom: 1.8, rotation }, viewport);
    assert.equal(recovered.zoom, 1.8); assert.equal(recovered.rotation, rotation);
    const target = { x: Math.max(96, Math.min(viewport.width - 96, recovered.x)), y: Math.max(152, Math.min(viewport.height - 96, recovered.y)) };
    // The first recovery supplies a reachable cover point. A second is stable.
    const again = recoverBook(recovered, viewport);
    close(again.x, recovered.x); close(again.y, recovered.y);
    const p = screenToBook(target, recovered);
    assert.ok(p.x >= -39.00001 && p.x <= BOOK_SIZE.width + 39.00001);
    assert.ok(p.y >= -15.00001 && p.y <= BOOK_SIZE.height + 37.00001);
  }
});

test('marker drop sides and top/bottom follow the paper after the whole book rotates', () => {
  const size = bookRectangle(), view = { x: 710, y: 350, zoom: 1.7, rotation: 82 };
  for (const side of ['right']) for (const edge of ['top', 'bottom']) {
    const intended = { x: side === 'left' ? 210 : 840, y: edge === 'top' ? -20 : size.height + 20 };
    const local = screenToBook(bookToScreen(intended, view), view);
    assert.equal(withinMarkerDropArea(size, local.x, local.y), true);
    const drop = markerDrop(size, local.x, 128.8, local.y);
    assert.equal(drop.side, side); assert.equal(drop.edge, edge);
  }
  const outside = screenToBook(bookToScreen({ x: -10, y: 300 }, view), view);
  assert.equal(withinMarkerDropArea(size, outside.x, outside.y), false);
});

test('a rotated and enlarged edge note keeps its intended centre and half-overhang on both pages', () => {
  const page = { width: BOOK_SIZE.width / 2, height: BOOK_SIZE.height }, view = { x: 690, y: 420, zoom: 1.6, rotation: -36 };
  for (const side of ['left', 'right']) for (const x of [0, 100]) {
    const note = { side, x, y: 0, rotation: 27, scale: 1.2, overhang: true }, geometry = noteGeometry(note, page, 419 / 334);
    const center = { x: (side === 'right' ? page.width : 0) + geometry.left + geometry.boxWidth / 2, y: geometry.top + geometry.boxHeight / 2 };
    const local = screenToBook(bookToScreen(center, view), view);
    const drop = noteDrop(bookRectangle(), geometry.boxWidth, geometry.boxHeight, local.x - geometry.boxWidth / 2, local.y - geometry.boxHeight / 2, side);
    close(drop.x, x); close(drop.y, 0); assert.equal(drop.overhang, true); assert.equal(drop.side, side);
  }
});

test('page-turn margins use actual page coordinates, not the rotated screen bounding rectangle', () => {
  const view = { x: 600, y: 400, zoom: 1.3, rotation: 41 }, size = BOOK_SIZE;
  for (const [point, side, expected] of [[{ x: 15, y: 400 }, 'left', true], [{ x: 1110, y: 350 }, 'right', true],
    [{ x: -8, y: 350 }, 'left', false], [{ x: 10, y: -4 }, 'left', false], [{ x: 560, y: 300 }, 'right', false]]) {
    assert.equal(pageMarginHit(screenToBook(bookToScreen(point, view), view), side, size, 196), expected);
  }
});

test('all twelve marker styles normalize their complete visible art to an intrinsic aspect ratio', () => {
  assert.deepEqual(Object.keys(MARKER_ART), Object.keys(PAGE_MARKERS));
  for (const [id, source] of Object.entries(MARKER_ART)) {
    const [x, y, width, height] = source.box;
    assert.ok(x >= 0 && y >= 0 && x + width <= source.width && y + height <= source.height);
    assert.equal(markerWritingStyle(id)['--marker-ratio'], height / width);
  }
});
