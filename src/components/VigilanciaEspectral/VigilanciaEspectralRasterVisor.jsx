import React, { useState, useEffect } from 'react';
import { FONTS, COLORS } from '../../config/theme';
import ndviImg from '../../assets/ndvi_visual.png'; 
import ndwiImg from '../../assets/ndwi_visual.png'; 

export default function RasterVisor() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const RenderLegend = ({ gradient, labels, topLabel }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '60px', textAlign: 'right' }}>
            {labels.map((l, i) => (
              <span key={i} style={{ 
                  fontSize: '10px', 
                  color: '#B0B3B8', 
                  fontFamily: FONTS.data, 
                  textShadow: '1px 1px 2px black' 
              }}>
                {l}
              </span>
            ))}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '60px', justifyContent: 'flex-start' }}>
            <span style={{ 
                fontSize: '10px', 
                color: '#fff', 
                fontFamily: FONTS.body, 
                fontWeight: 'bold', 
                marginBottom: '4px', 
                textAlign: 'center', 
                width: 'max-content', 
                textShadow: '1px 1px 2px black',
                letterSpacing: '0.3px'
            }}>
                {topLabel}
            </span>
            <div style={{ 
                width: '12px', 
                flex: 1, 
                background: gradient, 
                borderRadius: '2px', 
                border: '1px solid rgba(255,255,255,0.2)' 
            }}></div>
        </div>
    </div>
  );

  const RasterCard = ({ title, acronym, img, gradient, labels, topLabel }) => {
      return (
        <div style={{
            flex: 1, 
            minHeight: 0, 
            width: '100%', 
            backgroundColor: COLORS.background.panel,
            borderRadius: '8px', overflow: 'hidden', 
            border: `1px solid ${COLORS.ui.border}`,
            display: 'flex', flexDirection: 'column', 
            position: 'relative'
        }}>
            {/* TÍTULO (Ajustado para ocupar 2 renglones) */}
            <div style={{ 
                position: 'absolute', 
                top: '15px', 
                left: '15px', 
                zIndex: 10, 
                maxWidth: '150px' 
            }}>
                <h2 style={{ 
                    fontFamily: FONTS.body, 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#FFFFFF', 
                    margin: 0,
                    letterSpacing: '0.3px',
                    lineHeight: '1.3', 
                    textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                }}>{title}</h2>
            </div>
            
            {/* IMAGEN DE FONDO */}
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src={img} alt={acronym} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.95 }} />
                
                {/* LEYENDA Y ETIQUETA (Derecha Abajo) */}
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    zIndex: 20,
                    gap: '10px'
                }}>
                    <RenderLegend gradient={gradient} labels={labels} topLabel={topLabel} />
                    
                    <h3 style={{
                        fontFamily: FONTS.main, 
                        fontSize: '14px', 
                        fontWeight: '700', 
                        color: '#FFFFFF', 
                        margin: 0, 
                        letterSpacing: '1px',
                        textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
                    }}>
                        {acronym}
                    </h3>
                </div>
            </div>
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
      
      {/* TARJETA 1: NDVI */}
      <RasterCard 
          title="Índice de vegetación de diferencia normalizada" 
          acronym="NDVI" 
          img={ndviImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #86d978 60%, #0f8e64 100%)"
          labels={['0.95', '0.0', '-0.73']}
          topLabel="Alta Vegetación" 
      />

      {/* TARJETA 2: NDWI */}
      <RasterCard 
          title="Índice de humedad de diferencia normalizada" 
          acronym="NDWI" 
          img={ndwiImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #77c4df 60%, #0106f7 100%)"
          labels={['0.70', '0.0', '-0.73']}
          topLabel="Alta Humedad" 
      />
    </div>
  );
}