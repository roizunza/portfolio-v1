import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { PROJECTS } from '../../config/theme';
import factorData from '../../data/factor-esfuerzo-turistico.json';

const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function GraphsPanel({ t }) {
  const THEME = PROJECTS.factorEsfuerzo;
  const RAMP = THEME.ramp;
  const data = factorData.features || [];

  const panelBg = getCssVar('--fondo-panel') || '#12141E';
  const borderColor = getCssVar('--borde-sutil') || 'rgba(255,255,255,0.1)';
  const fontBody = getCssVar('--fuente-ui') || 'Inter, sans-serif';
  const textPrimary = getCssVar('--texto-principal') || '#ffffff';
  const textSecondary = getCssVar('--texto-secundario') || '#b0b3b8';

  if (!t || !t.graphs) return null;

  // 1. HISTOGRAMA DE DISTANCIAS
  const distData = useMemo(() => {
    const buckets = [
      { name: t.graphs.buckets.bajo, count: 0, fill: RAMP.activos }, 
      { name: t.graphs.buckets.medio, count: 0, fill: RAMP.distancia },    
      { name: t.graphs.buckets.alto, count: 0, fill: RAMP.vias }, 
      { name: t.graphs.buckets.critico, count: 0, fill: RAMP.aislamiento }      
    ];

    data.forEach(f => {
      const d = parseFloat(f.properties.distance) || 0;
      
      if (d < 500) buckets[0].count++;
      else if (d < 1000) buckets[1].count++;
      else if (d < 3000) buckets[2].count++;
      else buckets[3].count++;
    });

    return buckets;
  }, [data, t, RAMP]);

  // 2. TOP  DE AISLAMIENTO 
  const rankingData = useMemo(() => {
    return [...data]
      .sort((a, b) => (parseFloat(b.properties.distance) || 0) - (parseFloat(a.properties.distance) || 0))
      .slice(0, 5)
      .map(f => ({
        name: f.properties.Name || f.properties.nombre || t.graphs.sinNombre,
        distancia: ((parseFloat(f.properties.distance) || 0) / 1000).toFixed(1), // Km
        fill: RAMP.aislamiento
      }));
  }, [data, t, RAMP]);

  // Estilos
  const styles = {
    mainContainer: { display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%', padding: '10px 15px', overflow: 'hidden' },
    section: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', padding: '0 10px', minHeight: '0' },
    header: { display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${borderColor}`, marginBottom: '8px', paddingBottom: '5px' },
    title: { fontFamily: fontBody, fontSize: '14px', fontWeight: '700', color: textPrimary, margin: 0 },
    tooltip: { backgroundColor: panelBg, border: `1px solid ${borderColor}`, padding: '6px', fontFamily: fontBody, fontSize: '10px' }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={styles.tooltip}>
          <p style={{color: 'white', fontWeight: 'bold', margin:0}}>{label}</p>
          <span style={{color: payload[0].fill}}>
            {payload[0].dataKey === 'distancia' 
              ? `${t.graphs.distLabel}: ${payload[0].value} km` 
              : `${t.graphs.countLabel}: ${payload[0].value}`
            }
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.mainContainer}>
      
      {/* GRÁFICA 1 */}
      <div style={styles.section}>
        <div style={styles.header}>
          <div style={styles.title}>{t.graphs.distribucion}</div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distData} margin={{top:10, right:10, left:-20, bottom:0}}>
              <XAxis dataKey="name" tick={{fontSize:9, fill: textSecondary}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:9, fill: textSecondary}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill:'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {distData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICA 2 */}
      <div style={{...styles.section, borderLeft: `1px solid ${borderColor}`}}>
        <div style={styles.header}>
          <div style={styles.title}>{t.graphs.aislados}</div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankingData} layout="vertical" margin={{top:10, right:20, left:0, bottom:0}} barSize={15}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={90} tick={{fontSize:9, fill: textSecondary}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill:'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="distancia" radius={[0, 4, 4, 0]} background={{ fill: 'rgba(255,255,255,0.05)' }}>
                 {rankingData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}