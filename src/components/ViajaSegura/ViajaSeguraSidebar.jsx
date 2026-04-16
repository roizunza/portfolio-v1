import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';
import { FaGithub } from 'react-icons/fa';

const ACCENT_COLOR = COLORS.accent; 

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

// --- COMPONENTE PRINCIPAL ---
export default function Sidebar() {
  const [sectionsState, setSectionsState] = useState({
    contexto: true, metodologia: false, hallazgos: false, impacto: false
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
    
    contentBody: { 
      flex: 1, 
      padding: '15px 15px', 
      overflowY: 'auto',
      paddingRight: '5px',
      scrollbarWidth: 'thin', 
      scrollbarColor: '#424242 transparent' 
    },
    
    bodyText: { fontFamily: FONTS.body, fontSize: '12px', fontWeight: '400', lineHeight: '1.4', color: '#E0E0E0', marginBottom: '8px' },
    listItem: { marginBottom: '8px' },
    listKey: { color: '#FFFFFF', fontWeight: '500' },
    
    btnContainer: { 
      padding: '15px', 
      borderTop: '1px solid rgba(255,255,255,0.1)', 
      backgroundColor: 'var(--bg-panel)', 
      flexShrink: 0, 
      marginTop: 'auto'
    },
    btnGithub: { 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      backgroundColor: '#0000FF', color: '#c5cde0ff', fontFamily: FONTS.numbers, fontSize: '14px', fontWeight: '700', textAlign: 'center', padding: '10px', textDecoration: 'none', borderRadius: '4px', letterSpacing: '-0.5px', transition: 'opacity 0.2s' 
    }
  };

  return (
    <div style={s.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #424242; border-radius: 2px; }
        @media (max-width: 1024px) { .custom-scrollbar { max-height: 300px; } }
      `}</style>

      <div style={s.headerBox}>
        <h2 style={s.subHeader}>MOVILIDAD DE CUIDADOS</h2>
        <h1 style={s.mainTitle}>VIAJA SEGURA</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Karla Rocío Izunza</p>
          <p style={s.authorRole}>Legitimación operativa mediante ingeniería de datos y evidencia geoespacial</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="01. El Problema" tag="#DataStrategy" isOpen={sectionsState.contexto} onClick={() => toggle('contexto')}>
          <p style={s.bodyText}>El reto consistió en traducir la operación social y analógica de la <strong>"Ruta 66"</strong> (servicio exclusivo para mujeres e infancias) en un modelo de datos estructurado.</p>
          <p style={s.bodyText}>El objetivo central fue construir el sustento técnico necesario para legitimar el servicio ante autoridades regulatorias (SEMOVI), transformando la observación de campo en evidencia operativa para proyectar su ampliación.</p>
        </AccordionSection>

        <AccordionSection title="02. Ingeniería y Calidad" tag="#ETL_QC" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <p style={s.bodyText}>Para digitalizar la realidad del servicio, implementé un flujo centrado en la integridad del dato espacial:</p>
          <div style={s.listItem}><p style={s.bodyText}><span style={s.listKey}>Ingeniería de Datos:</span> Diseño de procesos para normalizar registros de ascenso y descenso con Python (Pandas/GeoPandas). Se aplicaron rutinas de Control de Calidad (QC) para corregir inconsistencias de georreferenciación en la periferia alta.</p></div>
          <div style={s.listItem}><p style={s.bodyText}><span style={s.listKey}>Modelado Espacial:</span> Implementación de modelos de accesibilidad mediante isocronas de 500m para automatizar el cruce de la oferta de transporte con capas de infraestructura urbana.</p></div>
        </AccordionSection>

        <AccordionSection title="03. Producto e Inteligencia" tag="#Insights" isOpen={sectionsState.hallazgos} onClick={() => toggle('hallazgos')}>
          <p style={s.bodyText}>El procesamiento técnico reveló patrones críticos para la toma de decisiones:</p>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}><p style={s.bodyText}><span style={s.listKey}>Conectividad Crítica:</span> Se validó la ruta como el puente vital que reduce el aislamiento de zonas periféricas (Oyamel, Ocotal, Antigua) con el nodo regional de Ciudad Universitaria.</p></div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}><p style={s.bodyText}><span style={s.listKey}>Priorización Estratégica:</span> La correlación espacial identificó que los puntos de mayor demanda coinciden con infraestructura de cuidados, permitiendo optimizar la ubicación de paradas.</p></div>
        </AccordionSection>

        <AccordionSection title="04. Visualización de Impacto" tag="#TheProduct" isOpen={sectionsState.impacto} onClick={() => toggle('impacto')}>
          <p style={s.bodyText}>Desarrollé un dashboard interactivo en React que transforma un diagnóstico estático en una herramienta dinámica de incidencia política.</p>
          <p style={s.bodyText}>Este visor democratiza el acceso a la evidencia técnica, visibilizando la economía de cuidados como eje central de la movilidad urbana. Al digitalizar estos patrones, facilitamos que las políticas públicas de transporte dejen de ser neutras y se basen en datos redistributivos.</p>
        </AccordionSection>

      </div>

       <div style={s.btnContainer}>
        <a href="https://github.com/roizunza/viajaseguradashboard" target="_blank" rel="noreferrer" style={s.btnGithub}>
          <FaGithub style={{ marginRight: '8px', fontSize: '1.1em' }}/> 
          VER ANÁLISIS TÉCNICO (PYTHON)
        </a>
      </div>
    </div>
  );
}