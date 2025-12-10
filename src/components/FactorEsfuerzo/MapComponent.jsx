import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FONTS } from '../../config/theme';

// CORRECCIÓN: Importamos como .json?url
import redTrenUrl from '../../data/red-ferroviaria.json?url';
import conexionesUrl from '../../data/factor-esfuerzo-turistico.json?url';
import estacionesUrl from '../../data/estacion-tren.json?url';
import activosUrl from '../../data/activos-turisticos.json?url';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jb2VsbGFyIiwiYSI6ImNtaXFqdG1tajBneXMzY29ra3ZpNHhuaTAifQ.8rc4UaH2YExVO5ceCB9MXA';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const C_RED_TREN = '#384259';
  const C_ESTACION = '#ffffff';
  const C_ACCESIBLE = '#15BE80';
  const C_MEDIO = '#FFC107';
  const C_AISLADO = '#EE0E99';

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [138.2529, 36.2048],
      zoom: 5.5,
      pitch: 0
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.current.on('load', async () => {
      console.log("Iniciando carga de capas (JSON)...");

      try {
        // Fetch de los archivos .json
        const [redTrenData, conexionesData, estacionesData, activosData] = await Promise.all([
           fetch(redTrenUrl).then(r => r.json()),
           fetch(conexionesUrl).then(r => r.json()),
           fetch(estacionesUrl).then(r => r.json()),
           fetch(activosUrl).then(r => r.json())
        ]);

        // 1. RED FERROVIARIA
        map.current.addSource('red-tren', { type: 'geojson', data: redTrenData });
        map.current.addLayer({
            'id': 'lineas-tren', 'type': 'line', 'source': 'red-tren',
            'paint': { 'line-color': C_RED_TREN, 'line-width': 1, 'line-opacity': 0.6 }
        });

        // 2. CONEXIONES
        map.current.addSource('conexiones', { type: 'geojson', data: conexionesData });
        map.current.addLayer({
            'id': 'lineas-esfuerzo', 'type': 'line', 'source': 'conexiones',
            'paint': {
            'line-width': 1.5,
            'line-dasharray': [2, 1],
            'line-color': [
                'interpolate', ['linear'], ['get', 'distance'],
                0, C_ACCESIBLE, 1000, C_MEDIO, 3000, C_AISLADO
            ],
            'line-opacity': 0.8
            }
        });

        // 3. ESTACIONES
        map.current.addSource('estaciones', { type: 'geojson', data: estacionesData });
        map.current.addLayer({
            'id': 'puntos-estacion', 'type': 'circle', 'source': 'estaciones',
            'paint': { 'circle-radius': 2, 'circle-color': C_ESTACION, 'circle-opacity': 0.3 }
        });

        // 4. ACTIVOS
        map.current.addSource('activos', { type: 'geojson', data: activosData });
        map.current.addLayer({
            'id': 'puntos-activos', 'type': 'circle', 'source': 'activos',
            'paint': {
            'circle-radius': ['interpolate', ['linear'], ['get', 'Factor_Esfuerzo_Líneas_distance'], 0, 3, 5000, 8],
            'circle-color': ['interpolate', ['linear'], ['get', 'Factor_Esfuerzo_Líneas_distance'], 0, C_ACCESIBLE, 1000, C_MEDIO, 3000, C_AISLADO],
            'circle-stroke-width': 1, 'circle-stroke-color': '#fff', 'circle-opacity': 0.9
            }
        });

      } catch (error) {
          console.error("Error al cargar capas del mapa (JSON):", error);
      }
    });
  }, []);

  const legendStyle = {
    position: 'absolute', bottom: '30px', left: '10px',
    backgroundColor: 'rgba(21, 24, 35, 0.8)', padding: '12px', width: '180px',
    borderRadius: '6px', color: 'white', fontFamily: FONTS.title, fontSize: '10px',
    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', zIndex: 10
  };

  const itemStyle = { display: 'flex', alignItems: 'center', marginBottom: '6px', fontWeight: '300', fontSize: '10px' };
  const dotIcon = { width: '8px', height: '8px', borderRadius: '50%', marginRight: '8px' };
  const lineIcon = { width: '20px', height: '2px', marginRight: '8px' };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      
      <div style={legendStyle}>
        <h4 style={{ margin: '0 0 10px 0', color: '#ccc', textTransform: 'uppercase' }}>FACTOR DE ESFUERZO</h4>
        <div style={itemStyle}><div style={{...dotIcon, background: C_AISLADO}}></div> Aislamiento Crítico (&gt; 3km) </div>
        <div style={itemStyle}><div style={{...dotIcon, background: C_MEDIO}}></div> Esfuerzo Medio (1km - 3km) </div>
        <div style={itemStyle}><div style={{...dotIcon, background: C_ACCESIBLE}}></div> Conexión Directa (&lt; 1km) </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
        <div style={itemStyle}><div style={{...lineIcon, background: C_RED_TREN}}></div> Red Ferroviaria (Shinkansen) </div>
      </div>
    </div>
  );
}