// Centralización estricta de colores originales y fuentes 

export const PROJECTS = {
  viajaSegura: {
    title: 'Viaja Segura',
    color: '#a020f0', 
    ramp: {
      isochrone: '#A020F0',
      descensos: '#03a9f4',
      rutas: { antigua: '#F976C7', ocotal: '#f232a9', oyamel: '#f1afd1' },
      equipamiento: { educativo: '#3872e7', salud: '#4164a9', abasto: '#6b8dd3', otros: '#888888' }
    }
  },
  vigilancia: {
    title: 'Vigilancia Espectral',
    color: '#15be80', 
    ramp: { manglar: '#15BE80', inversion: '#a7a469', presion: '#f30a41', riesgo: '#f4976c' }
  },
  algoritmo: {
    title: 'Algoritmo Inmobiliario',
    color: '#ff5a60', 
    ramp: { step1: '#23057b', step2: '#664daf', step3: '#6ab515', step4: '#a44113', step5: '#f30a41' }
  },
  factorEsfuerzo: {
    title: 'Factor Esfuerzo',
    color: '#00e5ff', 
    ramp: { buffer: '#0798a8', vias: '#546E7A', distancia: '#ecdb85', aislamiento: '#fb1b62', activos: '#00E5FF', estaciones: '#546E7A' } 
  }
};

// Paleta de UI global
export const COLORS = {
  ui: {
    actionButton: '#00E676', 
    activeArrow: '#D433FF',  
    border: 'rgba(255,255,255,0.1)'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B3B8',
    muted: '#7C7889'
  },
  background: {
    app: '#0d0f16',
    panel: '#12141E', 
    sidebarHeader: '#12141E',
    heroMatch: '#12141E' 
  }
};

export const FONTS = {
  ui: "'Inter', sans-serif",
  data: "'Roboto Mono', monospace",
  codigo: "'Source Code Pro', monospace",
  body: "'Inter', sans-serif",
  main: "'Roboto Mono', monospace"
};

// Estilos compartidos para Mapas e Índice
export const STYLES = {
  legendBox: {
    position: 'absolute', 
    top: '10px', 
    left: '10px', 
    padding: '8px', 
    width: '140px',
    backgroundColor: 'rgba(37, 41, 62, 0.2)', 
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px', 
    color: '#FFFFFF', 
    fontFamily: "'Roboto Mono', monospace", 
    fontSize: '9px',
    zIndex: 10, 
    backdropFilter: 'blur(8px)', 
    WebkitBackdropFilter: 'blur(8px)'
  },
  legendTitle: { 
    margin: '0 0 4px 0', 
    fontSize: '11px', 
    fontWeight: 'bold', 
    color: '#B0B3B8', 
    letterSpacing: '0.5px' 
  },
  sectionTitle: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: '2.5rem',
    color: '#FFFFFF',
    fontWeight: 700,
    letterSpacing: '-1px',
    textAlign: 'center'
  },
  sectionHash: {
    color: '#FFFFFF',
    opacity: 1,
    marginRight: '10px'
  }
};