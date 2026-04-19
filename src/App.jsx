import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import { smoothScrollTo } from './utils/scroll'; 
import './App.css'; 

// 1. IMPORTACIONES CORRECTAS
// Asegúrate de que no haya duplicados.
import Outro from './components/Outro.jsx'; 
import ContactForm from './components/ContactForm.jsx'; // <--- Nuevo nombre

// --- VISTAS DE PROYECTOS ---
import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
import AlgoritmoView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx'; 
import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';

function App() {
  // Estado para el formulario de contacto
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => setMostrarFormulario(false);

  const irAContacto = () => {
    abrirFormulario();
  };

  const irAProyecto = (idScroll) => {
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo'; 
    
    if (targetId) smoothScrollTo(targetId, 1500); 
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
        
        <section id="seccion-algoritmo" style={{ paddingBottom: '40px' }}>
            <AlgoritmoView />
        </section>
        
        <section id="seccion-esfuerzo" style={{ paddingBottom: '40px' }}>
            <FactorEsfuerzoView />
        </section> 

        {/* OUTRO */}
        <Outro onContactClick={irAContacto} />

      </main>

      <Footer /> 
      
      {/* 2. AQUÍ USAMOS EL COMPONENTE CON EL NUEVO NOMBRE */}
      <ContactForm isOpen={mostrarFormulario} onClose={cerrarFormulario} />
    </div>
  );
}

export default App;