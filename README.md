# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Current playable build: Prototype 12 — Player/developer UI separation.** The hex-garden includes **all 60 approved first-pass Plants across six families, all 31 catalogued Fungi, a timed Mycelial overlay, a sowing/harvesting economy, and all 69 specified Plant-owned Transformation routes**. **Each Plant produces its own distinct Leaves on harvest**, never a shared interchangeable currency, following the [explicit design correction](docs/design/decisions/species-specific-leaves.md). A top-bar toggle now separates normal sowing and harvesting actions from unrestricted debug controls. This completes the **first-pass roster implementation**, not final gameplay balance, testing of every board geometry or a finished game. For the precise boundary between runnable code, provisional tuning and planned work, see the [implementation-status ledger](docs/implementation-status.md).

**[Play the current game on GitHub Pages](https://longitudezero.github.io/companion-cultivation/)** — a mechanics-testing prototype with an optional developer toolset, not a balanced or content-complete release.

## Run locally

```bash
npm install
npm run dev
```

By default the workbench shows **Inspect**, **Sow Seeds** and **Sow Spores**, alongside inventory and harvesting. Sowing spends owned stock on germination attempts. To freely spawn test Plants/Fungi or manipulate the environment, click **Display developer tools** beside the logo; click **Hide developer tools** to return to the player-facing view. Time skips are also developer-only for now: the prototype does **not** yet run an automatic clock. Inspect Growth, environmental hazards, fungal contacts and Transformation timers, then harvest an organism once for its accumulated **species-specific Leaves**, Seeds or Spores. Potato yields *Potato Leaves*; Ghost Rice yields *Ghost Rice Leaves* even though it makes *Moonrice Seeds*. Some species have special Seed identities or outcomes, such as Woodlands' Bamboo Steel trophy, Desert's two-Seed Mirage Rose harvest and Spices' Starberry/Sunrice/Moonrice cross-species Seed farming. Start with Potato, Daisydaze, Aquatic Base, Woodlands Base, Jadeheart or Thymely Seeds, or enable developer mode to place any registered organism for testing. See [the complete player/developer control split](docs/developer-tools.md).

The developer workbench remains available behind the toggle: place configurable Sources, Hex Blockers and Edge Blockers. **Player-placeable Blockers await a separate design decision.** Sources can be **Regular** or **Anchored** (one fixed Property/Condition) and use **ordinary Propagation** or **Spread Budget Propagation**. Ordinary Airborne Sources have a finite Range; **Waterborne Sources reach every connected Flooded hex without a Range limit**, subject to Blockers. Routed emissions have a heading, shared crossing budget and **Straight Until Blocked** movement; select a route to see its arrows. Environmental Adjacency changes Conditions around Flooded, Hot, Freezing, Bright and Dark hexes. The inspector shows source and adjacency effects, with selective Blockers. The garden automatically saves to browser storage; developer mode also exposes JSON import/export.

**Current garden format (schema 3):** Three environmental Properties—Moisture, Temperature, and Illumination—plus living organisms, progress and exposure clocks, **Plant-keyed Leaf inventory**, Seed and Spore inventory, and independent Mycelial contributions. Earlier saved gardens are migrated on load; Sources, Blockers and baselines survive, while retired Materials, Fertility and Fertility-only effects are removed. Existing old pooled Leaves cannot be attributed to a species and are preserved separately as **Legacy · unattributed Leaves**, without being assigned an invented species. The previous browser save remains untouched under its original storage key. Later migration steps preserve earned inventory and add missing family starter Seeds without replenishing explicitly spent stocks.

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
| `species.js`, `aquatic-species.js`, `woodlands-species.js`, `desert-species.js` | Playable Plant profiles, 31 Fungus definitions, factory functions and recipient compatibility |
| `biology.js`, `cultivation.js` | Simulated hours, growth, hazards and Fungus-to-Plant Effects with real footprints |
| `economy.js` | Growing/harvesting distinct per-Plant Leaves, Seeds and Spores; germination, Allocation and trophy inventory |
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

`npm test` runs the simulation and UI-tool classification tests (169 passing at the Prototype 12 checkpoint). `npm run check` runs these tests, builds the static frontend and CommonJS bundle, then checks loading through `require()`.

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
- Every Plant harvest credits **only that Plant's own Leaf item** into a species-keyed inventory, independent of which Seed species it produces. A single Plant's approved 3:1 Leaf–Seed Allocation changes quantities but never the Leaf item identity. Old pooled balances retain their value as explicitly unattributed legacy stock, not a general-purpose currency.
- All 60 living Plants, all 31 Fungal definitions, all six families' **69 Plant-owned Transformations** and the Mycelial overlay **are implemented**. Special events include Desert's Hot→Warm/Freezing→Cold recoveries and dual-species Seed harvest, plus Spices' source-overlap Pum'king recipes and Dark→Lit Ghost Rice sequence. Final fungal lifecycle tuning, overall balancing, art/UI polish and permanent item catalogs remain open.
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
| Player-facing buttons vs developer-only test controls | [Player/developer UI separation](docs/developer-tools.md) |
| Environment, Sources, propagation and Blockers | [Environmental v1.2 rules](docs/design/systems/environment.md) · [Influences](docs/design/systems/influences-and-responses.md) |
| Plant and Fungus progression, outputs and harvesting | [Plant-specific Leaf items](docs/design/decisions/species-specific-leaves.md) · [Plant lifecycle](docs/design/systems/plant-lifecycle.md) · [Fungus lifecycle](docs/design/systems/fungus-lifecycle.md) · [Seeds/Spores/harvesting](docs/design/systems/seeds-spores-and-harvesting.md) |
| Mycelial spread, support and survival | [Mycelial system](docs/design/systems/mycelial.md) |
| Six Plant families and approved individual profiles | [Plant-family index](docs/design/README.md#plant-families) |
| Complete first-pass fungal roster | [Fungi index](docs/design/fungi/README.md) · [Emission/propagation matrix](docs/design/fungi/roster-matrix.md) |
| Transformation recipes and shared timing | [Shared rules](docs/design/systems/transformations.md) · [Event order](docs/design/systems/simulation-and-time.md) |
| Superseded concepts, original sources and comparisons | [Leaf-identity correction history](docs/design/history/2026-10-27-leaf-identity-correction.md) · [Historical references](docs/design/history/README.md) · [Documentation audit](docs/design/audit/README.md) |

The original comprehensive design documents remain at their existing paths, unmodified, for side-by-side comparison. The [documentation promotion report](docs/design/audit/promotion-verification.md) explains what was checked and what belongs to later game-design/playtesting work.
