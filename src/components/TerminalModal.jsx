import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaTerminal } from 'react-icons/fa';
import './TerminalModal.css'; // Importamos los estilos específicos del modal

const TerminalModal = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  const [enviando, setEnviando] = useState(false);
  const [logs, setLogs] = useState([]);

  if (!isOpen) return null;

  const enviarPaquete = () => {
    if (!nombre || !correo || !mensaje) {
      alert("Error: Faltan datos para el protocolo.");
      return;
    }

    setEnviando(true);
    setLogs(["> Initializing_handshake..."]);

    const templateParams = {
      nombre_remitente: nombre,
      correo_contacto: correo,
      mensaje: mensaje
    };

    // REEMPLAZA CON TUS CREDENCIALES DE EMAILJS
    emailjs.send(
      'TU_SERVICE_ID',       // Ej: service_v7bqlj4
      'TU_TEMPLATE_ID',      // Ej: template_xyz
      templateParams,
      'TU_PUBLIC_KEY'        // Ej: x4IiQCqiWTLmhyKfR
    )
    .then(() => {
       const pasosExito = [
        `> Encrypting_data_from: ${nombre}`,
        "> Resolving_host: rocio_server...", 
        "> Uploading_packet... 100%",
        "> 200 OK. Message_received.",
        "> Closing_connection..."
       ];

       pasosExito.forEach((texto, index) => {
          setTimeout(() => {
            setLogs(prev => [...prev, texto]);
            if (index === pasosExito.length - 1) {
              setTimeout(() => {
                onClose();
                setNombre(''); setCorreo(''); setMensaje(''); setLogs([]); setEnviando(false);
                alert("¡Mensaje enviado con éxito!"); 
              }, 1000);
            }
          }, index * 800);
       });

    }, (err) => {
       setLogs(prev => [...prev, `> ERROR: ${err.text}`]);
       alert(`Error: ${err.text}`);
       setEnviando(false);
    });
  };

  // Estilos inline para los inputs "invisibles" que parecen código
  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px dashed #555',
    color: '#98C379', // Verde string
    fontFamily: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    width: 'auto',
    minWidth: '150px',
    marginLeft: '5px'
  };

  return (
    <div className="modal-overlay">
      <div className="terminal-window">
        
        {/* Header de Ventana */}
        <div className="terminal-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ opacity: 0.5 }}>⚡</span> contacto_protocol.py
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            <span onClick={onClose} className="close-btn">[ X ]</span>
          </span>
        </div>

        <div className="terminal-content">
          
          {enviando ? (
             // VISTA DE LOGS (Hacker style)
             <div className="logs-container">
                {logs.map((log, i) => (
                  <div key={i} className="log-line">{log}</div>
                ))}
                <span className="cursor-blink">_</span>
             </div>
          ) : (
            // VISTA DE FORMULARIO
            <>
              <div className="code-form">
                
                {/* Variable Nombre */}
                <div className="code-line">
                  <span className="ck-key">var</span>{' '}
                  <span className="ck-cls">nombre_remitente</span> 
                  <span className="ck-punc"> = </span>
                  <span className="ck-str">"</span>
                  <input 
                    type="text" 
                    style={inputStyle}
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    autoFocus
                  />
                  <span className="ck-str">"</span>
                </div>

                {/* Variable Correo */}
                <div className="code-line">
                  <span className="ck-key">var</span>{' '}
                  <span className="ck-cls">correo_contacto</span> 
                  <span className="ck-punc"> = </span>
                  <span className="ck-str">"</span>
                  <input 
                    type="email" 
                    style={inputStyle}
                    placeholder="tucorreo@ejemplo.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <span className="ck-str">"</span>
                </div>

                <div className="divider"></div>

                {/* Función Mensaje */}
                <div className="code-line">
                  <span className="ck-key">def</span>{' '}
                  <span className="ck-fn">mensaje</span>
                  <span className="ck-punc">():</span>
                </div>

                {/* Textarea Docstring */}
                <div className="code-block-comment">
                  <span className="ck-com">"""</span><br/>
                  <textarea 
                    style={{
                      ...inputStyle, 
                      width: '100%', 
                      borderBottom: 'none', 
                      resize: 'none', 
                      minHeight: '80px',
                      color: '#888888',
                      fontStyle: 'italic'
                    }}
                    placeholder="Escribe aquí el motivo de tu contacto..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                  <br/><span className="ck-com">"""</span>
                </div>

                <div className="code-line indent">
                  <span className="ck-key">return</span>{' '}
                  <span style={{ color: '#569cd6' }}>True</span>
                </div>

              </div>

              {/* Botón Ejecutar */}
              <div className="terminal-actions">
                <button className="execute-btn" onClick={enviarPaquete}>
                  <FaTerminal style={{marginRight: '8px'}}/> EJECUTAR_ENVIO
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default TerminalModal;