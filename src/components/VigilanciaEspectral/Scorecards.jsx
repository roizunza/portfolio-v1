import React, { useMemo } from 'react';
import { FONTS } from '../../config/theme';
import * as turf from '@turf/turf';

// Importamos tus datos reales
import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json';

const Card = ({ title, value, subtitle, color }) => (
  <div style={{
    backgroundColor: 'rgba(21, 24, 35, 0.6)',
    borderRadius: '8px', padding: '15px',
    borderLeft: `4px solid ${color}`,
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    flex: 1, 
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    <div style={{ fontFamily: FONTS.numbers, fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
      {value}
    </div>
    <div style={{ fontFamily: FONTS.title, fontSize: '10px', fontWeight: '700', color: color, textTransform: 'uppercase', letterSpacing: '1px' }}>
      {title}
    </div>
    <div style={{ fontFamily: FONTS.body, fontSize: '9px', color: '#a0a0a0', marginTop: '4px', lineHeight: '1.2' }}>
      {subtitle}
    </div>
  </div>
);

export default function Scorecards() {

  // --- CÁLCULO EN VIVO DE ESTADÍSTICAS (Uso de Turf.js) ---
  const kpis = useMemo(() => {
    try {
      // 1. Calcular área en m2
      const areaManglaresM2 = turf.area(manglaresData);
      const areaInversionM2 = turf.area(inversionData);
      const areaPresionM2 = turf.area(presionData);

      // 2. Convertir a Hectáreas (1 ha = 10,000 m2) y redondear
      const haManglares = (areaManglaresM2 / 10000).toFixed(2);
      const haInversion = (areaInversionM2 / 10000).toFixed(2);
      const haPresion = (areaPresionM2 / 10000).toFixed(2);

      // 3. Calcular Porcentaje de Afectación
      const porcentajeRiesgo = ((areaPresionM2 / areaManglaresM2) * 100).toFixed(1);

      return {
        manglares: haManglares,
        inversion: haInversion,
        presion: haPresion,
        riesgo: porcentajeRiesgo
      };

    } catch (error) {
      console.error("Error calculando áreas con Turf:", error);
      return { manglares: "0", inversion: "0", presion: "0", riesgo: "0" };
    }
  }, []); // Se ejecuta una sola vez al montar

  return (
    <>
      {/* KPI 1: INVERSIÓN (Rosa #f5138c) */}
      <Card 
        value={`${kpis.inversion} Ha`} 
        title="INVERSIÓN INMOBILIARIA" 
        subtitle="Superficie de desarrollos proyectados." 
        color="#f5138c" 
      />

      {/* KPI 2: MANGLARES (Verde #15BE80) */}
      <Card 
        value={`${kpis.manglares} Ha`} 
        title="SUPERFICIE MANGLAR" 
        subtitle="Cobertura vegetal base." 
        color="#15BE80" 
      />

      {/* KPI 3: PRESIONADOS (Rojo #e31a1c) */}
      <Card 
        value={`${kpis.presion} Ha`} 
        title="ECOSISTEMA PRESIONADO" 
        subtitle="Conflicto directo Desarrollo vs Naturaleza." 
        color="#e31a1c" 
      />

      {/* KPI 4: RIESGO (Amarillo #FFC107) */}
      <Card 
        value={`${kpis.riesgo}%`} 
        title="ÍNDICE DE AMENAZA" 
        subtitle="% del ecosistema bajo presión inmobiliaria." 
        color="#FFC107" 
      />
    </>
  );
}