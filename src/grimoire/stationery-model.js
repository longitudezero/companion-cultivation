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
  const fraction = (position, available) => available > 0 ? Math.max(0, Math.min(100, position / available * 100)) : 50;
  return { side, x: fraction(x, pageWidth - width), y: fraction(top, book.height - height), tucked: false };
}
export function markerDrop(book, pointerX, width) {
  const pageWidth = book.width / 2, inset = 40;
  const side = pointerX < pageWidth ? 'left' : 'right';
  const left = pointerX - (side === 'right' ? pageWidth : inset) - width / 2;
  return { side, x: Math.max(0, Math.min(100, left / Math.max(1, pageWidth - width - inset) * 100)) };
}
