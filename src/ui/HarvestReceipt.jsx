import React from 'react';
import { illustrationFor } from '../grimoire/illustrations.js';

export default function HarvestReceipt({ receipt }) {
  return <aside key={receipt.id} className="harvest-receipt" role="status" aria-live="polite" aria-atomic="true">
    <strong className="harvest-receipt-title">Harvested!</strong>
    {receipt.items.length ? receipt.items.map(item => <div className={`harvest-receipt-item receipt-${item.type}`} key={item.id}>
      {item.species ? <img src={illustrationFor(item.species)?.src} alt=""/> : <span aria-hidden="true">◆</span>}
      <span><b>+{item.quantity}</b> {item.name}</span>
    </div>) : <p>No items were ready to gather.</p>}
  </aside>;
}
