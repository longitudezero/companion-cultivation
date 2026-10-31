import React from 'react';

export default function SimulationControls({ speed, onChange }) {
  return <div className="simulation-speeds" role="group" aria-label="Simulation speed">{[0, .5, 1, 2].map(value =>
    <button key={value} aria-label={value === 0 ? 'Pause simulation' : `Simulation speed ${value}×`}
      aria-pressed={speed === value} onClick={() => onChange(value)}>{value === 0 ? 'Pause' : `${value}×`}</button>)}</div>;
}
