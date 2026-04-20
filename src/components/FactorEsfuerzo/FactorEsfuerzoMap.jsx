import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECTS, STYLES } from '../../config/theme';

import viasData from '../../data/red-ferroviaria.json';
import estacionesData from '../../data/estacion-tren.json';
import factorData from '../../data/factor-esfuerzo-turistico.json';
import activosData from '../../data/activos-turisticos.json';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function MapComponent({ t }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const tRef = useRef(t);

  const RAMP = PROJECTS.factorEsfuerzo.ramp;
  const fontBody = getCssVar('--fuente-ui') || 'Inter, sans-serif';

  useEffect(() => { tRef.current = t; }, [t]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [139.6917, 35.6895], 
      zoom: 10,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.addSource('vias', { type: 'geojson', data: viasData });
      map.current.addLayer({
        'id': 'vias-line', 'type': 'line', 'source': 'vias',
        'paint': { 'line-color': RAMP.vias, 'line-width': 1, 'line-opacity': 0.4 }
      });

      map.current.addSource('activos', { type: 'geojson', data: activosData });
      map.current.addLayer({
        'id': 'activos-buffer', 'type': 'circle', 'source': 'activos',
        'paint': { 'circle-radius': 20, 'circle-opacity': 0.3, 'circle-color': RAMP.buffer, 'circle-blur': 1 }
      });

      map.current.addSource('estaciones', { type: 'geojson', data: estacionesData });
      map.current.addLayer({
        'id': 'estaciones-point', 'type': 'circle', 'source': 'estaciones',
        'filter': ['==', 'railway', 'station'],
        'paint': { 'circle-radius': 1.5, 'circle-color': RAMP.vias, 'circle-stroke-width': 0.01, 'circle-stroke-color': '#000' }
      });

      map.current.addSource('factor', { type: 'geojson', data: factorData });
      map.current.addLayer({
        'id': 'factor-line', 'type': 'line', 'source': 'factor',
        'paint': { 'line-color': RAMP.distancia, 'line-width': 1.5, 'line-opacity': 0.8, 'line-dasharray': [2, 1] }
      });

      map.current.addLayer({
        'id': 'activos-point', 'type': 'circle', 'source': 'activos',
        'paint': { 'circle-radius': 7, 'circle-color': RAMP.activos, 'circle-stroke-width': 0.0001, 'circle-stroke-color': '#fff' }
      });
    });

    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: 'dark-popup' });

    const showPopup = (e, type) => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = 'pointer';
      const props = e.features[0].properties;
      const coordinates = e.lngLat; 
      const currentT = tRef.current?.map; 
      if (!currentT) return;

      let titulo = '';
      let colorTitulo = '#fff';
      let extraInfo = '';

      if (type === 'activo') {
        titulo = props.nombre || currentT.popupActivo;
        colorTitulo = RAMP.activos;
      } else if (type === 'estacion') {
        titulo = props.station_name || currentT.popupEstacion;
        colorTitulo = RAMP.estaciones;
      } else if (type === 'factor') {
        titulo = currentT.popupRed;
        colorTitulo = RAMP.distancia;
        const dist = props.distance ? Math.round(props.distance) : 0;
        extraInfo = `<div style="color:#fff; font-weight:bold;">${dist} ${currentT.metros}</div>`;
      }

      const html = `
        <div style="font-family:${fontBody}; font-size:11px; color:#e0e0e0; min-width:120px;">
          <div style="font-weight:bold; text-transform:uppercase; font-size:10px; margin-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:2px; color:${colorTitulo};">
            ${titulo}
          </div>
          ${extraInfo}
        </div>
      `;

      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    };

    const hidePopup = () => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    };

    map.current.on('mouseenter', 'activos-point', (e) => showPopup(e, 'activo'));
    map.current.on('mouseleave', 'activos-point', hidePopup);
    map.current.on('mouseenter', 'estaciones-point', (e) => showPopup(e, 'estacion'));
    map.current.on('mouseleave', 'estaciones-point', hidePopup);
    map.current.on('mousemove', 'factor-line', (e) => showPopup(e, 'factor'));
    map.current.on('mouseleave', 'factor-line', hidePopup);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); 

  if (!t || !t.map) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        .dark-popup .mapboxgl-popup-content {
          background-color: rgba(13, 15, 22, 0.9) !important;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e0e0e0;
          border-radius: 4px;
          padding: 8px;
        }
        .dark-popup .mapboxgl-popup-tip { border-top-color: rgba(13, 15, 22, 0.9) !important; }
      `}</style>

      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={STYLES.legendBox}>
        <h4 style={STYLES.legendTitle}>{t.map.simbologia}</h4>
        
        <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#aaa', margin: '6px 0 3px 0', textTransform: 'uppercase' }}>{t.map.turismo}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300', color: 'var(--texto-principal)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px', background: RAMP.activos }}></div> {t.map.activo}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300', color: 'var(--texto-principal)' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', marginRight: '8px', opacity: 0.4, background: RAMP.buffer }}></div> {t.map.buffer}
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#aaa', margin: '6px 0 3px 0', textTransform: 'uppercase' }}>{t.map.esfuerzo}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300', color: 'var(--texto-principal)' }}>
          <div style={{ width: '12px', height: '2px', marginRight: '8px', background: RAMP.distancia, borderBottom: '1px dashed' }}></div> {t.map.distancia}
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#aaa', margin: '6px 0 3px 0', textTransform: 'uppercase' }}>{t.map.red}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300', color: 'var(--texto-principal)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px', background: RAMP.estaciones }}></div> {t.map.estacion}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300', color: 'var(--texto-principal)' }}>
          <div style={{ width: '12px', height: '2px', marginRight: '8px', background: RAMP.vias }}></div> {t.map.vias}
        </div>
      </div>
    </div>
  ); 
}