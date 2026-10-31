# Companion Cultivation

Companion Cultivation is a small farming minigame where fungi help your herbs to... grow?

> **Prototype 16 — V8/V9 Fungal redesign with 29 October 2026 plant renames.** The playable roster is **12 ordinary Fungi plus Mycelord**; **67 Transformations** use named-Fungus contact plus resolved Conditions. The two Kelpless flood-loss routes need **no Fungus**: Kelpergeist transforms after **4 real minutes** non-Flooded, Kelpfull after **8 real minutes**; returning to Flooded resets the clock. Each Fungus has an environmental Range/Budget footprint and a separate shared cultivation package; five packages use connected-Flooded Waterborne handoff. **Players choose Spore direction when planting.** Garden schema **V7** preserves old V6 games/backup files through a one-time Plant-name migration; V1–V5 remain incompatible. See [current Plant names](docs/design/decisions/plant-names.md), [V8 roster](docs/design/fungi/random-roster-v8.md), [V9 recipes](docs/design/fungi/random-roster-v9.md), and the [implementation ledger](docs/implementation-status.md).

The V8/V9 roster and recipes are the current authority. Earlier Prototype 15 details are retained only where explicitly identified as historical. See the [documentation map](docs/README.md) for active design, working notes, and the historical archive.

**Current development build: Prototype 16 — Fungal redesign.** All 60 original Plants and 69 V9 Transformation routes are playable with **12 redesigned ordinary Fungi plus Mycelord**. Plants continue to produce their [own species-specific Leaves](docs/design/decisions/species-specific-leaves.md). The timed Mycelial overlay, inventory, staging, hidden germination, live clock, portable saves and Cultivation Grimoire remain. This is a mechanics-testing prototype, not settled numerical balance or finished art/UI content.

**[Play the deployed game on GitHub Pages](https://longitudezero.github.io/companion-cultivation/)** — the current mechanics-testing prototype, deployed from `main`.

**Garden layout:** The top-down garden fills the main workspace, with an illustrated, filterable inventory on the right and a compact parchment inspector below. Apply commits a plan; Undo reverses its last staging edit; Cancel releases the whole uncommitted phase. The 0–200% lifecycle bar marks species-specific Leaf/Seed harvest peaks immediately, including plateaus and multiple peaks. Drag to plant/harvest, or select inventory stock and a target hex to plant. Portraits open the exact species Grimoire page. The fixed-size inventory squares use type colors and upper-right quantities, and support fast hover details and a draggable left boundary; the garden supports pan, zoom and Fit without resizing its hexes. Pause/0.5×/1×/2× beside garden zoom/Fit control the whole simulation. The inspector uses fixed 200 px Environment and 225 px Growth & Harvest sections, paged Influence cards, and a separate Transformation segment only while active. Germination uses an in-bar label, and temporary action notices overlay the garden. The inventory becomes a drawer on narrow screens. See the [working interface design](docs/working/garden-interface-design.md).

**Guild Taskboard:** The icon beside the Grimoire opens the first two guild assignments. Fresh games use a 4 × 4 tutorial with 36 Beanstalk Seeds and 8 Prismorel Spores; existing sandboxes stay intact and can start a tutorial through the board. Fulfilled tasks wait for Complete task before awarding Gold/Spores and showing a reward receipt. Pin objectives above inventory, inspect the guided Carrot Dry timer, and use the board's shared speed controls. Progress and claims persist with the garden. Harvest receipts appear beside inventory in the garden's lower-right corner. Later tasks and the store remain deferred.

**Cultivation Grimoire:** Open the illustrated book in the header. The gilded, thick-page book overlays the garden, with uneven engraved bookmarks, steady fluorescent hover lighting and a Close bookmark tucked behind the paper. Each Plant family opens to a plain entry list and a framed Transformation Atlas. All Plant pages exist from the start: unidentified Plants have fixed rune names, stable page references and an enchanted-seed illustration. Discoveries reveal names consistently throughout the book; conditions, cultivation responses and Transformation requirements remain observed-only. Turn through the outer page margins or keyboard arrows; longer journeys use four nearby spreads, then a final turn directly to the destination, using the faster multi-page rhythm from the HTML prototype while single-page turns stay slower. Effect terms open a shared glossary. Plant pages retain observed responses. Fungi show their base Cultivation Influence immediately; their Transformations list only learned destination Plant names and page links for explicitly named contacts. Border art and page numbers stay fixed around a bounded scrolling text region. **Preview full Grimoire**, behind **Display developer tools**, remains a complete read-only reference. All 60 Plants and 13 Fungi have their supplied illustrations, revealed with the species identity. Unknown Plants retain the enchanted-seed image; species descriptions remain generic. A broad shadow separates the book from the live garden. See [approved Grimoire rules](docs/design/systems/cultivation-grimoire.md) and the [implementation plan](docs/working/grimoire-implementation-plan.md).

**Now implemented as a first playable pass:** [Spatial inventory and repeatable live staging](docs/design/systems/spatial-inventory-and-staging.md). Inventory has **four collapsible pages of 50 squares**, one unlimited stack per distinct Seed/Spore/Leaf/trophy type (temporary Source items are individual non-stacking tiles), saved manual positions, and drag-to-sow with an editable quantity picker. Staging reserves but does not spend Seeds/Spores; **Apply** atomically validates and commits a whole plan. Germination remains visually concealed until its countdown ends. Players can immediately begin another plan, move uncommitted proposals, or drag living organisms into the inventory to harvest. **Existing organisms keep growing and transforming while staging**. The **approved live pace is one simulated garden hour every five real seconds**; timer labels show real-time equivalents (e.g. a 20-hour recipe takes **1m 40s**). Concealed germination currently takes **30 real seconds**, a provisional biological timing value. Offline progression and the item store are not yet designed.

**Temporary Source items (first playable pass):** Twenty-six individual items in seven ordered [working catalog groups](docs/working/temporary-source-items.md) use the existing environmental Source engine. Open developer tools to grant a test item to inventory; the future store and unlock triggers are deferred. Drag an owned item onto a free hex to activate it, to another hex to move it, or back to inventory to pause its remaining time. Deployment frees its inventory square; a full inventory blocks pickup safely. Items expire permanently after 5–8 real minutes of active use at 1×; Pause and the selected speed affect their clocks. Select a placed Budget item to drag its floating six-way rotation handle. Staged Fungi with Budget effects can rotate in the same way until Apply; living Fungi then keep their committed headings. Existing V6 gardens and backups remain compatible.

**Saving and backups:** The garden still autosaves to this browser's `localStorage` after each update. **Save Game** downloads a timestamped `.ccsave` file containing the complete current garden (including staged placements and pending germination); **Load Game** restores a `.ccsave` or older `.json` file after validation and an explicit replace-current-garden confirmation. The file stays on the player's own computer and can be used in another browser or on another device. **Autosave is not cloud storage**: clearing website data can lose the local copy, so downloadable backups are recommended. See [saving and backups](docs/design/systems/saving-and-backups.md).

## Run locally

```bash
npm install
npm run dev
```

By default the workbench shows **Inspect**, **Sow Seeds** and **Sow Spores**, alongside the four-page inventory and staging bar. Drag a Seed/Spore stack onto an empty hex—or select its stack, then an empty hex—choose the quantity and stage it. Reposition or undo proposals before pressing **Apply**; only Apply spends stock. A `?` marker means germination is pending, whether it secretly succeeded or failed. Drag an existing living Plant/Fungus into the inventory to harvest, or use the inspector's Harvest action. **The farm clock advances automatically, including during staging**; developer-only time skips remain optional testing shortcuts. Use the header's **Save Game** for downloadable backups and **Load Game** to restore one; the nearby indicator reports browser autosaving. To freely spawn test organisms or manipulate the environment, click **Display developer tools** beside the logo; hide it to return to ordinary player controls. Harvest rewards include **species-specific Leaves**, Seeds, Spores and occasional special trophies: Beanstalk yields *Beanstalk Leaves*, while Saffrune yields *Saffrune Leaves* even though it makes *Clovely Seeds*. Starting Seed stacks are still prototype stock; Spores can be obtained through Fungus harvest or developer testing, with a future player acquisition route undecided. See [the player/developer control guide](docs/developer-tools.md).

The developer workbench remains available behind the toggle: place configurable Sources, Hex Blockers and Edge Blockers. **Player-placeable Blockers await a separate design decision.** Sources can be **Regular** or **Anchored** (one fixed Property/Condition) and use **ordinary Propagation** or **Spread Budget Propagation**. Ordinary Airborne Sources have a finite Range; **Waterborne Sources reach every connected Flooded hex without a Range limit**, subject to Blockers. Routed emissions have a heading, shared crossing budget and **Straight Until Blocked** movement; select a route to see its arrows. Environmental Adjacency changes Conditions around Flooded, Hot, Freezing, Bright and Dark hexes. The inspector shows source and adjacency effects, with selective Blockers. The garden automatically saves to browser storage; developer mode also exposes JSON import/export.

**Current garden format (schema V7):** Three environmental Properties—Moisture, Temperature, and Illumination—plus living organisms, progress and exposure clocks, **Plant-keyed Leaf inventory**, Seed and Spore inventory, saved inventory slots, staging reservations, pending germinations, Mycelial contributions, Spore headings and **per-garden Grimoire discoveries**. The browser autosaves to the existing `companion-cultivation:sandbox:v6` key. V6 gardens and backups upgrade on load; **V1–V5 remain deliberately unsupported** following the earlier fungal redesign.

## Rules engine

All simulation code lives in `src/core/`. It has no React, DOM, browser-storage, or Node-only dependencies. With an explicit random source supplied to sowing, it is deterministic and accepts JSON-compatible garden state; the React interface supplies browser interaction and persistence separately.

| Module | Responsibility |
| --- | --- |
| `grid.js` | Axial hex coordinates, offset-grid generation, shared edges, Property baselines, objects and starter inventory |
| `migration.js` | Upgrades V6 Plant identifiers to V7 safely and rejects incompatible V1–V5 saves |
| `save-file.js` | Portable `.ccsave` serialization and validation for V6/V7 gardens and raw JSON exports |
| `influences.js` | Environmental Influence definitions, Source and Blocker factories |
| `adjacency.js` | Simultaneous, capped neighbor interactions and their inspector explanations |
| `blocking.js` | Shared Hex/Edge blocker matching rules |
| `spread.js` | Deterministic, seeded Spread Budget pathfinding and route segments |
| `simulation.js` | Finite Airborne Range and unlimited connected-Flooded Waterborne propagation, both route types, Modifier aggregation, Anchored Conditions, and final Conditions |
| `species.js`, `aquatic-species.js`, `woodlands-species.js`, `desert-species.js` | Playable Plant profiles, 12 redesigned Fungi plus Mycelord, factories and recipient compatibility |
| `biology.js`, `cultivation.js` | Simulated hours, growth, hazards and Fungus-to-Plant Effects with real footprints |
| `economy.js` | Growing/harvesting distinct per-Plant Leaves, Seeds and Spores; germination, Allocation and trophy inventory |
| `inventory.js` | 200 persistent slots, four 50-slot pages, species-specific item stacks and saved repositioning |
| `staging.js` | Seed/Spore reservations, atomic Apply, private germination rolls and delayed emergence |
| `grimoire.js` | Per-garden discovery ledger, observation capture and Plant/Fungus views |
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

`npm test` runs simulation, economy, V8/V9 roster and recipe checks, staged inventory/germination, portable save-file, Grimoire observation and UI-tool classification tests. `npm run check` runs these tests, builds the static frontend and CommonJS bundle, then checks loading through `require()`.

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
- All 60 living Plants, 12 redesigned ordinary Fungi plus Mycelord, all six families' **69 V9 Plant-owned Transformations** and the Mycelial overlay **are implemented**. Special events include Desert's Hot→Warm/Freezing→Cold recoveries and dual-species Seed harvest, and Mistlefoe's contact-loss puzzle. Final fungal lifecycle tuning, overall balancing, art/UI polish and permanent item catalogs remain open.
- Mycelial ground is a separate, time-advanced overlay: Flooded hexes block new colonization **and ongoing source-support paths**. If flooding cuts an existing colony off from Mycelord, the unsupported contribution retreats gradually rather than disappearing instantly. Exact growth/retreat and habitat grace durations are **prototype values**.

Configurable Source strengths and the provisional organism/Spore tuning are **sandbox test values**, not finalized game-item balancing. See [implementation details and provisional values](docs/implementation-status.md#differences-deliberate-placeholders-and-unresolved-checks).

## Design references

- [Environmental System v1.2](docs/historical-archive/originals/environmental-system-v1.2.md) — frozen original environmental specification; the [current environmental rules](docs/design/systems/environment.md) are authoritative.
- [Original Herbs, Fungi & Cultivation Design](docs/historical-archive/originals/herbs-and-fungi-design.md) — frozen full-length source preserved for comparison; some early proposals were superseded by later approved decisions. Current gameplay progress is tracked **separately**.

## Game-design documentation

The [current game-design index](docs/design/README.md) is the authoritative entry point for **60 Plants, 12 ordinary Fungi plus Mycelord, and 69 V9 Transformation routes**. The [implementation-status ledger](docs/implementation-status.md) tracks live coverage and provisional values. The [documentation map](docs/README.md) separates approved designs, working proposals and the historical archive.

| Topic | Where to look |
| --- | --- |
| Current implementation coverage, caveats and testing | [Implementation-status ledger](docs/implementation-status.md) · [Design overview](docs/design/README.md) |
| Player-facing buttons vs developer-only test controls | [Player/developer UI separation](docs/developer-tools.md) |
| Browser autosave, portable Save Game / Load Game, migration and limitations | [Saving and backups](docs/design/systems/saving-and-backups.md) |
| Cultivation Grimoire, progressive Plant/Fungus discoveries and observed-only recipes | [Approved Grimoire rules and playable first pass](docs/design/systems/cultivation-grimoire.md) — **implemented, art and advanced wording provisional** |
| Playable 200-slot inventory, staging, Apply and real-time-while-planning behavior | [Spatial inventory and staging specification](docs/design/systems/spatial-inventory-and-staging.md) |
| Environment, Sources, propagation and Blockers | [Environmental v1.2 rules](docs/design/systems/environment.md) · [Influences](docs/design/systems/influences-and-responses.md) |
| Plant and Fungus progression, outputs and harvesting | [Plant-specific Leaf items](docs/design/decisions/species-specific-leaves.md) · [Plant lifecycle](docs/design/systems/plant-lifecycle.md) · [Fungus lifecycle](docs/design/systems/fungus-lifecycle.md) · [Seeds/Spores/harvesting](docs/design/systems/seeds-spores-and-harvesting.md) |
| Mycelial spread, support and survival | [Mycelial system](docs/design/systems/mycelial.md) |
| Six Plant families and approved individual profiles | [Plant-family index](docs/design/README.md#plant-families) |
| Current Fungal roster and Transformation recipes | [Fungi index](docs/design/fungi/README.md) · [V8 roster](docs/design/fungi/random-roster-v8.md) · [V9 recipes](docs/design/fungi/random-roster-v9.md) |
| Transformation recipes and shared timing | [Shared rules](docs/design/systems/transformations.md) · [Event order](docs/design/systems/simulation-and-time.md) |
| Superseded concepts, original sources and comparisons | [Leaf-identity correction history](docs/historical-archive/superseded-design/2026-10-27-leaf-identity-correction.md) · [Historical references](docs/historical-archive/superseded-design/README.md) · [Documentation audit](docs/historical-archive/audits/README.md) |

The original comprehensive design documents are preserved unmodified under [historical-archive/originals](docs/historical-archive/originals/). The [historical promotion report](docs/historical-archive/audits/promotion-verification.md) records earlier documentation checks; it is not a current approval source.
