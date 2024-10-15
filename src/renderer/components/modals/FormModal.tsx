import { FormEvent, forwardRef, useRef, useImperativeHandle } from 'react';

import Modal, { ModalProps, ModalRef, ModalEvent } from './Modal';
import ModalHeader from '../controls/ModalHeader';
import ModalBody from '../controls/ModalBody';
import ModalFooter from '../controls/ModalFooter';
import ModalButtonClose from '../controls/ModalButtonClose';
import Button from '../controls/Button';

export { ModalRef, ModalEvent } from './Modal';

export interface FormModalProps extends ModalProps {
  title: string,
  submitCaption: string,
  cancelCaption: string,
  disabled?: boolean,
  method?: string,
  action?: string,
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
  onApply?: (formData: FormData) => void,
}

const handleSubmitDefault = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export const FormModal = forwardRef<ModalRef, FormModalProps>(({
  title,
  canClose,
  submitCaption,
  cancelCaption,
  disabled = false,
  method = 'GET',
  action,
  onHidden = () => undefined,
  onShow = () => undefined,
  onSubmit = handleSubmitDefault,
  onApply = () => undefined,
  children,
  ...rest
}: FormModalProps, forwardRef) => {
  const modalRef = useRef<ModalRef>();
  const formRef = useRef<HTMLFormElement>();
  const toggleButtonRef = useRef<HTMLElement>();

  const show = () => {
    if (modalRef.current) modalRef.current.show();
  };

  const hide = () => {
    if (modalRef.current) modalRef.current.hide();
  };

  useImperativeHandle(forwardRef, () => ({ show, hide }), []);

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    if (toggleButtonRef.current) {
      toggleButtonRef.current.dispatchEvent(new CustomEvent<FormData>('apply.modal', {
        detail: formData, bubbles: true
      }));
    }

    onSubmit(event);
    onApply(formData);

    if (modalRef.current) modalRef.current.hide();
  };

  const handleShow = (event: ModalEvent) => {
    toggleButtonRef.current = event.relatedTarget;
    onShow(event);
  }

  const handleHidden = (event: ModalEvent) => {
    toggleButtonRef.current = undefined;
    resetForm();
    onHidden(event);
  };

  return (
    <Modal ref={modalRef} canClose={canClose} onHidden={handleHidden} onShow={handleShow} {...rest}>
      <form ref={formRef} method={method} action={action} onSubmit={handleSubmit}>
        <ModalHeader title={title} canClose={canClose}></ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button type="submit" buttonStyle='primary' disabled={disabled}>{ submitCaption }</Button>
          <ModalButtonClose buttonStyle='secondary' data-bs-dismiss="modal">{cancelCaption}</ModalButtonClose>
        </ModalFooter>
      </form>
    </Modal>
  );
});

export default FormModal;
