import React, { useEffect, useRef, useState } from 'react';
import { NOTE_PAPERS, PAGE_MARKERS } from '../core/stationery.js';
import { stationeryArt } from './stationery-art.js';
import { createJournal, normalizeJournal, pageNotes, writeNote, removeNote, markPage, removePageMarker, NOTE_LIMIT, MARKER_LIMIT, MARKER_NAME_LIMIT, MARKER_DESCRIPTION_LIMIT } from '../core/journal.js';
import { BOOK_ENTRIES, entryName } from './book.js';
import { Paper } from './NotePaper.jsx';
import { MarkerPreview } from './PageMarkers.jsx';
export { Paper, paperStyle } from './NotePaper.jsx';
export { GrimoireNote, StaticPageNotes, NoteDeleteDialog } from './GrimoireNotes.jsx';
export { PersonalBookmarks } from './PageMarkers.jsx';

function StylePicker({ ids, catalogue, value, onChange, label }) {
  return <div className="cg-stationery-picker" role="group" aria-label={label}>{ids.map(id => <button key={id}
    type="button" aria-label={catalogue[id].name} aria-pressed={value === id} onClick={() => onChange(id)}>
    <img src={stationeryArt(catalogue[id].file)} alt="" draggable="false"/><span>{catalogue[id].name}</span>
  </button>)}</div>;
}

function NoteEditor({ journal, entry, side, noteId, onChange, onClose, onShop, onToggleTuck }) {
  const note = journal.notes[noteId];
  const [text, setText] = useState(note?.text || ''), [paperId, setPaperId] = useState(note?.paperId || journal.papers[0] || '');
  const [rotation, setRotation] = useState(note?.rotation ?? -2), [scale, setScale] = useState(note?.scale ?? 1);
  const [error, setError] = useState(''), [removing, setRemoving] = useState(false);
  function apply(fn) { try { if (onChange(fn) !== false) onClose(); } catch (issue) { setError(issue.message); } }
  return <>
    {journal.papers.length ? <form onSubmit={event => { event.preventDefault(); apply(garden => writeNote(garden, entry.key, side, text, paperId, noteId, { rotation, scale })); }}>
      <div className="cg-note-composer">
        <div className="cg-note-fields"><label htmlFor="cg-note-text">Your field note</label>
          <textarea id="cg-note-text" value={text} maxLength={NOTE_LIMIT} rows={6} placeholder="What have you discovered?"
            onChange={event => { setText(event.target.value); setError(''); }}/>
          <span className="cg-note-count">{text.length}/{NOTE_LIMIT}</span>
          <p className="cg-desk-hint">Add as many notes as you like. Click the tape to tuck one away, or drag it across the spine to the other page.</p>
        </div>
        <div className="cg-note-preview-stage"><div style={{ width: Math.min(260 * scale, 300), maxWidth: '100%', transform: `rotate(${rotation}deg)` }}>
          <Paper paper={NOTE_PAPERS[paperId]} text={text || 'Your observations go here…'} className="cg-note-preview"/></div></div>
      </div>
      <div className="cg-note-appearance"><label>Rotation <input aria-label="Note rotation" type="range" min="-180" max="180" value={rotation} onChange={event => setRotation(Number(event.target.value))}/><output>{rotation}°</output></label>
        <label>Paper size <input aria-label="Note size" type="range" min="55" max="160" step="5" value={Math.round(scale * 100)} onChange={event => setScale(Number(event.target.value) / 100)}/><output>{Math.round(scale * 100)}%</output></label></div>
      <h3>Choose your paper</h3>
      <StylePicker ids={journal.papers} catalogue={NOTE_PAPERS} value={paperId} onChange={setPaperId} label="Owned note papers"/>
      <p className="cg-desk-error" role="alert">{error}</p>
      <div className="cg-desk-actions"><button className="cg-desk-primary" type="submit" disabled={!text.trim()}>{note ? 'Save note' : 'Place note'}</button>
        {note && <button type="button" onClick={() => setRemoving(value => !value)}>Remove note</button>}
        {note && <button type="button" onClick={() => { onToggleTuck?.(note.id); onClose(); }}>{note.tucked ? 'Return to page' : 'Tuck note away'}</button>}
        <button type="button" onClick={onShop}>Browse papers in Shop</button></div>
      {removing && <div className="cg-note-remove"><p>Remove this note from the page?</p>
        <button type="button" onClick={() => apply(garden => removeNote(garden, note.id))}>Confirm removal</button>
        <button type="button" onClick={() => setRemoving(false)}>Keep note</button></div>}
    </form> : <div className="cg-stationery-empty"><img src={stationeryArt('inkwell.webp')} alt=""/>
      <h3>A place for your observations</h3><p>Choose your first paper in the Shop. Each style costs 5 Gold and can be reused for all your notes.</p>
      <button className="cg-desk-primary" onClick={onShop}>Browse note papers</button></div>}
  </>;
}

function MarkerEditor({ journal, entry, side, ledger, initialMarkerSlot, initialDrop, onChange, onClose, onShop }) {
  const existing = journal.bookmarks.find(marker => marker.slot === initialMarkerSlot);
  const [slot, setSlot] = useState(existing?.slot ?? '');
  const [styleId, setStyleId] = useState(existing?.styleId || journal.markers[0] || '');
  const [name, setName] = useState(existing?.name || ''), [description, setDescription] = useState(existing?.description || '');
  const [edge, setEdge] = useState(initialDrop?.edge || existing?.edge || (journal.bookmarks.filter(m => m.edge === 'top').length < 6 ? 'top' : 'bottom'));
  const freePosition = (atEdge, except) => Array.from({ length: 6 }, (_, i) => i).find(i => !journal.bookmarks.some(m => m.slot !== except && m.edge === atEdge && m.position === i));
  const [position, setPosition] = useState(initialDrop?.position ?? (initialDrop?.x != null ? Math.round(initialDrop.x / 20) : existing?.position) ?? freePosition(edge, existing?.slot) ?? 0);
  const [error, setError] = useState(''), [status, setStatus] = useState('');
  const selected = journal.bookmarks.find(marker => marker.slot === slot);
  function chooseSlot(value) {
    const next = value === '' ? '' : Number(value), marker = journal.bookmarks.find(item => item.slot === next);
    setSlot(next); setName(marker?.name || ''); setDescription(marker?.description || '');
    setStyleId(marker?.styleId || journal.markers[0]); const nextEdge = initialDrop?.edge || marker?.edge || 'top'; setEdge(nextEdge);
    setPosition(initialDrop?.position ?? marker?.position ?? freePosition(nextEdge, next) ?? 0); setError('');
  }
  function save(event) {
    event.preventDefault();
    try {
      if (onChange(garden => markPage(garden, entry.key, 'right', styleId, slot === '' ? null : slot,
        { name, description, edge, position })) !== false) onClose();
    } catch (issue) { setError(issue.message); }
  }
  return <>
    {journal.markers.length ? <form onSubmit={save}>
      <p className="cg-desk-hint">Choose one of twelve fixed positions, counted from the spine. Each position stays reserved even when its marker is on the left. Several markers can mark this spread.</p>
      <label className="cg-marker-slot">Marker<select aria-label="Marker to place" value={slot} onChange={event => chooseSlot(event.target.value)}>
        <option value="">New marker ({MARKER_LIMIT - journal.bookmarks.length} available)</option>
        {journal.bookmarks.map(marker => { const destination = BOOK_ENTRIES.find(item => item.key === marker.entryKey);
          return <option key={marker.slot} value={marker.slot}>{marker.name || `Marker ${marker.slot + 1}`} · {entryName(destination, ledger)} · p. {destination.page + Number(marker.side === 'right')}</option>;
        })}</select></label>
      <div className="cg-marker-composer"><div className="cg-marker-fields">
        <label htmlFor="cg-marker-name">Marker name <span>(optional)</span></label>
        <input id="cg-marker-name" aria-label="Marker name" maxLength={MARKER_NAME_LIMIT} value={name} placeholder="A favourite experiment" onChange={event => setName(event.target.value)}/>
        <label htmlFor="cg-marker-description">Write on the marker <span>(optional)</span></label>
        <textarea id="cg-marker-description" aria-label="Marker description" maxLength={MARKER_DESCRIPTION_LIMIT} value={description} rows={5} placeholder="Notes to keep on this page…" onChange={event => setDescription(event.target.value)}/>
        <span className="cg-note-count">{description.length}/{MARKER_DESCRIPTION_LIMIT}</span>
        <label className="cg-marker-slot">Book edge<select aria-label="Marker edge" value={edge} onChange={event => { const value = event.target.value; setEdge(value); setPosition(freePosition(value, slot) ?? 0); setError(''); }}>
          <option value="top">Top ({journal.bookmarks.filter(m => m.edge === 'top').length}/6)</option>
          <option value="bottom">Bottom ({journal.bookmarks.filter(m => m.edge === 'bottom').length}/6)</option></select></label>
        <label className="cg-marker-slot">Position from spine<select aria-label="Marker position" value={position} onChange={event => { setPosition(Number(event.target.value)); setError(''); }}>
          {Array.from({ length: 6 }, (_, index) => { const occupied = journal.bookmarks.some(m => m.slot !== slot && m.edge === edge && m.position === index);
            return <option key={index} value={index} disabled={occupied}>{index + 1}{occupied ? ' · Reserved' : ''}</option>; })}</select></label>
      </div><MarkerPreview marker={{ styleId, name, description }}/></div>
      <h3>Choose your marker</h3><StylePicker ids={journal.markers} catalogue={PAGE_MARKERS} value={styleId} onChange={setStyleId} label="Owned page markers"/>
      <p className="cg-desk-error" role="alert">{error}</p>
      <div className="cg-desk-actions"><button type="submit" className="cg-desk-primary">{selected ? selected.entryKey === entry.key && selected.side === side ? 'Save marker' : 'Move marker here' : 'Mark this spread'}</button>
        <button type="button" onClick={onShop}>Browse markers in Shop</button></div>
    </form> : <div className="cg-stationery-empty"><h3>Keep a favourite page close</h3>
      <p>Page marker styles cost 10 Gold. Unlock a style once and reuse it for any of your twelve markers.</p>
      <button className="cg-desk-primary" onClick={onShop}>Browse page markers</button></div>}
    <p className="cg-desk-status" role="status">{status}</p>
    {journal.bookmarks.length > 0 && <div className="cg-marked-list"><h3>Your marked pages</h3>{journal.bookmarks.map(marker => {
      const destination = BOOK_ENTRIES.find(item => item.key === marker.entryKey);
      const label = `${marker.name ? marker.name + ' · ' : ''}${entryName(destination, ledger)} · p. ${destination.page + Number(marker.side === 'right')}`;
      return <div key={marker.slot}><img src={stationeryArt(PAGE_MARKERS[marker.styleId].file)} alt=""/>
        <span>{label}</span><button type="button" aria-label={`Remove marker: ${label}`} onClick={() => {
          onChange(garden => removePageMarker(garden, marker.slot)); setStatus('Marker removed. Its style stays in your collection.');
          if (slot === marker.slot) chooseSlot('');
        }}>Remove</button></div>;
    })}</div>}
  </>;
}

export function StationeryDesk({ garden, entry, ledger, initialTab = 'notes', initialSide = 'right', initialNoteId = null, initialMarkerSlot = null, initialDrop = null, onChange, onClose, onShop, tuckedNotes = new Set(), onToggleTuck }) {
  const savedJournal = garden.journal?.version === 4 ? garden.journal : normalizeJournal(garden.journal), close = useRef(null);
  const journal = { ...savedJournal, notes: Object.fromEntries(Object.entries(savedJournal.notes).map(([id, note]) => [id, { ...note, tucked: tuckedNotes.has(id) }])) };
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
    {tab === 'notes' && <label className="cg-page-choice">Page<select aria-label="Stationery page" value={side} onChange={event => { setSide(event.target.value); setNoteId(null); }}>
      <option value="left">Left page · {entry.page}</option><option value="right">Right page · {entry.page + 1}</option></select></label>}
    {tab === 'notes' && <label className="cg-page-choice">Note<select aria-label="Note to edit" value={noteId || ''} onChange={event => setNoteId(event.target.value || null)}>
      <option value="">New note</option>{pageNotes(journal, entry.key, side).map(note => <option key={note.id} value={note.id}>
        Note {note.id.slice(5)}{note.tucked ? ' (tucked)' : ''} · {note.text.slice(0, 45)}</option>)}
    </select></label>}
    {tab === 'notes' ? <NoteEditor key={`${entry.key}/${side}/${noteId}`} journal={journal} entry={entry} side={side} noteId={noteId}
      onChange={onChange} onClose={onClose} onShop={() => onShop('papers')} onToggleTuck={onToggleTuck}/>
      : <MarkerEditor key={`${entry.key}/${side}`} journal={journal} entry={entry} side={side} ledger={ledger} initialMarkerSlot={initialMarkerSlot} initialDrop={initialDrop}
        onChange={onChange} onClose={onClose} onShop={() => onShop('bookmarks')}/>}
  </section></div>;
}
