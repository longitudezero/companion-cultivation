import React, { useId, useState } from 'react';
import { art } from '../grimoire/art.js';
import HoverDetails from './HoverDetails.jsx';

export default function TransformationPanel({ clue }) {
  const [page, setPage] = useState(0), [anchor, setAnchor] = useState(null), tooltip = useId();
  const current = Math.min(page, Math.max(0, clue.learned.length - 1)), route = clue.learned[current];
  function show(element) { const r = element.getBoundingClientRect(); setAnchor({ left: r.left, top: r.top, bottom: r.bottom }); }
  return <div className="inspector-transformation inspector-section" aria-label="Ongoing Transformation">
    <h3>Transformation</h3>
    <div className="transformation-heading"><img src={art('icons/transformation-sprout')} alt="" draggable="false"/>
      {route ? <div><span>Becoming</span><strong>{route.into}</strong></div> : <p>Unusual botanical activity…</p>}</div>
    {route && <div className="learned-transformation" tabIndex={0} aria-describedby={anchor ? tooltip : undefined}
      onPointerEnter={event => show(event.currentTarget)} onPointerLeave={() => setAnchor(null)}
      onFocus={event => show(event.currentTarget)} onBlur={() => setAnchor(null)}>
      <div className="known-transformation-progress" role="progressbar" aria-label={`${route.into} Transformation`}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={route.progress}><i style={{ width: `${route.progress}%` }}/></div>
      <ul className="transformation-requirements">{route.requirements.map((line, index) => <li key={index}>{line}</li>)}</ul>
    </div>}
    {clue.learned.length > 1 && <nav className="effect-pages" aria-label="Known Transformation routes">
      <button aria-label="Previous Transformation" disabled={current === 0} onClick={() => { setAnchor(null); setPage(current - 1); }}>‹</button>
      <span>{current + 1} / {clue.learned.length}</span>
      <button aria-label="Next Transformation" disabled={current === clue.learned.length - 1} onClick={() => { setAnchor(null); setPage(current + 1); }}>›</button>
    </nav>}
    {anchor && route && <HoverDetails id={tooltip} title={`${route.into} requirements`} lines={[route.details]} anchor={anchor}/>}
  </div>;
}
