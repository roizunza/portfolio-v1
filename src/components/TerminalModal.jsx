import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaTerminal } from 'react-icons/fa';

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

    emailjs.send(
      'service_v7bqlj4',       // Service ID
      'conexion_exitosa',      // Template ID
      templateParams,
      'x4IiQCqiWTLmhyKfR'      // Public Key
    )
    .then(() => {
       const pasosExito = [
        `> Encrypting_data_from: ${nombre}`,
        "> Resolving_host: rocio_server...", // <--- ¡AQUÍ ESTÁ TU TOQUE PERSONAL!
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

  // Estilos inline para "resetear" los inputs y que parezcan código puro
  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px dashed #555',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    outline: 'none',
    width: 'auto',
    minWidth: '150px'
  };

  return (
    <div className="modal-overlay">
      {/* Reutilizamos la clase del Hero para la caja principal */}
      <div className="profile-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header de Ventana */}
        <div className="profile-window-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.5 }}>⚡</span> contacto_protocol.py
          </span>
          <span className="window-controls">
            <span>[ _ ]</span>
            <span>[ ▢ ]</span>
            {/* [X] en blanco puro */}
            <span onClick={onClose} style={{ cursor: 'pointer', color: '#FFFFFF', fontWeight: 'bold' }}>[ X ]</span>
          </span>
        </div>

        <div className="profile-content" style={{ padding: '30px', display: 'block' }}>
          
          {enviando ? (
             // Vista de Logs (Verde Hacker)
             <div className="code-block">
                {logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '5px', color: '#98c379' }}>{log}</div>
                ))}
                <span className="cursor-terminal"></span>
             </div>
          ) : (
            // Vista de Formulario
            <>
              <div className="code-block">
                
                {/* Línea 1: Variable Nombre */}
                <div>
                  <span className="ck-key">var</span>{' '}
                  <span className="ck-cls">nombre_remitente</span> 
                  <span className="ck-punc"> = </span>
                  <span className="ck-str">
                    "
                    <input 
                      type="text" 
                      style={inputStyle}
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      autoFocus
                    />
                    "
                  </span>
                </div>

                {/* Línea 2: Variable Correo */}
                <div style={{ marginTop: '10px' }}>
                  <span className="ck-key">var</span>{' '}
                  <span className="ck-cls">correo_contacto</span> 
                  <span className="ck-punc"> = </span>
                  <span className="ck-str">
                    "
                    <input 
                      type="email" 
                      style={inputStyle}
                      placeholder="tucorreo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                    "
                  </span>
                </div>

                <div style={{ margin: '20px 0', borderTop: '1px dashed #333', opacity: 0.5 }}></div>

                {/* Línea 3: Definición Función */}
                <div>
                  <span className="ck-key">def</span>{' '}
                  <span className="ck-fn">mensaje</span>
                  <span className="ck-punc">():</span>
                </div>

                {/* Línea 4: Docstring (Textarea) */}
                <div className="indent-1 ck-com">
                  """<br/>
                  <textarea 
                    style={{
                      ...inputStyle, 
                      width: '100%', 
                      borderBottom: 'none', 
                      resize: 'none', 
                      minHeight: '80px',
                      fontStyle: 'italic'
                    }}
                    placeholder="Escribe aquí el motivo de tu contacto..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                  <br/>"""
                </div>

                {/* Línea 5: Return */}
                <div className="indent-1" style={{ marginTop: '10px' }}>
                  <span className="ck-key">return</span>{' '}
                  {/* True en Azul (#569cd6) */}
                  <span style={{ color: '#569cd6' }}>True</span>
                </div>

              </div>

              {/* Botones */}
              <div className="profile-buttons" style={{ marginTop: '30px', paddingTop: '20px' }}>
                <button className="profile-btn" onClick={enviarPaquete}>
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