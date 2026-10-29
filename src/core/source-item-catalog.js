// First playable catalog. Groups are ordered for future unlock progression;
// until a store exists, developer tools are the only way to grant items.
const entry = (id, name, propertyEffects, propagation, reach, minutes) => Object.freeze({
  id, name, propertyEffects: Object.freeze(propertyEffects.map(([name, strength]) => Object.freeze({ name, strength }))),
  propagation, ...(propagation === 'spread-budget' ? { budget: reach } : { range: reach }),
  durationHours: minutes * 12,
});

export const SOURCE_ITEM_GROUPS = Object.freeze([
  { name: 'Gentle Assistance', items: [
    entry('ember-pebble', 'Ember Pebble', [['Warming', 1]], 'range', 2, 6),
    entry('weeping-statue', 'Weeping Statue', [['Wetting', 1]], 'range', 2, 6),
    entry('firefly-jar', 'Firefly Jar', [['Brightening', 1]], 'range', 2, 6),
  ] },
  { name: 'Emergency Measures', items: [
    entry('frostbell', 'Frostbell', [['Cooling', 1]], 'range', 2, 6),
    entry('thirstmoss-carpet', 'Thirstmoss Carpet', [['Drying', 1]], 'range', 2, 6),
    entry('shadecloth-canopy', 'Shadecloth Canopy', [['Dimming', 1]], 'range', 2, 6),
    entry('torch', 'Torch', [['Warming', 1], ['Brightening', 2]], 'range', 1, 5),
  ] },
  { name: 'Directional Instruments', items: [
    entry('cinder-compass', 'Cinder Compass', [['Warming', 1]], 'spread-budget', 4, 8),
    entry('rainthread-spool', 'Rainthread Spool', [['Wetting', 1]], 'spread-budget', 4, 6),
    entry('sunthread-reel', 'Sunthread Reel', [['Brightening', 1]], 'spread-budget', 4, 6),
    entry('cloudpost', 'Cloudpost', [['Dimming', 1]], 'spread-budget', 4, 8),
  ] },
  { name: 'Concentrated Power', items: [
    entry('hearthbrick', 'Hearthbrick', [['Warming', 2]], 'range', 1, 5),
    entry('overflow-urn', 'Overflow Urn', [['Wetting', 2]], 'range', 1, 5),
    entry('sunburst-lantern', 'Sunburst Lantern', [['Brightening', 2]], 'range', 1, 5),
    entry('warming-stone', 'Warming Stone', [['Warming', 2]], 'spread-budget', 3, 5),
  ] },
  { name: 'Advanced Directional Control', items: [
    entry('tidewheel', 'Tidewheel', [['Wetting', 2]], 'spread-budget', 3, 5),
    entry('prism-beacon', 'Prism Beacon', [['Brightening', 2]], 'spread-budget', 3, 5),
    entry('dustwhistle', 'Dustwhistle', [['Drying', 1]], 'spread-budget', 4, 6),
    entry('northwind-vane', 'Northwind Vane', [['Cooling', 1]], 'spread-budget', 4, 6),
  ] },
  { name: 'Harsh Conditions', items: [
    entry('winterglass-orb', 'Winterglass Orb', [['Cooling', 2]], 'range', 1, 5),
    entry('saltstone-basin', 'Saltstone Basin', [['Drying', 2]], 'range', 1, 5),
    entry('eclipse-bell', 'Eclipse Bell', [['Dimming', 2]], 'range', 1, 5),
    entry('rime-needle', 'Rime Needle', [['Cooling', 2]], 'spread-budget', 3, 5),
  ] },
  { name: 'Unusual Artifacts', items: [
    entry('drought-dial', 'Drought Dial', [['Drying', 2]], 'spread-budget', 3, 5),
    entry('nightglass-needle', 'Nightglass Needle', [['Dimming', 2]], 'spread-budget', 3, 5),
    entry('sandglass-fountain', 'Sandglass Fountain', [['Wetting', 3]], 'spread-budget', 3, 5),
  ] },
].map((group, index) => Object.freeze({ ...group, number: index + 1, items: Object.freeze(group.items) })));

export const SOURCE_ITEMS = Object.freeze(Object.fromEntries(
  SOURCE_ITEM_GROUPS.flatMap(group => group.items.map(item => [item.id, item])),
));
