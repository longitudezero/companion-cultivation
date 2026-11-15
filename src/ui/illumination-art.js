export const ILLUMINATION_ART = Object.freeze({
  Dark: 'illumination-dark.webp',
  Dim: 'illumination-dim.webp',
  Lit: 'illumination-lit.webp',
  Bright: 'illumination-bright.webp',
});

export const illuminationArt = condition =>
  `${import.meta.env?.BASE_URL || '/'}ui/illumination/${ILLUMINATION_ART[condition]}`;
