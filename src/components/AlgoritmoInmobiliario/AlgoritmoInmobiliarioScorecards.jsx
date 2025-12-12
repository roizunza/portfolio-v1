import React, { useMemo, useState, useEffect } from 'react';
import { FONTS, COLORS, PROJECTS } from '../../config/theme';
import distritosData from '../../data/distritos-data-airbnb-hk.json';

const Scorecards = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const RAMP = PROJECTS.algoritmo.ramp;
    const THEME_COLOR = PROJECTS.algoritmo.color; 

    const kpis = useMemo(() => {
        try {
            const features = distritosData.features || [];
            
            const totalStock = features.reduce((acc, curr) => acc + (curr.properties.price_count || 0), 0);
            const totalRevenuePotential = features.reduce((acc, curr) => acc + (curr.properties.price_sum || 0), 0);
            const avgTicket = totalStock > 0 ? (totalRevenuePotential / totalStock) : 0;
            const totalAvailability = features.reduce((acc, curr) => acc + (curr.properties.availability_365_sum || 0), 0);
            const totalAvailabilityCount = features.reduce((acc, curr) => acc + (curr.properties.availability_365_count || 0), 0);
            const avgVacancyDays = totalAvailabilityCount > 0 ? (totalAvailability / totalAvailabilityCount) : 0;
            const avgRotation = features.reduce((acc, curr) => acc + (curr.properties.ROTACION_PORCENTAJE || 0), 0) / features.length;

            return {
                stock: totalStock.toLocaleString(),
                ticket: `$${avgTicket.toFixed(0)} HKD`,
                vacancy: `${avgVacancyDays.toFixed(0)} Días`,
                rotation: `${avgRotation.toFixed(1)}%`
            };

        } catch (error) {
            console.error("Error KPI:", error);
            return { stock: "0", ticket: "$0", vacancy: "0", rotation: "0%" };
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
          {/* KPI 1 - TÍTULO BLANCO */}
          <div style={s.card}>
              <div style={s.number}>{kpis.stock}</div>
              <div style={{...s.title, color: '#FFFFFF'}}>STOCK MERCANTILIZADO</div>
              <div style={s.subtitle}>Viviendas extraídas del mercado</div>
          </div>
          
          {/* KPI 2-step4 */}
          <div style={s.card}>
              <div style={s.number}>{kpis.ticket}</div>
              <div style={{...s.title, color: RAMP.step4}}>BARRERA DE ACCESO</div>
              <div style={s.subtitle}>Costo promedio por noche</div>
          </div>
          
          {/* KPI 3-step3 */}
          <div style={s.card}>
              <div style={s.number}>{kpis.vacancy}</div>
              <div style={{...s.title, color: RAMP.step3}}>SUBUTILIZACIÓN</div>
              <div style={s.subtitle}>Días/Año de suelo vacío</div>
          </div>
          
          {/* KPI 4-step2 */}
          <div style={s.card}>
              <div style={s.number}>{kpis.rotation}</div>
              <div style={{...s.title, color: RAMP.step2}}>PRESIÓN DE ROTACIÓN</div>
              <div style={s.subtitle}>Intensidad de recambio</div>
          </div>
      </React.Fragment>
    );
}

export default React.memo(Scorecards);