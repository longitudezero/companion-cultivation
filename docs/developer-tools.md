# Player controls and developer tools — Prototype 12

This page describes **the current interface**, not a new or finalized gameplay design. The separation is an interface safeguard against accidental sandbox editing. It does not disable capabilities in the deterministic core API or provide an anti-cheat security boundary.

## Toggle and default view

The top bar, next to the Companion Cultivation logo, offers **Display developer tools**. It is **off by default on page load**. Click it to show a separate **Developer tools · test only** section and other test-only controls throughout the interface. Click **Hide developer tools** to return to the player-facing view.

If a debug placement tool is active when the developer tools are hidden, the selection automatically switches to **Inspect**. Existing garden objects, environmental state, and inventories are **not** altered. Browser-local garden saving is unchanged. The visibility preference is intentionally not stored with the garden.

### Always visible (provisional player-facing interface)

- **Inspect:** Select existing hexes and objects, read their conditions, fungal effects, growth and transformation requirements.
- **Sow Seeds / Sow Spores:** Spend owned inventory, with the existing germination checks and costs. These are the intended ordinary ways to place Plants and Fungi.
- **Harvest:** Collect the existing per-species Leaves, Seeds or Spores; destructive harvest remains an ordinary action.
- **Inventory, environmental views, plot contents and clock:** Read-only information remains visible. Existing Sources and Blockers are still displayed and affect the simulation.

### Visible only with developer tools on

| Developer operation | Where it appears |
| --- | --- |
| Free-spawn any Plant or Fungus, without Seeds/Spores | Separate developer tools group in the left workbench |
| Place Sources, Hex Blockers, Edge Blockers | Developer tools group |
| Remove an object or edge without harvesting | Developer Remove tool and inspector remove buttons |
| Change local Moisture, Temperature or Illumination baseline | Hex inspector dropdowns (read-only otherwise) |
| Configure regular or anchored Sources and their emissions | Source inspector |
| Change Blocker filtering and directed Fungus heading | Relevant inspector controls |
| Skip 1 hour or 1 day | Buttons beside the read-only garden clock |
| Restore demo, start a blank plot, resize the grid | Plot controls |
| Export or import full garden JSON | Inspector footer |

## Still awaiting design

**Player-placeable Blockers** remain undecided. Hex and Edge Blocker placement are *both developer-only* for now; later designs may expose specific approved blocker items through different player actions. No new blocker costs, restrictions or mechanics were invented in this pass.

The game also **does not yet progress automatically** while the page is open: simulation time currently advances using the developer-only `+1 hour` / `+1 day` controls. Consequently the default player-facing view is a **UI preview**, not yet a self-sufficient game loop. Keep developer tools enabled for timed testing until a real-time or turn-based clock is designed and implemented.

**Approved future behavior:** the [spatial-inventory and repeatable staging design](design/systems/spatial-inventory-and-staging.md) explicitly requires the **farm to keep progressing while a staging phase is open**, with visible Growth, Transformations, hazards, fungal activity and Mycelial updates. That continuous-time requirement is *future design*, not a description of Prototype 12's current manually advanced runtime.

For code coverage and provisional numerical assumptions, use the [implementation ledger](implementation-status.md). For normative gameplay specifications, use the [design index](design/README.md). The [original full design source](herbs-and-fungi-design.md) and historical documents are preserved unchanged.
