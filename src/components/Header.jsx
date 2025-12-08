import React from 'react';

const Header = ({ alDarClicEnContacto }) => {
  const lista_menu = ["Proyectos", "Sobre_Mi", "CV", "Contacto"];

  const manejarNavegacion = (seccion) => {
    if (seccion === "CV") {
      window.open('/assets/cv_actual.pdf', '_blank');
    } else if (seccion === "Contacto") {
      if (alDarClicEnContacto) alDarClicEnContacto();
    } else {
      const elemento = document.getElementById(seccion);
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
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