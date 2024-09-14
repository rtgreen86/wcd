import React, { FormEvent, ReactNode, useRef, SyntheticEvent, ElementRef, useState } from 'react';
import * as bootstrap from 'bootstrap';

import Modal, {ModalProps} from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Button from '../controls/Button';
import CancelButton from './CancelButton';

import { useModal } from '../../hooks/useModal';

interface Props extends ModalProps {
  title: string,
  canClose?: boolean,
  okCaption?: string,
  cancelCaption?: string,
  disabled?: boolean,
  method?: string,
  action?: string,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
}

type ModalHandle = ElementRef<typeof Modal>;

export default function FormModal({
  id,
  title,
  canClose = true,
  okCaption = 'OK',
  cancelCaption = 'Cancel',
  disabled = false,
  method = 'GET',
  action = '',
  onHide = () => undefined,
  onHidden = () => undefined,
  onHidePrevented = () => undefined,
  onShow = () => undefined,
  onShown = () => undefined,
  onSubmit = () => undefined,
  children
}: Props) {
  const triggerRef = useRef<HTMLElement>(null);
  const modalRef = useRef<ElementRef<typeof Modal>>(null);

  const [isOpen, setOpen] = useState(false);

  const submitId = `${id}-submit`;

  const modal = useModal(id);

  const handleHide = (event: Event) => {
    triggerRef.current = null;

    const target = event.currentTarget as HTMLElement;
    const forms = target.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
      forms[i].reset();
    }

    onHide(event);
  };

  const handleShow = (event: Event) => {
    if ('relatedTarget' in event) {
      triggerRef.current = event.relatedTarget as HTMLElement;
    }

    onShow(event);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (triggerRef.current) {
      const event = new CustomEvent<FormData>('submit.modal', { detail: formData, bubbles: true });
      console.log('Trigger');
      const cancelled = !triggerRef.current.dispatchEvent(event);
      // document.dispatchEvent(event);
      if (cancelled) return;
    }

    if (modalRef.current) {
      modalRef.current.close();
      // modalRef.current.open();

      // bootstrap.Modal.getInstance(modalRef.current).hide();
    }

    const cancelled = !modal.dispatchApplyEvent(formData)
    if (!cancelled) onSubmit(event);

    event.preventDefault();
  };

  return (
    <Modal
      isOpen={isOpen}
      ref={modalRef}
      id={id}
      onHide={handleHide}
      onHidden={onHidden}
      onHidePrevented={onHidePrevented}
      onShow={handleShow}
      onShown={onShown}
      onStateChanged={setOpen}
    >
      <form method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose} />
        <ModalBody>{ children }</ModalBody>
        <ModalFooter>
          <CancelButton type="button" buttonStyle="secondary">{ cancelCaption }</CancelButton>
          <Button id={submitId} type="submit" buttonStyle="primary" disabled={disabled}>{ okCaption }</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
