import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose, t }) => {
  const form = useRef(); 
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); 

  if (!isOpen) return null;

  const text = t || {
    titulo: "contact_form", para_label: "Destinatario:", rol: "Urbanista | Analista de Datos Geoespaciales", nombre_label: "Nombre:", nombre_ph: "tu nombre", correo_label: "Remitente:", correo_sub: "(Tu correo)", asunto_label: "Asunto:", asunto_ph: "Propuesta de colaboración...", mensaje_label: "Mensaje:", mensaje_ph: "Escribe los detalles aquí...", exito: "¡mensaje enviado con éxito!", error: "error al enviar. intenta de nuevo.", enviando: "enviando...", btn_enviar: ">enviar_mensaje"
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const sendEmail = (e) => {
    e.preventDefault(); 
    setIsSending(true);
    setStatus(null);

    const SERVICE_ID = 'service_v7bqlj4';
    const TEMPLATE_ID = 'conexion_exitosa';
    const PUBLIC_KEY = 'x4IiQCqiWTLmhyKfR';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setIsSending(false);
          setStatus('success');
          setTimeout(() => {
            onClose();
            setStatus(null);
          }, 2000);
      }, (error) => {
          setIsSending(false);
          setStatus('error');
      });
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      style={{ zIndex: 99999 }} 
    >
      <div className="notepad-window">
        
        <div className="notepad-header">
          <span className="window-title">{text.titulo}</span>
          <button className="close-btn" onClick={onClose}>[ X ]</button>
        </div>

        <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="notepad-body">
            
            <div className="input-group">
              <label className="input-label">{text.para_label}</label>
              <div className="static-field">
                Rocío Izunza - {text.rol}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">{text.nombre_label}</label>
              <input type="text" name="nombre_remitente" className="styled-input" placeholder={text.nombre_ph} required />
            </div>

            <div className="input-group">
              <label className="input-label">
                {text.correo_label} <span style={{ opacity: 0.5, fontWeight: 400 }}>{text.correo_sub}</span>
              </label>
              <input type="email" name="correo_contacto" className="styled-input" placeholder="usuario@email.com" required />
            </div>

            <div className="input-group">
              <label className="input-label">{text.asunto_label}</label>
              <input type="text" name="subject" className="styled-input" placeholder={text.asunto_ph} required />
            </div>

            <div className="input-group">
              <label className="input-label">{text.mensaje_label}</label>
              <textarea name="mensaje" className="message-textarea" placeholder={text.mensaje_ph} required />
            </div>

            {status === 'success' && <p style={{color: '#15BE80', fontSize: '12px', marginTop:'10px'}}>{text.exito}</p>}
            {status === 'error' && <p style={{color: '#ff5a60', fontSize: '12px', marginTop:'10px'}}>{text.error}</p>}

          </div>

          <div className="notepad-footer">
            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? text.enviando : text.btn_enviar}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;