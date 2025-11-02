import { Modal, ModalHeader, ModalContent, ModalFooter, ModalDismissButton } from '../Modal';
import { InputPIN } from '../Form';
import { ModalTypes } from '@components/Modal/ModalTypes';

export const EnterPINModal = ({
  id,
  title = ''
}: {
  id: string,
  title?: string
}) => {
  return (
    <Modal id={id} modalTypes={ModalTypes.Centered}>
      <form>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent><p><InputPIN></InputPIN></p></ModalContent>
        <ModalFooter>
          <ModalDismissButton className="btn-secondary">Cancel</ModalDismissButton>
        </ModalFooter>
      </form>
    </Modal>
  );
};
