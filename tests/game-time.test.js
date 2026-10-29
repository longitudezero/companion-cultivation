import test from 'node:test';
import assert from 'node:assert/strict';
import { formatRealDuration, REAL_MILLISECONDS_PER_GAME_HOUR } from '../src/core/game-time.js';
import { STAGING_TUNING } from '../src/core/staging.js';
import { TRANSFORMATIONS } from '../src/core/transformations.js';
import { describeFullRecipe, previewPlantHazards } from '../src/core/grimoire-preview.js';

test('the approved 5-second live clock converts game-hour durations consistently', () => {
  assert.equal(REAL_MILLISECONDS_PER_GAME_HOUR, 5000);
  assert.equal(STAGING_TUNING.realMillisecondsPerHour, REAL_MILLISECONDS_PER_GAME_HOUR);
  assert.equal(formatRealDuration(0), '0s');
  assert.equal(formatRealDuration(4), '20s');
  assert.equal(formatRealDuration(6), '30s');
  assert.equal(formatRealDuration(16), '1m 20s');
  assert.equal(formatRealDuration(20), '1m 40s');
  assert.equal(formatRealDuration(24), '2m');
  assert.equal(formatRealDuration(96), '8m');
  assert.equal(formatRealDuration(-1), '—');
});

test('developer Grimoire recipes and lethal exposures show live real-time equivalents', () => {
  const potato = TRANSFORMATIONS.Beanstalk.find(recipe => recipe.into === 'Potato');
  assert.match(describeFullRecipe('Beanstalk', potato), /Hold for 1m 40s\./);

  const mistlefoe = TRANSFORMATIONS.Mistlefoe.find(recipe => recipe.into === 'Mandrabra');
  assert.match(describeFullRecipe('Mistlefoe', mistlefoe), /1m to under 1m 40s/);

  const ghostRice = TRANSFORMATIONS['Saffrune'][0];
  assert.match(describeFullRecipe('Saffrune', ghostRice), /within 40s/);

  assert.ok(previewPlantHazards('Mandrakadabra').includes('Bright exposure: 20s to death'));
});
