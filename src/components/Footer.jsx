import React from 'react';
import { FONTS, COLORS } from '../config/theme';

const Footer = () => {
  return (
    <footer 
      className="footer-container" 
      style={{ 
        backgroundColor: COLORS.background.footer, 
        borderTop: `1px solid ${COLORS.ui.border}` 
      }}
    >
      <div className="footer-content" style={{ fontFamily: FONTS.main, color: '#8a8a8a' }}>
        
        {/* Ruta para Escritorio */}
        <span className="ruta-desktop" style={{ opacity: 0.6, marginRight: '8px' }}>
          C:\Users\Rocio\Desktop\portfolio_v2025&gt;
        </span>

        {/* Ruta para Celular */}
        <span className="ruta-mobile" style={{ opacity: 0.6, marginRight: '5px' }}>
          ~\portfolio_v2025&gt;
        </span>

        {/* Estado del sistema */}
        <span>
          system_ready. waiting_for_click...
        </span>

        {/* Cursor Parpadeante */}
        <span className="cursor-terminal" style={{ backgroundColor: '#ffffff' }}></span>

      </div>
    </footer>
  );
};

export default Footer;