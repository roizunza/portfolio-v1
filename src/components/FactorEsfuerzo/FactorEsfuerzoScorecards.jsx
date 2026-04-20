import React, { useMemo, useState, useEffect } from 'react';
import { PROJECTS } from '../../config/theme';
import factorData from '../../data/factor-esfuerzo-turistico.json'; 

const Scorecards = ({ t }) => {
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
        backgroundColor: 'var(--fondo-panel)', 
        borderRadius: '8px', padding: '5px',
        border: '1px solid var(--borde-sutil)',
        backdropFilter: 'blur(10px)'
      },
      number: {
        color: THEME_COLOR, 
        fontFamily: 'var(--fuente-datos)', fontSize: '22px', fontWeight: '700', marginBottom: '4px', lineHeight: '1'
      },
      title: {
        fontFamily: 'var(--fuente-ui)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px',
      },
      subtitle: {
        color: 'var(--texto-secundario)', fontFamily: 'var(--fuente-ui)', fontSize: '8px', fontWeight: '500', lineHeight: '1.2', opacity: 0.8
      }
    };

    if (!isMounted || !t || !t.scorecards) return null;

    return (
      <React.Fragment>
          <div style={s.card}>
              <div style={s.number}>{kpis.total}</div>
              <div style={{...s.title, color: '#FFFFFF'}}>{t.scorecards.activos}</div>
              <div style={s.subtitle}>{t.scorecards.activos_sub}</div>
          </div>
          
          <div style={s.card}>
              <div style={s.number}>{kpis.distanciaProm}{t.scorecards.km}</div>
              <div style={{...s.title, color: RAMP.distancia}}>{t.scorecards.esfuerzo}</div>
              <div style={s.subtitle}>{t.scorecards.esfuerzo_sub}</div>
          </div>
          
          <div style={s.card}>
              <div style={s.number}>{kpis.aislamiento}%</div>
              <div style={{...s.title, color: RAMP.aislamiento}}>{t.scorecards.aislamiento}</div>
              <div style={s.subtitle}>{t.scorecards.aislamiento_sub}</div>
          </div>
          
          <div style={s.card}>
              <div style={s.number}>{kpis.conectados}</div>
              <div style={{...s.title, color: '#546E7A'}}>{t.scorecards.conexion}</div>
              <div style={s.subtitle}>{t.scorecards.conexion_sub}</div>
          </div>
      </React.Fragment>
    );
}

export default React.memo(Scorecards);