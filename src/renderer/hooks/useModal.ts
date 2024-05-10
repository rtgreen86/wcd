import { useEffect } from 'react';
import * as ModalEventTypes from './ModalEventTypes';

type EventType = typeof ModalEventTypes[keyof typeof ModalEventTypes];

export function useModal(id: string) {
  function on(type: EventType, handler: (event: Event) => void) {
    useEffect(() => {
      document.getElementById(id).addEventListener(type, handler);
      return () => {
        const element = document.getElementById(id);
        if (element) element.removeEventListener(type, handler);
      };
    }, [id, type, handler]);
  }

  function onApply(handler: (event: CustomEvent<FormData>) => void) {
    on(ModalEventTypes.ApplyModal, handler);
  }

  function dispatchApplyEvent(detail: FormData) {
    return document.getElementById(id).dispatchEvent(new CustomEvent<FormData>(ModalEventTypes.ApplyModal, { detail }));
  }

  return {on, onApply, dispatchApplyEvent};
}
