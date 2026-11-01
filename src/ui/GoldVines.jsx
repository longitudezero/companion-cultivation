import React, { useId } from 'react';

// A single warm-gold hue with tonal shading; source alpha and files stay intact.
export function GoldVine({ corner = 'top', className = '' }) {
  const tone = useId();
  return <svg className={`gold-vine ${className}`} viewBox="0 0 1448 1086" aria-hidden="true" focusable="false">
    <defs><filter id={tone} colorInterpolationFilters="sRGB">
      <feColorMatrix type="matrix" values=".051024 .171648 .017328 0 .68 .05315 .1788 .01805 0 .60 .044646 .150192 .015162 0 .40 0 0 0 1 0"/>
    </filter></defs>
    <image href={`${import.meta.env?.BASE_URL || '/'}ui/ivy-${corner}-left.png`} width="1448" height="1086" filter={`url(#${tone})`}/>
  </svg>;
}

export default function SlotVines() {
  return <div className="slot-vines" aria-hidden="true"><GoldVine className="vine-top"/><GoldVine corner="bottom" className="vine-bottom"/></div>;
}
