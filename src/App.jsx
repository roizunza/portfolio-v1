import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';

import './App.css'; 

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  // Función: Solo hace el scroll suave
  const activarDashboard = () => {
    const elemento = document.getElementById('proyecto-viaja-segura');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--fondo-app)' }}>
      
      <Header alDarClicEnContacto={abrirTerminal} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        
        <Hero alAbrirTerminal={abrirTerminal} />
        
        {/* El Índice recibe la función para el botón de la tarjeta */}
        <Indice onActivarDashboard={activarDashboard} />

        {/* --- SECCIÓN 3: VIAJA SEGURA --- */}
        {/* SIEMPRE VISIBLE, SIN OPACIDAD, SCROLL NATURAL */}
        <div 
          id="proyecto-viaja-segura" 
          style={{ 
            width: '100%', 
            /* scrollMarginTop: Ajuste para que al dar clic, el header no tape el título */
            scrollMarginTop: '60px', 
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'var(--fondo-app)' /* Asegura fondo oscuro */
          }}
        >
           <ViajaSeguraView />
        </div>

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />

    </div>
  );
}

export default App;