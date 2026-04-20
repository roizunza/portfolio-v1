import React, { useMemo, useState, useEffect } from 'react';
import { PROJECTS } from '../../config/theme';
import distritosData from '../../data/distritos-data-airbnb-hk.json';

// Componente modular para no repetir el HTML de las tarjetas
const ScorecardItem = ({ number, title, subtitle, titleColor, styles }) => (
  <div style={styles.card}>
    <div style={styles.number}>{number}</div>
    <div style={{ ...styles.title, color: titleColor || styles.title.color }}>{title}</div>
    <div style={styles.subtitle}>{subtitle}</div>
  </div>
);

const Scorecards = ({ t }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const RAMP = PROJECTS.algoritmo.ramp;
    const THEME_COLOR = PROJECTS.algoritmo.color; 

    const kpis = useMemo(() => {
        try {
            const features = distritosData.features || [];
            const len = features.length;
            
            const totalStock = features.reduce((acc, curr) => acc + (curr.properties.price_count || 0), 0);
            const totalRevenuePotential = features.reduce((acc, curr) => acc + (curr.properties.price_sum || 0), 0);
            const avgTicket = totalStock > 0 ? (totalRevenuePotential / totalStock) : 0;
            
            const totalAvailability = features.reduce((acc, curr) => acc + (curr.properties.availability_365_sum || 0), 0);
            const totalAvailabilityCount = features.reduce((acc, curr) => acc + (curr.properties.availability_365_count || 0), 0);
            const avgVacancyDays = totalAvailabilityCount > 0 ? (totalAvailability / totalAvailabilityCount) : 0;
            
            // FIX MATEMÁTICO: Previene que divida entre cero si la data no ha cargado (evita el NaN%)
            const avgRotation = len > 0 ? features.reduce((acc, curr) => acc + (curr.properties.ROTACION_PORCENTAJE || 0), 0) / len : 0;

            return {
                stock: totalStock.toLocaleString(),
                ticket: `$${avgTicket.toFixed(0)} HKD`,
                vacancy: `${avgVacancyDays.toFixed(0)} Días`,
                rotation: `${avgRotation.toFixed(1)}%`
            };

        } catch (error) {
            console.error("Error KPI:", error);
            return { stock: "0", ticket: "$0", vacancy: "0", rotation: "0.0%" };
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
          <ScorecardItem 
            number={kpis.stock}
            title={t.scorecards.stock}
            subtitle={t.scorecards.stock_sub}
            titleColor="#FFFFFF"
            styles={s}
          />
          <ScorecardItem 
            number={kpis.ticket}
            title={t.scorecards.barrera}
            subtitle={t.scorecards.barrera_sub}
            titleColor={RAMP.step4}
            styles={s}
          />
          <ScorecardItem 
            number={kpis.vacancy}
            title={t.scorecards.subutilizacion}
            subtitle={t.scorecards.subutilizacion_sub}
            titleColor={RAMP.step3}
            styles={s}
          />
          {/* Aquí inyectamos tus textos fijos como respaldo por si falla la traducción */}
          <ScorecardItem 
            number={kpis.rotation}
            title={t.scorecards.rotacion || 'PRESIÓN DE ROTACIÓN'}
            subtitle={t.scorecards.rotacion_sub || 'Intensidad de recambio'}
            titleColor={RAMP.step2}
            styles={s}
          />
      </React.Fragment>
    );
}

export default React.memo(Scorecards);