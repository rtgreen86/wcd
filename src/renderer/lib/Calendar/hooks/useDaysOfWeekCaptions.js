import { useMemo, useContext } from 'react';
import { capitalizeFirstLetter } from '../lib/utils';
import { LocaleContext } from '../context/LocaleContext';

export default function useDaysOfWeekCaptions() {
  const locale = useContext(LocaleContext);
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
