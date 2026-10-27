# Browser autosave and portable garden backups

**Player-facing persistence decision, 27 October 2026; first implemented in Prototype 14, extended in Prototype 15 for the Cultivation Grimoire.** This page supplements the [live staging specification](spatial-inventory-and-staging.md) and [per-garden discovery rules](cultivation-grimoire.md) without changing any Plant, Fungus, environment or transformation rule. For tested scope, consult the [implementation ledger](../../implementation-status.md).

## Automatic local saving

- The current game writes the entire garden after each state update to the browser's **localStorage**, under `companion-cultivation:sandbox:v5`. This is **website data**, not the browser's disposable resource cache or an account-backed cloud save.
- The saved state includes the clock, environment, organism stages and output banks, inventory quantities and their manual square positions, uncommitted staged quantities, committed pending germinations and their concealed outcomes/reveal times, **and the garden's Cultivation Grimoire discovery ledger**.
- Refreshing or reopening the game in the **same browser profile and device** resumes this state. Clearing website data, using private browsing or changing browser/device may lose that autosave; browsers can also decline storage. A visible `Autosaved` / `Autosave unavailable` status indicates whether the last write succeeded.
- The farm currently advances only while its page is open, using the deliberately provisional live-clock rate. **Offline/background catch-up remains undecided**; loading an old save does not invent elapsed simulated hours.
- Existing older browser storage keys (`sandbox:v1`, `v2`, `v3`, `v4`) are not overwritten during the v5 migration; they remain reference copies. Once a file is loaded, subsequent auto-updates write the active `v5` key. Migration identifies the six base Plants plus Plants that are already living in the old garden; it does **not** invent historical Transformation recipes or Fungal discoveries.

## Player-facing Save Game

- The header's **Save Game** button downloads a snapshot of the **current** garden as a `.ccsave` file through the browser's normal download mechanism. The player decides where to keep it; no account, upload or server is involved.
- The file contains readable JSON in a small envelope with `format`, `fileVersion`, `savedAt` and the complete `garden` object. This metadata describes the portable file separately from the game's `schemaVersion` so later garden migrations remain possible.
- Players may make many backups, carry them between computers or restore one later. A file is a **snapshot**, not a separate continuously updated save slot; the player must download another file to back up later progress.
- Saving is permitted **at any moment**, including during an open staged plan or a concealed germination. It does not pause, spend items, settle pending rolls or advance simulation time.

## Player-facing Load Game

1. **Load Game** opens the native file picker for `.ccsave` files or the older `.json` developer exports.
2. Parse, recognize the envelope/version or old raw garden format, validate supported size and structure, migrate earlier garden schemas, and verify the calculated environment **before altering the active garden**.
3. Ask for explicit confirmation that loading will replace the current garden and the next browser autosave. Cancellation or a rejected/corrupt file changes **nothing** in the active garden.
4. Restore the full validated garden and resume its saved clock, inventory positions, staging proposals, pending reveal timers **and the knowledge recorded in its Grimoire**. Clear transient UI selections/quantity dialogs; keep developer JSON export/import functional behind its existing toggle.

**Concealment caveat:** The save must preserve secretly determined germination outcomes in order to resume faithfully. They are not exposed by the ordinary interface, but the file is human-readable JSON; a player who inspects or edits their own backup can see technical state. This feature does not provide anti-cheat encryption or server authority.

## Still open

- Real account/cloud synchronization, cross-tab conflict handling, optional named save slots and a full backup manager are **not designed** by this milestone.
- Whether the game progresses while closed and the final in-game clock rate remain separate time-system decisions.
- Portable saves must remain compatible with later schema migrations. A future incompatible change must explicitly document its migration or rejection behavior before shipping.
