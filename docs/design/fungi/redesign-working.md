# Fungal roster redesign — second-pass working notebook

> **Status: WORKING DESIGN, NOT APPROVED ROSTER OR GAMEPLAY.** Started 28 October 2026. This is a separate exploration of a smaller, more interconnected Fungal roster. The [approved first-pass roster](README.md), [31-species matrix](roster-matrix.md), [full profiles](profiles-foundation.md), [additional profiles](profiles-alternatives.md), and [final additions](profiles-final.md) remain unchanged and authoritative for the currently implemented game until a later explicit approval and migration.
>
> **Change boundary:** This notebook does not change Fungi, Plant recipes, saved games, the Grimoire, numeric tuning, or runtime logic. Pairings below are hypotheses, not commitments.

## Active experiment: randomized full roster (replaces piecemeal pairing review)

The current design exercise is [**Randomized 12-Fungus roster V3**](random-roster-v3.md), a *cultivation-impact redistribution* after the [V2 coverage-first pass](random-roster-v2.md), [V1 structural repairs](random-roster-v1.md), and [unaltered random V0 draw](random-roster-v0.md). V3 explicitly **removes − Germination**, redistributes several stronger effects away from overloaded pairings, and temporarily sets environmental balance aside while leaving those emissions unchanged. Nine ordinary Fungi now have two cultivation effects and three have three; **Mycelord is unchanged**. All earlier versions remain available for full comparison.

**Method correction from the user:** Do **not** finalize or gradually lock individual Fungi before seeing their interactions with the whole roster. The earlier curated A–H and V0.2–V0.3 hypotheses below remain as design history, but are **paused**. First look at this entire random slate through player objectives—Leaves, Seeds, growth speed and transformations—then alter only the impossible, redundant or overly self-contained combinations. Twelve is **an experiment size, not the approved final number**; ten, twelve or another count can emerge later.


### 28 October 2026 — V3 role-impact redistribution (WORKING)

Following the user's direction, stop treating every cultivation effect as equally useful. Direct Leaf/Seed production, high-leverage Growth/Ripening tempo, situational peak/seed timing, and one-time Germination play different strategic roles. **Remove − Germination** entirely and ignore environmental effects during this pairing pass (without changing their underlying values). [V3](random-roster-v3.md) moves + Ripening from F09 to F01, late Leaf peak from F01 to F02, and − Ripening from F02 to F08. The other eight Fungi are unchanged; F03+F12 and F10+F12 remain priority Seed-combination questions, not approved solutions.

## 1. Agreed design direction

The goal is the **smallest compelling roster that preserves distinct cultivation possibilities and meaningful alternatives**—not a predetermined number of species.

- **Mycelord is exempt and stays exactly as designed:** the sole initial creator of timed Mycelial ground, without ordinary environmental or Plant-cultivation emissions. Its existing Flooded vulnerability and colony rules are unchanged.
- For other Fungi, the **working target** is one environmental emission plus **two cultivation effects**. One cultivation effect remains acceptable when a second makes the species worse; three may be justified for a few genuinely special designs.
- **No requirement to retain 30 ordinary Fungi.** Around 14 ordinary Fungi was discussed as an illustration, not a minimum, maximum, or approved count. Fewer may be better.
- **Use a mechanically distinct route, not merely another magnitude, to create alternatives.** For instance, more Leaves can come from ordinary Leaf Yield, time-based Leaf production, or sacrificing potential Seeds through Allocation. One representation of each route is the default starting assumption.
- Avoid **ready-made solutions** in which both effects automatically solve a Plant's optimization problem. In particular, additional Leaves per hour paired with slower/longer Ripening can lengthen the same production opportunity and may be an overly self-contained Marigloom solution.
- Avoid **mathematical cancellation or duplicate bookkeeping** (for example, a positive and negative modifier to the same Leaf Yield axis that simply collapses to one net bonus).
- Prefer **context-dependent tensions**: two effects can both be useful, but their combination should demand positioning, timing, different targets, Blockers, or other deliberate management. A candidate example is hourly Leaf production plus *faster* Ripening: the latter can shorten time spent inside a production window.
- Evaluate the **whole roster**, not just each isolated species. Do not give every Fungus the same second effect or keep a dominated duplicate merely because it already has a name.
- Keep individual Fungus names, environmental emissions, Mycelial relationships, strengths, reach, and production windows **provisional until the revised combinations and transformation coverage are reviewed**.

## 2. Existing effect inventory (baseline, not proposed assignments)

The first-pass game has **30 ordinary Fungi with one cultivation effect each**, plus Mycelord. At the intentionally broad level of *signed mechanical behavior*—ignoring magnitude, delivery mode, exact lifecycle window, and recipient compatibility—those 30 emissions reduce to **15 effect types**.

| Distinct cultivation effect | First-pass Fungi that provide it | Copies |
| --- | --- | ---: |
| Germination chance increase | Hushroom, Dewmender | 2 |
| Growth Rate increase | Rushroom, Quickshade | 2 |
| Growth Rate decrease | Rainmorel | 1 |
| Ripening Rate increase | Wakemorel, Tickbolete | 2 |
| Ripening Rate decrease | Veilcap, Lanterncap | 2 |
| Leaf Yield increase | Chillanterelle, Mistruffle, Siltgill | 3 |
| Seed Yield increase | Emberbolete, Crumblecap | 2 |
| Additional hourly Leaves | Echomorel, Duskleaf | 2 |
| Additional hourly Seeds | Sim'mushro'dim, Brookrill | 2 |
| Leaf peak earlier | Prismorel, Fogdial | 2 |
| Leaf peak later | Glimmergill, Emberbell | 2 |
| Seed timing earlier | Tidegill, Gloamclock | 2 |
| Harvest Window extension | Droughtcap, Rilllace | 2 |
| Seeds-to-Leaves Allocation | Frostfolio, Bristlecap | 2 |
| Leaves-to-Seeds Allocation | Sunspore, Goldgill | 2 |
| **Total existing emissions** | **15 broad types** | **30** |

**Important abstraction warning:** Two copies may differ tactically even when this table merges them: Airborne versus connected-Flooded Waterborne delivery; R1 versus R2; early versus late production windows; directed environmental propagation; source-side Mycelial bonuses; or one of the existing Transformation contacts. Those differences must be checked before retirement. Conversely, different mechanisms that lead to the same outcome (such as all three routes to more Leaves) should usually remain possible without duplicating each mechanism.

**Roster-size implication:** If all 15 broad types appear exactly once and the average ordinary Fungus carries two cultivation effects, the starting design could fit in **seven paired Fungi and one single-effect Fungus**, plus Mycelord. This is an arithmetic observation, **not** a proposed eight-species roster. More species need a justified additional mechanism, tactical exception, new effect, or deliberately unpaired specialist—not filler to hit 14.

## 3. Pairing principles and first hypothesis

Each proposal should explicitly answer these questions:

1. What does each effect contribute on its own?
2. Do they form a strategically complete solution for any existing Plant or transformation, or is there a real trade-off?
3. Does one merely cancel the other on the same quantity?
4. Can a player exploit a meaningful distinction in **Kind, Mode, range, lifecycle timing, or exposure geometry**? If the intended answer is "block one effect and keep the other," prove that the actual Blocker mechanics permit it.
5. Is either effect dominated by another Fungus in the reduced roster? Does it preserve at least one sensible alternative for major cultivation goals?
6. Does this introduce an automatic shortcut, impossible condition, or dependency bottleneck among the 69 Plant Transformation routes?

### Candidate A — hourly Leaves + faster Ripening (UNAPPROVED)

- **Existing effects to investigate:** hourly Leaf generation (currently Echomorel/Duskleaf), with positive Ripening Rate (currently Wakemorel/Tickbolete).
- **Potential tension:** Faster Ripening can reduce hours spent inside a specified hourly-Leaf production window. A player may want the production without that shortened window.
- **Separation hypothesis:** Leaf and Ripening are distinct currently approved cultivation Blocker Kinds, so a selective layout *may* be able to separate their footprints. This still needs a concrete geometry/propagation check, especially if both emanate from the same hex.
- **Risk:** Some Plants or harvesting strategies may benefit from both with no meaningful cost. Test Marigloom and other high-Leaf cases, early/late windows, compatibility, and environmental side effects before assigning a name or magnitude.
- **Status:** Illustration of the desired design philosophy, **not an approved Echomorel change**.

### Deliberately disfavored pair patterns

- **Hourly Leaves + slower Ripening:** risks a ready-made longer hourly-production window, especially for Marigloom. Do not approve without an exceptional, tested reason.
- **Positive Leaf Yield + negative Leaf Yield:** usually just a net Leaf Yield number, not a second mechanic.
- **Seed Yield + Seeds-to-Leaves Allocation:** may create a self-feeding path from extra Seeds directly to Leaves; review as a potential self-contained solution rather than assuming it is automatically a trade-off.
- **Two effects with identical Kind, Mode, and footprint:** cannot be independently filtered by the present Blocker taxonomy; meaningful selective separation would require another distinction or an explicitly approved mechanic change.

## 4. First complete pairing slate — V0.1 (ALL UNAPPROVED)

This is the first **anonymous, deliberately provisional** partition of the 15 existing signed effect types. It keeps **one copy of each** and yields **seven two-effect ordinary Fungi plus one single-effect ordinary Fungus**, with Mycelord unchanged. These are not final names, effect magnitudes, environmental emissions, Mycelial habitats, propagation choices, or a promise that eight ordinary Fungi suffice for the 69 routes.

| Candidate | Cultivation effect 1 | Cultivation effect 2 | Intended puzzle / reason to investigate | Primary concern |
| --- | --- | --- | --- | --- |
| **A — Establishment bargain** | + Germination chance | − Growth Rate | More reliable planting, but a slower start after success. Germination and Growth can be separately classified. | Is delayed Growth a meaningful price, or simply annoying? The Germination effect acts at sowing only. |
| **B — Short-season Leaf producer** | + Hourly Leaves | + Ripening Rate | Faster Ripening means fewer hours inside the hourly-Leaf window. This directly follows the user's counterproductive-but-useful pairing example. | Must confirm the actual window and environmental situation make the tension real. |
| **C — Early Leaves / late Seeds** | Leaf peak earlier | + Hourly Seeds | Favor an earlier ordinary Leaf harvest or wait to accrue Seeds in a later active window. | Could be irrelevant to Plants without meaningful Leaves or Seeds; test recipient compatibility. |
| **D — Leaf volume / Seed schedule** | + Leaf Yield | Seed timing earlier | A larger ordinary Leaf opportunity may compete with the best Seed-harvest timing. | Some Plants may benefit from both without any trade-off; especially test peak alignment. |
| **E — Seed volume / Leaf schedule** | + Seed Yield | Leaf peak later | A better Seed output competes with a potentially later optimal Leaf harvest. | Mirrors D and may feel redundant; test whether it creates a distinct decision. |
| **F — Fast Leaf conversion** | + Growth Rate | Seeds → Leaves Allocation | Reach productive stages sooner and trade away real future planting Seeds for Leaves. | **High self-solution risk:** fast Leaf farming may become too convenient unless Seed sustainability truly constrains it. |
| **G — Delayed Seed conversion** | − Ripening Rate | Leaves → Seeds Allocation | Larger potential Seed harvest at the expense of Leaves and slower turnover. | **High self-solution risk:** additional Ripening time may itself feed the converted Leaf pool; test the actual production curves. |
| **H — Harvest flexibility** | + Harvest Window | *None yet* | Keep a simple, forgiving specialist unless a genuinely worthwhile second mechanic emerges. | Could be unnecessary as a standalone Fungus; don't invent filler merely to make it dual-effect. |

### V0.1 coverage checksum

- **15 of 15** broad first-pass signed effect types appear **exactly once** in A–H.
- **7** paired ordinary designs + **1** single-effect ordinary design; **Mycelord remains separate and unchanged**.
- Each *pair* uses two different currently approved cultivation Blocker Kinds (for example **Leaf vs Ripening**, **Seed vs Harvest Timing**, **Growth vs Allocation**). This makes *selective-by-Kind separation conceptually possible*, but the current implementation only emits one cultivation effect per Fungus. We have **not** demonstrated complete player geometry or propagation for any of these proposed pairs.
- A–E are plausible starting puzzles; **F and G are explicit stress-test candidates**, not preferred answers. H is intentionally allowed to remain simple.
- The D/E mirror pair may itself be redundant, despite using distinct effect types. An effect appearing once is **not** sufficient justification to keep its Fungus.
- Environmental emissions, distances, Airborne/Waterborne modes, fungal habitat classes, Species names and all signed magnitudes are deliberately **unassigned**. Assign them only after Plant-specific and 69-route testing; the first-pass names are reference anchors, not guaranteed survivors.

### Review order before promoting any candidate

1. Test **B** first against Marigloom and other high-Leaf Plants, with a shortened hourly-production window and the possible selective Blocker layout.
2. Test **A** for whether sowing success versus slower Growth creates an enjoyable planning choice.
3. Test **C–E** for whether peak timing and extra production genuinely compete on representative Plants rather than serving as free dual bonuses.
4. Challenge **F and G** aggressively for self-contained production loops and Seed-economy balance; split or replace if necessary.
5. Decide whether **H** earns a slot, gains a genuinely different second effect, or disappears with its functionality represented elsewhere.
6. Only then map candidate effects onto final Fungus identities and update the named-contact Transformation inventory. Every route must remain possible or undergo explicit approved revision.

### 28 October 2026 — user stacking stress test: D + F + B (V0.1 DOES NOT PASS)

**Counterexample from the player perspective:** To farm Leaves, combine **D** (+ Leaf Yield / earlier Seed timing), **F** (+ Growth Rate / Seeds-to-Leaves Allocation), and **B** (+ hourly Leaves / faster Ripening). The combination stacks an ordinary Leaf bonus, conversion of Seeds to Leaves, faster access to harvest, and at least some additional hourly Leaves. None of the secondary effects necessarily requires blocking for a Leaf-focused plan.

**Terminology check:** In V0.1 **B accelerates Ripening**, whereas **F accelerates Growth**. Faster Ripening reduces time spent inside a late hourly-production window, but if the Fungus still contributes additional Leaves overall, adding B can remain an easy net gain.

**Conclusion:** V0.1 passes the *single-copy effect inventory* test but **fails the more important garden-level interaction test**. The apparent tension in an isolated pair is not enough when multiple Fungi can compensate, bypass it, or add independent bonuses. Do **not** promote V0.1 as a roster.

### Revised design criteria (V0.2 direction, not an approved roster)

1. Test each pair **in plausible multi-Fungus strategies** for high Leaves, high Seeds, fast transformation, and sustainable replanting—not only in isolation. Explicitly ask whether adding the Fungus is an almost-free improvement to the chosen goal.
2. A **negative cultivation effect is allowed** when it creates a real cost across separate mechanics. It need not be arbitrarily offset by an opposite modifier on the same axis.
3. A stronger **environmental emission** (the user suggested a possible **+3 Property-step** example) may produce a tactical obstacle that can be blocked or counteracted; this is a **balance option to test**, not an approved universal magnitude. Large emissions may saturate resolved conditions, damage Plants, or become a rote "add the obligatory Blocker" tax. Use context and propagation rather than automatic punishment.
4. **Mycelial dependence or preference** can provide infrastructure costs for selected species, but not as a universal workaround for otherwise self-solving cultivation pairs; Mycelord stays unchanged.
5. One copy of each **existing** mechanism is a useful redundancy heuristic, **not a coverage quota**. The final roster may retire weak types or introduce genuinely new signed effects (such as a Leaf Yield penalty); do not force all 15 existing types into eight Fungi if the combinations are poor.
6. If two Fungi neutralize each other's downsides, assess whether the spatial, economic, environmental, and timing costs make that an earned solution or an effortless dominant combination. "More pieces" alone is not sufficient friction.

### Targeted V0.2 hypotheses for discussion (UNAPPROVED)

| Hypothesis | Cultivation pair | Potential decision | Critical question |
| --- | --- | --- | --- |
| **F revised — user proposal** | **+ Growth Rate / − Leaf Yield** | Faster progression and possible faster crop turnover, but lower ordinary Leaf output while affected | Does earlier harvest actually compensate for lost per-crop Leaves on specific Plants? Can another source cancel the penalty too cheaply? |
| **D revised — alternative to test** | **+ Leaf Yield / − Seed Yield** | More Leaves at a cost to replanting capacity | Is Seed supply a meaningful ongoing constraint for that Plant, or is the downside negligible once Seeds are abundant? |
| **B retained for comparison** | **+ hourly Leaves / + Ripening Rate** | The original window-shortening tension | Does a realistic garden still gain a nearly free marginal Leaf bonus? Might its environmental footprint need a stronger, but blockable, complication? |
| **Possible other penalty structure** | **+ Growth Rate / shorter Harvest Window** | Faster arrival at harvest, but a less forgiving opportunity to harvest well | Is this an engaging timing challenge given that the real-time simulation never pauses during staging? This would be a new signed mechanic, not currently approved. |

**No numeric values, names, environmental magnitudes or implementation rules are approved by this revision.** In particular, negative Leaf/Seed Yield and a shorter Harvest Window require explicit feasibility and save/Grimoire testing if eventually selected.

### 28 October 2026 — V0.3 focused review of the first four candidates (ALL PROVISIONAL)

This pass checks **F, D, B, and A** against real Plant mechanics and then cross-checks the combinations. It refines the questions; it does **not** approve any new ability or choose final fungal identities.

**Mechanics used for this review:** In the playable engine, **Growth Rate affects 0–100%**, while **Ripening Rate affects 100–200%**. Ordinary Leaf/Seed Yield changes prospective production, hourly effects accrue during their own progress windows, and harvest happens at player-selected progress. Hence an apparent "30% faster Growth" is **not** automatically 30% faster time to the chosen harvest progress. The value depends on the Plant's Growth/Ripening durations and desired harvest point.

| Candidate | Focused proposal | Initial verdict | Counterexample / required test |
| --- | --- | --- | --- |
| **F — Growth specialist** | **+ Growth Rate / − ordinary Leaf Yield** (user suggestion) | **Promising, not proven.** Faster access to a productive stage versus fewer native Leaves earned. | For a Seed-focused objective, reduced Leaf Yield can be irrelevant while faster Growth still helps. Test native Leaf throughput, Seed throughput, and harvest-progress choices. Also test whether another source cheaply cancels the Leaf penalty. |
| **D — Leaf specialist** | **+ ordinary Leaf Yield / − ordinary Seed Yield** (assistant hypothesis) | **Conditional, not proven.** Clear sustainability exchange when the Plant generates both items. | **Orchidemon has zero Seeds** in the current species data, so its Seed Yield penalty does nothing there. Other Seedless or already Seed-saturated cases may make this a free Leaf bonus; habitat, environmental cost, or a different pairing may be needed. |
| **B — hourly Leaf producer** | Revisit **+ hourly Leaves / + Ripening Rate** | **Not sufficient as a stand-alone trade-off.** It reduces time inside its own hourly window compared with hourly Leaves alone, but can still add Leaves while speeding harvests relative to no B. | On **Marigloom**, a late Leaf producer can remain an obvious addition to a D+F Leaf layout. Compare a meaningful environmental/propagation constraint against replacing the second effect. A negative Harvest Window effect is only a hypothesis and, in the current curve model, changing Window width also changes ordinary Leaf-scale; do not assume it is merely a harmless narrower time slot. |
| **A — germination catalyst** | Revisit **+ Germination chance / − Growth Rate** | **Situational.** There is an early success-versus-slower-development decision, but the effects act in different phases. | A player may plant near A, then harvest/remove that Fungus after germination to avoid the continuing Growth penalty, potentially sacrificing its future Spore production. This may be an intentional temporary-catalyst cost; a **single cultivation effect** could be cleaner than inventing a fake persistent downside. |

**Current species checks:** [Marigloom](../plants/flowers.md) has a six-day nominal Growth stage within a sixteen-day lifecycle and a late Leaf opportunity; [Orchidemon](../plants/flowers.md) produces no Seeds. These matter when judging whether a negative effect actually constrains the player's objective.

#### Combination tests to repeat on every iteration

- **D + F + B for Leaves:** Does F's −Leaf Yield merely cancel D's +Leaf Yield, leaving +Growth plus B's positive hourly output? Is D's Seed cost real, or irrelevant with a large Seed reserve/Seedless Plant? Can the environment or geometry create a nontrivial decision?
- **F alone for Seeds:** If −Leaf Yield is unimportant to the selected Seed crop, is F a valid intentionally specialized source or an overpowered universal accelerator? Test against other Seed methods and the crop's actual harvest timing.
- **D alone on seedless Plants:** This is a direct counterexample to treating −Seed Yield as a universal cost. A specialist can remain good in a niche, but must not be unintentionally best for every such Plant.
- **A followed by source removal:** Quantify the Spore, replacement, hex-occupation, and setup cost of harvesting the Fungus after a germination benefit has already applied. Do not call that a free exploit or an adequate penalty without checking actual resource economics.
- **B with selective Blockers:** If environmental disruption is the balancing lever, check that the player can block the environmental footprint without also erasing the desired Leaf contact. If the solution is identical for every crop, it becomes an obligatory Blocker tax, not an interesting puzzle.

#### Revised decision gate

A candidate **does not have to be harmful for every objective**: legitimate specialists should exist. It must, however, justify its place against the other candidates and not become an almost-free addition to every high-output garden. The next pass should compare **at least one Leaf-heavy, one Seed-heavy, one early-harvest, and one Seedless Plant**, plus two- and three-Fungus layouts, *before* approving effects, habitats, environmental strengths, or names.

**No V0.3 proposal is approved; no existing first-pass effect, recipe, or game code is changed.**

## 5. Dependencies that must be audited before reducing the roster

### Named Fungus contacts in Plant Transformations

The **69 Plant-owned first-pass routes** currently refer to specific living Fungus names and often use AND-of-OR contact groups. A preliminary literal-name scan of the six implemented transformation-definition files finds **25 of 31** roster names referenced somewhere in those definitions. **Mycelord, Rainmorel, Wakemorel, Sim'mushro'dim, Frostfolio, and Sunspore** were not found as literal names in that initial scan; this is **not** proof that removing them has no gameplay consequences. The 25 figure is not a count of unique recipes and must be validated route by route.

Before retiring or repurposing a named Fungus:

- Enumerate every incoming and outgoing Plant route that uses it, including AND/OR alternatives and any opposing-emission constraints.
- Preserve or explicitly redesign access to all approved transformation destinations; do not silently delete a route.
- Check that the new Fungus's environmental effect, ordinary cultivation footprint, propagation mode, and Mycelial requirements still make each intended route geometrically and environmentally feasible.
- Recheck Plant compatibility, stage applicability, hourly-output windows, harvest behavior, and the no-automatic-solution goal.
- Record proposed recipe changes for **separate approval** before implementation.

Authoritative route sources: [Ingredients](../plants/ingredients.md), [Aquatic](../plants/aquatic.md), [Woodlands](../plants/woodlands.md), [Flowers](../plants/flowers.md), [Desert](../plants/desert.md), and [Spices](../plants/spices.md); the playable definitions are in the matching files under **src/core/**.

### Effect model, propagation, and blockers

The current [Influences and Responses](../systems/influences-and-responses.md) define separate environmental and cultivation footprints and cultivation Kinds such as Growth, Ripening, Leaf, Seed, Germination, Harvest Timing, and Allocation. The current implementation stores **one cultivation emission per ordinary Fungus**. A redesign with two or more will eventually need independent emission definitions, propagation, per-effect compatibility, blocker handling, Grimoire observation, and test coverage. In particular, multiple effects of the same Kind are not independently selectable by Kind alone.

### Persistence and discovery

All 31 Fungi are initially identified in the implemented Cultivation Grimoire. Saves can contain living or staged Fungi, Spore stacks, inventory positions, and discovered interactions/recipes keyed by names. **Removing or renaming species is a migration project**, not simply deleting entries from the registry. Until a specific compatibility plan is approved, do not change saved-game schemas or existing game content.

## 6. Working decision ledger

| Topic | Status | Current position |
| --- | --- | --- |
| Mycelord | **Fixed** | No redesign of its role or emissions |
| Final ordinary-Fungus count | **Open** | Let the minimal strategically complete roster determine the count |
| Standard effect target | **Working direction** | Usually one environmental plus two cultivation effects; exceptions allowed |
| Alternative effects | **Working direction** | Different mechanisms preferred over alternate numerical strengths |
| Existing 15 broad effect types | **Audit baseline** | Candidates for inclusion, consolidation, or replacement |
| Exact effect pairings | **Unapproved** | V0.1 failed D+F+B; V0.2–V0.3 focus on actual Leaf/Seed and Garden-level costs, not a locked roster |
| Species names, ranges, modes, habitat and magnitudes | **Open** | Decide after pairings and route feasibility |
| Negative cultivation effects / stronger environment | **New ideas, unapproved** | Test meaningful trade-offs without forced Blocker or Mycelord taxes |
| Transformation recipe revisions | **Open** | Full 69-route named-contact audit required |
| Save compatibility and Grimoire migration | **Open** | Must be specified before gameplay changes |
| Archiving first-pass documents | **Deferred** | Preserve untouched during exploration and implementation review |

## 7. Next working passes

1. **Effect coverage:** decide which of the 15 broad effects earn a place, whether distinct early/late windows and Airborne/Waterborne variants justify exceptions, and what genuinely new effect types (if any) are missing.
2. **Candidate roster:** propose effect pairs and a small number of exceptions, testing each for real tension, self-solving behavior, and controllable separation.
3. **Transformation dependency map:** enumerate all 69 recipes with their named fungal requirements; reconcile each with the candidate roster.
4. **Whole-system stress test:** simulate representative Leaf, Seed, timing, Allocation, germination and transformation puzzles, including Mycelial edge cases and selective Blockers.
5. **Approval and implementation specification:** only then lock names, emissions, conditions, numeric tuning and required save migration.
6. **Archive older references last:** after the new roster and gameplay/recipe migration are approved and verified, relocate preserved first-pass profiles into an organized historical area, update all incoming links and indexes, and keep sufficient pointers to understand historical saves and decisions. **Do not archive or delete those references yet.**

This notebook exists so we can iterate without rewriting history. The old design remains the playable baseline until an explicit replacement is approved.
