import { createGarden, keyAt, setBaseline, setMaterial, placeObject, placeEdgeBlocker } from './grid.js';
import { makeBlocker, makeInfluence, makeSource, makeAnchoredSource } from './influences.js';

export function createDemoGarden() {
  let garden = createGarden(9, 7);
  for (let row = 0; row < garden.rows; row += 1) {
    for (let col = 0; col < garden.columns; col += 1) {
      const key = keyAt(col, row);
      if ((row === 0 && col > 5) || (row === 5 && col < 3)) garden = setMaterial(garden, key, 'Sand');
      if (col > 5 && row > 3) garden = setMaterial(garden, key, 'Clay');
      if (row === 1 && col === 4) garden = setMaterial(garden, key, 'Stone');
    }
  }
  for (const [col, row] of [[2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [4, 4], [5, 4], [6, 4], [3, 2]]) {
    garden = setBaseline(garden, keyAt(col, row), 'Moisture', 'Flooded');
  }
  for (const [col, row] of [[1, 4], [2, 4], [3, 4], [4, 5], [5, 5]]) {
    garden = setBaseline(garden, keyAt(col, row), 'Moisture', 'Damp');
  }
  garden = placeObject(garden, keyAt(1, 1), makeSource([
    makeInfluence('Warming', 1, 3), makeInfluence('Brightening', 1, 2),
  ]));
  garden = placeObject(garden, keyAt(1, 3), makeSource([
    makeInfluence('Enrichment', 2, 5, 'waterborne'),
  ]));
  garden = placeObject(garden, keyAt(6, 1), makeSource([
    makeInfluence('Cooling', 1, 2),
  ]));
  // A fixed-temperature example: its neighbors warm naturally, while its
  // anchored hex remains Hot regardless of the surrounding Conditions.
  garden = placeObject(garden, keyAt(7, 5), makeAnchoredSource('Temperature', 'Hot', []));
  garden = placeObject(garden, keyAt(4, 2), makeBlocker('full'));
  garden = placeEdgeBlocker(garden, keyAt(4, 3), keyAt(5, 3), makeBlocker('mode', 'waterborne'));
  return garden;
}
