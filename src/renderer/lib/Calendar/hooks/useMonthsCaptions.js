import { useMemo, useContext } from 'react';
import { capitalizeFirstLetter } from '../lib/utils';
import { LocaleContext } from '../context/LocaleContext';

/**
 * Get localized month caption
 * @returns {string[]} Month captions
 */

export default function getMonthsCaption() {
  const locale = useContext(LocaleContext);
  return useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
    return Array.from({ length: 12 }, (value, index) => {
      const date = new Date();
      date.setDate(1);
      date.setMonth(index);
      return capitalizeFirstLetter(formatter.format(date));
    });
  }, [locale]);
}
