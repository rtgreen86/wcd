import { useMemo, useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';
import { WeekInfo } from '../types';
import { getWeekInfo } from '../utils';

export default function useWeekInfo(): WeekInfo {
  const locale = useContext(LocaleContext);
  return useMemo(() => {
    return getWeekInfo(locale);
  }, [locale]);
}
