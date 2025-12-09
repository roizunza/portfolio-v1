import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// 1. CORRECCIÓN: Importamos como .json para evitar el SyntaxError
import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json';

// 2. TOKEN INTEGRADO (El mismo de tu proyecto anterior)
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // COLORES DEFINIDOS
  const C_MANGLAR = '#15BE80'; // Verde Proyecto
  const C_INVERSION = '#f5138c'; // Rosa Inversión
  const C_PRESION = '#e31a1c';   // Rojo Presión

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Fondo oscuro
      center: [-66.265, 18.44], // Coordenadas de Dorado, PR
      zoom: 11,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      
      // --- CAPA 1: MANGLARES (Base) ---
      map.current.addSource('manglares', { type: 'geojson', data: manglaresData });
      map.current.addLayer({
        'id': 'manglares-fill',
        'type': 'fill',
        'source': 'manglares',
        'paint': {
          'fill-color': C_MANGLAR,
          'fill-opacity': 0.3
        }
      });
      map.current.addLayer({
        'id': 'manglares-border',
        'type': 'line',
        'source': 'manglares',
        'paint': {
          'line-color': C_MANGLAR,
          'line-width': 1
        }
      });

      // --- CAPA 2: INVERSIÓN (Desarrollos) ---
      map.current.addSource('inversion', { type: 'geojson', data: inversionData });
      map.current.addLayer({
        'id': 'inversion-fill',
        'type': 'fill',
        'source': 'inversion',
        'paint': {
          'fill-color': C_INVERSION, 
          'fill-opacity': 0.5 
        }
      });
      // Borde neón
      map.current.addLayer({
        'id': 'inversion-border',
        'type': 'line',
        'source': 'inversion',
        'paint': {
          'line-color': C_INVERSION,
          'line-width': 2,
          'line-blur': 1
        }
      });

      // --- CAPA 3: PRESIONADOS (El conflicto) ---
      map.current.addSource('presion', { type: 'geojson', data: presionData });
      map.current.addLayer({
        'id': 'presion-fill',
        'type': 'fill',
        'source': 'presion',
        'paint': {
          'fill-color': C_PRESION, 
          'fill-opacity': 0.7 
        }
      });
      map.current.addLayer({
        'id': 'presion-border',
        'type': 'line',
        'source': 'presion',
        'paint': {
          'line-color': C_PRESION,
          'line-width': 2,
          'line-dasharray': [2, 1] 
        }
      });

    });
  }, []);

  // --- LEYENDA FLOTANTE ---
  const legendStyle = {
    position: 'absolute', top: '10px', left: '10px',
    backgroundColor: 'rgba(21, 24, 35, 0.8)', padding: '10px', borderRadius: '6px',
    color: 'white', fontFamily: 'Roboto Mono, monospace', fontSize: '10px',
    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)'
  };
  
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '4px' };
  const dot = { width: '10px', height: '10px', marginRight: '8px', borderRadius: '2px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={legendStyle}>
        <div style={{fontWeight:'bold', marginBottom:'6px', borderBottom:'1px solid #444'}}>SIMBOLOGÍA</div>
        <div style={itemStyle}>
            <div style={{...dot, background: C_INVERSION}}></div> Inversión Inmobiliaria
        </div>
        <div style={itemStyle}>
            <div style={{...dot, background: C_PRESION}}></div> Manglar Presionado
        </div>
        <div style={itemStyle}>
            <div style={{...dot, background: C_MANGLAR, opacity: 0.5}}></div> Manglar (Base)
        </div>
      </div>
    </div>
  );
}