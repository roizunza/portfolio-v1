import React from 'react';
import ProjectCard from '../Shared/ProjectCard.jsx';
import imgVigilancia from '../../assets/vigilanciaespectral.png';
import { PROJECTS } from '../../config/theme.js';
import { useLanguage } from '../../context/LanguageContext.jsx';

const VigilanciaEspectralCard = ({ onEjecutar, onClose }) => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT.vigilancia;

  return (
    <ProjectCard
      title={t.fileName}
      defColor={PROJECTS.vigilancia.color} 
      comment={idioma === 'es' ? "// Auditoría de Datos Ambientales y ML" : "// Environmental Data Auditing & ML"}
      image={imgVigilancia}
      onEjecutar={onEjecutar}
      onClose={onClose}
      customBgColor="var(--fondo-panel)"
      customBtnColor="var(--azul-electrico)"
      btnText={t.ejecutar}
    >
      <p className="project-text">
        {t.cardDescription1}
      </p>
      
      <p className="project-text">
        {t.cardDescription2}
      </p>
    </ProjectCard>
  );
};

export default VigilanciaEspectralCard;