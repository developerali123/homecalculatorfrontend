import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 1
  },
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    resetCount(state) {
      state.count = 1; // Reset to default start step
    },
  },
});

export const {setCount, resetCount } = countSlice.actions;
export default countSlice.reducer;
