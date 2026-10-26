# Companion Cultivation — conversation handoff

**Snapshot:** 26 October 2026  
**Purpose:** Help a new design conversation resume without having to reconstruct a long chat.  
**Current phase:** Text-only fungus-roster expansion, before fungal numerical balancing and before the dedicated Plant-transformation recipe pass.

## Read this first

This is a navigation and decision-status note, **not a replacement** for the two canonical documents:

1. [Environmental System v1.1](environmental-system-v1.1.md) — authoritative for the **implemented Prototype 1** hex environment, Sources, signed Modifiers, Conditions, Airborne/Waterborne propagation, directional Spread Budget, Blockers, Anchors, and Environmental Adjacency.
2. [Herbs, Fungi & Cultivation Design](herbs-and-fungi-design.md) — the full **text-only Plant/Fungus design record**, including approved first-pass Plant statistics and the detailed fungal profiles. The latest relevant fungus sections are **§§46–56**; older sections often contain superseded proposals or historical status notes. In any conflict, follow the most recent explicit user approval, as recorded below and in the latest document sections.

The [repository README](../README.md) describes Prototype 1 and its tests. **None of the Plant or Fungus rules discussed in this handoff have been implemented in the game.** The existing Prototype 1 environmental sandbox should remain unchanged until the design phase is complete and implementation is separately requested.

## Where the project stands

The goal is a farming minigame about optimizing **sustainable rotations of non-Seed Plant harvests**, provisionally called **Leaves**. Seeds, fungal Sources, environmental control, and transformations support this main goal. A standard Plant has a 0–100% Growth stage, 100–200% Ripening stage, and a **single destructive harvest** of currently available Leaves and Seeds. Special Plant curves and Seed identities vary by species. A second bloom, when applicable, is an alternative productive peak within the same lifecycle, **not** a second harvest.

Six Plant families have **approved first-pass species profiles and numerical balancing**, documented in the long design file:

| Family | Identity / important constraint | Detailed reference |
| --- | --- | --- |
| Woodlands | Risky branching transformations, Mandrake/Seed routes and recovery | §§22–24 |
| Aquatic | Flooded/Damp changes, Waterborne reach, alternate routes | §§25–28 |
| Flowers | Bloom timing, productive windows, and time-based bonus interactions | §§29–32 |
| Desert | Hot/Freezing adaptation, Dormancy, survival/recovery | §§33–36 |
| Spices | Illumination engineering; preserves the old Food-network mechanics under working names | §§37–40 |
| Ingredients | **Potato is the sole Base Plant**; it can transform directly into any of six terminal Ingredients, which cannot transform further | §§41–44 |

These family profiles and numerical tables are **first-pass approved**, not final playtested balance. Plant-owned transformation **network directions** may be agreed, but **exact individual transformation recipes, fungal requirements, exposure durations, and feasibility checks have deliberately been deferred**. Do not invent or finalize recipes during fungus design.

## Agreed fungus design rules

- Every fungus uses **0–100% Growth and 100–200% Sporulation** with species-specific durations (durations are not yet balanced). It produces **only its own Spores**, never Plant Seeds or Leaves.
- A viable fungus emits from successful germination, continues throughout both stages, and **keeps emitting after 200%** while alive. A single **destructive Spore harvest** removes the instance and stops its Source emissions; leaving a mature fungus in place is a real infrastructure trade-off.
- Ordinary fungi start with an **environmental Influence and a separate Plant-development Influence**, but extra Effects or exceptions are allowed when justified. Distinct Effects have independent kinds, propagation, and footprints. Environmental signed Property-step Modifiers remain globally consistent and additive before clamping; Plant-development magnitudes depend on the recipient Plant's approved compatibility.
- Do not hand players a complete top-tier farming solution packaged into one fungus. The player should often combine fungi, compensate for interfering environment emissions, route Influences, or deploy selective Blockers. Incidental synergies are fine; the rule is against eliminating the main placement puzzle.
- **Multiple fungi should be practical alternatives for the same desirable Effect.** A +12% source can beat a +20% source in a particular layout because it wets instead of cools, needs no Mycelial, reaches by water, etc. Do not create a mandatory one-Effect-to-one-fungus lookup. Situational fungi are welcome, and **there is no fungus-count target or cap**. Explore first; consider merging or pruning later without removing meaningful choices.
- Fungal habitats are intentionally simpler than Plant habitats: **Mycelial-independent**, **Mycelial-preferring** (slight source-side cultivation increase if its own occupied hex is Mycelial), or **Mycelial-dependent**. No complex fungus-by-fungus Temperature/Moisture/Light maintenance matrix. Mycelial can be hazardous to Plants; a receiving Plant need not stand on it to receive a nearby fungus's cultivation Influence. Exact Mycelial buff, spread, persistence and retreat are not balanced.
- **Mycelord is the sole Mycelial-creating fungus species** in the initial roster. Multiple Mycelord *instances* are allowed. It needs no Mycelial to start and has **no other environmental or Plant-development Effects**. It follows the same Spore lifecycle. This is an intentional exception to ordinary two-Effect packaging.
- Waterborne Plant-development Influences traverse **connected Flooded hexes**, with existing adjacent-Flooded injection behavior when a Source is not itself Flooded. The fungus's separate Airborne environmental effect can have a different footprint. Rainmorel's routed Wetting is able to make a flooded route; Waterborne cultivation does not itself create water.
- Time-based Leaf/Seed Production accumulates only **during positive Plant lifecycle progression within its specified window**. No accumulation while fully stalled, after 200%, or after destructive harvest. Very slow-but-positive progression is a later balance/exploit test.
- There is no generic fungal Transformation Influence, no automatic fungus-added second bloom, and no restored Environmental Tolerance mechanic. Fertility and an Enchanted overlay are **not reasons to add fungi** unless later retained for a convincing purpose.

## Earlier approved first-pass fungal roster: 19 species (§§47–53)

**“Approved” here means the user accepted the first-pass identity, Effect combination, and design role; it does not mean the numeric strength, Source geometry, ecology or Spore economy is globally balanced.** Exact details and edge cases live in §§47–50 and §53 of the main design file.

| Fungus | Environmental / infrastructure emission | Plant-development emission | Notes |
| --- | --- | --- | --- |
| **Mycelord** | Creates/maintains Mycelial ground | **None** | Sole creator; independent; §47 |
| **Glimmergill** | Illumination +1 | Leaf peak **8 progress points later** | Independent; situational is acceptable |
| **Veilcap** | Illumination −1 | Ripening Rate −20% | Separate from harvest-window widening |
| **Emberbolete** | Temperature +1 | Seed Yield +20% | Avoids automatic Hot Leaf optimization |
| **Chillanterelle** | Temperature −1 | Leaf Yield +20% | Avoids automatic Freezing Seed optimization |
| **Rainmorel** | Moisture +1, **directional Spread Budget 4** | Growth Rate −15% | Wetting can establish flooded routes |
| **Droughtcap** | Moisture −1 | Harvest Window width +25% | Airborne development reach |
| **Prismorel** | Illumination +1, **directional Spread Budget 3** | Leaf peak **8 points earlier** | Alternative to Glimmergill's layout/timing |
| **Rushroom** | Temperature −1 | Growth Rate +30% | **Mycelial-dependent**; powerful but costly |
| **Echomorel** | Temperature −1 | +0.15 Leaves/hour at **160–190%** | Mycelial-preferring; later Leaf production |
| **Wakemorel** | Moisture −1 | Ripening Rate +25% | Speeds late completion; may dry crops |
| **Hushroom** | Illumination −1 | Germination **+8 percentage points per Plant Seed** | Check empty sowing hex; not fungus Spores |
| **Sim'mushro'dim** | Temperature +1 | +0.15 Seeds/hour at **160–195%** | Mycelial-preferring; sterile Plants remain sterile |
| **Mistruffle** | Moisture +1 | Leaf Yield +12% | Weaker but different-cost alternative to Chillanterelle |
| **Crumblecap** | Moisture −1 | Seed Yield +12% | Alternative to Emberbolete |
| **Quickshade** | Illumination −1 | Growth Rate +15% | Independent alternative to Mycelial-dependent Rushroom |
| **Tidegill** | Illumination +1 | Seed availability **12 points earlier**, **Waterborne Range 3** | Seed Timing Shift; existing Seed count/identity unchanged |
| **Frostfolio** | Temperature −1 | **Leaf-favoring Leaf–Seed Allocation** | Mycelial-preferring; exact exchange unspecified |
| **Sunspore** | Temperature +1 | **Seed-favoring Leaf–Seed Allocation**, **Waterborne Range 3** | Cannot create Seeds on sterile Plants |

The generally proposed environmental footprint is Airborne Range 2 and cultivation footprint Range 1 for many ordinary fungi, **but there are explicit exceptions** (directional effects, Rushroom, Tidegill and others); check species profiles rather than treating this as a universal rule. Emberbolete/Chillanterelle's Mycelial preference and exact source-side multiplier remain test options, not settled final numbers.

## Six more fungi in §54 — APPROVED first-pass on 26 October 2026

The user reviewed **all six** after the previous chat's handoff and said **"they look good we can keep them"**. All six are now **APPROVED first-pass species identities, Effect pairings and design roles**, though their source strengths/footprints and fungal numeric statistics remain subject to global balance. They are not merely pending proposals.

| Fungus | Environmental emission | Plant-development effect | Distinguishing cost / reach |
| --- | --- | --- | --- |
| **Dewmender** | Moisture +1 | Germination +4 pp per Plant Seed | Independent, Airborne Range 1 cultivation; weaker Wetting alternative to Hushroom |
| **Lanterncap** | Illumination +1 | Ripening Rate −12% | Independent, Airborne Range 1; brightening alternative to Veilcap |
| **Tickbolete** | Temperature +1 | Ripening Rate +12% | Independent, Airborne Range 1; warming alternative to Wakemorel |
| **Rilllace** | Temperature −1 | Harvest Window width +12% | Independent, **Waterborne Range 3**; alternative to Droughtcap |
| **Duskleaf** | Illumination −1 | +0.08 Leaves/hour at **70–125%** | Independent, Airborne Range 1; early-window alternative to Echomorel |
| **Brookrill** | Temperature −1 | +0.10 Seeds/hour at **120–170%** | Independent, **Waterborne Range 3**; mid-window alternative to Sim'mushro'dim |

The working **approved first-pass roster now totals 25 candidate Fungus species, including Mycelord**. This is **not a cap**. The full six-part rationale and feasibility caveats are in §54. Exact percentages, hourly rates, windows, reaches and all fungal statistics remain first-pass design values, not final numerical balance.

## Three more fungi in §55 — APPROVED first-pass on 26 October 2026

The user reviewed **Gloamclock, Bristlecap and Goldgill**, saying **"i like them. all 3 seem good"**. These are now **APPROVED first-pass identities, Effect pairings and roles**, bringing the approved working roster to **28 Fungus species including unique Mycelial-creator Mycelord**, still not a cap.

| Fungus | Environmental emission | Plant-development effect | Contrast with earlier source |
| --- | --- | --- | --- |
| **Gloamclock** | Illumination −1 (Darkening), Airborne R2 | Seed Timing Shift **8 points earlier**, Airborne R1 | Tidegill shifts 12 earlier by Waterborne R3 and Brightens; Gloamclock works locally without a Flooded route |
| **Bristlecap** | Moisture −1 (Drying), Airborne R2 | **Leaf-favoring Allocation**, Airborne R1 | Frostfolio Cools and is Mycelial-preferring; Bristlecap is independent but can Dry crops or sever flooded paths |
| **Goldgill** | Illumination +1 (Brightening), Airborne R2 | **Seed-favoring Allocation**, Airborne R1 | Sunspore Warms and uses Waterborne R3; Goldgill reaches non-Flooded fields locally |

All three use the agreed fungal 0–200% persistent-Source lifecycle and own Spores on a destructive harvest. Their approved first-pass profiles, ecological costs and feasibility caveats are in **§55**. **Allocation conversion/eligibility/stacking and unlimited Waterborne reach are only PROPOSED in §56**, not yet user-approved.

## Leaf–Seed Allocation: what was agreed, and what remains open

The user explicitly agreed that **Leaves are more valuable than Seeds**, so an extra Leaf should cost several Seeds. **§56 now proposes a deliberately strong implementable first pass**: 3 Seeds → +1 Leaf or 1 Leaf → +3 Seeds, as a **single harvest-time conversion** requiring both whole output streams to be positive; convert a bounded fraction of the donor pool (Frostfolio/Sunspore 80%, Bristlecap/Goldgill 60%, before Plant compatibility), sum opposed source fractions into one capped signed net, and round deterministically. **These exact mechanics and percentages are not yet approved.** Source-side Mycelial amplification for Frostfolio is also proposed there. No free Seeds on sterile Plants, no invented Seed identities, no double harvest, and no mixing Fungus Spores with Plant Seeds.

## Other pending §56 system proposal: unlimited Waterborne reach

The user proposed removing numeric Range from **ordinary Waterborne Influences** so one Source reaches **every blocker-reachable Flooded hex in its connected flooded component(s)**. §56 documents a concrete proposed interpretation: Source on Flooded traverses its flooded component; Source not Flooded can inject into any adjacent Flooded hex, then traverse its entire connected network. Dry/Damp gaps and matching Hex/Edge Blockers interrupt reach; routes can go around Blockers if connected. Routed Airborne Wetting may establish the Flooded path first, and Waterborne still cannot modify Moisture. Airborne Ranges and directional Spread Budgets remain finite. Waterborne-tagged one-hex Environmental Adjacency stays local.

**STATUS: This is an IDEA UNDER REVIEW, not a change to implemented Environmental System v1.1.** If approved, it affects Prototype 1 core code/UI/tests and the previous Waterborne Range 3 profile entries for Tidegill, Sunspore, Rilllace and Brookrill. Its broad payoff is intentional for early playtests; note risk of near-global coverage over large flooded gardens.

## Updated collaboration priority

The user now prefers to **define concrete first-pass values quickly, implement a playable slice, and use tests/harvest-per-hex-day calculations to rebalance**. Favor meaningful, even exaggerated numbers over timid barely perceptible Effects. This supersedes the earlier preference to postpone all Plant/Fungus implementation until the complete fungus-wide numeric pass. **Do not silently implement §56 proposals before user review**, but once agreed, advance the deterministic rules core and playable UI in small tested increments while retaining the separate later Plant-owned transformation-recipe design pass.

## What to do next, in order

1. **Review §56's two PROPOSED rules**: the explicit 3:1 signed harvest-time Allocation system and unlimited Flooded-connected Waterborne propagation. Ask the user to approve or adjust; do not treat the proposal as adopted automatically.
2. If approved, **update Environmental System v1.1 and affected Waterborne Fungus profiles**, then implement the unlimited Waterborne graph traversal in the existing deterministic **src/core/** engine with updated tests and UI labeling.
3. Build a **small playable Plant/Fungus/Spore/harvest vertical slice** using approved Plants and the four Allocation Fungi, rather than waiting for all 28 complete numeric profiles. Test early Seed Timing interaction, full sustainable rotations and resource trade-offs. Preserve the existing React/Vite + separate core architecture.
4. Iterate on **playtest metrics and exaggerated first-pass numerical values** (Leaves per hex-day, Seed sustainability, infrastructure costs), then perform the broader Source coverage, interaction, blocker/Waterborne/Mycelial feasibility audit and full fungus balance as needed.
5. **Keep Plant-owned transformation recipes a separate full design pass** across six families after the basic systems and fungal interactions are available. Do not invent recipes incidentally during this first implementation.
6. There is **no fixed fungus roster cap**, no second Mycelial-creating species, no generic fungal Transformation Influence, and no need to make weak values just to appear balanced before testing.

## How to collaborate with this user

Work through **small, concrete batches** with named fungi, emitted Effects, habitat/reach, interactions with already designed Plants, and honest feasibility risks. Be precise about **AGREED / APPROVED first pass / PROPOSED / OPEN**. Record changes in the canonical design document when the user accepts or requests them, preserving the distinction between a proposal and approval. Do not overcomplicate fungus survival merely to create content. Avoid replacing meaningful player-built combinations with one-source automatic wins. The user is comfortable adding many candidate fungi before reducing the roster and accepts highly situational Effect sources.

**Suggested opening in the next conversation:**

> Companion Cultivation now has **28 approved first-pass Fungi** including sole Mycelial-creator Mycelord; §55's Gloamclock, Bristlecap and Goldgill were approved on 26 October 2026. **§56's concrete 3:1 harvest-time Allocation and unlimited Waterborne propagation are NEW PROPOSALS, not yet accepted.** The user wants bold initial values and earlier playable implementation/playtesting rather than delaying everything until global numerical balance. Review §56, then implement an early tested slice if agreed, keeping Plant transformation recipes a later separate pass.
