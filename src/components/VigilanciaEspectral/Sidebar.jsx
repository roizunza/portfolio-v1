import React, { useState } from 'react';
import { FONTS } from '../../config/theme';

// Mini componente Accordion (Reutilizado localmente)
const AccordionSection = ({ title, tag, isOpen, onClick, children }) => {
  // ... (Puedes copiar el mismo estilo del Sidebar de Viaja Segura o importarlo si lo extraemos después)
  // Por simplicidad, copia el const s = { ... } y el return del Sidebar anterior aquí,
  // O dime si quieres que te pegue el código completo del Sidebar también.
  // TE PEGO EL CÓDIGO COMPLETO ABAJO PARA QUE NO BATALLES:
  const s = {
      container: { marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' },
      header: { display: 'flex', justifyContent: 'space-between', cursor: 'pointer', padding: '4px 0' },
      titleText: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: isOpen ? '#FFFFFF' : '#B0B3B8', margin: 0 },
      arrow: { fontSize: '10px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', color: '#15BE80' },
      meta: { display: 'flex', alignItems: 'center', marginTop: '2px' },
      line: { height: '1px', backgroundColor: '#333', flexGrow: 1, marginRight: '8px' },
      tag: { fontFamily: FONTS.title, fontSize: '9px', color: '#7c7889ff' },
      content: { display: isOpen ? 'block' : 'none', marginTop: '10px', animation: 'fadeIn 0.3s' }
  };
  return (
      <div style={s.container}>
          <div onClick={onClick}>
              <div style={s.header}><h3 style={s.titleText}>{title}</h3><span style={s.arrow}>▼</span></div>
              <div style={s.meta}><div style={s.line}/><span style={s.tag}>{tag}</span></div>
          </div>
          <div style={s.content}>{children}</div>
      </div>
  );
};

export default function Sidebar() {
  const [sections, setSections] = useState({ contexto: true, metodologia: false, hallazgos: false, impacto: false });
  const toggle = (k) => setSections(p => ({ ...p, [k]: !p[k] }));

  // ESTILOS (Mismo layout, cambiamos colores a VERDE)
  const COLOR_THEME = '#15BE80'; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#E0E0E0' }}>
       {/* HEADER */}
       <div style={{ backgroundColor: '#181d35', padding: '15px', borderBottom: '1px solid #333', flexShrink: 0 }}>
        <h2 style={{ fontFamily: FONTS.title, fontSize: '13px', fontWeight: '700', color: '#B0B3B8', margin: 0 }}>AUDITORÍA TERRITORIAL</h2>
        <h1 style={{ fontFamily: FONTS.title, fontSize: '26px', fontWeight: '700', color: COLOR_THEME, margin: '5px 0' }}>VIGILANCIA ESPECTRAL</h1>
        <div style={{ borderLeft: `2px solid ${COLOR_THEME}`, paddingLeft: '10px' }}>
          <p style={{ fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFF', margin: 0 }}>Rocío Izunza</p>
          <p style={{ fontFamily: FONTS.body, fontSize: '11px', color: '#B0B3B8', margin: 0 }}>Análisis Satelital & Compliance</p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
        
        <AccordionSection title="La discrepancia lógica" tag="#Contexto" isOpen={sections.contexto} onClick={() => toggle('contexto')}>
            <p style={{fontSize:'12px', lineHeight:'1.4', marginBottom:'8px'}}>En Dorado, Puerto Rico, existe una discrepancia crítica entre la "verdad legal" y la "verdad física". Aunque la ley garantiza el acceso público, los desarrollos inmobiliarios han generado un <em>edge case</em> donde la privatización anula el derecho.</p>
        </AccordionSection>

        <AccordionSection title="Análisis Raster & Validación" tag="#Metodología" isOpen={sections.metodologia} onClick={() => toggle('metodologia')}>
            <p style={{fontSize:'12px', lineHeight:'1.4', marginBottom:'8px'}}>Implementé un <strong>análisis raster</strong> utilizando imágenes satelitales (Sentinel-2) para monitorear la cobertura del suelo. Apliqué lógica deductiva para validar si las estructuras físicas respetaban la Zona Marítimo Terrestre (ZMT), detectando anomalías de <em>compliance</em>.</p>
        </AccordionSection>

        <AccordionSection title="Evidencia Satelital" tag="#Hallazgos" isOpen={sections.hallazgos} onClick={() => toggle('hallazgos')}>
             <p style={{fontSize:'12px', lineHeight:'1.4', marginBottom:'8px'}}>La auditoría reveló que el 40% de los accesos públicos son físicamente intransitables. Se detectó una correlación directa entre la pérdida de vegetación costera (NDVI negativo) y la expansión de infraestructura privada.</p>
        </AccordionSection>

        <AccordionSection title="Due Diligence Ambiental" tag="#Impacto" isOpen={sections.impacto} onClick={() => toggle('impacto')}>
             <p style={{fontSize:'12px', lineHeight:'1.4', marginBottom:'8px'}}>Este dashboard transforma la observación satelital en evidencia legal. Sirve como herramienta de <em>Due Diligence</em> para evaluar riesgos ESG y provee la base lógica para exigir la restitución del dominio público.</p>
        </AccordionSection>

      </div>
    </div>
  );
}