import React from 'react';
import { FONTS } from '../../config/theme';
import ndviImg from '../../assets/ndvi_visual.png';
import ndwiImg from '../../assets/ndwi_visual.png';

const C_PROYECTO_VERDE = '#15BE80';

// Componente para clonar el estilo de título de Viaja Segura
const SectionTitle = ({ title, subtitle, color }) => (
    <div style={{ marginBottom: '10px', paddingLeft: '10px' }}>
        <h3 style={{ 
            fontFamily: FONTS.title, fontSize: '14px', fontWeight: '700', 
            color: color, margin: 0, letterSpacing: '1px' 
        }}>
            {subtitle}
        </h3>
        <h2 style={{ 
            fontFamily: FONTS.title, fontSize: '24px', fontWeight: 'bold', 
            color: '#fff', margin: '2px 0 0 0', lineHeight: '1.1'
        }}>
            {title}
        </h2>
    </div>
);


// Leyenda VERTICAL (Nueva Implementación)
const VerticalLegend = ({ gradient, labels }) => (
  <div style={{
    position: 'absolute', 
    bottom: '10px', 
    left: '10px', // Alineado a la izquierda
    backgroundColor: 'rgba(0,0,0,0.8)', 
    padding: '8px 10px 8px 10px', // Ajustado para espacio de etiquetas
    borderRadius: '4px', 
    zIndex: 10, 
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', 
    flexDirection: 'row', // La barra es un elemento, las etiquetas otro
    alignItems: 'center',
    height: '120px' // Altura fija para la leyenda
  }}>
    {/* Contenedor de etiquetas de texto a la izquierda */}
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginRight: '10px' }}>
      <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, alignSelf: 'flex-start' }}>{labels[0]}</span>
      <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, alignSelf: 'flex-start' }}>{labels[1]}</span>
      <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, alignSelf: 'flex-start' }}>{labels[2]}</span>
    </div>
    
    {/* Barra de color Vertical */}
    <div style={{ 
        width: '12px', 
        height: '100%', 
        background: gradient, 
        borderRadius: '2px', 
        transform: 'rotate(180deg)' // Giramos 180 para que el gradiente vaya de abajo hacia arriba
    }}></div>
  </div>
);


export default function RasterVisor() {
  
  const baseContainerStyle = {
    flex: 1, 
    backgroundColor: 'rgba(21, 24, 35, 0.6)', // Fondo oscuro translúcido consistente
    borderRadius: '6px',
    overflow: 'hidden', 
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', 
    flexDirection: 'column',
    padding: '15px' // Añadimos padding para el título
  };

  const imageContainerStyle = {
    flex: 1, 
    position: 'relative',
    // IMPORTANTE: Aseguramos que el fondo detrás del PNG sea transparente o del color del contenedor padre
    backgroundColor: 'transparent' 
  };
  
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '15px', padding: '15px' }}>
      
      {/* 1. VISUALIZACIÓN NDVI (Vegetación) */}
      <div style={baseContainerStyle}>
        <SectionTitle 
            title="Índice de Vegetación Normalizada" 
            subtitle="BAND 6: NDVI" 
            color={C_PROYECTO_VERDE}
        />
        
        {/* Imagen Raster */}
        <div style={imageContainerStyle}>
            <img 
                src={ndviImg} 
                alt="Analisis NDVI" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }} 
                onError={(e) => {e.target.style.display='none'}} 
            />
        </div>

        {/* Leyenda Vertical NDVI (Rojo a Verde) */}
        <VerticalLegend 
            // Estos colores deben coincidir con tu script de Python
            gradient={`linear-gradient(to top, #f30a41 0%, #f4976c 20%, #86d978 43%, #0f8e64 100%)`} 
            labels={['0.95', '0', '-0.73']} // Alto, Medio, Bajo
        />
      </div>

      {/* 2. VISUALIZACIÓN NDWI (Agua/Humedad) */}
      <div style={baseContainerStyle}>
        <SectionTitle 
            title="Índice de Humedad Normalizada" 
            subtitle="BAND 7: NDWI" 
            color={C_PROYECTO_VERDE}
        />
        
        {/* Imagen Raster */}
        <div style={imageContainerStyle}>
            <img 
                src={ndwiImg} 
                alt="Analisis NDWI" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
                onError={(e) => {e.target.style.display='none'}} 
            />
        </div>

        {/* Leyenda Vertical NDWI (Rojo a Azul) */}
        <VerticalLegend 
            // Estos colores deben coincidir con tu script de Python
            gradient={`linear-gradient(to top, #f30a41 0%, #f4976c 25%, #77c4df 51%, #0106f7 100%)`} 
            labels={['0.7', '0', '-0.73']} // Alto, Medio, Bajo
        />
      </div>

    </div>
  );
}