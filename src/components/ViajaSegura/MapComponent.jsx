import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { COLORS, FONTS } from '../../config/theme';

import rutasData from '../../data/recorridos.json';
import paradasData from '../../data/paradas_r66.json'; 
import isocronasData from '../../data/isocronas.json';
import equipData from '../../data/equipamiento.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      // ZOOM OUT PARA VER TODO EL RECORRIDO
      center: [-99.215, 19.323],
      zoom: 12.0 
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      // FUENTES
      map.current.addSource('isocronas', { type: 'geojson', data: isocronasData });
      map.current.addSource('rutas', { type: 'geojson', data: rutasData });
      map.current.addSource('equipamiento', { type: 'geojson', data: equipData });
      map.current.addSource('paradas', { type: 'geojson', data: paradasData });

      // CAPA 1: ISOCRONAS
      map.current.addLayer({
        'id': 'isocronas-fill',
        'type': 'fill',
        'source': 'isocronas',
        'paint': {
          'fill-color': '#A020F0', 
          'fill-opacity': 0.15      
        }
      });

      // CAPA 2: RUTAS
      map.current.addLayer({
        'id': 'rutas-line',
        'type': 'line',
        'source': 'rutas',
        'layout': { 'line-join': 'round', 'line-cap': 'round' },
        'paint': {
          'line-color': [
            'match', ['get', 'origen_destino'],
            'Antigua-MAQ', COLORS.rutas.Antigua,
            'Ocotal-MAQ', COLORS.rutas.Ocotal,
            'Oyamel-MAQ', COLORS.rutas.Oyamel,
            '#FFFFFF'
          ],
          'line-width': 5, 
          'line-opacity': 0.8
        }
      });

      // CAPA 3: EQUIPAMIENTOS
      map.current.addLayer({
        'id': 'equip-circle',
        'type': 'circle',
        'source': 'equipamiento',
        'paint': {
          'circle-radius': 5, 
          'circle-color': [
            'match', ['get', 'equipamiento'],
            'EDUCATIVO', COLORS.equipamiento.EDUCATIVO,
            'SALUD', COLORS.equipamiento.SALUD,
            'ABASTO', COLORS.equipamiento.ABASTO,
            COLORS.equipamiento.Otros
          ],
          'circle-stroke-width': 0
        }
      });

      // CAPA 4: PARADAS
      map.current.addLayer({
        'id': 'paradas-circle',
        'type': 'circle',
        'source': 'paradas',
        'paint': {
          'circle-radius': 7, 
          'circle-color': [
            'match', ['get', 'origen_destino'],
            'Antigua-MAQ', COLORS.rutas.Antigua,
            'Ocotal-MAQ', COLORS.rutas.Ocotal,
            'Oyamel-MAQ', COLORS.rutas.Oyamel,
            '#FFFFFF'
          ],
          'circle-stroke-width': 0
        }
      });
    });

    // POPUPS
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'dark-popup'
    });

    const showPopup = (e, type) => {
      map.current.getCanvas().style.cursor = 'pointer';
      
      let coordinates;
      if (type === 'ruta') {
        coordinates = e.lngLat;
      } else {
        const geom = e.features[0].geometry;
        coordinates = geom.type === 'Point' ? geom.coordinates.slice() : e.lngLat;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
      }

      const props = e.features[0].properties;
      const containerStyle = `font-family:${FONTS.body}; font-size:11px; color:#e0e0e0; min-width:160px;`;
      const titleStyle = `font-weight:bold; text-transform:uppercase; font-size:12px; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:3px; letter-spacing:0.5px;`;
      const rowStyle = `display:flex; justify-content:space-between; margin-bottom:3px;`;
      const labelStyle = `color:#aaa; margin-right:8px;`;
      const valStyle = `color:#fff; font-weight:500; text-align:right;`;

      let html = `<div style="${containerStyle}">`;
      
      if (type === 'ruta') {
        let routeColor = '#FFF';
        if (props.origen_destino === 'Antigua-MAQ') routeColor = COLORS.rutas.Antigua;
        if (props.origen_destino === 'Ocotal-MAQ') routeColor = COLORS.rutas.Ocotal;
        if (props.origen_destino === 'Oyamel-MAQ') routeColor = COLORS.rutas.Oyamel;
        const longitud = parseFloat(props.Longitud_km || 0).toFixed(2);
        html += `<div style="${titleStyle} color:${routeColor}">RUTA ${props.origen_destino}</div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Demanda:</span> <span style="${valStyle}">${props.Demanda_Diaria}</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Longitud:</span> <span style="${valStyle}">${longitud} km</span></div>`;
      } 
      else if (type === 'parada') {
        html += `<div style="${titleStyle} color:${COLORS.descensos}">PARADA</div>
                 <div style="margin-bottom:4px; font-weight:bold;">${props.origen_destino}</div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Suben:</span> <span style="${valStyle}">${props.ascensos}</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Bajan:</span> <span style="${valStyle}">${props.descensos}</span></div>`;
      } 
      else if (type === 'equip') {
        let titleColor = COLORS.equipamiento.Otros;
        if (props.equipamiento === 'EDUCATIVO') titleColor = COLORS.equipamiento.EDUCATIVO;
        if (props.equipamiento === 'SALUD') titleColor = COLORS.equipamiento.SALUD;
        if (props.equipamiento === 'ABASTO') titleColor = COLORS.equipamiento.ABASTO;
        html += `<div style="${titleStyle} color:${titleColor}">${props.equipamiento}</div>
                 <div style="margin-bottom:4px; font-weight:bold; font-size:12px;">${props.nombre_escuela || props.nombre || 'S/N'}</div>`;
      }
      html += `</div>`;
      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    };

    const hidePopup = () => {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    };

    ['rutas-line', 'equip-circle', 'paradas-circle'].forEach(layer => {
      let type = 'equip';
      if (layer.includes('ruta')) type = 'ruta';
      if (layer.includes('parada')) type = 'parada';
      map.current.on('mouseenter', layer, (e) => showPopup(e, type));
      map.current.on('mouseleave', layer, hidePopup);
    });

  }, []);

  // SIMBOLOGÍA 
  const legendStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '8px', 
    width: '140px',  
    backgroundColor: 'rgba(37, 41, 62, 0.2)', 
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    color: 'white',
    fontFamily: FONTS.title,
    fontSize: '9px',
    zIndex: 10,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)'
  };

  const titleStyle = { margin: '0 0 4px 0', fontSize: '11px', fontWeight: 'bold', color: '#ccc', letterSpacing: '0.5px' };
  const subtitleStyle = { margin: '6px 0 2px 0', fontSize: '9px', fontWeight: '500', color: '#B4A7AF' };
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', fontWeight: '300', marginLeft: '6px' };
  const dot = { width: '5px', height: '5px', borderRadius: '50%', marginRight: '5px', display: 'inline-block' };
  const line = { width: '10px', height: '2px', marginRight: '5px', display: 'inline-block' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        .dark-popup .mapboxgl-popup-content {
          background-color: rgba(24, 29, 53, 0.8) !important;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e0e0e0;
          border-radius: 4px;
          padding: 8px;
        }
        .dark-popup .mapboxgl-popup-tip { border-top-color: rgba(24, 29, 53, 0.8) !important; }
      `}</style>

      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      <div style={legendStyle}>
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>
        
        <div style={subtitleStyle}>Recorridos</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Oyamel}}></span> Oyamel</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Ocotal}}></span> Ocotal</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Antigua}}></span> Antigua</div>
        
        <div style={{...itemStyle, marginTop:'4px', marginLeft: '0'}}>
            <span style={{...dot, background: '#A020F0', opacity: 0.5, width: '8px', height: '8px', borderRadius: '2px'}}></span> 
            <span style={{ fontWeight: '500' }}>Isocronas 500m</span>
        </div>

        <div style={subtitleStyle}>Equipamiento</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.EDUCATIVO}}></span> Educativo</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.SALUD}}></span> Salud</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.ABASTO}}></span> Abasto</div>
      </div>
    </div>
  );
}