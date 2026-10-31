import React, { useEffect, useRef, useState } from 'react';
import HarvestReceipt from './HarvestReceipt.jsx';
import { beginsPan, fitCamera, zoomAt } from './view-model.js';

export default function GardenCamera({ world, children, notice, onInterruptDrag, controls, harvestReceipt }) {
  const viewport = useRef(null), initialized = useRef(false), cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
  const [camera, setCamera] = useState(cameraRef.current);
  const size = useRef({ width: 0, height: 0 }), pan = useRef(null), touches = useRef(new Map()), pinch = useRef(null);
  const suppressedClick = useRef(false);
  function update(next) { cameraRef.current = next; setCamera(next); }
  function local(event) { const r = viewport.current.getBoundingClientRect(); return { x: event.clientX - r.left, y: event.clientY - r.top }; }
  function touchShape() {
    const [a, b] = [...touches.current.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
  }
  useEffect(() => {
    const el = viewport.current;
    const observer = new ResizeObserver(([entry]) => {
      size.current = { width: entry.contentRect.width, height: entry.contentRect.height };
      if (!initialized.current && size.current.width && size.current.height) {
        initialized.current = true;
        update({ zoom: 1, x: (size.current.width - world.width) / 2, y: (size.current.height - world.height) / 2 });
      }
    });
    observer.observe(el);
    const wheel = event => { if (event.target.closest('.garden-view-controls')) return; event.preventDefault(); update(zoomAt(cameraRef.current, local(event), cameraRef.current.zoom * Math.exp(-Math.max(-120, Math.min(120, event.deltaY)) * .002))); };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => { observer.disconnect(); el.removeEventListener('wheel', wheel); };
  }, []);

  function down(event) {
    suppressedClick.current = false;
    if (event.target.closest('.garden-view-controls')) { suppressedClick.current = false; return; }
    if (event.pointerType === 'touch') {
      touches.current.set(event.pointerId, local(event));
      if (touches.current.size === 2) {
        onInterruptDrag?.();
        pinch.current = { ...touchShape(), camera: cameraRef.current };
        pan.current = null;
        suppressedClick.current = true;
        for (const id of touches.current.keys()) viewport.current.setPointerCapture(id);
        event.preventDefault(); event.stopPropagation(); return;
      }
    }
    const hex = event.target.closest('[data-garden-hex]');
    const occupied = hex?.getAttribute('data-occupied') === 'true';
    if (!beginsPan(event.button, occupied || Boolean(event.target.closest('.edge-group,.direction-rotator')))) return;
    suppressedClick.current = false;
    pan.current = { id: event.pointerId, start: local(event), camera: cameraRef.current, middle: event.button === 1 };
    if (event.button === 1) { event.preventDefault(); viewport.current.setPointerCapture(event.pointerId); }
    event.stopPropagation();
  }
  function move(event) {
    if (event.pointerType === 'touch' && touches.current.has(event.pointerId)) touches.current.set(event.pointerId, local(event));
    if (pinch.current && touches.current.size >= 2) {
      const shape = touchShape(), start = pinch.current;
      const next = zoomAt(start.camera, start, start.camera.zoom * shape.distance / Math.max(1, start.distance));
      update({ ...next, x: next.x + shape.x - start.x, y: next.y + shape.y - start.y });
      event.preventDefault(); event.stopPropagation(); return;
    }
    const p = pan.current;
    if (!p || p.id !== event.pointerId) return;
    const point = local(event), dx = point.x - p.start.x, dy = point.y - p.start.y;
    if (Math.hypot(dx, dy) > 5 || suppressedClick.current) {
      suppressedClick.current = true;
      if (!viewport.current.hasPointerCapture(event.pointerId)) viewport.current.setPointerCapture(event.pointerId);
      update({ ...p.camera, x: p.camera.x + dx, y: p.camera.y + dy });
      event.preventDefault(); event.stopPropagation();
    }
  }
  function up(event) {
    touches.current.delete(event.pointerId);
    if (pinch.current) {
      pinch.current = null;
      const remaining = [...touches.current.entries()][0];
      pan.current = remaining ? { id: remaining[0], start: remaining[1], camera: cameraRef.current } : null;
      event.stopPropagation();
    } else if (pan.current?.id === event.pointerId) {
      if (suppressedClick.current || pan.current.middle) event.stopPropagation();
      pan.current = null;
    }
  }
  function stepZoom(factor) { update(zoomAt(cameraRef.current, { x: size.current.width / 2, y: size.current.height / 2 }, cameraRef.current.zoom * factor)); }
  return <div className="garden-camera-viewport" ref={viewport} aria-label="Garden view"
    onPointerDownCapture={down} onPointerMoveCapture={move} onPointerUpCapture={up} onPointerCancelCapture={up}
    onClickCapture={event => { if (suppressedClick.current) { event.preventDefault(); event.stopPropagation(); } }}
    onAuxClickCapture={event => { if (event.button === 1) { event.preventDefault(); event.stopPropagation(); } }}>
    <div className="garden-camera-world" style={{ width: world.width, height: world.height,
      transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }}>{children}</div>
    <div className="garden-view-controls">{controls}<div className="camera-controls" aria-label="Garden zoom controls"><button onClick={() => stepZoom(1 / 1.2)} aria-label="Zoom out">−</button>
      <span aria-label="Garden zoom">{Math.round(camera.zoom * 100)}%</span><button onClick={() => stepZoom(1.2)} aria-label="Zoom in">+</button>
      <button onClick={() => update(fitCamera(world, size.current))}>Fit</button></div></div>
    {harvestReceipt && <HarvestReceipt receipt={harvestReceipt}/>}
    {notice && <div className="garden-notification" role="status" key={notice.id}>{notice.text}</div>}
  </div>;
}
