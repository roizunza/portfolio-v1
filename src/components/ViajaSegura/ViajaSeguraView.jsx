import React from 'react';
import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout.jsx';
import Sidebar from './ViajaSeguraSidebar.jsx';
import MapComponent from './ViajaSeguraMap.jsx';
import Scorecards from './ViajaSeguraScorecards.jsx';
import ChartsContainer from './ViajaSeguraGraphs.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const ViajaSeguraView = () => {
  const { t: fullT } = useLanguage();
  const t = fullT.viajaSegura;

  if (!t) return null;

  return (
    <ProjectDashboardLayout
      sidebarContent={<Sidebar t={t} />}
      mapContent={<MapComponent t={t} />} 
      scorecardsContent={<Scorecards t={t} />}
      chartsContent={<ChartsContainer t={t} />} 
    />
  );
};

export default ViajaSeguraView;