import React from 'react';
import { FONTS } from '../../config/theme';
import ndviImg from '../../assets/ndvi_visual.png';
import ndwiImg from '../../assets/ndwi_visual.png';

const C_PROYECTO_VERDE = '#15BE80';

// Componente Panel de Información (Solo Texto y Leyenda)
// NOTA: Ya no recibe 'acronym', porque eso lo movemos al contenedor principal
const InfoPanel = ({ title, gradient, labels }) => (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        width: '40%', // Ancho de la columna de texto
        zIndex: 10,
        paddingRight: '10px'
    }}>
        
        {/* 1. TÍTULO PRINCIPAL (14px) */}
        <div style={{ marginBottom: '10px' }}>
            <h2 style={{ 
                fontFamily: FONTS.title, 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: '#fff', 
                lineHeight: '1.2',
                textAlign: 'left',
                textTransform: 'uppercase',
                margin: 0
            }}>
                {title}
            </h2>
        </div>

        {/* 2. SIMBOLOGÍA (Leyenda) */}
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-start'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                {/* Etiquetas Numéricas */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90px', textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code }}>{labels[0]}</span>
                    <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code }}>{labels[1]}</span>
                    <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code }}>{labels[2]}</span>
                </div>

                {/* Barra de Color */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', color: '#888', marginBottom: '3px', textTransform: 'uppercase', fontFamily: FONTS.body, letterSpacing:'1px' }}>VALOR</span>
                    <div style={{ 
                        width: '12px', 
                        height: '90px', 
                        background: gradient, 
                        borderRadius: '2px',
                        border: '1px solid rgba(255,255,255,0.2)' 
                    }}></div>
                </div>
            </div>
        </div>

    </div>
);


export default function RasterVisor() {
  
  // Contenedor General de la Tarjeta
  const cardStyle = {
    flex: 1, 
    backgroundColor: 'rgba(21, 24, 35, 0.6)', 
    borderRadius: '8px',
    overflow: 'hidden', 
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex', 
    flexDirection: 'row', 
    padding: '20px',
    gap: '15px',
    position: 'relative' // <--- IMPORTANTE: Necesario para posicionar la etiqueta en la esquina
  };

  // Contenedor de la Imagen
  const imageWrapperStyle = {
    flex: 1, // Ocupa el espacio restante entre el título y el borde derecho
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
    
    // --- AQUÍ CONTROLAS EL ÁREA DISPONIBLE PARA LA IMAGEN ---
    // Si aumentas este padding, la imagen se hará visualmente más pequeña.
    padding: '8px 40px 1px 0px' 
  };

  const imgStyle = {
    // --- AQUÍ CONTROLAS EL TAMAÑO DE LA IMAGEN (PNG) ---
    width: '100%',  // Intenta ocupar todo el ancho del contenedor wrapper
    height: '100%', // Intenta ocupar todo el alto
    objectFit: 'contain', // Asegura que la imagen NO se recorte y se vea completa
    
    opacity: 0.95,
    filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.5))'
  };

  // Estilo para la Etiqueta en la Esquina Inferior Derecha
  const tagStyle = {
    position: 'absolute',
    bottom: '15px', // Margen inferior
    right: '20px',  // Margen derecho (Donde marcaste el círculo rojo)
    fontFamily: FONTS.code, 
    fontSize: '14px', 
    fontWeight: '700', 
    color: '#fff', 
    margin: 0, 
    letterSpacing: '1px'
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '15px', padding: '15px' }}>
      
      {/* --- TARJETA 1: NDVI --- */}
      <div style={cardStyle}>
        
        {/* IZQUIERDA: Título y Leyenda */}
        <InfoPanel 
            title="ÍNDICE DE VEGETACIÓN NORMALIZADA"
            gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #86d978 60%, #0f8e64 100%)"
            labels={['0.95', '0.0', '-0.73']}
        />

        {/* CENTRO/DERECHA: Imagen PNG */}
        <div style={imageWrapperStyle}>
            <img 
                src={ndviImg} 
                alt="Mapa NDVI" 
                style={imgStyle}
                onError={(e) => {e.target.style.display='none'}} 
            />
        </div>

        {/* ESQUINA INFERIOR DERECHA: Etiqueta */}
        <h3 style={tagStyle}>NDVI</h3>
      </div>


      {/* --- TARJETA 2: NDWI --- */}
      <div style={cardStyle}>
        
        {/* IZQUIERDA: Título y Leyenda */}
        <InfoPanel 
            title="ÍNDICE DE HUMEDAD NORMALIZADA"
            gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #77c4df 60%, #0106f7 100%)"
            labels={['0.70', '0.0', '-0.73']}
        />

        {/* CENTRO/DERECHA: Imagen PNG */}
        <div style={imageWrapperStyle}>
            <img 
                src={ndwiImg} 
                alt="Mapa NDWI" 
                style={imgStyle}
                onError={(e) => {e.target.style.display='none'}} 
            />
        </div>

        {/* ESQUINA INFERIOR DERECHA: Etiqueta */}
        <h3 style={tagStyle}>NDWI</h3>
      </div>

    </div>
  );
}