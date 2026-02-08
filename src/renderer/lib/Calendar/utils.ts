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

export function daysOfWeekCaption(locale: string = DEFAULT_LOCALE): Record<string, string> {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  return Array.from({ length: 7 }).reduce<Record<string, string>>((result, value, index) => {
    const dateObj = new Date();
    dateObj.setDate(index + 1);
    const day = dateObj.getDay();
    const caption = capitalizeFirstLetter(formatter.format(dateObj));
    result[day] = caption;
    return result;
  }, {});
}

export function daysOfWeek(locale: string = DEFAULT_LOCALE) {
  const weekInfo = getWeekInfo(locale);
  const captions = daysOfWeekCaption(locale);
  return Array.from({ length: 7 }, (val, index) => {
    const day = index + weekInfo.firstDay > 7 ? index : index + weekInfo.firstDay;
    return {
      cellNumber: index,
      day,
      caption: day === 7 ? captions[0] : captions[day],
      marks: weekInfo.weekend.includes(day) ? ['weekend'] : []
    };
  })
}

export function getMonthsCaptions(locale: string = DEFAULT_LOCALE) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
  return Array.from({ length: 12 }, (value, index) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(index);
    return capitalizeFirstLetter(formatter.format(date));
  });
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
