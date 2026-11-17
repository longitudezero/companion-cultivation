import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { harvestCropName } from './harvest-receipts.js';

const LEAVES = [
  { x: -21, y: 7, mx: -12, my: -34, dx: 74, dy: -91, r: -225, d: 0, t: 1120, s: .86 },
  { x: -8, y: 18, mx: -2, my: -41, dx: 111, dy: -116, r: 310, d: 35, t: 1240, s: 1.08 },
  { x: 10, y: 10, mx: 17, my: -31, dx: 128, dy: -84, r: -275, d: 75, t: 1180, s: .94 },
  { x: 23, y: 21, mx: 31, my: -35, dx: 91, dy: -128, r: 365, d: 115, t: 1290, s: 1.02 },
  { x: 1, y: 29, mx: 11, my: -24, dx: 139, dy: -103, r: 245, d: 160, t: 1210, s: .8 },
];

const SPARKLES = [
  { x: -36, y: -22, dx: 27, dy: -69, d: 20, t: 610, s: .72 },
  { x: -14, y: -40, dx: 66, dy: -79, d: 90, t: 690, s: 1.1 },
  { x: 15, y: -34, dx: 75, dy: -52, d: 175, t: 570, s: .86 },
  { x: 38, y: -5, dx: 96, dy: -61, d: 250, t: 720, s: .66 },
  { x: -29, y: 18, dx: 51, dy: -93, d: 330, t: 630, s: .76 },
  { x: 5, y: 28, dx: 116, dy: -73, d: 410, t: 700, s: 1 },
  { x: 29, y: 17, dx: 132, dy: -92, d: 520, t: 660, s: .7 },
];

function particleStyle(particle) {
  return {
    '--particle-x': `${particle.x}px`, '--particle-y': `${particle.y}px`,
    '--particle-mid-x': `${particle.mx ?? particle.dx * .45}px`, '--particle-mid-y': `${particle.my ?? particle.dy * .6}px`,
    '--particle-late-x': `${((particle.mx ?? particle.dx * .45) + particle.dx) / 2}px`,
    '--particle-late-y': `${((particle.my ?? particle.dy * .6) + particle.dy) / 2}px`,
    '--particle-end-x': `${particle.dx}px`, '--particle-end-y': `${particle.dy}px`,
    '--particle-mid-rotation': `${(particle.r || 110) * .14}deg`, '--particle-late-rotation': `${(particle.r || 110) * .55}deg`,
    '--particle-rotation': `${particle.r || 110}deg`, '--particle-delay': `${particle.d}ms`,
    '--particle-duration': `${particle.t}ms`, '--particle-scale': particle.s, '--particle-burst-scale': particle.s * 1.18,
  };
}

export default function HarvestBurst({ burst, viewportRef, onComplete }) {
  const [position, setPosition] = useState(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const target = [...(viewport?.querySelectorAll('[data-garden-hex]') || [])]
      .find(node => node.getAttribute('data-garden-hex') === burst.key);
    const hex = target?.querySelector('.hex-surface') || target;
    if (!viewport || !hex) return;
    const viewportBounds = viewport.getBoundingClientRect(), hexBounds = hex.getBoundingClientRect();
    const x = hexBounds.left - viewportBounds.left + hexBounds.width / 2;
    const y = hexBounds.top - viewportBounds.top + hexBounds.height * .45;
    setPosition({ x, y, side: x > viewportBounds.width - 190 ? 'left' : 'right' });
  }, [burst.id, burst.key, viewportRef]);

  useEffect(() => {
    const timer = window.setTimeout(() => completeRef.current?.(burst.id), 1900);
    return () => window.clearTimeout(timer);
  }, [burst.id]);

  if (!position) return null;
  return <div className={`harvest-burst harvest-burst-${position.side}`} style={{ left: position.x, top: position.y }} aria-hidden="true">
    {LEAVES.map((leaf, index) => <span className="harvest-particle harvest-leaf" style={particleStyle(leaf)} key={`leaf-${index}`}/>)}
    {SPARKLES.map((sparkle, index) => <span className="harvest-particle harvest-sparkle" style={particleStyle(sparkle)} key={`sparkle-${index}`}>✦</span>)}
    {burst.quantity > 0 && <span className="harvest-yield-flyout"><b>+{burst.quantity}</b> {harvestCropName(burst.species, burst.quantity)}</span>}
  </div>;
}
