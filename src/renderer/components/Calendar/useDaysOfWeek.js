import { useMemo } from 'react';
import useWeekInfo from './useWeekInfo';
import useDaysOfWeekCaptions from './useDaysOfWeekCaptions';

const locale = 'en-US';

export default function useDaysOfWeek() {
  const weekInfo = useWeekInfo(locale);
  const captions = useDaysOfWeekCaptions(locale);
  return useMemo(() => Array.from({ length: 7 }, (val, index) => {
    const day = weekInfo.firstDay + index > 7 ? index : weekInfo.firstDay + index;
    return {
      caption: captions[day],
      isWeekend: weekInfo.weekend.includes(day)
    };
  }), [captions, weekInfo]);
}
