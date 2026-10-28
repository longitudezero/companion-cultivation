# Player controls and developer tools — Prototype 16

This page describes **the current interface**, not a new or finalized gameplay design. The separation is an interface safeguard against accidental sandbox editing. It does not disable capabilities in the deterministic core API or provide an anti-cheat security boundary.

## Toggle and default view

The top bar, next to the Companion Cultivation logo, offers **Display developer tools**. It is **off by default on page load**. Click it to show a separate **Developer tools · test only** section and other test-only controls throughout the interface. Click **Hide developer tools** to return to the player-facing view.

If a debug placement tool is active when the developer tools are hidden, the selection automatically switches to **Inspect**. Existing garden objects, environmental state, and inventories are **not** altered. Browser-local garden saving is unchanged. The visibility preference is intentionally not stored with the garden.

### Always visible (provisional player-facing interface)

- **Inspect:** Select existing hexes and objects, read their resolved Conditions, growth and current harvest amounts. Exact undiscovered Transformation recipes, hidden Fungus effects and hazard thresholds no longer appear in the ordinary inspector.
- **Cultivation Grimoire:** The top-bar **❦ Cultivation Grimoire** opens the approved bound-book UI with all Fungi and six starting Plants identified, and progressively reveals environmental observations, fungal interactions and successful Transformation witnesses. Its eight fixed-height colored bookmarks change sides with the hinged page turn. Knowledge is per garden and included in browser autosaves and `.ccsave` backups; illustration plates are placeholders. See [Grimoire design](design/systems/cultivation-grimoire.md).
- **Spatial inventory:** Four collapsible pages of 50 squares each (200 total); each distinct Seed, Spore, Plant-specific Leaf or special item has one unlimited stack. Drag a stack to reposition it, including onto another occupied square to swap positions. Positions persist in the saved garden.
- **Sow Seeds / Sow Spores:** Drag an owned Seed/Spore stack onto a hex, or select the stack and click the target hex (the Sow toolbar is a keyboard/mouse fallback). Choose an amount with the editable quantity box, ± buttons or example presets. This stages a **reservation**, not a charge. Existing germination and habitat rules still apply at Apply.
- **Staging and Apply:** Reposition, edit or undo uncommitted proposals. **Apply** validates every site and commits them together, spending Seeds/Spores exactly once. Committed `?` markers conceal either a successful or failed roll until the delay expires. Another plan can begin immediately, even while earlier plots are pending.
- **Harvest:** Drag a living Plant/Fungus from its hex into the inventory, or use the inspector's Harvest action. Its existing one-time yield and restrictions remain in effect; outputs merge into species-specific stacks.
- **Environment, plot contents and clock:** Inspection remains available. The clock **advances automatically even while staging**, so existing Growth, Transformations, hazards and Mycelial activity update live. Existing Sources/Blockers keep affecting the simulation even when editing them is hidden.
- **Autosave, Save Game and Load Game:** The header reports whether writing to browser-local storage succeeded. Save Game downloads a complete portable `.ccsave` snapshot; Load Game validates a `.ccsave` or older `.json` garden, then asks for confirmation before replacing the active garden and browser autosave. Both work during staging or pending germination and do not spend items or advance time. See [saving and backups](design/systems/saving-and-backups.md).

### Visible only with developer tools on

| Developer operation | Where it appears |
| --- | --- |
| Free-spawn any Plant or Fungus, without Seeds/Spores | Separate developer tools group in the left workbench |
| Place Sources, Hex Blockers, Edge Blockers | Developer tools group |
| Remove an object or edge without harvesting | Developer Remove tool and inspector remove buttons |
| Change local Moisture, Temperature or Illumination baseline | Hex inspector dropdowns (read-only otherwise) |
| Configure regular or anchored Sources and their emissions | Source inspector |
| Change Blocker filtering and directed Fungus heading | Relevant inspector controls |
| Inspect undiscovered recipe eligibility and clocks, full hazard thresholds, source contributions and raw Fungal cultivation magnitudes | Organism and hex inspector; hidden for ordinary players to preserve Grimoire discovery |
| Preview every Plant, Fungus profile and all related Transformation recipes in the Grimoire | Turn on developer tools, open **❦ Cultivation Grimoire**, then select **Preview full Grimoire**. Select **Return to discoveries** to restore the normal view. The preview is read-only; it does not unlock entries or alter the saved discovery ledger. |
| Skip 1 hour or 1 day | Buttons beside the read-only garden clock |
| Restore demo, start a blank plot, resize the grid | Plot controls |
| Export raw garden JSON | Inspector footer; technically inspectable full state, including hidden germination outcomes |
| Import earlier raw JSON | Inspector footer; reuses the same validated, confirmation-gated player Load Game path |

## Still awaiting design

**Player-placeable Blockers** remain undecided. Hex and Edge Blocker placement are *both developer-only* for now; later designs may expose specific approved blocker items through different player actions. No new blocker costs, restrictions or mechanics were invented in this pass.

The game now **advances one in-game hour every five real seconds while its browser page is open**, independently of staging. Developer `+1 hour` / `+1 day` buttons can still fast-forward. **That speed is a provisional test value**; background/offline catch-up, pause semantics and the final time scale require design decisions. A committed germination remains concealed for **six simulated hours** in this prototype, also provisional.

The [approved spatial-inventory and repeatable staging specification](design/systems/spatial-inventory-and-staging.md) remains authoritative for the interaction and safety rules; this guide describes its **first working implementation**. The initial six Seed stacks are prototype stock; player acquisition of starter Spores and relocation of living organisms with a future item have not been designed. Debug-only JSON export exposes full technical state, including concealed germination outcomes, and therefore should remain behind the developer toggle.

Portable `.ccsave` backups are likewise readable JSON containing the entire state; the player-facing UI keeps concealed results hidden, but files are not encrypted. There is no account-based sync or automatic game-time catch-up while the browser is closed. File downloads use the browser's normal downloads folder or browser-configured destination.

For code coverage and provisional numerical assumptions, use the [implementation ledger](implementation-status.md). For normative gameplay specifications, use the [design index](design/README.md). The [original full design source](historical-archive/originals/herbs-and-fungi-design.md) and historical documents are preserved unchanged.
