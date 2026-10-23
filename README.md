# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Prototype 1 — Environmental Sandbox** explores the foundation: Sources changing the conditions of a hexagonal garden. Herbs and Fungi will be added in later prototypes.

## Run locally

```bash
npm install
npm run dev
```

Use the workbench to place configurable Sources, Hex Blockers, and Edge Blockers. Select a Source to switch between **Regular** and **Anchored** (one fixed Property/Condition), and choose **Propagation · Range** or **Spread Budget Propagation** for each emitted Influence. Routed emissions have a starting direction, shared crossing budget, and the **Straight Until Blocked** movement rule. Select a routed Source to see its path arrows. Environmental Adjacency also changes Conditions around Flooded, Hot, Freezing, Bright, and Dark hexes; the inspector explains these neighbor adjustments separately. The garden saves to browser storage automatically; JSON import/export is also available.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. It is deterministic and accepts JSON-compatible garden state.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, materials, baselines, objects |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `adjacency.js` | Simultaneous, capped neighbor interactions and their inspector explanations |
| `blocking.js` | Shared Hex/Edge blocker matching rules |
| `spread.js` | Deterministic, seeded Spread Budget pathfinding and route segments |
| `simulation.js` | Range-based Airborne/Waterborne propagation, both route types, Modifier aggregation, Anchored Conditions, and final Conditions |
| `demo.js` | Example garden data (not additional game rules) |

The UI imports ES modules directly. For the existing CommonJS RPG backend:

```bash
npm run build:core
```

```js
const cultivation = require('./dist-core/index.cjs');
const garden = cultivation.createGarden(9, 7);
const environment = cultivation.calculateEnvironment(garden);
```

`npm run check` executes simulation tests, builds the static frontend and CommonJS bundle, then checks loading through `require()`.

## Deployment

The GitHub Actions workflow validates and builds the project and deploys `dist/` to GitHub Pages after commits land on `main`. In repository **Settings → Pages**, set the deployment source to **GitHub Actions**. The Vite `base` path is automatically adjusted during Pages builds.

## Rule boundaries

- One permanent Material and four Properties per hex.
- Ordinary Conditions are recomputed from Baselines plus active, additive Source Modifiers; anchored Properties override the local result.
- Environmental Adjacency is one simultaneous neighboring-Condition pass, separate from Source Modifiers. Flooded neighbors make Dry hexes Damp; Hot/Freezing and Bright/Dark neighbors shift one step without creating new extremes. Multiple matching neighbors do not stack, and opposing extremes cancel. Fertility does not interact.
- Anchored Sources permanently fix one selected Property and Condition on their occupied hex, while emitting the same configurable Influences as regular Sources. Anchored Flooded hexes count toward Waterborne paths.
- Adjacency ignores Hex/Edge Blockers in phase one; blocker interaction with adjacency is explicitly deferred.
- Airborne travels through all unblocked hexes; Waterborne travels only through connected Flooded hexes.
- Spread Budget Propagation is an alternative path system. The player chooses the initial heading; Source-specific rules move and fork thereafter. One shared budget is spent across all branches, and competing branches are chosen reproducibly at random when the budget is insufficient.
- **Straight Until Blocked:** continue through the opposite edge; when obstructed (including by a grid boundary), attempt both adjacent exits. Previously reached hexes cannot be entered again.
- Routed Wetting can modify Dry terrain without pre-existing Flooded connections; its Moisture results are resolved before ordinary Waterborne transmission.
- The first implementation uses open-terrain traversal for routed emissions (represented internally as `airborne` for current selective-blocker compatibility); additional travel media are not yet assigned.
- Blockers can filter by Kind or Mode; an internal edge is stored once and shared by two neighboring hexes.
- One object can occupy a hex. Edges are separate slots.
- Waterborne Influences do **not** modify Moisture under the current resolution order.
- Herbs, Fungi, transformations, balance, and permanent item catalogs are deliberately deferred.

The working game-design source is *Companion Cultivation — Environmental System v1.1*, including the later Spread Budget extension notes. The sample Sources and Influence strengths in this prototype are configurable test data, not finalized game items.
