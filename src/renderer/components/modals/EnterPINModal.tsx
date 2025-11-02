import { Modal, ModalHeader, ModalContentForm, ModalFooter, ModalDismissButton, ModalTypes, ModalBody } from '../Modal';
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
    <Modal id={id} modalTypes={modalTypes} className="enter-pin-modal">
      <ModalContentForm>
        <ModalHeader modalTypes={modalTypes}>{title}</ModalHeader>
        <ModalBody>
          <div className="spacer" />
          <InputPIN></InputPIN>
          <div className="spacer" />
        </ModalBody>
        <ModalFooter>
          <ModalDismissButton className="btn-secondary">Cancel</ModalDismissButton>
        </ModalFooter>
      </ModalContentForm>
    </Modal>
  );
};
