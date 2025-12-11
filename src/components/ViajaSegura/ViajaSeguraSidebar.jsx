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
      color: COLORS.ui.accent, // <--- CAMBIO: Color de acento (Azul #007acc)
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
      overflowY: 'auto', // Mantiene el scroll en desktop
      paddingRight: '5px',
      // Forzar scrollbar 
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
      {/* ESTILOS CSS INYECTADOS */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

        /* Scrollbar ULTRA FINO (2px) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
          -webkit-appearance: none;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #424242; 
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #777; 
        }
        
        /* CORRECCIÓN PARA MÓVILES: 
           Aseguramos que el contenedor de contenido scrolleable tenga una altura limitada
           para que el scroll funcione sin salirse de la pantalla en layouts responsivos */
        @media (max-width: 1024px) {
            .custom-scrollbar {
                max-height: 300px; /* Limita la altura del contenido para forzar el scroll */
            }
        }
      `}</style>

      <div style={s.headerBox}>
        <h2 style={s.subHeader}>EVALUACIÓN PROGRAMA PILOTO</h2>
        <h1 style={s.mainTitle}>VIAJA SEGURA</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Rocío Izunza</p>
          <p style={s.authorRole}>Urbanista y Científica de Datos Geoespaciales</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="Hacer visible lo cotidiano" tag="#Contexto" isOpen={sectionsState.contexto} onClick={() => toggle('contexto')}>
          <p style={s.bodyText}>El proyecto <strong>"Viaja Segura"</strong> evalúa la iniciativa de la Asociación Civil Ruta 66, que opera un servicio exclusivo para mujeres e infancias en la periferia sur de la CDMX.</p>
          <p style={s.bodyText}>La iniciativa social ya existía y era valiosa, pero requería traducirse al lenguaje técnico para garantizar su continuidad. Me integré al proyecto para instrumentar la evaluación técnica que la institución SEMOVI necesitaba. A través del análisis de datos, construí el sustento operativo que permitió legitimar el modelo y proyectar su ampliación.</p>
        </AccordionSection>

        <AccordionSection title="Traduciendo la realidad" tag="#Metodología" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <p style={s.bodyText}>Para comprender la movilidad de mujeres e infancias, el reto fue traducir la experiencia de viaje cotidiana en información cuantificable y estructurada.</p>
          <div style={s.listItem}><p style={s.bodyText}><span style={s.listKey}>Levantamiento en campo:</span> Diseñé instrumentos específicos para registrar dinámicas de ascenso y descenso no convencionales, participando directamente en los recorridos para asegurar la integridad y sensibilidad del dato.</p></div>
          <div style={s.listItem}><p style={s.bodyText}><span style={s.listKey}>Procesamiento geoespacial:</span> Digitalicé y depuré la información operativa, construyendo la primera base de datos abierta y estructurada del servicio.</p></div>
          <div style={s.listItem}><p style={s.bodyText}><span style={s.listKey}>Análisis espacial:</span> Fui más allá de los puntos: generé modelos de accesibilidad (isocronas de 500m) para cruzar la oferta de transporte con la infraestructura de cuidados, buscando correlacionar los nodos de mayor afluencia con la ubicación de escuelas, mercados y centros de salud.</p></div>
        </AccordionSection>

        <AccordionSection title="Conectando la periferia" tag="#Hallazgos" isOpen={sectionsState.hallazgos} onClick={() => toggle('hallazgos')}>
          <p style={s.bodyText}>El análisis geoespacial confirmó dos patrones territoriales:</p>
          <div style={{ marginBottom: '8px', borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}><p style={s.bodyText}><span style={s.listKey}>Puente vital:</span> La ruta funciona como un eje de integración territorial, reduciendo el aislamiento de la periferia alta (Oyamel, Ocotal, Antigua) con ejes de oportunidades y equipamientos regionales como Ciudad Universitaria.</p></div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.3)', paddingLeft: '6px' }}><p style={s.bodyText}><span style={s.listKey}>Soporte de vida:</span> Los nodos de mayor afluencia coinciden con escuelas y servicios de salud. Esta evidencia técnica permitió legitimar la operación de la ruta, reconociendo que el servicio es un eslabón indispensable en la cadena de cuidados de la zona.</p></div>
        </AccordionSection>

        <AccordionSection title="Visualizar para reconfigurar" tag="#Impacto" isOpen={sectionsState.impacto} onClick={() => toggle('impacto')}>
          <p style={s.bodyText}>Decidí codificar esta investigación para transformar un diagnóstico estático en una herramienta de incidencia política.</p>
          <p style={s.bodyText}>Al democratizar el acceso a esta evidencia, el dashboard visibiliza la economía de cuidados como eje central de la movilidad. La medición de estos patrones genera la evidencia necesaria para que las políticas públicas de transporte dejen de ser neutras y comiencen a ser redistributivas.</p>
          <p style={s.bodyText}>Necesitamos datos abiertos que nos ayuden a reconfigurar la movilidad, no solo para movernos más rápido, sino para cuidar mejor a quienes nos cuidan.</p>
        </AccordionSection>

      </div>

       <div style={s.btnContainer}>
        <a href="https://github.com/roizunza/viajaseguradashboard" target="_blank" rel="noreferrer" style={s.btnGithub}>
          <FaGithub style={{ marginRight: '8px', fontSize: '1.1em' }}/> 
          VER ANÁLISIS DE PYTHON
        </a>
      </div>
    </div>
  );
}