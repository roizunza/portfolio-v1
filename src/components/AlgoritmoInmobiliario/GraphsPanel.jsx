import React, { useMemo, useState } from 'react';
import { FONTS } from '../../config/theme';
import distritosData from '../../data/distritos-data-airbnb-hk.json';

// Constantes de Diseño
const C_AZUL_TECH = '#2A85FF';
const C_ROJO_ALERTA = '#F30A41';
const C_FONDO_OSCURO = 'rgba(21, 24, 35, 0.6)';
const C_TEXTO_GRIS = '#B0B3B8';

// --- COMPONENTE INTERNO: SCATTER PLOT (MAPA DE ESPECULACIÓN) ---
const SpeculationScatter = ({ data }) => {
  const [hovered, setHovered] = useState(null);

  // 1. Normalización de Datos para el SVG
  const { points, maxX, maxY } = useMemo(() => {
    const prices = data.map(d => d.properties.PRECIO_PROMEDIO_HK);
    const avails = data.map(d => d.properties.DISPONIBILIDAD_PROMEDIO_DIAS);
    
    const maxXVal = Math.max(...prices) * 1.1; // Margen del 10%
    const maxYVal = Math.max(...avails) * 1.1;

    const pointsCalc = data.map(d => ({
      x: (d.properties.PRECIO_PROMEDIO_HK / maxXVal) * 100, // Porcentaje X
      y: 100 - ((d.properties.DISPONIBILIDAD_PROMEDIO_DIAS / maxYVal) * 100), // Porcentaje Y (Invertido para SVG)
      ...d.properties
    }));

    return { points: pointsCalc, maxX: maxXVal, maxY: maxYVal };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', padding: '10px 10px 20px 30px' }}>
      <h3 style={{ fontFamily: FONTS.title, fontSize: '12px', color: C_TEXTO_GRIS, marginBottom: '10px', textTransform: 'uppercase' }}>
        Mapa de Especulación: Rentabilidad vs. Vacancia
      </h3>
      
      <svg width="100%" height="85%" style={{ overflow: 'visible' }}>
        {/* Ejes */}
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#444" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="100%" stroke="#444" strokeWidth="1" />
        
        {/* Etiquetas de Ejes */}
        <text x="50%" y="115%" textAnchor="middle" fill={C_TEXTO_GRIS} fontSize="9" fontFamily={FONTS.body}>BARRERA ECONÓMICA (PRECIO)</text>
        <text x="-40%" y="-15" transform="rotate(-90)" textAnchor="middle" fill={C_TEXTO_GRIS} fontSize="9" fontFamily={FONTS.body}>SUBUTILIZACIÓN (DÍAS VACÍOS)</text>

        {/* Cuadrantes (Líneas Guía) */}
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#333" strokeDasharray="4" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#333" strokeDasharray="4" />

        {/* Puntos */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={hovered === i ? 6 : 3.5}
            fill={p.y < 50 && p.x > 50 ? C_ROJO_ALERTA : C_AZUL_TECH} // Rojo si es Alta Vacancia + Alto Precio
            stroke="white"
            strokeWidth={hovered === i ? 2 : 0.5}
            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      {/* Tooltip Flotante */}
      {hovered !== null && (
        <div style={{
          position: 'absolute',
          top: '10px', right: '10px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '8px', borderRadius: '4px',
          border: `1px solid ${C_AZUL_TECH}`,
          pointerEvents: 'none'
        }}>
          <div style={{ fontFamily: FONTS.title, fontSize: '11px', color: 'white' }}>{points[hovered].distrito}</div>
          <div style={{ fontFamily: FONTS.code, fontSize: '9px', color: '#ccc' }}>
            Precio: ${points[hovered].PRECIO_PROMEDIO_HK.toFixed(0)} HKD
          </div>
          <div style={{ fontFamily: FONTS.code, fontSize: '9px', color: '#ccc' }}>
            Vacancia: {points[hovered].DISPONIBILIDAD_PROMEDIO_DIAS.toFixed(0)} días
          </div>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE INTERNO: RANKING CHART (TOP EXTRACCIÓN) ---
const ExtractionRanking = ({ data }) => {
  // Ordenamos por cantidad de unidades (Stock)
  const sortedData = useMemo(() => {
    return [...data]
      .sort((a, b) => b.properties.price_count - a.properties.price_count)
      .slice(0, 7); // Top 7 Distritos
  }, [data]);

  const maxVal = sortedData[0].properties.price_count;

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      <h3 style={{ fontFamily: FONTS.title, fontSize: '12px', color: C_TEXTO_GRIS, marginBottom: '15px', textTransform: 'uppercase' }}>
        Ranking de Extracción de Vivienda
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '85%', overflowY: 'auto' }}>
        {sortedData.map((d, i) => {
          const widthPct = (d.properties.price_count / maxVal) * 100;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
              <div style={{ width: '80px', color: '#fff', fontFamily: FONTS.body, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {d.properties.distrito}
              </div>
              <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', height: '14px', position: 'relative' }}>
                <div style={{
                  width: `${widthPct}%`,
                  height: '100%',
                  backgroundColor: C_AZUL_TECH,
                  borderRadius: '2px',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '5px'
                }} />
              </div>
              <div style={{ width: '40px', textAlign: 'right', fontFamily: FONTS.code, color: C_AZUL_TECH }}>
                {d.properties.price_count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL EXPORTADO ---
const GraphsPanel = () => {
  const data = distritosData.features || [];

  return (
    <div style={{ 
      display: 'flex', 
      width: '100%', height: '100%', 
      gap: '15px',
      color: 'white' 
    }}>
      
      {/* GRÁFICO 1: SCATTER PLOT */}
      <div style={{ 
        flex: 1, 
        backgroundColor: C_FONDO_OSCURO, 
        borderRadius: '8px', 
        border: '1px solid rgba(255,255,255,0.05)' 
      }}>
        <SpeculationScatter data={data} />
      </div>

      {/* GRÁFICO 2: RANKING */}
      <div style={{ 
        flex: 1, 
        backgroundColor: C_FONDO_OSCURO, 
        borderRadius: '8px', 
        border: '1px solid rgba(255,255,255,0.05)' 
      }}>
        <ExtractionRanking data={data} />
      </div>

    </div>
  );
};

export default React.memo(GraphsPanel);