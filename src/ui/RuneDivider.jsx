import React from 'react';

const RUNES = 'ᚨ ᛒ ᛞ ᛖ ᚷ ᚺ ᛚ ᛗ ᛟ ᛈ ᚱ ᛊ ᛏ ᚢ ᚹ ᚲ ';
const inscription = RUNES.repeat(8);

export default function RuneDivider() {
  function followPointer(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--rune-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--rune-y', `${event.clientY - bounds.top}px`);
  }
  return <div className="rune-divider" aria-hidden="true" onPointerMove={followPointer}>
    <span className="divider-inscription">{inscription}</span>
    <span className="divider-inscription rune-glow">{inscription}</span>
  </div>;
}
