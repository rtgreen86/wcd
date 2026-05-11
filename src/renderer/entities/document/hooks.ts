import { useContext, useEffect } from 'react';
import { DocumentContext } from './DocumentContext';

export function useDocument() {
  return useContext(DocumentContext);
}

export function useInitializeDocument() {
  const { dispatch } = useDocument();

  useEffect(() => {
    const init = async () => {
      dispatch({ type: 'loading' });
      setTimeout(() => dispatch({
        type: 'setMarks',
        payload: { '0000-00-00': ['red'] }
      }), 3000);
    }
    init();
  }, [])
}
