import { PLANTS, FUNGI } from './species.js';
import { NOTE_PAPERS, PAGE_MARKERS } from './stationery.js';
import { createJournal } from './journal-state.js';
export { createJournal } from './journal-state.js';

export const NOTE_LIMIT = 250;
export const MARKER_LIMIT = 4;
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

export function normalizeJournal(saved) {
  const clean = createJournal();
  if (saved == null) return clean;
  if (![1, 2].includes(saved.version) || !Array.isArray(saved.papers) || !Array.isArray(saved.markers)
    || !saved.notes || typeof saved.notes !== 'object' || Array.isArray(saved.notes) || !Array.isArray(saved.bookmarks)) {
    throw new Error('Invalid or unsupported Grimoire journal save.');
  }
  clean.papers = [...new Set(saved.papers.filter(id => own(NOTE_PAPERS, id)))];
  clean.markers = [...new Set(saved.markers.filter(id => own(PAGE_MARKERS, id)))];
  clean.noteNonce = saved.version === 2 && Number.isSafeInteger(saved.noteNonce) && saved.noteNonce >= 0 ? saved.noteNonce : 0;
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
      y: Number.isFinite(note.y) ? coordinate(note.y) : 45, tucked: note.tucked === true };
  }
  const usedSlots = new Set(), usedPages = new Set();
  for (const marker of saved.bookmarks) {
    if (!marker || !Number.isInteger(marker.slot) || marker.slot < 0 || marker.slot >= MARKER_LIMIT
      || usedSlots.has(marker.slot) || !validJournalEntry(marker.entryKey) || !sides.includes(marker.side)
      || !clean.markers.includes(marker.styleId) || usedPages.has(noteKey(marker.entryKey, marker.side))) continue;
    clean.bookmarks.push({ slot: marker.slot, entryKey: marker.entryKey, side: marker.side, styleId: marker.styleId,
      x: Number.isFinite(marker.x) ? coordinate(marker.x) : 20 + marker.slot * 20 });
    usedSlots.add(marker.slot); usedPages.add(noteKey(marker.entryKey, marker.side));
  }
  clean.bookmarks.sort((a, b) => a.slot - b.slot);
  return clean;
}
const putNote = (notes, id, note) => Object.fromEntries([...Object.entries(notes).filter(([key]) => key !== id), [id, note]]);

export function writeNote(garden, entryKey, side, text, paperId, noteId = null) {
  page(entryKey, side);
  const journal = garden.journal || createJournal();
  if (!own(NOTE_PAPERS, paperId) || !journal.papers.includes(paperId)) throw new Error('Choose a paper from your collection.');
  if (typeof text !== 'string' || !text.trim() || text.length > NOTE_LIMIT) throw new Error(`Write a note of 1–${NOTE_LIMIT} characters.`);
  if (noteId != null && !own(journal.notes, noteId)) throw new Error('This note no longer exists.');
  const nonce = noteId == null ? journal.noteNonce + 1 : journal.noteNonce;
  if (!Number.isSafeInteger(nonce)) throw new Error('The note collection is too large.');
  const id = noteId ?? `note:${nonce}`, count = pageNotes(journal, entryKey, side).length;
  const note = { x: 35 + count % 5 * 8, y: 30 + count % 5 * 8, tucked: false, ...journal.notes[id],
    id, entryKey, side, text: text.trim(), paperId };
  return { ...garden, journal: { ...journal, noteNonce: nonce, notes: putNote(journal.notes, id, note) } };
}
export function positionNote(garden, id, { x, y, tucked, entryKey, side }) {
  const journal = garden.journal || createJournal(), note = journal.notes[id];
  if (!note) throw new Error('There is no note on this page.');
  entryKey ??= note.entryKey; side ??= note.side;
  page(entryKey, side);
  if (![x, y].every(Number.isFinite) || typeof tucked !== 'boolean') throw new Error('Invalid note position.');
  return { ...garden, journal: { ...journal, notes: putNote(journal.notes, id,
    { ...note, entryKey, side, x: coordinate(x), y: coordinate(y), tucked }) } };
}
export function removeNote(garden, id) {
  const journal = garden.journal || createJournal(), notes = { ...journal.notes };
  delete notes[id];
  return { ...garden, journal: { ...journal, notes } };
}
export function markPage(garden, entryKey, side, styleId, requestedSlot = null) {
  page(entryKey, side);
  const journal = garden.journal || createJournal();
  if (!own(PAGE_MARKERS, styleId) || !journal.markers.includes(styleId)) throw new Error('Choose a marker from your collection.');
  const existing = journal.bookmarks.find(marker => marker.entryKey === entryKey && marker.side === side);
  const slot = requestedSlot ?? existing?.slot ?? Array.from({ length: MARKER_LIMIT }, (_, i) => i)
    .find(i => !journal.bookmarks.some(marker => marker.slot === i));
  if (!Number.isInteger(slot) || slot < 0 || slot >= MARKER_LIMIT) throw new Error('All four markers are in use. Choose one to move.');
  if (existing && existing.slot !== slot) throw new Error('This page already has a marker. Choose that marker to change its style.');
  const previous = journal.bookmarks.find(marker => marker.slot === slot);
  const bookmarks = [...journal.bookmarks.filter(marker => marker.slot !== slot), { slot, entryKey, side, styleId,
    x: previous?.x ?? 20 + slot * 20 }]
    .sort((a, b) => a.slot - b.slot);
  return { ...garden, journal: { ...journal, bookmarks } };
}
export function movePageMarker(garden, slot, entryKey, side, x) {
  page(entryKey, side);
  const journal = garden.journal || createJournal(), marker = journal.bookmarks.find(item => item.slot === slot);
  if (!marker || !Number.isFinite(x)) throw new Error('Invalid page marker position.');
  const occupied = journal.bookmarks.find(item => item.slot !== slot && item.entryKey === entryKey && item.side === side);
  const bookmarks = journal.bookmarks.map(item => item.slot === slot ? { ...item, entryKey, side, x: coordinate(x) }
    : item === occupied ? { ...item, entryKey: marker.entryKey, side: marker.side, x: marker.x } : item);
  return { ...garden, journal: { ...journal, bookmarks } };
}
export function removePageMarker(garden, slot) {
  const journal = garden.journal || createJournal();
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.filter(marker => marker.slot !== slot) } };
}
