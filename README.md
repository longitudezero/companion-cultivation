# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Prototype 1 — Environmental Sandbox** explores the foundation: Sources changing the conditions of a hexagonal garden. Herbs and Fungi will be added in later prototypes.

## Run locally

```bash
npm install
npm run dev
```

Use the workbench to place configurable Sources, Hex Blockers, and Edge Blockers. Select a hex to inspect its four environmental Properties, Baselines, contributing Modifiers, and current Conditions. The garden saves to browser storage automatically; JSON import/export is also available.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. It is deterministic and accepts JSON-compatible garden state.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, materials, baselines, objects |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `simulation.js` | Airborne/Waterborne propagation, blocking, Modifier aggregation, Conditions |
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
- Conditions are recomputed from Baselines plus active, additive Modifiers.
- Airborne travels through all unblocked hexes; Waterborne travels only through connected Flooded hexes.
- Blockers can filter by Kind or Mode; an internal edge is stored once and shared by two neighboring hexes.
- One object can occupy a hex. Edges are separate slots.
- Waterborne Influences do **not** modify Moisture under the current resolution order.
- Herbs, Fungi, transformations, balance, and permanent item catalogs are deliberately deferred.

The working game-design source is *Companion Cultivation — Environmental System v1.1*. The sample Sources and Influence strengths in this prototype are configurable test data, not finalized game items.
