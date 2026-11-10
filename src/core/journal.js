import { PLANTS, FUNGI } from './species.js';
import { NOTE_PAPERS, PAGE_MARKERS } from './stationery.js';
import { createJournal } from './journal-state.js';
export { createJournal } from './journal-state.js';

export const NOTE_LIMIT = 250;
export const MARKER_LIMIT = 12;
export const MARKERS_PER_EDGE = 6;
export const MARKER_NAME_LIMIT = 32;
export const MARKER_DESCRIPTION_LIMIT = 250;
export const NOTE_MIN_SCALE = .55, NOTE_MAX_SCALE = 1.6;
const families = ['Ingredients', 'Flowers', 'Aquatic', 'Woodlands', 'Desert', 'Spices', 'Fungi'];
const sides = ['left', 'right'];
const own = (object, key) => Object.hasOwn(object, key);
export const validJournalEntry = key => typeof key === 'string' && (key === 'index'
  || key.startsWith('family:') && families.includes(key.slice(7))
  || key.startsWith('plant:') && own(PLANTS, key.slice(6))
  || key.startsWith('fungus:') && own(FUNGI, key.slice(7)));
export const noteKey = (entryKey, side) => `${entryKey}/${side}`;
export const pageNotes = (journal, entryKey, side) => Object.values(journal?.notes || {})
  .filter(note => note.entryKey === entryKey && (side == null || note.side === side));
function page(entryKey, side) {
  if (!validJournalEntry(entryKey) || !sides.includes(side)) throw new Error('Choose an existing Grimoire page.');
}
const coordinate = value => Math.round(Math.max(0, Math.min(100, value)) * 100) / 100;
export const noteRotation = value => Math.round((((value + 180) % 360 + 360) % 360 - 180) * 10) / 10;
const noteScale = value => Math.round(Math.max(NOTE_MIN_SCALE, Math.min(NOTE_MAX_SCALE, value)) * 100) / 100;
export const markerDefaultEdge = slot => slot < MARKERS_PER_EDGE ? 'top' : 'bottom';

export function normalizeJournal(saved) {
  const clean = createJournal();
  if (saved == null) return clean;
  if (![1, 2, 3, 4].includes(saved.version) || !Array.isArray(saved.papers) || !Array.isArray(saved.markers)
    || !saved.notes || typeof saved.notes !== 'object' || Array.isArray(saved.notes) || !Array.isArray(saved.bookmarks)) {
    throw new Error('Invalid or unsupported Grimoire journal save.');
  }
  clean.papers = [...new Set(saved.papers.filter(id => own(NOTE_PAPERS, id)))];
  clean.markers = [...new Set(saved.markers.filter(id => own(PAGE_MARKERS, id)))];
  clean.noteNonce = saved.version >= 2 && Number.isSafeInteger(saved.noteNonce) && saved.noteNonce >= 0 ? saved.noteNonce : 0;
  for (const [key, note] of Object.entries(saved.notes)) {
    const [oldEntry, oldSide, extra] = key.split('/');
    const entryKey = saved.version === 1 ? oldEntry : note?.entryKey, side = saved.version === 1 ? oldSide : note?.side;
    if (saved.version === 1 && extra !== undefined || !validJournalEntry(entryKey) || !sides.includes(side)
      || !note || !clean.papers.includes(note.paperId) || typeof note.text !== 'string' || !note.text.trim()) continue;
    const serial = saved.version === 1 ? clean.noteNonce + 1 : /^note:[1-9]\d*$/.test(key) ? Number(key.slice(5)) : NaN;
    if (!Number.isSafeInteger(serial) || serial < 1) continue;
    clean.noteNonce = Math.max(clean.noteNonce, serial);
    const id = `note:${serial}`;
    clean.notes[id] = { id, entryKey, side, text: note.text.trim().slice(0, NOTE_LIMIT), paperId: note.paperId,
      x: Number.isFinite(note.x) ? coordinate(note.x) : 50,
      y: Number.isFinite(note.y) ? coordinate(note.y) : 45, tucked: note.tucked === true,
      rotation: Number.isFinite(note.rotation) ? noteRotation(note.rotation) : -2,
      scale: Number.isFinite(note.scale) ? noteScale(note.scale) : 1,
      ...(typeof note.overhang === 'boolean' ? { overhang: note.overhang } : {}) };
  }
  const usedSlots = new Set(), positions = { top: new Set(), bottom: new Set() };
  for (const marker of saved.bookmarks) {
    if (!marker || !Number.isInteger(marker.slot) || marker.slot < 0 || marker.slot >= MARKER_LIMIT
      || usedSlots.has(marker.slot) || !validJournalEntry(marker.entryKey) || !sides.includes(marker.side)
      || !clean.markers.includes(marker.styleId)) continue;
    const edge = ['top', 'bottom'].includes(marker.edge) ? marker.edge : markerDefaultEdge(marker.slot);
    const preferred = saved.version === 4 && Number.isInteger(marker.position) ? marker.position
      : Math.round((marker.side === 'left' ? 100 - (marker.x ?? 50) : (marker.x ?? 50)) / 20);
    const position = Array.from({ length: 6 }, (_, i) => i).filter(i => !positions[edge].has(i))
      .sort((a, b) => Math.abs(a - preferred) - Math.abs(b - preferred) || a - b)[0];
    if (position === undefined) continue;
    positions[edge].add(position);
    clean.bookmarks.push({ slot: marker.slot, entryKey: marker.entryKey, side: 'right', styleId: marker.styleId, position,
      x: position * 20,
      edge,
      name: typeof marker.name === 'string' ? marker.name.trim().slice(0, MARKER_NAME_LIMIT) : '',
      description: typeof marker.description === 'string' ? marker.description.trim().slice(0, MARKER_DESCRIPTION_LIMIT) : '' });
    usedSlots.add(marker.slot);
  }
  clean.bookmarks.sort((a, b) => a.slot - b.slot);
  return clean;
}
const putNote = (notes, id, note) => Object.fromEntries([...Object.entries(notes).filter(([key]) => key !== id), [id, note]]);

export function writeNote(garden, entryKey, side, text, paperId, noteId = null, appearance = {}) {
  page(entryKey, side);
  const journal = garden.journal || createJournal();
  if (!own(NOTE_PAPERS, paperId) || !journal.papers.includes(paperId)) throw new Error('Choose a paper from your collection.');
  if (typeof text !== 'string' || !text.trim() || text.length > NOTE_LIMIT) throw new Error(`Write a note of 1–${NOTE_LIMIT} characters.`);
  if (noteId != null && !own(journal.notes, noteId)) throw new Error('This note no longer exists.');
  const nonce = noteId == null ? journal.noteNonce + 1 : journal.noteNonce;
  if (!Number.isSafeInteger(nonce)) throw new Error('The note collection is too large.');
  const id = noteId ?? `note:${nonce}`, count = pageNotes(journal, entryKey, side).length;
  const rotation = appearance.rotation ?? journal.notes[id]?.rotation ?? -2, scale = appearance.scale ?? journal.notes[id]?.scale ?? 1;
  if (![rotation, scale].every(Number.isFinite)) throw new Error('Invalid note size or rotation.');
  const note = { x: 35 + count % 5 * 8, y: 30 + count % 5 * 8, tucked: false, ...journal.notes[id],
    rotation: noteRotation(rotation), scale: noteScale(scale),
    id, entryKey, side, text: text.trim(), paperId };
  return { ...garden, journal: { ...journal, noteNonce: nonce, notes: putNote(journal.notes, id, note) } };
}
export function positionNote(garden, id, { x, y, tucked, entryKey, side, rotation, scale, overhang }) {
  const journal = garden.journal || createJournal(), note = journal.notes[id];
  if (!note) throw new Error('There is no note on this page.');
  entryKey ??= note.entryKey; side ??= note.side;
  page(entryKey, side);
  rotation ??= note.rotation; scale ??= note.scale;
  if (overhang !== undefined && typeof overhang !== 'boolean') throw new Error('Invalid note position.');
  if (![x, y, rotation, scale].every(Number.isFinite) || typeof tucked !== 'boolean') throw new Error('Invalid note position.');
  return { ...garden, journal: { ...journal, notes: putNote(journal.notes, id,
    { ...note, entryKey, side, x: coordinate(x), y: coordinate(y), tucked, rotation: noteRotation(rotation), scale: noteScale(scale),
      ...(overhang === undefined ? {} : { overhang }) }) } };
}
export function removeNote(garden, id) {
  const journal = garden.journal || createJournal(), notes = { ...journal.notes };
  delete notes[id];
  return { ...garden, journal: { ...journal, notes } };
}
function markerJournal(garden) {
  const journal = garden.journal || createJournal();
  return journal.version === 4 ? journal : normalizeJournal(journal);
}
function placement(journal, slot, edge, position) {
  if (!['top', 'bottom'].includes(edge)) throw new Error('Choose the top or bottom of the book.');
  const others = journal.bookmarks.filter(item => item.slot !== slot);
  position ??= Array.from({ length: 6 }, (_, i) => i).find(i => !others.some(m => m.edge === edge && m.position === i));
  if (position === undefined) throw new Error(`All six ${edge} positions are reserved. Move or remove a marker first.`);
  if (!Number.isInteger(position) || position < 0 || position >= 6) throw new Error('Choose a marker position from 1 to 6.');
  if (others.some(item => item.edge === edge && item.position === position)) throw new Error(`${edge === 'top' ? 'Top' : 'Bottom'} position ${position + 1} is reserved. Move or remove its marker first.`);
  return { edge, position, x: position * 20, side: 'right' };
}
export function markPage(garden, entryKey, side, styleId, requestedSlot = null, details = {}) {
  page(entryKey, side);
  const journal = markerJournal(garden);
  if (!own(PAGE_MARKERS, styleId) || !journal.markers.includes(styleId)) throw new Error('Choose a marker from your collection.');
  const slot = requestedSlot ?? Array.from({ length: MARKER_LIMIT }, (_, i) => i).find(i => !journal.bookmarks.some(marker => marker.slot === i));
  if (!Number.isInteger(slot) || slot < 0 || slot >= MARKER_LIMIT) throw new Error('All twelve markers are in use. Choose one to move.');
  const previous = journal.bookmarks.find(marker => marker.slot === slot);
  let edge = details.edge ?? previous?.edge ?? markerDefaultEdge(slot);
  if (details.edge == null && !previous && journal.bookmarks.filter(m => m.edge === edge).length === 6) edge = edge === 'top' ? 'bottom' : 'top';
  const position = details.position ?? (Number.isFinite(details.x) ? Math.round(coordinate(details.x) / 20) : previous?.edge === edge ? previous.position : undefined);
  const value = { slot, entryKey, styleId, ...placement(journal, slot, edge, position),
    name: details.name ?? previous?.name ?? '', description: details.description ?? previous?.description ?? '' };
  const next = { ...garden, journal: { ...journal, bookmarks: [...journal.bookmarks.filter(m => m.slot !== slot), value].sort((a, b) => a.slot - b.slot) } };
  return editPageMarker(next, slot, value);
}
export function editPageMarker(garden, slot, details) {
  const journal = markerJournal(garden), marker = journal.bookmarks.find(item => item.slot === slot);
  if (!marker) throw new Error('This page marker no longer exists.');
  const value = { ...marker, ...details };
  if (!own(PAGE_MARKERS, value.styleId) || !journal.markers.includes(value.styleId)) throw new Error('Choose a marker from your collection.');
  if (typeof value.name !== 'string' || value.name.length > MARKER_NAME_LIMIT || typeof value.description !== 'string' || value.description.length > MARKER_DESCRIPTION_LIMIT) throw new Error('The marker name or description is too long.');
  const position = details.position ?? (Number.isFinite(details.x) ? Math.round(coordinate(details.x) / 20) : value.edge === marker.edge ? marker.position : undefined);
  const placed = placement(journal, slot, value.edge, position);
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.map(item => item.slot !== slot ? item :
    { ...marker, ...placed, styleId: value.styleId, name: value.name.trim(), description: value.description.trim() }) } };
}
export function movePageMarker(garden, slot, entryKey, side, x, edge) {
  page(entryKey, side);
  const journal = markerJournal(garden), marker = journal.bookmarks.find(item => item.slot === slot);
  if (!marker || !Number.isFinite(x)) throw new Error('Invalid page marker position.');
  const placed = placement(journal, slot, edge ?? marker.edge, Math.round(coordinate(x) / 20));
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.map(item => item.slot === slot ? { ...item, ...placed, entryKey } : item) } };
}
export function removePageMarker(garden, slot) {
  const journal = markerJournal(garden);
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.filter(marker => marker.slot !== slot) } };
}
