export type Marks = {[date: string]: string[]};

export const initState = () => ({
  year: new Date().getFullYear(),
  marks: {} as Marks,
  isLoading: true,
  isDirty: false,
});

export type State = ReturnType<typeof initState>;
