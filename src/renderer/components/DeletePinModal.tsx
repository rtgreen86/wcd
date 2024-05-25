import React, { useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal';
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
          <Button buttonStyle="outline-secondary" onClick="modal-dismiss">Cancel</Button>
          <Button buttonType="submit" buttonStyle="danger" disabled>Delete</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
