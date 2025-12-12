import React, { useMemo, useState, useEffect } from 'react';
import { FONTS, COLORS, PROJECTS } from '../../config/theme';
import factorData from '../../data/factor-esfuerzo-turistico.json'; 

const Scorecards = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const RAMP = PROJECTS.factorEsfuerzo.ramp;
    const THEME_COLOR = PROJECTS.factorEsfuerzo.color; 
    const kpis = useMemo(() => {
        try {
            const features = factorData.features || [];
            const totalActivos = features.length;

            const distancias = features.map(f => parseFloat(f.properties.distance) || 0);
            
            const sumaDistancias = distancias.reduce((a, b) => a + b, 0);
            const avgDist = totalActivos > 0 ? (sumaDistancias / totalActivos) : 0;

            const aislados = distancias.filter(d => d > 2000).length;
            const pctAislados = totalActivos > 0 ? ((aislados / totalActivos) * 100).toFixed(1) : 0;

            const conectados = distancias.filter(d => d < 500).length;

            return {
                total: totalActivos,
                distanciaProm: (avgDist / 1000).toFixed(2), 
                aislamiento: pctAislados,
                conectados: conectados
            };

        } catch (error) {
            console.error("Error KPI:", error);
            return { total: 0, distanciaProm: 0, aislamiento: 0, conectados: 0 };
        }
    }, []);

    const s = {
      card: {
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        width: '100%', height: '100%', minHeight: '80px', boxSizing: 'border-box',
        backgroundColor: COLORS.background.panel, 
        borderRadius: '8px', padding: '5px',
        border: `1px solid ${COLORS.ui.border}`,
        backdropFilter: 'blur(10px)'
      },
      number: {
        color: THEME_COLOR, 
        fontFamily: FONTS.main, fontSize: '22px', fontWeight: '700', marginBottom: '4px', lineHeight: '1'
      },
      title: {
        fontFamily: FONTS.body, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px',
      },
      subtitle: {
        color: COLORS.text.secondary, fontFamily: FONTS.body, fontSize: '8px', fontWeight: '500', lineHeight: '1.2', opacity: 0.8
      }
    };

    if (!isMounted) return null;

    return (
      <React.Fragment>
          {/* 1. ACTIVOS MAPEADOS - Título Blanco */}
          <div style={s.card}>
              <div style={s.number}>{kpis.total}</div>
              <div style={{...s.title, color: '#FFFFFF'}}>ACTIVOS MAPEADOS</div>
              <div style={s.subtitle}>Puntos de interés cultural</div>
          </div>
          
          {/* 2. FACTOR ESFUERZO - Título Amarillo */}
          <div style={s.card}>
              <div style={s.number}>{kpis.distanciaProm} km</div>
              <div style={{...s.title, color: RAMP.distancia}}>FACTOR ESFUERZO</div>
              <div style={s.subtitle}>Distancia promedio a red</div>
          </div>
          
          {/* 3. AISLAMIENTO - Título Rosa */}
          <div style={s.card}>
              <div style={s.number}>{kpis.aislamiento}%</div>
              <div style={{...s.title, color: RAMP.aislamiento}}>ÍNDICE DE AISLAMIENTO</div>
              <div style={s.subtitle}>Activos fuera de radio peatonal</div>
          </div>
          
          {/* 4. CONEXIÓN - Título Gris Azulado (#546E7A) */}
          <div style={s.card}>
              <div style={s.number}>{kpis.conectados}</div>
              <div style={{...s.title, color: '#546E7A'}}>NODOS CONECTADOS</div>
              <div style={s.subtitle}>Acceso directo (&lt;500m)</div>
          </div>
      </React.Fragment>
    );
}

export default React.memo(Scorecards);