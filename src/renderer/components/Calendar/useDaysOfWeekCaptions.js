import { useMemo } from 'react';
import { capitalizeFirstLetter } from './utils';

const locale = 'en-US';

export default function useDaysOfWeekCaptions() {
  return useMemo(() => getCaptions(locale), [locale]);
}

export function getCaptions(locale) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  return Array.from({ length: 7 })
    .reduce((result, value, index) => {
      const dateObj = new Date();
      dateObj.setDate(index + 1);
      const day = dateObj.getDay();
      const caption = capitalizeFirstLetter(formatter.format(dateObj));
      result[day] = caption;
      return result;
    }, new Array(7));
}
