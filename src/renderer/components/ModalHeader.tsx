import React from 'react';

export default function ModalHeader({
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
