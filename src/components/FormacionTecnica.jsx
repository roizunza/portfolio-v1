import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import certificacionesES from '../data/certificaciones.json';
import certificacionesEN from '../data/certificaciones_en.json';
import './FormacionTecnica.css';

const FormacionCard = ({ esp, t, isOpen, toggleTab, openPdf }) => {
  return (
    <div className={`especialidad-card ${isOpen ? 'open' : ''}`} style={{ '--accent-color': esp.color }}>
      <div className="especialidad-header" onClick={() => toggleTab(esp.id)}>
        <div className="especialidad-info">
          <h3>{esp.titulo}</h3>
          <p className="especialidad-meta">
            {esp.institucion} • {esp.totalFormaciones} • {esp.totalHoras}h
          </p>
        </div>
        <span className="plus-minus">{isOpen ? '−' : '+'}</span>
      </div>

      <div className="especialidad-content">
        {esp.formaciones.map((form, idx) => (
          <div key={idx} className="formacion-item">
            <h4 onClick={() => openPdf(form.pdf)} className="link-cert">
              // {form.nombre} ↗
            </h4>
            <div className="cursos-list">
              {form.cursos.map((curso, cIdx) => (
                <div 
                  key={cIdx} 
                  className={`curso-line ${curso.pdf ? 'link-cert' : ''}`} 
                  onClick={(e) => {
                    if (curso.pdf) {
                      e.stopPropagation();
                      openPdf(curso.pdf);
                    }
                  }}
                >
                  • {curso.nombre} {curso.h && <span>[{curso.h}]</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormacionTecnica = () => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT.formacion;
  const data = idioma === 'es' ? certificacionesES : certificacionesEN;

  const [openTabs, setOpenTabs] = useState({});

  const toggleTab = (id) => {
    setOpenTabs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const globalInsights = useMemo(() => {
    return {
      especialidades: data.length, 
      formaciones: data.reduce((acc, curr) => acc + (curr.totalFormaciones || 0), 0),
      cursos: data.reduce((acc, curr) => acc + curr.formaciones.reduce((a, f) => a + (f.cursos?.length || 0), 0), 0),
      horas: data.reduce((acc, curr) => acc + (curr.totalHoras || 0), 0)
    };
  }, [data]);

  const openPdf = (file) => {
    if (!file) return;
    window.open(`/assets/certificados/${file}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="formacion-tecnica-seccion" className="formacion-section">
      <div className="formacion-header">
        <h2 className="formacion-title"><span>#</span> {t.titulo}</h2>
      </div>

      <div className="formacion-layout">
        <aside className="formacion-insights">
          <div className="insight-box">
            <span className="insight-label">{t.especialidades}</span>
            <span className="insight-value">{globalInsights.especialidades}</span>
          </div>
          <div className="insight-box">
            <span className="insight-label">{t.formaciones}</span>
            <span className="insight-value">{globalInsights.formaciones}</span>
          </div>
          <div className="insight-box">
            <span className="insight-label">{t.cursos}</span>
            <span className="insight-value">{globalInsights.cursos}</span>
          </div>
          <div className="insight-box">
            <span className="insight-label">{t.horas}</span>
            <span className="insight-value">{globalInsights.horas}h</span>
          </div>
        </aside>

        <main className="formacion-list">
          {data.map((esp) => (
            <FormacionCard 
              key={esp.id} 
              esp={esp} 
              t={t} 
              isOpen={!!openTabs[esp.id]} 
              toggleTab={toggleTab} 
              openPdf={openPdf}
            />
          ))}
        </main>
      </div>
    </section>
  );
};

export default FormacionTecnica;