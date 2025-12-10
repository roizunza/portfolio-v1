import React, { useState } from 'react';
import { FONTS } from './config/theme';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import { smoothScrollTo } from './utils/scroll'; 

import './App.css'; 
import './components/Shared/ProjectDashboardLayout.css'; 

// PROYECTOS
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
import AlgoritmoInmobiliarioView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx';
import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';

// [NUEVO] Sección de Contacto Fija
import TerminalContactSection from './components/TerminalContactSection.jsx';

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  const irAProyecto = (idScroll) => {
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo';

    if (targetId) {
        smoothScrollTo(targetId, 1500); 
    }
  };

  // Función para scroll suave al contacto (si quieres que el botón del Header baje hasta aquí)
  const irAContacto = () => {
    const contactSection = document.getElementById('seccion-contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: abrir modal si no se encuentra la sección
      abrirTerminal();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--fondo-app)' }}>
      
      {/* Si prefieres que el botón del Header baje a la sección, cambia abrirTerminal por irAContacto */}
      <Header alDarClicEnContacto={irAContacto} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        
        <Hero alAbrirTerminal={irAContacto} />
        
        <Indice onActivarDashboard={irAProyecto} />

        {/* --- PROYECTOS --- */}

        <section id="seccion-viaja-segura" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           <ViajaSeguraView />
        </section>

        <section id="seccion-vigilancia" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           <VigilanciaEspectralView />
        </section>

        <section id="seccion-algoritmo" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           <AlgoritmoInmobiliarioView />
        </section>

        <section id="seccion-esfuerzo" style={{ scrollMarginTop: '80px', paddingBottom: '40px' }}>
           <FactorEsfuerzoView />
        </section>

        {/* --- [NUEVO] SECCIÓN DE CONTACTO VISIBLE AL FINAL --- */}
        <div id="seccion-contacto">
          <TerminalContactSection />
        </div>

      </main>

      <Footer /> 
      
      {/* Mantenemos el modal por si acaso, o puedes borrarlo si solo quieres la sección */}
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />

    </div>
  );
}

export default App;