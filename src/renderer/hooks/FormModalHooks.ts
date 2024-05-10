import { useModal } from './ModalHooks';
import * as EventTypes from '../components/ModalEventTypes';

export function useFormModal(id: string) {
  const modal = useModal(id);

  return {
    ...modal,

    dispatchApplyEvent(detail: FormData) {
      return document.getElementById(id).dispatchEvent(new CustomEvent<FormData>(EventTypes.ApplyModal, { detail }))
    },

    onApply(handler: (event: CustomEvent<FormData>) => void) {
      modal.on(EventTypes.ApplyModal, handler);
    }
  }
}
