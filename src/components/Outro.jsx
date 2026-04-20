import React, { useEffect, useState, useRef } from 'react';
import { FaPlug } from 'react-icons/fa'; 
import { useLanguage } from '../context/LanguageContext.jsx';
import './Outro.css'; 

const Outro = ({ onContactClick }) => { 
  const { t: fullT } = useLanguage(); 
  const t = fullT.outro;

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
      
      <div className="process-messages">
        {isVisible && (
          <>
            <div className="process-line" style={{animationDelay: '0s'}}>{t.log_completed}</div>
            <div className="process-line cursor-blink">{t.log_analyzing}</div>
          </>
        )}
      </div>

      <h2 className="outro-title">{t.titulo}</h2>

      <div className="hero-style-window">
        <div className="profile-window-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.5 }}>📂</span> {t.tab}
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            <span>[ X ]</span>
          </span>
        </div>

        <div className="code-content">
            <div>
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>const</span>{' '}
                <span className="ck-cls" style={{color: 'var(--color-function)'}}>status</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}> = {`{`}</span>
            </div>
            
            <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>perfil:</span>{' '}
                <span className="ck-str" style={{color: 'var(--color-string)'}}>"{t.perfil}"</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>,</span>
            </div>

            <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>system_status:</span>{' '}
                <span className="ck-str" style={{color: 'var(--color-string)'}}>"{t.status}"</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>,</span>
            </div>

            <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>location:</span>{' '}
                <span className="ck-str" style={{color: 'var(--color-string)'}}>"CDMX [19.43° N, 99.13° W]"</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>,</span>
            </div>

            <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>stack:</span>{' '}
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>[</span>
                <span className="ck-str" style={{color: 'var(--color-string)'}}>'Python', 'React', 'QGIS', 'SQL', 'Figma'</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>],</span>
            </div>

            <div className="indent-1">
                <span className="ck-key" style={{color: 'var(--color-keyword)'}}>layers:</span>{' '}
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>[</span>
                <span className="ck-str" style={{color: 'var(--color-string)'}}>{t.layers}</span>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>]</span>
            </div>

            <div>
                <span className="ck-punc" style={{color: 'var(--texto-principal)'}}>{`};`}</span>
            </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button className="hero-btn" onClick={onContactClick}>
          <FaPlug style={{ transform: 'rotate(90deg)' }}/> {t.btn}
        </button>
      </div>

      <div className="outro-footer">© 2026 ROCÍO IZUNZA • DATA DRIVEN URBANISM</div>
    </section>
  );
};

export default Outro;