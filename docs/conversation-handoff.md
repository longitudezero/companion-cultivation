# Companion Cultivation — conversation handoff

**Snapshot:** 26 October 2026  
**Purpose:** Help a new design conversation resume without having to reconstruct a long chat.  
**Current phase:** Text-only fungus-roster expansion, before fungal numerical balancing and before the dedicated Plant-transformation recipe pass.

## Read this first

This is a navigation and decision-status note, **not a replacement** for the two canonical documents:

1. [Environmental System v1.1](environmental-system-v1.1.md) — authoritative for the **implemented Prototype 1** hex environment, Sources, signed Modifiers, Conditions, Airborne/Waterborne propagation, directional Spread Budget, Blockers, Anchors, and Environmental Adjacency.
2. [Herbs, Fungi & Cultivation Design](herbs-and-fungi-design.md) — the full **text-only Plant/Fungus design record**, including approved first-pass Plant statistics and the detailed fungal profiles. The latest relevant fungus sections are **§§46–54**; older sections often contain superseded proposals or historical status notes. In any conflict, follow the most recent explicit user approval, as recorded below and in the latest document sections.

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

## Approved first-pass fungal roster: 19 species

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

## Six more fungi proposed in §54 — NOT yet user-approved

The latest design document already contains a drafted alternative-source batch. The old chat ended while this expansion was being prepared, **before the user reviewed these six**. Present them as proposals to the user, or revise them together; **do not silently promote them to approved status**.

| Proposed fungus | Environmental emission | Plant-development effect | Distinguishing cost / reach |
| --- | --- | --- | --- |
| **Dewmender** | Moisture +1 | Germination +4 pp per Plant Seed | Independent, Airborne Range 1 cultivation; weaker Wetting alternative to Hushroom |
| **Lanterncap** | Illumination +1 | Ripening Rate −12% | Independent, Airborne Range 1; brightening alternative to Veilcap |
| **Tickbolete** | Temperature +1 | Ripening Rate +12% | Independent, Airborne Range 1; warming alternative to Wakemorel |
| **Rilllace** | Temperature −1 | Harvest Window width +12% | Independent, **Waterborne Range 3**; alternative to Droughtcap |
| **Duskleaf** | Illumination −1 | +0.08 Leaves/hour at **70–125%** | Independent, Airborne Range 1; early-window alternative to Echomorel |
| **Brookrill** | Temperature −1 | +0.10 Seeds/hour at **120–170%** | Independent, **Waterborne Range 3**; mid-window alternative to Sim'mushro'dim |

If accepted, the working roster would be **25 candidates including Mycelord**, still **not a cap**. The full six-part rationale and feasibility caveats for each are in §54. Their exact percentages, hourly rates, windows, reaches, and all fungus statistics remain first-pass design values, not final numerical balance.

## Leaf–Seed Allocation: what was agreed, and what remains open

The user explicitly said **Leaves are the more valuable harvest**, so gaining **one extra Leaf should generally cost several Seeds**. A mirrored **3 Seeds → 1 Leaf / 1 Leaf → 3 Seeds** conversion was floated as an illustration, **not approved as a final formula or 3:1 ratio**. Explore 2:1, 3:1, 4:1 and species-specific economy/compatibility during the full numerical pass. The design needs explicit bounds, rounding, progress eligibility, and a rule for multiplying effect strength by Plant compatibility. Allocation must require real eligible output to sacrifice: no free Leaf bonus for a Seedless Plant, no Seeds for a sterile Plant, no new Seed identities, no extra harvest, and no mixing Plant Seeds with fungus Spores. Also determine what happens where Leaf and Seed availability do not overlap in progress.

## What to do next, in order

1. **Resume with §54's six newly proposed fungi.** Explain that their profiles exist in the repository but have not been reviewed. Ask the user whether to accept them, adjust them, or explore different alternatives. Do not quietly treat them as approved.
2. **Keep exploring alternatives if useful**, especially additional methods for Seed Timing Shift and the two directions of Allocation, which currently have only one approved source each. Vary environmental side effects, numerical strength, Mycelial needs, propagation paths and eligible progress windows only where they yield meaningful choice. There is no need to stop at 25.
3. Once the user is satisfied with the breadth of the roster, make a **coverage/interaction/feasibility matrix** across all existing Plant-development Effect categories and environmental emissions; test counterplay with blockers, physical footprints, Waterborne paths and Mycelial boundaries. **Then** consider merges, removals or reassignment of Effects that preserve alternatives and spatial puzzles.
4. Conduct the **full fungus-wide numerical/system pass**: species Growth/Sporulation days, Spore yield/availability/germination, exact Source strengths/geometry, stacking and compatibility order, Mycelial boosts and loss behavior, timed Mycelial expansion/retreat, hazard/survival rules, Allocation conversion and rounding, hour-based output exploits, and comparative value across Plants. Reconcile with the implemented environmental rules, without silently rewriting them.
5. **Only after fungi are designed and balanced**, carry out the **separate, comprehensive Plant-owned transformation-recipe pass** for all six families: triggering Sources/Conditions, exposure windows, alternative paths, competing outcomes, and actual spatial feasibility. The main document's earlier network sketches are constraints and directions, not a license to invent final recipes now.
6. Implementation and playtesting come **after the text design is ready and the user asks for code changes**.

## How to collaborate with this user

Work through **small, concrete batches** with named fungi, emitted Effects, habitat/reach, interactions with already designed Plants, and honest feasibility risks. Be precise about **AGREED / APPROVED first pass / PROPOSED / OPEN**. Record changes in the canonical design document when the user accepts or requests them, preserving the distinction between a proposal and approval. Do not overcomplicate fungus survival merely to create content. Avoid replacing meaningful player-built combinations with one-source automatic wins. The user is comfortable adding many candidate fungi before reducing the roster and accepts highly situational Effect sources.

**Suggested opening in the next conversation:**

> We're continuing Companion Cultivation's text-only fungal design. I've read `docs/conversation-handoff.md`, `docs/herbs-and-fungi-design.md` (especially §§47–54), and `docs/environmental-system-v1.1.md`. We have 19 approved first-pass fungi, with six additional alternatives proposed in §54 but not yet approved. Let's review those six, then keep expanding alternatives as needed before roster consolidation and numerical balance. No Plant transformation recipes or code changes yet.
