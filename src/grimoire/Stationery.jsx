import React, { useEffect, useRef, useState } from 'react';
import { NOTE_PAPERS, PAGE_MARKERS } from '../core/stationery.js';
import { stationeryArt } from './stationery-art.js';
import { createJournal, noteKey, writeNote, positionNote, removeNote, markPage, removePageMarker, NOTE_LIMIT, MARKER_LIMIT } from '../core/journal.js';
import { BOOK_ENTRIES, entryName } from './book.js';

export const paperStyle = paper => ({ '--paper-ratio': paper.width / paper.height,
  '--text-inset': paper.inset.map(value => `${value}%`).join(' ') });

export function Paper({ paper, text, children, className = '' }) {
  return <div className={`cg-note-paper ${className}`} style={paperStyle(paper)}>
    <img src={stationeryArt(paper.file)} alt="" draggable="false"/>
    {text && <div className="cg-paper-writing">{text}</div>}{children}
  </div>;
}

export function GrimoireNote({ note, side, entry, onChange, onEdit }) {
  const area = useRef(null), paper = useRef(null), gesture = useRef(null), suppressClick = useRef(false);
  const [draft, setDraft] = useState(null);
  const value = draft || note, style = NOTE_PAPERS[note.paperId];
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
  function save(next) { onChange(garden => positionNote(garden, entry.key, side, next)); }
  function start(event) {
    if (event.button !== 0) return;
    event.stopPropagation();
    const parent = area.current.getBoundingClientRect(), rect = paper.current.getBoundingClientRect();
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
    const fraction = (position, available) => available > 0 ? Math.max(0, Math.min(100, position / available * 100)) : 50;
    drag.next = { ...drag.initial, tucked: false,
      x: fraction(event.clientX - drag.parent.left - drag.offsetX, drag.parent.width - drag.width),
      y: fraction(event.clientY - drag.parent.top - drag.offsetY, drag.parent.height - drag.height) };
    setDraft(drag.next);
  }
  function finish(event, cancelled = false) {
    const drag = gesture.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.stopPropagation();
    gesture.current = null;
    suppressClick.current = drag.dragged || cancelled;
    if (!cancelled && drag.dragged) save(drag.next);
    setDraft(null);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function tapeClick(event) {
    event.stopPropagation();
    if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return; }
    save({ ...latest.current, tucked: !latest.current.tucked });
  }
  return <div ref={area} className={`cg-note-area ${side}`}>
    <div ref={paper} data-note-page={noteKey(entry.key, side)}
      className={`cg-loose-note${value.tucked ? ' is-tucked' : ''}${draft ? ' is-dragging' : ''}`}
      style={{ ...paperStyle(style), '--note-x': value.x / 100, '--note-y': value.y / 100 }}>
      <Paper paper={style}>
        <button className="cg-note-tape" aria-label={`${note.tucked ? 'Return' : 'Tuck away'} ${side} page note`}
          aria-pressed={note.tucked} title="Click to tuck or restore. Drag to move. Arrow keys move the note."
          onPointerDown={start} onPointerMove={move} onPointerUp={event => finish(event)}
          onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)} onClick={tapeClick}
          onKeyDown={event => {
            const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
            if (!direction) return;
            event.preventDefault(); event.stopPropagation();
            const amount = event.shiftKey ? 10 : 2;
            save({ ...latest.current, tucked: false, x: latest.current.x + direction[0] * amount,
              y: latest.current.y + direction[1] * amount });
          }}><span className="cg-sr-only">Click to tuck or restore; drag or use arrow keys to move.</span></button>
        <button className="cg-paper-writing cg-edit-note" aria-label={`Edit ${side} page note`} onClick={onEdit}>{note.text}</button>
      </Paper>
    </div>
  </div>;
}

export function PersonalBookmarks({ journal, ledger, current, busy, navigate }) {
  return <nav className="cg-personal-bookmarks" aria-label="Marked pages">{journal.bookmarks.map(marker => {
    const entry = BOOK_ENTRIES.find(item => item.key === marker.entryKey);
    const label = `${entryName(entry, ledger)} · page ${entry.page + Number(marker.side === 'right')}`;
    return <button key={marker.slot} type="button" className="cg-personal-bookmark" disabled={busy}
      style={{ '--marker-slot': marker.slot }} title={label} aria-label={`Open marked page: ${label}`}
      aria-current={current.key === marker.entryKey ? 'page' : undefined} onClick={() => navigate(entry.key)}>
      <img src={stationeryArt(PAGE_MARKERS[marker.styleId].file)} alt="" draggable="false"/>
      <span className="cg-marker-page">{entry.page + Number(marker.side === 'right')}</span>
    </button>;
  })}</nav>;
}

function StylePicker({ ids, catalogue, value, onChange, label }) {
  return <div className="cg-stationery-picker" role="group" aria-label={label}>{ids.map(id => <button key={id}
    type="button" aria-label={catalogue[id].name} aria-pressed={value === id} onClick={() => onChange(id)}>
    <img src={stationeryArt(catalogue[id].file)} alt="" draggable="false"/><span>{catalogue[id].name}</span>
  </button>)}</div>;
}

function NoteEditor({ journal, entry, side, onChange, onClose, onShop }) {
  const note = journal.notes[noteKey(entry.key, side)];
  const [text, setText] = useState(note?.text || ''), [paperId, setPaperId] = useState(note?.paperId || journal.papers[0] || '');
  const [error, setError] = useState(''), [removing, setRemoving] = useState(false);
  function apply(fn) { try { if (onChange(fn) !== false) onClose(); } catch (issue) { setError(issue.message); } }
  return <>
    {journal.papers.length ? <form onSubmit={event => { event.preventDefault(); apply(garden => writeNote(garden, entry.key, side, text, paperId)); }}>
      <div className="cg-note-composer">
        <div className="cg-note-fields"><label htmlFor="cg-note-text">Your field note</label>
          <textarea id="cg-note-text" value={text} maxLength={NOTE_LIMIT} rows={6} placeholder="What have you discovered?"
            onChange={event => { setText(event.target.value); setError(''); }}/>
          <span className="cg-note-count">{text.length}/{NOTE_LIMIT}</span>
          <p className="cg-desk-hint">Click the tape to tuck your note away. Drag the tape to place it anywhere on this page.</p>
        </div>
        <Paper paper={NOTE_PAPERS[paperId]} text={text || 'Your observations go here…'} className="cg-note-preview"/>
      </div>
      <h3>Choose your paper</h3>
      <StylePicker ids={journal.papers} catalogue={NOTE_PAPERS} value={paperId} onChange={setPaperId} label="Owned note papers"/>
      <p className="cg-desk-error" role="alert">{error}</p>
      <div className="cg-desk-actions"><button className="cg-desk-primary" type="submit" disabled={!text.trim()}>{note ? 'Save note' : 'Place note'}</button>
        {note && <button type="button" onClick={() => setRemoving(value => !value)}>Remove note</button>}
        <button type="button" onClick={onShop}>Browse papers in Shop</button></div>
      {removing && <div className="cg-note-remove"><p>Remove this note from the page?</p>
        <button type="button" onClick={() => apply(garden => removeNote(garden, entry.key, side))}>Confirm removal</button>
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

export function StationeryDesk({ garden, entry, ledger, initialTab = 'notes', initialSide = 'right', onChange, onClose, onShop }) {
  const journal = garden.journal || createJournal(), close = useRef(null);
  const [tab, setTab] = useState(initialTab), [side, setSide] = useState(initialSide);
  useEffect(() => { const previous = document.activeElement; close.current?.focus();
    return () => { if (previous?.isConnected) previous.focus({ preventScroll: true }); }; }, []);
  return <div className="cg-stationery-backdrop"><section className="cg-stationery-desk" role="dialog" aria-modal="true" aria-labelledby="cg-stationery-title">
    <header><div><span className="cg-eyebrow">Your personal Grimoire</span><h2 id="cg-stationery-title">Notes & page markers</h2></div>
      <button ref={close} aria-label="Close stationery" onClick={onClose}>×</button></header>
    <p className="cg-desk-entry">{entryName(entry, ledger)}</p>
    <div className="cg-stationery-tabs" role="tablist" aria-label="Stationery tools">
      <button role="tab" aria-selected={tab === 'notes'} onClick={() => setTab('notes')}>Field notes</button>
      <button role="tab" aria-selected={tab === 'markers'} onClick={() => setTab('markers')}>Page markers</button></div>
    <label className="cg-page-choice">Page<select aria-label="Stationery page" value={side} onChange={event => setSide(event.target.value)}>
      <option value="left">Left page · {entry.page}</option><option value="right">Right page · {entry.page + 1}</option></select></label>
    {tab === 'notes' ? <NoteEditor key={`${entry.key}/${side}`} journal={journal} entry={entry} side={side}
      onChange={onChange} onClose={onClose} onShop={() => onShop('papers')}/>
      : <MarkerEditor key={`${entry.key}/${side}`} journal={journal} entry={entry} side={side} ledger={ledger}
        onChange={onChange} onShop={() => onShop('bookmarks')}/>}
  </section></div>;
}
