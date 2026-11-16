import React from 'react';
import { STATIONERY_PLACEMENT } from './book-view.js';

const placement = Object.fromEntries(Object.entries(STATIONERY_PLACEMENT).flatMap(([tool, box]) =>
  Object.entries(box).map(([key, value]) => [`--${tool}-tool-${key}`, `${value}${key === 'rotation' ? 'deg' : 'px'}`])));

export default function TableStationery({ children, bookName = 'Grimoire' }) {
  return <div className="cg-stationery-tools" role="group" aria-label={`${bookName} stationery`} style={placement}>{children}</div>;
}
