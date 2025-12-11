import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import { smoothScrollTo } from './utils/scroll'; 
import './App.css'; 


import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
import AlgoritmoView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx'; 

// [BLOQUEADO TEMPORALMENTE]
// import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  const irAProyecto = (idScroll) => {
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo'; // Activado
    
    // if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo';
    
    if (targetId) smoothScrollTo(targetId, 1500); 
  };

  const irAContacto = () => {
    abrirTerminal();
  };

  return (
    <div className="app-container">
      <Header alDarClicEnContacto={irAContacto} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        <Hero alAbrirTerminal={irAContacto} />
        <Indice onActivarDashboard={irAProyecto} />

        {/* --- ZONA DE PROYECTOS --- */}
        
        <section id="seccion-viaja-segura" style={{ paddingBottom: '40px' }}>
            <ViajaSeguraView />
        </section>

        <section id="seccion-vigilancia" style={{ paddingBottom: '40px' }}>
            <VigilanciaEspectralView />
        </section>
        
        {/* PROYECTO 03: ALGORITMO INMOBILIARIO (Activo) */}
        <section id="seccion-algoritmo" style={{ paddingBottom: '40px' }}>
            <AlgoritmoView />
        </section>
        
        {/* [BLOQUEADO]
        <section id="seccion-esfuerzo" style={{ paddingBottom: '40px' }}>
            <FactorEsfuerzoView />
        </section> 
        */}

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />
    </div>
  );
}

export default App;