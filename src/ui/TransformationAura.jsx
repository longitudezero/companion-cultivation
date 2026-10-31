import React, { useId } from 'react';

const WISPS = [
  'M107 61C89 39 68 19 36 22C10 24 12 47 30 47C44 47 44 34 35 34C30 34 28 40 33 40',
  'M111 47C96 22 61 7 34 14C13 19 19 25 31 24',
  'M106 66C87 48 76 47 58 55C43 62 33 61 28 54',
  'M112 62C136 35 164 13 193 23C214 31 205 53 190 48C178 44 183 33 192 36C198 38 193 44 189 40',
  'M114 45C137 13 166 6 190 12C208 17 202 24 191 23',
  'M113 67C136 48 150 48 167 56C181 65 195 60 199 53',
  'M95 33C80 13 103 1 114 10C121 16 115 21 108 18C102 14 110 9 116 12C131 19 120 32 118 38',
];

// Decorative only: the same treatment is used for known and unknown routes.
export default function TransformationAura() {
  const glow = `transformation-aura-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return <svg className="transformation-aura" viewBox="0 0 220 80" aria-hidden="true" focusable="false">
    <defs><filter id={glow} x="-12" y="-12" width="244" height="104" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="arc"/>
      <feGaussianBlur in="arc" stdDeviation="1.15" result="halo"/>
      <feMerge><feMergeNode in="halo"/><feMergeNode in="halo"/><feMergeNode in="arc"/></feMerge>
    </filter></defs>
    <g filter={`url(#${glow})`}>
      {WISPS.map((d, index) => <React.Fragment key={index}>
        <path className="transformation-wisp" d={d}/>
        <path className={`transformation-arc${index % 2 ? ' transformation-arc-secondary' : ''}`} d={d} pathLength="100"
          style={{ animationDelay: `${-index * 1.1}s`, animationDuration: `${6 + index % 3 * 2}s` }}/>
      </React.Fragment>)}
      <circle className="transformation-spark" cx="23" cy="22" r="1.2"/>
      <circle className="transformation-spark" cx="55" cy="50" r="1"/>
      <circle className="transformation-spark" cx="169" cy="12" r="1.1"/>
      <circle className="transformation-spark" cx="199" cy="49" r=".8"/>
    </g>
  </svg>;
}
