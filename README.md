# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

**Current playable build: Prototype 14 — Player Save Game and Load Game.** The hex-garden includes **all 60 approved first-pass Plants across six families, all 31 catalogued Fungi, a timed Mycelial overlay, a sowing/harvesting economy, and all 69 specified Plant-owned Transformation routes**. **Each Plant produces its own distinct Leaves on harvest**, never a shared interchangeable currency, following the [explicit design correction](docs/design/decisions/species-specific-leaves.md). A **200-slot spatial inventory**, drag/click-to-stage Seed and Spore quantities, **Apply**, delayed concealed germination and a continuously advancing farm clock are playable. The header now offers **Save Game** and **Load Game** for portable garden backups in addition to browser autosaving. A top-bar toggle still separates unrestricted debug controls from player tools. This is not final balance, exhaustive layout testing or a finished game. See the [implementation-status ledger](docs/implementation-status.md).

**[Play the current game on GitHub Pages](https://longitudezero.github.io/companion-cultivation/)** — a mechanics-testing prototype with an optional developer toolset, not a balanced or content-complete release.

**Now implemented as a first playable pass:** [Spatial inventory and repeatable live staging](docs/design/systems/spatial-inventory-and-staging.md). Inventory has **four collapsible pages of 50 squares**, one unlimited stack per distinct item, saved manual positions, and drag-to-sow with an editable quantity picker. Staging reserves but does not spend Seeds/Spores; **Apply** atomically validates and commits a whole plan. Germination remains visually concealed until its countdown ends. Players can immediately begin another plan, move uncommitted proposals, or drag living organisms into the inventory to harvest. **Existing organisms keep growing and transforming while staging**. The **1 in-game hour per 5 real seconds** and **6-hour concealment** are provisional testing values, not approved final pacing; offline progression and progression items are not yet designed.

**Saving and backups:** The garden still autosaves to this browser's `localStorage` after each update. **Save Game** downloads a timestamped `.ccsave` file containing the complete current garden (including staged placements and pending germination); **Load Game** restores a `.ccsave` or older `.json` file after validation and an explicit replace-current-garden confirmation. The file stays on the player's own computer and can be used in another browser or on another device. **Autosave is not cloud storage**: clearing website data can lose the local copy, so downloadable backups are recommended. See [saving and backups](docs/design/systems/saving-and-backups.md).

## Run locally

```bash
npm install
npm run dev
```

By default the workbench shows **Inspect**, **Sow Seeds** and **Sow Spores**, alongside the four-page inventory and staging bar. Drag a Seed/Spore stack onto an empty hex—or select its stack, then an empty hex—choose the quantity and stage it. Reposition or undo proposals before pressing **Apply**; only Apply spends stock. A `?` marker means germination is pending, whether it secretly succeeded or failed. Drag an existing living Plant/Fungus into the inventory to harvest, or use the inspector's Harvest action. **The farm clock advances automatically, including during staging**; developer-only time skips remain optional testing shortcuts. Use the header's **Save Game** for downloadable backups and **Load Game** to restore one; the nearby indicator reports browser autosaving. To freely spawn test organisms or manipulate the environment, click **Display developer tools** beside the logo; hide it to return to ordinary player controls. Harvest rewards include **species-specific Leaves**, Seeds, Spores and occasional special trophies: Potato yields *Potato Leaves*, while Ghost Rice yields *Ghost Rice Leaves* even though it makes *Moonrice Seeds*. Starting Seed stacks are still prototype stock; Spores can be obtained through Fungus harvest or developer testing, with a future player acquisition route undecided. See [the player/developer control guide](docs/developer-tools.md).

The developer workbench remains available behind the toggle: place configurable Sources, Hex Blockers and Edge Blockers. **Player-placeable Blockers await a separate design decision.** Sources can be **Regular** or **Anchored** (one fixed Property/Condition) and use **ordinary Propagation** or **Spread Budget Propagation**. Ordinary Airborne Sources have a finite Range; **Waterborne Sources reach every connected Flooded hex without a Range limit**, subject to Blockers. Routed emissions have a heading, shared crossing budget and **Straight Until Blocked** movement; select a route to see its arrows. Environmental Adjacency changes Conditions around Flooded, Hot, Freezing, Bright and Dark hexes. The inspector shows source and adjacency effects, with selective Blockers. The garden automatically saves to browser storage; developer mode also exposes JSON import/export.

**Current garden format (schema 4):** Three environmental Properties—Moisture, Temperature, and Illumination—plus living organisms, progress and exposure clocks, **Plant-keyed Leaf inventory**, Seed and Spore inventory, saved inventory slots, uncommitted staging reservations, committed pending germinations and independent Mycelial contributions. Earlier saved gardens are migrated on load; Sources, Blockers and baselines survive, while retired Materials, Fertility and Fertility-only effects are removed. Existing old pooled Leaves cannot be attributed to a species and are preserved as **Legacy · unattributed Leaves**, without being assigned an invented species. The browser now saves to `sandbox:v4`, preserving previous `v1`–`v3` keys for comparison. Migration preserves earned inventory and adds missing family starter Seeds without replenishing explicitly spent stock.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. With an explicit random source supplied to sowing, it is deterministic and accepts JSON-compatible garden state; the React interface supplies browser interaction and persistence separately.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, Property baselines, objects and starter inventory |
| `migration.js` | Converts earlier garden saves, sanitizes organism progress/clocks and preserves inventory/Mycelial state |
| `save-file.js` | Portable versioned `.ccsave` serialization, validation and compatibility with older raw JSON garden exports |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `adjacency.js` | Simultaneous, capped neighbor interactions and their inspector explanations |
| `blocking.js` | Shared Hex/Edge blocker matching rules |
| `spread.js` | Deterministic, seeded Spread Budget pathfinding and route segments |
| `simulation.js` | Finite Airborne Range and unlimited connected-Flooded Waterborne propagation, both route types, Modifier aggregation, Anchored Conditions, and final Conditions |
| `species.js`, `aquatic-species.js`, `woodlands-species.js`, `desert-species.js` | Playable Plant profiles, 31 Fungus definitions, factory functions and recipient compatibility |
| `biology.js`, `cultivation.js` | Simulated hours, growth, hazards and Fungus-to-Plant Effects with real footprints |
| `economy.js` | Growing/harvesting distinct per-Plant Leaves, Seeds and Spores; germination, Allocation and trophy inventory |
| `inventory.js` | 200 persistent slots, four 50-slot pages, species-specific item stacks and saved repositioning |
| `staging.js` | Seed/Spore reservations, atomic Apply, private germination rolls and delayed emergence |
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

`npm test` runs simulation, economy, staged inventory/germination, portable save-file and UI-tool classification tests (182 passing at the Prototype 14 checkpoint). `npm run check` runs these tests, builds the static frontend and CommonJS bundle, then checks loading through `require()`.

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
- An uncommitted staged Seed/Spore reservation is movable and refundable; an applied pending germination occupies its hex, hides the privately resolved outcome for a provisional six hours, and cannot be moved or refunded. The farm clock keeps running through repeated staging phases.
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
| Browser autosave, portable Save Game / Load Game, migration and limitations | [Saving and backups](docs/design/systems/saving-and-backups.md) |
| Planned Cultivation Grimoire, progressive Plant/Fungus discoveries and observed-only recipes | [Approved Grimoire design](docs/design/systems/cultivation-grimoire.md) — **not implemented** |
| Playable 200-slot inventory, staging, Apply and real-time-while-planning behavior | [Spatial inventory and staging specification](docs/design/systems/spatial-inventory-and-staging.md) |
| Environment, Sources, propagation and Blockers | [Environmental v1.2 rules](docs/design/systems/environment.md) · [Influences](docs/design/systems/influences-and-responses.md) |
| Plant and Fungus progression, outputs and harvesting | [Plant-specific Leaf items](docs/design/decisions/species-specific-leaves.md) · [Plant lifecycle](docs/design/systems/plant-lifecycle.md) · [Fungus lifecycle](docs/design/systems/fungus-lifecycle.md) · [Seeds/Spores/harvesting](docs/design/systems/seeds-spores-and-harvesting.md) |
| Mycelial spread, support and survival | [Mycelial system](docs/design/systems/mycelial.md) |
| Six Plant families and approved individual profiles | [Plant-family index](docs/design/README.md#plant-families) |
| Complete first-pass fungal roster | [Fungi index](docs/design/fungi/README.md) · [Emission/propagation matrix](docs/design/fungi/roster-matrix.md) |
| Transformation recipes and shared timing | [Shared rules](docs/design/systems/transformations.md) · [Event order](docs/design/systems/simulation-and-time.md) |
| Superseded concepts, original sources and comparisons | [Leaf-identity correction history](docs/design/history/2026-10-27-leaf-identity-correction.md) · [Historical references](docs/design/history/README.md) · [Documentation audit](docs/design/audit/README.md) |

The original comprehensive design documents remain at their existing paths, unmodified, for side-by-side comparison. The [documentation promotion report](docs/design/audit/promotion-verification.md) explains what was checked and what belongs to later game-design/playtesting work.
