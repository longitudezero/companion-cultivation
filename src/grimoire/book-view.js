// Paper coordinates never change. The book is offset on one rigid table scene.
export const BOOK_SIZE = Object.freeze({ width: 1120, height: 794.4188 });
export const TABLE_SIZE = Object.freeze({ width: 1590, height: 1490 });
export const BOOK_OFFSET = Object.freeze({ x: 218, y: 440 });
export const STATIONERY_PLACEMENT = Object.freeze({
  marker: Object.freeze({ x: 530, y: 121, width: 108, height: 162, rotation: 32 }),
  inkwell: Object.freeze({ x: 654, y: 120, width: 168, height: 168, rotation: 0 }),
});
export const TABLETOP_STYLE = Object.freeze({ '--table-width': `${TABLE_SIZE.width}px`, '--table-height': `${TABLE_SIZE.height}px`,
  '--book-left': `${BOOK_OFFSET.x}px`, '--book-top': `${BOOK_OFFSET.y}px` });
export const BOOK_VIEW_KEY = 'companion-cultivation:book-view:v1';
export const MIN_BOOK_ZOOM = .18;
export const MAX_BOOK_ZOOM = 2.25;
export const clampBookZoom = zoom => Math.max(MIN_BOOK_ZOOM, Math.min(MAX_BOOK_ZOOM, zoom));
export const flatAngle = degrees => ((degrees + 180) % 360 + 360) % 360 - 180;

export function tableToScreen(point, view) {
  const radians = view.rotation * Math.PI / 180, c = Math.cos(radians), s = Math.sin(radians);
  const x = (point.x - TABLE_SIZE.width / 2) * view.zoom, y = (point.y - TABLE_SIZE.height / 2) * view.zoom;
  return { x: view.x + x * c - y * s, y: view.y + x * s + y * c };
}

export function screenToTable(point, view) {
  const radians = view.rotation * Math.PI / 180, c = Math.cos(radians), s = Math.sin(radians);
  const x = point.x - view.x, y = point.y - view.y;
  return { x: (x * c + y * s) / view.zoom + TABLE_SIZE.width / 2,
    y: (-x * s + y * c) / view.zoom + TABLE_SIZE.height / 2 };
}

export const bookToScreen = (point, view) => tableToScreen({ x: point.x + BOOK_OFFSET.x, y: point.y + BOOK_OFFSET.y }, view);
export function screenToBook(point, view) {
  const local = screenToTable(point, view);
  return { x: local.x - BOOK_OFFSET.x, y: local.y - BOOK_OFFSET.y };
}

export const bookRectangle = (size = BOOK_SIZE) => ({ left: 0, top: 0, right: size.width, bottom: size.height, ...size });

export function coverBounds(view, size = BOOK_SIZE) {
  const points = [[-39, -15], [size.width + 39, -15], [-39, size.height + 37], [size.width + 39, size.height + 37]]
    .map(([x, y]) => bookToScreen({ x, y }, view));
  return { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)),
    top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) };
}

export function fitBook(viewport, rotation = 0, size = BOOK_SIZE) {
  const bounds = coverBounds({ x: 0, y: 0, zoom: 1, rotation }, size);
  return fitBounds(viewport, bounds, rotation);
}

function fitBounds(viewport, bounds, rotation) {
  const zoom = clampBookZoom(Math.min(1, Math.max(100, viewport.width - 112) / (bounds.right - bounds.left),
    Math.max(100, viewport.height - 136) / (bounds.bottom - bounds.top)));
  return { x: viewport.width / 2 - (bounds.left + bounds.right) / 2 * zoom,
    y: (viewport.height + 44) / 2 - (bounds.top + bounds.bottom) / 2 * zoom, zoom, rotation };
}

// Frame the useful arrangement, not the entire ornamental rim. Fit book remains
// available for a closer reading view without moving anything relative to wood.
export function fitTabletop(viewport, rotation = 0) {
  const left = BOOK_OFFSET.x - 136, right = BOOK_OFFSET.x + BOOK_SIZE.width + 136;
  const top = 86, bottom = BOOK_OFFSET.y + BOOK_SIZE.height + 37;
  const points = [[left, top], [right, top], [left, bottom], [right, bottom]]
    .map(([x, y]) => tableToScreen({ x, y }, { x: 0, y: 0, zoom: 1, rotation }));
  return fitBounds(viewport, { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)),
    top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) }, rotation);
}

export function zoomBookAt(view, point, proposedZoom) {
  const zoom = clampBookZoom(proposedZoom), ratio = zoom / view.zoom;
  return { ...view, zoom, x: point.x - (point.x - view.x) * ratio, y: point.y - (point.y - view.y) * ratio };
}

// Keep a useful strip of cover reachable without reserving room for accessories.
export function recoverBook(view, viewport, size = BOOK_SIZE) {
  const reach = Math.min(96, viewport.width / 3, Math.max(1, viewport.height - 56) / 3);
  const target = { x: Math.max(reach, Math.min(viewport.width - reach, view.x)),
    y: Math.max(56 + reach, Math.min(viewport.height - reach, view.y)) };
  const local = screenToBook(target, view);
  const nearest = bookToScreen({ x: Math.max(-39, Math.min(size.width + 39, local.x)),
    y: Math.max(-15, Math.min(size.height + 37, local.y)) }, view);
  return { ...view, x: view.x + target.x - nearest.x, y: view.y + target.y - nearest.y };
}

export function savedBookView(view, viewport) {
  return { version: 3, x: view.x / viewport.width, y: view.y / viewport.height, zoom: view.zoom, rotation: flatAngle(view.rotation) };
}

export function restoreBookView(saved, viewport) {
  if (![1, 2, 3].includes(saved?.version) || !['x', 'y', 'zoom', 'rotation'].every(key => typeof saved[key] === 'number' && Number.isFinite(saved[key]))
    || Math.abs(saved.x) > 1000 || Math.abs(saved.y) > 1000
    || saved.zoom < MIN_BOOK_ZOOM || saved.zoom > MAX_BOOK_ZOOM) return fitTabletop(viewport);
  let view = { x: saved.x * viewport.width, y: saved.y * viewport.height, zoom: saved.zoom, rotation: flatAngle(saved.rotation) };
  if (saved.version < 3) {
    // v1 used the paper center and v2 used the center of the round table.
    const paperCenter = { x: BOOK_SIZE.width / 2, y: BOOK_SIZE.height / 2 };
    const oldOffset = saved.version === 2 ? { x: 296 - 896, y: 552 - 896 } : { x: -paperCenter.x, y: -paperCenter.y };
    const oldCenter = tableToScreen({
      x: TABLE_SIZE.width / 2 + oldOffset.x + paperCenter.x,
      y: TABLE_SIZE.height / 2 + oldOffset.y + paperCenter.y,
    }, view);
    const newCenter = bookToScreen(paperCenter, view);
    view = { ...view, x: view.x + oldCenter.x - newCenter.x, y: view.y + oldCenter.y - newCenter.y };
  }
  return recoverBook(view, viewport);
}

// A page's true local margin, including the scrollbar track, rather than a
// rotated axis-aligned client rectangle. Keeps old selected text irrelevant.
export function pageMarginHit(point, side, size, margin) {
  return point.y >= 0 && point.y <= size.height && (side === 'left'
    ? point.x >= 0 && point.x <= margin : point.x >= size.width - margin && point.x <= size.width);
}
