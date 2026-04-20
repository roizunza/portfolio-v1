import React, { createContext, useState, useContext } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('es');
  
  // NUEVO: Estado global para la ventana de contacto
  const [contactoAbierto, setContactoAbierto] = useState(false);

  const t = idioma === 'es' ? es : en;

  // Funciones para controlar la ventana
  const abrirContacto = () => setContactoAbierto(true);
  const cerrarContacto = () => setContactoAbierto(false);

  return (
    <LanguageContext.Provider value={{ 
      idioma, 
      setIdioma, 
      t, 
      contactoAbierto, 
      abrirContacto, 
      cerrarContacto 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);