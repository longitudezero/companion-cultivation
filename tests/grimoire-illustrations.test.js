import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { PLANTS, FUNGI } from '../src/core/species.js';
import { SPECIES_ILLUSTRATIONS, illustrationFor } from '../src/grimoire/illustrations.js';

test('the supplied illustration set covers the catalogue exactly with valid, traceable web assets', async () => {
  const expected = [...Object.keys(PLANTS), ...Object.keys(FUNGI)];
  const manifest = JSON.parse(await readFile(new URL('../public/grimoire/illustrations/manifest.json', import.meta.url)));
  assert.deepEqual(new Set(Object.keys(SPECIES_ILLUSTRATIONS)), new Set(expected));
  assert.deepEqual(new Set(manifest.illustrations.map(item => item.species)), new Set(expected));
  assert.equal(manifest.illustrations.length, expected.length);
  assert.equal(new Set(manifest.illustrations.map(item => item.source)).size, expected.length);
  assert.equal(new Set(manifest.illustrations.map(item => item.file)).size, expected.length);
  for (const record of manifest.illustrations) {
    assert.match(record.file, /^(plants|fungi)\/[a-z0-9-]+\.webp$/);
    assert.match(record.sourceSha256, /^[a-f0-9]{64}$/);
    assert.ok(record.dimensions.every(value => value > 0 && value <= 768));
    assert.equal(record.kind, PLANTS[record.species] ? 'plant' : 'fungus');
    const data = await readFile(new URL(`../public/grimoire/illustrations/${record.file}`, import.meta.url));
    assert.equal(data.toString('ascii', 0, 4), 'RIFF');
    assert.equal(data.toString('ascii', 8, 12), 'WEBP');
    assert.equal(createHash('sha256').update(data).digest('hex'), record.sha256, record.species);
    const illustration = illustrationFor(record.species);
    assert.ok(illustration.src.endsWith(`/grimoire/illustrations/${record.file}`));
    assert.deepEqual([illustration.width, illustration.height], record.dimensions);
  }
  assert.equal(illustrationFor('Cocoa'), null);
  assert.deepEqual(manifest.unused.map(item => item.source), ['ingredients-illustration-collection/cocoa.png']);
  assert.ok(manifest.illustrations.filter(item => item.species !== 'Bamboozled').every(item => item.transparent));
});
