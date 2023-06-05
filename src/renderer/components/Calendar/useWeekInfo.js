import { useMemo } from 'react';

const locale = 'en-US';

export default function useWeekInfo() {
  return useMemo(() => getWeekInfo(locale), [locale]);
}

function getWeekInfo(locale) {
  const localeObj = new Intl.Locale(locale);
  if (typeof localeObj.getWeekInfo === 'function') return localeObj.getWeekInfo();
  return localeObj.weekInfo;
}

