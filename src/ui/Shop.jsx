import React, { useEffect, useRef, useState } from 'react';
import { goldBalance } from '../core/wallet.js';
import { shopProducts, shopQuote } from '../core/shop.js';
import { illustrationFor } from '../grimoire/illustrations.js';
import { stationeryArt } from '../grimoire/stationery-art.js';
import GuildBackButton from './GuildBackButton.jsx';
import FloatingDust from './FloatingDust.jsx';
import GameArt from './GameArt.jsx';
import IllustratedButton from './IllustratedButton.jsx';

export function ShopIcon() { return <GameArt name="shop"/>; }

const productArt = product => product.permanent ? stationeryArt(product.file) : illustrationFor(product.species)?.src;
const shopArt = file => `${import.meta.env?.BASE_URL || '/'}ui/shop/${file}`;

function ShopParchmentCorners() {
  return <div className="shop-parchment-corners" aria-hidden="true">
    {['tl', 'tr', 'bl', 'br'].map(corner => <GameArt key={corner} name="shopCornerBotanical"
      className={`shop-parchment-corner shop-parchment-corner-${corner}`}/>)}
  </div>;
}
export default function Shop({ garden, onClose, onTrade, initialCategory = 'supplies', onOpenGrimoire }) {
  const [mode, setMode] = useState('buy'), [selected, setSelected] = useState('seed:Beanstalk');
  const [category, setCategory] = useState(initialCategory);
  const [quantity, setQuantity] = useState('10'), [receipt, setReceipt] = useState(null), [error, setError] = useState('');
  const modal = useRef(null), close = useRef(onClose); close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; modal.current.querySelector('[aria-label="Back to garden"]').focus();
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
  const products = shopProducts(garden, mode).filter(item => mode === 'sell' || (category === 'papers'
    ? item.type === 'paper' : category === 'bookmarks' ? item.type === 'bookmark' : !item.permanent));
  const product = products.find(item => item.id === selected) || products[0];
  let quote = null, quoteError = '';
  if (product) {
    try { quote = shopQuote(garden, mode, product.id, product.permanent ? 1 : Number(quantity)); }
    catch (issue) { quoteError = issue.message; }
  }
  const max = product ? mode === 'sell' ? product.owned : product.price
    ? Math.min(Math.floor(goldBalance(garden) / product.price), Number.MAX_SAFE_INTEGER - product.owned)
    : Number.MAX_SAFE_INTEGER - product.owned : 0;
  function selectMode(next) { setMode(next); setSelected(null); setQuantity(next === 'buy' ? '10' : '1'); setError(''); setReceipt(null); }
  function selectProduct(item) { setSelected(item.id); setQuantity(item.permanent ? '1' : mode === 'buy' ? item.type === 'seed' ? '10' : '4' : '1'); setError(''); setReceipt(null); }
  function selectCategory(next) { setCategory(next); setSelected(null); setError(''); setReceipt(null); }
  function amount(value) { setQuantity(String(value)); setError(''); setReceipt(null); }
  function trade() {
    try {
      const result = onTrade(mode, product.id, product.permanent ? 1 : Number(quantity)); setReceipt(result); setError('');
      if (mode === 'sell' && result.owned === result.quantity) setQuantity('1');
    } catch (issue) { setError(issue.message); setReceipt(null); }
  }
  return <div className="taskboard-backdrop"><section className="taskboard-modal shop-modal" role="dialog" aria-modal="true" aria-label="Guild Shop" ref={modal}>
    <div className="shop-frame-vines" aria-hidden="true">
      <div className="shop-banner-pole"><img src={shopArt('banner-pole.png')} alt="" draggable="false"/></div>
      <img className="shop-frame-vine-top" src={shopArt('ivy-top.webp')} alt="" draggable="false"/>
      <img className="shop-frame-vine-bottom" src={shopArt('ivy-bottom.webp')} alt="" draggable="false"/>
    </div>
    <div className="shop-illustration" aria-hidden="true">
      <img src={shopArt('interior.webp')} alt="" draggable="false"/>
      <FloatingDust/>
    </div>
    <header className="shop-header"><h2>The Garden Shop</h2>
      <span className="task-wallet"><GameArt name="gold"/>{goldBalance(garden)} Gold</span><GuildBackButton onClick={onClose}/></header>
    <div className="shop-body"><section className="shop-stock" aria-label={mode === 'buy' ? 'Shop stock' : 'Leaves to sell'}>
      <div className="shop-tabs task-tabs" role="tablist" aria-label="Shop sections">
        <button role="tab" aria-selected={mode === 'buy'} onClick={() => selectMode('buy')}>Buy</button>
        <button role="tab" aria-selected={mode === 'sell'} onClick={() => selectMode('sell')}>Sell</button></div>
      {mode === 'buy' && <div className="shop-categories" role="tablist" aria-label="Buy categories">
        {[['supplies', 'Garden supplies'], ['papers', 'Note papers'], ['bookmarks', 'Page markers']].map(([id, label]) =>
          <button key={id} role="tab" aria-selected={category === id} onClick={() => selectCategory(id)}>{label}</button>)}
      </div>}
      <p className="shop-stock-note">{mode === 'sell' ? 'The guild buys Leaves from every Plant. Each Leaf is worth 1 Gold.'
        : category === 'supplies' ? 'Beanstalk Seeds are always free. More Spores arrive with your guild rewards.'
          : 'Buy a style once, then reuse it in your Grimoire. Stationery has its own collection.'}</p>
      <div className="shop-catalogue">{products.map(item => <button key={item.id} className={`shop-product ${product?.id === item.id ? 'selected' : ''}`}
        aria-pressed={product?.id === item.id} aria-label={`${item.name}, ${item.price ? `${item.price} Gold${item.permanent ? '' : ' each'}` : 'Free'}, ${item.permanent ? item.owned ? 'Unlocked' : 'Permanent style' : `${item.owned} owned`}`} onClick={() => selectProduct(item)}>
        <span className="shop-product-type" aria-hidden="true">{item.permanent ? item.type === 'paper' ? 'Paper' : 'Marker'
          : <GameArt name={item.type === 'seed' ? 'seeds' : item.type === 'spore' ? 'spores' : 'leaves'}/>}</span>
        <img src={productArt(item)} alt="" draggable="false"/><strong>{item.name}</strong>
        <span className="shop-unit-price">{item.price ? <><GameArt name="gold"/>{item.price} Gold{item.permanent ? '' : ' each'}</> : 'Free'}</span><small>{item.permanent ? item.owned ? '✓ Unlocked' : 'Permanent style' : `${item.owned} owned`}</small>
      </button>)}</div>
      {!products.length && <div className="shop-empty"><span aria-hidden="true">❧</span><p>No Leaves to sell yet.</p><p>Harvest a Plant while its Inspector shows Leaves available, then bring them here.</p></div>}
    </section>
    <section className="shop-trade" aria-label="Trade details">
      <ShopParchmentCorners/>
      <div className="shop-trade-scroll">
      {product ? <><div className="shop-trade-overview">
        <img className={`shop-trade-art${product.permanent ? ' stationery' : ''}`} src={productArt(product)} alt=""/>
        <h3>{product.name}</h3><p className="shop-owned">{product.permanent ? product.owned ? 'In your stationery collection' : 'Permanent style · reusable' : `${product.owned} currently held`}</p>
        <p className="shop-product-note">{mode === 'sell' ? 'Keep any Leaves you need for guild requests. Only the amount below will be sold.'
          : product.permanent ? product.type === 'paper' ? 'Use this paper for as many field notes as you like. Write from the inkwell beside your Grimoire.'
            : 'Mark up to twelve pages: six markers above the book and six below. Name them, write on them, and move them freely.'
            : product.type === 'seed' ? 'Always free. Take what you need to start growing again.' : 'Unlocked Spores stay in stock, even when your own supply runs out.'}</p>
        </div>
        <div className="shop-trade-actions">
        {!product.permanent && <><label className="shop-quantity-label" htmlFor="shop-quantity">Quantity</label>
        <div className="shop-quantity"><IllustratedButton art="minus" label="Decrease shop quantity" disabled={Number(quantity) <= 1} onClick={() => amount(Math.max(1, Number(quantity) - 1))}/>
          <input id="shop-quantity" aria-label="Shop quantity" type="number" min="1" max={Math.max(1, max)} step="1" value={quantity} onChange={event => amount(event.target.value)}/>
          <IllustratedButton art="plus" label="Increase shop quantity" disabled={Number(quantity) >= max} onClick={() => amount(Math.min(max, Math.max(1, Number(quantity) + 1)))}/></div>
        <div className="shop-quick-amounts">{(mode === 'buy' ? [1, 4, 10] : [1, 5]).map(value => <button key={value} disabled={value > max} onClick={() => amount(value)}>{value}</button>)}
          {(mode === 'sell' || product.price > 0) && <button disabled={!max} onClick={() => amount(max)}>{mode === 'sell' ? 'All' : 'Max'}</button>}</div></>}
        <div className="shop-transaction"><div><span>{mode === 'buy' ? 'Total cost' : 'You receive'}</span><strong>{quote ? `${quote.total} Gold` : '—'}</strong></div>
          <div><span>Gold after trade</span><strong>{quote?.balanceAfter ?? '—'}</strong></div></div>
        <p className="shop-quote-error" role={error ? 'alert' : undefined}>{error || (!receipt && !(product.permanent && product.owned) && quoteError)}</p>
        <button className="shop-trade-button" disabled={!quote} onClick={trade}>{product.permanent ? product.owned ? 'Style unlocked' : `Unlock for ${product.price} Gold` : mode === 'sell' ? 'Sell Leaves' : product.price ? 'Buy Spores' : 'Take Seeds'}</button>
        {product.permanent && onOpenGrimoire && <button className="shop-grimoire-link" onClick={onOpenGrimoire}>Open Grimoire →</button>}
        </div>
      </> : <div className="shop-empty-detail"><h3>A place for your harvest</h3><p>Choose Leaves to see the quantity and total before selling.</p></div>}
      {receipt && <div className="shop-receipt" role="status" aria-live="polite"><strong>{receipt.permanent ? `Unlocked ${receipt.name}` : `${receipt.mode === 'sell' ? 'Sold' : receipt.price ? 'Bought' : 'Received'} ${receipt.quantity} ${receipt.name}`}</strong>
        <span>{receipt.mode === 'sell' ? `+${receipt.total} Gold` : receipt.total ? `−${receipt.total} Gold` : 'Free'} · Balance: {receipt.balanceAfter} Gold</span></div>}
      </div>
    </section></div>
  </section></div>;
}
