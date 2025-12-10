import React from 'react';
import '../Shared/ProjectDashboardLayout.css'; // Usamos el CSS Maestro estandarizado

// Importación de Componentes Internos
import Sidebar from './Sidebar';
import Scorecards from './Scorecards';
import MapComponent from './MapComponent'; 
import GraphsPanel from './GraphsPanel';

const AlgoritmoInmobiliarioView = () => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. SIDEBAR (Izquierda - Narrativa y Contexto) */}
      <div className="panel area-sidebar">
        <Sidebar />
      </div>

      {/* 2. SCORECARDS (Centro Arriba - KPIs de Impacto) */}
      <div className="area-scorecards">
        <Scorecards />
      </div>

      {/* 3. MAPA PRINCIPAL (Derecha Arriba - Geoespacial) */}
      {/* Aquí se renderiza tu mapa con las capas de precios y puntos Airbnb */}
      <div className="panel area-top" style={{ position: 'relative' }}>
         <MapComponent />
      </div>

      {/* 4. GRÁFICOS (Derecha Abajo - Análisis Estadístico) */}
      {/* Aquí se renderiza el Scatter Plot y el Ranking de extracción */}
      <div className="panel area-bottom">
         <GraphsPanel />
      </div>

    </div>
  );
};

export default AlgoritmoInmobiliarioView;