import React from 'react';
import '../Shared/ProjectDashboardLayout.css'; // Usamos el CSS Maestro

import Sidebar from './Sidebar';
import Scorecards from './Scorecards';
import MapComponent from './MapComponent'; // Tu mapa vectorial de arriba
import RasterVisor from './RasterVisor';   // <--- EL NUEVO COMPONENTE DE RASTERS

const VigilanciaEspectralView = () => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. SIDEBAR (Izquierda) */}
      <div className="panel area-sidebar">
        <Sidebar />
      </div>

      {/* 2. SCORECARDS (Centro Arriba - KPI Flotantes) */}
      <div className="area-scorecards">
        <Scorecards />
      </div>

      {/* 3. MAPA PRINCIPAL (Derecha Arriba - Vectores) */}
      <div className="panel area-top">
        <MapComponent />
      </div>

      {/* 4. VISOR RASTER (Derecha Abajo - NDVI / NDWI) */}
      {/* Reemplaza a las gráficas de Viaja Segura */}
      <div className="panel area-bottom">
        <RasterVisor />
      </div>

    </div>
  );
};

export default VigilanciaEspectralView;