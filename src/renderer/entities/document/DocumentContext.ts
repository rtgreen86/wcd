import { createContext } from 'react';
import { Document, Action } from './types';

export const createDocument: () => Document = () => ({
  marks: {},
  isLoading: true,
});

const emptyDocument = createDocument();

const noop: (action: Action) => void = () => { };

export const DocumentContext = createContext([emptyDocument, noop]);
