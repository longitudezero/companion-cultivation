# Spatial inventory, repeatable staging, and delayed germination

> **Approved player-interaction design, 27 October 2026; implementation pending.** This document records decisions made after the first-pass six-family roster and Prototype 12's developer-tool separation. It governs the *intended player interface and planting flow*, not the current code's status. The existing approved [Seeds/Spores and harvesting rules](seeds-spores-and-harvesting.md), [simulation event order](simulation-and-time.md), [Plant-specific Leaf identities](../decisions/species-specific-leaves.md), and family profiles retain their quantitative authority. See the [implementation ledger](../../implementation-status.md) to determine what actually runs today.

## 1. Inventory identity, capacity, and arrangement — approved

| Subject | Decision |
| --- | --- |
| Inventory capacity | **200 squares total**, not 200 items |
| Pages | **Four openable/collapsible pages of 50 squares each** |
| Arrangement | The player may manually put an item stack into any available square on any page, and move it again; positions persist |
| Stacking | **One stack per distinct item identity**, with **no quantity limit** per stack and no need for split duplicate stacks |
| Item counts | Each square holds one item *type/identity* and its owned integer count; position is not quantity |
| Harvest arrivals | Merge into the existing matching stack without moving it; newly encountered item types occupy available empty squares and may be rearranged afterward |

The current registered items include **species-specific Plant Leaves**, Plant Seeds of their approved **Seed species**, Fungus-specific Spores and special earned items/trophies. Distinct species and distinct item classes are never interchangeable: Potato Seeds are not Potato Leaves; Ghost Rice Leaves are not Moonrice Seeds, even though Ghost Rice can produce Moonrice Seeds. Mirage Rose may yield two different Seed species in one harvest; each retains its own stack. Leaf-sterile Bamboozled produces Bamboo Steel instead of inventing a Leaf stack. Historical numeric `legacyLeaves` remain a separate *unattributed* balance, not an ordinary species stack or a generic currency.

There should be a **single authoritative item quantity** for each identity, with a separate saved arrangement mapping identity to page/square. Moving a tile changes layout only, never ownership. The initial slot organization and visual layout remain presentation choices, not new yield/currency rules.

The 200-square cap is a real item-type capacity, but its effect on *future* item catalogs and detailed overflow feedback has not been balanced. **No harvest may delete an organism and silently lose some or all of its products** because the inventory is full; validate room for the entire output (after merging existing stacks) before any destructive transaction or provide a separately approved safe overflow solution.

## 2. Drag-to-plant and quantity choice — approved interaction

1. The ordinary way to plant is to drag a **Seed or Spore stack from the inventory onto a suitable garden hex**. This is an inventory-backed action, unlike unrestricted developer spawning.
2. Releasing on the hex opens a **small quantity selector**. It includes an editable positive-integer number box with **minus on the left, plus on the right**, and **three or four sensible preset quantity buttons underneath**.
3. The player's reference sketch showed **3, 5, 9, 15** as possible presets. These are *examples*, not a mandatory fixed list across all species or balances. The exact defaults and per-species suggestions may be refined without changing the approved selector structure.
4. The selector must not offer a quantity larger than the player's **uncommitted available** Seed/Spore stock; a valid quantity is at least one. The number can be adjusted before the placement is applied.
5. The player sees a **proposed planting marker** on the target hex. The Seeds or Spores have **not yet been consumed**, and the marker is not a living Plant or Fungus.
6. The existing species-specific germination chances, fungal modifiers, habitat requirements and multiple-item attempt calculation remain the basis for actual planting; the drag interface must not bypass those rules.

Dragging items between inventory squares reorganizes the inventory, not the garden. Leaves, trophies and other nonplantable items cannot be sown just because they can be dragged. Placement controls should also have non-drag alternatives for touch, keyboard and accessible interaction; exact gestures remain implementation design.

## 3. Unlimited repeatable staging phases — approved

**Planning/staging can be opened again immediately after an Apply. There is no cooldown or number-of-phases limit.** During an open staging phase the player can:

- Propose new Seed/Spore placements on currently available hexes.
- Move **uncommitted Seed/Spore markers** between hexes, change their quantities, or return them to inventory.
- Freely rearrange inventory stacks without affecting their amounts.
- See each stack's total owned, already staged/reserved, and still available quantity.
- Observe existing living organisms and their ongoing progress while planning (see §5).

Each staged quantity **reserves** that many items against further proposed placements, but does not spend them. For example, with **16 Potato Seeds**, staging **5** on hex A and **9** on hex B reserves 14 and leaves **2 available**. Undoing or reducing either proposal releases that reservation. This prevents spending the same stock twice within a plan or across immediately repeated planning sessions.

Only **uncommitted markers** can be freely moved. Previously applied pending germinations, living Plants and living Fungi remain at their committed hexes. An already-occupied hex cannot accept another planting proposal, and an applied pending germination counts as occupied. A future relocation **item** may enable moving living organisms, but that is **not part of this system** and its costs/conditions are not yet designed.

## 4. Apply commits the current plan — approved

**Apply** is an explicit player action. It does not end farming or impose any waiting period before the next staging phase.

1. At the moment Apply is pressed, **revalidate all proposed hexes and quantities against the current garden**, because time and environment may have changed during staging.
2. Reject an invalid plan with actionable feedback **without spending resources or partly committing it**. Atomicity matters when some proposals have become unsuitable (for example, changing Mycelial habitat/support).
3. On a valid Apply, spend the reserved Seeds/Spores **exactly once**, resolve each existing germination probability against the conditions and Effects at that moment, and make every submitted placement a **committed pending-germination occupant**.
4. Keep the results concealed until the germination reveal in §6. Successfully committing the plan **locks the placements**; they cannot be taken back, moved to another hex, or refunded just because their result is not yet known.
5. The player may immediately begin a new staging phase for other available hexes. Multiple committed planting cohorts may have independent pending countdowns.

Ordinary failure still spends the committed items; a valid Apply is not a guarantee of germination. The placement/conversion operation must remain compatible with the approved [whole-garden event ordering](simulation-and-time.md), including exact-time resolution of source changes, Mycelial support, transformation and hazard events.

## 5. **The farm stays live while staging** — approved clarification

**Staging never pauses the existing farm's progression.** This is an explicit later design decision, not a convenience reserved for developer mode.

- While the player arranges inventory or uncommitted Seeds/Spores, **in-game time continues advancing**, and the game **visibly updates the already-growing Plants and Fungi**.
- Their Growth/Ripening/Sporulation, ongoing environmental Effects, Transformation exposure and completions, hazards, deaths, Fungal emissions and Mycelial spread/retreat continue using the existing simulation rules.
- Changes that occur during staging must appear on the board and in inspection. A transformed Plant does not wait for the player's next Apply; the transformation happens when its existing clock qualifies.
- **Staged markers do not grow, germinate, emit, transform, block environmental Influence as living organisms, or otherwise participate in cultivation before Apply.** They occupy a *proposed UI location* and reserve inventory, not a live simulation object.
- Time may alter whether a proposal remains valid. At Apply, use the **current** board/conditions; warn and allow correction of conflicts without partial expenditure.
- An already-applied pending-germination occupant follows its own countdown while a *new* staging phase is open; the player may see it reveal a result without pressing Apply again.

**Not yet specified:** the mapping from wall-clock seconds to simulated hours, whether and how the garden advances while the browser is closed/backgrounded, frame interpolation and pause/offline rules. These require a separate time-system design. The target behavior above **must not be mislabeled as currently implemented**: Prototype 12 still advances simulation time only through its developer-only `+1 hour` / `+1 day` controls. The future clock must ultimately function independently of whether the inventory or staging interface is open.

## 6. Delayed, concealed germination — approved

The result of a valid Apply **must not be immediately visible**. Germination takes **a few in-game hours** to reveal, creating uncertainty and anticipation. It is acceptable for the rules engine to decide success/failure immediately at Apply, provided no player-visible or environmental side channel leaks that result before the delay ends.

1. Every applied hex displays the **same type of pending-planted marker** whether the hidden roll succeeded or failed. The player may know what and how many they sowed, but not the outcome.
2. The pending attempt starts a **per-hex elapsed-time countdown**. The countdown continues while the player is staging again.
3. Until reveal, it is **not a live Plant/Fungus** for environmental emissions, cultivation, Growth, Mycelial behavior, output production or transformation purposes. In particular, a secretly successful Fungus must not expose success through a light, temperature or other emission overlay.
4. At reveal, a **success** activates the ordinary species organism at that committed hex, subject to the intended creation/start-of-Growth semantics; a **failure** leaves the hex empty again. Both outcomes consumed the earlier committed quantity, with no automatic refund.
5. Inspection, animations, counters and tooltips must not distinguish success from failure before reveal. The inventory count alone reflects spent quantity, not the result.

**Duration intentionally open:** there is no approved exact number of hours, nor a decision to give different species different delays. **Six in-game hours was suggested only as a provisional test value**, not as signed-off balance. Do not silently adopt it as an approved rule. The revealed organism's precise age/progress at emergence and the interaction between overlapping same-timestamp Apply/reveal events need implementation tests within the established event ordering.

## 7. Drag-to-harvest — approved

The ordinary harvesting interaction is to **drag a living Plant or Fungus from its hex into the inventory**. This requests its existing **single destructive harvest**; it is *not* a free relocation action and must not bypass species-specific maturity restrictions (e.g. Bamboozled's Bamboo Steel requirement).

- Calculate products using the **actual organism, cultivation contacts, environmental history and current harvest snapshot**, including the existing [3:1 Allocation](seeds-spores-and-harvesting.md).
- Credit each result under its **actual item identity**: producing Plant's Leaves, eligible Seed species (potentially different from the Plant or two species at once), own-Fungus Spores and trophies.
- Merge identical stacks without changing their squares; place any *new* identities in free inventory squares. The player may reorganize afterward.
- Validate that the **entire** result can be safely accepted. Dropping a harvest onto a full inventory must not consume the organism while losing products.
- A cancelled/invalid drag leaves both inventory and garden unchanged. Provide a non-drag harvest alternative for accessibility.
- Harvesting may happen while a new staging plan is open; any freed hex is available for new uncommitted placement, while committed pending hexes are not harvestable as grown organisms.

## 8. Developer tools and implementation boundaries

The [Prototype 12 developer-toggle guide](../../developer-tools.md) remains accurate for the **current implementation**. Unrestricted debug spawning/Source/Blocker placement, baseline editing, fast-forwarding, and save tools must remain available behind the toggle for testing. They must not accidentally become player inventory items. Player-placeable **Blockers** will be designed later, independently of the Hex/Edge blocker test brush. Future relocation items are likewise out of scope.

**Do not confuse proposed state with the current schema.** As of this design approval, the running game has **schema 3 numeric inventory maps**, an ordinary Seed/Spore sowing toolbar with immediate germination resolution/visibility, manual developer time stepping, a list-form inventory, and inspector-button harvesting. It does **not** yet have saved inventory slot positions, staging reservations, Apply, hidden pending germinations, continuous real-time progression, or drag-to-harvest. Those are new implementation tasks; update the [implementation ledger](../../implementation-status.md) when each is genuinely coded and tested.

## 9. Verification expectations for implementation

- Exactly **4 × 50 = 200** available slots; no quantity cap per stack; placement/rearrangement/page state survives save/load and grid resize without changing earned resources.
- No duplicate or lost item counts when merging, dragging, cancelling, importing a save, or harvesting mixed-species Seed yields.
- Proposed quantities never exceed **owned minus already reserved**, even across multiple proposed hexes; unstage releases the reservation.
- Apply rejects invalid plans **atomically**, charges valid plans exactly once, and prevents movement/refund of applied pending placements.
- Germination successes/failures are indistinguishable until their reveal, including effects/overlays and inspection; revealed successes start as live organisms and failures free the hex.
- Staging may be repeated immediately, with multiple independent germination countdowns, without resetting the existing farm.
- Real time continues **during staging**: growth, transformations, hazards, deaths, Mycelial changes and reveals occur at their correct in-game times; apply-time validation uses current conditions.
- Harvesting respects all existing lifecycle, item identity, Allocation and special-case rules; inability to store every output never results in partial loss.
- Developer tools remain functional and visually separate; touch/keyboard fallbacks and mobile layouts remain usable.

## 10. Future design decisions, not accidentally approved here

1. Precise germination concealment duration (including whether species differ); the **6h** example is not approved.
2. Wall-clock-to-game-clock speed, background/offline progression, and how the live clock synchronizes with Apply and UI interactions.
3. Exact fixed or context-sensitive quantity preset values, the initial quantity in the number box, and final visual treatment of the supplied reference sketch.
4. Initial Spore acquisition and other player progression/economy beyond the current **prototype** starter Seed quantities.
5. Inventory-full feedback/overflow UX; safety against resource loss is required, but an overflow item system has not been approved.
6. Player Blocker items, living-organism relocation items, their costs/restrictions, and any special post-commit movement.

The distinction between these remaining decisions and the approved **200-slot inventory / repeatable live staging / Apply / delayed hidden germination / drag harvesting** is intentional. Do not alter the preserved earlier design source to disguise the chronology.
