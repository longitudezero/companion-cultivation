import React, { useId } from 'react';
import { EFFECT_DEFINITIONS } from './effects.js';

export function EffectTerm({ kind, glossary, children }) {
  const id = useId(), effect = EFFECT_DEFINITIONS[kind];
  if (!effect) return children;
  return <><button type="button" className="cg-effect-term" title={effect.summary} aria-describedby={id}
    onClick={event => glossary(kind, event.currentTarget)}>{children || effect.label}</button>
  <span id={id} className="cg-sr-only">{effect.summary} Open the effect glossary for details.</span></>;
}

export default function EffectText({ text, glossary }) {
  const match = Object.entries(EFFECT_DEFINITIONS).find(([, effect]) => text.includes(effect.label));
  if (!match) return text;
  const [kind, effect] = match, start = text.indexOf(effect.label);
  return <>{text.slice(0, start)}<EffectTerm kind={kind} glossary={glossary}>{effect.label}</EffectTerm>
    {text.slice(start + effect.label.length)}</>;
}
