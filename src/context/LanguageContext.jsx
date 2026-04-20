import React, { createContext, useState, useContext } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [idioma, setIdioma] = useState('es');

  const [contactoAbierto, setContactoAbierto] = useState(false);

  const t = idioma === 'es' ? es : en;
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