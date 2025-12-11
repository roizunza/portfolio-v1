import React from 'react';
import { smoothScrollTo } from '../utils/scroll';
import { FONTS, COLORS } from '../config/theme';

const Header = ({ alDarClicEnContacto }) => {
  const lista_menu = ["Proyectos", "Sobre_Mi", "CV", "Contacto"];

  const manejarNavegacion = (seccion) => {
    if (seccion === "CV") {
      window.open('/assets/cv_actual.pdf', '_blank');
    } else if (seccion === "Contacto") {
      if (alDarClicEnContacto) alDarClicEnContacto();
    } else {
      smoothScrollTo(seccion, 2000);
    }
  };

  return (
    <header className="header-container" style={{ backgroundColor: COLORS.background.header, borderBottom: `1px solid ${COLORS.ui.border}` }}>
      
      <div className="header-branding">
        <h1 className="header-title" style={{ fontFamily: FONTS.main, color: COLORS.text.header }}>
          IZUNZA ROCÍO
        </h1>
        <p className="header-subtitle" style={{ fontFamily: FONTS.main, color: COLORS.text.header, opacity: 0.8 }}>
          PORTFOLIO_V2025
        </p>
      </div>

      <nav className="header-nav" style={{ fontFamily: FONTS.data, color: COLORS.text.header }}>
        <span style={{ opacity: 0.8, marginRight: '8px' }}>menu = [</span>
        {lista_menu.map((elemento, indice) => (
          <span key={elemento}>
            <button 
              onClick={() => manejarNavegacion(elemento)} 
              className="nav-btn"
              style={{ color: 'inherit', fontFamily: 'inherit' }} 
            >
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