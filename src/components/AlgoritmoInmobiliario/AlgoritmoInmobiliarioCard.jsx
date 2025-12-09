import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
// Importamos la imagen exacta que pediste (.png)
import imgAlgoritmo from '../../assets/algoritmoinmobiliario.png';

const AlgoritmoInmobiliarioCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="03_algoritmo_inmobiliario"
      defColor="#FF5A60"  // Rojo Airbnb
      comment="// Escala Metropoli"
      image={imgAlgoritmo}
      onEjecutar={onEjecutar}
      onClose={onClose}
    >
      <p className="project-text">
        Hong Kong, Región Administrativa Especial de China, opera como un ecosistema autónomo definido por su 
        hiperdensidad y su rol crítico en las finanzas globales. En este paisaje de rascacielos, donde el suelo 
        es el recurso más escaso, la irrupción de Airbnb actuó como un catalizador de polarización económica.
      </p>
      
      <p className="project-text">
        Este análisis transforma datos abiertos en un diagnóstico territorial para tangibilizar los patrones 
        mediante los cuales la oferta de alquiler a corto plazo ha reconfigurado el mercado de vivienda de la metrópoli.
      </p>
    </ProjectCard>
  );
};

export default AlgoritmoInmobiliarioCard;