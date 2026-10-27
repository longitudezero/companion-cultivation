# Final navigation and authority audit — pass 11 (27 October 2026)

> **Staging verification, not final approval.** These checks apply to the `docs-reorganization` branch and its `docs/next/` draft. Nothing in this report licenses modifying the pre-existing documentation or root `README.md` before a user-approved comparison.

## What changed

- Replaced **nine obsolete or misleading active lines** across [foundational Fungi](../fungi/profiles-foundation.md), [alternative Fungi](../fungi/profiles-alternatives.md), and [environmental v1.2](../systems/environment.md). Each **complete former line** is preserved verbatim in the [historical archive](../history/superseded-design.md#editorial-pass-11--fungal-effect-alternatives-and-staging-authority-cleanup-27-october-2026).
- The §50 text no longer says Seed Timing Shift or the two Allocation directions lack named sources, nor that the Plant Transformation recipe design still must follow a future fungal batch.
- The §53 comparison recognizes approved alternative sources: Tidegill/Gloamclock, Frostfolio/Bristlecap, Sunspore/Goldgill; the five **Waterborne cultivation** fungi are Tidegill, Sunspore, Rilllace, Brookrill and Siltgill. Source strength, signed emissions, Airborne reach and §56's 3:1 conversion rule are retained.
- The environmental system's implemented prototype rules remain authoritative *for the implemented environment*. Its link to the new cultivation documentation now explicitly calls that **preservation-first staging**, not yet the official design home.
- The [staging index](../README.md) now links the older [verification report](verification-results.md) and this report.

## Preservation and mechanical review

| Check | Evidence / result |
| --- | --- |
| Comparison baseline | `a9f5f70d97dd5d992c0680515ef28e596f1b7d9b` |
| Scope of intended edits | **Only `docs/next/`**: staged prose corrections, audit/index updates and this report |
| Pre-existing documents and root README | **0 modified or deleted** compared with baseline (confirm again after publishing) |
| Approved 69 Plant-owned recipes | **No recipe or species family table edited in this pass** |
| 31-Fungus nominal parameter matrix | **No matrix data edited in this pass** |
| Complete retired lines | **9/9 full former lines** added to historical archive |
| Staged Markdown navigation | **38/38 files reachable** from `docs/next/README.md`; 0 unindexed |
| Relative Markdown links (including to preserved originals) | **572 local destinations**, 0 unresolved |
| Heading-fragment destinations | **26 heading fragments**, 0 unresolved |

This check is a **static Markdown-source inspection** of ordinary relative destinations, heading fragments and index reachability against the repository tree. It does not test GitHub's rendered view, links constructed at runtime, every possible fragment-generation edge case or the truth of each qualitative claim.

## Acceptance gates still open

1. Read family and fungus profiles **paragraph by paragraph**, checking every surviving present-tense claim against later approved decisions. Earlier passes established full source and species coverage, not universal sentence-level sign-off.
2. Spot-check representative pages and deep links in **GitHub's rendered Markdown interface** after publishing.
3. Review the original-versus-reorganized comparison, and obtain the **user's approval** before replacing the original root README or retiring any existing source document.

The [source crosswalk and unchecked semantic gates](source-crosswalk.md), [rolling comparison](current-vs-original.md) and [species ledger](species-coverage-ledger.md) remain the main acceptance records.
