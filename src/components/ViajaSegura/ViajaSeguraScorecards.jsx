import React, { useMemo } from 'react';
import { PROJECTS } from '../../config/theme';
import recorridosData from '../../data/recorridos.json';

// Componente modular para evitar redundancia de bloques (Principio DRY)
const ScorecardItem = ({ number, title, subtitle, titleColor, styles }) => (
  <div style={styles.card}>
    <div style={styles.number}>{number}</div>
    <div style={{ ...styles.title, color: titleColor || styles.title.color }}>{title}</div>
    <div style={styles.subtitle}>{subtitle}</div>
  </div>
);

export default function Scorecards({ t }) {
  // Optimizacion: Memorizacion de calculos para evitar reprocesamiento en renders
  const kpis = useMemo(() => {
    const features = recorridosData?.features || [];
    const totalRutas = features.length;
    const kmTotal = features.reduce((acc, f) => acc + (f.properties.Longitud_km || 0), 0);
    const demandaTotal = features.reduce((acc, f) => acc + (f.properties.Demanda_Diaria || 0), 0);
    
    const maxSaturacion = features.reduce((max, f) => {
      const cap = f.properties.Unidad_Capacidad || 1; 
      const sat = (f.properties.Maximo_Abordo / cap) * 100;
      return sat > max ? sat : max;
    }, 0);

    return {
      totalRutas,
      kmTotal: Math.round(kmTotal),
      demandaTotal,
      maxSaturacion: Math.round(maxSaturacion)
    };
  }, []);

  const RUTAS_COLORS = PROJECTS.viajaSegura.ramp.rutas;

  // Diseno, fuentes y colores intactos (segun especificacion estricta)
  const s = {
    card: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', height: '100%', minHeight: '80px', backgroundColor: 'rgba(21, 24, 35, 0.6)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '5px', boxSizing: 'border-box' },
    number: { color: '#A020F0', fontFamily: "'Source Code Pro', monospace", fontSize: '22px', fontWeight: '700', marginBottom: '4px', lineHeight: '1' },
    title: { fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', color: '#FFFFFF' },
    subtitle: { color: '#B4A7AF', fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: '500', lineHeight: '1.2', opacity: 0.8 }
  };

  if (!t || !t.scorecards) return null;

  return (
    <React.Fragment>
      <ScorecardItem 
        number={kpis.totalRutas}
        title={t.scorecards.rutas}
        subtitle={t.scorecards.rutas_sub}
        styles={s}
      />
      
      <ScorecardItem 
        number={`${kpis.kmTotal} km`}
        title={t.scorecards.conexion}
        subtitle={t.scorecards.conexion_sub}
        titleColor={RUTAS_COLORS.oyamel}
        styles={s}
      />
      
      <ScorecardItem 
        number={`+${kpis.demandaTotal.toLocaleString()}`}
        title={t.scorecards.viajes}
        subtitle={t.scorecards.viajes_sub}
        titleColor={RUTAS_COLORS.antigua}
        styles={s}
      />
      
      <ScorecardItem 
        number={`${kpis.maxSaturacion}%`}
        title={t.scorecards.sobrecarga}
        subtitle={t.scorecards.sobrecarga_sub}
        titleColor={RUTAS_COLORS.ocotal}
        styles={s}
      />
    </React.Fragment>
  );
}