import { useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShown = () => {
    inputRef.current?.focus();
  }

  return (
    <Modal id={id} modalTypes={modalTypes} className="enter-pin-modal" onShown={handleShown}>
      <ModalContentForm>
        <ModalHeader modalTypes={modalTypes}>{title}</ModalHeader>
        <ModalBody>
          <div className="spacer" />
          <InputPIN ref={inputRef} name="pin" maxLength={4}></InputPIN>
          <div className="spacer" />
        </ModalBody>
        <ModalFooter>
          <ModalDismissButton className="btn-secondary">Cancel</ModalDismissButton>
        </ModalFooter>
      </ModalContentForm>
    </Modal>
  );
};
