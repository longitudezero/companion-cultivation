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
  // Initial Seed quantity is a sandbox tuning value, not an approved balance decision.
  const starterSeeds = { Potato: 16, Daisydaze: 16, 'Aquatic Base': 16,
    'Woodlands Base': 16, Jadeheart: 16, Thymely: 16 };
  return { schemaVersion: 6, columns, rows, hexes, objects: {}, edges: {}, routeNonce: 0,
    clockHours: 0, colonyNonce: 0, mycelium: { contributions: {} },
    inventorySlots: {}, staged: {}, pending: {},
    grimoire: { plants: Object.fromEntries(Object.keys(starterSeeds).map(species => [species, true])),
      environments: {}, fungalEffects: {}, hazards: {}, transformations: [] },
    inventory: { leaves: {}, legacyLeaves: 0, seeds: starterSeeds, spores: {}, trophies: { bambooSteel: 0 } } };
}

export function resizeGarden(garden, columns, rows) {
  if (!Number.isInteger(columns) || !Number.isInteger(rows) || columns < 3 || rows < 3 || columns > 20 || rows > 20) {
    throw new Error('Garden dimensions must be between 3 and 20.');
  }
  const next = createGarden(columns, rows);
  next.clockHours = garden.clockHours || 0;
  next.colonyNonce = garden.colonyNonce || 0;
  next.inventory = garden.inventory;
  next.grimoire = garden.grimoire;
  next.inventorySlots = garden.inventorySlots || {};
  next.staged = Object.fromEntries(Object.entries(garden.staged || {}).filter(([key]) => next.hexes[key]));
  next.pending = Object.fromEntries(Object.entries(garden.pending || {}).filter(([key]) => next.hexes[key]));
  next.mycelium = { contributions: Object.fromEntries(Object.entries(garden.mycelium?.contributions || {})
    .map(([id, contribution]) => [id, {
      origin: contribution.origin,
      cells: Object.fromEntries(Object.entries(contribution.cells || {}).filter(([key]) => next.hexes[key])),
      frontiers: Object.fromEntries(Object.entries(contribution.frontiers || {}).filter(([key]) => next.hexes[key])),
    }])) };
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
  if (garden.pending?.[key] || garden.staged?.[key]) throw new Error('This hex has a committed or staged planting.');
  if (!['source', 'blocker', 'plant', 'fungus'].includes(object.type)) throw new Error('Unknown prototype object type.');
  const isMycelord = object.type === 'fungus' && object.species === 'Mycelord';
  const colonyNonce = (garden.colonyNonce || 0) + (isMycelord ? 1 : 0);
  const placed = isMycelord ? { ...object, colonyId: `colony:${colonyNonce}` } : object;
  return { ...garden, colonyNonce, routeNonce: (garden.routeNonce || 0) + 1,
    objects: { ...garden.objects, [key]: placed } };
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
  // V8/V9 is a clean-break prototype. Pre-V6 saves refer to retired Fungi,
  // incompatible Transformation clocks and old discoveries; reject them rather
  // than silently convert, delete or mislabel living organisms.
  return value?.schemaVersion === 6 && Number.isInteger(value.columns) && Number.isInteger(value.rows)
    && value.hexes && typeof value.hexes === 'object' && value.objects && typeof value.objects === 'object'
    && value.edges && typeof value.edges === 'object';
}
