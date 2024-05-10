import { useEffect } from 'react';
import { Modal } from 'bootstrap';
import * as EventTypes from '../components/ModalEventTypes';

type EventType = typeof EventTypes[keyof typeof EventTypes];

type EventHandler = (event: Event) => void;

export const useModal = (id: string) => ({
  on(eventType: EventType, handler: EventHandler) {
    useEffect(() => {
      document.getElementById(id).addEventListener(eventType, handler);
      return () => {
        const element = document.getElementById(id);
        if (element) element.removeEventListener(eventType, handler);
      }
    }, [id, eventType, handler]);
  }
});
