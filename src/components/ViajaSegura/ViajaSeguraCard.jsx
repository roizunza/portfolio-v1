import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
import imagenPortada from '../../assets/viajasegura.jpg'; 
import { PROJECTS, COLORS } from '../../config/theme';

const ViajaSeguraCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="01_viaja_segura"
      defColor={PROJECTS.viajaSegura.color}
      comment="// Escala local"
      image={imagenPortada}
      onEjecutar={onEjecutar}
      onClose={onClose}
      
      customBgColor={COLORS.background.panel}  
      customBtnColor={COLORS.background.header} 
    >
      <p className="project-text">
        Para comunidades como Oyamel, Antigua y Ocotal, situadas en la periferia alta del sur de la CDMX, 
        el transporte público concesionado es el medio inmediato para conectarse con la ciudad.
      </p>
      
      <p className="project-text">
        Este proyecto evalúa el programa "Viaja Segura", una iniciativa social de la Ruta 66 que ofrece 
        servicio exclusivo para mujeres e infancias. El análisis vincula estos recorridos con los 
        equipamientos de cuidado, necesarios para sostener la vida.
      </p>
    </ProjectCard>
  );
};

export default ViajaSeguraCard;