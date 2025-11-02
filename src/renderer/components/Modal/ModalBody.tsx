import { ReactNode } from 'react';

export const ModalBody = ({
  children
}: {
  children?: ReactNode
}) => (<div className="modal-body">{children}</div>);
