import React, { useState } from 'react';
import './Indice.css'; 

// Importamos TODAS las Cards de Sinopsis
import ViajaSeguraCard from './ViajaSegura/ViajaSeguraCard.jsx';
import VigilanciaEspectralCard from './VigilanciaEspectral/VigilanciaEspectralCard.jsx';
import AlgoritmoInmobiliarioCard from './AlgoritmoInmobiliario/AlgoritmoInmobiliarioCard.jsx'; // <--- Esto requiere que el archivo exista
import FactorEsfuerzoCard from './FactorEsfuerzo/FactorEsfuerzoCard.jsx';

// Iconos
import iconKml from '../assets/kml.PNG';
import iconTiff from '../assets/tiff.PNG';
import iconJson from '../assets/json.PNG';
import iconGpkg from '../assets/gpck.PNG';

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
      idScroll: "proyecto-vigilancia-espectral" 
    },
    {
      id: 3,
      baseName: "03_algoritmo_inmobiliario", // Proyecto Desbloqueado
      extension: ".json",
      extensionColor: "#2A85FF", // Azul Tecnológico (Color del Proyecto)
      icono: iconJson,
      idScroll: "proyecto-algoritmo-inmobiliario" // ID que conecta con App.jsx
    },
    {
      id: 4,
      baseName: "04_factor_esfuerzo_turistico",
      extension: ".gpkg",
      extensionColor: "#EE0E99", 
      icono: iconGpkg,
      idScroll: "proyecto-esfuerzo-turistico"
    }
  ];

  const manejarEjecucion = (idScroll) => {
    // 1. Cerramos el modal primero
    setProyectoSeleccionado(null);
    
    // 2. Ejecutamos la navegación al Dashboard
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

        {/* --- RENDERIZADO DE TARJETAS (MODALES DE SINOPSIS) --- */}
        {proyectoSeleccionado && (
          <div className="synopsis-overlay" onClick={() => setProyectoSeleccionado(null)}>
            
            <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '900px', width: '100%', padding: '0 10px'}}>
                
                {/* 1. VIAJA SEGURA */}
                {proyectoSeleccionado.id === 1 && (
                  <ViajaSeguraCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)}
                  />
                )}

                {/* 2. VIGILANCIA ESPECTRAL */}
                {proyectoSeleccionado.id === 2 && (
                  <VigilanciaEspectralCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)}
                  />
                )}

                {/* 3. ALGORITMO INMOBILIARIO */}
                {proyectoSeleccionado.id === 3 && (
                  <AlgoritmoInmobiliarioCard 
                    onEjecutar={() => manejarEjecucion(proyectoSeleccionado.idScroll)} 
                    onClose={() => setProyectoSeleccionado(null)}
                  />
                )}

                {/* 4. FACTOR ESFUERZO */}
                {proyectoSeleccionado.id === 4 && (
                  <FactorEsfuerzoCard 
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