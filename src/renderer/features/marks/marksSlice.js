import { createSlice } from "@reduxjs/toolkit";
import postsSlice from "../posts/postsSlice";

const initialState = {};

const marksSlice = createSlice({
  name: 'marks',
  initialState,
  reducers: {
    markSetted(state, action) {
      const { date, mark } = action.payload;
      state[date] = mark;
    },

    markRemoved(state, action) {
      const { date } = action.payload;
      delete state[date];
    }
  }
});

export const { markSetted, markRemoved } = marksSlice.actions;

export default marksSlice.reducer;
