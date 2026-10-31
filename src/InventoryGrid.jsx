import React, { useState } from 'react';
import { INVENTORY_PAGES, INVENTORY_PAGE_SLOTS, formatRealDuration } from './core/index.js';
import { illustrationFor } from './grimoire/illustrations.js';
import { itemCategory } from './ui/garden-model.js';

const ICON = { seed: '◌', spore: '◈', leaf: '❧', trophy: '◆', legacy: '□', 'source-item': '✧' };
const TYPE = { seed: 'Seeds', spore: 'Spores', leaf: 'Leaves', trophy: 'Trophy', legacy: 'Legacy', 'source-item': 'Item' };
const FILTERS = { all: 'All', seed: 'Seeds', spore: 'Spores', leaf: 'Leaves', item: 'Items' };

export default function InventoryGrid({ items, activePage, onPageChange, heldId, onItemPointerDown,
  onChooseItem, onChooseSlot, onPageHover, reservedForHeld = 0, carriedOrganism, onReceiveOrganism, onCancelCarry }) {
  const [filter, setFilter] = useState('all');
  const occupied = new Map(items.map((item) => [item.slot, item]));
  const held = items.find(item => item.id === heldId);
  const slots = filter === 'all' ? activePage == null ? [] : Array.from({ length: INVENTORY_PAGE_SLOTS }, (_, cell) => activePage * INVENTORY_PAGE_SLOTS + cell)
    : items.filter(item => itemCategory(item) === filter).map(item => item.slot);
  return <section className="spatial-inventory" data-inventory-dropzone="true" aria-label="Inventory: 200 squares">
    <div className="inventory-heading"><div><div className="mini-heading">YOUR COLLECTION</div><h3>Inventory</h3></div><span>{items.length} / 200 slots</span></div>
    <div className="inventory-filters" role="group" aria-label="Filter inventory">{Object.entries(FILTERS).map(([key, label]) => <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    {carriedOrganism && <div className="inventory-receive"><button onClick={onReceiveOrganism}>Place {carriedOrganism} here to harvest</button><button onClick={onCancelCarry}>Cancel pickup</button></div>}
    <p className="inventory-instruction">{held ? 'Choose a hex or another inventory square. Escape releases selection.' : 'Seeds, Spores & field supplies'}</p>
    {filter === 'all' && <div className="inventory-pages" aria-label="Inventory pages">{Array.from({ length: INVENTORY_PAGES }, (_, page) =>
      <button key={page} className={activePage === page ? 'is-open' : ''}
        aria-expanded={activePage === page} onPointerEnter={() => onPageHover(page)}
        onClick={() => onPageChange(activePage === page ? null : page)}>Page {page + 1} <span>{activePage === page ? '−' : '+'}</span></button>)}</div>}
    {!!slots.length && <div className="inventory-square-grid" role="group" aria-label={filter === 'all' ? `Inventory page ${activePage + 1}, 50 squares` : `${FILTERS[filter]} in inventory`}>
      {slots.map(slot => {
        const item = occupied.get(slot);
        const picture = item?.species ? illustrationFor(item.species) : null;
        return <button key={slot} type="button" data-inventory-slot={slot}
          className={`inventory-square ${item ? `has-item item-${item.type}` : ''} ${heldId === item?.id ? 'is-held' : ''}`}
          title={item ? item.type === 'source-item' ? `${item.name}: ${formatRealDuration(item.remainingHours)} remaining, paused` : `${item.name}: ${item.quantity} owned` : `Empty square ${slot + 1}`}
          aria-label={item ? item.type === 'source-item' ? `${item.name}, ${formatRealDuration(item.remainingHours)} paused, square ${slot + 1}` : `${item.name}, ${item.quantity} owned, square ${slot + 1}` : `Empty square ${slot + 1}`}
          onPointerDown={(event) => item && onItemPointerDown(item, event)}
          onClick={(event) => {
            if (carriedOrganism) onReceiveOrganism();
            else if (event.detail === 0 && item) onChooseItem(item);
            else if (!item) onChooseSlot(slot);
          }}>
          {item && <><span className="inventory-type-badge">{ICON[item.type]} {TYPE[item.type]}</span>
            {picture ? <img className="inventory-item-art" src={picture.src} alt="" loading="lazy" draggable="false"/> : <span className="inventory-item-glyph">{ICON[item.type]}</span>}
            <span className="inventory-item-name">{item.species || item.name}</span><span className="inventory-item-quantity">{item.type === 'source-item' ? formatRealDuration(item.remainingHours) : item.quantity}</span></>}
        </button>;
      })}
    </div>}
    {filter !== 'all' && !slots.length && <p className="inventory-empty">No {FILTERS[filter].toLowerCase()} collected yet.</p>}
    {held && <p className="inventory-held-hint"><strong>{held.name}</strong> · {held.type === 'source-item' ? `${formatRealDuration(held.remainingHours)} paused. Tap an empty hex to place it` : `owned ${held.quantity}${['seed', 'spore'].includes(held.type) ? ` · staged ${reservedForHeld} · available ${Math.max(0, held.quantity - reservedForHeld)}` : ''}. Tap a hex to stage Seeds/Spores`}, or another square to rearrange.</p>}
  </section>;
}
