import { createGarden, keyAt, setBaseline, placeObject, placeEdgeBlocker } from './grid.js';
import { makeBlocker, makeInfluence, makeSource, makeAnchoredSource } from './influences.js';

export function createDemoGarden() {
  let garden = createGarden(9, 7);
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
    makeInfluence('Brightening', 1, 5, 'waterborne'),
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
