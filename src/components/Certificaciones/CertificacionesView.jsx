import React, { useState } from 'react';
import { certificaciones } from './certificacionesData';
import './Certificaciones.css';

const CertificacionesView = () => {
  const [abierto, setAbierto] = useState(null);

  return (
    <div className="skills-main-wrapper">
      <div className="skills-layout-grid">
        
        {/* LADO IZQUIERDO: MÉTRICAS VERTICALES */}
        <aside className="skills-left-col">
          <h2 className="skills-title-stylized">SKILLS</h2>
          <div className="metrics-stack">
            <div className="metric-item">
              <span className="m-label">Formaciones</span>
              <span className="m-value">8</span>
            </div>
            <div className="metric-item">
              <span className="m-label">Cursos Completados</span>
              <span className="m-value">46</span>
            </div>
            <div className="metric-item">
              <span className="m-label">Horas Totales</span>
              <span className="m-value">476</span>
            </div>
          </div>
        </aside>

        {/* LADO DERECHO: ESPECIALIDADES */}
        <main className="skills-right-col">
          
          {/* MÉTRICA ESPECIALIDADES (AMARILLO PASTEL) */}
          <div className="metric-item-special">
            <span className="m-label">Especialidades</span>
            <span className="m-value">4</span>
          </div>

          <div className="accordion-group">
            {certificaciones.map((spec) => (
              <div 
                key={spec.id} 
                className={`spec-box ${abierto === spec.id ? 'expanded' : ''}`}
                style={{ '--accent': spec.colorHex }}
              >
                <div className="spec-trigger" onClick={() => setAbierto(abierto === spec.id ? null : spec.id)}>
                  <div className="trigger-left">
                    <div className="status-dot"></div>
                    <div className="trigger-text">
                      <h3>{spec.categoria}</h3>
                      <p className="trigger-meta">{spec.institucion} | {spec.horasTotales}h totales</p>
                    </div>
                  </div>
                  <span className="plus-minus">{abierto === spec.id ? '−' : '+'}</span>
                </div>

                <div className="spec-content">
                  <div className="content-inner">
                    <a href={spec.certificadoEspecialidad} target="_blank" rel="noreferrer" className="btn-main-cert">
                       &gt; Certificado de Especialización
                    </a>

                    {spec.formaciones.map((f, i) => (
                      <div key={i} className="formation-block">
                        <h4 className="formation-name">// Formación: {f.nombre} ({f.horas}h)</h4>
                        <div className="courses-grid">
                          {f.cursos.map((c, j) => (
                            <a key={j} href={c.link} target="_blank" rel="noreferrer" className="course-btn">
                              {c.nombre}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CertificacionesView;