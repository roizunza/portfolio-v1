import React, { useState } from 'react';
import { COLORS, FONTS } from '../../config/theme';
import { FaGithub } from 'react-icons/fa';

// Color del Proyecto: Azul Tecnológico (Finanzas/Datos)
const PROJECT_COLOR = '#2A85FF'; 

const AccordionSection = ({ title, tag, isOpen, onClick, children }) => {
  const s = {
    container: { marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '4px 0' },
    titleText: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: isOpen ? '#FFFFFF' : '#B0B3B8', margin: 0, letterSpacing: '0.3px', transition: 'color 0.3s' },
    arrow: { color: PROJECT_COLOR, fontSize: '10px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' },
    metaContainer: { display: 'flex', alignItems: 'center', marginTop: '2px' },
    line: { height: '1px', backgroundColor: 'rgba(188, 186, 192, 0.43)', flexGrow: 1, marginRight: '8px' },
    tagText: { fontFamily: FONTS.title, fontSize: '9px', color: '#7c7889ff', whiteSpace: 'nowrap' },
    content: { display: isOpen ? 'block' : 'none', marginTop: '10px', animation: 'fadeIn 0.3s ease-in-out' }
  };
  return (
    <div style={s.container}>
      <div onClick={onClick}>
        <div style={s.header}><h3 style={s.titleText}>{title}</h3><span style={s.arrow}>▼</span></div>
        <div style={s.metaContainer}><div style={s.line} /><span style={s.tagText}>{tag}</span></div>
      </div>
      <div style={s.content}>{children}</div>
    </div>
  );
};

export default function Sidebar() {
  const [sectionsState, setSectionsState] = useState({ contexto: true, metodologia: false, hallazgos: false });
  const toggle = (section) => setSectionsState(prev => ({ ...prev, [section]: !prev[section] }));

  const s = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', color: '#E0E0E0' },
    headerBox: { backgroundColor: '#181d35', padding: '15px 15px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 },
    subHeader: { fontFamily: FONTS.title, fontSize: '13px', fontWeight: '700', color: '#B0B3B8', margin: '0 0 4px 0', letterSpacing: '1px', textTransform: 'uppercase' },
    mainTitle: { fontFamily: FONTS.title, fontSize: '26px', fontWeight: '700', color: PROJECT_COLOR, margin: '0 0 15px 0', lineHeight: '1' },
    authorBox: { borderLeft: `2px solid ${PROJECT_COLOR}`, paddingLeft: '10px', marginTop: '5px' },
    authorName: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0 },
    authorRole: { fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: '2px 0 0 0' },
    contentBody: { flex: 1, padding: '15px 15px', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' },
    bodyText: { fontFamily: FONTS.body, fontSize: '12px', fontWeight: '400', lineHeight: '1.4', color: '#E0E0E0', marginBottom: '8px' },
    btnContainer: { padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--bg-panel)', flexShrink: 0, marginTop: 'auto' },
    btnGithub: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000FF', color: '#c5cde0ff', fontFamily: FONTS.numbers, fontSize: '14px', fontWeight: '700', textAlign: 'center', padding: '10px', textDecoration: 'none', borderRadius: '4px', letterSpacing: '-0.5px', transition: 'opacity 0.2s' }
  };

  return (
    <div style={s.container}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #424242; border-radius: 3px; }
      `}</style>

      <div style={s.headerBox}>
        <h2 style={s.subHeader}>INTELIGENCIA DE MERCADO</h2>
        <h1 style={s.mainTitle}>ALGORITMO INMOBILIARIO</h1>
        <div style={s.authorBox}>
          <p style={s.authorName}>Rocío Izunza</p>
          <p style={s.authorRole}>Urbanista y Científica de Datos Geoespaciales</p>
        </div>
      </div>

      <div style={s.contentBody} className="custom-scrollbar">
        
        <AccordionSection title="Ecosistema de Especulación" tag="#Contexto" isOpen={sectionsState.contexto} onClick={() => toggle('contexto')}>
          <p style={s.bodyText}>Hong Kong, Región Administrativa Especial de China, opera como un ecosistema autónomo definido por su hiperdensidad y su rol en las finanzas globales. En este paisaje de rascacielos, donde el suelo es el recurso más escaso, la irrupción de Airbnb en 2008 no fue solo una novedad tecnológica, sino un catalizador de polarización económica.</p>
          <p style={s.bodyText}>El presente análisis busca tangibilizar cómo la plataforma está reescribiendo las reglas del acceso urbano.</p>
        </AccordionSection>

        <AccordionSection title="Del Dato al Diagnóstico" tag="#Metodología" isOpen={sectionsState.metodologia} onClick={() => toggle('metodologia')}>
          <p style={s.bodyText}>El proyecto abarcó el ciclo completo de inteligencia de datos urbanos. Mediante el empleo de librerías de <strong>Python y GeoPandas</strong>, se procesaron y georreferenciaron listados masivos para traducir el dato digital al espacio físico.</p>
          <p style={s.bodyText}>Posteriormente, se ejecutó una agregación espacial por distrito con el fin de calcular métricas críticas como el precio promedio y la intensidad de rotación, cuantificando la absorción de unidades de vivienda completa para revelar las dinámicas donde la especulación financiera desplaza la función residencial.</p>
        </AccordionSection>

        <AccordionSection title="Fractura Estructural" tag="#Hallazgos" isOpen={sectionsState.hallazgos} onClick={() => toggle('hallazgos')}>
          <p style={s.bodyText}>El análisis revela una fractura estructural donde la alta intensidad turística y la rotación confirman la mercantilización del suelo.</p>
          <p style={s.bodyText}>La brecha sistémica entre la rentabilidad turística y la capacidad local actúa como un muro económico en zonas clave, evidenciando cómo la falta de regulación ha transformado el suelo urbano en una simple herramienta de acumulación financiera.</p>
        </AccordionSection>

      </div>

      <div style={s.btnContainer}>
        <a href="https://github.com/roizunza" target="_blank" rel="noreferrer" style={s.btnGithub}>
          <FaGithub style={{ marginRight: '8px', fontSize: '1.1em' }}/> 
          VER CÓDIGO EN GITHUB
        </a>
      </div>
    </div>
  );
}