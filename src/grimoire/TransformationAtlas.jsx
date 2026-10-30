import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { atlasLayout, entryKnown, entryName } from './book.js';

export default function TransformationAtlas({ chapter, ledger, preview, navigate }) {
  const viewport = useRef(null);
  const [width, setWidth] = useState(384);
  const [active, setActive] = useState(null);
  const [pan, setPan] = useState({ left: false, right: false });
  const marker = `atlas-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  useEffect(() => {
    if (!viewport.current || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(160, Math.floor(entry.contentRect.width))));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  const layout = useMemo(() => atlasLayout(chapter, width), [chapter, width]);
  const updatePan = () => {
    const element = viewport.current;
    if (element) setPan({ left: element.scrollLeft > 1,
      right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1 });
  };
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    element.scrollLeft = Math.max(0, (layout.width - element.clientWidth) / 2);
    updatePan();
  }, [chapter, width, layout.width]);
  const move = direction => viewport.current?.scrollBy({ left: direction * width * .8,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  return <div className="cg-atlas" onKeyDown={event => {
    if (event.key.startsWith('Arrow')) event.stopPropagation();
  }}>
    {layout.width > width && <div className="cg-atlas-pan">
      <button type="button" disabled={!pan.left} aria-label="Pan atlas left" onClick={() => move(-1)}>←</button>
      <span>More branches</span>
      <button type="button" disabled={!pan.right} aria-label="Pan atlas right" onClick={() => move(1)}>→</button>
    </div>}
    <div className="cg-atlas-viewport" ref={viewport} tabIndex={0} onScroll={updatePan}
      role="region" aria-label="Transformation Atlas diagram">
    <svg width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="group" aria-label="Plant transformations">
      <defs><marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M1 1 L7 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </marker></defs>
      <g className={`cg-atlas-connections${active ? ' tracing' : ''}`} aria-hidden="true">{layout.edges.map(edge =>
        <path key={edge.targetId} className={edge.sourceId === active || edge.targetId === active ? 'traced' : undefined}
          d={edge.path} markerEnd={`url(#${marker})`}/>)}</g>
      {layout.nodes.map(node => {
        const name = entryName(node, ledger, preview);
        return <foreignObject key={node.id} x={node.x} y={node.y} width={node.width} height={node.height}>
          <div className={`cg-atlas-node${node.reference ? ' cg-atlas-reference' : ''}`}>
            <button type="button" className={`cg-atlas-plaque ${entryKnown(node, ledger, preview) ? '' : 'cg-runes'}`}
              onPointerEnter={() => setActive(node.id)} onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)} onBlur={() => setActive(null)}
              onClick={() => navigate(node.key)} aria-label={`Open ${name}, page ${node.page}`}
              title={node.reference ? `Same entry, page ${node.page}` : undefined}>
              {name}
            </button>
            <span className="cg-atlas-page-ref">{node.reference && '↪ '}p. {node.page}</span>
          </div>
        </foreignObject>;
      })}
    </svg>
    </div>
  </div>;
}
