# Companion Cultivation — implementation status

**Verified:** 27 October 2026, against `main` at `ab6f37d` (Woodlands Prototype 08, after PR #10). This is a **runtime and testing ledger**, not a replacement for the approved [game design](design/README.md). When the design pages contain older statements such as “not implemented,” use this ledger for implementation status and the design pages for approved gameplay requirements.

## At a glance

| Measure | Implemented and available for testing | Approved first-pass design | Remaining |
| --- | ---: | ---: | ---: |
| Plant species | **39** | 60 | 21 |
| Fungus species in the playable catalog | **31** | 31 | 0 catalog entries; see provisional mechanics below |
| Plant-owned Transformation routes | **45** | 69 | 24 |
| Plant families with runtime profiles and routes | **4** | 6 | 2 |

The running game is **Prototype 08 — Woodlands**, not Prototype 1. This is a functional mechanics-testing garden, **not** a claim that the six-family game, balance, art or full release experience is complete.

### Family implementation coverage

| Family | Approved Plants | Runtime Plants | Approved routes | Runtime routes | State |
| --- | ---: | ---: | ---: | ---: | --- |
| [Ingredients](design/plants/ingredients.md) | 7 | 7 | 6 | 6 | Implemented and simulation-tested |
| [Flowers](design/plants/flowers.md) | 10 | 10 | 12 | 12 | Implemented and simulation-tested |
| [Aquatic](design/plants/aquatic.md) | 11 | 11 | 14 | 14 | Implemented and simulation-tested |
| [Woodlands](design/plants/woodlands.md) | 11 | 11 | 13 | 13 | Implemented and simulation-tested |
| [Desert](design/plants/desert.md) | 11 | 0 | 13 | 0 | Approved design; next implementation family |
| [Spices](design/plants/spices.md) | 10 | 0 | 11 | 0 | Approved design; implementation pending |
| **Total** | **60** | **39** | **69** | **45** | |

Counts come from the live `PLANTS`, `FUNGI` and `TRANSFORMATIONS` registries in [`src/core/`](../src/core/), cross-checked against the approved family files. They count runnable definitions and registered recipes, **not** a separate end-to-end manual playtest of every possible garden layout.

## What is playable now

- **Hex environment:** Moisture, Temperature and Illumination baselines; configurable ordinary/anchored Sources; additive and routed Spread Budget emissions; blocker-aware finite Airborne and connected-Flooded Waterborne reach; environmental adjacency and inspection. These remain the established [environment rules](design/systems/environment.md).
- **Organisms:** Place any of the 39 registered Plants or 31 registered Fungi directly for debugging. Living Plants advance through Growth (0–100%), Ripening (100–200%) and Mature; Fungi use Growth, Sporulation and Mature. The `+1 hour` and `+1 day` buttons advance the deterministic simulation. Fungi provide separate environmental emissions and cultivation Effects.
- **Farming economy:** Seed/Spore inventories, sowing attempts that spend stock, condition- and Effect-sensitive Growth/outputs, time-based output accrual, recipient compatibility, Seed identities, 3:1 net Allocation, one destructive harvest, Leaves and Spores. Fresh gardens start with 16 each of Potato, Daisydaze, Aquatic Base and Woodlands Base Seeds; these are **prototype starting quantities**. The interface also offers free placement for test setups without spending stock.
- **Mycelial ground:** Timed Mycelord expansion; impassable Flooded support connections; selective blockers, overlapping contributors, unsupported retreat; dependent-Fungus sowing requirements and habitat grace; Mycelord Flooded death. This overlay is playable, though its **durations are still provisional**.
- **Transformations:** Real, blocker-aware Fungal contact and resolved Condition checks; per-Plant uninterrupted clocks, fresh destination Plants, transformation/death exact-time tie handling and inspected recipe progress. Ingredients uses six Potato routes; Flowers, Aquatic and Woodlands include their respective branch recipes and event-sensitive transitions. See the tests listed below.
- **Persistence and UI:** Inspect Plant/Fungus stats and recipe eligibility; resize the garden; automatic browser-local save and version migration; JSON export/import. GitHub Pages publishes from `main` after the build checks pass.

### Important implemented special cases

- **Flowers:** Daisyspell has a preparation → lighting-change window for the Orchidemon route; Flower-specific Seed identity, sterile outcomes, Leaf curves and compatibility are wired.
- **Aquatic:** Moonlit Lotus → Starlotus uses a prepared Flooded-to-Damp event and preserves valid pre-drain Waterborne contact; Starlotus remembers its Damp/Flooded attunement. Kelpergeist has its Flooded-loss event, and Silvercress has separate innate Growth/Leaf behavior.
- **Woodlands:** Mistlefoe can turn into Mandrabra on *losing* Mistruffle after 12–19 qualifying hours while retaining the other contact, or Mistlewoe at 20 hours with both contacts intact. Mandrakadabra has a four-hour continuous Bright death clock; Bramblewraith tolerates ordinarily lethal extremes with penalties. Bamboozled gives **one Bamboo Steel trophy at or after 100% Growth**, not ordinary Leaves or Seeds; its UI harvest action is gated. Mandrakazam yields Mandrakadabra Seeds.

These are summaries for locating code, **not compressed substitutes** for the full approved profile details or timing predicates in the linked family documents.

## Differences, deliberate placeholders and unresolved checks

This list distinguishes **provisional engineering values** from approved design. Do not silently promote the following test settings into balance decisions.

| Area | Current implementation / limitation | Where to verify |
| --- | --- | --- |
| Fungus lifecycle | All 31 Fungus entries can be placed and use their defined emissions/Effects, but their common **96h Growth + 96h Sporulation**, **8 Spores at 200%**, and **25% germination per Spore** are provisional; final species-by-species timing/economy is not approved. | `src/core/biology.js`, `src/core/economy.js`, `src/core/species.js` |
| Mycelial clock tuning | **12h per colonization step**, **12h unsupported retreat per layer**, **48h Mycelord Flooded death** and **48h dependent-habitat grace** are temporary test values, not signed-off balance. The path/support behavior is implemented. | `src/core/mycelial.js` |
| Rate safety floor | Growth/Ripening uses a positive **0.01× minimum** on the combined fungal rate factor to prevent an unapproved permanent stall; the final floor has not been decided. | `src/core/biology.js` |
| Flowers illumination | Ordinary output varies by approved illumination factors; **natural Flower illumination rate multipliers are neutral** because separate rate values were not approved. This is an explicit non-invention choice, not a general claim that light cannot affect their growth through other mechanics. | `src/core/species.js` |
| Starting inventory / free placement | Four starter Seed stacks of **16** are testing conveniences. Direct Plant/Fungus placement bypasses the sowing economy and, for dependent Fungi, the sowing habitat check; actual sowing still enforces its requirements. | `src/core/grid.js`, `src/App.jsx` |
| Unimplemented plant content | **Desert (11 Plants, 13 routes)** and **Spices (10 Plants, 11 routes)** are documented, but have no runtime profiles or recipes yet. Do not infer an implementation from the design pages' complete tables. | `src/core/species.js`, `src/core/transformations.js` |
| Completion claims | Automated tests exercise registered routes and selected physical layouts, interruptions, persistence, economy and special cases. They do **not** establish exhaustive board-layout feasibility, overall numerical balance, complete art/UI polish, or a production-ready game loop. | `tests/`, [historical design audit](design/audit/README.md) |

If a later coding pass encounters a **real divergence from an approved specification**, record the exact species/rule, current behavior, intended source section, and proposed decision here before treating it as approved. The current entries above are known intentional placeholders or scope gaps, **not an assertion that a full line-by-line design-to-code audit has been performed**.

## Verification and source map

At this checkpoint, `npm test` passed **124/124** Node simulation tests. Family-level regression files include `tests/transformations.test.js`, `tests/flowers.test.js`, `tests/aquatic.test.js` and `tests/woodlands.test.js`; `tests/biology.test.js`, `tests/economy.test.js` and `tests/mycelial.test.js` exercise shared rules. A local `npm run check` runs tests, builds the Vite frontend and CommonJS core, and checks the CommonJS smoke test; the deployment workflow uses it before publication.

| Topic | Implementation source |
| --- | --- |
| Garden structure, environmental resolution and propagation | `src/core/grid.js`, `simulation.js`, `adjacency.js`, `influences.js`, `spread.js`, `blocking.js` |
| Organism catalog, family profiles and Fungal definitions | `src/core/species.js`, `aquatic-species.js`, `woodlands-species.js` |
| Time advancement, progression, hazards, fungal effects | `src/core/biology.js`, `cultivation.js`, `mycelial.js` |
| Seeds, Spores, natural and Fungal yields, harvesting | `src/core/economy.js` |
| All registered recipes and family-specific transition events | `src/core/transformations.js`, `flower-transformations.js`, `aquatic-transformations.js`, `woodlands-transformations.js` |
| Save migration, playable controls, inspection | `src/core/migration.js`, `src/App.jsx`, `src/HexGrid.jsx` |

## Documentation update policy from this checkpoint

1. **Every gameplay implementation PR** should update this ledger's counts, coverage, implemented exceptions, provisional decisions and verification result; refresh the current-status sentences in the root [README](../README.md) and [design index](design/README.md).
2. The detailed **approved design pages remain the normative requirements**, even where their original publication-era implementation-status wording is dated. Cite their exact sections for a new mechanic. Do not rewrite or summarize away those specifications while merely updating implementation progress.
3. Keep the [original full design](herbs-and-fungi-design.md), [environment v1.1](environmental-system-v1.1.md), [environment v1.2](environmental-system-v1.2.md), [handoff](conversation-handoff.md), and [historical/archive audits](design/history/README.md) as preservation evidence. A future *actual design change* needs an explicit decision and separate historical accounting, not a quiet code-driven edit to the approved baseline.
4. Prefer reproducible tests and precise caveats. New functionality is **implemented** only when present in the runtime; mark provisional balance, incomplete geometry checks and manual playtesting separately.
