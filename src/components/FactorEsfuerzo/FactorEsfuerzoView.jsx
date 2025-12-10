import React from 'react';
import '../Shared/ProjectDashboardLayout.css'; // Layout estandarizado

// Importación de Componentes Internos
import Sidebar from './Sidebar';
import Scorecards from './Scorecards';

// [CORRECCIÓN] Descomentamos las importaciones reales
import MapComponent from './MapComponent'; 
import GraphsPanel from './GraphsPanel';   

const FactorEsfuerzoView = () => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. SIDEBAR (Izquierda - Narrativa) */}
      <div className="panel area-sidebar">
        <Sidebar />
      </div>

      {/* 2. SCORECARDS (Centro Arriba - KPIs) */}
      <div className="area-scorecards">
        <Scorecards />
      </div>

      {/* 3. MAPA PRINCIPAL (Derecha Arriba - Geoespacial) */}
      <div className="panel area-top" style={{ position: 'relative' }}>
         {/* [CORRECCIÓN] Renderizamos el componente real */}
         <MapComponent />
      </div>

      {/* 4. GRÁFICOS (Derecha Abajo - Análisis) */}
      <div className="panel area-bottom">
         {/* [CORRECCIÓN] Renderizamos el componente real */}
         <GraphsPanel />
      </div>

    </div>
  );
};

export default FactorEsfuerzoView;