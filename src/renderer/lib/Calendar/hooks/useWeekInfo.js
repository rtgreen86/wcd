import { useMemo } from 'react';

const locale = 'en-US';

/**
 * Week Information
 * @typedef {object} weekInfo
 * @property {number} firstDay - [1..7] where 1 is monday
 * @property {number[]} weekend
 */


/**
 * Get Week Info
 * @returns {weekInfo}
 */

export default function useWeekInfo() {
  return useMemo(() => {
    const localeObj = new Intl.Locale(locale);
    if (typeof localeObj.getWeekInfo === 'function') return localeObj.getWeekInfo();
    return localeObj.weekInfo;
  }, [locale]);
}
