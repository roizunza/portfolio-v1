import React from 'react';
/* 1. Importamos FaPlug para el nuevo icono */
import { FaGithub, FaLinkedin, FaFileDownload, FaPlug } from 'react-icons/fa';

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
    // AQUI AGREGAMOS EL ID PARA QUE EL HEADER LO ENCUENTRE
    <section className="hero-section" id="Sobre_Mi">
      <div className="profile-container">
        
        {/* Header de Ventana */}
        <div className="profile-window-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.5 }}>📂</span> perfil_usuario.py
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            <span>[ X ]</span>
          </span>
        </div>

        <div className="profile-content">
          
          {/* Columna Izquierda: Foto y Cita */}
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

          {/* Columna Derecha: Código y Botones */}
          <div className="profile-right">
            
            <div className="code-block">
              <div>
                <span className="ck-key">class</span>{' '}
                <span className="ck-cls">Rocio_Izunza</span>
                <span className="ck-punc">(</span>
                <span className="ck-cls">Urbanista</span>
                <span className="ck-punc">):</span>
              </div>
              
              <div className="indent-1 ck-com">
                """<br/>
                Mi interés habita la intersección entre la<br/>
                infraestructura digital y el espacio físico,<br/>
                con el objetivo de revelar las dinámicas<br/>
                invisibles a través del código.<br/>
                """
              </div>
              <br/>
              <div className="indent-1">
                <span className="ck-key">def</span>{' '}
                <span className="ck-fn">especialidad</span>
                <span className="ck-punc">():</span>
              </div>
              
              <div className="indent-2">
                <span className="ck-key">return</span>{' '}
                <span className="ck-str">"Ciencia de Datos Espaciales"</span>
              </div>
            </div>

            <div className="profile-buttons">
              {/* Botón CV */}
              <button className="profile-btn" onClick={() => manejarClick('descarga', '/assets/cv_actual.pdf')}>
                <FaFileDownload style={{marginRight: '8px'}}/> DESCARGAR_CV
              </button>
              
              {/* Botón Conexión con nuevo LOGO (Enchufe) */}
              <button className="profile-btn" onClick={() => manejarClick('modal')}>
                <FaPlug style={{marginRight: '8px', transform: 'rotate(90deg)'}}/> INICIAR_CONEXIÓN
              </button>
              
              {/* Botón LinkedIn */}
              <button 
                className="profile-btn" 
                onClick={() => manejarClick('link', 'https://www.linkedin.com/in/rocioizunza/')}
              >
                <FaLinkedin style={{marginRight: '8px'}}/> LINKEDIN
              </button>
              
              {/* Botón GitHub */}
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
    </section>
  );
};

export default Hero;