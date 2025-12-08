import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero'; // <--- Nuevo

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <Header />

      <main style={{ 
        flex: 1, 
        paddingTop: 'var(--altura-header)', 
        paddingBottom: 'var(--altura-footer)',
        backgroundColor: 'var(--fondo-app)' // Aseguramos fondo correcto
      }}>
        {/* Aquí cargamos la Portada */}
        <Hero />
      </main>

      <Footer /> 

    </div>
  );
}

export default App;