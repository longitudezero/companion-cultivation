# Randomized fungal roster — V1 structural repairs

> **Status: WORKING EXPERIMENT, NOT APPROVED OR PLAYABLE.** This is an intentionally minimal follow-up to the [unmodified random V0 draw](random-roster-v0.md). **Mycelord remains unchanged.** All twelve ordinary Fungi are still considered together; there is no final roster size or locked effect pairing.

## Change principle

V0 was generated with seed **1254375826** and contained obvious repeated and mutually opposed cultivation abilities. **V1 changes only one cultivation slot in each of four Fungi**. Eight Fungi are byte-for-byte unchanged in their described effects, and every environmental emission is unchanged. The goal is to clear structural noise *before* evaluating Leaf/Seed optimizations, not to make individual designs ideal.

## Exactly four targeted substitutions

| Fungus | V0 slot | V1 replacement | Why |
| --- | --- | --- | --- |
| **F03** | + Leaf Yield | **+ Seed Yield** | F02 and F03 were otherwise exact cultivation duplicates; now they express different output goals and environmental constraints. |
| **F09** | Second copy of + Ripening Rate | **Shorter Harvest Window** | Removes a repeated modifier that was only a stronger numeric Ripening bonus; creates a possible timing tension. **Important:** the current Window model affects native Leaf-curve width and scale, so this needs Plant-by-Plant testing. |
| **F10** | Seeds → Leaves Allocation | **Leaf peak earlier** | Removes two opposing Allocation directions within one Fungus. The new timing shift may compete with converting Leaves to Seeds at harvest while waiting for hourly Seeds. |
| **F12** | − Seed Yield | **− Growth Rate** | Removes direct +/− Seed Yield cancellation. Higher Seed Yield now comes with slower development; the longer Harvest Window is retained. |

These are **proposals, not approvals**. They are intentionally small local repairs, not attempts to guarantee that every resulting combination is useful.

## Complete V1 roster — all twelve visible

| ID | Environmental emission | Cultivation effects | Difference from V0 |
| --- | --- | --- | --- |
| **F01** | Moisture +3 | ↑ Germination chance; Leaf peak later | Unchanged |
| **F02** | Luminosity −3 | ↑ Leaf Yield; ↓ Ripening Rate | Unchanged |
| **F03** | Moisture +1 | ↑ Seed Yield; ↓ Ripening Rate | **1 slot changed** |
| **F04** | Temperature +3 | + Hourly Leaves; Seeds → Leaves | Unchanged |
| **F05** | Luminosity −3 | ↑ Leaf Yield; + Hourly Leaves | Unchanged |
| **F06** | Moisture −3 | Seed timing later; ↓ Ripening Rate | Unchanged |
| **F07** | Luminosity −2 | + Hourly Leaves; ↓ Leaf Yield | Unchanged |
| **F08** | Luminosity −2 | ↓ Germination chance; Seed timing earlier | Unchanged |
| **F09** | Luminosity +3 | ↑ Ripening Rate; ↑ Leaf Yield; Shorter Harvest Window | **1 slot changed** |
| **F10** | Luminosity +3 | Leaf peak earlier; Leaves → Seeds; + Hourly Seeds | **1 slot changed** |
| **F11** | Luminosity +3 | ↑ Germination chance; ↑ Growth Rate; ↓ Leaf Yield | Unchanged |
| **F12** | Luminosity −1 | ↓ Growth Rate; ↑ Seed Yield; Longer Harvest Window | **1 slot changed** |

The structure is still **8 ordinary Fungi with 2 cultivation effects, 4 with 3**, plus Mycelord. All current names, actual effect strengths, compatible Plants, source ranges/modes, and Mycelial habitat classes are still undecided.

## Player audit after repairs — Leaves

**Strongest obvious starting combination remains F05 + F04 + F02:**

- **F05:** + Leaf Yield and + Hourly Leaves, with −3 Luminosity.
- **F04:** + Hourly Leaves and Seeds→Leaves Allocation, with +3 Temperature.
- **F02:** + Leaf Yield and slower Ripening, potentially extending the two hourly-Leaf windows, with another −3 Luminosity.

**Why this is still concerning:** It supplies ordinary Yield, hourly generation, conversion and more time in the production window. The environment may make it difficult, but the cultivation effects largely cooperate. Removing F03's duplicate did **not** solve this, and V1 does not pretend otherwise.

**Additional alternative worth testing:** F09 now offers + Leaf Yield and faster Ripening but a shorter Harvest Window, with +3 Luminosity. It could counter F05's Darkening in a shared environmental footprint while changing timing; whether that is a satisfying puzzle or an effortless compensation requires explicit Blocker/range and curve tests.

**Tentative conclusion:** The Leaf engine is still a leading **potential ready-made solution**. Do not approve these pairs solely because the environment looks harsh on paper.

## Player audit after repairs — Seeds

**Original fast-cycle package remains possible:** F11 (+ Germination, + Growth, − Leaf Yield) + F09 (+ Ripening, + Leaf Yield, shorter Harvest Window) + F10 (earlier Leaf peak, Leaves→Seeds Allocation, + Hourly Seeds).

- F09 no longer doubles its Ripening bonus.
- F10 no longer mathematically opposes its own Allocation. Earlier Leaf peak versus late hourly-Seed collection may introduce a real harvest-timing choice, but this has not been proved.
- F11's − Leaf Yield can be unimportant to a Seed-first player, or offset by F09's + Leaf Yield; the environmental +3 Luminosity emissions may stack and clamp.

**New alternative that must be compared:** F03 (+ Seed Yield / slower Ripening / +1 Moisture) paired with F10 (+ Hourly Seeds) may yield more Seeds per plant but slower turnaround; slower Ripening can itself extend hourly-Seed accrual. F12 (+ Seed Yield / slower Growth / longer Harvest Window) is another possible Seed route with a different timing cost.

**Tentative conclusion:** V1 removes obvious arithmetic noise, but the **Seed production problem is not solved**. We must compare F11/F09/F10, F03/F10, and F12-based alternatives by goal and actual Plant before deciding which slot to revise.

## Structural checks after V1

- **Four one-slot substitutions**, all other cultivation slots unchanged.
- **28 cultivation slots** remain, with no exact duplicate *inside a single Fungus* among the four repaired rows.
- F02 and F03 are no longer cultivation duplicates.
- No direct opposing allocation pair remains in F10, and no direct signed Seed Yield cancellation remains in F12.
- **Environmental imbalance is untouched:** 8 Luminosity emitters, 3 Moisture, 1 Temperature, and no Cooling emitter. The next environment/Transformation pass must address this if it blocks required setups.
- **Effects and numbers are still provisional:** the new shorter Harvest Window and negative Growth Rate require detailed behavior tests; no magnitudes have been set.
- **Mycelord is unchanged** and not counted among the 12.

## What to investigate next — no automatic extra edits

1. **Leaf path:** F05 + F04 + F02, and whether F09 makes their environmental drawbacks trivial to cancel.
2. **Seed paths:** F11 + F09 + F10 versus F03 + F10 and F12-based alternatives.
3. **Actual Garden geometry:** independent cultivation/environment footprints, Blocker Kinds/Modes and whether +3 emissions are genuinely manageable or merely an obligatory Blocker tax.
4. **Six-family coverage and 69 named-contact transformation routes:** effect strengths, ecological constraints and names remain unmapped.
5. Propose the **next smallest set of slot changes only after comparing these full-garden paths**. Do not delete V0 or modify the playable roster.

This V1 document is for collaborative design review; **no existing gameplay code, Grimoire behavior, saves, transformation rules or old profile files were changed**.
