import React from 'react';
import { FONTS } from '../../config/theme';

// Importa tus imágenes generadas (Asegúrate de ponerlas en src/assets/)
// Si aún no las generas, el código no tronará, solo mostrará el cuadro vacío/roto
import ndviImg from '../../assets/ndvi_visual.png';
import ndwiImg from '../../assets/ndwi_visual.png';

export default function RasterVisor() {
  
  const containerStyle = {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    position: 'absolute', top: '10px', left: '10px',
    backgroundColor: 'rgba(0,0,0,0.8)', padding: '4px 8px',
    borderRadius: '4px', color: '#fff', fontSize: '10px',
    fontFamily: FONTS.code, border: '1px solid rgba(255,255,255,0.2)',
    zIndex: 10
  };

  // Barra de leyenda CSS pura
  const LegendBar = ({ gradient, labels }) => (
    <div style={{
      position: 'absolute', bottom: '10px', right: '10px',
      backgroundColor: 'rgba(0,0,0,0.8)', padding: '5px',
      borderRadius: '4px', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ width: '100px', height: '8px', background: gradient, borderRadius: '2px', marginBottom: '4px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#ccc', fontFamily: FONTS.code }}>
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '15px', padding: '15px' }}>
      
      {/* 1. VISUALIZACIÓN NDVI (Vegetación) */}
      <div style={containerStyle}>
        <div style={labelStyle}>BAND 6: NDVI (Vegetation Health)</div>
        
        {/* Imagen Raster */}
        <div style={{ flex: 1, position: 'relative' }}>
            <img 
                src={ndviImg} 
                alt="Analisis NDVI" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                onError={(e) => {e.target.style.display='none'}} // Oculta si no carga
            />
        </div>

        {/* Leyenda Dinámica (Rojo a Verde) */}
        <LegendBar 
            gradient="linear-gradient(to right, #d73027, #ffffbf, #1a9850)" 
            labels={['-1.0 (Suelo/Agua)', '1.0 (Vegetación Densa)']} 
        />
      </div>

      {/* 2. VISUALIZACIÓN NDWI (Agua/Humedad) */}
      <div style={containerStyle}>
        <div style={labelStyle}>BAND 7: NDWI (Water Stress)</div>
        
        {/* Imagen Raster */}
        <div style={{ flex: 1, position: 'relative' }}>
            <img 
                src={ndwiImg} 
                alt="Analisis NDWI" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                onError={(e) => {e.target.style.display='none'}} 
            />
        </div>

        {/* Leyenda Dinámica (Tierra a Azul) */}
        <LegendBar 
            gradient="linear-gradient(to right, #ffffff, #00BFFF)" 
            labels={['-1.0 (Tierra)', '1.0 (Agua)']} 
        />
      </div>

    </div>
  );
}