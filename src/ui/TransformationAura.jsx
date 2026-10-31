import React, { useId } from 'react';

// Decorative only: the same treatment is used for known and unknown routes.
export default function TransformationAura() {
  const glow = `transformation-aura-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return <svg className="transformation-aura" viewBox="0 0 96 80" aria-hidden="true" focusable="false">
    <defs><filter id={glow} x="-12" y="-12" width="120" height="104" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="1" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="arc"/>
      <feGaussianBlur in="arc" stdDeviation="1.15" result="halo"/>
      <feMerge><feMergeNode in="halo"/><feMergeNode in="halo"/><feMergeNode in="arc"/></feMerge>
    </filter></defs>
    <g filter={`url(#${glow})`}>
      <ellipse className="transformation-arc" cx="48" cy="40" rx="36" ry="30" pathLength="100"/>
      <ellipse className="transformation-arc transformation-arc-secondary" cx="48" cy="40" rx="32" ry="34" pathLength="100"/>
      <circle className="transformation-spark" cx="17" cy="55" r="1.2"/>
      <circle className="transformation-spark" cx="79" cy="23" r="1"/>
    </g>
  </svg>;
}
