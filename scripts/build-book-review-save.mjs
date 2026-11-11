// Synthetic stationery fixture for reviewing the experiment, never a task reward.
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createTutorialGarden, withGold, tradeShop, writeNote, positionNote, markPage,
  NOTE_PAPERS, PAGE_MARKERS, serializeGameSave, deserializeGameSave } from '../src/core/index.js';
import { BOOK_ENTRIES } from '../src/grimoire/book.js';
const destination = resolve(process.argv[2] || 'dist/tabletop-review.ccsave');
let garden = withGold(createTutorialGarden(), 500);
for (const id of [...Object.keys(NOTE_PAPERS).map(id => `paper:${id}`), ...Object.keys(PAGE_MARKERS).map(id => `bookmark:${id}`)]) {
  garden = tradeShop(garden, 'buy', id, 1).garden;
}
const indices = [1, 4, 6, 8, 11, 22, 25, 29, 34, 39, 45, 55];
const names = ['Start here', '', 'Trials', '', 'Flowers', 'Compare', '', 'Later', '', 'Recipes', '', 'Experiments'];
for (let slot = 0; slot < 12; slot++) garden = markPage(garden, BOOK_ENTRIES[indices[slot]].key, slot === 0 || slot % 2 ? 'right' : 'left', Object.keys(PAGE_MARKERS)[slot], slot,
  { name: names[slot], description: slot === 0 ? 'Try dragging the book corners, then hover this marker to bring it back onto the page.' : '', edge: slot < 6 ? 'top' : 'bottom' });
for (const [side, text, paperId, x, y, rotation, scale] of [
  ['right', 'Try Damp soil, then compare the light.', 'starlight', 30, 50, -7, .8],
  ['right', 'Click the tape to tuck this aside. Turn away and return to find it back at home.', 'moonlit', 76, 72, 12, .75],
  ['left', 'This half-over-edge placement is deliberate. It stays saved.', 'botanist', 0, 65, -12, .65],
]) {
  garden = writeNote(garden, 'plant:Beanstalk', side, text, paperId);
  garden = positionNote(garden, `note:${garden.journal.noteNonce}`, { x, y, rotation, scale, tucked: false, overhang: true });
}
const serialized = serializeGameSave(garden, '2026-11-03T00:00:00.000Z');
deserializeGameSave(serialized);
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, serialized);
console.log(`Synthetic review save: ${destination} (12 markers, 3 notes, all stationery styles)`);
