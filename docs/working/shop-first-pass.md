# Guild Shop — first playable pass

**Implemented · 31 October 2026.** These prices and this small catalogue were accepted for testing; they are not final economy balance.

| Trade | Price | Availability |
|---|---:|---|
| Take Beanstalk Seeds | Free | Always; no Gold requirement |
| Buy Spores | 2 Gold each | Prismorel initially; Dewmender after claiming the first task; Rilllace and Droughtcap after claiming the care task |
| Sell named Plant Leaves | 1 Gold each | Any currently held species; only the chosen quantity is consumed |

- Stock is unlimited. An unlocked Spore stays purchasable after its inventory quantity reaches zero. The reference Grimoire does not unlock store stock.
- The third header icon beside Grimoire and Taskboard opens the shop overlay. Buy and Sell have selectable products, current holdings, quantity controls, unit prices, a total and the resulting balance. A receipt confirms each successful trade.
- Only named Leaves can be sold. Seeds, Spores, trophies, Source items and unattributed legacy Leaf stock are excluded. No new fate for unattributed legacy Leaves is defined by this pass.
- Selling does not complete a delivery. Its current-stock objective updates immediately and becomes unavailable if too few Leaves remain.
- Purchases and sales use one shared `shop.gold` wallet with task rewards. Legacy `tasks.gold` is migrated once, removed from task state, and never added to an already existing wallet. Old sandbox gardens can trade without activating tutorial tasks or replacing their world.
- Old sandboxes retain shop access to their existing Spore stocks and planted/staged/pending Fungi. Trading remembers those species even after the last organism or stack disappears. Tutorial shop access follows starter/task unlocks.
- Quantities and currency use safe nonnegative integers. A failed quote or trade cannot alter inventory, slot arrangement, Gold or task progress. A full inventory permits additions to an existing stack but refuses a new type before spending Gold, including free Seed collection if it needs a new slot.
- The garden keeps running at the selected speed while the shop is open. Shared speed controls remain available. Escape closes the overlay, focus stays within it, and opening it clears an active garden drag/held item.
- Browser autosave, `.ccsave` files and plot resizing preserve the wallet and remembered Spore access. Existing garden/task schemas remain readable.

Garden/inventory expansions, Blockers, Source-item purchases, other Seed products, differentiated Leaf values and restock timers are deferred.

## Recovery balance still to resolve

Free Beanstalk Seeds alone do not yet guarantee recovery from zero Gold and no living/available Fungi. In untouched Dry/Dark soil, current Beanstalk growth is too slow to reach Leaf production before its Dry exposure limit. The agreed free-Seed product is implemented, but a fully reliable emergency recovery route needs a separate gameplay/balance decision; this shop pass does not change species biology or give additional free Spores.
