import React, { useState } from 'react';
import './Indice.css'; 
import { PROJECTS, STYLES } from '../config/theme.js'; 
import { useLanguage } from '../context/LanguageContext.jsx'; 
import ViajaSeguraCard from './ViajaSegura/ViajaSeguraCard.jsx';
import VigilanciaEspectralCard from './VigilanciaEspectral/VigilanciaEspectralCard.jsx';
import AlgoritmoInmobiliarioCard from './AlgoritmoInmobiliario/AlgoritmoInmobiliarioCard.jsx'; 
import FactorEsfuerzoCard from './FactorEsfuerzo/FactorEsfuerzoCard.jsx';

import iconKml from '../assets/kml.PNG';   
import iconTiff from '../assets/tiff.PNG'; 
import iconJson from '../assets/json.PNG'; 
import iconGpkg from '../assets/gpck.PNG'; 

const Indice = ({ onActivarDashboard }) => {
  const { idioma, t: fullT } = useLanguage();
  const t = fullT;
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  if (!t || !t.viajaSegura) return null;

  const proyectos = [
    { id: 1, baseName: t.viajaSegura.fileName, extension: ".kml", extensionColor: PROJECTS.viajaSegura.color, icono: iconKml, idScroll: "seccion-viaja-segura" },
    { id: 2, baseName: t.vigilancia.fileName, extension: ".tiff", extensionColor: PROJECTS.vigilancia.color, icono: iconTiff, idScroll: "seccion-vigilancia" },
    { id: 3, baseName: t.algoritmo.fileName, extension: ".json", extensionColor: PROJECTS.algoritmo.color, icono: iconJson, idScroll: "seccion-algoritmo" },
    { id: 4, baseName: t.factorEsfuerzo.fileName, extension: ".gpkg", extensionColor: PROJECTS.factorEsfuerzo.color, icono: iconGpkg, idScroll: "seccion-esfuerzo" }
  ];

  const manejarEjecucion = (idScroll) => {
    setProyectoSeleccionado(null);
    if (onActivarDashboard) onActivarDashboard(idScroll);
  };

  return (
    <section className="index-section" id="Proyectos">
      <div className="projects-container">
        <div className="projects-header" style={{ marginBottom: '60px' }}>
          <h2 style={STYLES.sectionTitle}>
            <span style={STYLES.sectionHash}>#</span>
            {t.nav.proyectos}
          </h2>
        </div>

        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className={`project-file ${proyectoSeleccionado?.id === proyecto.id ? 'active' : ''}`}
              onClick={() => setProyectoSeleccionado(proyecto)}
            >
              <img src={proyecto.icono} alt={proyecto.extension} className="file-icon-img" />
              <div className="file-code-name">
                <span>{proyecto.baseName}</span>
                <span className="file-extension-span" style={{ color: proyecto.extensionColor }}>
                  {proyecto.extension}
                </span>
              </div>
            </div>
          ))}
        </div>

        {proyectoSeleccionado && (
          <div className="synopsis-overlay" onClick={() => setProyectoSeleccionado(null)}>
            <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', width: '100%', padding: '0 10px'}}>
                {proyectoSeleccionado.id === 1 && (
                  <ViajaSeguraCard idioma={idioma} t={t.viajaSegura} onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} onClose={() => setProyectoSeleccionado(null)} />
                )}
                {proyectoSeleccionado.id === 2 && (
                  <VigilanciaEspectralCard idioma={idioma} t={t.vigilancia} onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} onClose={() => setProyectoSeleccionado(null)} />
                )}
                {proyectoSeleccionado.id === 3 && (
                  <AlgoritmoInmobiliarioCard idioma={idioma} t={t.algoritmo} onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} onClose={() => setProyectoSeleccionado(null)} />
                )}
                {proyectoSeleccionado.id === 4 && (
                  <FactorEsfuerzoCard idioma={idioma} t={t.factorEsfuerzo} onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} onClose={() => setProyectoSeleccionado(null)} />
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Indice;