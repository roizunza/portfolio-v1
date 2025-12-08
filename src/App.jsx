import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import TerminalModal from './components/TerminalModal';

// Componentes del Proyecto (Solo la vista completa, la tarjeta ya no va aquí)
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';

function App() {
  const [mostrarTerminal, setMostrarTerminal] = useState(false);
  
  // Estado para controlar si mostramos el Dashboard completo
  const [dashboardActivo, setDashboardActivo] = useState(false);

  const abrirTerminal = () => setMostrarTerminal(true);
  const cerrarTerminal = () => setMostrarTerminal(false);

  // Esta función se la pasaremos al Índice para que el botón de la tarjeta la active
  const activarDashboard = () => {
    setDashboardActivo(true);
    setTimeout(() => {
      const elemento = document.getElementById('dashboard-viaja-segura');
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--fondo-app)' }}>
      
      <Header alDarClicEnContacto={abrirTerminal} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        
        <Hero alAbrirTerminal={abrirTerminal} />
        
        {/* Pasamos la función activarDashboard al Índice */}
        <Indice onActivarDashboard={activarDashboard} />

        {/* --- AQUÍ SE INYECTA EL DASHBOARD COMPLETO AL ACTIVARSE --- */}
        {/* El ID 'proyecto-viaja-segura' es el ancla para el scroll */}
        <div id="proyecto-viaja-segura" style={{ width: '100%' }}>
           {dashboardActivo && (
              <div id="dashboard-viaja-segura" style={{ width: '100%', minHeight: '100vh' }}>
                 <ViajaSeguraView />
                 
                 {/* Botón para cerrar (Opcional, por si quieren regresar) */}
                 <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#0d0f16'}}>
                    <button 
                      onClick={() => setDashboardActivo(false)}
                      style={{background: 'transparent', border:'1px solid #555', color:'white', padding:'10px 20px', cursor:'pointer'}}
                    >
                      CERRAR ANÁLISIS [X]
                    </button>
                 </div>
              </div>
           )}
        </div>

      </main>

      <Footer /> 
      <TerminalModal isOpen={mostrarTerminal} onClose={cerrarTerminal} />

    </div>
  );
}

export default App;