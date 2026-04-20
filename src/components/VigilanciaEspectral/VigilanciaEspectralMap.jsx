import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECTS, STYLES } from '../../config/theme.js';

import manglaresData from '../../data/manglares.json';
import inversionData from '../../data/inversion.json';
import presionData from '../../data/manglarespresionados.json'; 

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapComponent({ t }) {
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

      // 2. Inversion (Amarillo)
      map.current.addSource('inversion', { type: 'geojson', data: inversionData });
      map.current.addLayer({ 'id': 'inversion-fill', 'type': 'fill', 'source': 'inversion', 'paint': { 'fill-color': RAMP.inversion, 'fill-opacity': 0.4 } });
      map.current.addLayer({ 'id': 'inversion-border', 'type': 'line', 'source': 'inversion', 'paint': { 'line-color': RAMP.inversion, 'line-width': 0.1 } });

      // 3. Presion (Rojo)
      map.current.addSource('presion', { type: 'geojson', data: presionData });
      map.current.addLayer({ 'id': 'presion-fill', 'type': 'fill', 'source': 'presion', 'paint': { 'fill-color': RAMP.presion, 'fill-opacity': 0.8 } });
      map.current.addLayer({ 'id': 'presion-border', 'type': 'line', 'source': 'presion', 'paint': { 'line-color': RAMP.presion, 'line-width': 0.1, 'line-dasharray': [2, 1] } });
    });
  }, [RAMP]);

  if (!t || !t.map) return null;

  const titleStyle = STYLES.legendTitle;
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '5px', fontWeight: '300', fontSize: '9px', color: 'var(--texto-principal)' };
  const dot = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={STYLES.legendBox}>
        <h4 style={titleStyle}>{t.map.simbologia}</h4>
        
        <div style={itemStyle}><div style={{...dot, background: RAMP.manglar}}></div> {t.map.manglar}</div>
        <div style={itemStyle}><div style={{...dot, background: RAMP.inversion}}></div> {t.map.inversion}</div>
        <div style={itemStyle}><div style={{...dot, background: RAMP.presion}}></div> {t.map.presion}</div>
      </div>
    </div>
  );
}