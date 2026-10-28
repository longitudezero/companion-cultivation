# Numeric preservation — frozen original versus reorganized references (editorial pass 5)

> **Direct original-source audit, 27 October 2026.** The comparison baseline is the untouched `docs/herbs-and-fungi-design.md` at original commit `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b`; the reorganized reference snapshot is branch `docs-reorganization` at `83f4e1d03f046332fb4e9e28a0ee6c6938d56d0d`, before this report was added. **No pre-existing files or root README were changed.** The [per-section line ledger](numeric-source-line-ledger.md) makes the source-coverage calculation inspectable.

## Result: numeric source lines accounted for

Two independent levels of mechanical text search were run against the original **733,370-character** design source:

| Test on original source | Found in active topical drafts | Found only in historical archive | In both | Link-path-only rewrite | Missing |
| --- | ---: | ---: | ---: | ---: | ---: |
| **All 1,457 non-heading lines containing a digit** | **1,067** exact | **371** exact | **15** exact | **4** | **0** |
| **1,045 lines selected by numeric-value/unit pattern** | **879** exact | **166** exact | **0** | **0** | **0** |

The stricter numeric-value pattern includes percentages, signed Property deltas, multipliers, hours/days, Seed/Leaf quantities, ranges and progress figures. The broader digit test also captures references, dates and numbered examples. The **four apparent broad-scan misses are solely Markdown link paths** adjusted after document relocation (v1.1/v1.2 environment references). Normalizing only the Markdown link destinations makes all four lines otherwise **verbatim matches**; their original text and numeric details were not discarded.

**Interpretation:** This demonstrates *textual presence either as active design or explicitly preserved historical material*. It does **not** mean a historically superseded number is an operative mechanic or that every source paragraph was classified perfectly. The source's non-numeric caveats, qualitative restrictions and cross-rule semantics still require human review.

## Exact table-row comparison — Plant profiles and Fungi

For each original numbered Plant profile/numerical section (§§22–44) and detailed fungus batch (§§47–50,53–55,57), Markdown table rows were matched *within the corresponding numbered section* of its new file. Row positions and total counts also matched.

| Source area | Original rows | Current rows | Exact row matches | Changed, original archived |
| --- | ---: | ---: | ---: | ---: |
| [Woodlands](../../design/plants/woodlands.md) (§§22, 23, 24) | 140 | 140 | 125 | 15 |
| [Aquatic](../../design/plants/aquatic.md) (§§25, 26, 27, 28) | 153 | 153 | 145 | 8 |
| [Flowers](../../design/plants/flowers.md) (§§29, 30, 31, 32) | 156 | 156 | 156 | 0 |
| [Desert](../../design/plants/desert.md) (§§33, 34, 35, 36) | 183 | 183 | 181 | 2 |
| [Spices](../../design/plants/spices.md) (§§37, 38, 39, 40) | 180 | 180 | 179 | 1 |
| [Ingredients](../../design/plants/ingredients.md) (§§41, 42, 43, 44) | 134 | 134 | 131 | 3 |
| **All Plant profiles and number tables** | **946** | **946** | **917** | **29** |
| **Fungi detailed batches §§47–50, 53–55, 57** | **211** | **211** | **179** | **32** |
| **Total** | **1,157** | **1,157** | **1,096** | **61** |

Every **one of the 61 changed original rows** was found *verbatim* in the [superseded-history archive](../superseded-design/superseded-design.md); zero changed rows lack their old form. The **seven main Plant numerical sections** alone (§§23,24,28,32,36,40,44) contain **414 rows, all character-for-character identical** to the original. The other **532 Plant rows** cover full profiles, germination, harvest and compatibility descriptions.

### Distinguishing corrections from loss

The original-versus-current numeric-token comparison highlights the following **intentional, later-approved** categories for human confirmation:

- **Mandrakadabra (§22/§70):** the obsolete six-hour Mycelial-specific lethal claim becomes **four uninterrupted Bright hours**; ordinary habitat rules and the full §71 route table remain separately defined.
- **Waterborne (§§53–55 vs §56):** the old **Range 3** cultivation cap is superseded by **unlimited reachable connected-Flooded reach**; environmental Airborne ranges are kept independently.
- **Allocation (§§53–55 vs §56):** historical 'conversion undecided' descriptions now use **3 Seeds ↔ 1 Leaf**, nominal **80%/60%** donor fractions for the four known emitters and Frostfolio's source-side **1.25×** bonus.
- **Dependent Fungi (§§49,57 vs §60C):** Rushroom/Siltgill retain **both full-strength emissions while alive throughout their X-hour Mycelial-support-loss grace**; old immediate-suppression language is historical.
- **Plant descriptions (§§22,33,38,42):** previously approximate or deferred germination, Seed identities, curve maxima and compatibility are expressed using the actual **later approved numerical tables**, not invented numbers. E.g., **Jadeheart 28% / four-Seed guarantee**, **Potato 28% / four**, **Mistlewoe two Tanglethorn Seeds**, and **Orchidemon's 55-Leaf maximum**.
- **Status/assignment rows:** various headings and examples now cite completed fungal identities/Transformation contacts. Numeric section references added to those replacement rows are **provenance markers**, not new balancing values.

The [earlier fungal field audit](fungal-parameter-audit.md) and [Plant prose audit](plant-profile-prose-audit.md) explain how these approved replacements were selected. Inspect the original and archive if any row's replacement appears to introduce an unsupported balance parameter.

## Final recipe sections

The complete approved recipe/clarification sections **§§67,69–74,76** contain **102 Markdown table rows in total**, and **every table row is identical** to the frozen original in its corresponding new family file. These are table rows, **not 102 routes**: the approved Plant-owned route total is **69**.

Full-text differences in those sections have been classified:

- **§§67,69,72–74:** only one trailing newline was lost at the extracted section boundary; internal text is identical.
- **§71:** an extra trailing Markdown horizontal rule was added after the recipe text; its table and wording are unchanged.
- **§76:** fully character-for-character identical to the original.
- **§70:** deliberately reconciled older narrative/hazard wording with later §§71–72; older §70 text is preserved in history. The current **four-hour Bright death**, **Damp/Bright + Rushroom OR Siltgill 12h** route and **no Mycelial-on-Plant requirement** remain explicit.

Some **old completion-status sentences at the very ends of §73/§74** still describe Desert or Spices as future work. They are part of the preserved original approved blocks, **not accurate present-day status**. The current [staging index](../editorial/design-index-before-organisation.md) and final §76 confirm all families are complete first-pass. Moving those last outdated status sentences to history can be done in a subsequent editorial cleanup, keeping the original source untouched.

## Remaining acceptance work

1. **Manual authority and semantic classification:** a matching line in history is evidence of preservation, **not proof that all approved exceptions have been transferred correctly** into an active home. Check edge cases, qualitative conditions and rule precedence.
2. **Original-source provenance:** this audit matches all selected data lines and table rows, but does not replace the [76-section crosswalk](source-crosswalk.md) or a paragraph-level review of non-numeric content.
3. **Implementation validity:** approved pairwise route exclusivity, source-geometry reach, Flooded connectivity, simultaneous events, continuous-output interpolation and unspecified X-hour durations need executable tests/design decisions.
4. **Protected migration:** the existing design file, other old docs and original root README must remain completely untouched until the user has reviewed the finished reorganized set against the originals.

This is a strong mechanical anti-omission check, **not a sign-off for deleting or replacing the old documents**.

**Navigation QA for this pass:** **422** local Markdown links across **31** staged `docs/next/` files were checked (including **11** heading fragments); no missing local destination or invalid heading anchor was detected by the static checker. This is independent of the numerical source test.


---

## Subsequent qualitative editorial pass (pass 6)

The [semantic precedence audit](semantic-rule-precedence.md) intentionally updated *prose* in the approved Ingredients §67, Flowers §73 and Desert §74 sections after this report's frozen-source full-text comparison. Their **final recipe table rows**, all numerical profile tables and all previously archived original rows remain unchanged. The old progress sentences were added verbatim to the historical archive. Therefore, the **pass-5 full-text difference classification above describes the earlier staging snapshot**, not a claim that the newer prose paragraphs are still identical.
