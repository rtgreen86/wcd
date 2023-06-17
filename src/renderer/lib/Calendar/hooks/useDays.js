import { useMemo } from 'react';

import useWeekInfo from './useWeekInfo';
import { gridCellsCount } from '../lib/Const';

/**
 * Days of month grid
 * @typedef {Object} Days
 * @prop {number} cellNumber - zero-based index
 * @prop {number} day - [1..7] where 1 is monday
 * @prop {number} date - [1..31]
 * @prop {number} month - [1..12] where 1 is January
 * @prop {number} year
 * @prop {string} isoDate - YYYY-MM-DD
 * @prop {string[]} marks
 * @prop {boolean} visible - true for current month
 */

/**
 * Memoized month days
 * @param {number} year
 * @param {number} month - [1..12] where 1 is January
 * @returns {Days[]}
 */

export default function useDays(year, month) {
  const { weekend, firstDay } = useWeekInfo();

  return useMemo(() => {
    const normalizeDay = day => day === 0 ? 7 : day;

    const getISODate = dateObj => dateObj.toISOString().split('T')[0];

    const getDate = (year, month, date, dateObj = new Date(Date.UTC(year, month - 1, date))) => ({
      day: normalizeDay(dateObj.getUTCDay()),
      date: dateObj.getUTCDate(),
      month: dateObj.getUTCMonth() + 1,
      year: dateObj.getUTCFullYear(),
      isoDate: getISODate(dateObj),
    });

    const { day: monthFirstDay } = getDate(year, month, 1);

    const offset = (7 + monthFirstDay - firstDay) % 7;

    return Array.from({ length: gridCellsCount }, (item, index) => ({
      cellNumber: index,
      ...getDate(year, month, index + 1 - offset),
    }))
      .map(item => ({
        visible: item.month === month,
        ...item
      }))
      .map(({ day, ...rest }) => ({
        day,
        marks: weekend.includes(day) ? ['weekend'] : [],
        ...rest
      }));
  }, [year, month, weekend, firstDay]);
}
