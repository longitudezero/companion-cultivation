import React, { useLayoutEffect, useRef, useState } from 'react';
import { inventoryDetails } from './item-details.js';

export default function InventoryTooltip({ item, anchor, ledger, id }) {
  const card = useRef(null);
  const [position, setPosition] = useState({ left: -1000, top: 8 });
  const details = inventoryDetails(item, ledger);
  useLayoutEffect(() => {
    const rect = card.current.getBoundingClientRect();
    let left = anchor.left - rect.width - 12;
    if (left < 8) left = anchor.right + 12;
    setPosition({ left: Math.max(8, Math.min(left, window.innerWidth - rect.width - 8)),
      top: Math.max(8, Math.min(anchor.top, window.innerHeight - rect.height - 8)) });
  }, [item.id, anchor.left, anchor.top, details.rows.join('|')]);
  return <aside ref={card} id={id} className="inventory-tooltip" role="tooltip" style={position}>
    <header><h3>{details.name}</h3><p>{details.type}</p></header>
    <div className="inventory-tooltip-body"><p>{details.description}</p>
      {!!details.rows.length && <ul>{details.rows.map((row, i) => <li key={i}>{row}</li>)}</ul>}</div>
  </aside>;
}
