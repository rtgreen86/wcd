import { useState, forwardRef, useRef } from 'react';
import FormModal, { FormModalProps, FormModalRef, ModalEvent } from './FormModal';
import InputPin from '../controls/InputPin';
import { ButtonStyle } from '../controls/Button';

const pinLength = 4;

export interface DeletePinModalProps extends Omit<FormModalProps, 'title' | 'submitCaption' | 'cancelCaption'> {
  title?: string,
  submitCaption?: string,
  cancelCaption?: string,
}

export const DeletePinModal = forwardRef<FormModalRef, DeletePinModalProps>(({
  id,
  title = 'Delete PIN',
  submitCaption = 'Delete',
  cancelCaption = 'Cancel',
  submitButtonStyle = 'danger' as ButtonStyle,
  disabled = false,
  onShown = () => undefined,
  onHidden = () => undefined,
}, forwardedRef) => {
  const [pin, setPin] = useState('');

  const pinRef = useRef<HTMLInputElement>();

  const isDisabled = disabled || pin.length !== pinLength;

  const handleShown = (event: ModalEvent) => {
    if (pinRef.current !== null) pinRef.current.focus();
    onShown(event);
  };

  const handleHidden = (event: ModalEvent) => {
    setPin('');
    onHidden(event);
  };

  return (
    <FormModal ref={forwardedRef} id={id} title={title} submitCaption={submitCaption} cancelCaption={cancelCaption} submitButtonStyle={submitButtonStyle as ButtonStyle} disabled={isDisabled} onHidden={handleHidden} onShown={handleShown} >
      <p>Enter current PIN code to remove.</p>
      <InputPin ref={pinRef} name="pin" maxLength={pinLength} value={pin} onChange={setPin}></InputPin>
    </FormModal>
  );
});

export default DeletePinModal;
