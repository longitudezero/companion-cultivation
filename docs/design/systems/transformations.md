# Plant-owned Transformations — shared rules

> **ACTIVE · APPROVED FRAMEWORK — Prototype 16.** Cross-family timing, stage independence and reset rules apply to the live game. The first-pass route examples and older contacts retained below are historical; [V9](../fungi/random-roster-v9.md) is the current authority for all 69 recipes.

> **Implemented redesign (updated 29 October 2026):** [V9's 69 recipes](../fungi/random-roster-v9.md) use **only the final resolved target-hex environment/state transitions** plus **mandatory contact from specified named living Fungi** for 67 routes. **Kelpfull and Kelpergeist → Kelpless** are the two fungus-free exceptions: remaining Dry or Damp for **96h/48h** respectively. No environmental state must come from a particular Fungus or exact emission strength. V9 is the current design and runtime rule; the old recipe conditions below are historical examples only.

**Recipe locations:** The current concrete recipes are together in [V9](../fungi/random-roster-v9.md). The first-pass, superseded recipe tables remain in the six [Plant family documents](../README.md#plant-families) for provenance. This file contains the shared Transformation framework.

## 58. Transformation RESTARTS every new Plant at 0% — APPROVED; supersedes progress continuity

**Status (26 October 2026): AGREED and explicitly clarified by the user.** The earlier assumption that Transformations preserve 0–200% lifecycle progress was a mistake and is **REJECTED**. Every Transformation replaces the old Plant with a new Plant starting at **0% Growth**, as if freshly placed in that species' first stage. This applies across **all six families, all transformation edges, successful/recovery/unwanted branches, and every species that is obtained exclusively through Transformation**. All previously approved Plant durations, yield curves, environmental Responses, hazards, Seed identities and compatibility values remain first-pass starting values; only the transformation continuity assumption changes. **No code implemented yet.**

1. **Object replacement, not progress mutation:** Remove the old Plant instance and create a new instance of the destination species **on the same hex** at **0%**. This counts as the sole object occupying that hex, not two simultaneous objects. No Seed-planting attempt or germination roll is required by an ordinary Transformation; the source Plant already existed.
2. **Discard all old transient state:** None of the old Plant's Growth/Ripening progress, already available or banked hourly Leaves/Seeds, Seed inventory at partial progress, hazard/death exposure hours (Freezing, Hot, Mycelial, Dry/Wet etc.), Dormancy flag, source/exposure recipe timers, or other accumulated state carries over. A sterile destination remains sterile; no old Seed identities can leak through.
3. **Initialize the new species cleanly:** Use its species-specific Growth speed and current resolved environment starting at 0%. Start any newly applicable hazard/exposure clocks from zero. Source Influences currently reaching the hex may begin affecting the new Plant according to its own compatibility and eligibility, but do not retroactively earn output or exposure from the predecessor's past.
4. **Transformation-context traits are new initialization, not inheritance:** Existing approved origin-defined exceptions, notably Starlotus's Damp/Flooded attunement according to the qualifying source route, may be assigned **freshly at the moment the new species is created**, if that Plant's own established trait requires it. They are not copying the predecessor's accumulated state and do not change the new 0% lifecycle start.
5. **One destructive harvest still applies:** A transformed Plant is a new unharvested instance that can eventually yield its own single consuming harvest. Nothing from the destroyed predecessor is automatically harvested or awarded. The new species must actually advance through its own eligible Leaf/Seed production windows. A target with Leaves only at **50–120%** can now reach that interval even if its precursor transformed at **150%**.

**Feasibility consequences:** Old warnings that Daisyspell, Cactaclysm, Glass Apple, Orchidemon or Rosewraith must be reached *before the predecessor's peak percentage* no longer apply. The **new species' full Growth/Ripening time matters for harvesting that species, NOT for eligibility to transform it again**. Transformation-chain speed is governed by the exposure durations, event sequences, and Source/environment setups in each Plant-owned recipe, with **no lifecycle percentage/stage gate** (§59). A chain can advance through multiple identities long before any intermediate Plant matures. First-pass lifecycle numbers are not preemptively rebalanced.

**Current same-timestamp safeguard (§§58,64,66):** A newly transformed Plant is a **fresh 0%-Growth instance with all recipe/exposure clocks cleared**. Its next eligible exposure can begin under the newly resolved state but cannot inherit its predecessor's elapsed time or cause an unbounded zero-time cascade. The six-step event order (§64) governs state recalculation; death-versus-Transformation ties use §60D. **No generic priority or winner rule between competing Plant-owned recipes is approved**—§66 requires mutually exclusive outgoing conditions. Any newly discovered same-instant conflict must return for design review, not be silently ordered.

---

## 59. Transformation eligibility is environment-and-exposure driven, never lifecycle-gated (APPROVED)

**Approved global rule (§§59,67–76):** Lifecycle progress and stage determine farming and harvest output; the Plant's own environmental/exposure recipe determines what species it can become. Transformation may occur at **any 0–200% lifecycle progress** (including Growth, Ripening and 0%) whenever its exact recipe is fulfilled. **No route checks a precise percentage, maturity minimum/maximum, or Growth versus Ripening.** All **69 Plant-owned first-pass recipes** are now specified in their family documents, not deferred. §17's old stage-gated proposal and drainage-during-Ripening example are superseded; biology runtime remains unimplemented.

### A. What counts toward a Transformation

1. **Plant identity and its own permitted outgoing edges** determine which recipes exist. Ingredients terminal Plants remain untransformable.
2. **Currently resolved Moisture, Temperature and Illumination**, qualifying transitions and actual **emitted Influence-zone contact** from specifically named living Fungi (or Ingredients' approved generic *environmental emission* exception) are the permitted recipe ingredients (§§67–70). **Adjacency alone is insufficient** without actual propagation; **Mycelial overlay on the target Plant hex is not a recipe gate**. Fungal source-side Mycelial support remains an independent habitat/reach constraint. No generic Transformation Influence exists.
3. **X uninterrupted hours of qualifying exposure** are the ordinary timed prerequisite. Breaking the relevant condition resets that Plant's associated recipe timer; different recipes may have separate timers. No lifecycle-progress gate is implied by duration.
4. **Ordered environmental events can be requirements:** for example, remain Flooded for X uninterrupted hours and then drain to Damp; or withstand Freezing for X hours and then thaw. Evaluate the just-completed qualifying exposure **immediately before** the environmental change resets its timer; the change event can activate a Plant-owned recipe when its other requirements hold. No permanent historical “bank” is introduced.
5. On success, §58 applies: replace the precursor with a **fresh 0%-progress new Plant**, clearing its old exposure/recipe/death timers and accumulated output. A next Transformation may begin qualifying immediately with **new exposure time**, without waiting for the new Plant to grow to 100% or any other percentage.

**No lifecycle restriction exception is needed for Aquatic.** The complete six-step state/event order is approved in **§64**, simultaneous Transformation-versus-death completion has the **§60D Transformation-wins tie**, and **§66** requires design-time mutual exclusivity of sibling Transformation recipes—**no generic sibling priority**. Implementation-specific equal-time event details may still require tests, but never a Plant maturity gate.

### B. Aquatic flood-and-drain fork without a stage check

These four Aquatic branches have complete, approved named-contact and timing recipes in **[Aquatic §69](../plants/aquatic.md#69--aquatic-family-approved-first-pass-transformation-recipes-26-october-2026)**. This table is only a stage-free interpretation cross-check; §69 is the canonical recipe source if any wording here diverges.

| Existing Aquatic edge | Stage-free environmental sequence / distinction |
| --- | --- |
| **Moonlit Lotus → Starlotus** | **§69:** Flooded, Cold, Dim with **Tidegill OR Rilllace** for **24h**, **then Flooded → Damp drainage**. Its pre-drain exposure qualifies at the transition; the new 0%-Growth Starlotus receives fresh **Damp attunement**, with no Ripening check. |
| **Moonlit Lotus → Pearlily** | **§69:** Stay **Flooded, Temperate, Lit** with **Dewmender OR Mistruffle for 24h**; no drain event or Growth/Ripening threshold. New Pearlily begins at 0%. |
| **Kelpergeist → Starlotus** | **§69:** Stay **Flooded, Cold, Dim** with **Tidegill OR Siltgill for 28h**. New 0%-Growth Starlotus receives fresh **Flooded attunement**; no maturity threshold. |
| **Kelpergeist → Kelpless** | **Current environmental-only exception:** Continuous **NOT Flooded (Dry OR Damp) for 48h (4 real minutes)**, **no Fungus contact**; restoring Flooded interrupts/resets this clock. New Kelpless begins at 0%. |
| **Kelpfull → Kelpless** | **Current environmental-only exception:** Continuous **NOT Flooded (Dry OR Damp) for 96h (8 real minutes)**, **no Fungus contact**; restoring Flooded interrupts/resets this clock. Kelpfull's Dry-death threshold also increases to 96h so the transformation can win the exact-timestamp tie. |

**Physical feasibility:** A Waterborne cultivation Influence that qualified the Plant while Flooded may stop reaching it as soon as drainage breaks connectivity. A transition recipe may inspect the **pre-change exposure and arriving state** at the event; any Influence required *after* drainage must truly propagate to the new non-Flooded state by its ordinary rules (e.g. independent Airborne reach). Do not create a special Waterborne exception merely to force a route to work.

**Preserved Aquatic distinctions (§§26–28,69):** Starlotus has the two established, **freshly initialized Damp/Flooded attunements** and reversible **+60% natural Leaf bonus**; Moonlit Lotus's harvest choices, Pearlily's Cresscent shortcut and Kelpless's redemption path remain. **All 14 first-pass Aquatic recipes are assigned in §69**, including the four summarized above. Silvercress's **+60% Flooded Growth rate while Growing** and **+50% Damp Leaf Yield while Ripening** are *cultivation traits*, never Transformation eligibility rules.

### C. Economy versus discovery time

**Chain timing (§§58–59):** Resetting a new Plant to 0% does **not** delay its next Transformation until maturity. A chain A → B → C may proceed after A's actual qualifying exposure plus B's own **fresh, non-inherited** exposure and transitions, even when B never matures. The full new lifecycle matters for a chosen *harvest*, while all **already approved** recipes specify their own environmental setup time; no numeric stage gate is added.

**Future implementation tests:** A transformation at 0%, 75%, 150% and 200% under otherwise identical qualifying exposure; pre-drain exposure snapshot before timer reset; Waterborne loss at drainage without ghost influence; Flooded-restoration interruption of Kelpless countdown; multiple independent recipe timers; new Plant reset with no inherited timers; no recursive same-instant Transformation; Silvercress's stage-specific non-Transformation bonuses unaffected.


---

---

## 66. Each Plant's alternative Transformation recipes must be mutually exclusive — APPROVED DESIGN REQUIREMENT

**Status (26 October 2026):** Asked what should happen when a Plant satisfies two Transformation recipes simultaneously, the user directed: **“we should not make it possible to satisfy two Transformation recipes simultaneously. if we cant guarantee that we should come back to this question.”** Therefore, do **not** invent or approve a generic random, numerical, alphabetical, first-listed, or hidden priority rule to choose a winning destination.

- **Design outgoing alternatives to be mutually exclusive:** For each Plant with multiple possible destinations, use its approved Plant-owned exposure/event/Source/environment requirements so **no feasible garden state and event timestamp can make more than one outgoing recipe valid at once**. The approved first-pass recipe tables must continue to satisfy all competing pairs, including cases involving multiple reaching fungi, Blockers, Waterborne paths, simultaneous environmental transitions, and independently elapsed exposure timers.
- **Different named Sources or different exposure durations alone do not guarantee exclusivity:** A player may supply both Sources and may start their separate uninterrupted timers at different moments. Favor genuinely incompatible eligibility conditions or event predicates when choosing recipes; prove incompatibility under the actual propagation and environmental rules rather than asserting it informally.
- **Keep earlier rules separate:** A Transformation still replaces the old Plant with a fresh **0%-progress** instance (§58), has **no lifecycle-percent/stage prerequisite** (§59), and wins an **exact same-timestamp tie against that Plant's death** (§60D). The one-Transformation-per-resolution-event safeguard prevents zero-time chaining; it is **not** a substitute for mutually exclusive sibling recipes.
- **If an exclusivity guarantee fails, return to the user:** Do not silently force an arbitrary recipe winner or change an approved destination. Revisit the specific overlapping recipes and propose mutually exclusive conditions; ask about an explicit conflict rule only if true exclusivity proves infeasible. **All six families' 69 approved first-pass routes include textual sibling-exclusivity reasoning**, but the stated reach/Blocker/timer conditions still need **physical garden-layout and event-simulation verification**.

**Current scope:** The generic conflict rule remains **design-time mutual exclusivity**, never hidden priority. All **69 first-pass recipes** are assigned across six families with pairwise exclusivity reasoning recorded in the source family sections. Physical placement, blocker and transition-event feasibility still requires runtime simulation tests; any demonstrated overlap should be returned for user design review, without inventing a winner. No Plant/Fungus gameplay implementation exists.

---

---

## 68. Transformation ingredients: environment plus named fungal contact — APPROVED, with Ingredients exception

**Status (26 October 2026):** The user clarified that **ordinary Plant-development/Growth Effects must not themselves count toward Transformation requirements**. Recipes outside Ingredients should instead use **environmental conditions/events and contact with explicitly named Fungi**, where contact means the Plant is within **any actual Influence zone emitted by that named Fungus**. In follow-up the user clarified that **Ingredients deliberately remain simpler**, retaining their §67 generic environmental-emission requirements. The user explicitly chose **“any influence zone counts”**, not just the environmental one.

### A. Allowed Transformation recipe inputs

- **Environmental prerequisites:** Currently resolved **Moisture, Temperature and Illumination** Conditions, their ordinary transitions (e.g. Flooded→Damp), and X uninterrupted hours. **Mycelial presence on the target Plant hex is not an eligible recipe prerequisite** under later §70. Mycelial can still affect survival, fungal source habitat and reach. Previous-transition snapshots and the fresh 0% Plant identity reset remain valid (§§58–59,64).
- **Named fungal contact (five other families):** A Plant has contact with an explicitly identified Fungus species if at least one **living instance** of that named species has **any one of its ordinary emitted Influence footprints actually reaching the Plant's hex**. Either its environmental emission zone **or** its cultivation/development emission zone qualifies. Matching Source/Edge/Hex Blockers and its actual Airborne, routed or Waterborne propagation are honored separately per emission. A recipe may explicitly name multiple acceptable species as alternatives, preserving choice where desired.
- **Stage-independent contact geometry:** A fungus's cultivation emission can establish **contact** through its propagated spatial footprint even when the Plant is outside that cultivation Effect's applicable Growth/Ripening percentage window. The Influence's *bonus magnitude or current developmental applicability* is irrelevant to contact: otherwise recipes would silently acquire forbidden lifecycle-stage gates. Alive Fungi emit their approved Influences from germination until death/harvest, including agreed habitat-loss grace periods (§60C).
- **No extra radius or adjacency shortcut:** Being physically adjacent to a named Fungus does **not** by itself qualify unless the Plant is actually within one of that Fungus's unblocked emitted Influence zones. There is no separate fictional generic Transformation Influence, and the Plant never has to achieve a particular Growth Rate, Ripening Rate, Leaf/Seed Yield, Window, Timing or hourly-production bonus value to transform.

### B. Explicit Ingredients exception — §67 is unchanged

The six **approved Potato→Ingredients** recipes remain exactly as defined in §67: **resolved environmental Condition signature + an actual reaching environmental emission of a given signed Kind/Property from any living Fungus** for X uninterrupted hours. They do **not** require an individually named fungus species. Thus Potato→Rice still accepts **any reaching fungal Wetting +1** paired with Flooded, and Potato→Apple still accepts **any reaching fungal Cooling −1** paired with Damp/Cold. Their durations, numerical Conditions, demonstration source setups and pairwise-exclusivity proof remain approved and unchanged. This exception is intentional because the user wants **Ingredients easier than other families**.

### C. Remaining implementation/design boundary

- **Approved recipe destinations:** The five non-Ingredients families use the allowed environmental and **named fungal contact** inputs. Their complete first-pass recipes, clocks, transitions and exclusivity reasoning are in [Woodlands](../plants/woodlands.md), [Aquatic](../plants/aquatic.md), [Flowers](../plants/flowers.md), [Desert](../plants/desert.md) and [Spices](../plants/spices.md); **69 total** routes including Ingredients. No recipe tests actual Growth/Ripening/Yield bonus magnitude.
- **Mycelial distinction (§§68,70–72):** No first-pass Plant Transformation recipe requires Mycelial overlay **on its target Plant hex**. Mycelial-dependent named fungi (e.g., Rushroom/Siltgill) may be supported on their **source** hexes and make ordinary emitted Influence contact with a Plant elsewhere. Mycelord produces the overlay but no ordinary environmental/cultivation Influence zones, so overlay contact alone is **not** a named-Fungus contact shortcut. Preserve survival/retreat rules separately.
- The rule does **not** change fungal emission strengths/footprints, add a generic Transformation Influence, alter the 31-species roster, relax §66's mutually exclusive outgoing recipes, or implement biology. Maintain the distinction between **contact by zone** and **the actual production bonus applied to a Plant**.
