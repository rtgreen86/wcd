import React, { FormEvent, ReactNode, useRef, SyntheticEvent } from 'react';

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Button from '../controls/Button';

import { useModal } from '../../hooks/useModal';

export interface FormModalProps {
  id: string,
  title: string,
  canClose?: boolean,
  okBtnCaption?: string,
  cancelBtnCaption?: string,
  disabled?: boolean,
  method?: string,
  action?: string,
  onHide?: (event: Event) => void,
  onHidden?: (event: Event) => void,
  onHidePrevented?: (event: Event) => void,
  onShow?: (event: Event) => void,
  onShown?: (event: Event) => void,
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
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
  onSubmit = () => undefined,
  children
}: FormModalProps) {
  const formRef = useRef(null);

  const submitId = `${id}-submit`;

  const modal = useModal(id);

  const handleHide = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const forms = target.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].reset();
    }
    onHide(event);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const detail = new FormData(form);
    const cancelled = !modal.dispatchApplyEvent(detail)
    if (!cancelled) onSubmit(event);
  };

  return (
    <Modal
      id={id}
      onHide={handleHide}
      onHidden={onHidden}
      onHidePrevented={onHidePrevented}
      onShow={onHidePrevented}
      onShown={onHidePrevented}
    >
      <form method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose} />
        <ModalBody>{ children }</ModalBody>
        <ModalFooter>
          <Button action="dismiss-modal" type="button" buttonStyle="secondary">{ cancelBtnCaption }</Button>
          <Button action="dismiss-modal" id={submitId} type="submit" buttonStyle="primary" disabled={disabled}>{ okBtnCaption }</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
