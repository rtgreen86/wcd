import React, { ReactNode } from 'react';
import ModalButton from './ModalButton'
import { useModal } from '../hooks/ModalHooks';

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
  const modal = useModal<FormData>(modalId);

  modal.onApplyModal((event: CustomEvent<FormData>) => {
    onApply(event.detail);
  });

  return <ModalButton buttonStyle="outline-secondary" modalAction="modal-toggle" modalTarget={`#${modalId}`}>{ children }</ModalButton>;
}
