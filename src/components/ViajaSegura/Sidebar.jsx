import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';

// --- MINI COMPONENTE DE SECCIÓN DESPLEGABLE ---
const AccordionSection = ({ title, tag, isOpen, onClick, children }) => {
  const s = {
    container: { 
      marginBottom: '15px', // Menos margen
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      paddingBottom: '8px' 
    },
    header: { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      cursor: 'pointer',
      padding: '4px 0'
    },
    titleText: {
      fontFamily: FONTS.body,
      fontSize: '14px', // Reducido de 17px
      fontWeight: '700',
      color: isOpen ? '#FFFFFF' : '#B0B3B8', 
      margin: 0,
      letterSpacing: '0.3px',
      transition: 'color 0.3s'
    },
    arrow: {
      color: COLORS.accent,
      fontSize: '10px',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s'
    },
    metaContainer: { 
      display: 'flex', 
      alignItems: 'center', 
      marginTop: '2px' 
    },
    line: { 
      height: '1px', 
      backgroundColor: 'rgba(188, 186, 192, 0.43)', 
      flexGrow: 1, 
      marginRight: '8px' 
    },
    tagText: { 
      fontFamily: FONTS.title, 
      fontSize: '9px', // Reducido
      color: '#7c7889ff', 
      whiteSpace: 'nowrap' 
    },
    content: {
      display: isOpen ? 'block' : 'none',
      marginTop: '10px',
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
    contexto: true,
    metodologia: false,
    hallazgos: false,
    impacto: false
  });

  const toggle = (section) => {
    setSectionsState(prevState => ({
      ...prevState,
      [section]: !prevState[section] 
    }));
  };

  const s = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', color: '#E0E0E0' },
    // Header más compacto
    headerBox: { backgroundColor: '#181d35', padding: '15px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    subHeader: { fontFamily: FONTS.title, fontSize: '13px', fontWeight: '700', color: '#B0B3B8', margin: '0 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' },
    // Título en Morado Fosfo (#A020F0) y más pequeño
    mainTitle: { fontFamily: FONTS.title, fontSize: '26px', fontWeight: '700', color: '#A020F0', margin: '0 0 15px 0', lineHeight: '1' },
    authorBox: { borderLeft: `2px solid ${COLORS.accent}`, paddingLeft: '10px', marginTop: '5px' },
    authorName: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0 },
    authorRole: { fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: '2px 0 0 0' },
    
    contentBody: { flex: 1, padding: '15px 15px', overflowY: 'auto', paddingRight: '5px' },
    
    // Textos más pequeños
    bodyText: { fontFamily: FONTS.body, fontSize: '12px', fontWeight: '400', lineHeight: '1.4', color: '#E0E0E0', marginBottom: '8px' },
    listItem: { marginBottom: '8px' },
    listKey: { color: '#FFFFFF', fontWeight: '500' },
    
    btnContainer: { padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--bg-panel)' },
    btnGithub: { display: 'block', backgroundColor: '#0000FF', color: '#c5cde0ff', fontFamily: FONTS.numbers, fontSize: '14px', fontWeight: '700', textAlign: 'center', padding: '10px', textDecoration: 'none', borderRadius: '4px', letterSpacing: '-0.5px', transition: 'opacity 0.2s' }
  };

  return (
    <div style={s.container}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* 1. HEADER FIJO */}
      <div style={s.headerBox}>
        <h2 style={s.subHeader}>EVALUACIÓN PROGRAMA PILOTO</h2>
        <h1 style={s.mainTitle}>VIAJA SEGURA</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Rocío Izunza</p>
          <p style={s.authorRole}>Urbanista y Científica de Datos Geoespaciales</p>
        </div>
      </div>

      {/* 2. CUERPO */}
      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection 
          title="Hacer visible lo cotidiano" 
          tag="#Contexto"
          isOpen={sectionsState.contexto}
          onClick={() => toggle('contexto')}
        >
          <p style={s.bodyText}>
            El proyecto <strong>"Viaja Segura"</strong> evalúa la iniciativa de la Asociación Civil Ruta 66, que opera un servicio exclusivo para mujeres e infancias en la periferia sur de la CDMX.
          </p>
          <p style={s.bodyText}>
            La iniciativa social ya existía y era valiosa, pero requería traducirse al lenguaje técnico para garantizar su continuidad.
          </p>
        </AccordionSection>

        <AccordionSection 
          title="Traduciendo la realidad" 
          tag="#Metodología"
          isOpen={sectionsState.metodologia}
          onClick={() => toggle('metodologia')}
        >
          <p style={s.bodyText}>Para comprender la movilidad de mujeres e infancias, el reto fue traducir la experiencia de viaje cotidiana en información cuantificable.</p>
          <div style={s.listItem}>
            <p style={s.bodyText}><span style={s.listKey}>Campo:</span> Diseñé instrumentos específicos para registrar dinámicas de ascenso y descenso no convencionales.</p>
          </div>
          <div style={s.listItem}>
            <p style={s.bodyText}><span style={s.listKey}>Procesamiento:</span> Construí la primera base de datos abierta y estructurada del servicio.</p>
          </div>
        </AccordionSection>

        <AccordionSection 
          title="Conectando la periferia" 
          tag="#Hallazgos"
          isOpen={sectionsState.hallazgos}
          onClick={() => toggle('hallazgos')}
        >
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Puente vital:</span> Reduce el aislamiento de la periferia alta con ejes de oportunidades.</p>
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}>
            <p style={s.bodyText}><span style={s.listKey}>Soporte de vida:</span> Los nodos de mayor afluencia coinciden con escuelas y servicios de salud.</p>
          </div>
        </AccordionSection>

        <AccordionSection 
          title="Visualizar para reconfigurar" 
          tag="#Impacto"
          isOpen={sectionsState.impacto}
          onClick={() => toggle('impacto')}
        >
          <p style={s.bodyText}>Decidí codificar esta investigación para transformar un diagnóstico estático en una herramienta de incidencia política.</p>
          <p style={s.bodyText}>Necesitamos datos abiertos que nos ayuden a reconfigurar la movilidad para cuidar mejor a quienes nos cuidan.</p>
        </AccordionSection>

      </div>

      {/* 3. FOOTER FIJO */}
      <div style={s.btnContainer}>
        <a href="https://github.com/roizunza/viajaseguradashboard" target="_blank" rel="noreferrer" style={s.btnGithub}>
          VER CÓDIGO
        </a>
      </div>

    </div>
  );
}