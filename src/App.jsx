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
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
import AlgoritmoView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx'; 
// [NUEVO] Importamos la vista de Factor Esfuerzo
import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  const irAProyecto = (idScroll) => {
    // Mapeo de IDs para el scroll suave
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo'; // <--- Conectado
    
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
        
        {/* 01. VIAJA SEGURA */}
        <section id="seccion-viaja-segura" style={{ paddingBottom: '40px' }}>
            <ViajaSeguraView />
        </section>

        {/* 02. VIGILANCIA ESPECTRAL */}
        <section id="seccion-vigilancia" style={{ paddingBottom: '40px' }}>
            <VigilanciaEspectralView />
        </section>
        
        {/* 03. ALGORITMO INMOBILIARIO */}
        <section id="seccion-algoritmo" style={{ paddingBottom: '40px' }}>
            <AlgoritmoView />
        </section>
        
        {/* 04. FACTOR ESFUERZO (JAPÓN) - ¡ACTIVADO! */}
        <section id="seccion-esfuerzo" style={{ paddingBottom: '40px' }}>
            <FactorEsfuerzoView />
        </section> 

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />
    </div>
  );
}

export default App;