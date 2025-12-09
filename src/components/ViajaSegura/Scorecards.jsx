import React from 'react';
import { COLORS, FONTS } from '../../config/theme';
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

  // Estilos de la TARJETA INDIVIDUAL (El contenedor lo maneja el CSS externo ahora)
  const s = {
    card: {
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center',
      // En desktop flex:1, en móvil grid llena la celda
      width: '100%', 
      height: '100%', 
      minHeight: '80px', // Altura mínima para que no se aplaste
      backgroundColor: 'rgba(21, 24, 35, 0.6)', 
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '5px',
      boxSizing: 'border-box'
    },
    
    number: {
      color: '#A020F0', 
      fontFamily: "'Source Code Pro', monospace",
      fontSize: '22px', 
      fontWeight: '700', 
      marginBottom: '4px', 
      lineHeight: '1'
    },
    title: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '10px', 
      fontWeight: '700', 
      textTransform: 'uppercase', 
      letterSpacing: '0.5px',
      marginBottom: '4px', 
      color: '#FFFFFF'
    },
    subtitle: {
      color: '#B4A7AF', 
      fontFamily: "'Inter', sans-serif",
      fontSize: '8px', 
      fontWeight: '500', 
      lineHeight: '1.2', 
      opacity: 0.8
    }
  };

  return (
    // Quitamos el estilo inline del contenedor principal para que el CSS del Layout mande
    <React.Fragment>
      <div style={s.card}>
        <div style={s.number}>{totalRutas}</div>
        <div style={s.title}>RUTAS DE CUIDADO</div>
        <div style={s.subtitle}>Conectando hogares con escuelas y servicios de salud</div>
      </div>
      
      <div style={s.card}>
        <div style={s.number}>{Math.round(kmTotal)} km</div>
        <div style={{...s.title, color: COLORS.rutas.Oyamel}}>DE CONEXIÓN PERIFÉRICA</div>
        <div style={s.subtitle}>Uniendo la zona alta de difícil acceso con la ciudad</div>
      </div>
      
     <div style={s.card}>
     <div style={s.number}>+{demandaTotal.toLocaleString()}</div>
     <div style={{...s.title, color: COLORS.rutas.Antigua}}>VIAJES DE CUIDADO</div>
     <div style={s.subtitle}>Sosteniendo la vida cotidiana de mujeres e infancias</div>
     </div>
      
      <div style={s.card}>
        <div style={s.number}>{Math.round(maxSaturacion)}%</div>
        <div style={{...s.title, color: COLORS.rutas.Ocotal}}>SOBRECARGA DE CUIDADO</div>
        <div style={s.subtitle}>La necesidad comunitaria rebasa la infraestructura actual ofertada</div>
      </div>
    </React.Fragment>
  );
}
