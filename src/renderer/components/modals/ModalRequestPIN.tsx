import './ModalRequestPIN.css';

import { useState, FormEvent, useCallback } from 'react';
import { Modal, ModalProps } from '../Modal';
import { InputPIN } from '../Form';
import { Spinner } from '../Spinner';

const noop = () => { };

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
  disabled,
  onChange = noop,
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
    <Modal id={id} className="modal-request-pin" onShown={handleShown} onHidden={handleHidden} onSubmit={handleSubmit} disabled={disabled} {...rest}>
      <div className="spacer">{message}</div>
      <InputPIN name="pin" value={pin} maxLength={4} forceFocus={isFocused} onPinEntried={onPinEntered} onChange={onChange} disabled={disabled}></InputPIN>
      <div className="spacer">
        {disabled ? <Spinner /> : null}
        {children}
      </div>
    </Modal>
  );
};
