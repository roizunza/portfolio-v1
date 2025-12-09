import React, { useState, useEffect } from 'react';
import { FONTS } from '../../config/theme';
import ndviImg from '../../assets/ndvi_visual.png';
import ndwiImg from '../../assets/ndwi_visual.png';

const C_PROYECTO_VERDE = '#15BE80';

export default function RasterVisor() {
  
  // 1. DETECTOR DE TAMAÑO DE PANTALLA
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- COMPONENTES INTERNOS ---

  // A. SIMBOLOGÍA (Sin fondo, Ajustable)
  const RenderLegend = ({ gradient, labels }) => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '8px',
        backgroundColor: 'transparent', 
        padding: '0'
    }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: isMobile ? '60px' : '90px', textAlign: 'right' }}>
            <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, textShadow: '1px 1px 2px black' }}>{labels[0]}</span>
            <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, textShadow: '1px 1px 2px black' }}>{labels[1]}</span>
            <span style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.code, textShadow: '1px 1px 2px black' }}>{labels[2]}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '7px', color: '#888', marginBottom: '3px', textTransform: 'uppercase', fontFamily: FONTS.body, letterSpacing:'1px', textShadow: '1px 1px 2px black' }}>VALOR</span>
            <div style={{ 
                width: '12px', height: isMobile ? '60px' : '90px', background: gradient, borderRadius: '2px', border: '1px solid rgba(255,255,255,0.2)' 
            }}></div>
        </div>
    </div>
  );

  // B. TARJETA ÚNICA
  const RasterCard = ({ title, acronym, img, gradient, labels }) => {
      return (
        <div style={{
            flex: 1, 
            minHeight: 0, 
            backgroundColor: 'rgba(21, 24, 35, 0.6)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', 
            padding: '15px',
            gap: isMobile ? '5px' : '15px', 
            position: 'relative'
        }}>
            
            {/* 1. TÍTULO */}
            <div style={{ 
                width: isMobile ? '100%' : '40%',
                zIndex: 10,
                flexShrink: 0 
            }}>
                <h2 style={{ 
                    fontFamily: FONTS.title, 
                    fontSize: isMobile ? '14px' : '14px', 
                    fontWeight: 'bold', 
                    color: '#fff', 
                    lineHeight: '1.2',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    margin: 0,
                    whiteSpace: isMobile ? 'nowrap' : 'normal',
                    overflow: isMobile ? 'hidden' : 'visible',
                    textOverflow: 'ellipsis'
                }}>
                    {title}
                </h2>

                {/* En ESCRITORIO, la leyenda vive aquí abajo del título */}
                {!isMobile && (
                    <div style={{ marginTop: '20px' }}>
                        <RenderLegend gradient={gradient} labels={labels} />
                    </div>
                )}
            </div>

            {/* 2. IMAGEN */}
            <div style={{
                flex: 1, 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%', 
                // Padding ajustado para dejar espacio a la etiqueta
                padding: isMobile ? '0px 0px 40px 0px' : '10px 40px 20px 0px' 
            }}>
                <img 
                    src={img} 
                    alt={acronym} 
                    style={{
                        width: '100%', height: '100%', 
                        objectFit: 'contain', 
                        opacity: 0.95, 
                        filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.5))'
                    }}
                    onError={(e) => {e.target.style.display='none'}} 
                />

                {/* 3. GRUPO MÓVIL: LEYENDA + ETIQUETA */}
                {isMobile && (
                    <div style={{ 
                        position: 'absolute', 
                        // AJUSTE CLAVE: Levantamos 10px del fondo y 10px de la derecha para evitar cortes
                        bottom: '10px', 
                        right: '10px', 
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'flex-end',  
                        gap: '2px',
                        zIndex: 20
                    }}>
                        {/* A. LEYENDA (Arriba) */}
                        <RenderLegend gradient={gradient} labels={labels} />
                        
                        {/* B. ETIQUETA (Abajo) - Color Blanco */}
                        <h3 style={{
                            fontFamily: FONTS.code, 
                            fontSize: '10px', 
                            fontWeight: '700', 
                            // CAMBIO DE COLOR: Ahora es BLANCO
                            color: '#FFFFFF', 
                            margin: 0, 
                            letterSpacing: '1px',
                            backgroundColor: 'transparent', 
                            padding: '0',
                            textShadow: '1px 1px 3px rgba(0,0,0,0.8)' // Sombra para que resalte sobre el mapa
                        }}>
                            {acronym}
                        </h3>
                    </div>
                )}
            </div>

            {/* ETIQUETA ESCRITORIO */}
            {!isMobile && (
                <h3 style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '20px',
                    fontFamily: FONTS.code, 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: C_PROYECTO_VERDE, 
                    margin: 0, 
                    letterSpacing: '1px',
                    zIndex: 20
                }}>
                    {acronym}
                </h3>
            )}

        </div>
      );
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        width: '100%', 
        height: '100%', 
        gap: '10px', 
        padding: '10px',
        overflow: 'hidden' 
    }}>
      
      <RasterCard 
          title="ÍNDICE DE VEGETACIÓN NORMALIZADA"
          acronym="NDVI"
          img={ndviImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #86d978 60%, #0f8e64 100%)"
          labels={['0.95', '0.0', '-0.73']}
      />

      <RasterCard 
          title="ÍNDICE DE HUMEDAD NORMALIZADA"
          acronym="NDWI"
          img={ndwiImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #77c4df 60%, #0106f7 100%)"
          labels={['0.70', '0.0', '-0.73']}
      />

    </div>
  );
}