export type WeekInfo = {
  /** [1..7] where 1 is monday */
  firstDay: number,

  /** array of weekends days */
  weekend: number[]
};

export type DayInfo = {
  /** zero-based index */
  cellNumber: number,

  /** [1..7] where 1 is monday */
  day: number,

  /** [1..31] */
  date: number,

  /** [1..12] where 1 is January */
  month: number,

  year: number,

  /** YYYY-MM-DD */
  isoDate: string,

  marks: string[],

  /** true for current month */
  visible: boolean
};
