# Transformation sibling exclusivity and event-boundary audit — pass 13 (27 October 2026)

> **Static design verification, not a gameplay simulation or user acceptance certificate.** The original `docs/herbs-and-fungi-design.md` at commit `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b` and the existing root README remain frozen. This review checks the approved final source against the new staged documents only.

## 1. Exact recipe-source preservation

Re-read approved source sections **§§67,69,71,73,74,76** in the **frozen original** and compared the corresponding `docs/next/plants/` sections.

| Family / approved section | First-pass Transformation routes | Markdown table lines preserved character-for-character |
| --- | ---: | ---: |
| [Ingredients §67](../plants/ingredients.md) | 6 | 16/16 |
| [Aquatic §69](../plants/aquatic.md) | 14 | 16/16 |
| [Woodlands §71](../plants/woodlands.md) | 13 | 15/15 |
| [Flowers §73](../plants/flowers.md) | 12 | 19/19 |
| [Desert §74](../plants/desert.md) | 13 | 25/25 |
| [Spices §76](../plants/spices.md) | 11 | 11/11 |
| **Total** | **69 routes** | **102/102 table lines** |

The **102** count refers to Markdown table lines (including column headers and separators), **not** 102 distinct Transformation routes. The non-identical prose within a few staged source sections consists of editorial status corrections and extra separators; the §69 and §76 sections themselves match their frozen approved source sections exactly. None of the final route-table lines differs.

## 2. Sibling-route exclusivity at the abstract rule level

For each Plant with more than one outgoing recipe, normalize the **resolved Moisture, Temperature and Illumination Conditions at the trigger**. Any pair requiring two different values of the same resolved Property is mutually exclusive, regardless of how many different Fungi can reach it. For event-triggered recipes, compare the qualifying pre-event history and strict event predicate separately. This follows [§66](../systems/transformations.md#66-each-plants-alternative-transformation-recipes-must-be-mutually-exclusive--approved-design-requirement) and the three-Property environment.

| Family | Source Plant with sibling routes | Pair checks | Disjoint requirement |
| --- | --- | ---: | --- |
| Ingredients | Potato | 15 | Flooded/Dry/Damp, then Cold/Warm/Temperate and Lit/Bright |
| Aquatic | Aquatic Base | 3 | Flooded vs Damp, or Temperate vs Cold |
| Aquatic | Kelpfull | 1 | Flooded vs Dry/Damp |
| Aquatic | Kelpergeist | 1 | Flooded vs NOT Flooded |
| Aquatic | Moonlit Lotus | 1 | Pre-drain Cold/Dim/Flooded → **Damp** event vs continued **Flooded** Temperate/Lit |
| Aquatic | Wild Watercress | 1 | Flooded vs Damp |
| Woodlands | Woodlands Base | 3 | Warm/Temperate and Lit/Dim |
| Woodlands | Tanglethorn | 1 | Dim vs Lit |
| Woodlands | Mistlefoe | 1 | **Mistruffle loss after ≥12h but strictly before 20h** vs both contacts retained through 20h |
| Woodlands | Mandrabra | 1 | Bright vs Dim |
| Flowers | Daisydaze | 3 | Temperate Lit/Dim vs Warm Bright |
| Flowers | Charmomile | 1 | Warm/Bright vs Cold/Dim |
| Flowers | Lavendream | 1 | Cold/Dark vs Warm/Bright |
| Desert | Jadeheart | 3 | Hot/Freezing/Warm and Damp/Dry |
| Desert | Ember Aloe | 1 | Same Hot→Warm event with **<36h** vs **≥36h** continuous prior Hot |
| Desert | Moonjade | 1 | Dim vs Lit on the qualifying Freezing→Cold thaw |
| Desert | Cactopus | 1 | Dry/Bright vs Damp/Dim |
| Spices | Thymely | 3 | Bright vs Dim vs Dark, plus Temperate/Cold |
| Spices | Sunrice | 1 | Bright vs Lit, plus Warm/Temperate |
| Spices | Moonrice | 1 | Dim vs Dark, plus Temperate/Cold |
| **Total** | **20 multi-route source Plants** | **44** | **42 resolved-Property partitions; 2 exclusive event/history partitions** |

**Result:** No logically overlapping sibling pair was identified in the approved first-pass predicate descriptions. The two event/history partitions rely on **strict timing boundaries**, not differing named Fungi or route-duration lengths alone. These are *rule-level* partitions assuming singular resolved Conditions and correct event-history snapshots. They are **not evidence that every specified condition/contact can be physically built on the board**.

## 3. Event-time and reach regression cases for future implementation

| Case | Approved boundary to preserve | Test expectation / outstanding detail |
| --- | --- | --- |
| **Mistlefoe fork** | Contact from Mistruffle plus Fogdial/Veilcap prepares the Plant; losing Mistruffle at **12h ≤ t < 20h** triggers Mandrabra, retaining both through **20h** triggers Mistlewoe | Verify loss at 12h, just before 20h, and at exactly 20h. **At 20h loss cannot select Mandrabra**; exact same-timestamp removal versus maturation order must honor §§64/71 |
| **Ember Aloe recovery** | Hot→Warm with Chillanterelle/Rilllace; **t <36h** → Ashen Rose, **t ≥36h** → Aloemancer | Test 35h 59m, exactly 36h, and absence of recovery contact; the Hot clock is evaluated *before* transition reset |
| **Moonjade thaw** | **≥48h uninterrupted Freezing**, then Freezing→Cold with new Damp + **Dim** or **Lit** and proper contact | Test just below/exactly 48h, wrong thaw temperature, Dormancy stopping growth but not hazard/exposure clocks |
| **Moonlit Lotus drainage** | Flooded/Cold/Dim with Tidegill/Rilllace for **24h**, then a real Flooded→Damp transition | Pre-drain history can qualify despite Waterborne reach being lost on drainage. The continued-Flooded Temperate/Lit Pearlily route must not fire on the same event |
| **Kelpergeist water loss** | Continuous **NOT Flooded (Dry or Damp) 18h**, no fungus required | Test Dry↔Damp continuity, Flooded restoration resetting the timer, and separation from the longer Dry hazard |
| **Daisyspell Orchidemon sequence** | Damp/Temperate/Dim + Veilcap/Fogdial for 10h; after leaving Dim, reach Bright within 8h with Prismorel/Glimmergill | Window starts **when leaving Dim**, not entering Bright; Lit may be traversed. Exact equality at the 8h deadline merits an explicit implementation test |
| **Ghost Rice Glass Apple sequence** | Damp/Temperate-or-Cold/Dark + Gloamclock/Duskleaf for 12h; leave Dark, reach Lit within 8h with Prismorel/Lanterncap | Dark→Dim→Lit is legal. Preserve conditions during transition, reset failed attempts; test the exact 8h boundary |
| **Pum'king overlap** | Net **Lit** with **both actual positive Brightening and negative Darkening environmental footprints reaching** for the full recipe duration | Cultivation-only reach can count as ordinary named contact elsewhere, but cannot substitute for either mandatory opposing **environmental** emission |
| **Contact vs developmental applicability** | §68: contact via any actual emitted environment/cultivation footprint regardless of current Growth/Ripening stage | Test contact while the reached cultivation Effect currently confers no bonus; Blockers and Waterborne connectivity still govern spatial reach |
| **Death and Transformation** | §60D: if a valid Transformation and lethal death mature at the **same finest timestamp**, Transformation wins | New Plant begins at **0%** with cleared exposures/output; one Transformation per event, no zero-time recursive chain or invented sibling priority |

The eight-hour "within" endpoints are not explicitly compared using mathematical `<` or `≤` language in §§73/76. **Do not choose silently** during coding: record the observed same-timestamp behavior and confirm any genuinely unresolved boundary with the user. By contrast, Mistlefoe and Ember Aloe already specify strict or inclusive cutoffs explicitly.

## 4. Authority and remaining proof obligations

- Final contact conditions, times, special clauses and route destinations come from the frozen **approved original §§67/69/71/73/74/76**; the [staged family pages](../README.md#plant-families) retain their exact approved table lines.
- No biological simulation has been run. The normalized comparison does **not** verify finite hex-board layout, actual multi-source emission intersections, directional Prismorel traversal, selective Blockers, Flooded Waterborne reach, colony support, hostile Plant survival throughout a route, or possible same-timestamp scheduler edge cases.
- The six-step [event order](../systems/simulation-and-time.md) and [contact rule §68](../systems/transformations.md#68-transformation-ingredients-environment-plus-named-fungal-contact--approved-with-ingredients-exception) must be respected by all future feasibility tests.
- **No active recipe text or numerical table was changed in this pass.** The old documents remain available for the final side-by-side comparison. This audit is a narrow evidence checkpoint, not sign-off on all surviving qualitative paragraphs or user approval.

## 5. Current staging navigation/preservation checkpoint

- **40/40** staged Markdown files are reachable from the reorganized [documentation index](../README.md).
- Checked **613** ordinary relative Markdown destinations and **31** heading-fragment destinations against the repository file graph: **0 unresolved**.
- This is a static source check. Rendered GitHub presentation, external links and runtime-generated paths remain untested.
- The entire review is **additive within `docs/next/`**. Confirm **0 modified/deleted pre-existing files** with the frozen-base GitHub commit comparison after publication.

Next practical step: build representative **minimal feasible hex layouts** or a small state-machine test harness that implements the approved emissions/Blockers and event order, then challenge each sibling fork and timed edge case rather than relying only on prose.
