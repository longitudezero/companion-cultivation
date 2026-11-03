import React from 'react';
import { stationeryArt } from './stationery-art.js';

export const paperStyle = paper => ({ '--paper-ratio': paper.width / paper.height,
  '--text-inset': paper.inset.map(value => `${value}%`).join(' ') });
export function Paper({ paper, text, children, className = '' }) {
  return <div className={`cg-note-paper ${className}`} style={paperStyle(paper)}>
    <img src={stationeryArt(paper.file)} alt="" draggable="false"/>
    {text && <div className="cg-paper-writing">{text}</div>}{children}
  </div>;
}
