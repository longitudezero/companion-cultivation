# Shared-rule precedence and qualitative exceptions — editorial pass 6

> **Reconciled against the frozen original, 27 October 2026.** This is a review of which already-approved design statement controls when earlier paragraphs conflict. It is **not a new game-mechanics approval**, and all original docs and the root README remain untouched. Earlier staged wording corrected in this pass is reproduced verbatim in [historical material](../history/superseded-design.md#editorial-pass-6--historical-transformation-precedence-and-recipe-progress-prose-27-october-2026).

## Source-text preservation beyond numbers

The source is the untouched `docs/herbs-and-fungi-design.md` at commit `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b`. The scan examined **every non-heading source line containing at least eight visible characters**, not just table rows or numerical data:

- **3,016 / 3,020** occur **character-for-character** in at least one staged active topical draft or the historical archive.
- The remaining **four** have exactly the same wording after **Markdown environment-document links** are normalized to their relocated targets (opening context, §§14,61,64).
- **0 source lines are unaccounted for** by that line-presence test. It checks preservation, not whether the line was put in the correct *current* document.

For the particularly important **§§58–68** shared-system rule sequence, the source contains **125 substantive non-heading lines**: **103** still occur verbatim inside their own current rule sections, **20** are preserved in history after deliberate corrections, **two** differ only in relocated link destinations, **zero** absent. The [numbered-section crosswalk](source-crosswalk.md) remains the source-to-destination index. The prior [numeric audit](numerical-source-preservation.md) separately covers 1,157 Plant/Fungus profile/numeric table rows and all approved recipe-table rows.

## Current rule precedence — implementation contract

When reading an older proposal or batch-progress comment, use the approved rule and explicit exception at the location below. This table is a review index, not replacement for full technical wording.

| Concern | Current authoritative specification | Historical interpretation to reject / key exception |
| --- | --- | --- |
| Environmental Properties | [Environment v1.2](../systems/environment.md), [§61](../systems/mycelial.md) | Exactly **Moisture, Temperature, Illumination**; no permanent Material or Fertility. Environmental propagation is already implemented; biology is not. |
| Fungus environmental vs cultivation reach | [Influence rules](../systems/influences-and-responses.md), [fungal parameter matrix](../fungi/roster-matrix.md) | Separate emitted Influences have independent Kind/Mode, routes and Blockers; cultivation reach does not imply environmental contact or vice versa. |
| New Plant on Transformation | [§58](../systems/transformations.md) | Replacement creates a **fresh 0%-Growth instance** on the same hex; old output, exposures, hazard clocks and prior stage do not carry over. Starlotus attunement initializes fresh, not as inherited progress. |
| When a Plant may transform | [§59](../systems/transformations.md) | Any 0–200% stage, including Growth; **no percentage, maturity or Growth/Ripening recipe gate**. Early Flowers' pre-100% harvest peaks are separate farming behavior. |
| Non-Ingredients named contact | [§68](../systems/transformations.md) | A named living Fungus must **actually reach the Plant via environmental OR cultivation Influence footprint**. **Physical adjacency without emitted reach is insufficient**; current effect magnitude/stage eligibility does not matter. |
| Ingredients' simpler exception | [§67](../plants/ingredients.md), [§68](../systems/transformations.md) | Potato's six recipes inspect a **generic reaching fungal environmental emission** of the specified signed Kind/Property, not a named fungus, arbitrary cultivation-only emission or new Transformation Effect. Other Ingredients are terminal. |
| Mycelial at the Plant versus fungus source | [§§68,70–72](../systems/transformations.md), [Woodlands recipes](../plants/woodlands.md) | **No recipe requires Mycelial on the target Plant hex**. Rushroom/Siltgill can depend on Mycelial at **their own source hex** and contact a Plant elsewhere. Mycelord's overlay alone is not an ordinary named-fungus Influence contact. |
| Competing sibling Transformations | [§66](../systems/transformations.md), each family's recipe-exclusivity audit | **No generic numerical/first-listed/random priority** is approved. Approved outgoing conditions must be **mutually exclusive**; if actual overlapping triggers are found, return to user design review. Textual proofs still need garden-layout tests. |
| Death and Transformation same timestamp | [§60D](../systems/influences-and-responses.md), [§64](../systems/simulation-and-time.md) | **Transformation wins** the exact death-versus-Transformation tie. Limit to **one Transformation per resolution event**; do not let new 0%-Growth instance recursively inherit old time. This tie rule does **not** establish competing-recipe priority. |
| Six-step state/event order | [§64](../systems/simulation-and-time.md) | Accrue old-interval production/exposure under prior conditions; apply event; resolve environment; Mycelial; fungal reach; new living Responses. **Pre-drain exposure snapshot** may qualify a transition despite Waterborne reach disappearing on drainage. |
| Mycelial spread/retreat | [§§61–63](../systems/mycelial.md) | Flooded interrupts support immediately; spread and withdrawal consume **elapsed game time**, maintaining independent overlapping source contributions. Flooding Mycelord starts its own still-open X-hour lethal timer, not instant deletion. |
| Dependent-Fungus grace | [§60C](../systems/influences-and-responses.md), [roster](../fungi/README.md) | Rushroom/Siltgill remain alive and emit **both normal Influences at full strength** during their still-open continuous X-hour source-support-loss grace. |
| Yield and natural environmental output | [§60G](../systems/influences-and-responses.md), [§65](../systems/seeds-spores-and-harvesting.md) | Compatible ordinary fungal Yield and native environment multipliers are **earned prospectively during production**, not retroactively applied to all accumulated harvest output; ordinary Yield-enhanced Leaves follow their natural decline (Option A). |
| Hourly production versus Allocation | [§56/§65](../systems/seeds-spores-and-harvesting.md), [fungal matrix](../fungi/roster-matrix.md) | Hourly production requires active footprint and **positive lifecycle progress inside the emitter's window**; **3:1 Allocation occurs only at the single consuming harvest** with eligible positive Leaf/Seed streams, fixed fractions and Seed identities. |
| Waterborne cultivation reach | [§56](../systems/seeds-spores-and-harvesting.md) | Unlimited connected-Flooded, blocked reach for **five** approved emitters including late Siltgill; older **Range 3** cap is historical. Airborne environmental emission keeps its own range. |

## Exact route exceptions worth regression tests

- **Kelpergeist → Kelpless (§69):** The distinct environmental-only route needs **18h continuously not Flooded**, with **no named fungus**. The competing Kelpergeist → Starlotus route needs **Flooded/Cold/Dim with Tidegill OR Siltgill for 28h**; restoration of Flooded breaks the Kelpless clock.
- **Moonlit Lotus → Starlotus (§69):** **Flooded/Cold/Dim** plus **Tidegill OR Rilllace** for 24h *before* a **Flooded → Damp** event. Preserve the just-completed Waterborne contact and qualifying history for the transition even if the drain eliminates subsequent reach; initialize fresh Damp-attuned Starlotus.
- **Flowers (§73):** **Charmomile → Daisyspell** needs Damp/Warm/Bright and Prismorel OR Glimmergill for 12h. **Daisyspell → Orchidemon** separately needs **10h Dim preparation** and **Bright reached within 8h after leaving Dim** with its specified different preparation/completion fungal contacts. Daisyspell's 75% crop peak is **not** a recipe gate.
- **Desert (§74):** Ember Aloe's **Hot→Warm** recovery is selected **strictly below 36h** versus **at/above 36h**. Moonjade's **48h Freezing** history is followed by mutually exclusive **Dim** versus **Lit** qualifying thaw destinations; these are not arbitrary winner priorities.
- **Spices (§76):** Ghost Rice has a **12h Dark preparation → 8h transition to Lit** sequence. Both Pum'king origins need simultaneous **positive and negative Luminous environmental emission footprints**, not merely cultivation contact, with final resolved **Lit** throughout; ordinary named contacts alone would not meet that extra requirement.
- **Ingredients (§67):** All six one-step Potato routes remain specified by mutually incompatible resolved Conditions plus one **actual reaching generic signed environmental fungus emission**; no terminal Ingredient gains outgoing Transformations.

## Editorial changes in this pass

Exactly **23 former staged lines** were archived and reconciled in current topic files:

1. **§§58–59:** removed the previously suggested generic recipe-priority policy and unsupported target-Mycelial/adjacency-as-ingredient language; clarified stage freedom, no zero-time cascading, approved six-step order and all **14** completed Aquatic recipe specifics.
2. **§§60D,64,66:** made the distinction between the **death/Transformation tie** and prohibited **competing-Transformation winner priority** consistent in all three system references.
3. **Family files:** replaced old 'remaining families unfinished' status in Flowers, Desert and Ingredients; fixed a speculative Moonjade thaw priority; updated Ghost Rice/Glass Apple and Pum'king explanations to the approved Spices outcomes. No approved numeric, Seed-identity or final recipe **table row** was changed.

The archive thus contains **250 traceable earlier excerpts** (previous 227 plus these 23). Current numerical-table preservation figures are unaffected.

## What this cannot certify

- **Exclusivity and satisfiability as real hex layouts:** textual conditions often partition sibling outcomes, but a source's own environmental emission, adjacent resolutions, Blockers and time history must be validated with executable layouts and simultaneous events. **No speculative winner policy is authorized** if a contradiction is discovered.
- **Fine-tuning:** some Fungus lifecycle/Spore values, X-hour deaths/grace and continuous interpolation remain genuinely unset. Documentation cannot safely invent them.
- **Qualitative authority:** line-presence verification does not ensure every old paragraph was placed in the right active/historical category. Continued human review is required.
- **Publication:** do not change, remove or replace any original document or root README until the final side-by-side review is accepted.

Use the [overall editorial comparison](current-vs-original.md) and [semantic watchlist](semantic-risks.md) for subsequent review. This audit documents approved precedence only; **no gameplay/runtime change was made**.

**Static navigation check:** **471** local Markdown destinations across **32** staged `docs/next/` files, including **13** heading fragments; **zero missing paths or broken anchors**. The original root README is deliberately not included as an edited staging file.

**Staging-index restoration:** During validation, the earlier staged `history/README.md` was found to have lost its original opening/index content in the prior draft pass, beginning with literal “undefined”. This pass restores the **complete valid index from commit `055e1dba`**, retains the later pass-4 and pass-6 additions, and keeps the full unchanged historical archive. Only the *new staged history index* was repaired; no original repository file was touched.
