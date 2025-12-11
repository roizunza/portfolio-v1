import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import { smoothScrollTo } from './utils/scroll'; 
import './App.css'; 

// --- VISTAS DE PROYECTOS ---
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';

// [AISLAMIENTO] Comentamos los proyectos pendientes para que no den error
// import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
// import AlgoritmoView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx';
// import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';
// import TerminalContactSection from './components/TerminalContactSection.jsx'; // Comentado Contacto también

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  const irAProyecto = (idScroll) => {
    // Solo dejamos activo el scroll de Viaja Segura por ahora
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    
    // if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    // if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    // if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo';
    
    if (targetId) smoothScrollTo(targetId, 1500); 
  };

  const irAContacto = () => {
    // Si contacto está desactivado, abrimos la terminal modal como fallback
    abrirTerminal();
    
    // const contactSection = document.getElementById('seccion-contacto');
    // if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    // else abrirTerminal();
  };

  return (
    <div className="app-container">
      
      <Header alDarClicEnContacto={irAContacto} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        <Hero alAbrirTerminal={irAContacto} />
        
        {/* El Índice sigue visible para que puedas dar clic en la tarjeta 01 */}
        <Indice onActivarDashboard={irAProyecto} />

        {/* --- ZONA DE PROYECTOS --- */}
        
        {/* PROYECTO 01: ACTIVO */}
        <section id="seccion-viaja-segura" style={{ paddingBottom: '40px' }}>
            <ViajaSeguraView />
        </section>

        {/* [AISLAMIENTO] Los demás están "apagados" */}
        {/* <section id="seccion-vigilancia" style={{ paddingBottom: '40px' }}>
            <VigilanciaEspectralView />
        </section>
        
        <section id="seccion-algoritmo" style={{ paddingBottom: '40px' }}>
            <AlgoritmoView />
        </section>
        
        <section id="seccion-esfuerzo" style={{ paddingBottom: '40px' }}>
            <FactorEsfuerzoView />
        </section> 
        */}

        {/* CONTACTO: APAGADO */}
        {/* <div id="seccion-contacto">
          <TerminalContactSection />
        </div> 
        */}

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />
    </div>
  );
}

export default App;