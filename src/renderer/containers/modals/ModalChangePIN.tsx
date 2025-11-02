import { useState } from 'react';
import { ModalRequestPIN } from '../../components/modals/ModalRequestPIN';
import { ModalProps, ModalTypes, ModalButtons } from '../../components/Modal';

export const ChangePINModal = ({
  id,
  modalTypes = ModalTypes.Centered,
  modalButtons = ModalButtons.ButtonCancel,
  ...rest
}: ModalProps) => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Enter Current PIN code.');

  const handlePinEntered = () => {
    setMessage('Please Wait...');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPin('');
      setMessage('Invalid PIN code. Please try again.');
    }, 1000)
  };

  return (
    <ModalRequestPIN id={id} title="Change PIN code" message={message} modalTypes={modalTypes} modalButtons={modalButtons} pin={pin} onChange={setPin} disabled={loading} onPinEntered={handlePinEntered} {...rest} />
  )
}
