# Companion Cultivation — game design reference

> **Current approved first-pass design documentation.** The environmental sandbox is implemented in Prototype 1; Plant, Fungus, Mycelial and Transformation gameplay are approved in design but not implemented. The [original complete design](../herbs-and-fungi-design.md) and other original specifications remain unchanged for comparison. The [history](history/README.md) records superseded decisions, while [release verification](audit/promotion-verification.md) distinguishes documentation acceptance from deferred gameplay testing.

The game is a deterministic hex-garden environmental sandbox being developed into a farming minigame about sustainable non-Seed harvests (working term **Leaves**), living Plants and Fungi, propagation, timed ecological changes and Plant-owned Transformations.

## Current implementation vs approved design

| Area | Status | Entry point |
| --- | --- | --- |
| Hex environment: Moisture, Temperature, Illumination, Sources, Blockers, propagation, adjacency | **Implemented in Prototype 1** | [Environmental System](systems/environment.md) |
| Living Plant progression and harvesting | **Approved first-pass design; not implemented** | [Plant lifecycle](systems/plant-lifecycle.md) |
| Living Fungi and their 31-species roster | **Approved first-pass design; not implemented** | [Fungus lifecycle](systems/fungus-lifecycle.md), [roster](fungi/README.md) |
| Mycelial spread, support and retreat | **Approved design; not implemented** | [Mycelial](systems/mycelial.md) |
| Timed updates, biological effects and output accrual | **Approved design; not implemented** | [Simulation and time](systems/simulation-and-time.md), [Seeds and harvesting](systems/seeds-spores-and-harvesting.md) |
| Plant-owned Transformations: six families, 69 routes | **Approved first-pass design; not implemented** | [Transformation rules](systems/transformations.md), family references below |

## Systems

- [Environmental properties, influences and blockers](systems/environment.md)
- [Plant lifecycle and output accrual](systems/plant-lifecycle.md)
- [Fungus lifecycle and habitats](systems/fungus-lifecycle.md)
- [Influences, propagation and responses](systems/influences-and-responses.md)
- [Mycelial overlay](systems/mycelial.md)
- [Transformation rules and exclusivity](systems/transformations.md)
- [Six-step event-resolution order and simulated time](systems/simulation-and-time.md)
- [Seeds, Spores, harvesting and 3:1 Allocation](systems/seeds-spores-and-harvesting.md)

## Plant families

| Family | Detailed profiles, balance and approved recipes | First-pass routes |
| --- | --- | ---: |
| Woodlands | [Woodlands](plants/woodlands.md) | 13 |
| Aquatic | [Aquatic](plants/aquatic.md) | 14 |
| Flowers | [Flowers](plants/flowers.md) | 12 |
| Desert | [Desert](plants/desert.md) | 13 |
| Spices | [Spices](plants/spices.md) | 11 |
| Ingredients | [Ingredients](plants/ingredients.md) | 6 |
| **Total** | | **69** |

## Fungi

- [31 approved first-pass species, catalog and detailed profiles](fungi/README.md)
- [31-species emission, range and habitat parameter matrix](fungi/roster-matrix.md)

## Provenance, historical audit and source comparison

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
