import { ReactNode } from 'react';

export const ModalFooter = ({
  children
}: {
  children?: ReactNode
}) => (<div className="modal-footer">{children}</div>);
