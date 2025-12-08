import React from 'react';
import { FaGithub, FaLinkedin, FaTerminal, FaFileDownload } from 'react-icons/fa';

const Hero = ({ alAbrirTerminal }) => {
  
  // Función para manejar navegación externa y modal
  const manejarClick = (accion, destino) => {
    if (accion === 'modal') {
      if (alAbrirTerminal) alAbrirTerminal();
    } else if (accion === 'link') {
      window.open(destino, '_blank'); // Abre en nueva pestaña
    } else if (accion === 'descarga') {
      // Abre el PDF para descargar
      window.open(destino, '_blank'); 
    }
  };

  return (
    <section className="hero-section">
      <div className="profile-container">
        
        {/* Barra superior del archivo */}
        <div className="profile-header">
          perfil_usuario.py
        </div>

        <div className="profile-content">
          
          {/* Columna Izquierda: Foto */}
          <div className="profile-left">
            <img 
              src="/assets/foto_perfil.jpg" /* <--- CAMBIO A JPG */
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

          {/* Columna Derecha: Código y Botones */}
          <div className="profile-right">
            
            {/* Bloque de Código */}
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
              <div className="code-indent">
                <span className="code-keyword">def</span>{' '}
                <span className="code-function">rol</span>
                <span className="code-punctuation">():</span>
              </div>
              
              <div className="code-indent-2">
                <span className="code-keyword">return</span>{' '}
                <span className="code-string">"Urbanismo y Ciencia de Datos"</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="profile-buttons">
              {/* CV */}
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('descarga', '/assets/cv_actual.pdf')}
              >
                <FaFileDownload style={{marginRight: '8px'}}/> DESCARGAR_CV
              </button>
              
              {/* Modal de Conexión */}
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('modal')}
              >
                <FaTerminal style={{marginRight: '8px'}}/> INICIAR_CONEXIÓN
              </button>
              
              {/* LinkedIn - ¡RECUERDA PONER TU URL REAL AQUÍ! */}
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('link', 'https://www.linkedin.com/in/rocioizunza/')}
              >
                <FaLinkedin style={{marginRight: '8px'}}/> LINKEDIN
              </button>
              
              {/* GitHub - ¡RECUERDA PONER TU URL REAL AQUÍ! */}
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('link', 'https://github.com/roizunza')}
              >
                <FaGithub style={{marginRight: '8px'}}/> GITHUB
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ESTILOS LOCALES */}
      <style>{`
        /* ... Estilos anteriores del contenedor se mantienen igual ... */
        
        .hero-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .profile-container {
          background-color: #0f1419;
          border: 1px solid #2d3748;
          border-radius: 8px;
          width: 100%;
          max-width: 1000px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .profile-header {
          background-color: #0f1419;
          border-bottom: 1px solid #2d3748;
          padding: 12px 20px;
          font-size: 0.85rem;
          color: #6b7280;
          font-family: var(--fuente-datos);
        }

        .profile-content {
          display: flex;
          gap: 60px;
          padding: 60px 40px;
          align-items: flex-start;
        }

        .profile-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-image {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          background-color: #222;
          margin-bottom: 24px;
          border: 2px solid rgba(255,255,255,0.1);
        }

        .profile-quote {
          color: #6b7280;
          font-size: 12px;
          line-height: 1.6;
          max-width: 250px;
          font-family: var(--fuente-datos);
          font-style: italic;
        }

        .profile-right { flex: 1; }

        .code-block {
          color: var(--texto-principal);
          font-family: var(--fuente-codigo);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .code-keyword { color: #5b7cf7; }
        .code-class-name { color: #e5c07b; }
        .code-function { color: #61afef; }
        .code-string { color: #98c379; }
        .code-punctuation { color: #abb2bf; }
        .code-comment { color: #6b7280; font-style: italic; }
        .code-indent { margin-left: 2rem; }
        .code-indent-2 { margin-left: 4rem; }

        /* --- BOTONES (Lógica Corregida) --- */
        .profile-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .profile-btn {
          background-color: #1a1f2e; /* Oscuro por defecto */
          color: var(--texto-principal);
          border: 1px solid #2d3748;
          padding: 12px 24px;
          font-family: var(--fuente-ui);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        /* Hover para TODOS los botones */
        .profile-btn:hover {
          background-color: var(--azul-electrico); /* Se ponen azules al pasar el mouse */
          border-color: var(--azul-electrico);
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .profile-content {
            flex-direction: column;
            gap: 40px;
            padding: 30px 20px;
          }
          .profile-image { width: 180px; height: 180px; }
          .profile-buttons { display: grid; grid-template-columns: 1fr 1fr; }
          .profile-btn { justify-content: center; width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;