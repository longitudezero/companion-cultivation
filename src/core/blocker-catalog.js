const designs = [
  ['root-barrier', 'Root Barrier', ['Mycelial']],
  ['windbreak', 'Windbreak', ['Temperature', 'airborne']],
  ['water-gate', 'Water Gate', ['waterborne']],
  ['garden-screen', 'Garden Screen', ['Illumination', 'Moisture']],
  ['stone-wall', 'Stone Wall', ['all']],
  ['insulating-panel', 'Insulating Panel', ['Temperature']],
  ['shade-panel', 'Shade Panel', ['Illumination']],
  ['pond-liner', 'Pond Liner', ['Moisture', 'waterborne']],
  ['climate-divider', 'Climate Divider', ['Moisture', 'Temperature', 'Illumination']],
];

export const BLOCKER_ITEMS = Object.freeze(Object.fromEntries(
  designs.flatMap(([design, name, filters]) => ['edge', 'hex'].map(form => {
    const id = `blocker:${design}:${form}`;
    return [id, Object.freeze({ id, form, name: `${name} (${form === 'edge' ? 'Edge' : 'Hex'})`,
      filters: Object.freeze(filters) })];
  })),
));

export function playerBlockerDefinition(object) {
  if (object?.type === 'blocker' && Object.hasOwn(BLOCKER_ITEMS, object.blockerId)) {
    return BLOCKER_ITEMS[object.blockerId];
  }
  return undefined;
}
