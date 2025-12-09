import React from 'react';
// Importamos la función de scroll lento
import { smoothScrollTo } from '../utils/scroll';

const Header = ({ alDarClicEnContacto }) => {
  const lista_menu = ["Proyectos", "Sobre_Mi", "CV", "Contacto"];

  const manejarNavegacion = (seccion) => {
    if (seccion === "CV") {
      window.open('/assets/cv_actual.pdf', '_blank');
    } else if (seccion === "Contacto") {
      if (alDarClicEnContacto) alDarClicEnContacto();
    } else {
      // Usamos el scroll lento personalizado (2000ms = 2 segundos)
      smoothScrollTo(seccion, 2000);
    }
  };

  return (
    <header className="header-container">
      <div className="header-branding">
        <h1 className="header-title">IZUNZA ROCÍO</h1>
        <p className="header-subtitle">PORTFOLIO_V2025</p>
      </div>

      <nav className="header-nav">
        <span style={{ opacity: 0.8, marginRight: '8px' }}>menu = [</span>
        {lista_menu.map((elemento, indice) => (
          <span key={elemento}>
            <button onClick={() => manejarNavegacion(elemento)} className="nav-btn">
              "{elemento}"
            </button>
            {indice < lista_menu.length - 1 && <span style={{ opacity: 0.8 }}>, </span>}
          </span>
        ))}
        <span style={{ opacity: 0.8, marginLeft: '8px' }}>]</span>
      </nav>
    </header>
  );
};

export default Header;