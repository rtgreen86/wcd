import React, { ReactNode } from 'react';

export const ModalBody = ({
  children
}: {
  children: ReactNode
}) => (
  <div className="modal-body text-center">{ children }</div>
);

export default ModalBody;
