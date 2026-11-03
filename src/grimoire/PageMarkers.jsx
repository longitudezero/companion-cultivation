import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PAGE_MARKERS } from '../core/stationery.js';
import { movePageMarker } from '../core/journal.js';
import { stationeryArt } from './stationery-art.js';
import { BOOK_ENTRIES, entryName } from './book.js';
import { markerPage, markerIsLeft, markerDisplayX, markerDrop, markerTilt, markerWritingStyle, layoutPageMarkers, markerWidth, MARKER_REST_MS, MARKER_HOVER_LEAVE_MS } from './stationery-model.js';

function MarkerArtwork({ marker, children }) {
  const name = marker.name || (marker.entryKey ? String(markerPage(marker)) : '');
  return <span className="cg-marker-body" aria-hidden={children ? undefined : true}><img src={stationeryArt(PAGE_MARKERS[marker.styleId].file)} alt="" draggable="false"/>
    {name && <strong className="cg-marker-surface-name" aria-hidden="true">{name}</strong>}
    {marker.description && <span className="cg-marker-description" aria-hidden="true">{marker.description}</span>}{children}</span>;
}
export function MarkerPreview({ marker }) {
  return <div className="cg-marker-preview" style={markerWritingStyle(marker.styleId)}><MarkerArtwork marker={marker}/></div>;
}

function PageMarker({ marker, ledger, current, busy, reduced, travelling, navigate, onChange, onEdit, onIssue, displayX }) {
  const anchor = useRef(null), gesture = useRef(null), suppress = useRef(false);
  const leaveTimer = useRef(null);
  const [book, setBook] = useState(null), [raised, setRaised] = useState(false), [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState(null);
  const entry = BOOK_ENTRIES.find(item => item.key === marker.entryKey), left = markerIsLeft(marker, current);
  const label = `${marker.name ? marker.name + ' · ' : ''}${entryName(entry, ledger)} · page ${markerPage(marker)}`;
  const active = marker.entryKey === current.key && !busy;
  const resting = active && (!raised || hovered || focused);
  useLayoutEffect(() => { setBook(anchor.current.closest('.cg-book')); }, []);
  useEffect(() => {
    setHovered(false); setFocused(false); setRaised(Boolean(active && reduced));
    window.clearTimeout(leaveTimer.current);
    if (!active || reduced) return undefined;
    const timer = window.setTimeout(() => setRaised(true), MARKER_REST_MS);
    return () => window.clearTimeout(timer);
  }, [active, reduced, marker.entryKey, marker.side]);
  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);
  function start(event) {
    if (event.button !== 0 || busy) return;
    event.stopPropagation(); suppress.current = false;
    const book = anchor.current.closest('.cg-book').getBoundingClientRect();
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, book, width: markerWidth(book.width / 2), dragged: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    drag.next = markerDrop(drag.book, event.clientX - drag.book.left, drag.width, event.clientY - drag.book.top, marker.edge);
    setDraft({ left: event.clientX - drag.book.left - drag.width / 2, top: event.clientY - drag.book.top - 32 });
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.stopPropagation(); gesture.current = null; suppress.current = drag.dragged || cancelled;
    if (drag.dragged && !cancelled) {
      try { onChange(garden => movePageMarker(garden, marker.slot, current.key, drag.next.side, drag.next.x, drag.next.edge)); }
      catch (issue) { onIssue?.(issue.message); }
    }
    setDraft(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const content = <div ref={anchor} data-marker-slot={marker.slot} data-marked-page={markerPage(marker)} data-marker-side={left ? 'left' : 'right'}
    data-marker-phase={active ? resting ? 'resting' : 'raised' : undefined}
    className={`cg-personal-bookmark edge-${marker.edge} ${left ? 'left' : 'right'}${active ? ` is-open ${resting ? 'is-resting' : 'is-raised'}` : ''}${travelling ? ' travelling' : ''}${draft ? ' is-dragging' : ''}`}
    style={{ ...markerWritingStyle(marker.styleId), '--marker-half': Number(!left), '--marker-outer-left': Number(left), '--marker-x': displayX / 100,
      '--marker-tilt': `${markerTilt(marker.slot)}deg`, '--marker-open-angle': `${(left ? -1 : 1) * 158}deg`,
      '--marker-rest-angle': '0deg' }}
    onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)}
    onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
    onPointerEnter={event => { if (active && event.pointerType !== 'touch') { window.clearTimeout(leaveTimer.current); setHovered(true); } }}
    onPointerLeave={() => { if (active) leaveTimer.current = window.setTimeout(() => setHovered(false), MARKER_HOVER_LEAVE_MS); }}
    onFocus={() => { if (active) setFocused(true); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onClick={event => { event.stopPropagation(); if (busy) return;
      if (event.detail > 0 && suppress.current) { suppress.current = false; return; } if (active) onEdit?.(marker); else navigate(entry.key); }}>
    <span className="cg-marker-orientation">
    {active && raised && <span className="cg-marker-hover-target" aria-hidden="true"><span/></span>}
    <MarkerArtwork key={active ? current.key : 'rest'} marker={marker}>
    <button className="cg-marker-handle" disabled={busy} title={`${label}. Drag onto a page to move this marker.`}
      aria-label={`${active ? 'Edit marker' : 'Open marked page'}: ${label}`} aria-current={active ? 'page' : undefined}
      onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.stopPropagation(); event.preventDefault();
        const side = event.altKey ? event.key === 'ArrowLeft' ? 'left' : 'right' : marker.side;
        const entryKey = event.altKey ? current.key : marker.entryKey;
        const x = event.altKey ? marker.x : marker.x + (event.key === 'ArrowLeft' ? -2 : 2);
        try { onChange(garden => movePageMarker(garden, marker.slot, entryKey, side, x)); }
        catch (issue) { onIssue?.(issue.message); }
      }}/>
    </MarkerArtwork></span>
  </div>;
  return <>{active && book ? createPortal(content, book) : content}
    {draft && book && createPortal(<div className="cg-personal-bookmark is-drag-preview" aria-hidden="true"
      style={{ ...markerWritingStyle(marker.styleId), left: draft.left, top: draft.top }}>
      <MarkerArtwork marker={marker}/></div>, book)}
  </>;
}

export function PersonalBookmarks({ journal, ledger, current, busy, reduced = false, navigate, movingMarkers = [], onChange, onEdit, onIssue }) {
  const positions = layoutPageMarkers(journal.bookmarks, current);
  return <nav className="cg-personal-bookmarks" aria-label="Marked pages">{journal.bookmarks.map(marker =>
    <PageMarker key={marker.slot} marker={marker} ledger={ledger} current={current} busy={busy} reduced={reduced} navigate={navigate}
      displayX={positions.get(marker.slot)} travelling={movingMarkers.some(item => item.slot === marker.slot)} onChange={onChange} onEdit={onEdit} onIssue={onIssue}/>)}</nav>;
}

export function TurningPersonalMarkers({ markers, turn }) {
  const from = BOOK_ENTRIES[turn.from];
  return <div className="cg-turn-personal-markers" aria-hidden="true">{markers.map(marker => {
    const left = markerIsLeft(marker, from), x = marker.displayX ?? markerDisplayX(marker, left);
    return <div key={marker.slot} className={`cg-turn-personal-marker edge-${marker.edge} ${left ? 'left' : 'right'}`} data-turning-marker={marker.slot}
      style={{ ...markerWritingStyle(marker.styleId), '--marker-tilt': `${markerTilt(marker.slot)}deg`, '--marker-x': x / 100, '--marker-outer-left': Number(markerIsLeft(marker, from)) }}><div className="cg-turn-marker-front"><span className="cg-marker-orientation"><MarkerArtwork marker={marker}/></span></div>
      <div className="cg-turn-marker-back"><span className="cg-marker-orientation"><MarkerArtwork marker={marker}/></span></div></div>;
  })}</div>;
}
