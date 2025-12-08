import React from 'react';
import './ViajaSeguraCard.css';
import imagenPortada from '../../assets/viajasegura.jpg'; // Ajusta la ruta si es necesario

const ViajaSeguraCard = ({ onEjecutar }) => {
  return (
    <div className="project-detail-container">
      
      {/* 1. IMAGEN PRINCIPAL */}
      <img 
        src={imagenPortada} 
        alt="Ilustración Viaja Segura" 
        className="project-hero-image" 
      />

      <div className="project-content">
        
        {/* 2. DEFINICIÓN TÉCNICA */}
        <div className="project-definition">
          <span className="keyword">const</span> proyecto = {'{'}
          <span style={{color: '#ce9178', marginLeft: '8px'}}>"id": "VS_01"</span>,
          <span style={{color: '#ce9178', marginLeft: '8px'}}>"tipo": "Evaluación de Política Pública"</span>
          {'}'};
        </div>

        {/* 3. DESCRIPCIÓN */}
        <div className="project-description">
          <div className="project-location">// UBICACIÓN: PERIFERIA SUR CDMX</div>
          
          <p className="project-text">
            Este proyecto evalúa la iniciativa de la Asociación Civil Ruta 66, que opera un servicio exclusivo 
            para mujeres e infancias. A través del análisis de datos geoespaciales, construí el sustento 
            operativo que permitió legitimar el modelo ante SEMOVI.
          </p>
          
          <p className="project-text">
            Traduje la experiencia de viaje cotidiana en información cuantificable, generando modelos de 
            accesibilidad y analizando la demanda real del servicio.
          </p>
        </div>

        {/* 4. BOTÓN DE EJECUCIÓN */}
        <button className="execute-button" onClick={onEjecutar}>
          EJECUTAR ANÁLISIS
        </button>

      </div>
    </div>
  );
};

export default ViajaSeguraCard;