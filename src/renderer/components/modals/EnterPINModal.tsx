import { useRef, useState, FormEvent } from 'react';
import { Modal, ModalTypes } from '../Modal';
import { InputPIN } from '../Form';
import './EnterPINModal.css';

const noop = () => { };

export const EnterPINModal = ({
  id,
  modalTypes = ModalTypes.ButtonOK | ModalTypes.ButtonOK,
  title = '',
  onPinEntered = noop
}: {
  id: string,
  modalTypes?: ModalTypes,
  title?: string
  onPinEntered?: (pin: string) => void,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShown = () => {
    setIsOpen(true);
  }

  const handleHidden = () => {
    setIsOpen(false);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Modal id={id} modalTypes={modalTypes} className="enter-pin-modal" title={title} onShown={handleShown} onHidden={handleHidden} onSubmit={handleSubmit}>
      <div className="spacer" />
      <InputPIN name="pin" maxLength={4} forceFocus={isOpen} onPinEntried={onPinEntered}></InputPIN>
      <div className="spacer" />
    </Modal>
  );
};
