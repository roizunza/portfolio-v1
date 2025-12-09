import React from 'react';
// 1. Importamos el Molde Universal
import ProjectCard from '../Shared/ProjectCard';
// 2. Importamos la imagen
import imagenPortada from '../../assets/viajasegura.jpg'; 

const ViajaSeguraCard = ({ onEjecutar, onClose }) => {
  return (
    // 3. Usamos el Molde y le pasamos los datos específicos de Viaja Segura
    <ProjectCard
      title="01_viaja_segura"
      defColor="#A020F0"  // Morado Fosfo
      comment="// Escala local"
      image={imagenPortada}
      onEjecutar={onEjecutar}
      onClose={onClose}
    >
      {/* 4. Aquí va solo el texto narrativo */}
      <p className="project-text">
        Para comunidades como Oyamel, Antigua y Ocotal, situadas en la periferia alta del sur de la CDMX, 
        el transporte público concesionado es el medio inmediato para conectarse con la ciudad.
      </p>
      
      <p className="project-text">
        Este proyecto evalúa el programa "Viaja Segura", una iniciativa social de la Ruta 66 que ofrece 
        servicio exclusivo para mujeres e infancias en horas pico. El análisis trasciende la operación: 
        vincula estos recorridos con los equipamientos de cuidado, necesarios en la cotidianidad para sostener la vida.
      </p>
    </ProjectCard>
  );
};

export default ViajaSeguraCard;