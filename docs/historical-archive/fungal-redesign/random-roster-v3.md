# Randomized fungal roster — V3 cultivation-impact redistribution

> **Status: WORKING EXPERIMENT — NOT APPROVED OR PLAYABLE.** This cultivation-only pass follows [V2](random-roster-v2.md), which remains intact for comparison. Twelve anonymous ordinary Fungi remain under review, with no target count locked. **Mycelord stays exactly unchanged.** Existing environmental emissions are carried forward without modification but deliberately excluded from this evaluation.

## User decisions guiding this pass

1. **Remove the negative Germination effect** from the experimental roster. It can be avoided by reaching a Plant only after germination, so its apparent price may not be compelling.
2. **Set environmental effects aside for now.** Evaluate the combinations of cultivation effects on each Fungus.
3. **Redistribute high-leverage and low-leverage abilities across the whole roster.** A Fungus with only two situational controls should not be automatically overshadowed by another Fungus with two broadly productive abilities.
4. Keep the full slate visible and make reversible changes; none of these pairings is locked in.

## Relative effect impact — not a numerical tier list

Effect value depends on the Plant and the player's objective. This is a *design lens*, not a universal ranking.

| Group | Effects | Why they matter |
| --- | --- | --- |
| **Direct production engines** | + ordinary Leaf Yield; + hourly Leaves; Seeds→Leaves; + ordinary Seed Yield; + hourly Seeds; Leaves→Seeds | Each is an immediately intelligible route to more of a harvest resource. Different routes are worth retaining, but putting several in one Fungus risks a ready-made solution. |
| **Strong tempo / production-window levers** | + Growth Rate; + Ripening Rate; − Ripening Rate; longer Harvest Window | Their impact can rival direct Yield because they change real-time throughput or time available for hourly output. Their sign is not a universal benefit or penalty: slowing Ripening costs time but may greatly enhance banked hourly harvest. |
| **Situational scheduling / establishment** | Earlier/later Leaf peaks; earlier/later Seed timing; + Germination | Powerful for particular Plants or harvest targets, but usually not an additional output stream on their own. Germination matters at sowing only. |
| **Explicit potential costs** | − Growth Rate; − Leaf Yield; − Seed Yield; shorter Harvest Window | A cost matters only if the chosen Plant/strategy cannot ignore it. For example, − Leaf Yield may be cheap for pure Seed farming. |

**Important mechanical distinction:** Slower Ripening alone does **not** increase the native Leaf Yield earned at the same lifecycle progress. It is nevertheless a high-leverage effect when another Source produces hourly Leaves or Seeds: the Plant can spend longer in a qualifying progress window. This is why the F02 pairing deserves separation.

## V2 → V3 edits: remove one, redistribute three

| Fungus | V2 effects | V3 effects | Design intent |
| --- | --- | --- | --- |
| **F01** | + Germination; Leaf peak later | **+ Germination; + Ripening Rate** | Give the weak establishment/timing specialist a meaningful throughput lever. F01 now helps start crops and finish Ripening faster, but adds no direct Leaves or Seeds. |
| **F02** | + Leaf Yield; − Ripening Rate | **+ Leaf Yield; Leaf peak later** | Separate a strong direct Leaf route from the slowdown that could compound hourly production elsewhere. A shifted peak creates a harvest-timing decision rather than a second output engine. |
| **F08** | − Germination; Seed timing earlier | **− Ripening Rate; Seed timing earlier** | Remove the weak negative-Germination price and give early Seed scheduling a trade-off against slower Ripening. The slowdown can also act as a strong enabler for a *different* hourly Source. |
| **F09** | + Ripening Rate; + Leaf Yield; Shorter Harvest Window | **+ Leaf Yield; Shorter Harvest Window** | Stop packaging faster Ripening and extra native Leaves together; retain the narrower harvest interval as the price of an output bonus. |

These edits reassign **+ Ripening Rate from F09 to F01**, **Leaf peak later from F01 to F02**, and **− Ripening Rate from F02 to F08**. They **remove − Germination entirely**. All other cultivation effects and assignments are unchanged.

## Full V3 cultivation roster — all twelve visible

| ID | Cultivation effects | Role / open question |
| --- | --- | --- |
| **F01** | **+ Germination; + Ripening Rate** | Establishment and turnover specialist; check whether both effects create an overly easy fast-rotation option. |
| **F02** | **+ Leaf Yield; Leaf peak later** | Ordinary Leaf producer with a scheduling constraint/opportunity, not a built-in hourly extension. |
| **F03** | **+ Seed Yield; − Ripening Rate** | **Still under scrutiny:** high Seed Yield with a slowdown that could support hourly production elsewhere. |
| **F04** | **Seed timing later; Seeds→Leaves** | Leaf conversion with possible delay to the Seed input required at harvest. |
| **F05** | **Leaf peak earlier; + Hourly Leaves** | Hourly Leaf producer with a possible conflict between early natural Leaves and banked later Leaves. |
| **F06** | **Seed timing later; − Ripening Rate** | Late-cycle timing controller; ensure it has a compelling job distinct from F08. |
| **F07** | **+ Hourly Leaves; − Leaf Yield** | Alternate Leaf producer exchanging native output for banked output. |
| **F08** | **Seed timing earlier; − Ripening Rate** | Early Seeds but slower Ripening; potentially enables hourly strategies on a second Fungus. |
| **F09** | **+ Leaf Yield; Shorter Harvest Window** | Ordinary Leaf producer paying in harvest flexibility. |
| **F10** | **Leaf peak earlier; Leaves→Seeds; − Seed Yield** | Seed conversion that needs a valid Seed stream and sufficient donor Leaves. |
| **F11** | **+ Germination; + Growth Rate; − Leaf Yield** | Fast establishment/Growth, but Leaf penalty might be ignorable for a Seed-only plan. |
| **F12** | **− Growth Rate; + Hourly Seeds; Longer Harvest Window** | **Still under scrutiny:** slower Growth may or may not be a real cost depending on the hourly Seed production window. |

**Inventory checksum:** 27 cultivation-effect slots, comprising **nine two-effect Fungi and three three-effect Fungi**. All **19 remaining experimental effect types** occur at least once. The original 20th, **− Germination**, was intentionally retired, not accidentally omitted. Duplicate copies of some strong effects remain *provisional*; equal counts are not a goal.

## Player-perspective checks before V4

1. **Leaves per harvest:** F02 (+ ordinary Leaves), F05/F07 (hourly Leaves) and F04 (conversion) remain separate routes. F08 can slow Ripening for F05/F07, but it must be deliberately combined with them. F02 no longer provides that slowdown in one place.
2. **Fast Leaf rotation:** F01 (+ Ripening), F02/F09 (+ ordinary Leaves) and F11 (+ Growth) may now be combined for throughput. Test whether this becomes obvious and cost-free on any Plant; F09's shorter window and F11's − Leaf Yield are not guaranteed to matter for every case.
3. **Seeds per harvest:** F03 (+ Seed Yield and − Ripening) + F12 (+ hourly Seeds, longer window, − Growth) remains the biggest possible 'straightforward engine'. Do **not** assume it is balanced just because its effects reside on separate Fungi.
4. **Seed conversion:** F10 + F12 can supply Seeds and convertible Leaves together; F10's − Seed Yield can be offset by hourly Seeds, but whether that yields an over-obvious default depends on the Plant's timing and quantities.
5. **Support-only species:** F06 and F08 now both contain − Ripening Rate with opposite Seed timing shifts. Their actual differentiation depends on Plant harvest patterns, delivery and range. Their coexistence is a hypothesis, not a permanent requirement.
6. **F01 compared with F02:** F01 offers successful starts and faster completion rather than increasing output per harvest. F02 offers a larger native Leaf harvest with shifted timing. Which wins should depend on whether the player needs per-cycle output or harvests per day.

## Not decided

- No cultivation magnitudes, lifecycle production windows, individual delivery, habitat, ranges, names, or changes to the 69 transformation routes are decided.
- This pass makes **no environmental balance judgment**; the V2 environmental values remain a separate, untouched reference.
- All approved first-pass species and Mycelord, live code, saves, recipes and Grimoire remain unchanged.

**Next design priority:** compare the high-value Seed arrangements around F03, F10 and F12, distinguishing *Seeds per harvest* from *Seeds per in-game day*. Only then choose further slot changes with all twelve Fungi in view.
