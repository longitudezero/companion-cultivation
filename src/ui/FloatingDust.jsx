import React from 'react';

// Stable, varied paths avoid render-time randomness and keep the dust independent
// of the simulation clock. Each mote wanders through its own three waypoints.
let seed = 271828;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
const number = (min, max) => (min + random() * (max - min)).toFixed(2);
const motes = Array.from({ length: 64 }, () => {
  const duration = number(22, 42);
  return { left: `${number(2, 98)}%`, top: `${number(3, 97)}%`,
    '--dust-size': `${number(1, 2.6)}px`, '--dust-duration': `${duration}s`,
    '--dust-delay': `${(-random() * Number(duration)).toFixed(2)}s`,
    '--dust-x1': `${number(-38, 38)}px`, '--dust-y1': `${number(-22, 22)}px`,
    '--dust-x2': `${number(-42, 42)}px`, '--dust-y2': `${number(-26, 26)}px`,
    '--dust-x3': `${number(-34, 34)}px`, '--dust-y3': `${number(-24, 24)}px` };
});

export default function FloatingDust() {
  return <span className="guild-dust" aria-hidden="true">
    {motes.map((style, index) => <i className="guild-dust-mote" key={index} style={style}/>)}
  </span>;
}
