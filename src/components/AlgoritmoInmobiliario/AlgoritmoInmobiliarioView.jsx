import React from 'react';
import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout.jsx';
import Sidebar from './AlgoritmoInmobiliarioSidebar.jsx';
import MapComponent from './AlgoritmoInmobiliarioMap.jsx';
import Scorecards from './AlgoritmoInmobiliarioScorecards.jsx';
import ChartsContainer from './AlgoritmoInmobiliarioGraphs.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const AlgoritmoView = () => {
  const { t: fullT } = useLanguage();
  const t = fullT.algoritmo;

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

export default AlgoritmoView;