import { useMemo, useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';
import { daysOfWeekCaption } from '../utils';

export default function useDaysOfWeekCaptions() {
  const locale = useContext(LocaleContext);
  return useMemo(() => {
    return daysOfWeekCaption(locale);
  }, [locale]);
}
