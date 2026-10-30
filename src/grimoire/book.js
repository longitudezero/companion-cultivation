import { PLANTS, FUNGI } from '../core/species.js';
import { plantKnown } from '../core/grimoire.js';
import { TRANSFORMATIONS } from '../core/transformations.js';
import { recipeReferencesFungus } from '../core/grimoire-preview.js';

export const CHAPTERS = Object.freeze([
  { key: 'Ingredients', symbol: '❧' }, { key: 'Flowers', symbol: '✿' },
  { key: 'Aquatic', symbol: '≋' }, { key: 'Woodlands', symbol: '♣' },
  { key: 'Desert', symbol: '✧' }, { key: 'Spices', symbol: '✳' },
  { key: 'Fungi', symbol: '♧' }, { key: 'Index', symbol: '❦' },
].map(chapter => Object.freeze({ ...chapter, label: chapter.key, art: chapter.key.toLowerCase() })));

const RUNES = [...'ᚨᛒᛞᛖᚷᚺᛚᛗᛟᛈᚱᛊᛏᚢᚹᚲᛁᚴᚬᛋᛆᛓᚽᛙᛑᛔᚡᛍᚤᚪᚳᚻᛄ'];
export function runeName(identity) {
  if (identity === 'Mandrabra') return 'ᚱᛊᛏᚹᚲᛊ';
  let hash = 2166136261;
  for (const character of `grimoire-runes-v1:${identity}`) hash = Math.imul(hash ^ character.codePointAt(0), 16777619) >>> 0;
  const length = 6 + hash % 3;
  let name = '';
  for (let i = 0; i < length; i++) {
    hash ^= hash << 13; hash ^= hash >>> 17; hash ^= hash << 5;
    name += RUNES[(hash >>> 0) % RUNES.length];
  }
  return name;
}

// Ordering depends on the catalogue, never on what a garden has discovered.
export const BOOK_ENTRIES = Object.freeze(CHAPTERS.flatMap((chapter, index) => {
  if (index === 7) return [{ key: 'index', chapter: index, kind: 'index' }];
  const species = index === 6 ? Object.keys(FUNGI)
    : Object.keys(PLANTS).filter(name => PLANTS[name].family === chapter.key);
  return [{ key: `family:${chapter.key}`, chapter: index, kind: 'overview' }, ...species.map(name => ({
    key: `${index === 6 ? 'fungus' : 'plant'}:${name}`, chapter: index,
    kind: index === 6 ? 'fungus' : 'plant', species: name,
  }))];
}).map((entry, index) => Object.freeze({ ...entry, index, page: index * 2 + 1 })));

export function entryKnown(entry, ledger, preview = false) {
  return entry.kind !== 'plant' || preview || plantKnown(ledger, entry.species);
}
export function entryName(entry, ledger, preview = false) {
  if (entry.kind === 'index') return 'Cultivation Grimoire';
  if (entry.kind === 'overview') return CHAPTERS[entry.chapter].label;
  return entryKnown(entry, ledger, preview) ? entry.species : runeName(entry.species);
}
export const tabIsLeft = (chapter, entry) => chapter <= entry.chapter;

export function observedEffects(ledger, species, fungal = false) {
  return Object.entries(ledger?.fungalEffects || {}).flatMap(([plant, facts]) => {
    if (!plantKnown(ledger, plant) || (!fungal && plant !== species)) return [];
    return Object.values(facts).filter(fact => FUNGI[fact.fungus]
      && !fact.kind.startsWith('environment:') && (!fungal || fact.fungus === species))
      .map(fact => ({ ...fact, plant }));
  });
}

export function observedTransformations(ledger, species, fungal = false) {
  return (ledger?.transformations || []).filter(record => {
    if (!plantKnown(ledger, record.from) || !plantKnown(ledger, record.into)) return false;
    if (!fungal) return record.from === species || record.into === species;
    return record.fungi?.includes(species) && (TRANSFORMATIONS[record.from] || [])
      .some(recipe => recipe.into === record.into && recipeReferencesFungus(recipe, species));
  });
}

export function atlasGraph(chapter) {
  const entries = BOOK_ENTRIES.filter(entry => entry.chapter === chapter && entry.kind === 'plant');
  const names = new Set(entries.map(entry => entry.species));
  const edges = [], pairs = new Set();
  for (const entry of entries) for (const recipe of TRANSFORMATIONS[entry.species] || []) {
    const pair = `${entry.species}\0${recipe.into}`;
    if (names.has(recipe.into) && !pairs.has(pair)) {
      pairs.add(pair); edges.push({ from: entry.key, into: `plant:${recipe.into}` });
    }
  }
  // Shortest directed depth keeps recovery edges and cycles from expanding forever.
  const depth = new Map();
  if (entries.length) depth.set(entries[0].key, 0);
  const queue = entries.length ? [entries[0].key] : [];
  for (let i = 0; i < queue.length; i++) for (const edge of edges.filter(edge => edge.from === queue[i])) {
    if (!depth.has(edge.into)) { depth.set(edge.into, depth.get(edge.from) + 1); queue.push(edge.into); }
  }
  let nextDepth = depth.size ? Math.max(...depth.values()) + 1 : 0;
  for (const entry of entries) if (!depth.has(entry.key)) depth.set(entry.key, nextDepth++);
  return { entries, edges, depth };
}

export function atlasLayout(chapter, availableWidth = 384) {
  const graph = atlasGraph(chapter);
  const depthLevels = Array.from({ length: Math.max(0, ...graph.depth.values()) + 1 }, () => []);
  for (const entry of graph.entries) depthLevels[graph.depth.get(entry.key)].push(entry);
  const columnLimit = Math.max(1, Math.min(3, Math.floor((availableWidth - 8) / 136)));
  const levels = depthLevels.flatMap(level => Array.from({ length: Math.ceil(level.length / columnLimit) },
    (_, index) => level.slice(index * columnLimit, (index + 1) * columnLimit)));
  const columns = Math.max(1, ...levels.map(level => level.length));
  const nodeWidth = Math.max(112, Math.min(152, (availableWidth - 32 - (columns - 1) * 24) / columns));
  const width = Math.max(availableWidth, 32 + columns * nodeWidth + (columns - 1) * 24);
  const nodes = levels.flatMap((level, row) => level.map((entry, column) => ({ ...entry,
    x: (width - level.length * nodeWidth - (level.length - 1) * 24) / 2 + column * (nodeWidth + 24),
    y: 18 + row * 100, width: nodeWidth, height: 66, row,
  })));
  const byKey = new Map(nodes.map(node => [node.key, node]));
  const edges = graph.edges.map((edge, index) => {
    const from = byKey.get(edge.from), into = byKey.get(edge.into);
    const x = from.x + nodeWidth / 2, y = from.y + from.height;
    const toX = into.x + nodeWidth / 2, toY = into.y;
    const middle = (y + toY) / 2;
    const lane = index % 2 ? 6 : width - 6;
    const path = into.row === from.row + 1
      ? `M${x},${y} C${x},${middle} ${toX},${middle} ${toX},${toY - 3}`
      : `M${x},${y} V${y + 12} H${lane} V${toY - 12} H${toX} V${toY - 3}`;
    return { ...edge, path };
  });
  return { nodes, edges, width, height: Math.max(180, levels.length * 100 + 8) };
}

export const turnDuration = distance => distance === 1 ? 820 : Math.max(35, Math.min(300, Math.round(1600 / distance)));
export const initialNavigation = { current: 0, target: 0, turn: null, serial: 0, duration: 820 };
export function bookNavigation(state, action) {
  if (action.type === 'navigate') {
    if (state.turn || state.current !== state.target || !Number.isInteger(action.to)
      || action.to < 0 || action.to >= BOOK_ENTRIES.length || action.to === state.current) return state;
    return { ...state, target: action.to, current: action.reduced ? action.to : state.current,
      duration: turnDuration(Math.abs(action.to - state.current)) };
  }
  if (action.type === 'begin' && !state.turn && state.current !== state.target) {
    return { ...state, serial: state.serial + 1, turn: { id: state.serial + 1,
      from: state.current, to: state.current + Math.sign(state.target - state.current),
      ledger: action.ledger, preview: action.preview } };
  }
  if (action.type === 'finish' && state.turn && state.turn.id === action.id) return { ...state, current: state.turn.to, turn: null };
  if (action.type === 'settle') return { ...state, current: state.target, turn: null };
  return state;
}

// Only the page underneath the turning leaf changes before the turn finishes.
export function stationaryPages(current, turn) {
  return turn ? (turn.to > turn.from ? { left: current, right: turn.to } : { left: turn.to, right: current })
    : { left: current, right: current };
}
