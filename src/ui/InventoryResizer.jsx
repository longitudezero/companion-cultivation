import React, { useEffect, useRef } from 'react';
import { inventoryWidthFor } from './view-model.js';

export default function InventoryResizer({ width, onResize }) {
  const cleanup = useRef(null);
  useEffect(() => () => cleanup.current?.(), []);
  function start(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    cleanup.current?.();
    const startX = event.clientX, startWidth = width;
    const move = e => onResize(inventoryWidthFor(startWidth + startX - e.clientX, window.innerWidth));
    const end = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end); cleanup.current = null; };
    cleanup.current = end;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  }
  return <div className="inventory-resizer" role="separator" aria-label="Resize inventory" aria-orientation="vertical"
    aria-valuenow={Math.round(width)} aria-valuemin={208} aria-valuemax={720} tabIndex={0} onPointerDown={start}
    onKeyDown={event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); onResize(inventoryWidthFor(width + (event.key === 'ArrowLeft' ? 40 : -40), window.innerWidth)); } }}/>
}
