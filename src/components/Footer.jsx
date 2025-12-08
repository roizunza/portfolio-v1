import React from 'react';

const Footer = () => {
  const ruta_sistema = "C:\\Users\\Rocio\\Desktop\\portfolio_v2025>";

  const mensaje_estado = "system_ready. waiting_for_click...";

  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 'var(--altura-footer)', // 40px definidos en global
      backgroundColor: 'var(--fondo-terminal)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem', // padding: 8px 16px del CSS original
      zIndex: 1000,
      borderTop: '1px solid #333', // Detalle sutil para separar del fondo
      overflow: 'hidden' // Para evitar scroll si el texto es muy largo
    }}>
      
      {/* Contenedor del texto tipo terminal */}
      <div style={{
        fontFamily: 'var(--fuente-codigo)',
        fontSize: '0.85rem', // aprox 14px
        color: 'var(--texto-principal)',
        whiteSpace: 'nowrap', // Evita que el texto salte de línea
        display: 'flex',
        alignItems: 'center'
      }}>
        
        {/* La Ruta (Path) */}
        <span style={{ opacity: 0.6, marginRight: '8px' }}>
          {ruta_sistema}
        </span>

        {/* El Mensaje de Estado */}
        <span>
          {mensaje_estado}
        </span>

        {/* El Cursor Parpadeante (Clase definida en index.css) */}
        <span className="cursor-terminal"></span>

      </div>

    </footer>
  );
};

export default Footer;