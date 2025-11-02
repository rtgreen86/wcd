import { useRef, useState } from 'react';
import { Modal, ModalHeader, ModalContentForm, ModalFooter, ModalDismissButton, ModalTypes, ModalBody } from '../Modal';
import { InputPIN } from '../Form';
import './EnterPINModal.css';

export const EnterPINModal = ({
  id,
  modalTypes = ModalTypes.None,
  title = ''
}: {
  id: string,
  modalTypes?: ModalTypes,
  title?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShown = () => {
    setIsOpen(true);
  }

  const handleHidden = () => {
    setIsOpen(false);
  }

  return (
    <Modal id={id} modalTypes={modalTypes} className="enter-pin-modal" onShown={handleShown} onHidden={handleHidden}>
      <ModalContentForm>
        <ModalHeader modalTypes={modalTypes}>{title}</ModalHeader>
        <ModalBody>
          <div className="spacer" />
          <InputPIN name="pin" maxLength={4} forceFocus={isOpen}></InputPIN>
          <div className="spacer" />
        </ModalBody>
        <ModalFooter>
          <ModalDismissButton className="btn-secondary">Cancel</ModalDismissButton>
        </ModalFooter>
      </ModalContentForm>
    </Modal>
  );
};
