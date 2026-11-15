import React from 'react';
import { neighborsOf, edgeKey, isMycelial, isPlayerSource, playerBlockerDefinition, SOURCE_ITEMS, FUNGI, STARTING_DIRECTIONS } from './core/index.js';

import { HEX_SIZE as SIZE, HEX_ROTATION_RADIUS, HEX_ART, HEX_ORGANISM_ART, SIMPLE_HEX_FILLS, gridDimensions, hexCenter as centerFor, hexPolygon as polygonFor, PALETTES } from './ui/hex-model.js';
import { illuminationArt } from './ui/illumination-art.js';
export { gridDimensions, PALETTES } from './ui/hex-model.js';
const HEX_WIDTH = Math.sqrt(3) * SIZE;
const hexArt = file => `${import.meta.env?.BASE_URL || '/'}ui/hexes/${file}`;
const clampPercent = value => Math.max(0, Math.min(100, Number(value) || 0));

function HexMeters({ center, illumination, growth, showGrowth }) {
  const growthLevel = clampPercent(growth / 2);
  return <g className="hex-meters" transform={`translate(${center.x} ${center.y})`} pointerEvents="none" aria-hidden="true"
    data-growth-meter={showGrowth ? growthLevel : undefined} data-illumination={illumination}>
    {showGrowth && <g className="hex-meter-track hex-meter-growth">
      <path d="M-41.6 21.2 L-1 42.4" transform="translate(0 .8)" stroke="#06100c" strokeOpacity=".78" strokeWidth="5.4"/>
      <path d="M-41.6 21.2 L-1 42.4" stroke="#2a1b10" strokeWidth="4.6"/>
      <path d="M-41.6 21.2 L-1 42.4" stroke="url(#growth-track-metal)" strokeWidth="3.8"/>
      <path d="M-41.6 21.2 L-1 42.4" stroke="#6b4627" strokeWidth="2.6"/>
      <path d="M-41.6 21.2 L-1 42.4" stroke="url(#growth-track-well)" strokeWidth="1.8"/>
      <path d="M-41.6 20 L-1 41.2" stroke="#ffe7a0" strokeOpacity=".82" strokeWidth=".34"/>
      <path d="M-41.6 22.4 L-1 43.6" stroke="#6f3e19" strokeOpacity=".95" strokeWidth=".3"/>
      <path className="hex-meter-fill" d="M-1 42.4 L-41.6 21.2" pathLength="100" stroke="url(#growth-meter-fill)" strokeWidth="1.6"
        strokeDasharray={`${growthLevel} 100`}/>
      <path className="hex-meter-shine" d="M-1 41.8 L-41.6 20.6" pathLength="100" stroke="#effaa0" strokeOpacity=".75" strokeWidth=".3"
        strokeDasharray={`${growthLevel} 100`}/>
    </g>}
    {showGrowth && <image className="hex-meter-decoration" href={hexArt('meters/growth-medallion.webp')}
      x="-46.4" y="5.2" width="19.2" height="19.2" preserveAspectRatio="xMidYMid meet"/>}
    <image className={`hex-illumination-icon illumination-${illumination.toLowerCase()}`} href={illuminationArt(illumination)}
      x="-17" y="19" width="34" height="34" preserveAspectRatio="xMidYMid meet"/>
  </g>;
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

export default function HexGrid({ garden, simulation, mycelialSupport = {}, simplifiedHexFills = false, tool, selection, plantingPreview, blockerPlacement, onHexClick, onEdgeClick, onStartHexDrag, onStartBlockerDrag, onRotateHeading, onRotationStart, onRotationEnd }) {
  const moistureArt = simplifiedHexFills ? SIMPLE_HEX_FILLS : HEX_ART.Moisture;
  // The simplified artwork has wider transparent margins than the full terrain tiles.
  const moistureWidth = HEX_WIDTH * (simplifiedHexFills ? 1.12 : 1.04);
  const keys = Object.keys(garden.hexes);
  const { width, height } = gridDimensions(garden);
  const selectedSource = selection.type === 'hex' && ['source', 'fungus'].includes(garden.objects[selection.key]?.type) ? selection.key : null;
  const selectedKey = selection.type === 'hex' ? selection.key : null;
  const selectedObject = garden.objects[selectedKey];
  const previewing = plantingPreview?.key === selectedKey;
  const selectedStaged = previewing ? plantingPreview : garden.staged?.[selectedKey];
  const fungusProfile = selectedStaged?.kind === 'fungus' ? FUNGI[selectedStaged.species] : null;
  const rotatingItem = isPlayerSource(selectedObject) && SOURCE_ITEMS[selectedObject.catalogId]?.propagation === 'spread-budget';
  const rotatingFungus = selectedStaged?.kind === 'fungus' && (fungusProfile?.environment?.propagation === 'spread-budget'
    || fungusProfile?.cultivation?.propagation === 'spread-budget');
  const rotator = selectedKey && (rotatingItem || rotatingFungus)
    ? { key: selectedKey, kind: rotatingItem ? 'item' : previewing ? 'preview' : 'staged', heading: rotatingItem ? selectedObject.heading : selectedStaged.heading }
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
        <linearGradient id="growth-track-metal" x1="-42" y1="21" x2="0" y2="43" gradientUnits="userSpaceOnUse"><stop stopColor="#6f421d"/><stop offset=".18" stopColor="#f4d58d"/><stop offset=".42" stopColor="#b87831"/><stop offset=".7" stopColor="#edbd62"/><stop offset="1" stopColor="#6b3e1a"/></linearGradient>
        <linearGradient id="growth-track-well" x1="-42" y1="21" x2="0" y2="43" gradientUnits="userSpaceOnUse"><stop stopColor="#0b1711"/><stop offset=".55" stopColor="#233928"/><stop offset="1" stopColor="#101d16"/></linearGradient>
        <linearGradient id="growth-meter-fill" x1="-1" y1="42" x2="-42" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#459653"/><stop offset=".5" stopColor="#82cb58"/><stop offset="1" stopColor="#e0ef78"/></linearGradient>
      </defs>
      {keys.map((key) => {
        const { Moisture, Temperature, Illumination } = simulation.conditions[key];
        const fill = PALETTES.Moisture[Moisture];
        const border = PALETTES.Temperature[Temperature];
        const object = garden.objects[key];
        const organismArt = HEX_ORGANISM_ART.get(object?.species);
        const blocker = playerBlockerDefinition(object);
        const preview = plantingPreview?.key === key ? plantingPreview : null;
        const staged = garden.staged?.[key];
        const proposal = preview || staged;
        const pending = garden.pending?.[key];
        const mycelial = isMycelial(garden, key);
        const mycelialSupported = mycelial && Object.values(mycelialSupport)
          .some(keys => keys.includes(key));
        const c = centerFor(key);
        const active = selection.type === 'hex' && selection.key === key;
        return (
            <g key={key} data-garden-hex={key} data-occupied={Boolean(object || proposal || pending)} className="hex-cell" style={{ '--hex-temperature-color': border }} onClick={(event) => onHexClick(key, event)}
            onPointerDown={(event) => {
              if (blocker) onStartBlockerDrag?.({ type: 'hex', key }, blocker, event);
              else if (staged || isPlayerSource(object) || ['plant', 'fungus'].includes(object?.type)) {
                onStartHexDrag(key, staged ? 'staged' : isPlayerSource(object) ? 'placed-item' : 'organism', event);
              }
            }}
            tabIndex={0} role="button" aria-label={`Hex ${key}: Moisture ${Moisture}; Temperature ${Temperature}; Illumination ${Illumination}${mycelial ? '; Mycelial ground' : ''}${blocker ? `; ${blocker.name}` : ''}${object?.species ? `; ${object.species} ${object.progress.toFixed(1)}%` : ''}${staged ? `; staged ${staged.quantity} ${staged.species} ${staged.kind === 'plant' ? 'Seeds' : 'Spores'}` : ''}${pending ? `; ${pending.species} awaiting germination` : ''}`} onKeyDown={(event) => { if (event.key === 'Enter') onHexClick(key); }}>
            <title>{`Moisture: ${Moisture} · Temperature: ${Temperature} · Illumination: ${Illumination}`}</title>
            <polygon points={polygonFor(c)} fill="#182c22" stroke="#102219" strokeWidth="1.5"/>
            <polygon points={polygonFor(c, SIZE - 3.5)} fill={fill} className="hex-surface"/>
            <image className="hex-moisture-art" href={hexArt(moistureArt[Moisture])}
              x={c.x - moistureWidth / 2} y={c.y - SIZE * 1.04} width={moistureWidth} height={SIZE * 2.08}
              preserveAspectRatio="none" pointerEvents="none"/>
            <image className="hex-temperature-art" href={hexArt(HEX_ART.Temperature[Temperature])}
              x={c.x - HEX_WIDTH * .6} y={c.y - SIZE} width={HEX_WIDTH * 1.2} height={SIZE * 2}
              preserveAspectRatio="none" pointerEvents="none"/>
            {highlighted.has(key) && <polygon points={polygonFor(c, SIZE - 8)} fill="none" stroke="#efde9b" strokeWidth="2" opacity=".65" pointerEvents="none"/>}
            {active && <polygon className="hex-selection" points={polygonFor(c, SIZE - 9)} fill="none" stroke="#ffe3a0" strokeWidth="2" strokeDasharray="4 3" pointerEvents="none"/>}
            {blockerPlacement?.form === 'hex' && !object && !proposal && !pending &&
              <polygon className="blocker-placement-target" points={polygonFor(c, SIZE - 6)} fill="none" pointerEvents="none"/>}
            {mycelial && <g pointerEvents="none" className={`mycelial-overlay ${mycelialSupported ? '' : 'is-retreating'}`}>
              <polygon points={polygonFor(c, SIZE - 7)} fill="none" stroke={mycelialSupported ? '#dcb8ed' : '#8d7895'} strokeWidth="3.2" strokeDasharray="4 3" opacity=".95"/>
              <path d={`M${c.x-17} ${c.y+3} Q${c.x-5} ${c.y-9} ${c.x+7} ${c.y+1} L${c.x+17} ${c.y-8} M${c.x+7} ${c.y+1} L${c.x+15} ${c.y+11}`} fill="none" stroke="#563a69" strokeWidth="2" strokeLinecap="round" opacity=".85"/>
              <circle cx={c.x-17} cy={c.y+3} r="2.2" fill="#f0cbed"/>
              <circle cx={c.x+17} cy={c.y-8} r="2.2" fill="#f0cbed"/>
            </g>}
            {object?.type === 'source' && <>
              {object.anchor && <circle cx={c.x} cy={c.y - 7} r="15" fill="none" stroke="#eed5a0" strokeWidth="1.3" strokeDasharray="2 2" pointerEvents="none"/>}
              <circle cx={c.x} cy={c.y - 7} r="12" fill={isPlayerSource(object) ? '#5c452b' : '#203e31'} stroke="#e7cd88" strokeWidth="1.4"/>
              <text x={c.x} y={c.y - 2} className="hex-glyph" textAnchor="middle">{isPlayerSource(object) ? '✧' : object.anchor ? '✥' : '✦'}</text>
            </>}
            {['plant', 'fungus'].includes(object?.type) && <g className="hex-organism">
              {organismArt ? <image className="hex-organism-art" href={hexArt(`organisms/${organismArt}`)}
                x={c.x - 25} y={c.y - 32} width={50} height={50} preserveAspectRatio="xMidYMax meet"
                pointerEvents="none" aria-hidden="true"/> : <>
                <circle cx={c.x} cy={c.y - 7} r="16" fill={object.type === 'plant' ? '#264d31' : '#514332'} stroke={object.type === 'plant' ? '#9cdaa1' : '#e4b98e'} strokeWidth="1.8" pointerEvents="none"/>
                <text x={c.x} y={c.y - 2} className="hex-glyph organism-glyph" textAnchor="middle">{object.type === 'plant' ? '❧' : '♧'}</text>
              </>}
            </g>}
            {object?.type === 'blocker' && <>
              <polygon points={polygonFor({ x: c.x, y: c.y - 4 }).split(' ').map((p) => { const [x,y] = p.split(',').map(Number); return `${c.x + (x-c.x)*.4},${c.y-4+(y-(c.y-4))*.4}`; }).join(' ')} fill="#513e3e" stroke="#f1b4a1" strokeWidth="2"/>
              <text x={c.x} y={c.y + 1} className="hex-glyph" textAnchor="middle">×</text>
            </>}
            {proposal && <g className={preview ? 'planting-preview-glyph' : 'staged-glyph'} pointerEvents="none"><circle cx={c.x} cy={c.y - 7} r="14" fill="#354b3b" stroke="#f1d28d" strokeDasharray="3 2" strokeWidth="2"/><text x={c.x} y={c.y - 3} fontSize="15" textAnchor="middle" fill="#f2d39a">{proposal.kind === 'plant' ? '◌' : '◈'}</text><text x={c.x} y={c.y + 10} fontSize="10" textAnchor="middle" fill="#fff2cc">×{proposal.quantity}</text></g>}
            {pending && <g className="pending-glyph" pointerEvents="none"><circle cx={c.x} cy={c.y - 7} r="14" fill="#414438" stroke="#d6c99c" strokeWidth="2"/><text x={c.x} y={c.y - 2} fontSize="19" textAnchor="middle" fill="#e7d29d">?</text></g>}
            <HexMeters center={c} illumination={Illumination} growth={object?.progress || 0}
              showGrowth={Boolean(['plant', 'fungus'].includes(object?.type) || proposal || pending)}/>
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
          const factor = HEX_ROTATION_RADIUS / Math.hypot(dx, dy);
          return { index, x: center.x + dx * factor, y: center.y + dy * factor };
        });
        return <g className="direction-rotator" onClick={event => event.stopPropagation()}>
          <circle cx={center.x} cy={center.y - 2} r={HEX_ROTATION_RADIUS} fill="none" stroke="#e8c982" strokeDasharray="3 5" strokeWidth="2" pointerEvents="none"/>
          {markers.map(marker => <circle key={marker.index} cx={marker.x} cy={marker.y - 2}
            r={marker.index === rotator.heading ? 9 : 3.4} fill={marker.index === rotator.heading ? '#ffd18c' : '#d8b67e'}
            stroke="#283f30" strokeWidth="2" pointerEvents="none"/>)}
          <circle cx={markers[rotator.heading].x} cy={markers[rotator.heading].y - 2} r="17"
            className="rotation-drag-handle" fill="transparent" stroke="transparent"
            onPointerDown={startRotation} role="button" tabIndex={0}
            aria-label={`${rotator.kind === 'preview' ? 'Rotate planting direction' : 'Rotate Source direction'}, ${STARTING_DIRECTIONS[rotator.heading]}`}
            onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(event.key)) {
              event.preventDefault(); event.stopPropagation(); onRotateHeading?.(rotator.key, rotator.kind, (rotator.heading + (event.key === 'ArrowLeft' ? 5 : 1)) % 6);
            } }}/>
        </g>;
      })()}
      {edges.map(({ id, a, b, blocker }) => {
        const p = edgeSegment(a, b);
        const active = selection.type === 'edge' && selection.id === id;
        const item = playerBlockerDefinition(blocker);
        const placingEdge = blockerPlacement?.form === 'edge';
        const keyboardTarget = item || (placingEdge && !blocker);
        return <g key={id} className={`edge-group ${blocker ? 'is-blocked' : ''}`}>
          {blocker && <line {...p} stroke={active ? '#ffe3a4' : blocker.rule === 'full' || item?.filters.includes('all') ? '#f0ad8d' : '#cbb4e9'} strokeWidth={active ? 8 : 6} strokeLinecap="round" pointerEvents="none"/>}
          {tool === 'edge' && !blocker && <line {...p} stroke="#f4e6bf" strokeWidth="2" strokeDasharray="2 5" opacity=".42" pointerEvents="none"/>}
          {placingEdge && !blocker && <line {...p} className="blocker-placement-target" pointerEvents="none"/>}
          <line {...p} stroke="transparent" strokeWidth="15" className="edge-hit"
            data-garden-edge={id} data-edge-a={a} data-edge-b={b}
            style={{ pointerEvents: tool === 'edge' || blocker || placingEdge ? 'stroke' : 'none' }}
            role={keyboardTarget ? 'button' : undefined} tabIndex={keyboardTarget ? 0 : undefined}
            aria-label={keyboardTarget ? `${item?.name || 'Place ' + blockerPlacement.name} on border ${a} to ${b}` : undefined}
            onPointerDown={item ? event => onStartBlockerDrag?.({ type: 'edge', id, a, b }, item, event) : undefined}
            onClick={(event) => { event.stopPropagation(); onEdgeClick(a, b); }}
            onKeyDown={keyboardTarget ? event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); event.stopPropagation(); onEdgeClick(a, b);
              }
            } : undefined}/>
        </g>;
      })}
    </svg>
  );
}
