export const art = name => `${import.meta.env?.BASE_URL || '/'}grimoire/${name}.webp`;

// These fixed profiles are shared by the stationary and turning bookmarks.
export const BOOKMARKS = {
  ingredients: { tilt: -3.1, width: 1.05, height: 1.06, y: -4, reach: 3, ink: '#eaffc5', glow: '#aaff69', hue: 45 },
  flowers: { tilt: 2.6, width: .98, height: .94, y: 3, reach: 8, ink: '#fff3c7', glow: '#ffd15c', hue: 0 },
  aquatic: { tilt: -1.8, width: 1.08, height: 1.02, y: -2, reach: 0, ink: '#d9ffff', glow: '#6deeff', hue: 125 },
  woodlands: { tilt: 3.8, width: 1.02, height: 1.10, y: 4, reach: 5, ink: '#e0ffce', glow: '#93ef78', hue: 60 },
  desert: { tilt: -3.6, width: .96, height: .96, y: -3, reach: 11, ink: '#fff4ca', glow: '#ffe274', hue: 0 },
  spices: { tilt: 1.7, width: 1.04, height: 1.12, y: 3, reach: 2, ink: '#f7e4ff', glow: '#dba1ff', hue: 235 },
  fungi: { tilt: -2.5, width: 1.07, height: 1.08, y: -2, reach: 7, ink: '#ffe6d9', glow: '#ff89ae', hue: 295 },
  index: { tilt: 3, width: .98, height: .98, y: 2, reach: 0, ink: '#e4faff', glow: '#9fe6ff', hue: 145 },
};
export function bookmarkStyle(chapter, index) {
  const p = BOOKMARKS[chapter.art], dark = ['fungi', 'woodlands'].includes(chapter.art);
  return { '--tab-art': `url("${art(`tabs/${chapter.art}`)}")`, '--tab-i': index,
    '--tab-tilt': `${p.tilt}deg`, '--tab-width': p.width, '--tab-height': p.height,
    '--tab-offset-y': `${p.y}px`, '--tab-protrusion': `${p.reach}px`,
    '--neon-ink': p.ink, '--neon-color': p.glow, '--neon-hue': `${p.hue}deg`,
    '--mark-ink': dark ? '#d1b598' : '#58412a', '--mark-active': dark ? '#f0d4aa' : '#35230f',
    '--icon-blend': dark ? 'screen' : 'multiply', '--icon-opacity': dark ? .72 : .86,
    '--icon-tone': dark ? 'grayscale(1) sepia(.9) saturate(.55) brightness(1.48) contrast(.85)'
      : 'grayscale(1) sepia(.8) saturate(.65) brightness(.63) contrast(.9)' };
}
