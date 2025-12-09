import React from 'react';
import './ProjectDashboardLayout.css';

const ProjectDashboardLayout = ({ sidebarContent, mapContent, scorecardsContent, chartsContent }) => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. PANEL IZQUIERDO (Sidebar) */}
      <aside className="panel area-sidebar">
        {sidebarContent}
      </aside>

      {/* 2. PANEL CENTRAL (Scorecards Verticales) */}
      <div className="panel area-scorecards" style={{ border: 'none', background: 'transparent' }}>
        {scorecardsContent}
      </div>

      {/* 3. PANEL DERECHO SUPERIOR (Mapa) */}
      <section className="panel area-top">
        {mapContent}
      </section>

      {/* 4. PANEL DERECHO INFERIOR (Gráficas) */}
      <section className="panel area-bottom">
        {chartsContent}
      </section>

    </div>
  );
};

export default ProjectDashboardLayout;