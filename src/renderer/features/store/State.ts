export type Marks = {[date: string]: string[]};

export type State = {
  year: number,
  marks: Marks,
  isMarksLoaded: boolean,
};

export const initState = () => ({
  year: new Date().getFullYear(),
  isMarksLoaded: false,
  marks: {},
} as State);

