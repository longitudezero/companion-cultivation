import assert from 'node:assert/strict';
import test from 'node:test';
import {
  AUDIO_CHANNELS,
  DEFAULT_AUDIO_SETTINGS,
  getAudioChannelVolume,
  loadAudioSettings,
  updateAudioSettings,
} from '../src/ui/audio-settings.js';

test('five independent audio channels retain normalized session settings', () => {
  assert.deepEqual(AUDIO_CHANNELS, ['action', 'navigation', 'bgm', 'rune', 'click']);
  assert.equal(DEFAULT_AUDIO_SETTINGS.bgm, .3);
  const changed = updateAudioSettings({ action: .65, navigation: 2, bgm: -.5, rune: .4, click: .2 });
  assert.deepEqual(changed, { action: .65, navigation: 1, bgm: 0, rune: .4, click: .2 });
  assert.equal(getAudioChannelVolume('rune'), .4);
  assert.deepEqual(loadAudioSettings(), changed);
  updateAudioSettings(DEFAULT_AUDIO_SETTINGS);
});
