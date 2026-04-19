import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
import imagenPortada from '../../assets/viajasegura.png'; 
import { PROJECTS, COLORS } from '../../config/theme';

/**
 * Viaja Segura Card Component
 * Project: Geospatial Data Engineering / Mobility Analysis
 * Description: Highlights the transition from analog operations to structured data models.
 */

const ViajaSeguraCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="01_viaja_segura"
      defColor={PROJECTS.viajaSegura.color}
      comment="// Geospatial Data Engineering"
      image={imagenPortada}
      onEjecutar={onEjecutar}
      onClose={onClose}
      
      customBgColor={COLORS.background.panel}  
      customBtnColor={COLORS.background.header} 
    >
      <p className="project-text">
        Transformación de operaciones analógicas en la periferia alta del sur de la CDMX 
        en un modelo de datos estructurado para la validación técnica de servicios de transporte.
      </p>
      
      <p className="project-text">
        El análisis implementa flujos <strong>ETL</strong> y modelado <strong>GIS</strong> para correlacionar flujos 
        de movilidad con nodos de equipamiento urbano relacionados con el cuidado, generando la evidencia necesaria para la toma de decisiones estratégicas.
      </p>
    </ProjectCard>
  );
};

export default ViajaSeguraCard;