import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { COLORS, FONTS } from '../../config/theme';

// Rutas corregidas hacia la carpeta data
import rutasData from '../../data/recorridos.json';
import paradasData from '../../data/paradas_r66.json'; 
import isocronasData from '../../data/isocronas.json';
import equipData from '../../data/equipamiento.json';

// Tu token de Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-99.215, 19.325],
      zoom: 12.5
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
          'fill-opacity': 0.2      
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
          'line-width': 9,
          'line-opacity': 0.8
        }
      });

      // CAPA 3: EQUIPAMIENTOS
      map.current.addLayer({
        'id': 'equip-circle',
        'type': 'circle',
        'source': 'equipamiento',
        'paint': {
          'circle-radius': 8,
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
          'circle-radius': 12,
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
      
      // Estilos CSS inline
      const containerStyle = `font-family:${FONTS.body}; font-size:12px; color:#e0e0e0; min-width:180px;`;
      const titleStyle = `font-weight:bold; text-transform:uppercase; font-size:13px; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; letter-spacing:0.5px;`;
      const rowStyle = `display:flex; justify-content:space-between; margin-bottom:4px;`;
      const labelStyle = `color:#aaa; margin-right:10px;`;
      const valStyle = `color:#fff; font-weight:500; text-align:right;`;

      let html = `<div style="${containerStyle}">`;
      
      // POPUP RUTA 
      if (type === 'ruta') {
        let routeColor = '#FFF';
        if (props.origen_destino === 'Antigua-MAQ') routeColor = COLORS.rutas.Antigua;
        if (props.origen_destino === 'Ocotal-MAQ') routeColor = COLORS.rutas.Ocotal;
        if (props.origen_destino === 'Oyamel-MAQ') routeColor = COLORS.rutas.Oyamel;

        const longitud = parseFloat(props.Longitud_km || 0).toFixed(2);

        html += `<div style="${titleStyle} color:${routeColor}">RUTA ${props.origen_destino}</div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Horario:</span> <span style="${valStyle}">${props.Operacion_Horario || 'N/D'}</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Unidad:</span> <span style="${valStyle}">${props.Tipo_Unidad || 'Vagoneta'}</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Capacidad:</span> <span style="${valStyle}">${props.Unidad_Capacidad} pax</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Intervalo:</span> <span style="${valStyle}">${props.Intervalo_Paso || 'N/D'}</span></div>
                 <hr style="border:0; border-top:1px solid rgba(255,255,255,0.2); margin:6px 0;">
                 <div style="${rowStyle}"><span style="${labelStyle}">Demanda:</span> <span style="${valStyle}">${props.Demanda_Diaria} / día</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Longitud:</span> <span style="${valStyle}">${longitud} km</span></div>`;
      
      } 
      // POPUP PARADA
      else if (type === 'parada') {
        html += `<div style="${titleStyle} color:${COLORS.descensos}">PARADA</div>
                 <div style="margin-bottom:6px; font-weight:bold;">${props.origen_destino}</div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Suben:</span> <span style="${valStyle}">${props.ascensos}</span></div>
                 <div style="${rowStyle}"><span style="${labelStyle}">Bajan:</span> <span style="${valStyle}">${props.descensos}</span></div>
                 <div style="${rowStyle} border-top:1px solid rgba(255,255,255,0.2); padding-top:4px; margin-top:4px;"><span style="${labelStyle}">Permanecen:</span> <span style="${valStyle}">${props.total}</span></div>`;
      } 
      // POPUP EQUIPAMIENTO
      else if (type === 'equip') {
        let titleColor = COLORS.equipamiento.Otros;
        if (props.equipamiento === 'EDUCATIVO') titleColor = COLORS.equipamiento.EDUCATIVO;
        if (props.equipamiento === 'SALUD') titleColor = COLORS.equipamiento.SALUD;
        if (props.equipamiento === 'ABASTO') titleColor = COLORS.equipamiento.ABASTO;

        html += `<div style="${titleStyle} color:${titleColor}">${props.equipamiento}</div>
                 <div style="margin-bottom:4px; font-weight:bold; font-size:13px;">${props.nombre_escuela || props.nombre || 'S/N'}</div>`;
      }
      html += `</div>`;

      // MOSTRAR POPUP
      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    };

    const hidePopup = () => {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    };

    // Eventos
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
    top: '20px',
    left: '20px',
    padding: '15px',
    width: '200px', 
    backgroundColor: 'rgba(37, 41, 62, 0.12)', 
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'white',
    fontFamily: FONTS.title,
    fontSize: '11px',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  };

  const titleStyle = { margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold', color: '#ccc', letterSpacing: '1px' };
  const subtitleStyle = { margin: '12px 0 6px 0', fontSize: '15px', fontWeight: '500', color: '#B4A7AF' };
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '5px', fontSize: '12px', fontWeight: '300', marginLeft: '12px' };
  const dot = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '10px', display: 'inline-block' };
  const line = { width: '15px', height: '4px', marginRight: '8px', display: 'inline-block' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      
      {/* Estilos Popups */}
      <style>{`
        .dark-popup .mapboxgl-popup-content {
          background-color: rgba(24, 29, 53, 0.5) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .dark-popup .mapboxgl-popup-tip {
          border-top-color: rgba(24, 29, 53, 0.5) !important;
        }
      `}</style>

      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {/* LEYENDA / SIMBOLOGÍA */}
      <div style={legendStyle}>
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>
        
        <div style={subtitleStyle}>Recorridos</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Oyamel}}></span> Oyamel</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Ocotal}}></span> Ocotal</div>
        <div style={itemStyle}><span style={{...line, background: COLORS.rutas.Antigua}}></span> Antigua</div>
        
        <div style={{...itemStyle, marginTop:'8px', marginLeft: '0'}}>
            <span style={{...dot, background: '#A020F0', opacity: 0.5, width: '12px', height: '12px', borderRadius: '2px'}}></span> 
            <span style={{ fontWeight: '500' }}>Distancia caminable 500m</span>
        </div>

        <div style={subtitleStyle}>Equipamiento</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.EDUCATIVO}}></span> Educativo</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.SALUD}}></span> Salud</div>
        <div style={itemStyle}><span style={{...dot, background: COLORS.equipamiento.ABASTO}}></span> Abasto</div>
      </div>
    </div>
  );
}