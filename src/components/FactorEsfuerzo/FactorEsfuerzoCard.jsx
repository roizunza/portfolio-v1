import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
import imgFactor from '../../assets/factoresfuerzo.png'; 
import { PROJECTS, COLORS } from '../../config/theme';

const FactorEsfuerzoCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="04_factor_esfuerzo_turistico"
      defColor={PROJECTS.factorEsfuerzo.color} 
      comment="// Japan Rail Analysis"
      image={imgFactor}
      onEjecutar={onEjecutar}
      onClose={onClose}
      
      // ESTANDARIZACIÓN
      customBgColor={COLORS.background.panel}
      customBtnColor={COLORS.ui.actionButton}
    >
      <p className="project-text" style={{ color: COLORS.text.secondary }}>
        La red ferroviaria japonesa, anclada por el Shinkansen, es el motor de la economía. 
        Sin embargo, esta eficiencia crea un fenómeno de centralización que margina activos culturales periféricos.
      </p>
      
      <p className="project-text" style={{ color: COLORS.text.secondary }}>
        Este proyecto mide el "Costo Oculto" de la eficiencia: la desigualdad de acceso y el esfuerzo 
        físico que el turista debe invertir para conectar con el patrimonio regional desconectado de la red principal.
      </p>
    </ProjectCard>
  );
};

export default FactorEsfuerzoCard;