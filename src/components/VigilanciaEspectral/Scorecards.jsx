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
const C_TITLE_MANGLAR = '#FFFFFF'; 

const C_SUBTITULO_ESTANDAR = '#B0B3B8'; 

const Card = ({ title, value, subtitle, titleColor }) => (
  <div style={{
    // Estilo base idéntico a Viaja Segura
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    
    // Dimensiones para evitar cortes
    width: '100%', 
    height: '100%', 
    minHeight: '80px', 
    boxSizing: 'border-box',
    
    // Estética Limpia (SIN FRANJA LATERAL)
    backgroundColor: 'rgba(21, 24, 35, 0.6)',
    borderRadius: '8px',
    padding: '8px', // Un poco más de aire interno
    border: '1px solid rgba(255,255,255,0.05)', // Borde sutil uniforme
    backdropFilter: 'blur(10px)'
  }}>
    {/* Cifra principal */}
    <div style={{ 
        fontFamily: FONTS.numbers, 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: C_PROYECTO_VERDE,
        marginBottom: '4px',
        lineHeight: '1'
    }}>
      {value}
    </div>
    
    {/* Título (El color viene aquí, no en el borde) */}
    <div style={{ 
        fontFamily: FONTS.title, 
        fontSize: '10px', 
        fontWeight: '700', 
        color: titleColor, 
        textTransform: 'uppercase', 
        letterSpacing: '0.5px',
        marginBottom: '2px'
    }}>
      {title}
    </div>
    
    {/* Subtítulo */}
    <div style={{ 
        fontFamily: FONTS.body, 
        fontSize: '8px', 
        color: C_SUBTITULO_ESTANDAR, 
        lineHeight: '1.2',
        opacity: 0.9
    }}>
      {subtitle}
    </div>
  </div>
);


const Scorecards = () => {
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
      <React.Fragment>
          {/* Eliminé el prop 'color' ya que no se usará para el borde */}
          <Card 
              value={`${kpis.inversion} Ha`} 
              title="INVERSIÓN INMOBILIARIA" 
              subtitle="Desarrollos proyectados." 
              titleColor={C_TITLE_INVERSION} 
          />
          <Card 
              value={`${kpis.manglares} Ha`} 
              title="SUPERFICIE MANGLAR" 
              subtitle="Cobertura vegetal base." 
              titleColor={C_TITLE_MANGLAR} 
          />
          <Card 
              value={`${kpis.presion} Ha`} 
              title="ECOSISTEMA PRESIONADO" 
              subtitle="Conflicto directo." 
              titleColor={C_TITLE_PRESION} 
          />
          <Card 
              value={`${kpis.riesgo}%`} 
              title="ÍNDICE DE AMENAZA" 
              subtitle="% del ecosistema bajo presión." 
              titleColor={C_TITLE_AMENAZA} 
          />
      </React.Fragment>
    );
}

export default React.memo(Scorecards);