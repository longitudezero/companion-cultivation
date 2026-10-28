# Six Plant families — profile prose versus later approvals (editorial pass 4)

> **Migration review only, 27 October 2026.** This pass reconciles **older narrative/proposal-status lines in the six newly staged family files** against the later approved numerical and Transformation sections already present in those files. It does **not** create new designs or modify the original source document, any pre-existing document or root README. Each replaced line is reproduced **verbatim** in [historical decisions](../superseded-design/superseded-design.md#editorial-pass-4--earlier-plant-family-profilestatus-prose-superseded-by-later-approved-rules-27-october-2026).

## Family-level reconciliation

| Family | Primary profile and number source | Final approved routes | Prose/heading corrections | Preserved open issues |
| --- | --- | ---: | --- | --- |
| [Woodlands](../../design/plants/woodlands.md) | §§22–24 | **13** (§§71–72; §70 hazard) | **13** profile examples, Seed identities/quantities, compatibility and previously pending Mistlefoe/other fungal assignments | Base species **name**, curve interpolation, playtest-sensitive hazard/rounding details |
| [Aquatic](../../design/plants/aquatic.md) | §§25–28 | **14** (§69) | **6** Kelpergeist/Starlotus and Cress contacts, roster and approved Dry response status | Continuous curves, spatial drain timing and implementations |
| [Flowers](../../design/plants/flowers.md) | §§29–32 | **12** (§73) | **7** completed peak/yield numbers, approved Daisyspell/Orchidemon transition and formerly unspecified contacts | Balance of peaks and tester feasibility, not new blooms |
| [Desert](../../design/plants/desert.md) | §§33–36 | **13** (§74) | **4** Ember Aloe 36h two-outcome recovery, Jadeheart germination and accepted numerical status | Actual timed transition tests, tuning/rounding |
| [Spices](../../design/plants/spices.md) | §§37–40 | **11** (§76) | **5** opposite-sign Pum'king and dual-origin Glass Apple contacts, Starberry's fixed multipliers | Net-Lit source overlap/blocker layout tests |
| [Ingredients](../../design/plants/ingredients.md) | §§41–44 | **6** (§67) | **7** Potato-only architecture, exact Potato germination, actual hourly/allocation emitter examples | RPG produce naming/inventory integration and numerical playtesting |
| **Total** | | **69** | **42** substantive earlier lines | |

Each of the six family files also received **one identical staging-header correction** so it no longer falsely claims that all inherited prose is literally intact. Therefore **42 substantive corrections + 6 headers = 48 exact archived former lines**. The 48 are **in addition to** the 179 excerpts retained after the earlier system/fungus editorial passes: **227 traceable excerpts total**.

## High-risk rules retained

1. **Full final recipes stay authoritative.** Woodlands §§70–72, Aquatic §69, Flowers §73, Desert §74, Spices §76 and Ingredients §67 are **unchanged** by this pass. Naming actual approved fungi in a profile is explanatory; it does not grant a new named contact or change duration/eligibility.
2. **Transformations are Plant-owned (§§58–59,68).** They use the named source's **actual emitted environmental OR cultivation footprint** (or Ingredients' special generic environmental-emission rule), not the receiving Plant's Growth percentage, current cultivation bonus or Mycelial-on-Plant state. A successful transformation creates a new **0%-Growth instance**.
3. **Numerical tables outrank older 'will be chosen' prose.** In particular: Bamboom's **18 Woodlands Base Seeds** and Damp Seed Yield compatibility; Mistlewoe's **2 Tanglethorn Seeds**; **Tanglethorn 23%/5 Seeds**; **Jadeheart 28%/4 Seeds**; **Potato 28%/4 Seeds**; Orchidemon's **55-Leaf peak at 145%**; and the exact Starberry multipliers. Continuous-curve interpolation outside the approved knots has not been invented.
4. **Different kinds of time are distinct.** Ember Aloe needs **36 uninterrupted Hot hours** before its qualifying Hot→Warm recovery succeeds; Moonlit Lotus drainage inspects prior Flooded history; Daisyspell's Dim→Bright and Ghost Rice's Dark→Lit recipes have **two separate preparation/completion windows**. The simulation/event system in [§64](../../design/systems/simulation-and-time.md) governs simultaneous changes.
5. **Fungal effects do not create Seed identities or extra blooms.** A nominal **+20% Seed Yield** source like Emberbolete can be used to illustrate compatibility scaling, but this is **not** a Transformation ingredient unless its actual named contact appears in a recipe. The 31-Fungus roster and fixed [§56 Allocation](../../design/systems/seeds-spores-and-harvesting.md) are separate from Plant-native output, Seed identity and zero-output sterility.
6. **Emitted effects and resolved Properties stay separate.** Named contact, a fungus's environmental contribution, resolved Moisture/Temperature/Illumination and recipient compatibility are different tests. Pum'king explicitly requires **both opposite-sign environmental light emissions** while the final resolved state remains **Lit**.

## Mechanical protection checks

- [x] **Source-crosswalk presence:** 76 numbered entries (§1–§76) still present in the unchanged crosswalk. The final remote GitHub tree comparison must separately verify that no original was edited.
- [x] **Final recipe blocks:** Each of the six families' final approved tail sections compares **character-for-character identical** to the previous staging commit; Woodlands includes §§70–72, and the other five include their single final sections.
- [x] **Numeric table structural preservation:** Before/after Markdown table-row counts are **Woodlands 155/155; Aquatic 169/169; Flowers 175/175; Desert 208/208; Spices 191/191; Ingredients 150/150**. **All six files retain the same line counts** as the previous draft (replacements were single lines).
- [x] **History:** All **48** earlier lines/headings occur in the appended archive under the original staged file, numbered line and section heading; the pre-existing **179** archive excerpts are retained, for **227** traceable entries.
- [x] **Links:** **398** relative Markdown destinations in **29** staged files, including **11** anchor fragments: **0 missing paths / 0 broken fragments** by the static checker; fenced README copy-text excluded as intended.

The checks above verify **staged-draft structural preservation only**, not exact semantic completeness versus the 733k-character untouched original. Remote GitHub-tree comparison is required after the new commit is created; this report does not pre-certify it.

## Still not certified

- A fully independent **per-cell numerical audit** against the untouched 733k-character original, with each exception classified as approved, superseded or genuinely open.
- **Executable hex-layout satisfiability/exclusivity tests** across 69 routes (especially multi-source net-Lit and drainage transitions); the design's own arguments are not a runtime proof.
- Exact tuning for incomplete natural curves, balancing, exposure clock subtleties and production-rounding choices left to implementation.
- A user-approved migration cutover: **do not edit the root README or remove/replace the old docs** based on this editorial pass.

See [current-versus-original comparison](current-vs-original.md), [source relocation crosswalk](source-crosswalk.md) and [semantic conflict watchlist](semantic-risks.md).


---

## Subsequent direct-source numeric audit result (pass 5)

The formerly pending **mechanical** portion of the original-source numerical comparison is now recorded in [numerical-source-preservation.md](numerical-source-preservation.md): all **946** original Plant profile/numerical table rows are accounted for in their corresponding staged sections, with the **29** changed row originals archived verbatim; all **414** rows in the seven principal numerical sections are exact. This does **not** close the outstanding *human semantic and implementation feasibility* review items above.
