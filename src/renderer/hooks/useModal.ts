import { useEffect } from 'react';

type Handler = (event: Event) => void;

type ApplyHandler<T> = (event: CustomEvent<T>) => void;

export const useModal = <T>(id: string) => ({
  apply(detail: T) {
    document.getElementById(id).dispatchEvent(new CustomEvent('apply.modal', {detail}));
  },

  onShown(handler: Handler) {
    useEffect(() => {
      document.getElementById(id).addEventListener('shown.bs.modal', handler);
      // return () => document.getElementById(id).removeEventListener('shown.bs.modal', handler);
    }, []);
  },

  onApply(handler: ApplyHandler<T>) {
    useEffect(() => {
      document.getElementById(id).addEventListener('apply.modal', handler);
      // return () => document.getElementById(id).removeEventListener('apply.modal', handler);
    }, []);
  }
});