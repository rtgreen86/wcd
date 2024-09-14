import React from 'react';

export type ModalHeaderProps = {
  title: string
  canClose?: boolean
};

export const ModalHeader = ({
  title,
  canClose = true
}: ModalHeaderProps) => (
  <div className="modal-header">
    <h5 className="modal-title">{title}</h5>
    {canClose && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
  </div>
);

export default ModalHeader;
