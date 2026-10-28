# Profile semantic sweep — pass 7 (27 October 2026)

> **Editorial correction, not new game-design approval.** Compared to the approved Plant-owned final recipe sections (§§67,69–76), fungal interaction decisions (§§56,60–63,68), and the previous staging baseline `36f989c7`. Existing pre-migration documents, including the repository root README, remain untouched. All superseded staged lines are preserved verbatim in [historical design](../superseded-design/superseded-design.md#editorial-pass-7--corrected-source-era-status-and-named-fungi-contacts-27-october-2026).

## Findings and corrections

| Staged document | Exact source-era lines corrected | Reconciled current authority |
| --- | ---: | --- |
| [Foundational Fungi](../superseded-design/fungi/profiles-foundation.md) | 7 | §60F/§§61–63 now define overlapping timed Mycelial contributions, Blocker severance, Flooded behavior and source support. Fungal roster and all 69 recipes have been approved. Enchanted was removed (§61). |
| [Alternative Fungi](../superseded-design/fungi/profiles-alternatives.md) | 4 | §§67,69–76 supersede claims that named contacts were not assigned for **Dewmender, Lanterncap and Rilllace**, and that the family recipe pass was still future work. |
| [Aquatic](../../design/plants/aquatic.md) | 2 | §69 gives Kelpergeist → Kelpless's **18h not-Flooded, no named fungus** route; approved Fungal sources already exist for farming compatibility. |
| [Flowers](../../design/plants/flowers.md) | 3 | §73's Charmomile → Daisyspell transition creates a **fresh 0%-progress Plant** under §58, preserving access to its 75% Leaf peak. The current Fungi roster emits established Effects. |
| [Spices](../../design/plants/spices.md) | 3 | §40 sets Starberry's **31-Leaf peak** and light multipliers; §76 names **Prismorel AND Mistruffle** for Starberry → Glass Apple with **28h Damp/Warm/Bright**, no placeholder. |
| **Total** | **19** | |

The three Fungi contact corrections were checked against the **actual approved final family route tables**, not inferred from descriptive earlier fungal drafts:

- **Dewmender**: Aquatic §69, Woodlands §71, Desert §74; also generic Ingredients emissions as applicable.
- **Lanterncap**: Woodlands §71, Flowers §73, Spices §76; also generic Ingredients emissions as applicable.
- **Rilllace**: Aquatic §69 and Desert §74. Its Waterborne cultivation propagation is **unlimited over connected Flooded hexes** (§56), but its Cooling environmental footprint remains independent.

## Mechanical preservation and limits

- All **19** former lines, including any table cell text or headings, were archived as exact strings with their staged-file path and former line number. Replacement lines are one-for-one: all five edited topic files retain their line counts, and each family/Fungus profile Markdown table-row count remains unchanged.
- **No approved recipe-table row was modified**. This pass changes stale descriptions and interpretation only, not numerical tables, 31 fungal parameter values, Seed identities or the 69 recipe conditions.
- Historical statements are not implementation authority. The full manual per-profile qualitative certification is **still open**; we have corrected a confirmed high-risk subset. Geometry/satisfiability and fine-grained same-timestamp behavior have **not** been simulated.
- Documentation migration is **still staging-only**. Do not promote the new docs or update the original README until the final side-by-side comparison and user sign-off.

## Follow-up checks before semantic sign-off

1. Continue the paragraph-level scan of the remaining Woodlands, Desert and Ingredients narratives and of the uncorrected source-origin passages in the three Fungi batches.
2. Classify remaining genuinely open values (fungal Growth/Sporulation days, Spores, dependent X-hour grace, Mycelial spread/retreat time, interpolation/rounding) as open and avoid inventing fixes.
3. Run/render repository-link checks, complete the [semantic crosswalk](source-crosswalk.md#semantic-comparison-checks-still-required), and obtain user acceptance of the old/new comparison.

See the [rolling comparison](current-vs-original.md) and [semantic precedence audit](semantic-rule-precedence.md).
