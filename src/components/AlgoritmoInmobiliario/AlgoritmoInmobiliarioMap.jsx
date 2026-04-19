import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PROJECTS, STYLES, FONTS } from '../../config/theme';

import distritosData from '../../data/distritos-data-airbnb-hk.json';
import unidadesData from '../../data/unidades-enteras-aribnb-hk.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const RAMP = PROJECTS.algoritmo.ramp;
  const PROJECT_COLOR = PROJECTS.algoritmo.color; 

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [114.1694, 22.345],
      zoom: 9,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {

      // CAPA DE POLÍGONOS
      map.current.addSource('distritos', { type: 'geojson', data: distritosData });
      
      map.current.addLayer({
        'id': 'distritos-fill', 'type': 'fill', 'source': 'distritos',
        'paint': {
          'fill-color': [
            'step', ['get', 'PRECIO_PROMEDIO_HK'],
            RAMP.step1, 898.08, 
            RAMP.step2, 1496.97, 
            RAMP.step3, 2423, 
            RAMP.step4, 3482, 
            RAMP.step5
          ],
          'fill-opacity': 0.3 
        }
      });
      
      // CAPA DE PUNTOS 
      map.current.addSource('unidades', { type: 'geojson', data: unidadesData });
      map.current.addLayer({
        'id': 'unidades-points', 'type': 'circle', 'source': 'unidades',
        'paint': {
          'circle-radius': 3, 'circle-stroke-width': 0, 'circle-opacity': 0.6,
          'circle-color': [
            'step', ['get', 'price'],
            RAMP.step1, 456, 
            RAMP.step2, 706, 
            RAMP.step3, 989.40, 
            RAMP.step4, 1422.60, 
            RAMP.step5
          ]
        }
      });

      
      map.current.addLayer({ 'id': 'distritos-outline', 'type': 'line', 'source': 'distritos', 'paint': { 'line-color': '#FFFFFF', 'line-width': 0.2, 'line-opacity': 0.2 } });
    });

    // POPUP INTERACTIVO
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'dark-popup'
    });

    const showPopup = (e, type) => {
      map.current.getCanvas().style.cursor = 'pointer';
      const props = e.features[0].properties;
      const coordinates = e.lngLat;

      let precioHKD = 0;
      let titulo = '';
      let colorTitulo = '#fff'; 
      
      if (type === 'punto') {
        precioHKD = props.price;
        titulo = 'UNIDAD AIRBNB';
        colorTitulo = RAMP.step4; 
      } else {
        precioHKD = props.PRECIO_PROMEDIO_HK;
    
        titulo = `DISTRITO: ${props.distrito || ''}`;
        colorTitulo = PROJECT_COLOR; 
      }

      const precioUSD = (precioHKD / 7.8).toFixed(2);
      const precioHKDFormat = precioHKD.toLocaleString();

      const containerStyle = `font-family:${FONTS.body}; font-size:11px; color:#e0e0e0; min-width:140px;`;
      const titleStyle = `font-weight:bold; text-transform:uppercase; font-size:12px; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:3px; letter-spacing:0.5px; color:${colorTitulo};`;
      const rowStyle = `display:flex; justify-content:space-between; margin-bottom:3px;`;
      const labelStyle = `color:#aaa; margin-right:8px;`;
      const valStyle = `color:#fff; font-weight:500; text-align:right;`;

      const html = `
        <div style="${containerStyle}">
          <div style="${titleStyle}">
            ${titulo}
          </div>
          <div style="${rowStyle}">
            <span style="${labelStyle}">Precio HKD:</span> 
            <span style="${valStyle}">$${precioHKDFormat}</span>
          </div>
          <div style="${rowStyle}">
            <span style="${labelStyle}">Precio USD:</span> 
            <span style="${valStyle}">$${precioUSD}</span>
          </div>
        </div>
      `;

      popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
    };

    const hidePopup = () => {
      map.current.getCanvas().style.cursor = '';
      popup.remove();
    };

    // Eventos
    map.current.on('mousemove', 'distritos-fill', (e) => showPopup(e, 'poligono'));
    map.current.on('mouseleave', 'distritos-fill', hidePopup);

    map.current.on('mouseenter', 'unidades-points', (e) => showPopup(e, 'punto'));
    map.current.on('mouseleave', 'unidades-points', hidePopup);

  }, []);

  // Estilos Leyenda
  const titleStyle = STYLES.legendTitle;
  const subTitleStyle = { fontSize: '9px', fontWeight: 'bold', color: '#aaa', margin: '6px 0 3px 0', textTransform: 'none' }; // Corrección: textTransform none para permitir minúsculas
  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontWeight: '300' };
  const boxColor = { width: '10px', height: '10px', borderRadius: '2px', marginRight: '8px' };
  const circleColor = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };

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
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        .dark-popup .mapboxgl-popup-tip { border-top-color: rgba(24, 29, 53, 0.8) !important; }
      `}</style>

      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={STYLES.legendBox}>
        <h4 style={titleStyle}>SIMBOLOGÍA</h4>

        <div style={subTitleStyle}>Precio Promedio/Distrito(HK$)</div>
        <div style={itemStyle}><div style={{...boxColor, background: RAMP.step5}}></div> &gt; 3,482 </div>
        <div style={itemStyle}><div style={{...boxColor, background: RAMP.step4}}></div> 2,423 - 3,482 </div>
        <div style={itemStyle}><div style={{...boxColor, background: RAMP.step3}}></div> 1,497 - 2,423 </div>
        <div style={itemStyle}><div style={{...boxColor, background: RAMP.step2}}></div> 898 - 1,496 </div>
        <div style={itemStyle}><div style={{...boxColor, background: RAMP.step1}}></div> 590 - 898 </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        <div style={subTitleStyle}>Precio Unidad (HK$)</div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.step5}}></div> &gt; 1,422 </div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.step4}}></div> 989 - 1,422 </div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.step3}}></div> 706 - 989 </div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.step2}}></div> 456 - 706 </div>
        <div style={itemStyle}><div style={{...circleColor, background: RAMP.step1}}></div> &lt; 456 </div>

      </div>
    </div>
  );
}