import React from 'react';

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      {icon && <div className="stats-icon">{icon}</div>}
      <div className="stats-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}
