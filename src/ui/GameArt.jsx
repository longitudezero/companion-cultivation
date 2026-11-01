import React from 'react';

// View boxes normalize the visible artwork without cropping or repainting the
// supplied files. The two collections remain shared, unmodified sprite sheets.
export const GAME_ART = {
  titleDecoration: ['title-decoration.webp', 2048, 682, [0, 0, 2048, 682]],
  plus: ['plus.webp', 1254, 1254, [185, 185, 875, 875]],
  minus: ['minus.webp', 1254, 1254, [175, 150, 900, 920]],
  fit: ['fit.webp', 1254, 1254, [185, 185, 875, 875]],
  bag: ['bag.webp', 1254, 1254, [240, 150, 780, 875]],
  bagNumber1: ['number-1.webp', 250, 336, [45, 20, 163, 292]],
  bagNumber2: ['number-2.webp', 250, 336, [20, 20, 215, 292]],
  bagNumber3: ['number-3.webp', 250, 336, [25, 20, 205, 295]],
  bagNumber4: ['number-4.webp', 250, 336, [13, 20, 225, 292]],
  speedPause: ['speed-pause.webp', 1254, 1254, [195, 175, 860, 865]],
  speedHalf: ['speed-half.webp', 1254, 1254, [180, 185, 880, 855]],
  speedNormal: ['speed-normal.webp', 1254, 1254, [190, 185, 870, 875]],
  speedDouble: ['speed-double.webp', 1254, 1254, [180, 170, 880, 875]],
  gold: ['gold.webp', 1254, 1254, [286, 318, 667, 648]],
  seeds: ['seeds.webp', 177, 201, [17, 21, 136, 154]],
  spores: ['spores.webp', 1254, 1254, [255, 196, 752, 862]],
  leaves: ['leaves.webp', 295, 338, [30, 30, 240, 275]],
  warning: ['warning.webp', 358, 332, [45, 5, 265, 270]],
  pin: ['pin.webp', 1254, 1254, [275, 90, 840, 1010]],
  moistureDry: ['moisture-dry.webp', 1254, 1254, [310, 125, 625, 955]],
  moistureDamp: ['moisture-damp.webp', 1254, 1254, [360, 215, 540, 800]],
  moistureFlooded: ['moisture-flooded.webp', 1254, 1254, [280, 105, 690, 1010]],
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
  badgeComplete: ['botanical-badges.png', 1448, 1086, [739, 739, 688, 247]],
  cornerTop: ['gold-corners.png', 1448, 1086, [385, 124, 337, 353]],
  cornerVineTop: ['gold-corners.png', 1448, 1086, [23, 119, 350, 382]],
  cornerFlowerTop: ['gold-corners.png', 1448, 1086, [727, 119, 344, 382]],
  cornerFlowerBottom: ['gold-corners.png', 1448, 1086, [23, 566, 349, 374]],
  cornerGemBottom: ['gold-corners.png', 1448, 1086, [727, 573, 344, 371]],
  cornerFiligreeBottom: ['gold-corners.png', 1448, 1086, [1084, 570, 343, 375]],
};

export const CONDITION_ART = {
  Moisture: { Dry: 'moistureDry', Damp: 'moistureDamp', Flooded: 'moistureFlooded' },
  Temperature: { Freezing: 'temperatureFreezing', Cold: 'temperatureCold', Temperate: 'temperatureTemperate', Warm: 'temperatureWarm', Hot: 'temperatureHot' },
  Illumination: { Dark: 'lightDark', Dim: 'lightDim', Lit: 'lightLit', Bright: 'lightBright' },
};

export default function GameArt({ name, className = '', stretch = false, x, y, width, height }) {
  const [file, sourceWidth, sourceHeight, box] = GAME_ART[name];
  return <svg className={`game-art ${className}`} x={x} y={y} width={width} height={height} viewBox={box.join(' ')} preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
    aria-hidden="true" focusable="false"><image href={`${import.meta.env?.BASE_URL || '/'}ui/${file}`} width={sourceWidth} height={sourceHeight}/></svg>;
}

export function CornerOrnaments({ leftOnly = false }) {
  return <div className="corner-ornaments" aria-hidden="true">
    <GameArt name={leftOnly ? 'cornerVineTop' : 'cornerTop'} className="ornament ornament-tl"/>
    <GameArt name={leftOnly ? 'cornerFlowerBottom' : 'cornerGemBottom'} className={`ornament ornament-bl${leftOnly ? '' : ' ornament-mirrored'}`}/>
    {!leftOnly && <><GameArt name="cornerFlowerTop" className="ornament ornament-tr"/><GameArt name="cornerFiligreeBottom" className="ornament ornament-br"/></>}
  </div>;
}

export function TaskBadge({ children }) {
  return <span className="task-type-badge"><GameArt name="badgeLeaf" stretch/><span>{children}</span></span>;
}
