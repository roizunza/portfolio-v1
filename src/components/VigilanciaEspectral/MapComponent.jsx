import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FONTS } from '../../config/theme'; // Importa FONTS desde la ubicación de components/

// Importamos como .json
import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json'; 

// TOKEN INTEGRADO
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // COLORES EXACTOS
  const C_MANGLAR = '#15BE80'; 
  const C_INVERSION = '#f5138c'; 
  const C_PRESION = '#f30a41';   

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-66.270, 18.438],
      zoom: 11,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      // 1. Manglares
      map.current.addSource('manglares', { type: 'geojson', data: manglaresData });
      map.current.addLayer({ 'id': 'manglares-fill', 'type': 'fill', 'source': 'manglares', 'paint': { 'fill-color': C_MANGLAR, 'fill-opacity': 0.2 } });
      map.current.addLayer({ 'id': 'manglares-border', 'type': 'line', 'source': 'manglares', 'paint': { 'line-color': C_MANGLAR, 'line-width': 0.05 } });

      // 2. Inversión Inmobiliaria
      map.current.addSource('inversion', { type: 'geojson', data: inversionData });
      map.current.addLayer({ 'id': 'inversion-fill', 'type': 'fill', 'source': 'inversion', 'paint': { 'fill-color': C_INVERSION, 'fill-opacity': 0.2 } });
      map.current.addLayer({ 'id': 'inversion-border', 'type': 'line', 'source': 'inversion', 'paint': { 'line-color': C_INVERSION, 'line-width': 0.05, 'line-blur': 1 } });

      // 3. Zona de manglares presionados
      map.current.addSource('presion', { type: 'geojson', data: presionData });
      map.current.addLayer({ 'id': 'presion-fill', 'type': 'fill', 'source': 'presion', 'paint': { 'fill-color': C_PRESION, 'fill-opacity': 0.7 } });
      map.current.addLayer({ 'id': 'presion-border', 'type': 'line', 'source': 'presion', 'paint': { 'line-color': C_PRESION, 'line-width': 0.05, 'line-dasharray': [2, 1] } });
    });
  }, []);

  // ESTILO DE SIMBOLOGÍA (Idéntico a Viaja Segura)
  // SIMBOLOGÍA 
    const legendStyle = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      padding: '8px', 
      width: '140px',  
      backgroundColor: 'rgba(37, 41, 62, 0.4)', 
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px',
      color: 'white',
      fontFamily: FONTS.title,
      fontSize: '9px',
      zIndex: 10,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
  };
  
  const titleStyle = { margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: '#ccc', letterSpacing: '0.5px' };
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '5px', fontWeight: '300' };
  const dot = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={legendStyle}>
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>
        <div style={itemStyle}><div style={{...dot, background: C_INVERSION}}></div> Inversión Inmobiliaria</div>
        <div style={itemStyle}><div style={{...dot, background: C_PRESION}}></div> Zona del manglar en presión </div>
        <div style={itemStyle}><div style={{...dot, background: C_MANGLAR}}></div> Manglar</div>
      </div>
    </div>
  );
}