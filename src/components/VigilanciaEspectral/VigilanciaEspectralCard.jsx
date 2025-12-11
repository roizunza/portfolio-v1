import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
import imgVigilancia from '../../assets/vigilanciaespectral.png';

const VigilanciaEspectralCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="02_vigilancia_espectral"
      defColor="#15BE80" 
      comment="// Escala municipal"
      image={imgVigilancia}
      onEjecutar={onEjecutar}
      onClose={onClose}
    >
      <p className="project-text">
        En el municipio de Dorado, al norte de Puerto Rico, la costa enfrenta una fractura: 
        aunque la playa es legalmente un bien de uso público, los desarrollos inmobiliarios 
        han impuesto una privatización de facto.
      </p>
      
      <p className="project-text">
        Este análisis utiliza monitoreo satelital para auditar el territorio. Se identifica 
        cómo se instrumentaliza el propio entorno natural y la arquitectura para bloquear 
        los accesos públicos terrestres, evidenciando una exclusión que separa a la comunidad 
        de su derecho al disfrute de la playa.
      </p>
    </ProjectCard>
  );
};

export default VigilanciaEspectralCard;