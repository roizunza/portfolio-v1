import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECTS, STYLES, FONTS } from '../../config/theme';

// Importación de Datos
import viasData from '../../data/red-ferroviaria.json';
import estacionesData from '../../data/estacion-tren.json';
import factorData from '../../data/factor-esfuerzo-turistico.json'; // Ahora interpretado como Líneas
import activosData from '../../data/activos-turisticos.json'; // Puntos y base para Buffer

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const RAMP = PROJECTS.factorEsfuerzo.ramp;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [139.6917, 35.6895], 
      zoom: 10,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      
      // 1. CAPA VÍAS FÉRREAS (FONDO)
      map.current.addSource('vias', { type: 'geojson', data: viasData });
      map.current.addLayer({
        'id': 'vias-line', 'type': 'line', 'source': 'vias',
        'paint': {
          'line-color': RAMP.vias, // #546E7A
          'line-width': 1,
          'line-opacity': 0.4
        }
      });

      // 2. CAPA BUFFER DE ACTIVOS 
      map.current.addSource('activos', { type: 'geojson', data: activosData });
      
      map.current.addLayer({
        'id': 'activos-buffer', 'type': 'circle', 'source': 'activos',
        'paint': {
          'circle-radius': 20, // Radio (500m aprox en zoom medio)
          'fill-opacity': 0.8,
          'circle-color': RAMP.buffer, 
          'circle-blur': 0.01
        }
      });

      // 3. CAPA ESTACIONES DE TREN 
      map.current.addSource('estaciones', { type: 'geojson', data: estacionesData });
      map.current.addLayer({
        'id': 'estaciones-point', 'type': 'circle', 'source': 'estaciones',
        'filter': ['==', 'railway', 'station'],
        'paint': {
          'circle-radius': 1.5,
          'circle-color': RAMP.vias,
          'circle-stroke-width': 0.01,
          'circle-stroke-color': '#000'
        }
      });

      // 4. CAPA FACTOR DE ESFUERZO (LÍNEAS DE DISTANCIA)
      map.current.addSource('factor', { type: 'geojson', data: factorData });
      map.current.addLayer({
        'id': 'factor-line', 'type': 'line', 'source': 'factor',
        'paint': {
          'line-color': RAMP.distancia,
          'line-width': 1.5,
          'line-opacity': 0.8,
          'line-dasharray': [2, 1] // Línea punteada 
        }
      });

      // 5. CAPA DE ACTIVOS TURÍSTICOS
      map.current.addLayer({
        'id': 'activos-point', 'type': 'circle', 'source': 'activos',
        'paint': {
          'circle-radius': 7,
          'circle-color': RAMP.activos, 
          'circle-stroke-width': 0.0001,
          'circle-stroke-color': '#fff'
        }
      });
    });

    // --- POPUPS ---
    const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: 'dark-popup' });

    const showPopup = (e, type) => {
      map.current.getCanvas().style.cursor = 'pointer';
      const props = e.features[0].properties;
      const coordinates = e.lngLat; 

      let titulo = '';
      let colorTitulo = '#fff';
      let extraInfo = '';

      if (type === 'activo') {
        titulo = props.nombre || 'ACTIVO TURÍSTICO';
        colorTitulo = RAMP.activos;
      } else if (type === 'estacion') {
        titulo = props.station_name || 'ESTACIÓN';
        colorTitulo = RAMP.estaciones;
      } else if (type === 'factor') {
        titulo = 'DISTANCIA A RED';
        colorTitulo = RAMP.distancia;
        const dist = props.distance ? Math.round(props.distance) : 0;
        extraInfo = `<div style="color:#fff; font-weight:bold;">${dist} metros</div>`;
      }

      const html = `
        <div style="font-family:${FONTS.body}; font-size:11px; color:#e0e0e0; min-width:120px;">
          <div style="font-weight:bold; text-transform:uppercase; font-size:10px; margin-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:2px; color:${colorTitulo};">
            ${titulo}
          </div>
          ${extraInfo}
        </div>
      `;

      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    };

    const hidePopup = () => {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    };

    // Eventos
    map.current.on('mouseenter', 'activos-point', (e) => showPopup(e, 'activo'));
    map.current.on('mouseleave', 'activos-point', hidePopup);
    
    map.current.on('mouseenter', 'estaciones-point', (e) => showPopup(e, 'estacion'));
    map.current.on('mouseleave', 'estaciones-point', hidePopup);

    // Evento para líneas 
    map.current.on('mousemove', 'factor-line', (e) => showPopup(e, 'factor'));
    map.current.on('mouseleave', 'factor-line', hidePopup);

  }, []);

  // Estilos Leyenda
  const titleStyle = STYLES.legendTitle;
  const subTitleStyle = { fontSize: '9px', fontWeight: 'bold', color: '#aaa', margin: '6px 0 3px 0', textTransform: 'uppercase' };
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300' };
  const circleColor = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };
  const lineColor = { width: '12px', height: '2px', marginRight: '8px' };
  const bufferColor = { width: '10px', height: '10px', borderRadius: '2px', marginRight: '8px', opacity: 0.4 };

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
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>
        
        {/* Sección Activos */}
        <div style={subTitleStyle}>Turismo</div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.activos}}></div> Activo Turístico (Punto) </div>
        <div style={itemStyle}><div style={{...bufferColor, background: RAMP.buffer}}></div> Buffer de Influencia </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        {/* Sección Análisis */}
        <div style={subTitleStyle}>Factor Esfuerzo</div>
        <div style={itemStyle}><div style={{...lineColor, background: RAMP.distancia, borderBottom: '1px dashed'}}></div> Distancia a Estación </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        {/* Sección Infraestructura */}
        <div style={subTitleStyle}>Red Ferroviaria</div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.estaciones}}></div> Estación Tren </div>
        <div style={itemStyle}><div style={{...lineColor, background: RAMP.vias}}></div> Vías </div>
      </div>
    </div>
  );
}