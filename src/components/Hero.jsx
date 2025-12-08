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
          
          {/* COLUMNA DERECHA (Ahora PRIMERA en móvil) */}
          <div className="profile-right">
            
            {/* Bloque de Código (Elevator Pitch) */}
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
                <span className="code-function">especialidad</span>
                <span className="code-punctuation">():</span>
              </div>
              
              <div className="code-indent-2">
                <span className="code-keyword">return</span>{' '}
                <span className="code-string">"Ciencia de Datos Espaciales"</span>
              </div>
            </div>

            {/* COLUMNA IZQUIERDA (Ahora SEGUNDA en móvil) */}
            <div className="profile-left mobile-only">
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

            {/* Botones de Acción (Layout Cuadrícula en móvil) */}
            <div className="profile-buttons">
              {/* Fila 1 */}
              <button className="profile-btn" onClick={() => manejarClick('descarga', '/assets/cv_actual.pdf')}>
                <FaFileDownload style={{marginRight: '8px'}}/> DESCARGAR_CV
              </button>
              
              <button className="profile-btn" onClick={() => manejarClick('link', 'https://www.linkedin.com/in/tu-usuario-real/')}
              >
                <FaLinkedin style={{marginRight: '8px'}}/> LINKEDIN
              </button>
              
              {/* Fila 2 */}
              <button className="profile-btn" onClick={() => manejarClick('link', 'https://github.com/tu-usuario-real')}
              >
                <FaGithub style={{marginRight: '8px'}}/> GITHUB
              </button>
              
              <button className="profile-btn" onClick={() => manejarClick('modal')}>
                <FaTerminal style={{marginRight: '8px'}}/> INICIAR_CONEXIÓN
              </button>
            </div>

          </div>

          {/* COLUMNA IZQUIERDA (Solo visible en escritorio) */}
          <div className="profile-left desktop-only">
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

        </div>
      </div>

      <style>{`
        /* ... (Estilos generales igual que antes) ... */

        .mobile-only { display: none; }
        .desktop-only { display: flex; }

        /* RESPONSIVIDAD (Ajustes Móviles) */
        @media (max-width: 768px) {
          .mobile-only { display: flex; }
          .desktop-only { display: none; }

          /* 1. Header más pequeño para que no se rompa */
          .profile-header {
            font-size: 0.7rem;
            padding: 10px 15px;
          }
          .window-controls { font-size: 0.8rem; letter-spacing: 1px; }

          /* 2. Aprovechar el ancho de la pantalla */
          .hero-section { padding: 10px; } /* Menos padding externo */
          .profile-container { max-width: 100%; border-radius: 8px; } /* Bordes menos redondeados */
          .profile-content {
            flex-direction: column;
            gap: 30px;
            padding: 25px 15px; /* Padding interno más ajustado */
          }

          /* 3. Orden del Contenido (Código -> Foto -> Botones) */
          .profile-left { 
            width: 100%; 
            align-items: center; 
            order: 2; /* Foto va después del código */
          }
          .profile-quote { text-align: center; } 
          .profile-image { width: 150px; height: 150px; } /* Foto más pequeña */

          .profile-right {
            order: 1; /* Código va primero */
          }
          .code-block { font-size: 0.9rem; } /* Fuente de código más pequeña */

          /* 4. Botones en Cuadrícula 2x2 */
          .profile-buttons { 
            display: grid;
            grid-template-columns: 1fr 1fr; /* Dos columnas */
            gap: 10px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            order: 3; /* Botones al final */
          }
          .profile-btn { 
            width: 100%; 
            flex: auto;
            font-size: 0.7rem; /* Botones más compactos */
            padding: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;