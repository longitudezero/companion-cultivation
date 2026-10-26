export const CONDITIONS = Object.freeze({
  Moisture: Object.freeze(['Dry', 'Damp', 'Flooded']),
  Temperature: Object.freeze(['Freezing', 'Cold', 'Temperate', 'Warm', 'Hot']),
  Illumination: Object.freeze(['Dark', 'Dim', 'Lit', 'Bright']),
});
export const PROPERTIES = Object.freeze(Object.keys(CONDITIONS));
export const DIRECTIONS = Object.freeze([
  [1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1],
]);

export const keyOf = (q, r) => `${q},${r}`;
export function parseKey(key) {
  const [q, r] = key.split(',').map(Number);
  return { q, r };
}
export const keyAt = (column, row) => keyOf(column - Math.floor(row / 2), row);
export const offsetOf = (key) => {
  const { q, r } = parseKey(key);
  return { column: q + Math.floor(r / 2), row: r };
};
export const neighborsOf = (key) => {
  const { q, r } = parseKey(key);
  return DIRECTIONS.map(([dq, dr]) => keyOf(q + dq, r + dr));
};
export const distanceBetween = (a, b) => {
  const one = parseKey(a);
  const two = parseKey(b);
  const dq = one.q - two.q;
  const dr = one.r - two.r;
  return (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
};
export const edgeKey = (a, b) => [a, b].sort().join('|');

export function defaultHex() {
  return {
    baselines: { Moisture: 'Dry', Temperature: 'Temperate', Illumination: 'Dark' },
  };
}

export function createGarden(columns = 9, rows = 7) {
  const hexes = {};
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      hexes[keyAt(column, row)] = defaultHex();
    }
  }
  return { schemaVersion: 2, columns, rows, hexes, objects: {}, edges: {}, routeNonce: 0 };
}

export function resizeGarden(garden, columns, rows) {
  if (!Number.isInteger(columns) || !Number.isInteger(rows) || columns < 3 || rows < 3 || columns > 20 || rows > 20) {
    throw new Error('Garden dimensions must be between 3 and 20.');
  }
  const next = createGarden(columns, rows);
  for (const key of Object.keys(next.hexes)) {
    if (garden.hexes[key]) next.hexes[key] = garden.hexes[key];
    if (garden.objects[key]) next.objects[key] = garden.objects[key];
  }
  for (const [key, value] of Object.entries(garden.edges)) {
    const [a, b] = key.split('|');
    if (next.hexes[a] && next.hexes[b]) next.edges[key] = value;
  }
  next.routeNonce = (garden.routeNonce || 0) + 1;
  return next;
}

export function setBaseline(garden, key, property, condition) {
  if (!garden.hexes[key] || !CONDITIONS[property]?.includes(condition)) throw new Error('Invalid Property or Condition.');
  return {
    ...garden,
    hexes: { ...garden.hexes, [key]: {
      ...garden.hexes[key],
      baselines: { ...garden.hexes[key].baselines, [property]: condition },
    } },
  };
}

export function placeObject(garden, key, object) {
  if (!garden.hexes[key]) throw new Error('Objects require an existing hex.');
  if (garden.objects[key]) throw new Error('This hex already contains an object. Remove it first.');
  if (!['source', 'blocker'].includes(object.type)) throw new Error('Unknown prototype object type.');
  return { ...garden, routeNonce: (garden.routeNonce || 0) + 1, objects: { ...garden.objects, [key]: object } };
}

export function updateObject(garden, key, object) {
  if (!garden.objects[key]) throw new Error('No object to configure on this hex.');
  return { ...garden, routeNonce: (garden.routeNonce || 0) + 1, objects: { ...garden.objects, [key]: object } };
}

export function removeObject(garden, key) {
  if (!garden.objects[key]) return garden;
  const objects = { ...garden.objects };
  delete objects[key];
  return { ...garden, routeNonce: (garden.routeNonce || 0) + 1, objects };
}

export function placeEdgeBlocker(garden, a, b, blocker) {
  if (!garden.hexes[a] || !garden.hexes[b] || distanceBetween(a, b) !== 1) {
    throw new Error('An Edge Blocker requires two adjacent hexes.');
  }
  return { ...garden, routeNonce: (garden.routeNonce || 0) + 1, edges: { ...garden.edges, [edgeKey(a, b)]: blocker } };
}

export function removeEdgeBlocker(garden, a, b) {
  if (!garden.edges[edgeKey(a, b)]) return garden;
  const edges = { ...garden.edges };
  delete edges[edgeKey(a, b)];
  return { ...garden, routeNonce: (garden.routeNonce || 0) + 1, edges };
}

export function isGarden(value) {
  return [1, 2].includes(value?.schemaVersion) && Number.isInteger(value.columns) && Number.isInteger(value.rows)
    && value.hexes && typeof value.hexes === 'object' && value.objects && typeof value.objects === 'object'
    && value.edges && typeof value.edges === 'object';
}
