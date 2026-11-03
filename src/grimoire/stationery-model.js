import { BOOK_ENTRIES } from './book.js';

const entries = new Map(BOOK_ENTRIES.map(entry => [entry.key, entry]));
export const markerPage = marker => entries.get(marker.entryKey).page + Number(marker.side === 'right');
export const markerIsLeft = (marker, current) => markerPage(marker) <= current.page;
export const markerDisplayX = (marker, left) => (left ? 'left' : 'right') === marker.side ? marker.x : 100 - marker.x;
export const travellingMarkers = (markers, turn) => !turn ? [] : markers.filter(marker =>
  markerIsLeft(marker, BOOK_ENTRIES[turn.from]) !== markerIsLeft(marker, BOOK_ENTRIES[turn.to]));

// Positions use the remaining space on a page, so a change of viewport keeps
// each note inside its new page. The note centre decides which page receives it.
export function noteDrop(book, width, height, left, top) {
  const pageWidth = book.width / 2, side = left + width / 2 < pageWidth ? 'left' : 'right';
  const x = left - (side === 'right' ? pageWidth : 0);
  const fraction = (position, available) => available > 0 ? Math.max(0, Math.min(100, (position - 8) / available * 100)) : 50;
  return { side, x: fraction(x, pageWidth - width - 16), y: fraction(top, book.height - height - 16), tucked: false };
}
export function markerDrop(book, pointerX, width, pointerY, previousEdge = 'top') {
  const pageWidth = book.width / 2, inset = Math.min(100, pageWidth * .26);
  const side = pointerX < pageWidth ? 'left' : 'right';
  const left = pointerX - (side === 'right' ? pageWidth : inset) - width / 2;
  const edge = pointerY == null ? previousEdge : pointerY > book.height * .65 ? 'bottom' : pointerY < book.height * .35 ? 'top' : previousEdge;
  return { side, x: Math.max(0, Math.min(100, left / Math.max(1, pageWidth - width - inset) * 100)), edge };
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
    left: 8 + Math.max(0, width - boxWidth - 16) * note.x / 100,
    top: 8 + Math.max(0, height - boxHeight - 16) * note.y / 100,
    offsetX: (boxWidth - paperWidth) / 2, offsetY: (boxHeight - paperHeight) / 2 };
}

export const markerTilt = slot => [-7, 5, -3, 8, -5, 3][slot % 6];
export function markerWritingStyle(id) {
  const light = ['ivory-bloom', 'ivory-ribbon', 'golden-tassel'].includes(id);
  return { '--marker-ink': light ? '#48301c' : '#fff0cf',
    '--marker-write-left': ['forest-tassel', 'garnet-moon'].includes(id) ? '30%' : '16%',
    '--marker-write-right': id === 'golden-tassel' ? '30%' : '15%' };
}
