import { forwardRef } from 'react';
import Modal, { ModalRef, ModalProps } from './Modal';
import ModalHeader from '../controls/ModalHeader';
import ModalBody from '../controls/ModalBody';
import ModalFooter from '../controls/ModalFooter';
import ModalButtonClose from '../controls/ModalButtonClose';

export interface MessageBoxProps extends ModalProps {
  title: string,
  okButtonTitle: string,
};

export const MessageBox = forwardRef<ModalRef, MessageBoxProps>(({
  title,
  okButtonTitle,
  children,
  ...props
}: MessageBoxProps, forwardRef) => {
  return (
    <Modal ref={forwardRef} {...props}>
      <ModalHeader title={title}></ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter><ModalButtonClose>{okButtonTitle}</ModalButtonClose></ModalFooter>
    </Modal>
  );
});

export default MessageBox;
