# Browser autosave and portable garden backups

> **ACTIVE · APPROVED — Prototype 16.** Player autosaving, portable `.ccsave` backups and per-garden Grimoire knowledge are implemented. Schema V6 is deliberately incompatible with earlier saves; the migration discussion below is historical Prototype 14–15 context, not a current compatibility promise. See [implementation status](../../implementation-status.md).

This page supplements the [live staging specification](spatial-inventory-and-staging.md) and [per-garden discovery rules](cultivation-grimoire.md) without changing Plant, Fungus, environment or Transformation mechanics.

## Automatic local saving

- The current game writes the entire garden after each state update to the browser's **localStorage**, under `companion-cultivation:sandbox:v6`. This is **website data**, not the browser's disposable resource cache or an account-backed cloud save.
- The saved state includes the clock, environment, organism stages and output banks, inventory quantities and their manual square positions, uncommitted staged quantities, committed pending germinations and their concealed outcomes/reveal times, **and the garden's Cultivation Grimoire discovery ledger**.
- Refreshing or reopening the game in the **same browser profile and device** resumes this state. Clearing website data, using private browsing or changing browser/device may lose that autosave; browsers can also decline storage. A visible `Autosaved` / `Autosave unavailable` status indicates whether the last write succeeded.
- The farm advances only while its page is open at the **approved rate of one garden hour per five real seconds**. **Offline/background catch-up remains undecided**; loading a save does not invent elapsed simulated hours.
- Existing older browser storage keys are left untouched for reference; the active game writes only the `v6` key. Old schema versions are rejected rather than migrated, as explicitly approved for Prototype 16. A V6 save preserves its real observed Grimoire facts without fabricating past transformations.

## Player-facing Save Game

- The header's **Save Game** button downloads a snapshot of the **current** garden as a `.ccsave` file through the browser's normal download mechanism. The player decides where to keep it; no account, upload or server is involved.
- The file contains readable JSON in a small envelope with `format`, `fileVersion`, `savedAt` and the complete `garden` object. This metadata describes the portable file separately from the game's `schemaVersion` so later garden migrations remain possible.
- Players may make many backups, carry them between computers or restore one later. A file is a **snapshot**, not a separate continuously updated save slot; the player must download another file to back up later progress.
- Saving is permitted **at any moment**, including during an open staged plan or a concealed germination. It does not pause, spend items, settle pending rolls or advance simulation time.

## Player-facing Load Game

1. **Load Game** opens the native file picker for `.ccsave` files or the older `.json` developer exports.
2. Parse, recognize the envelope/version or raw JSON garden format, validate the supported V6 schema, file size and structure, and verify the calculated environment **before altering the active garden**. Earlier incompatible schemas are rejected.
3. Ask for explicit confirmation that loading will replace the current garden and the next browser autosave. Cancellation or a rejected/corrupt file changes **nothing** in the active garden.
4. Restore the full validated garden and resume its saved clock, inventory positions, staging proposals, pending reveal timers **and the knowledge recorded in its Grimoire**. Clear transient UI selections/quantity dialogs; keep developer JSON export/import functional behind its existing toggle.

**Concealment caveat:** The save must preserve secretly determined germination outcomes in order to resume faithfully. They are not exposed by the ordinary interface, but the file is human-readable JSON; a player who inspects or edits their own backup can see technical state. This feature does not provide anti-cheat encryption or server authority.

## Still open

- Real account/cloud synchronization, cross-tab conflict handling, optional named save slots and a full backup manager are **not designed** by this milestone.
- Whether the game progresses while closed and the final in-game clock rate remain separate time-system decisions.
- Portable saves must remain compatible with later schema migrations. A future incompatible change must explicitly document its migration or rejection behavior before shipping.
