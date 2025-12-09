import React from 'react';
import './ViajaSeguraCard.css';
import imagenPortada from '../../assets/viajasegura.jpg'; 

// Recibimos "onClose" como prop
const ViajaSeguraCard = ({ onEjecutar, onClose }) => {
  return (
    <div className="project-detail-container">
      
      {/* 1. BARRA DE VENTANA (NUEVO) */}
      <div className="card-window-bar">
        <div className="window-title">
          <span>📂</span> viaja_segura_analysis.py
        </div>
        {/* Botón de Cerrar explícito */}
        <div className="window-close-btn" onClick={onClose}>
          [ X ]
        </div>
      </div>
      
      {/* 2. IMAGEN PRINCIPAL */}
      <img 
        src={imagenPortada} 
        alt="Ilustración Viaja Segura" 
        className="project-hero-image" 
      />

      {/* 3. CONTENIDO SCROLLEABLE */}
      <div className="project-content">
        
        {/* Definición Técnica */}
        <div className="project-definition">
          <span className="keyword">const</span> proyecto = {'{'}
          <span style={{color: '#ce9178', marginLeft: '8px'}}>"id": "VS_01"</span>,
          <span style={{color: '#ce9178', marginLeft: '8px'}}>"status": "Active"</span>
          {'}'};
        </div>

        {/* Descripción */}
        <div className="project-description">
          <div className="project-location">// UBICACIÓN: PERIFERIA SUR CDMX</div>
          
          <p className="project-text">
            Este proyecto evalúa la iniciativa de la Asociación Civil Ruta 66, operando un servicio exclusivo 
            para mujeres e infancias.
          </p>
          
          <p className="project-text">
            A través del análisis geoespacial, construí el sustento operativo que legitimó el modelo ante SEMOVI,
            traduciendo la experiencia de viaje en modelos de accesibilidad.
          </p>
        </div>

        {/* Botón de Ejecución */}
        <button className="execute-button" onClick={onEjecutar}>
          EJECUTAR ANÁLISIS
        </button>

      </div>
    </div>
  );
};

export default ViajaSeguraCard;