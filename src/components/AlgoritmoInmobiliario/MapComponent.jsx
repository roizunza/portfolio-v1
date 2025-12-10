import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FONTS } from '../../config/theme';

// Importamos los datos GeoJSON
import distritosData from '../../data/distritos-data-airbnb-hk.json';
import unidadesData from '../../data/unidades-enteras-aribnb-hk.json';

// Token Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // PALETA DE COLORES (Definida por usuario)
  const C_RANGO_1 = '#1f123b'; // El más bajo
  const C_RANGO_2 = '#28bceb';
  const C_RANGO_3 = '#a4fc3c';
  const C_RANGO_4 = '#f4976c';
  const C_RANGO_5 = '#f30a41'; // El más alto

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [114.1694, 22.3193],
      zoom: 10.5,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', () => {

      // -----------------------------------------------------------------------
      // CAPA 1: DISTRITOS (Choropleth: Precio Promedio)
      // -----------------------------------------------------------------------
      map.current.addSource('distritos', {
        type: 'geojson',
        data: distritosData
      });

      // Relleno Clasificado (5 Clases)
      map.current.addLayer({
        'id': 'distritos-fill',
        'type': 'fill',
        'source': 'distritos',
        'paint': {
          'fill-color': [
            'step',
            ['get', 'PRECIO_PROMEDIO_HK'],
            C_RANGO_1, // 590.83 - 898.08 (Default / Inicio)
            898.08, C_RANGO_2,
            1496.97, C_RANGO_3,
            2423, C_RANGO_4,
            3482, C_RANGO_5  // > 3482 (hasta 5459)
          ],
          'fill-opacity': 0.5 // Transparencia media para ver el mapa base
        }
      });

      // Línea Delgada Blanca (Solicitada)
      map.current.addLayer({
        'id': 'distritos-outline',
        'type': 'line',
        'source': 'distritos',
        'paint': {
          'line-color': '#FFFFFF',
          'line-width': 1,
          'line-opacity': 0.5
        }
      });

      // -----------------------------------------------------------------------
      // CAPA 2: UNIDADES AIRBNB (Puntos: Precio Individual)
      // -----------------------------------------------------------------------
      map.current.addSource('unidades', {
        type: 'geojson',
        data: unidadesData
      });

      map.current.addLayer({
        'id': 'unidades-points',
        'type': 'circle',
        'source': 'unidades',
        'paint': {
          'circle-radius': 3, // Puntos visibles pero no invasivos
          'circle-stroke-width': 0,
          'circle-opacity': 0.8,
          'circle-color': [
            'step',
            ['get', 'price'],
            C_RANGO_1, // 1 - 456
            456, C_RANGO_2,
            706, C_RANGO_3,
            989.40, C_RANGO_4,
            1422.60, C_RANGO_5 // > 1422.60 (hasta 150,000)
          ]
        }
      });

    });
  }, []);

  // --- LEYENDA ESTILO VIAJA SEGURA ---
  const legendStyle = {
    position: 'absolute', top: '10px', left: '10px',
    backgroundColor: 'rgba(21, 24, 35, 0.7)', // Fondo oscuro consistente
    padding: '12px', width: '200px',
    borderRadius: '6px', color: 'white',
    fontFamily: FONTS.title, fontSize: '10px',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(5px)',
    zIndex: 10
  };
  
  const titleStyle = { margin: '0 0 8px 0', fontSize: '11px', fontWeight: 'bold', color: '#ccc', letterSpacing: '0.5px', textTransform: 'uppercase' };
  const rowStyle = { display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '9px', fontFamily: FONTS.code, color: '#eee' };
  const boxColor = { width: '10px', height: '10px', borderRadius: '2px', marginRight: '8px' };
  const circleColor = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      {/* LEYENDA MANUAL */}
      <div style={legendStyle}>
        
        {/* SECCIÓN 1: PUNTOS (Unidades) */}
        <h4 style={titleStyle}>PRECIO UNIDAD (HKD)</h4>
        <div style={rowStyle}><div style={{...circleColor, background: C_RANGO_5}}></div> &gt; 1,422 </div>
        <div style={rowStyle}><div style={{...circleColor, background: C_RANGO_4}}></div> 989 - 1,422 </div>
        <div style={rowStyle}><div style={{...circleColor, background: C_RANGO_3}}></div> 706 - 989 </div>
        <div style={rowStyle}><div style={{...circleColor, background: C_RANGO_2}}></div> 456 - 706 </div>
        <div style={rowStyle}><div style={{...circleColor, background: C_RANGO_1}}></div> &lt; 456 </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>

        {/* SECCIÓN 2: POLÍGONOS (Distritos) */}
        <h4 style={titleStyle}>PRECIO PROM. DISTRITO</h4>
        <div style={rowStyle}><div style={{...boxColor, background: C_RANGO_5}}></div> &gt; 3,482 </div>
        <div style={rowStyle}><div style={{...boxColor, background: C_RANGO_4}}></div> 2,423 - 3,482 </div>
        <div style={rowStyle}><div style={{...boxColor, background: C_RANGO_3}}></div> 1,497 - 2,423 </div>
        <div style={rowStyle}><div style={{...boxColor, background: C_RANGO_2}}></div> 898 - 1,496 </div>
        <div style={rowStyle}><div style={{...boxColor, background: C_RANGO_1}}></div> 590 - 898 </div>

      </div>
    </div>
  );
}