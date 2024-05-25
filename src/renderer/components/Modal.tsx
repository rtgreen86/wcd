import React, { ReactNode } from 'react';

export function ModalHeader({
  title,
  canClose = true
}: {
  title: string
  canClose?: boolean
}) {
  return (
    <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      {canClose && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
    </div>
  );
}

export function ModalFooter({
  children,
}: {
  children: ReactNode
}) {
  return <div className="modal-footer">{ children }</div>
}

export function ModalBody({
  children
}: {
  children: ReactNode
}) {
  return <div className="modal-body text-center">{ children }</div>
}

export function Modal({
  id,
  children
}: {
  id: string,
  children?: ReactNode
}) {
  return (
    <div className="modal fade" id={id} aria-hidden="true" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">{ children }</div>
      </div>
    </div>
  );
}

export default Modal;