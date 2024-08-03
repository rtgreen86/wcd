import React, { useState, useEffect, FormEvent } from 'react';
import FormModal from './FormModal';
import InputPin from '../controls/InputPin';
import { useFormModal } from '../../hooks/FormModalHooks';

const pinLength = 4;

export default function DeletePinModal({
  id
}: {
  id: string,
}) {
  const [pin, setPin] = useState('');
  const pinId = `${id}-pin-code`;
  const submitButtonId = `${id}-submit`;
  const modal = useFormModal(id);

  const isDisabled = pin.length !== pinLength;

  useEffect(() => {
    if (!isDisabled) {
      document.getElementById(submitButtonId).focus();
    }
  }, [isDisabled]);

  modal.on('shown.bs.modal', () => {
    document.getElementById(pinId).focus();
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPin('');
  };

  const handleHide = () => {
    setPin('');
  };

  return (
    <FormModal id={id} title="Delete PIN" disabled={isDisabled} okBtnCaption="Delete PIN" onSubmit={handleSubmit} onHide={handleHide}>
      <p>Enter current PIN code to remove.</p>
      <InputPin id={pinId} name="pin" maxLength={pinLength} value={pin} onChange={setPin}></InputPin>
    </FormModal>
  );
}
