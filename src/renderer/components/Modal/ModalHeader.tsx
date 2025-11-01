import { ReactNode } from 'react';

export const ModalHeader = ({
  canClose = true,
  children
}: {
  canClose?: boolean,
  children?: ReactNode
}) => (
  <div className="modal-header">
    <h1 className="modal-title fs-5">{children}</h1>
    {canClose ? <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> : null}
  </div>
);
