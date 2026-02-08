import * as IntlWrapper from './IntlWrapper.js';
import { DEFAULT_LOCALE, GRID_CELLS_COUNT } from './CONST';
import { WeekInfo, DayInfo } from './types';


export function getWeekInfo(locale: string = DEFAULT_LOCALE): WeekInfo {
  return IntlWrapper.getWeekInfo(locale);
};


export function getDays(year: number, month: number, weekInfo: WeekInfo): DayInfo[] {
  const normalizeDay = (day: number) => day === 0 ? 7 : day;

  const getISODate = (dateObj: Date) => dateObj.toISOString().split('T')[0];

  const getDate = (year: number, month: number, date: number, dateObj = new Date(Date.UTC(year, month - 1, date))) => ({
    day: normalizeDay(dateObj.getUTCDay()),
    date: dateObj.getUTCDate(),
    month: dateObj.getUTCMonth() + 1,
    year: dateObj.getUTCFullYear(),
    isoDate: getISODate(dateObj),
  });

  const { day: monthFirstDay } = getDate(year, month, 1);
  const offset = (7 + monthFirstDay - weekInfo.firstDay) % 7;
  const dates = Array.from({ length: GRID_CELLS_COUNT }, (_, index) => getDate(year, month, index + 1 - offset));

  return dates.map((item, index) => ({
    ...item,
    cellNumber: index,
    visible: item.month === month,
    marks: weekInfo.weekend.includes(item.day) ? ['weekend'] : [],
  }));
}
