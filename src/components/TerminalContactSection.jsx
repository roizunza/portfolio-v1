import React, { useEffect, useState, useRef } from 'react';
import './TerminalContactSection.css'; // Usaremos un CSS específico para sección

const TerminalContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Animación: Solo se activa cuando el usuario hace scroll hasta esta sección
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Se activa cuando el 30% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:rocio.izunza@ejemplo.com"; 
  };

  return (
    <section ref={sectionRef} className="terminal-section">
      <div className="terminal-container">
        
        {/* MENSAJES DE SISTEMA (Se animan al ver la sección) */}
        <div className="process-messages">
          <div className={`process-line ${isVisible ? 'visible' : ''}`} style={{transitionDelay: '0ms'}}>Iniciando protocolo de conexión...</div>
          <div className={`process-line ${isVisible ? 'visible' : ''}`} style={{transitionDelay: '800ms'}}>Analizando patrones urbanos...</div>
          <div className={`process-line analyzing ${isVisible ? 'visible' : ''}`} style={{transitionDelay: '1600ms'}}>Desencriptando datos de contacto...</div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className={`terminal-body ${isVisible ? 'visible' : ''}`}>
          
          <h2 className="contact-title">LISTA PARA DECODIFICAR LA SIGUIENTE CIUDAD</h2>

          <div className="contact-code-block">
            <div className="code-line"><span className="code-variable">const</span> <span className="code-text"> contacto </span> <span className="code-text">=</span> <span className="code-bracket"> {'{'}</span></div>
            <div className="code-line"><span className="code-key">perfil:</span> <span className="code-value"> "Urbanista & Data Scientist",</span></div>
            <div className="code-line"><span className="code-key">ubicación:</span> <span className="code-value"> "CDMX (Central / Híbrido)",</span></div>
            <div className="code-line"><span className="code-key">especialidad:</span> <span className="code-value"> "Inteligencia Geoespacial",</span></div>
            <div className="code-line"><span className="code-key">estado:</span> <span className="code-value"> "Disponible para proyectos",</span></div>
            <div className="code-line"><span className="code-bracket"> {'}'};</span></div>
          </div>

          <div className="collaboration-button-container">
            <button className="collaboration-button" onClick={handleEmailClick}>
              INICIAR COLABORACIÓN
            </button>
          </div>

          <div className="contact-footer">
            <p>SYSTEM.EXIT(0) // GRACIAS POR VISITAR</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TerminalContactSection;