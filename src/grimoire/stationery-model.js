import { BOOK_ENTRIES } from './book.js';

export const MARKER_REST_MS = 1500;
export const MARKER_HOVER_LEAVE_MS = 350;

const entries = new Map(BOOK_ENTRIES.map(entry => [entry.key, entry]));
export const markerPage = marker => entries.get(marker.entryKey).page + Number(marker.side === 'right');
export const markerIsLeft = (marker, current) => markerPage(marker) <= current.page;
export const markerDisplayX = (marker, left) => (left ? 'left' : 'right') === marker.side ? marker.x : 100 - marker.x;
export const travellingMarkers = (markers, turn) => !turn ? [] : markers.filter(marker =>
  markerIsLeft(marker, BOOK_ENTRIES[turn.from]) !== markerIsLeft(marker, BOOK_ENTRIES[turn.to]));

// New placements save the note centre as a fraction of its page. The centre
// stays on the paper, allowing up to half the note to hang over any edge.
export function noteDrop(book, width, height, left, top) {
  const pageWidth = book.width / 2, side = left + width / 2 < pageWidth ? 'left' : 'right';
  const x = left + width / 2 - (side === 'right' ? pageWidth : 0);
  const fraction = (position, available) => Math.max(0, Math.min(100, position / available * 100));
  return { side, x: fraction(x, pageWidth), y: fraction(top + height / 2, book.height), tucked: false, overhang: true };
}
export function markerDrop(book, pointerX, width, pointerY, previousEdge = 'top') {
  const pageWidth = book.width / 2, inset = markerInset(pageWidth);
  const side = pointerX < pageWidth ? 'left' : 'right';
  const edge = pointerY == null ? previousEdge : pointerY > book.height / 2 ? 'bottom' : 'top';
  const left = pointerX - (side === 'right' ? pageWidth : 0) - inset - width / 2;
  return { side, x: Math.max(0, Math.min(100, left / Math.max(1, pageWidth - width - inset * 2) * 100)), edge };
}

export function withinMarkerDropArea(book, x, y) {
  const margin = Math.min(144, markerWidth(book.width / 2) * 2.5 * .42);
  return x >= book.left && x <= book.right && y >= book.top - margin && y <= book.bottom + margin;
}

export function noteGeometry(note, page, ratio) {
  const width = page?.width || 460, height = page?.height || 650;
  const angle = (note.rotation ?? -2) * Math.PI / 180;
  const c = Math.abs(Math.cos(angle)), s = Math.abs(Math.sin(angle));
  const desired = Math.min(280, width * .86) * (note.scale ?? 1);
  const fit = Math.min(1, (width - 16) / (desired * (c + s / ratio)), (height - 16) / (desired * (s + c / ratio)));
  const paperWidth = desired * fit, paperHeight = paperWidth / ratio;
  const boxWidth = paperWidth * c + paperHeight * s, boxHeight = paperWidth * s + paperHeight * c;
  return { width: paperWidth, height: paperHeight, boxWidth, boxHeight,
    // Keep the original mapping for untouched notes in older saves.
    left: note.overhang ? width * note.x / 100 - boxWidth / 2 : 8 + Math.max(0, width - boxWidth - 16) * note.x / 100,
    top: note.overhang ? height * note.y / 100 - boxHeight / 2 : 8 + Math.max(0, height - boxHeight - 16) * note.y / 100,
    offsetX: (boxWidth - paperWidth) / 2, offsetY: (boxHeight - paperHeight) / 2 };
}


export const markerWidth = pageWidth => Math.max(44, Math.min(150, pageWidth * .26));
export const markerInset = pageWidth => Math.max(8, Math.min(16, pageWidth * .025));

// Fan markers across their physical page edge. Saved x values determine their
// order, while the display positions leave every head exposed in a full stack.
// This is presentation only: page assignments and players' saved positions stay intact.
export function layoutPageMarkers(markers, current) {
  const positions = new Map();
  for (const edge of ['top', 'bottom']) for (const left of [true, false]) {
    const group = markers.filter(marker => marker.edge === edge && markerIsLeft(marker, current) === left)
      .sort((a, b) => markerDisplayX(a, left) - markerDisplayX(b, left) || a.slot - b.slot);
    group.forEach((marker, index) => positions.set(marker.slot,
      group.length === 1 ? markerDisplayX(marker, left) : index / (group.length - 1) * 100));
  }
  return positions;
}

export const markerTilt = slot => [-4, 3, -2, 4, -3, 2][slot % 6];
export function markerWritingStyle(id) {
  const light = ['ivory-bloom', 'ivory-ribbon', 'golden-tassel'].includes(id);
  return { '--marker-ink': light ? '#48301c' : '#fff0cf',
    '--marker-write-left': ['forest-tassel', 'garnet-moon'].includes(id) ? '30%' : '16%',
    '--marker-write-right': id === 'golden-tassel' ? '30%' : '15%' };
}
