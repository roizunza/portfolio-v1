import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import { smoothScrollTo } from './utils/scroll'; 
import './App.css'; 

import Outro from './components/Outro.jsx'; 
import ContactForm from './components/ContactForm.jsx'; 

import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
// Importación del nuevo módulo de certificaciones
import CertificacionesView from './components/Certificaciones/CertificacionesView.jsx';

function App() {
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
    if(idScroll.includes('certificaciones')) targetId = 'seccion-certificaciones'; 
    
    if (targetId) smoothScrollTo(targetId, 1500); 
  };

  return (
    <div className="app-container">
      <Header alDarClicEnContacto={irAContacto} />

      <main style={{ flex: 1, paddingTop: '60px' }}>
        <Hero alAbrirTerminal={irAContacto} />
        
        <Indice onActivarDashboard={irAProyecto} />

        <section id="seccion-viaja-segura" style={{ paddingBottom: '40px' }}>
            <ViajaSeguraView />
        </section>

        <section id="seccion-vigilancia" style={{ paddingBottom: '40px' }}>
            <VigilanciaEspectralView />
        </section>
        
        <section id="seccion-certificaciones" style={{ paddingBottom: '40px' }}>
            <CertificacionesView />
        </section> 

        <Outro onContactClick={irAContacto} />

      </main>

      <Footer /> 
      
      <ContactForm isOpen={mostrarFormulario} onClose={cerrarFormulario} />
    </div>
  );
}

export default App;