import React from 'react';
import GameArt from './GameArt.jsx';

export default function IllustratedButton({ art, label, onClick, disabled = false }) {
  return <button className="illustrated-control" aria-label={label} title={label} disabled={disabled} onClick={onClick}>
    <GameArt name={art}/>
  </button>;
}
