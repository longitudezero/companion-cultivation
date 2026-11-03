import React, { useEffect, useRef, useState } from 'react';
import { NOTE_PAPERS } from '../core/stationery.js';
import { noteKey, pageNotes, positionNote, noteRotation, NOTE_MIN_SCALE, NOTE_MAX_SCALE } from '../core/journal.js';
import { noteDrop, noteGeometry } from './stationery-model.js';
import { Paper } from './NotePaper.jsx';
import { useBookCoordinates } from './BookView.jsx';
import { bookRectangle } from './book-view.js';

function Sheet({ note, geometry, children }) {
  return <div className="cg-note-sheet" style={{ width: geometry.width, height: geometry.height,
    left: geometry.offsetX, top: geometry.offsetY, transform: `rotate(${note.rotation ?? -2}deg)` }}>
    <Paper paper={NOTE_PAPERS[note.paperId]}>{children}</Paper></div>;
}

export function GrimoireNote({ note, entry, pageSize, onChange, onEdit, onDelete, onFront, onToggleTuck, onUntuck, zIndex = 1, dockIndex = 0 }) {
  const frame = useRef(null), gesture = useRef(null), suppressClick = useRef(false);
  const coordinates = useBookCoordinates();
  const [draft, setDraft] = useState(null), latest = useRef(note); latest.current = note;
  const value = draft?.note || note, side = value.side, number = note.id.slice(5), style = NOTE_PAPERS[note.paperId];
  const geometry = noteGeometry(value, pageSize, style.width / style.height);
  const width = pageSize?.width || 460, height = pageSize?.height || 650;
  let left = geometry.left, top = geometry.top;
  if (value.tucked && !draft) { left = (width - geometry.boxWidth) / 2 + dockIndex % 5 * 8; top = height + 23 + dockIndex % 5 * 12; }
  if (draft?.left != null) { left = draft.left; top = draft.top; }
  useEffect(() => () => { gesture.current = null; }, []);
  const save = next => { onUntuck?.(); return onChange(garden => positionNote(garden, note.id, { ...next, tucked: false })); };
  function start(event, kind) {
    if (event.button !== 0 || event.isPrimary === false || gesture.current) return;
    event.preventDefault(); event.stopPropagation(); onFront?.(note.id);
    const element = frame.current.closest('.cg-book'), book = bookRectangle(coordinates.size(element));
    const point = coordinates.point(event, element), originLeft = left + (side === 'right' ? width : 0);
    const cx = originLeft + geometry.boxWidth / 2, cy = top + geometry.boxHeight / 2;
    gesture.current = { kind, pointerId: event.pointerId, x: event.clientX, y: event.clientY, dragged: false, book,
      element, offsetX: point.x - originLeft, offsetY: point.y - top, width: geometry.boxWidth, height: geometry.boxHeight,
      cx, cy, angle: Math.atan2(point.y - cy, point.x - cx), distance: Math.max(1, Math.hypot(point.x - cx, point.y - cy)), initial: latest.current };
    suppressClick.current = false; event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    const point = coordinates.point(event, drag.element);
    if (drag.kind === 'move') {
      const left = point.x - drag.offsetX, top = point.y - drag.offsetY;
      drag.next = { ...drag.initial, ...noteDrop(drag.book, drag.width, drag.height, left, top, drag.initial.side), entryKey: entry.key };
      setDraft({ note: drag.next, left, top });
    } else {
      const next = { ...drag.initial, tucked: false };
      if (drag.kind === 'rotate') next.rotation = noteRotation(drag.initial.rotation +
        (Math.atan2(point.y - drag.cy, point.x - drag.cx) - drag.angle) * 180 / Math.PI);
      else next.scale = Math.max(NOTE_MIN_SCALE, Math.min(NOTE_MAX_SCALE, drag.initial.scale * Math.hypot(point.x - drag.cx, point.y - drag.cy) / drag.distance));
      const geometry = noteGeometry(next, pageSize, style.width / style.height);
      const position = noteDrop(drag.book, geometry.boxWidth, geometry.boxHeight,
        drag.cx - drag.book.left - geometry.boxWidth / 2, drag.cy - drag.book.top - geometry.boxHeight / 2, drag.initial.side);
      drag.next = { ...next, ...position };
      setDraft({ note: drag.next });
    }
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation(); gesture.current = null; suppressClick.current = drag.dragged || cancelled;
    if (!cancelled && drag.dragged) save(drag.next);
    setDraft(null); onFront?.(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  const pointer = kind => ({ onPointerDown: event => start(event, kind), onPointerMove: move,
    onPointerUp: event => finish(event), onPointerCancel: event => finish(event, true), onLostPointerCapture: event => finish(event, true) });
  return <div className={`cg-note-area ${draft?.left != null ? 'cg-note-drag-area' : side}`}>
    <div ref={frame} className={`cg-loose-note${note.tucked ? ' is-tucked' : ''}${draft ? ' is-dragging' : ''}`}
      data-note-page={noteKey(entry.key, note.side)} data-note-id={note.id}
      style={{ width: geometry.boxWidth, height: geometry.boxHeight, left, top, '--note-z': zIndex }}>
      <Sheet note={value} geometry={geometry}>
        <button className="cg-note-tape" aria-label={`${note.tucked ? 'Return' : 'Tuck away'} note ${number} on ${note.side} page`}
          aria-pressed={note.tucked} title="Click to tuck or restore. Drag to move between pages." {...pointer('move')}
          onClick={event => { event.stopPropagation(); if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return; } onToggleTuck?.(); }}
          onKeyDown={event => {
            const vector = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
            if (!vector) return; event.preventDefault(); event.stopPropagation();
            const centered = note.overhang ? note : { ...note, overhang: true,
              x: (geometry.left + geometry.boxWidth / 2) / width * 100,
              y: (geometry.top + geometry.boxHeight / 2) / height * 100 };
            if (event.altKey && vector[0]) save({ ...centered, tucked: false, side: vector[0] < 0 ? 'left' : 'right' });
            else save({ ...centered, tucked: false, x: centered.x + vector[0] * (event.shiftKey ? 10 : 2), y: centered.y + vector[1] * (event.shiftKey ? 10 : 2) });
          }}/>
        <button className="cg-paper-writing cg-edit-note" aria-label={`Edit note ${number} on ${note.side} page`} onClick={onEdit}>{note.text}</button>
        <button className="cg-note-delete" aria-label={`Remove note ${number}`} title="Remove note" onClick={event => { event.stopPropagation(); onDelete(note.id); }}>×</button>
        <button className="cg-note-rotate" aria-label={`Rotate note ${number}`} title="Drag to rotate; arrow keys also work" {...pointer('rotate')}
          onClick={event => event.stopPropagation()} onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return; event.preventDefault(); event.stopPropagation();
            save({ ...note, rotation: note.rotation + (event.key === 'ArrowLeft' ? -1 : 1) * (event.shiftKey ? 15 : 5) });
          }}>↶</button>
        <button className="cg-note-resize" aria-label={`Resize note ${number}`} title="Drag to resize; arrow keys also work" {...pointer('resize')}
          onClick={event => event.stopPropagation()} onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return; event.preventDefault(); event.stopPropagation();
            save({ ...note, scale: note.scale + (['ArrowRight', 'ArrowUp'].includes(event.key) ? .05 : -.05) });
          }}>↘</button>
      </Sheet>
    </div>
  </div>;
}

export function StaticPageNotes({ journal, entryKey, side, pageSize }) {
  return <div className="cg-printed-notes" aria-hidden="true">{pageNotes(journal, entryKey, side).map(note => {
    const paper = NOTE_PAPERS[note.paperId], geometry = noteGeometry(note, pageSize, paper.width / paper.height);
    return <div key={note.id} data-turning-note={note.id} className="cg-printed-note" style={{ width: geometry.boxWidth, height: geometry.boxHeight, left: geometry.left, top: geometry.top }}>
      <Sheet note={note} geometry={geometry}><div className="cg-paper-writing">{note.text}</div></Sheet></div>;
  })}</div>;
}

export function NoteDeleteDialog({ note, onCancel, onConfirm }) {
  const keep = useRef(null);
  useEffect(() => { const previous = document.activeElement; keep.current?.focus({ preventScroll: true });
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); else document.querySelector('.cg-inkwell')?.focus({ preventScroll: true }); }; }, []);
  return <div className="cg-note-confirm-backdrop"><section className="cg-note-confirm" role="alertdialog" aria-modal="true" aria-labelledby="cg-note-confirm-title">
    <h2 id="cg-note-confirm-title">Remove this note?</h2><p className="cg-confirm-note-text">{note.text}</p>
    <div className="cg-desk-actions"><button ref={keep} onClick={onCancel}>Keep note</button><button className="cg-note-confirm-delete" onClick={onConfirm}>Remove note</button></div>
  </section></div>;
}
