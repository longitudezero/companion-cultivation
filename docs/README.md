# Companion Cultivation — documentation map

The repository separates **current approved design**, **open proposals**, and **historical records**. Start with the current references; do not treat an old proposal or handoff as a present rule.

| Area | Purpose | Entry point |
| --- | --- | --- |
| **ACTIVE · APPROVED** | Source of truth for intended game mechanics, species and transformations | [Current game design](design/README.md) |
| **WORKING · NOT APPROVED** | Brainstorming, alternatives and proposals awaiting a design decision | [Working notes](working/README.md) |
| **ARCHIVED · HISTORICAL** | Superseded designs, old iterations, frozen original sources, audits and handoffs | [Historical archive](historical-archive/README.md) |
| **IMPLEMENTATION** | What the game actually runs, tested coverage and provisional mechanics | [Implementation status](implementation-status.md) |
| **DEVELOPER GUIDE** | How to use the player and testing controls | [Developer tools](developer-tools.md) |

**Current checkpoint:** Prototype 16 uses the [V8 roster of twelve ordinary Fungi plus Mycelord](design/fungi/random-roster-v8.md) and [V9's 69 named-contact Transformation recipes](design/fungi/random-roster-v9.md). Both are implemented. The source-of-truth design remains distinct from implementation status and from archived first-pass designs.

Plant names were updated without changing species mechanics; use the [current naming map](design/decisions/plant-names.md) to translate older profile and recipe documents.

When a proposed change is accepted, update the relevant active design document and record the superseded version in the historical archive. New, unapproved alternatives belong in `working/` until approved.
