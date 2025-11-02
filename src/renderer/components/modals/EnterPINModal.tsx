import { useRef, useState } from 'react';
import { Modal, ModalTypes } from '../Modal';
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
      <form className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5">{title}</h1>
          {modalTypes & ModalTypes.BlockingModal ? null : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
        </div>
        <div className="modal-body">
          <div className="spacer" />
          <InputPIN name="pin" maxLength={4} forceFocus={isOpen}></InputPIN>
          <div className="spacer" />
        </div>
        <div className="modal-footer">
          <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};
