import { useEffect } from 'react';

import { Modal } from 'bootstrap';

import * as EventTypes from './ModalEventTypes';

export type EventType = typeof EventTypes[keyof typeof EventTypes];

export type ModalEventHandler = (event: Event) => void;

export type ApplyModalEventHandler<T = void> = (event: CustomEvent<T>) => void;

function getElementById(id: string) {
  return document.getElementById(id);
}

function getOrCreateInstance(id: string) {
  return Modal.getOrCreateInstance(getElementById(id));
}

function on<T>(id: string, eventType: EventType, handler: ModalEventHandler | ApplyModalEventHandler<T>) {
  useEffect(() => {
    getElementById(id).addEventListener(eventType, handler);
    return () => {
      const element = getElementById(id);
      if (element) element.removeEventListener(eventType, handler);
    }
  }, []);
}

export const useModal = <ModalData = void>(id: string) => ({
  dispose() {
    getOrCreateInstance(id).dispose();
  },

  getOrCreateInstance() {
    return getOrCreateInstance(id);
  },

  hide() {
    return getOrCreateInstance(id).hide();
  },

  show() {
    return getOrCreateInstance(id).show();
  },

  toggle() {
    return getOrCreateInstance(id).toggle();
  },

  triggerApply(detail: ModalData) {
    getElementById(id).dispatchEvent(new CustomEvent(EventTypes.ApplyModal, {detail}));
  },

  onHideModal(handler: ModalEventHandler) {
    on(id, EventTypes.HideModal, handler);
  },

  onHiddenModal(handler: ModalEventHandler) {
    on(id, EventTypes.HiddenModal, handler);
  },

  onHidePreventedModal(handler: ModalEventHandler) {
    on(id, EventTypes.HidePreventedModal, handler);
  },

  onShowModal(handler: ModalEventHandler) {
    on(id, EventTypes.ShowModal, handler);
  },

  onShownModal(handler: ModalEventHandler) {
    on(id, EventTypes.ShownModal, handler);
  },

  onApplyModal(handler: ApplyModalEventHandler<ModalData>) {
    on(id, EventTypes.ApplyModal, handler);
  },
});
