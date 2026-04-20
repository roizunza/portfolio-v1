import React from 'react';
import ProjectDashboardLayout from '../Shared/ProjectDashboardLayout.jsx';
import Sidebar from './VigilanciaEspectralSidebar.jsx';
import MapComponent from './VigilanciaEspectralMap.jsx';
import Scorecards from './VigilanciaEspectralScorecards.jsx';
import RasterVisor from './VigilanciaEspectralRasterVisor.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';

const VigilanciaEspectralView = () => {
  const { t: fullT } = useLanguage();
  const t = fullT.vigilancia;

  if (!t) return null;

  return (
    <ProjectDashboardLayout
      sidebarContent={<Sidebar t={t} />}
      mapContent={<MapComponent t={t} />}
      scorecardsContent={<Scorecards t={t} />}
      chartsContent={<RasterVisor t={t} />}
    />
  );
};

export default VigilanciaEspectralView;