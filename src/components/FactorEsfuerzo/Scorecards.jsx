import React, { useMemo, useState, useEffect } from 'react';
import { FONTS } from '../../config/theme';

// Colores
const C_PROYECTO_MAGENTA = '#EE0E99';
const C_ALERTA = '#F30A41';
const C_NEUTRO = '#FFFFFF';
const C_SECUNDARIO = '#B0B3B8';

const Card = ({ title, value, subtitle, titleColor }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
    width: '100%', height: '100%', minHeight: '80px', boxSizing: 'border-box',
    backgroundColor: 'rgba(21, 24, 35, 0.6)', borderRadius: '8px', padding: '8px',
    border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)'
  }}>
    <div style={{ fontFamily: FONTS.numbers, fontSize: '18px', fontWeight: 'bold', color: C_PROYECTO_MAGENTA, marginBottom: '4px', lineHeight: '1' }}>
      {value}
    </div>
    <div style={{ fontFamily: FONTS.title, fontSize: '10px', fontWeight: '700', color: titleColor, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
      {title}
    </div>
    <div style={{ fontFamily: FONTS.body, fontSize: '8px', color: '#B0B3B8', lineHeight: '1.2', opacity: 0.9 }}>
      {subtitle}
    </div>
  </div>
);

const Scorecards = () => {
    const [data, setData] = useState({ activos: [], estaciones: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // IMPORTACIÓN DINÁMICA: Carga los archivos solo cuando se necesita
                // Asegúrate de que la ruta '../../data/...' sea correcta desde este archivo
                const activosModule = await import('../../data/activos-turisticos.json');
                const estacionesModule = await import('../../data/estacion-tren.json');

                setData({
                    activos: activosModule.default.features || [],
                    estaciones: estacionesModule.default.features || []
                });
            } catch (error) {
                console.error("Error cargando Scorecards:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const kpis = useMemo(() => {
        if (loading) return { brecha: "...", aislamiento: "...", conexion: "...", red: "..." };

        const { activos, estaciones } = data;
        const totalActivos = activos.length;

        // 1. BRECHA
        const totalDistancia = activos.reduce((acc, curr) => acc + (curr.properties.Factor_Esfuerzo_Líneas_distance || 0), 0);
        const avgDistancia = totalActivos > 0 ? (totalDistancia / totalActivos) : 0;
        const displayDistancia = avgDistancia > 1000 
            ? `${(avgDistancia / 1000).toFixed(1)} km` 
            : `${avgDistancia.toFixed(0)} m`;

        // 2. AISLAMIENTO
        const activosAislados = activos.filter(a => a.properties.NO_estaciones_cercanas === 0).length;
        const pctAislado = totalActivos > 0 ? (activosAislados / totalActivos) * 100 : 0;

        // 3. CONEXIÓN
        const totalConexiones = activos.reduce((acc, curr) => acc + (curr.properties.NO_estaciones_cercanas || 0), 0);
        const avgConexion = totalActivos > 0 ? (totalConexiones / totalActivos).toFixed(1) : 0;

        return {
            brecha: displayDistancia,
            aislamiento: `${pctAislado.toFixed(1)}%`,
            conexion: avgConexion,
            red: estaciones.length.toLocaleString()
        };

    }, [data, loading]);

    return (
      <React.Fragment>
          <Card value={kpis.brecha} title="BRECHA ÚLTIMA MILLA" subtitle="Distancia promedio a la red." titleColor={C_PROYECTO_MAGENTA} />
          <Card value={kpis.aislamiento} title="PATRIMONIO AISLADO" subtitle="% Activos sin conexión directa." titleColor={C_ALERTA} />
          <Card value={kpis.conexion} title="DENSIDAD DE CONEXIÓN" subtitle="Estaciones promedio por activo." titleColor={C_NEUTRO} />
          <Card value={kpis.red} title="INFRAESTRUCTURA TOTAL" subtitle="Estaciones de tren en la red." titleColor={C_SECUNDARIO} />
      </React.Fragment>
    );
}

export default React.memo(Scorecards);