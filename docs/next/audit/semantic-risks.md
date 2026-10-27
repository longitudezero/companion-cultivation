# Semantic conflict watchlist — editorial migration review

**Status:** Open. These are known high-risk places where a literal source copy can make a new topic file appear to endorse a rule that was later superseded. The original sources remain untouched. Do **not** fix these by broadly deleting paragraphs or silently rewriting numbers: transfer the outdated claim with its context into [historical design](../history/superseded-design.md) and retain the approved replacement in the canonical destination.

| Priority | New draft area | Earlier claim or ambiguity | Current authoritative decision | Required review |
| --- | --- | --- | --- | --- |
| Critical | [Woodlands](../plants/woodlands.md), source §22/§70 | Mandrakadabra's special **6h Mycelial death threshold** and incomplete Mandrabra recipe | §§70–72: **4h continuous Bright lethal threshold**, Lit farming optimum; **Damp/Bright + Rushroom OR Siltgill for 12h**, no Mycelial-on-Plant gate | Move the superseded special-hazard claim and preliminary recipe discussions to history, retain the precise approved final behavior |
| Critical | [Fungal profiles](../fungi/README.md), source §§53–55 | Earlier Waterborne cultivation footprints written as numeric **Range 3** | §56 and [Environment v1.2](../systems/environment.md): unlimited connected-Flooded Waterborne propagation; separate environmental Airborne ranges stay unchanged | Preserve actual environmental range values, strip obsolete Waterborne numeric caps from active profiles |
| Critical | [Spices](../plants/spices.md), source §§37–40 | Statements that specific recipes/fungus contacts have not yet been assigned | §76 has 11 approved newly reconstructed first-pass recipes | Keep exact §76 names, times, transition, and net-Lit opposite-emission requirements; move earlier status claims to history |
| High | [Transformations](../systems/transformations.md), source §68 | 'Remaining families still need recipes' status | §§69–76 complete **all 69** routes | Remove old progress instruction, preserve actual named-contact/Ingredients exception |
| High | [Woodlands](../plants/woodlands.md), source §23/§24 | Early **proposed** Woodlands numerical tables versus later approved first-pass compatibility and germination | §24 approved numerical pass, later §§58–65 override global semantics | Check each numeric table for continuity before deciding what is only proposal history |
| High | [Desert](../plants/desert.md), source §§33–36 | Old Sand/material or symbolic Ember/Rime/Shelter/Mirage fungus sketches | §61 removes Materials/Fertility; §74 supplies approved named contacts and final recipes | Remove obsolete Material gates and unnamed fungus sketches from canonical file without dropping environment/hazard details |
| High | [Fungi](../fungi/README.md), source §§47–57 | Historical batch status such as 'full roster incomplete', proposed intermediate combinations, and open interaction audit | 31 first-pass approved profiles; §§56–65 refine Allocation, grace, timed exposure and event order | Distinguish approved species parameters from early proposals and preserve all deliberate alternative effects |
| High | [Plant lifecycle](../systems/plant-lifecycle.md), source §60/§65 | Several successive descriptions of Yield application and environmental output | §60G tracked ordinary fungal Yield, §65 prospective environmental output; explicitly live traits such as Starlotus are exceptions | Establish one definitive current accrual rule while preserving the different treatment of hourly banked production and natural decline |
| High | [Mycelial](../systems/mycelial.md), source §§61–63 | Potential confusion between immediate support severance and time-based retreat, or immediate fungus death | Flooded severs support immediately; existing contributions retreat with elapsed time, dependent fungi retain emissions while alive during grace; Mycelord has separate Flooded death clock | Preserve temporal distinction and overlapping colony contributions |
| High | [Spices](../plants/spices.md), source §37/§15 | Glimmer/Veil/Gloam/Prism placeholder names, and incomplete §75 recovery notes | §76 approved actual species contacts; source §15 is historical only | Keep placeholders solely in history, with an explicit link to §76 |
| Medium | [All family files](../README.md) | Old notes saying recipes, fungal roster, or implementation are 'next steps' | Recipe roster complete first-pass; Plant/Fungus/Mycelial runtime still not implemented | Keep implementation-status distinctions, move dated progress notes to history |
| Medium | [All new references](../README.md) | Markdown section anchors and cross-document references may have changed during relocation | [Source crosswalk](source-crosswalk.md) identifies exact origins | Validate rendered heading links and reciprocal topical navigation in GitHub |

## Review method

1. Confirm the current later-approved rule and all numeric/temporal qualifiers in the original source.
2. Extract outdated statements into the historical document with their originating section label, rather than discarding them.
3. Edit only the staged new canonical file; never modify any original file.
4. Compare the resulting active section with the unmodified original, accounting for the later authoritative replacement.
5. Mark the relevant [crosswalk semantic checklist](source-crosswalk.md) item only once the exact data and exceptions are confirmed.

This watchlist is not exhaustive. It documents the highest-confidence risks found before the full manual editorial pass.


## Pass 2 disposition — 27 October 2026

- **Textual correction applied:** Woodlands §22–24 and §70 Mandrakadabra lethal threshold/recipe; fungal §53–55 Waterborne numeric caps; Spices §37–40 stale deferred status; Materials/Fertility stale source notes; §68 Mycelial-on-Plant wording; §54's superseded open Allocation rate and interim roster counts. Earlier wording is preserved in [history](../history/superseded-design.md).
- **Deduplicated without losing wording:** shared §§60 and 65, and normative §68 contact. Each has a single full detailed home, with topical links from elsewhere.
- **Structurally verified:** 76 crosswalk entries, seven final recipe sections character-for-character preserved, 31 fungal names, six family table row counts, and 296 relative links with no detected missing targets/anchors. See [updated comparison](current-vs-original.md).
- **Still open:** full per-profile prose and per-field semantic certification, rendering review on GitHub, and actual garden-layout feasibility tests. This watchlist is a living risk record; its original rows above document the initial findings and should not be read as all unresolved after pass 2.


**Additional sweep:** old partial Flowers/Desert networks, Woodlands Bamboo/Mistlefoe assignment deferrals, Ember Aloe recovery-source guesses, Spices Ghost Rice timing guesses and the Ingredients 'numeric pass later' descriptions were moved/replaced with current §-specific links. The archived originals remain intact.

---

## Pass 3 disposition — fungal numeric and lifecycle semantics

The 31-row [fungal emission and habitat matrix](../fungi/roster-matrix.md) and [field-specific audit](fungal-parameter-audit.md) cover the high-risk §47–§57 cases:

- Corrected the older **“emissions may stop immediately”** hypothesis for Rushroom/Siltgill to §60C's **full-strength emission while alive during Mycelial-loss grace**.
- Converted §§53–55's **undecided** Allocation status to §56's **fixed 3:1 exchange, four donor percentages, signed net harvest rules** and Frostfolio's **1.25× source bonus**.
- Preserved **five** Waterborne cultivation emitters (including later §57 Siltgill), while keeping each environmental Airborne reach separate.
- Kept Mycelord's **Flooded death clock** distinct from the **timed Mycelial retreat** and the dependent-Fungus source-support clocks.
- Replaced stale named-Transformation assignment claims with approved recipe references; no new abilities or recipes were invented.

All replaced lines have exact source excerpts in [historical design](../history/superseded-design.md); source profiles retain their original table-row counts. **Still open:** per-paragraph manual semantic certification across all species and Plant families, numerical gaps originally deferred, and in-game layout/timing proofs.


---

## Pass 4 disposition — six Plant-family narrative checks

The [Plant-family prose audit](plant-profile-prose-audit.md) resolves 42 inherited status/assignment statements (plus six staging headers) that conflicted with later approvals. These include Bamboom/Tanglethorn/Mistlefoe/Mistlewoe numeric and recipe deferrals, Kelpergeist/Starlotus contact timing, Flowers' already fixed 12 named recipes and bloom values, Ember Aloe's deliberate 36h recovery fork, Spices' actual Pum'king/Glass Apple contact groups, and Potato/Ingredients numeric and six-route status. Earlier exact wording is archived in [historical decisions](../history/superseded-design.md).

**Remains risky:** all six family's per-cell numeric comparison against original source, geometry and event-order proof for intricate routes, and actual biology playtests. The staging docs are not yet authoritative.
