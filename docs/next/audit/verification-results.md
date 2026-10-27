# Staging migration verification — first pass

**Comparison baseline:** original repository commit `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b`, containing the fully approved §76 source. **Staging branch:** `docs-reorganization`. All pre-existing documentation and the root README remain unchanged; the tree comparison found **0 modified or deleted existing files**, and **23 newly added files** exclusively inside `docs/next/`.

## Mechanical checks

| Check | Result |
| --- | --- |
| Major original design sections copied | **78/78** recognizable in staged files (exact text except intentional link-path adjustments) |
| Source numbered-section crosswalk | **§§1–76 covered**; see [crosswalk](source-crosswalk.md) |
| Existing repository files changed | **0** |
| New staging files | **23**, all inside `docs/next/` |
| Broken local Markdown link destinations detected | **0** |
| Plant families / first-pass recipes | **6 families / 69 routes**, with detailed final source sections placed beside families |
| Fungal source profiles | **31 species**, through source §§47–50, 53–55, 57 |

All original numbered/major sections were found in the staged files. This demonstrates coverage of source text, **not yet correct editorial classification or absence of contradictions**.

## Editorial issues still to resolve

1. The first pass intentionally copied large approved source sections without shortening them. Their older **progress and proposal-status statements** may no longer be true; move these into history or replace them with current cross-links, preserving every table row, number, hazard and caveat.
2. Do a manual semantic comparison of all six family references, the roster and each system document. Check current authority and rule precedence rather than treating a text match as proof of correctness.
3. Eliminate duplicated shared rule text after confirming it appears once in the authoritative system file and family files link to it.
4. Improve link anchors within the moved source sections and verify actual GitHub rendering, not just target filenames.
5. Keep [the root README proposal](../ROOT-README-DRAFT.md) separate until the comparison and user approval; no existing README edit is authorized.

### Potentially stale recipe-status lines (heuristic, review manually)

- `woodlands.md:223` — **Phase 1 status:** The user approved the Mandrake batch, including the **specific 6-hour continuous Mycelial death threshold for Mandrakadabra**. The exact fun
- `spices.md:33` — The **Sunrice and Moonrice branches are complementary**, not fully isolated economies: **Thymekeeper** will produce **Sunrice Seeds** to sustain productive Brig
- `spices.md:134` — **No new routes:** Starberry and Ghost Rice remain the **two origins for Glass Apple**; Sunrice and Dillusion remain the **two origins for Pum'king**. Thymekeep

## Final acceptance gate

Do not mark the new design authoritative or replace existing documents until the [semantic checklist](source-crosswalk.md#semantic-comparison-checks-still-required) is fully checked, the old/new comparisons have been reviewed and any detected omissions corrected.


---

## Editorial pass 2 update — 27 October 2026

**The original first-pass staging figures above are retained as dated results**, not as current editorial-completion claims. The branch has additional new audit files and edited **only newly staged `docs/next/` drafts**. Original documents and the root README remain unchanged. See [current-vs-original.md](current-vs-original.md) for the full updated comparison.

- Section crosswalk: **76 unique §1–§76 entries**, none missing.
- Seven approved final recipe/clarification source blocks (§§67,69,71,72,73,74,76): **identical** to the first copied source; 69 routes retained.
- Six family files: **unchanged total Markdown table-row counts** (see [comparison table](current-vs-original.md#family-table-comparison)).
- Named Fungi: **31** present; obsolete Waterborne 3-hop claims corrected to §56's connected-network rule.
- Duplicate §60/§65 full text removed only from secondary homes after proving the authoritative copies remained; §68 now has one normative definition.
- **141 earlier excerpts** preserved in [historical decisions](../history/superseded-design.md) with section provenance.
- Relative Markdown references: **296 checked**, **0 missing file targets, 0 broken heading anchors** in static validation.

**Still open:** independent paragraph-level human review, verifying every numeric fungal field, and spatial/runtime feasibility of the approved recipes. **Do not replace the old documentation or README.**


### Additional completed-profile cleanup

A further status/diagram sweep moved the early incomplete Flowers and Desert transformation drawings into history; the final §73/§74 recipe tables remain unchanged. It also updated completed phase wording in Woodlands, Desert, Spices and Ingredients. The archived excerpt count and relative-link count above include this sweep. Remaining profile-by-profile editorial review is still necessary.

---

## Editorial pass 3 update — 27 October 2026

This follow-up audits the **31 fungal species individually**, beyond the first two mechanical passes. The earlier figures above remain dated checkpoints; they are **not the current complete staging-file count**.

- [31-species matrix](../fungi/roster-matrix.md) includes separate signed environmental emissions, propagation, cultivation Effect magnitudes/windows/reach and Mycelial habitat for **all 31**, cross-linked to detailed profiles.
- [Fungal parameter audit](fungal-parameter-audit.md) reconciles the §56 3:1 Allocation fractions/boosts, Siltgill's late-added Waterborne effect, §60C dependent emission-through-grace and §62–63 timed Mycelord behavior.
- The **113/93/5** fungal profile table-row counts and **69 Plant routes** remain unchanged; the previously duplicated §57 body now has a single detailed home.
- Historical preservation grows from **141** to **179** source-labeled superseded excerpts (**38** added this pass). Every pre-existing repository file, including root README, must remain unchanged.
- For the updated navigation check and exact remote branch tree comparison, see [the current-versus-original report](current-vs-original.md). Publishing the staged docs still requires user review.

**Pass-3 link audit:** **368** local Markdown destinations across **28** staged draft files (including **10** heading fragments) resolve in the checked original/staged path set; **0 missing paths and 0 broken anchors**. The root-README copy snippet is fenced and has separately verified root-relative paths.


---

## Editorial pass 4 update — 27 October 2026

The six-family [Plant profile prose audit](plant-profile-prose-audit.md) resolves **42** obsolete substantive lines plus **six** staging headers. The **48 earlier strings** are retained verbatim with source-section and former-line provenance in [history](../history/superseded-design.md), bringing the archive to **227** traceable extracts (**179 prior + 48 new**).

- **Approved final recipe sections unchanged** character-for-character since the preceding branch commit; **69 Plant-owned routes** remain.
- Six family Markdown table-row counts unchanged: **155,169,175,208,191,150**; all six files also preserve line counts.
- Source crosswalk: **76 unique §§1–76**, no missing entries.
- Static local Markdown navigation: **398 links across 29 staged files**, **11 heading fragments**, **0 missing paths / 0 broken anchors**.
- These checks do not prove spatial recipe satisfiability or complete semantic equivalence of every original paragraph. The root README and pre-existing docs remain untouched during protected staging.
