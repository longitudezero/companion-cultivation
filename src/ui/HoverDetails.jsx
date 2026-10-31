import React, { useLayoutEffect, useRef, useState } from 'react';

export default function HoverDetails({ id, title, subtitle, lines, anchor }) {
  const card = useRef(null), [position, setPosition] = useState({ left: -1000, top: 8 });
  useLayoutEffect(() => {
    const rect = card.current.getBoundingClientRect();
    const left = Math.max(8, Math.min(anchor.left, window.innerWidth - rect.width - 8));
    const top = anchor.top - rect.height - 10;
    setPosition({ left, top: Math.max(8, Math.min(top >= 8 ? top : anchor.bottom + 10, window.innerHeight - rect.height - 8)) });
  }, [title, lines.join('|'), anchor.left, anchor.top]);
  return <aside ref={card} className="inventory-tooltip field-tooltip" role="tooltip" id={id} style={position}>
    <header><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</header>
    <div className="inventory-tooltip-body">{lines.map((line, index) => <p key={index}>{line}</p>)}</div>
  </aside>;
}
