import { BOOK_ENTRIES } from './book.js';

export const MARKER_REST_MS = 1500;
export const MARKER_HOVER_LEAVE_MS = 350;

const entries = new Map(BOOK_ENTRIES.map(entry => [entry.key, entry]));
export const markerPage = marker => entries.get(marker.entryKey).page + Number(marker.side === 'right');
export const markerIsLeft = (marker, current) => markerPage(marker) <= current.page;
export const markerDisplayX = (marker, left) => left ? 100 - marker.position * 20 : marker.position * 20;
export const travellingMarkers = (markers, turn) => !turn ? [] : markers.filter(marker =>
  markerIsLeft(marker, BOOK_ENTRIES[turn.from]) !== markerIsLeft(marker, BOOK_ENTRIES[turn.to]));

// New placements save the note centre as a fraction of its page. The centre
// stays on the paper, allowing up to half the note to hang over any edge.
export function noteDrop(book, width, height, left, top, previousSide) {
  const pageWidth = book.width / 2, center = left + width / 2;
  const side = Math.abs(center - pageWidth) < 1e-7 && previousSide ? previousSide : center < pageWidth ? 'left' : 'right';
  const x = left + width / 2 - (side === 'right' ? pageWidth : 0);
  const fraction = (position, available) => Math.max(0, Math.min(100, position / available * 100));
  return { side, x: fraction(x, pageWidth), y: fraction(top + height / 2, book.height), tucked: false, overhang: true };
}
export function markerDrop(book, pointerX, width, pointerY, previousEdge = 'top') {
  const pageWidth = book.width / 2, inset = markerInset(pageWidth);
  const side = 'right';
  const edge = pointerY == null ? previousEdge : pointerY > book.height / 2 ? 'bottom' : 'top';
  const left = pointerX - (side === 'right' ? pageWidth : 0) - inset - width / 2;
  const position = Math.max(0, Math.min(5, Math.round(left / Math.max(1, pageWidth - width - inset * 2) * 5)));
  return { side, x: position * 20, position, edge };
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


export const markerWidth = pageWidth => Math.max(44, Math.min(140, pageWidth * .23));
export const markerInset = pageWidth => Math.max(8, Math.min(16, pageWidth * .025));

// A marker owns one global reservation. Passing pages only mirrors that slot.
export function layoutPageMarkers(markers, current) {
  return new Map(markers.map(marker => [marker.slot, markerDisplayX(marker, markerIsLeft(marker, current))]));
}

export const markerTilt = slot => [-4, 3, -2, 4, -3, 2][slot % 6];
export function markerWritingStyle(id) {
  const light = ['ivory-bloom', 'ivory-ribbon', 'golden-tassel'].includes(id);
  const box = MARKER_ART[id].box;
  return { '--marker-ratio': box[3] / box[2], '--marker-ink': light ? '#48301c' : '#fff0cf',
    '--marker-write-left': ['forest-tassel', 'garnet-moon'].includes(id) ? '30%' : '16%',
    '--marker-write-right': id === 'golden-tassel' ? '30%' : '15%' };
}

// Visible alpha bounds normalize the supplied art without editing the files.
// A common 2.5:1 image box used to add different empty gaps above each marker.
export const MARKER_ART = {
  'forest-tassel': { width: 321, height: 494, box: [0, 0, 320, 493] },
  'ivory-bloom': { width: 223, height: 498, box: [0, 9, 223, 489] },
  'garnet-moon': { width: 253, height: 484, box: [0, 17, 253, 467] },
  'teal-star': { width: 262, height: 484, box: [1, 5, 249, 473] },
  'plum-vine': { width: 185, height: 485, box: [0, 29, 185, 453] },
  'golden-tassel': { width: 270, height: 485, box: [0, 13, 260, 467] },
  'midnight-moon': { width: 274, height: 545, box: [0, 6, 268, 519] },
  'sage-pennant': { width: 230, height: 534, box: [1, 0, 229, 488] },
  'lavender-bloom': { width: 246, height: 548, box: [0, 0, 237, 516] },
  'ivory-ribbon': { width: 282, height: 544, box: [4, 1, 275, 506] },
  'ember-star': { width: 235, height: 544, box: [0, 1, 229, 519] },
  'teal-blossom': { width: 266, height: 538, box: [10, 7, 255, 487] },
};
