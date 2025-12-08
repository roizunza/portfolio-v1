import React from 'react';

const Header = () => {
  const lista_menu = ["Proyectos", "Sobre_Mi", "CV", "Contacto"];

  // Función placeholder para manejar los clics (la conectaremos después)
  const manejarNavegacion = (seccion) => {
    console.log(`Navegando a: ${seccion}`);
    // Aquí irá la lógica de scroll o descarga más adelante
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 'var(--altura-header)',
      backgroundColor: 'var(--azul-electrico)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      
      {/* Lado Izquierdo: Branding */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ 
          color: 'white', 
          fontFamily: 'var(--fuente-datos)', /* Roboto Mono */
          fontSize: '1.8rem',
          fontWeight: 700, 
          margin: 0,
          letterSpacing: '0.05em'
        }}>
          IZUNZA ROCÍO
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontFamily: 'var(--fuente-datos)', 
          fontSize: '0.75rem', 
          fontWeight: 500, 
          margin: 0,
          letterSpacing: '0.025em' 
        }}>
          PORTFOLIO_V2025
        </p>
      </div>

      {/* Lado Derecho: Menú estilo Código */}
      <nav style={{ 
        fontFamily: 'var(--fuente-codigo)', /* Source Code Pro */
        color: 'white', 
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <span style={{ opacity: 0.8, marginRight: '8px' }}>menu = [</span>
        
        {lista_menu.map((elemento, indice) => (
          <span key={elemento}>
            <button 
              onClick={() => manejarNavegacion(elemento)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                cursor: 'pointer',
                padding: '0 4px',
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              "{elemento}"
            </button>
            
            {/* Si no es el último elemento, agregamos una coma visual */}
            {indice < lista_menu.length - 1 && <span style={{ opacity: 0.8 }}>, </span>}
          </span>
        ))}
        
        <span style={{ opacity: 0.8, marginLeft: '8px' }}>]</span>
      </nav>
    </header>
  );
};

export default Header;