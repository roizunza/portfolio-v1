import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECTS, STYLES } from '../../config/theme';

import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json'; 

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const RAMP = PROJECTS.vigilancia.ramp;

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
      
      // 1. Manglares (Verde)
      map.current.addSource('manglares', { type: 'geojson', data: manglaresData });
      map.current.addLayer({ 'id': 'manglares-fill', 'type': 'fill', 'source': 'manglares', 'paint': { 'fill-color': RAMP.manglar, 'fill-opacity': 0.8 } });
      map.current.addLayer({ 'id': 'manglares-border', 'type': 'line', 'source': 'manglares', 'paint': { 'line-color': RAMP.manglar, 'line-width': 0.1 } });

      // 2. Inversión (Amarillo)
      map.current.addSource('inversion', { type: 'geojson', data: inversionData });
      map.current.addLayer({ 'id': 'inversion-fill', 'type': 'fill', 'source': 'inversion', 'paint': { 'fill-color': RAMP.inversion, 'fill-opacity': 0.4 } });
      map.current.addLayer({ 'id': 'inversion-border', 'type': 'line', 'source': 'inversion', 'paint': { 'line-color': RAMP.inversion, 'line-width': 0.1 } });

      // 3. Presión (Rojo)
      map.current.addSource('presion', { type: 'geojson', data: presionData });
      map.current.addLayer({ 'id': 'presion-fill', 'type': 'fill', 'source': 'presion', 'paint': { 'fill-color': RAMP.presion, 'fill-opacity': 0.8 } });
      map.current.addLayer({ 'id': 'presion-border', 'type': 'line', 'source': 'presion', 'paint': { 'line-color': RAMP.presion, 'line-width': 0.1, 'line-dasharray': [2, 1] } });
    });
  }, []);

  // Estilos
  const titleStyle = STYLES.legendTitle;
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '5px', fontWeight: '300', fontSize: '9px' };
  const dot = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={STYLES.legendBox}>
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>
        
        {/* ORDEN: Manglar>Inversión>Presión */}
        
        {/* 1. Manglar (Verde) */}
        <div style={itemStyle}><div style={{...dot, background: RAMP.manglar}}></div> Manglar</div>
        
        {/* 2. Inversión (Amarillo) */}
        <div style={itemStyle}><div style={{...dot, background: RAMP.inversion}}></div> Inversión Inmobiliaria</div>
        
        {/* 3. Presión (Rojo) */}
        <div style={itemStyle}><div style={{...dot, background: RAMP.presion}}></div> Zona del manglar en presión </div>
        
      </div>
    </div>
  );
}