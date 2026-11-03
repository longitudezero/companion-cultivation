import React, { useEffect, useRef, useState } from 'react';
import { NOTE_PAPERS, PAGE_MARKERS } from '../core/stationery.js';
import { stationeryArt } from './stationery-art.js';
import { createJournal, noteKey, pageNotes, writeNote, positionNote, removeNote, markPage, removePageMarker, NOTE_LIMIT, MARKER_LIMIT } from '../core/journal.js';
import { BOOK_ENTRIES, entryName } from './book.js';
import { noteDrop } from './stationery-model.js';
export { PersonalBookmarks } from './PageMarkers.jsx';

export const paperStyle = paper => ({ '--paper-ratio': paper.width / paper.height,
  '--text-inset': paper.inset.map(value => `${value}%`).join(' ') });

export function Paper({ paper, text, children, className = '' }) {
  return <div className={`cg-note-paper ${className}`} style={paperStyle(paper)}>
    <img src={stationeryArt(paper.file)} alt="" draggable="false"/>
    {text && <div className="cg-paper-writing">{text}</div>}{children}
  </div>;
}

export function GrimoireNote({ note, entry, onChange, onEdit, onFront, zIndex = 1, dockIndex = 0 }) {
  const area = useRef(null), paper = useRef(null), gesture = useRef(null), suppressClick = useRef(false);
  const [draft, setDraft] = useState(null);
  const value = note, side = note.side, style = NOTE_PAPERS[note.paperId], number = note.id.slice(5);
  const latest = useRef(note); latest.current = note;
  const previousTucked = useRef(note.tucked);
  useEffect(() => {
    const changed = previousTucked.current !== note.tucked;
    previousTucked.current = note.tucked;
    if (!changed || !note.tucked) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => paper.current?.scrollIntoView?.({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' }), reduced ? 0 : 450);
    return () => window.clearTimeout(timer);
  }, [note.tucked]);
  useEffect(() => () => { gesture.current = null; }, []);
  function save(next) { onChange(garden => positionNote(garden, note.id, next)); }
  function start(event) {
    if (event.button !== 0) return;
    event.stopPropagation();
    onFront?.(note.id);
    const parent = paper.current.closest('.cg-book').getBoundingClientRect(), rect = paper.current.getBoundingClientRect();
    gesture.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, dragged: false,
      offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, parent,
      width: rect.width, height: rect.height, initial: latest.current };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function move(event) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    if (!drag.dragged && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) <= 5) return;
    drag.dragged = true;
    const left = event.clientX - drag.parent.left - drag.offsetX, top = event.clientY - drag.parent.top - drag.offsetY;
    drag.next = { ...noteDrop(drag.parent, drag.width, drag.height, left, top), entryKey: entry.key };
    setDraft({ left, top });
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    gesture.current = null;
    suppressClick.current = drag.dragged || cancelled;
    if (!cancelled && drag.dragged) save(drag.next);
    setDraft(null);
    onFront?.(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function tapeClick(event) {
    event.stopPropagation();
    if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return; }
    save({ ...latest.current, tucked: !latest.current.tucked });
  }
  return <div ref={area} className={`cg-note-area ${draft ? 'cg-note-drag-area' : side}`}>
    <div ref={paper} data-note-page={noteKey(entry.key, side)} data-note-id={note.id}
      className={`cg-loose-note${value.tucked ? ' is-tucked' : ''}${draft ? ' is-dragging' : ''}`}
      style={{ ...paperStyle(style), '--note-x': value.x / 100, '--note-y': value.y / 100,
        '--note-z': zIndex, '--dock-index': dockIndex % 5, ...(draft ? { left: draft.left, top: draft.top } : {}) }}>
      <Paper paper={style}>
        <button className="cg-note-tape" aria-label={`${note.tucked ? 'Return' : 'Tuck away'} note ${number} on ${side} page`}
          aria-pressed={note.tucked} title="Click to tuck or restore. Drag across pages to move. Alt + left/right moves between pages."
          onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)}
          onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)} onClick={tapeClick}
          onKeyDown={event => {
            const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
            if (!direction) return;
            event.preventDefault(); event.stopPropagation();
            if (event.altKey && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
              save({ ...latest.current, tucked: false, side: event.key === 'ArrowLeft' ? 'left' : 'right' }); return;
            }
            const amount = event.shiftKey ? 10 : 2;
            save({ ...latest.current, tucked: false, x: latest.current.x + direction[0] * amount,
              y: latest.current.y + direction[1] * amount });
          }}><span className="cg-sr-only">Click to tuck or restore; drag across the spine or use Alt + left/right to change pages.</span></button>
        <button className="cg-paper-writing cg-edit-note" aria-label={`Edit note ${number} on ${side} page`} onClick={onEdit}>{note.text}</button>
      </Paper>
    </div>
  </div>;
}

function StylePicker({ ids, catalogue, value, onChange, label }) {
  return <div className="cg-stationery-picker" role="group" aria-label={label}>{ids.map(id => <button key={id}
    type="button" aria-label={catalogue[id].name} aria-pressed={value === id} onClick={() => onChange(id)}>
    <img src={stationeryArt(catalogue[id].file)} alt="" draggable="false"/><span>{catalogue[id].name}</span>
  </button>)}</div>;
}

function NoteEditor({ journal, entry, side, noteId, onChange, onClose, onShop }) {
  const note = journal.notes[noteId];
  const [text, setText] = useState(note?.text || ''), [paperId, setPaperId] = useState(note?.paperId || journal.papers[0] || '');
  const [error, setError] = useState(''), [removing, setRemoving] = useState(false);
  function apply(fn) { try { if (onChange(fn) !== false) onClose(); } catch (issue) { setError(issue.message); } }
  return <>
    {journal.papers.length ? <form onSubmit={event => { event.preventDefault(); apply(garden => writeNote(garden, entry.key, side, text, paperId, noteId)); }}>
      <div className="cg-note-composer">
        <div className="cg-note-fields"><label htmlFor="cg-note-text">Your field note</label>
          <textarea id="cg-note-text" value={text} maxLength={NOTE_LIMIT} rows={6} placeholder="What have you discovered?"
            onChange={event => { setText(event.target.value); setError(''); }}/>
          <span className="cg-note-count">{text.length}/{NOTE_LIMIT}</span>
          <p className="cg-desk-hint">Add as many notes as you like. Click the tape to tuck one away, or drag it across the spine to the other page.</p>
        </div>
        <Paper paper={NOTE_PAPERS[paperId]} text={text || 'Your observations go here…'} className="cg-note-preview"/>
      </div>
      <h3>Choose your paper</h3>
      <StylePicker ids={journal.papers} catalogue={NOTE_PAPERS} value={paperId} onChange={setPaperId} label="Owned note papers"/>
      <p className="cg-desk-error" role="alert">{error}</p>
      <div className="cg-desk-actions"><button className="cg-desk-primary" type="submit" disabled={!text.trim()}>{note ? 'Save note' : 'Place note'}</button>
        {note && <button type="button" onClick={() => setRemoving(value => !value)}>Remove note</button>}
        {note && <button type="button" onClick={() => apply(garden => positionNote(garden, note.id, { ...note, tucked: !note.tucked }))}>{note.tucked ? 'Return to page' : 'Tuck note away'}</button>}
        <button type="button" onClick={onShop}>Browse papers in Shop</button></div>
      {removing && <div className="cg-note-remove"><p>Remove this note from the page?</p>
        <button type="button" onClick={() => apply(garden => removeNote(garden, note.id))}>Confirm removal</button>
        <button type="button" onClick={() => setRemoving(false)}>Keep note</button></div>}
    </form> : <div className="cg-stationery-empty"><img src={stationeryArt('inkwell.webp')} alt=""/>
      <h3>A place for your observations</h3><p>Choose your first paper in the Shop. Each style costs 5 Gold and can be reused for all your notes.</p>
      <button className="cg-desk-primary" onClick={onShop}>Browse note papers</button></div>}
  </>;
}

function MarkerEditor({ journal, entry, side, ledger, onChange, onShop }) {
  const existing = journal.bookmarks.find(marker => marker.entryKey === entry.key && marker.side === side);
  const [styleId, setStyleId] = useState(existing?.styleId || journal.markers[0] || '');
  const [slot, setSlot] = useState(existing?.slot ?? ''), [error, setError] = useState(''), [status, setStatus] = useState('');
  function apply(fn, message) { try { if (onChange(fn) !== false) { setStatus(message); setError(''); } } catch (issue) { setError(issue.message); } }
  return <>
    {journal.markers.length ? <>
      <p className="cg-desk-hint">Keep up to four pages close at hand. Click a marker above the book to return to its page.</p>
      <StylePicker ids={journal.markers} catalogue={PAGE_MARKERS} value={styleId} onChange={setStyleId} label="Owned page markers"/>
      <label className="cg-marker-slot">Marker to place<select aria-label="Marker to place" value={slot}
        onChange={event => { setSlot(event.target.value === '' ? '' : Number(event.target.value)); setError(''); setStatus(''); }}>
        <option value="">New marker ({MARKER_LIMIT - journal.bookmarks.length} available)</option>
        {journal.bookmarks.map(marker => { const destination = BOOK_ENTRIES.find(item => item.key === marker.entryKey);
          return <option key={marker.slot} value={marker.slot}>Move marker {marker.slot + 1} · {entryName(destination, ledger)} · p. {destination.page + Number(marker.side === 'right')}</option>;
        })}</select></label>
      <div className="cg-desk-actions"><button className="cg-desk-primary" onClick={() => apply(garden => markPage(garden, entry.key, side, styleId, slot === '' ? null : slot), 'Page marked. You can find it above the book.')}>Mark this page</button>
        <button onClick={onShop}>Browse markers in Shop</button></div>
      <p className="cg-desk-error" role="alert">{error}</p><p className="cg-desk-status" role="status">{status}</p>
    </> : <div className="cg-stationery-empty"><h3>Keep a favourite page close</h3>
      <p>Page marker styles cost 10 Gold in the Shop. Unlock a style once and use it for any of your four markers.</p>
      <button className="cg-desk-primary" onClick={onShop}>Browse page markers</button></div>}
    {journal.bookmarks.length > 0 && <div className="cg-marked-list"><h3>Your marked pages</h3>{journal.bookmarks.map(marker => {
      const destination = BOOK_ENTRIES.find(item => item.key === marker.entryKey);
      const label = `${entryName(destination, ledger)} · p. ${destination.page + Number(marker.side === 'right')}`;
      return <div key={marker.slot}><img src={stationeryArt(PAGE_MARKERS[marker.styleId].file)} alt=""/>
        <span>{label}</span><button aria-label={`Remove marker: ${label}`} onClick={() => {
          apply(garden => removePageMarker(garden, marker.slot), 'Marker removed. Its style stays in your collection.');
          if (slot === marker.slot) setSlot('');
        }}>Remove</button></div>;
    })}</div>}
  </>;
}

export function StationeryDesk({ garden, entry, ledger, initialTab = 'notes', initialSide = 'right', initialNoteId = null, onChange, onClose, onShop }) {
  const journal = garden.journal || createJournal(), close = useRef(null);
  const [tab, setTab] = useState(initialTab), [side, setSide] = useState(initialSide);
  const [noteId, setNoteId] = useState(initialNoteId);
  useEffect(() => { const previous = document.activeElement; close.current?.focus();
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); }; }, []);
  return <div className="cg-stationery-backdrop"><section className="cg-stationery-desk" role="dialog" aria-modal="true" aria-labelledby="cg-stationery-title">
    <header><div><span className="cg-eyebrow">Your personal Grimoire</span><h2 id="cg-stationery-title">Notes & page markers</h2></div>
      <button ref={close} aria-label="Close stationery" onClick={onClose}>×</button></header>
    <p className="cg-desk-entry">{entryName(entry, ledger)}</p>
    <div className="cg-stationery-tabs" role="tablist" aria-label="Stationery tools">
      <button role="tab" aria-selected={tab === 'notes'} onClick={() => setTab('notes')}>Field notes</button>
      <button role="tab" aria-selected={tab === 'markers'} onClick={() => setTab('markers')}>Page markers</button></div>
    <label className="cg-page-choice">Page<select aria-label="Stationery page" value={side} onChange={event => { setSide(event.target.value); setNoteId(null); }}>
      <option value="left">Left page · {entry.page}</option><option value="right">Right page · {entry.page + 1}</option></select></label>
    {tab === 'notes' && <label className="cg-page-choice">Note<select aria-label="Note to edit" value={noteId || ''} onChange={event => setNoteId(event.target.value || null)}>
      <option value="">New note</option>{pageNotes(journal, entry.key, side).map(note => <option key={note.id} value={note.id}>
        Note {note.id.slice(5)}{note.tucked ? ' (tucked)' : ''} · {note.text.slice(0, 45)}</option>)}
    </select></label>}
    {tab === 'notes' ? <NoteEditor key={`${entry.key}/${side}/${noteId}`} journal={journal} entry={entry} side={side} noteId={noteId}
      onChange={onChange} onClose={onClose} onShop={() => onShop('papers')}/>
      : <MarkerEditor key={`${entry.key}/${side}`} journal={journal} entry={entry} side={side} ledger={ledger}
        onChange={onChange} onShop={() => onShop('bookmarks')}/>}
  </section></div>;
}
