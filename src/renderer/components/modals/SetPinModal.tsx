import { useEffect, useState, useRef, forwardRef, useImperativeHandle, FormEvent } from 'react';
import { ModalEvent } from './Modal';
import FormModal, { FormModalProps, FormModalRef } from './FormModal';
import InputPin from '../controls/InputPin';
import { setPin } from '../../api';

const PIN_LENGTH = 4;

export interface SetPinModalProps extends Omit<FormModalProps, 'title'> {
  title?: string,
  onSuccess?: () => void,
  onFail?: () => void,
}

export const SetPinModal = forwardRef<FormModalRef, SetPinModalProps>(({
  id,
  title = 'Set PIN',
  disabled = false,
  onShown = () => undefined,
  onApply = () => undefined,
  onHide = () => undefined,
  onHidden = () => undefined,
  onSuccess = () => undefined,
  onFail = () => undefined,
  ...restProps
}, forwardedRef) => {
  const modalRef = useRef<FormModalRef>(null);
  const pin1Ref = useRef<HTMLInputElement>(null);
  const pin2Ref = useRef<HTMLInputElement>(null);
  const blockClosingRef = useRef(false);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [isBusy, setBusy] = useState(false);

  function getMessage() {
    if (isBusy) return 'Applying code. Please Wait.';
    if (pin1.length < PIN_LENGTH) return 'Enter new PIN code to protect your application data.';
    if (pin1.length === PIN_LENGTH && pin2 !== pin1) return 'Reenter PIN to second field.';
    if (pin2.length === PIN_LENGTH && pin1 !== pin2) return 'Entried PIN codes are different.';
    return 'Press Set button.';
  }

  function handlePin1Change(value: string) {
    setPin1(value);
    if (value.length === PIN_LENGTH) pin2Ref.current?.focus();
  }

  function handleShown(event: ModalEvent) {
    pin1Ref.current?.focus();
    onShown(event);
  }

  async function handleApply(event: CustomEvent<FormData>) {
    event.preventDefault();
    blockClosingRef.current = true;
    setBusy(true);

    const success = await setPin(null, pin1);

    onApply(event);
    blockClosingRef.current = false;
    if (success) onSuccess(); else onFail();
    modalRef.current?.hide();
  }

  function handleHide(event: ModalEvent) {
    if (blockClosingRef.current) event.preventDefault();
    onHide(event);
  }

  function handleHidden(event: ModalEvent) {
    modalRef.current?.reset();
    setBusy(false);
    setPin1('');
    setPin2('');
    onHidden(event);
  }

  useImperativeHandle(forwardedRef, () => modalRef.current);

  const isSubmitDisabled = disabled || isBusy || pin1.length !== PIN_LENGTH || pin1 !== pin2;

  useEffect(() => {
    if (!isSubmitDisabled && modalRef.current) {
      modalRef.current.focusSubmit();
    }
  }, [isSubmitDisabled]);

  return (
    <FormModal ref={modalRef} id={id} title={title} disabled={isSubmitDisabled} onShown={handleShown} onApply={handleApply} onHide={handleHide} onHidden={handleHidden} {...restProps}>
      <div className="container-fluid text-center">
        <div className="row align-items-start"><div className="col">{getMessage()}</div></div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={`${id}-pin-1`}>New PIN code:</label></div>
          <div className="col text-start"><InputPin ref={pin1Ref} id={`${id}-pin-1`} name="pin-1" maxLength={PIN_LENGTH} value={pin1} autoFocus readOnly={isBusy} disabled={isBusy} onChange={handlePin1Change}></InputPin></div>
        </div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={`${id}-pin-2`}>Reenter PIN code:</label></div>
          <div className="col text-start"><InputPin ref={pin2Ref} id={`${id}-pin-2`} name="pin-2" maxLength={PIN_LENGTH} value={pin2} readOnly={isBusy} disabled={isBusy} onChange={setPin2}></InputPin></div>
        </div>
      </div>
    </FormModal>
  );
});

export default SetPinModal;
