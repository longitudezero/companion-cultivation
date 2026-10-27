# Editorial comparison — original design vs reorganized staging (pass 2)

> **Not a final acceptance certificate.** This report compares the frozen originals at commit `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b` with the staged `docs/next/` documents on the `docs-reorganization` branch. **Every pre-existing file, including the original root README, is to remain unchanged** until the user has examined the completed comparison. This report records what has been checked, what was deliberately changed, and what still needs review.

## What survived unchanged

- **Source crosswalk:** **76/76** numbered sections have a unique entry in [source-crosswalk.md](source-crosswalk.md); historical source §§1–21,45–46,51–52,75 remain available in the [archive](../history/superseded-design.md). The old introduction/conventions and original six-family sketch are archived as well.
- **Complete approved recipes:** All **seven final recipe/clarification source blocks** (§§67,69,71,72,73,74,76) compare **character-for-character identical** between first staged copy and this edited draft. This protects the **69 approved routes**: Ingredients 6, Aquatic 14, Woodlands 13, Flowers 12, Desert 13, Spices 11. §70's surrounding older status text was edited because it conflicted with subsequently approved §§71–72; the actual §71 recipe table is untouched.
- **Species profiles and numeric tables:** All six family files retain exactly their previous numbers of Markdown table rows. The only changed family data row is **Mandrakadabra's Environment** (six-hour Mycelial special death replaced by four-hour Bright death) and **Jadeheart's Environment** (obsolete permanent Sand Material note removed). Eighteen `Proposed direction` column captions were relabeled `Approved first-pass profile direction`; no numerical value was changed by that labeling.
- **Fungus roster:** All **31 named first-pass Fungi** are present in the detailed profile files. The four former Waterborne cultivation **Range 3** caps are now described as **unlimited connected-Flooded propagation (§56)** in every affected row, while separately specified Airborne environmental ranges and nominal Effect strengths are retained.
- **Shared rules with duplicates removed:** A byte-equality check established that §60's full wording was duplicated in both Plant lifecycle and Influence/Response files, and §65's full wording was duplicated in Plant lifecycle and Seeds/Spore files (apart from a trailing navigation link). The original complete text remains in [Influences/Responses](../systems/influences-and-responses.md) (§60) and [Seeds/Spores/Harvesting](../systems/seeds-spores-and-harvesting.md) (§65). [Plant lifecycle](../systems/plant-lifecycle.md) now summarizes and links to them. §68 remains full in [Transformations](../systems/transformations.md), not repeated in Influences.
- **Navigation:** **296 relative Markdown links** were checked against existing repository/staging paths, including heading fragments; **0 missing targets and 0 broken heading anchors** found by the static checker.

### Family table comparison

| Family | Before table rows | After table rows | Intentional edits to data/caption rows |
| --- | ---: | ---: | --- |
| woodlands | 155 | 155 | 10 approval-caption relabels; 1 Mandrakadabra Environment row |
| aquatic | 169 | 169 | 8 approval-caption relabels |
| flowers | 175 | 175 | None |
| desert | 208 | 208 | 1 Jadeheart obsolete Material note |
| spices | 191 | 191 | None |
| ingredients | 150 | 150 | None |

## Intentional supersession decisions

| Source conflict | Active rule in the new topic file | Earlier wording retained where |
| --- | --- | --- |
| Mandrakadabra special hazard and recipe | **4h continuous Bright lethal; Lit optimum; 12h Damp/Bright + Rushroom OR Siltgill for Mandrabra**; no Mycelial-on-target gate | [History, extracted §22–24/§70](../history/superseded-design.md) |
| Waterborne propagation in early fungal profiles | **Unlimited connected Flooded reach**, with source injection and Blockers unchanged; Airborne environmental ranges remain distinct | [History, extracted §§53–56](../history/superseded-design.md) |
| Materials/Fertility | Exactly three environmental Properties; no permanent Sand/Fertility game system | [History](../history/superseded-design.md) and original v1.1 |
| Spices placeholder species and missing final recipes | 11 newly approved replacement recipes in **§76**, including both net-Lit opposing-source Pum'king paths and Ghost Rice's **12h Dark preparation → 8h transition to Lit** | [Original §15 and §75 in History](../history/superseded-design.md) |
| Plant-owned Mycelial prerequisite | No Mycelial-on-Plant prerequisite for recipes; source Mycelial support of Rushroom/Siltgill is separate from emitted contact | [History, extracted §68/§70](../history/superseded-design.md) |
| Earlier 'Fungi/recipes still pending' status and Allocation rate | **31 Fungi**, **69 routes**, approved **3:1 harvest-time Allocation** | [History, extracted source-phase notes](../history/superseded-design.md) |

**Additional editorial sweep:** The earlier Flowers and Desert **partial family diagrams** containing `[later batch]` and bracketed provisional branches were relocated in full to history; the corresponding final recipe tables remain untouched in the active family files. Later recipe-status paragraphs in Bamboo, Mistlefoe, Ember Aloe, Ghost Rice and Ingredients profiles now point to their exact approved rules.

**Archival guarantee:** **141 changed or removed earlier lines/labels** from the first staged topical copy are included in the dedicated historical archive with source-section labels and reasons, except the verified byte-for-byte duplicate §60/§65 blocks (which remain in their sole active home). The **original ~733k-character design file itself remains untouched**, as do every other pre-existing document and root README.

## Not yet certified — substantive review still needed

1. **Human semantic reading:** Even though all approved recipe blocks and family table row counts survived, some older design-phase narrative remains interspersed with approved profiles. Carefully review each of the six families and each fungus against the original at paragraph level; archive any further obsolete sentence and ensure every surviving exception is explicit.
2. **Effect-specific completeness:** Verify all 31 fungal emissions/footprints, Mycelial rules, 3:1 fractions, compatibility semantics and stage-specific hourly-production windows at field/parameter level. The row-level edits were constrained, but not all prose has been normalized.
3. **Implementation feasibility:** Pairwise recipe exclusivity is argued in the approved design tables but is not a tested garden-state proof; net-Lit opposing Sources, Mycelial source-side reach, transition events, and Blocker geometry need executable spatial tests when biology implementation starts.
4. **Numerical omissions in the source:** Exact continuous output-curve interpolation, some fungus lifecycle/Spore parameters, remaining environmental hazard tuning and rounding are genuinely deferred design topics; do not invent them while tidying documentation.
5. **README launch:** [The root README index draft](../ROOT-README-DRAFT.md) exists, but **root README has not been edited**. Publishing or replacing any current doc is outside this protected staging pass.

**Interpretation:** This second pass is a substantial editorial correction and a preservation-checked intermediate result—not yet a complete guarantee that no detail was lost or that all design prose is free of stale ideas. The untouched original remains the comparison baseline.

---

## Editorial pass 3 — 31-fungus parameter and habitat audit (27 October 2026)

The pass-2 counts above are kept as a historical checkpoint. See the dedicated [31-species parameter audit](fungal-parameter-audit.md) and the one-row-per-species [emission/range/habitat matrix](../fungi/roster-matrix.md) for the new comparison.

- **Coverage:** The 31 approved named Fungi across source §§47–50,53–55,57 each have exactly one row in the new matrix. Their detailed profiles remain in three files; those files retain their **113 / 93 / 5** Markdown table rows relative to the previous draft, despite narrowly scoped corrections.
- **Propagation split:** Each environmental emission retains its own signed Property delta and reach, even when its cultivation Effect uses unlimited Flooded Waterborne propagation. Siltgill is the **fifth** approved Waterborne cultivation emitter, later than §56's four named examples.
- **Exact revised Allocation:** Frostfolio **80% Leaf-favoring**, Bristlecap **60% Leaf-favoring**, Sunspore **80% Seed-favoring**, Goldgill **60% Seed-favoring** under §56's **3 Seeds ⇄ 1 Leaf** destructive-harvest rule. Frostfolio receives only its specifically approved **1.25×** Mycelial-source magnitude boost.
- **Dependent survival without suppression:** Rushroom and Siltgill continue **both full-strength emissions** during an ongoing, still-alive X-hour Mycelial-habitat-loss grace (§60C). The old source paragraph suggesting immediate emission loss was superseded.
- **Shared-text deduplication:** The §57 detailed text duplicated between the fungal lifecycle overview and the final-species profile was removed only from the former after a **byte-for-byte equality check**; the complete detailed §57 section remains in [final species profiles](../fungi/profiles-final.md), while lifecycle links to it.
- **Archival traceability:** Pass 3 moved **38 additional distinct superseded lines/paragraphs** into the source-section-labeled [historical archive](../history/superseded-design.md). Together with the pass-2 **141 excerpts**, that is **179 changed/extracted excerpts**; deletion of the verified §57 duplicate was not miscounted as a lost rule.
- **Unchanged earlier content:** All six Plant-family draft files and the seven approved recipe/clarification blocks are unchanged by this fungal-only pass. **69 routes** and the **76/76** numbered-source crosswalk remain intact.
- **Root index usability:** [The un-applied root README proposal](../ROOT-README-DRAFT.md) now contains a copy-ready fragment with paths valid **from the repository root**, not from `docs/next/`; the actual root README is still untouched.

**Remaining acceptance gates:** Review the still-long source-derived prose for each Plant and Fungus at paragraph level; independently validate time/space geometry and exact design constants; resolve genuinely open fungal durations/Spore parameters through new decisions; then compare and approve the final documentation before replacing or editing any original.

**Pass-3 mechanical checks:** **28** staged `docs/next/` files, **368** local relative Markdown link targets, including **10** in-document/cross-document fragment checks; **0 missing files** and **0 broken heading anchors**. Fenced copy-ready root README links were verified as paths from the repository root, rather than treated as live links relative to their draft's directory. Previous pass-2 navigation count (**296**) was measured before the two additional audit files and subsequent navigational links.


---

## Editorial pass 4 — Plant-family prose/status reconciliation (27 October 2026)

All six Plant-family drafts were checked for **older narrative implying that already-approved values, fungal contacts or Transformation recipes were still unassigned**. The new [Plant profile prose audit](plant-profile-prose-audit.md) records the corrections and further acceptance gates.

- **48 earlier lines/headings** (42 substantive status/detail corrections and six updated staging headers) were transcribed verbatim into [historical decisions](../history/superseded-design.md), in addition to the prior 179 historical excerpts (**227 total**).
- **No approved recipe source section was changed:** Woodlands §§70–72, Aquatic §69, Flowers §73, Desert §74, Spices §76, Ingredients §67. The route totals remain **13 + 14 + 12 + 13 + 11 + 6 = 69**. This is a direct content-equality check against the pre-pass staging branch, not a claim that every hex layout has been simulated.
- **No intended numerical parameter was invented**: sources now cite §§23–24,28,32,36,40,44 and current fungi §§47–57/§56 where they replace deferral wording. Remaining curve interpolation, implementation rounding, and feasibility are explicitly open.
- **No pre-existing original or root README is an edit target.** A new plant-specific audit page was added under `docs/next/audit/` and the staging index linked to it. Link/row-count/tree results are recorded in the pass-4 audit after validation.

**Measured pass-4 mechanical results:** six family table row counts unchanged (**155 / 169 / 175 / 208 / 191 / 150**); six final recipe tail blocks byte-identical to the preceding staging commit; all **48 replaced lines** archived verbatim; **398** local Markdown destinations across **29** staged files (**11** anchor fragments, **0 missing paths / 0 broken anchors**). The cumulative crosswalk remains **76/76**. Remote tree preservation is checked separately before updating the branch ref.


---

## Editorial pass 5 — direct frozen-source numerical audit (27 October 2026)

This pass compared the **untouched 733,370-character design source** itself against the new topic files and [historical archive](../history/superseded-design.md), not merely the preceding staging version. See the [full numerical-source preservation report](numerical-source-preservation.md) and the [76-section line ledger](numeric-source-line-ledger.md).

- **1,457** original non-heading lines contain a digit: **1,453** occur verbatim in the topical drafts and/or archive; the other **four** differ only by the corrected relocated Markdown-link destinations. After link-path normalization, **zero unaccounted** digit-bearing source lines.
- The stricter pattern for numerical values, signed steps, percentages, multipliers, hours, days, Seeds, Leaves and ranges found **1,045** lines: **879 active**, **166 historical**, **zero absent**.
- **Plant sections §§22–44:** **946** original Markdown table rows and **946** staged rows; **29 revised** rows, each original version archived exactly. The seven primary approved numerical sections (§§23,24,28,32,36,40,44) preserve **all 414 table rows verbatim**.
- **Detailed Fungus §§47–50,53–55,57:** **211** original/staged rows, **32 revised** and **all 32** archived exactly. Combined Plant/Fungus table preservation: **1,157 rows, no unexplained disappearance**; 61 modified rows have archived originals.
- **Final approved recipe/clarification §§67,69–74,76:** **102 table rows all identical** to the untouched source; the route count remains **69**. Full-text section differences are classified separately in the audit (trailing section separators/newlines and the deliberate §70 conflict correction).

**Important limit:** Exact text presence does not establish that a historical statement should still be operative. Qualitative constraints, competing rule priorities, layout feasibility and remaining implementation parameters still require user review. No existing document or root README was edited for this audit.

**Pass-5 staging navigation:** **31** `docs/next/` files, **422** local Markdown destinations (**11** heading anchors), **0** broken paths/anchors after adding the two numeric-audit files. The root README remains untouched.


---

## Editorial pass 6 — shared-system qualitative precedence (27 October 2026)

The new [semantic rule precedence audit](semantic-rule-precedence.md) compares the original shared §§58–68 directly with their topical homes and reconciles conflicting earlier stages of the Transformation design. **The important distinction is between textual preservation and current authority**:

- Of **3,020** substantial non-heading lines across the entire original giant design source, **3,016** are present character-for-character in the new topical pages or archival excerpts. The other **four** differ solely in relocated Markdown-link paths; normalizing those destinations yields **zero unaccounted source lines**.
- For the shared §§58–68, **125** original substantive lines are accounted for: **103 active in their owning numbered sections**, **20 preserved as historical superseded wording**, and **two link-path adjustments**. Zero missing.
- **23 additional former draft lines** were archived verbatim, bringing the preservation record from **227** to **250** source-labeled excerpts.
- The earlier §58 proposal for generic recipe priority and §59 adjacency/Mycelial-on-target eligibility conflicted with §§66–70. The new current rule says **no sibling winner priority, actual emitted contact only, no target-Plant Mycelial gate, one Transformation per event and death/Transformation tie goes to Transformation**. The complete §69 Aquatic fork replaces an unassigned structural sketch. §60D, §64 and §66 now agree.
- Outdated family milestone sentences following Flowers §73, Desert §74 and Ingredients §67 were moved to history; they now acknowledge the complete 69-route roster. **Final approved recipe table rows and all previously verified Plant/Fungus numerical table rows are unchanged**. The older pass-5 full-text recipe-section comparison is a dated snapshot; this pass deliberately corrected *prose* within those sections and preserved the earlier wording in history.

**Still pending:** physical recipe-layout and event-order simulations, authoritative review of qualitative caveats and any not-yet-specified playtest numbers. No original or README edit was authorized or performed.

**Pass-6 navigation result:** **32** staging files, **471** relative Markdown destinations (**13** heading fragments), **0 broken files/anchors** in the static check. Structural QA reconfirmed **102/102 final recipe table rows identical** to the frozen source and unchanged Markdown table-row counts for all six family references.

**Staging repair:** The previous branch had inadvertently lost the opening of the **new** `docs/next/history/README.md`, replacing it with `undefined` before the pass-4 note. The index is reconstructed from its last complete staged version at commit `055e1dba`, and the later pass-4/pass-6 notes are retained. Its original-source links and history navigation are restored. The untouched historical source and archive are not modified by this index repair.


---

## Editorial pass 7 — source-era Fungi contact/status reconciliation (27 October 2026)

The [pass-7 profile semantic sweep](profile-semantic-sweep-pass-7.md) corrected **19** now-misleading narrative/status lines in five staged topic files. Most importantly, it replaced early Fungi-profile claims that **Dewmender, Lanterncap and Rilllace have no named Transformation use** with their explicit approved family-route assignments. It also reconciled Mycelial source support/Blocker/Flooded status, all 69 approved recipes, the removed Enchanted overlay, Aquatic's no-fungus Kelpless route, Flowers' 0% Daisyspell access and Spices' approved Starberry/Glass Apple numbers and sources.

**Preservation:** All 19 complete former lines have been appended verbatim to [historical design](../history/superseded-design.md#editorial-pass-7--corrected-source-era-status-and-named-fungi-contacts-27-october-2026). Each edited topic file retains its line count and Markdown table-row count; no final recipe row or already verified Plant/Fungus numerical value was changed. Only new `docs/next/` files were edited/added; the original comparison baseline remains frozen.

**Still required:** Continue the long-form qualitative review, do not mark the semantic checklist complete until checked, and distinguish runtime geometry/event-order validation from documentation relocation acceptance.


---

## Editorial pass 8 — older qualitative numeric deferrals reconciled (27 October 2026)

The [pass-8 semantic report](profile-semantic-sweep-pass-8.md) records **10** additional now-obsolete numeric-phase statements in Aquatic, Desert, Flowers, Ingredients, Spices and Foundational Fungi, replaced with their exact subsequent approvals (§§28,32,36,40,44,49). The older lines are preserved verbatim in [historical decisions](../history/superseded-design.md#editorial-pass-8--resolved-first-pass-numeric-deferrals-27-october-2026). All affected profile table-row counts and all final approved Transformation table sections are unchanged.

**Cumulative targeted editorial cleanup across passes 7–8:** 29 complete former lines preserved in the archive while the current topical text acknowledges already-approved data. This is not yet final per-paragraph semantic sign-off, and all pre-existing documents and the repository root README remain frozen.


---

## Editorial pass 9 — focused family exception and Fungi coverage review (27 October 2026)

The [pass-9 focused qualitative audit](species-qualitative-review-pass-9.md) cross-checked the higher-risk **Woodlands, Desert, Ingredients and Fungi** semantic exceptions against their later approved family routes and global rules, and corrected **8** remaining source-era status/narrative lines in Woodlands, Flowers, Desert, Spices and Final Fungi. This adds a scoped exception-review ledger rather than asserting universal per-profile sign-off. The eight complete former lines are archived in [historical decisions](../history/superseded-design.md#editorial-pass-9--remaining-qualitative-recipe-and-status-caveats-27-october-2026).

No original document, root README, approved recipe table, or approved 31-Fungus nominal numerical matrix was edited. The 69-route geometry/event-time implementation tests and final comprehensive manual semantic acceptance remain open.


---

## Editorial pass 10 — cross-family authority and explicit 91-species coverage (27 October 2026)

The [cross-family pass-10 audit](cross-family-reconciliation-pass-10.md) documents **18** additional corrected earlier status, heading or contradictory lines. Two late-family profile references incorrectly perpetuated Mandrakadabra's superseded **six-hour Mycelial hazard** instead of **4h Bright (§70)**. Four repeated Spices §75 paragraphs falsely said that its exact recipes were still pending, despite the subsequently approved **newly reconstructed §76 roster**. The source-era wording, including the distinction between a lost original table and a newly approved replacement, is preserved verbatim in [history](../history/superseded-design.md#editorial-pass-10--cross-family-hazard-and-recovered-spices-authority-27-october-2026).

A new [per-species coverage ledger](species-coverage-ledger.md) mechanically verifies **60/60 Plant profile headings and approved numerical rows, and 31/31 Fungi from the detailed species profiles and emission matrix**. This is evidence of coverage, not yet a qualitative acceptance certificate for every sentence. All pre-existing repository files and the root README remain untouched; no approved recipe or core numeric row was edited.

---

## Editorial pass 11 — Fungi Effect roster and navigation (27 October 2026)

The [pass-11 navigation and authority report](final-navigation-and-authority-pass-11.md) records **nine** further obsolete staged statements corrected in the two detailed Fungi sources and environmental staging notice: §50's missing-effect and future-recipe claims, §53's no-longer-future timing/allocation alternatives and incomplete two-emitter Waterborne comparison, and the environmental page's overly strong claim that the staging index was already official. Each full previous line remains in the [historical archive](../history/superseded-design.md#editorial-pass-11--fungal-effect-alternatives-and-staging-authority-cleanup-27-october-2026).

The staged index now exposes the earlier verification report and pass-11 report, so all staged Markdown files should be reachable through navigation. A relative-link and anchor validation accompanies this pass; its evidence **does not replace a manual GitHub-rendered spot-check or final user acceptance**. No approved recipe table, numerical matrix or original repository file was changed.
