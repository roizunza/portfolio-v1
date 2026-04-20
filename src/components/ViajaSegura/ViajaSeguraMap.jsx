import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FONTS, PROJECTS } from '../../config/theme';

import rutasData from '../../data/recorridos.json';
import paradasData from '../../data/paradas_r66.json'; 
import isocronasData from '../../data/isocronas.json';
import equipData from '../../data/equipamiento.json';

export default function MapComponent({ t }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const RAMP = PROJECTS.viajaSegura.ramp;

  const tRef = useRef(t);
  useEffect(() => { tRef.current = t; }, [t]);

  useEffect(() => {
    if (map.current) return;

    // Conexión segura con la variable de entorno de Vite
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-99.215, 19.323],
      zoom: 12.0 
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {
      if (!map.current) return;

      map.current.addSource('isocronas', { type: 'geojson', data: isocronasData });
      map.current.addSource('rutas', { type: 'geojson', data: rutasData });
      map.current.addSource('equipamiento', { type: 'geojson', data: equipData });
      map.current.addSource('paradas', { type: 'geojson', data: paradasData });

      map.current.addLayer({
        'id': 'isocronas-fill', 'type': 'fill', 'source': 'isocronas',
        'paint': { 'fill-color': RAMP.isochrone, 'fill-opacity': 0.05 } 
      });

      map.current.addLayer({
        'id': 'rutas-line', 'type': 'line', 'source': 'rutas',
        'layout': { 'line-join': 'round', 'line-cap': 'round' },
        'paint': {
          'line-color': [
            'match', ['get', 'origen_destino'],
            'Antigua-MAQ', RAMP.rutas.antigua, 
            'Ocotal-MAQ', RAMP.rutas.ocotal,   
            'Oyamel-MAQ', RAMP.rutas.oyamel,   
            '#FFFFFF'
          ],
          'line-width': 5, 'line-opacity': 0.8
        }
      });

      map.current.addLayer({
        'id': 'equip-circle', 'type': 'circle', 'source': 'equipamiento',
        'paint': {
          'circle-radius': 5, 
          'circle-color': [
            'match', ['get', 'equipamiento'],
            'EDUCATIVO', RAMP.equipamiento.educativo, 
            'SALUD', RAMP.equipamiento.salud,         
            'ABASTO', RAMP.equipamiento.abasto,       
            RAMP.equipamiento.otros                   
          ],
          'circle-stroke-width': 0
        }
      });

      map.current.addLayer({
        'id': 'paradas-circle', 'type': 'circle', 'source': 'paradas',
        'paint': {
          'circle-radius': 7, 
          'circle-color': [
            'match', ['get', 'origen_destino'],
            'Antigua-MAQ', RAMP.rutas.antigua, 
            'Ocotal-MAQ', RAMP.rutas.ocotal,   
            'Oyamel-MAQ', RAMP.rutas.oyamel,   
            '#FFFFFF'
          ],
          'circle-stroke-width': 0
        }
      });

      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, className: 'dark-popup' });

      const showPopup = (e, type) => {
        map.current.getCanvas().style.cursor = 'pointer';
        const props = e.features[0].properties;
        const coordinates = e.lngLat;
        const currentT = tRef.current; 

        const containerStyle = `font-family: var(--fuente-ui); font-size:11px; color:#e0e0e0; min-width:160px;`;
        const titleStyle = `font-weight:bold; text-transform:uppercase; font-size:12px; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:3px; letter-spacing:0.5px;`;
        const rowStyle = `display:flex; justify-content:space-between; margin-bottom:3px;`;
        const labelStyle = `color:#aaa; margin-right:8px;`;
        const valStyle = `color:#fff; font-weight:500; text-align:right;`;

        let html = `<div style="${containerStyle}">`;
        
        if (type === 'ruta') {
          let routeColor = '#FFF';
          if (props.origen_destino === 'Antigua-MAQ') routeColor = RAMP.rutas.antigua;
          if (props.origen_destino === 'Ocotal-MAQ') routeColor = RAMP.rutas.ocotal;
          if (props.origen_destino === 'Oyamel-MAQ') routeColor = RAMP.rutas.oyamel;
          const longitud = parseFloat(props.Longitud_km || 0).toFixed(2);
          html += `<div style="${titleStyle} color:${routeColor}">${currentT.map.popups.ruta} ${props.origen_destino}</div>
                   <div style="${rowStyle}"><span style="${labelStyle}">${currentT.map.popups.demanda}:</span> <span style="${valStyle}">${props.Demanda_Diaria}</span></div>
                   <div style="${rowStyle}"><span style="${labelStyle}">${currentT.map.popups.longitud}:</span> <span style="${valStyle}">${longitud} km</span></div>`;
        } 
        else if (type === 'parada') {
          html += `<div style="${titleStyle} color:${RAMP.descensos}">${currentT.map.popups.parada}</div>
                   <div style="margin-bottom:4px; font-weight:bold;">${props.origen_destino}</div>
                   <div style="${rowStyle}"><span style="${labelStyle}">${currentT.map.popups.suben}:</span> <span style="${valStyle}">${props.ascensos}</span></div>
                   <div style="${rowStyle}"><span style="${labelStyle}">${currentT.map.popups.bajan}:</span> <span style="${valStyle}">${props.descensos}</span></div>`;
        } 
        else if (type === 'equip') {
          let titleColor = RAMP.equipamiento.otros;
          let labelTrad = props.equipamiento;
          if (props.equipamiento === 'EDUCATIVO') { titleColor = RAMP.equipamiento.educativo; labelTrad = currentT.map.popups.educativo; }
          if (props.equipamiento === 'SALUD') { titleColor = RAMP.equipamiento.salud; labelTrad = currentT.map.popups.salud; }
          if (props.equipamiento === 'ABASTO') { titleColor = RAMP.equipamiento.abasto; labelTrad = currentT.map.popups.abasto; }
          
          const defaultLabel = currentT.nav.proyectos === 'Proyectos' ? 'S/N' : 'N/A';
          html += `<div style="${titleStyle} color:${titleColor}">${labelTrad}</div>
                   <div style="margin-bottom:4px; font-weight:bold; font-size:12px;">${props.nombre_escuela || props.nombre || defaultLabel}</div>`;
        }
        html += `</div>`;
        popup.setLngLat(coordinates).setHTML(html).addTo(map.current);
      };

      const hidePopup = () => { if (map.current) { map.current.getCanvas().style.cursor = ''; popup.remove(); } };

      ['rutas-line', 'equip-circle', 'paradas-circle'].forEach(layer => {
        let lType = 'equip';
        if (layer.includes('ruta')) lType = 'ruta';
        if (layer.includes('parada')) lType = 'parada';
        map.current.on('mouseenter', layer, (e) => showPopup(e, lType));
        map.current.on('mouseleave', layer, hidePopup);
      });
    });

    return () => { if (map.current) { map.current.remove(); map.current = null; } };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={{
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        padding: '8px', 
        width: '140px',
        backgroundColor: 'rgba(37, 41, 62, 0.5)', 
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px', 
        color: '#FFFFFF', 
        fontFamily: 'var(--fuente-datos)', 
        fontSize: '9px',
        zIndex: 10, 
        backdropFilter: 'blur(8px)'
      }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '11px', fontWeight: 'bold', color: '#B0B3B8', letterSpacing: '0.5px' }}>
          {t.map.simbologia}
        </h4>
        
        <div style={{ margin: '6px 0 2px 0', fontSize: '9px', fontWeight: '500', color: '#B4A7AF' }}>{t.map.recorridos}</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '10px', height: '2px', marginRight: '5px', display: 'inline-block', background: RAMP.rutas.oyamel}}></span> Oyamel
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '10px', height: '2px', marginRight: '5px', display: 'inline-block', background: RAMP.rutas.ocotal}}></span> Ocotal
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '10px', height: '2px', marginRight: '5px', display: 'inline-block', background: RAMP.rutas.antigua}}></span> Antigua
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop:'4px', marginLeft: '0', fontSize: '9px', color: '#FFFFFF' }}>
            <span style={{width: '5px', height: '5px', borderRadius: '50%', marginRight: '5px', display: 'inline-block', background: RAMP.isochrone, opacity: 0.5}}></span> 
            <span style={{ fontWeight: '500', fontSize: '9px' }}>{t.map.isocronas}</span>
        </div>
        
        <div style={{ margin: '6px 0 2px 0', fontSize: '9px', fontWeight: '500', color: '#B4A7AF' }}>{t.map.equip}</div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '5px', height: '5px', borderRadius: '50%', marginRight: '5px', display: 'inline-block', background: RAMP.equipamiento.educativo}}></span> {t.map.popups.educativo}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '5px', height: '5px', borderRadius: '50%', marginRight: '5px', display: 'inline-block', background: RAMP.equipamiento.salud}}></span> {t.map.popups.salud}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px', fontSize: '9px', color: '#FFFFFF' }}>
          <span style={{width: '5px', height: '5px', borderRadius: '50%', marginRight: '5px', display: 'inline-block', background: RAMP.equipamiento.abasto}}></span> {t.map.popups.abasto}
        </div>
      </div>
    </div>
  );
}