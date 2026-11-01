import React from 'react';

// View boxes normalize the visible artwork without cropping or repainting the
// supplied files. The two collections remain shared, unmodified sprite sheets.
export const GAME_ART = {
  gold: ['gold.webp', 1254, 1254, [286, 318, 667, 648]],
  seeds: ['seeds.webp', 177, 201, [17, 21, 136, 154]],
  spores: ['spores.webp', 1254, 1254, [255, 196, 752, 862]],
  hexExpansion: ['hex-expansion.webp', 345, 242, [15, 7, 311, 225]],
  inventoryExpansion: ['inventory-expansion.webp', 1254, 1254, [300, 286, 653, 663]],
  shop: ['shop.webp', 512, 512, [27, 14, 457, 484]],
  taskboard: ['taskboard.webp', 512, 512, [13, 45, 485, 421]],
  lightDark: ['light-dark.webp', 524, 724, [39, 135, 431, 425]],
  lightDim: ['light-dim.webp', 455, 724, [3, 132, 437, 427]],
  lightLit: ['light-lit.webp', 505, 724, [35, 128, 439, 433]],
  lightBright: ['light-bright.webp', 599, 724, [49, 116, 452, 448]],
  temperatureFreezing: ['temperature-freezing.webp', 512, 512, [99, 27, 314, 458]],
  temperatureCold: ['temperature-cold.webp', 512, 512, [78, 27, 356, 458]],
  temperatureTemperate: ['temperature-temperate.webp', 512, 512, [68, 27, 375, 458]],
  temperatureWarm: ['temperature-warm.webp', 512, 512, [67, 27, 377, 458]],
  temperatureHot: ['temperature-hot.webp', 512, 512, [74, 27, 362, 457]],
  badgeBack: ['botanical-badges.png', 1448, 1086, [22, 123, 694, 223]],
  badgeLeaf: ['botanical-badges.png', 1448, 1086, [18, 446, 700, 210]],
  cornerTop: ['gold-corners.png', 1448, 1086, [385, 124, 337, 353]],
  cornerBottom: ['gold-corners.png', 1448, 1086, [385, 580, 340, 360]],
};

export const CONDITION_ART = {
  Temperature: { Freezing: 'temperatureFreezing', Cold: 'temperatureCold', Temperate: 'temperatureTemperate', Warm: 'temperatureWarm', Hot: 'temperatureHot' },
  Illumination: { Dark: 'lightDark', Dim: 'lightDim', Lit: 'lightLit', Bright: 'lightBright' },
};

export default function GameArt({ name, className = '', stretch = false }) {
  const [file, width, height, box] = GAME_ART[name];
  return <svg className={`game-art ${className}`} viewBox={box.join(' ')} preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
    aria-hidden="true" focusable="false"><image href={`${import.meta.env?.BASE_URL || '/'}ui/${file}`} width={width} height={height}/></svg>;
}

export function CornerOrnaments({ leftOnly = false }) {
  return <div className="corner-ornaments" aria-hidden="true">
    <GameArt name="cornerTop" className="ornament ornament-tl"/>
    <GameArt name="cornerBottom" className="ornament ornament-bl"/>
    {!leftOnly && <><GameArt name="cornerTop" className="ornament ornament-tr"/><GameArt name="cornerBottom" className="ornament ornament-br"/></>}
  </div>;
}

export function TaskBadge({ children }) {
  return <span className="task-type-badge"><GameArt name="badgeLeaf" stretch/><span>{children}</span></span>;
}
