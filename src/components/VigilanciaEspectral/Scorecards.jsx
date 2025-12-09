import React, { useMemo, useState, useEffect } from 'react'; 
import { FONTS } from '../../config/theme';
import * as turf from '@turf/turf';

// Datos
import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json'; 

const C_PROYECTO_VERDE = '#15BE80'; 

// Colores personalizados definidos para los TÍTULOS
const C_TITLE_INVERSION = '#F232A9';
const C_TITLE_PRESION = '#f30a41';
const C_TITLE_AMENAZA = '#b2ea63ff';
const C_TITLE_MANGLAR = '#ffffffff'; 

// Color estándar para los SUBTÍTULOS (Replicando estilo Viaja Segura)
const C_SUBTITULO_ESTANDAR = '#B0B3B8'; // Gris claro uniforme

// La tarjeta ahora recibe un prop para el color del título (titleColor)
const Card = ({ title, value, subtitle, color, titleColor }) => (
  <div style={{
    backgroundColor: 'rgba(21, 24, 35, 0.6)',
    borderRadius: '8px', padding: '15px 10px',
    borderLeft: `4px solid ${color}`,
    display: 'flex', flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center', // Centrado horizontal
    flex: 1, 
    minWidth: '150px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.05)'
  }}>
    {/* Cifra principal (Sigue siendo C_PROYECTO_VERDE) */}
    <div style={{ 
        fontFamily: FONTS.numbers, 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: C_PROYECTO_VERDE,
        marginBottom: '4px' 
    }}>
      {value}
    </div>
    {/* Título (Ahora toma el color de acento) */}
    <div style={{ 
        fontFamily: FONTS.title, fontSize: '10px', fontWeight: '700', 
        color: titleColor, // <--- ¡COLOR DE ACENTO PARA EL TÍTULO!
        textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' 
    }}>
      {title}
    </div>
    {/* Subtítulo (Color estándar de Viaja Segura) */}
    <div style={{ 
        fontFamily: FONTS.body, 
        fontSize: '9px', 
        color: C_SUBTITULO_ESTANDAR, // <--- COLOR GRIS ESTÁNDAR
        marginTop: '4px', 
        lineHeight: '1.3',
        textAlign: 'center' 
    }}>
      {subtitle}
    </div>
  </div>
);


const Scorecards = () => {
    // Corregimos el problema de doble renderizado con esta técnica
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true); 
    }, []);

    const kpis = useMemo(() => {
        try {
          if (!manglaresData || !inversionData || !presionData) {
            return { manglares: "0", inversion: "0", presion: "0", riesgo: "0" };
          }

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
          console.error("Error calculando KPIs:", error);
          return { manglares: "Error", inversion: "Error", presion: "Error", riesgo: "Error" };
        }
  }, []);


    if (!isMounted) {
        return null;
    }
    
    return (
      <>
          <Card 
              value={`${kpis.inversion} Ha`} 
              title="INVERSIÓN INMOBILIARIA" 
              subtitle="Desarrollos proyectados." 
              color="#f5138c" 
              titleColor={C_TITLE_INVERSION} // #F232A9
          />
          <Card 
              value={`${kpis.manglares} Ha`} 
              title="SUPERFICIE MANGLAR" 
              subtitle="Cobertura vegetal base." 
              color="#ffffffff" 
              titleColor={C_TITLE_MANGLAR} // #ffffffff
          />
          <Card 
              value={`${kpis.presion} Ha`} 
              title="ECOSISTEMA PRESIONADO" 
              subtitle="Conflicto directo." 
              color="#e31a1c" 
              titleColor={C_TITLE_PRESION} // #e31a1c
          />
          <Card 
              value={`${kpis.riesgo}%`} 
              title="ÍNDICE DE AMENAZA" 
              subtitle="% del ecosistema bajo presión." 
              color="#FFC107" 
              titleColor={C_TITLE_AMENAZA} // #a4e44aff
          />
      </>
    );
}

export default React.memo(Scorecards);