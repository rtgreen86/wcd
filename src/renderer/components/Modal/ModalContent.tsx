import { ReactNode } from 'react';

export const ModalContent = ({
  children
}: {
  children?: ReactNode
}) => (<div className="modal-body">{children}</div>);
