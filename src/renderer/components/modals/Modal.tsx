import React, { ReactNode } from 'react';

export interface ModalProps {
    id: string,
    children?: ReactNode
}

export default function Modal({
  id,
  children
}: ModalProps) {
  return (
    <div className="modal fade" id={id} aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{ children }</div>
      </div>
    </div>
  );
}
