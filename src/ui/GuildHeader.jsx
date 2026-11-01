import React from 'react';
import { GoldVine } from './GoldVines.jsx';

export default function GuildHeader({ title, subtitle, children }) {
  return <header className="taskboard-header guild-modal-header">
    <GoldVine className="header-vine"/>
    <div className="taskboard-heading"><span className="eyebrow">ADVENTURERS’ GUILD</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
    <div className="guild-header-actions">{children}</div>
  </header>;
}
