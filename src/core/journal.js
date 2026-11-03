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
const markerDefaultX = slot => 3 + slot % MARKERS_PER_EDGE * 18;

export function normalizeJournal(saved) {
  const clean = createJournal();
  if (saved == null) return clean;
  if (![1, 2, 3].includes(saved.version) || !Array.isArray(saved.papers) || !Array.isArray(saved.markers)
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
  const usedSlots = new Set(), usedPages = new Set(), edgeCounts = { top: 0, bottom: 0 };
  for (const marker of saved.bookmarks) {
    if (!marker || !Number.isInteger(marker.slot) || marker.slot < 0 || marker.slot >= MARKER_LIMIT
      || usedSlots.has(marker.slot) || !validJournalEntry(marker.entryKey) || !sides.includes(marker.side)
      || !clean.markers.includes(marker.styleId) || usedPages.has(noteKey(marker.entryKey, marker.side))) continue;
    const edge = ['top', 'bottom'].includes(marker.edge) ? marker.edge : markerDefaultEdge(marker.slot);
    if (edgeCounts[edge] >= MARKERS_PER_EDGE) continue;
    edgeCounts[edge]++;
    clean.bookmarks.push({ slot: marker.slot, entryKey: marker.entryKey, side: marker.side, styleId: marker.styleId,
      x: Number.isFinite(marker.x) ? coordinate(marker.x) : markerDefaultX(marker.slot),
      edge,
      name: typeof marker.name === 'string' ? marker.name.trim().slice(0, MARKER_NAME_LIMIT) : '',
      description: typeof marker.description === 'string' ? marker.description.trim().slice(0, MARKER_DESCRIPTION_LIMIT) : '' });
    usedSlots.add(marker.slot); usedPages.add(noteKey(marker.entryKey, marker.side));
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
export function markPage(garden, entryKey, side, styleId, requestedSlot = null, details = {}) {
  page(entryKey, side);
  const journal = garden.journal || createJournal();
  if (!own(PAGE_MARKERS, styleId) || !journal.markers.includes(styleId)) throw new Error('Choose a marker from your collection.');
  const existing = journal.bookmarks.find(marker => marker.entryKey === entryKey && marker.side === side);
  const slot = requestedSlot ?? existing?.slot ?? Array.from({ length: MARKER_LIMIT }, (_, i) => i)
    .find(i => !journal.bookmarks.some(marker => marker.slot === i));
  if (!Number.isInteger(slot) || slot < 0 || slot >= MARKER_LIMIT) throw new Error('All twelve markers are in use. Choose one to move.');
  if (existing && existing.slot !== slot) throw new Error('This page already has a marker. Choose that marker to change its style.');
  const previous = journal.bookmarks.find(marker => marker.slot === slot);
  let edge = details.edge ?? previous?.edge ?? markerDefaultEdge(slot);
  if (details.edge == null && !previous && journal.bookmarks.filter(marker => marker.edge === edge).length >= MARKERS_PER_EDGE) edge = edge === 'top' ? 'bottom' : 'top';
  const bookmarks = [...journal.bookmarks.filter(marker => marker.slot !== slot), { slot, entryKey, side, styleId,
    x: Number.isFinite(details.x) ? coordinate(details.x) : previous?.x ?? markerDefaultX(slot),
    edge,
    name: details.name ?? previous?.name ?? '', description: details.description ?? previous?.description ?? '' }]
    .sort((a, b) => a.slot - b.slot);
  const next = { ...garden, journal: { ...journal, bookmarks } };
  return editPageMarker(next, slot, bookmarks.find(marker => marker.slot === slot));
}
export function editPageMarker(garden, slot, details) {
  const journal = garden.journal || createJournal(), marker = journal.bookmarks.find(item => item.slot === slot);
  if (!marker) throw new Error('This page marker no longer exists.');
  const value = { ...marker, ...details };
  if (!own(PAGE_MARKERS, value.styleId) || !journal.markers.includes(value.styleId)) throw new Error('Choose a marker from your collection.');
  if (typeof value.name !== 'string' || value.name.length > MARKER_NAME_LIMIT
    || typeof value.description !== 'string' || value.description.length > MARKER_DESCRIPTION_LIMIT) throw new Error('The marker name or description is too long.');
  if (!['top', 'bottom'].includes(value.edge)) throw new Error('Choose the top or bottom of the book.');
  if (journal.bookmarks.filter(item => item.slot !== slot && item.edge === value.edge).length >= MARKERS_PER_EDGE) {
    throw new Error(`All six ${value.edge} markers are in use. Move one or choose the other edge.`);
  }
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.map(item => item.slot !== slot ? item :
    { ...marker, styleId: value.styleId, name: value.name.trim(), description: value.description.trim(), edge: value.edge }) } };
}
export function movePageMarker(garden, slot, entryKey, side, x, edge) {
  page(entryKey, side);
  const journal = garden.journal || createJournal(), marker = journal.bookmarks.find(item => item.slot === slot);
  edge ??= marker?.edge;
  if (!marker || !Number.isFinite(x) || !['top', 'bottom'].includes(edge)) throw new Error('Invalid page marker position.');
  if (journal.bookmarks.filter(item => item.slot !== slot && item.edge === edge).length >= MARKERS_PER_EDGE) {
    throw new Error(`All six ${edge} markers are in use. Choose the other edge.`);
  }
  const occupied = journal.bookmarks.find(item => item.slot !== slot && item.entryKey === entryKey && item.side === side);
  const bookmarks = journal.bookmarks.map(item => item.slot === slot ? { ...item, entryKey, side, x: coordinate(x), edge }
    : item === occupied ? { ...item, entryKey: marker.entryKey, side: marker.side, x: marker.x } : item);
  return { ...garden, journal: { ...journal, bookmarks } };
}
export function removePageMarker(garden, slot) {
  const journal = garden.journal || createJournal();
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.filter(marker => marker.slot !== slot) } };
}
