// src/config/theme.js

export const FONTS = {
  main: "'Source Code Pro', monospace",
  data: "'Roboto Mono', monospace",
  body: "'Inter', sans-serif"
};

export const COLORS = {
  background: {
    app: '#0d0f16',
    panel: '#12141E',
    sidebarHeader: '#181d35',
    header: '#0000ff',
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
    actionButton: '#0000ff',
    accent: '#007acc' 
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
      descensos: '#03a9f4'
    }
  },
  vigilancia: {
    id: 'vigilancia',
    color: '#15be80',
    ramp: { 
      manglar: '#15BE80', inversion: '#a7a469', presion: '#f30a41', riesgo: '#f4976c'     
    }
  },
  algoritmo: {
    id: 'algoritmo',
    color: '#ff5a60',
    ramp: { step1: '#31014d', step2: '#23057b', step3: '#6ab515', step4: '#a44113', step5: '#f30a41' }
  },
  factorEsfuerzo: {
    id: 'factorEsfuerzo',
    color: '#1be5b5',
    ramp: { accessible: '#1be5b5', moderate: '#FFD600', isolated: '#EE0E99' }
  }
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