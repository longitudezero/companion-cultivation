import React, { useEffect, useRef, useState } from 'react';
import { goldBalance } from '../core/wallet.js';
import { shopProducts, shopQuote } from '../core/shop.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import SimulationControls from './SimulationControls.jsx';

export function ShopIcon() {
  return <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M10 20h28v23H10z" fill="#25432e" stroke="#d0ad66" strokeWidth="1.6"/>
    <path d="m7 11 5-6h24l5 6v10c-2 5-6 5-9 0-2 5-6 5-8 0-2 5-6 5-8 0-3 5-7 5-9 0z" fill="#b99b58" stroke="#f0d492" strokeWidth="1.3"/>
    <path d="m16 6-2 15m10-15v15m8-15 2 15" stroke="#486441" strokeWidth="4"/>
    <path d="M17 29h14v14H17z" fill="#d8bf84" stroke="#a58a4e"/><path d="M24 30v12" stroke="#6d7448"/>
  </svg>;
}

export default function Shop({ garden, speed, onSpeedChange, onClose, onTrade }) {
  const [mode, setMode] = useState('buy'), [selected, setSelected] = useState('seed:Beanstalk');
  const [quantity, setQuantity] = useState('10'), [receipt, setReceipt] = useState(null), [error, setError] = useState('');
  const modal = useRef(null), close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; modal.current.querySelector('[aria-label="Close Shop"]').focus();
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); }
      if (event.key !== 'Tab') return;
      const fields = [...modal.current.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')]
        .filter(element => element.getBoundingClientRect().width > 0);
      const index = fields.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); fields.at(-1)?.focus(); }
      else if (!event.shiftKey && (index === fields.length - 1 || index < 0)) { event.preventDefault(); fields[0]?.focus(); }
    };
    document.addEventListener('keydown', keys);
    return () => { document.removeEventListener('keydown', keys); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  const products = shopProducts(garden, mode), product = products.find(item => item.id === selected) || products[0];
  let quote = null, quoteError = '';
  if (product) {
    try { quote = shopQuote(garden, mode, product.id, Number(quantity)); }
    catch (issue) { quoteError = issue.message; }
  }
  const max = product ? mode === 'sell' ? product.owned : product.price
    ? Math.min(Math.floor(goldBalance(garden) / product.price), Number.MAX_SAFE_INTEGER - product.owned)
    : Number.MAX_SAFE_INTEGER - product.owned : 0;
  function selectMode(next) { setMode(next); setSelected(null); setQuantity(next === 'buy' ? '10' : '1'); setError(''); setReceipt(null); }
  function selectProduct(item) { setSelected(item.id); setQuantity(mode === 'buy' ? item.type === 'seed' ? '10' : '4' : '1'); setError(''); setReceipt(null); }
  function amount(value) { setQuantity(String(value)); setError(''); setReceipt(null); }
  function trade() {
    try {
      const result = onTrade(mode, product.id, Number(quantity)); setReceipt(result); setError('');
      if (mode === 'sell' && result.owned === result.quantity) setQuantity('1');
    } catch (issue) { setError(issue.message); setReceipt(null); }
  }
  return <div className="taskboard-backdrop"><section className="taskboard-modal shop-modal" role="dialog" aria-modal="true" aria-label="Guild Shop" ref={modal}>
    <header className="taskboard-header"><div><span className="eyebrow">ADVENTURERS’ GUILD</span><h2>Shop</h2></div>
      <span className="task-wallet">◉ {goldBalance(garden)} Gold</span><SimulationControls speed={speed} onChange={onSpeedChange}/>
      <button className="taskboard-close" aria-label="Close Shop" onClick={onClose}>×</button></header>
    <div className="shop-body"><section className="shop-stock" aria-label={mode === 'buy' ? 'Shop stock' : 'Leaves to sell'}>
      <div className="shop-tabs task-tabs" role="tablist" aria-label="Shop sections">
        <button role="tab" aria-selected={mode === 'buy'} onClick={() => selectMode('buy')}>Buy</button>
        <button role="tab" aria-selected={mode === 'sell'} onClick={() => selectMode('sell')}>Sell</button></div>
      <p className="shop-stock-note">{mode === 'buy' ? 'Beanstalk Seeds are always free. More Spores arrive with your guild rewards.' : 'The guild buys Leaves from every Plant. Each Leaf is worth 1 Gold.'}</p>
      <div className="shop-catalogue">{products.map(item => <button key={item.id} className={`shop-product ${product?.id === item.id ? 'selected' : ''}`}
        aria-pressed={product?.id === item.id} aria-label={`${item.name}, ${item.price ? `${item.price} Gold each` : 'Free'}, ${item.owned} owned`} onClick={() => selectProduct(item)}>
        <img src={illustrationFor(item.species)?.src} alt="" draggable="false"/><strong>{item.name}</strong>
        <span className="shop-unit-price">{item.price ? `◉ ${item.price} Gold each` : 'Free'}</span><small>{item.owned} owned</small>
      </button>)}</div>
      {!products.length && <div className="shop-empty"><span aria-hidden="true">❧</span><p>No Leaves to sell yet.</p><p>Harvest a Plant while its Inspector shows Leaves available, then bring them here.</p></div>}
    </section>
    <section className="shop-trade" aria-label="Trade details">
      {product ? <><span className="shop-trade-kicker">{mode === 'buy' ? 'GUILD SUPPLIES' : 'SELL YOUR HARVEST'}</span>
        <img className="shop-trade-art" src={illustrationFor(product.species)?.src} alt=""/>
        <h3>{product.name}</h3><p className="shop-owned">{product.owned} currently held</p>
        <p className="shop-product-note">{mode === 'sell' ? 'Keep any Leaves you need for guild requests. Only the amount below will be sold.'
          : product.type === 'seed' ? 'Always free. Take what you need to start growing again.' : 'Unlocked Spores stay in stock, even when your own supply runs out.'}</p>
        <label className="shop-quantity-label" htmlFor="shop-quantity">Quantity</label>
        <div className="shop-quantity"><button aria-label="Decrease shop quantity" disabled={Number(quantity) <= 1} onClick={() => amount(Math.max(1, Number(quantity) - 1))}>−</button>
          <input id="shop-quantity" aria-label="Shop quantity" type="number" min="1" max={Math.max(1, max)} step="1" value={quantity} onChange={event => amount(event.target.value)}/>
          <button aria-label="Increase shop quantity" disabled={Number(quantity) >= max} onClick={() => amount(Math.min(max, Math.max(1, Number(quantity) + 1)))}>+</button></div>
        <div className="shop-quick-amounts">{(mode === 'buy' ? [1, 4, 10] : [1, 5]).map(value => <button key={value} disabled={value > max} onClick={() => amount(value)}>{value}</button>)}
          {(mode === 'sell' || product.price > 0) && <button disabled={!max} onClick={() => amount(max)}>{mode === 'sell' ? 'All' : 'Max'}</button>}</div>
        <div className="shop-transaction"><div><span>{mode === 'buy' ? 'Total cost' : 'You receive'}</span><strong>{quote ? `${quote.total} Gold` : '—'}</strong></div>
          <div><span>Gold after trade</span><strong>{quote?.balanceAfter ?? '—'}</strong></div></div>
        <p className="shop-quote-error" role={error ? 'alert' : undefined}>{error || (!receipt && quoteError)}</p>
        <button className="shop-trade-button" disabled={!quote} onClick={trade}>{mode === 'sell' ? 'Sell Leaves' : product.price ? 'Buy Spores' : 'Take Seeds'}</button>
      </> : <div className="shop-empty-detail"><h3>A place for your harvest</h3><p>Choose Leaves to see the quantity and total before selling.</p></div>}
      {receipt && <div className="shop-receipt" role="status" aria-live="polite"><strong>{receipt.mode === 'sell' ? 'Sold' : receipt.price ? 'Bought' : 'Received'} {receipt.quantity} {receipt.name}</strong>
        <span>{receipt.mode === 'sell' ? `+${receipt.total} Gold` : receipt.total ? `−${receipt.total} Gold` : 'Free'} · Balance: {receipt.balanceAfter} Gold</span></div>}
    </section></div>
  </section></div>;
}
