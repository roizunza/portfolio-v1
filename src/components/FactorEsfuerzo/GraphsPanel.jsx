import React, { useMemo, useState, useEffect } from 'react';
import { FONTS } from '../../config/theme';

const C_MAGENTA = '#EE0E99';
const C_FONDO = 'rgba(21, 24, 35, 0.6)';

// --- GRÁFICO 1 ---
const DistanceHistogram = ({ data }) => {
  const bins = useMemo(() => {
    const ranges = [0, 0, 0, 0]; 
    const labels = ["< 500m", "0.5-1.5km", "1.5-3km", "> 3km"];

    data.forEach(feature => {
      const d = feature.properties.Factor_Esfuerzo_Líneas_distance || 0;
      if (d < 500) ranges[0]++;
      else if (d < 1500) ranges[1]++;
      else if (d < 3000) ranges[2]++;
      else ranges[3]++;
    });

    const maxCount = Math.max(...ranges) || 1;
    return { ranges, labels, maxCount };
  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%', padding: '15px' }}>
      <h3 style={{ fontFamily: FONTS.title, fontSize: '11px', color: '#B0B3B8', marginBottom: '15px', textTransform: 'uppercase' }}>
        Curva de Esfuerzo (Distribución)
      </h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '80%', paddingBottom: '20px' }}>
        {bins.ranges.map((count, i) => {
          const heightPct = (count / bins.maxCount) * 100;
          const barColor = i === 3 ? C_MAGENTA : '#555'; 
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '20%', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontFamily: FONTS.code, fontSize: '10px', color: '#fff', marginBottom: '5px' }}>{count}</div>
              <div style={{ width: '100%', height: `${heightPct}%`, backgroundColor: barColor, borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease' }} />
              <div style={{ fontFamily: FONTS.body, fontSize: '9px', color: '#888', marginTop: '5px', textAlign: 'center' }}>{bins.labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- GRÁFICO 2 ---
const ConnectionScatter = ({ data }) => {
  const points = useMemo(() => {
    return data.map(f => ({
      x: f.properties.NO_estaciones_cercanas || 0,
      y: f.properties.Factor_Esfuerzo_Líneas_distance || 0
    }));
  }, [data]);

  const maxX = (Math.max(...points.map(p => p.x)) || 10) + 1;
  const maxY = Math.max(...points.map(p => p.y)) || 1000;

  return (
    <div style={{ width: '100%', height: '100%', padding: '15px', position: 'relative' }}>
      <h3 style={{ fontFamily: FONTS.title, fontSize: '11px', color: '#B0B3B8', marginBottom: '5px', textTransform: 'uppercase' }}>
        Vulnerabilidad: Aislamiento vs. Opciones
      </h3>
      <svg width="100%" height="80%" style={{ overflow: 'visible' }}>
        <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#444" strokeWidth="1" />
        <line x1="0" y1="0" x2="0" y2="100%" stroke="#444" strokeWidth="1" />
        <text x="50%" y="115%" textAnchor="middle" fill="#666" fontSize="9" fontFamily={FONTS.body}>Nº ESTACIONES CERCANAS</text>
        <text x="-40%" y="-15" transform="rotate(-90)" textAnchor="middle" fill="#666" fontSize="9" fontFamily={FONTS.body}>DISTANCIA (m)</text>
        {points.map((p, i) => (
          <circle
            key={i}
            cx={`${(p.x / maxX) * 100}%`} 
            cy={`${100 - ((p.y / maxY) * 100)}%`}
            r="3"
            fill={p.x === 0 && p.y > 2000 ? C_MAGENTA : '#2A85FF'}
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
};

const GraphsPanel = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
      const cargarData = async () => {
          try {
              // IMPORTACIÓN DINÁMICA
              const module = await import('../../data/activos-turisticos.json');
              setFeatures(module.default.features || []);
          } catch (error) {
              console.error("Error loading graphs data:", error);
          }
      };
      cargarData();
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', gap: '15px' }}>
      <div style={{ flex: 1, backgroundColor: C_FONDO, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <DistanceHistogram data={features} />
      </div>
      <div style={{ flex: 1, backgroundColor: C_FONDO, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <ConnectionScatter data={features} />
      </div>
    </div>
  );
};

export default React.memo(GraphsPanel);