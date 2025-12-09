import React, { useState } from 'react';
import './Indice.css'; 

import ViajaSeguraCard from './ViajaSegura/ViajaSeguraCard.jsx';

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
      titulo: "Análisis Viaja Segura",
      extension: "data.kml",
      icono: iconKml,
      sinopsis: "...", 
      idScroll: "proyecto-viaja-segura" 
    },
    {
      id: 2,
      titulo: "Japón: Trenes y Turismo",
      extension: "analisis.tiff",
      icono: iconTiff,
      sinopsis: "Estudio raster sobre la densidad de atracciones turísticas y su proximidad a la red ferroviaria nacional de Japón.",
      idScroll: "proyecto-japon"
    },
    {
      id: 3,
      titulo: "Airbnb Hong Kong",
      extension: "listings.json",
      icono: iconJson,
      sinopsis: "Visualización interactiva del impacto de alquileres a corto plazo en la disponibilidad de vivienda en distritos de alta densidad.",
      idScroll: "proyecto-hk"
    },
    {
      id: 4,
      titulo: "Recursos Puerto Rico",
      extension: "mapa.gpkg",
      icono: iconGpkg,
      sinopsis: "Investigación cartográfica sobre la privatización de zonas costeras y recursos naturales protegidos.",
      idScroll: "proyecto-pr"
    }
  ];

  const manejarEjecucion = (idScroll) => {
    setProyectoSeleccionado(null);
    if (onActivarDashboard) {
      onActivarDashboard();
    }
  };

  return (
    // AQUI AGREGAMOS EL ID PARA QUE EL HEADER LO ENCUENTRE
    <section className="index-section" id="Proyectos">
      <div className="projects-container">
        
        <div className="projects-header">
          <h2 className="projects-title">#Proyectos</h2>
        </div>

        <div className="projects-grid">
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id} 
              className={`project-file ${proyectoSeleccionado?.id === proyecto.id ? 'active' : ''}`}
              onClick={() => setProyectoSeleccionado(proyecto)}
            >
              <img src={proyecto.icono} alt={proyecto.extension} className="file-icon-img" />
              <span className="file-name">{proyecto.titulo}</span>
              <span className="file-ext">{proyecto.extension}</span>
            </div>
          ))}
        </div>

        {proyectoSeleccionado && (
          <div className="synopsis-overlay" onClick={() => setProyectoSeleccionado(null)}>
            
            {proyectoSeleccionado.id === 1 ? (
              <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', width: '100%', padding: '0 10px'}}>
                 <ViajaSeguraCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)}
                 />
              </div>
            ) : (
              <div className="synopsis-card" onClick={(e) => e.stopPropagation()}>
                <div className="synopsis-header">
                  <span className="synopsis-title">
                    <span style={{color:'#61afef'}}>ℹ info</span> 
                    {proyectoSeleccionado.extension}
                  </span>
                  <button className="btn-close" onClick={() => setProyectoSeleccionado(null)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="synopsis-body">
                  <p>{proyectoSeleccionado.sinopsis}</p>
                </div>
                <div className="synopsis-actions">
                  <button className="btn-navigate" onClick={() => alert("Proyecto en construcción")}>
                    ABRIR_ARCHIVO() <FaArrowRight style={{marginLeft:'5px'}}/>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default Indice;