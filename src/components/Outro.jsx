import React, { useEffect, useState, useRef } from 'react';
import { FaPlug } from 'react-icons/fa'; 
import './Outro.css'; 

const Outro = ({ onContactClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 } 
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section ref={sectionRef} className="outro-section">
      
      {/* 1. LOGS ANIMADOS */}
      <div className="process-messages">
        {isVisible && (
          <>
            <div className="process-line" style={{animationDelay: '0s'}}>>PROCESS_COMPLETED: 100%</div>
            <div className="process-line cursor-blink">> ANALYZING_NEXT_STEP... </div>
          </>
        )}
      </div>

      {/* 2. TÍTULO */}
      <h2 className="outro-title">LISTA PARA CODIFICAR LA SIGUIENTE CIUDAD</h2>

      {/* 3. PANEL */}
      <div className="hero-style-window">
        
        {/* Header */}
        <div className="profile-window-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.5 }}>📂</span> extra_info
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            <span>[ X ]</span>
          </span>
        </div>

        <div className="code-content">
            
            {/* const status = { */}
            <div>
                <span className="ck-key">const</span>{' '}
                <span className="ck-cls">status</span>
                <span className="ck-punc"> = {`{`}</span>
            </div>
            
            {/* perfil: ... */}
            <div className="indent-1">
                <span className="ck-key">perfil:</span>{' '}
                <span className="ck-str">"Urbanista & Analista de Datos Geoespaciales"</span>
                <span className="ck-punc">,</span>
            </div>

            {/* system_status: ... */}
            <div className="indent-1">
                <span className="ck-key">system_status:</span>{' '}
                <span className="ck-str">"Online & Ready"</span>
                <span className="ck-punc">,</span>
            </div>

            {/* location: ... */}
            <div className="indent-1">
                <span className="ck-key">location:</span>{' '}
                <span className="ck-str">"CDMX [19.43° N, 99.13° W]"</span>
                <span className="ck-punc">,</span>
            </div>

            {/* stack: ... */}
            <div className="indent-1">
                <span className="ck-key">stack:</span>{' '}
                <span className="ck-punc">[</span>
                <span className="ck-str">'Python', 'React', 'QGIS', 'SQL', 'Figma'</span>
                <span className="ck-punc">],</span>
            </div>

            {/* layers: ... */}
            <div className="indent-1">
                <span className="ck-key">layers:</span>{' '}
                <span className="ck-punc">[</span>
                <span className="ck-str">'Infraestructura', 'Data', 'Género', 'Ambiente'</span>
                <span className="ck-punc">]</span>
            </div>

            {/* }; */}
            <div>
                <span className="ck-punc">{`};`}</span>
            </div>

        </div>
      </div>

      {/* 4. BOTÓN */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button className="hero-btn" onClick={onContactClick}>
          <FaPlug style={{ transform: 'rotate(90deg)' }}/> INICIAR_CONEXIÓN
        </button>
      </div>

      <div className="outro-footer">© 2025 ROCÍO IZUNZA • DATA DRIVEN URBANISM</div>
    </section>
  );
};

export default Outro;