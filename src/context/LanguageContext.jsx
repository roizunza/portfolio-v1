import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
// Importamos los archivos de idioma
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Estado para el idioma, por defecto español
  const [idioma, setIdioma] = useState(() => {
    // Intentamos recuperar el idioma del localStorage
    const savedIdioma = localStorage.getItem('portafolioIdioma');
    return savedIdioma || 'es';
  });

  // Efecto para guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('portafolioIdioma', idioma);
  }, [idioma]);

  // Memorizamos las traducciones para que no se recalculen en cada render
  const t = useMemo(() => {
    return idioma === 'es' ? esTranslations : enTranslations;
  }, [idioma]);

  // Función para cambiar el idioma
  const cambiarIdioma = (nuevoIdioma) => {
    if (nuevoIdioma === 'es' || nuevoIdioma === 'en') {
      setIdioma(nuevoIdioma);
    }
  };

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma, t, cambiarIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
};