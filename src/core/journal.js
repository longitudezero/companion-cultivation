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
function page(entryKey, side) {
  if (!validJournalEntry(entryKey) || !sides.includes(side)) throw new Error('Choose an existing Grimoire page.');
}
const coordinate = value => Math.round(Math.max(0, Math.min(100, value)) * 100) / 100;

export function normalizeJournal(saved) {
  const clean = createJournal();
  if (saved == null) return clean;
  if (saved.version !== 1 || !Array.isArray(saved.papers) || !Array.isArray(saved.markers)
    || !saved.notes || typeof saved.notes !== 'object' || Array.isArray(saved.notes) || !Array.isArray(saved.bookmarks)) {
    throw new Error('Invalid or unsupported Grimoire journal save.');
  }
  clean.papers = [...new Set(saved.papers.filter(id => own(NOTE_PAPERS, id)))];
  clean.markers = [...new Set(saved.markers.filter(id => own(PAGE_MARKERS, id)))];
  for (const [key, note] of Object.entries(saved.notes)) {
    const [entryKey, side, extra] = key.split('/');
    if (extra !== undefined || !validJournalEntry(entryKey) || !sides.includes(side)
      || !note || !clean.papers.includes(note.paperId) || typeof note.text !== 'string' || !note.text.trim()) continue;
    clean.notes[key] = { text: note.text.trim().slice(0, NOTE_LIMIT), paperId: note.paperId,
      x: Number.isFinite(note.x) ? coordinate(note.x) : 50,
      y: Number.isFinite(note.y) ? coordinate(note.y) : 45, tucked: note.tucked === true };
  }
  const usedSlots = new Set(), usedPages = new Set();
  for (const marker of saved.bookmarks) {
    if (!marker || !Number.isInteger(marker.slot) || marker.slot < 0 || marker.slot >= MARKER_LIMIT
      || usedSlots.has(marker.slot) || !validJournalEntry(marker.entryKey) || !sides.includes(marker.side)
      || !clean.markers.includes(marker.styleId) || usedPages.has(noteKey(marker.entryKey, marker.side))) continue;
    clean.bookmarks.push({ slot: marker.slot, entryKey: marker.entryKey, side: marker.side, styleId: marker.styleId });
    usedSlots.add(marker.slot); usedPages.add(noteKey(marker.entryKey, marker.side));
  }
  clean.bookmarks.sort((a, b) => a.slot - b.slot);
  return clean;
}
export function writeNote(garden, entryKey, side, text, paperId) {
  page(entryKey, side);
  const journal = garden.journal || createJournal();
  if (!own(NOTE_PAPERS, paperId) || !journal.papers.includes(paperId)) throw new Error('Choose a paper from your collection.');
  if (typeof text !== 'string' || !text.trim() || text.length > NOTE_LIMIT) throw new Error(`Write a note of 1–${NOTE_LIMIT} characters.`);
  const key = noteKey(entryKey, side);
  const note = { x: 50, y: 45, tucked: false, ...journal.notes[key], text: text.trim(), paperId };
  return { ...garden, journal: { ...journal, notes: { ...journal.notes, [key]: note } } };
}
export function positionNote(garden, entryKey, side, { x, y, tucked }) {
  page(entryKey, side);
  const journal = garden.journal || createJournal(), key = noteKey(entryKey, side), note = journal.notes[key];
  if (!note) throw new Error('There is no note on this page.');
  if (![x, y].every(Number.isFinite) || typeof tucked !== 'boolean') throw new Error('Invalid note position.');
  return { ...garden, journal: { ...journal, notes: { ...journal.notes,
    [key]: { ...note, x: coordinate(x), y: coordinate(y), tucked } } } };
}
export function removeNote(garden, entryKey, side) {
  page(entryKey, side);
  const journal = garden.journal || createJournal(), notes = { ...journal.notes };
  delete notes[noteKey(entryKey, side)];
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
  const bookmarks = [...journal.bookmarks.filter(marker => marker.slot !== slot), { slot, entryKey, side, styleId }]
    .sort((a, b) => a.slot - b.slot);
  return { ...garden, journal: { ...journal, bookmarks } };
}
export function removePageMarker(garden, slot) {
  const journal = garden.journal || createJournal();
  return { ...garden, journal: { ...journal, bookmarks: journal.bookmarks.filter(marker => marker.slot !== slot) } };
}
