import React, { FormEvent, useEffect, useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from './Modal';
import InputPin from './InputPin';
import Button from './Button';

type Props = {
  id: string,
  onApply?: (pin: string) => void
};

const PIN_LENGTH = 4;

const noop = () => {};

export default function SetPinModal({
  id,
  onApply = noop,
}: Props) {
  const [pin, setPin] = useState('');

  const [reenterPin, setReenterPin] = useState('');

  useEffect(() => {
    const input = document.getElementById(`${id}-pin`);
    const handleShown = () => {
      input.focus();
    };
    document.addEventListener('shown.bs.modal', handleShown);

    return () => document.removeEventListener('shown.bs.modal', handleShown);
  }, []);

  const isDisabled = pin.length !== PIN_LENGTH || pin !== reenterPin;

  useEffect(() => {
    if (!isDisabled) {
      document.getElementById(`${id}-submit`).focus();
    }
  }, [isDisabled]);

  let message = 'Press Set button.';

  if (pin.length < PIN_LENGTH) {
    message = 'Enter new PIN code to protect your application data.';
  }

  if (pin.length === PIN_LENGTH && reenterPin !== pin) {
    message = 'Reenter PIN to second field.';
  }

  if (reenterPin.length === PIN_LENGTH && reenterPin !== pin) {
    message = 'Entried PIN codes are different.';
  }

  const handlePinChanged = (value: string) => {
    setPin(value);
    if (value.length < PIN_LENGTH) return;
    document.getElementById(`${id}-reenter-pin`).focus();
  };

  const handleReenterPinChanged = (value: string) => {
    setReenterPin(value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPin('');
    setReenterPin('');
    onApply(pin);

    const event1 = new CustomEvent('apply.modal', {
      detail: { pin }
    });

    document.getElementById(id).dispatchEvent(event1);
  }

  return (
    <Modal id={id}>
      <form onSubmit={handleSubmit}>
        <ModalHeader title='Set PIN' />
        <ModalBody>
          <div className="container-fluid text-center">
            <div className="row align-items-start"><div className="col">{message}</div></div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-pin`}>New PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-pin`} name="pin" maxLength={PIN_LENGTH} value={pin} onChange={handlePinChanged}></InputPin></div>
            </div>
            <div className="row align-items-start">
              <div className="col text-end"><label htmlFor={`${id}-reenter-pin`}>Reenter PIN code:</label></div>
              <div className="col text-start"><InputPin id={`${id}-reenter-pin`} name="pin-reenter" maxLength={PIN_LENGTH} value={reenterPin} onChange={handleReenterPinChanged}></InputPin></div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button buttonStyle="secondary" onClick="modal-dismiss">Cancel</Button>
          <Button id={`${id}-submit`} buttonType="submit" buttonStyle="primary" onClick="modal-dismiss" disabled={isDisabled}>Set</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
