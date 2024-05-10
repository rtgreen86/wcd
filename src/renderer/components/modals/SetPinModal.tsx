import React, { FormEvent, useEffect, useState } from 'react';
import FormModal from './FormModal';
import InputPin from '../controls/InputPin';
import { useModal } from '../../hooks/ModalHooks';

const PIN_LENGTH = 4;

export default function SetPinModal({
  id,
}: {
  id: string,
}) {
  const [pin, setPin] = useState('');
  const [reenterPin, setReenterPin] = useState('');

  const pinFieldId = `${id}-pin`;
  const reenterPinFieldId = `${id}-reenter-pin`;
  const submitButtonId = `${id}-submit`;

  const isDisabled = pin.length !== PIN_LENGTH || pin !== reenterPin;

  const modal = useModal(id);

  modal.on('shown.bs.modal', (event: Event) => {
    document.getElementById(pinFieldId).focus();
  });

  useEffect(() => {
    if (!isDisabled) {
      document.getElementById(submitButtonId).focus();
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
    document.getElementById(reenterPinFieldId).focus();
  };

  const handleReenterPinChanged = (value: string) => {
    setReenterPin(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPin('');
    setReenterPin('');
  };

  return (
    <FormModal id={id} title="Set PIN" disabled={isDisabled} okBtnCaption="Set" onSubmit={handleSubmit}>
      <div className="container-fluid text-center">
        <div className="row align-items-start"><div className="col">{message}</div></div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={pinFieldId}>New PIN code:</label></div>
          <div className="col text-start"><InputPin id={pinFieldId} name="pin" maxLength={PIN_LENGTH} value={pin} onChange={handlePinChanged}></InputPin></div>
        </div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={reenterPinFieldId}>Reenter PIN code:</label></div>
          <div className="col text-start"><InputPin id={reenterPinFieldId} name="pin-reenter" maxLength={PIN_LENGTH} value={reenterPin} onChange={handleReenterPinChanged}></InputPin></div>
        </div>
      </div>
    </FormModal>
  );
}
