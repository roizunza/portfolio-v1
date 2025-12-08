import React from 'react';

// 1. Importamos el Molde Maestro
import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout';

// 2. Importamos las piezas específicas de ESTE proyecto
// Nota: Ajusta los "../" si tus datos están en src/data
import Sidebar from './Sidebar';
import MapComponent from './MapComponent';
import Scorecards from './Scorecards';
import ChartsContainer from './ChartsContainer';

const ViajaSeguraView = () => {
  return (
    <ProjectDashboardLayout
      sidebarContent={<Sidebar />}
      mapContent={<MapComponent />}
      scorecardsContent={<Scorecards />}
      chartsContent={<ChartsContainer />}
    />
  );
};

export default ViajaSeguraView;