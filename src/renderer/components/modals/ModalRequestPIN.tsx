import './ModalRequestPIN.css';

import { FormEvent } from 'react';
import { Modal, ModalProps } from '../Modal';

type EnterPINModalProps = ModalProps & {
  message?: string,
  pin?: string,
  onChange?: (value: string) => void,
  onPinEntered?: (value: string) => void,
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const ModalRequestPIN = ({
  id,
  className = '',
  isOpen,
  message = '',
  pin,
  children,
  ...rest
}: EnterPINModalProps) => {


  return (
    <Modal id={id} className="modal-request-pin" onSubmit={handleSubmit} {...rest}>
      <div className="spacer"></div>
      {children}
      <div className="spacer"></div>
    </Modal>
  );
};
