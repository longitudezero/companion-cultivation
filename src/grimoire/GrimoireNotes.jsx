import React, { useEffect, useRef, useState } from 'react';
import { NOTE_PAPERS } from '../core/stationery.js';
import { noteKey, pageNotes, positionNote, noteRotation, NOTE_MIN_SCALE, NOTE_MAX_SCALE } from '../core/journal.js';
import { noteDrop, noteGeometry } from './stationery-model.js';
import { Paper } from './NotePaper.jsx';

function Sheet({ note, geometry, children }) {
  return <div className="cg-note-sheet" style={{ width: geometry.width, height: geometry.height,
    left: geometry.offsetX, top: geometry.offsetY, transform: `rotate(${note.rotation ?? -2}deg)` }}>
    <Paper paper={NOTE_PAPERS[note.paperId]}>{children}</Paper></div>;
}

export function GrimoireNote({ note, entry, pageSize, onChange, onEdit, onDelete, onFront, zIndex = 1, dockIndex = 0 }) {
  const frame = useRef(null), gesture = useRef(null), suppressClick = useRef(false);
  const [draft, setDraft] = useState(null), latest = useRef(note); latest.current = note;
  const value = draft?.note || note, side = value.side, number = note.id.slice(5), style = NOTE_PAPERS[note.paperId];
  const geometry = noteGeometry(value, pageSize, style.width / style.height);
  const width = pageSize?.width || 460, height = pageSize?.height || 650;
  let left = geometry.left, top = geometry.top;
  if (value.tucked && !draft) { left = (width - geometry.boxWidth) / 2 + dockIndex % 5 * 8; top = height + 23 + dockIndex % 5 * 12; }
  if (draft?.left != null) { left = draft.left; top = draft.top; }
  const previousTucked = useRef(note.tucked);
  useEffect(() => {
    const changed = previousTucked.current !== note.tucked; previousTucked.current = note.tucked;
    if (!changed || !note.tucked) return undefined;
    const timer = window.setTimeout(() => frame.current?.scrollIntoView?.({ block: 'nearest', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }), 450);
    return () => window.clearTimeout(timer);
  }, [note.tucked]);
  useEffect(() => () => { gesture.current = null; }, []);
  const save = next => onChange(garden => positionNote(garden, note.id, next));
  function start(event, kind) {
    if (event.button !== 0) return;
    event.preventDefault(); event.stopPropagation(); onFront?.(note.id);
    const book = frame.current.closest('.cg-book').getBoundingClientRect(), rect = frame.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    gesture.current = { kind, pointerId: event.pointerId, x: event.clientX, y: event.clientY, dragged: false, book,
      offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, width: rect.width, height: rect.height,
      cx, cy, angle: Math.atan2(event.clientY - cy, event.clientX - cx), distance: Math.max(1, Math.hypot(event.clientX - cx, event.clientY - cy)), initial: latest.current };
    suppressClick.current = false; event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    if (drag.kind === 'move') {
      const left = event.clientX - drag.book.left - drag.offsetX, top = event.clientY - drag.book.top - drag.offsetY;
      drag.next = { ...drag.initial, ...noteDrop(drag.book, drag.width, drag.height, left, top), entryKey: entry.key };
      setDraft({ note: drag.next, left, top });
    } else {
      const next = { ...drag.initial, tucked: false };
      if (drag.kind === 'rotate') next.rotation = noteRotation(drag.initial.rotation +
        (Math.atan2(event.clientY - drag.cy, event.clientX - drag.cx) - drag.angle) * 180 / Math.PI);
      else next.scale = Math.max(NOTE_MIN_SCALE, Math.min(NOTE_MAX_SCALE, drag.initial.scale * Math.hypot(event.clientX - drag.cx, event.clientY - drag.cy) / drag.distance));
      const geometry = noteGeometry(next, pageSize, style.width / style.height);
      const position = noteDrop(drag.book, geometry.boxWidth, geometry.boxHeight,
        drag.cx - drag.book.left - geometry.boxWidth / 2, drag.cy - drag.book.top - geometry.boxHeight / 2);
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
          onClick={event => { event.stopPropagation(); if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return; } save({ ...latest.current, tucked: !latest.current.tucked }); }}
          onKeyDown={event => {
            const vector = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
            if (!vector) return; event.preventDefault(); event.stopPropagation();
            if (event.altKey && vector[0]) save({ ...note, tucked: false, side: vector[0] < 0 ? 'left' : 'right' });
            else save({ ...note, tucked: false, x: note.x + vector[0] * (event.shiftKey ? 10 : 2), y: note.y + vector[1] * (event.shiftKey ? 10 : 2) });
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
  return <div className="cg-printed-notes" aria-hidden="true">{pageNotes(journal, entryKey, side).filter(note => !note.tucked).map(note => {
    const paper = NOTE_PAPERS[note.paperId], geometry = noteGeometry(note, pageSize, paper.width / paper.height);
    return <div key={note.id} data-turning-note={note.id} className="cg-printed-note" style={{ width: geometry.boxWidth, height: geometry.boxHeight, left: geometry.left, top: geometry.top }}>
      <Sheet note={note} geometry={geometry}><div className="cg-paper-writing">{note.text}</div></Sheet></div>;
  })}</div>;
}

export function NoteDeleteDialog({ note, onCancel, onConfirm }) {
  const keep = useRef(null);
  useEffect(() => { const previous = document.activeElement; keep.current?.focus();
    return () => { if (previous?.isConnected) previous.focus(); else document.querySelector('.cg-inkwell')?.focus(); }; }, []);
  return <div className="cg-note-confirm-backdrop"><section className="cg-note-confirm" role="alertdialog" aria-modal="true" aria-labelledby="cg-note-confirm-title">
    <h2 id="cg-note-confirm-title">Remove this note?</h2><p className="cg-confirm-note-text">{note.text}</p>
    <div className="cg-desk-actions"><button ref={keep} onClick={onCancel}>Keep note</button><button className="cg-note-confirm-delete" onClick={onConfirm}>Remove note</button></div>
  </section></div>;
}
