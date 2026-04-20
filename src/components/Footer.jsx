import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      height: 'var(--altura-footer)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'var(--fondo-app)',
      borderTop: '1px solid var(--borde-sutil)',
      color: 'var(--texto-muteado)',
      fontFamily: 'var(--fuente-datos)',
      fontSize: '0.75rem',
      padding: '0 20px',
      position: 'relative',
      zIndex: 10,
      width: '100%',
      marginTop: 'auto' // Esto empuja el footer al final si el contenido es corto
    }}>
      <span>{`>_ SYSTEM_STATUS: ONLINE // ROCÍO IZUNZA © 2026`}</span>
    </footer>
  );
};

export default Footer;