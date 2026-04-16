import React, { useState } from 'react';
import './Indice.css'; 
import { PROJECTS } from '../config/theme'; 
import ViajaSeguraCard from './ViajaSegura/ViajaSeguraCard.jsx';
import VigilanciaEspectralCard from './VigilanciaEspectral/VigilanciaEspectralCard.jsx';

// Iconos 
import iconKml from '../assets/kml.PNG';   
import iconTiff from '../assets/tiff.PNG'; 
import iconJson from '../assets/json.PNG'; 

const Indice = ({ onActivarDashboard }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const proyectos = [
    {
      id: 1,
      baseName: "01_viaja_segura",
      extension: ".kml",
      extensionColor: PROJECTS.viajaSegura.color, 
      icono: iconKml,
      idScroll: "seccion-viaja-segura" 
    },
    {
      id: 2,
      baseName: "02_vigilancia_espectral",
      extension: ".tiff",
      extensionColor: PROJECTS.vigilancia.color, 
      icono: iconTiff,
      idScroll: "seccion-vigilancia" 
    },
    {
      id: 3,
      baseName: "03_academic_skills", 
      extension: ".sh",
      extensionColor: "#00E5FF", 
      icono: iconJson,
      idScroll: "seccion-certificaciones" 
    }
  ];

  const manejarEjecucion = (idScroll) => {
    setProyectoSeleccionado(null);
    if (onActivarDashboard) {
        onActivarDashboard(idScroll);
    }
  };

  return (
    <section className="index-section" id="Proyectos">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title"># Proyectos</h2>
        </div>

        <div className="projects-grid">
          {proyectos.map((p) => (
            <div 
              key={p.id} 
              className="project-file"
              onClick={() => p.id === 3 ? manejarEjecucion(p.idScroll) : setProyectoSeleccionado(p)}
            >
              <img src={p.icono} alt={p.extension} className="file-icon-img" />
              <div className="file-code-name">
                <span>{p.baseName}</span>
                <span className="file-extension-span" style={{ color: p.extensionColor }}>{p.extension}</span>
              </div>
            </div>
          ))}
        </div>

        {proyectoSeleccionado && (
          <div className="synopsis-overlay" onClick={() => setProyectoSeleccionado(null)}>
            <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', width: '100%', padding: '0 10px'}}>
                {proyectoSeleccionado.id === 1 && (
                  <ViajaSeguraCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)} 
                  />
                )}
                {proyectoSeleccionado.id === 2 && (
                  <VigilanciaEspectralCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)} 
                  />
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Indice;