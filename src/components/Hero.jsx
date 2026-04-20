import React from 'react';
import { FaGithub, FaLinkedin, FaFileDownload, FaPlug } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext.jsx';

// RECUPERAMOS LA PROP alAbrirTerminal
const Hero = ({ alAbrirTerminal }) => { 
  const { idioma, t } = useLanguage(); 
  const heroText = t.hero;
  
  const manejarClick = (accion, destino) => {
    if (accion === 'modal') {
      if (alAbrirTerminal) alAbrirTerminal(); 
    } else if (accion === 'link' || accion === 'descarga') {
      window.open(destino, '_blank'); 
    }
  };

  return (
    <section className="hero-section" id="Sobre_Mi" style={{padding: '40px 0'}}>
      <style>{`
        .profile-container { max-width: 1350px; width: 95%; margin: 0 auto; background-color: var(--fondo-panel); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid var(--borde-sutil); border-radius: 8px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .profile-window-bar { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; background-color: var(--fondo-app); border-bottom: 1px solid var(--borde-sutil); font-family: var(--fuente-datos); font-size: 13px; }
        .window-controls { display: flex; gap: 15px; color: var(--controles-ventana); }
        .profile-content { display: flex; align-items: center; gap: 60px; padding: 60px; }
        .profile-left { flex: 0 0 30%; display: flex; flex-direction: column; align-items: center; }
        .profile-image { width: 320px; height: 320px; border-radius: 50%; object-fit: cover; border: 4px solid rgba(255,255,255,0.05); box-shadow: 0 0 30px rgba(0,0,0,0.3); }
        .profile-right { flex: 1; }
        @media (max-width: 992px) {
          .profile-content { flex-direction: column; padding: 40px 20px; gap: 30px; text-align: center; }
          .profile-image { width: 200px; height: 200px; }
          .profile-window-bar { padding: 8px 12px; font-size: 11px; }
          .window-controls { gap: 8px; }
          .code-block { font-size: 13px !important; text-align: left; width: 100%; }
          .profile-buttons { justify-content: center !important; flex-wrap: wrap; gap: 10px; }
        }
        @media (max-width: 480px) { .profile-window-bar span:first-child { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } }
      `}</style>

      <div className="profile-container">
        <div className="profile-window-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--texto-secundario)' }}>
            <span style={{ opacity: 0.5 }}>📂</span> {heroText.archivoPy}
          </span>
          <div className="window-controls">
            <span>[ _ ] </span>
            <span> [ ▢ ] </span>
            <span> [ X ]</span>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-left">
            <img 
              src="/assets/foto_perfil.jpg"
              alt="Rocío Izunza" 
              className="profile-image" 
              onError={(e) => {
                e.target.style.display = 'none'; 
                e.target.parentNode.style.backgroundColor = '#333'; 
              }}
            />
          </div>

          <div className="profile-right">
            <div className="code-block" style={{fontSize: '16px', lineHeight: '1.6'}}>
              <div>
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>class</span>{' '}
                <span className="ck-cls" style={{color: 'var(--color-function)'}}>Rocio_Izunza</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>(</span>
                <span className="ck-cls" style={{color: 'var(--color-variable)'}}>{heroText.clase}</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>,</span>{' '}
                <span className="ck-cls" style={{color: 'var(--color-variable)'}}>{heroText.subclase}</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>):</span>
              </div>
              
              <div className="indent-1 ck-com" style={{color: 'var(--color-comment)'}}>
                """<br/>
                {heroText.bio}<br/>
                """
              </div>
              <br/>
              <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>def</span>{' '}
                <span className="ck-fn" style={{color: 'var(--color-function)'}}>perfil</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>():</span>
              </div>
              
              <div className="indent-2">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>return</span>{' '}
                <span className="ck-str" style={{color: 'var(--color-string)'}}>"{heroText.perfilLabel}"</span>
              </div>
            </div>

            <div className="profile-buttons" style={{marginTop: '40px', display: 'flex', gap: '15px'}}>
              <button className="profile-btn" onClick={() => manejarClick('descarga', idioma === 'en' ? '/assets/cv_en.pdf' : '/assets/cv_es.pdf')}>
                <FaFileDownload style={{marginRight: '8px'}}/> {heroText.cvBtn}
              </button>
              
              <button className="profile-btn" onClick={() => manejarClick('link', 'https://www.linkedin.com/in/rocioizunza/')}>
                <FaLinkedin style={{marginRight: '8px'}}/> LINKEDIN
              </button>
              
              <button className="profile-btn" onClick={() => manejarClick('link', 'https://github.com/roizunza')}>
                <FaGithub style={{marginRight: '8px'}}/> GITHUB
              </button>

              <button className="profile-btn" onClick={() => manejarClick('modal')}>
                <FaPlug style={{marginRight: '8px', transform: 'rotate(90deg)'}}/> {heroText.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;