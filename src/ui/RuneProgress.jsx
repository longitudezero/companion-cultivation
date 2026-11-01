import React from 'react';

const RUNES = 'ᚨ ᛒ ᛞ ᛖ ᚷ ᚺ ᛚ ᛗ ᛟ ᛈ ᚱ ᛊ ᛏ ᚢ ᚹ ᚲ';

export default function RuneProgress({ value, max, label, valueText, danger = false }) {
  const percent = Math.max(0, Math.min(100, value / max * 100));
  return <div className={`rune-progress${danger ? ' rune-progress-danger' : ''}`} role="progressbar"
    aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={valueText}>
    <i className="rune-progress-fill" style={{ width: `${percent}%` }}/>
    <span className="progress-runes" aria-hidden="true">{RUNES} {RUNES} {RUNES}</span>
  </div>;
}
