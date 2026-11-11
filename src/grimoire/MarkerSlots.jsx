import React from 'react';
import { markerWidth, markerInset } from './stationery-model.js';

// Only visible while dragging. Reservations include markers on the left stack.
export default function MarkerSlots({ journal, size, drop, movingSlot }) {
  const width = markerWidth(size.width / 2), inset = markerInset(size.width / 2);
  return <div className="cg-marker-slots" aria-hidden="true">{['top', 'bottom'].flatMap(edge => Array.from({ length: 6 }, (_, position) => {
    const occupied = journal.bookmarks.some(m => m.slot !== movingSlot && m.edge === edge && m.position === position);
    return <span key={`${edge}/${position}`} data-slot-position={position} data-slot-edge={edge}
      className={`cg-slot-guide${occupied ? ' is-reserved' : ''}${drop?.position === position && drop.edge === edge ? ' is-target' : ''}`}
      style={{ left: size.width / 2 + inset + (size.width / 2 - width - inset * 2) * position / 5 + width / 2 - 38, width: 76, top: edge === 'top' ? -46 : size.height }}>
      {position + 1}{occupied ? ' · Reserved' : ''}</span>;
  }))}</div>;
}
