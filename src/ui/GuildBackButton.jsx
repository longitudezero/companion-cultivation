import React from 'react';
import GameArt from './GameArt.jsx';

export default function GuildBackButton({ onClick }) {
  return <button className="guild-back" aria-label="Back to garden" onClick={onClick}><GameArt name="badgeBack" stretch/>
    <span className="back-arrow" aria-hidden="true">←</span><span>Back</span><i className="back-halo" aria-hidden="true"/>
  </button>;
}
