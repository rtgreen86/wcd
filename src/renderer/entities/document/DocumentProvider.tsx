import { useMemo, useReducer } from 'react';
import { createDocument, DocumentContext } from './DocumentContext';
import { reducer } from './reducer';

export function DocumentProvider() {
  const [document, dispatch] = useReducer(reducer, createDocument())
  const value = useMemo(() => ([document, dispatch]), [document, dispatch]);
  return <DocumentContext value={value} />;
}
