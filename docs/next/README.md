# Companion Cultivation — reorganized design documentation (DRAFT)

> **This is a preservation-first staging area, not yet the official documentation.** The existing README and every pre-existing document remain unchanged. The [section coverage crosswalk](audit/source-crosswalk.md) and comparison checklist must be completed before replacing any old document or link. This draft carries over full approved source detail first, so some historical status sentences still need editorial separation.

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

## Provenance and migration review

- [Historical/superseded decisions](history/superseded-design.md)
- [Original document references](history/README.md)
- [Exact section relocation crosswalk and semantic audit checklist](audit/source-crosswalk.md)
- [Original-versus-new editorial comparison (pass 2)](audit/current-vs-original.md)
- [Known supersession risk watchlist and progress](audit/semantic-risks.md)
- [Proposed root README update](ROOT-README-DRAFT.md) — **not yet applied**
