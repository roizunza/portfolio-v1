import React from 'react';
import { FaGithub, FaLinkedin, FaTerminal, FaFileDownload } from 'react-icons/fa';

const Hero = ({ alAbrirTerminal }) => {
  
  const manejarClick = (accion, destino) => {
    if (accion === 'modal') {
      if (alAbrirTerminal) alAbrirTerminal();
    } else if (accion === 'link') {
      window.open(destino, '_blank'); 
    } else if (accion === 'descarga') {
      window.open(destino, '_blank'); 
    }
  };

  return (
    <section className="hero-section">
      <div className="profile-container">
        
        {/* Header de ventana con Glassmorphism */}
        <div className="profile-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.5 }}>📂</span> perfil_usuario.py
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            <span className="close-btn">[ X ]</span>
          </span>
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
            
            <p className="profile-quote">
              """<br/>
              Entre scripts y coordenadas, encuentro el momento para reconectar:
              reinterpreto la ciudad a través del dibujo, plasmando el folclore
              y el ambiente que la data no alcanza a describir.<br/>
              """
            </p>
          </div>

          <div className="profile-right">
            
            <div className="code-block">
              <div>
                <span className="code-keyword">class</span>{' '}
                <span className="code-class-name">Rocio_Izunza</span>
                <span className="code-punctuation">(</span>
                <span className="code-class-name">Urbanista</span>
                <span className="code-punctuation">):</span>
              </div>
              
              <div className="code-indent code-comment">
                """<br/>
                Mi interés habita la intersección entre la<br/>
                infraestructura digital y el espacio físico,<br/>
                con el objetivo de revelar las dinámicas<br/>
                invisibles a través del código.<br/>
                """
              </div>
              <br/>
              {/* CAMBIO DE LÓGICA AQUÍ */}
              <div className="code-indent">
                <span className="code-keyword">def</span>{' '}
                <span className="code-function">especialidad</span> {/* Cambié 'rol' por 'especialidad' para ser más precisa */}
                <span className="code-punctuation">():</span>
              </div>
              
              <div className="code-indent-2">
                <span className="code-keyword">return</span>{' '}
                <span className="code-string">"Ciencia de Datos Espaciales"</span>
              </div>
            </div>

            <div className="profile-buttons">
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('descarga', '/assets/cv_actual.pdf')}
              >
                <FaFileDownload style={{marginRight: '8px'}}/> DESCARGAR_CV
              </button>
              
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('modal')}
              >
                <FaTerminal style={{marginRight: '8px'}}/> INICIAR_CONEXIÓN
              </button>
              
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('link', 'https://www.linkedin.com/in/tu-usuario-real/')}
              >
                <FaLinkedin style={{marginRight: '8px'}}/> LINKEDIN
              </button>
              
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('link', 'https://github.com/tu-usuario-real')}
              >
                <FaGithub style={{marginRight: '8px'}}/> GITHUB
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        /* 1. LAYOUT PRINCIPAL */
        .hero-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px; 
        }
        
        /* 2. CONTENEDOR GLASSMORPHISM */
        .profile-container {
          background-color: rgba(21, 24, 35, 0.6); 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          width: 100%;
          max-width: 1200px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .profile-header {
          background-color: rgba(13, 15, 22, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          font-size: 0.85rem;
          color: #6b7280;
          font-family: var(--fuente-datos);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .window-controls {
          font-family: var(--fuente-codigo);
          font-size: 0.9rem;
          opacity: 0.7;
          letter-spacing: 2px;
          cursor: default;
        }
        .close-btn:hover { color: #ff5f56; cursor: pointer; }

        .profile-content {
          display: flex;
          gap: 60px;
          padding: 60px 50px;
          align-items: flex-start;
        }

        /* 3. COLUMNA IZQUIERDA */
        .profile-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start; 
          width: 300px;
        }

        .profile-image {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          object-fit: cover;
          background-color: #222;
          margin-bottom: 24px;
          border: 2px solid rgba(255,255,255,0.1);
          align-self: center;
        }

        .profile-quote {
          color: #6b7280;
          font-size: 13px;
          line-height: 1.6;
          width: 100%;
          text-align: left; 
          font-family: var(--fuente-datos);
          font-style: italic;
        }

        /* 4. COLUMNA DERECHA */
        .profile-right {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .code-block {
          color: var(--texto-principal);
          font-family: var(--fuente-codigo);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .code-keyword { color: #5b7cf7; }
        .code-class-name { color: #e5c07b; }
        .code-function { color: #61afef; }
        .code-string { color: #98c379; }
        .code-punctuation { color: #abb2bf; }
        .code-comment { color: #6b7280; font-style: italic; }
        .code-indent { margin-left: 2rem; }
        .code-indent-2 { margin-left: 4rem; }

        /* 5. BOTONES */
        .profile-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: nowrap;
          align-items: center;
          margin-top: 50px; 
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        .profile-btn {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--texto-principal);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 20px;
          font-family: var(--fuente-ui);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          flex: 1;
        }

        .profile-btn:hover {
          background-color: var(--azul-electrico);
          border-color: var(--azul-electrico);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 255, 0.3);
        }

        /* RESPONSIVIDAD */
        @media (max-width: 1024px) {
          .profile-container { max-width: 95%; }
        }

        @media (max-width: 768px) {
          .profile-content {
            flex-direction: column;
            gap: 40px;
            padding: 30px 20px;
          }
          .profile-left { width: 100%; align-items: center; } 
          .profile-quote { text-align: center; } 
          .profile-image { width: 180px; height: 180px; }
          .profile-buttons { 
            flex-wrap: wrap; 
            border-top: none; 
          }
          .profile-btn { width: 100%; flex: auto; }
          .profile-header { font-size: 0.75rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;