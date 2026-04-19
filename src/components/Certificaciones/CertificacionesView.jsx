import React from 'react';
import { FONTS, COLORS, PROJECTS } from './config/theme';

// Componentes Base
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Indice from './components/Indice/Indice';
import Outro from './components/Outro/Outro';
import Footer from './components/Footer/Footer';

// Nueva Sección
import CertificacionesView from './components/Certificaciones/CertificacionesView';

function App() {
  return (
    <div style={{ 
      backgroundColor: COLORS.background.main, 
      minHeight: '100vh',
      color: COLORS.text.primary,
      fontFamily: FONTS.body 
    }}>
      <Header />
      
      <main>
        <Hero />
        <Indice />

        {/* Sección de Certificaciones colocada antes del Outro */}
        <section id="certificaciones">
          <CertificacionesView />
        </section>

        <Outro />
      </main>

      <Footer />
    </div>
  );
}

export default App;