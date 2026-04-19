import React from 'react';
import ProjectCard from '../Shared/ProjectCard';
import imgAlgoritmo from '../../assets/algoritmoinmobiliario.png'; 
import { PROJECTS, COLORS } from '../../config/theme';

const AlgoritmoInmobiliarioCard = ({ onEjecutar, onClose }) => {
  return (
    <ProjectCard
      title="03_algoritmo_inmobiliario"
      defColor={PROJECTS.algoritmo.color} 
      comment="// Escala Metropoli"
      image={imgAlgoritmo}
      onEjecutar={onEjecutar}
      onClose={onClose}
      
      customBgColor={COLORS.background.panel}
      customBtnColor={COLORS.ui.actionButton}
    >
      <p className="project-text" style={{ color: COLORS.text.secondary }}>
        Hong Kong, Región Administrativa Especial de China, opera como un ecosistema autónomo definido por su 
        hiperdensidad y su rol crítico en las finanzas globales. En este paisaje de rascacielos, 
        la irrupción de Airbnb actuó como un catalizador de polarización económica.
      </p>
      
      <p className="project-text" style={{ color: COLORS.text.secondary }}>
        Este análisis transforma datos abiertos en un diagnóstico territorial para tangibilizar los patrones 
        mediante los cuales la oferta de alquiler a corto plazo ha reconfigurado el mercado de vivienda.
      </p>
    </ProjectCard>
  );
};

export default AlgoritmoInmobiliarioCard;