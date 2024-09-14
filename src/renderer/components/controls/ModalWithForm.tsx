import React, { FormEvent, useRef } from 'react';
import Modal, { ModalProps, ModalRef, ModalEvent } from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Button from './Button';

export interface ModalWithFormProps extends ModalProps {
  canClose?: boolean,
  title: string,
  method?: 'POST' | 'GET',
  action?: string,
  cancelCaption?: string,
  submitCaption?: string,
  submitDisabled?: boolean,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  onApply?: (formData: FormData) => void,
}

export const ModalWithForm = ({
  canClose = true,
  title,
  method = 'GET',
  action,
  cancelCaption = 'Close',
  submitCaption,
  submitDisabled = false,
  children,
  onHidden = () => undefined,
  onShow = () => undefined,
  onSubmit = () => undefined,
  onApply = () => undefined,
  ...rest
}: ModalWithFormProps) => {
  const formRef = useRef<HTMLFormElement>();
  const toggleButtonRef = useRef<HTMLElement>();
  const modalRef = useRef<ModalRef>();

  const setToggleButton = (toggleButton: HTMLElement | null) => {
    toggleButtonRef.current = toggleButton;
  };

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
  };

  const handleHidden = (event: ModalEvent) => {
    resetForm();
    setToggleButton(null);
    onHidden(event);
  };

  const handleShow = (event: ModalEvent) => {
    setToggleButton(event.relatedTarget);
    onShow(event);
  };

  const dispatchApplyEventToButton = (formData: FormData) => {
    if (!toggleButtonRef.current) return;
    const event = new CustomEvent<FormData>('apply.modal', { detail: formData, bubbles: true });
    toggleButtonRef.current.dispatchEvent(event);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    onSubmit(event);
    onApply(formData);
    dispatchApplyEventToButton(formData);
    if (modalRef.current) modalRef.current.close();
  };

  return (
    <Modal ref={modalRef} onHidden={handleHidden} onShow={handleShow} {...rest}>
      <form ref={formRef} method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose}></ModalHeader>
        <ModalBody>{ children }</ModalBody>
        <ModalFooter>
          <Button buttonStyle='secondary' data-bs-dismiss="modal">{cancelCaption}</Button>
          <input type="submit" value={submitCaption} disabled={submitDisabled}></input>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ModalWithForm;
