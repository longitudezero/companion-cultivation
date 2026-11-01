import { offsetOf } from '../core/grid.js';

export const HEX_SIZE = 48;
export const HEX_ROTATION_RADIUS = 68;
const DX = Math.sqrt(3) * HEX_SIZE;
const Y_STEP = 1.5 * HEX_SIZE;
const ORIGIN = 90; // Leaves room for the direction handle at every plot edge.

export const gridDimensions = garden => ({
  width: 2 * ORIGIN + (garden.columns - .5) * DX,
  height: 2 * ORIGIN + (garden.rows - 1) * Y_STEP,
});

export function hexCenter(key) {
  const { column, row } = offsetOf(key);
  const oddRow = ((row % 2) + 2) % 2;
  return { x: ORIGIN + (column + oddRow / 2) * DX, y: ORIGIN + row * Y_STEP };
}

export function hexPolygon({ x, y }, radius = HEX_SIZE) {
  return Array.from({ length: 6 }, (_, index) => {
    const radians = (index * 60 - 30) * Math.PI / 180;
    return `${x + radius * Math.cos(radians)},${y + radius * Math.sin(radians)}`;
  }).join(' ');
}

export const PALETTES = {
  Moisture: { Dry: '#b59b75', Damp: '#729e86', Flooded: '#477eac' },
  Temperature: { Freezing: '#fff5e4', Cold: '#8aa9ba', Temperate: '#7b9a7c', Warm: '#c69a5e', Hot: '#c46e53' },
  Illumination: { Dark: '#49545c', Dim: '#777e83', Lit: '#b9a36e', Bright: '#ddbc6d' },
};
