import React, { useEffect, useId, useRef, useState } from 'react';
import { INVENTORY_PAGES, INVENTORY_PAGE_SLOTS, formatRealDuration } from './core/index.js';
import { illustrationFor } from './grimoire/illustrations.js';
import { itemCategory } from './ui/garden-model.js';
import InventoryTooltip from './ui/InventoryTooltip.jsx';
import SlotVines from './ui/GoldVines.jsx';

const ICON = { seed: '◌', spore: '◈', leaf: '❧', trophy: '◆', legacy: '□', 'source-item': '✧' };
const FILTERS = { all: 'All', seed: 'Seeds', spore: 'Spores', leaf: 'Leaves', item: 'Items' };

export default function InventoryGrid({ items, activePage, onPageChange, heldId, onItemPointerDown,
  onChooseItem, onChooseSlot, onPageHover, reservedForHeld = 0, ledger, dragging = false }) {
  const [filter, setFilter] = useState('all');
  const [hover, setHover] = useState(null);
  const visible = useRef(null), hoverTimer = useRef(null), tooltipId = useId();
  function hide() { window.clearTimeout(hoverTimer.current); visible.current = null; setHover(null); }
  function enter(item, element) {
    window.clearTimeout(hoverTimer.current);
    if (!item || dragging) { hide(); return; }
    const r = element.getBoundingClientRect();
    const next = { item, anchor: { left: r.left, right: r.right, top: r.top } };
    const show = () => { visible.current = next; setHover(next); };
    if (visible.current) show(); else hoverTimer.current = window.setTimeout(show, 50);
  }
  useEffect(() => { if (dragging) hide(); }, [dragging]);
  useEffect(() => { window.addEventListener('resize', hide); return () => { window.clearTimeout(hoverTimer.current); window.removeEventListener('resize', hide); }; }, []);
  const occupied = new Map(items.map((item) => [item.slot, item]));
  const held = items.find(item => item.id === heldId);
  const slots = filter === 'all' ? activePage == null ? [] : Array.from({ length: INVENTORY_PAGE_SLOTS }, (_, cell) => activePage * INVENTORY_PAGE_SLOTS + cell)
    : items.filter(item => itemCategory(item) === filter).map(item => item.slot);
  return <section className="spatial-inventory" data-inventory-dropzone="true" aria-label="Inventory: 200 squares">
    <SlotVines/>
    <div className="inventory-heading"><div><div className="mini-heading">YOUR COLLECTION</div><h3>Inventory</h3></div><span>{items.length} / 200 slots</span></div>
    <div className="inventory-filters" role="group" aria-label="Filter inventory">{Object.entries(FILTERS).map(([key, label]) => <button key={key} data-inventory-type={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
    {filter === 'all' && <div className="inventory-pages" aria-label="Inventory pages">{Array.from({ length: INVENTORY_PAGES }, (_, page) =>
      <button key={page} className={activePage === page ? 'is-open' : ''}
        aria-expanded={activePage === page} onPointerEnter={() => onPageHover(page)}
        onClick={() => onPageChange(activePage === page ? null : page)}>Page {page + 1} <span>{activePage === page ? '−' : '+'}</span></button>)}</div>}
    {!!slots.length && <div className="inventory-square-grid" role="group" aria-label={filter === 'all' ? `Inventory page ${activePage + 1}, 50 squares` : `${FILTERS[filter]} in inventory`}>
      {slots.map(slot => {
        const item = occupied.get(slot);
        const picture = item?.species ? illustrationFor(item.species) : null;
        return <button key={slot} type="button" data-inventory-slot={slot}
          className={`inventory-square ${item ? `has-item item-${item.type}` : ''} ${item && heldId === item.id ? 'is-held' : ''}`}
          title={!item ? `Empty square ${slot + 1}` : undefined} aria-describedby={hover && item && hover.item.id === item.id ? tooltipId : undefined}
          aria-label={item ? item.type === 'source-item' ? `${item.name}, ${formatRealDuration(item.remainingHours)} paused, square ${slot + 1}` : `${item.name}, ${item.quantity} owned, square ${slot + 1}` : `Empty square ${slot + 1}`}
          onPointerDown={(event) => item && onItemPointerDown(item, event)}
          onPointerEnter={event => enter(item, event.currentTarget)}
          onPointerLeave={event => { if (!event.relatedTarget?.closest?.('[data-inventory-slot]')) hide(); }}
          onFocus={event => enter(item, event.currentTarget)} onBlur={hide}
          onClick={(event) => {
            if (event.detail === 0 && item) onChooseItem(item);
            else if (!item) onChooseSlot(slot);
          }}>
          {item && <>
            {picture ? <img className="inventory-item-art" src={picture.src} alt="" loading="lazy" draggable="false"/> : <span className="inventory-item-glyph">{ICON[item.type]}</span>}
            <span className="inventory-item-name">{item.species || item.name}</span><span className="inventory-item-quantity">{item.type === 'source-item' ? formatRealDuration(item.remainingHours) : item.quantity}</span></>}
        </button>;
      })}
    </div>}
    {filter !== 'all' && !slots.length && <p className="inventory-empty">No {FILTERS[filter].toLowerCase()} collected yet.</p>}
    {hover && !dragging && <InventoryTooltip id={tooltipId} {...hover} ledger={ledger}/>}
    {held && <p className="inventory-held-hint"><strong>{held.name}</strong> · {held.type === 'source-item' ? `${formatRealDuration(held.remainingHours)} paused. Tap an empty hex to place it` : `owned ${held.quantity}${['seed', 'spore'].includes(held.type) ? ` · staged ${reservedForHeld} · available ${Math.max(0, held.quantity - reservedForHeld)}` : ''}. Tap a hex to stage Seeds/Spores`}, or another square to rearrange.</p>}
  </section>;
}
