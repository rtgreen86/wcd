import React, { ReactNode } from 'react';
import Button from './Button';
import { SetPinModalData } from './SetPinModal';
import { useModal } from '../hooks/ModalHooks';

const noop = () => {};

export default function SetPinModalButton({
  modalId,
  onApply = noop,
  children
}: {
  modalId: string,
  onApply: (data: SetPinModalData) => void,
  children: ReactNode
}) {
  const modal = useModal<SetPinModalData>(modalId);

  modal.onApplyModal((event: CustomEvent<SetPinModalData>) => {
    const detail = event.detail;
    onApply(detail);
  });

  return <Button buttonStyle="outline-secondary" onClick="modal-toggle" modalTarget={`#${modalId}`}>{ children }</Button>;
}
