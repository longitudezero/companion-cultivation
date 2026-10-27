# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Current playable build: Prototype 08 — Woodlands.** The hex-garden now includes **39 Plants across four families, all 31 catalogued Fungi, a timed Mycelial overlay, a sowing/harvesting economy, and 45 implemented Plant-owned Transformation routes**. The approved first-pass design specifies **60 Plants and 69 routes** across six families; Desert and Spices are next. For the precise boundary between runnable code, provisional tuning and planned work, see the [implementation-status ledger](docs/implementation-status.md).

**[Play the current game on GitHub Pages](https://longitudezero.github.io/companion-cultivation/)** — a mechanics-testing prototype with free placement tools, not a balanced or content-complete release.

## Run locally

```bash
npm install
npm run dev
```

Use **Plant** and **Fungus** to place test organisms freely, or **Sow Seeds** and **Sow Spores** to spend inventory on germination attempts. Advance time by an hour or a day, inspect Growth, environmental hazards, fungal contacts and Transformation timers, then harvest an organism once for its accumulated Leaves, Seeds or Spores. Some species have special Seed identities or outcomes, such as Woodlands' Bamboo Steel trophy. Start with Potato, Daisydaze, Aquatic Base or Woodlands Base Seeds, or choose any implemented species from the free-placement menu.

The environmental workbench remains available: place configurable Sources, Hex Blockers and Edge Blockers. Sources can be **Regular** or **Anchored** (one fixed Property/Condition) and use **ordinary Propagation** or **Spread Budget Propagation**. Ordinary Airborne Sources have a finite Range; **Waterborne Sources reach every connected Flooded hex without a Range limit**, subject to Blockers. Routed emissions have a heading, shared crossing budget and **Straight Until Blocked** movement; select a route to see its arrows. Environmental Adjacency changes Conditions around Flooded, Hot, Freezing, Bright and Dark hexes. The inspector shows source and adjacency effects, with selective Blockers. The garden automatically saves to browser storage; JSON import/export is also available.

**Current garden format:** Three environmental Properties—Moisture, Temperature, and Illumination—plus living organisms, progress and exposure clocks, inventory, and independent Mycelial contributions. Earlier saved gardens are migrated on load; Sources, Blockers and baselines survive, while retired Materials, Fertility and Fertility-only effects are removed. The previous browser save remains untouched under its original storage key. Later migration steps preserve earned inventory and add missing family starter Seeds without replenishing explicitly spent stocks.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. With an explicit random source supplied to sowing, it is deterministic and accepts JSON-compatible garden state; the React interface supplies browser interaction and persistence separately.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, Property baselines, objects and starter inventory |
| `migration.js` | Converts earlier garden saves, sanitizes organism progress/clocks and preserves inventory/Mycelial state |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `adjacency.js` | Simultaneous, capped neighbor interactions and their inspector explanations |
| `blocking.js` | Shared Hex/Edge blocker matching rules |
| `spread.js` | Deterministic, seeded Spread Budget pathfinding and route segments |
| `simulation.js` | Finite Airborne Range and unlimited connected-Flooded Waterborne propagation, both route types, Modifier aggregation, Anchored Conditions, and final Conditions |
| `species.js`, `aquatic-species.js`, `woodlands-species.js` | Playable Plant profiles, 31 Fungus definitions, factory functions and recipient compatibility |
| `biology.js`, `cultivation.js` | Simulated hours, growth, hazards and Fungus-to-Plant Effects with real footprints |
| `economy.js` | Growing/harvesting Leaves, Seeds and Spores; germination, Allocation and trophy inventory |
| `mycelial.js` | Mycelial expansion, support, overlapping sources and retreat |
| `transformations.js`, `*-transformations.js` | Plant-owned recipes, contact checks, uninterrupted clocks and event-based transitions |
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

`npm test` runs the simulation tests (124 passing at the Prototype 08 checkpoint). `npm run check` runs these tests, builds the static frontend and CommonJS bundle, then checks loading through `require()`.

## Deployment

The GitHub Actions workflow validates and builds the project and deploys `dist/` to [GitHub Pages](https://longitudezero.github.io/companion-cultivation/) after commits land on `main`. The Vite `base` path is automatically adjusted during Pages builds.

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
- Living Plants, all 31 Fungal definitions, four of six Plant families' Transformations and the Mycelial overlay **are implemented**. Full Desert/Spices content, final fungal lifecycle tuning, overall balancing and permanent item catalogs are not.
- Mycelial ground is a separate, time-advanced overlay: Flooded hexes block new colonization **and ongoing source-support paths**. If flooding cuts an existing colony off from Mycelord, the unsupported contribution retreats gradually rather than disappearing instantly. Exact growth/retreat and habitat grace durations are **prototype values**.

Configurable Source strengths and the provisional organism/Spore tuning are **sandbox test values**, not finalized game-item balancing. See [implementation details and provisional values](docs/implementation-status.md#differences-deliberate-placeholders-and-unresolved-checks).

## Design references

- [Environmental System v1.2](docs/environmental-system-v1.2.md) — authoritative environmental foundation with three Properties; v1.1 is preserved as a historical snapshot.
- [Original Herbs, Fungi & Cultivation Design](docs/herbs-and-fungi-design.md) — frozen full-length source preserved for comparison; some early proposals were superseded by later approved decisions. Current gameplay progress is tracked **separately**.

## Game-design documentation

The [organized game-design index](docs/design/README.md) is the detailed authoritative reference for **60 approved first-pass Plants, 31 Fungi and 69 Plant-owned Transformation routes**. The [implementation-status ledger](docs/implementation-status.md) records which of those rules are currently coded and tested, what remains pending, and which numerical knobs are deliberately provisional. Status language in the detailed design pages dates from their original publication and is **not** the current release status.

| Topic | Where to look |
| --- | --- |
| Current implementation coverage, caveats and testing | [Implementation-status ledger](docs/implementation-status.md) · [Design overview](docs/design/README.md) |
| Environment, Sources, propagation and Blockers | [Environmental v1.2 rules](docs/design/systems/environment.md) · [Influences](docs/design/systems/influences-and-responses.md) |
| Plant and Fungus progression, outputs and harvesting | [Plant lifecycle](docs/design/systems/plant-lifecycle.md) · [Fungus lifecycle](docs/design/systems/fungus-lifecycle.md) · [Seeds/Spores/harvesting](docs/design/systems/seeds-spores-and-harvesting.md) |
| Mycelial spread, support and survival | [Mycelial system](docs/design/systems/mycelial.md) |
| Six Plant families and approved individual profiles | [Plant-family index](docs/design/README.md#plant-families) |
| Complete first-pass fungal roster | [Fungi index](docs/design/fungi/README.md) · [Emission/propagation matrix](docs/design/fungi/roster-matrix.md) |
| Transformation recipes and shared timing | [Shared rules](docs/design/systems/transformations.md) · [Event order](docs/design/systems/simulation-and-time.md) |
| Superseded concepts, original sources and comparisons | [Historical references](docs/design/history/README.md) · [Documentation audit](docs/design/audit/README.md) |

The original comprehensive design documents remain at their existing paths, unmodified, for side-by-side comparison. The [documentation promotion report](docs/design/audit/promotion-verification.md) explains what was checked and what belongs to later game-design/playtesting work.
