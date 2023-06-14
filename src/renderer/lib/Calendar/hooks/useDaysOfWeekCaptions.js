import { useMemo } from 'react';
import { capitalizeFirstLetter } from '../lib/utils';

const locale = 'en-US';

export default function useDaysOfWeekCaptions() {
  return useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return Array.from({ length: 7 }).reduce((result, value, index) => {
      const dateObj = new Date();
      dateObj.setDate(index + 1);
      const day = dateObj.getDay();
      const caption = capitalizeFirstLetter(formatter.format(dateObj));
      result[day] = caption;
      return result;
    }, {});
  }, [locale]);
}
