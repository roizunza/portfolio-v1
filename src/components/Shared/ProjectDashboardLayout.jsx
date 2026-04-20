import React from 'react';
import './ProjectDashboardLayout.css';

const ProjectDashboardLayout = ({ sidebarContent, mapContent, scorecardsContent, chartsContent }) => {
  return (
    <div className="dashboard-grid">
      
      <aside className="panel area-sidebar">
        {sidebarContent}
      </aside>

      <div className="panel area-scorecards" style={{ border: 'none', background: 'transparent' }}>
        {scorecardsContent}
      </div>

      <section className="panel area-top">
        {mapContent}
      </section>

      <section className="panel area-bottom">
        {chartsContent}
      </section>

    </div>
  );
};

export default ProjectDashboardLayout;