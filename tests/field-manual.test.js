import test from 'node:test';
import assert from 'node:assert/strict';
import { FIELD_MANUAL_CHAPTERS, FIELD_MANUAL_ENTRIES, restoreFieldManualEntry } from '../src/field-manual/book.js';
import { createGarden, resizeGarden } from '../src/core/grid.js';
import { migrateGarden } from '../src/core/migration.js';
import { markPage, validJournalEntry, writeNote } from '../src/core/journal.js';

test('Field Manual has five always-available chapters and fifteen stable spreads', () => {
  assert.deepEqual(FIELD_MANUAL_CHAPTERS.map(chapter => chapter.label),
    ['Garden', 'Effects', 'Cultivation', 'Guild', 'Controls']);
  assert.equal(FIELD_MANUAL_ENTRIES.length, 15);
  assert.deepEqual(FIELD_MANUAL_ENTRIES.map(entry => entry.page),
    Array.from({ length: 15 }, (_, index) => index * 2 + 1));
  assert.ok(FIELD_MANUAL_ENTRIES.every(entry => validJournalEntry(entry.key)));
  assert.equal(restoreFieldManualEntry('manual:blockers'), 'manual:blockers');
  assert.equal(restoreFieldManualEntry('plant:Beanstalk'), 'manual:front-matter');
});

test('Field Manual annotations save independently and survive migration and resizing', () => {
  let garden = createGarden(4, 4);
  const grimoireJournal = garden.journal;
  let proxy = { ...garden, journal: { ...garden.fieldManualJournal,
    papers: ['starlight'], markers: ['forest-tassel'] } };
  proxy = writeNote(proxy, 'manual:conditions', 'left', 'Remember the three ladders.', 'starlight');
  proxy = markPage(proxy, 'manual:blockers', 'right', 'forest-tassel');
  garden = { ...proxy, journal: grimoireJournal, fieldManualJournal: proxy.journal };

  assert.equal(Object.keys(garden.journal.notes).length, 0);
  assert.equal(Object.keys(garden.fieldManualJournal.notes).length, 1);
  assert.equal(garden.fieldManualJournal.bookmarks[0].entryKey, 'manual:blockers');

  const restored = migrateGarden(JSON.parse(JSON.stringify(garden)));
  const resized = resizeGarden(restored, 5, 5);
  assert.equal(Object.values(resized.fieldManualJournal.notes)[0].text, 'Remember the three ladders.');
  assert.equal(resized.fieldManualJournal.bookmarks[0].entryKey, 'manual:blockers');
  assert.equal(Object.keys(resized.journal.notes).length, 0);
});

