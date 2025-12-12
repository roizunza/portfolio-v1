import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ isOpen, onClose }) => {
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalSubject = subject || "Contacto desde Portfolio";
    const finalBody = `De: ${senderEmail}\n\nMENSAJE:\n${message}`;
    
    const encodedSubject = encodeURIComponent(finalSubject);
    const encodedBody = encodeURIComponent(finalBody);

    window.location.href = `mailto:rocio.izunza@ejemplo.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="notepad-window">
        
        {/* HEADER */}
        <div className="notepad-header">
          <span className="window-title">contact_form</span>
          <button className="close-btn" onClick={onClose}>[ X ]</button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="notepad-body">
          
          {/* 1. DESTINATARIO (Fijo) */}
          <div className="input-group">
            <label className="input-label">Para:</label>
            <div className="static-field">
              Rocío Izunza &lt; Urbanista - Analista de Datos Geoespaciales &gt;
            </div>
          </div>

          {/* 2. REMITENTE (Input Funcional) */}
          <div className="input-group">
            <label className="input-label">
              De: <span style={{ opacity: 0.5, fontWeight: 400 }}>(Tu correo electrónico)</span>
            </label>
            <input 
              type="email" 
              className="styled-input" 
              placeholder="ejemplo@correo.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              required 
            />
          </div>

          {/* 3. ASUNTO */}
          <div className="input-group">
            <label className="input-label">Asunto:</label>
            <input 
              type="text" 
              className="styled-input" 
              placeholder="Propuesta de colaboración..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* 4. MENSAJE */}
          <div className="input-group">
            <label className="input-label">Mensaje:</label>
            <textarea 
              className="message-textarea"
              placeholder="Escribe los detalles aquí..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* BOTÓN */}
        </form>

        {/* FOOTER */}
        <div className="notepad-footer">
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            ENVIAR MENSAJE
          </button>
        </div>

      </div>
    </div>
  );
};

export default ContactForm;