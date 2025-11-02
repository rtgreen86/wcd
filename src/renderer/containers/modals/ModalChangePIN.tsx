import { ModalRequestPIN } from '../../components/modals/ModalRequestPIN';
import { ModalProps, ModalTypes, ModalButtons } from '../../components/Modal';

export const ChangePINModal = ({
  id,
  modalTypes = ModalTypes.FullScreen,
  modalButtons = ModalButtons.ButtonCancel | ModalButtons.ButtonOK,
  ...rest
}: ModalProps) => {
  return (
    <ModalRequestPIN id={id} title="Change PIN" modalTypes={modalTypes} {...rest} />
  )
}
