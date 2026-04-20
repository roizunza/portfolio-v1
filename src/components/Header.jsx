import React from 'react';
import { smoothScrollTo } from '../utils/scroll';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.jsx';

const Header = ({ alDarClicEnContacto }) => { 
  const { idioma, setIdioma, t } = useLanguage(); 
  const navTexts = t.nav;
  
  const lista_menu = [
    { label: navTexts.proyectos, id: "Proyectos" },
    { label: navTexts.formacion, id: "formacion-tecnica-seccion" },
    { label: navTexts.Sobre_Mi, id: "Sobre_Mi" },
    { label: "CV", id: "CV" },
    { label: navTexts.contacto, id: "Contacto" }
  ];

  const manejarNavegacion = (item) => {
    if (item.id === "CV") {
      const rutaCV = idioma === 'en' ? '/assets/cv_en.pdf' : '/assets/cv_es.pdf';
      window.open(rutaCV, '_blank');
    } else if (item.id === "Contacto") {
      if (alDarClicEnContacto) alDarClicEnContacto(); 
    } else {
      smoothScrollTo(item.id, 2000);
    }
  };

  return (
    <header className="header-container" style={{ 
      backgroundColor: 'var(--azul-electrico)', 
      borderBottom: '1px solid var(--borde-sutil)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)', 
      alignItems: 'center',
      padding: '0 40px',
      height: '75px',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxSizing: 'border-box'
    }}>
      <style>{`
        .lang-pill { display: flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.08); padding: 6px 12px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.15); }
        .lang-option { padding: 2px 6px; border-radius: 4px; transition: all 0.3s ease; cursor: pointer; font-size: 13px; font-family: var(--fuente-datos); }
        .lang-active { background-color: rgba(255, 255, 255, 0.2); color: #FFF !important; font-weight: 700 !important; }
        @media (max-width: 768px) {
          .header-container { padding: 0 10px !important; grid-template-columns: 1.2fr 0.8fr 3fr !important; }
          .header-subtitle, .nav-syntax { display: none !important; }
          .header-title { font-size: 0.85rem !important; }
          .header-nav { font-size: 10px !important; gap: 4px !important; }
          .lang-pill { padding: 4px 6px; gap: 4px; }
          .lang-option { font-size: 10px; }
          .globe-icon { font-size: 14px !important; }
        }
      `}</style>
      
      <div className="header-branding" style={{ gridColumn: '1', justifySelf: 'start' }}>
        <h1 className="header-title" style={{ fontFamily: 'var(--fuente-codigo)', color: 'var(--texto-principal)', margin: 0, fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
          IZUNZA ROCIO
        </h1>
        <p className="header-subtitle" style={{ fontFamily: 'var(--fuente-codigo)', color: 'var(--texto-principal)', opacity: 0.8, fontSize: '0.65rem', margin: 0 }}>
          PORTFOLIO_V2026
        </p>
      </div>

      <div className="language-switch" style={{ gridColumn: '2', justifySelf: 'center' }}>
        <div className="lang-pill">
          <FaGlobeAmericas className="globe-icon" style={{ color: '#FFF', opacity: 0.8, fontSize: '17px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span onClick={() => setIdioma('es')} className={`lang-option ${idioma === 'es' ? 'lang-active' : ''}`} style={{ color: idioma === 'es' ? '#FFF' : '#666' }}>ES</span>
            <span style={{ color: '#333', margin: '0 1px' }}>|</span>
            <span onClick={() => setIdioma('en')} className={`lang-option ${idioma === 'en' ? 'lang-active' : ''}`} style={{ color: idioma === 'en' ? '#FFF' : '#666' }}>EN</span>
          </div>
        </div>
      </div>

      <nav className="header-nav" style={{ gridColumn: '3 / 6', fontFamily: 'var(--fuente-datos)', color: 'var(--texto-principal)', justifySelf: 'end', display: 'flex', alignItems: 'center' }}>
        <span className="nav-syntax" style={{ opacity: 0.5, marginRight: '4px' }}>menu = [</span>
        {lista_menu.map((item, indice) => (
          <span key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => manejarNavegacion(item)} className="nav-btn" style={{ color: 'inherit', fontFamily: 'inherit', background: 'none', border: 'none', cursor: 'pointer', padding: '0 3px', fontSize: 'inherit' }}>
              "{item.label}"
            </button>
            {indice < lista_menu.length - 1 && <span className="nav-syntax" style={{ opacity: 0.5 }}>, </span>}
          </span>
        ))}
        <span className="nav-syntax" style={{ opacity: 0.5, marginLeft: '4px' }}>]</span>
      </nav>
    </header>
  );
};

export default Header;