import React from 'react';

import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout';
import Sidebar from './ViajaSeguraSidebar';
import MapComponent from './ViajaSeguraMap';
import Scorecards from './ViajaSeguraScorecards';
import ChartsContainer from './ViajaSeguraGraphs';

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