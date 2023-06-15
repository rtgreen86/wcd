import { useMemo } from 'react';
import { capitalizeFirstLetter } from '../lib/utils';

const locale = 'en-US';

/**
 * Get localized month caption
 * @returns {string[]} Month captions
 */

export default function getMonthsCaption() {
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
