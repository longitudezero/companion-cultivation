import { useEffect, useRef, useState } from 'react';
import { REAL_MILLISECONDS_PER_GAME_HOUR } from '../core/index.js';
import { sampleClock, SPEEDS } from './view-model.js';

const STORAGE = 'companion-cultivation:simulation-speed';
const savedSpeed = () => {
  try { const raw = localStorage.getItem(STORAGE); const n = raw == null ? 1 : Number(raw); return SPEEDS.includes(n) ? n : 1; }
  catch { return 1; }
};

export default function useSimulationClock(onHours) {
  const [speed, setSpeedState] = useState(savedSpeed);
  const [fraction, setFraction] = useState(0);
  const state = useRef({ lastMs: null, remainderMs: 0 });
  const multiplier = useRef(speed), advance = useRef(onHours);
  advance.current = onHours;
  function tick(now) {
    const old = state.current;
    // Retain the prototype's lack of offline catch-up after a suspended tab.
    const lastMs = old.lastMs == null ? now : Math.max(old.lastMs, now - 5000);
    const next = sampleClock({ ...old, lastMs }, now, multiplier.current);
    state.current = next;
    if (next.hours) advance.current(next.hours);
    setFraction(next.remainderMs / REAL_MILLISECONDS_PER_GAME_HOUR);
  }
  useEffect(() => {
    state.current.lastMs = performance.now();
    const timer = window.setInterval(() => tick(performance.now()), 200);
    return () => window.clearInterval(timer);
  }, []);
  function setSpeed(next) {
    if (!SPEEDS.includes(next)) return;
    tick(performance.now()); // Finish the preceding interval at its prior speed.
    multiplier.current = next;
    setSpeedState(next);
    try { localStorage.setItem(STORAGE, String(next)); } catch { /* usable without storage */ }
  }
  function reset() { state.current = { lastMs: performance.now(), remainderMs: 0 }; setFraction(0); }
  return { speed, setSpeed, fraction, reset };
}
