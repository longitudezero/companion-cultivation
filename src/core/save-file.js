import { isGarden } from './grid.js';
import { migrateGarden } from './migration.js';
import { calculateEnvironment } from './simulation.js';
import { reconcileTransformationClocks } from './transformations.js';

// The file envelope is separate from the garden schema. Future garden schemas
// can migrate without requiring players to rename or edit their backup files.
export const SAVE_FILE_FORMAT = 'companion-cultivation-save';
export const SAVE_FILE_VERSION = 1;

export function serializeGameSave(garden, savedAt = new Date().toISOString()) {
  if (!isGarden(garden)) throw new Error('Cannot save an invalid garden.');
  return JSON.stringify({ format: SAVE_FILE_FORMAT, fileVersion: SAVE_FILE_VERSION,
    savedAt, garden }, null, 2);
}

export function deserializeGameSave(text) {
  let file;
  try { file = JSON.parse(text); }
  catch { throw new Error('This file is not valid JSON.'); }

  // Only the new V6 garden schema is accepted. Older prototypes use retired
  // Fungi and obsolete contact rules; reject them explicitly without mutating
  // the player's still-available old file or browser-storage key.
  if (file?.format === SAVE_FILE_FORMAT) {
    if (file.fileVersion !== SAVE_FILE_VERSION) {
      throw new Error(`Unsupported save file version: ${file.fileVersion}.`);
    }
    file = file.garden;
  }
  if (!isGarden(file) || file.columns < 3 || file.columns > 20 ||
    file.rows < 3 || file.rows > 20) {
    throw new Error('Incompatible garden save (this 12-Fungus version requires a new V6 garden).');
  }
  // Build a *separate* clean state and validate its environment before the UI
  // asks to replace the current garden. Failed imports leave it untouched.
  const migrated = reconcileTransformationClocks(migrateGarden(file));
  calculateEnvironment(migrated);
  return migrated;
}
