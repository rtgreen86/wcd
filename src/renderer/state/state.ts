export const initState = () => ({
  year: new Date().getFullYear(),
});

export type State = ReturnType<typeof initState>;
