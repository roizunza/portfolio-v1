import React from 'react';
import { FONTS, COLORS } from '../config/theme';

const Footer = () => {
  return (
    <footer 
      className="footer-container" 
      style={{ 
        backgroundColor: COLORS.background.header, // Mantengo el color oscuro del header/dashboard
        borderTop: `1px solid ${COLORS.ui.border}`,
        padding: '12px 40px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <style>{`
        .footer-content {
          font-size: 13px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .ruta-desktop { display: inline; }
        .ruta-mobile { display: none; }

        .cursor-terminal {
          display: inline-block;
          width: 8px;
          height: 15px;
          margin-left: 6px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Ajustes para Celular */
        @media (max-width: 768px) {
          .footer-container {
            padding: 12px 15px !important;
          }
          .footer-content {
            font-size: 11px;
          }
          .ruta-desktop { display: none; }
          .ruta-mobile { display: inline; }
          .cursor-terminal {
            height: 12px;
            width: 6px;
          }
        }
      `}</style>

      <div className="footer-content" style={{ fontFamily: FONTS.codigo, color: '#8a8a8a' }}>
        
        {/* Ruta para Escritorio */}
        <span className="ruta-desktop" style={{ opacity: 0.6, marginRight: '8px' }}>
          C:\Users\Rocio\Desktop\portfolio_v2026&gt;
        </span>

        {/* Ruta para Celular */}
        <span className="ruta-mobile" style={{ opacity: 0.6, marginRight: '5px' }}>
          ~\portfolio_v2026&gt;
        </span>

        {/* Estado del sistema */}
        <span style={{ color: '#b0b3b8' }}>
          system_ready. waiting_for_click...
        </span>

        {/* Cursor Parpadeante */}
        <span className="cursor-terminal" style={{ backgroundColor: '#8a8a8a' }}></span>

      </div>
    </footer>
  );
};

export default Footer;