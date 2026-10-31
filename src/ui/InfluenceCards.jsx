import React, { useEffect, useId, useRef, useState } from 'react';
import { influencePage } from './inspector-model.js';
import HoverDetails from './HoverDetails.jsx';

export default function InfluenceCards({ cards }) {
  const grid = useRef(null), [columns, setColumns] = useState(2), [page, setPage] = useState(0), [hover, setHover] = useState(null);
  const tooltip = useId(), visible = influencePage(cards, page, columns), detail = cards.find(card => card.id === hover?.id);
  useEffect(() => { if (page !== visible.current) setPage(visible.current); }, [page, visible.current]);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setColumns(Math.max(1, Math.min(3, Math.floor((entry.contentRect.width + 8) / 158))));
      setHover(null);
    });
    observer.observe(grid.current);
    const hide = () => setHover(null);
    window.addEventListener('resize', hide); window.addEventListener('scroll', hide, true);
    return () => { observer.disconnect(); window.removeEventListener('resize', hide); window.removeEventListener('scroll', hide, true); };
  }, []);
  function show(card, element) { const r = element.getBoundingClientRect(); setHover({ id: card.id, anchor: { left: r.left, top: r.top, bottom: r.bottom } }); }
  function turn(direction) { setHover(null); setPage(visible.current + direction); }
  return <div className="influence-cards">
    <div className="influence-card-grid" ref={grid} style={{ '--effect-columns': columns }}>
      {visible.cards.map(card => <div key={card.id} className="influence-card" tabIndex={0}
        aria-describedby={hover?.id === card.id ? tooltip : undefined}
        onPointerEnter={event => show(card, event.currentTarget)} onPointerLeave={() => setHover(null)}
        onFocus={event => show(card, event.currentTarget)} onBlur={() => setHover(null)}>
        <span className="influence-card-icon" aria-hidden="true">{card.icon}</span>
        <div><strong>{card.title}</strong><span className="influence-card-value">{card.summary}</span><small>{card.source}</small></div>
      </div>)}
    </div>
    {!cards.length && <p className="influence-empty">No active influences observed.</p>}
    {visible.count > 1 && <nav className="effect-pages" aria-label="Influence pages">
      <button aria-label="Previous influences" disabled={visible.current === 0} onClick={() => turn(-1)}>‹</button>
      <span>{visible.current + 1} / {visible.count}</span>
      <button aria-label="Next influences" disabled={visible.current === visible.count - 1} onClick={() => turn(1)}>›</button>
    </nav>}
    {hover && detail && <HoverDetails id={tooltip} title={detail.title} subtitle={detail.source} lines={detail.lines} anchor={hover.anchor}/>}
  </div>;
}
