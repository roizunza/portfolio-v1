import React from 'react';
import ProjectCard from '../Shared/ProjectCard.jsx';
import imgFactor from '../../assets/factoresfuerzo.png'; 
import { PROJECTS } from '../../config/theme';
import { useLanguage } from '../../context/LanguageContext.jsx';

const FactorEsfuerzoCard = ({ onEjecutar, onClose }) => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT.factorEsfuerzo;

  return (
    <ProjectCard
      title={t.fileName}
      defColor={PROJECTS.factorEsfuerzo.color} 
      comment={idioma === 'es' ? "// Análisis Ferroviario" : "// Rail Analysis"}
      image={imgFactor}
      onEjecutar={onEjecutar}
      onClose={onClose}
      customBgColor="var(--fondo-panel)"
      customBtnColor="var(--azul-electrico)"
      btnText={t.ejecutar}
    >
      <p className="project-text" style={{ color: 'var(--texto-secundario)' }}>
        {t.cardDescription1}
      </p>
      
      <p className="project-text" style={{ color: 'var(--texto-secundario)' }}>
        {t.cardDescription2}
      </p>
    </ProjectCard>
  );
};

export default FactorEsfuerzoCard;