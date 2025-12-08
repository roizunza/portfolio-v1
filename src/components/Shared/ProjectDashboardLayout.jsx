import React from 'react';
import './ProjectDashboardLayout.css';

// Este componente recibe las "piezas" como propiedades (props)
const ProjectDashboardLayout = ({ sidebarContent, mapContent, scorecardsContent, chartsContent }) => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. PANEL IZQUIERDO (Contexto) */}
      <aside className="panel area-sidebar">
        {sidebarContent}
      </aside>

      {/* 2. PANEL SUPERIOR (Mapa + KPIs) */}
      <section className="panel area-top" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, position: 'relative', minHeight: '0' }}>
          {mapContent}
        </div>
        
        {/* Barra de Scorecards integrada abajo del mapa */}
        <div style={{ 
          height: 'auto', 
          minHeight: '120px', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(21, 24, 35, 0.8)',
          zIndex: 10,
          padding: '10px 0',
          display: 'flex',
          alignItems: 'center'
        }}>
          {scorecardsContent}
        </div>
      </section>

      {/* 3. PANEL INFERIOR (Gráficas) */}
      <section className="panel area-bottom">
        {chartsContent}
      </section>

    </div>
  );
};

export default ProjectDashboardLayout;