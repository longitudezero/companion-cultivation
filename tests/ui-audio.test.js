import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { UI_SOUND_FILES, uiSoundPath } from '../src/ui/ui-audio.js';

test('UI sound pools retain every approved variation and packaged asset', async () => {
  assert.equal(UI_SOUND_FILES['page-turn'].length, 10);
  assert.equal(UI_SOUND_FILES['taskboard-open'].length, 11);
  assert.equal(UI_SOUND_FILES['taskboard-close'].length, 10);
  assert.equal(uiSoundPath('taskboard-open', 10, '/cultivation'),
    '/cultivation/audio/ui/taskboard-open-11.ogg');
  assert.equal(uiSoundPath('taskboard-close', 9, '/cultivation/'),
    '/cultivation/audio/ui/taskboard-close-10.ogg');

  const files = [...new Set(Object.values(UI_SOUND_FILES).flat())];
  assert.equal(files.length, 48);
  for (const file of files) {
    const data = await readFile(new URL(`../public/audio/ui/${file}`, import.meta.url));
    assert.equal(data.subarray(0, 4).toString(), 'OggS', `${file} is an Ogg stream`);
  }
});
