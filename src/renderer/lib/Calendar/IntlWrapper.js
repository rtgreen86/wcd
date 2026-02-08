/**
 * Week Information
 * @typedef {object} weekInfo
 * @property {number} firstDay - [1..7] where 1 is monday
 * @property {number[]} weekend
 */

/**
 * Get Week Information
 * @returns {weekInfo}
 */
export function getWeekInfo(locale) {
  const localeObj = new Intl.Locale(locale);
  if (typeof localeObj.getWeekInfo === 'function') return localeObj.getWeekInfo();
  return localeObj.weekInfo;
}
