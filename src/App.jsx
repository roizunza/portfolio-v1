import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Indice from './components/Indice.jsx';
import { smoothScrollTo } from './utils/scroll'; 
import certificacionesES from './data/certificaciones.json';
import certificacionesEN from './data/certificaciones_en.json';
import './App.css'; 

import Outro from './components/Outro.jsx'; 
import ContactForm from './components/ContactForm.jsx';
import FormacionTecnica from './components/FormacionTecnica.jsx';

import { useLanguage } from './context/LanguageContext.jsx';

import ViajaSeguraView from './components/ViajaSegura/ViajaSeguraView.jsx';
import VigilanciaEspectralView from './components/VigilanciaEspectral/VigilanciaEspectralView.jsx';
import AlgoritmoView from './components/AlgoritmoInmobiliario/AlgoritmoInmobiliarioView.jsx'; 
import FactorEsfuerzoView from './components/FactorEsfuerzo/FactorEsfuerzoView.jsx';

function App() {
  const { idioma, setIdioma, t } = useLanguage();
  const dataActual = idioma === 'es' ? certificacionesES : certificacionesEN;

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const irAContacto = () => {
    console.log("⚡ APP.JSX RECIBIÓ LA SEÑAL: Abriendo modal de contacto...");
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => setMostrarFormulario(false);

  const irAProyecto = (idScroll) => {
    let targetId = '';
    if(idScroll.includes('viaja')) targetId = 'seccion-viaja-segura';
    else if(idScroll.includes('vigilancia')) targetId = 'seccion-vigilancia';
    else if(idScroll.includes('algoritmo')) targetId = 'seccion-algoritmo';
    else if(idScroll.includes('esfuerzo')) targetId = 'seccion-esfuerzo'; 
    else if(idScroll.includes('formacion')) targetId = 'formacion-tecnica-seccion';
    
    if (targetId) smoothScrollTo(targetId, 1500); 
  };

  return (
    <div className="app-container">
      <Header 
        alDarClicEnContacto={irAContacto} 
        idioma={idioma} 
        setIdioma={setIdioma} 
        t={t.nav} 
      />

      <main style={{ flex: 1, paddingTop: '70px' }}>
        <Hero alAbrirTerminal={irAContacto} t={t.hero} idioma={idioma} />
        
        <Indice onActivarDashboard={irAProyecto} idioma={idioma} t={t} />

        <section id="seccion-viaja-segura" style={{ paddingBottom: '40px' }}>
            <ViajaSeguraView t={t.viajaSegura} idioma={idioma} />
        </section>

        <section id="seccion-vigilancia" style={{ paddingBottom: '40px' }}>
            <VigilanciaEspectralView t={t.vigilancia} idioma={idioma} />
        </section>
        
        <section id="seccion-algoritmo" style={{ paddingBottom: '40px' }}>
            <AlgoritmoView t={t.algoritmo} idioma={idioma} />
        </section>
        
        <section id="seccion-esfuerzo" style={{ paddingBottom: '40px' }}>
            <FactorEsfuerzoView t={t.factorEsfuerzo} idioma={idioma} />
        </section> 

        <FormacionTecnica t={t.formacion} data={dataActual} />
        
        <Outro onContactClick={irAContacto} t={t.outro} />
      </main>

      <Footer /> 
      
      <ContactForm isOpen={mostrarFormulario} onClose={cerrarFormulario} t={t.contacto} />
    </div>
  );
}

export default App;