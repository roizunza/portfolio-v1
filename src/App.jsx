import React, { useState } from 'react';

// CORRECCIÓN DE RUTA: App.jsx está en src/, por lo que solo necesita ir a ./config/theme
import { FONTS } from './config/theme'; 

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import { smoothScrollTo } from './utils/scroll'; 

import './App.css'; 
import './components/Shared/ProjectDashboardLayout.css'; // Aseguramos que carguen los estilos base

// IMPORTAMOS LAS VISTAS DE LOS PROYECTOS
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  // Función de navegación (Scroll Suave)
  const irAProyecto = (idScroll) => {
    // Mapeamos los IDs del índice a los IDs reales de las secciones HTML
    let targetId = '';
    
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo';

    if (targetId) {
        smoothScrollTo(targetId, 1500); // 1.5 segundos de viaje suave
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--fondo-app)' }}>
      
      <Header alDarClicEnContacto={abrirTerminal} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        
        <Hero alAbrirTerminal={abrirTerminal} />
        
        {/* El índice ahora solo manda la señal de scroll, no cambia estados de visibilidad */}
        <Indice onActivarDashboard={irAProyecto} />

        {/* =======================================================
            LIENZO VERTICAL DE PROYECTOS (TODOS DESPLEGADOS)
           ======================================================= */}

        {/* 1. VIAJA SEGURA */}
        <section id="seccion-viaja-segura" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           {/* Título opcional o separador si quisieras */}
           <ViajaSeguraView />
        </section>

        {/* 2. VIGILANCIA ESPECTRAL */}
        <section id="seccion-vigilancia" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           <VigilanciaEspectralView />
        </section>

        {/* 3. ALGORITMO INMOBILIARIO (Placeholder) */}
        <section id="seccion-algoritmo" style={{ scrollMarginTop: '80px', paddingBottom: '40px', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #333' }}>
           <h2 style={{color: '#555'}}>03_ALGORITMO_INMOBILIARIO (Próximamente)</h2>
        </section>

        {/* 4. FACTOR ESFUERZO (Placeholder) */}
        <section id="seccion-esfuerzo" style={{ scrollMarginTop: '80px', paddingBottom: '40px', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid #333' }}>
           <h2 style={{color: '#555'}}>04_FACTOR_ESFUERZO (Próximamente)</h2>
        </section>

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />

    </div>
  );
}

export default App;