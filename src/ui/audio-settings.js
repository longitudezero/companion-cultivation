export const AUDIO_SETTINGS_KEY = 'companion-cultivation:audio-settings:v1';

export const AUDIO_CHANNELS = Object.freeze([
  'action',
  'navigation',
  'bgm',
  'rune',
  'click',
]);

export const DEFAULT_AUDIO_SETTINGS = Object.freeze({
  action: 1,
  navigation: 1,
  bgm: .3,
  rune: 1,
  click: 1,
});

export function normalizeAudioSettings(value) {
  const source = value && typeof value === 'object' ? value : {};
  return Object.fromEntries(AUDIO_CHANNELS.map(channel => {
    const candidate = Number(source[channel]);
    return [channel, Number.isFinite(candidate)
      ? Math.max(0, Math.min(1, candidate))
      : DEFAULT_AUDIO_SETTINGS[channel]];
  }));
}

function storedSettings() {
  if (typeof window === 'undefined') return normalizeAudioSettings();
  try { return normalizeAudioSettings(JSON.parse(window.localStorage.getItem(AUDIO_SETTINGS_KEY) || 'null')); }
  catch { return normalizeAudioSettings(); }
}

let settings = storedSettings();

export function loadAudioSettings() {
  return { ...settings };
}

export function getAudioChannelVolume(channel) {
  return settings[channel] ?? DEFAULT_AUDIO_SETTINGS[channel] ?? 1;
}

export function updateAudioSettings(next) {
  settings = normalizeAudioSettings(next);
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings)); }
    catch { /* The current session still keeps its sound settings. */ }
    window.dispatchEvent(new CustomEvent('companion-cultivation:audio-settings', { detail: settings }));
  }
  return { ...settings };
}

export function onAudioSettingsChange(listener) {
  if (typeof window === 'undefined') return () => {};
  const receive = event => listener(event.detail);
  window.addEventListener('companion-cultivation:audio-settings', receive);
  return () => window.removeEventListener('companion-cultivation:audio-settings', receive);
}
