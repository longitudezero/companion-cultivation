import { neighborsOf, edgeKey } from './grid.js';
import { isBlocked } from './blocking.js';

export const STARTING_DIRECTIONS = Object.freeze(['E', 'NE', 'NW', 'W', 'SW', 'SE']);
export const MOVEMENT_RULES = Object.freeze([
  { id: 'straight-until-blocked', name: 'Straight Until Blocked' },
]);

// A saved garden revision is part of the seed. Recomputing never rerolls,
// while a blocker or source edit can reroll even if its final layout is identical.
function randomFor(garden, origin, emissionIndex) {
  const input = `${garden.routeNonce || 0}:${origin}:${emissionIndex}`;
  let seed = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    seed = Math.imul(seed ^ input.charCodeAt(i), 16777619);
  }
  seed >>>= 0;
  if (!seed) seed = 1;
  return () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
}

function shuffle(items, random) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/**
 * Resolve one routed emission, spending a single crossing budget across all
 * fronts. Each round advances every eligible front once; oversubscribed moves
 * and collisions are awarded through a reproducible random draw.
 */
export function propagateSpread(garden, origin, influence, emissionIndex = 0) {
  const budget = Math.max(0, Math.round(influence.budget ?? 0));
  if (!garden.hexes[origin]) return { reached: [], segments: [], spent: 0, remaining: budget };
  if (influence.rule !== 'straight-until-blocked') throw new Error(`Unknown Movement Rule: ${influence.rule}`);
  if (!Number.isInteger(influence.heading) || influence.heading < 0 || influence.heading > 5) {
    throw new Error('Starting Direction must be one of six hex directions.');
  }

  const random = randomFor(garden, origin, emissionIndex);
  const visited = new Set([origin]);
  const reached = [{ key: origin, distance: 0 }];
  const segments = [];
  let frontier = [{ key: origin, heading: influence.heading, distance: 0 }];
  let remaining = budget;

  while (remaining > 0 && frontier.length) {
    const proposed = new Map();
    for (const front of frontier) {
      const neighbors = neighborsOf(front.key);
      const canCross = (heading) => {
        const destination = neighbors[heading];
        if (!garden.hexes[destination] || visited.has(destination)) return false;
        if (isBlocked(garden.objects[destination]?.type === 'blocker' ? garden.objects[destination] : null, influence)) return false;
        return !isBlocked(garden.edges[edgeKey(front.key, destination)], influence);
      };
      // A boundary, blocker, or previously reached hex acts as an obstruction.
      // The two immediately adjacent exits are tried only when forward fails.
      const exits = canCross(front.heading)
        ? [front.heading]
        : [(front.heading + 1) % 6, (front.heading + 5) % 6].filter(canCross);
      for (const heading of exits) {
        const destination = neighbors[heading];
        const candidate = { from: front.key, to: destination, heading, distance: front.distance + 1 };
        if (!proposed.has(destination)) proposed.set(destination, []);
        proposed.get(destination).push(candidate);
      }
    }

    // Competing fronts cannot both enter the same new hex. Choose one incoming
    // direction per destination, then distribute the remaining global budget.
    const eligible = [...proposed.values()].map((moves) => moves[Math.floor(random() * moves.length)]);
    shuffle(eligible, random);
    const accepted = eligible.slice(0, remaining);
    frontier = accepted.map(({ from, to, heading, distance }) => {
      visited.add(to);
      reached.push({ key: to, distance });
      segments.push({ from, to, heading });
      return { key: to, heading, distance };
    });
    remaining -= accepted.length;
  }

  return { reached, segments, spent: budget - remaining, remaining };
}
