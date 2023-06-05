import { useMemo } from 'react';
import { capitalizeFirstLetter } from './utils';

const locale = 'en-US';

export default function useDaysOfWeek() {
  return useMemo(() => getDaysOfWeek(locale), [locale]);
}

function getDaysOfWeek(locale) {
  const { firstDay, weekend } = getWeekInfo(locale);
  const captions = getCaptions(locale);
  return Array.from({ length: 7 }, (val, index) => {
    const day = firstDay + index > 7 ? index : firstDay + index;
    return {
      caption: captions[day],
      isWeekend: weekend.includes(day)
    };
  });
}

function getWeekInfo(locale) {
  const localeObj = new Intl.Locale(locale);
  if (typeof localeObj.getWeekInfo === 'function') return localeObj.getWeekInfo();
  return localeObj.weekInfo;
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


