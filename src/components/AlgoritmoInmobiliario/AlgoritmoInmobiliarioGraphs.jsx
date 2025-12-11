import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell 
} from 'recharts';
import { FONTS, COLORS, PROJECTS } from '../../config/theme';
import distritosData from '../../data/distritos-data-airbnb-hk.json';

export default function GraphsPanel() {
  const THEME = PROJECTS.algoritmo;
  const RAMP = THEME.ramp;
  const features = distritosData.features || [];

  // 1. DATOS PARA SCATTER PLOT (Precios vs. Rotación)
  const scatterData = useMemo(() => {
    return features.map(f => ({
      x: f.properties.PRECIO_PROMEDIO_HK,      // Eje X: Precio
      y: f.properties.ROTACION_PORCENTAJE,     // Eje Y: Rotación
      z: f.properties.price_count,             // Tamaño: Cantidad de unidades
      name: f.properties.distrito,
      // Color dinámico: Si Rotación > 5% y Precio > 2000 -> Rojo (Crítico)
      fill: (f.properties.ROTACION_PORCENTAJE > 5 && f.properties.PRECIO_PROMEDIO_HK > 2000) 
            ? RAMP.step3 // Rojo/Rosa Alto
            : RAMP.step4 // Coral base
    }));
  }, [features]);


  // 2. DATOS PARA ABSORCIÓN (Top 7 Distritos)
  const barData = useMemo(() => {
    return [...features]
      .sort((a, b) => b.properties.price_count - a.properties.price_count)
      .slice(0, 7)
      .map(f => ({
        name: f.properties.distrito,
        Unidades: f.properties.price_count,
        fill: THEME.color
      }));
  }, [features]);

  // COMPONENTES DE DISEÑO 
  const CustomTooltipScatter = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: COLORS.background.panel, border: `1px solid ${COLORS.ui.border}`, padding: '8px', fontFamily: FONTS.body, fontSize: '10px' }}>
          <p style={{color: 'white', fontWeight: 'bold', marginBottom:'4px', margin: 0}}>{data.name}</p>
          <div style={{ color: COLORS.text.secondary }}>Precio: <span style={{color:'#fff'}}>${Math.round(data.x)} HKD</span></div>
          <div style={{ color: COLORS.text.secondary }}>Rotación: <span style={{color:'#fff'}}>{data.y.toFixed(1)}%</span></div>
          <div style={{ color: COLORS.text.secondary }}>Stock: <span style={{color:'#fff'}}>{data.z} u.</span></div>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipBar = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: COLORS.background.panel, border: `1px solid ${COLORS.ui.border}`, padding: '6px', fontFamily: FONTS.body, fontSize: '10px' }}>
          <p style={{color: 'white', fontWeight: 'bold', marginBottom:'3px', margin: 0}}>{label}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: payload[0].fill }}></span>
            <span style={{ color: COLORS.text.secondary }}>Unidades: <span style={{ color: '#fff', fontWeight: 'bold' }}>{payload[0].value}</span></span>
          </div>
        </div>
      );
    }
    return null;
  };

  // ESTILOS RESPONSIVOS 
  const styles = {
    mainContainer: { display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%', padding: '10px 15px', overflow: 'hidden' },
    leftSection: { flex: '2 1 500px', display: 'flex', flexDirection: 'column', paddingRight: '15px', minHeight: '0' },
    rightSection: { flex: '1 1 250px', display: 'flex', flexDirection: 'column', paddingLeft: '15px', minHeight: '0', borderLeft: `1px solid ${COLORS.ui.border}` },
    header: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: `1px solid ${COLORS.ui.border}`, marginBottom: '8px', paddingBottom: '5px', gap: '4px' },
    title: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: COLORS.text.primary, margin: 0, letterSpacing: '0.3px', width:'100%' },
    legend: { display: 'flex', gap: '10px', fontSize: '11px', fontFamily: FONTS.body, color: COLORS.text.primary, flexWrap: 'wrap' },
    dot: (color) => ({ width: '6px', height: '6px', backgroundColor: color, borderRadius: '50%', display: 'inline-block', marginRight: '4px' })
  };

  return (
    <div style={styles.mainContainer}>
      
      {/* IZQUIERDA: SCATTER PLOT (Precios vs Rotación) */}
      <div style={styles.leftSection}>
        <div style={styles.header}>
          <div style={styles.title}>Especulación: Precio vs. Rotación</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.step4)}></span> Alta Presión</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.step3)}></span> Estándar</div>
          </div>
        </div>
        
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{top: 10, right: 10, bottom: 10, left: -10}}>
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Precio" 
                unit="HKD" 
                tick={{fontSize: 10, fill: COLORS.text.secondary}} 
                tickLine={false} 
                axisLine={{stroke: COLORS.ui.border}}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Rotación" 
                unit="%" 
                tick={{fontSize: 10, fill: COLORS.text.secondary}} 
                tickLine={false} 
                axisLine={{stroke: COLORS.ui.border}} 
              />
              <ZAxis type="number" dataKey="z" range={[20, 200]} /> {/* Tamaño burbuja basado en stock */}
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltipScatter />} />
              <Scatter name="Distritos" data={scatterData} fill={THEME.color} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DERECHA: ABSORCIÓN (Barras top) */}
      <div style={styles.rightSection}>
        <div style={styles.header}>
          <div style={styles.title}>Absorción por Distrito</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(THEME.color)}></span> Unidades Airbnb</div>
          </div>
        </div>
        
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={barData} 
              layout="vertical" 
              margin={{top: 5, right: 10, left: 0, bottom: 5}} 
              barSize={12}
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{fontSize: 9, fill: '#fff', fontFamily: FONTS.body}} 
                width={70} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltipBar />} />
              <Bar dataKey="Unidades" radius={[0, 4, 4, 0]} background={{ fill: 'rgba(255,255,255,0.05)' }}>
                {
                  barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}