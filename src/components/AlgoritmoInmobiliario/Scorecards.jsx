import React, { useMemo, useState, useEffect } from 'react';
import { FONTS } from '../../config/theme';
import distritosData from '../../data/distritos-data-airbnb-hk.json';

// --- COLORES ---
// Aquí definimos el nuevo color solicitado
const C_PROYECTO_ROJO = '#FF5A60'; // <--- TU NUEVO COLOR CORAL
const C_SUBTITULO = '#B0B3B8';     // Gris para la descripción

const Card = ({ title, value, subtitle }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
    width: '100%', height: '100%', minHeight: '80px', boxSizing: 'border-box',
    backgroundColor: 'rgba(21, 24, 35, 0.6)', borderRadius: '8px', padding: '8px',
    border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)'
  }}>
    {/* 1. NÚMERO (ESTADÍSTICA) EN ROJO */}
    <div style={{ 
        fontFamily: FONTS.numbers, 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: C_PROYECTO_ROJO, // <--- APLICADO AQUÍ
        marginBottom: '4px', 
        lineHeight: '1' 
    }}>
      {value}
    </div>

    {/* 2. TÍTULO EN ROJO */}
    <div style={{ 
        fontFamily: FONTS.title, 
        fontSize: '10px', 
        fontWeight: '700', 
        color: C_PROYECTO_ROJO, // <--- APLICADO AQUÍ
        textTransform: 'uppercase', 
        letterSpacing: '0.5px', 
        marginBottom: '2px' 
    }}>
      {title}
    </div>

    {/* 3. SUBTÍTULO (DESCRIPCIÓN) EN GRIS */}
    <div style={{ 
        fontFamily: FONTS.body, 
        fontSize: '8px', 
        color: C_SUBTITULO,     // <--- APLICADO AQUÍ
        lineHeight: '1.2', 
        opacity: 0.9 
    }}>
      {subtitle}
    </div>
  </div>
);

const Scorecards = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const kpis = useMemo(() => {
        try {
            const features = distritosData.features || [];
            
            // Cálculos (Sin cambios, solo lógica)
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

    if (!isMounted) return null;

    return (
      <React.Fragment>
          <Card value={kpis.stock} title="STOCK MERCANTILIZADO" subtitle="Viviendas extraídas del mercado." />
          <Card value={kpis.ticket} title="BARRERA DE ACCESO" subtitle="Costo promedio por noche." />
          <Card value={kpis.vacancy} title="SUBUTILIZACIÓN" subtitle="Días/Año de suelo vacío." />
          <Card value={kpis.rotation} title="PRESIÓN DE ROTACIÓN" subtitle="Intensidad de recambio." />
      </React.Fragment>
    );
}

export default React.memo(Scorecards);