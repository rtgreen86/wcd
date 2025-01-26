import { useState, forwardRef, useRef, useImperativeHandle } from 'react';
import FormModal, { FormModalProps, FormModalRef } from './FormModal';
import { ModalEvent } from './Modal';
import InputPin from '../controls/InputPin';
import { ButtonStyle } from '../controls/Button';
import { Authenticator } from '../../api';

const pinLength = 4;

export interface DeletePinModalProps extends Omit<FormModalProps, 'title'> {
  title?: string;
  onSuccess?: () => void;
  onFail?: () => void;
}

export const DeletePinModal = forwardRef<FormModalRef, DeletePinModalProps>(({
  id,
  title = 'Delete PIN',
  submitCaption = 'Delete',
  submitButtonStyle = 'danger' as ButtonStyle,
  disabled = false,
  onApply = () => undefined,
  onShown = () => undefined,
  onHide = () => undefined,
  onHidden = () => undefined,
  onSuccess = () => undefined,
  onFail = () => undefined,
}, forwardedRef) => {
  const modalRef = useRef<FormModalRef>(null);
  const pinRef = useRef<HTMLInputElement>(null);
  const blockClosingRef = useRef(false);

  const [pin, setPin] = useState('');
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function handleShown(event: ModalEvent) {
    pinRef.current?.focus();
    onShown(event);
  }

  async function handleApply(event: CustomEvent<FormData>) {
    event.preventDefault();
    blockClosingRef.current = true;
    setBusy(true);

    const success = await Authenticator.removePin(pin);

    onApply(event);
    blockClosingRef.current = false;
    if (success) {
      onSuccess();
      modalRef.current?.hide();
    } else {
      onFail();
      setError('Incorrect PIN');
      setBusy(false);
    }
  }

  function handleHide(event: ModalEvent) {
    if (blockClosingRef.current) event.preventDefault();
    onHide(event);
  }

  function handleHidden(event: ModalEvent) {
    modalRef.current?.reset();
    setBusy(false);
    setError('');
    setPin('');
    onHidden(event);
  }

  function getMessage() {
    if (isBusy) return 'Please Wait';
    if (error) return error;
    return 'Enter current PIN code to remove.';
  }

  useImperativeHandle(forwardedRef, () => modalRef.current);

  const isDisabled = disabled || isBusy || pin.length !== pinLength;

  return (
    <FormModal ref={modalRef} id={id} title={title} submitCaption={submitCaption} submitButtonStyle={submitButtonStyle as ButtonStyle} disabled={isDisabled} onShown={handleShown} onApply={handleApply} onHide={handleHide} onHidden={handleHidden}>
      <p>{getMessage()}</p>
      <InputPin ref={pinRef} name="pin-1" maxLength={pinLength} value={pin} onChange={setPin} disabled={isBusy}></InputPin>
    </FormModal>
  );
});

export default DeletePinModal;
