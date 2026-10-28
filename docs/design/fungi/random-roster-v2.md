# Randomized fungal roster — V2 coverage-first redistribution

> **Status: WORKING EXPERIMENT — NOT APPROVED OR PLAYABLE.** This is a controlled four-slot revision of the [V1 full roster](random-roster-v1.md), itself derived from the [untouched V0 random draw](random-roster-v0.md). **Mycelord is unchanged.** Twelve ordinary Fungi remain visible; the count is experimental, not final.

## Why V2 exists

The user refined the order of operations: **first inspect which effects are missing or appear only once**, then use those gaps when replacing overlapping same-outcome abilities, and **only afterward** evaluate multi-Fungus Leaf and Seed strategies. Do not finalize one Fungus in isolation.

V1 had 28 cultivation slots drawn from an experimental catalogue of 20 effect types. **The sole missing type was − Seed Yield.** Thirteen types appeared once. **+ Leaf Yield, + Hourly Leaves and − Ripening Rate appeared three times each.** Critically, F04 and F05 each had two distinct positive routes to more Leaves, while F10 bundled two routes to more Seeds.

## Exactly four V1 → V2 slot changes

| Fungus | Remove | Add | Why this replacement was chosen |
| --- | --- | --- | --- |
| **F04** | + Hourly Leaves | **Seed timing later** | + Hourly Leaves already existed twice elsewhere; retain F04 as the unique Seeds→Leaves Source while creating a possible timing cost to accumulating convertible Seeds. |
| **F05** | + Leaf Yield | **Leaf peak earlier** | + Leaf Yield was triplicated. Retain the hourly-Leaf method while potentially forcing a choice between earlier natural Leaves and later hourly collection. The earlier draft alternative of **Seed timing earlier** was rejected before saving V2: it could directly cancel F04's new later Seed timing in the same Leaf plan. |
| **F10** | + Hourly Seeds | **− Seed Yield** | Move away from packaging two positive Seed methods in one Fungus. This fills the only missing experimental effect category, while leaving Leaves→Seeds Allocation as F10's positive Seed method. |
| **F12** | + Seed Yield | **+ Hourly Seeds** | Preserve the unique hourly-Seed method after removing it from F10. F03 still supplies + ordinary Seed Yield, so both distinct Seed methods remain available on different Fungi. |

**No other cultivation slot or environmental emission changed.** Eight ordinary Fungi are unchanged in V2; four have one revised slot each.

## Full V2 roster — no hidden or omitted Fungi

| ID | Environmental emission | Cultivation effects | Change |
| --- | --- | --- | --- |
| **F01** | Moisture +3 | ↑ Germination chance; Leaf peak later | Unchanged |
| **F02** | Luminosity −3 | ↑ Leaf Yield; ↓ Ripening Rate | Unchanged |
| **F03** | Moisture +1 | ↑ Seed Yield; ↓ Ripening Rate | Unchanged |
| **F04** | Temperature +3 | Seed timing later; Seeds → Leaves | **1 slot revised** |
| **F05** | Luminosity −3 | Leaf peak earlier; + Hourly Leaves | **1 slot revised** |
| **F06** | Moisture −3 | Seed timing later; ↓ Ripening Rate | Unchanged |
| **F07** | Luminosity −2 | + Hourly Leaves; ↓ Leaf Yield | Unchanged |
| **F08** | Luminosity −2 | ↓ Germination chance; Seed timing earlier | Unchanged |
| **F09** | Luminosity +3 | ↑ Ripening Rate; ↑ Leaf Yield; Shorter Harvest Window | Unchanged |
| **F10** | Luminosity +3 | Leaf peak earlier; Leaves → Seeds; ↓ Seed Yield | **1 slot revised** |
| **F11** | Luminosity +3 | ↑ Germination chance; ↑ Growth Rate; ↓ Leaf Yield | Unchanged |
| **F12** | Luminosity −1 | ↓ Growth Rate; + Hourly Seeds; Longer Harvest Window | **1 slot revised** |

## Effect coverage before and after

| Effect | V1 copies | V2 copies |
| --- | ---: | ---: |
| ↑ Leaf Yield | 3 | 2 |
| + Hourly Leaves | 3 | 2 |
| ↑ Seed Yield | 2 | 1 |
| + Hourly Seeds | 1 | 1 |
| ↓ Seed Yield | 0 | 1 |
| Leaf peak earlier | 1 | 2 |
| Seed timing later | 1 | 2 |

V2 has **28 cultivation slots**, with **all 20 experimental broad effect types represented at least once**. This is a useful inventory checksum, **not proof of balanced or complete gameplay**. The count is not a requirement for subsequent versions; a weak type may still be retired.

Positive resource-production methods are now distributed:

- **Leaves:** + ordinary Leaf Yield (F02, F09); + Hourly Leaves (F05, F07); Seeds→Leaves Allocation (F04).
- **Seeds:** + ordinary Seed Yield (F03); + Hourly Seeds (F12); Leaves→Seeds Allocation (F10).
- No ordinary Fungus in V2 bundles two *positive direct-output* methods for the same resource. Other effects may still support the same goal indirectly, and that must be tested rather than assumed harmless.

## Player-first review: maximize Leaves

**Candidate stack:** F02 + F05 + F04.

- F02 supplies + Leaf Yield and slower Ripening (which may extend hourly production windows).
- F05 supplies + Hourly Leaves and an **earlier natural Leaf peak**. If hourly production remains late, choosing the best harvest progress may require a genuine compromise.
- F04 converts Seeds→Leaves but shifts native **Seed timing later**, potentially delaying the input used for conversion.
- Environment: F02 and F05 both emit **−3 Luminosity** while F04 emits **+3 Temperature**. Whether those are meaningful obstacles depends on Plant preferences, propagation footprints and selective Blocker geometry.

**What changed from V1:** F04 no longer independently adds hourly Leaves, and F05 no longer independently boosts ordinary Leaf Yield. The trio still covers three distinct Leaf strategies, but they are separated into three Sources and carry different timing effects.

**Unresolved risk:** F04's delayed Seed timing can be opposed by F08's earlier Seed timing if both reach the same Plant, potentially collapsing to a net timing value. The roster must be evaluated under actual simultaneous propagation, not only per-Fungus labels.

## Player-first review: maximize Seeds

Several genuinely different entry points remain:

- **F03 + F12:** ordinary Seed Yield plus hourly Seeds, with *slower Ripening and slower Growth* as potential time costs; longer Harvest Window may affect Leaves but is not an extra Seed Yield multiplier.
- **F10:** Leaves→Seeds conversion with **− native Seed Yield**, plus earlier Leaf peak. This trades away native Seed income while creating a conversion route; if the quantities merely net to a single Seed gain/loss, the combination needs further revision.
- **F11:** + Germination and + Growth Rate with − Leaf Yield; for Seed-only goals the Leaf penalty may be easy to ignore, so its +3 Luminosity and positioning matter.
- **F09:** + Ripening Rate and + Leaf Yield with shorter Harvest Window can accelerate harvest but may complicate Leaf supply for F10's conversion.

**Unresolved risk:** F03's slower Ripening could extend F12's hourly-Seed accrual, creating a complementary Seed engine rather than a meaningful trade-off. Do not label it balanced without progress-window and geometry checks.

## What V2 still does not solve

1. **Environmental skew** remains exactly as randomly drawn: eight Luminosity, three Moisture, one Temperature; **no Cooling source**. This may obstruct some transformations, but the 69 current named-contact routes cannot be audited until the new anonymous roster gains names and ranges.
2. **No cultivation magnitudes, reach, delivery modes, Mycelial categories or lifecycle numbers** are approved.
3. **Some negative effects might be bypassable** by planting the Fungus after Germination, using Seedless Plants, or applying Blockers. Those are player-strategy questions to model, not automatic failures.
4. **V2 is a complete-roster hypothesis, not a final design.** The next changes should come from whole-garden Leaf/Seed and transformation goals, while all twelve remain visible.

No gameplay code, saves, Grimoire data, existing fungal profiles or approved transformation recipes were modified.
