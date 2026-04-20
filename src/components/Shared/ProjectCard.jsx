import React from 'react';
import './ProjectCard.css'; 

const ProjectCard = ({ 
  title, defColor, comment, image, onEjecutar, onClose, children,
  customBgColor, customBtnColor, btnText 
}) => {
  
  const cardStyle = {
    backgroundColor: customBgColor || 'var(--fondo-panel)',
    borderColor: 'var(--borde-sutil)'
  };

  const btnStyle = {
    backgroundColor: customBtnColor || 'var(--azul-electrico)',
    fontFamily: 'var(--fuente-codigo)',
    color: 'var(--texto-principal)'
  };

  return (
    <div className="project-detail-container" style={cardStyle}>
      <div className="card-window-bar" style={{ backgroundColor: 'var(--fondo-app)', borderBottomColor: 'var(--borde-sutil)' }}>
        <div className="window-title" style={{ fontFamily: 'var(--fuente-datos)', color: 'var(--texto-secundario)' }}>
          <span>📂</span> {title}
        </div>
        <div className="window-close-btn" onClick={onClose} style={{ color: 'var(--texto-principal)' }}>[ X ]</div>
      </div>
      
      <img src={image} alt={title} className="project-hero-image" style={{ borderBottomColor: 'var(--borde-sutil)' }} />

      <div className="project-content">
        <div className="code-header" style={{ fontFamily: 'var(--fuente-codigo)' }}>
          <span style={{ color: defColor, fontWeight: 'bold' }}>def():</span>
          <span style={{ color: 'var(--texto-principal)', marginLeft: '10px' }}>{title}</span>
        </div>

        <div className="project-location-comment" style={{ fontFamily: 'var(--fuente-codigo)', color: 'var(--color-comment)' }}>
          {comment}
        </div>

        <div className="project-description" style={{ fontFamily: 'var(--fuente-ui)', color: 'var(--texto-secundario)' }}>
          {children}
        </div>

        <button className="execute-button" onClick={onEjecutar} style={btnStyle}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;