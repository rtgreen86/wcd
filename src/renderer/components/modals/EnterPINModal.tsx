import { useRef, useState, FormEvent } from 'react';
import { Modal, ModalTypes } from '../Modal';
import { InputPIN } from '../Form';
import './EnterPINModal.css';

const noop = () => {};

export const EnterPINModal = ({
  id,
  modalTypes = ModalTypes.None,
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
    <Modal id={id} modalTypes={modalTypes} className="enter-pin-modal" onShown={handleShown} onHidden={handleHidden}>
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h1 className="modal-title fs-5">{title}</h1>
          {modalTypes & ModalTypes.BlockingModal ? null : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
        </div>
        <div className="modal-body">
          <div className="spacer" />
          <InputPIN name="pin" maxLength={4} forceFocus={isOpen} onPinEntried={onPinEntered}></InputPIN>
          <div className="spacer" />
        </div>
        <div className="modal-footer">
          <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};
