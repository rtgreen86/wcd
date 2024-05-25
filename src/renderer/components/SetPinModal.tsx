import React, { useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal';
import InputPin from './InputPin';
import Button from './Button';

export default function SetPinModal({
  id
}: {
  id: string
}) {
  useEffect(() => {
    const modal = document.getElementById(id);
    const input = document.getElementById(`${id}-pin-1`);

    const handleShown = () => {
      input.focus();
    };

    document.addEventListener('shown.bs.modal', handleShown);

    return () => document.removeEventListener('shown.bs.modal', handleShown);
  }, []);

  return (
    <Modal id={id}>
      <form onSubmit={event => event.preventDefault()}>
        <ModalHeader title='Set PIN' />
        <ModalBody>
          <div className="container-fluid text-center">
            <div className="row align-items-start"><div className="col">
              Enter new PIN code to protect your application data.
            </div></div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-pin-1`}>New PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-pin-1`} name="pin-1" maxLength={4}></InputPin></div>
            </div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-pin-2`}>Reenter PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-pin-2`} name="pin-2" maxLength={4}></InputPin></div>
            </div>
            <div className="row align-items-start">
              <div className="col">Information or Error message.</div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button buttonStyle="secondary" onClick="modal-dismiss">Cancel</Button>
          <Button buttonType="submit" buttonStyle="primary" disabled>Set</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
