import React from 'react';
import { COLORS, FONTS } from '../../config/theme';
// Ruta corregida
import recorridosData from '../../data/recorridos.json';

export default function Scorecards() {
  const features = recorridosData?.features || [];
  const totalRutas = features.length;
  const kmTotal = features.reduce((acc, ruta) => acc + (ruta.properties.Longitud_km || 0), 0);
  const demandaTotal = features.reduce((acc, ruta) => acc + (ruta.properties.Demanda_Diaria || 0), 0);
  const maxSaturacion = features.reduce((max, ruta) => {
    const cap = ruta.properties.Unidad_Capacidad || 1; 
    const sat = (ruta.properties.Maximo_Abordo / cap) * 100;
    return sat > max ? sat : max;
  }, 0);

  const s = {
    container: {
      display: 'grid',
      // RESPONSIVO: 2 columnas en móvil, 4 en escritorio
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
      gap: '10px',
      width: '100%', height: '100%', alignItems: 'center', padding: '0'
    },
    card: {
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      width: '100%', height: '100%', padding: '0 5px', boxSizing: 'border-box',
      borderRight: '1px solid rgba(255,255,255,0.1)' 
    },
    lastCard: {
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
      width: '100%', height: '100%', padding: '0 5px', boxSizing: 'border-box',
      borderRight: 'none'
    },
    // TEXTO 
    number: {
      color: '#A020F0', fontFamily: "'Source Code Pro', monospace",
      fontSize: 'clamp(28px, 3vw, 45px)', 
      fontWeight: '700', marginBottom: '5px', lineHeight: '1'
    },
    title: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 'clamp(11px, 1.5vw, 15px)', 
      fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px',
      marginBottom: '4px', color: '#FFFFFF'
    },
    subtitle: {
      color: '#B4A7AF', fontFamily: "'Inter', sans-serif",
      fontSize: 'clamp(9px, 1vw, 11px)',
      fontWeight: '500', lineHeight: '1.2', maxWidth: '95%', opacity: 0.9
    }
  };

  return (
    <div style={s.container}>
      <div style={s.card}><div style={s.number}>{totalRutas}</div><div style={s.title}>RUTAS DE CUIDADO</div><div style={s.subtitle}>Conectando hogares con escuelas y servicios de salud</div></div>
      <div style={s.card}><div style={s.number}>{Math.round(kmTotal)} km</div><div style={{...s.title, color: COLORS.rutas.Oyamel}}>DE CONEXIÓN PERIFÉRICA</div><div style={s.subtitle}>Uniendo la zona alta de difícil acceso con la ciudad</div></div>
      <div style={s.card}><div style={s.number}>+{demandaTotal.toLocaleString()}</div><div style={{...s.title, color: COLORS.rutas.Antigua}}>VIAJES DE CUIDADO</div><div style={s.subtitle}>Sosteniendo la vida cotidiana de mujeres e infancias</div></div>
      <div style={s.lastCard}><div style={s.number}>{Math.round(maxSaturacion)}%</div><div style={{...s.title, color: COLORS.rutas.Ocotal}}>SOBRECARGA DE CUIDADO</div><div style={s.subtitle}>La necesidad comunitaria rebasa la infraestructura actual ofertada</div></div>
    </div>
  );
}