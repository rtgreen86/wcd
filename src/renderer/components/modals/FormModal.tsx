import { FormEvent, forwardRef, useRef, useImperativeHandle } from 'react';

import Modal, { ModalProps, ModalRef, ModalEvent } from './Modal';
import ModalHeader from '../controls/ModalHeader';
import ModalBody from '../controls/ModalBody';
import ModalFooter from '../controls/ModalFooter';
import ModalButtonClose from '../controls/ModalButtonClose';
import Button, { ButtonStyle } from '../controls/Button';

export interface FormModalRef extends ModalRef {
  apply: () => void;
  reset: () => void;
  focusSubmit: () => void;
}

export interface FormModalProps extends ModalProps {
  title: string,
  submitCaption?: string,
  submitButtonStyle?: ButtonStyle,
  cancelCaption?: string,
  disabled?: boolean
  method?: string,
  action?: string,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  onApply?: (event: CustomEvent<FormData>) => void,
  onApplied?: (event: CustomEvent<FormData>) => void,
}

const handleSubmitDefault = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const FormModal = forwardRef<FormModalRef, FormModalProps>(({
  title,
  submitCaption = 'OK',
  submitButtonStyle = 'primary' as ButtonStyle,
  disabled = false,
  cancelCaption = 'Cancel',
  method = 'GET',
  action,
  canClose,
  onApply = () => undefined,
  onHidden = () => undefined,
  onShow = () => undefined,
  onSubmit = handleSubmitDefault,
  children,
  ...rest
}, forwardRef) => {
  const modalRef = useRef<ModalRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const toggleBtnRef = useRef<HTMLElement>(null);

  function show() {
    if (modalRef.current) modalRef.current.show();
  }

  function hide() {
    if (modalRef.current) modalRef.current.hide();
  }

  function dispatchApplyToButton(detail: FormData) {
    if (!toggleBtnRef.current) return true;
    const event = new CustomEvent<FormData>('apply.modal', {detail, bubbles: true, cancelable: true});
    return toggleBtnRef.current.dispatchEvent(event);
  }

  function dispatchApplyToModal(detail: FormData) {
    const event = new CustomEvent<FormData>('apply.modal', {detail, bubbles: true, cancelable: true});
    onApply(event);
    return !event.defaultPrevented;
  }

  function apply () {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    if (dispatchApplyToModal(formData) && dispatchApplyToButton(formData)) hide();
  }

  function reset() {
    if (formRef.current) formRef.current.reset();
  }

  function focusSubmit() {
    if (submitBtnRef.current) submitBtnRef.current.focus();
  }

  function handleHidden(event: ModalEvent) {
    toggleBtnRef.current = undefined;
    reset();
    onHidden(event);
  }

  function handleShow(event: ModalEvent) {
    toggleBtnRef.current = event.relatedTarget;
    onShow(event);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    onSubmit(event);
    apply();
  }

  useImperativeHandle(forwardRef, () => ({ apply, focusSubmit, hide, reset, show }), []);

  return (
    <Modal ref={modalRef} canClose={canClose} onHidden={handleHidden} onShow={handleShow} {...rest}>
      <form ref={formRef} method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose}></ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button ref={submitBtnRef} type="submit" buttonStyle={submitButtonStyle as ButtonStyle} disabled={disabled}>{submitCaption}</Button>
          <ModalButtonClose buttonStyle='secondary' data-bs-dismiss="modal">{cancelCaption}</ModalButtonClose>
        </ModalFooter>
      </form>
    </Modal>
  );
});

export default FormModal;
