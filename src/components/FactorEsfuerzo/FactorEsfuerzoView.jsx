import React from 'react';
import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout.jsx';
import Sidebar from './FactorEsfuerzoSidebar.jsx';
import MapComponent from './FactorEsfuerzoMap.jsx';
import Scorecards from './FactorEsfuerzoScorecards.jsx';
import ChartsContainer from './FactorEsfuerzoGraphs.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const FactorEsfuerzoView = () => {
  const { t: fullT } = useLanguage();
  const t = fullT.factorEsfuerzo;

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

export default FactorEsfuerzoView;