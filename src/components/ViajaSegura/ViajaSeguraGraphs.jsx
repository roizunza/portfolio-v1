import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS, FONTS, PROJECTS } from '../../config/theme';
import paradasData from '../../data/paradas_r66.json';
import equipData from '../../data/equipamiento.json';

export default function ViajaSeguraGraphs() {

  const THEME = PROJECTS.viajaSegura;
  const RAMP = THEME.ramp;
  
  const C_DESCENSOS = RAMP.descensos; 

  const processRouteData = (rutaName) => {
    return paradasData.features
      .filter(f => f.properties.origen_destino.includes(rutaName))
      .sort((a, b) => a.properties.fid - b.properties.fid)
      .map(f => ({
        name: f.properties.nombre || f.properties.fid,
        Ascensos: f.properties.ascensos,
        Descensos: f.properties.descensos * -1, 
        DescensosReal: f.properties.descensos 
      }));
  };
  const dataOyamel = useMemo(() => processRouteData('Oyamel'), []);
  const dataOcotal = useMemo(() => processRouteData('Ocotal'), []);
  const dataAntigua = useMemo(() => processRouteData('Antigua'), []);

  const dataEquip = useMemo(() => {
    const counts = { Oyamel: { Educ: 0, Salud: 0, Abasto: 0 }, Ocotal: { Educ: 0, Salud: 0, Abasto: 0 }, Antigua: { Educ: 0, Salud: 0, Abasto: 0 } };
    equipData.features.forEach(f => {
      const props = f.properties;
      let r = 'Oyamel';
      if (props.origen_destino.includes('Ocotal')) r = 'Ocotal';
      if (props.origen_destino.includes('Antigua')) r = 'Antigua';
      const tipo = props.equipamiento;
      if (tipo === 'EDUCATIVO') counts[r].Educ++;
      if (tipo === 'SALUD') counts[r].Salud++;
      if (tipo === 'ABASTO') counts[r].Abasto++;
    });
    return Object.keys(counts).map(key => ({ name: key, Educación: counts[key].Educ, Salud: counts[key].Salud, Abasto: counts[key].Abasto }));
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: COLORS.background.panel, border: `1px solid ${COLORS.ui.border}`, padding: '6px', fontFamily: FONTS.body, fontSize: '10px' }}>
          <p style={{color: 'white', fontWeight: 'bold', marginBottom:'3px', margin: 0}}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: entry.fill }}></span>
              <span style={{ color: COLORS.text.secondary }}>{entry.name}: <span style={{ color: '#fff', fontWeight: 'bold' }}>{Math.abs(entry.value)}</span></span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomAxisTick = ({ x, y, payload }) => {
    let color = COLORS.text.secondary;
    if (payload.value === 'Oyamel') color = RAMP.rutas.oyamel;
    if (payload.value === 'Ocotal') color = RAMP.rutas.ocotal;
    if (payload.value === 'Antigua') color = RAMP.rutas.antigua;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={12} textAnchor="middle" fill={color} fontFamily={FONTS.data} fontSize={10} fontWeight="bold">
          {payload.value.toUpperCase()}
        </text>
      </g>
    );
  };

  const styles = {
    mainContainer: { display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%', padding: '10px 15px', overflow: 'hidden' },
    leftSection: { flex: '2 1 500px', display: 'flex', flexDirection: 'column', paddingRight: '15px', minHeight: '0' },
    rightSection: { flex: '1 1 250px', display: 'flex', flexDirection: 'column', paddingLeft: '15px', minHeight: '0', borderLeft: `1px solid ${COLORS.ui.border}` },
    header: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: `1px solid ${COLORS.ui.border}`, marginBottom: '8px', paddingBottom: '5px', gap: '4px' },
    title: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: COLORS.text.primary, margin: 0, letterSpacing: '0.3px', width:'100%' },
    legend: { display: 'flex', gap: '10px', fontSize: '11px', fontFamily: FONTS.body, color: COLORS.text.primary, flexWrap: 'wrap' },
    subTitle: { fontFamily: FONTS.data, fontSize: '10px', color: COLORS.text.secondary, marginTop: '4px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' },
    dot: (color) => ({ width: '6px', height: '6px', backgroundColor: color, borderRadius: '2px', display: 'inline-block', marginRight: '4px' })
  };

  return (
    <div style={styles.mainContainer}>
      {/* IZQUIERDA */}
      <div style={styles.leftSection}>
        <div style={styles.header}>
          <div style={styles.title}>Dinámica de demanda</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.rutas.antigua)}></span> Ascensos</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(C_DESCENSOS)}></span> Descensos</div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, gap: '5px', minHeight: 0 }}> 
          {[ {d: dataOyamel, c: RAMP.rutas.oyamel, t: 'Oyamel'}, {d: dataOcotal, c: RAMP.rutas.ocotal, t: 'Ocotal'}, {d: dataAntigua, c: RAMP.rutas.antigua, t: 'Antigua'} ].map((ruta, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ruta.d} layout="vertical" stackOffset="sign" margin={{top:0, right:2, left:-25, bottom:0}}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide width={0} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    <Bar dataKey="Ascensos" fill={ruta.c} stackId="stack" radius={[0, 2, 2, 0]} barSize={16} />
                    <Bar dataKey="Descensos" fill={C_DESCENSOS} stackId="stack" radius={[2, 0, 0, 2]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{...styles.subTitle, color: ruta.c}}>{ruta.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DERECHA */}
      <div style={styles.rightSection}>
        <div style={styles.header}>
          <div style={styles.title}>Infraestructura de cuidados</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.equipamiento.educativo)}></span> Educación</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.equipamiento.salud)}></span> Salud</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(RAMP.equipamiento.abasto)}></span> Abasto</div>
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataEquip} margin={{top:5, right:0, left:-25, bottom:5}} barCategoryGap="25%">
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomAxisTick />} interval={0} />
              <YAxis tick={{fill: COLORS.text.secondary, fontSize: 10, fontFamily: FONTS.body}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="Educación" stackId="a" fill={RAMP.equipamiento.educativo} radius={[0, 0, 2, 2]} />
              <Bar dataKey="Salud" stackId="a" fill={RAMP.equipamiento.salud} />
              <Bar dataKey="Abasto" stackId="a" fill={RAMP.equipamiento.abasto} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}