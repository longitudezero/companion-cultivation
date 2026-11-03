import React, { useRef, useState } from 'react';
import { PAGE_MARKERS } from '../core/stationery.js';
import { movePageMarker } from '../core/journal.js';
import { stationeryArt } from './stationery-art.js';
import { BOOK_ENTRIES, entryName } from './book.js';
import { markerPage, markerIsLeft, markerDisplayX, markerDrop } from './stationery-model.js';

function MarkerArtwork({ marker }) {
  return <span className="cg-marker-body" aria-hidden="true"><img src={stationeryArt(PAGE_MARKERS[marker.styleId].file)} alt="" draggable="false"/></span>;
}

function PageMarker({ marker, ledger, current, busy, travelling, navigate, onChange }) {
  const anchor = useRef(null), gesture = useRef(null), suppress = useRef(false);
  const [draft, setDraft] = useState(null);
  const entry = BOOK_ENTRIES.find(item => item.key === marker.entryKey), left = markerIsLeft(marker, current);
  const label = `${entryName(entry, ledger)} · page ${markerPage(marker)}`;
  const active = marker.entryKey === current.key && !busy;
  function start(event) {
    if (event.button !== 0 || busy) return;
    event.stopPropagation(); suppress.current = false;
    const book = anchor.current.closest('.cg-book').getBoundingClientRect(), rect = anchor.current.getBoundingClientRect();
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, book, width: rect.width, dragged: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    drag.next = markerDrop(drag.book, event.clientX - drag.book.left, drag.width);
    setDraft({ left: event.clientX - drag.book.left - drag.width / 2, top: event.clientY - drag.book.top - 32 });
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.stopPropagation(); gesture.current = null; suppress.current = drag.dragged || cancelled;
    if (drag.dragged && !cancelled) onChange(garden => movePageMarker(garden, marker.slot, current.key, drag.next.side, drag.next.x));
    setDraft(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <div ref={anchor} data-marker-slot={marker.slot} data-marked-page={markerPage(marker)} data-marker-side={left ? 'left' : 'right'}
    className={`cg-personal-bookmark ${left ? 'left' : 'right'}${active ? ' is-open' : ''}${travelling ? ' travelling' : ''}${draft ? ' is-dragging' : ''}`}
    style={{ '--marker-half': Number(!left), '--marker-outer-left': Number(left), '--marker-x': markerDisplayX(marker, left) / 100,
      ...(draft ? { left: draft.left, top: draft.top } : {}) }}
    onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)}
    onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
    onClick={event => { event.stopPropagation(); if (busy) return;
      if (event.detail > 0 && suppress.current) { suppress.current = false; return; } navigate(entry.key); }}>
    <MarkerArtwork key={active ? current.key : 'rest'} marker={marker}/>
    <button className="cg-marker-handle" disabled={busy} title={`${label}. Drag onto a page to move this marker.`}
      aria-label={`Open marked page: ${label}`} aria-current={active ? 'page' : undefined}
      onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.stopPropagation(); event.preventDefault();
        const side = event.altKey ? event.key === 'ArrowLeft' ? 'left' : 'right' : marker.side;
        const entryKey = event.altKey ? current.key : marker.entryKey;
        const x = event.altKey ? marker.x : marker.x + (event.key === 'ArrowLeft' ? -2 : 2);
        onChange(garden => movePageMarker(garden, marker.slot, entryKey, side, x));
      }}><span className="cg-marker-page">{markerPage(marker)}</span></button>
  </div>;
}

export function PersonalBookmarks({ journal, ledger, current, busy, navigate, movingMarkers = [], onChange }) {
  return <nav className="cg-personal-bookmarks" aria-label="Marked pages">{journal.bookmarks.map(marker =>
    <PageMarker key={marker.slot} marker={marker} ledger={ledger} current={current} busy={busy} navigate={navigate}
      travelling={movingMarkers.some(item => item.slot === marker.slot)} onChange={onChange}/>)}</nav>;
}

export function TurningPersonalMarkers({ markers, turn }) {
  const from = BOOK_ENTRIES[turn.from];
  return <div className="cg-turn-personal-markers" aria-hidden="true">{markers.map(marker => {
    const x = markerDisplayX(marker, markerIsLeft(marker, from));
    return <div key={marker.slot} className="cg-turn-personal-marker" data-turning-marker={marker.slot}
      style={{ '--marker-x': x / 100, '--marker-outer-left': Number(markerIsLeft(marker, from)) }}><div className="cg-turn-marker-front"><MarkerArtwork marker={marker}/></div>
      <div className="cg-turn-marker-back"><MarkerArtwork marker={marker}/></div></div>;
  })}</div>;
}
