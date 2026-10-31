import { REAL_MILLISECONDS_PER_GAME_HOUR, STAGING_TUNING } from '../core/index.js';

export const SPEEDS = [0, .5, 1, 2];
export const clampZoom = value => Math.max(.15, Math.min(3, value));
export const beginsPan = (button, occupied, control = false) => !control && (button === 1 || (button === 0 && !occupied));
export const inventoryWidthFor = (value, viewport) => Math.max(208, Math.min(value, 720, Math.max(208, viewport - 380)));

export function sampleClock(state, now, speed) {
  const accumulated = state.remainderMs + Math.max(0, now - state.lastMs) * speed;
  const hours = Math.floor((accumulated + 1e-8) / REAL_MILLISECONDS_PER_GAME_HOUR);
  return { lastMs: now, remainderMs: Math.max(0, accumulated - hours * REAL_MILLISECONDS_PER_GAME_HOUR), hours };
}

export function zoomAt(camera, point, proposedZoom) {
  const zoom = clampZoom(proposedZoom);
  return { zoom, x: point.x - (point.x - camera.x) * zoom / camera.zoom,
    y: point.y - (point.y - camera.y) * zoom / camera.zoom };
}

export function fitCamera(world, viewport) {
  const zoom = clampZoom(Math.min((viewport.width - 24) / world.width, (viewport.height - 24) / world.height, 1.5));
  return { zoom, x: (viewport.width - world.width * zoom) / 2, y: (viewport.height - world.height * zoom) / 2 };
}

export function germinationProgress(pending, clockHours, fraction = 0) {
  const duration = STAGING_TUNING.germinationRevealHours;
  return Math.max(0, Math.min(100, (clockHours + fraction - (pending.readyAt - duration)) / duration * 100));
}
