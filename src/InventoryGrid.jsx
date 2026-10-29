import React from 'react';
import { INVENTORY_PAGES, INVENTORY_PAGE_SLOTS, formatRealDuration } from './core/index.js';

const ICON = { seed: '◌', spore: '◈', leaf: '❧', trophy: '◆', legacy: '□', 'source-item': '✧' };

export default function InventoryGrid({ items, activePage, onPageChange, heldId, onItemPointerDown,
  onChooseItem, onChooseSlot, onPageHover, reservedForHeld = 0 }) {
  const occupied = new Map(items.map((item) => [item.slot, item]));
  const held = items.find(item => item.id === heldId);
  return <section className="spatial-inventory" data-inventory-dropzone="true" aria-label="Inventory: 200 squares">
    <div className="inventory-heading"><div><div className="mini-heading">YOUR COLLECTION</div><h3>Inventory</h3></div><span>{items.length}/200 slots</span></div>
    <p className="inventory-instruction">Drag Seeds or Spores to stage planting, or Source items to place them directly. Drag a living organism here to harvest or a Source item here to pause it. Tap an item, then a hex, as an alternative.</p>
    <div className="inventory-pages" aria-label="Inventory pages">{Array.from({ length: INVENTORY_PAGES }, (_, page) =>
      <button key={page} className={activePage === page ? 'is-open' : ''}
        aria-expanded={activePage === page} onPointerEnter={() => onPageHover(page)}
        onClick={() => onPageChange(activePage === page ? null : page)}>Page {page + 1} <span>{activePage === page ? '−' : '+'}</span></button>)}</div>
    {activePage != null && <div className="inventory-square-grid" role="group" aria-label={`Inventory page ${activePage + 1}, 50 squares`}>
      {Array.from({ length: INVENTORY_PAGE_SLOTS }, (_, cell) => {
        const slot = activePage * INVENTORY_PAGE_SLOTS + cell;
        const item = occupied.get(slot);
        return <button key={slot} type="button" data-inventory-slot={slot}
          className={`inventory-square ${item ? `has-item item-${item.type}` : ''} ${heldId === item?.id ? 'is-held' : ''}`}
          title={item ? item.type === 'source-item' ? `${item.name}: ${formatRealDuration(item.remainingHours)} remaining, paused` : `${item.name}: ${item.quantity} owned` : `Empty square ${slot + 1}`}
          aria-label={item ? item.type === 'source-item' ? `${item.name}, ${formatRealDuration(item.remainingHours)} paused, square ${slot + 1}` : `${item.name}, ${item.quantity} owned, square ${slot + 1}` : `Empty square ${slot + 1}`}
          onPointerDown={(event) => item && onItemPointerDown(item, event)}
          onClick={(event) => {
            if (event.detail === 0 && item) onChooseItem(item);
            else if (event.detail === 0 && !item) onChooseSlot(slot);
          }}>
          {item && <><span className="inventory-item-glyph">{ICON[item.type]}</span><span className="inventory-item-shortname">{(item.species || item.name).slice(0, 3)}</span><span className="inventory-item-quantity">{item.type === 'source-item' ? formatRealDuration(item.remainingHours) : item.quantity}</span></>}
        </button>;
      })}
    </div>}
    {held && <p className="inventory-held-hint"><strong>{held.name}</strong> · {held.type === 'source-item' ? `${formatRealDuration(held.remainingHours)} paused. Tap an empty hex to place it` : `owned ${held.quantity}${['seed', 'spore'].includes(held.type) ? ` · staged ${reservedForHeld} · available ${Math.max(0, held.quantity - reservedForHeld)}` : ''}. Tap a hex to stage Seeds/Spores`}, or another square to rearrange.</p>}
  </section>;
}
