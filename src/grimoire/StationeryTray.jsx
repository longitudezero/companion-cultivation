import React, { useState } from 'react';
import { stationeryArt } from './stationery-art.js';
import GameArt from '../ui/GameArt.jsx';

export default function StationeryTray({ children, inert = false }) {
  const [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false), [pinned, setPinned] = useState(false);
  const expanded = hovered || focused || pinned;
  return <div className={`cg-stationery-tools${expanded ? ' is-expanded' : ''}`} role="group" aria-label="Grimoire stationery" inert={inert}
    onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocus={event => setFocused(event.target.matches(':focus-visible'))}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <img className="cg-stationery-table" src={stationeryArt('cultivation-tabletop.webp')} alt="" aria-hidden="true" draggable="false"/>
    <button type="button" className="cg-table-handle" aria-label="Stationery table" aria-expanded={expanded} aria-pressed={pinned}
      title="Hover to open. Click to pin or unpin the stationery table." onClick={() => setPinned(value => !value)}><GameArt name="pin"/></button>
    {children}
  </div>;
}
