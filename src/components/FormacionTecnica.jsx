import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import certificacionesES from '../data/certificaciones.json';
import certificacionesEN from '../data/certificaciones_en.json';
import './FormacionTecnica.css';

const FormacionTecnica = () => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT.formacion;
  const data = idioma === 'es' ? certificacionesES : certificacionesEN;

  const [activeTab, setActiveTab] = useState(null);

  const cleanHours = (h) => {
    if (typeof h === 'number') return h;
    return parseInt(h?.replace('h', '') || 0);
  };

  const globalInsights = useMemo(() => {
    let formUniqueNames = new Set();
    let cursoCount = 0;
    let totalH = 0;

    data.forEach(esp => {
      esp.formaciones.forEach(f => {
        formUniqueNames.add(f.nombre);
        if (esp.id === 'geo') {
          cursoCount += f.modulos?.length || 0;
          totalH += cleanHours(f.horas);
        } else {
          cursoCount += f.cursos?.length || 0;
          f.cursos?.forEach(c => totalH += cleanHours(c.h));
        }
      });
    });
    return { especialidades: data.length, formaciones: formUniqueNames.size, cursos: cursoCount, horas: totalH };
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
          <div className="insight-box"><span className="insight-label">{t.especialidades}</span><span className="insight-value">{globalInsights.especialidades}</span></div>
          <div className="insight-box"><span className="insight-label">{t.formaciones}</span><span className="insight-value">{globalInsights.formaciones}</span></div>
          <div className="insight-box"><span className="insight-label">{t.cursos}</span><span className="insight-value">{globalInsights.cursos}</span></div>
          <div className="insight-box"><span className="insight-label">{t.horas}</span><span className="insight-value">{globalInsights.horas}h</span></div>
        </aside>

        <main className="formacion-list">
          {data.map((esp) => {
            const horasCaja = esp.formaciones.reduce((acc, f) => {
               if (esp.id === 'geo') return acc + cleanHours(f.horas);
               return acc + (f.cursos?.reduce((ac, c) => ac + cleanHours(c.h), 0) || 0);
            }, 0);

            return (
              <div key={esp.id} className={`especialidad-card ${activeTab === esp.id ? 'open' : ''}`} style={{ '--accent-color': esp.color }}>
                <div className="especialidad-header" onClick={() => setActiveTab(activeTab === esp.id ? null : esp.id)}>
                  <div className="especialidad-info">
                    <h3>{esp.titulo}</h3>
                    <p className="especialidad-meta">{esp.institucion} • {esp.formaciones.length} {t.formaciones} • {horasCaja}h</p>
                  </div>
                  <span className="plus-minus">{activeTab === esp.id ? '−' : '+'}</span>
                </div>

                <div className="especialidad-content">
                  {esp.formaciones.map((form, idx) => (
                    <div key={idx} className="formacion-item">
                      <h4 onClick={() => openPdf(form.pdf)} className="link-cert">// {form.nombre} ↗</h4>
                      <div className="cursos-list">
                        {esp.id === 'geo' ? (
                          form.modulos?.map((mod, mIdx) => (<div key={mIdx} className="curso-line">• {mod}</div>))
                        ) : (
                          form.cursos?.map((curso, cIdx) => (
                            <div key={cIdx} className="curso-line link-cert" onClick={() => openPdf(curso.pdf)}>
                              • {curso.nombre} <span>[{curso.h}]</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
};

export default FormacionTecnica;