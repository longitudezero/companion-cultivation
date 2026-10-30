import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { atlasLayout, entryKnown, entryName } from './book.js';

export default function TransformationAtlas({ chapter, ledger, preview, navigate }) {
  const viewport = useRef(null);
  const [width, setWidth] = useState(384);
  const marker = `atlas-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  useEffect(() => {
    if (!viewport.current || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(160, Math.floor(entry.contentRect.width))));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  const layout = useMemo(() => atlasLayout(chapter, width), [chapter, width]);
  return <div className="cg-atlas-viewport" ref={viewport} tabIndex={0}
    role="region" aria-label="Transformation Atlas diagram">
    <svg width={layout.width} height={layout.height} viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="group" aria-label="Plant transformations">
      <defs><marker id={marker} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M1 1 L7 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </marker></defs>
      <g className="cg-atlas-connections" aria-hidden="true">{layout.edges.map((edge, index) =>
        <path key={index} d={edge.path} markerEnd={`url(#${marker})`}/>)}</g>
      {layout.nodes.map(node => {
        const name = entryName(node, ledger, preview);
        return <foreignObject key={node.key} x={node.x} y={node.y} width={node.width} height={node.height}>
          <div className="cg-atlas-node">
            <button type="button" className={`cg-atlas-plaque ${entryKnown(node, ledger, preview) ? '' : 'cg-runes'}`}
              onClick={() => navigate(node.key)} aria-label={`Open ${name}, page ${node.page}`}>
              {name}
            </button>
            <span className="cg-atlas-page-ref">p. {node.page}</span>
          </div>
        </foreignObject>;
      })}
    </svg>
  </div>;
}
