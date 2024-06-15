import React, { ReactNode } from 'react';

export default function ModalBody({
  children
}: {
  children: ReactNode
}) {
  return <div className="modal-body text-center">{ children }</div>
}
