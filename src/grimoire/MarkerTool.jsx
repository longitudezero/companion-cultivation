import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { stationeryArt } from './stationery-art.js';
import { PAGE_MARKERS } from '../core/stationery.js';
import { markerDrop, markerWidth } from './stationery-model.js';

export default function MarkerTool({ bookRef, busy, styleId = 'forest-tassel', onClick, onDrop }) {
  const gesture = useRef(null), suppress = useRef(false), [draft, setDraft] = useState(null);
  function start(event) {
    if (event.button !== 0 || !bookRef.current) return;
    event.stopPropagation(); suppress.current = false;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY,
      book: bookRef.current.getBoundingClientRect(), dragged: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.id) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    drag.drop = markerDrop(drag.book, event.clientX - drag.book.left, markerWidth(drag.book.width / 2), event.clientY - drag.book.top);
    drag.inside = event.clientX >= drag.book.left && event.clientX <= drag.book.right && event.clientY >= drag.book.top && event.clientY <= drag.book.bottom;
    setDraft({ left: event.clientX - drag.book.left - 30, top: event.clientY - drag.book.top - 25 });
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
    {draft && bookRef.current && createPortal(<img className="cg-marker-tool-ghost" src={stationeryArt(PAGE_MARKERS[styleId].file)} alt="" style={draft}/>, bookRef.current)}
  </>;
}
