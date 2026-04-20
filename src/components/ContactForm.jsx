import React from 'react';
import './ContactForm.css'; // Usando el CSS centralizado

const ContactForm = ({ idioma, t }) => {
  if (!t || !t.form) return null;

  return (
    <div className="contact-panel" style={{
      padding: '30px', 
      backgroundColor: 'var(--fondo-panel)', 
      borderRadius: '8px',
      border: '1px solid var(--borde-sutil)'
    }}>
      <h3 style={{ 
        fontFamily: 'var(--fuente-ui)', 
        color: 'var(--texto-principal)', 
        fontSize: '1.8rem', 
        marginBottom: '10px' 
      }}>
        {t.form.title}
      </h3>
      <p style={{ 
        color: 'var(--texto-secundario)', 
        fontFamily: 'var(--fuente-ui)', 
        fontSize: '0.9rem',
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        {t.form.subtitle}
      </p>

      {/* Tu formulario aquí usando clases CSS para inputs, etc... */}
    </div>
  );
};

export default ContactForm;