import React from 'react';
import '../Shared/ProjectDashboardLayout.css'; 

import Sidebar from './AlgoritmoInmobiliarioSidebar';
import Scorecards from './AlgoritmoInmobiliarioScorecards';
import MapComponent from './AlgoritmoInmobiliarioMap'; 
import GraphsPanel from './AlgoritmoInmobiliarioGraphs';

const AlgoritmoInmobiliarioView = () => {
  return (
    <div className="dashboard-grid">
      
      {/* 1. SIDEBAR */}
      <div className="panel area-sidebar">
        <Sidebar />
      </div>

      {/* 2. SCORECARDS */}
      <div className="area-scorecards">
        <Scorecards />
      </div>

      {/* 3. MAP */}
      <div className="panel area-top" style={{ position: 'relative' }}>
         <MapComponent />
      </div>

      {/* 4. GRÁFICOS*/}
      <div className="panel area-bottom">
         <GraphsPanel />
      </div>

    </div>
  );
};

export default AlgoritmoInmobiliarioView;