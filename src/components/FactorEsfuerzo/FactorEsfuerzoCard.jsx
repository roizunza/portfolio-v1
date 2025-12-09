import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
// Importamos la imagen exacta (.png)
import imgFactor from '../../assets/factoresfuerzo.png';

const FactorEsfuerzoCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="04_factor_esfuerzo_turistico"
      defColor="#EE0E99"  // Rosa Fosfo
      comment="// Escala Regional"
      image={imgFactor}
      onEjecutar={onEjecutar}
      onClose={onClose}
    >
      <p className="project-text">
        La red ferroviaria japonesa, anclada por el Shinkansen (Tren Bala), es el principal modo de 
        desplazamiento entre regiones. Sin embargo, en el turismo, su operación genera un costo oculto: 
        la desigualdad de acceso a puntos de interés en zonas que no están conectadas directamente a la red.
      </p>
      
      <p className="project-text">
        Este proyecto calcula el "Factor de Esfuerzo Turístico", una métrica para medir el aislamiento 
        que analiza cómo la infraestructura de alta velocidad centraliza las oportunidades, dejando aislados 
        a los activos turísticos de las regiones rurales.
      </p>
    </ProjectCard>
  );
};

export default FactorEsfuerzoCard;