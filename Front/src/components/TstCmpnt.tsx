import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TstCmpnt = () => {
  return (
    <ToastContainer
      className="custom-toast-container"
      autoClose={1500}
      hideProgressBar
      newestOnTop
      closeButton
      pauseOnHover
      draggable
      theme="light"
      style={{
        position: 'fixed',
        top: '7%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
      toastStyle={{
        backgroundColor: '#f0f0f0',  // Gris claro, puedes cambiar este color
        color: '#333',  // Texto en un color oscuro para contrastar
        borderRadius: '8px',  // Opcional, para redondear los bordes del toast
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',  // Opcional, sombra suave
      }}
    />
  );
};

export default TstCmpnt;
