import React, { useEffect } from 'react';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalButton from './ModalButton';
import InputPin from './InputPin';
import Button from './Button';

export default function DeletePinModal({
  id
}: {
  id: string,
}) {
  useEffect(() => {
    const modal = document.getElementById(id);
    const input = document.getElementById(`${id}-pin-code`);

    const handleModalShow = () => {
      input.focus();
    };

    document.addEventListener('shown.bs.modal', handleModalShow);

    return () => {
      document.removeEventListener('shown.bs.modal', handleModalShow);
    }
  }, []);

  return (
    <Modal id={id}>
      <form onSubmit={event => event.preventDefault()}>
        <ModalHeader title='Delete PIN' />
        <ModalBody>
          <p>Enter current PIN code to remove.</p>
          <InputPin id={`${id}-pin-code`} name="pin-code" maxLength={4}></InputPin>
        </ModalBody>
        <ModalFooter>
          <ModalButton buttonStyle="outline-secondary" modalAction="modal-dismiss">Cancel</ModalButton>
          <Button buttonType="submit" buttonStyle="danger" disabled>Delete</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
