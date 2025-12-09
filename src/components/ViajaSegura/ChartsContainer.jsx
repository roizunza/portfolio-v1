import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS, FONTS } from '../../config/theme';
import paradasData from '../../data/paradas_r66.json';
import equipData from '../../data/equipamiento.json';

export default function ChartsContainer() {

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

  // Componentes Visuales Compactos
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'rgba(24, 29, 53, 0.95)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', fontFamily: FONTS.body, fontSize: '10px' }}>
          <p style={{color: 'white', fontWeight: 'bold', marginBottom:'3px', margin: 0}}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: entry.fill }}></span>
              <span style={{ color: '#E0E0E0' }}>{entry.name}: <span style={{ color: '#fff', fontWeight: 'bold' }}>{Math.abs(entry.value)}</span></span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomAxisTick = ({ x, y, payload }) => {
    let color = '#B0B3B8';
    if (payload.value === 'Oyamel') color = COLORS.rutas.Oyamel;
    if (payload.value === 'Ocotal') color = COLORS.rutas.Ocotal;
    if (payload.value === 'Antigua') color = COLORS.rutas.Antigua;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={12} textAnchor="middle" fill={color} fontFamily={FONTS.title} fontSize={10} fontWeight="bold">
          {payload.value.toUpperCase()}
        </text>
      </g>
    );
  };

  // ESTILOS RESPONSIVOS COMPACTOS
  const styles = {
    mainContainer: { display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%', padding: '10px 15px', overflow: 'hidden' },
    
    // Reducción de paddings para dar más espacio a las gráficas
    leftSection: { flex: '2 1 500px', display: 'flex', flexDirection: 'column', paddingRight: '15px', minHeight: '0' },
    rightSection: { flex: '1 1 250px', display: 'flex', flexDirection: 'column', paddingLeft: '15px', minHeight: '0', borderLeft: '1px solid rgba(255,255,255,0.05)' },
    
    header: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '8px', paddingBottom: '5px', gap: '4px' },
    
    // Títulos y textos más pequeños
    title: { fontFamily: FONTS.body, fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: 0, letterSpacing: '0.3px', width:'100%' },
    legend: { display: 'flex', gap: '10px', fontSize: '11px', fontFamily: FONTS.body, color: '#FFFFFF', flexWrap: 'wrap' },
    subTitle: { fontFamily: FONTS.title, fontSize: '10px', color: '#B0B3B8', marginTop: '4px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' },
    
    dot: (color) => ({ width: '6px', height: '6px', backgroundColor: color, borderRadius: '2px', display: 'inline-block', marginRight: '4px' })
  };

  return (
    <div style={styles.mainContainer}>
      
      {/* IZQUIERDA: FLUJO */}
      <div style={styles.leftSection}>
        <div style={styles.header}>
          <div style={styles.title}>Dinámica de demanda</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot('#F976C7')}></span> Ascensos</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(COLORS.descensos)}></span> Descensos</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, gap: '5px', minHeight: 0 }}> 
          {[ {d: dataOyamel, c: COLORS.rutas.Oyamel, t: 'Oyamel'}, {d: dataOcotal, c: COLORS.rutas.Ocotal, t: 'Ocotal'}, {d: dataAntigua, c: COLORS.rutas.Antigua, t: 'Antigua'} ].map((ruta, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ruta.d} layout="vertical" stackOffset="sign" margin={{top:0, right:2, left:-25, bottom:0}}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide width={0} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                    {/* Barras más delgadas para que quepan todas */}
                    <Bar dataKey="Ascensos" fill={ruta.c} stackId="stack" radius={[0, 2, 2, 0]} barSize={16} />
                    <Bar dataKey="Descensos" fill={COLORS.descensos} stackId="stack" radius={[2, 0, 0, 2]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{...styles.subTitle, color: ruta.c}}>{ruta.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DERECHA: INFRAESTRUCTURA */}
      <div style={styles.rightSection}>
        <div style={styles.header}>
          <div style={styles.title}>Infraestructura de cuidados</div>
          <div style={styles.legend}>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(COLORS.equipamiento.EDUCATIVO)}></span> Educación</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(COLORS.equipamiento.SALUD)}></span> Salud</div>
            <div style={{ display: 'flex', alignItems: 'center' }}><span style={styles.dot(COLORS.equipamiento.ABASTO)}></span> Abasto</div>
          </div>
        </div>
        
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            {/* Márgenes negativos para aprovechar todo el ancho */}
            <BarChart data={dataEquip} margin={{top:5, right:0, left:-25, bottom:5}} barCategoryGap="25%">
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomAxisTick />} interval={0} />
              <YAxis tick={{fill: '#B0B3B8', fontSize: 10, fontFamily: FONTS.body}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
              <Bar dataKey="Educación" stackId="a" fill={COLORS.equipamiento.EDUCATIVO} radius={[0, 0, 2, 2]} />
              <Bar dataKey="Salud" stackId="a" fill={COLORS.equipamiento.SALUD} />
              <Bar dataKey="Abasto" stackId="a" fill={COLORS.equipamiento.ABASTO} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}