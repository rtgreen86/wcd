import './ModalRequestPIN.css';

import { useState, FormEvent, useCallback } from 'react';
import { Modal, ModalProps } from '../Modal';
import { InputPIN } from '../Form';

const noop = () => { };

type EnterPINModalProps = ModalProps & {
  pin?: string,
  onPinEntered?: (value: string) => void,
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const ModalRequestPIN = ({
  id,
  className = '',
  isOpen,
  pin,
  onPinEntered = noop,
  children,
  ...rest
}: EnterPINModalProps) => {
  const [isFocused, setIsFocused] = useState(isOpen);

  const handleShown = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused]);

  const handleHidden = useCallback(() => {
    setIsFocused(false);
  }, [setIsFocused]);

  return (
    <Modal id={id} className="modal-request-pin" onShown={handleShown} onHidden={handleHidden} onSubmit={handleSubmit} {...rest}>
      <div className="spacer" />
      <InputPIN name="pin" value={pin} maxLength={4} forceFocus={isFocused} onPinEntried={onPinEntered}></InputPIN>
      <div className="spacer">{children}</div>
    </Modal>
  );
};
