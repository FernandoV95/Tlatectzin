//  idCita:string
import React from 'react';
import { Modal } from 'antd';

type mdlProps = {
  open: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode; 
};

const SmplMdl = ({ open, setVisible, children}: mdlProps) => {

  const handleCancel = () => {
    setVisible(false);
  };

 
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null} 
    >
      {children}  
    </Modal>
  );
};

export default SmplMdl;
