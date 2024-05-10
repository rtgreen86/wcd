import React, { ReactNode } from 'react';
import ModalButton from './ModalButton'
import { useFormModal } from '../hooks/FormModalHooks';

const noop = () => {};

export default function SetPinModalButton({
  modalId,
  onApply = noop,
  children
}: {
  modalId: string,
  onApply: (data: FormData) => void,
  children: ReactNode
}) {
  const modal = useFormModal(modalId);

  modal.onApply((event: CustomEvent<FormData>) => {
    onApply(event.detail);
  });

  return <ModalButton buttonStyle="outline-secondary" modalAction="modal-toggle" modalTarget={`#${modalId}`}>{ children }</ModalButton>;
}
