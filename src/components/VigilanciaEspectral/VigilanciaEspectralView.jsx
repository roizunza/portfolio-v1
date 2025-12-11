import React from 'react';
import '../Shared/ProjectDashboardLayout.css'; // Usamos el CSS Maestro

import Sidebar from './VigilanciaEspectralSidebar';
import Scorecards from './VigilanciaEspectralScorecards';
import MapComponent from './VigilanciaEspectralMap'; // Tu mapa vectorial de arriba
import RasterVisor from './VigilanciaEspectralRasterVisor';   // <--- EL NUEVO COMPONENTE DE RASTERS

const VigilanciaEspectralView = () => {
  return (
    <div className="dashboard-grid">
      
      <div className="panel area-sidebar">
        <Sidebar />
      </div>
      <div className="area-scorecards">
        <Scorecards />
      </div>
      <div className="panel area-top">
        <MapComponent />
      </div>
      <div className="panel area-bottom">
        <RasterVisor />
      </div>

    </div>
  );
};

export default VigilanciaEspectralView;