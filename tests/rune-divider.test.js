import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { RUNE_DIVIDER_GLYPHS, runeHoverSound } from '../src/ui/rune-divider-audio.js';

test('every visible divider rune has a stable supplied sound', async () => {
  assert.equal(RUNE_DIVIDER_GLYPHS.length, 128);
  assert.equal(runeHoverSound(0, '/cultivation/'), '/cultivation/audio/rune-hover/rune_hover_001.ogg');
  assert.equal(runeHoverSound(127, '/cultivation'), '/cultivation/audio/rune-hover/rune_hover_128.ogg');
  const assetRoot = new URL('../public/audio/rune-hover/', import.meta.url);
  const assets = (await readdir(assetRoot)).filter(name => name.endsWith('.ogg'));
  const manifest = (await readFile(new URL('manifest.csv', assetRoot), 'utf8')).trim().split(/\r?\n/).slice(1);
  assert.equal(assets.length, 352);
  assert.equal(manifest.length, 352);
  assert.deepEqual(manifest.map(row => `${row.split(',')[1]}.ogg`), assets.sort());
});
