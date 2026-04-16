import React from 'react';
import ProjectCard from '../Shared/ProjectCard';

const CertificacionesCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="Academic Dashboard"
      defColor="#00E5FF" // Turquesa
      comment="// Registro formal de competencias técnicas y formación continua"
      onEjecutar={onEjecutar}
      onClose={onClose}
    >
      <p>
        Consola interactiva que desglosa más de 400 horas de formación especializada 
        en <strong>Data Science, Geointeligencia y Desarrollo de Software</strong>. 
        Incluye certificaciones de Alura LATAM y el Diplomado en Digitalización del Transporte (GIZ/INAFED).
      </p>
    </ProjectCard>
  );
};

export default CertificacionesCard;