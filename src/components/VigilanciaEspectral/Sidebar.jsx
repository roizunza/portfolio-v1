import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';
import { FaGithub } from 'react-icons/fa';

// --- MINI COMPONENTE DE SECCIÓN DESPLEGABLE ---
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
      color: COLORS.accent, // <--- EXTRACCIÓN Y USO DEL COLOR ACCENT
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
    mainTitle: { fontFamily: FONTS.title, fontSize: '26px', fontWeight: '700', color: '#15BE80', margin: '0 0 15px 0', lineHeight: '1' }, // TITULO VERDE
    authorBox: { borderLeft: `2px solid #15BE80`, paddingLeft: '10px', marginTop: '5px' },
    authorName: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0 },
    authorRole: { fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: '2px 0 0 0' },
    
    // Contenido Flexible con Scroll fino
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
    
    // Footer del Sidebar (Fijo al fondo)
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

        /* Scrollbar personalizado FINO (3px) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px; 
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #424242; 
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>

      <div style={s.headerBox}>
        <h2 style={s.subHeader}>AUDITORÍA TERRITORIAL</h2>
        <h1 style={s.mainTitle}>VIGILANCIA ESPECTRAL</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Rocío Izunza</p>
          <p style={s.authorRole}>Urbanista y Científica de Datos Geoespaciales</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="La discrepancia lógica" tag="#Contexto" isOpen={sectionsState.contexto} onClick={() => toggle('contexto')}>
          <p style={s.bodyText}>En Dorado, Puerto Rico, existe una discrepancia crítica entre la "verdad legal" (mapas oficiales) y la "verdad física" (realidad). Aunque la ley garantiza el acceso público a la costa, los desarrollos inmobiliarios han generado un <em>edge case</em> donde la privatización física anula el derecho legal.</p>
        </AccordionSection>

        <AccordionSection title="Análisis Raster & Validación" tag="#Metodología" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <p style={s.bodyText}>Este no es solo un mapa vectorial. Implementé un <strong>análisis raster</strong> utilizando imágenes satelitales históricas para monitorear cambios en la cobertura del suelo. Apliqué lógica deductiva para validar si las estructuras físicas (muros, rejas) respetaban la delimitación de la Zona Marítimo Terrestre (ZMT), entrenando mi análisis para detectar anomalías de cumplimiento (<em>compliance</em>).</p>
        </AccordionSection>

        <AccordionSection title="Evidencia Satelital" tag="#Hallazgos" isOpen={sectionsState.hallazgos} onClick={() => toggle('hallazgos')}>
          <p style={s.bodyText}>La auditoría espacial reveló que el 40% de los accesos marcados como "públicos" en el catastro son físicamente intransitables. Se detectó una correlación directa entre la pérdida de vegetación costera (erosión) y la expansión de infraestructura privada, cuantificando el pasivo ambiental que las empresas ignoran.</p>
        </AccordionSection>

        <AccordionSection title="Due Diligence Ambiental" tag="#Impacto" isOpen={sectionsState.impacto} onClick={() => toggle('impacto')}>
          <p style={s.bodyText}>Este dashboard transforma la observación satelital en evidencia legal admisible. Sirve como herramienta de <em>Due Diligence</em> para evaluar riesgos ESG (Ambientales, Sociales y de Gobernanza) y provee la base lógica para exigir la restitución del dominio público.</p>
        </AccordionSection>

      </div>

      <div style={s.btnContainer}>
        <a href="https://github.com/roizunza/vigilanciaespectral" target="_blank" rel="noreferrer" style={s.btnGithub}>
          <FaGithub style={{ marginRight: '8px', fontSize: '1.1em' }}/> 
          VER CÓDIGO EN GITHUB
        </a>
      </div>

    </div>
  );
}