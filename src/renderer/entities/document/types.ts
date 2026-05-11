export type Marks = Record<string, string[]>;

export type State = {
  marks: Marks,
  isLoading: boolean,
};

export type Action =
  { type: 'toggleMark', payload: { date: string, marks: string[] } } |
  { type: 'setMarks', payload: Marks } |
  { type: 'loading' };

export type Context = {
  state: State,
  dispatch: (action: Action) => void,
}
