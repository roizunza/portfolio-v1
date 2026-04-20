import React from 'react';
import ProjectCard from '../Shared/ProjectCard.jsx';
import imagenPortada from '../../assets/viajasegura.png'; 
import { PROJECTS } from '../../config/theme.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

const ViajaSeguraCard = ({ onEjecutar, onClose }) => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT.viajaSegura;

  return (
    <ProjectCard
      title={t.fileName}
      defColor={PROJECTS.viajaSegura.color}
      comment={idioma === 'es' ? "// Ingeniería de Datos Geoespaciales" : "// Geospatial Data Engineering"}
      image={imagenPortada}
      onEjecutar={onEjecutar}
      onClose={onClose}
      customBgColor="var(--fondo-panel)"
      customBtnColor="var(--azul-electrico)"
      btnText={t.ejecutar}
    >
       <p className="project-text">{t.cardDescription1}</p>
       <p className="project-text">{t.cardDescription2}</p>
    </ProjectCard>
  );
};

export default ViajaSeguraCard;