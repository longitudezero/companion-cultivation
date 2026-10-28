# Companion Cultivation — game design reference

> **Approved first-pass design reference, preserved from the documentation-maintenance milestone.** The game has progressed to **Prototype 15 (Cultivation Grimoire)**: all 60 planned Plants, all 31 Fungi and all 69 approved Plant-owned Transformation routes in the runnable catalog, together with playable Mycelial mechanics. The [implementation-status ledger](../implementation-status.md) distinguishes coverage and provisional tuning from a finished game. The [200-square spatial inventory and live staging](systems/spatial-inventory-and-staging.md), [saving and backups](systems/saving-and-backups.md), and [per-garden Cultivation Grimoire](systems/cultivation-grimoire.md) now have **first-pass implementations**; the latter uses the approved center-hinged book UI and keeps unobserved paths hidden. The [Prototype 15 control guide](../developer-tools.md) separates player discovery from debug recipe inspection; player Blockers and final clock tuning remain undecided. **Later user clarification supersedes earlier universal-Leaf wording:** each Plant yields its [own species-specific Leaf item](decisions/species-specific-leaves.md). Implementation-status claims *inside preserved detailed design pages* may describe earlier checkpoints; consult the live ledger. The [original complete design](../herbs-and-fungi-design.md) remains unchanged for comparison; [history](history/README.md) holds superseded decisions, and [documentation acceptance](audit/promotion-verification.md) records the editorial milestone.

The game is a deterministic hex-garden farming prototype about sustainable **species-specific** non-Seed harvests (working item class **Leaves**), living Plants and Fungi, propagation, timed ecological changes and Plant-owned Transformations.

> **Fungi redesign in progress:** [Second-pass working notebook](fungi/redesign-working.md) and [current V8 propagation roster](fungi/random-roster-v8.md) record twelve existing-name candidates with V7's accepted numeric cultivation strengths, 3 dependent / 4 preferring / 5 independent Mycelial split, one Range and one Budget footprint per Fungus, and five Waterborne cultivation packages (F01, F02, F03, F08, F10). Bounded Waterborne Range/Budget is a documented second-pass rules extension, not current engine behavior. The redesign remains a **working-design draft**, not a live migration. **This does not supersede the playable 31-Fungus roster or the 69 current transformation routes.**

## Current implementation vs approved design

| Area | Status | Entry point |
| --- | --- | --- |
| Hex environment: Moisture, Temperature, Illumination, Sources, Blockers, propagation, adjacency | **Implemented and playable** | [Environmental System](systems/environment.md) |
| Living Plant progression, Seeds, outputs and harvesting | **Implemented for all 60 Plants across six families; Leaves have separate species identities** | [Plant lifecycle](systems/plant-lifecycle.md), [Leaf identity correction](decisions/species-specific-leaves.md), [implementation ledger](../implementation-status.md) |
| Living Fungi and their 31-species roster | **31 catalog species playable**; lifecycle/Spore balance still provisional | [Fungus lifecycle](systems/fungus-lifecycle.md), [roster](fungi/README.md) |
| Mycelial spread, support and retreat | **Implemented**; time/hazard tuning provisional | [Mycelial](systems/mycelial.md) |
| Timed updates, biological effects and output accrual | **Implemented for current organisms**, with explicit provisional knobs | [Simulation and time](systems/simulation-and-time.md), [Seeds and harvesting](systems/seeds-spores-and-harvesting.md) |
| Spatial inventory, repeatable live staging, Apply and delayed germination | **First playable pass implemented**, including saved slots, quantity selector, concealed pending markers and live updates; timing remains provisional | [Inventory and staging specification](systems/spatial-inventory-and-staging.md), [implementation ledger](../implementation-status.md) |
| Browser autosaving and portable player save files | **Implemented**: Save Game `.ccsave`, Load Game with validation and confirmation, older JSON migration and complete staged/pending state | [Saving and backups](systems/saving-and-backups.md), [implementation ledger](../implementation-status.md) |
| Cultivation Grimoire, progressive discoveries and per-garden knowledge | **First-pass implemented in Prototype 15.** Six Base Plants and all Fungi start identified; observed effects and successful recipes survive in the garden save. Book animation and eight bookmarks follow approved V2; illustrations are placeholders | [Cultivation Grimoire design](systems/cultivation-grimoire.md), [implementation ledger](../implementation-status.md) |
| Plant-owned Transformations: six families, 69 designed routes | **All 69 implemented and simulation-tested**, including Spices' opposing-emission and Dark→Lit events | [Transformation rules](systems/transformations.md), [implementation ledger](../implementation-status.md) |

**Authority boundary:** The topical rules and numbers below retain their detailed approved design authority **except where a later explicit user correction supersedes a point**, presently [Plant-specific Leaves](decisions/species-specific-leaves.md). For what currently runs in the game, consult the newer [implementation ledger](../implementation-status.md); the [promotion audit](audit/promotion-verification.md) describes the *historical documentation publication*, not today's code state.

## Systems

- [Approved spatial inventory, repeatable live staging, Apply, delayed hidden germination and drag-to-harvest](systems/spatial-inventory-and-staging.md) — **first playable pass implemented**; see [current scope and limitations](../implementation-status.md)
- [Browser autosave, portable Save Game / Load Game, migrations and safety](systems/saving-and-backups.md)
- [Cultivation Grimoire: Plant/Fungus discovery, observed recipes, bidirectional knowledge, book UI and per-garden saving](systems/cultivation-grimoire.md) — **approved design and playable first pass; illustrations and wording pending**
- [Current Plant-specific Leaf items and inventory rule](decisions/species-specific-leaves.md)
- [Environmental properties, influences and blockers](systems/environment.md)
- [Plant lifecycle and output accrual](systems/plant-lifecycle.md)
- [Fungus lifecycle and habitats](systems/fungus-lifecycle.md)
- [Influences, propagation and responses](systems/influences-and-responses.md)
- [Mycelial overlay](systems/mycelial.md)
- [Transformation rules and exclusivity](systems/transformations.md)
- [Six-step event-resolution order and simulated time](systems/simulation-and-time.md)
- [Seeds, Spores, harvesting and 3:1 Allocation](systems/seeds-spores-and-harvesting.md)

## Plant families

| Family | Detailed profiles, balance and approved recipes | Designed routes | Runtime routes |
| --- | --- | ---: | ---: |
| Woodlands | [Woodlands](plants/woodlands.md) | 13 | 13 |
| Aquatic | [Aquatic](plants/aquatic.md) | 14 | 14 |
| Flowers | [Flowers](plants/flowers.md) | 12 | 12 |
| Desert | [Desert](plants/desert.md) | 13 | 13 |
| Spices | [Spices](plants/spices.md) | 11 | 11 |
| Ingredients | [Ingredients](plants/ingredients.md) | 6 | 6 |
| **Total** | | **69** | **69** |

## Fungi

- [31 approved first-pass species, catalog and detailed profiles](fungi/README.md)
- [31-species emission, range and habitat parameter matrix](fungi/roster-matrix.md)

## Provenance, historical audit and source comparison

- [Historical pooled-Leaf interpretation and explicit correction](history/2026-10-27-leaf-identity-correction.md)
- [Documentation audit index and current release verification](audit/README.md)
- [Historical/superseded decisions](history/superseded-design.md)
- [Original document references](history/README.md)
- [Exact section relocation crosswalk and semantic audit checklist](audit/source-crosswalk.md)
- [Original-versus-new rolling editorial comparison](audit/current-vs-original.md)
- [Known supersession risk watchlist and progress](audit/semantic-risks.md)
- [Fungal parameter-by-parameter audit](audit/fungal-parameter-audit.md)
- [Six-family Plant profile prose audit](audit/plant-profile-prose-audit.md)
- [Direct original-source numerical/table preservation audit](audit/numerical-source-preservation.md)
- [Per-section numeric-source-line ledger](audit/numeric-source-line-ledger.md)
- [Shared-rule semantic precedence and qualitative exceptions audit](audit/semantic-rule-precedence.md)
- [Profile semantic sweep — pass 7: resolved historical Fungi contacts and progress status](audit/profile-semantic-sweep-pass-7.md)
- [Profile semantic sweep — pass 8: resolved first-pass numeric deferrals](audit/profile-semantic-sweep-pass-8.md)
- [Focused species and shared-rule qualitative review — pass 9](audit/species-qualitative-review-pass-9.md)
- [Cross-family hazard and Spices rule reconciliation — pass 10](audit/cross-family-reconciliation-pass-10.md)
- [Staged preservation, source and link-verification checkpoints](audit/verification-results.md)
- [Complete 60-Plant / 31-Fungus species coverage ledger](audit/species-coverage-ledger.md)
- [Final navigation and Fungi authority check — pass 11](audit/final-navigation-and-authority-pass-11.md)
- [Cross-family first-pass status and existing fungal Effects — pass 12](audit/cross-family-status-reconciliation-pass-12.md)
- [Transformation sibling exclusivity and event boundaries — pass 13](audit/transformation-exclusivity-and-event-boundaries-pass-13.md)
- [Historical, superseded root README staging proposal](ROOT-README-DRAFT.md) — **do not paste; the root README index has been updated**
