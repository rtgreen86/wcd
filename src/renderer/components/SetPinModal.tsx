import React, { useEffect, useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal';
import InputPin from './InputPin';
import Button from './Button';

const PinLength = 4;

export default function SetPinModal({
  id
}: {
  id: string
}) {
  const [pin1, setPin1] = useState('');

  const [pin2, setPin2] = useState('');

  useEffect(() => {
    const input = document.getElementById(`${id}-pin-1`);
    const handleShown = () => {
      input.focus();
    };
    document.addEventListener('shown.bs.modal', handleShown);
    return () => document.removeEventListener('shown.bs.modal', handleShown);
  }, []);

  const handlePin1Changed = (value: string) => {
    setPin1(value);
    if (value.length < 4) return;
    document.getElementById(`${id}-pin-2`).focus();
  };

  const handlePin2Changed = (value: string) => {
    setPin2(value);
  }

  let message = 'Enter new PIN code to protect your application data.';

  if (pin1.length === PinLength && pin2 !== pin1) {
    message = 'Reenter same PIN to second field.';
  }

  if (pin2.length === PinLength && pin2 !== pin1) {
    message = 'Entried PIN codes are different.';
  }

  const isDisabled = pin1.length !== PinLength || pin1 !== pin2;

  return (
    <Modal id={id}>
      <form onSubmit={event => event.preventDefault()}>
        <ModalHeader title='Set PIN' canClose={false} />
        <ModalBody>
          <div className="container-fluid text-center">
            <div className="row align-items-start"><div className="col">{message}</div></div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-pin-1`}>New PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-pin-1`} name="pin-1" maxLength={4} onChange={handlePin1Changed}></InputPin></div>
            </div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-pin-2`}>Reenter PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-pin-2`} name="pin-2" maxLength={4} onChange={handlePin2Changed}></InputPin></div>
            </div>
            <div className="row align-items-start">
              <div className="col">Information or Error message.</div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button buttonStyle="secondary" onClick="modal-dismiss">Cancel</Button>
          <Button buttonType="submit" buttonStyle="primary" disabled={isDisabled}>Set</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
