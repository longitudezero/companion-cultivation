# Companion Cultivation — conversation handoff

**Snapshot:** 26 October 2026  
**Purpose:** Help a new design conversation resume without having to reconstruct a long chat.  
**Current phase:** Text-only fungus-roster expansion, before fungal numerical balancing and before the dedicated Plant-transformation recipe pass.

## Read this first

This is a navigation and decision-status note, **not a replacement** for the two canonical documents:

1. [Environmental System v1.1](environmental-system-v1.1.md) — authoritative for the **implemented Prototype 1** hex environment, Sources, signed Modifiers, Conditions, Airborne/Waterborne propagation, directional Spread Budget, Blockers, Anchors, and Environmental Adjacency.
2. [Herbs, Fungi & Cultivation Design](herbs-and-fungi-design.md) — the full **text-only Plant/Fungus design record**, including approved first-pass Plant statistics and the detailed fungal profiles. The latest fungus roster is **§57**, the Transformation reset is **§58**, the stage-free environmental-exposure Transformation rule is **§59**, and the new interaction-audit approvals plus the **tracked-output Yield correction** are **§60**; older sections often contain superseded proposals or historical status notes. In any conflict, follow the most recent explicit user approval, as recorded below and in the latest document sections.

The [repository README](../README.md) describes Prototype 1 and its tests. **None of the Plant or Fungus rules discussed in this handoff have been implemented in the game.** The existing Prototype 1 environmental sandbox should remain unchanged until the design phase is complete and implementation is separately requested.

## Where the project stands

The goal is a farming minigame about optimizing **sustainable rotations of non-Seed Plant harvests**, provisionally called **Leaves**. Seeds, fungal Sources, environmental control, and transformations support this main goal. A standard Plant has a 0–100% Growth stage, 100–200% Ripening stage, and a **single destructive harvest** of currently available Leaves and Seeds. Special Plant curves and Seed identities vary by species. A second bloom, when applicable, is an alternative productive peak within the same lifecycle, **not** a second harvest.

**Latest crucial rules (§§58–59): A Transformation removes the old Plant and creates the destination Plant at 0% Growth, with NO prior progress, accumulated output, lethal-exposure hours, or other transient state. Transformation eligibility NEVER depends on lifecycle percentage, stage or maturity.** Instead, Plant-owned recipes check uninterrupted exposure to appropriate Sources/environment/adjacency and environmental transition events. A Plant whose Leaf window is 50–120% can grow through it even if its precursor transformed at 150%. **Resetting progress does not force intermediate Plants in a Transformation chain to mature**: chaining speed depends on exposure and setup time; full Growth/Ripening duration matters when farming the Plant for output.

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
| **Tidegill** | Illumination +1 | Seed availability **12 points earlier**, **Waterborne unlimited** | Seed Timing Shift; existing Seed count/identity unchanged |
| **Frostfolio** | Temperature −1 | **Leaf-favoring Leaf–Seed Allocation** | Mycelial-preferring; exact exchange unspecified |
| **Sunspore** | Temperature +1 | **Seed-favoring Leaf–Seed Allocation**, **Waterborne unlimited** | Cannot create Seeds on sterile Plants |

The generally proposed environmental footprint is Airborne Range 2 and cultivation footprint Range 1 for many ordinary fungi, **but there are explicit exceptions** (directional effects, Rushroom, Tidegill and others); check species profiles rather than treating this as a universal rule. Emberbolete/Chillanterelle's Mycelial preference and exact source-side multiplier remain test options, not settled final numbers.

## Six more fungi in §54 — APPROVED first-pass on 26 October 2026

The user reviewed **all six** after the previous chat's handoff and said **"they look good we can keep them"**. All six are now **APPROVED first-pass species identities, Effect pairings and design roles**, though their source strengths/footprints and fungal numeric statistics remain subject to global balance. They are not merely pending proposals.

| Fungus | Environmental emission | Plant-development effect | Distinguishing cost / reach |
| --- | --- | --- | --- |
| **Dewmender** | Moisture +1 | Germination +4 pp per Plant Seed | Independent, Airborne Range 1 cultivation; weaker Wetting alternative to Hushroom |
| **Lanterncap** | Illumination +1 | Ripening Rate −12% | Independent, Airborne Range 1; brightening alternative to Veilcap |
| **Tickbolete** | Temperature +1 | Ripening Rate +12% | Independent, Airborne Range 1; warming alternative to Wakemorel |
| **Rilllace** | Temperature −1 | Harvest Window width +12% | Independent, **Waterborne unlimited**; alternative to Droughtcap |
| **Duskleaf** | Illumination −1 | +0.08 Leaves/hour at **70–125%** | Independent, Airborne Range 1; early-window alternative to Echomorel |
| **Brookrill** | Temperature −1 | +0.10 Seeds/hour at **120–170%** | Independent, **Waterborne unlimited**; mid-window alternative to Sim'mushro'dim |

The working **approved first-pass roster now totals 25 candidate Fungus species, including Mycelord**. This is **not a cap**. The full six-part rationale and feasibility caveats are in §54. Exact percentages, hourly rates, windows, reaches and all fungal statistics remain first-pass design values, not final numerical balance.

## Three more fungi in §55 — APPROVED first-pass on 26 October 2026

The user reviewed **Gloamclock, Bristlecap and Goldgill**, saying **"i like them. all 3 seem good"**. These are now **APPROVED first-pass identities, Effect pairings and roles**, bringing the approved working roster to **28 Fungus species including unique Mycelial-creator Mycelord**, still not a cap.

| Fungus | Environmental emission | Plant-development effect | Contrast with earlier source |
| --- | --- | --- | --- |
| **Gloamclock** | Illumination −1 (Darkening), Airborne R2 | Seed Timing Shift **8 points earlier**, Airborne R1 | Tidegill shifts 12 earlier via unlimited Flooded connectivity and Brightens; Gloamclock works locally without a Flooded route |
| **Bristlecap** | Moisture −1 (Drying), Airborne R2 | **Leaf-favoring Allocation**, Airborne R1 | Frostfolio Cools and is Mycelial-preferring; Bristlecap is independent but can Dry crops or sever flooded paths |
| **Goldgill** | Illumination +1 (Brightening), Airborne R2 | **Seed-favoring Allocation**, Airborne R1 | Sunspore Warms and uses unlimited Waterborne; Goldgill reaches non-Flooded fields locally |

All three use the agreed fungal 0–200% persistent-Source lifecycle and own Spores on a destructive harvest. Their approved first-pass profiles, ecological costs and feasibility caveats are in **§55**. **Allocation conversion/eligibility/stacking and unlimited Waterborne reach were subsequently APPROVED in §56**; the former is still text-only, while Waterborne has been implemented in the environment prototype.

## Leaf–Seed Allocation: APPROVED first-pass mechanics, numerical balance later

The user explicitly agreed that **Leaves are more valuable than Seeds**, so an extra Leaf should cost several Seeds. **§56's deliberately strong first-pass rule is now APPROVED**: 3 Seeds → +1 Leaf or 1 Leaf → +3 Seeds, as a **single harvest-time conversion** requiring both whole output streams to be positive; convert a bounded fraction of the donor pool (Frostfolio/Sunspore 80%, Bristlecap/Goldgill 60%, before Plant compatibility), sum opposed source fractions into one capped signed net, and round deterministically. Frostfolio receives a **source-side 1.25× Allocation-strength multiplier on Mycelial**, reaching 100% from 80%. No free Seeds on sterile Plants, no invented Seed identities, no double harvest, and no mixing Fungus Spores with Plant Seeds. These are **first-pass implementation values**, not a demand for pre-playtest balance.

## Unlimited Waterborne reach: APPROVED and implemented in Prototype 1

The user **APPROVED removing numeric Range from ordinary Waterborne Influences**, so one Source reaches **every blocker-reachable Flooded hex in its connected flooded component(s)**. §56 records the accepted interpretation: Source on Flooded traverses its flooded component; Source not Flooded can inject into any adjacent Flooded hex, then traverse its entire connected network. Dry/Damp gaps and matching Hex/Edge Blockers interrupt reach; routes can go around Blockers if connected. Routed Airborne Wetting may establish the Flooded path first, and Waterborne still cannot modify Moisture. Airborne Ranges and directional Spread Budgets remain finite. Waterborne-tagged one-hex Environmental Adjacency stays local.

**STATUS: APPROVED and IMPLEMENTED in Environmental System v1.1, Prototype 1 core code, UI and tests.** Previous Waterborne Range 3 profile entries for Tidegill, Sunspore, Rilllace and Brookrill are superseded by unlimited connected-Flooded reach. Existing saved numeric Waterborne Range values are ignored. Broad coverage is intentional; evaluate any near-global Flooded-garden effects in later playtests.

## Three more fungi in §57 — APPROVED first-pass; current roster 31

The user accepted **Fogdial, Emberbell and Siltgill** as first-pass fungus bundles (names, strengths and combinations are provisional playtest values), bringing the working roster to **31 approved Fungi including Mycelord**. The previously identified gaps in 125–160% hourly Leaf production and the narrower Flooded-only Harvest Window alternative **do not need automatic filling**: specialized progress windows, penalties and Blocker solutions are intended player puzzles. The existing two timed-Seed-production windows can remain distinct for now. No further species are required merely to fill every slot of a matrix.

| Fungus | Environmental Source | Plant-development Influence | Fungal habitat / alternative |
| --- | --- | --- | --- |
| **Fogdial** | **Darkening −1**, Luminous / Airborne R2 | Leaf Peak **−6 points EARLIER**, Airborne R2 | **Independent** alternative to Prismorel (−8, R1 and directional Brightening) |
| **Emberbell** | **Warming +1**, Thermal / Airborne R2 | Leaf Peak **+12 points LATER**, Airborne R1 | **Independent** alternative to Glimmergill (+8 and Brightening) |
| **Siltgill** | **Drying −1**, Aqueous / Airborne R2 | **Leaf Yield +35%**, **unlimited Waterborne** | **Mycelial-dependent at its SOURCE hex**. Can inject Waterborne into adjacent Flooded; Plant recipients needn't stand on Mycelial. Drying can disrupt its own canal, so solve with terrain/Wetting/Blockers. **Dies after X uninterrupted hours without Mycelial**, not instantly; exact X and emissions during grace remain open. |

**Shared survival rule clarified:** A Mycelial-dependent Fungus that loses required Mycelial, or a Plant exposed to a species-lethal environmental state (Hot, Freezing, overly Wet, harmful Mycelial, etc.), has a **species/hazard-dependent X-hour continuous exposure clock** before death. Nonoptimal conditions are not automatically lethal; Plant exceptions, dormancy and approved species-specific hazard tables remain. Continuous clocks reset on relief. The user specifically rejected instant Mycelial-loss death for Siltgill in favor of an X-hour interval. Whether the fungus emits during its survival grace is still to be specified.

**Transformation state reset — FULLY AGREED in §58:** The user expressly resolved the former ambiguity: a transformed Plant **always starts at 0% Growth**, regardless of the predecessor's progress. No previous accumulated Leaves/Seeds, lethal exposure hours, Dormancy, recipe timers, or other old state survives; the old Plant is removed without harvesting it. The new instance uses its own species' complete Growth/Ripening process and any freshly initialized species-defined trait (such as Starlotus attunement) without inheriting predecessor state. This **supersedes every old Plant-profile phrase about preserving transformation progress**. A transformation itself does not need a second germination roll. Later recipe design should guard against same-tick, zero-time transformation loops.

**Stage-free Transformation eligibility — FULLY AGREED in §59:** A Plant may transform at **any 0–200% progress**; its Growth/Ripening stage and exact lifecycle percentage are never recipe gates. Recipes are Plant-owned and based on Source reach/adjacency, environmental and overlay conditions, **X uninterrupted hours of qualifying exposure**, and transitions such as **Flooded → Damp** or **Freezing → thaw**. Check the just-completed exposure at the transition event before resetting its timer. A new Plant begins its own independent recipe/exposure clocks at zero and can transform again after qualifying exposure without waiting for maturity. **Aquatic Moonlit Lotus's Starlotus/Pearlily fork is preserved by changing Flooded exposure/drainage sequence**, not by requiring the drain during Ripening. The Kelpergeist→Kelpless loss-of-Flooded timer remains. **Silvercress's Flooded-during-Growth and Damp-during-Ripening innate farming bonuses remain stage-specific, because those are NOT Transformations.** Exact fungal assignments and hours remain for the later recipe pass; there is no need for a lifecycle-gating exception.

**Blockers:** The current **selective by Kind / selective by Mode** infrastructure is sufficient; no new Blocker type is needed. The user subsequently APPROVED distinct cultivation Effect Kind categories in **§60**, independently from environmental Kinds; exact category grouping may still be revisited. Further detailed audit work includes fractional output, Mycelial timing/update order, competing-Transformation-recipe priority and Seed identity/rounding. **§60 is the latest interaction-audit authority.**

## Interaction audit approvals and important Yield correction — §60 (26 October 2026)

The user approved: algebraic net stacking of same/opposite Leaf Peak Timing shifts across natural peaks (Rosewraith retains its weak valley), independent Harvest Window widening; intentionally exaggerated Ripening slowdown plus hourly production with a small positive non-dormant rate floor; **Mycelial-dependent Fungi CONTINUE EMITTING while alive throughout the X-hour habitat-loss death countdown**; independent lethal-hazard clocks and **Transformation winning only on exact simultaneous death/Transformation timestamps**; distinguishable cultivation Kind classifications for existing selective Blockers; and per-source overlapping Mycelial support/retreat with Full/Mycelial-Kind Blockers able to block timed spread. Precise threshold timings and implementation details remain open; no Plant/Fungus gameplay code was changed.

**CRITICAL USER CORRECTION:** Standard ordinary Leaf/Seed **Yield bonus is NOT a harvest-time snapshot multiplier.** Plants **earn and track Leaves/Seeds as lifecycle progress proceeds**; a reaching Yield fungus increases output **earned during its actual contact with the Plant's eligible productive interval**, not output earned before it was deployed. Adding a Yield fungus at 100% immediately before harvest must **not** retroactively boost the 50–100% Leaves. Previously earned bonus output is not lost merely because the fungus later disappears; timed Leaves/hour and Seeds/hour bonuses likewise accumulate during their own eligible hours. A Transformation still clears all output. **Leaf–Seed Allocation remains an intentional exception: once-at-harvest 3:1 conversion under §56.**

**OPEN QUESTION TO ASK NEXT:** How should *earned bonus Leaves* behave when the native Leaf harvest curve subsequently declines during Ripening? E.g. normal Plant has 10 Leaves at 100%, 5 at 150%; a Fungus increased actual 50–100% earned Leaves to 12 at 100%. At 150%, should that become **6 Leaves** (same proportional decline) or **7 Leaves** (5 native + 2 permanently protected bonus Leaves), or something else? Do not quietly decide without user input. Timing/window changes should likewise affect *future* earning/decline without retroactive granting of already missed output; exact accounting needs reconciliation with approved natural curves and sterile/Seed identity invariants.

## Updated collaboration priority

The user prefers **bold, meaningful first-pass numbers** and eventual playtest/calculation-driven rebalance, but clarified the sequencing: **finish a more-or-less defined Plant/Fungus roster, audit whether all desired Effects are covered, and read through for logical/feasibility problems BEFORE implementing Plants and Fungi**. This review is easier while changes remain text-only. The user is **not concerned with exact numerical balance**, because values can be adjusted easily later. **Only the Waterborne environmental change was authorized for implementation now.** Continue designing and auditing before adding Plant/Fungus gameplay code; keep Plant-owned transformation recipes separate.

## What to do next, in order

1. **Waterborne work is done:** keep unlimited connected-Flooded traversal and its tests/inspector UI as the implemented environmental foundation. No Plant/Fungus runtime work yet.
2. **Roster breadth provisionally complete:** **31** first-pass approved Fungi. Do not add species merely to fill gaps in stage coverage or force non-Flooded alternatives; revisit only if a Plant mechanic genuinely needs one.
3. **Continue the comprehensive design/logic review while still text-only:** §60 settled several interaction rules, but the accrued-Leaf Ripening-decline question is still OPEN, along with Mycelial timings, dynamic timing/window accounting, Seed identity rounding and detailed competing recipes. Resolve contradictions and glaring spatial impossibilities before coding.
4. **Then implement Plants and Fungi** using the existing React/Vite frontend and independent deterministic rules core, with the approved 3:1 Allocation mechanics and strong initial values. Playtest and adjust exact stage durations, yields, rates, strengths and Spore economy using actual Leaves-per-hex-day/Seed-sustainability metrics.
5. **Keep Plant-owned transformation recipes a separate full pass** across six families; do not invent recipes incidentally during the current roster design or environmental code update.
6. There is **no fixed fungus roster cap**, no second Mycelial-creating species, no generic fungal Transformation Influence, and no need to make weak values just to appear balanced before testing.

## How to collaborate with this user

Work through **small, concrete batches** with named fungi, emitted Effects, habitat/reach, interactions with already designed Plants, and honest feasibility risks. Be precise about **AGREED / APPROVED first pass / PROPOSED / OPEN**. Record changes in the canonical design document when the user accepts or requests them, preserving the distinction between a proposal and approval. Do not overcomplicate fungus survival merely to create content. Avoid replacing meaningful player-built combinations with one-source automatic wins. The user is comfortable adding many candidate fungi before reducing the roster and accepts highly situational Effect sources.

**Suggested opening in the next conversation:**

> Companion Cultivation has **31 approved first-pass Fungi** including sole Mycelial-creator Mycelord. **§57** adds Fogdial, Emberbell and powerful Mycelial-dependent Waterborne Leaf-Yield Siltgill and clarifies species-specific continuous lethal-habitat grace periods. **§58 APPROVES the Transformation reset: every new Plant starts at 0% with no old Plant state. §59 APPROVES NO lifecycle percentage/stage restrictions for ANY Transformation: all recipes use timed environment/Influence/adjacency exposure and transitions instead.** Moonlit Lotus's flood-drain fork is stage-free; Silvercress's stage-based native farming bonuses remain. **§56's 3:1 harvest-time Leaf–Seed Allocation and unlimited Waterborne connected-Flooded reach are APPROVED**; Waterborne is already implemented in Prototype 1, while Allocation awaits runtime. The user wants a comprehensive text-only **logic/feasibility review BEFORE implementing Plants/Fungi**, not perfect numerical balance. Plant-owned exact transformation recipes remain a separate later pass, with event order and competing-recipe priority to resolve there.
