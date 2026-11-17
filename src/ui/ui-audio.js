import { getAudioChannelVolume, onAudioSettingsChange } from './audio-settings.js';

const numbered = (stem, count) => Array.from({ length: count }, (_, index) =>
  `${stem}-${String(index + 1).padStart(2, '0')}.ogg`);

export const UI_SOUND_FILES = Object.freeze({
  buy: ['buy.ogg'],
  'click-bad': ['click-bad.ogg'],
  'click-good': ['click-good.ogg'],
  'grimoire-open': ['grimoire-open.ogg'],
  harvest: ['harvest.ogg'],
  'inventory-move': ['inventory-move.ogg'],
  'note-save': ['note-save.ogg'],
  notification: ['notification.ogg'],
  'page-turn': numbered('page-turn', 10),
  'pages-many': ['pages-many.ogg'],
  'place-on-hex': ['place-on-hex.ogg'],
  pop: ['pop.ogg'],
  'remove-from-hex': ['remove-from-hex.ogg'],
  sell: ['sell.ogg'],
  'shop-close': ['shop-close.ogg'],
  'shop-open': ['shop-open.ogg'],
  stamp: ['stamp.ogg'],
  'task-complete': ['task-complete.ogg'],
  'taskboard-close': numbered('taskboard-close', 10),
  'taskboard-open': numbered('taskboard-open', 11),
});

export const UI_SOUND_CHANNELS = Object.freeze({
  buy: 'action',
  'click-bad': 'click',
  'click-good': 'click',
  'grimoire-open': 'navigation',
  harvest: 'action',
  'inventory-move': 'action',
  'note-save': 'action',
  notification: 'action',
  'page-turn': 'navigation',
  'pages-many': 'navigation',
  'place-on-hex': 'action',
  pop: 'navigation',
  'remove-from-hex': 'action',
  sell: 'action',
  'shop-close': 'navigation',
  'shop-open': 'navigation',
  stamp: 'action',
  'task-complete': 'action',
  'taskboard-close': 'navigation',
  'taskboard-open': 'navigation',
});

const DEFAULT_VOLUME = Object.freeze({
  'click-good': .14,
  'click-bad': .24,
  'page-turn': .42,
  'pages-many': .42,
  'taskboard-open': .55,
  'taskboard-close': .55,
  'task-complete': .55,
  stamp: .5,
});

const previousVariants = new Map();
const activeSounds = new Map();

onAudioSettingsChange(settings => {
  for (const [sound, { channel, baseVolume }] of activeSounds) {
    sound.volume = baseVolume * (settings[channel] ?? 1);
  }
});

function rootUrl(baseUrl) {
  const root = baseUrl || '/';
  return root.endsWith('/') ? root : `${root}/`;
}

export function uiSoundPath(name, variant = 0, baseUrl = '/') {
  const files = UI_SOUND_FILES[name];
  if (!files) throw new Error(`Unknown UI sound: ${name}`);
  const index = ((variant % files.length) + files.length) % files.length;
  return `${rootUrl(baseUrl)}audio/ui/${files[index]}`;
}

function randomVariant(name) {
  const count = UI_SOUND_FILES[name]?.length || 0;
  if (count < 2) return 0;
  const previous = previousVariants.get(name);
  let next = Math.floor(Math.random() * count);
  if (next === previous) next = (next + 1 + Math.floor(Math.random() * (count - 1))) % count;
  previousVariants.set(name, next);
  return next;
}

export function playUiSound(name, options = {}) {
  if (typeof window === 'undefined' || typeof window.Audio !== 'function') return null;
  const channel = options.channel || UI_SOUND_CHANNELS[name] || 'action';
  const channelVolume = getAudioChannelVolume(channel);
  if (channelVolume <= 0) return null;
  const variant = Number.isInteger(options.variant) ? options.variant : randomVariant(name);
  const sound = new window.Audio(uiSoundPath(name, variant, import.meta.env?.BASE_URL || '/'));
  sound.preload = 'auto';
  const baseVolume = options.volume ?? DEFAULT_VOLUME[name] ?? .46;
  sound.volume = baseVolume * channelVolume;
  activeSounds.set(sound, { channel, baseVolume });
  const release = () => activeSounds.delete(sound);
  sound.addEventListener('ended', release, { once: true });
  sound.addEventListener('error', release, { once: true });
  sound.play().catch(release);
  return sound;
}
