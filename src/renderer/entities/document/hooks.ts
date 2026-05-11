import { useContext } from 'react';
import { DocumentContext } from './DocumentContext';

export function useDocument() {
  return useContext(DocumentContext);
}
