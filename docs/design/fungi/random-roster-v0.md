# Randomized fungal roster — player-first experiment V0

> **Status: RANDOM EXPERIMENT — NOT APPROVED OR PLAYABLE.** This slate was generated without selecting "good" combinations. It supersedes neither the [first-pass roster](README.md) nor the exploratory [second-pass notebook](redesign-working.md). **Mycelord remains exactly as approved** and is additional to the 12 anonymous ordinary Fungi below.

## Generation method

- **12 anonymous ordinary Fungi:** F01–F08 have **two cultivation effects each**; F09–F12 have **three cultivation effects each**. That is **28 randomly assigned cultivation-effect slots**. Every one also receives **one independently randomized environmental emission**, preserving the prior separation of environment and cultivation.
- **No balance selection, no deliberate distribution, no duplicate prevention, and no rerolls.** Effects were sampled uniformly **with replacement** from the 20-type pool below. Environmental property/sign was sampled from six possibilities; magnitude was sampled uniformly from 1, 2, and 3 Property steps.
- **Reproducibility:** Mulberry32 seeded with **1254375826**; draw environmental type, environmental magnitude, and then two or three cultivation types per row, in row order. The seed was chosen using a random draw. Re-running the specified algorithm reconstructs this exact slate.
- **Pool:** +/− Germination chance; +/− Growth Rate; +/− Ripening Rate; +/− Leaf Yield; +/− Seed Yield; + Hourly Leaves; + Hourly Seeds; Leaf peak earlier/later; Seed timing earlier/later; Harvest Window longer/shorter; Seeds→Leaves Allocation; Leaves→Seeds Allocation.
- **New, unapproved signed variants** in the pool include reduced Germination, reduced Leaf/Seed Yield, later Seed timing and a shorter Harvest Window. No magnitudes for cultivation effects were assigned. The current economy does not have these variants approved as new Fungus emissions merely because they are present in this experiment.
- **Still unassigned:** fungal names, actual lifecycle/spore numbers, emission modes/ranges, Mycelial dependence/preference, all specific Plant compatibility and any transformation recipe changes.

## The unedited random draw

| ID | Environmental emission | Cultivation effects |
| --- | --- | --- |
| **F01** | Moisture +3 | ↑ Germination chance; Leaf peak later |
| **F02** | Luminosity −3 | ↑ Leaf Yield; ↓ Ripening Rate |
| **F03** | Moisture +1 | ↑ Leaf Yield; ↓ Ripening Rate |
| **F04** | Temperature +3 | + Hourly Leaves; Seeds → Leaves |
| **F05** | Luminosity −3 | ↑ Leaf Yield; + Hourly Leaves |
| **F06** | Moisture −3 | Seed timing later; ↓ Ripening Rate |
| **F07** | Luminosity −2 | + Hourly Leaves; ↓ Leaf Yield |
| **F08** | Luminosity −2 | ↓ Germination chance; Seed timing earlier |
| **F09** | Luminosity +3 | ↑ Ripening Rate; ↑ Leaf Yield; ↑ Ripening Rate |
| **F10** | Luminosity +3 | Seeds → Leaves; Leaves → Seeds; + Hourly Seeds |
| **F11** | Luminosity +3 | ↑ Germination chance; ↑ Growth Rate; ↓ Leaf Yield |
| **F12** | Luminosity −1 | ↓ Seed Yield; ↑ Seed Yield; Longer Harvest Window |

## Player-first question 1: "I want more Leaves"

**First things I would inspect as a player:**

- **F05** has **+ Leaf Yield and + Hourly Leaves**—two routes to the exact same outcome, with no cultivation downside. Its −3 Luminosity could constrain placement, but a selective blocker or a shade-loving crop may make it an obvious choice.
- **F04** offers **+ Hourly Leaves and Seeds→Leaves Allocation**, another powerful Leaf package, with +3 Temperature as its environmental obstacle.
- **F02** and **F03** both provide **+ Leaf Yield and slower Ripening**. Slower Ripening can let F04/F05's hourly production run for longer within its eligible progress window. These can be complementary, not opposing, effects.
- **F07** adds hourly Leaves but reduces ordinary Leaf Yield; unlike a simple +X/−X on the same effect, those act on different production mechanisms and windows. Its trade-off is worth exploring *only* after source geometry and exact values are considered.
- **F09** adds Leaf Yield and Ripening speed, but its repeated Ripening modifier may make the effect stronger than intended and shorten a neighboring hourly-production window.

**Potential obvious Leaf stack:** F05 + F04 + either F02/F03. That combines ordinary bonus, hourly generation, Seeds-to-Leaves conversion, and slower Ripening. Environmental emissions or spatial constraints **might** make it challenging, but there is no demonstrated cultivation-side need to separate those effects. **Flag as a candidate ready-made solution**, not automatically condemned before environmental reach tests.

**Question to test:** Can a player counter the −3 Luminosity and +3 Temperature without losing the desirable cultivation footprints? If always yes with a routine Blocker setup, the environment is only a tax.

## Player-first question 2: "I want more Seeds"

- **F11** provides **+ Germination and + Growth Rate**, while its negative Leaf Yield may be nearly irrelevant to a Seed-focused strategy. With +3 Luminosity, this can be an attractive establishment/turnover source for bright-tolerant crops.
- **F09** adds Ripening Rate **twice**, potentially speeding the second half of the lifecycle substantially. Combined with F11 it may create a convenient fast crop cycle.
- **F10** supplies **+ Hourly Seeds**, but its Seeds→Leaves and Leaves→Seeds Allocation pull in opposite directions. If equal in strength and applicable at the same harvest, the two allocations cancel; exact magnitudes are not set.
- **F08** shifts Seed timing earlier but reduces Germination. Its drawback may be bypassed for already-established Plants, while the timing shift remains useful.
- **F12** has both **+ Seed Yield and − Seed Yield**; if magnitudes match, they cancel, leaving a longer Harvest Window (which primarily changes the native Leaf production schedule, not a generic direct Seed Yield increase).

**Potential Seed stack:** F11 + F09 + F10, possibly F08, can favor reliable establishment, fast Growth/Ripening and extra hourly Seeds. Multiple +3 Luminosity sources might saturate the environment; whether that is a real challenge depends on the crop and blockers. **Flag as a potential ready-made solution**.

## Other patterns discovered by the random draw

1. **Exact cultivation duplicate:** F02 and F03 share + Leaf Yield / − Ripening Rate; their environmental emission differs. This is worth retaining as a contrast during analysis, not automatically removing before comparing spatial consequences.
2. **Duplicated effect in one Fungus:** F09 has + Ripening Rate twice. Without intentionally distinct delivery or phase rules, that is effectively one stronger Ripening modifier and fails the no-redundant-arithmetic goal.
3. **Opposed effects in one Fungus:** F10 has both allocation directions; F12 has both signed Seed Yield directions. Both require correction if they reduce to net-zero or a single net modifier.
4. **Random environmental imbalance:** **8 Luminosity**, **3 Moisture**, and **1 Temperature** emissions; **no Cooling source** among these 12. It is an outcome of random sampling, not intentional ecological balance.
5. **Missing or uneven roles:** Some pool effects did not appear; others appear several times. The roster cannot yet be judged complete by counting 28 slots.
6. **Transformation feasibility remains untested:** The implemented 69 Plant routes name current Fungi. Anonymous F01–F12 have no approved name mapping, environmental footprint/range, or Mycelial habitat, so no transformation coverage claim is justified.

## First repair queue — do not apply until reviewing the whole roster

- **Tier 1: purely redundant arithmetic:** F09's double Ripening; F10's opposing Allocation; F12's opposing Seed Yield.
- **Tier 2: strategic self-solutions:** the F04/F05/F02-or-F03 Leaf engine and F11/F09/F10 Seed engine.
- **Tier 3: coverage and ecology:** very uneven Luminosity emissions, absent Cooling and any missing effect family needed for a viable cultivation or transformation route.
- **Tier 4: species and interface:** after mechanical viability, decide names, Mycelial relationships, propagation/ranges, Grimoire recording, and save migration.

**Method rule for the next pass:** Choose a player objective (Leaves, Seeds, Growth speed, transformations), identify the strongest **whole-garden combination** from this unedited roster, ask what—if anything—makes it costly or impossible, and **then** replace or adjust individual slots. Do not design one Fungus and lock it before seeing its interactions with the other eleven.

**No gameplay code, existing Fungi, approved recipes, or historical design files were changed to generate this slate.**
