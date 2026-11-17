import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { harvestCropName } from './harvest-receipts.js';

const LEAF_HUES = [
  ['#d1df82', '#7cba50', '#2e7447'],
  ['#e1d17b', '#8bb85c', '#44774d'],
  ['#acd47a', '#65aa58', '#2c644a'],
];

const leafSvg = (id, hue) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><linearGradient id="lg${id}" x1="0" y1="0" x2=".9" y2="1"><stop stop-color="${hue[0]}"/><stop offset=".48" stop-color="${hue[1]}"/><stop offset="1" stop-color="${hue[2]}"/></linearGradient></defs><path d="M9 42 C4 28 12 10 43 5 C45 25 33 44 12 44 Z" fill="url(#lg${id})" stroke="#36592e" stroke-width="1.7"/><path d="M12 42 Q28 25 41 8" fill="none" stroke="#e3e69a" stroke-width="1.9" stroke-linecap="round"/><path d="M19 34 Q13 25 16 18 M25 28 Q30 32 36 32 M31 21 Q25 16 26 12" fill="none" stroke="#c9d97d" stroke-width="1.15" stroke-linecap="round" opacity=".8"/></svg>`;
const sparkleSvg = tone => `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 1 C23 13 26 17 39 20 C26 23 23 26 20 39 C17 26 14 23 1 20 C14 17 17 13 20 1 Z" fill="${tone}"/><path d="M20 8 L20 32 M8 20 L32 20" stroke="#fff9c6" stroke-width="1.4" opacity=".7"/></svg>`;
const rand = (min, max) => min + Math.random() * (max - min);

function addSprite(layer, className, x, y, size, content) {
  const element = document.createElement('span');
  element.className = `harvest-sprite ${className}`;
  element.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;opacity:0`;
  element.innerHTML = content;
  layer.append(element);
  return element;
}

function playSuppliedSubtleAnimation(layer, receipt, batch) {
  const playing = [];
  const animate = (element, frames, timing) => {
    const animation = element.animate(frames, { fill: 'forwards', ...timing });
    playing.push(animation);
    animation.onfinish = () => element.remove();
    return animation;
  };

  // Exact leaf artwork, random ranges, keyframes and subtle count from the supplied animation.
  for (let index = 0; index < 5; index++) {
    const startX = rand(-30, 25), startY = rand(-12, 37), size = rand(22, 34);
    const element = addSprite(layer, 'harvest-sprite-leaf', startX, startY, size,
      leafSvg(batch * 100 + index, LEAF_HUES[index % LEAF_HUES.length]));
    const drift = rand(63, 142), height = rand(65, 133), spin = rand(145, 400) * (index % 2 ? 1 : -1);
    const delay = rand(0, 180), duration = rand(950, 1320);
    animate(element, [
      { opacity: 0, transform: 'translate(-50%,-50%) translate(0px,8px) rotate(0deg) scale(.3)', offset: 0 },
      { opacity: 1, transform: `translate(-50%,-50%) translate(${rand(-12, 12)}px,-${rand(17, 34)}px) rotate(${spin * .12}deg) scale(1.18)`, offset: .19 },
      { opacity: 1, transform: `translate(-50%,-50%) translate(${drift * .32}px,-${height * .72}px) rotate(${spin * .45}deg) scale(1)`, offset: .53 },
      { opacity: .8, transform: `translate(-50%,-50%) translate(${drift * .70}px,-${height * 1.03}px) rotate(${spin * .78}deg) scale(.89)`, offset: .78 },
      { opacity: 0, transform: `translate(-50%,-50%) translate(${drift}px,-${height * 1.13}px) rotate(${spin}deg) scale(.43)`, offset: 1 },
    ], { duration, delay, easing: 'cubic-bezier(.22,.65,.3,1)' });
  }

  // Exact four-point twinkles and subtle count from the supplied animation.
  for (let index = 0; index < 7; index++) {
    const size = rand(11, 25), startX = rand(-70, 70), startY = rand(-65, 52);
    const element = addSprite(layer, 'harvest-sprite-sparkle', startX, startY, size,
      sparkleSvg(index % 3 === 0 ? '#fffadb' : index % 3 === 1 ? '#f6cf72' : '#deefa8'));
    const delay = rand(0, 620), dy = rand(-65, -12), dx = rand(12, 84), rotation = rand(-80, 140), duration = rand(480, 780);
    animate(element, [
      { opacity: 0, transform: 'translate(-50%,-50%) rotate(0deg) scale(.1)', offset: 0 },
      { opacity: 1, transform: `translate(-50%,-50%) translate(${dx * .15}px,${dy * .2}px) rotate(${rotation * .25}deg) scale(1.2)`, offset: .25 },
      { opacity: .85, transform: `translate(-50%,-50%) translate(${dx * .6}px,${dy * .65}px) rotate(${rotation * .7}deg) scale(.72)`, offset: .60 },
      { opacity: 0, transform: `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${rotation}deg) scale(0)`, offset: 1 },
    ], { delay, duration, easing: 'ease-out' });
  }

  if (receipt) {
    const receiptAnimation = receipt.animate([
      { opacity: 0, transform: 'translateY(13px)' },
      { opacity: 1, transform: 'translateY(0)', offset: .18 },
      { opacity: 1, transform: 'translateY(-6px)', offset: .65 },
      { opacity: 0, transform: 'translateY(-18px)' },
    ], { delay: 380, duration: 1350, fill: 'none', easing: 'ease-out' });
    playing.push(receiptAnimation);
  }

  return () => {
    for (const animation of playing) {
      try { animation.cancel(); } catch { /* A completed sprite has already removed itself. */ }
    }
    layer.replaceChildren();
  };
}

export default function HarvestBurst({ burst, viewportRef, onComplete }) {
  const [position, setPosition] = useState(null);
  const layerRef = useRef(null), receiptRef = useRef(null), completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const target = [...(viewport?.querySelectorAll('[data-garden-hex]') || [])]
      .find(node => node.getAttribute('data-garden-hex') === burst.key);
    const hex = target?.querySelector('.hex-surface') || target;
    if (!viewport || !hex) return;
    const viewportBounds = viewport.getBoundingClientRect(), hexBounds = hex.getBoundingClientRect();
    const x = hexBounds.left - viewportBounds.left + hexBounds.width / 2;
    const y = hexBounds.top - viewportBounds.top + hexBounds.height * .45;
    setPosition({ x, y, side: x > viewportBounds.width - 190 ? 'left' : 'right' });
  }, [burst.id, burst.key, viewportRef]);

  useLayoutEffect(() => {
    if (!position || !layerRef.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (receiptRef.current) receiptRef.current.style.opacity = '1';
      return undefined;
    }
    return playSuppliedSubtleAnimation(layerRef.current, receiptRef.current, burst.id);
  }, [burst.id, position]);

  useEffect(() => {
    const timer = window.setTimeout(() => completeRef.current?.(burst.id), 1900);
    return () => window.clearTimeout(timer);
  }, [burst.id]);

  if (!position) return null;
  return <div className={`harvest-burst harvest-burst-${position.side}`} style={{ left: position.x, top: position.y }} aria-hidden="true">
    <div ref={layerRef} className="harvest-fx-layer"/>
    {burst.quantity > 0 && <span ref={receiptRef} className="harvest-yield-flyout">✧&nbsp; <b>+{burst.quantity} {harvestCropName(burst.species, burst.quantity)}</b></span>}
  </div>;
}
