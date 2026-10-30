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

export const DISCOVERY_PHRASES = Object.freeze([
  'Oh, I can’t wait to see what this page is hiding from me. I’d better get to experimenting!',
  'Someone saved a whole page for you. You must be worth meeting.',
  'A few seeds, a little patience, and perhaps a very good story.',
  'I wonder if you’ll be useful, beautiful, or wonderfully inconvenient.',
  'If I listen closely enough, will you tell me what you need?',
  'I have a spare pot and several unreasonably hopeful theories.',
  'There’s a name hiding in these roots. Let’s see if we can coax it out.',
  'I’d better leave room in the margins. You look like a complicated sort.',
  'Perhaps a little light will help. Or perhaps that’s exactly the wrong idea.',
  'I hope this one doesn’t bite. My gloves are mostly decorative.',
  'Something tells me I should label the pot before I forget.',
  'Please be kinder to the neighbours than the last experiment.',
  'I wonder what you’ll become when you think nobody’s watching.',
  'That is a suspiciously innocent-looking seed.',
  'I’ll start with patience. I can always try mild panic later.',
  'A pleasant surprise would be lovely. A manageable surprise would do.',
  'I hope this one doesn’t stink. The garden has enough mysteries already.',
  'If you start whispering, I’m fetching another notebook.',
  'I should probably keep this one away from the good tablecloth.',
  'One small experiment. What could possibly grow wrong?',
]);

export function discoveryPhrase(identity, ledger) {
  let hash = 1;
  for (const character of identity) hash = (Math.imul(hash, 31) + character.codePointAt(0)) >>> 0;
  const index = hash % DISCOVERY_PHRASES.length;
  // Named anecdotes must not identify a Plant the player has yet to meet.
  return index === 16 && plantKnown(ledger, 'Kelpergeist')
    ? 'I hope this one doesn’t stink like the Kelpergeist.' : DISCOVERY_PHRASES[index];
}

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
  const byKey = new Map(graph.entries.map(entry => [entry.key, entry]));
  const outgoing = key => graph.edges.filter(edge => edge.from === key);
  const visited = new Set(), primaryParent = new Map(), roots = [];
  // Expand each identity once, at its shortest path from a family root. Other
  // incoming edges end at a repeated, clickable page reference, including cycles.
  for (const entry of graph.entries) {
    if (visited.has(entry.key)) continue;
    roots.push(entry.key); visited.add(entry.key);
    const queue = [entry.key];
    for (let i = 0; i < queue.length; i++) for (const edge of outgoing(queue[i])) {
      if (visited.has(edge.into)) continue;
      primaryParent.set(edge.into, edge.from); visited.add(edge.into); queue.push(edge.into);
    }
  }
  const nodeWidth = 144, gap = 24, rowHeight = 114, inset = 18;
  function branch(key, from = null) {
    const reference = from !== null && primaryParent.get(key) !== from;
    const children = reference ? [] : outgoing(key).map(edge => branch(edge.into, key));
    return { ...byKey.get(key), id: reference ? `${from}=>${key}` : key, reference, children,
      span: Math.max(nodeWidth, children.reduce((sum, child) => sum + child.span, 0) + Math.max(0, children.length - 1) * gap) };
  }
  const trees = roots.map(key => branch(key));
  const span = trees.reduce((sum, tree) => sum + tree.span, 0) + Math.max(0, trees.length - 1) * gap;
  const width = Math.max(availableWidth, span + inset * 2), nodes = [], edges = [];
  function place(tree, start, row, parent = null) {
    const node = { ...tree, x: start + (tree.span - nodeWidth) / 2, y: 18 + row * rowHeight,
      width: nodeWidth, height: 68, row };
    delete node.children; delete node.span;
    nodes.push(node);
    if (parent) {
      const x = parent.x + nodeWidth / 2, y = parent.y + parent.height;
      const toX = node.x + nodeWidth / 2, toY = node.y - 4, middle = (y + toY) / 2;
      edges.push({ from: parent.key, into: node.key, sourceId: parent.id, targetId: node.id,
        path: `M${x},${y} C${x},${middle} ${toX},${middle} ${toX},${toY}` });
    }
    let next = start;
    for (const child of tree.children) { place(child, next, row + 1, node); next += child.span + gap; }
  }
  let start = (width - span) / 2;
  for (const tree of trees) { place(tree, start, 0); start += tree.span + gap; }
  return { nodes, edges, width, height: Math.max(180, ...nodes.map(node => node.y + node.height + 16)) };
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
      ledger: action.ledger, preview: action.preview, outgoingScroll: action.outgoingScroll || 0 } };
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

// A leaf carries two different printed pages. Both are mounted before rotation.
export function turningPages(turn) {
  const forward = turn.to > turn.from;
  return { front: { index: turn.from, side: forward ? 'right' : 'left' },
    back: { index: turn.to, side: forward ? 'left' : 'right' } };
}
