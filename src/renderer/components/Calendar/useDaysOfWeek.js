import { useMemo } from 'react';
import useWeekInfo from './useWeekInfo';
import { capitalizeFirstLetter } from './utils';

const locale = 'en-US';

export default function useDaysOfWeek() {
  const weekInfo = useWeekInfo(locale);
  return useMemo(() => getDaysOfWeek(locale, weekInfo), [locale, weekInfo]);
}

function getDaysOfWeek(locale, { firstDay, weekend }) {
  const captions = getCaptions(locale);
  return Array.from({ length: 7 }, (val, index) => {
    const day = firstDay + index > 7 ? index : firstDay + index;
    return {
      caption: captions[day],
      isWeekend: weekend.includes(day)
    };
  });
}

function getCaptions(locale) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  return Array.from({ length: 7 }).reduce((result, value, index) => {
    const dateObj = new Date();
    dateObj.setDate(index + 1);
    const day = dateObj.getDay();
    const caption = capitalizeFirstLetter(formatter.format(dateObj));
    const position = day === 0 ? 7 : day;
    result[position] = caption;
    return result;
  }, {});
}
