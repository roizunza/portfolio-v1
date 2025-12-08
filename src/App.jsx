import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TerminalModal from './components/TerminalModal';

function App() {
  // 1. Aquí guardamos el estado: ¿La terminal está abierta o cerrada?
  const [mostrarTerminal, setMostrarTerminal] = useState(false);

  // 2. Funciones para controlar el estado
  const abrirTerminal = () => {
    console.log("¡Intentando abrir terminal!"); // Esto nos ayudará a ver si funciona en la consola (F12)
    setMostrarTerminal(true);
  };
  
  const cerrarTerminal = () => setMostrarTerminal(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Pasamos la función al Header (para el botón del menú) */}
      <Header alDarClicEnContacto={abrirTerminal} />

      <main style={{ 
        flex: 1, 
        paddingTop: 'var(--altura-header)', 
        paddingBottom: 'var(--altura-footer)',
        backgroundColor: 'var(--fondo-app)' 
      }}>
        {/* IMPORTANTE: Aquí pasamos la función al Hero (para el botón INICIAR CONEXIÓN) */}
        <Hero alAbrirTerminal={abrirTerminal} />
      </main>

      <Footer /> 

      {/* El Modal solo se muestra si mostrarTerminal es 'true' */}
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />

    </div>
  );
}

export default App;