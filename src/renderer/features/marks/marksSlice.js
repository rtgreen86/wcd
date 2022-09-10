import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  marks: {},
  status: 'idle',
  error: null,
};

export const fetchMarks = createAsyncThunk('marks/fetchMarks', () => {
  return new Promise(resolve => {
    setTimeout(() => resolve({ '2022-09-30': 'red' }), 1000);
  });
});

const marksSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    markSetted(state, action) {
      const { date, mark } = action.payload;
      state.marks[date] = mark;
    },

    markRemoved(state, action) {
      const { date } = action.payload;
      delete state.marks[date];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMarks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.marks = action.payload;
      })
      .addCase(fetchMarks.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error.message;
      });
  }
});

export const { markSetted, markRemoved } = marksSlice.actions;

export default marksSlice.reducer;
