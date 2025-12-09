import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import { smoothScrollTo } from './utils/scroll'; 

import './App.css'; 

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  
  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  const activarDashboard = () => {
    smoothScrollTo('proyecto-viaja-segura', 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--fondo-app)' }}>
      
      <Header alDarClicEnContacto={abrirTerminal} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        
        <Hero alAbrirTerminal={abrirTerminal} />
        
        <Indice onActivarDashboard={activarDashboard} />

        {/* --- SECCIÓN 3: VIAJA SEGURA --- */}
        <div 
          id="proyecto-viaja-segura" 
          style={{ 
            width: '100%', 
            /* scrollMarginTop: Vital para el encuadre al hacer clic */
            scrollMarginTop: '60px', 
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'var(--fondo-app)'
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