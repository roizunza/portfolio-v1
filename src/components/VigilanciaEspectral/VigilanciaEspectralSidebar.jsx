import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';

/**
 * AccordionSection Component
 * Shared sub-component for project documentation.
 */
const AccordionSection = ({ title, tag, isOpen, onClick, children }) => {
  const s = {
    container: { 
      marginBottom: '15px',
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      paddingBottom: '8px' 
    },
    header: { 
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
      cursor: 'pointer', padding: '4px 0'
    },
    titleText: {
      fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700',
      color: isOpen ? '#FFFFFF' : '#B0B3B8', margin: 0,
      letterSpacing: '0.3px', transition: 'color 0.3s'
    },
    arrow: {
      color: '#4CAF50', // Verde asignado a Vigilancia Espectral
      fontSize: '10px',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s'
    },
    metaContainer: { display: 'flex', alignItems: 'center', marginTop: '2px' },
    line: { height: '1px', backgroundColor: 'rgba(188, 186, 192, 0.43)', flexGrow: 1, marginRight: '8px' },
    tagText: { fontFamily: FONTS.title, fontSize: '9px', color: '#7c7889ff', whiteSpace: 'nowrap' },
    content: {
      display: isOpen ? 'block' : 'none', marginTop: '10px',
      animation: 'fadeIn 0.3s ease-in-out'
    }
  };

  return (
    <div style={s.container}>
      <div onClick={onClick}>
        <div style={s.header}>
          <h3 style={s.titleText}>{title}</h3>
          <span style={s.arrow}>▼</span>
        </div>
        <div style={s.metaContainer}>
          <div style={s.line} />
          <span style={s.tagText}>{tag}</span>
        </div>
      </div>
      <div style={s.content}>
        {children}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function VigilanciaEspectralSidebar() {
  const [sectionsState, setSectionsState] = useState({
    proposito: true, metodologia: false, insights: false, stack: false
  });

  const toggle = (section) => {
    setSectionsState(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  const s = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', color: '#E0E0E0' },
    headerBox: { backgroundColor: '#181d35', padding: '15px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 },
    subHeader: { fontFamily: FONTS.title, fontSize: '11px', fontWeight: '700', color: '#B0B3B8', margin: '0 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' },
    mainTitle: { fontFamily: FONTS.title, fontSize: '24px', fontWeight: '700', color: '#4CAF50', margin: '0 0 15px 0', lineHeight: '1.1' },
    authorBox: { borderLeft: '2px solid #4CAF50', paddingLeft: '10px', marginTop: '5px' },
    authorName: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0 },
    authorRole: { fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: '2px 0 0 0' },
    contentBody: { flex: 1, padding: '15px 15px', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' },
    bodyText: { fontFamily: FONTS.body, fontSize: '12px', fontWeight: '400', lineHeight: '1.4', color: '#E0E0E0', marginBottom: '8px' },
    listItem: { marginBottom: '8px' },
    listKey: { color: '#FFFFFF', fontWeight: '500' }
  };

  return (
    <div style={s.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #424242; border-radius: 2px; }
      `}</style>

      <div style={s.headerBox}>
        <h2 style={s.subHeader}>Auditoría de Presión Ambiental y Acceso Costero</h2>
        <h1 style={s.mainTitle}>VIGILANCIA ESPECTRAL</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Karla Rocío Izunza</p>
          <p style={s.authorRole}>Segmentación mediante Machine Learning e Índice de Presión del Ecosistema</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="01. El Propósito" tag="#EnvironmentalAudit" isOpen={sectionsState.proposito} onClick={() => toggle('proposito')}>
          <p style={s.bodyText}>El proyecto consiste en una auditoría ambiental en Dorado, Puerto Rico, para cuantificar el impacto generado por el desarrollo de resorts sobre el ecosistema de manglar. El objetivo es documentar la pérdida de cobertura vegetal y el estado del ecosistema mediante la construcción de un índice de presión, transformando la observación satelital en evidencia técnica para evaluación.</p>
        </AccordionSection>

        <AccordionSection title="02. Estructura y metodología" tag="#ML_Methodology" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <p style={s.bodyText}>El análisis integra aprendizaje automático y validación multiespectral para garantizar la precisión de los hallazgos:</p>
          <div style={s.listItem}>
            <p style={s.bodyText}><span style={s.listKey}>Segmentación Supervisada (Machine Learning):</span> Implementación de un modelo de clasificación supervisada para segmentar el uso de suelo en cuatro categorías: Urbano, Inversión Inmobiliaria (resorts), Manglares y Mar. Este modelo permite determinar la distribución espacial de la infraestructura y el ecosistema.</p>
          </div>
          <div style={s.listItem}>
            <p style={s.bodyText}><span style={s.listKey}>Validación de Congruencia (NDVI/NDWI):</span> Se generan los índices de vegetación (NDVI) y agua (NDWI) para realizar una validación cruzada con los resultados del modelo de Machine Learning. Este proceso asegura que la clasificación de "manglar" sea congruente con las firmas espectrales de vegetación hidrófila y presencia de humedad reales.</p>
          </div>
          <div style={s.listItem}>
            <p style={s.bodyText}><span style={s.listKey}>Cálculo del Índice de Presión del Ecosistema:</span> Desarrollo de una métrica para evaluar el nivel de fragmentación y presión sobre el manglar. Este índice integra la densidad de la infraestructura colindante y la respuesta espectral del ecosistema.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="03. Insights y Visualización" tag="#Insights" isOpen={sectionsState.insights} onClick={() => toggle('insights')}>
          <p style={s.bodyText}>El estudio revela datos críticos sobre la configuración del territorio y plantea una hipótesis sobre la accesibilidad al litoral:</p>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Fractura estructural:</span> El análisis revela una alta superficie de inversión inmobiliaria que confirma la mercantilización del suelo.</p>
          </div>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>La Hipótesis del Confinamiento:</span> La conjunción de la barrera arquitectónica (resorts) y la barrera natural (manglar) puede estar anulando el acceso público a las playas garantizado por ley, dificultando la movilidad y el uso público del espacio costero.</p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Dashboard de Auditoría:</span> Visualización interactiva que permite contrastar el modelo de segmentación con los índices de presión ambiental.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Stack Tecnológico" tag="#TechSpecs" isOpen={sectionsState.stack} onClick={() => toggle('stack')}>
          <p style={s.bodyText}>Python (Scikit-learn, GeoPandas), Google Earth Engine, SNAP, Mapbox GL JS, Figma.</p>
        </AccordionSection>
      </div>
    </div>
  );
}