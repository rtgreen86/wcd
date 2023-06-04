import { useMemo } from 'react';
import { capitalizeFirstLetter } from './utils';

const locale = 'en-US';

export default function getMonthsCaption() {
  return useMemo(() => getCaptions(locale), [locale]);
}

function getCaptions(locale) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  return Array.from({ length: 12 }, (value, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(index);
    return capitalizeFirstLetter(formatter.format(date));
  });
}
