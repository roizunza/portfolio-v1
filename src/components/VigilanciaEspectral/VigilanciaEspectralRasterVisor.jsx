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
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: isMobile ? '60px' : '90px', textAlign: 'right' }}>
            {labels.map((l, i) => (
              <span key={i} style={{ fontSize: '9px', color: '#ccc', fontFamily: FONTS.data, textShadow: '1px 1px 2px black' }}>
                {l}
              </span>
            ))}
        </div>
        
        {/* BARRA CON ETIQUETA SUPERIOR ÚNICAMENTE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: isMobile ? '60px' : '90px', justifyContent: 'flex-start' }}>
            
            {/* Etiqueta Superior Dinámica */}
            <span style={{ fontSize: '8px', color: '#fff', fontFamily: FONTS.data, fontWeight: 'bold', marginBottom: '4px', textAlign: 'center', width: 'max-content' }}>
                {topLabel}
            </span>
            
            {/* Barra Gradiente */}
            <div style={{ 
                width: '12px', 
                flex: 1, 
                background: gradient, 
                borderRadius: '2px', 
                border: '1px solid rgba(255,255,255,0.2)' 
            }}></div>
            
            {/* SIN ETIQUETA INFERIOR */}
        </div>
    </div>
  );

  const RasterCard = ({ title, acronym, img, gradient, labels, topLabel }) => {
      return (
        <div style={{
            flex: 1, minHeight: 0, 
            backgroundColor: COLORS.background.panel,
            borderRadius: '8px', overflow: 'hidden', 
            border: `1px solid ${COLORS.ui.border}`,
            display: 'flex', flexDirection: isMobile ? 'column' : 'row', padding: '15px',
            gap: isMobile ? '5px' : '15px', position: 'relative'
        }}>
            <div style={{ width: isMobile ? '100%' : '40%', zIndex: 10, flexShrink: 0 }}>
                <h2 style={{ 
                    fontFamily: FONTS.body, fontSize: '14px', fontWeight: 'bold', color: '#fff', 
                    whiteSpace: isMobile ? 'nowrap' : 'normal', overflow: isMobile ? 'hidden' : 'visible', textOverflow: 'ellipsis' 
                }}>{title}</h2>
                
                {!isMobile && <div style={{ marginTop: '20px' }}><RenderLegend gradient={gradient} labels={labels} topLabel={topLabel} /></div>}
            </div>
            
            <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                <img src={img} alt={acronym} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.95 }} />
            </div>

            {!isMobile && (
                <h3 style={{
                    position: 'absolute', bottom: '15px', right: '20px',
                    fontFamily: FONTS.main, fontSize: '14px', fontWeight: '700', 
                    color: '#FFFFFF', 
                    margin: 0, letterSpacing: '1px', zIndex: 20
                }}>
                    {acronym}
                </h3>
            )}
        </div>
      );
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', height: '100%', gap: '10px', padding: '10px' }}>
      
      {/* TARJETA 1: NDVI */}
      <RasterCard 
          title="Índice de Vegetación de Diferencia Normalizada" 
          acronym="NDVI" 
          img={ndviImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #86d978 60%, #0f8e64 100%)"
          labels={['0.95', '0.0', '-0.73']}
          topLabel="Alta Vegetación" 
      />

      {/* TARJETA 2: NDWI */}
      <RasterCard 
          title="Índice de Humedad de Diferencia Normalizada" 
          acronym="NDWI" 
          img={ndwiImg}
          gradient="linear-gradient(to top, #f30a41 0%, #f4976c 30%, #77c4df 60%, #0106f7 100%)"
          labels={['0.70', '0.0', '-0.73']}
          topLabel="Alta Humedad" 
      />
    </div>
  );
}