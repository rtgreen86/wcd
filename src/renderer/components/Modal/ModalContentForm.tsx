import { ReactNode } from 'react';

export const ModalContentForm = ({
  children
}: {
  children?: ReactNode
}) => (<form className="modal-content">{children}</form>);
