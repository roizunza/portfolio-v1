import React, { useMemo, useState, useEffect } from 'react'; 
import { FONTS, COLORS, PROJECTS } from '../../config/theme';
import * as turf from '@turf/turf';

import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json'; 

export default function Scorecards() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const THEME = PROJECTS.vigilancia;
    const RAMP = THEME.ramp;

    const kpis = useMemo(() => {
        try {
          if (!manglaresData || !inversionData || !presionData) return { manglares: "0", inversion: "0", presion: "0", riesgo: "0" };

          const areaManglaresM2 = turf.area(manglaresData);
          const areaInversionM2 = turf.area(inversionData);
          const areaPresionM2 = turf.area(presionData);

          const haManglares = (areaManglaresM2 / 10000).toFixed(2);
          const haInversion = (areaInversionM2 / 10000).toFixed(2);
          const haPresion = (areaPresionM2 / 10000).toFixed(2);
          const porcentajeRiesgo = ((areaPresionM2 / areaManglaresM2) * 100);
          const riesgoDisplay = porcentajeRiesgo < 100 ? porcentajeRiesgo.toFixed(1) : porcentajeRiesgo.toFixed(0);

          return { manglares: haManglares, inversion: haInversion, presion: haPresion, riesgo: riesgoDisplay };
        } catch (error) {
          console.error("Error KPIs:", error);
          return { manglares: "Error", inversion: "Error", presion: "Error", riesgo: "Error" };
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
        color: THEME.color, 
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
          {/* 1. ECOSISTEMA PRESIONADO (ROJO) */}
          <div style={s.card}>
              <div style={s.number}>{kpis.presion} Ha</div>
              <div style={{...s.title, color: RAMP.presion}}>ECOSISTEMA PRESIONADO</div>
              <div style={s.subtitle}>Conflicto directo</div>
          </div>

          {/* 2. ÍNDICE DE AMENAZA (NARANJA)*/}
          <div style={s.card}>
              <div style={s.number}>{kpis.riesgo}%</div>
              <div style={{...s.title, color: RAMP.riesgo}}>ÍNDICE DE AMENAZA</div>
              <div style={s.subtitle}>% del ecosistema bajo presión</div>
          </div>

          {/* 3. INVERSIÓN INMOBILIARIA (AMARILLO) */}
          <div style={s.card}>
              <div style={s.number}>{kpis.inversion} Ha</div>
              <div style={{...s.title, color: RAMP.inversion}}>INVERSIÓN INMOBILIARIA</div>
              <div style={s.subtitle}>Desarrollos proyectados</div>
          </div>
          
          {/* 4. SUPERFICIE MANGLAR (BLANCO) */}
          <div style={s.card}>
              <div style={s.number}>{kpis.manglares} Ha</div>
              <div style={{...s.title, color: '#FFFFFF'}}>SUPERFICIE MANGLAR</div>
              <div style={s.subtitle}>Cobertura vegetal base</div>
          </div>
      </React.Fragment>
    );
}