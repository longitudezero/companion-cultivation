# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Prototype 1 — Environmental Sandbox** explores the foundation: Sources changing the conditions of a hexagonal garden. Herbs and Fungi will be added in later prototypes.

## Run locally

```bash
npm install
npm run dev
```

Use the workbench to place configurable Sources, Hex Blockers, and Edge Blockers. Select a Source to switch between **Regular** and **Anchored** (one fixed Property/Condition), and choose **ordinary Propagation** or **Spread Budget Propagation** for each emitted Influence. Ordinary Airborne Sources have a finite Range; **Waterborne Sources reach every connected Flooded hex without a Range limit**, subject to Blockers. Routed emissions have a starting direction, shared crossing budget, and the **Straight Until Blocked** movement rule. Select a routed Source to see its path arrows. Environmental Adjacency also changes Conditions around Flooded, Hot, Freezing, Bright, and Dark hexes; the inspector explains these neighbor adjustments and their Kind/Mode separately. Blockers can selectively interrupt these effects. The garden saves to browser storage automatically; JSON import/export is also available.

**Current garden format:** Three environmental Properties—Moisture, Temperature, and Illumination. Earlier saved gardens are migrated on load. Their remaining Sources, Blockers, and baselines survive; retired Materials, Fertility, and Fertility-only effects are removed. The previous browser save remains untouched under its original storage key.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. It is deterministic and accepts JSON-compatible garden state.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, three Property baselines, objects |
| `migration.js` | Converts older four-Property/material garden files to the current three-Property schema |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `adjacency.js` | Simultaneous, capped neighbor interactions and their inspector explanations |
| `blocking.js` | Shared Hex/Edge blocker matching rules |
| `spread.js` | Deterministic, seeded Spread Budget pathfinding and route segments |
| `simulation.js` | Finite Airborne Range and unlimited connected-Flooded Waterborne propagation, both route types, Modifier aggregation, Anchored Conditions, and final Conditions |
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

- Three Properties per hex: **Moisture, Temperature, Illumination**. There are no permanent ground Materials or Fertility Property.
- Ordinary Conditions are recomputed from Baselines plus active, additive Source Modifiers; anchored Properties override the local result.
- Environmental Adjacency is one simultaneous neighboring-Condition pass, separate from Source Modifiers. Flooded neighbors make Dry hexes Damp; Hot/Freezing and Bright/Dark neighbors shift one step without creating new extremes. Multiple matching neighbors do not stack, and opposing extremes cancel.
- Anchored Sources permanently fix one selected Property and Condition on their occupied hex, while emitting the same configurable Influences as regular Sources. Anchored Flooded hexes count toward Waterborne paths.
- Hex and Edge Blockers stop matching adjacency effects in both directions. A Full Blocker stops every effect; Kind and Mode Blockers use the same matching filters as emitted Influences. A Hex Blocker isolates its hex, while an Edge Blocker interrupts only its shared edge.
- Adjacency tags are **Aqueous / Waterborne** for Flooded → Damp, **Thermal / Airborne** for Hot/Freezing, and **Luminous / Airborne** for Bright/Dark. These tags select blockers only: a Waterborne adjacency effect can still dampen a Dry neighbor, without requiring a Flooded path.
- Cancellation only considers neighbors whose effects can cross the blockers. Blocking one of two opposing extremes can allow the other to change a Condition.
- Airborne travels through unblocked hexes up to its numeric Range; Waterborne has **unlimited reach along connected Flooded hexes**, with no numeric Range. A non-Flooded Source may inject into adjacent Flooded hexes. Both respect matching Blockers.
- Existing saved Waterborne emissions with a numeric Range remain valid; their legacy Range value is ignored. Newly configured Waterborne emissions have no Range slider.
- Spread Budget Propagation is an alternative path system. The player chooses the initial heading; Source-specific rules move and fork thereafter. One shared budget is spent across all branches, and competing branches are chosen reproducibly at random when the budget is insufficient.
- **Straight Until Blocked:** continue through the opposite edge; when obstructed (including by a grid boundary), attempt both adjacent exits. Previously reached hexes cannot be entered again.
- Routed Wetting can modify Dry terrain without pre-existing Flooded connections; its Moisture results are resolved before ordinary Waterborne transmission.
- The first implementation uses open-terrain traversal for routed emissions (represented internally as `airborne` for current selective-blocker compatibility); additional travel media are not yet assigned.
- Blockers can filter by Kind or Mode; an internal edge is stored once and shared by two neighboring hexes.
- One object can occupy a hex. Edges are separate slots.
- Waterborne Influences do **not** modify Moisture under the current resolution order.
- Herbs, Fungi, transformations, balance, and permanent item catalogs are deliberately deferred.
- The future Mycelial overlay is still **design-only**: Flooded hexes will block new colonization **and ongoing source-support paths**. If flooding cuts an existing colony off from Mycelord, the unsupported contribution retreats gradually rather than disappearing instantly.

The sample Sources and Influence strengths in Prototype 1 are configurable test data, not finalized game items.

## Design references

- [Environmental System v1.2](docs/environmental-system-v1.2.md) — authoritative current Prototype 1 foundation with three Properties; v1.1 is preserved as an historical snapshot.
- [Herbs, Fungi & Cultivation Design](docs/herbs-and-fungi-design.md) — separate, **text-only** record of agreed directions, illustrative interactions, open questions, and the proposed independent Mycelial / Enchanted hex overlays. **Not yet implemented.**

