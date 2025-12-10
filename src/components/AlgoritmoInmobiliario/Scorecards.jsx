import React, { useMemo, useState, useEffect } from 'react';
import { FONTS } from '../../config/theme';

// IMPORTANTE: Asegúrate de que la ruta al JSON sea correcta
import distritosData from '../../data/distritos-data-airbnb-hk.json';

// Colores del Proyecto
const C_PROYECTO_BLUE = '#2A85FF'; // Azul Tech
const C_ALERTA = '#F30A41';        // Rojo Alerta
const C_ACCENT = '#A020F0';        // Púrpura Especulación
const C_NEUTRO = '#FFFFFF';

const Card = ({ title, value, subtitle, titleColor }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
    width: '100%', height: '100%', minHeight: '80px', boxSizing: 'border-box',
    backgroundColor: 'rgba(21, 24, 35, 0.6)', borderRadius: '8px', padding: '8px',
    border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)'
  }}>
    <div style={{ fontFamily: FONTS.numbers, fontSize: '18px', fontWeight: 'bold', color: C_PROYECTO_BLUE, marginBottom: '4px', lineHeight: '1' }}>
      {value}
    </div>
    <div style={{ fontFamily: FONTS.title, fontSize: '10px', fontWeight: '700', color: titleColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
      {title}
    </div>
    <div style={{ fontFamily: FONTS.body, fontSize: '8px', color: '#B0B3B8', lineHeight: '1.2', opacity: 0.9 }}>
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
            
            // 1. STOCK MERCANTILIZADO (Suma total de unidades)
            const totalStock = features.reduce((acc, curr) => acc + (curr.properties.price_count || 0), 0);
            
            // 2. TICKET PROMEDIO (Promedio Ponderado Global)
            // Usamos la suma total de precios / total de unidades para ser más precisos
            const totalRevenuePotential = features.reduce((acc, curr) => acc + (curr.properties.price_sum || 0), 0);
            const avgTicket = totalStock > 0 ? (totalRevenuePotential / totalStock) : 0;

            // 3. SUBUTILIZACIÓN (Promedio de Disponibilidad)
            // Días promedio que pasan vacíos/disponibles al año
            const totalAvailability = features.reduce((acc, curr) => acc + (curr.properties.availability_365_sum || 0), 0);
            const totalAvailabilityCount = features.reduce((acc, curr) => acc + (curr.properties.availability_365_count || 0), 0);
            const avgVacancyDays = totalAvailabilityCount > 0 ? (totalAvailability / totalAvailabilityCount) : 0;

            // 4. PRESIÓN DE DESPLAZAMIENTO (Rotación Promedio)
            // Promedio simple de la rotación de los distritos
            const avgRotation = features.reduce((acc, curr) => acc + (curr.properties.ROTACION_PORCENTAJE || 0), 0) / features.length;

            return {
                stock: totalStock.toLocaleString(),
                ticket: `$${avgTicket.toFixed(0)} HKD`,
                vacancy: `${avgVacancyDays.toFixed(0)} Días`,
                rotation: `${avgRotation.toFixed(1)}%`
            };

        } catch (error) {
            console.error("Error calculando KPIs Algoritmo:", error);
            return { stock: "0", ticket: "$0", vacancy: "0", rotation: "0%" };
        }
    }, []);

    if (!isMounted) return null;

    return (
      <React.Fragment>
          <Card value={kpis.stock} title="STOCK MERCANTILIZADO" subtitle="Viviendas extraídas del mercado." titleColor={C_NEUTRO} />
          <Card value={kpis.ticket} title="BARRERA DE ACCESO" subtitle="Costo promedio por noche." titleColor={C_ACCENT} />
          <Card value={kpis.vacancy} title="SUBUTILIZACIÓN" subtitle="Días/Año de suelo vacío." titleColor={C_ALERTA} />
          <Card value={kpis.rotation} title="PRESIÓN DE ROTACIÓN" subtitle="Intensidad de recambio." titleColor="#FFC107" />
      </React.Fragment>
    );
}

export default React.memo(Scorecards);