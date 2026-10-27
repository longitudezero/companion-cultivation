# Main-branch documentation promotion — preservation and acceptance record

**Date:** 27 October 2026. **Frozen baseline:** `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b` (`main` before documentation promotion). **Source:** the reviewed `docs-reorganization` staging branch, latest documentation audit pass 13. **Canonical location:** [`docs/design/`](../README.md).

## Decision and scope

The user directed that we **finish the documentation maintenance work before returning to game design**, then publish the reorganized documentation on `main`. Accordingly this release does **documentation edits only**: the first-pass design reference, main README topic index, retained historical sources, and documentation comparisons.

- The previously gigantic original [Herbs and Fungi design](../../herbs-and-fungi-design.md) and the existing environmental specifications, handoff and code files are left at their original paths, **not deleted or overwritten**.
- The pre-promotion root README is preserved **byte-for-byte** in [the historical snapshot](../history/root-readme-before-promotion.txt). The published root README retains its run/build/testing instructions, updates the former giant-file reference to label it as a frozen source, and adds a topic index.
- The staging tree `docs/next/` is promoted into the meaningfully named **`docs/design/`** hierarchy (`systems/`, `plants/`, `fungi/`, `history/`, `audit/`). The old `docs/next/` links inside historical audit descriptions remain as dated historical evidence, not current paths.
- The staging-only status banners and **66 former lines** (including old table-label and README-reference wording) are retained exactly in [history](../history/superseded-design.md#main-branch-promotion--retired-staging-labels-and-original-readme-reference-27-october-2026). Active topic headings now identify the accepted first-pass design, and historical audit reports have a dedicated [index](README.md).

## Source and species/recipe completeness

| Documentation check | Evidence / status |
| --- | --- |
| Original giant design sections | **§§1–76 all mapped** by [crosswalk](source-crosswalk.md); original file preserved unchanged |
| Original substantive lines | Prior lossless audit identified **3,020** non-heading substantive source lines accounted for in active topical or historical homes (four path-only variations at that stage); original entire source still directly available |
| Plant roster | **60/60** approved first-pass species represented in six [family files](../README.md#plant-families) |
| Fungal roster | **31/31** approved first-pass species in [roster](../fungi/README.md) and [matrix](../fungi/roster-matrix.md) |
| Plant-owned Transformations | **69 approved first-pass routes** across six families |
| Exact final route tables | **102/102 Markdown table lines identical to frozen approved §§67,69,71,73,74,76** (includes headers/separators; not 102 routes) |
| Sibling route predicates | **44 abstract pair checks** across 20 multi-route Plants; [pass-13 evidence](transformation-exclusivity-and-event-boundaries-pass-13.md) |
| Earlier obsolete wording | Preserved in [historical archive](../history/superseded-design.md); **66 full lines** additionally retired only for canonical publication |

**Editorial acceptance:** Topic navigation, first-pass rule authority, numerical/source preservation, the distinct historical record, and the root README index are ready for publication. This is **not** a claim that every approved mechanism has been implemented or playtested; remaining open game-design details are explicitly marked in their current topic pages.

## Current `main` repository and navigation verification

| Check | Result |
| --- | --- |
| New documentation and history files under `docs/design/` | **43 new files** |
| Original repository files deleted | **0** (confirm by post-publication GitHub comparison) |
| Pre-existing design/environmental/handoff source files modified | **0** (confirm by post-publication GitHub comparison) |
| Root README | **1 intentional documentation-index edit**; complete former contents archived byte-for-byte |
| Files reachable from the new [design index](../README.md) | **43/43** |
| Ordinary relative Markdown links | **682 checked**, 0 unresolved |
| In-document/linked heading fragments | **34 checked**, 0 unresolved |
| Unresolved local links or anchors | **0** (source-level static inspection) |

**These counts describe the published new canonical tree, not earlier `docs/next/` staging snapshots.** Actual rendered GitHub styling and web navigation may be spot-checked separately, but the source-level graph contains no unresolved local destinations.

## Intentionally deferred to game design/implementation

The following are **not documentation-maintenance blockers** and must not be silently resolved by the editorial migration:

1. Feasible physical hex layouts and exact routed/Waterborne/Blocker interplay for all named Transformation contacts.
2. Same-timestamp scheduler behavior, including the exactly-eight-hour completion boundaries in the two-phase Daisyspell and Ghost Rice routes.
3. Final fungal Growth/Sporulation days, Spore yields/germination, source-side boost tuning, complete species habitat/death timers and balance/playtests.
4. Actual Plant/Fungus/Mycelial lifecycle and Transformation code, plus its integration tests.

Those topics remain visible in the design specifications and [semantic watchlist](semantic-risks.md), without blocking the **documentation organization and publication** requested here.

## Repository publication evidence

- Initial source/tree baseline: `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b`.
- Publication commit: The commit that introduced `docs/design/` on `main` (see GitHub history); this report is included in the same atomic promotion commit..
- Final GitHub comparison: verify all new files live under `docs/design/`, existing original docs are untouched, and the only pre-existing file edited is the top-level `README.md`.
