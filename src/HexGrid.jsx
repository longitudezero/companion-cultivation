import React from 'react';
import { neighborsOf, edgeKey, offsetOf, isMycelial, isPlayerSource, SOURCE_ITEMS, FUNGI } from './core/index.js';

const SIZE = 33;
const DX = Math.sqrt(3) * SIZE;
const Y_STEP = 1.5 * SIZE;
export const gridDimensions = garden => ({ width: 130 + (garden.columns - 1 + .5) * DX,
  height: 118 + (garden.rows - 1) * Y_STEP });

export const PALETTES = {
  Moisture: { Dry: '#b59b75', Damp: '#729e86', Flooded: '#477eac' },
  Temperature: { Freezing: '#71a9bd', Cold: '#8aa9ba', Temperate: '#7b9a7c', Warm: '#c69a5e', Hot: '#c46e53' },
  Illumination: { Dark: '#49545c', Dim: '#777e83', Lit: '#b9a36e', Bright: '#ddbc6d' },
};

function centerFor(key) {
  const { column, row } = offsetOf(key);
  return { x: 60 + (column + (row % 2) / 2) * DX, y: 58 + row * Y_STEP };
}

function polygonFor({ x, y }) {
  return Array.from({ length: 6 }, (_, index) => {
    const radians = (index * 60 - 30) * Math.PI / 180;
    return `${x + SIZE * Math.cos(radians)},${y + SIZE * Math.sin(radians)}`;
  }).join(' ');
}

function edgeSegment(a, b) {
  const one = centerFor(a);
  const two = centerFor(b);
  const dx = two.x - one.x;
  const dy = two.y - one.y;
  const length = Math.hypot(dx, dy);
  const cx = (one.x + two.x) / 2;
  const cy = (one.y + two.y) / 2;
  const px = -dy / length * SIZE / 2;
  const py = dx / length * SIZE / 2;
  return { x1: cx - px, y1: cy - py, x2: cx + px, y2: cy + py };
}

export default function HexGrid({ garden, simulation, mycelialSupport = {}, overlay, tool, selection, onHexClick, onEdgeClick, onStartHexDrag, onRotateHeading, onRotationStart, onRotationEnd }) {
  const keys = Object.keys(garden.hexes);
  const { width, height } = gridDimensions(garden);
  const selectedSource = selection.type === 'hex' && ['source', 'fungus'].includes(garden.objects[selection.key]?.type) ? selection.key : null;
  const selectedKey = selection.type === 'hex' ? selection.key : null;
  const selectedObject = garden.objects[selectedKey];
  const selectedStaged = garden.staged?.[selectedKey];
  const fungusProfile = selectedStaged?.kind === 'fungus' ? FUNGI[selectedStaged.species] : null;
  const rotatingItem = isPlayerSource(selectedObject) && SOURCE_ITEMS[selectedObject.catalogId]?.propagation === 'spread-budget';
  const rotatingFungus = selectedStaged?.kind === 'fungus' && (fungusProfile?.environment?.propagation === 'spread-budget'
    || fungusProfile?.cultivation?.propagation === 'spread-budget');
  const rotator = selectedKey && (rotatingItem || rotatingFungus)
    ? { key: selectedKey, kind: rotatingItem ? 'item' : 'staged', heading: rotatingItem ? selectedObject.heading : selectedStaged.heading }
    : null;
  const highlighted = new Set();
  if (selectedSource) {
    garden.objects[selectedSource].emissions.forEach((_, i) => {
      for (const entry of simulation.coverage[`${selectedSource}:${i}`] || []) highlighted.add(entry.key);
    });
  }
  const routedSegments = selectedSource
    ? garden.objects[selectedSource].emissions.flatMap((_, i) => simulation.routes[`${selectedSource}:${i}`]?.segments || [])
    : [];
  const edges = [];
  const visited = new Set();
  for (const key of keys) {
    for (const neighbor of neighborsOf(key)) {
      if (!garden.hexes[neighbor]) continue;
      const id = edgeKey(key, neighbor);
      if (!visited.has(id)) {
        visited.add(id);
        edges.push({ id, a: key, b: neighbor, blocker: garden.edges[id] });
      }
    }
  }

  function startRotation(event) {
    if (!rotator || !onRotateHeading) return;
    event.stopPropagation();
    event.preventDefault();
    onRotationStart?.(rotator.kind);
    const svg = event.currentTarget.ownerSVGElement;
    const origin = centerFor(rotator.key);
    const headings = neighborsOf(rotator.key).map(key => centerFor(key));
    let previous = rotator.heading;
    const move = pointer => {
      if (!svg?.getScreenCTM()) return;
      const point = svg.createSVGPoint();
      point.x = pointer.clientX;
      point.y = pointer.clientY;
      const local = point.matrixTransform(svg.getScreenCTM().inverse());
      const dx = local.x - origin.x, dy = local.y - origin.y;
      if (Math.hypot(dx, dy) < 12) return;
      let nearest = 0, best = -Infinity;
      headings.forEach((target, index) => {
        const vx = target.x - origin.x, vy = target.y - origin.y;
        const score = (dx * vx + dy * vy) / Math.hypot(vx, vy);
        if (score > best) { best = score; nearest = index; }
      });
      if (nearest !== previous) {
        previous = nearest;
        onRotateHeading(rotator.key, rotator.kind, nearest);
      }
    };
    const end = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      onRotationEnd?.(rotator.kind);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    move(event);
  }

  return (
    <svg className={`garden-svg ${tool === 'edge' ? 'edge-mode' : ''}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Interactive hexagonal garden" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grain" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="0.55" fill="#f4eee0" opacity=".18"/><circle cx="9" cy="10" r=".5" fill="#17291d" opacity=".15"/></pattern>
        <marker id="route-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,3 L0,6 z" fill="#e9f0b4"/></marker>
      </defs>
      {keys.map((key) => {
        const condition = simulation.conditions[key][overlay];
        const fill = PALETTES[overlay][condition];
        const label = condition;
        const object = garden.objects[key];
        const staged = garden.staged?.[key];
        const pending = garden.pending?.[key];
        const mycelial = isMycelial(garden, key);
        const mycelialSupported = mycelial && Object.values(mycelialSupport)
          .some(keys => keys.includes(key));
        const c = centerFor(key);
        const active = selection.type === 'hex' && selection.key === key;
        return (
            <g key={key} data-garden-hex={key} data-occupied={Boolean(object || staged || pending)} className="hex-cell" onClick={(event) => onHexClick(key, event)}
             onPointerDown={(event) => { if (staged || isPlayerSource(object) || ['plant', 'fungus'].includes(object?.type)) onStartHexDrag(key, staged ? 'staged' : isPlayerSource(object) ? 'placed-item' : 'organism', event); }}
            tabIndex={0} role="button" aria-label={`Hex ${key}: ${overlay} ${condition}${mycelial ? '; Mycelial ground' : ''}${object?.species ? `; ${object.species} ${object.progress.toFixed(1)}%` : ''}${staged ? `; staged ${staged.quantity} ${staged.species} ${staged.kind === 'plant' ? 'Seeds' : 'Spores'}` : ''}${pending ? `; ${pending.species} awaiting germination` : ''}`} onKeyDown={(event) => { if (event.key === 'Enter') onHexClick(key); }}>
            {active && <polygon points={polygonFor(c)} fill="none" stroke="#eacb86" strokeWidth="7" opacity=".55"/>}
            {highlighted.has(key) && <polygon points={polygonFor(c)} fill="none" stroke="#efde9b" strokeWidth="5" opacity=".65"/>}
            <polygon points={polygonFor(c)} fill={fill} stroke={active ? '#ffe4a8' : '#243b32'} strokeWidth={active ? '2.3' : '2.5'} className="hex-surface"/>
            <polygon points={polygonFor(c)} fill="url(#grain)" pointerEvents="none"/>
            {mycelial && <g pointerEvents="none" className={`mycelial-overlay ${mycelialSupported ? '' : 'is-retreating'}`}>
              <polygon points={polygonFor(c)} fill="none" stroke={mycelialSupported ? '#dcb8ed' : '#8d7895'} strokeWidth="3.2" strokeDasharray="4 3" opacity=".95"/>
              <path d={`M${c.x-17} ${c.y+3} Q${c.x-5} ${c.y-9} ${c.x+7} ${c.y+1} L${c.x+17} ${c.y-8} M${c.x+7} ${c.y+1} L${c.x+15} ${c.y+11}`} fill="none" stroke="#563a69" strokeWidth="2" strokeLinecap="round" opacity=".85"/>
              <circle cx={c.x-17} cy={c.y+3} r="2.2" fill="#f0cbed"/>
              <circle cx={c.x+17} cy={c.y-8} r="2.2" fill="#f0cbed"/>
            </g>}
            {object?.type === 'source' && <>
              {object.anchor && <circle cx={c.x} cy={c.y - 7} r="15" fill="none" stroke="#eed5a0" strokeWidth="1.3" strokeDasharray="2 2" pointerEvents="none"/>}
              <circle cx={c.x} cy={c.y - 7} r="12" fill={isPlayerSource(object) ? '#5c452b' : '#203e31'} stroke="#e7cd88" strokeWidth="1.4"/>
              <text x={c.x} y={c.y - 2} className="hex-glyph" textAnchor="middle">{isPlayerSource(object) ? '✧' : object.anchor ? '✥' : '✦'}</text>
            </>}
            {['plant', 'fungus'].includes(object?.type) && <>
              <circle cx={c.x} cy={c.y - 7} r="14" fill={object.type === 'plant' ? '#264d31' : '#514332'} stroke={object.type === 'plant' ? '#9cdaa1' : '#e4b98e'} strokeWidth="1.8" pointerEvents="none"/>
              <text x={c.x} y={c.y - 2} className="hex-glyph organism-glyph" textAnchor="middle">{object.type === 'plant' ? '❧' : '♧'}</text>
              <rect x={c.x - 17} y={c.y + 7} width="34" height="4" rx="2" fill="#121c17" pointerEvents="none"/>
              <rect x={c.x - 17} y={c.y + 7} width={34 * object.progress / 200} height="4" rx="2" fill={object.type === 'plant' ? '#a5d7a6' : '#e0bb8d'} pointerEvents="none"/>
            </>}
            {object?.type === 'blocker' && <>
              <polygon points={polygonFor({ x: c.x, y: c.y - 4 }).split(' ').map((p) => { const [x,y] = p.split(',').map(Number); return `${c.x + (x-c.x)*.47},${c.y-4+(y-(c.y-4))*.47}`; }).join(' ')} fill="#513e3e" stroke="#f1b4a1" strokeWidth="2"/>
              <text x={c.x} y={c.y + 1} className="hex-glyph" textAnchor="middle">×</text>
            </>}
            {staged && <g className="staged-glyph" pointerEvents="none"><circle cx={c.x} cy={c.y - 7} r="14" fill="#354b3b" stroke="#f1d28d" strokeDasharray="3 2" strokeWidth="2"/><text x={c.x} y={c.y - 3} fontSize="15" textAnchor="middle" fill="#f2d39a">{staged.kind === 'plant' ? '◌' : '◈'}</text><text x={c.x} y={c.y + 10} fontSize="10" textAnchor="middle" fill="#fff2cc">×{staged.quantity}</text></g>}
            {pending && <g className="pending-glyph" pointerEvents="none"><circle cx={c.x} cy={c.y - 7} r="14" fill="#414438" stroke="#d6c99c" strokeWidth="2"/><text x={c.x} y={c.y - 2} fontSize="19" textAnchor="middle" fill="#e7d29d">?</text></g>}
            <text x={c.x} y={c.y + (object ? 19 : 5)} textAnchor="middle" className={`hex-label ${object ? 'hex-label-small' : ''}`}
              style={label.length >= 8 ? { fontSize: object ? '6.5px' : '7.5px', letterSpacing: 0 } : undefined}>
              {label}
            </text>
          </g>
        );
      })}
      {routedSegments.length > 0 && <g className="route-flow" pointerEvents="none">
        {routedSegments.map(({ from, to }, index) => {
          const a = centerFor(from), b = centerFor(to);
          const dx = b.x - a.x, dy = b.y - a.y;
          const line = { x1: a.x + dx * .28, y1: a.y + dy * .28, x2: b.x - dx * .24, y2: b.y - dy * .24 };
          return <g key={`${from}-${to}-${index}`}>
            <line {...line} stroke="#213c33" strokeWidth="7" strokeLinecap="round" opacity=".8" />
            <line {...line} stroke="#e9f0b4" strokeWidth="3" strokeLinecap="round" markerEnd="url(#route-arrow)" />
          </g>;
        })}
      </g>}
      {rotator && (() => {
        const center = centerFor(rotator.key);
        const markers = neighborsOf(rotator.key).map((key, index) => {
          const neighbor = centerFor(key);
          const dx = neighbor.x - center.x, dy = neighbor.y - center.y;
          const factor = 46 / Math.hypot(dx, dy);
          return { index, x: center.x + dx * factor, y: center.y + dy * factor };
        });
        return <g className="direction-rotator" onClick={event => event.stopPropagation()}>
          <circle cx={center.x} cy={center.y - 2} r="46" fill="none" stroke="#e8c982" strokeDasharray="3 5" strokeWidth="2" pointerEvents="none"/>
          {markers.map(marker => <circle key={marker.index} cx={marker.x} cy={marker.y - 2}
            r={marker.index === rotator.heading ? 9 : 3.4} fill={marker.index === rotator.heading ? '#ffd18c' : '#d8b67e'}
            stroke="#283f30" strokeWidth="2" pointerEvents="none"/>)}
          <circle cx={markers[rotator.heading].x} cy={markers[rotator.heading].y - 2} r="17"
            className="rotation-drag-handle" fill="transparent" stroke="transparent"
            onPointerDown={startRotation} aria-label="Drag to rotate Source direction"/>
        </g>;
      })()}
      {edges.map(({ id, a, b, blocker }) => {
        const p = edgeSegment(a, b);
        const active = selection.type === 'edge' && selection.id === id;
        return <g key={id} className={`edge-group ${blocker ? 'is-blocked' : ''}`}>
          {blocker && <line {...p} stroke={active ? '#ffe3a4' : blocker.rule === 'full' ? '#f0ad8d' : '#cbb4e9'} strokeWidth={active ? 8 : 6} strokeLinecap="round" pointerEvents="none"/>}
          {tool === 'edge' && !blocker && <line {...p} stroke="#f4e6bf" strokeWidth="2" strokeDasharray="2 5" opacity=".42" pointerEvents="none"/>}
          <line {...p} stroke="transparent" strokeWidth="15" className="edge-hit" style={{ pointerEvents: tool === 'edge' || blocker ? 'stroke' : 'none' }} onClick={(event) => { event.stopPropagation(); onEdgeClick(a, b); }} />
        </g>;
      })}
    </svg>
  );
}
