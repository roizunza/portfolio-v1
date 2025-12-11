// src/config/theme.js

export const FONTS = {
  main: "'Source Code Pro', monospace",
  data: "'Roboto Mono', monospace",
  body: "'Inter', sans-serif"
};

export const COLORS = {
  background: {
    app: '#0d0f16',
    panel: '#12141E',           // <--- ESTE ES EL FONDO QUE PIDES (Hero Panel)
    sidebarHeader: '#181d35',
    header: '#0000ff',          // <--- AZUL HEADER
    footer: '#070A16'
  },
  text: {
    primary: '#FFFFFF',
    header: '#EDF4F5',
    secondary: '#B0B3B8',
    muted: '#AAAAAA',
    codeComment: '#6a9955'
  },
  ui: {
    border: 'rgba(255, 255, 255, 0.1)',
    windowControls: 'rgba(170, 170, 170, 0.6)',
    actionButton: '#0000ff'     // <--- NUEVA VARIABLE: Botones de Acción (Igual al Header)
  }
};

export const PROJECTS = {
  viajaSegura: {
    id: 'viajaSegura',
    color: '#A020F0',
    ramp: {
      isochrone: '#A020F0',
      rutas: { antigua: '#F976C7', ocotal: '#f232a9', oyamel: '#f1afd1' },
      equipamiento: { educativo: '#3872e7', salud: '#4164a9', abasto: '#6b8dd3', otros: '#888888' },
      descensos: '#03a9f4'      // <--- AZUL PARA GRÁFICAS (DESCENSOS)
    }
  },
  // ... (los demás proyectos siguen igual)
  vigilancia: { color: '#15be80', ramp: { manglar: '#15BE80', inversion: '#f5138c', presion: '#f30a41' } },
  algoritmo: { color: '#ff5a60', ramp: { step1: '#1f123b', step2: '#28bceb', step3: '#a4fc3c', step4: '#f4976c', step5: '#f30a41' } },
  factorEsfuerzo: { color: '#1be5b5', ramp: { accessible: '#1be5b5', moderate: '#FFD600', isolated: '#EE0E99' } }
};

export const STYLES = {
  legendBox: {
    position: 'absolute', top: '10px', left: '10px', padding: '8px', width: '140px',
    backgroundColor: 'rgba(37, 41, 62, 0.2)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', color: 'white', fontFamily: FONTS.data, fontSize: '9px',
    zIndex: 10, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
  },
  legendTitle: { margin: '0 0 4px 0', fontSize: '11px', fontWeight: 'bold', color: '#ccc', letterSpacing: '0.5px' }
};