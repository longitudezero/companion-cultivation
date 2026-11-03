import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BOOK_SIZE, BOOK_VIEW_KEY, fitBook, flatAngle, recoverBook, restoreBookView, savedBookView, screenToBook, zoomBookAt } from './book-view.js';

export const BookCoordinates = createContext(null);
const viewportSize = () => ({ width: typeof window === 'undefined' ? 1360 : window.innerWidth,
  height: typeof window === 'undefined' ? 900 : window.innerHeight });

// Standalone note/editor tests and previews can still use an untransformed book.
const plainCoordinates = {
  size(book) { const rect = book.getBoundingClientRect(); return { width: book.clientWidth || rect.width, height: book.clientHeight || rect.height }; },
  point(event, book) { const rect = book.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; },
};
export const useBookCoordinates = () => useContext(BookCoordinates) || plainCoordinates;

export function useBookView(root, disabled) {
  const viewport = useRef(viewportSize()), gesture = useRef(null), suppress = useRef(false);
  const [view, setView] = useState(() => {
    try { return restoreBookView(JSON.parse(localStorage.getItem(BOOK_VIEW_KEY)), viewport.current); }
    catch { return fitBook(viewport.current); }
  });
  const latest = useRef(view); latest.current = view;
  const inert = useRef(disabled); inert.current = disabled;
  const clientPoint = event => { const rect = root.current?.getBoundingClientRect();
    return { x: event.clientX - (rect?.left || 0), y: event.clientY - (rect?.top || 0) }; };
  const coordinates = useRef({ size: () => BOOK_SIZE,
    point: event => screenToBook(clientPoint(event), latest.current) }).current;

  useEffect(() => {
    try { localStorage.setItem(BOOK_VIEW_KEY, JSON.stringify(savedBookView(view, viewport.current))); }
    catch { /* Keep the current view usable when browser storage is unavailable. */ }
  }, [view]);
  useEffect(() => {
    const resize = () => {
      const next = viewportSize(), saved = savedBookView(latest.current, viewport.current);
      viewport.current = next; setView(restoreBookView(saved, next));
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    const overlay = root.current;
    const wheel = event => {
      if (inert.current || event.target.closest('.cg-page-scroll, .cg-atlas-viewport, .cg-paper-writing, .cg-view-controls, .cg-stationery-tools, .cg-stationery-backdrop, .cg-glossary-backdrop, .cg-note-confirm-backdrop')) return;
      event.preventDefault(); event.stopPropagation();
      const point = clientPoint(event), delta = Math.max(-120, Math.min(120, event.deltaY));
      setView(current => recoverBook(zoomBookAt(current, point, current.zoom * Math.exp(-delta * .002)), viewport.current));
    };
    overlay?.addEventListener('wheel', wheel, { passive: false });
    return () => { overlay?.removeEventListener('wheel', wheel); gesture.current = null; };
  }, []);

  const start = (event, kind) => {
    if (event.button !== 0 || event.isPrimary === false || gesture.current || inert.current) return;
    if (kind === 'pan' && event.target !== event.currentTarget) return;
    event.preventDefault(); event.stopPropagation(); suppress.current = false;
    const point = clientPoint(event), current = latest.current;
    gesture.current = { id: event.pointerId, kind, start: point, view: current, dragged: false,
      angle: Math.atan2(point.y - current.y, point.x - current.x) };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const move = event => {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    event.stopPropagation();
    const point = clientPoint(event);
    if (!drag.dragged && Math.hypot(point.x - drag.start.x, point.y - drag.start.y) <= 5) return;
    drag.dragged = true;
    setView(drag.kind === 'pan' ? { ...drag.view, x: drag.view.x + point.x - drag.start.x, y: drag.view.y + point.y - drag.start.y }
      : { ...drag.view, rotation: flatAngle(drag.view.rotation + (Math.atan2(point.y - drag.view.y, point.x - drag.view.x) - drag.angle) * 180 / Math.PI) });
  };
  const finish = (event, cancelled = false) => {
    const drag = gesture.current;
    if (!drag || drag.id !== event.pointerId) return;
    event.stopPropagation(); gesture.current = null; suppress.current = drag.dragged || cancelled;
    setView(current => recoverBook(cancelled ? drag.view : current, viewport.current));
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const handlers = kind => ({ onPointerDown: event => start(event, kind), onPointerMove: move,
    onPointerUp: event => finish(event), onPointerCancel: event => finish(event, true), onLostPointerCapture: event => finish(event, true),
    onClick: event => { if (suppress.current) { suppress.current = false; event.stopPropagation(); } } });
  const rotate = amount => setView(current => recoverBook({ ...current, rotation: flatAngle(current.rotation + amount) }, viewport.current));
  return { view, coordinates, panHandlers: handlers('pan'), rotationHandlers: handlers('rotate'),
    rotate, fit: () => setView(fitBook(viewport.current, latest.current.rotation)), reset: () => setView(fitBook(viewport.current)),
    zoom: factor => setView(current => recoverBook(zoomBookAt(current, { x: current.x, y: current.y }, current.zoom * factor), viewport.current)),
    pan: (x, y) => setView(current => recoverBook({ ...current, x: current.x + x, y: current.y + y }, viewport.current)),
    transform: `translate(${view.x}px, ${view.y}px) rotate(${view.rotation}deg) scale(${view.zoom}) translate(-50%, -50%)` };
}

export function BookViewControls({ scene, disabled }) {
  return <div className="cg-view-controls" role="group" aria-label="Book view" inert={disabled}>
    <button type="button" onClick={() => scene.zoom(1 / 1.15)} aria-label="Zoom book out" title="Zoom out">−</button>
    <output aria-label="Book zoom">{Math.round(scene.view.zoom * 100)}%</output>
    <button type="button" onClick={() => scene.zoom(1.15)} aria-label="Zoom book in" title="Zoom in">+</button>
    <button type="button" onClick={() => scene.rotate(-5)} aria-label="Rotate book counterclockwise" title="Rotate counterclockwise">↶</button>
    <button type="button" onClick={() => scene.rotate(5)} aria-label="Rotate book clockwise" title="Rotate clockwise">↷</button>
    <button type="button" className="cg-view-pan" aria-label="Move book" title="Drag to move the book; arrow keys also work" {...scene.panHandlers}
      onKeyDown={event => { const delta = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24] }[event.key];
        if (delta) { event.preventDefault(); event.stopPropagation(); scene.pan(...delta); } }}>✥</button>
    <button type="button" onClick={scene.fit}>Fit book</button>
    <button type="button" onClick={scene.reset}>Reset view</button>
  </div>;
}
