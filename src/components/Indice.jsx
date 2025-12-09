import React, { useState } from 'react';
import './Indice.css'; 

// Importamos las Cards Específicas
import ViajaSeguraCard from './ViajaSegura/ViajaSeguraCard.jsx';
import VigilanciaEspectralCard from './VigilanciaEspectral/VigilanciaEspectralCard.jsx'; // <--- NUEVO

import iconKml from '../assets/kml.PNG';
import iconTiff from '../assets/tiff.PNG';
import iconJson from '../assets/json.PNG';
import iconGpkg from '../assets/gpck.PNG';

import { FaArrowRight, FaTimes } from 'react-icons/fa';

const Indice = ({ onActivarDashboard }) => {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const proyectos = [
    {
      id: 1,
      baseName: "01_viaja_segura",
      extension: ".kml",
      extensionColor: "#A020F0", 
      icono: iconKml,
      idScroll: "proyecto-viaja-segura" 
    },
    {
      id: 2,
      baseName: "02_vigilancia_espectral",
      extension: ".tiff",
      extensionColor: "#15BE80", 
      icono: iconTiff,
      idScroll: "proyecto-japon" // Nota: Eventualmente cambiaremos este ID
    },
    {
      id: 3,
      baseName: "03_algoritmo_inmobiliario",
      extension: ".json",
      extensionColor: "#FF5A60", 
      icono: iconJson,
      idScroll: "proyecto-hk"
    },
    {
      id: 4,
      baseName: "04_factor_esfuerzo_turistico",
      extension: ".gpkg",
      extensionColor: "#EE0E99", 
      icono: iconGpkg,
      idScroll: "proyecto-pr"
    }
  ];

  const manejarEjecucion = (idScroll) => {
    setProyectoSeleccionado(null);
    if (onActivarDashboard) {
      // Por ahora mandamos al mismo dashboard o alertamos si no existe
      if(idScroll === "proyecto-viaja-segura") {
          onActivarDashboard();
      } else {
          alert("Dashboard en construcción: " + idScroll);
      }
    }
  };

  return (
    <section className="index-section" id="Proyectos">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title"># Proyectos</h2>
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

        {/* --- RENDERIZADO CONDICIONAL DE TARJETAS --- */}
        {proyectoSeleccionado && (
          <div className="synopsis-overlay" onClick={() => setProyectoSeleccionado(null)}>
            
            <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', width: '100%', padding: '0 10px'}}>
               
               {/* LÓGICA DE SELECCIÓN */}
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

               {/* Default para 3 y 4 por ahora */}
               {(proyectoSeleccionado.id > 2) && (
                  <div className="synopsis-card" style={{padding:'40px', textAlign:'center', color:'white'}}>
                      <h3>Próximamente</h3>
                      <p>Implementando Card...</p>
                  </div>
               )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default Indice;