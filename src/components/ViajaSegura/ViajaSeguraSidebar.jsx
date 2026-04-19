import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';
import { FaGithub } from 'react-icons/fa';

/**
 * Sidebar Component for "Viaja Segura" Project
 * Focus: Geospatial Data Engineering and Gender-Perspective Mobility.
 * Updated: 2026-04-15
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
      color: COLORS.ui.accent, 
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

export default function Sidebar() {
  const [sectionsState, setSectionsState] = useState({
    proposito: true, metodologia: false, insights: false, stack: false
  });

  const toggle = (section) => {
    setSectionsState(prevState => ({ ...prevState, [section]: !prevState[section] }));
  };

  const s = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', color: '#E0E0E0' },
    headerBox: { backgroundColor: '#181d35', padding: '15px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 },
    subHeader: { fontFamily: FONTS.title, fontSize: '13px', fontWeight: '700', color: '#B0B3B8', margin: '0 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' },
    mainTitle: { fontFamily: FONTS.title, fontSize: '26px', fontWeight: '700', color: '#A020F0', margin: '0 0 15px 0', lineHeight: '1' },
    authorBox: { borderLeft: `2px solid ${COLORS.accent}`, paddingLeft: '10px', marginTop: '5px' },
    authorName: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0 },
    authorRole: { fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: '2px 0 0 0' },
    contentBody: { flex: 1, padding: '15px 15px', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' },
    bodyText: { fontFamily: FONTS.body, fontSize: '12px', fontWeight: '400', lineHeight: '1.4', color: '#E0E0E0', marginBottom: '8px' },
    listItem: { marginBottom: '8px' },
    listKey: { color: '#FFFFFF', fontWeight: '500' },
    btnContainer: { padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--bg-panel)', flexShrink: 0, marginTop: 'auto' },
    btnGithub: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333', color: '#FFF', fontFamily: FONTS.numbers, fontSize: '14px', fontWeight: '700', textAlign: 'center', padding: '10px', textDecoration: 'none', borderRadius: '4px', opacity: 0.7, cursor: 'not-allowed' }
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
        <h2 style={s.subHeader}>MOVILIDAD DE CUIDADOS</h2>
        <h1 style={s.mainTitle}>VIAJA SEGURA</h1>
        <div style={s.authorBox}>
          <p style={s.authorRole}>Legitimación de servicios de transporte mediante evidencia geoespacial</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="01. El Propósito" tag="#DataDrivenLegitimacy" isOpen={sectionsState.proposito} onClick={() => toggle('proposito')}>
          <p style={s.bodyText}>El proyecto evalúa la operación de la "Ruta 66", la cual presta un servicio exclusivo para mujeres e infancias en la periferia sur de la CDMX. El reto consistió en traducir una operación analógica y social en un modelo de datos estructurado para sustentar su relevancia ante SEMOVI. El objetivo central fue construir el sustento operativo necesario para legitimar el modelo y proyectar su ampliación a otras rutas mediante evidencia técnica.</p>
        </AccordionSection>

        <AccordionSection title="02. Estructura y Metodología" tag="#DataEngineering_GIS" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <div style={s.listItem}>
            <p style={s.bodyText}>
              <span style={s.listKey}>Ingeniería de Datos (ETL):</span> Diseño de instrumentos de captura digital para normalizar registros de ascenso. Se utiliza Python (GeoPandas) para la limpieza, depuración y estructuración de la primera base de datos, resolviendo inconsistencias de georreferenciación.
            </p>
          </div>
          <div style={s.listItem}>
            <p style={s.bodyText}>
              <span style={s.listKey}>Modelado Espacial Avanzado:</span> En GIS, se generaron modelos de accesibilidad mediante isocronas caminables de 500m. El análisis consiste en automatizar el cruce de la oferta de transporte con la infraestructura de cuidados, correlacionando nodos de mayor afluencia con la ubicación de equipamiento.
            </p>
          </div>
        </AccordionSection>

        <AccordionSection title="03. Insights y Visualización" tag="#TheProduct" isOpen={sectionsState.insights} onClick={() => toggle('insights')}>
          <p style={s.bodyText}>El resultado es una herramienta que transforma coordenadas y datos en decisiones:</p>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Eje de Integración:</span> Conecta la periferia alta (Oyamel, Ocotal, Antigua) con equipamiento regional como Ciudad Universitaria.</p>
          </div>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Validación de la Demanda:</span> Legitimación de la ruta como eslabón en la red de movilidad de cuidados.</p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Visualización de Impacto:</span> Dashboard interactivo que visibiliza la economía de cuidados para incidencia política.</p>
          </div>
        </AccordionSection>

        <AccordionSection title="Stack Tecnológico" tag="#TechSpecs" isOpen={sectionsState.stack} onClick={() => toggle('stack')}>
          <p style={s.bodyText}>Python (GeoPandas), QGIS, React, Mapbox GL JS, Figma.</p>
        </AccordionSection>
      </div>

      {/* <div style={s.btnContainer}>
          <a href="#" style={s.btnGithub}>
            <FaGithub style={{ marginRight: '8px', fontSize: '1.1em' }}/> 
            VER ANÁLISIS TÉCNICO (PYTHON)
          </a>
        </div> 
      */}
    </div>
  );
}