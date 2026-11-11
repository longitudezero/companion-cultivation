import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { stationeryArt } from './stationery-art.js';
import { PAGE_MARKERS } from '../core/stationery.js';
import { markerDrop, markerWidth, withinMarkerDropArea } from './stationery-model.js';
import { useBookCoordinates } from './BookView.jsx';
import { bookRectangle } from './book-view.js';
import MarkerSlots from './MarkerSlots.jsx';

export default function MarkerTool({ bookRef, journal, busy, styleId = 'forest-tassel', onClick, onDrop }) {
  const gesture = useRef(null), suppress = useRef(false), [draft, setDraft] = useState(null);
  const coordinates = useBookCoordinates();
  function start(event) {
    if (event.button !== 0 || event.isPrimary === false || gesture.current || !bookRef.current) return;
    event.preventDefault(); event.stopPropagation(); suppress.current = false;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY,
      book: bookRectangle(coordinates.size(bookRef.current)), dragged: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.id) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    const point = coordinates.point(event, bookRef.current);
    drag.drop = markerDrop(drag.book, point.x, markerWidth(drag.book.width / 2), point.y);
    drag.inside = point.x >= drag.book.width / 2 && withinMarkerDropArea(drag.book, point.x, point.y);
    setDraft({ left: point.x - 30, top: point.y - 25, drop: drag.inside ? drag.drop : null });
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.id) return;
    gesture.current = null; suppress.current = drag.dragged || cancelled;
    setDraft(null); event.stopPropagation();
    if (!cancelled && drag.dragged && drag.inside) onDrop(drag.drop);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <><button type="button" disabled={busy} className="cg-marker-tool" aria-label="Mark a Grimoire page"
    title="Drag onto a page to mark it, or click to choose a marker." onPointerDown={start} onPointerMove={move}
    onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
    onClick={event => { if (event.detail > 0 && suppress.current) { suppress.current = false; return; } onClick(); }}>
    <img src={stationeryArt(PAGE_MARKERS[styleId].file)} alt="" draggable="false"/><span>Mark a page</span></button>
    {draft && bookRef.current && createPortal(<><MarkerSlots journal={journal} size={coordinates.size(bookRef.current)} drop={draft.drop}/>
      <img className="cg-marker-tool-ghost" src={stationeryArt(PAGE_MARKERS[styleId].file)} alt="" style={{ left: draft.left, top: draft.top }}/></>, bookRef.current)}
  </>;
}
