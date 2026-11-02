import React from 'react';
import { GoldVine } from './GoldVines.jsx';

export default function GuildHeader({ title, subtitle, decoration, backgroundImage, children }) {
  return <header className={`taskboard-header guild-modal-header${backgroundImage ? ' has-artwork' : ''}`}>
    {backgroundImage ? <img className="guild-header-art" src={backgroundImage} alt="" width="2048" height="592" draggable="false"/>
      : <><GoldVine className="header-vine"/><GoldVine corner="right" className="header-vine-right"/></>}
    {decoration}
    <div className="taskboard-heading"><span className="eyebrow">ADVENTURERS’ GUILD</span><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
    <div className="guild-header-actions">{children}</div>
  </header>;
}
