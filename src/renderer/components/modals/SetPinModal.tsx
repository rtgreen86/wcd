import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import FormModal, { FormModalProps, FormModalRef, ModalEvent } from './FormModal';
import InputPin from '../controls/InputPin';

const PIN_LENGTH = 4;

export interface SetPinModalProps extends Omit<FormModalProps, 'title' | 'submitCaption' | 'cancelCaption'> {
  title?: string,
  submitCaption?: string,
  cancelCaption?: string,
}

export const SetPinModal = forwardRef<FormModalRef, SetPinModalProps>(({
  id,
  title = 'Set PIN',
  submitCaption = 'OK',
  cancelCaption = 'Cancel',
  disabled = false,
  onShown = () => undefined,
  onHidden = () => undefined,
  ...restProps
}, forwardedRef) => {
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');

  const modalRef = useRef<FormModalRef>();
  const pin1Ref = useRef<HTMLInputElement>();
  const pin2Ref = useRef<HTMLInputElement>();

  const isDisabled = disabled || pin1.length !== PIN_LENGTH || pin1 !== pin2;

  let message = 'Press Set button.';
  if (pin1.length < PIN_LENGTH) message = 'Enter new PIN code to protect your application data.';
  if (pin1.length === PIN_LENGTH && pin2 !== pin1) message = 'Reenter PIN to second field.';
  if (pin2.length === PIN_LENGTH && pin1 !== pin2) message = 'Entried PIN codes are different.';

  useEffect(() => {
    if (!isDisabled && modalRef.current) {
      modalRef.current.focusSubmit();
    }
  }, [isDisabled]);

  const handleShown = (event: ModalEvent) => {
    if (pin1Ref.current !== null) pin1Ref.current.focus();
    onShown(event);
  };

  const handleHidden = (event: ModalEvent) => {
    setPin1('');
    setPin2('');
    onHidden(event);
  };

  const handlePin1Change = (value: string) => {
    setPin1(value);
    if (value.length === PIN_LENGTH && pin2Ref.current !== null) pin2Ref.current.focus();
  };

  useImperativeHandle(forwardedRef, () => modalRef.current);

  return (
    <FormModal ref={modalRef} id={id} title={title} disabled={isDisabled} submitCaption={submitCaption} cancelCaption={cancelCaption} onShown={handleShown} onHidden={handleHidden} {...restProps}>
      <div className="container-fluid text-center">
        <div className="row align-items-start"><div className="col">{message}</div></div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={`${id}-pin-1`}>New PIN code:</label></div>
          <div className="col text-start"><InputPin ref={pin1Ref} id={`${id}-pin-1`} name="pin-1" maxLength={PIN_LENGTH} value={pin1} autoFocus onChange={handlePin1Change}></InputPin></div>
        </div>
        <div className="row align-items-start">
          <div className="col text-end"><label htmlFor={`${id}-pin-2`}>Reenter PIN code:</label></div>
          <div className="col text-start"><InputPin ref={pin2Ref} id={`${id}-pin-2`} name="pin-2" maxLength={PIN_LENGTH} value={pin2} onChange={setPin2}></InputPin></div>
        </div>
      </div>
    </FormModal>
  );
});

export default SetPinModal;
