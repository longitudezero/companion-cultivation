const RUNES = Array.from('ᚨᛒᛞᛖᚷᚺᛚᛗᛟᛈᚱᛊᛏᚢᚹᚲ');
const REPEATS = 8;
const SOUND_COUNT = 352;

export const RUNE_DIVIDER_GLYPHS = Array.from({ length: REPEATS }, () => RUNES).flat();

export function runeHoverSound(index, baseUrl = '/') {
  const root = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const soundNumber = ((index % SOUND_COUNT) + SOUND_COUNT) % SOUND_COUNT + 1;
  return `${root}audio/rune-hover/rune_hover_${String(soundNumber).padStart(3, '0')}.ogg`;
}
