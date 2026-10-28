# Cultivation Grimoire — species knowledge and discovery

> **ACTIVE · APPROVED — Prototype 16.** The player-facing Grimoire and read-only developer preview are implemented. It records garden-specific discoveries without altering the canonical [Plant profiles](../README.md#plant-families), [V8 Fungi](../fungi/random-roster-v8.md), [V9 Transformation recipes](../fungi/random-roster-v9.md), [Influences](influences-and-responses.md), or [simulation timing](simulation-and-time.md). The old Prototype 15 and schema-5 implementation paragraphs below are dated checkpoints; see [current implementation status](../../implementation-status.md).

## Purpose and name

The feature is called the **Cultivation Grimoire**, rather than a bestiary or generic glossary. It is a permanent-in-that-garden, progressively completed field reference that rewards experiments with the environment, Fungi and Plant Transformations. A player can look up what affects a particular Plant **or** what an already-known Fungus does to Plants, rather than relying on memory or external guides.

The Grimoire presents illustrations, short species descriptions, favourable growing/environmental conditions, harmful or production-reducing conditions, known Influences/Fungal interactions and discovered Transformation conditions. An entry may have some fields revealed and other fields still unknown. **The book layout and center-hinged page-turn animation were subsequently approved through a standalone HTML prototype and integrated into the game.** Authored species-specific literary descriptions and finished botanical illustrations remain future content; the current plate art and prose are clearly generic placeholders.

## Initial visibility and species discovery

| Content | At the start of a new garden | Later |
| --- | --- | --- |
| Six Base Plants | **Revealed**: Potato (Ingredients), Daisydaze (Flowers), Aquatic Base (Aquatic), Woodlands Base (Woodlands), Jadeheart (Desert), Thymely (Spices) | Additional facts and Transformation history unlock through experimentation. |
| Other 54 Plants | **Hidden**, including their identities, illustrations, descriptions and undiscovered recipes | Their species entries become visible upon an actual in-garden discovery, ordinarily the successful Transformation that produces the Plant. |
| All 13 current Fungi (12 ordinary plus Mycelord) | **Revealed as species** from the beginning; their basic identity, illustration and short description can be browsed | Each Fungus's effects on individual Plants, favourable/harmful interactions and participation in Transformations unlock **only when discovered**. |

**Knowing that a Fungus exists is not knowing what it does.** Neither its starting description nor another species's entry may pre-disclose hidden Plant interactions or Transformation solutions. Basic information about unlocked Plants likewise must not implicitly enumerate their remaining undiscovered outcomes.

A species becoming visible is distinct from owning its Seeds/Spores or possessing a living specimen. The Grimoire is **knowledge, not an inventory or planting-permission system**. It does not award items, alter germination, or make a species freely placeable. A genuine in-game discovery of a species is retained even after the organism is harvested, dies or transforms again.

## Knowledge unlocks — only observed information

The Grimoire is filled incrementally as the *real resolved game state* demonstrates a fact:

1. **Plant species discovery:** When a previously hidden Plant first appears through a successful Transformation (or another subsequently approved legitimate discovery route), unlock its species entry, illustration and basic description. Failed attempts do not unlock the result.
2. **Effective Influences and Fungus–Plant interactions:** When a resolved environmental or fungal Influence **actually affects** a Plant, permanently record the *specific observed effect* and its participants. For Fungi, this includes production/Growth alterations and any other real cultivation response the existing rules support. Merely placing a Fungus nearby, selecting a possible recipe, being outside its real zone, or having its effect blocked does not count as discovery.
3. **Favourable environment:** Reveal a favourable condition or response when the Plant has actually experienced the associated beneficial behaviour. Do not fill the full optimal-environment section from its hidden profile simply because the Plant was inspected.
4. **Harm and reduced production:** Reveal the observed harmful condition and its effect when a real detrimental response, hazard, reduction or death is resolved. Seeing a theoretical hazard in hidden rules does not unlock it.
5. **Successful Transformations:** Once a Transformation **actually occurs**, reveal the **observed recipe only**: the source and resulting species, the conditions that were genuinely satisfied, the observed qualifying Fungus contacts/Influences, and any required sequence or time window evidenced by that successful event. Do **not** reveal all alternative compatible Fungi, other unseen paths to the same result, undiscovered sibling outcomes, or all of a species's possible future recipes.

Entries may therefore grow from basic identification to a partial field record to a rich experimental history. Re-observing an already known fact does not erase it, and later conflicting circumstances must not overwrite the historical fact that the earlier effect was genuinely observed.

### What qualifies as an observation

- Use the simulation's **resolved Conditions, reached emissions, blocker checks, actual organism responses and committed Transformation events**, not speculative UI proximity. Fungus contact by a reaching zone is distinct from a Fungus actually applying a Growth/production bonus; the record should identify the effect that really occurred.
- Discoveries may be recorded during **continuous farm progression, including while staging**. Uncommitted markers and concealed pending germinations cannot emit, grow, transform, or grant advance knowledge. A secretly successful germination cannot leak its result before public emergence.
- An unsuccessful Transformation attempt, partially accumulated timer or recipe eligibility preview is **not** an observed successful Transformation. Transformation unlock happens on the committed result.
- If a Transformation accepts alternative members of a qualifying group, preserve which actual contact(s) qualified for the observed success. A success should not be rewritten as proof that every other group member works; where several candidates were present, do not claim a single exclusive cause without evidence.
- A fact may be shown in understandable player-facing language rather than raw calculation internals, but its content must follow the exact observed event. Specific values, thresholds or conditions that were **not actually established** by the observation must remain unrevealed. Authoring the wording for complex conditions is an implementation/content task, not license to change the source rules.

## Bidirectional Plant and Fungus reference

**A discovery of one interaction updates both relevant views.** For example:

- The Plant's page lists the known Fungus and its observed effect on that Plant.
- The Fungus's page lists the same Plant and the same observed effect, including whether it is beneficial, harmful or part of a confirmed Transformation.
- A successful recipe may be inspected from its source Plant, its resulting Plant, and every Fungus **actually evidenced as a participating contact** in that discovered route.

These are **two views of one canonical discovery**, not two independently unlockable facts or manually duplicated text. Links to still-hidden Plant species, unknown recipes or alternative possible interactions must not be exposed accidentally through Fungus pages, lists, previews, search, links or counts. A known Fungus may therefore have an initially empty/unknown interactions section, even though its underlying catalog profile contains many effects.

The species/Transformation registries define the real rules; discovery records identify **which species IDs, effects, contacts and individual observed recipe witnesses the garden has learned**. The interface must not maintain a parallel editable copy of the biology or balance specifications.

## Persistence and save-game boundary

- Grimoire progress is **per garden, not shared globally between separate save files or new games**. Every garden owns its discovery ledger.
- Once unlocked, knowledge persists through the normal simulation, harvesting, deaths, and additional staging/Apply phases. No automatic forgetting or re-locking within that garden.
- Browser autosave and a downloaded `.ccsave` must save the Grimoire with the rest of the garden. Loading a backup restores the **knowledge in that snapshot**, potentially returning to an earlier point in the same garden's discoveries. This is compatible with the [existing save-file design](saving-and-backups.md), which stores garden state; it does not require account-wide knowledge.
- The ledger should store stable IDs/observed evidence rather than duplicating the complete species profile, artwork or balancing tables. That keeps authored species content updatable without silently granting missing discoveries or desynchronizing Plant and Fungus pages.
- **Implemented migration choice for schema 1–4 saves and older portable files:** identify the six Base Plants and any **already-living** Plant species, but leave old interactions, hazards and Transformation histories unknown. Do not infer them from inventory, the current species registry or transformed organisms' current forms. A restored schema-5 save rehydrates and validates its own recorded Grimoire ledger. The save envelope version remains 1.
- The current downloadable format is human-readable JSON. Discovery secrecy is **player-interface concealment, not encryption or anti-cheat protection**. This matches the existing hidden-germination limitation.

## Approved book UI and navigation

The player opens the Grimoire using the ordinary **❦ Cultivation Grimoire** button in the top bar. It uses two adjacent parchment pages, a fixed center spine, a slightly larger dark-green book cover, backing-sheet edges and **a page-turn animation hinged on the center rather than floating pages**. Navigation arrows sit at the lower outer page corners; the close control is at the upper right.

**Eight colored bookmarks**—Ingredients, Flowers, Aquatic, Woodlands, Desert, Spices, Fungi and Index—keep fixed vertical positions. They begin on the right of the book and transfer to the left as their sections are passed, physically riding the turning page. They are all on the left at the final Index spread. Clicking one jumps to that section with a page flip; the arrow keys turn individual spreads, and Escape closes the book. Within a family, a selector lists only the species actually identified in that garden. **The names or number of undiscovered Plant species are not shown as empty/locked slots.** The Index lists sections without revealing their hidden inhabitants. Fungi entries exist from the beginning and use the same interactions from the canonical ledger as Plant pages.

The initial visual reference is the separately approved **Cultivation Grimoire V2 book-motion HTML study**. The integration uses the same paper/cover, tab movement, page layout and anchored animation, but replaces demo/sample text with live garden knowledge. Respect `prefers-reduced-motion` and small screens. Botanical plates are currently explicit placeholders, not completed commissioned artwork.

The developer testing interface should be able to examine discovery state and deliberately reset/test unlocks **without making those cheats ordinary player actions**. A later developer-preview implementation uses the approved book layout to expose the canonical catalogued Plants, Fungi and Transformation recipes as a read-only overlay behind **Display developer tools**; it never writes discoveries to the garden. Deliberate discovery resets remain future work.

## Implementation contract and verification targets

1. Build a **data-driven discovery ledger** in the core garden state (e.g. known species, observed environmental/fungal responses, observed hazards and witnessed successful Transformation routes). Keep stable keys and a clear event-to-discovery mapping.
2. Record discoveries at the relevant authoritative biology/Transformation events, not by reading the inspector or clicking entries. Repeated updates should be idempotent, and emissions blocked or not reaching a Plant must not trigger false discoveries.
3. Derive the Plant-oriented and Fungus-oriented descriptions from **the same facts**, using the approved catalog/rule definitions for their meaning. Do not unmask alternative routes or unseen target Plants.
4. Integrate with save migration, browser autosave and `.ccsave` export/import so round-trips preserve all discovered and still-hidden knowledge, without cross-garden leakage.
5. Test fresh initial visibility (6 starting Plants, 54 hidden Plants and 13 identified Fungi), real effect versus merely adjacent/blocked emission, benefits versus harms, successful versus failed/partial Transformation, observed versus alternative recipes, the two-way entry mapping, persistence across harvest/death/staging, and save/load behaviour.
6. Test that locked information stays absent from **every player-facing surface**. Current inspector recipe eligibility/progress and developer debug screens must be reviewed when implementing the feature so they do not undermine the discovery game. Debug information may remain behind **Display developer tools**.

**Prototype 15 implementation status:** The `src/core/grimoire.js` ledger records observed environmental responses, effective fungal cultivation/environment interactions, documented hazards and successful Transformation witnesses, and derives Plant/Fungus views from the same facts. Stage Apply and harvest capture applicable Fungal actions; concealed germination reveals a Plant **only when the result becomes public**. Schema 5 records the ledger and migrates previous saves conservatively. `src/CultivationGrimoire.jsx` and `src/grimoire.css` implement the approved book animation and player access; exact undiscovered recipes and inspector debug clocks are restricted to developer mode. Seven focused Grimoire tests supplement the existing simulation suite. The full 60-Plant/31-Fungus/69-route roster remains independently implemented and documented.

**First-pass limitations:** The field-book notes report individual observed Conditions and qualitative effect directions, not measured percentages or fully authored hazard descriptions. Complex sequence routes record only verifiable successful witnesses, potentially omitting contacts that vanished during preparation rather than claiming an alternative. The illustrated plates and descriptive copy are placeholders; some especially subtle Effect attribution and explanatory text may need later design and QA passes. These limitations do **not** authorize revealing undiscovered recipes or weakening per-garden persistence.
