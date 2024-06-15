import React, { FormEvent, ReactNode } from 'react';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalButton from './ModalButton';

import { useFormModal } from '../../hooks/FormModalHooks';

export interface FormModalProps {
  id: string,
  title: string,
  canClose?: boolean,
  okBtnCaption?: string,
  cancelBtnCaption?: string,
  disabled?: boolean,
  method?: string,
  action?: string,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  children: ReactNode
}

export default function FormModal({
  id,
  title,
  canClose,
  okBtnCaption = 'OK',
  cancelBtnCaption = 'Cancel',
  disabled = false,
  method,
  action,
  onSubmit = () => {},
  children
}: FormModalProps) {
  const submitId = `${id}-submit`;

  const modal = useFormModal(id);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const detail = new FormData(form);
    const cancelled = !modal.dispatchApplyEvent(detail)
    if (!cancelled) onSubmit(event);
  };

  return (
    <Modal id={id}>
      <form method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose} />
        <ModalBody>{ children }</ModalBody>
        <ModalFooter>
          <ModalButton buttonStyle="secondary" modalAction="modal-dismiss">{ cancelBtnCaption }</ModalButton>
          <ModalButton id={submitId} buttonType="submit" buttonStyle="primary" modalAction="modal-dismiss" disabled={disabled}>{ okBtnCaption }</ModalButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
