import { ReactNode } from 'react';

export const ModalContent = ({
  children
}: {
  children?: ReactNode
}) => (<div className="modal-content">{children}</div>);
