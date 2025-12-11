import React from 'react';
import './ProjectCard.css'; // Mantenemos el CSS para la estructura y el móvil
import { FONTS, COLORS } from '../../config/theme'; 

const ProjectCard = ({ 
  title,       
  defColor,    
  comment,     
  image,       
  onEjecutar, 
  onClose,
  children,
  // Props nuevas para forzar colores
  customBgColor,   // Para el fondo de la tarjeta
  customBtnColor   // Para el botón
}) => {
  
  // Estilos de la tarjeta (Sobrescriben al CSS)
  const cardStyle = {
    backgroundColor: customBgColor || COLORS.background.panel, // Usa el color del Hero (#1e121f) por defecto
    borderColor: COLORS.ui.border
  };

  // Estilos del botón (Sobrescriben al CSS)
  const btnStyle = {
    backgroundColor: customBtnColor || COLORS.background.header, // Usa el Azul Header (#0000ff) por defecto
    fontFamily: FONTS.main,
    color: '#FFFFFF'
  };

  return (
    <div className="project-detail-container" style={cardStyle}>
      
      {/* Header de la Ventana */}
      <div className="card-window-bar" style={{ backgroundColor: COLORS.background.sidebarHeader, borderBottomColor: COLORS.ui.border }}>
        <div className="window-title" style={{ fontFamily: FONTS.data, color: COLORS.text.secondary }}>
          <span>📂</span> {title}
        </div>
        <div className="window-close-btn" onClick={onClose} style={{ color: COLORS.text.primary }}>[ X ]</div>
      </div>
      
      {/* Imagen */}
      <img src={image} alt={title} className="project-hero-image" style={{ borderBottomColor: COLORS.ui.border }} />

      {/* Contenido */}
      <div className="project-content">
        
        <div className="code-header" style={{ fontFamily: FONTS.main }}>
          <span style={{ color: defColor, fontWeight: 'bold' }}>def():</span>
          <span style={{ color: COLORS.text.primary, marginLeft: '10px' }}>{title}</span>
        </div>

        <div className="project-location-comment" style={{ fontFamily: FONTS.main, color: COLORS.text.codeComment }}>
          {comment}
        </div>

        <div className="project-description" style={{ fontFamily: FONTS.body, color: COLORS.text.secondary }}>
          {children}
        </div>

        <button 
          className="execute-button" 
          onClick={onEjecutar} 
          style={btnStyle} // <--- Aquí aplicamos el Azul Header
        >
          EJECUTAR ANÁLISIS
        </button>

      </div>
    </div>
  );
};

export default ProjectCard;