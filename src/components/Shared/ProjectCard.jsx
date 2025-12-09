import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ 
  title,       // Ej: "01_viaja_segura"
  defColor,    // Ej: "#A020F0"
  comment,     // Ej: "// Escala local"
  image,       // Import de la imagen
  onEjecutar, 
  onClose,
  children     // Aquí irán los párrafos de texto
}) => {
  return (
    <div className="project-detail-container">
      
      {/* Header */}
      <div className="card-window-bar">
        <div className="window-title">
          <span>📂</span> {title}
        </div>
        <div className="window-close-btn" onClick={onClose}>[ X ]</div>
      </div>
      
      {/* Imagen */}
      <img src={image} alt={title} className="project-hero-image" />

      {/* Contenido Dinámico */}
      <div className="project-content">
        
        <div className="code-header">
          <span style={{ color: defColor, fontWeight: 'bold' }}>def():</span>
          <span style={{ color: '#FFFFFF', marginLeft: '10px' }}>{title}</span>
        </div>

        <div className="project-location-comment">
          {comment}
        </div>

        <div className="project-description">
          {children}
        </div>

        <button className="execute-button" onClick={onEjecutar}>
          EJECUTAR ANÁLISIS
        </button>

      </div>
    </div>
  );
};

export default ProjectCard;