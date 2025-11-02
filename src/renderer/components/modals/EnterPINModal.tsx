import { Modal, ModalHeader, ModalContent, ModalFooter, ModalDismissButton, ModalTypes } from '../Modal';
import { InputPIN } from '../Form';
import './EnterPINModal.css';

export const EnterPINModal = ({
  id,
  modalTypes = ModalTypes.None,
  title = ''
}: {
  id: string,
  modalTypes?: ModalTypes,
  title?: string
}) => {
  return (
    <Modal id={id} modalTypes={modalTypes}>
      <form className="enter-pin-form">
        <ModalHeader modalTypes={modalTypes}>{title}</ModalHeader>
        <ModalContent><p><InputPIN></InputPIN></p></ModalContent>
        <ModalFooter>
          <ModalDismissButton className="btn-secondary">Cancel</ModalDismissButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};
