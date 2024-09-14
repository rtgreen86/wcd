import React from 'react';

export const ModalHeader = ({
  title,
  canClose = true
}: {
  title: string
  canClose?: boolean
}) => (
  <div className="modal-header">
    <h5 className="modal-title">{title}</h5>
    {canClose && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
  </div>
);

export default ModalHeader;
