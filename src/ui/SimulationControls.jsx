import React from 'react';
import GameArt from './GameArt.jsx';

const SPEED_ART = { 0: 'speedPause', .5: 'speedHalf', 1: 'speedNormal', 2: 'speedDouble' };

export default function SimulationControls({ speed, onChange }) {
  return <div className="simulation-speeds" role="group" aria-label="Simulation speed">{[0, .5, 1, 2].map(value =>
    <button key={value} className="speed-art-button" aria-label={value === 0 ? 'Pause simulation' : `Simulation speed ${value}×`}
      title={value === 0 ? 'Pause' : `${value}× speed`} aria-pressed={speed === value} onClick={() => onChange(value)}>
      <GameArt name={SPEED_ART[value]}/><span className="speed-halo" aria-hidden="true"/>
    </button>)}</div>;
}
