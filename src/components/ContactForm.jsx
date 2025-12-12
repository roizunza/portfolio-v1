import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose }) => {
  const form = useRef(); 
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); 

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const sendEmail = (e) => {
    e.preventDefault(); 
    setIsSending(true);
    setStatus(null);

    //CREDENCIALES
    const SERVICE_ID = 'service_v7bqlj4';
    const TEMPLATE_ID = 'conexion_exitosa';
    const PUBLIC_KEY = 'x4IiQCqiWTLmhyKfR';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log("Éxito:", result.text);
          setIsSending(false);
          setStatus('success');
          setTimeout(() => {
            onClose();
            setStatus(null);
          }, 2000);
      }, (error) => {
          console.log("Error:", error.text);
          setIsSending(false);
          setStatus('error');
      });
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="notepad-window">
        
        <div className="notepad-header">
          <span className="window-title">contact_form</span>
          <button className="close-btn" onClick={onClose}>[x]</button>
        </div>

        <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          
          <div className="notepad-body">
            
            <div className="input-group">
              <label className="input-label">para:</label>
              <div className="static-field">
                Rocío Izunza - Urbanista|Analista de Datos Geoespaciales
              </div>
            </div>

            {/* 1. NOMBRE (Variable: nombre_remitente) */}
            <div className="input-group">
              <label className="input-label">Para:</label>
              <input 
                type="text" 
                name="nombre_remitente" 
                className="styled-input" 
                placeholder="tu nombre"
                required 
              />
            </div>

            {/* 2. CORREO (Variable: correo_contacto) */}
            <div className="input-group">
              <label className="input-label">
                De: <span style={{ opacity: 0.5, fontWeight: 400 }}>(Tu correo)</span>
              </label>
              <input 
                type="email" 
                name="correo_contacto" 
                className="styled-input" 
                placeholder="usuario@email.com"
                required 
              />
            </div>

            {/* 3. ASUNTO (Variable: subject) */}
            <div className="input-group">
              <label className="input-label">Asunto:</label>
              <input 
                type="text" 
                name="subject" 
                className="styled-input" 
                placeholder="Propuesta de colaboración..."
                required
              />
            </div>

            {/* 4. MENSAJE (Variable: mensaje) */}
            <div className="input-group">
              <label className="input-label">Mensaje:</label>
              <textarea 
                name="mensaje" 
                className="message-textarea"
                placeholder="Escribe los detalles aquí..."
                required
              />
            </div>

            {status === 'success' && <p style={{color: '#15BE80', fontSize: '12px', marginTop:'10px'}}>¡mensaje enviado con éxito!</p>}
            {status === 'error' && <p style={{color: '#ff5a60', fontSize: '12px', marginTop:'10px'}}>error al enviar. intenta de nuevo.</p>}

          </div>

          <div className="notepad-footer">
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSending}
            >
              {isSending ? 'enviando...' : '>enviar_mensaje'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ContactForm;