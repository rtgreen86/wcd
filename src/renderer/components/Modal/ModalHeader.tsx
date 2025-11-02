import {ReactNode} from 'react';
import {ModalTypes} from './ModalTypes';

export const ModalHeader = ({
  modalTypes,
  children,
}: {
  modalTypes: ModalTypes,
  children?: ReactNode,
}) => (
  <div className="modal-header">
    <h1 className="modal-title fs-5">{children}</h1>
    {modalTypes & ModalTypes.BlockingModal ? null : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
  </div>
);
