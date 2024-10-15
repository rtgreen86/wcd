import { forwardRef } from 'react';
import Modal, { ModalRef, ModalProps } from './Modal';
import ModalHeader from '../controls/ModalHeader';
import ModalBody from '../controls/ModalBody';

export interface ProgressBoxProps extends ModalProps {
  title: string,
};

export const ProgressBox = forwardRef<ModalRef, ProgressBoxProps>(({
  title,
  canClose = false,
  children,
  ...props
}: ProgressBoxProps, forwardRef) => {
  return (
    <Modal ref={forwardRef} canClose={canClose} {...props}>
      <ModalHeader title={title} canClose={false}></ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
});

export default ProgressBox;
