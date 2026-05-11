export type Marks = Record<string, string[]>;

export type Document = {
  marks: Marks,
  isLoading: boolean,
};

export type Action =
  { type: 'toggleMark', payload: { date: string, marks: string[] } } |
  { type: 'setMarks', payload: Marks } |
  { type: 'loading' };
