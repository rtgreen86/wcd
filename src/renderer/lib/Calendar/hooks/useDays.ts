import { useMemo } from 'react';
import useWeekInfo from './useWeekInfo';
import { DayInfo } from '../types';
import { getDays } from '../utils';

export default function useDays(year: number, month: number): DayInfo[] {
  const weekInfo = useWeekInfo();

  return useMemo(() => {
    return getDays(year, month, weekInfo);
  }, [year, month, weekInfo.weekend, weekInfo.firstDay]);
}
