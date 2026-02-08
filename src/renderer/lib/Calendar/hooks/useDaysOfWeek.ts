import { useMemo } from 'react';
import useWeekInfo from './useWeekInfo';
import useDaysOfWeekCaptions from './useDaysOfWeekCaptions';
import { WeekDaysCaption } from '../types';

/**
 * Memoized Days Captions
 * @returns {WeekDaysCaption[]}
 */

export default function useDaysOfWeek() {
  const { firstDay, weekend } = useWeekInfo();
  const captions = useDaysOfWeekCaptions();
  return useMemo(() => Array.from({ length: 7 }, (val, index) => {
    const day = index + firstDay > 7 ? index : index + firstDay;
    return {
      cellNumber: index,
      day,
      caption: day === 7 ? captions[0] : captions[day],
      marks: weekend.includes(day) ? ['weekend'] : []
    };
  }), [firstDay, weekend, captions]);
}
