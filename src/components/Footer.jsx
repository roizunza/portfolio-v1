import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container">
      
      <div className="footer-content">
        
        {/* Ruta para Escritorio (Completa) */}
        <span className="ruta-desktop" style={{ opacity: 0.6, marginRight: '8px' }}>
          C:\Users\Rocio\Desktop\portfolio_v2025&gt;
        </span>

        {/* Ruta para Celular (Abreviada para ahorrar espacio) */}
        <span className="ruta-mobile" style={{ opacity: 0.6, marginRight: '5px' }}>
          ~\portfolio_v2025&gt;
        </span>

        {/* Estado del sistema */}
        <span>
          system_ready. waiting_for_click...
        </span>

        {/* Cursor Parpadeante */}
        <span className="cursor-terminal"></span>

      </div>

    </footer>
  );
};

export default Footer;